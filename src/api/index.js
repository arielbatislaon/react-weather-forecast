/*
********
This is nodejs script to enable api by pass  the cors restriction of the targeted API by way of npm package cors-anywhere
*/
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080;

var corsProxyServer = require('cors-anywhere');
corsProxyServer.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
    console.log('By passing CORS restriction through ' + host + ':' + port);
});