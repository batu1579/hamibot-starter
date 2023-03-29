/*
 * @Author: BATU1579
 * @CreateDate: 2022-02-05 04:00:16
 * @LastEditor: BATU1579
 * @LastTime: 2023-03-29 16:22:59
 * @FilePath: \\src\\lib\\logger.ts
 * @Description: 存放关于日志和调试信息的预制方法。
 */
class FrameCollection<FrameType> {

    protected frames: FrameType[];

    constructor(...frames: FrameType[]) {
        this.frames = frames;
    }

    /**
     * @description: 清空栈帧集合中的数据，用于手动清空堆栈。
     * 
     * **注意！：**
     * 
     * - 一般来说不需要手动清空。
     * 
     */
    public clear(): void {
        this.frames.length = 0;
    }

    /**
     * @description: 向堆栈中压入新的栈帧。
     * @param {FrameType} frame 添加的栈帧。
     */
    public push(frame: FrameType): void {
        this.frames.push(frame);
    }
}

class TraceCollection extends FrameCollection<TraceStackFrame> {
    /**
     * @description: 从当前的集合当中过滤符合条件的栈帧。
     * @param {Function} callbackFn 用来测试数组中每个元素的函数。返回 `true` 表示该元素通过测试，保留该元素， `false` 则不保留。它接受以下三个参数：
     * - `element` 数组中当前正在处理的元素。
     * - `index` 正在处理的元素在数组中的索引。
     * - `array` 调用了 `filter()` 的数组本身。
     * @return {LogCollection} 过滤出的符合条件的栈帧组成的新栈帧集合。
     */
    public filter(callbackFn: (frame: TraceStackFrame, index: number, array: TraceStackFrame[]) => boolean): TraceCollection {
        let result = new TraceCollection();
        let tempFrame: TraceStackFrame;

        for (let i = 0; i < this.frames.length; i++) {
            tempFrame = this.frames[i];
            if (callbackFn(tempFrame, i, this.frames)) {
                result.push(tempFrame);
            }
        }

        return result;
    }

    /**
     * @description: 将调用堆栈集合逐个转换为字符串。
     * @param {TraceFormatter} [format] 用于规定转换后的字符串格式的回调方法，默认转换格式的默认转换格式类似 Python 。
     * @return {string[]} 将集合中元素转换为字符串后的数组。
     */
    public toStringArray(format?: TraceFormatter): string[] {
        let trace: string[] = []

        for (let frame of this.frames) {
            trace.push(frame.toString(format));
        }

        return trace
    }

    /**
     * @description: 将调用堆栈集合转换为字符串。
     * @param {TraceFormatter} [format] 用于规定转换后的字符串格式的回调方法，默认转换格式的默认转换格式类似 Python 。
     * @return {string} 转换后的字符串。
     */
    public toString(format?: TraceFormatter): string {
        let trace: string[] = []

        for (let frame of this.frames) {
            trace.push(frame.toString(format));
        }

        return trace.join("\n")
    }
}

class LogCollection extends FrameCollection<LogStackFrame> {
    /**
     * @description: 从当前的集合当中过滤符合条件的元素。
     * @param {Function} callbackFn 用来测试数组中每个元素的函数。返回 `true` 表示该元素通过测试，保留该元素， `false` 则不保留。它接受以下三个参数：
     * - `element` 数组中当前正在处理的元素。
     * - `index` 正在处理的元素在数组中的索引。
     * - `array` 调用了 `filter()` 的数组本身。
     * @return {LogCollection} 过滤出的符合条件的日志组成的新集合。
     */
    public filter(callbackFn: (frame: LogStackFrame, index: number, array: LogStackFrame[]) => boolean): LogCollection {
        let result = new LogCollection();
        let tempFrame: LogStackFrame;

        for (let i = 0; i < this.frames.length; i++) {
            tempFrame = this.frames[i];
            if (callbackFn(tempFrame, i, this.frames)) {
                result.push(tempFrame);
            }
        }

        return result;
    }

    /**
     * @description: 将日志集合转换为 html 字符串用于发送日志。
     * @return {string} 转换后的字符串。
     */
    public toHtmlString(): string {
        let stack: string[] = [
            `<div style="
                font-size: 15px;
                font-family: monospace;
                word-wrap:break-word;
            ">`
        ];

        for (let i = 0; i < this.frames.length; i++) {
            stack.push(this.frames[i].toHtmlString());
        }
        stack.push('</div>')

        return stack.join('\n');
    }

