/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (columns container)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get direct children of the grid, expected: 4 for this design
  const children = Array.from(grid.children);
  // Defensive: ensure we have enough children
  if (children.length < 4) return;
  // columns: [author name, tags, heading, paragraph]
  const author = children[0];
  const tags = children[1];
  const heading = children[2];
  const paragraph = children[3];
  // Compose the third column as: heading + paragraph (keep structure!)
  const contentDiv = document.createElement('div');
  contentDiv.appendChild(heading);
  contentDiv.appendChild(paragraph);
  // Build table rows: header, then one row with three columns
  const headerRow = ['Columns (columns29)'];
  const row = [author, tags, contentDiv];
  const table = WebImporter.DOMUtils.createTable([headerRow, row], document);
  element.replaceWith(table);
}
