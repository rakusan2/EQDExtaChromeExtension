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
    constructor(loadSrc: string) {
        this.img = []
        this.imgL = []
        this.loadingH = this.loadingL = 0
        this.loadSrc = loadSrc
    }
    addImage(el: HTMLImageElement, lowPriority?: boolean) {
        if (el.complete) {
            return
        }
        console.log('Loading Image ' + (lowPriority ? 'low' : 'high'))
        let container: imgContainer = { tag: el, src: el.src }
        el.src = this.loadSrc
        if(this.loadingL + (2 * this.loadingH) < 20){
            if(lowPriority){
                this.loadingL++
                this.load(container, true)
            }else{
                this.loadingH++
                this.load(container, false)
            }
        }else{
            if(lowPriority){
                this.imgL.push(container)
            }else{
                this.img.push(container)
            }
        }
    }
    private load(el: imgContainer, low: boolean) {
        let image = new Image()
        image.src = el.src
        image.onload = ev => {
            if (low) this.loadingL--
            else this.loadingH--
            el.tag.src = el.src
            this.loadNext()
            console.log({ onload: ev })
        }
        image.onerror = ev => {
            console.log({ error: ev,mesg:ev.message })
            setTimeout(() => { this.load(el, low) }, 50)
        }
        console.log({ loading: el.src, Low: this.loadingL, high: this.loadingH })
    }
    private loadNext() {
        if (this.loadingL + (2 * this.loadingH) >= 20) return
        if (this.imgL.length > 0) {
            this.loadingL++
            this.load(this.imgL.shift(), true)
        } else if (this.img.length > 0) {
            this.loadingH++
            this.load(this.img.shift(), false)
        }

    }
}