# 脚本模板

一个用来快速开始编写脚本的模板，使用 `TypeScript` 编写，提供代码补全和类型检查。

## 使用方法

1. 克隆项目以后使用 `npm install` 命令安装依赖
2. 在 `src` 文件夹下编写代码，程序入口为 `src/index.ts`
3. 使用 `npm run build` 命令打包项目，打包后的文件路径: `dict/bundle.js`

## 特性

1. 通过声明文件提供 `hamibot` 完整的代码提示和文档，能够减少键入次数和查询官方文档的时间（未完成）
2. 提供常用的代码片段，直接调用可以辅助更快完成开发，并让你能专注于核心功能
3. 完整的类型检查（未完成）

## 文件结构

```shell
│   config.json                   # 脚本的配置文件
│   global.js                     # 全局变量和验证配置内容
│   global_exception.js           # 全局异常类
│   index.ts                      # 程序入口
│
├─lib
│       init.js                   # 初始化检查
│       logger.js                 # 日志类
│       send_msg.js               # 发送消息到微信
│
└─types                           # TypeScript 声明文件们
        app.d.ts
        global.d.ts
        hamibot.d.ts
```

## TODO List

- [ ] 将所有的预制函数重新使用 `typescript` 编写
- [ ] 添加其他声明文件

## 贡献者

欢迎各位大佬帮我一起完善这个模板

## 开源协议

[MPL-2.0 License](./LICENSE) © BATU1579
