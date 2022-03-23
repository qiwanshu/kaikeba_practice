const Koa = require('koa');
const views = require('koa-views');
const statics = require('koa-statics');
const app = new Koa();

const router = require('./router')

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))
app.use(statics(__dirname +'/statics'), {})

router(app)
app.listen(4000)