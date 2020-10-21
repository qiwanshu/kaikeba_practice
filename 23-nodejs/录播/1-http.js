// 通过js写一个服务器
const http = require('http');
const server = http.createServer((req, res) => {
    res.write("hello word111222");
    res.end()
})

server.listen(3000)   // 3000 是端口号

/*
    在终端执行 node 1-http.js 命令，本机访问localhost:3000（在浏览器打开 localhost:3000），页面输出 hello word，就是res.write() 里面的内容，本机还可以通过127.0.0.1:端口号 进行访问
    如果使用其他电脑想要访问，需要访问服务器机器的IP地址，可通过ipconfig命令，查看IP地址，再使用其他电脑进行访问
    建服务的电脑称为服务器，访问服务器的电脑称为客户端
    服务端有修改，需要重启服务，才能生效

    nodemon: 命令工具，具有热更新功能，修改文件，不需要重启
        - 安装： npm install nodemon -g   安装到全局
        - 启动：nodemon + 文件名（nodemon 1-http.js）
*/

/*
    node 中的：
        - require：nodejs 中的 common 规范，是引入模块的一个语法糖，用于引入模块，本案例中引入 http 模块

    模块化：
        很早的时候，js 写的比较简单，后来越来越多，所以分多个文件，但是多个文件中变量可能会重复，这样就会出现变量污染，会出问题
        node 通过 commonjs 会把每一个文件划分成一个模块，每个模块有自己独立的命名空间，文件和文件之间会有相互的引入关系，不存在变量污染
*/
