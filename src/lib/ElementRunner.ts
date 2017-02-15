type branchSplit = { [key: string]: ElementTask }
interface ElementTask {
    nextElements: branchSplit,
    task?: (element?: Node) => any,
    onFail?: (element?: Node) => any,
    final: boolean,
    stop: boolean
}
export interface ElementMap {
    "A": HTMLAnchorElement,
    "DIV": HTMLDivElement,
    "#text": Text,
    "IMG": HTMLImageElement,
    'HR': HTMLHRElement,
    'P': HTMLParagraphElement,
    'B': Element,
    'HEAD':HTMLHeadElement,
    'BODY':HTMLBodyElement
}
export class ElementTreeBuilder {
    taskTree: ElementTask
    constructor(task?: ElementTask) {
        if (task && 'nextElements' in task) this.taskTree = task
        else this.taskTree = { nextElements: {}, final: true, stop: false }
    }
    add<K extends keyof ElementMap>(name: K, callback: (element?: ElementMap[K]) => any): this
    add(name: string, callback: (element?: Node) => any): this {
        let branch = this.taskTree
        if (!(name in branch.nextElements)) branch.nextElements[name] = { nextElements: {}, final: true, stop: false }
        branch.nextElements[name].task = callback
        branch.final = false;
        return this
    }
    addBranch<K extends keyof ElementMap>(name: K, additional: (a: ElementTreeBuilder) => any, stopTree?: boolean, onFail?: (element?: ElementMap[K]) => any): this
    addBranch(name: string, additional: (a: ElementTreeBuilder) => any, stopTree?: boolean, onFail?: (element?: Node) => any) {
        let branch: ElementTask = this.taskTree.nextElements[name] = { nextElements: {}, final: true, stop: false };
        if (this.taskTree.stop) {
            additional(this)
        } else {
            additional(new ElementTreeBuilder(branch))
        }
        if (onFail !== undefined) branch.onFail = onFail
        this.taskTree.final = false
        if (stopTree) branch.stop = true
        return this;
    }
}

export class ElementRunner extends ElementTreeBuilder {
    private toRun:(()=>any)[]=[]
    runCollection(elements: HTMLCollection) {
        console.log({ tree: this.taskTree, elements })
        this.runTaskCollection(elements, this.taskTree)
        while(this.toRun.length>0){
            this.toRun.pop()()
        }
    }
    run(element: Element) {
        this.runTask(element, this.taskTree)
    }
    private runTask(element: Node, tree: ElementTask) {
        if (element.nodeName in tree.nextElements) {
            let nextBranch = tree.nextElements[element.nodeName], test = false
            this.runTaskCollection(element.childNodes, tree.stop ? tree : nextBranch, element)
            if ("task" in nextBranch) {
                this.toRun.push(()=>nextBranch.task(element));
                test = true
            }
            return test
        } else if (tree.stop) this.runTaskCollection(element.childNodes, tree, element)
        return false
    }
    private runTaskCollection(elements: NodeList, tree: ElementTask, el?: Node): boolean {
        if (tree.final) return;
        let run = false
        for (let i = 0; i < elements.length; i++) {
            run = this.runTask(elements[i], tree) || run
        }
        if (!run && !tree.final && tree.onFail !== undefined) {
            this.toRun.push(()=>tree.onFail(el))
        }
    }
}