function updateURL(tabID:number){
    chrome.tabs.sendMessage(tabID,{},address=>{
    })
}
chrome.tabs.onUpdated.addListener((tabID,change,tab)=>{
    if(change.status == "complete")updateURL(tabID);
});
chrome.tabs.query({active:true,currentWindow:true} as chrome.tabs.queryInfo,tabs=>{
    updateURL(tabs[0].id);
})