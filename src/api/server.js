const http = require('http');
const settings = require('./settings/settings');
const app = require('./app');

const port = process.env.PORT || 5050;
console.log(`Starting server on port ${port}`);

const server = http.createServer(app);

server.listen(port);
