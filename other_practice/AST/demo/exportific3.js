#!/usr/bin/env node

/*
    以下代码添加了两个小改动
        - 添加说明书—help，以及添加了—rewrite模式，可以直接覆盖文件或默认为导出*.export.js文件。
        - 将之前代码最后的 printSource(ast)替换成 writeASTFile(ast,filename,rewriteMode)
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

const fs = require('fs');
const path = require('path');

// 获取参数
const options = process.argv.slice(2);

// 如果没有参数，或提供了 -h 或 --help 选项，则打印帮助
if(options.length === 0 || options.includes('-h') || options.includes('--help')) {
    console.log(`
        采用common规则，将.js文件内所有函数修改为导出形式。
        选项: -r 或者 --rewrite 可直接覆盖原有文件
    `);

    process.exit(0)
}

// 只要有 -r 或者 --rewrite 参数，则 rewriteMode 为 true
let rewriteMode = options.includes('-r') || options.includes('--rewrite');

// 获取文件名
const clearFileArg = options.filter(item => {
    return !['-r', '--rewrite', '-h', '--help'].includes(item)
})

// 只处理一个文件
let filename = clearFileArg[0];
const writeASTFile = function (ast, filename, rewriteMode) {
    const newCode = recast.print(ast).code
    if(!rewriteMode) {
        // 非覆盖模式下，将新文件写入 *.exports.js 下
        filename = filename.split('.').slice(0, -1).concat(['exports', 'js']).join('.')
    }

    // 将新代码写入文件
    fs.writeFileSync(path.join(process.cwd(), filename), newCode)
}


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
    // printSource(ast)

    writeASTFile(ast, filename, rewriteMode)

    
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


/*
    执行 node exportific demo.js，可以在当前目录下找到源码变更后的demo.export.js文件
*/
