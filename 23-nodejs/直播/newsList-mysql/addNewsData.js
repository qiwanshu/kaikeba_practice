const mysql2 = require('mysql2');  // nodejs mysql2 库
const data = require('./data.json');


// 与数据库建立链接
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qws123',
    database: 'jssql'   // 链接的数据库
})

// connection.query("SELECT*FROM users", (err, results, fields) => {
//     if(err) {
//         return console.log(err);
//     }
//     console.log(results)  // res 为查询到的结果
//     console.log(fields)
// })
// const [rows, fields] = await connection.execute('SELECT * FROM `table` WHERE `name` = ? AND `age` > ?', ['Morty', 14]);

// async function fn() {
//     const [rows, fields] = await connection.promise().query("SELECT*FROM users");

//     console.log(rows)
// }
// fn()

// data.forEach(async item => {
//     const [rows] = await connection.promise().query("INSERT INTO news(title, imgUrl, source, newTime) VALUES(?,?,?,?)",[item.title, item.imgUrl, item.from, item.newTime])   // 防止 sql注入
    
//     console.log(rows)
// })