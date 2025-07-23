/* global WebImporter */
export default function parse(element, { document }) {
  // Find the immediate container div with class 'container' (Webflow typical)
  const container = element.querySelector(':scope > .container');
  if (!container) return;

  // Find the main grid inside the container
  const mainGrid = container.querySelector(':scope > .w-layout-grid');
  if (!mainGrid) return;

  // There may be two major grid children: headings/paragraph, and info row
  // The mainGrid children:
  // 0. H2 heading
  // 1. Paragraph (testimonial)
  // 2. Nested grid (info row)
  const children = Array.from(mainGrid.children);

  // Left column: heading + quote + (divider + avatar+name)
  // Right column: badge (svg logo)
  let leftColDiv = document.createElement('div');
  let rightColDiv = document.createElement('div');

  // Heading and testimonial
  if (children[0]) leftColDiv.appendChild(children[0]);
  if (children[1]) leftColDiv.appendChild(children[1]);

  // Info row is a nested grid
  const infoGrid = children[2];
  if (infoGrid) {
    // In infoGrid: divider, avatar/name (flex-horizontal), badge (utility-display-inline-block)
    const infoGridChildren = Array.from(infoGrid.children);
    // Find the avatar+name flexbox
    const avatarFlex = infoGrid.querySelector('.flex-horizontal');
    if (avatarFlex) {
      leftColDiv.appendChild(avatarFlex);
    }
    // Find the badge logo (svg inside .utility-display-inline-block)
    const badgeDiv = infoGrid.querySelector('.utility-display-inline-block');
    if (badgeDiv) {
      rightColDiv.appendChild(badgeDiv);
    }
  }

  // Compose table exactly as Columns (columns25)
  const cells = [
    ['Columns (columns25)'],
    [leftColDiv, rightColDiv]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
