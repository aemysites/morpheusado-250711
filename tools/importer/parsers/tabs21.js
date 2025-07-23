/* global WebImporter */
export default function parse(element, { document }) {
  // Get the tab menu (labels)
  const tabMenu = element.querySelector('.w-tab-menu');
  if (!tabMenu) return;
  const tabLinks = tabMenu.querySelectorAll('a');

  // Get the tab content panes
  const tabContent = element.querySelector('.w-tab-content');
  if (!tabContent) return;
  const tabPanes = tabContent.querySelectorAll('.w-tab-pane');

  // Prepare cells array
  const cells = [];

  // Header row: exactly one cell with 'Tabs'
  cells.push(['Tabs']);

  // Each tab: label (from menu), content (from pane)
  tabLinks.forEach((tabLink, idx) => {
    // Get the tab label - prefer textContent of child div, fallback to tabLink.textContent
    let label = '';
    const labelDiv = tabLink.querySelector('div');
    if (labelDiv && labelDiv.textContent.trim()) {
      label = labelDiv.textContent.trim();
    } else {
      label = tabLink.textContent.trim();
    }

    // Find the matching pane by data-w-tab attribute
    const dataWTab = tabLink.getAttribute('data-w-tab');
    let contentPane = null;
    for (const pane of tabPanes) {
      if (pane.getAttribute('data-w-tab') === dataWTab) {
        contentPane = pane;
        break;
      }
    }
    // If not found, fallback by order
    if (!contentPane) {
      contentPane = tabPanes[idx];
    }

    // The tab content is the first child (usually a grid) of the pane
    let contentBlock = null;
    if (contentPane && contentPane.children.length > 0) {
      contentBlock = contentPane.children[0];
    } else if (contentPane) {
      contentBlock = contentPane;
    } else {
      // fallback: empty
      contentBlock = document.createElement('div');
    }
    
    // Each content row is an array of two cells: [label, contentBlock]
    cells.push([label, contentBlock]);
  });

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
