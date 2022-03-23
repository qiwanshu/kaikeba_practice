const Router = require('koa-router');
const router = new Router({
    prefix: '/admin'
});

const adminController = require('./../controller/admin')

router.get('/', ctx => {
    ctx.redirect = '/admin/index'
})

router.get('/index', adminController.list);
router.get('/newsList', adminController.newsList);
router.get('/addNews', adminController.addNews);

module.exports = router