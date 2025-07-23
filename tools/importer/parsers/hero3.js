/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the main grid (contains image and content areas)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const directChildren = grid.querySelectorAll(':scope > div');
  if (directChildren.length < 2) return;

  // 2. Background image (row 2)
  // The first child contains the background image
  const imageDiv = directChildren[0];
  let bgImg = imageDiv ? imageDiv.querySelector('img') : null;

  // 3. Content area (row 3)
  // The second child contains the content card
  const contentArea = directChildren[1];
  let card = contentArea ? contentArea.querySelector('.card') : null;
  const contentCell = [];
  if (card) {
    // Heading (h1-h6)
    const heading = card.querySelector('h1,h2,h3,h4,h5,h6');
    if (heading) contentCell.push(heading);
    // Subheading/paragraph (avoid duplicating if heading is also a p)
    const subheading = card.querySelector('p, .subheading');
    if (subheading && subheading !== heading) contentCell.push(subheading);
    // Call-to-action buttons
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) contentCell.push(buttonGroup);
  }

  // Prepare rows for the table
  const headerRow = ['Hero (hero3)'];
  const imageRow = [bgImg ? bgImg : ''];
  const contentRow = [contentCell.length ? contentCell : ''];
  const cells = [headerRow, imageRow, contentRow];
  
  // Create and replace with the table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
