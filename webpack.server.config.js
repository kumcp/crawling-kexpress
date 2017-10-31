var path = require('path')
var webpack = require('webpack')

const VueSSRPlugin = require('vue-ssr-webpack-plugin')

module.exports = {
    target: 'node',
    entry: './vue_server/main.server.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js',
        // Node-compability module
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },

    performance: {
        hints: false
    },
    // Avoids bundling external dependencies, so node can load them directly from node_modules/
    externals: Object.keys(require('./package.json').dependencies),
    // No need to put these config into prod env
    devtool: '#source-map',
    plugins: [
        new VueSSRPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]
}

