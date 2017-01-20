export class ImageGroup {
    src?: string
    imageSrc?: string[]
    title?: string
    author?: string
    num?: number
    loaded: boolean
    constructor({src, imageSrc, title, author, num}: { src?: string, imageSrc?: string[], title?: string, author?: string, num?: number }) {
        this.src = src;
        this.imageSrc = imageSrc;
        this.title = title;
        this.author = author;
        this.num = num
        this.loaded = false
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