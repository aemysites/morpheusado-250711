/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that contains the columns
  const grid = element.querySelector('.w-layout-grid');
  // Fallback to direct children if grid not found
  const columns = grid ? Array.from(grid.children) : Array.from(element.children);

  // Compose header row: a single cell only (regardless of number of columns)
  const headerRow = ['Columns (columns9)'];

  // Compose columns row: one cell per column, referencing each block directly
  const columnsRow = columns;

  const cells = [
    headerRow,
    columnsRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
