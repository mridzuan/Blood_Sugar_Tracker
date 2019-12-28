const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    // add other server routes to path array
    app.use(proxy(['/bloodsugar' ], { target: 'http://localhost:5000' }));
    app.use(proxy(['/forgotpassword' ], { target: 'http://localhost:5000' }));
    app.use(proxy(['/login' ], { target: 'http://localhost:5000' }));
    app.use(proxy(['/resetpassword' ], { target: 'http://localhost:5000' }));
    app.use(proxy(['/updatePasswordViaEmail' ], { target: 'http://localhost:5000' }));
    app.use(proxy(['/users' ], { target: 'http://localhost:5000' }));
}