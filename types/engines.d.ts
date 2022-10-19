/*
 * @Author: BATU1579
 * @CreateDate: 2022-06-03 16:14:41
 * @LastEditor: BATU1579
 * @LastTime: 2022-08-16 02:11:20
 * @FilePath: \\src\\types\\engines.d.ts
 * @Description: 脚本引擎模块
 */
declare module 'engines' {
    global {
        /**
         * @description: `engines` 模块包含了一些与脚本环境、脚本运行、脚本引擎有关的函数，包括运行其他脚本，关闭脚本等。
         */
        const engines: Engines;
    }

    interface Engines {
        /**
         * @description: 在新的脚本环境中运行脚本 `script` 。所谓新的脚本环境，指定是，脚本中的变量和原脚本的变量是不共享的，并且，脚本会在新的线程中运行。用字符串来编写脚本非常不方便，可以结合函数的 `toString()` 的方法来执行特定函数。
         * @param {string} name 要运行的脚本名称。这个名称和文件名称无关，只是在任务管理中显示的名称。
         * @param {string} script 要运行的脚本内容。
         * @param {ExecutionConfig} [config] 运行配置项。
         * @return {ScriptExecution} 返回一个 `ScriptExectuion` 对象。
         * @example
         * ```typescript
         * // 每隔3秒运行一次脚本，循环10次
         * engines.execScript('hello world', 'toast('hello world')', {
         *     loopTimes: 10,
         *     interval: 3000,
         * });
         * ```
         * @example
         * ```typescript
         * // 使用函数的 `toString()` 的方法来执行特定函数
         * function helloWorld() {
         *     // 注意，这里的变量和脚本主体的变量并不共享
         *     toast('hello world');
         * }
         * engines.execScript('hello world', 'helloWorld();\n' + helloWorld.toString());
         * ```
         * @example
         * ```typescript
         * // 把运行脚本封装成一个函数来传递变量
         * function exec(action, args) {
         *     args = args || {};
         *     engines.execScript(action.name, action.name + '(' + JSON.stringify(args) + ');\n' + action.toString());
         * }
         * // 要执行的函数，是一个简单的加法
         * function add(args) {
         *     toast(args.a + args.b);
         * }
         * // 在新的脚本环境中执行 1 + 2
         * exec(add, {a: 1, b:2});
         * ```
         */
        execScript(name: string, script: string, config?: ExecutionConfig): ScriptExecution;

        /**
         * @description: 在新的脚本环境中运行脚本文件 path。
         * @param {string} path 要运行的脚本路径。
         * @param {ExecutionConfig} [config] 运行配置项。
         * @return {ScriptExecution} 返回一个 `ScriptExectuion` 对象。
         * @example
         * ```typescript
         * engines.execScriptFile('/sdcard/脚本/1.js');
         * ```
         */
        execScriptFile(path: string, config?: ExecutionConfig): ScriptExecution;

        /**
         * @description: 在新的脚本环境中运行录制文件（ *.auto ）。
         * @param {string} path 要运行的录制文件路径。
         * @param {ExecutionConfig} [config] 运行配置项。
         * @return {ScriptExecution} 返回一个 `ScriptExectuion` 对象。
         * @example
         * ```typescript
         * engines.execAutoFile('/sdcard/脚本/1.auto');
         * ```
         */
        execAutoFile(path: string, config?: ExecutionConfig): ScriptExecution;

        /**
         * @description: 停止所有正在运行的脚本。包括当前脚本自身。
         */
        stopAll(): void;

        /**
         * @description: 停止所有正在运行的脚本并显示停止的脚本数量。包括当前脚本自身。
         */
        stopAllAndToast(): void;

        /**
         * @description: 获取当前脚本的脚本引擎对象。该对象可以通过 `execArgv` 来获取他的运行参数，包括外部参数、 `intent` 等。普通脚本的运行参数通常为空，通过定时任务的广播启动的则可以获取到启动的 `intent` 。
         * @return {ScriptEngine} 当前脚本的脚本引擎对象。
         * @example
         * ```typescript
         * log(engines.myEngine().execArgv);
         * ```
         */
        myEngine(): ScriptEngine;

