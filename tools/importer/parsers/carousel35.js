/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Setup header
  const cells = [['Carousel']];

  // Step 2: Locate the main grid (contains both text and images)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Step 3: Find blocks
  //  - textBlock: contains heading, description, buttons
  //  - imageGrid: contains all images
  const gridChildren = Array.from(grid.children);
  let textBlock = null;
  let imageGrid = null;
  for (const child of gridChildren) {
    if (
      child.querySelector('h1, h2, h3, h4, h5, h6') &&
      child.querySelector('p')
    ) {
      textBlock = child;
    }
    if (child.querySelectorAll('img').length > 0) {
      imageGrid = child.querySelector(
        '.grid-layout.mobile-portrait-1-column, .grid-layout'
      );
      // fallback if no sub-grid
      if (!imageGrid && child.querySelectorAll('img').length > 0) {
        imageGrid = child;
      }
    }
  }
  if (!imageGrid) return;
  const images = Array.from(imageGrid.querySelectorAll('img'));

  // Step 4: Build rows - first slide gets text content, others do not
  images.forEach((img, idx) => {
    let textCell = '';
    if (textBlock && idx === 0) {
      // Keep heading, subheading, and button group (if present)
      const content = [];
      const heading = textBlock.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) content.push(heading);
      const desc = textBlock.querySelector('p');
      if (desc) content.push(desc);
      const btnGroup = textBlock.querySelector('.button-group');
      if (btnGroup) content.push(btnGroup);
      textCell = content.length === 1 ? content[0] : content;
    }
    cells.push([img, textCell]);
  });

  // Step 5: Replace original element with carousel block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
