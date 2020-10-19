
// 使用自定义事件, 监听数据变化
class Kvue extends EventTarget{
    constructor(options) {
        super()
        this.options = options;
        this.compile();
        this.observer(this.options.data); // 要监听的数据是 this.options.data
    }

    // 定义一个方法用来监听数据的变化
    observer(data) {
        let keys = Object.keys(data) // 拿到data里面所有的key值
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
                return value  // 获取data里面的值
            },
            set(newValue) {  // 当数据发生变化，需要更新视图时要触发set
                // let event = new Event(key);
                // 更新值，事件传值
                let event = new CustomEvent(key, {
                    detail: newValue
                })

                _this.dispatchEvent(event)  // 触发自定义事件
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
                        console.log(e.detail)
                        let newValue = e.detail;
                        let oldValue = this.options.data[$1];
                        // console.log(this.options.data)
                        let _reg = new RegExp(oldValue, 'g');
                        node.textContent = node.textContent.replace(_reg, newValue)
                    })
                }
            }
        })
    }
}