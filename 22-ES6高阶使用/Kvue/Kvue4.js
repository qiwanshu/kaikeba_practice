
// v-html 实现方法， 和双向绑定
class Kvue extends EventTarget{
    constructor(options) {
        super()
        this.options = options;
        this.compile();
        this.observer(this.options.data); 
    }

    observer(data) {
        let keys = Object.keys(data)
        keys.forEach(key => {
            this.defineReact(data, key, data[key])
        })   
    }

    // 劫持数据函数
    defineReact(data, key, value) {
        const _this = this
        Object.defineProperty(data, key, {
            configurable: true,
            enumerable: true,
            get() {
                return value 
            },
            set(newValue) { 
                let event = new CustomEvent(key, {
                    detail: newValue
                })

                _this.dispatchEvent(event)  
                value = newValue;
            }
        })
    }

    // 找到元素
    compile() {
        let ele = document.querySelector(this.options.el);
        let childNodes = ele.childNodes;
        this.compileNodes(childNodes)
    }
    compileNodes(nodes) {
        nodes.forEach(node => {
            if(node.nodeType === 1){
                let attrs = node.attributes;
                // console.log([...attrs]);
                [...attrs].forEach(attr => {
                    let attrName = attr.name;
                    const attrValue = attr.value;
                    // console.log(attrName.substr(2))
                    if(attrName.substr(2) === 'html'){
                        node.innerHTML = this.options.data[attrValue]
                    } else if(attrName.substr(2) === 'model') {
                        node.value = this.options.data[attrValue];
                        node.addEventListener('input', e => {
                            // console.log(e.target.value)
                            this.options.data[attrValue] = e.target.value // 当data 里面数据发生变化，会触发defineProperty中的set方法
                        })
                    }
                })
                if(node.childNodes.length > 0) {
                    this.compileNodes(node.childNodes)
                }
            } else if(node.nodeType === 3) { 
                let reg = /\{\{\s*(\S+)\s*\}\}/g;
                let textContent = node.textContent
                let test = reg.test(textContent)
                if(test) {
                    // 初次渲染
                    let $1 = RegExp.$1;
                    node.textContent = textContent.replace(reg, this.options.data[$1]);
                    
                    // 更新渲染
                    this.addEventListener($1, e => {
                        let newValue = e.detail;
                        let oldValue = this.options.data[$1];
                        let _reg = new RegExp(oldValue, 'g');
                        node.textContent = node.textContent.replace(_reg, newValue)
                    })
                }
            }
        })
    }
}