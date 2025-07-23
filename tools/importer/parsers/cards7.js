/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Cards (cards7)'];

  // Find all card links (each card is an <a> child)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  const rows = cardLinks.map(card => {
    // First cell: The image (direct <img> under a specific container)
    let imgEl = null;
    const imgContainer = card.querySelector('.utility-aspect-2x3');
    if (imgContainer) {
      imgEl = imgContainer.querySelector('img');
    }

    // Second cell: fragment containing meta and title
    const frag = document.createDocumentFragment();

    // Meta (tag and date)
    const meta = card.querySelector('.flex-horizontal');
    if (meta) {
      // Use a div to wrap tag and date
      const metaDiv = document.createElement('div');
      // Move all child nodes (not clone)
      while (meta.childNodes.length > 0) {
        metaDiv.appendChild(meta.childNodes[0]);
      }
      frag.appendChild(metaDiv);
    }

    // Title (h3)
    const title = card.querySelector('h3');
    if (title) {
      // Move the heading element (not clone)
      frag.appendChild(title);
    }

    return [imgEl, frag];
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
