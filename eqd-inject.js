var sorted, postContent, current = 0, currentLabels, distances = [], adjustBy = 50;
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
function updateDist() {
    for (var i = 3; i < distances.length; i++) {
        distances[i] = sorted[i].offsetTop - adjustBy;
    }
}
function findNearestPos() {
    var pos = document.body.scrollTop, cur = Math.abs(pos - distances[current]), prev = 0, mov = 1;
    if (current > 0 && Math.abs(pos - distances[current - 1]) < cur) {
        mov = -1;
    }
    else if (current < distances.length - 1 && Math.abs(pos - distances[current + 1]) < cur) {
        mov = 1;
    }
    else
        return;
    do {
        current += mov;
        prev = cur;
        cur = Math.abs(pos - distances[current]);
    } while (cur < prev);
    current -= mov;
    console.log({ current: current, by: "find", pos: pos, dist: distances[current] });
}
/** Page Scroll function based on Keyboard keys */
function scrollP(key) {
    if (sorted === undefined)
        return false;
    if (key == "ArrowDown") {
        current = Math.min(sorted.length - 1, current + 1);
    }
    else if (key == "ArrowUp") {
        current = Math.max(0, current - 1);
    }
    else
        return false;
    sorted[current].scrollIntoView({ behavior: "auto", block: "start" });
    document.body.scrollTop -= current > 0 ? adjustBy : 0;
    console.log({ current: current, by: "arrow", pos: document.body.scrollTop, dist: distances[current] });
    return true;
}
var saucyPosts = [];
function showSaucy(ev) {
    console.log('Saucy Event');
    if (this.checked) {
        if (saucyPosts.length > 0) {
            console.log("injecting known Saucy");
            saucyPosts.forEach(function (el) {
                el.element.appendChild(el.img);
            });
        }
        else {
            console.log("injecting unknown Saucy");
            for (var i = 0; i < postContent.length; i++) {
                if (postContent[i].nodeName == "DIV" && postContent[i].firstElementChild.children.length == 0) {
                    var imgElement = document.createElement('img'), anchorElement = postContent[i].firstElementChild;
                    imgElement.src = anchorElement.href;
                    saucyPosts.push({
                        element: anchorElement,
                        img: imgElement,
                        text: anchorElement.textContent
                    });
                    anchorElement.appendChild(imgElement);
                }
            }
        }
    }
    else {
        console.log("removing Saucy");
        saucyPosts.forEach(function (el) {
            el.element.removeChild(el.img);
        });
    }
    updateDist();
}
/** Map of Array Preparation Functions */
var preparations = {
    Drawfriend: organizeDF
};
function prepare(type) {
    var saucyCheck = document.createElement('label'), saucyCheckBox = document.createElement('input');
    saucyCheckBox.id = 'setting-show-saucy';
    saucyCheckBox.type = 'checkbox';
    if (type === "Drawfriend") {
        console.log("Add Show Saucy");
        saucyCheckBox.addEventListener('change', showSaucy, false);
    }
    saucyCheck.appendChild(saucyCheckBox);
    saucyCheck.appendChild(document.createTextNode(" Show Saucy"));
    document.getElementsByClassName("settings-content")[0].appendChild(saucyCheck);
    if (sorted)
        return;
    postContent = document.getElementsByClassName("post-body")[0].children;
    var navbar = document.getElementById("setting-fixed-navigation-bar");
    navbar.onchange = function (ev) {
        adjustBy = navbar.checked ? 50 : 0;
        console.log({ navBarFixed: navbar.checked });
    };
    document.body.onscroll = findNearestPos;
    adjustBy = navbar.checked ? 50 : 0;
    sorted = preparations[type]();
    console.log("sorted");
    console.log(sorted);
    document.body.onkeydown = function (keyEv) {
        if (scrollP(keyEv.key)) {
            keyEv.preventDefault();
            keyEv.stopPropagation();
        }
    };
    findNearestPos();
}
/** Organize DrawFriend posts into a array of Elements */
function organizeDF() {
    var element, elements = [document.body, document.getElementsByClassName("blog-post")[0], postContent[0]];
    var last = 0;
    distances = [0, elements[1].offsetTop - adjustBy, elements[2].offsetTop - adjustBy];
    for (var i = 1; i < postContent.length; i++) {
        element = postContent[i];
        if (element.nodeName == "HR") {
            if (i - last > 2) {
                elements.push(element);
                distances.push(element.offsetTop - adjustBy);
            }
            else {
                elements[elements.length - 1] = element;
                distances[elements.length - 1] = element.offsetTop - adjustBy;
            }
            last = i;
        }
    }
    console.log({ current: current });
    return elements;
}
