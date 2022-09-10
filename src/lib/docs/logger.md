# 日志模块

扩展了原生的日志模块，添加了一些常用到的功能，比如发送到远程。

> 日志模块后续可能会有比较大的改动。目前只是测试版本。

## LogCollection

日志集合数据类。

> 注意： `LogCollection` 类并未导出，只能通过 [logStack](#logstack) 对象来获取他的子集。

### LogCollection.toHtmlString(): string

将全部日志堆栈中的数据转换为 HTML 文档。用于美化远程发送的样式。

### LogCollection.toString(): string

将全部日志堆栈中的数据转换为一个字符串并返回。

### LogCollection.clear(): void

清空日志堆栈中的数据，用于手动清空日志堆栈。一般来说不需要手动清空。在发送日志后会自动清空日志堆栈，除非单独设置。

### LogCollection.filter(): LogCollection

## logStack

日志堆栈对象，用来记录曾经输出过的日志。本身是一个 [LogCollection](#logcollection) 实例。

## LogLevel

日志等级的枚举对象，包括五个等级从低到高依次为：

- `Debug` 调试信息。
- `Log` 运行日志。
- `Info` 关键说明。
- `Warn` 出现异常，但不影响程序执行。
- `Error` 严重错误，会导致程序退出。

## LogStackFrame

日志栈帧对象，用来保存每一次输出日志的详细信息。

> 注意： `LogStackFrame` 类并未导出，只能从 [LogCollection](#logcollection) 实例中获取。

### LogStackFrame.toString(): string

将日志栈帧转换为字符串并返回。

### LogStackFrame.toHtmlString(): string

将日志栈帧转换为 HTML 字符串并返回，一般用于发送日志。

### LogStackFrame.getLevel(): number

获取日志栈帧的级别，一般用于 `LogCollection.filter()` 的回调函数进行判断。建议通过 [LogLevel](#loglevel) 枚举类型来比较等级。

```typescript
// 获取日志堆栈中全部的 log 等级的日志记录
let collection = logStack.filter((frame) => {
    return frame.getLevel() == LogLevel.log;
});
```

### LogStackFrame.getData(): string

获取日志栈帧曾经输出的信息，一般用于 `LogCollection.filter()` 的回调函数进行判断。

```typescript
// 获取日志堆栈中全部包含其中 hello 的日志记录
let collection = logStack.filter((frame) => {
    return /hello/.test(frame.getData());
});
```

## getCallerName(index: number): string

- `index` 调用堆栈层数（默认为 0 ），使用负数表示前面的第几层调用。大于等于 0 视为 0 即调用此函数的函数名。

通过抛出异常，从调用堆栈中获取调用者的函数名并返回。

```typescript
function func(): void {
    let caller: getCallerName();
    console.log(caller);
    // func
}
```

## getStackTrace(endFunction?: Function): string

- `endFunction` （可选）终止栈帧，会自动排除后续的无用栈帧。

获取当前真实的调用堆栈。

**注意！：匿名函数和类中的方法等 `console.trace()` 方法不显示的函数不能当作终止栈帧。**

## Record

### Record.setRecordLevel(level: number): void

- `level` 设置的等级。建议使用 [LogLevel](#loglevel) 枚举类型来获取等级。

设置记录的日志级别，低于设置的级别的日志都不会记录。

### Record.setDisplayLevel(level: number): void

- `level` 设置的等级。建议使用 [LogLevel](#loglevel) 枚举类型来获取等级。

设置显示的日志级别，低于设置的级别的日志都不会显示。

### Record.log(message?: string, ...args: any[]): string

- `message` 主要信息。
- `args`  （可选） 要填充的数据。

将信息打印到控制台，并带上换行符。 可以一次性传入多个参数，第一个参数作为主要信息，其他参数作为类似于 [printf(3)](https://man7.org/linux/man-pages/man3/printf.3.html) 中的代替值（参数都会传给 `util.format()` ）。

此函数与 `console.log` 方法的主要区别在于会自动存储每一次的日志，以供后面使用。

```typescript
const count: number = 5;

// 打印 'count: 5' 到 stdout
Record.log('count: %d', count);

// 打印 'count: 5' 到 stdout
Record.log('count:', count);
```

### Record.verbose(message: string, ...args: any[]): string

- `message` 主要信息。
- `args`  （可选） 要填充的数据。

与 `Record.log` 类似，但输出结果以灰色字体显示。输出优先级低于 `log` ，用于输出观察性质的信息。

### Record.debug(message: string, ...args: any[]): string

- `message` 主要信息。
- `args`  （可选） 要填充的数据。

与 `Record.log` 类似，但输出结果以灰色字体显示。输出优先级低于 `log` ，用于输出观察性质的信息。

**注意！：此函数是 `Record.verbose` 的别名。**

### Record.info(message: string, ...args: any[]): string

- `message` 主要信息。
- `args`  （可选） 要填充的数据。

与 `Record.log` 类似，但输出结果以绿色字体显示。输出优先级高于 `log` ，用于输出重要信息。

### Record.warn(message: string, ...args: any[]): string

- `message` 主要信息。
- `args`  （可选） 要填充的数据。

与 `Record.log` 类似，但输出结果以蓝色字体显示。输出优先级高于 `info` ，用于输出警告信息。

### Record.error(message: string, ...args: any[]): string

- `message` 主要信息。
- `args`  （可选） 要填充的数据。

与 `Record.log` 类似，但输出结果以红色字体显示。输出优先级高于 `warn` ，用于输出错误信息。

### Record.trace(data?: string, ...args: any[]): string

- `message` 主要信息。
- `args`  （可选） 要填充的数据。

与 `console.trace` 类似，同时会打印出调用这个函数所在的调用栈信息（即当前运行的文件、行数等信息）。

此函数与 `console.trace` 的主要区别在于会修正异常的行号，便于调试。同时会将调用堆栈信息存储在日志堆栈中。

**注意！：此函数显示的等级和 `Record.debug()` 相同。**

```typescript
// Show me
//  | at line xxx, in <callerName>
Record.trace('Show me');
```

## setToken(token: string): boolean

- `token` 用于调用 pushplus api 的令牌。

设置 pushplus 的令牌，必须为 32 位十六进制数的字符串。返回是否设置成功。

## sendMessage(title: string, data: string, ...args?: any[]): boolean

- `title` 发送消息的标题。
- `data` 主要信息。
- `args` 要填充的数据。

将信息发送到远程，并带上换行符，返回是否发送成功。

可以一次性传入多个参数，第一个参数作为主要信息，其他参数作为类似于 [printf(3)](https://man7.org/linux/man-pages/man3/printf.3.html) 中的代替值（参数都会传给 `util.format()` ）。

## sendLog(logs?: LogCollection, title?: string, clear?: boolean): boolean

- `logs` 要发送的日志集合，默认发送完整的日志堆栈。可以通过过滤方法，选择性发送。
- `title` 发送消息的标题（默认为 `logger` ）。
- `clear` 发送后是否清空日志堆栈（默认为 `true` ）。

使用 pushplus 发送日志集合。返回是否发送成功。

**注意！：发送失败时并不会清空日志堆栈，不管 `clear` 参数为何值。**
**注意！：在选择的日志集合不为默认时需要手动清除全部日志。**

```typescript
// 只发送全部 log 等级的日志
let collection = logStack.filter((frame) => {
    return frame.getLevel() == LogLevel.log;
});
sendLog(collection);
logStack.clear();
```
