/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches exactly the given block name
  const headerRow = ['Columns (columns37)'];

  // Get all direct children of the grid - these are the columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, try to reference the <img> directly if that's the only child, else reference the div
  // This matches the example, which shows only images in each column
  const contentRow = columns.map(col => {
    // If only one child and it's an img, use the img directly
    const imgs = col.querySelectorAll(':scope > img');
    if (imgs.length === 1 && col.children.length === 1) {
      return imgs[0];
    }
    // Otherwise, reference the entire column (future-proof)
    return col;
  });

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
