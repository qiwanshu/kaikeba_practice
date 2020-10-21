#!/usr/bin/env node

/*
    在获得的最终的表达式中，把id(‘add’)替换成遍历得到的函数名，把参数替换成遍历得到的函数参数，把blockStatement([])替换为遍历得到的函数块级作用域，就成功地改写了所有函数！
*/

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
    // 用来保存遍历到的全部函数名
    let funcIds = [];
    recast.types.visit(ast, {
        // 遍历所有的函数定义
        visitFunctionDeclaration(path) {

            // 获取遍历到的 函数名、参数、块级域
            const node = path.node
            const funcName = node.id  
            const params = node.params
            const body = node.body

            // 保存函数名
            funcIds.push(funcName.name)

            const rep = expressionStatement(assignmentExpression(('='), memberExpression(id('exports'), funcName), arrowFunctionExpression(params, body)));

            // 将原来函数的AST结构体，替换成推导AST结构体
            path.replace(rep);

            // 停止遍历
            return false
        }
    })

    recast.types.visit(ast, {
        // 遍历所有的函数调用
        visitCallExpression(path) {
            const node  = path.node;

            // 如果函数调用出现在函数定义中，则修改AST结构
            if(funcIds.includes(node.callee.name)) {
                node.callee = memberExpression(id('exports'), node.callee)
            }

            // 停止遍历
            return false
        }
    })

    // 打印修改后的AST源码
    printSource(ast)

    
    // // 一个块级域{}
    // console.log('\n\nstep1:')
    // printSource(blockStatement([]))

    // // 一个箭头函数
    // console.log('\n\nstep2:')
    // printSource(arrowFunctionExpression([], blockStatement([])))

    // // add 赋值为箭头函数 add = () => {}
    // console.log('\n\nstep3: ')
    // printSource(assignmentExpression('=', id('add'), arrowFunctionExpression([], blockStatement([]))))

    // // exports.add 赋值为箭头函数 exports.add = () => {}
    // console.log('\n\nstep4:')
    // printSource(expressionStatement(assignmentExpression('=', memberExpression(id('exports'), id('add')), arrowFunctionExpression([], blockStatement([])))))
})