        /**
         * @description: 获取当前所有正在运行的脚本的脚本引擎对象。该对象可以通过 `execArgv` 来获取他的运行参数，包括外部参数、 `intent` 等。普通脚本的运行参数通常为空，通过定时任务的广播启动的则可以获取到启动的 `intent` 。
         * @return {array} 所有正在运行的脚本的脚本引擎。
         */
        all(): ScriptEngine[];
    }

    /**
     * @description: 脚本运行配置项。
     */
    interface ExecutionConfig {
        /**
         * @description: 延迟执行的时间，单位毫秒（默认为 0）。
         */
        delay?: number;

        /**
         * @description: 循环运行次数（默认为 1 ），0 为无限循环。
         */
        loopTimes?: number;

        /**
         * @description: 循环运行时两次运行之间的时间间隔，单位毫秒（默认为 0）。
         */
        interval?: number;

        /**
         * @description: 指定脚本运行的目录。这些路径会用于 require 时寻找模块文件。
         */
        path?: string | string[];
    }

    /**
     * @description: 执行脚本时返回的对象，可以通过他获取执行的引擎、配置等，也可以停止这个执行。
     */
    class ScriptExecution {
        /**
         * @description: 获取执行该脚本的脚本引擎对象。
         * @return {ScriptEngine} 执行该脚本的脚本引擎对象。
         */
        getEngine(): ScriptEngine;

        /**
         * @description: 获取该脚本的运行配置。
         * @return {ScriptConfig} 该脚本的运行配置。
         */
        getConfig(): ScriptConfig;
    }

    /**
     * @description: 脚本引擎对象。
     */
    class ScriptEngine {
        /**
         * @description: 停止脚本引擎的执行。
         */
        forceStop(): void;

        /**
         * @description: 获取脚本执行的路径。
         * @return {string | null} 对于一个脚本文件为这个脚本所在的文件夹路径；对于其他脚本，例如字符串脚本，则为 `null` 或者执行时的设置值。
         */
        cwd(): string | null;

        /**
         * @description: 获取当前脚本引擎正在执行的脚本对象。
         * @return {ScriptSource} 当前脚本引擎正在执行的脚本对象。
         * @example
         * ```typescript
         * log(engines.myEngine().getSource());
         * ```
         */
        getSource(): ScriptSource;

        /**
         * @description: 向该脚本引擎发送一个事件，该事件可以在该脚本引擎对应的脚本的 `events` 模块监听到并在脚本主线程执行事件处理。
         * @param {string} eventName 事件名称。
         * @param {array} [args] 事件参数。
         * @example
         * ```typescript
         * // receiver.js
         * // 监听say事件
         * events.on('say', function(words) {
         *     toastLog(words);
         * });
         * // 保持脚本运行
         * setInterval(()=>{}, 1000);
         * 
         * // 同一目录另一脚本
         * // 运行脚本
         * let e = engines.execScriptFile('./receiver.js');
         * // 等待脚本启动
         * sleep(2000);
         * // 向该脚本发送事件
         * e.getEngine().emit('say', '你好');
         * ```
         */
        emit(eventName: string, ...args: any[]): void;
    }

    class ScriptConfig {
        /**
         * @description: 延迟执行的时间，单位毫秒。
         */
        readonly delay: number;

        /**
         * @description: 循环运行时两次运行之间的时间间隔，单位毫秒。
         */
        readonly interval: number;

        /**
         * @description: 循环运行次数。
         */
        readonly loopTimes: number;

        /**
         * @description: 获取脚本运行的目录。
         * @return {array} 返回一个字符串数组表示脚本运行时模块寻找的路径。
         */
        getPath(): string[];
    }

    // TODO: 补全属性和方法
    /**
     * @description: 脚本引擎正在执行的脚本对象。
     */
    class ScriptSource {
        [prop: string]: any;
    }
}