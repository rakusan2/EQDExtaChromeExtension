function updateURL(tabID) {
    chrome.tabs.sendMessage(tabID, {}, function (labels) {
        console.log({ tabID: tabID, labels: labels });
        if (Array.isArray(labels) && labels.length > 0) {
            chrome.pageAction.show(tabID);
        }
        else {
            chrome.pageAction.hide(tabID);
        }
    });
}
chrome.tabs.onUpdated.addListener(function (tabID, change, tab) {
    if (change.status == "complete")
        updateURL(tabID);
});
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    updateURL(tabs[0].id);
});
