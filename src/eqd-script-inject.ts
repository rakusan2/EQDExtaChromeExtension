declare var dates: [string, number, string][]
let id = (<HTMLScriptElement>document.currentScript).dataset['from']
document.addEventListener('DOMContentLoaded', () => {
    console.log({send:id})
    window.postMessage({eqdInject:{dates:dates}},'*')
})