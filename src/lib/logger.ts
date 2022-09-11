/*
 * @Author: BATU1579
 * @CreateDate: 2022-02-05 04:00:16
 * @LastEditor: BATU1579
 * @LastTime: 2022-09-11 09:10:30
 * @FilePath: \\src\\lib\\logger.ts
 * @Description: 存放关于日志和调试信息的预制方法。
 */
class LogCollection {
    private frames: LogStackFrame[];

    constructor(...frames: LogStackFrame[]) {
        this.frames = frames;
    }

    /**
     * @description: 清空日志堆栈中的数据，用于手动清空日志堆栈。
     * - **注意！：一般来说不需要手动清空。在发送日志后会自动清空日志堆栈，除非单独设置。**
     */
    public clear(): void {
        this.frames.length = 0;
    }

    /**
     * @description: 将日志堆栈转换为 html 字符串用于发送日志。
     * @return {string} 转换后的堆栈。
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
     * @description: 获取日志堆栈的内容。
     * @return {string} 将栈帧转换为字符串后的日志堆栈。
     */
    public toString(): string {
        let stack: string[] = [];

        for (let i = 0; i < this.frames.length; i++) {
            stack.push(this.frames[i].toString());
        }

        return stack.join('\n');
    }

    /**
     * @description: 向日志堆栈中压入新的栈帧。
     * @param {LogStackFrame} frame 添加的栈帧。
     */
    public push(frame: LogStackFrame): void {
        this.frames.push(frame);
    }

