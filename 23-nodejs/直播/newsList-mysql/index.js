const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const statics = require('koa-statics');
const mysql2 = require('mysql2'); 
// const listData = require('./data.json');

// console.log(url)

const app = new Koa();
const router = new Router();

const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qws123',
    database: 'jssql'   // 连接的数据库
})

// app.use(views(__dirname + '/view'), {
//     map: {
//         html: 'pug'
//     }
// })

app.use(views(__dirname + '/view', {
    map: {
        html: 'pug'
    }
}))

app.use(statics(__dirname+"/static"), {});

router.get("/", ctx => {
    ctx.redirect("/list");  // 重定向
});

router.get("/list", async (ctx, next) => {
    // console.log(ctx.query.p)
    let p = parseInt(ctx.query.p) || 1;
    const pageSize = 5;
    // const totalPage = Math.ceil(listData.length/pageSize);
    // let nowData = listData.slice((p-1)*pageSize, p*pageSize);
    // console.log((p-1)*pageSize, p*pageSize)
    const [rows] = await connection.promise().query(`SELECT * FROM news LIMIT ${(p-1)*pageSize}, ${pageSize}`)
    // console.log(rows)
    await ctx.render("list.pug", {
        p,
        newData: rows,
        totalPage: 5
    })
})

router.get("/detail", async (ctx, next) => {
    let id = ctx.query.id
    const detailData = listData.filter(item => item.id == id)[0]
    // console.log(detailData)
    await ctx.render("detail.pug", {
        detail: detailData
    })
})


app.use(router.routes());
app.listen(8081)