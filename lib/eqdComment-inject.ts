import {ElementRunner} from './ElementRunner';
const keys = /^(ArrowDown|ArrowUp|'|"|g)$/,
    commentNumbers = /(fi(?:m|endship)\s?)?(?::|#|are|(?:\b|\D)(?:(?:1?\d{1,2})\b(?:\s?-\s?(?:1?\d{1,2})(?=\D))?)?\s?(?:and|&)|(?:\b|\D)(?:1?\d{1,2})\b(?:\s?-\s?(?:1?\d{1,2})(?=\D))?\s?,)\s?(?:1?\d{1,2})(?:\b|\D)(?:\s?-\s?(?:1?\d{1,2})(?=\D))?(?:\s?,\s?(?:1?\d{1,2})(?:(?=\D)|$)(?:\s?-\s?(?:1?\d{1,2})(?:(?=\D)|$))?)*|^\s?(?:1?\d{1,2})\b(?:\s?-\s?(?:1?\d{1,2}))?\s?(?:\.(?=\D)|$|:)/gi,
    extractNumber = /(\d+)(?:\s?-\s?(\d+))?/g
let hasNumbers = false;

if (window.self !== window.top) {
    window.onmessage = function (this, mesg: MessageEvent) {
        //console.log({from:mesg.origin,data:mesg.data});
        if (/equestriadaily\.com/i.test(mesg.origin) && (typeof mesg.data === "object")) {
            if (mesg.data.m === "click") comment();
            if (mesg.data.m === "numbers") getNumbers()
        }
    }
    messageMain()
    console.log("Extra Comments");
}
let disSendKey = false;
function comment() {
    disSendKey = true;
    console.log("commenting");
    let textareaGroup = document.getElementsByClassName("textarea");
    if (textareaGroup.length == 0) return;
    let textarea = <HTMLDivElement>textareaGroup[0];
    textarea.focus()
    console.log(textarea)
    document.body.onkeydown = function (this, ev: KeyboardEvent) {
        if (disSendKey) return
        messageMain({ key: ev.key })
        if (ev.key == "g") getNumbers()
        if (keys.test(ev.key)) {
            ev.preventDefault();
            ev.stopPropagation();
        }
    }
    textarea.onblur = function (this, ev: FocusEvent) {
        disSendKey = false
    }
    textarea.onkeydown = function (this, ev: KeyboardEvent) {
        if (ev.key === "Escape") {
            document.getElementById('posts').focus()
            this.blur()
            ev.preventDefault()
            ev.stopPropagation()
        }
    }
}
interface message {
    from: string,
    m?
}
function messageMain(m?) {
    let message: message = { from: "EQDComments" };
    if (m !== undefined) message.m = m
    console.log(message)
    parent.window.postMessage(message, "http://www.equestriadaily.com")
}

function getNumbers() {
    if (hasNumbers) return;
    hasNumbers = true
    let messages = document.getElementsByClassName('post-message'),
        m: RegExpExecArray,
        num: RegExpExecArray,
        elRunner = new ElementRunner();
    elRunner.addBranch('DIV', div => {
        div.addBranch('P', p => {
            p.add('#text', el => {
                let nodeText = el.data,
                    lastEnd = 0,
                    fragment: DocumentFragment;
                while ((m = commentNumbers.exec(nodeText)) !== null) {
                    if (m[1] !== undefined) continue
                    while ((num = extractNumber.exec(m[0])) !== null) {
                        if (fragment === undefined) fragment = document.createDocumentFragment()
                        if (m.index + num.index > lastEnd) {
                            fragment.appendChild(document.createTextNode(nodeText.substring(lastEnd, m.index + num.index)))
                        }
                        let textN = document.createTextNode(num[0]),
                            span = document.createElement('span')
                        span.classList.add('imgNumber')
                        span.dataset["from"] = num[1];
                        span.onmouseover = numHover;
                        span.onmouseleave = numLeave
                        span.onclick = numClick;
                        if (num[2] !== undefined) {
                            if (num[2] > num[1]) span.dataset["to"] = num[2];
                            else {
                                span.dataset['to'] = num[1];
                                span.dataset['from'] = num[2];
                            }
                        }
                        span.appendChild(textN);
                        fragment.appendChild(span);
                        lastEnd = m.index + num.index + num[0].length
                    }
                }
                if (fragment !== undefined) {
                    console.log({ nodeText })
                    fragment.appendChild(document.createTextNode(nodeText.substring(lastEnd)))
                    el.parentNode.replaceChild(fragment, el);
                }
            })
        }, true)
    }).runCollection(messages);
}

function numHover(this: HTMLSpanElement, ev: MouseEvent) {
    messageMain({ popup: { from: this.dataset["from"], to: this.dataset['to'], x: ev.screenX, y: ev.screenY } });
}
function numLeave(this: HTMLSpanElement, ev: MouseEvent) {
    messageMain({ popup: { visible: "none" } })
}
function numClick(this: HTMLDivElement, ev: MouseEvent) {
    messageMain({ click: parseInt(this.dataset['from']) })
}