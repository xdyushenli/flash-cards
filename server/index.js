const server = require('./server');
const route = require('./router');

server.startServer(route.route);