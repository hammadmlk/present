/**
 ** This config is not sutable for production. 
 **/

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        'webpack-hot-middleware/client?reload=true',
        './app/index.js'
    ],
    output: {
        path: __dirname + '/dist',
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: __dirname + '/app',
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass')
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.html',
            filename: 'index.html',
            inject: 'body'
        }),
        new ExtractTextPlugin('style.css', {
            allChunks: true
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
};