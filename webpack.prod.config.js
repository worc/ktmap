const path = require('path')

const DOCS = path.join(__dirname, 'docs')

module.exports = {
    mode: 'production',
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
        publicPath: 'https://worc.gitub.io/ktmap/',
        filename: 'bundle.js',
        chunkFilename: 'vendor.js',
    },
}
