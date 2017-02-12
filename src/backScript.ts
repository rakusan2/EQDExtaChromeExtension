import * as imgLoader from './lib/BackImgLoader'
let eqdUrl = /https?:\/\/www.equestriadaily.com/

function updateURL(tabID: number) {
    chrome.tabs.sendMessage(tabID, {}, labels => {
        console.log({ tabID, labels })
        if (Array.isArray(labels) && labels.length > 0) {
            chrome.pageAction.show(tabID)
        }
        else {
            chrome.pageAction.hide(tabID)
        }
    })
}

chrome.runtime.onMessage.addListener((message,sender,response)=>{
        if("url" in message){
            imgLoader.allowedURL(message.url)
            response("added")
        }
})

chrome.tabs.onUpdated.addListener((tabID, change, tab) => {
    let isEQD = eqdUrl.test(tab.url)

    if (isEQD && !imgLoader.tabIsTracked(tabID)) {
        imgLoader.trackTab(tabID)
        updateURL(tabID)
        imgLoader.start()
    }
    else if ((!isEQD || change.status === "complete") && imgLoader.tabIsTracked(tabID)) {
        imgLoader.unTrackTab(tabID)
        chrome.pageAction.hide(tabID)
    }
})
chrome.tabs.onRemoved.addListener(tabID=>{
    imgLoader.unTrackTab(tabID)
})

chrome.tabs.query({ url: '*://www.equestriadaily.com/*/**' }, tabs => {
    tabs.forEach(tab => {
        updateURL(tab.id)
    })
    if (tabs.length > 0) imgLoader.start()
})