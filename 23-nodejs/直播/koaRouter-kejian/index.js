const Koa = require("koa");
const Router = require("koa-router");

let app = new Koa();
let router = new Router();
// get post put delete;
// 用户操作接口
// www.test.com:80/addUser 增加
// www.test.com:80/deleteUser 删除
// www.test.com:80/updateUser 更新
// www.test.com:80/getUser 获取
// RESTful 架构api  
// www.test.com:80/user 增加  post
// www.test.com:80/user?id=1 删除 delete
// www.test.com:80/user 更新 put
// www.test.com:80/user 获取 get
// 

router.get("/",async (ctx,next)=>{
    ctx.body = "hello";
})
router.get("/getdata", (ctx,next)=>{
    // ctx.status = 404;
    // ctx.status = 302; //重定向；
    // ctx.set("location","http://www.baidu.com");
    ctx.body = {
        name:"张三",
        age:10
    };
    // 请求成功  {info:"请求成功",status:0}
    // 请求失败  {info:"请求失败",status:1}
})
router.get("/user",async (ctx,next)=>{
    ctx.body = "hello";
})
router.put("/user",async (ctx,next)=>{
    ctx.body = "hello";
})
router.delete("/user",async (ctx,next)=>{
    ctx.body = "hello";
})

// router.post("/",async (ctx,next)=>{
//     ctx.body = "hello";
// })
app.use(router.routes());
app.listen(8080);


