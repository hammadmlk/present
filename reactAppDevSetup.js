/*
 * Hot loading and auto compile for react app when using with express.
 */

var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require('./webpack.config.js');

var compiler = webpack(webpackConfig);
var middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'src',
    stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
    }
});

var reactAppDevSetup = function(app) {

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));

    app.get('/', function response(req, res) {
        res.write(middleware.fileSystem.readFileSync(__dirname + './dist/index.html'));
        res.end();
    });
}

module.exports = reactAppDevSetup;