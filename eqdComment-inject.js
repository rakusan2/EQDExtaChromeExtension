var commentArea = document.getElementById('conversation'), keys = /^ArrowDown|^ArrowUp|^'|^"/;
if (window.self !== window.top && /disqus\.com\/embed\/comments/i.test(document.URL)) {
    window.onmessage = function (ev) {
        if (/equestriadaily\.com/i.test(ev.origin) && (typeof ev.data) === "object") {
            if (ev.data.m === "click")
                comment();
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
