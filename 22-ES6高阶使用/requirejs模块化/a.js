
require(['b'], function (obj) {
    console.log(obj)
})

let a = 1
console.log('module a')

// console.log(b)
// requirejs 导出模块
define(['b'], {
    a,
    name: 'zhangsan'
})