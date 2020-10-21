#!/usr/bin/env node

/*
    用AST修改源码，导出全部方法
    让这个文件中的函数改写成能够全部导出的形式，例如：

    function add (a, b) {
        return a + b
    }
    改为
    exports.add = (a, b) => {
        return a + b
    }

    除了使用fs.read读取文件、正则匹配替换文本、fs.write写入文件这种笨拙的方式外，我们可以用AST优雅地解决问题。
*/

// 首先用builders 凭空实现一个箭头函数

const recast = require('recast');
const {
    identifier: id,
    expressionStatement,
    memberExpression,
    assignmentExpression,
    arrowFunctionExpression,
    blockStatement
} = recast.types.builders;

recast.run(function (ast, printSource) {
    // 一个块级域{}
    console.log('\n\nstep1:')
    printSource(blockStatement([]))

    // 一个箭头函数
    console.log('\n\nstep2:')
    printSource(arrowFunctionExpression([], blockStatement([])))

    // add 赋值为箭头函数 add = () => {}
    console.log('\n\nstep3: ')
    printSource(assignmentExpression('=', id('add'), arrowFunctionExpression([], blockStatement([]))))

    // exports.add 赋值为箭头函数 exports.add = () => {}
    console.log('\n\nstep4:')
    printSource(expressionStatement(assignmentExpression('=', memberExpression(id('exports'), id('add')), arrowFunctionExpression([], blockStatement([])))))
})

/*
    上面写了我们一步一步推断出exports.add = ()=>{}的过程，从而得到具体的AST结构体。

    使用node exportific demo.js运行可查看结果。

    接下来，只需要在获得的最终的表达式中，把id(‘add’)替换成遍历得到的函数名，把参数替换成遍历得到的函数参数，把blockStatement([])替换为遍历得到的函数块级作用域，就成功地改写了所有函数！

    另外，我们需要注意，在commonDivision函数内，引用了sub函数，应改写成exports.sub
*/

