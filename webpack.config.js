var path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractSass = new ExtractTextPlugin('../css/bootstrap.css');
const extractLess = new ExtractTextPlugin('../css/style.css');

module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
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
                loader: 'url-loader',
                options: {
                    // Limit at 50k. Above that it emits separate files
                    limit: 50000,

                    // url-loader sets mimetype if it's passed.
                    // Without this it derives it from the file extension
                    mimetype: 'application/font-woff',

                    // Output below fonts directory
                    name: '../fonts/[name].[ext]',
                },
            },
        ]
    },
    plugins: [
        extractLess,
        extractSass,
    ]
}