    /**
     * @description: 从当前的日志集合当中过滤符合条件的日志。
     * @param {Function} callbackFn 用来测试数组中每个元素的函数。返回 `true` 表示该元素通过测试，保留该元素， `false` 则不保留。它接受以下三个参数：
     * - `element` 数组中当前正在处理的元素。
     * - `index` 正在处理的元素在数组中的索引。
     * - `array` 调用了 `filter()` 的数组本身。
     * @return {LogCollection} 过滤出的符合条件的日志栈帧组成的新日志集合。
     */
    public filter(callbackFn: (frame: LogStackFrame, index: number, array: LogStackFrame[]) => boolean): LogCollection {
        let result: LogCollection = new LogCollection();
        let tempFrame: LogStackFrame;

        for (let i = 0; i < this.frames.length; i++) {
            tempFrame = this.frames[i];
            if (callbackFn(tempFrame, i, this.frames)) {
                result.push(tempFrame);
            }
        }

        return result;
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
     * @description: 重写 `TraceItem` 对象转换为字符串的方法。转换格式类似 Python 。
     * @return {string} 转换后的字符串。
     */
    public toString(): string {
        // TODO 可以自定义模板
        return ` | at line ${this.line}, in <${this.callerName}>`
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

    public getLevel(): number {
        return this.scheme.level;
    }

    public getData(): string {
        return this.data
    }
}

export enum LogLevel {
    Debug,
    Log,
    Info,
    Warn,
    Error
}

class LoggerSchemes {
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

interface LoggerScheme {
    displayName: string;
    logFunction: (data?: any, ...args: any[]) => void;
    color: string;
    level: number;
}

/**
 * @description: 日志堆栈，用来记录打印的全部日志。
 */
export const logStack: LogCollection = new LogCollection();

/**
 * @description: pushplus 的令牌。用于发送日志。
 */
let TOKEN: string | null = null;

/**
 * @description: 通过抛出异常，从调用堆栈中获取调用者的函数名。
 * @param {number} [index] 调用堆栈层数（默认为 0 ），大于等于 0 视为 0 即调用此函数的函数名。
 * @return {string} 调用者的函数名。
 */
export function getCallerName(index: number = 0): string {
    let trace = sliceStackFrames(getStackTrace(), 1, 0);
    let stackFrames = parseTrace(trace);

    // 检查参数 index 的范围
    if (index < 0) index = 0;
    if (index > stackFrames.length - 1) index = stackFrames.length - 1;

    return stackFrames[index].getCallerName();
}

/**
 * @description: 获取当前真实的调用堆栈。
 * @param {Function} [endFunction] 终止栈帧，会自动排除后续的无用栈帧。
 * - **注意！：匿名函数和类中的方法等 `console.trace()` 方法不显示的函数不能当作终止栈帧。**
 * @return {string} 调用堆栈的字符串。
 */
export function getStackTrace(endFunction?: Function): string {
    let stackTrace = { stack: '' };

    Error.captureStackTrace(
        stackTrace,
        endFunction
    );

    // 删除不必要的栈帧
    return sliceStackFrames(stackTrace.stack, 1, -2);
}

export class Record {

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
     * - **注意！：修改前的日志记录不会改变。**
     * @param {number} level 设置的等级。建议使用 `LogLevel` 枚举类型来获取等级。
     */
    public setRecordLevel(level: number): void {
        Record.RECORD_LEVEL = level;
    }

    /**
     * @description: 设置显示的日志级别，低于设置的级别的日志都不会显示。
     * @param {number} level 设置的等级。建议使用 `LogLevel` 枚举类型来获取等级。
     */
    public setDisplayLevel(level: number): void {
        Record.DISPLAY_LEVEL = level;
    }

    /**
     * @description: 将信息打印到控制台，并带上换行符。 可以一次性传入多个参数，第一个参数作为主要信息，其他参数作为类似于 [printf(3)](https://man7.org/linux/man-pages/man3/printf.3.html) 中的代替值（参数都会传给 `util.format()` ）。
     * 
     * 此函数与 `console.log` 方法的主要区别在于会自动存储每一次的日志，以供后面使用。
     * @param {string} [message] 主要信息。
     * @param {any[]} [args] 要填充的数据。
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
        return Record.recLog(LoggerSchemes.log, message, ...args);
    }

    /**
     * @description: 与 `Record.log` 类似，但输出结果以灰色字体显示。输出优先级低于 `log` ，用于输出观察性质的信息。
     * @param {string} [message] 主要信息。
     * @param {array} [args] 要填充的数据。
     */
    public static verbose(message?: string, ...args: any[]): string {
        return Record.recLog(LoggerSchemes.debug, message, ...args);
    }

    /**
     * @description: 与 `Record.log` 类似，但输出结果以灰色字体显示。输出优先级低于 `log` ，用于输出观察性质的信息。
     * - **注意！：此函数是 `Record.verbose` 的别名。**
     * @param {string} [message] 主要信息。
     * @param {array} [args] 要填充的数据。
     */
    public static debug = Record.verbose;

    /**
     * @description: 与 `Record.log` 类似，但输出结果以绿色字体显示。输出优先级高于 `log` ，用于输出重要信息。
     * @param {string} [message] 主要信息。
     * @param {array} [args] 要填充的数据。
     */
    public static info(message?: string, ...args: any[]): string {
        return Record.recLog(LoggerSchemes.info, message, ...args);
    }

    /**
     * @description: 与 `Record.log` 类似，但输出结果以蓝色字体显示。输出优先级高于 `info` ，用于输出警告信息。
     * @param {string} [message] 主要信息。
     * @param {array} [args] 要填充的数据。
     */
    public static warn(message?: string, ...args: any[]): string {
        return Record.recLog(LoggerSchemes.warn, message, ...args);
    }

    /**
     * @description: 与 `Record.log` 类似，但输出结果以红色字体显示。输出优先级高于 `warn` ，用于输出错误信息。
     * @param {string} [message] 主要信息。
     * @param {array} [args] 要填充的数据。
     */
    public static error(message?: string, ...args: any[]): string {
        return Record.recLog(LoggerSchemes.error, message, ...args);
    }

    /**
     * @description: 与 `console.trace` 类似，同时会打印出调用这个函数所在的调用栈信息（即当前运行的文件、行数等信息）。
     * 
     * 此函数与 `console.trace` 的主要区别在于会修正异常的行号，便于调试。同时会将调用堆栈信息存储在日志堆栈中。
     * 
     * - **注意！：此函数显示的等级和 `Record.debug()` 相同。**
     * @param {string} [data] 主要信息。
     * @param {array} [args] 要填充的数据。
     * @example
     * ```typescript
     * // Show me
     * //  | at line xxx, in <callerName>
     * Record.trace('Show me');
     * ```
     */
    public static trace(data?: string, ...args: any[]): string {
        let trace = sliceStackFrames(getStackTrace(), 1, 0);

        return Record.recLog(LoggerSchemes.trace, `${data}\n${formatTrace(trace)}`, ...args);
    }

    /**
     * @description: 记录日志核心方法，负责记录和输出日志数据。
     * @param {LoggerScheme} scheme 日志记录方案。
     * @param {string} [data] 主要信息。
     * @param {array} [args] 要填充的数据。
     * @return {string} 输出的日志信息。
     */
    private static recLog(scheme: LoggerScheme, data?: string, ...args: any[]): string {
        // @ts-ignore
        data = util.format(data, ...args);
        data = `[${scheme.displayName}] [${getCallerName(3)}]: ${data}`;

        // 向日志堆栈中添加数据
        if (scheme.level >= Record.RECORD_LEVEL) {
            logStack.push(new LogStackFrame(data, scheme));
        }

        // 输出日志
        if (scheme.level >= Record.DISPLAY_LEVEL) {
            scheme.logFunction(data);
        }

        return data;
    }
}

/**
 * @description: 设置 pushplus 的令牌，必须为 32 位十六进制数的字符串。
 * @param {string} token 用于调用 pushplus api 的令牌。
 * @return {boolean} 是否设置成功。
 */
export function setToken(token: string): boolean {
    let regResult = /([0-9a-f]*)/.exec(token);

    if (token.length !== 32) {
        return false;
    } else if (regResult === null) {
        return false;
    } else if (regResult[1] !== token) {
        return false;
    }

    TOKEN = token;

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
 * - **注意！：发送失败时并不会清空日志堆栈，不管 `clear` 参数为何值。**
 * - **注意！：在选择的日志集合不为默认时需要手动清除全部日志。**
 * @return {boolean} 是否发送成功。
 * @example
 * ```typescript
 * // 只发送全部 log 等级的日志
 * let collection = logStack.filter((frame) => {
 *     return frame.getLevel() == LogLevel.log;
 * });
 * sendLog(collection);
 * logStack.clear();
 * ```
 */
export function sendLog(logs?: LogCollection, title?: string, clear?: boolean): boolean {
    logs = logs ?? logStack;
    title = title ?? 'logger';
    clear = clear?? true;
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
 * @description: 重新格式化调用堆栈信息，同时修正行号。
 * @param {string} originTrace 原始调用堆栈字符串（使用异常的 `stack` 属性取得）。
 * @return {string} 处理后的调用堆栈字符串。
 */
function formatTrace(originTrace: string): string {
    let stackFrames: TraceStackFrame[] = parseTrace(originTrace);
    let trace: string[] = []

    for (let frame of stackFrames) {
        trace.push(frame.toString())
    }

    return trace.join("\n")
}

/**
 * @description: 使用 pushplus 推送文本。
 * @param {string} title 发送消息的标题。
 * @param {string} message 要发送的消息。
 * @return {boolean} 是否发送成功。
 */
function sendToRemote(title: string, message: string): boolean {
    // TODO: 抛出异常？
    if (TOKEN === null) {
        return false;
    }

    let res = http.post(`http://www.pushplus.plus/send`, {
        title: title,
        token: TOKEN,
        content: message,
        template: 'html'
    })

    return res.statusCode === 200;
}
