/*
    在nodejs 中，网页的加载，就是通过fs实现的，通过node读取文件，然后在输出（写入）到浏览器上
    fs 的操作
        - 文件操作
            增删改查
                fs.writeFile(文件名, 写入内容, cb ) 
                fs.writeFile(文件名, 写入内容, {flag: type}, cb ), type:
                    "a": 追加
                    "w": 重写，默认值
                    "r": 读取

                fs.readFile(filename, encode, cb)  读取文件
                    encode: 编码格式，一般为 utf8, 如果不传，则读取到的是 buffer 格式的数据
                    buffer 格式数据 data.toString()
                fs.rename(filename, newFilename,cb) 修改文件名
                fs.unlink(filename, cb) 删除文件
                fs.copyFile(filename, copyFilename, cb)  复制文件

        - 目录操作
            

    所有文件没有加Sync 都是异步的，加Sync 是同步， readFile readFileSync
*/
const fs = require('fs')

// 文件操作 
// 增 fs.writeFile(文件名, 写入内容, cb )
// fs.writeFile("1.txt", "文件1", function (err) {   // 异步方法
//     if(err) {
//         console.log(err)
//     } else {
//         console.log("写入成功")
//     }
// })

// 再次写入会覆盖上次写入的内容  fs.writeFile(文件名, 写入内容,{flag: type}, cb )
// fs.writeFile("1.txt", "文件1-22 2222wwwww", {flag: "a"} ,function (err) {   
//     if(err) {
//         console.log(err)
//     } else {
//         console.log("写入成功")
//     }
// })

// 查：文件读取 fs.readFile(filename, encode, cb) 

// fs.readFile('1.txt', 'utf8', (err, data) => {
//     if(err) {
//         return console.log(err)
//     } else {
//         // console.log(data)
//         console.log(data)  
//     }
// })

// fs.readFile('1.txt', (err, data) => {
//     if(err) {
//         return console.log(err)
//     } else {
//         // console.log(data)
//         console.log(data.toString())  
//     }
// })

// 改：修改文件名
// fs.rename('1.txt', '2.txt', function (err) {
//     if(err){
//         return console.log(err)
//     } else {
//         console.log("修改成功")  
//     }
// }) 

// 删：删除文件
// fs.unlink('2.txt', (err) => {
//     if(err) {
//         console.log(err)
//     } else {
//         console.log('删除成功')
//     }
// }) 

// 复制文件： 
// fs.copyFile('index.html', 'myindex.txt', err => {
//     if(err) {
//         return console.log(err)
//     }
//     console.log('复制成功')
// })

// 复制：先读取，再写入
function myCopy(src, dest) {
    const content = fs.readFileSync(src)   // 同步的返回值为读取到的文件内容
    // console.log(content)
    fs.writeFileSync(dest, content)
}

myCopy('index.html', 'myindex.html')