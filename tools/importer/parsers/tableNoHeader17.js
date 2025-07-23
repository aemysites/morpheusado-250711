/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as per the block name
  const headerRow = ['Table (no header)'];
  const rows = [];

  // Find all divs with class 'divider' as direct children (each is a Q&A)
  const dividers = element.querySelectorAll(':scope > .divider');

  dividers.forEach(divider => {
    // Each divider contains a grid, with two children: question and answer
    const grid = divider.querySelector('.w-layout-grid');
    if (grid) {
      // Expecting: [question, answer] as direct children
      const [question, answer] = grid.children;
      // If both are present, push as a row; otherwise handle missing gracefully
      if (question && answer) {
        rows.push([question, answer]);
      } else if (question) {
        rows.push([question]);
      } else if (answer) {
        rows.push([answer]);
      }
    }
  });

  // If there are no rows, just remove the element
  if (rows.length === 0) {
    element.remove();
    return;
  }

  // Compose the table: header + rows
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}