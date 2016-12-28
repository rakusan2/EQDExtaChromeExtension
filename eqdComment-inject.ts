let commentArea = document.getElementById('conversation') as HTMLDivElement
const keys = /^(ArrowDown|ArrowUp|'|"|g)$/,
    commentNumbers = /(?::|#|are|and)\s?(\d+(?:\s?-\s?\d+)?(?:\s?,\s?\d+(?:\s?-\s?\d+)?)*)|^\s?(\d+)\s?(?:\.\s|$)/g,
    extractNumber=/(\d+)\s?(?:-\s?(\d+))?/g

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
                            span.style.color="#cb682b",
                            span.style.fontWeight="bold"
                            span.appendChild(textN);
                            fragment.appendChild(span);
                            lastEnd=m.index+num.index+num[0].length
                            console.log(num)
                        }
                        console.log(m)
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