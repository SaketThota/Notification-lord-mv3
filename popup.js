chrome.action.onClicked.addListener(function (tab) {
    chrome.action.setTitle({ tabId: tab.id, title: "You are on tab:" + tab.id });
});