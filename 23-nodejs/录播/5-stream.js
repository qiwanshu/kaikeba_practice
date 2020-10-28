/*
    stream 流： 是一个概念，并非模块
        传递数据或文件的过程中如果 数据或文件特别大，（假设 2 个 G，一次传递就需要占 2 个 G 的带宽），接收方也需要很大的内存，当带宽不够或内存小的情况下，会导致传输失败，还有可能导致内存爆仓（溢出）。
        
        stream 会将很大的数据或者文件切割成很多小块，一次进行传递，像流水一样
        可以充分利用资源，不会一次将所有的带宽或内存都占满，性能更好

        应用场景：文件上传、post数据传输，加载HTML

    fs.createReadStream(file) 创建可读流：流会把数据分成 64kb 的份进行传输
        如果文件很大，可以把这个文件分成各个小块
        let rs = fs.createReadStream(file)
        rs.on('data', chunk=> {})   通过 on 监听 data 事件，chunk 为每次读取的单位，每次读取 64kb 的内容
        rs.on('end', () => {})  监听数据是否读取完成，当流完成（即数据读取完成）会触发这个方法
        rs.pipe(ws)
    fs.createWriteStream(filename) 写入流
        let ws = fs.createWriteStream(filename)
        rs.pipe(ws)  导出


*/

const fs = require("fs");

// const res = fs.readFileSync('1.txt')
// console.log(res.toString())
let num = 0;
let str = ''
// 读取流
let rs = fs.createReadStream('1.txt')
rs.on('data', chunk => {   //  chunk 每次读取的单位（每次读取一个 chunk）
    // num++
    // console.log(num)
    // console.log(chunk)  // <Buffer e6 88 91 e6 98 af 31 2e 74 78 74 e6 96 87 e4 bb b6>
    str += chunk
})

rs.on('end', () => {
    console.log(str)
})

// 写入流
let ws = fs.createWriteStream('2.txt');  // 创建一个名为 2.txt 的文件
// 将 读取到的流 rs 导出到创建的流 ws 中
rs.pipe(ws)


// 写入一个 65kb 的文件
// let buffer = Buffer.alloc(65*1024) // 一个 字节 占 1b，65kb 占 65*1024 个字节
// fs.writeFile('65kb', buffer, err => {
//     if(err) {
//         return console.log(err)
//     }
//     console.log('写入成功')
// })
// let rs = fs.createReadStream('65kb');
// rs.on('data', chunk => {
//     console.log(chunk)   // 将 65kb 切割成两份
// })

