function updateURL(tabID) {
    chrome.tabs.sendMessage(tabID, {}, function (address) {
    });
}
chrome.tabs.onUpdated.addListener(function (tabID, change, tab) {
    if (change.status == "complete")
        updateURL(tabID);
});
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    updateURL(tabs[0].id);
});
