type branchSplit = {[key:string] :ElementTask}
interface ElementTask{
    nextElements:branchSplit,
    task?:(element?:Node)=>any,
    failTask?:(element?:Node)=>any
    final:boolean
}
document.createElement('div')
interface ElementMap{
    "A":HTMLAnchorElement,
    "DIV":HTMLDivElement,
    "#text":Text,
    "IMG":HTMLImageElement,
    'HR':HTMLHRElement,
    'P':HTMLParagraphElement,
    'B':Element
}
document.createElement
class ElementTree{
    elementTaskTree :ElementTask
    constructor(task?:ElementTask){
        if(task && 'nextElements' in task)this.elementTaskTree=task
        else this.elementTaskTree={nextElements:{},final:true}
    }
    add<K extends keyof ElementMap>(name:K ,callback:(element?:ElementMap[K])=>any):this
    add(name:string,callback:(element?:Node)=>any):this{
        let branch = this.elementTaskTree
        if(!(name in branch.nextElements))branch.nextElements[name]={nextElements:{},final:true}
        branch.nextElements[name].task = callback
        branch.final=false;
        return this
    }
    addBranch<K extends keyof ElementMap>(name:K ,additional:(a:ElementTree)=>any,onFail?:(element?:ElementMap[K])=>any):this
    addBranch(name:string,additional:(a:ElementTree)=>any,onFail?:(element?:Node)=>any){
        this.elementTaskTree.nextElements[name]={nextElements:{},final:true};
        additional(new ElementTree(this.elementTaskTree.nextElements[name]))
        if(onFail!== undefined)this.elementTaskTree.failTask=onFail
        this.elementTaskTree.final=false
        return this;
    }
}

export default class ElementRunner extends ElementTree{
    runCollection(elements:HTMLCollection){
        console.log({tree:this.elementTaskTree})
        this.runTaskCollection(elements,this.elementTaskTree)
    }
    run(element:Element){
        this.runTask(element,this.elementTaskTree)
    }
    private runTask(element:Node,tree:ElementTask){
        if(!element)return;
        if(element.nodeName in tree.nextElements){
            let run=false
            let nextBranch = tree.nextElements[element.nodeName]
            if("task" in nextBranch){
                nextBranch.task(element);
                run=true
            }
            return this.runTaskCollection(element.childNodes,nextBranch) || run
        }
    }
    private runTaskCollection(elements:NodeList,tree:ElementTask):boolean{
        if(tree.final)return;
        let run = false
        for(let i=0;i<elements.length;i++){
            run = this.runTask(elements[i],tree) || run
        }
        return run
    }
}