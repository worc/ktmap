const path = require('path')

const DOCS = path.join(__dirname, 'docs')

const MODE = process.env.MODE

module.exports = {
    mode: 'development',
    devServer: {
        contentBase: DOCS,
        publicPath: '/ktmap/',
        historyApiFallback: true,
        https: true
    },
    entry: [
        './index.js'
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [ 'env', 'react' ]
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                },
            },
        },
    },
    output: {
        path: DOCS,
        publicPath: '/ktmap/',
        filename: 'bundle.js',
        chunkFilename: 'vendor.js',
    },
    devtool: 'inline-source-map'
}
