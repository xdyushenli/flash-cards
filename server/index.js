let server = require('./server');
let route = require('./router');

server.startServer(route.route);