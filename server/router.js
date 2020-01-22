const requestHandlers = require('./requestHandlers');
const { requestConfig } = require('./requestConfig.js');

// 创建路径与请求处理函数的映射对象
let handle = {};
for (let pathname of Object.keys(requestConfig)) {
    let handlerName = requestConfig[pathname].handler;
    handle[pathname] = requestHandlers[handlerName];
}

// 路由
function route(pathname, request, response) {
    console.log(`about to route a request for ${pathname}`);

    if (typeof handle[pathname] === 'function' && request.method.toLowerCase() === requestConfig[pathname].method) {
        handle[pathname](request, response);
    } else {
        console.log('no request handler found for ' + pathname);
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.write("404 Not found");
        response.end();
    }
}

module.exports = {
    route,
}