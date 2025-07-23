/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in the example
  const headerRow = ['Cards (cards32)'];
  const rows = [];
  // Each card is a direct <a> child
  const cardLinks = element.querySelectorAll(':scope > a.utility-link-content-block');
  cardLinks.forEach((cardLink) => {
    // First cell: image (mandatory), reference the existing element
    const img = cardLink.querySelector('img');
    // Second cell: block of text content
    const textBlock = document.createElement('div');
    // Tag and time (in a flex row)
    const tagRow = cardLink.querySelector('.flex-horizontal');
    if (tagRow) textBlock.appendChild(tagRow);
    // Heading
    const heading = cardLink.querySelector('h3, .h4-heading');
    if (heading) textBlock.appendChild(heading);
    // Description/paragraph
    const desc = cardLink.querySelector('p');
    if (desc) textBlock.appendChild(desc);
    // CTA: 'Read' (often in a div)
    // Find the innermost or last div with text 'Read', but not if it's just a container
    const divs = cardLink.querySelectorAll('div');
    let cta = null;
    divs.forEach((div) => {
      if ((div.textContent || '').trim().toLowerCase() === 'read') {
        cta = div;
      }
    });
    if (cta) textBlock.appendChild(cta);
    rows.push([
      img,
      textBlock
    ]);
  });
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
