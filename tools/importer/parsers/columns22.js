/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid with columns
  const outerGrid = element.querySelector('.grid-layout.tablet-1-column');
  if (!outerGrid) return;
  // Get all immediate children of the outer grid
  const nodes = Array.from(outerGrid.children);

  // There should be two main columns: left (rich content), right (image)
  // Left column: content (heading, text, buttons)
  // Right column: image
  let leftCol = null;
  let rightCol = null;

  // Loop through children to find the left content group (likely a div.grid-layout or div.section)
  for (const node of nodes) {
    if (
      node.matches('.grid-layout.container') ||
      node.matches('.section') ||
      node.querySelector('.h2-heading, .rich-text, .button-group')
    ) {
      leftCol = node;
    } else if (node.tagName === 'IMG') {
      rightCol = node;
    }
  }

  // If leftCol is itself a grid, look for its main section content
  if (leftCol && leftCol.classList.contains('grid-layout')) {
    // Try to find the section with the heading
    const mainSection = leftCol.querySelector('.section');
    if (mainSection) leftCol = mainSection;
  }

  // Compose the table rows
  const headerRow = ['Columns (columns22)'];
  const contentRow = [];
  if (leftCol) contentRow.push(leftCol);
  if (rightCol) contentRow.push(rightCol);

  // Only build table if at least one column is present
  if (contentRow.length) {
    const cells = [headerRow, contentRow];
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
}
