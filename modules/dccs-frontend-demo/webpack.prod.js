const publicPath = '/o/dccs-frontend-demo/assets/';	
		
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

// Terser minififys the javascript code
const TerserPlugin = require('terser-webpack-plugin');
// The css should be optimized too
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// The manifest is useful, but actually not used in this example
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = merge(common, {
    mode: 'production',
    entry: {
        app: [
            './webpack/js/app.js',
            './webpack/css/app.scss',
        ]
    },
    output: {
        path: path.resolve(__dirname,
            'build/resources/main/META-INF/resources/assets/'),
        // contenthash: The hash is based on the content of the file. If it stays the same -> Same hash.
        filename: '[name].js?id=[contenthash]',
        publicPath: publicPath,
        // Webpack has one global function. It is better to change it to avoid name clashes
        // If you plan to deploy multiple apps build with webpack, each needs a unique name here
        jsonpFunction: 'wpdccsjsonp'
    },
    cache: true,
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
        runtimeChunk: 'single',
        // We don't want one huge file but split all libraries in extra files
        splitChunks: {
            // We assume http/2 here. More requests are better
            maxInitialRequests: Infinity,
            // Again, http/2, no minimal limit to the file size, just split them
	        minSize: 0,
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name(module) {
                  const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1].replace('@', '');
                  // We need to load these modules at once, they contain polyfills and initialization code
                  // The rest is layz loaded
                  // Webcomponent support is about 100KB. 
                  const vendorpackages = ["webpack", "core-js", "babel", "webcomponents", "process", "setimmediate", "timers-browserify"];
                  if (vendorpackages.indexOf(packageName) != -1) {
                    return "vendor";
                  }
                  return `${packageName}`;
              },
		      enforce: true,
              chunks: 'all'
            }
          }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ManifestPlugin(),
    ],
    devtool: 'source-map',
});
