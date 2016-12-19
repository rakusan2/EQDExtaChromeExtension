chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    sendResponse(getLabels());
});
document.body.onkeydown = function (keyEv) {
    keyEv.preventDefault();
    keyEv.stopPropagation();
    if (keyEv.key == "ArrowDown" || keyEv.key == "ArrowUp")
        scrollP(keyEv.key);
};
var sorted;
var current = 0;
function getLabels() {
    var postLabels = document.getElementsByClassName("post-labels")[0].children;
    var labels = [];
    for (var i = 0; i < postLabels.length; i++) {
        labels.push(postLabels[i].textContent);
    }
    if (labels.indexOf("Drawfriend") >= 0)
        prepare("Drawfriend");
    console.log({ labels: labels });
    return labels;
}
function scrollP(key) {
    if (key == "ArrowDown") {
        current = Math.min(sorted.length - 1, current + 1);
    }
    else if (key == "ArrowUp") {
        current = Math.max(0, current - 1);
    }
    if (sorted !== undefined)
        sorted[current].scrollIntoView({ behavior: "auto", block: "start" });
}
var preparations = {
    Drawfriend: organizeDF
};
function prepare(type) {
    console.log("preparing");
    if (sorted)
        return;
    sorted = preparations[type]();
    console.log("sorted");
    console.log(sorted);
}
function organizeDF() {
    var body = document.getElementsByClassName("post-body")[0].children;
    var elements = [body[0]];
    var last = 0;
    for (var i = 1; i < body.length; i++) {
        if (i - last > 2 && body[i].nodeName == "HR") {
            last = i;
            elements.push(body[i]);
            console.log(i);
        }
    }
    return elements;
}
