/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid with columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (should be two: one content, one image)
  const gridChildren = Array.from(grid.children);

  // Find left (content) and right (image) columns
  let leftCol = null;
  let rightCol = null;

  for (const child of gridChildren) {
    if (!leftCol && child.querySelector && child.querySelector('h2')) {
      leftCol = child;
    } else if (!rightCol && child.tagName === 'IMG') {
      rightCol = child;
    }
  }

  // Guard: must have both columns
  if (!leftCol || !rightCol) return;

  // Compose the table: header, then one row with both columns
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns27)'],
    [leftCol, rightCol]
  ], document);

  element.replaceWith(table);
}