    /**
     * @description: 将日志集合逐个转换为字符串。
     * @return {string[]} 将集合中元素转换为字符串后的数组。
     */
    public toStringArray(): string[] {
        let stack: string[] = [];

        for (let i = 0; i < this.frames.length; i++) {
            stack.push(this.frames[i].toString());
        }

        return stack;
    }

    /**
     * @description: 将日志集合转换为字符串。
     * @return {string} 将日志集合元素转换为字符串后使用换行符拼接的字符串。
     */
    public toString(): string {
        let stack: string[] = [];

        for (let i = 0; i < this.frames.length; i++) {
            stack.push(this.frames[i].toString());
        }

        return stack.join('\n');
    }
}

class TraceStackFrame {
    private line: number;
    private callerName: string;

    constructor(line: number, callerName: string) {
        this.line = line;
        this.callerName = callerName;
    }

    /**
     * @description: 获取调用所在代码中的行数。
     * @return {number} 调用所在的行号。
     */
    public getLine(): number {
        return this.line;
    }

    /**
     * @description: 获取调用者的函数名。
     * @return {string} 调用者的函数名。
     */
    public getCallerName(): string {
        return this.callerName;
    }

    /**
     * @description: 设置调用者的函数名。
     * @param {string} callerName 要设置的函数名。
     */
    public setCallerName(callerName: string): void {
        this.callerName = callerName;
    }

    /**
     * @description: 将 TraceStackFrame 对象转换为字符串的方法。
     * @param {TraceFormatter} [format] 用于规定转换后的字符串格式的回调方法，默认转换格式的默认转换格式类似 Python 。
     * @return {string} 转换后的字符串。
     */
    public toString(format?: TraceFormatter): string {
        return (format ?? defaultFormatter)(this.line, this.callerName);
    }
}

class LogStackFrame {
    private data: string;
    private scheme: LoggerScheme;

    constructor(data: string, scheme?: LoggerScheme) {
        this.data = data;
        this.scheme = scheme ?? LoggerSchemes.log;
    }

    /**
     * @description: 获取日志栈帧的级别，一般用于 `LogCollection.filter()` 的回调函数进行判断。建议通过 `LogLevel` 枚举类型来比较等级。
     * @return {number} 日志栈帧的级别。
     * @example
     * ```typescript
     * // 获取日志堆栈中全部的 log 等级的日志记录
     * let collection = LOG_STACK.filter((frame) => {
     *     return frame.getLevel() == LogLevel.log;
     * });
     * ```
     */
    public getLevel(): number {
        return this.scheme.level;
    }

    /**
     * @description: 获取日志栈帧曾经输出的信息，一般用于 `LogCollection.filter()` 的回调函数进行判断。
     * @return {string} 日志栈帧曾经输出的信息。
     * @example
     * ```typescript
     * // 获取日志堆栈中全部包含其中 hello 的日志记录
     * let collection = LOG_STACK.filter((frame) => {
     *     return /hello/.test(frame.getData());
     * });
     * ```
     */
    public getData(): string {
        return this.data
    }

    /**
     * @description: 将日志堆栈的栈帧转换为字符串。
     * @return {string} 转换后的栈帧。
     */
    public toString(): string {
        return this.data;
    }

    /**
     * @description: 将日志堆栈的栈帧转换为 html 字符串用于发送日志。
     * @return {string} 转换后的栈帧。
     */
    public toHtmlString(): string {
        let htmlArray: string[] = [];
        // TODO(BATU1579): 添加可以自定义的行内样式
        let startTag: string = `<span style='color: ${this.scheme.color};'>`;
        let endTag: string = `</span></br>`

        for (let line of this.data.split('\n')) {
            // 转义特殊字符
            line = line.replace(/[<>&"'`\/]/g, (c) => {
                return {
                    '<': '&lt;',
                    '>': '&gt;',
                    '&': '&amp;',
                    '"': '&quot;',
                    '\'': '&#39;',
                    '`': '&#96',
                    '\/': '&#x2F'
                }[c]!;
            });
            htmlArray.push(
                [startTag, line, endTag].join('')
            );
        }

        return htmlArray.join('\n');
    }
}

export enum LogLevel {
    Debug,
    Log,
    Info,
    Warn,
    Error
}

export class LoggerSchemes {
    private constructor() { }

