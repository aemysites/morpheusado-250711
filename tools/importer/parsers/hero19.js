/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row as specified
  const headerRow = ['Hero (hero19)'];

  // 2. Background image row: gather all direct <img> under the "desktop-3-column" grid
  let imagesCell = '';
  const grid = element.querySelector('.grid-layout.desktop-3-column');
  if (grid) {
    const imgs = Array.from(grid.querySelectorAll('img'));
    if (imgs.length) {
      // Put all images into a div, preserving order and reference
      const imgDiv = document.createElement('div');
      imgs.forEach(img => imgDiv.appendChild(img));
      imagesCell = imgDiv;
    }
  }

  // 3. Content row: heading, subheading, CTAs
  let contentCell = '';
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (contentContainer) {
    contentCell = contentContainer;
  }

  // Compose block table as per requirements: 1 column, 3 rows
  const cells = [
    headerRow,
    [imagesCell],
    [contentCell]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}