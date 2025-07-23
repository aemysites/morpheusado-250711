/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout which contains the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid - represents columns
  const columns = Array.from(grid.children);

  // Each cell in the second row should be the column content's root element
  // (reference, do NOT clone)
  const columnsRow = columns.map(col => col);

  // Construct the rows as per block guidelines
  const headerRow = ['Columns (columns31)'];
  const tableRows = [headerRow, columnsRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
