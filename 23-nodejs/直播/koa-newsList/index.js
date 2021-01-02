const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const statics = require('koa-statics');
const listData = require('./data.json');

// console.log(url)

const app = new Koa();
const router = new Router();

app.use(views(__dirname + '/view'), {
    map: {
        html: 'pug'
    }
})
app.use(statics(__dirname+"/static"), {});

router.get("/list", async(ctx, next) => {
    // console.log(ctx.query.p)
    let p = ctx.query.p || 1;
    const pageSize = 5;
    const totalPage = Math.ceil(listData.length/pageSize);
    let nowData = listData.slice((p-1)*pageSize, p*pageSize);
    await ctx.render("list.pug", {
        data: nowData,
        totalPage
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