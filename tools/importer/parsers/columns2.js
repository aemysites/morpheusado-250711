/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get direct children of grid (left feature, right top stack, right list stack)
  const gridChildren = Array.from(grid.children);

  // The first child is the left feature card (large card)
  const leftCol = gridChildren[0];

  // Next child(ren): find the two containers for the right column
  // One is the two-image cards, the other is the stack of text cards
  let rightImageStack = null, rightListStack = null;
  for (let i = 1; i < gridChildren.length; i++) {
    const child = gridChildren[i];
    const linkBlocks = child.querySelectorAll(':scope > a.utility-link-content-block');
    if (linkBlocks.length === 2 && !rightImageStack) {
      rightImageStack = child;
    } else if (linkBlocks.length > 2 && !rightListStack) {
      rightListStack = child;
    }
  }

  // Compose the right column: create a wrapper div to hold both stacks
  const rightCol = document.createElement('div');
  if (rightImageStack) rightCol.appendChild(rightImageStack);
  if (rightListStack) rightCol.appendChild(rightListStack);

  // Build the cells array for Columns (columns2) block
  const headerRow = ['Columns (columns2)'];
  const contentRow = [leftCol, rightCol];
  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
