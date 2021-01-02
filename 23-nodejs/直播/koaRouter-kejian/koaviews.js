const Koa = require("koa");
const Router = require("koa-router");
const views = require("koa-views");
const static = require("koa-static");
let app = new Koa();
let router = new Router();
// console.log(__dirname,__filename);
app.use(views(__dirname+"/views"),{
    map:{
        html:"pug"
    }
})
app.use(static(__dirname+"/static"))
router.get("/index",async ctx=>{
   await ctx.render("index.pug",{
       name:"张三"
   });
})
app.use(router.routes());
app.listen(8989);
// 新闻列表的后端管理系统；下节课讲的 
// npm i hade    hade  ;
// 作业：通 koa 重构 新闻列表  分页  详细页面 ；

