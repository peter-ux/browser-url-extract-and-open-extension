chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "extractUrls",
    title: "선택한 텍스트에서 URL 추출",
    contexts: ["selection"]
  });
});

function extractUrls(text) {
  const urlRegex = /https?:\/\/[^\s"'<>]+/gi;
  return [...new Set(text.match(urlRegex) || [])]; // 중복 제거
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "extractUrls") {
    const selectedText = info.selectionText;
    if (!selectedText) return;

    const urls = extractUrls(selectedText);

    chrome.storage.local.set({ extractedUrls: urls }, () => {
      chrome.action.openPopup();
    });
  }
});
