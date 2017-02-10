type BlockResp = chrome.webRequest.BlockingResponse;
interface imgContainer {
    tag: HTMLImageElement
    src: string
}
export class ImageLoader {
    private img: imgContainer[]
    private imgL: imgContainer[]
    private imgNum: number
    private imgLNum: number
    private loadingNum: number
    private loadSrc: string
    private allowedURLs:string[]
    private gate = (details: chrome.webRequest.beforeRequest): BlockResp => {
        if (this.imgLNum + (2 * this.imgNum) < 20 || this.allowedURLs.indexOf(details.url)>=0) return
        return { cancel: true }
    }
    constructor(loadSrc: string) {
        this.img = []
        this.imgL = []
        this.allowedURLs=[]
        this.loadSrc = loadSrc
        this.loadingNum = this.imgNum = this.imgLNum = 0
        this.startGate()
    }
    addImage(el: HTMLImageElement, lowPriority?: boolean) {
        console.log('Loading Image')
        if (lowPriority) {
            this.imgLNum++
            if (this.imgLNum > 20){
                this.imgL.push({
                    tag: el,
                    src: el.src
                })
            }
            else{
                this.allowedURLs.push(el.src)
            }
        } else {
            this.imgNum++
            if (this.imgNum > 10){
                this.img.push({
                    tag: el,
                    src: el.src
                })
            }
            else{
                this.allowedURLs.push(el.src)
            }
        }
        el.src = this.loadSrc
        if(el.complete){
            if (lowPriority) this.imgLNum--
            else this.imgNum--
            this.loadNext()
        }
        else el.onload = () => {
            if (lowPriority) this.imgLNum--
            else this.imgNum--
            this.loadNext()
        }
    }
    private loadNext(){
        let imageToLoad:imgContainer
        if(this.imgL.length > 0){
            imageToLoad = this.imgL.shift()
        }else if(this.img.length>0){
            imageToLoad = this.img.shift()
        }
        this.allowedURLs.push(imageToLoad.src)
        imageToLoad.tag.src=imageToLoad.src
    }
    private startGate() {
        chrome.webRequest.onBeforeRequest.addListener(this.gate,
            {
                urls: ['<all_urls>'],
                types: ['image'],
            }, ['blocking'])
    }
    stopGate() {
        chrome.webRequest.onBeforeRequest.removeListener(this.gate)
    }
}