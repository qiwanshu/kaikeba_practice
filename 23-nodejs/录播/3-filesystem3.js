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
            fs.mkdir(路径/dirname, cb)  创建目录
            fs.rename(dirname, newDirname, cb)  修改目录名称
            fs.readdir(directorypath, cb)   读取目录中的文件 或 目录，返回文件或目录组成的数组
            fs.redir(directorypath, cb)  删除目录 必须是空文件夹/目录
        
        - 文件、目录通用操作（方法）
            fs.exists('22' cb)  返回布尔值
            fs.stat('22', cb)
            

    所有文件没有加Sync 都是异步的，加Sync 是同步， readFile readFileSync
*/
const fs = require('fs')

// 文件、目录 通用操作 

// 判断文件目录是否存在
// fs.exists('11', exists => {
//     console.log(exists)   
// })

// 获取文件/目录的详细信息
fs.stat('index.html', (err, stat) => {
    if(err) {
        return 
    }
    console.log(stat)

    // 判断是否是一个文件
    console.log(stat.isFile())

    // 判断是否是一个目录
    console.log(stat.isDirectory())
})