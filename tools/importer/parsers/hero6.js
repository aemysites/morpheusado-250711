/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (each one contains a 1x1 image)
  const divs = element.querySelectorAll(':scope > div');
  // Collect all <img> elements from those divs in order
  const images = Array.from(divs)
    .map(div => div.querySelector('img'))
    .filter(Boolean);

  // For this hero block, we use only the first image, per the example structure
  const backgroundImage = images[0] || '';

  // Table rows per block spec/example
  const headerRow = ['Hero (hero6)'];
  const imageRow = [backgroundImage];
  // Third row should contain title/subheading/CTA etc, but none exist in source, so use an empty string.
  const contentRow = [''];

  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
