/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must exactly match example
  const headerRow = ['Hero (hero12)'];
  
  // Collect all grid items (should be two: background and content)
  const grid = element.querySelector('.w-layout-grid');
  let bgImg = '';
  let contentBlock = '';
  if (grid) {
    const gridItems = grid.children;
    // First grid item: background image
    if (gridItems[0]) {
      const img = gridItems[0].querySelector('img.cover-image');
      if (img) bgImg = img;
    }
    // Second grid item: content card (headline, bullets, button etc)
    if (gridItems[1]) {
      // The .card-body contains the content
      const cardBody = gridItems[1].querySelector('.card-body');
      if (cardBody) contentBlock = cardBody;
    }
  }
  // If missing image or content, ensure we pass empty cell for robustness
  
  const rows = [
    headerRow,
    [bgImg],
    [contentBlock]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
