const path = require('path');
const webpack = require('webpack');
// const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    // 根目录
    context: path.resolve(__dirname, ''),
    // 需要打包的文件入口
    entry: {
        index: './index/index.js',
        vendor: ['react', 'react-dom', 'react-router-dom']
    },
    // 模块处理
    module: {
        // 特殊文件处理
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    // plugins: ['transform-runtime', 'add-module-exports']
                }
            },
            // {
            //     test: /\.scss/,
            //     loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]_[local]!postcss!sass')
            // },
            // {
            //     test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            //     loader: 'url-loader?limit=50000&name=[path][name].[ext]'
            // },
            // {
            //     test: /\.css$/,
            //     loader: "style!css!"
            // }
        ]
    },
    // css3自动补全
    // postcss: [autoprefixer({browsers: ['> 5%']})],
    // 输出
    output: {
        path: path.resolve(__dirname, '..', 'server', 'public', 'js'),
        filename: 'index.bundle.js',
        chunkFilename: '[name].[chunkhash:4].bundle.js',
        publicPath: '/js/'
    },
    // 插件
    plugins: [
        // 定义变量，一般用于开发环境log或者全局变量
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
        // 根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id
        new webpack.optimize.OccurrenceOrderPlugin(),
        // 多个 html共用一个js文件(chunk)
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'}),
        // 将样式文件(css,sass,less)合并成一个css文件
        new ExtractTextPlugin('../css/[name].css', {allChunks: true}),
        // 压缩js
        new webpack.optimize.UglifyJsPlugin({
            // 压缩警告
            compress: {warnings: false},
            // 保留注释
            comments: false
        }),
    ]
};