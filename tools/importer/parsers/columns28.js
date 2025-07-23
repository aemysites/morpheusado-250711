/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all immediate child divs as columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (!columns.length) return;

  // Header row: single column with block name (matches example exactly)
  const headerRow = ['Columns (columns28)'];

  // Content row: each column's element in its own cell
  const contentRow = columns;

  // Build table data so header row is single cell, content row has N columns
  const tableRows = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // After table creation, set colspan of the header cell to match the number of columns in the content row
  const th = block.querySelector('th');
  if (th && columns.length > 1) {
    th.setAttribute('colspan', String(columns.length));
  }

  element.replaceWith(block);
}
