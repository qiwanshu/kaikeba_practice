import compile from './compile'
class Kvue extends EventTarget{
    constructor(options) {
        super();
        this.options = options
        compile(document.querySelector(this.options.el));
        this.observer(this.options.data)
    }

    // 监听数据变化
    observer(data) {
        let keys = Object.keys(data);
        keys.forEach(key => {
            // this.defineReact(data, key, data[key])
            this.defineReact(data)
        })
        // Object.defineProperty()
    }
    defineReact(data) {
        let _this = this
        // Object.defineProperty(data, key, {
        //     configurable: true,
        //     enumerable: true,
        //     get() {
        //         console.log('get...')
        //         return value
        //     },
        //     set(newValue) {
        //         console.log('set...')
        //         // let event = new Event(key)
        //         let event = new CustomEvent(key, {
        //             detail: newValue
        //         })
        //         _this.dispatchEvent(event)
        //         value = newValue
        //     }
        // })
        this.options.data = new Proxy(data, {
            get(target, key) {
                return target[key]
            },
            set(target, key, value) {
                console.log('set...');
                let event = new CustomEvent(key, {
                    detail: value
                });
                _this.dispatchEvent(event);
                target[key] = value;
                return true
            }
            
        })
    }


    // compile() {
    //     let ele = document.querySelector(this.options.el);
    //     let childNodes = ele.childNodes;
    //     // console.log(childNodes)
    //     this.compileNodes(childNodes)
    // }
    // compileNodes(nodes) {
    //     nodes.forEach( node => {
    //         if(node.nodeType === 1) { // 元素节点
    //             let attrs = node.attributes;
    //             // console.log(attrs)
    //             [...attrs].forEach(attr => {
    //                 if(attr.name.substr(2) === 'html') {
    //                     node.innerHTML = this.options.data[attr.value]
    //                 } else if(attr.name.substr(2) === 'model') {
    //                     node.value = this.options.data[attr.value];
    //                     node.addEventListener('input', e => {
    //                         console.log(e.target.value)
    //                         this.options.data[attr.value] = e.target.value
    //                     })
    //                 }
    //             })
    //             if(node.childNodes.length > 0) {
    //                 this.compileNodes(node.childNodes)
    //             }
    //         } else if(node.nodeType === 3) {
    //             let reg = /\{\{\s*(\S+)\s*\}\}/g;
    //             let textContent = node.textContent
    //             let test = reg.test(textContent);
    //             if(test) {
    //                 let $1 = RegExp.$1;
    //                 node.textContent = textContent.replace(reg, this.options.data[$1])

    //                 // 更新渲染
    //                 this.addEventListener($1, e => {
    //                     // console.log(e.detail)
    //                     let newValue = e.detail;
    //                     let oldValue = this.options.data[$1]
    //                     let _reg = new RegExp(oldValue, 'g');
    //                     node.textContent = node.textContent.replace(_reg, newValue)
    //                 })
    //             }
    //         }
    //     })
    // }
}