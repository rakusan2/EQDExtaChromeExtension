var sorted, postContent, commentSection, docBody, commentsSource, current = 0, currentLabels, distances = [], adjustBy = 50, updateDistOnNextMove = false, isSaucy = false, commenting = false, imgEndings = /\.(png|jpe?g|gif)$/;
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    currentLabels = getLabels();
    sendResponse(currentLabels);
    if (currentLabels.indexOf("Drawfriend") >= 0)
        prepare("Drawfriend");
    relocateSettings();
});
window.onmessage = function (m) {
    //console.log({m,dataType:typeof m.data})
    if (m.origin === "https://disqus.com" && (typeof m.data) === "object" && "from" in m.data) {
        console.log({ m: m, internalData: m.data.m });
        if (commentsSource === undefined) {
            console.log("source is set");
            commentsSource = m.source;
        }
        if ((typeof m.data.m) === "object") {
            if ("key" in m.data.m)
                keyHandler(m.data.m.key);
        }
    }
};
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
function adjustedPostDist(dist) {
    return dist > 0 ? dist : dist * -2;
}
function findNearestPos() {
    var pos = docBody.scrollTop, cur = adjustedPostDist(pos - distances[current]), prev = 0, mov = 1;
    if (commenting) {
        commenting = pos - distances[distances.length - 2] > 50;
    }
    if (commenting)
        return;
    if (current > 0 && adjustedPostDist(pos - distances[current - 1]) < cur) {
        mov = -1;
    }
    else if (current < distances.length - 1 && adjustedPostDist(pos - distances[current + 1]) < cur) {
        mov = 1;
    }
    else
        return;
    do {
        current += mov;
        prev = cur;
        cur = adjustedPostDist(pos - distances[current]);
    } while (cur < prev);
    current -= mov;
    console.log({ current: current, by: "find", pos: pos, dist: distances[current] });
}
/** Page Scroll function based on Keyboard keys */
function keyHandler(key) {
    var status = false;
    console.log(key);
    // Scroll Direction Keys
    if (sorted !== undefined) {
        if (key == "ArrowUp") {
            keyScroll(0 /* up */);
            status = true;
        }
        else if (key == "ArrowDown") {
            keyScroll(1 /* down */);
            status = true;
        }
    }
    if (key == "g") {
        messageToComments("numbers");
        status = true;
    }
    // Comment Section Keys
    if (commentSection !== undefined && (key == "'" || key == '"')) {
        goToComment();
        status = true;
    }
    return status;
}
/** Page Image Scroll */
function keyScroll(dir) {
    if (updateDistOnNextMove)
        updateDist();
    if (dir == 0 /* up */ && Math.abs(distances[current] - docBody.scrollTop) < 50) {
        current = Math.max(0, current - 1);
    }
    else if (dir == 1 /* down */ && Math.abs(docBody.scrollTop - distances[current]) < 50) {
        current = Math.min(sorted.length - 1, current + 1);
    }
    sorted[current].scrollIntoView({ behavior: "auto", block: "start" });
    docBody.scrollTop -= current > 0 ? adjustBy : 0;
    console.log({ current: current, by: "arrow", pos: docBody.scrollTop, dist: distances[current] });
}
var saucyPosts = [];
function showSaucy(checked) {
    if (isSaucy === checked)
        return;
    isSaucy = checked;
    localStorage.setItem("EQD-Saucy", checked.toString());
    console.log('Saucy Event');
    if (checked) {
        if (saucyPosts.length > 0) {
            console.log("injecting known Saucy");
            saucyPosts.forEach(function (el) {
                el.element.appendChild(el.img);
            });
        }
        else {
            console.log("injecting unknown Saucy");
            for (var i = 0; i < postContent.length; i++) {
                if (postContent[i].nodeName == "DIV" && postContent[i].children.length > 0 && postContent[i].firstElementChild.children.length == 0) {
                    console.log(postContent[i]);
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
    updateDistOnNextMove = true;
}
/** Map of Array Preparation Functions */
var preparations = {
    Drawfriend: organizeDF
};
function prepare(type) {
    docBody = document.body;
    commentSection = document.getElementsByClassName("post-comments")[0];
    var saucyCheck = document.createElement('label'), saucyCheckBox = document.createElement('input');
    saucyCheckBox.id = 'setting-show-saucy';
    saucyCheckBox.type = 'checkbox';
    saucyCheckBox.checked = localStorage.getItem('EQD-Saucy') === "true";
    if (type === "Drawfriend") {
        console.log("Add Show Saucy");
        saucyCheckBox.addEventListener('change', function () { showSaucy(this.checked); }, false);
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
    docBody.onscroll = findNearestPos;
    adjustBy = navbar.checked ? 50 : 0;
    sorted = preparations[type]();
    console.log("sorted");
    console.log(sorted);
    docBody.onkeydown = function (keyEv) {
        if (keyHandler(keyEv.key)) {
            keyEv.preventDefault();
            keyEv.stopPropagation();
        }
    };
    findNearestPos();
    showSaucy(saucyCheckBox.checked);
}
/** Organize DrawFriend posts into a array of Elements */
function organizeDF() {
    var element, elements = [docBody, document.getElementsByClassName("blog-post")[0], postContent[0]];
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
        if (element.nodeName === "A" && imgEndings.test(element.href)) {
            var tempDiv = document.createElement('div');
            tempDiv.classList.add('seperator');
            tempDiv.style.clear = "both";
            tempDiv.style.textAlign = "center";
            tempDiv.appendChild(element);
            postContent[i].parentElement.replaceChild(tempDiv, postContent[i]);
            console.log("replacing");
            console.log(element);
        }
    }
    return elements;
}
function relocateSettings() {
    var settings = document.getElementById('settings');
    settings.parentNode.removeChild(settings);
    document.getElementById('nav-bar').appendChild(settings);
    settings.classList.add("nav-bar-inner");
    settings.style.fontWeight = "normal";
    settings.style.fontSize = "14px";
    settings.style.marginBottom = "1px";
    settings.style.top = "2px";
}
/** Scrols to Comments Section */
function goToComment() {
    if (commenting) {
        docBody.scrollTop = distances[current];
    }
    else {
        docBody.scrollTop = commentSection.offsetTop;
        messageToComments("click");
    }
    commenting = !commenting;
    console.log({ commenting: commenting });
}
function messageToComments(m) {
    if (commentsSource) {
        commentsSource.postMessage({ from: "EQDExtra", m: m }, "https://disqus.com");
    }
}
