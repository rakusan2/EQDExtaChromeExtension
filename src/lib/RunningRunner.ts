import { ElementMap } from './ElementRunner'
let avoidCache = /^sizcache/;
const ObserverOptions: MutationObserverInit = { childList: true };
type elementTask = { [id: string]: (el: Node, tree: RunningTreeBuilder) => any }
interface RunningTree {
    classes: elementTask,
    ids: elementTask,
    elements: elementTask

}
export class RunningTreeBuilder {
    tree: RunningTree
    tree2: RunningTree
    private initTree() {
        if (this.tree === undefined) this.tree = { classes: {}, ids: {}, elements: {} }
    }
    onId<K extends keyof ElementMap>(id: string, callback?: (element: ElementMap[K], tree: RunningTreeBuilder) => any): this
    onId(id: string, callback?: (element: Node, tree: RunningTreeBuilder) => any): this {
        this.initTree();
        this.tree.ids[id] = callback;
        console.log('adding ' + id)
        return this;
    }

    onClass<K extends keyof ElementMap>(name: string, callback?: (element: ElementMap[K], tree: RunningTreeBuilder) => any): this
    onClass(name: string, callback?: (element: Node, tree: RunningTreeBuilder) => any): this {
        this.initTree();
        this.tree.classes[name] = callback;
        console.log('adding ' + name)
        return this;
    }
    onElement<K extends keyof ElementMap>(name: K, callback?: (element: ElementMap[K], tree: RunningTreeBuilder) => any): this
    onElement(name: string, callback?: (element: Node, tree: RunningTreeBuilder) => any): this {
        this.initTree();
        this.tree.elements[name] = callback;
        console.log('adding ' + name)
        return this
    }
    secondTree(callback: (tree: RunningTreeBuilder) => any): this {
        let build = new RunningTreeBuilder()
        callback(build)
        this.tree2 = build.tree
        return this
    }
}

export class RunningRunner extends RunningTreeBuilder {
    private observers: MutationObserver[]
    constructor() {
        super()
        this.observers = []
        console.log('creating runRunner')
    }
    run(node: Node) {
        this.runNode(node, this.tree, this.tree2)
    }
    private runNode(node: Node, tree: RunningTree, tree2: RunningTree) {
        if (avoidNode(node)) return;
        tree = checkRunTree(node, tree)
        tree2 = checkRunTree(node, tree2)
        if (tree === undefined && tree2 === undefined) return;
        if (node.firstChild) {
            for (let i = 0; i < node.childNodes.length; i++) {
                this.runNode(node.childNodes[i], tree, tree2);
            }
        }
        //console.log({name:node.nodeName,node})
        let ob = new MutationObserver((records, obs) => {
            for (let i = 0; i < records.length; i++) {
                for (let ii = 0; ii < records[i].addedNodes.length; ii++) {
                    this.runNode(records[i].addedNodes[ii], tree, tree2)
                }
            }
        })
        ob.observe(node, ObserverOptions)
        this.observers.push(ob)
    }
    stop() {
        console.log(this)
        if (this.observers.length > 0) console.log('stopping early runner')
        while (this.observers.length > 0) {
            this.observers.pop().disconnect();
        }
    }
}

function checkClass(classes: DOMTokenList, elementTask) {
    for (let i = 0; i < classes.length; i++) {
        if (classes[i] in elementTask) return classes[i];
    }
    return null
}

function avoidNode(node: Node) {
    if ((<HTMLElement>node).id && avoidCache.test((<HTMLElement>node).id)) return true
    return false
}

function checkRunTree(node: Node, tree: RunningTree) {
    if (tree === undefined) return
    let test: string, nextTree = new RunningTreeBuilder();
    if ('id' in node && (<HTMLElement>node).id in tree.ids) {
        if (tree.ids[(<HTMLElement>node).id] !== undefined) tree.ids[(<HTMLElement>node).id](node, nextTree);
        console.log({ name: 'id',id:(<HTMLElement>node).id, tree, next: nextTree.tree })
        return nextTree.tree
    }
    else if ('classList' in node && (test = checkClass((<HTMLElement>node).classList, tree.classes))) {
        if (tree.classes[test] !== undefined) tree.classes[test](node, nextTree)
        console.log({ name: 'class',class:test, tree, next: nextTree.tree })
        return nextTree.tree
    }
    else if (node.nodeName in tree.elements) {
        if (tree.elements[node.nodeName] !== undefined) tree.elements[node.nodeName](node, nextTree);
        console.log({ name: 'element',element:node.nodeName, tree, next: nextTree.tree })
        return nextTree.tree
    }
    return tree
}