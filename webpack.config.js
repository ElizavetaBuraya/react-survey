var path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const extractSass = new ExtractTextPlugin('./css/bootstrap.css');
const extractLess = new ExtractTextPlugin('./css/style.css');

module.exports = {
    entry: [
        'babel-polyfill',
        './src/scripts/index.js',
        'font-awesome/scss/font-awesome.scss',
        './src/assets/styles/sass/style.scss',
        './src/assets/styles/less/style.less'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ['transform-runtime', "transform-decorators-legacy"],
                        presets:[
                            'es2015', 'stage-0', 'react'
                        ]
                    }
                }
            },
            {
                test:   /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                use: extractSass.extract([ 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function () {
                            return [autoprefixer]
                        }
                    }
                }, 'sass-loader'])
            },
            {
                test: /\.less$/i,
                use: extractLess.extract([ 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function () {
                            return [autoprefixer]
                        }
                    }
                }, 'less-loader'])
            },
            {
                // Match woff2 in addition to patterns like .woff?v=1.1.1.
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: './fonts/[name].[ext]',
                    publicPath: '../',
                },
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        historyApiFallback: true,
    },
    plugins: [
        extractLess,
        extractSass,
        new UglifyJSPlugin()
    ]
}