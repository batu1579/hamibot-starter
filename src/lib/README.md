# 预制库说明

> 注意！：预制库本质上就是提前编写好的脚本，引入后会增加打包后的大小。

## 文档目录

- [init](./docs/init.md) 初始化脚本检查。
- [Logger](./docs/logger.md) 关于日志和调试信息的预制方法。
- [exception](./docs/exception.md) 自定义的异常类。

## 使用方法

1. 在使用前导入对应的库：

    > 建议：在导入部分库函数的时候重命名，可以防止出现命名冲突的问题。

    ```typescript
    // 导入整个 Logger 库
    import * as Logger from "./lib/logger";

    // 导入部分库函数
    import { recordTrace } from '../logger';

    // 导入部分库函数并重命名
    import { trace as PrintTrace } from '../logger';
    ```

2. 通过导入的名称访问对应的库函数：

    ```typescript
    // 访问整体导入的库
    Logger.
    ```

## 编码建议

1. 不要相信用户的任何输入，使用之前一定要验证。
2. 设置默认值时可以使用空值合并运算符 `??` 。

    ```typescript
    // 不使用空值合并运算符
    let appName = app.getAppName('yyy');

    if (appName === null) {
        appName = '未找到应用';
    }

    // 使用空值合并运算符
    let appName = app.getAppName('yyy') ?? '未找到应用';
    ```

3. 某些只针对特定情况的代码可以使用可选链运算符 `?.` 。在问号左侧的表达式为 `null` 或 `undefined` 时跳过代码。

    ```typescript
    // 查找跳过并点击，但是有时并没有跳过可以点击。
    // 这时必须判断而不能使用非空断言，否则会出现 `undefined` 没有对应方法的问题。

    // 不使用可选链运算符
    let skipButton = textContains('skip').findOne(1000);
    if (skipButton) {
        skipButton.click();
    }

    // 使用可选链运算符
    textContains('skip').findOne(1000)?.click();
    ```

4. 有时候函数的返回值可能会根据某个参数或者设置而改变，或者有的函数会返回 `null` 。一般的建议是通过判断或其他方式收窄类型，这样可以保证程序的鲁棒性。但是如果某些情况下你十分确定不会出现另一种类型，可以使用类型断言收窄类型或者非空断言来排除 `null` 类型。

    > 注意：这种方式相当于强行让编辑器修改类型，但是在编译后的代码里并不会有任何验证。所以请谨慎使用。

    ```typescript
    // 类型断言
    let xxx = sensors.register("xxx") as SensorEventEmitter;

    // 非空断言（推荐，因为有的类型被隐藏了，想要使用还需要手动导入。）
    let yyyy = sensors.register("yyy")!;
    ```
