/*
 * @Author: BATU1579
 * @CreateDate: 2022-05-25 00:21:22
 * @LastEditor: BATU1579
 * @LastTime: 2022-05-30 17:11:48
 * @FilePath: \\src\\types\\global.d.ts
 * @Description: 全局函数和变量
 */

/********************************  hamibot  *********************************/

/**
 * @description: 通过应用名称启动应用。如果该名称对应多个应用，则只启动其中某一个。
 * @param {string} appName 应用名称
 * @return {boolean} 如果该名称对应的应用不存在，则返回 false; 否则返回 true。
 * @example:
 * ```typescript
 * // 启动 Hamibot
 * launchApp('Hamibot');
 * ```
 */
declare function launchApp(appName: string): boolean

/**
 * @description: 通过应用包名启动应用。
 * @param {string} packageName 应用包名
 * @return {boolean} 如果该包名对应的应用不存在，则返回 false；否则返回 true。
 * @example:
 * ```typescript
 * // 启动 Hamibot
 * launch('com.hamibot.hamibot');
 * ```
 */
declare function launch(packageName: string): boolean

/**
 * @description: 通过应用包名启动应用。
 * @param {string} packageName 应用包名
 * @return {boolean} 如果该包名对应的应用不存在，则返回 false；否则返回 true。
 * @example:
 * ```typescript
 * // 启动 Hamibot
 * launchPackage('com.hamibot.hamibot');
 * ```
 */
declare function launchPackage(packageName: string): boolean

/**
 * @description: 获取应用名称对应的已安装的应用的包名。
 * @param {string} appName 应用名称
 * @return {string | null} 如果该找不到该应用，返回 null；如果该名称对应多个应用，则只返回其中某一个的包名。
 * @example: 
 * ```typescript
 * var name = getPackageName('Hamibot'); // 返回 com.hamibot.hamibot
 * ```
 */
declare function getPackageName(appName: string): string | null

/**
 * @description: 获取应用包名对应的已安装的应用的名称。
 * @param {string} packageName
 * @return {string | null} 应用的名称，如果该找不到该应用，返回 null。
 * @example: 
 * ```typescript
 * var name = getAppName('com.hamibot.hamibot'); // 返回 Hamibot
 * ```
 */
declare function getAppName(packageName: string): string | null

/**
 * @description: 打开应用的详情页(设置页)。
 * @param {string} packageName 应用包名
 * @return {boolean} 如果找不到该应用，返回 false; 否则返回 true。
 */
declare function openAppSetting(packageName: string): boolean

/******************************* app *****************************/

/**
 * @description: 通过应用名称启动应用。如果该名称对应多个应用，则只启动其中某一个。
 * @param {string} appName 应用名称
 * @return {boolean} 如果该名称对应的应用不存在，则返回 false; 否则返回 true。
 * @example:
 * ```typescript
 * // 启动 Hamibot
 * app.launchApp('Hamibot');
 * ```
 */
declare function launchApp(appName: string): boolean;

/**
 * @description: 通过应用包名启动应用。
 * @param {string} packageName 应用包名
 * @return {boolean} 如果该包名对应的应用不存在，则返回 false；否则返回 true。
 * @example:
 * ```typescript
 * // 启动 Hamibot
 * app.launch('com.hamibot.hamibot');
 * ```
 */
declare function launch(packageName: string): boolean;

/**
 * @description: 获取应用名称对应的已安装的应用的包名。
 * @param {string} appName 应用名称
 * @return {string | null} 如果该找不到该应用，返回 null；如果该名称对应多个应用，则只返回其中某一个的包名。
 * @example: 
 * ```typescript
 * var name = app.getPackageName('Hamibot'); // 返回 com.hamibot.hamibot
 * ```
 */
declare function getPackageName(appName: string): string | null;

/**
 * @description: 获取应用包名对应的已安装的应用的名称。
 * @param {string} packageName
 * @return {string | null} 应用的名称，如果该找不到该应用，返回 null。
 * @example: 
 * ```typescript
 * var name = app.getAppName('com.hamibot.hamibot'); // 返回 Hamibot
 * ```
 */
declare function getAppName(packageName: string): string | null;

/**
 * @description: 打开应用的详情页(设置页)。
 * @param {string} packageName 应用包名
 * @return {boolean} 如果找不到该应用，返回 false; 否则返回 true。
 */
declare function openAppSetting(packageName: string): boolean;

/******************************* console *****************************/

/**
 * @description: 将信息打印到控制台，并带上换行符。 可以一次性传入多个参数，第一个参数作为主要信息，其他参数作为类似于 [printf(3)](https://man7.org/linux/man-pages/man3/printf.3.html) 中的代替值（参数都会传给 util.format()）。
 * @param {any} data 主要信息
 * @param {array} args 代替值
 * @example: 
 * ```typescript
 * const count: number = 5;
 * 
 * // 打印: count: 5 到 stdout
 * console.log('count: %d', count);
 * 
 * // 打印: count: 5 到 stdout
 * console.log('count:', count);
 * ```
 */
declare function log(data: any, ...args: any[]): void;

/**
 * @description: 向控制台输出信息，相当于 `log(text)` 。
 * @param {string} text 要打印到控制台的信息
 */
declare function print(text: string | object): void;

/**
 * @description: 
 * @param {string} text
 * @return {boolean}
 * @example: 
 */
// TODO 和大大了解具体函数定义
declare function toastLog(text: string): boolean
