/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: always one column
  const header = ['Columns (columns18)'];

  // Get all direct child divs (each is a column cell)
  const columnEls = Array.from(element.querySelectorAll(':scope > div'));

  // Compose the content for each column cell
  const cells = columnEls.map(col => {
    // Icon as SVG
    const iconDiv = col.querySelector('.icon');
    let icon = null;
    if (iconDiv && iconDiv.firstElementChild) {
      icon = iconDiv.firstElementChild;
    }
    // Main text (paragraph)
    const p = col.querySelector('p');
    // Compose as fragment
    const fragment = document.createDocumentFragment();
    if (icon) {
      fragment.appendChild(icon);
      fragment.appendChild(document.createTextNode(' '));
    }
    if (p) {
      fragment.appendChild(p);
    }
    return fragment.childNodes.length > 0 ? fragment : '';
  });

  // Group cells into rows of 4 (desktop layout)
  const columnsPerRow = 4;
  const contentRows = [];
  for (let i = 0; i < cells.length; i += columnsPerRow) {
    contentRows.push(cells.slice(i, i + columnsPerRow));
  }

  // Build the table rows: header, then 2 rows of 4 columns
  const tableRows = [header, ...contentRows];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
