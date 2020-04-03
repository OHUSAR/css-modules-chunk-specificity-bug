const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './index.js',
    context: path.join(__dirname, 'src'),
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: '../index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: 'chunk-[name].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.module\.css$/i,
                use: [
                    // 'style-loader',
                    // './@test/css-modules-modify-specificity-loader',
                    { loader: MiniCssExtractPlugin.loader },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                        },
                    },
                ],
            },
        ],
    },
};
