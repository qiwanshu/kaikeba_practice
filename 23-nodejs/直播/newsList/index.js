const http = require('http');
const path = require('path');
const fs = require('fs');
// const querystring = require('querystring')
const cheerio = require('cheerio');
const url = require('url')

const mime = require('./mime.json');
const data = require('./data.json')

let server = http.createServer((request, response) => {
    // console.log(querystring.parse(request.query))
    const urlObj = url.parse(request.url, true)
    if(urlObj.pathname === '/index' || urlObj.pathname === '/') {
        let pageData = fs.readFileSync('./views/index.html');
        // response.write(pageData);
        // response.end()
        let currPage = parseInt(urlObj.query.currPage) ||  1;
        // console.log(currPage)
        const pageSize = 5;
        let totalPage = Math.ceil(data.length/pageSize);
        let nowData = data.slice((currPage-1)*5, currPage*5)
        // response.writeHead(200, {'Content-type': 'text/html'});
        response.setHeader('Content-type', 'text/html, chartset=utf-8')
        let $ = cheerio.load(pageData);
        let htmlStr = '';
        nowData.forEach(v => {
            htmlStr += `
                <li class="news">
                    <a href="/detail?id=${v.id}">
                        <img src="./views/img/img.png" alt="">
                    </a>
                    <div>
                        <h3>
                            <a href="javascript:;">${v.title}</a>
                        </h3>
                        <div class="info">
                            <span class="tips"><span>纵火</span><span>韩国</span><span>逮捕</span></span>
                            <!-- <span class="line"></span> -->
                            <span class="time">| &nbsp;&nbsp;${v.addtime}</span>
                        </div>
                    </div>
                </li>
            `
        })
        let pageStr = '';
        pageStr += `<a href="/index?currPage=${currPage-1 < 1? 1: currPage-1}" class="prev">⌜</a>`;
        for(let i = 0; i < totalPage; i++) {
            pageStr += `<a href="/index?currPage=${i+1}" style="color:${(i+1) == currPage? 'rgb(247, 73, 73)': ''}">${i+1}</a>`
        }
        pageStr += `<a href="/index?currPage=${currPage+1 >= totalPage? totalPage: currPage+1}" class="next">⌝</a>`
        $('.news-list').html(htmlStr);
        $('.pagination').html(pageStr)
        response.end($.html())
    } else if(urlObj.pathname == '/detail') {
        // response.write('detail')
        response.writeHead(200, {'Content-type': 'text/html, chartset=utf-8'})
        let pageData = fs.readFileSync('./views/detail.html')
        let $ = cheerio.load(pageData);
        const detailData = data.filter(item => item.id == urlObj.query.id)[0];
        let detialStr = ''
        detialStr += `
            <h1 class="title">${detailData.title}</h1>
            <div class="article-info"> 类型：${detailData.type} 时间：${detailData.addtime}</div>
            <p class="content">
                ${detailData.detail}
            </p>
        `
        $('.text').html(detialStr)

        // response.end()
        response.end($.html())

    } else {
        if(request.url !== '/favicon.ico'){
            const extname = path.extname(request.url)
            // response.setHeader('Content-type', mime[extname])
            response.writeHead(200, {'Content-type': mime[extname]});
            let rs = fs.createReadStream('.' + request.url);
            rs.pipe(response)
        }
        
    }
})

server.listen(4000)