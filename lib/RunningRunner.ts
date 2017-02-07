import {ElementMap} from './ElementRunner'
type elementTask = {[id:string]:(el:Node,tree:RunningTreeBuilder)=>any}
interface RunningTree{
    classes:elementTask,
    ids:elementTask,
    elements:elementTask

}
export class RunningTreeBuilder{
    tree:RunningTree
    constructor(){
        this.tree={classes:{},ids:{},elements:{}}
    }
    onId<K extends keyof ElementMap>(id:string,callback:(element:ElementMap[K],tree:RunningTreeBuilder)=>any)
    onId(id:string,callback:(element:Node,tree:RunningTreeBuilder)=>any){
        this.tree.ids[id]=callback
    }

    onClass<K extends keyof ElementMap>(name:string,callback:(element:ElementMap[K],tree:RunningTreeBuilder)=>any)
    onClass(name:string,callback:(element:Node,tree:RunningTreeBuilder)=>any){
        this.tree.classes[name]=callback
    }
    onElement<K extends keyof ElementMap>(name:K,callback:(element:ElementMap[K],tree:RunningTreeBuilder)=>any)
    onElement(name:string,callback:(element:Node,tree:RunningTreeBuilder)=>any){
        this.tree.elements[name]=callback
    }
}

export class RunningRunner extends RunningTreeBuilder{
    run(node:Node){
        
    }
}