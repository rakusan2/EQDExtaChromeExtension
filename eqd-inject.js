var postLabels = document.getElementsByClassName("post-labels")[0].children;
var labels = [];
for (var i = 0; i < postLabels.length; i++) {
    labels.push(postLabels[i].textContent);
}
console.log({ labels: labels });
alert(labels);
