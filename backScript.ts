function updateURL(tabID:number){
    chrome.tabs.sendMessage(tabID,{},labels=>{
        console.log({tabID,labels})
        if(Array.isArray(labels) && labels.length>0){
            chrome.pageAction.show(tabID)
        }
        else{
            chrome.pageAction.hide(tabID)
        }
    })
}
chrome.tabs.onUpdated.addListener((tabID,change,tab)=>{
    if(change.status == "complete")updateURL(tabID);
});
chrome.tabs.query({active:true,currentWindow:true} as chrome.tabs.queryInfo,tabs=>{
    updateURL(tabs[0].id);
})