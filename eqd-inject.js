var sorted, postContent, current = 0, currentLabels, adjustBy = 50;
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
    return true;
}
var saucyPosts = [];
function showSaucy(ev) {
    console.log('Saucy Event');
    if (this.checked) {
        if (saucyPosts.length > 0) {
            console.log("injecting known Saucy");
            saucyPosts.forEach(function (el) {
                el.element.innerHTML = "";
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
                    anchorElement.innerHTML = "";
                    anchorElement.appendChild(imgElement);
                }
            }
        }
    }
    else {
        console.log("removing Saucy");
        saucyPosts.forEach(function (el) {
            el.element.innerHTML = el.text;
        });
    }
}
/** Map of Array Preparation Functions */
var preparations = {
    Drawfriend: organizeDF
};
function prepare(type) {
    var saucyCheck = document.createElement('label'), saucyCheckBox = document.createElement('input');
    saucyCheckBox.id = 'setting-show-saucy';
    saucyCheckBox.type = 'checkbox';
    //if(type ==="Drawfriend"){
    //    console.log("Add Show Saucy")
    //    saucyCheckBox.addEventListener('change',showSaucy,false)
    //}
    saucyCheck.appendChild(saucyCheckBox);
    saucyCheck.innerHTML += " Show Saucy";
    document.getElementsByClassName("settings-content")[0].appendChild(saucyCheck);
    document.getElementById('setting-show-saucy').onchange = showSaucy;
    if (sorted)
        return;
    postContent = document.getElementsByClassName("post-body")[0].children;
    sorted = preparations[type]();
    console.log("sorted");
    console.log(sorted);
    document.body.onkeydown = function (keyEv) {
        if (scrollP(keyEv.key)) {
            keyEv.preventDefault();
            keyEv.stopPropagation();
        }
    };
    var navbar = document.getElementById("setting-fixed-navigation-bar");
    navbar.onchange = function (ev) {
        adjustBy = navbar.checked ? 50 : 0;
        console.log({ navBarFixed: navbar.checked });
    };
    adjustBy = navbar.checked ? 50 : 0;
}
/** Organize DrawFriend posts into a array of Elements */
function organizeDF() {
    var element, elements = [document.body, document.getElementsByClassName("blog-post")[0], postContent[0]];
    var last = 0, closestD = Math.abs(postContent[0].getBoundingClientRect().top), closest = 0;
    for (var i = 1; i < postContent.length; i++) {
        element = postContent[i];
        if (element.nodeName == "HR") {
            var eTop = Math.abs(element.getBoundingClientRect().top);
            //console.log({eTop,current:elements.length})
            if (element.scrollTop >= 0 && eTop < closestD) {
                closest = elements.length - (i - last <= 2 ? 1 : 0);
                closestD = eTop;
            }
            if (i - last > 2) {
                elements.push(element);
            }
            else {
                elements[elements.length - 1] = element;
            }
            last = i;
        }
    }
    current = closest;
    console.log({ current: current });
    return elements;
}
