/*
    homez 中的各个文件都不用管，只要保证有一个主入口（文件）就可以，通常主入口默认为 index.js
    在外面的index.js 中直接引入 home文件夹
*/

console.log("我是主入口文件 index.js");
require('./a')
require('./b')

module.exports = {
    a: 10,
    b: 20
}