const fs = require('fs');
const http = require('http');
const path = require('path');
const mime = require('../../mime.json')
let server = http.createServer((req, res) => {    // 创建一个服务
    /*
        req: request - 浏览器——服务端 请求
        res: response - 服务端——浏览器 响应
    */
    console.log(req.url)
    
    // 设置头部
    // res.setHeader("Content-type","text/html;charset=utf-8")  // 不设置头部中文会乱码
    // res.writeHead(200, {'Content-type': 'text/html;charset=utf-8'})

    if(req.url == '/index') {
        res.writeHead(200, {'Content-type': 'text/html;charset=utf-8'})
        // let indexData = fs.readFileSync('./index.html')
        // res.write(indexData) 
        // res.end()  // res.end()  给浏览器一个提示，表示可以停止请求

        // 通过 stream 流读取文件
        let rs = fs.createReadStream('./index.html');
        rs.pipe(res)  // 将rs 导出到 res, 使用pipe  就不需要使用res.end

    } else if(req.url == '/product') {
        res.writeHead(200, {'Content-type': 'text/html;charset=utf-8'})
        res.write('产品页') 
        res.end()
    } else {
        let extname = path.extname(req.url)   // 获取资源后缀名
        // console.log(extname)
        res.writeHead(200, {'Content-type': mime[extname]})   // 设置头部 css 才会生效
        let rs = fs.createReadStream('.'+req.url)
        rs.pipe(res)
    }
    
})

server.listen(3000)   // 监听3000端口