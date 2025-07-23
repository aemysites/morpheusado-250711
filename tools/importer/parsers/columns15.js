/* global WebImporter */
export default function parse(element, { document }) {
  // Find the column layout container
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // For each column, gather all its content (including text, headings, images, etc.) preserving order
  const columnCells = columns.map((col) => {
    // If the column is a single element, use as is
    // But sometimes, containers may be empty or have only whitespace
    if (col.childNodes.length === 0) {
      // If the column is, say, an <img> or similar with no children, include it directly
      return col;
    } else {
      // Create a wrapper div and move all child nodes into it to preserve content and order
      const wrapper = document.createElement('div');
      while (col.childNodes.length > 0) {
        wrapper.appendChild(col.childNodes[0]);
      }
      return wrapper;
    }
  });

  // Build the block table with the correct header and columns
  const cells = [
    ['Columns (columns15)'],
    columnCells
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
