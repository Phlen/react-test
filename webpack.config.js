

var webpack = require('webpack'),
    OpenBrowserPlugin = require('open-browser-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    Dashboard = require('webpack-dashboard'),
    DashboardPlugin = require('webpack-dashboard/plugin'),
    WebpackDevServer = require('webpack-dev-server'),
    CleanPlugin = require('clean-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    path = require('path');

var dashboard = new Dashboard();

process.env.ENV = process.env.ENV || 'dev';
process.env.PORT = process.env.PORT || 3002;

module.exports = {
    entry: {
        app: path.join(__dirname, './src/app/app')
    },
    output: {
        path: path.join(__dirname, 'dist', process.env.ENV),
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.es6$/,
                loader: 'babel-loader'
            },
            {
                test: /\.coffee$/,
                loader: 'coffee-loader'
            },
            {
                test: /\.scss$/,
                include: path.join(__dirname, './src'),
                loader: ExtractTextPlugin.extract([
                    'css',
                    'postcss',
                    'sass?config=sassConfig'
                ])
            },
            {
                test: /\.css$/, 
                loader: ExtractTextPlugin.extract([
                    'css'
                ])
            }
        ]
    },

    postcss: function () {
        return [
            require('autoprefixer')({
                browsers: ['> 5%']
            }),
            require('postcss-assets')({
                relative: true,
                loadPaths: ['./images']
            }),
            require('postcss-at2x')()
        ]
    },
    sassConfig: {
        includePaths: [
            path.resolve('./src/sass'),
            require('bourbon').includePaths,
            path.join(__dirname, './node_modules')
        ]
    },

    resolve: {
        extensions: ['', '.js', '.coffee', '.es6']
    },

    plugins:[
        // 注入html
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        }),
        new CleanPlugin(['dist']),
        // 启动热替换
        new webpack.HotModuleReplacementPlugin(),

        new OpenBrowserPlugin({
            url: `http://localhost:${process.env.PORT}/`
        }),
        // new DashboardPlugin
        new DashboardPlugin(dashboard.setData),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons'
        }),
        new ExtractTextPlugin('./styles/[name].[contenthash:8].css')
    ],
}

module.exports.devtool = 'source-map';
module.exports.devServer = {
    port: process.env.PORT,
    contentBase: './dist',
    hot: true,
    historyApiFallback: true,
    publicPath: "",
    stats: {
        colors: true
    }
};
