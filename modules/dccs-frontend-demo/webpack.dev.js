const publicPath = '/o/dccs-frontend-demo/assets/';
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode:'development',
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            './webpack/js/app.js',
            './webpack/css/app.scss',
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build/tmp/'),
        filename: '[name].js',
        publicPath: publicPath
    },
    // The dev server is started on port 3000 and proxies Liferay on port 8080
    devServer: {
        historyApiFallback: true,
        hot: true,
        port: 3000,
        publicPath: publicPath,
        noInfo: false,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        proxy: {
            '**': {
                target: 'http://localhost:8080',
                secure: false,
                // Don't proxy the js/css files of the project
                bypass: function (req, res, proxyOptions) {
                    if (req.url.startsWith(publicPath)) {
                        console.log('Bypass: ', req.url);
                        return false;
                    }
                }
            }
        }
    },
    optimization: {
        runtimeChunk: 'single',
        // We still want the vendor libraries in an extra file
        // But no need for further optimization during development
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    enforce: true,
                    chunks: 'all'
                }
            }
        }
    },
    cache: true,
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'eval-source-map',
});
