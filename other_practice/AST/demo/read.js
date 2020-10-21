#!/usr/bin/env node

/* 
    recast.run —— 命令行文件读取

    recast.visit —— AST节点遍历
*/

const recast = require('recast');
const TNT = recast.types.namedTypes;

recast.run( function (ast, printSource) {
    // printSource(ast)
    recast.visit(ast, {
        // visitExpressionStatement: function ({node}) {
        //     console.log(node)  // 输出AST对象
        //     return false
        // }

        visitExpressionStatement: function (path) {
            // const node = path.node;
            // printSource(node);   // 输出 AST 对象对应的源码

            // const node = path.value;
            // 判断是否为ExpressionStatement，正确则输出一行字
            // if(TNT.ExpressionStatement.check(node)) {
            //     console.log('这是一个 ExpressionStatement')
            // }

            const node = path.node;
            //  判断是否为ExpressionStatement，正确不输出，错误则全局报错
             TNT.ExpressionStatement.assert(node)

            this.traverse(path)
        }
    })
})

