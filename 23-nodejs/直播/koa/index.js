// koa 、express 是nodejs框架
let Koa = require("koa");
let app = new Koa();
let m3 = require("./m3.js");
let middleWare1 = async (ctx,next)=>{
    // ctx ,context:上下文  req/res  ctx.req  ctx.res ；ctx.requset;ctx.response
    console.log("one start...");
    // ctx.body  === ctx.response.body
    
    // ctx.body = "hello world";
    ctx.response.body = "hello world";
    //转交下一个中间件
    await next();
    console.log("one end...");
}
let middleWare2 = (ctx,next)=>{
    // ctx ,context:上下文  req/res  ctx.req  ctx.res ；ctx.requset;ctx.response
    console.log("two start...");
    ctx.body = "hello world2222";
    //转交下一个中间件
    next();
    console.log("two end...");
}

app.on("error",(err)=>{
    console.log(err)
})


app.use(middleWare1)
app.use(middleWare2)
app.use(m3);



app.listen(3000);