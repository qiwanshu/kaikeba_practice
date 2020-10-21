
// 给你一把"螺丝刀"——recast
const recast = require('recast');

// 你的"机器"——一段代码
// 我们使用了很奇怪格式的代码，想测试是否能维持代码结构
const code = `
    function add (a, b) {
        return a + 
        // 有什么奇怪的东西混进来了
        b
    }
`

// 用螺丝刀解析机器
const ast = recast.parse(code);

// ast可以处理很巨大的代码文件
// 但我们现在只需要代码块的第一个body，即add函数
const add = ast.program.body[0]
// console.log(add)
// console.log(add.type)


/* 
    recast.types.builders 制作模具
        一个机器，你只会拆开重装，不算本事。拆开了，还能改装，才算上得了台面。recast.types.builders里面提供了不少“模具”，让你可以轻松地拼接成新的机器。
*/

// 把function add(a, b){…}声明，改成匿名函数式声明const add = function(a ,b){…}

/*
    第一步，我们创建一个VariableDeclaration变量声明对象，声明头为const， 内容为一个即将创建的VariableDeclarator对象。
    第二步，创建一个VariableDeclarator，放置add.id在左边， 右边是将创建的FunctionDeclaration对象
    第三步，我们创建一个FunctionDeclaration，如前所述的三个组件，id params body中，因为是匿名函数id设为空，params使用add.params，body使用add.body。

    这样，就创建好了const add = function(){}的AST对象。
*/

// 引入变量声明，变量符号，函数声明三种“模具”
const {variableDeclaration, variableDeclarator, functionExpression} = recast.types.builders;

// 将准备好的组件置入模具，并且装回原来的AST对象
ast.program.body[0] = variableDeclaration("const", [
    variableDeclarator(add.id, functionExpression(
        null, // Anonymize the function expression.  匿名化函数表达式
        add.params,
        add.body
    ))
]);

// 将AST对象重新转回可以阅读的代码
// const output = recast.print
/*
    打印出
    const add = function(a, b) {
        return a +
        // 有什么奇怪的东西混进来了
        b
    };

*/
// const output = recast.print(ast).code
// console.log(output)

/*
    其实是recast.parse的逆向过程，具体公式为:
    recast.print(recast.parse(source)).code === source
    打印出来还保留着“原装”的函数内容，连注释都没有变。
*/

//我们其实也可以打印出美化格式的代码段：
const output = recast.prettyPrint(ast, { tabWidth: 2 }).code
console.log(output)


