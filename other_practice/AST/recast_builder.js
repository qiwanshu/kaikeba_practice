/* 
    recast.types.builders 制作模具
        一个机器，你只会拆开重装，不算本事。拆开了，还能改装，才算上得了台面。recast.types.builders里面提供了不少“模具”，让你可以轻松地拼接成新的机器。
*/

// 把function add(a, b){…}声明，改成匿名函数式声明const add = function(a ,b){…}

/*
    第一步，我们创建一个VariableDeclaration变量声明对象，声明头为const， 内容为一个即将创建的VariableDeclarator对象。
    第二步，创建一个VariableDeclarator，放置add.id在左边， 右边是将创建的FunctionDeclaration对象
    第三步，我们创建一个FunctionDeclaration，如前所述的三个组件，id params body中，因为是匿名函数id设为空，params使用add.params，body使用add.body。
*/

// 引入变量声明，变量符号，函数声明三种“模具”
// const {variableDeclaration, variableDeclarator, functionExpression} = recast.types.builders;

// 将准备好的组件置入模具，并且装回原来的AST对象
// ast