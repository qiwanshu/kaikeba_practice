
const newsModel = require('./../../model/news');  // 引入 模型(数据)
module.exports = {
    async index(ctx) {
        // ctx.body = '新闻列表主页' 
        console.log(ctx.query.currPage)
        let currPage = ctx.query.currPage || 1;
        const pageSize = 5;

        // const nowData = newModel.getData()  // 数据相关要放在model里
        const newsData = await newsModel.getData(currPage, pageSize)  // getData 是一个异步函数，需要await 才能拿到数据
        const total = await newsModel.getTotal()
        const pages = Math.ceil(total/pageSize);
        // console.log(pages)
        await ctx.render('./news/index.pug', {
            newsData,
            pages
        })
    },

    async detail(ctx) {
        // ctx.body = '新闻详情'
        await ctx.render('./news/detail.pug')
    }
}