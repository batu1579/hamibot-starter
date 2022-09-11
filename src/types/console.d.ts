/*
 * @Author: BATU1579
 * @CreateDate: 2022-05-25 17:07:59
 * @LastEditor: BATU1579
 * @LastTime: 2022-09-11 10:56:22
 * @FilePath: \\src\\types\\console.d.ts
 * @Description: 控制台模块
 */

declare module 'console' {
    global {

        /**
         * @description: 控制台模块提供了一个和 Web 浏览器中相似的用于调试的控制台。用于输出一些调试信息、中间结果等。 console 模块中的一些函数也可以直接作为全局函数使用，例如 `log` , `print` 等。
         */
        var console: Console

        interface Console {
            /**
             * @description: 显示控制台。这会显示一个控制台的悬浮窗。
             * 
             * **注意！：**
             * 
             * - 此函数需要悬浮窗权限。
             * 
             */
            show(): void;

            /**
             * @description: 隐藏控制台悬浮窗。
             */
            hide(): void;

            /**
             * @description: 清空控制台信息。
             */
            clear(): void;

            /**
             * @description: 将信息打印到控制台，并带上换行符。 可以一次性传入多个参数，第一个参数作为主要信息，其他参数作为类似于 [printf(3)] 中的代替值（参数都会传给 `util.format()` ）。
             * 
             * [printf(3)]: https://man7.org/linux/man-pages/man3/printf.3.html
             * @param {any} [data] 主要信息。
             * @param {array} [args] 要填充的数据。
             * @example
             * ```typescript
             * const count: number = 5;
             * 
             * // 打印 'count: 5' 到 stdout
             * console.log('count: %d', count);
             * 
             * // 打印 'count: 5' 到 stdout
             * console.log('count:', count);
             * ```
             */
            log(data?: any, ...args: any[]): void;

            /**
             * @description: 与 `console.log` 类似，但输出结果以灰色字体显示。输出优先级低于 `log` ，用于输出观察性质的信息。
             * @param {any} [data] 主要信息。
             * @param {array} [args] 要填充的数据。
             */
            verbose(data?: any, ...args: any[]): void;

            /**
             * @description: 与 `console.log` 类似，但输出结果以绿色字体显示。输出优先级高于 `log` ，用于输出重要信息。
             * @param {any} [data] 主要信息。
             * @param {array} [args] 要填充的数据。
             */
            info(data?: any, ...args: any[]): void;

            /**
             * @description: 与 `console.log` 类似，但输出结果以蓝色字体显示。输出优先级高于 `info` ，用于输出警告信息。
             * @param {any} [data] 主要信息。
             * @param {array} [args] 要填充的数据。
             */
            warn(data?: any, ...args: any[]): void;

            /**
             * @description: 与 `console.log` 类似，但输出结果以红色字体显示。输出优先级高于 `warn` ，用于输出错误信息。
             * @param {any} [data] 主要信息。
             * @param {array} [args] 要填充的数据。
             */
            error(data?: any, ...args: any[]): void;

            /**
             * @description: 断言。如果 `value` 为 `false` 则输出错误信息 `message` 并停止脚本运行。
             * @param {any} value 要断言的布尔值。
             * @param {string} message `value` 为 `false` 时要输出的信息。
             * @example
             * ```typescript
             * let a = 1 + 1;
             * console.assert(a == 2, '加法出错啦');
             * ```
             */
            assert(value: any, message: string): void;

            /**
             * @description: 启动一个定时器，用以计算一个操作的持续时间。 定时器由一个唯一的 `label` 标识。 当调用 `console.timeEnd()` 时，可以使用相同的 `label` 来停止定时器，并以毫秒为单位将持续时间输出到控制台。 重复启动同一个标签的定时器会覆盖之前启动同一标签的定时器。
             * @param {string} [label] 计时器标签。
             */
            time(label?: string): void;

            /**
             * @description: 停止之前通过调用 `console.time()` 启动的定时器，并打印结果到控制台。 调用 `console.timeEnd()` 后定时器会被删除。如果不存在标签指定的定时器则会打印 `NaNms` 。
             * @param {string} label 计时器标签。
             * @example
             * // 打印 求和: xxx ms
             * ```typescript
             * console.time('求和');
             * let sum = 0;
             * for (let i = 0; i < 100000; i++) sum += i;
             * console.timeEnd('求和');
             * ```
             */
            timeEnd(label: string): void;

            /**
             * @description: 与 `console.log` 类似，同时会打印出调用这个函数所在的调用栈信息（即当前运行的文件、行数等信息）。
             * @param {any} [data] 主要信息。
             * @param {array} [args] 要填充的数据。
             * @example
             * ```typescript
             * // 打印: (堆栈跟踪会根据被调用的跟踪的位置而变化)
             * // Show me
             * //  at <test>:7
             * console.trace('Show me');
             * ```
             */
            trace(data?: any, ...args: any[]): void;

            /**
             * @description: 与 `console.log` 一样输出信息，并在控制台显示输入框等待输入。按控制台的确认按钮后会将输入的字符串用 `eval` 计算后返回。 **部分机型可能会有控制台不显示输入框的情况，属于 bug。**。
             * @param {any} [data] 主要信息。
             * @param {array} [args] 要填充的数据。
             * @return {any} 将输入的字符串用 `eval` 计算后的值。
             * @example
             * ```typescript
             * let n = console.input('请输入一个数字:');
             * // 输入123之后：
             * toast(n + 1);
             * // 显示124
             * ```
             */
            input(data?: any, ...args: any[]): any;

            /**
             * @description: 与 `console.log` 一样输出信息，并在控制台显示输入框等待输入。按控制台的确认按钮后会将输入的字符串直接返回。 **部分机型可能会有控制台不显示输入框的情况，属于 bug。**。
             * @param {any} [data] 主要信息。
             * @param {array} [args] 要填充的数据。
             * @return {string} 输入的字符串。
             * @example
             * ```typescript
             * let n = console.rawInput('请输入一个数字:');
             * // 输入123之后：
             * toast(n + 1);
             * // 显示1231
             * ```
             */
            rawInput(data?: any, ...args: any[]): string;

            /**
             * @description: 设置控制台的大小，单位像素。
             * 
             * *建议（：*
             * 
             * - 在显示控制台后等待一段时间后在进行调整，否则可能会设置失败。
             * 
             * @param {number} w 宽度。
             * @param {number} h 高度。
             * @example
             * ```typescript
             * console.show();
             * // 在显示控制台后等待一段时间
             * sleep(300);
             * // 设置控制台大小为屏幕的四分之一
             * console.setSize(device.width / 2, device.height / 2);
             * ```
             */
            setSize(w: number, h: number): void;

            /**
             * @description: 设置控制台左上角的位置，单位像素。
             * 
             * *建议（：*
             * 
             * - 在显示控制台后等待一段时间后在进行调整，否则可能会设置失败。
             * 
             * @param {number} x 横坐标。
             * @param {number} y 纵坐标。
             * @example
             * ```typescript
             * console.show();
             * // 在显示控制台后等待一段时间
             * sleep(300);
             * console.setPosition(100, 100);
             * ```
             */
            setPosition(x: number, y: number): void;

            /**
             * @description: 设置日志保存的路径和配置。
             * 
             * **注意！：**
             * 
             * - 该函数会影响所有脚本的日志记录。
             * 
             * @param {LogConfig} config 日志配置。
             * @example
             * ```typescript
             * // 把日志保存到'/sdcard/1.txt'
             * console.setGlobalLogConfig({
             *     file: '/sdcard/1.txt',
             * });
             * ```
             */
            getGlobalLogConsole(config: LogConfig): void;

            /**
             * @description: 向控制台输出信息，相当于 `console.log(text)` 。
             * @param {Object} text 要打印到控制台的信息。
             */
            print(text: Object): void;
        }

        // 声明全局函数

        /**
         * @description: 将信息打印到控制台，并带上换行符。 可以一次性传入多个参数，第一个参数作为主要信息，其他参数作为类似于 [printf(3)] 中的代替值（参数都会传给 `util.format()` ）。
         * 
         * [printf(3)]: https://man7.org/linux/man-pages/man3/printf.3.html
         * @param {any} data 主要信息。
         * @param {array} [args] 代替值。
         * @example
         * ```typescript
         * const count: number = 5;
         * 
         * // 打印 'count: 5' 到 stdout
         * console.log('count: %d', count);
         * 
         * // 打印 'count: 5' 到 stdout
         * console.log('count:', count);
         * ```
         */
        function log(data: any, ...args: any[]): void;

        /**
         * @description: 向控制台输出信息，相当于 `log(text)` 。
         * @param {string} text 要打印到控制台的信息。
         */
        function print(text: Object): void;
    }

    interface LogConfig {
        /**
         * @description: 日志文件路径，将会把日志写入该文件中。
         */
        file?: string;

        /**
         * @description: 最大文件大小，单位字节（默认为 512 * 1024）。
         */
        maxFileSize?: number;

        /**
         * @description: 写入的日志级别（默认为 `ALL` ），可选的值为:
         * 
         * - `ALL` - 所有日志
         * - `OFF` - 关闭
         * - `DEBUG` - 调试级别
         * - `INFO` - 信息级别
         * - `WARN` - 告警级别
         * - `ERROR` - 错误级别
         * - `FATAL` - 严重错误级别
         * 
         */
        rootLevel?: 'ALL' | 'OFF' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL';

        /**
         * @description: 日志备份文件最大数量（默认为 5）。
         */
        maxBackupSize?: number;

        /**
         * @description: 日志写入格式，参见 [PatternLayout](http://logging.apache.org/log4j/1.2/apidocs/org/apache/log4j/PatternLayout.html) 。
         */
        filePattern?: string;
    }
}
