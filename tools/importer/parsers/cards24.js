/* global WebImporter */
export default function parse(element, { document }) {
  // The block header row must match the example exactly
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];

  // Each direct child of the grid container is a card
  const cards = Array.from(element.children);
  cards.forEach((cardEl) => {
    // Find the image (mandatory)
    const img = cardEl.querySelector('img');

    // Text content may be present, or may not (for image-only cards)
    // Try to find the content wrapper for title/desc
    let textCellContent = [];
    const contentBlock = cardEl.querySelector('.utility-padding-all-2rem');
    if (contentBlock) {
      // Get heading (h1,h2,h3,h4)
      const heading = contentBlock.querySelector('h1, h2, h3, h4');
      if (heading) textCellContent.push(heading);
      // Get first paragraph
      const desc = contentBlock.querySelector('p');
      if (desc) textCellContent.push(desc);
    } else {
      // Fallback: just get heading/paragraph from cardEl if present
      const heading = cardEl.querySelector('h1, h2, h3, h4');
      if (heading) textCellContent.push(heading);
      const desc = cardEl.querySelector('p');
      if (desc) textCellContent.push(desc);
    }
    // If no text content is found, leave cell empty
    if (textCellContent.length === 0) textCellContent = '';

    // Add the row (always two columns, image first)
    rows.push([img || '', textCellContent]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
