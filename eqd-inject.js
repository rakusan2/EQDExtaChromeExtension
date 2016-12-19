var sorted, current = 0, currentLabels;
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    currentLabels = getLabels();
    sendResponse(currentLabels);
    if (currentLabels.indexOf("Drawfriend") >= 0)
        prepare("Drawfriend");
});
/** Gets the current Posts Labels */
function getLabels() {
    var postLabels = document.getElementsByClassName("post-labels")[0].children;
    var labels = [];
    for (var i = 0; i < postLabels.length; i++) {
        labels.push(postLabels[i].textContent);
    }
    console.log({ labels: labels });
    return labels;
}
/** Page Scroll function based on Keyboard keys */
function scrollP(key) {
    if (key == "ArrowDown") {
        current = Math.min(sorted.length - 1, current + 1);
    }
    else if (key == "ArrowUp") {
        current = Math.max(0, current - 1);
    }
    else
        return;
    if (sorted !== undefined)
        sorted[current].scrollIntoView({ behavior: "auto", block: "start" });
}
/** Map of Array Preparation Functions */
var preparations = {
    Drawfriend: organizeDF
};
function prepare(type) {
    if (sorted)
        return;
    sorted = preparations[type]();
    console.log("sorted");
    console.log(sorted);
    document.body.onkeydown = function (keyEv) {
        keyEv.preventDefault();
        keyEv.stopPropagation();
        scrollP(keyEv.key);
    };
}
/** Organize DrawFriend posts into a array of Elements */
function organizeDF() {
    var body = document.getElementsByClassName("post-body")[0].children;
    var element, elements = [body[0]];
    var last = 0, closestD = 500, closest = 0;
    for (var i = 1; i < body.length; i++) {
        element = body[i];
        if (i - last > 2 && element.nodeName == "HR") {
            if (element.scrollTop >= 0 && closestD - element.scrollTop > 0) {
                closest = elements.length;
                closestD = element.scrollTop;
            }
            last = i;
            elements.push(element);
            console.log(i);
        }
    }
    current = closest;
    return elements;
}
