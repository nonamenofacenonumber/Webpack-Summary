// default module for nodejs to use path like -> path.resolve(__dirname, 'build')
const path = require('path');   //or import path from 'path'


const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { NamedChunksPlugin } = require('webpack');
const Notifier = require('./webpack-plugins/Notifier');
const webpack = require('webpack');
const config = {
    entry: {
        // index.js is default input
        OutputImageScript: './src/ImageScript.js',
        Outputhome: './src/home.js',
        Outputadmin: './src/admin.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),     // path: __dirname + '/build'
        // publicPath: 'build/'
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    stats: 'errors-only',
    // stats: {
    //     assets: false,
    //     chunks: false
    // },
    module: {
        rules: [
            // {
            //     test: /\.css$/,      //regular expressions
            //     use: ['style-loader', 'css-loader']
            //     use: [MinicssExtractPlugin.loader, 'css-loader']
            // },
            // {
            //     test: /\.scss$/,
            //     use: ['style-loader', 'css-loader', 'sass-loader']
            // },
            // {
            //     test: /\.sass$/,
            //     use: ['style-loader', 'css-loader', 'sass-loader']
            // },
            // {
            //     test: /\.s[ac]ss$/,
            //     use: ['style-loader', 'css-loader', 'sass-loader']
            //     use: [MinicssExtractPlugin.loader, 'css-loader', 'sass-loader']
            // },
            {
                test: /\.(png|jpe?g|gif)$/,
                // use: ['file-loader'],
                use: [{
                    loader: 'file-loader',
                    options: {
                        publicPath: 'images',
                        outputPath: 'images',
                        name: '[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(woff|woff2|ttf|eot|otf)$/,
                // use: ['file-loader'],
                use: [{
                    loader: 'file-loader',
                    options: {
                        publicPath: 'fonts',
                        outputPath: 'fonts',
                        name: '[name].[ext]'    // if we do not use this webpack create file name with hash code
                    }
                }]
            }
            // ,
            // {
            //     test: /\.m?js$/,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: "babel-loader",
            //         options: {
            //             presets: ['@babel/preset-env']
            //         }
            //     }
            // }
        ]
    },
    plugins: [
        new Notifier({
            name: 'Agha Saeed'
        }),
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            title: 'Saeed App',
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['OutputImageScript', 'Outputhome', 'vendors~OutputImageScript~Outputadmin']
        }),
        new HtmlWebpackPlugin({
            title: 'Admin App',
            template: './src/index.html',
            filename: 'admin.html',
            chunks: ['Outputadmin', 'vendors~OutputImageScript~Outputadmin']
        }),
        new CleanWebpackPlugin(),
    ]
}


module.exports = (env, { mode }) => {
    let isDevelopment = mode === 'development';
    if (isDevelopment) {
        config.devServer = {
            contentBase: path.resolve(__dirname, 'build'),
            index: 'index.html',
            port: 8888
        }
    }
    config.module.rules.push(...[{
        test: /\.css$/,
        use: [isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader']
    },
    {
        test: /\.s[ac]ss$/,
        use: [isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
    },
    ])
    if (!isDevelopment) {
        config.output.filename = '[name].[contenthash].js';
        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css'
            })
        )
    }
    return config;
}