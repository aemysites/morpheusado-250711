/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container (should contain the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // The grid's children: expect 3: main text div, contact list (ul), image
  const gridChildren = Array.from(grid.children);
  let textCol = null;
  let contactList = null;
  let imgCol = null;

  // Identify the columns by their tag/structure
  for (const node of gridChildren) {
    if (node.tagName === 'DIV' && node.querySelector('h3')) {
      textCol = node;
    } else if (node.tagName === 'UL') {
      contactList = node;
    } else if (node.tagName === 'IMG') {
      imgCol = node;
    }
  }

  // The left column: both textCol and contactList (stacked)
  const leftColumn = [];
  if (textCol) leftColumn.push(textCol);
  if (contactList) leftColumn.push(contactList);

  // The right column: just the image
  const rightColumn = [];
  if (imgCol) rightColumn.push(imgCol);

  // Table header row, as in the spec
  const headerRow = ['Columns (columns16)'];
  const columnsRow = [leftColumn, rightColumn];
  const cells = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
