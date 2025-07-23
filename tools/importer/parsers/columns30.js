/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container with all columns (images or other content)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get all direct children (columns)
  const columns = Array.from(grid.children);
  // For each column, gather all content (reference the existing content element inside each column)
  const columnContents = columns.map(col => {
    // Usually the content is a single child div (e.g., with .utility-aspect-2x3)
    // but it could be multiple or nested. We'll grab everything inside this column.
    // If there's only one child, use it, else put all children in an array
    if (col.children.length === 1) {
      return col.firstElementChild;
    } else if (col.children.length > 1) {
      return Array.from(col.children);
    } else {
      return col;
    }
  });

  // The table: header is a single cell, then one row with N columns
  const cells = [
    ['Columns (columns30)'],
    columnContents
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
