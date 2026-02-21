document.addEventListener("DOMContentLoaded", () => {
  const urlListDiv = document.getElementById("urlList");
  const countDiv = document.getElementById("count");
  const openAllBtn = document.getElementById("openAll");
  const copyAllBtn = document.getElementById("copyAll");
  const cancelBtn = document.getElementById("cancel");

  chrome.storage.local.get("extractedUrls", (data) => {
    const urls = data.extractedUrls || [];

 //  개수 표시
    countDiv.textContent = `총 ${urls.length}개 URL 추출됨`;

    if (urls.length === 0) {
      urlListDiv.innerText = "URL이 없습니다.";
      return;
    }

    

    urls.forEach(url => {
      const div = document.createElement("div");
      div.textContent = url;
      urlListDiv.appendChild(div);
    });
  });

  openAllBtn.addEventListener("click", () => {
    chrome.storage.local.get("extractedUrls", (data) => {
      const urls = data.extractedUrls || [];
      urls.forEach(url => {
        chrome.tabs.create({ url: url });
      });
    });
  });

  copyAllBtn.addEventListener("click", () => {
    chrome.storage.local.get("extractedUrls", (data) => {
      const urls = data.extractedUrls || [];
      const text = urls.join("\n");
      navigator.clipboard.writeText(text);
      alert("복사 완료!");
    });
  });

  cancelBtn.addEventListener("click", () => {
    window.close();
  });
});
