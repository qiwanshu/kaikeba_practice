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
            

    所有文件没有加Sync 都是异步的，加Sync 是同步， readFile readFileSync
*/
const fs = require('fs')

// 目录操作 

// 创建目录
// fs.mkdir('home/11', err => {
//     if(err) {
//         return console.log(err)
//     }
//     console.log('创建成功')
// })

// 改 : 修改目录名称, 修改必须在同一路径下
// fs.rename('home/11', 'home/22', err => {
//     if(err) {
//         return console.log(err)
//     }
//     console.log('修改成功')
// })

// 读： 读取目录
// fs.readdir('home/22', (err, data) => {
//     if(err) {
//         return console.log(err)
//     }
//     console.log(data)
// })
// console.log(fs.readdirSync('22'))

// 删除目录 (空文件夹/目录)
// fs.rmdir('22/33', err => {
//     if(err) {
//         return console.log(err)
//     }
//     console.log("删除成功")
// })

// 删除非空文件夹/目录
function removeDir(path) {
    let data = fs.readdirSync(path);
    // console.log(data)   // [ '2.html', '44', 'a.html' ]
    data.forEach(item => {
        const url = `${path}/${item}`
        const stat = fs.statSync(url)
        // console.log(stat)
        if(stat.isDirectory()) {
            // 目录
            removeDir(url)
        } else (
            // 文件
            fs.unlinkSync(url)
        )
    })

    fs.rmdirSync(path)
}

removeDir('home/22')