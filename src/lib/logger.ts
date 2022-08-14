/*
 * @Author: BATU1579
 * @CreateDate: 2022-02-05 04:00:16
 * @LastEditor: BATU1579
 * @LastTime: 2022-08-13 09:27:19
 * @FilePath: \\src\\lib\\logger.ts
 * @Description: 存放关于日志和调试信息的预制方法。
 */

class LogStack {
    private STACK: LogStackFrame[] = [];

    /**
     * @description: 向日志堆栈中压入新的数据。
     * @param {LogStackFrame} stackFrame 要添加的新数据。
     * @return {number} 添加的数据的数组下标。
     */
    public push(stackFrame: LogStackFrame): number {
        return this.STACK.push(stackFrame);
    }

    /**
     * @description: 清空日志堆栈中的数据，用于手动清空日志堆栈。
     * - **注意！：一般来说不需要手动清空。在发送日志后会自动清空日志堆栈，除非单独设置。**
     */
    public clear(): void {
        this.STACK.length = 0;
    }

    /**
     * @description: 获取日志堆栈的内容。
     * @return {string[]} 将栈帧转换为字符串后的日志堆栈。
     */
    public getLogStack(): string[] {
        let stack: string[] = [];

        for (let i = 0; i < this.STACK.length; i++) {
            stack.push(this.STACK[i].toString());
        }

        return stack;
    }

    /**
     * @description: 将日志堆栈转换为字符串。
     * @return {string} 转换后的堆栈。
     */
    public toString(): string {
        return this.getLogStack().join('\n');
    }

    /**
     * @description: 将日志堆栈转换为 html 字符串用于发送日志。
     * @return {string} 转换后的堆栈。
     */
    public toHtmlString(): string {
        let stack: string[] = [
            '<div style="font-size: 15px; font-family: monospace; word-wrap:break-word;">'
        ];

        for (let i = 0; i < this.STACK.length; i++) {
            stack.push(this.STACK[i].toHtmlString());
        }
        stack.push('</div>')

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
        return ` | at line ${this.line}, in <${this.callerName}>`
    }
}

class LogStackFrame {
    private data: string;
    private color: string;

