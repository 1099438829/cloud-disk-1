const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const theme = require('./theme.js');
const fs  = require('fs');
const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './index/defined.less'), 'utf8'));
// http://www.cnblogs.com/auok/p/6420843.html

module.exports = {
    // map
    devtool: 'eval-source-map',
    // 根目录
    context: path.resolve(__dirname, './'),
    // 需要打包的文件入口
    entry: {
        index: ['babel-polyfill', './index/index.js'],
        vendor: ['babel-polyfill', 'react', 'react-dom', 'react-router-dom', 'axios']
    },
    // 入口文件路径
    resolve: {
        alias: {
            'Public': path.resolve(__dirname, './index/public/js')
        }
    },
    // webpack服务器
    devServer: {
        inline: true,
        open: true,
        overlay: true, // 错误显示到屏幕上
        port: 3001,
        stats: {
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        },
    },
    // 模块处理
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,  // antd 中的less
                include: path.resolve(__dirname, 'node_modules/antd'),  //这个路径要写准确，否则报错
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: true,
                                modules: false,
                                modifyVars: themeVariables,
                                // modifyVars: theme(),
                            },
                        },
                    ],
                }),
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[name]_[hash:base64:4]_[local]',
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                config: {
                                    path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
                                }
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                outputStyle: 'expanded'
                            }
                        },
                    ]
                })
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 50000,
                            name: '[path][name].[ext]'
                        }
                    },
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    }]
                })
            },
        ]
    },
    // 插件
    plugins: [
        // 生成HTMl并引用资源
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        // 定义变量，一般用于开发环境log或者全局变量
        new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify(process.env.NODE_ENV)}}),
        // 根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id
        new webpack.optimize.OccurrenceOrderPlugin(),
        // 多个 html共用一个js文件(chunk)
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'}),
        // 将样式文件(css,sass,less)合并成一个css文件
        new ExtractTextPlugin({filename: '[name].[contenthash:4].bundle.css', allChunks: true}),
    ]
};