    static readonly trace = {
        'displayName': 'TRACE',
        'logFunction': console.verbose,
        'color': 'lightgrey',
        'level': LogLevel.Debug
    }
    static readonly debug = {
        'displayName': 'DEBUG',
        'logFunction': console.verbose,
        'color': 'lightgrey',
        'level': LogLevel.Debug
    }
    static readonly log = {
        'displayName': ' LOG ',
        'logFunction': console.log,
        'color': 'black',
        'level': LogLevel.Log
    }
    static readonly info = {
        'displayName': 'INFO',
        'logFunction': console.info,
        'color': 'green',
        'level': LogLevel.Info
    }
    static readonly warn = {
        'displayName': 'WARN',
        'logFunction': console.warn,
        'color': 'yellow',
        'level': LogLevel.Warn
    }
    static readonly error = {
        'displayName': 'ERROR',
        'logFunction': console.error,
        'color': 'red',
        'level': LogLevel.Error
    }
}

export interface LoggerScheme {
    readonly displayName: string;
    readonly logFunction: (data?: any, ...args: any[]) => void;
    readonly color: string;
    readonly level: LogLevel;
    readonly needPrint?: boolean;
    readonly needRecord?: boolean;
}

/**
 * @description: 日志堆栈，用来记录打印的全部日志。
 */
export const LOG_STACK: LogCollection = new LogCollection();

/**
 * @description: pushplus 的令牌。用于发送日志。
 */
let _token: string | null = null;

/**
 * @description: 通过抛出异常，从调用堆栈中获取调用者的函数名。
 * @param {number} [index] 调用堆栈层数（默认为 0 ），大于等于 0 视为 0 即调用此函数的函数名。
 * @return {string} 调用者的函数名。
 */
export function getCallerName(index: number = 0): string {
    let trace = sliceStackFrames(getRawStackTrace(), 1, 0);
    let stackFrames = parseTrace(trace);

    // 检查参数 index 的范围
    if (index < 0) index = 0;
    if (index > stackFrames.length - 1) index = stackFrames.length - 1;

    return stackFrames[index].getCallerName();
}

/**
 * @description: 获取当前真实的调用堆栈。
 * @param {Function} [endFunction] 终止栈帧，会自动排除后续的无用栈帧。
 * 
 * **注意！：**
 * 
 * - 匿名函数和类中的方法等 `console.trace()` 方法不显示的函数不能当作终止栈帧。
 * 
 * @return {string} 调用堆栈的字符串。
 */
export function getRawStackTrace(endFunction?: Function): string {
    let stackTrace = { stack: '' };

    Error.captureStackTrace(
        stackTrace,
        endFunction
    );

    // 删除不必要的栈帧
    return sliceStackFrames(stackTrace.stack, 1, -2);
}

/**
 * @description: 获取修正后的调用堆栈信息。
 * @param {Function} [endFunction] 终止栈帧，会自动排除后续的无用栈帧。
 * @return {TraceCollection} 调用堆栈集合。
 */
export function getStackTrace(endFunction?: Function): TraceCollection {
    let trace = sliceStackFrames(getRawStackTrace(endFunction), 1, 0);
    return new TraceCollection(...parseTrace(trace));
}

export interface LogRecordConfig {
    readonly needPrint?: boolean;
    readonly needRecord?: boolean;
    readonly skipCallerNumber?: number;
}

const DEFAULT_LOG_RECORD_CONFIG: LogRecordConfig = {
    needPrint: true,
    needRecord: true,
    skipCallerNumber: 1
}

export class Record {

    private constructor() { }

    /**
     * @description: 用来限制记录的日志级别，低于此级别的日志不会记录。
     */
    private static RECORD_LEVEL: number = LogLevel.Debug;

    /**
     * @description: 用来限制显示的日志级别，低于此级别的日志不会被显示出来。
     */
    private static DISPLAY_LEVEL: number = LogLevel.Debug;

    /**
     * @description: 设置记录的日志级别，低于设置的级别的日志都不会记录。
     * 
     * **注意！：**
     * 
     * - 修改前的日志记录不会改变。
     * 
     * @param {number} level 设置的等级。建议使用 `LogLevel` 枚举类型来获取等级。
     */
    public static setRecordLevel(level: number): void {
        Record.RECORD_LEVEL = level;
    }

    /**
     * @description: 设置显示的日志级别，低于设置的级别的日志都不会显示。
     * @param {number} level 设置的等级。建议使用 `LogLevel` 枚举类型来获取等级。
     */
    public static setDisplayLevel(level: number): void {
        Record.DISPLAY_LEVEL = level;
    }

