interface blockedTabs {
    [id: number]: {
        passed: number
    }
}
let allowedURLs: string[] = [],
    trackedTabIds: blockedTabs = {},
    listening = false,
    requestBlocker = (details: chrome.webRequest.WebRequestBodyDetails): chrome.webRequest.BlockingResponse => {
        let id = details.tabId,
            inTrackedIds = id in trackedTabIds
        if (inTrackedIds && details.frameId == 0 && allowedURLs.indexOf(details.url) < 0 && trackedTabIds[id].passed > 10) {
            console.log({ block: details.url, allowed: this.allowedURLs })
            return { cancel: true }
        } else if (inTrackedIds && details.frameId == 0) trackedTabIds[id].passed++
    }
export function start() {
    if (listening) return
    listening = true
    chrome.webRequest.onBeforeRequest.addListener(requestBlocker, {
        urls: ['<all_urls>'],
        types: ['image']
    }, ['blocking'])
}
export function stop() {
    if (!listening) return
    listening = false
    chrome.webRequest.onBeforeRequest.removeListener(requestBlocker)
}
export function allowedURL(url: string) {
    allowedURLs.push(url)
}
export function trackTab(id: number) {
    if (id in trackedTabIds) return
    trackedTabIds[id] = {
        passed: 0
    }
}
export function unTrackTab(id: number) {
    if (id in trackedTabIds) delete trackedTabIds[id]
}
export function tabIsTracked(id: number) {
    return id in trackedTabIds
}