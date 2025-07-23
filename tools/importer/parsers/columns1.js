/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row per guidelines
  const headerRow = ['Columns (columns1)'];

  // The actual columns are the immediate children of the grid-layout
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // There may be two columns: [image, right content]
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Reference the actual column elements directly (not cloning)
  const imageCol = gridChildren[0];
  const textCol = gridChildren[1];

  // Compose the table rows: header, then the two columns as cells in the second row
  const rows = [
    headerRow,
    [imageCol, textCol]
  ];

  // Create and replace with the new block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
