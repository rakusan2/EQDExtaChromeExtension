let commentArea = document.getElementById('conversation') as HTMLDivElement
if (window.self !== window.top && /disqus\.com\/embed\/comments/i.test(document.URL)){
    window.onmessage = function(this,ev:MessageEvent){
        if(/equestriadaily\.com/i.test(ev.origin) && (typeof ev.data) === "object"){
            if(ev.data.m === "click")comment();
        }
    }
    messageMain()
    console.log("Extra Comments");
}

function comment(){
    console.log("commenting");
    let textarea = <HTMLDivElement> document.getElementsByClassName("textarea")[0]
    textarea.focus()
    console.log(textarea)
    textarea.onblur= function(this,ev:FocusEvent){
        console.log("blur")
        messageMain('focus');
    }
    textarea.onkeydown = function(this,ev:KeyboardEvent){
        if(ev.key === "Escape")this.blur()
    }
}

function messageMain(m?){
    window.top.postMessage({from:"EQDComments",m},"http://www.equestriadaily.com")
}