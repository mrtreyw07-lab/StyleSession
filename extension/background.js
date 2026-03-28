// StyleSession — Chrome Extension Background Service Worker
// Injects stylesession.js into the active tab when the toolbar icon is clicked.

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab || typeof tab.id !== 'number') {
    return;
  }

  // Skip restricted pages (chrome://, chrome-extension://, edge://, about:, etc.)
  if (!tab.url || tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://') ||
      tab.url.startsWith('edge://') || tab.url.startsWith('about:') || tab.url.startsWith('chrome:') ||
      tab.url.startsWith('devtools://') || tab.url.startsWith('view-source:')) {
    return;
  }

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['stylesession.js']
    });
  } catch (err) {
    console.error('StyleSession injection failed:', err);
  }
});
