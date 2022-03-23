// 数据操作
const mysql2 = require('mysql2')   // 用于连接数据库
// const Connection = require('mysql2/typings/mysql/lib/Connection')
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qws123',
    database: 'jssql'
})

module.exports = {
    // 定义一个方法，用于请求数据
    async getData(currPage, pageSize) {   // 在 控制层 controller 调用此方法
        const [rows] = await connection.promise().query(`SELECT * FROM news LIMIT ${(currPage-1)*pageSize}, ${pageSize}`);
        // console.log(rows) 
        const total =  rows.length
        return rows
    },

    async getTotal() {
        const [rows] = await connection.promise().query(`SELECT * FROM news`);
        return rows.length
    }
}