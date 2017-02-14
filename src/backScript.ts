import * as imgLoader from './lib/BackImgLoader'
let eqdUrl = /https?:\/\/www.equestriadaily.com/
const useSpecialLoad = true

function updateURL(tabID: number) {
    console.log('sending Message')
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

chrome.runtime.onMessage.addListener((message, sender, response) => {
    if('settings' in message)response({sLoad:useSpecialLoad})
})

chrome.tabs.onUpdated.addListener((tabID, change, tab) => {
    let isEQD = eqdUrl.test(tab.url)
    console.log({ isEQD, change })
    if(isEQD && change.status === "complete"){
        updateURL(tabID)
    }
    
    if (isEQD && !imgLoader.tabIsTracked(tabID)) {
        imgLoader.trackTab(tabID)
        if (useSpecialLoad) imgLoader.start()
    }
    else if ((!isEQD || change.status === "complete") && imgLoader.tabIsTracked(tabID)) {
        imgLoader.unTrackTab(tabID)
    }
})
chrome.tabs.onRemoved.addListener(tabID => {
    imgLoader.unTrackTab(tabID)
})

chrome.tabs.query({ url: '*://www.equestriadaily.com/*/**' }, tabs => {
    tabs.forEach(tab => {
        updateURL(tab.id)
    })
    if (tabs.length > 0 && useSpecialLoad) imgLoader.start()
})