const { merge } = require("webpack-merge");
const path = require('path')
const defaultConfig = require("./webpack.config");

module.exports = merge(defaultConfig, {
    // 压缩代码
    optimization: {
        minimize: false
    },

    // 指定入口文件
    entry: "./src/index.ts",

    // 指定打包文件所在目录
    output: {
        path: path.resolve('dist'),
        // 打包后文件的名称
        filename: "index.js"
    }
})
