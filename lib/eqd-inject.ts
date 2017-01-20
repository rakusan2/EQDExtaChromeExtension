import ElementRunner from './ElementRunner'
import {ImageGroup} from './toolbox'
import {Popup}from'./popup'
let sorted: Element[],
    postContent: HTMLCollection,
    commentSection: HTMLDivElement,
    docBody: HTMLBodyElement,
    commentsSource: Window,
    current = 0,
    currentLabels: string[],
    distances: number[] = [],
    adjustBy = 50,
    updateDistOnNextMove = false,
    isSaucy = false,
    commenting = false,
    imgEndings = /\.(png|jpe?g|gif)$/,
    titleExtract = /(?:(.+)\s)?(?:by\s(.+))|(.+)/i,
    visibleCharacter = /[\w!"#$%&'()*+,.\/:;<=>?@\[\]^_`{|}~-]/g,
    images:ImageGroup[]=[],
    popup:Popup;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    currentLabels = getLabels();
    sendResponse(currentLabels);
    if (currentLabels.indexOf("Drawfriend") >= 0) prepare("Drawfriend");
    relocateSettings();
})

interface mesgPopup{
    popup:{
        from:string|number,
        to:string|number,
        x:number,
        y:number
    }
}
interface mesgHidePopup{
    popup:{
        visible:string
    }
}
interface mesgKeys{
    key:string
}
interface mesgClick{
    click:number
}
interface mesgEvent extends MessageEvent{
    data: {
        from:string,
        m:mesgPopup|mesgHidePopup|mesgKeys|mesgClick
    }
}

window.onmessage = (m:mesgEvent) => {
    //console.log({m,dataType:typeof m.data})
    if (m.origin === "https://disqus.com" && (typeof m.data) === "object" && "from" in m.data) {
        console.log({ m, internalData: m.data.m })
        if (commentsSource === undefined) {
            console.log("source is set")
            commentsSource = m.source;
        }
        if ((typeof m.data.m) === "object") {
            if ("key" in m.data.m) {
                keyHandler((<mesgKeys>m.data.m).key)
            }
            else if ("popup" in m.data.m){
                if("visible" in (<mesgHidePopup|mesgPopup>m.data.m).popup){
                    popup.show(false);
                }else{
                    popup.setImgs((<mesgPopup>m.data.m).popup)
                }
            } 
            else if ('click' in m.data.m) goToImg((<mesgClick>m.data.m).click)
        }
    }
}

/** Gets the current Posts Labels */
function getLabels(): string[] {
    let postLabels = document.getElementsByClassName("post-labels")[0].children;
    let labels: string[] = []
    for (let i = 0; i < postLabels.length; i++) {
        labels.push(postLabels[i].textContent)
    }
    console.log({ labels });
    return labels
}

function updateDist() {
    for (let i = 3; i < distances.length; i++) {
        distances[i] = (<HTMLElement>sorted[i]).offsetTop - adjustBy
    }
}

function adjustedPostDist(dist: number) {
    return dist > 0 ? dist : dist * -2
}

function findNearestPos() {
    let pos = docBody.scrollTop,
        cur = adjustedPostDist(pos - distances[current]),
        prev = 0,
        mov = 1

    if (commenting) {
        commenting = pos - distances[distances.length - 2] > 50
    }
    if (commenting) return

    if (current > 0 && adjustedPostDist(pos - distances[current - 1]) < cur) {
        mov = -1
    }
    else if (current < distances.length - 1 && adjustedPostDist(pos - distances[current + 1]) < cur) {
        mov = 1
    }
    else return
    do {
        current += mov;
        prev = cur;
        cur = adjustedPostDist(pos - distances[current])
    } while (cur < prev)
    current -= mov;
    console.log({ current, by: "find", pos, dist: distances[current] })
}
const enum Direction {
    up,
    down
}

let keyfuncs:{[key:string]:()=>any}={
    g:()=>messageToComments("numbers")
}

/** Page Scroll function based on Keyboard keys */
function keyHandler(key: string): boolean {
    console.log({key})
    if(key in keyfuncs) {
        keyfuncs[key]();
        return true
    }else return false
}
//window.scroll({ top: 5 } as ScrollToOptions)

