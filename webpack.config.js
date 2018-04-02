const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const mode = process.env.ENV || 'development';

module.exports = {
    mode: mode,
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: mode === 'development' ? '[name].js' : '[name].min.js'
    },
    watch: mode === 'development',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                          sourceMap: mode === 'development',
                          minimize: mode === 'production',
                          url: false
                        }
                    }]
                  })
            }
        ]
    },
    devtool: mode === 'development' ? 'source-map' : false,
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin({
            filename: mode === 'development' ? '[name].css' : '[name].min.css ',
            allChunks: true
        }),
        new CopyWebpackPlugin([
            {
                from: './src/public',
                to: ''
            }
        ]),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};