    /**
     * @description: 将信息打印到控制台，并带上换行符。 可以一次性传入多个参数，第一个参数作为主要信息，其他参数作为类似于 [printf(3)](https://man7.org/linux/man-pages/man3/printf.3.html) 中的代替值（参数都会传给 `util.format()` ）。
     * 
     * 此函数与 `console.log` 方法的主要区别在于会自动存储每一次的日志，以供后面使用。
     * @param {string} [message] 主要信息。
     * @param {any[]} [args] 要填充的数据。
     * @return {string} 输出的日志信息。
     * @example
     * ```typescript
     * const count: number = 5;
     * 
     * // 打印 'count: 5' 到 stdout
     * Record.log('count: %d', count);
     * 
     * // 打印 'count: 5' 到 stdout
     * Record.log('count:', count);
     * ```
     */
    public static log(message?: string, ...args: any[]): string {
        return Record.recLog(
            LoggerSchemes.log,
            DEFAULT_LOG_RECORD_CONFIG,
            // @ts-ignore
            util.format(message, ...args) as string,
        );
    }

    /**
     * @description: 与 `Record.log` 类似，但输出结果以灰色字体显示。输出优先级低于 `log` ，用于输出观察性质的信息。
     * @param {string} [message] 主要信息。
     * @param {array} [args] 要填充的数据。
     * @return {string} 输出的日志信息。
     */
    public static verbose(message?: string, ...args: any[]): string {
        return Record.recLog(
            LoggerSchemes.debug,
            DEFAULT_LOG_RECORD_CONFIG,
            // @ts-ignore
            util.format(message, ...args) as string,
        );
    }

    /**
     * @description: 与 `Record.log` 类似，但输出结果以灰色字体显示。输出优先级低于 `log` ，用于输出观察性质的信息。
     * 
     * **注意！：**
     * 
     * - 此函数是 `Record.verbose` 的别名。
     * 
     * @param {string} [message] 主要信息。
     * @param {array} [args] 要填充的数据。
     * @return {string} 输出的日志信息。
     */
    public static debug = Record.verbose;

    /**
     * @description: 与 `Record.log` 类似，但输出结果以绿色字体显示。输出优先级高于 `log` ，用于输出重要信息。
     * @param {string} [message] 主要信息。
     * @param {array} [args] 要填充的数据。
     * @return {string} 输出的日志信息。
     */
    public static info(message?: string, ...args: any[]): string {
        return Record.recLog(
            LoggerSchemes.info,
            DEFAULT_LOG_RECORD_CONFIG,
            // @ts-ignore
            util.format(message, ...args) as string,
        );
    }

    /**
     * @description: 与 `Record.log` 类似，但输出结果以蓝色字体显示。输出优先级高于 `info` ，用于输出警告信息。
     * @param {string} [message] 主要信息。
     * @param {array} [args] 要填充的数据。
     * @return {string} 输出的日志信息。
     */
    public static warn(message?: string, ...args: any[]): string {
        return Record.recLog(
            LoggerSchemes.warn,
            DEFAULT_LOG_RECORD_CONFIG,
            // @ts-ignore
            util.format(message, ...args) as string,
        );
    }

    /**
     * @description: 与 `Record.log` 类似，但输出结果以红色字体显示。输出优先级高于 `warn` ，用于输出错误信息。
     * @param {string} [message] 主要信息。
     * @param {array} [args] 要填充的数据。
     * @return {string} 输出的日志信息。
     */
    public static error(message?: string, ...args: any[]): string {
        return Record.recLog(
            LoggerSchemes.error,
            DEFAULT_LOG_RECORD_CONFIG,
            // @ts-ignore
            util.format(message, ...args) as string,
        );
    }

    /**
     * @description: 与 `console.trace` 类似，同时会打印出调用这个函数所在的调用栈信息（即当前运行的文件、行数等信息）。
     * 
     * 此函数与 `console.trace` 的主要区别在于会修正异常的行号，便于调试。同时会将调用堆栈信息存储在日志堆栈中。
     * 
     * **注意！：**
     * 
     * - 此函数显示的等级和 `Record.debug()` 相同。
     * 
     * @param {string} [message] 主要信息。
     * @param {array} [args] 要填充的数据。
     * @return {string} 输出的日志信息。
     * @example
     * ```typescript
     * // Show me
     * //  | at line xxx, in <callerName>
     * Record.trace('Show me');
     * ```
     */
    public static trace(message?: string, ...args: any[]): string {
        let trace = sliceStackFrames(getRawStackTrace(), 1, 0);
        let parsedTrace = new TraceCollection(...parseTrace(trace))

        // @ts-ignore
        message = util.format(message, ...args);

        return Record.recLog(
            LoggerSchemes.trace,
            DEFAULT_LOG_RECORD_CONFIG,
            `${message}\n${parsedTrace.toString()}`,
        );
    }