    constructor(scheme: LoggerScheme, data: string) {
        this.data = data;
        this.color = scheme.color;
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
        let startTag: string = `<span style='color: ${this.color};'>`;
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

class LoggerSchemes {
    static readonly debug = {
        'displayName': 'DEBUG',
        'logFunction': console.verbose,
        'color': 'lightgrey',
        'level': 0
    }
    static readonly log = {
        'displayName': ' LOG ',
        'logFunction': console.log,
        'color': 'back',
        'level': 1
    }
    static readonly info = {
        'displayName': 'INFO',
        'logFunction': console.info,
        'color': 'green',
        'level': 2
    }
    static readonly warn = {
        'displayName': 'WARN',
        'logFunction': console.warn,
        'color': 'yellow',
        'level': 3
    }
    static readonly error = {
        'displayName': 'ERROR',
        'logFunction': console.error,
        'color': 'red',
        'level': 4
    }
}

interface LoggerScheme {
    displayName: string;
    logFunction: (data?: any, ...args: any[]) => void;
    color: string;
    level: number;
}

class LevelTable {
    static readonly debug: number = 0;
    static readonly log: number = 1;
    static readonly info: number = 2;
    static readonly warn: number = 3;
    static readonly error: number = 4;
}

type LevelName = Exclude<keyof typeof LevelTable, 'prototype'>;

/**
 * @description: 存放关于日志和调试信息的预制方法。
 */
export class Logger {
    /**
     * @description: 日志堆栈，用来记录打印的全部日志。
     */
    public static logStack: LogStack = new LogStack();

    /**
     * @description: 通过抛出异常，从调用堆栈中获取调用者的函数名。
     * @param {number} [index] 调用堆栈层数（默认为 0 ），大于等于 0 视为 0 即调用此函数的函数名。
     * @return {string} 调用者的函数名。
     */
    public static getCallerName(index: number = 0): string {
        let trace = Logger.sliceStackFrames(Logger.getStackTrace(), 1, 0);
        let stackFrames = Logger.parseTrace(trace);

        // 检查参数 index 的范围
        if (index < 0) index = 0;
        if (index > stackFrames.length - 1) index = stackFrames.length - 1;

        return stackFrames[index].callerName;
    }

    /**
     * @description: 获取当前真实的调用堆栈。
     * @param {Function} [endFunction] 终止栈帧，会自动排除后续的无用栈帧。
     * - **注意！：匿名函数和类中的方法等 `console.trace()` 方法不显示的函数不能当作终止栈帧。**
     * @return {string} 调用堆栈的字符串。
     */
    public static getStackTrace(endFunction?: Function): string {
        let stackTrace = { stack: '' };

        Error.captureStackTrace(
            stackTrace,
            endFunction
        );

        // 删除不必要的栈帧
        return Logger.sliceStackFrames(stackTrace.stack, 1, -2);
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
     * Logger.log('count: %d', count);
     * 
     * // 打印 'count: 5' 到 stdout
     * Logger.log('count:', count);
     * ```
     */
    public static log(message?: string, ...args: any[]): string {
        return Logger.recLog(LoggerSchemes.log, message, ...args);
    }

    /**
     * @description: 与 `Logger.log` 类似，但输出结果以灰色字体显示。输出优先级低于 `log` ，用于输出观察性质的信息。
     * @param {string} [message] 主要信息。
     * @param {array} [args] 要填充的数据。
     */
    public static verbose(message?: string, ...args: any[]): string {
        return Logger.recLog(LoggerSchemes.debug, message, ...args);
    }

    /**
     * @description: 与 `Logger.log` 类似，但输出结果以灰色字体显示。输出优先级低于 `log` ，用于输出观察性质的信息。
     * - **注意！：此函数是 `Logger.verbose` 的别名。**
     * @param {string} [message] 主要信息。
     * @param {array} [args] 要填充的数据。
     */
    public static debug(message?: string, ...args: any[]): string {
        return Logger.recLog(LoggerSchemes.debug, message, ...args);
    }

    /**
     * @description: 与 `Logger.log` 类似，但输出结果以绿色字体显示。输出优先级高于 `log` ，用于输出重要信息。
     * @param {string} [message] 主要信息。
     * @param {array} [args] 要填充的数据。
     */
    public static info(message?: string, ...args: any[]): string {
        return Logger.recLog(LoggerSchemes.info, message, ...args);
    }

    /**
     * @description: 与 `Logger.log` 类似，但输出结果以蓝色字体显示。输出优先级高于 `info` ，用于输出警告信息。
     * @param {string} [message] 主要信息。
     * @param {array} [args] 要填充的数据。
     */
    public static warn(message?: string, ...args: any[]): string {
        return Logger.recLog(LoggerSchemes.warn, message, ...args);
    }

    /**
     * @description: 与 `Logger.log` 类似，但输出结果以红色字体显示。输出优先级高于 `warn` ，用于输出错误信息。
     * @param {string} [message] 主要信息。
     * @param {array} [args] 要填充的数据。
     */
    public static error(message?: string, ...args: any[]): string {
        return Logger.recLog(LoggerSchemes.error, message, ...args);
    }

    /**
     * @description: 与 `console.trace` 类似，同时会打印出调用这个函数所在的调用栈信息（即当前运行的文件、行数等信息）。
     * 
     * 此函数与 `console.trace` 的主要区别在于会修正异常的行号，便于调试。
     * @param {string} [data] 主要信息。
     * @param {array} [args] 要填充的数据。
     * @example
     * ```typescript
     * // 打印: (堆栈跟踪会根据被调用的跟踪的位置而变化)
     * // Show me
     * //  | at line xxx, in <callerName>
     * Logger.trace('Show me');
     * ```
     */
    public static trace(data?: string, ...args: any[]): string {
        let trace = Logger.sliceStackFrames(Logger.getStackTrace(), 1, 0);
        // @ts-ignore
        data = util.format(data, ...args);
        data = `${data}\n${Logger.formatTrace(trace)}`;

        console.log(data);

        return data;
    }

    /**
     * @description: 与 `Logger.trace` 类似，同时会打印出调用这个函数所在的调用栈信息（即当前运行的文件、行数等信息）。
     * 
     * 此函数与 `Logger.trace` 的主要区别在于会使用重写的 `Logger.log` 方法将调用堆栈信息存储在日志堆栈中。
     * @param {string} [data] 主要信息。
     * @param {array} [args] 要填充的数据。
     */
    public static recordTrace(data?: string, ...args: any[]): string {
        let trace = Logger.sliceStackFrames(Logger.getStackTrace(), 1, 0);
        let scheme = LoggerSchemes.log;
        scheme.displayName = 'TRACE';

        return Logger.recLog(scheme, `${data}\n${Logger.formatTrace(trace)}`, ...args);
    }

    /**
     * @description: 设置记录的日志级别，低于设置的级别的日志都不会记录。
     * - **注意！：修改前的日志记录不会改变。**
     * @param {LevelName} level 设置的等级，可选的值为：
     * - `debug`
     * - `log`
     * - `info`
     * - `warn`
     * - `error`
     */
    public static setRecordLevel(level: LevelName): void {
        Logger.RECORD_LEVEL = LevelTable[level];
    }

    /**
     * @description: 设置记录的日志级别，低于设置的级别的日志都不会显示。
     * @param {LevelName} level 设置的等级，可选的值为：
     * - `debug`
     * - `log`
     * - `info`
     * - `warn`
     * - `error`
     */
    public static setDisplayLevel(level: LevelName): void {
        Logger.DISPLAY_LEVEL = LevelTable[level];
    }

    /**
     * @description: 设置 pushplus 的令牌，必须为 32 位十六进制数的字符串。
     * @param {string} token 令牌值。
     * @return {boolean} 是否设置成功。
     */
    public static setToken(token: string): boolean {
        let regResult = /([0-9a-f]*)/.exec(token);

        if (token.length !== 32) {
            return false;
        } else if (regResult === null) {
            return false;
        } else if (regResult[1] !== token) {
            return false;
        }

        Logger.TOKEN = token;

        return true;
    }

    /**
     * @description: 将信息发送到远程，并带上换行符。 可以一次性传入多个参数，第一个参数作为主要信息，其他参数作为类似于 [printf(3)](https://man7.org/linux/man-pages/man3/printf.3.html) 中的代替值（参数都会传给 `util.format()` ）。
     * @param {string} title 发送消息的标题。
     * @param {string} data 主要信息。
     * @param {array} [args] 要填充的数据。
     * @return {boolean} 是否发送成功。
     */
    public static sendMessage(title: string, data: string, ...args: any[]): boolean {
        // @ts-ignore
        data = util.format(data, ...args);

        return Logger.sendToRemote(title, data);
    }

    /**
     * @description: 使用 pushplus 发送日志。
     * @param {string} [title] 发送消息的标题（默认为 `logger` ）。
     * @param {boolean} [clearLogStack] 发送后是否清空日志堆栈（默认为 `true` ）。
     * - **注意！：发送失败时并不会清空日志堆栈，不管 `clearLogStack` 参数为何值。**
     * @return {boolean} 是否发送成功。
     */
    public static sendLog(title: string = 'logger', clearLogStack: boolean = true): boolean {
        let isSend = Logger.sendToRemote(title, Logger.logStack.toHtmlString());

        if (isSend && clearLogStack) {
            Logger.logStack.clear();
        }

        return isSend;
    }

    /**
     * @description: pushplus 的令牌。用于发送日志。
     */
    private static TOKEN: string | null = null;

    /**
     * @description: 用来限制记录的日志级别，低于此级别的日志不会记录。
     */
    private static RECORD_LEVEL: number = 0;

    /**
     * @description: 用来限制显示的日志级别，低于此级别的日志不会被显示出来。
     */
    private static DISPLAY_LEVEL: number = 0;

    /**
     * @description: 截取需要的栈帧。
     * @param {string} stackTrace 调用堆栈字符串。
     * @param {number} start 开始行（默认为 0 ），小于等于 0 时视为 0 。
     * @param {number} end 结束行（默认为 0 ），为正时表示从前计数，为负时表示从后计数。
     * @return {string} 处理后的调用堆栈字符串。
     */
    private static sliceStackFrames(stackTrace: string, start: number = 0, end: number = 0): string {
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
    private static parseTrace(originTrace: string): TraceStackFrame[] {
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
        stack[stack.length - 1].callerName = "Outer"

        return stack;
    }

    /**
     * @description: 重新格式化调用堆栈信息，同时修正行号。
     * @param {string} originTrace 原始调用堆栈字符串（使用异常的 `stack` 属性取得）。
     * @return {string} 处理后的调用堆栈字符串。
     */
    private static formatTrace(originTrace: string): string {
        let stackFrames: TraceStackFrame[] = Logger.parseTrace(originTrace);
        let trace: string[] = []

        for (let frame of stackFrames) {
            trace.push(frame.toString())
        }

        return trace.join("\n")
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
        data = `[${scheme.displayName}] [${Logger.getCallerName(3)}]: ${data}`;

        // 向日志堆栈中添加数据
        if (scheme.level >= Logger.RECORD_LEVEL) {
            Logger.logStack.push(new LogStackFrame(scheme, data));
        }

        // 输出日志
        if (scheme.level >= Logger.DISPLAY_LEVEL) {
            scheme.logFunction(data);
        }

        return data;
    }

    /**
     * @description: 使用 pushplus 推送文本。
     * @param {string} title 发送消息的标题。
     * @param {string} message 要发送的消息。
     * @return {boolean} 是否发送成功。
     */
    private static sendToRemote(title: string, message: string): boolean {
        // TODO: 抛出异常？
        if (Logger.TOKEN === null) {
            return false;
        }

        let res = http.post(`http://www.pushplus.plus/send`, {
            title: title,
            token: Logger.TOKEN,
            content: message,
            template: 'html'
        })

        return res.statusCode === 200;
    }
}
