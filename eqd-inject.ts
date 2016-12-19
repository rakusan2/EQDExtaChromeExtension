chrome.runtime.onMessage.addListener((message,sender, sendResponse)=>{
    sendResponse(getLabels())
})
document.body.onkeydown = keyEv =>{
    keyEv.preventDefault()
    keyEv.stopPropagation()
    if(keyEv.key == "ArrowDown" || keyEv.key == "ArrowUp")scrollP(keyEv.key);
}
let sorted:Element[];
let current = 0;
function getLabels():string[]{
    let postLabels = document.getElementsByClassName("post-labels")[0].children;
    let labels:string[] = []
    for(let i =0;i<postLabels.length;i++){
        labels.push(postLabels[i].textContent)
    }
    if(labels.indexOf("Drawfriend")>=0)prepare("Drawfriend");
    console.log({labels});
    return labels
}
function scrollP(key:string){
    if(key == "ArrowDown"){
        current=Math.min(sorted.length-1,current+1)
    }else if(key == "ArrowUp"){
        current=Math.max(0,current-1)
    }
    if(sorted !==undefined)sorted[current].scrollIntoView({behavior:"auto",block:"start"}as ScrollIntoViewOptions)
}
const preparations = {
    Drawfriend:organizeDF
}
function prepare(type:"Drawfriend"){
    console.log("preparing")
    if(sorted)return;
    sorted = preparations[type]()
    console.log("sorted")
    console.log(sorted)
}
function organizeDF(){
    let body = document.getElementsByClassName("post-body")[0].children
    let elements = [body[0]];
    let last=0
    for(let i =1;i<body.length;i++){
        if(i-last>2 && body[i].nodeName=="HR"){
            last=i
            elements.push(body[i]);
            console.log(i);
        }
    }
    return elements;
}