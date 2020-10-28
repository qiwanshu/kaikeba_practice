/*
    模块化：
        很早的时候，js 写的比较简单，后来越来越多，所以分多个文件，但是多个文件中变量可能会重复，这样就会出现变量污染，会出问题
        node 通过 commonjs 会把每一个文件划分成一个模块，每个模块有自己独立的命名空间，文件和文件之间会有相互的引入关系，不存在变量污染

    前端的模块化手段：
        - AMD: sea.js
        - CMD: require.js
    
    在 node 中，自带common.js模块化规范，装完 node 就会有

    commonjs 运用
*/

require('./2-Moduleb')
console.log('我是 modulea.js')
let a = 1

class Person{
    constructor() {
        this.name = '张三'
    }
    hobby() {
        console.log('喜欢游戏')
    }
}

// 导出一个对象，可以在对象中存入想导出的内容
module.exports = {
    a,
    Person   // 导出一个类
}

// 还可以这样导出
exports.a = a;
exports.Person = Person

// exports 是 module.exports 的引用  
// module.exports = exports、

// 不可以用这种方式导出, 这样不会改变module.exports 中的值，只会给 exports 重新赋值
// exports = {
//     a, 
//     Person 
// }

/*
    需要什么就导出什么，这种方式叫做按需导出
*/