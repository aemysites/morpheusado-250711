/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid that contains all cards
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // There are cards at top level of this grid, and also possibly in a nested grid
  // Get immediate children of mainGrid that are links (cards)
  let cardLinks = Array.from(mainGrid.querySelectorAll(':scope > a.utility-link-content-block'));
  // Find any nested grid inside (for smaller cards)
  const nestedGrid = mainGrid.querySelector(':scope > .w-layout-grid');
  if (nestedGrid) {
    // Get cards inside nested grid
    const nestedLinks = Array.from(nestedGrid.querySelectorAll(':scope > a.utility-link-content-block'));
    cardLinks = cardLinks.concat(nestedLinks);
  }

  // Prepare rows, starting with header
  const rows = [['Cards (cards36)']];

  cardLinks.forEach((card) => {
    // Image: find .utility-aspect-* .cover-image img inside card
    let imgEl = null;
    const imgContainer = card.querySelector('[class*="utility-aspect"]');
    if (imgContainer) {
      imgEl = imgContainer.querySelector('img.cover-image');
    }
    
    // Text content: heading (h2, h3, h4), paragraph, and optional button/cta
    // For heading, get first h2, h3, or h4
    const heading = card.querySelector('h2, h3, h4');
    // For description, get first <p> after heading
    let desc = null;
    if (heading) {
      desc = heading.nextElementSibling && heading.nextElementSibling.tagName.toLowerCase() === 'p' ? heading.nextElementSibling : card.querySelector('p');
    } else {
      desc = card.querySelector('p');
    }
    // For CTA, get first .button that is a child (can be div or a)
    let cta = card.querySelector('a.button, div.button, button.button');

    // Compose text cell: heading (if present), then description, then CTA if present
    const textChunks = [];
    if (heading) textChunks.push(heading);
    if (desc) textChunks.push(desc);
    if (cta) {
      // If CTA is not a link, wrap in a <p>
      if (cta.tagName.toLowerCase() !== 'a') {
        const pCta = document.createElement('p');
        pCta.appendChild(cta);
        textChunks.push(pCta);
      } else {
        textChunks.push(cta);
      }
    }
    // Use single element or array for cell
    const textCell = textChunks.length === 1 ? textChunks[0] : textChunks;
    rows.push([imgEl || '', textCell]);
  });

  // Create and replace block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
