const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router()

router.get('/', (ctx, next) => {
    ctx.body = 'hello'
});

router.get('/getData', (ctx, next) => {
    // ctx.status = 302 // 重定向
    // ctx.set('location', 'https://www.baidu.com')  // 当status 为302时，设置location，可以将网页重定向到指定地址
    ctx.body={
        name: 'zhangsan',
        age: 24
    }
})

app.use(router.routes());
app.listen(8084)