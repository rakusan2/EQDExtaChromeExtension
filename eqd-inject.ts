let postLabels = document.getElementsByClassName("post-labels")[0].children;
let labels:string[] = []
for(let i =0;i<postLabels.length;i++){
    labels.push(postLabels[i].textContent)
}
console.log({labels});