const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        index: './index/index.js',
        vendor: ['react', 'react-dom', 'react-router-dom']
    },
    output: {
        path: path.resolve(__dirname, '..', 'server', 'public', 'js'),
        filename: 'index.bundle.js',
        chunkFilename: '[name].[chunkhash:4].bundle.js',
        publicPath: '/js/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            }
        ]
    },
    plugins: [
        // 定义变量，一般用于开发环境log或者全局变量
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
        // 根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id
        new webpack.optimize.OccurrenceOrderPlugin(),
        // 多个 html共用一个js文件(chunk)
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
        // 将样式文件(css,sass,less)合并成一个css文件
        new ExtractTextPlugin('../css/[name].css', {allChunks: true}),
    ]
}