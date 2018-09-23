const path = require('path')

const DIST = path.join(__dirname, 'docs')
const STATIC = path.join(__dirname, 'static')

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
    output: {
        path: DIST,
        publicPath: '/',
        filename: 'bundle.js'
    },
}
