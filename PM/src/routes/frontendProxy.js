const express = require('express');
const app = express();

const proxy = require('http-proxy-middleware')
var apiProxy = proxy.createProxyMiddleware({target: 'http://127.0.0.1:3000/'});
module.exports = apiProxy
