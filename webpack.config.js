

var webpack = require('webpack'),
    OpenBrowserPlugin = require('open-browser-webpack-plugin'),
    Dashboard = require('webpack-dashboard'),
    DashboardPlugin = require('webpack-dashboard/plugin'),
    WebpackDevServer = require('webpack-dev-server'),
    CleanPlugin = require('clean-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    path = require('path');

var dashboard = new Dashboard();

module.exports = {
    entry: {
        path: path.join(__dirname, './src/app/app')
    },
    // entry: getEntry(),
    output: {
        path: path.join(__dirname, './dist/'),
        filename: 'app.js'
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
                loader: 'style!css!sass'
            },
            {
                test: /\.css$/, 
                loader: 'style!css'
            }
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
            url: 'http://localhost:3002/'
        }),
        // new DashboardPlugin
        new DashboardPlugin(dashboard.setData)
    ],
}

module.exports.devtool = 'source-map';
module.exports.devServer = {
    port: 3002,
    contentBase: './dist',
    hot: true,
    historyApiFallback: true,
    publicPath: "",
    stats: {
        colors: true
    }
};
