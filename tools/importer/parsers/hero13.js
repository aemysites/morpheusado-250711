/* global WebImporter */
export default function parse(element, { document }) {
  // Build header row exactly as required
  const headerRow = ['Hero (hero13)'];

  // Second row: Background Image (optional)
  // Find the first <img> element (background image)
  let imgEl = element.querySelector('img');
  const imageRow = [imgEl || ''];

  // Third row: Text Content (heading, subheading, CTA)
  // The heading is inside the second grid cell
  // Find all direct children of .w-layout-grid
  let textRowContent = '';
  const grid = element.querySelector(':scope > .w-layout-grid');
  if (grid) {
    // Find all grid cell divs
    const cells = grid.querySelectorAll(':scope > div');
    if (cells.length > 1) {
      // The text content is in the second cell
      textRowContent = cells[1];
    } else if (cells.length === 1) {
      // Fallback: use the only cell
      textRowContent = cells[0];
    }
  }
  // If no .w-layout-grid, fallback to the element itself
  if (!textRowContent) textRowContent = element;

  const textRow = [textRowContent];

  // Build the table as specified
  const cells = [
    headerRow,
    imageRow,
    textRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
