<!--
 * @Author: BATU1579
 * @CreateDate: 2022-06-15 04:24:25
 * @LastEditor: BATU1579
 * @LastTime: 2022-07-31 22:37:19
 * @FilePath: \\README.md
 * @Description: 
-->
# 脚本模板

![GitHub](https://img.shields.io/github/license/batu1579/script-template)

一个用来快速开始编写脚本的模板，使用 `TypeScript` 编写，提供代码补全和类型检查。

欢迎各位大佬帮我一起完善这个模板！

## 使用方法

1. 克隆项目以后使用 `npm install` 命令安装依赖
2. 在 `src` 文件夹下编写代码，程序入口为 `src/index.ts`
3. 使用 `npm run build` 命令打包项目，打包后的文件路径: `dist/bundle.js`

## 特性

1. 通过声明文件提供 `hamibot` 完整的代码提示和文档，能够减少键入次数和查询官方文档的时间（未完成）。
2. 提供常用的代码片段，直接调用可以辅助更快完成开发，并让你能专注于核心功能。
3. 完整的类型检查（未完成）。

## 注意事项

1. 编写 UI 或悬浮窗时请记得将文件扩展名修改成 `tsx` 。
2. 有时候函数的返回值可能会根据某个参数或者设置而改变，此时如果你十分确定不会出现问题，请使用断言，例如：

```typescript
// 类型断言
let xxx = sensors.register("xxx") as SensorEventEmitter;

// 非空断言（推荐，因为有的类型被隐藏了，想要使用还需要手动导入。）
let yyyy = sensors.register("yyy")!;
```

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
        ...
```

## TODO List

- [ ] 添加声明文件 [22/26]
  - [ ] Images
  - [ ] UI
  - [ ] Util
  - [ ] Canvans
- [ ] 使用 `Eslint` 在提交前统一代码风格
- [ ] 将所有的预制函数使用 `TypeScript` 重写
- [ ] 检查泛型注释
- [ ] 检查回调函数注释
- [ ] 检查注释中的类和方法是否使用行内代码格式
- [ ] 检查注释中的示例代码是否都能够运行
- [ ] 统一函数类型（Function、function）

## 开源协议

[MPL-2.0 License](./LICENSE) © BATU1579
