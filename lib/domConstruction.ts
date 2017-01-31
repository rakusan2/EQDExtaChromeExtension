export class DomConstr{
    private options:MutationObserverInit
    private observers:MutationObserver[]
    private watchClass:{[key:string]:(el:Element)=>any}
    constructor(){
        this.observers=[]
        this.options = {
            childList:true
        }
        this.watchClass = {}
    }
    start(){
        let observer = new MutationObserver(record=>{
            record.forEach(rec=>{
                let aNodes = rec.addedNodes
                for(let i =0; i<aNodes.length;i++){
                    if(aNodes[i].nodeName === "BODY"){
                        this.observe(aNodes[i])
                    }
                }
            })
        })
        observer.observe(document.documentElement,this.options)
        this.observers.push(observer)
    }
    private observe(n:Node){
        if('classList' in n){
            
        }
    }
    stop(){
        while(this.observers.length>0){
            this.observers.pop().disconnect()
        }
    }
    whenFoundClass(cl:string,callback:(el:Element)=>any){
        this.watchClass[cl]=callback;
    }
}