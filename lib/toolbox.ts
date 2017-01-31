export class ImageGroup {
    src?: string
    imageSrc?: string[]
    title?: string
    author?: string
    num?: number
    loaded: boolean
    numToDist: number
    saucy:boolean
    constructor({src, imageSrc, title, author, num, numToDist}: { src?: string, imageSrc?: string[], title?: string, author?: string, num?: number, numToDist: number }) {
        this.src = src;
        this.imageSrc = imageSrc;
        this.title = title;
        this.author = author;
        this.num = num
        this.loaded = false
        this.numToDist = numToDist
        this.saucy=false
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

export class ImageLoader{
    private img:{
        tag:HTMLImageElement
        src:string
    }[]
    private loadingNum:number
    private loadSrc:string
    constructor(loadSrc:string){
        this.img=[]
        this.loadSrc = loadSrc
        this.loadingNum =0
    }
    addImage(el:HTMLImageElement){
        console.log('Loading Image')
        let src = el.src;
        el.src = this.loadSrc
        //if(this.loadingNum < 5){
        //    
        //}else{
        //    this.img.push({
        //        tag:el,
        //        src:el.src
        //    })
        //}
        //el.src=this.loadSrc
    }
}