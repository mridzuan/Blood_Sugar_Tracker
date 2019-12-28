import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    // add other server routes to path array
    app.use(proxy(['/api' ], { target: 'http://localhost:5000' }));
}

ReactDOM.render(<App />, document.getElementById('root'));
