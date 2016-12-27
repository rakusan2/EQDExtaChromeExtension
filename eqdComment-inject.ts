let commentArea = document.getElementById('conversation') as HTMLDivElement,
    keys = /^ArrowDown|^ArrowUp|^'|^"/
if (window.self !== window.top && /disqus\.com\/embed\/comments/i.test(document.URL)){
    window.onmessage = function(this,ev:MessageEvent){
        if(/equestriadaily\.com/i.test(ev.origin) && (typeof ev.data) === "object"){
            if(ev.data.m === "click")comment();
        }
    }
    messageMain()
    console.log("Extra Comments");
}
let disSendKey = false;
function comment(){
    disSendKey =true;
    console.log("commenting");
    let textarea = <HTMLDivElement> document.getElementsByClassName("textarea")[0];
    textarea.focus()
    console.log(textarea)
    document.body.onkeydown = function(this,ev:KeyboardEvent){
        if(disSendKey)return
        messageMain({key:ev.key})
        if(keys.test(ev.key)){
            ev.preventDefault();
            ev.stopPropagation();
        }
    }
    textarea.onblur= function(this,ev:FocusEvent){
        disSendKey = false
    }
    textarea.onkeydown = function(this,ev:KeyboardEvent){
        if(ev.key === "Escape"){
            document.getElementById('posts').focus()
            this.blur()
            ev.preventDefault()
            ev.stopPropagation()
        }
    }
}
interface message{
    from:string,
    m?
}
function messageMain(m?){
    let message:message ={from:"EQDComments"};
    if(m !== undefined)message.m=m
    console.log(message)
    parent.window.postMessage(message,"http://www.equestriadaily.com")
}