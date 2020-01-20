let http = require('http');
let url = require('url');

exports.startServer = function (route) {
    http.createServer(function (request, response) {
        // 解析路径
        let pathname = url.parse(request.url).pathname;
        // 送入路由中
        route(pathname, request, response);
    }).listen(8888);

    console.log('server has started!')
}