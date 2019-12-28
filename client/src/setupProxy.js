const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    // add other server routes to path array
    app.use(proxy(['/' ], { target: 'http://localhost:5000' }));
}