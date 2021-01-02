const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const statics = require('koa-statics')

const app = new Koa();
const router = new Router();
// console.log(__dirname)
// console.log(__filename)
app.use(views(__dirname+"/views"), {
    map: {
        html: 'pug'
    }
})
app.use(statics(__dirname+"/statics"));
router.get('/index', async (ctx, next) => {
    await ctx.render("index.pug", {
        name: 'zhangsan'
    })
})

app.use(router.routes());
app.listen(8083)