/** Page Image Scroll */
function keyScroll(dir: Direction) {
    if (updateDistOnNextMove) updateDist()
    let difDist = distances[current] - docBody.scrollTop
    if (dir == Direction.up && difDist >= -90) {
        current = Math.max(0, current - 1)
    } else if (dir == Direction.down && difDist <= 90) {
        current = Math.min(sorted.length - 1, current + 1)
    }
    docBody.scrollTop=distances[current]
    //sorted[current].scrollIntoView({behavior:"auto",block:"start"}as ScrollIntoViewOptions)
    //docBody.scrollTop -= current > 0 ? adjustBy : 0;
    console.log({ current, by: "arrow", pos: docBody.scrollTop, dist: distances[current], difDist })
}

interface saucyPost {
    element: Element,
    img: HTMLImageElement,
    text: string
}
let saucyPosts: saucyPost[] = []
function showSaucy(checked: boolean) {
    if (isSaucy === checked) return;
    isSaucy = checked;
    localStorage.setItem("EQD-Saucy", checked.toString())
    console.log('Saucy Event')
    if (checked) {
        if (saucyPosts.length > 0) {
            console.log("injecting known Saucy")
            saucyPosts.forEach(el => {
                el.element.appendChild(el.img)
            })
        } else {
            console.log("injecting unknown Saucy")
            for (let i = 0; i < postContent.length; i++) {

                if (postContent[i].nodeName == "DIV" && postContent[i].children.length > 0 && postContent[i].firstElementChild.children.length == 0) {
                    console.log(postContent[i])
                    let imgElement = document.createElement('img'),
                        anchorElement = <HTMLAnchorElement>postContent[i].firstElementChild;
                    imgElement.src = anchorElement.href
                    saucyPosts.push({
                        element: anchorElement,
                        img: imgElement,
                        text: anchorElement.textContent
                    })
                    anchorElement.appendChild(imgElement);
                }
            }
        }
    }
    else {
        console.log("removing Saucy")
        saucyPosts.forEach(el => {
            el.element.removeChild(el.img)
        })
    }
    updateDistOnNextMove = true;
}

/** Map of Array Preparation Functions */
const preparations = {
    Drawfriend: organizeDF
}
function prepare(type: "Drawfriend") {
    docBody = <HTMLBodyElement>document.body

    commentSection = <HTMLDivElement>document.getElementsByClassName("post-comments")[0]
    keyfuncs['"']=goToComment
    keyfuncs["'"]=goToComment

    let saucyCheck = document.createElement('label'),
        saucyCheckBox = document.createElement('input');
    saucyCheckBox.id = 'setting-show-saucy';
    saucyCheckBox.type = 'checkbox';
    saucyCheckBox.checked = localStorage.getItem('EQD-Saucy') === "true"
    if (type === "Drawfriend") {
        console.log("Add Show Saucy")
        saucyCheckBox.addEventListener('change', function (this: HTMLInputElement) { showSaucy(this.checked) }, false)
    }
    saucyCheck.appendChild(saucyCheckBox);
    saucyCheck.appendChild(document.createTextNode(" Show Saucy"));
    document.getElementsByClassName("settings-content")[0].appendChild(saucyCheck);

    if (sorted !== undefined) return;

    postContent = document.getElementsByClassName("post-body")[0].children
    console.log({children:postContent.length})
    let navbar = <HTMLInputElement>document.getElementById("setting-fixed-navigation-bar")
    navbar.onchange = (ev) => {
        adjustBy = navbar.checked ? 50 : 0
        console.log({ navBarFixed: navbar.checked })
    }
    docBody.onscroll = findNearestPos
    adjustBy = navbar.checked ? 50 : 0
    sorted = preparations[type]()
    popup= new Popup(images,adjustBy)
    keyfuncs['s']=()=>popup.show(true)
    keyfuncs['ArrowUp']=()=> keyScroll(Direction.up)
    keyfuncs['ArrowDown']=()=> keyScroll(Direction.down)

    console.log("sorted")
    console.log({sorted})
    docBody.onkeydown = keyEv => {
        if (keyHandler(keyEv.key)) {
            keyEv.preventDefault()
            keyEv.stopPropagation()
        }
    }
    findNearestPos();
    showSaucy(saucyCheckBox.checked)
    console.log(images)
    console.log("Prepared")
}



