let sorted:Element[],
    current = 0,
    currentLabels:string[],
    adjustBy=50;

chrome.runtime.onMessage.addListener((message,sender, sendResponse)=>{
    currentLabels = getLabels();
    sendResponse(currentLabels);
    if(currentLabels.indexOf("Drawfriend")>=0)prepare("Drawfriend");
})

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
/** Page Scroll function based on Keyboard keys */
function scrollP(key:string):boolean{
    if(sorted ===undefined)return false;
    if(key == "ArrowDown"){
        current=Math.min(sorted.length-1,current+1)
    }else if(key == "ArrowUp"){
        current=Math.max(0,current-1)
    }
    else return false;
    sorted[current].scrollIntoView({behavior:"auto",block:"start"}as ScrollIntoViewOptions)
    document.body.scrollTop-=current>0?adjustBy:0;
    return true
}
/** Map of Array Preparation Functions */
const preparations = {
    Drawfriend:organizeDF
}
function prepare(type:"Drawfriend"){
    if(sorted)return;
    sorted = preparations[type]()
    console.log("sorted")
    console.log(sorted)
    document.body.onkeydown = keyEv =>{
        if(scrollP(keyEv.key)){
            keyEv.preventDefault()
            keyEv.stopPropagation()
        }
    }
    let navbar = <HTMLInputElement>document.getElementById("setting-fixed-navigation-bar")
    navbar.onchange=(ev)=>{
        adjustBy=navbar.checked?50:0
        console.log({navBarFixed:navbar.checked})
    }
    adjustBy=navbar.checked?50:0
}
/** Organize DrawFriend posts into a array of Elements */
function organizeDF(){
    let body = document.getElementsByClassName("post-body")[0].children
    let element:HTMLHRElement, elements = [document.body,document.getElementsByClassName("blog-post")[0],body[0]];
    let last=0,closestD=Math.abs(body[0].getBoundingClientRect().top),closest=0
    for(let i =1;i<body.length;i++){
        element=body[i]as HTMLHRElement
        if(element.nodeName=="HR"){
            let eTop  = Math.abs(element.getBoundingClientRect().top)
            console.log({eTop,current:elements.length})
            if(element.scrollTop>=0 && eTop<closestD){
                closest=elements.length-(i-last<=2?1:0);
                closestD=eTop;
            }
            if(i-last>2){
                elements.push(element);
            }
            else{
                elements[elements.length-1]=element
            }
            last=i
        }
    }
    current=closest;
    console.log({current})
    return elements;
}