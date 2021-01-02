const Koa = require('koa');
const app = new Koa();
const m3 = require('./m3')

const middleWare1 = (ctx, next) => {
    console.log('start 1');
    ctx.body = '中间件1';
    next(middleWare2)
    console.log('end 1')

}


const middleWare2 = (ctx, next) => {
    console.log('start 2');
    ctx.body = '中间件 2'
    console.log('end 2')
}

// app.use(m3)
app.use(async (ctx, next) => {
    ctx.body = '中间件3'
    // console.log(next())
    await next()   // await 后面必须跟promise
})

app.use((ctx, next) => {
    ctx.body = '中间件 4'
})

app.use(middleWare1);
app.use(middleWare2);
app.listen(3000)