/** Organize DrawFriend posts into a array of Elements */
function organizeDF() {
    console.log("organizeDF")
    let lastNumber=0;
    let tempInfo={title:"",author:"",imageSrc:[]as string[]}
    let elements = [docBody, document.getElementsByClassName("blog-post")[0]];
    let unclaimedHR = false, 
        lastHrHeight = 0, 
        lastHR: HTMLHRElement,
        title:RegExpExecArray;
    distances = [0, (<HTMLDivElement>elements[1]).offsetTop - adjustBy]
    let elRunner = new ElementRunner();
    elRunner.add('HR',el=>{
        lastHrHeight = el.offsetTop - adjustBy
        lastHR = el
        unclaimedHR = true;
        tempInfo={title:"",author:"",imageSrc:[]as string[]};
    }).addBranch('B',b=>{
        b.add('A',el=>{
            let innerNumber:RegExpExecArray
            if ((innerNumber=/\d+/.exec(el.innerText))!==null){
                lastNumber=parseInt(innerNumber[0],10)
                console.log({lastNumber})
                images[lastNumber]=new ImageGroup({
                    src:el.href,
                    imageSrc:tempInfo.imageSrc,
                    title:tempInfo.title,
                    author:tempInfo.author,
                    num:lastNumber
                })
            }
            //TODO Add Saucy
        }).add('#text',el=>{
            if((title = titleExtract.exec(el.data))!==null){
                console.log({title,test:el.data})
                if(images[lastNumber]){
                    images[lastNumber].title = title[1] || title[3];
                    images[lastNumber].author = title[2];
                }else{
                    tempInfo.title=title[1] || title[3];
                    tempInfo.author = title[2]
                }
                console.log({title:title[1]||title[3],author:title[2]})
            }
        })
    }).addBranch('DIV',div=>{
        div.addBranch('A',a=>{
            a.add('IMG',el=>{
                console.log('Add Image')
                if (unclaimedHR) {
                    elements.push(lastHR)
                    distances.push(lastHrHeight)
                } else {
                    elements.push(el.parentNode as HTMLAnchorElement)
                    distances.push(el.offsetTop - adjustBy)
                }
                if(images[lastNumber]){
                    images[lastNumber].imageSrc.push(el.src)
                }else tempInfo.imageSrc.push(el.src)
                unclaimedHR = false
            })
        })
    }).add('A',el=>{
        if(imgEndings.test(el.href)){
            if (!visibleCharacter.test(el.innerText)) {
                el.remove()
                console.log('removing')
                return
            }
            let tempDiv = document.createElement('div'),
                parent = el.parentNode
            tempDiv.classList.add('seperator')
            tempDiv.style.clear = "both"
            tempDiv.style.textAlign = "center"
            parent.replaceChild(tempDiv, el)
            tempDiv.appendChild(el)
            console.log("replacing")
            console.log(el)
        }
    }).runCollection(postContent)
    return elements;
}

function relocateSettings() {
    let settings = <HTMLDivElement>document.getElementById('settings')
    settings.parentNode.removeChild(settings);
    document.getElementById('nav-bar').appendChild(settings);
    settings.classList.add("nav-bar-inner")
    settings.style.fontWeight = "normal"
    settings.style.fontSize = "14px"
    settings.style.marginBottom = "1px"
    settings.style.top = "2px"
}

/** Scrols to Comments Section */
function goToComment() {
    if (commenting) {
        docBody.scrollTop = distances[current]
    } else {
        docBody.scrollTop = commentSection.offsetTop;
        messageToComments("click");
    }
    commenting = !commenting
    console.log({ commenting })
}

function goToImg(img: number) {
    //docBody.scrollTop= distances[img]
}


function messageToComments(m) {
    if (commentsSource) {
        commentsSource.postMessage({ from: "EQDExtra", m }, "https://disqus.com")
    }
}


