// 路由相关
const Router = require('koa-router');
// const router = new Router();
const router = new Router({
    prefix: "/news"    // 前缀， 访问 /news/index  进入主页
});

router.get('/', ctx => {
    ctx.redirect = '/index'    // 重定向到index
})

// router.get('/index', async ctx => {
//     ctx.body = '新闻列表主页'  // 不是路由相关，属于控制层
// });  
// controller -> news/index
const newsController = require('./../controller/news');   // 引入 controller
router.get('/index', newsController.index)
router.get('/detail', newsController.detail)

module.exports = router