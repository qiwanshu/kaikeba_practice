https://www.jianshu.com/p/019d449a9282

### 什么是AST（抽象语法树）？
It is a hierarchical program representation that presents source code structure according to the grammar of a programming language, each AST node corresponds to an item of a source code.
它是一种分层程序表示，根据编程语言的语法表示源代码结构，每个AST节点都对应一个源代码项。
在计算机科学中，抽象语法和抽象语法树其实是源代码的抽象语法结构的树状表现形式。
在计算机科学中，一个抽象语法树，或者词法树，是一个树，这个树表示或者说抽象出了编程语言的源代码的结构。

我们常用的浏览器就是通过将js代码转化为抽象语法树来进行下一步的分析等其他操作。所以将js转化为抽象语法树更利于程序的分析。

实际上，正真AST每个节点会有更多的信息。但是，这是大体思想。从纯文本中，我们将得到树形结构的数据。每个条目和树中的节点一一对应。

https://segmentfault.com/a/1190000014389494

一般来说，程序中的一段源代码在执行之前会经历下面三个步骤：

1. 分词／词法分析
这个过程会将由字符组成的字符串分解成有意义的代码快，这些代码块被称为词法单元。例如 var a = 4；会被分解成 var、a、=、4、;

2. 解析／语法分析
这个过程是将词法单元流（数组）转换成一个由元素逐级嵌套所组成的代表了程序语法结构的树，这个树就叫“抽象语法树”（AST）。全称 Abstract Syntax Tree。

3. 代码生成
将AST转换成可执行代码的过程称为代码生成。抛开具体细节不讲，简单来说就是有某种方法可以将var a= 4; 的AST转化为一组机器指令,用来创建一个叫做a的变量，并将一个值储存在a中。

词法分析和语法分析是从代码中生成AST的关键所在。

### 词法分析

第一步，词法分析，也叫做扫描scanner。它读取我们的代码，然后把它们按照预定的规则合并成一个个的标识tokens。同时，它会移除空白符，注释，等。最后，整个代码将被分割进一个tokens列表（或者说一维数组）。

当词法分析源代码的时候，它会一个一个字母地读取代码，所以很形象地称之为扫描-scans；当它遇到空格，操作符，或者特殊符号的时候，它会认为一个话已经完成了

### 语法分析

第二步，语法分析，也称解析器。它会将词法分析出来的数组转化成树形的表达形式。同时，验证语法，语法如果有错的话，抛出语法错误。

当生成树的时候，解析器会删除一些没必要的标识tokens（比如不完整的括号），因此AST不是100%与源码匹配的，但是已经能让我们知道如何处理了。说个题外话，解析器100%覆盖所有代码结构生成树叫做CST（具体语法树）

在线玩转AST: https://astexplorer.net/

### babylon 

第三方库，它被用在大名鼎鼎的babel中，也许这也是它之所以这么火的原因。因为有babel项目的支持，我们可以意料到它将与时俱进，一直支持最新的JS特性，因此可以放心大胆地用，不怕以后JS又出新版导致代码的大规模重构。另外，它的API也非常的简单，容易使用。

### bable
babel是一个javascript编译器。宏观来说，它分3个阶段运行代码：解析（parsing），转译（transforming），生成（generation）。我们可以给babel 一些javascript代码，它修改代码然后生成新的代码返回。那它是怎样修改代码的呢？没错！它创建了AST，遍历树，修改tokens，最后从AST中生成新的代码。


### JavaScript Parser
JavaScript Parser 把js源码转化为抽象语法树的解析器。前边我们也说了。浏览器在执行js之前会把js源码通过解析器转化为抽象语法树，再进一步转化为字节码甚至是机器码。

常用的JavaScript Parser有： 
- Esprima
- UglifyJS2
- Traceur
- Acorn
- Espree
- Shfit

### 抽象语法树的用途
- IDE插件，如代码语法检查，代码风格检查，代码的格式化，代码高亮，代码错误等等之类的
- 代码的混淆压缩，如UglifyJS2等
- 转换代码的工具。如webpack，rollup，各种代码规范之间的转换，ts，jsx等转换为原生js


### AST的三板斧
- 通过esprima生成AST
- 通过estraverse遍历和更新AST
- 通过escodegen将AST重新生成源码


### recast：AST螺丝刀

AST工具库：解析AST(parse)，遍历AST，修改AST，生成代码。

安装：`npm i recast -S`

`recast.types.builders` 制作模具

Recast的三项主要功能:
- run: 通过命令行读取js文件，并转化成ast以供处理。
- tnt: 通过assert()和check()，可以验证ast对象的类型。
- visit: 遍历ast树，获取有效的AST对象并进行更改

### recast.run —— 命令行文件读取

它还提供了一个printSource函数，随时可以将ast的内容转换回源码，以方便调试。

### recast.visit —— AST节点遍历

recast.visit将AST对象内的节点进行逐个遍历。

```js
    #!/usr/bin/env node
    const recast  = require('recast')
    recast.run(function(ast, printSource) {
    recast.visit(ast, {
        visitExpressionStatement: function({node}) {
            console.log(node)
            return false
        }
        });
    })
```

### TNT —— 判断AST对象类型

TNT，即recast.types.namedTypes，就像它的名字一样火爆，它用来判断AST对象是否为指定的类型。
- TNT.Node.assert()，就像在机器里埋好的炸药，当机器不能完好运转时（类型不匹配），就炸毁机器(报错退出)
- TNT.Node.check()，则可以判断类型是否一致，并输出False和True
上述Node可以替换成任意AST对象，例如TNT.ExpressionStatement.check(),TNT.FunctionDeclaration.assert()


- 你想操作函数声明，就使用visitFunctionDelaration遍历，想操作赋值表达式，就使用visitExpressionStatement。 只要在 AST对象文档中定义的对象，在前面加visit，即可遍历。
- 通过node可以取到AST对象
- 每个遍历函数后必须加上return false，或者选择以下写法，否则报错。
```js
    #!/usr/bin/env node   // 在所有使用recast.run()的文件顶部都需要加入这一行
    const recast  = require('recast')
    recast.run(function(ast, printSource) {
    recast.visit(ast, {
        visitExpressionStatement: function(path) {
            const node = path.node
            printSource(node)
            this.traverse(path)
        }
        })
    })
```
调试时，如果你想输出AST对象，可以console.log(node)
如果你想输出AST对象对应的源码，可以printSource(node)


### 前端工程化，离不了 AST

https://www.dazhuanlan.com/2019/12/10/5dee7cc11a998/

虽然AST是编译原理中的基础内容，但在大前端时代，它有很广的应用。
比如我们的babel、eslint、代码格式化、代码自动补全、代码压缩、JSX 甚至 Typescript 都是在 AST 上进行操作的。

### AST 应用

应用AST，首先得先把 JS 代码转成 AST，然后用 文档中的 API 去修改树，修改完成后，再解析树并输出 JS 代码。