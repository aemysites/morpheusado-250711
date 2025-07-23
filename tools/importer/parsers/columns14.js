/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container which holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid, each representing a column
  const columns = Array.from(grid.children);
  // If there are no columns, do not proceed
  if (!columns.length) return;

  // For each column, collect its content as-is to preserve semantic meaning
  const columnCells = columns.map((col) => {
    // If the column has only one child, use it directly
    if (col.childNodes.length === 1) {
      return col.firstChild;
    }
    // Otherwise, wrap all child nodes in a div to preserve structure
    const wrapper = document.createElement('div');
    Array.from(col.childNodes).forEach((node) => {
      wrapper.appendChild(node);
    });
    return wrapper;
  });

  // Create the rows for the block table
  // The header row must be a single-cell row with the block name exactly as specified
  const headerRow = ['Columns (columns14)'];
  const contentRow = columnCells; // One cell per column

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