    /**
     * @description: 与 `Record.trace` 类似，会打印出调用这个函数所在的调用栈信息（即当前运行的文件、行数等信息）。
     * 
     * 此函数与 `Record.trace` 的主要区别在于可以手动指定调用栈的格式，可以更个性化的显示调用栈。
     * 
     * **注意！：**
     * 
     * - 此函数显示的等级和 `Record.debug()` 相同。
     * 
     * @param {TraceFormatter} formatter 用于规定转换后的字符串格式的回调方法，默认转换格式的默认转换格式类似 Python 。
     * @param {string} [message] 主要信息。
     * @param {array} [args] 要填充的数据。
     * @return {string} 输出的日志信息。
     * @example
     * ```typescript
     * // Show me
     * //  | callerName: #line
     * Record.trace((line, caller) => `  | ${caller}: #${line}`, 'Show me');
     * ```
     */
    public static traceWithCustomFormatter(formatter: TraceFormatter, message?: string, ...args: any[]): string {
        let trace = sliceStackFrames(getRawStackTrace(), 1, 0);
        let parsedTrace = new TraceCollection(...parseTrace(trace))

        // @ts-ignore
        message = util.format(message, ...args);

        return Record.recLog(
            LoggerSchemes.trace,
            DEFAULT_LOG_RECORD_CONFIG,
            `${message}\n${parsedTrace.toString(formatter)}`,
        );
    }

    /**
     * @description: 高度自定义的日志信息接口
     * @param {LoggerScheme} scheme 日志记录方案，包括显示名称，日志等级，显示颜色等等，可以使用模块中的 `LoggerSchemes` 类来设置，也可以自己构建。
     * @param {LogRecordConfig} config 细粒度的日志设置，包括是否输出到控制台，跳过几个调用者名称等等。
     * @param {string} [message] 主要信息。
     * @param {array} [args] 要填充的数据。
     * @return {string} 输出的日志信息。
     */
    public static customLog(
        scheme: LoggerScheme,
        config: LogRecordConfig,
        message?: string, ...args: any[]
    ): string {
        // @ts-ignore
        return Record.recLog(scheme, config, util.format(message, ...args) as string);
    }

    /**
     * @description: 记录日志核心方法，负责记录和输出日志数据。
     * @param {LoggerScheme} scheme 日志记录方案。
     * @param {LogRecordConfig} config 日志记录设置。
     * @param {string} [logMessage] 日志信息。
     * @return {string} 输出的日志信息。
     */
    private static recLog(scheme: LoggerScheme, config: LogRecordConfig, logMessage?: string): string {
        // TODO(BATU1579): 自定义日志格式
        logMessage = `[${scheme.displayName}] [${getCallerName(config.skipCallerNumber)}]: ${logMessage}`;

        // 向日志堆栈中添加数据
        let needRecord = config.needRecord ?? scheme.needRecord ?? true;
        if (needRecord && scheme.level >= Record.RECORD_LEVEL) {
            LOG_STACK.push(new LogStackFrame(logMessage, scheme));
        }

        // 输出日志
        let needPrint = config.needPrint ?? scheme.needPrint ?? true;
        if (needPrint && scheme.level >= Record.DISPLAY_LEVEL) {
            scheme.logFunction(logMessage);
        }

        return logMessage;
    }
}

/**
 * @description: 设置 pushplus 的令牌，必须为 32 位十六进制数的字符串。
 * 
 * 如果不是运行中获取的令牌，可以选择在脚本配置文件当中添加如下名为 `TOKEN` 的字段，在读取全局变量时会自动加载。
 * 
 * @param {string} token 用于调用 pushplus api 的令牌。
 * @return {boolean} 是否设置成功。
 */
export function setToken(token: string): boolean {
    if (token.length !== 32 || /^\d*$/.test(token)) {
        return false;
    }

    _token = token;

    return true;
}

