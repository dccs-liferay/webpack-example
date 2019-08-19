const publicPath = '/o/dccs-frontend-demo/assets/';
const webpack = require('webpack');
const path = require('path');

const srcPath = path.join(__dirname, 'webpack/src/js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new MiniCssExtractPlugin({
            filename: process.env.NODE_ENV === 'development' ? '[name].css' : '[name].css?id=[contenthash]',
            publicPath: publicPath,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    // Babel transpiles our javascript to make it work in all browsers and Internet Explorer 11
                    // The actual babel config can be found in .babelrc
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ]
    },
    optimization: {
        noEmitOnErrors: true // as an aside not sure if this is needed in webpack 4 or is default
    },
};
