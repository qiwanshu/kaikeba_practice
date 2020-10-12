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
                if(arg[0] in $.cssHooks) {
                    $.cssHooks[arg[0]].set(this[i], arg[1])
                } else {
                    this.setStyle(this[i], arg[0], arg[1]);
                }
                
            }
        } else {
            if(typeof arg[0] === 'string'){
                if(arg[0] in $.cssHooks) {
                    // console.log(arg[0])
                    return $.cssHooks[arg[0]].get(this[0])
                } else {
                    this.getStyle(this[0], arg[0])
                }
                
            } else {
                for(let i = 0; i < this.length; i++) {
                    for (let k in arg[0]) {
                        // console.log(k)
                        // this[i].style[k] = arg[0][k]
                        if( k in $.cssHooks ) {
                            $.cssHooks[k].set(this[i], arg[0][k])
                        }
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
        if (typeof styleValue == "number" && !(styleName in $.cssNumber)) {
            styleValue = styleValue + "px";
        }
        ele.style[styleName] = targetStyle
    }
}

function $(arg) {
    return new Jq(arg)
}

$.cssNumber = {
    animationIterationCount: true,
    columnCount: true,
    fillOpacity: true,
    flexGrow: true,
    flexShrink: true,
    fontWeight: true,
    gridArea: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnStart: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowStart: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    pm: true,
    widows: true,
    zIndex: true,
    zoom: true
}

$.cssHooks = {
    
}