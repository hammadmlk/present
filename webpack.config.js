var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
});
var ExtractTextPluginConfig = new ExtractTextPlugin('style.css', {
    allChunks: true
})

module.exports = {
    entry: [
        './app/index.js'
    ],
    output: {
        path: __dirname + '/dist',
        filename: "index_bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: __dirname + '/app',
                loader: "babel-loader"
            },
            //{ test: /\.css$/, loader: "style-loader!css-loader" },
            //{ test: /\.scss$/, loaders: ['style', 'css', 'sass'] }
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass')
            }
        ]
    },
    plugins: [HTMLWebpackPluginConfig, ExtractTextPluginConfig]
};