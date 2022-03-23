// 总路由
// const Router = require('koa-router');
// const router = new Router();
const newsRouter = require('./routers/newsRouter')
const adminRouter = require('./routers/adminRouter')
// console.log(newsRouter)
module.exports = function (app) {
    // router.get('/index', async ctx => {
    //     ctx.body = '新闻列表主页'
    // });
    app.use(newsRouter.routes());
    app.use(adminRouter.routes())
}

