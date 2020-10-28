// console.log("我是 index.js")
// require('./2-Modulea.js')
// console.log(a)  // 在 2-Modulea.js 中定义变量 a = 1, 在此 index.js 文件中打印a 会报错  a is not defined

/*
    如果想要在这个文件中读取 2-Modulea.js 文件中的变量，需要在 2-Modulea.js 文件中导出
    2-Modulea.js 文件中导出对象之后，在该文件中引入
*/

// let Ma = require('./2-Modulea.js') // Ma 即 2-Modulea.js 文件中导出的对象, 注意导出文件前面的 ./ 不能省略, .js 后缀可以省略
// console.log(Ma)   // {a: 1}
// console.log(Ma.a)  // 1

// let cai = new Ma.Person()
// cai.hobby()

// 模块的引用除了可以通过文件的方式还可以通过目录
// 引入 home 文件夹，会自动去找 home 目录中的 index.js 文件
// require('./home')
// let home = require('./home');
// console.log(home.a, home.b)

// 在这里 引入 node_modules 中的模块

// let mytest = require('mytest')
require('mytest')    // node_modules 中的模块引入不需要加 ./
// console.log(a, b)