/*
 * @Author: BATU1579
 * @CreateDate: 2022-05-24 16:55:58
 * @LastEditor: BATU1579
 * @LastTime: 2022-08-09 22:45:49
 * @FilePath: \\webpack.config.js
 * @Description: https://blog.csdn.net/Zong_0915/article/details/115831373
 */
// 引入path包
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    // 指定入口文件
    entry: "./src/index.ts",

    // 指定打包文件所在目录
    output: {
        path: path.resolve(__dirname, 'dist'),
        // 打包后文件的名称
        filename: "index.js"
    },

    optimization: {
        // 压缩代码
        minimize: false
    },

    // 指定webpack打包的时候要使用的模块
    module: {
        // 指定要价在的规则
        rules: [
            {
                // test指定的是规则生效的文件,意思是，用ts-loader来处理以ts为结尾的文件
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    // 配置babel
                    {
                        // 指定加载器
                        loader: 'babel-loader',
                        // 设置babel
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                    'ts-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.js']
    }
}