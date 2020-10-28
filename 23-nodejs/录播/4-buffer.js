/*
    buffer:
        字面意思 缓冲区
        在js 中是一个类，也可以理解为一种数据格式
        很多数据在传输过程中，在node中，会通过 buffer 转换成二进制，二进制在底层传输很快，并且不分形式，传输效率高，所以node会把很多 文件/数据 的传输转换成二进制来进行传输
        buffer 实际上是二进制数据，但是是通过两位的 十六进制 进行呈现


    buffer 创建
        let buffer = buffer.alloc(size) size 表示字节数， 创建指定大小的 buffer
            一个中文文字或中文符号 占三个字节，英文字母占一个字节，数字占一个字节，一个字节大小为 1b
        let buffer = Buffer.from(str)

    StringDecoder
        node 中的内置模块，可以处理 Buffer 中的乱码
        let { StringDecoder} = require('string_decoder)
        let decoder = new StringDecoder()
        decoder.write(buffer1);
        decoder.write(buffer2)
        decoder 会将第一个buffer中多余的字节存起来，与之后的字节进行拼接
        性能更好




    ps: buffer 并不是nodejs 中的模块
*/

// buffer 创建

// new Buffer()  // nodejs 6.0 之前通过这种方式创建

// 1
// let buffer = Buffer.alloc(10)   // node 6.0 之后这样创建
// console.log(buffer)   // <Buffer 00 00 00 00 00 00 00 00 00 00>

// 通过 字符串方式创建
// let buffer = Buffer.from('大家好，我是buffer')
// console.log(buffer)     // <Buffer e5 a4 a7 e5 ae b6 e5 a5 bd ef bc 8c e6 88 91 e6 98 af 62 75 66 66 65 72>

// 通过 数组方式创建
// let buffer = Buffer.from([0xe5, 0xa4, 0xa7, 0xe5, 0xae, 0xb6, 0xe5, 0xa5, 0xbd, 0xef, 0xbc, 0x8c, 0xe6, 0x88, 0x91, 0xe6, 0x98, 0xaf, 0x62, 0x75, 0x66, 0x66, 0x65, 0x72])
// 十六进制数字 以 0x 开头
// console.log(buffer)   // <Buffer e5 a4 a7 e5 ae b6 e5 a5 bd ef bc 8c e6 88 91 e6 98 af 62 75 66 66 65 72>
// console.log(buffer.toString())   // 大家好，我是buffer

let buffer1 = Buffer.from([0xe5, 0xa4, 0xa7, 0xe5]);
let buffer2 = Buffer.from([0xae, 0xb6, 0xe5, 0xa5, 0xbd]);
// // console.log(buffer1.toString())  // 大�， 会出现乱码，3个字节再能组成一个汉字，最后一个字节乱码
// let newBuffer = Buffer.concat([buffer1, buffer2])
// // console.log(newBuffer)
// console.log(newBuffer.toString())

// StringDecoder 处理乱码
let {StringDecoder} = require('string_decoder');
let decoder = new StringDecoder
let res1 = decoder.write(buffer1);
let res2 = decoder.write(buffer2)
// console.log(res1)
// console.log(res2)
console.log(res1 + res2)
