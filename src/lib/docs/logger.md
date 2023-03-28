# 日志模块

扩展了原生的日志模块，添加了一些常用到的功能，比如发送到远程。

> 日志模块后续可能会有比较大的改动。目前只是测试版本。

## class FrameCollection\<FrameType\>

栈帧集合对象。

### FrameCollection.clear()

清空栈帧集合中的数据，用于手动清空堆栈。

> 注意： 一般来说不需要手动清空。

## class TraceCollection

调用堆栈集合，继承自 [FrameCollection](#class-framecollectionframetype)\<[TraceStackFrame](#class-tracestackframe)\> 。在外部使用该类型的参数时需要使用 `TraceCollectionType` 。

> 注意： `TraceCollection` 类并未导出，只能通过 `getStackTrace()` 方法来获取当前的调用堆栈集合。

### TraceCollection.filter(callbackFn: (frame: FrameType, index: number, array: FrameType[]) => boolean): TraceCollection

- `callbackFn` 用来测试数组中每个元素的函数。返回 `true` 表示该元素通过测试，保留该元素， `false` 则不保留。它接受以下三个参数：

  - `element` 数组中当前正在处理的元素。
  - `index` 正在处理的元素在数组中的索引。
  - `array` 调用了 `filter()` 的数组本身。

从当前的日志集合当中过滤符合条件的栈帧，并返回他们组成的新栈帧集合。

### TraceCollection.toStringArray(format?: [TraceFormatter](#traceformatter)): String[]

- `format` 用于规定转换后的字符串格式的回调方法，默认转换格式的默认转换格式类似 Python 。

将调用堆栈集合逐个转换为字符串。

### TraceCollection.toString(format?: [TraceFormatter](#traceformatter)): String

- `format` 用于规定转换后的字符串格式的回调方法，默认转换格式的默认转换格式类似 Python 。

将调用堆栈集合转换为字符串并返回。

## class LogCollection

日志集合，继承自 [FrameCollection](#class-framecollectionframetype)\<[LogStackFrame](#class-logstackframe)\> 。

> 注意： `LogCollection` 类并未导出，只能通过 [LOG_STACK](#const-log_stack) 对象来获取他的子集。

### LogCollection.filter(callbackFn: (frame: FrameType, index: number, array: FrameType[]) => boolean): LogCollection

- `callbackFn` 用来测试数组中每个元素的函数。返回 `true` 表示该元素通过测试，保留该元素， `false` 则不保留。它接受以下三个参数：

  - `element` 数组中当前正在处理的元素。
  - `index` 正在处理的元素在数组中的索引。
  - `array` 调用了 `filter()` 的数组本身。

从当前的日志集合当中过滤符合条件的栈帧，并返回他们组成的新栈帧集合。

### LogCollection.toHtmlString(): string

将全部日志堆栈中的数据转换为 HTML 文档。用于美化远程发送的样式。

### LogCollection.toStringArray(): string[]

将日志集合逐个转换为字符串。

### LogCollection.toString(): string

将全部日志堆栈中的数据转换为一个字符串并返回。

## class TraceStackFrame

调用栈帧对象，用来保存调用堆栈中每一次调用的相关数据。在外部使用该类型的参数时需要使用 `TraceStackFrameType` 。

> 注意： `TraceStackFrame` 类并未导出，只能从 [TraceCollection](#class-tracecollection) 的实例中获取。

### TraceStackFrame.getLine(): number

获取调用所在代码中的行数。一般用于 `TraceCollection.filter()` 的回调函数中进行判断。

```typescript
// 过滤调用堆栈中在 100 行到 200 行之间的调用
let trace = getStackTrace().filter((frame: TraceStackFrameType) => {
    let line = frame.getLine();
    return line >= 100 && line <= 200;
});
```

### TraceStackFrame.getCallerName(): string

获取调用者的函数名。一般用于 `TraceCollection.filter()` 的回调函数中进行判断。

```typescript
// 过滤调用者名称不为 xxx 的调用
let trace = getStackTrace().filter((frame: TraceStackFrameType) => {
    let callerName = frame.getCallerName();
    return callerName !== "xxx"
});
```

### TraceStackFrame.toString(format?: [TraceFormatter](#traceformatter)): string

- `format` 用于规定转换后的字符串格式的回调方法，默认转换格式的默认转换格式类似 Python 。

将 `TraceStackFrame` 对象转换为字符串的方法。

## class LogStackFrame

日志栈帧对象，用来保存每一次输出日志的详细信息。

> 注意： `LogStackFrame` 类并未导出，只能从 [LogCollection](#class-logcollection) 的实例中获取。

### LogStackFrame.getLevel(): number

获取日志栈帧的级别，一般用于 `LogCollection.filter()` 的回调函数进行判断。建议通过 [LogLevel](#enum-loglevel) 枚举类型来比较等级。

```typescript
// 获取日志堆栈中全部的 log 等级的日志记录
let collection = LOG_STACK.filter((frame) => {
    return frame.getLevel() == LogLevel.log;
});
```

### LogStackFrame.getData(): string

获取日志栈帧曾经输出的信息，一般用于 `LogCollection.filter()` 的回调函数进行判断。

```typescript
// 获取日志堆栈中全部包含其中 hello 的日志记录
let collection = LOG_STACK.filter((frame) => {
    return /hello/.test(frame.getData());
});
```

### LogStackFrame.toString(): string

将日志栈帧转换为字符串并返回。

### LogStackFrame.toHtmlString(): string

将日志栈帧转换为 HTML 字符串并返回，一般用于发送日志。

## enum LogLevel

日志等级的枚举对象，包括五个等级从低到高依次为：

- `Debug` 调试信息。
- `Log` 运行日志。
- `Info` 关键说明。
- `Warn` 出现异常，但不影响程序执行。
- `Error` 严重错误，会导致程序退出。

## class LoggerSchemes

预设的日志记录方案，用于在自定义日志时快速设置。所有方案都实现自 [LoggerScheme](#interface-loggerscheme) 总共包括六个预设：

- `trace` 调用堆栈。
- `debug` 调试信息。
- `log` 默认日志。
- `info` 重要信息。
- `warn` 警告信息。
- `error` 异常信息。

## interface LoggerScheme

日志记录方案接口，用来规定必要的字段。

- `displayName: string` 日志显示的名称。
- `logFunction: (data?: any, ...args: any[]) => void` 用于显示日志的函数
- `color: string` 发送远程日志时添加的颜色信息，可以是 Html 预设的颜色，也可以是色号（ `#fff` ），还可以是 rgb 颜色（ `rgb(255, 255, 255)` ）。
- `level: LogLevel` 日志等级。
- `needPrint?: boolean` 是否需要输出到 `logFunction` 指定的显示函数（默认是控制台），默认为 `true`。
- `needRecord?: boolean` 是否需要记录到日志堆栈，默认为 `true`。

## const LOG_STACK

日志堆栈对象，用来记录曾经输出过的日志。本身是一个 [LogCollection](#class-logcollection) 实例。

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

## getRawStackTrace(endFunction?: Function): string

- `endFunction` （可选）终止栈帧，会自动排除后续的无用栈帧。

获取当前真实的调用堆栈，返回调用堆栈的字符串。

**注意！：匿名函数和类中的方法等 `console.trace()` 方法不显示的函数不能当作终止栈帧。**

## getStackTrace(endFunction?: Function): [TraceCollection](#class-tracecollection)

- `endFunction` （可选）终止栈帧，会自动排除后续的无用栈帧。

获取修正后的调用堆栈集合，包含修正行号后的栈帧对象。返回调用堆栈的集合对象。

## interface LogRecordConfig

日志记录设置接口，用来规定必要的字段。

- `needPrint?: boolean` 是否需要输出到 `logFunction` 指定的显示函数（默认是控制台），默认为 `true`。此设置可以临时覆盖记录方案中的设置。
- `needRecord?: boolean` 是否需要记录到日志堆栈，默认为 `true`。此设置可以临时覆盖记录方案中的设置。
- `skipCallerNumber?: number` 需要跳过的调用堆栈数量。有时候不想输出真正的调用者，而是想输出更上层的调用者时可以设置此字段，此字段一般为 1 。

## class Record

### Record.setRecordLevel(level: number): void

- `level` 设置的等级。建议使用 [LogLevel](#enum-loglevel) 枚举类型来获取等级。

设置记录的日志级别，低于设置的级别的日志都不会记录。

### Record.setDisplayLevel(level: number): void

- `level` 设置的等级。建议使用 [LogLevel](#enum-loglevel) 枚举类型来获取等级。

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

### Record.trace(message?: string, ...args: any[]): string

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

### Record.traceWithCustomFormatter(formatter?: [TraceFormatter](#traceformatter), data?: string, ...args: any[]): string

- `formatter` 用于规定转换后的字符串格式的回调方法，默认转换格式的默认转换格式类似 Python 。
- `message` 主要信息。
- `args`  （可选） 要填充的数据。

与 `Record.trace` 类似，会打印出调用这个函数所在的调用栈信息（即当前运行的文件、行数等信息）。

此函数与 `Record.trace` 的主要区别在于可以手动指定调用栈的格式，可以更个性化的显示调用栈。

**注意！：此函数显示的等级和 `Record.debug()` 相同。**

```typescript
// Show me
//   | at line xxx, in <callerName>
Record.trace((line, caller) => `  | ${caller}: #${line}`, 'Show me');
```

### Record.customLog(scheme: LoggerScheme, config: LogRecordConfig, message?: string, ...args: any[]): string

- `scheme` 日志记录方案，包括显示名称，日志等级，显示颜色等等，可以使用模块中的 `LoggerSchemes` 类来设置，也可以自己构建。
- `config` 细粒度的日志设置，包括是否输出到控制台，跳过几个调用者名称等等。这里的设置可以临时替代 `scheme` 中的同名设置。
- `message` 主要信息。
- `args`  （可选） 要填充的数据。

高度自定义的日志信息接口。

## setToken(token: string): boolean

- `token` 用于调用 pushplus api 的令牌。

设置 pushplus 的令牌，必须为 32 位十六进制数的字符串。返回是否设置成功。

如果不是运行中获取的令牌，可以选择在脚本配置文件当中添加如下名为 `TOKEN` 的字段，在读取全局变量时会自动加载。

```json
[
    {
        "name": "TOKEN",
        "type": "text",
        "label": "pushplus的用户token",
        "help": "可以在微信中查看复制，不使用pushplus则留空"
    }
]
```

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

**注意！：**

- 发送失败时并不会清空日志堆栈，不管 `clear` 参数为何值。
- 在选择的日志集合不为默认时需要手动清除全部日志。

```typescript
// 只发送全部 log 等级的日志
let collection = LOG_STACK.filter((frame) => {
    return frame.getLevel() == LogLevel.log;
});
sendLog(collection);
LOG_STACK.clear();
```

## TraceFormatter

- `line` 调用所在的行号。
- `callerName` 调用者的函数名。

用来定义调用堆栈中栈帧的格式，需要返回处理好的字符串。

默认的格式为：

```typescript
function defaultFormatter(line: number, callerName: string): string {
    return `  | at line ${line}, in <${callerName}>`;
}
```
