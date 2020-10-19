class Kvue{
    constructor(options) {
        this.options = options;
        this.compile()
    }

    // 找到元素
    compile() {
        let ele = document.querySelector(this.options.el);
        let childNodes = ele.childNodes;
        this.compileNodes(childNodes)
    }
    compileNodes(nodes) {
        nodes.forEach(node => {
            // console.log(node.nodeType)

            if(node.nodeType === 1){  // 元素节点
                if(node.childNodes.length > 0) {
                    this.compileNodes(node.childNodes)
                }
                
            } else if(node.nodeType === 3) {  // 文本节点
                let reg = /\{\{\s*(\S+)\s*\}\}/g;
                // console.log(node.textContent)
                let textContent = node.textContent
                let test = reg.test(textContent)
                if(test) {
                    // 初次渲染
                    let $1 = RegExp.$1;
                    // console.log($1)
                    node.textContent = textContent.replace(reg, this.options.data[$1])
                }
            }
        })
    }
}