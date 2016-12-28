var commentArea = document.getElementById('conversation');
var keys = /^(ArrowDown|ArrowUp|'|"|g)$/, commentNumbers = /(?::|#|are|and)\s?(\d+(?:\s?-\s?\d+)?(?:\s?,\s?\d+(?:\s?-\s?\d+)?)*)|^\s?(\d+)\s?(?:\.\s|$)/g, extractNumber = /(\d+)\s?(?:-\s?(\d+))?/g;
if (window.self !== window.top && /disqus\.com\/embed\/comments/i.test(document.URL)) {
    window.onmessage = function (mesg) {
        if (/equestriadaily\.com/i.test(mesg.origin) && (typeof mesg.data) === "object") {
            if (mesg.data.m === "click")
                comment();
            if (mesg.data.m === "numbers")
                getNumbers();
        }
    };
    messageMain();
    console.log("Extra Comments");
}
var disSendKey = false;
function comment() {
    disSendKey = true;
    console.log("commenting");
    var textarea = document.getElementsByClassName("textarea")[0];
    textarea.focus();
    console.log(textarea);
    document.body.onkeydown = function (ev) {
        if (disSendKey)
            return;
        messageMain({ key: ev.key });
        if (ev.key == "g")
            getNumbers();
        if (keys.test(ev.key)) {
            ev.preventDefault();
            ev.stopPropagation();
        }
    };
    textarea.onblur = function (ev) {
        disSendKey = false;
    };
    textarea.onkeydown = function (ev) {
        if (ev.key === "Escape") {
            document.getElementById('posts').focus();
            this.blur();
            ev.preventDefault();
            ev.stopPropagation();
        }
    };
}
function messageMain(m) {
    var message = { from: "EQDComments" };
    if (m !== undefined)
        message.m = m;
    console.log(message);
    parent.window.postMessage(message, "http://www.equestriadaily.com");
}
function getNumbers() {
    var messages = document.getElementsByClassName('post-message'), paragraphs, sentences, m, num;
    for (var i = 0; i < messages.length; i++) {
        paragraphs = messages[i].children;
        for (var ii = 0; ii < paragraphs.length; ii++) {
            sentences = paragraphs[ii].childNodes;
            for (var node = 0; node < sentences.length; node++) {
                if (sentences[node].nodeName === "#text") {
                    var nodeText = sentences[node].textContent, lastEnd = 0, fragment = void 0;
                    while ((m = commentNumbers.exec(nodeText)) !== null) {
                        while ((num = extractNumber.exec(m[0])) !== null) {
                            if (!fragment)
                                fragment = document.createDocumentFragment();
                            if (m.index + num.index > lastEnd) {
                                fragment.appendChild(document.createTextNode(nodeText.substring(lastEnd, m.index + num.index)));
                            }
                            var textN = document.createTextNode(num[0]), span = document.createElement('span');
                            span.classList.add('imgNumber');
                            span.dataset["from"] = num[1];
                            span.onmouseover = numHover;
                            if (num[2])
                                span.dataset["to"] = num[2];
                            span.appendChild(textN);
                            fragment.appendChild(span);
                            lastEnd = m.index + num.index + num[0].length;
                        }
                    }
                    if (fragment) {
                        fragment.appendChild(document.createTextNode(nodeText.substring(lastEnd)));
                        paragraphs[ii].replaceChild(fragment, sentences[node]);
                    }
                }
            }
        }
    }
}
function numHover(ev) {
    messageMain({ popup: { from: this.dataset["from"], to: this.dataset['to'], loc: { x: ev.clientX, y: ev.clientY } } });
}
