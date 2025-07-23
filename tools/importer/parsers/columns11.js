/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  const numCols = columns.length;

  // Header row: block name in first cell, others empty so header matches content columns
  const headerRow = ['Columns (columns11)', ...Array(numCols - 1).fill('')];
  // Content row: each column's content
  const contentRow = columns;

  const rows = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
