let sorted:Element[],
    postContent:HTMLCollection,
    commentSection:HTMLDivElement,
    docBody :HTMLBodyElement,
    commentsSource:Window,
    current = 0,
    currentLabels:string[],
    distances:number[] = [],
    adjustBy=50,
    updateDistOnNextMove=false,
    isSaucy=false,
    commenting=false;

chrome.runtime.onMessage.addListener((message,sender, sendResponse)=>{
    currentLabels = getLabels();
    sendResponse(currentLabels);
    if(currentLabels.indexOf("Drawfriend")>=0)prepare("Drawfriend");
    relocateSettings();
})

window.onmessage = m => {
    if(m.origin === "https://disqus.com" && (typeof m.data) === "object" &&  "from" in m.data )
    console.log(m)
    commentsSource = m.source;
    if(m.data.m === "focus"){
        docBody.focus();
        console.log("focusing")
    }
}

/** Gets the current Posts Labels */
function getLabels():string[]{
    let postLabels = document.getElementsByClassName("post-labels")[0].children;
    let labels:string[] = []
    for(let i =0;i<postLabels.length;i++){
        labels.push(postLabels[i].textContent)
    }
    console.log({labels});
    return labels
}

function updateDist(){
    for(let i=3;i<distances.length;i++){
        distances[i]=(<HTMLElement>sorted[i]).offsetTop-adjustBy
    }
}

function adjustedPostDist(dist:number){
    return dist > 0 ? dist : dist * -2
}

function findNearestPos(){
    let pos=docBody.scrollTop,
        cur = adjustedPostDist(pos-distances[current]),
        prev=0,
        mov=1

    if(commenting){
        commenting = pos-distances[distances.length-2] > 50
    }
    if(commenting)return

    if(current>0 && adjustedPostDist(pos-distances[current-1]) < cur){
        mov=-1
    }
    else if(current<distances.length-1 && adjustedPostDist(pos-distances[current+1])<cur){
        mov=1
    }
    else return
    do{
        current+=mov;
        prev=cur;
        cur=adjustedPostDist(pos-distances[current])
    }while(cur<prev)
    current-=mov;
    console.log({current,by:"find",pos,dist:distances[current]})
}
const enum Direction{
    up,
    down
}
/** Page Scroll function based on Keyboard keys */
function keyHandler(key:string):boolean{
    let status =false;
    console.log(key)

    // Scroll Direction Keys
    if(sorted !== undefined){
        if(key == "ArrowUp"){
            keyScroll(Direction.up)
            status=true
        }else if(key == "ArrowDown"){
            keyScroll(Direction.down)
            status=true
        }
    }

    // Comment Section Keys
    if(commentSection !== undefined && ( key == "'" || key == '"')){
        goToComment()
        status = true;
    }
    return status;
}

/** Page Image Scroll */
function keyScroll(dir:Direction){
    if(updateDistOnNextMove)updateDist()
    if(dir == Direction.up){
        current=Math.max(0,current-1)
    }else{
        current=Math.min(sorted.length-1,current+1)
    }
    sorted[current].scrollIntoView({behavior:"auto",block:"start"}as ScrollIntoViewOptions)
    docBody.scrollTop-=current>0?adjustBy:0;
    console.log({current,by:"arrow",pos:docBody.scrollTop,dist:distances[current]})
}

interface saucyPost{
    element:Element,
    img:HTMLImageElement,
    text:string
}
let saucyPosts:saucyPost[] =[]
function showSaucy(checked:boolean){
    if(isSaucy === checked)return;
    isSaucy=checked;
    localStorage.setItem("EQD-Saucy",checked.toString())
    console.log('Saucy Event')
    if(checked){
        if(saucyPosts.length>0){
            console.log("injecting known Saucy")
            saucyPosts.forEach(el=>{
                el.element.appendChild(el.img)
            })
        }else{
            console.log("injecting unknown Saucy")
            for(let i=0;i<postContent.length;i++){
                if(postContent[i].nodeName == "DIV" && postContent[i].firstElementChild.children.length==0){
                    let imgElement = document.createElement('img'),
                        anchorElement = <HTMLAnchorElement>postContent[i].firstElementChild;
                    imgElement.src = anchorElement.href
                    saucyPosts.push({
                        element:anchorElement,
                        img:imgElement,
                        text:anchorElement.textContent
                    })
                    anchorElement.appendChild(imgElement);
                }
            }
        }
    }
    else{
        console.log("removing Saucy")
        saucyPosts.forEach(el=>{
            el.element.removeChild(el.img)
        })
    }
    updateDistOnNextMove=true;
}

