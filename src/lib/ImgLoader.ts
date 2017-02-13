interface imgContainer {
    tag: HTMLImageElement
    src: string
}
export class ImageLoader {
    private img: imgContainer[]
    private imgL: imgContainer[]
    private loadingL: number
    private loadingH: number
    private loadSrc: string
    private allowLoad: (src: string, done?: () => any) => any
    constructor(loadSrc: string, allowLoad: (src: string, done?: () => any) => any) {
        this.img = []
        this.imgL = []
        this.loadingH = this.loadingL = 0
        this.loadSrc = loadSrc
        this.allowLoad = allowLoad
    }
    addImage(el: HTMLImageElement, lowPriority?: boolean) {
        if (el.complete) {
            this.allowLoad(el.src)
            return
        }
        console.log('Loading Image')
        let container: imgContainer = { tag: el, src: el.src }
        if (lowPriority) {
            if (this.loadingL < 20) {
                this.loadingL++
                this.load({ tag: el, src: el.src }, true)
            } else {
                el.src = this.loadSrc
                this.imgL.push(container)
            }
        } else {
            if (this.loadingH < 20) {
                this.loadingH++
                this.load({ tag: el, src: el.src }, false)
            } else {
                el.src = this.loadSrc
                this.img.push(container)
            }
        }
    }
    private load(el: imgContainer, low: boolean) {
        this.allowLoad(el.src, () => {
            el.tag.src = el.src
            let image = new Image()
            image.src = el.src
            image.onload = ev => {
                if (low) this.loadingL--
                else this.loadingH--
                this.loadNext()
                console.log({ onload: ev })
            }
            image.onerror = ev => {
                console.log({ error: ev })
                setTimeout(() => { this.load(el, low) }, 5)
            }
            console.log({ loading: el.src, done: image.complete })
        })
    }
    private loadNext() {
        if (this.loadingL + (2 * this.loadingH) > 20) return
        if (this.imgL.length > 0) {
            this.load(this.imgL.shift(), true)
        } else if (this.img.length > 0) {
            this.load(this.img.shift(), false)
        }

    }
}