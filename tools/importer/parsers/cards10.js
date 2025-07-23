/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row as in the example
  const headerRow = ['Cards (cards10)'];

  // 2. Get all cards (each is an <a.card-link ...>)
  const cards = Array.from(element.querySelectorAll(':scope > a.card-link'));

  // 3. Each card: extract image for column 1, and all text content for column 2
  const rows = cards.map(card => {
    // Extract the image element: always the first <img> inside the first .utility-aspect-3x2
    let imgEl = null;
    const imgContainer = card.querySelector('.utility-aspect-3x2');
    if (imgContainer) {
      imgEl = imgContainer.querySelector('img');
    }

    // Extract text: tag, heading, and paragraph (all inside .utility-padding-all-1rem)
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    const textContent = [];
    if (textContainer) {
      // Tag (optional, there may be none)
      const tagGroup = textContainer.querySelector('.tag-group');
      if (tagGroup) {
        textContent.push(tagGroup);
      }
      // Heading (h3; optional)
      const heading = textContainer.querySelector('h3');
      if (heading) textContent.push(heading);
      // Paragraph (optional)
      const para = textContainer.querySelector('p');
      if (para) textContent.push(para);
    }

    // Ensure 2 columns for every row
    return [imgEl, textContent];
  });

  // 4. Build final table array
  const tableData = [headerRow, ...rows];

  // 5. Create and replace
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
