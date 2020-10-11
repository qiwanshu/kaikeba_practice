class Jq{
    constructor(arg, root) {

        if(typeof root === 'undefined') {
            this.prevObject = new Jq(document, null)
        } else {
            this.prevObject = root;
        }
        // if(root) {
        //     this.prevObject = root;
        // }
        // this.prevObject = {};
        if(typeof arg === 'string') {    // 字符串
            let eles = document.querySelectorAll(arg)
            this.addEle(eles)
        } else if(typeof arg === 'function') {   // 事件
            // arg()
            window.addEventListener('DOMContentLoaded', arg)
        } else {    // 原生节点
            if(typeof arg.length === 'undefined') {   // 单个节点
                this[0] = arg;
                this.length = 1
            } else {
                this.addEle(arg)
            }
        }

        this.cssHooks = {
            
        }
        
    }

    addEle(eles) {
        eles.forEach((item, index) => {
            this[index] = item
        })
        this.length = eles.length
    }


    eq(num) {
        return new Jq(this[num], this)
    }
    end() {
        return this.prevObject
    }

    // 添加click事件
    click(fn) {
        console.log(this)
        for(let i = 0; i < this.length; i++) {
            // fn()
            this[i].addEventListener('click', fn)
        }
    }
    on(eventName, fn) {
        console.log(eventName)
        let reg = /\s+/g;
        let events = eventName.replace(reg, " ");
        let eventArr = events.split(" ")

        for (let i = 0; i< eventArr.length; i++) {
            for(let j = 0; j < this.length; j++) {
                this[j].addEventListener(eventArr[i], fn)
            }
        }

        // eventArr.forEach((item, index) => {
        //     for(let i = 0; i < this.length; i++) {
        //         this[i].addEventListener(item, fn)
        //     }
        // })
        
    }
    
    css(...arg) {
        // console.log(arg)
        if(arg.length > 1) {
            // 设置样式
            for(let i = 0; i < this.length; i++) {
                // this[i].style[arg[0]] = arg[1]
                this.setStyle(this[i], arg[0], arg[1])
            }
        } else {
            if(typeof arg[0] === 'string'){
                this.getStyle(this[0], arg[0])
            } else {
                console.log(arg)
                // arg[0]
                
                for(let i = 0; i < this.length; i++) {
                    for (let k in arg[0]) {
                        // console.log(k)
                        // this[i].style[k] = arg[0][k]
                        this.setStyle(this[i], k, arg[0][k])
                    }
                }
                
            }
        }
    }

    getStyle(ele, styleName) {
        return getComputedStyle(ele, null)[styleName] || ele.currentStyle[styleName];
    }

    setStyle(ele, styleName, targetStyle) {
        ele.style[styleName] = targetStyle
    }
}

function $(arg) {
    return new Jq(arg)
}