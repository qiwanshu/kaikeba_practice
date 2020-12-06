// node 爬虫 获取网页数据 

const http = require('http');

const fs = require('fs');
const cheerio = require('cheerio')

let webUrl = "http://news.ifeng.com/";  // 如果 目标网站是 https 的，则需要 require('https)

http.get(webUrl, (request, response) => {  // 获取 webUrl 网站中的数据
    // console.log(request, response)
    let str = ''
    request.on('data', chunk => {     // 监听 data 方法
        str += chunk
    })

    request.on('end', () => {  // 监听 end 方法，读取数据结束
        // console.log(str)
        formatData(str)
    })
})

function formatData(data) {
    let $ = cheerio.load(data)
    // console.log($)
    let arr = [];
    // console.log($('.news-stream-newsStream-news-item-infor h2 a'))
    $('.news-stream-newsStream-news-item-infor h2 a').each((k, v) => {
        // console.log($(v).text())
        let dataObj = new Date();
        let obj = {
            id:k+1,
            title:$(v).text(),
            addtime:dataObj.getFullYear()+"-"+(dataObj.getMonth()+1)+"-"+dataObj.getDate(),
            country:"美国",
            type:"逮捕",
            detail:$(v).text(),
            img:"./img/img.png"
        }
        arr.push(obj);
    })

    fs.writeFileSync('data.json', JSON.stringify(arr))

}