/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Extract the main left content (with heading and subheading)
  // and the right content (button)
  let leftContent = null;
  let rightContent = null;
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length === 2) {
    leftContent = gridChildren[0];
    rightContent = gridChildren[1];
  } else {
    // Fallback: treat all grid items, left = all except last (if more columns), right = last
    leftContent = gridChildren[0] || document.createElement('div');
    rightContent = gridChildren[1] || document.createElement('div');
  }

  // Header as per block spec - exactly one cell
  const headerRow = ['Columns (columns34)'];
  // Second row: as many columns as needed (here 2), each with the respective content
  const contentRow = [leftContent, rightContent];
  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
