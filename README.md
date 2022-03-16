# 脚本模板

用来快速生成多文件的脚本模板，可以使用绝大部分ES6语法

## 使用方法

1. 克隆项目以后使用 `npm install` 命令安装依赖
2. 在 `src` 文件夹下编写代码，程序入口为 `src/index.js` 
3. 使用 `npm run build` 命令打包项目，打包后的文件路径: `dict/index.js`

## 文件结构

```shell
src
│   config.json                   # 脚本的配置文件
│   global.js                     # 全局变量和验证配置内容
│   global_exception.js           # 全局异常类
│   index.js                      # 程序入口
│
└───lib
        init.js                   # 初始化检查
        logger.js                 # 日志类
        send_msg.js               # 发送消息到微信

```

## TODO List

- [x] 添加启动自检权限和服务
- [x] 添加运行结束以后上传日志到微信的功能（PushPlus）

## 贡献者

欢迎各位大佬帮我一起完善这个模板

## 开源协议

[MIT License](https://github.com/batu1579/script-template/blob/main/LICENSE) © BATU1579