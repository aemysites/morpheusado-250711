/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Cards (cards20)'];

  // Find the card body for a single card
  // Structure: .utility-position-sticky > ... > .card-body
  const cardBody = element.querySelector('.card-body') || element;

  // Extract image (first <img> in card body)
  const img = cardBody.querySelector('img');
  // Extract heading (first .h4-heading in card body)
  const heading = cardBody.querySelector('.h4-heading');

  // Build the card's text cell: if heading exists, use the element itself
  let textCell;
  if (heading) {
    textCell = heading;
  } else {
    textCell = '';
  }

  // Build the row for this card
  const cardRow = [img || '', textCell];

  // Compose the table data
  const rows = [headerRow, cardRow];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
