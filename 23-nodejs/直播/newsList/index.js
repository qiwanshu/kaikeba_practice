const http = require('http');
const path = require('path');
const fs = require('fs');
const querystring = require('querystring')
const cheerio = require('cheerio');

const mime = require('./mime.json');
const data = require('./data.json')

let server = http.createServer((request, response) => {
    // console.log(querystring.parse(request.query))
    if(request.url === '/index') {
        let pageData = fs.readFileSync('./views/index.html');
        // response.write(pageData);
        // response.end()
        let $ = cheerio.load(pageData);
        console.log($)
        let htmlStr = '';
        data.forEach(v => {
            htmlStr += `
                <li class="news">
                    <a href="javascript:;">
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
        $('.news-list').html(htmlStr);
        response.end($.html())
    } else if(request.url == '/detail') {
        // response.write('detail')
        console.log(111)

        response.end()

    } else {
        // console.log(222)
        let extname = path.extname(request.url)
        // response.setHeader('Content-type', mime[extname])
        response.writeHead(200, {'Content-type': mime[extname]});
        let rs = fs.createReadStream('.' + request.url);
        rs.pipe(response)
    }
})

server.listen(4000)