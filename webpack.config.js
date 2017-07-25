var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
module.exports = {
    entry: __dirname + '/app/app.ts',

    output: {
        filename: 'bundle.js',
        path: __dirname + '/app',
        chunkFilename: '[name].chunk.js'
    },

    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.js']
    },

    module: {
        rules: [{
                test: /\.ts$/,
                use: ['ts-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'resolve-url-loader'] //!感叹号针对不同的感叹号的作用在于使同一文件能够使用不同类型的loader
            },
            {
                test: /\.(png|jpg)$/,
                use: ['url-loader?limit=8192&name=img/[name][hash:8].[ext]']
            }
        ]
    },
    devServer: {
        hot: true,
        inline: true,
        port: 3000 //端口你可以自定义
    }

}