class Compile extends EventTarget{
    constructor(options) {
        super()
        this.options = options;
        this.compile()
    }
    compile() {
        let ele = document.querySelector(this.options.el);
        let childNodes = ele.childNodes;
        // console.log(childNodes)
        this.compileNodes(childNodes)
    }
    compileNodes(nodes) {
        nodes.forEach( node => {
            if(node.nodeType === 1) { // 元素节点
                let attrs = node.attributes;
                // console.log(attrs)
                [...attrs].forEach(attr => {
                    if(attr.name.substr(2) === 'html') {
                        node.innerHTML = this.options.data[attr.value]
                    } else if(attr.name.substr(2) === 'model') {
                        node.value = this.options.data[attr.value];
                        node.addEventListener('input', e => {
                            // console.log(e.target.value)
                            this.options.data[attr.value] = e.target.value
                        })
                    }
                })
                if(node.childNodes.length > 0) {
                    this.compileNodes(node.childNodes)
                }
            } else if(node.nodeType === 3) {
                let reg = /\{\{\s*(\S+)\s*\}\}/g;
                let textContent = node.textContent
                let test = reg.test(textContent);
                if(test) {
                    let $1 = RegExp.$1;
                    node.textContent = textContent.replace(reg, this.options.data[$1])

                    // 更新渲染
                    this.addEventListener($1, e => {
                        // console.log(e.detail)
                        let newValue = e.detail;
                        let oldValue = this.options.data[$1]
                        let _reg = new RegExp(oldValue, 'g');
                        node.textContent = node.textContent.replace(_reg, newValue)
                    })
                }
            }
        })
    }
}

export default Compile