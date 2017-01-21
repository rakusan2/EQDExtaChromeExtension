import { ImageGroup, WhenAllLoaded } from './toolbox'
export class Popup {
    popupDiv: HTMLDivElement
    private adjustHeight: number
    private last: { from: number, to: number }
    private images: ImageGroup[]
    constructor(images: ImageGroup[], adjust: number) {
        this.last = { from: 0, to: 0 }
        this.images = images;
        this.popupDiv = document.createElement('div')
        this.popupDiv.classList.add('imgPopup')
        document.body.appendChild(this.popupDiv)
        this.adjustHeight = adjust
    }
    private removeChildren() {
        while (this.popupDiv.firstChild) {
            this.popupDiv.removeChild(this.popupDiv.firstChild)
        }
    }
    setMaxHeight(height: number) {
        this.adjustHeight = height
    }
    setLoc(x: number, y: number) {
        let wx = window.innerWidth, wy = window.innerHeight;
        let divHeight = this.popupDiv.getBoundingClientRect().height,
            moveBy = wy - y - divHeight / 2;
        console.log({ wx, wy, divHeight, moveBy, x, y })
        if (moveBy <= 20) this.popupDiv.style.bottom = "20px"
        else if (y - divHeight / 2 < this.adjustHeight + 20) this.popupDiv.style.bottom = (wy - divHeight - this.adjustHeight - 20).toString() + "px"
        else this.popupDiv.style.bottom = moveBy.toString() + "px"
    }
    show(show: boolean) {
        let shown = this.popupDiv.classList.contains('show');
        if (show !== shown) {
            console.log({ show, shown })
            if (show) {
                this.popupDiv.classList.add('show')
            } else {
                this.popupDiv.classList.remove('show')
            }
        }
    }
    setImgs(popInfo: popupInfo) {
        console.log({ popInfo })
        let from: number, to: number, numOfI: number;
        if (typeof popInfo.from === "string") from = parseInt(popInfo.from, 10)
        else from = popInfo.from
        if (typeof popInfo.to === "string") to = parseInt(popInfo.to, 10)
        else to = popInfo.to
        console.log({ from, to });
        if (to === undefined) to = from;
        numOfI = to - from + 1
        if (this.last.from === from && this.last.to === to) {
            this.show(true)
            this.setLoc(popInfo.x, popInfo.y)
            return
        }
        let scrollBars = 0;
        for (let i = from; i <= to; i++) {
            if (this.images[i] !== undefined && this.images[i].imageSrc.length > 1) scrollBars += 17
        }
        console.log({ height: window.innerHeight, adjust: this.adjustHeight, scrollBars, numOfI })
        let maxHeight = (window.innerHeight - this.adjustHeight - 60 - scrollBars - (numOfI - 1) * 21) / numOfI - 23;
        console.log({ maxHeight })
        this.removeChildren()
        let imageLoadCheck = new WhenAllLoaded(() => {
            this.setLoc(popInfo.x, popInfo.y)
        })
        let added = 0;
        for (let i = from; i <= to; i++) {
            if (this.images[i] === undefined) continue
            this.popupDiv.appendChild(this.images[i].getDiv());
            if (to !== i) this.popupDiv.appendChild(document.createElement('hr'))
            this.images[i].setMax(maxHeight)
            this.images[i].whenLoading(imageLoadCheck.add)
            console.log({ append: i })
            added++;
        }
        if (added === 0) return
        this.last = { from, to }
        imageLoadCheck.run()
        this.show(true)
    }
}

export interface popupInfo {
    from: string | number,
    to: string | number,
    x: number,
    y: number
}