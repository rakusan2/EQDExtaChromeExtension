let commentArea = document.getElementById('conversation') as HTMLDivElement
const keys = /^(ArrowDown|ArrowUp|'|"|g)$/,
    commentNumbers = /(?::|#|are|(?:\b|\D)(?:(?:\d{1,2}|1\d{2})\b(?:\s?-\s?(?:\d{1,2}|1\d{2})(?=\D))?)?\s?(?:and|&)|(?:\b|\D)(?:\d{1,2}|1\d{2})\b(?:\s?-\s?(?:\d{1,2}|1\d{2})(?=\D))?\s?,)\s?(?:\d{1,2}|1\d{2})\b(?:\s?-\s?(?:\d{1,2}|1\d{2})(?=\D))?(?:\s?,\s?(?:\d{1,2}|1\d{2})(?:(?=\D)|$)(?:\s?-\s?(?:\d{1,2}|1\d{2})(?:(?=\D)|$))?)*|^\s?(?:\d{1,2}|1\d{2})\b(?:\s?-\s?(?:\d{1,2}|1\d{2}))?\s?(?:\.(?=\D)|$|:)/gi,
    extractNumber=/(\d+)(?:\s?-\s?(\d+))?/g

if (window.self !== window.top && /disqus\.com\/embed\/comments/i.test(document.URL)){
    window.onmessage = function(this,mesg:MessageEvent){
        if(/equestriadaily\.com/i.test(mesg.origin) && (typeof mesg.data) === "object"){
            if(mesg.data.m === "click")comment();
            if(mesg.data.m === "numbers")getNumbers()
        }
    }
    messageMain()
    console.log("Extra Comments");
}
let disSendKey = false;
function comment(){
    disSendKey =true;
    console.log("commenting");
    let textareaGroup = document.getElementsByClassName("textarea");
    if (textareaGroup.length == 0)return;
    let textarea = <HTMLDivElement>textareaGroup[0];
    textarea.focus()
    console.log(textarea)
    document.body.onkeydown = function(this,ev:KeyboardEvent){
        if(disSendKey)return
        messageMain({key:ev.key})
        if(ev.key == "g")getNumbers()
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

function getNumbers(){
    let messages = document.getElementsByClassName('post-message'),
        paragraphs:HTMLCollection,
        sentences:NodeList,
        m:RegExpExecArray,
        num:RegExpExecArray
    for(let i =0;i<messages.length;i++){
        paragraphs = messages[i].children
        for(let ii = 0; ii<paragraphs.length;ii++){
            sentences = paragraphs[ii].childNodes;
            for(let node = 0;node<sentences.length;node++){
                if(sentences[node].nodeName === "#text"){
                    let nodeText = sentences[node].textContent,
                        lastEnd=0,
                        fragment:DocumentFragment;
                    while((m=commentNumbers.exec(nodeText)) !== null){
                        while((num=extractNumber.exec(m[0])) !== null){
                            if(!fragment)fragment = document.createDocumentFragment()
                            if(m.index+num.index>lastEnd){
                                fragment.appendChild(document.createTextNode(nodeText.substring(lastEnd,m.index+num.index)))
                            }
                            let textN = document.createTextNode(num[0]),
                                span = document.createElement('span')
                            span.classList.add('imgNumber')
                            span.dataset["from"]=num[1];
                            span.onmouseover = numHover;
                            span.onclick = numClick;
                            if(num[2])span.dataset["to"]=num[2];
                            span.appendChild(textN);
                            fragment.appendChild(span);
                            lastEnd=m.index+num.index+num[0].length
                        }
                    }
                    if(fragment){
                        fragment.appendChild(document.createTextNode(nodeText.substring(lastEnd)))
                        paragraphs[ii].replaceChild(fragment,sentences[node]);
                    }
                }
            }
        }
    }
}

function numHover(this:HTMLSpanElement, ev:MouseEvent){
    messageMain({popup:{from:this.dataset["from"],to:this.dataset['to'],loc:{x:ev.screenX,y:ev.screenY}}});
}
function numClick(this:HTMLDivElement,ev:MouseEvent){
    messageMain({click:parseInt(this.dataset['from'])})
}