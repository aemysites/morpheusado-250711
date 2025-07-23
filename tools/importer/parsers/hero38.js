/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Prepare header row
  const headerRow = ['Hero (hero38)'];

  // 2. Extract background image (the first grid div that contains an <img>)
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > div > div');
  for (const div of gridDivs) {
    const img = div.querySelector('img');
    if (img) {
      bgImg = img;
      break;
    }
  }

  // 3. Extract content block (the other grid div, contains the heading, paragraph, CTA)
  let contentCell = null;
  for (const div of gridDivs) {
    if (div.querySelector('h1')) {
      contentCell = div;
      break;
    }
  }

  // Safe fallback: if not found, use empty string for each cell
  const cells = [
    headerRow,
    [bgImg || ''],
    [contentCell || '']
  ];

  // 4. Create table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
