/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (the columns)
  const cols = Array.from(grid.children);
  if (!cols.length) return;

  // Compose the block table: header is a single cell, next row is all columns as separate cells
  const headerRow = ['Columns (columns5)'];
  const blockRows = [cols];

  const cells = [headerRow, ...blockRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
