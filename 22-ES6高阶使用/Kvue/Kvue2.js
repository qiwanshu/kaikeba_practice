
// 数据劫持
class Kvue{
    constructor(options) {
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
        Object.defineProperty(data, key, {
            configurable: true,
            enumerable: true,
            get() {
                return value  // 获取data里面的值
            },
            set(newValue) {
                console.log('set...');   // 当data中的数据变化是，可以监听到
                value = newValue;   // 设置value（）也就是 data[key] 为newValue ， 这样执行 data.message = 'www'时才会有效
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
                this.compileNodes(node.childNodes)
            } else if(node.nodeType === 3) { 
                let reg = /\{\{\s*(\S+)\s*\}\}/g;
                let textContent = node.textContent
                let test = reg.test(textContent)
                if(test) {
                    let $1 = RegExp.$1;
                    node.textContent = textContent.replace(reg, this.options.data[$1])
                }
            }
        })
    }
}