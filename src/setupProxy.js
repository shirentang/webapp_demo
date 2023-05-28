// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) {
//     app.use(
//         createProxyMiddleware("/api",{
//             target:"http://127.0.0.1:7100",
//             changeOrigin:true,
//             pathRewrite:{"^/api":""}
//         })
//     );
// };

const {createProxyMiddleware} = require('http-proxy-middleware');
 
module.exports = function(app) {
  app.use('/api', createProxyMiddleware({ 
    target: 'http://127.0.0.1:7100',//后台服务器地址
    changeOrigin: true,
    pathRewrite: {
    '^/api': '',
    },}))
};