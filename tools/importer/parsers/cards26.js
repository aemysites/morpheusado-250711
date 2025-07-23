/* global WebImporter */
export default function parse(element, { document }) {
  // Compose the header row as in the example
  const headerRow = ['Cards (cards26)'];
  const tableRows = [headerRow];

  // The element may have multiple tabs, each with a .w-layout-grid of cards
  // Each card is an <a> (sometimes with .utility-link-content-block or other classes)
  // Cards may have an image (in a .utility-aspect-3x2) and text (h3 + .paragraph-sm) or just text

  // Find all .w-tab-pane within the element
  const tabPanes = element.querySelectorAll('.w-tab-pane');

  tabPanes.forEach((tabPane) => {
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each grid item is a card <a>
    const cards = Array.from(grid.children).filter(child => child.tagName.toLowerCase() === 'a');
    cards.forEach(card => {
      // 1st cell: image (if present, else empty string)
      // 2nd cell: heading(s) and paragraph(s)
      let imgCell = '';
      const aspectDiv = card.querySelector('.utility-aspect-3x2');
      if (aspectDiv) {
        const img = aspectDiv.querySelector('img');
        if (img) imgCell = img;
      }
      // For text: Prefer inner .utility-text-align-center, fallback to card itself
      let textScope = card.querySelector('.utility-text-align-center') || card;
      // Collect heading and paragraph in original order
      let textCell = [];
      const heading = textScope.querySelector('h3');
      if (heading) textCell.push(heading);
      const para = textScope.querySelector('.paragraph-sm');
      if (para) textCell.push(para);
      // If no text, ensure cell is not empty array
      if (textCell.length === 0) textCell = '';
      tableRows.push([imgCell, textCell]);
    });
  });
  
  // Create and replace
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
