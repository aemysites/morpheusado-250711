/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per block name
  const headerRow = ['Cards (cards8)'];
  // Each card is a direct child div with an img
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  const rows = cardDivs.map(cardDiv => {
    // Try to find any text content or heading inside the cardDiv (there is none in this HTML)
    const img = cardDiv.querySelector('img');
    // For resilience, try to find all non-image content in the cardDiv
    const textNodes = Array.from(cardDiv.childNodes)
      .filter(node => node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'IMG');
    let textContent = '';
    if (textNodes.length > 0) {
      // If there's additional content, include it
      textContent = textNodes;
    } else {
      textContent = '';
    }
    // Two columns: [image, textContent]
    return [img, textContent];
  });
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
