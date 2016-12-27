var commentArea = document.getElementById('conversation');
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
function comment() {
    console.log("commenting");
    var textarea = document.getElementsByClassName("textarea")[0];
    textarea.focus();
    console.log(textarea);
    textarea.onblur = function (ev) {
        console.log("blur");
        messageMain('focus');
    };
    textarea.onkeydown = function (ev) {
        if (ev.key === "Escape")
            this.blur();
    };
}
function messageMain(m) {
    window.top.postMessage({ from: "EQDComments", m: m }, "http://www.equestriadaily.com");
}
