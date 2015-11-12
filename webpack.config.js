var path = require('path');
var HtmlWebPackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var bower_dir = path.resolve(__dirname, 'bower_components');

var config = {    
    entry: ["webpack/hot/dev-server","./app/main.js"],
    resolve: {
        alias: {}
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: 'templates/dev/index.html',
            inject: 'body'
        }),
        new ExtractTextPlugin('styles', 'styles.css')
    ],
    module: {
        noParse: [],
        loaders: [{ 
            test: /\.js$/,
            loader: 'jsx' 
        }, { 
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }]
    }
};

module.exports = config;