/** Map of Array Preparation Functions */
const preparations = {
    Drawfriend:organizeDF
}
function prepare(type:"Drawfriend"){
    docBody = <HTMLBodyElement> document.body

    commentSection = <HTMLDivElement> document.getElementsByClassName("post-comments")[0]

    let saucyCheck = document.createElement('label'),
        saucyCheckBox = document.createElement('input');
    saucyCheckBox.id = 'setting-show-saucy';
    saucyCheckBox.type='checkbox';
    saucyCheckBox.checked = localStorage.getItem('EQD-Saucy') === "true"
    if(type ==="Drawfriend"){
        console.log("Add Show Saucy")
        saucyCheckBox.addEventListener('change',function(this:HTMLInputElement){showSaucy(this.checked)},false)
    }
    saucyCheck.appendChild(saucyCheckBox);
    saucyCheck.appendChild(document.createTextNode(" Show Saucy"));
    document.getElementsByClassName("settings-content")[0].appendChild(saucyCheck);

    if(sorted)return;

    postContent = document.getElementsByClassName("post-body")[0].children
    let navbar = <HTMLInputElement>document.getElementById("setting-fixed-navigation-bar")
    navbar.onchange=(ev)=>{
        adjustBy=navbar.checked?50:0
        console.log({navBarFixed:navbar.checked})
    }
    docBody.onscroll = findNearestPos
    adjustBy=navbar.checked?50:0
    sorted = preparations[type]()
    console.log("sorted")
    console.log(sorted)
    docBody.onkeydown = keyEv =>{
        if(keyHandler(keyEv.key)){
            keyEv.preventDefault()
            keyEv.stopPropagation()
        }
    }
    findNearestPos();
    showSaucy(saucyCheckBox.checked)
}
/** Organize DrawFriend posts into a array of Elements */
function organizeDF(){
    let element:HTMLHRElement, elements = [docBody,document.getElementsByClassName("blog-post")[0],postContent[0]];
    let last=0;
    distances =[0,(<HTMLDivElement>elements[1]).offsetTop-adjustBy,(<HTMLDivElement>elements[2]).offsetTop-adjustBy]
    for(let i =1;i<postContent.length;i++){
        element=postContent[i]as HTMLHRElement
        if(element.nodeName=="HR"){
            if(i-last>2){
                elements.push(element);
                distances.push(element.offsetTop-adjustBy)
            }
            else{
                elements[elements.length-1]=element
                distances[elements.length-1]= element.offsetTop-adjustBy
            }
            last=i
        }
    }
    return elements;
}

function relocateSettings(){
    let settings = <HTMLDivElement>document.getElementById('settings')
    settings.parentNode.removeChild(settings);
    document.getElementById('nav-bar').appendChild(settings);
    settings.classList.add("nav-bar-inner")
    settings.style.fontWeight="normal"
    settings.style.fontSize="14px"
    settings.style.marginBottom="1px"
    settings.style.top="2px"
}

/** Scrols to Comments Section */
function goToComment(){
    if(commenting){
        docBody.scrollTop = distances[current]
    }else{
        docBody.scrollTop = commentSection.offsetTop;
        messageToComments("click");
    }
    commenting = !commenting 
    console.log({commenting})
}

function messageToComments(m){
    if(commentsSource){
        commentsSource.postMessage({from:"EQDExtra",m},"https://disqus.com")
    }
}