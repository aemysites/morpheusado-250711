/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Accordion
  const rows = [
    ['Accordion']
  ];
  // Each accordion item is a direct child with class 'accordion' and 'w-dropdown'
  const accordionItems = element.querySelectorAll(':scope > .accordion.w-dropdown');
  accordionItems.forEach((item) => {
    // Title cell: find the .w-dropdown-toggle, then find the title div within
    const toggle = item.querySelector(':scope > .w-dropdown-toggle');
    let title = '';
    if (toggle) {
      // The title is most likely in a .paragraph-lg child
      const titleDiv = toggle.querySelector('.paragraph-lg');
      if (titleDiv) {
        title = titleDiv;
      } else {
        // Fallback: use the toggle itself
        title = toggle;
      }
    }
    // Content cell: find .w-dropdown-list, and within that the content div
    const dropdownList = item.querySelector(':scope > .w-dropdown-list');
    let content = '';
    if (dropdownList) {
      // The actual content is usually within .w-richtext, fallback to dropdownList itself
      const richText = dropdownList.querySelector('.w-richtext');
      if (richText) {
        content = richText;
      } else {
        // If missing, use the dropdownList
        content = dropdownList;
      }
    }
    rows.push([title, content]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
