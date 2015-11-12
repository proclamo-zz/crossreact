var path = require('path');
var HtmlWebPackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var bower_dir = path.resolve(__dirname, 'bower_components');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
    addVendor: function (name, path) {
        this.resolve.alias[name] = path;
        this.module.noParse.push(new RegExp(path));
    },
    entry: [path.resolve(__dirname, "./app/main.js")],
    resolve: {
        alias: {}
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: 'templates/prod/index.html',
            inject: 'body'
        }),
        new ExtractTextPlugin('styles', 'styles.css')
    ],
    module: {
        noParse: [],        
        loaders: [{ 
            test: /\.js$/,
            exclude: [node_modules_dir],
            loader: 'jsx' 
        }, { 
            test: /\.css$/,
            exclude: [node_modules_dir],
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }]
    }
};

//config.addVendor('react', bower_dir + '/react/react.min.js');

module.exports = config;