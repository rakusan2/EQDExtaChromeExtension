import { ElementMap } from './ElementRunner'
let avoidCache = /^sizcache/;
const ObserverOptions: MutationObserverInit = { childList: true };
type elementTask = { [id: string]: (el: Node, tree: RunningTreeBuilder) => options | void }
interface RunningTree {
    classes: elementTask,
    ids: elementTask,
    elements: elementTask
}
export interface options {
    removeNode?: boolean,
    removeTask?: boolean
}
export class RunningTreeBuilder {
    tree: RunningTree
    private getTree() {
        if (this.tree === undefined) this.tree = { classes: {}, ids: {}, elements: {} }
        return this.tree
    }
    onId<K extends keyof ElementMap>(ids: string | string[], callback?: (element: ElementMap[K], tree: BuilderOfTrees) => options | void): this
    onId(ids: string | string[], callback?: (element: Node, tree: BuilderOfTrees) => options | void): this {
        let tree = this.getTree();
        if (Array.isArray(ids)) {
            for (let i = 0; i < ids.length; i++) {
                tree.ids[ids[i]] = callback
            }
        } else tree.ids[ids] = callback;
        console.log('adding ' + ids)
        return this;
    }

    onClass<K extends keyof ElementMap>(names: string | string[], callback?: (element: ElementMap[K], tree: BuilderOfTrees) => options | void): this
    onClass(names: string | string[], callback?: (element: Node, tree: BuilderOfTrees) => options | void): this {
        let tree = this.getTree();
        if (Array.isArray(names)) {
            for (let i = 0; i < names.length; i++) {
                tree.classes[names[i]] = callback
            }
        } else tree.classes[names] = callback;
        console.log('adding ' + names)
        return this;
    }
    onElement<K extends keyof ElementMap>(names: K[], callback?: (element: ElementMap[K], tree: BuilderOfTrees) => options | void): this
    onElement<K extends keyof ElementMap>(names: K, callback?: (element: ElementMap[K], tree: BuilderOfTrees) => options | void): this
    onElement(names: string | string[], callback?: (element: Node, tree: BuilderOfTrees) => options | void): this {
        let tree = this.getTree();
        if (Array.isArray(names)) {
            for (let i = 0; i < names.length; i++) {
                tree.elements[names[i]] = callback
            }
        } else tree.elements[names] = callback;
        console.log('adding ' + names)
        return this
    }
    build() {
        return this.tree
    }
}

export class BuilderOfTrees extends RunningTreeBuilder {
    private trees: RunningTree[]
    addTree(callback: (builder: RunningTreeBuilder) => any) {
        let tree = new RunningTreeBuilder()
        callback(tree)
        this.trees.push(tree.build())
    }
    buildAll() {
        return [this.tree, ...this.trees]
    }
}

export class RunningRunner {
    private observers: MutationObserver[]
    private trees: RunningTree[]
    constructor(trees: RunningTree | RunningTree[]) {
        if (Array.isArray(trees)) {
            this.trees = trees
        } else {
            this.trees = [trees]
        }
        this.observers = []
        console.log('creating runRunner')
    }
    run(node: Node) {
        this.runNode(node, this.trees)
    }
    private runNode(node: Node, trees: RunningTree[]) {
        if (avoidNode(node)) return;
        let newTrees: RunningTree[] = [],
            onOptions = (opt: options) => {
                if (!exit && (exit = opt.removeNode)) {  //It is meant to set remove
                    node.parentNode.removeChild(node)
                }
            },
            exit = false
        for (let i = 0; i < trees.length; i++) {
            let treeResult = runTree(node, trees[i], onOptions)
            if (Array.isArray(treeResult)) newTrees.push(...treeResult)
            else newTrees.push(treeResult)
        }
        if (newTrees.length === 0 || exit) return;
        if (node.firstChild) {
            for (let i = 0; i < node.childNodes.length; i++) {
                this.runNode(node.childNodes[i], newTrees);
            }
        }
        //console.log({name:node.nodeName,node})
        let ob = new MutationObserver((records, obs) => {
            for (let i = 0; i < records.length; i++) {
                for (let ii = 0; ii < records[i].addedNodes.length; ii++) {
                    this.runNode(records[i].addedNodes[ii], newTrees)
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

function runTree(node: Node, tree: RunningTree, onOptions?: (opt: options) => any) {
    if (tree === undefined) return
    let test: string, nextTree = new BuilderOfTrees(), options: options;
    if ('id' in node && (<HTMLElement>node).id in tree.ids && ((<HTMLElement>node).id in tree.ids)) {
        options = tree.ids[(<HTMLElement>node).id](node, nextTree) as options
        if (options !== undefined && options.removeTask) delete tree.ids[(<HTMLElement>node).id]
        //console.log({ name: 'id',id:(<HTMLElement>node).id, tree, next: nextTree.tree })
    }
    else if (('classList' in node) && (test = checkClass((<HTMLElement>node).classList, tree.classes)) && test in tree.classes) {
        options = tree.classes[test](node, nextTree) as options
        if (options !== undefined && options.removeTask) delete tree.classes[test]
        //console.log({ name: 'class',class:test, tree, next: nextTree.tree })
    }
    else if (node.nodeName in tree.elements) {
        options = tree.elements[node.nodeName](node, nextTree) as options
        if (options !== undefined && options.removeTask) delete tree.elements[node.nodeName]
        //console.log({ name: 'element',element:node.nodeName, tree, next: nextTree.tree })
    }
    else return tree
    if (options !== undefined && onOptions !== undefined) onOptions(options)
    return nextTree.buildAll()
}