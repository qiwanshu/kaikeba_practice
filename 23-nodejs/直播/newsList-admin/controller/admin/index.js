module.exports = {
    index(ctx) {
        ctx.body = '主页'
    },
    newsList(ctx) {
        ctx.body = '新闻列表'
    },
    addNews(ctx) {
        ctx.body = '添加新闻'
    }
}