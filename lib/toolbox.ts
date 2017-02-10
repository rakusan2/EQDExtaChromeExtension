export class ImageGroup {
    src?: string
    imageSrc?: string[]
    title?: string
    author?: string
    num?: number
    loaded: boolean
    numToDist: number
    saucy: boolean
    constructor({src, imageSrc, title, author, num, numToDist}: { src?: string, imageSrc?: string[], title?: string, author?: string, num?: number, numToDist: number }) {
        this.src = src;
        this.imageSrc = imageSrc;
        this.title = title;
        this.author = author;
        this.num = num
        this.loaded = false
        this.numToDist = numToDist
        this.saucy = false
    }
    private imgDiv: HTMLDivElement
    private images: HTMLImageElement[]
    private onLoad: () => any
    divStyle: CSSStyleDeclaration
    private createDiv() {
        let figure = document.createElement('figure'),
            label = document.createElement('figcaption'),
            div = document.createElement('div'),
            loadedChecker = new WhenAllLoaded(() => {
                this.loaded = true;
                if (this.onLoad !== undefined) this.onLoad()
            });
        this.images = []
        this.imageSrc.forEach(src => {
            let imgEl = document.createElement('img')
            imgEl.src = src;
            this.images.push(imgEl)
            figure.appendChild(imgEl)
            if (!imgEl.complete) imgEl.onload = loadedChecker.add()
        })
        label.appendChild(document.createTextNode(
            `[${this.num.toString()}] ${this.title ? this.title : ''}`
        ))
        div.appendChild(label)
        div.appendChild(figure)
        this.imgDiv = div;
        this.divStyle = div.style
        loadedChecker.run()
        return div;
    }
    getDiv() {
        if (this.imgDiv !== undefined) return this.imgDiv
        else return this.createDiv()
    }
    setMax(max: number) {
        if (this.images === undefined) return;
        let sMax = Math.round(max).toString() + "px"
        console.log({ setMax: sMax })
        this.images.forEach(img => {
            img.style.maxHeight = sMax
        })
    }
    whenLoading(preFin: () => () => any) {
        if (!this.loaded) this.onLoad = preFin()
    }
}
export class WhenAllLoaded {
    num: number
    func: () => any
    running = false
    constructor(f: () => any) {
        this.num = 0
        this.func = f
    }
    add() {
        this.num++;
        return () => {
            this.num--;
            if (this.running) this.run()
        }
    }
    run() {
        if (this.num === 0) this.func()
        else this.running = true;
    }
}

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