/**
 * @description: 将信息发送到远程，并带上换行符，返回是否发送成功。
 * 
 * 可以一次性传入多个参数，第一个参数作为主要信息，其他参数作为类似于 [printf(3)](https://man7.org/linux/man-pages/man3/printf.3.html) 中的代替值（参数都会传给 `util.format()` ）。
 * @param {string} title 发送消息的标题。
 * @param {string} data 主要信息。
 * @param {array} [args] 要填充的数据。
 * @return {boolean} 是否发送成功。
 */
export function sendMessage(title: string, data: string, ...args: any[]): boolean {
    // @ts-ignore
    data = util.format(data, ...args);
    return sendToRemote(title, data);
}

/**
 * @description: 使用 pushplus 发送日志集合。
 * @param {LogCollection} [logs] 要发送的日志集合，默认发送完整的日志堆栈。可以通过过滤方法，选择性发送。
 * @param {string} [title] 发送消息的标题（默认为 `logger` ）。
 * @param {boolean} [clear] 发送后是否清空日志堆栈（默认为 `true` ）。
 * 
 * **注意！：**
 * 
 * - 发送失败时并不会清空日志堆栈，不管 `clear` 参数为何值。
 * - 在选择的日志集合不为默认时需要手动清除全部日志。
 * 
 * @return {boolean} 是否发送成功。
 * @example
 * ```typescript
 * // 只发送全部 log 等级的日志
 * let collection = LOG_STACK.filter((frame) => {
 *     return frame.getLevel() == LogLevel.log;
 * });
 * sendLog(collection);
 * LOG_STACK.clear();
 * ```
 */
export function sendLog(logs?: LogCollection, title?: string, clear?: boolean): boolean {
    logs = logs ?? LOG_STACK;
    title = title ?? 'logger';
    clear = clear ?? true;
    let isSend = sendToRemote(title, logs.toHtmlString());

    if (isSend && clear) {
        logs.clear();
    }

    return isSend;
}

/**
 * @description: 截取需要的栈帧。
 * @param {string} stackTrace 调用堆栈字符串。
 * @param {number} start 开始行（默认为 0 ），小于等于 0 时视为 0 。
 * @param {number} end 结束行（默认为 0 ），为正时表示从前计数，为负时表示从后计数。
 * @return {string} 处理后的调用堆栈字符串。
 */
function sliceStackFrames(stackTrace: string, start: number = 0, end: number = 0): string {
    if (stackTrace === '') return '';

    let temp = stackTrace.split('\n');

    // 映射负值
    if (end <= 0) end = temp.length + end;

    // 检查参数 start 的范围
    if (start < 0) {
        start = 0;
    } else if (start > temp.length - 1) {
        start = temp.length - 1;
    }

    // 检查参数 end 的范围
    if (end > temp.length) {
        end = temp.length;
    }
    else if (end <= start) {
        return '';
    }

    temp = temp.slice(start, end);
    return temp.join('\n');
}

/**
 * @description: 格式化调用堆栈信息。
 * @param {string} originTrace 原始调用堆栈字符串（使用异常的 `stack` 属性取得）。
 * @return {TraceStackFrame[]} 格式化后的调用堆栈数据。
 */
function parseTrace(originTrace: string): TraceStackFrame[] {
    let stack: TraceStackFrame[] = [];
    let originStack: string[] = originTrace.split('\n');

    for (let item of originStack) {
        let result = /\:(\d+)(?: \((.*)\))?/.exec(item)!;
        stack.push(new TraceStackFrame(
            // 修正和源码偏移的行数
            Number(result[1]) - 3,
            result[2] ?? 'Anonymous functions'
        ));
    }

    // 修改最外层调用名称为 Outer
    stack[stack.length - 1].setCallerName("Outer");

    return stack;
}

/**
 * @description: 使用 pushplus 推送文本。
 * @param {string} title 发送消息的标题。
 * @param {string} message 要发送的消息。
 * @return {boolean} 是否发送成功。
 */
function sendToRemote(title: string, message: string): boolean {
    // TODO: 抛出异常？
    if (_token === null) {
        return false;
    }

    let res = http.post(`http://www.pushplus.plus/send`, {
        title: title,
        token: _token,
        content: message,
        template: 'html'
    })

    return res.statusCode === 200;
}

function defaultFormatter(line: number, callerName: string): string {
    return `  | at line ${line}, in <${callerName}>`;
}

export type LogCollectionType = LogCollection;

export type LogStackFrameType = LogStackFrame;

export type TraceCollectionType = TraceCollection;

export type TraceStackFrameType = TraceStackFrame;

export type TraceFormatter = typeof defaultFormatter;
