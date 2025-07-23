/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row: must be one cell, string exactly as in the example
  const headerRow = ['Columns (columns23)'];

  // 2. Get the two main columns at the top
  const topGrid = element.querySelector('.grid-layout.tablet-1-column');
  let leftCell = [];
  let rightCell = [];

  if (topGrid) {
    const gridChildren = topGrid.querySelectorAll(':scope > div');
    // LEFT: eyebrow + h1
    if (gridChildren[0]) {
      leftCell = Array.from(gridChildren[0].childNodes).filter(n =>
        n.nodeType !== 3 || n.textContent.trim().length > 0
      );
    }
    // RIGHT: description, byline, button
    if (gridChildren[1]) {
      const desc = gridChildren[1].querySelector('.rich-text, .paragraph-lg, p');
      if (desc) rightCell.push(desc);
      const innerGrid = gridChildren[1].querySelector('.grid-layout');
      if (innerGrid) {
        Array.from(innerGrid.children).forEach(child => rightCell.push(child));
      }
    }
  }

  // 3. Get the two image columns
  const imageGrid = element.querySelector('.grid-layout.mobile-portrait-1-column');
  let imgCell1 = [];
  let imgCell2 = [];
  if (imageGrid) {
    const imgCols = imageGrid.querySelectorAll(':scope > div');
    if (imgCols[0]) {
      imgCell1 = Array.from(imgCols[0].childNodes).filter(n => n.nodeType !== 3 || n.textContent.trim());
    }
    if (imgCols[1]) {
      imgCell2 = Array.from(imgCols[1].childNodes).filter(n => n.nodeType !== 3 || n.textContent.trim());
    }
  }

  // 4. Compose the table: header (one cell), second and third row with two columns each
  const cells = [
    headerRow,              // 1 column
    [leftCell, rightCell],  // 2 columns (row 2)
    [imgCell1, imgCell2],   // 2 columns (row 3)
  ];

  // 5. Create table and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
