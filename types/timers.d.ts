/*
 * @Author: BATU1579
 * @CreateDate: 2022-07-12 16:11:48
 * @LastEditor: BATU1579
 * @LastTime: 2022-09-11 10:51:29
 * @FilePath: \\src\\types\\timers.d.ts
 * @Description: 定时器模块
 */
declare module 'timers' {
    global {
        /**
         * @description: 预定每隔 `delay` 毫秒重复执行的 `callback` 。
         * 
         * **注意！：**
         * 
         * - 定时器仍然是单线程的。如果脚本主体有耗时操作或死循环，则设定的定时器不能被及时执行。
         * 
         * @param {Function} callback 当定时器到点时要调用的函数。
         * @param {number} delay 调用 `callback` 之前要等待的毫秒数。当 `delay` 小于 0 时， `delay` 会被设为 0。
         * @param {array} [args] 当调用 `callback` 时要传入的可选参数。
         * @return {IntervalID} 返回一个用于 `clearInterval()` 的定时器 id 。
         */
        function setInterval(callback: Function, delay: number, ...args: any[]): IntervalID;

        /**
         * @description: 预定在 `delay` 毫秒之后执行的单次 `callback` 。
         * 
         * **注意！：**
         * 
         * - 定时器仍然是单线程的。如果脚本主体有耗时操作或死循环，则设定的定时器不能被及时执行。
         * -  `callback` 可能不会精确地在 `delay` 毫秒被调用。 Hamibot 不能保证回调被触发的确切时间，也不能保证它们的顺序。 回调会在尽可能接近所指定的时间上调用。
         * 
         * @param {Function} callback 当定时器到点时要调用的函数。
         * @param {number} delay 调用 `callback` 之前要等待的毫秒数。当 `delay` 小于 0 时， `delay` 会被设为 0。
         * @param {array} [args] 当调用 `callback` 时要传入的可选参数。
         * @return {TimeoutID} 返回一个用于 `clearTimeout()` 的定时器 id 。
         */
        function setTimeout(callback: Function, delay: number, ...args: any[]): TimeoutID;

        /**
         * @description: 预定立即执行的 callback，它是在 I/O 事件的回调之后被触发。
         * 
         * 当多次调用 `setImmediate()` 时， `callback` 函数会按照它们被创建的顺序依次执行。 每次事件循环迭代都会处理整个回调队列。 如果一个立即定时器是被一个正在执行的回调排入队列的，则该定时器直到下一次事件循环迭代才会被触发。
         * @param {Function} callback 在 Looper 循环的当前回合结束时要调用的函数。
         * @param {array} [args] 当调用 `callback` 时要传入的可选参数。
         * @return {ImmediateID} 返回一个用于 `clearImmediate()` 的 id。
         */
        function setImmediate(callback: Function, ...args: any[]): ImmediateID;

        /**
         * @description: 取消一个由 `setInterval()` 创建的循环定时任务。
         * @param {IntervalID} id 一个 `setInterval()` 返回的 id。
         * @example
         * ```typescript
         * // 每5秒就发出一次hello
         * let id = setInterval(function() {
         *     toast('hello');
         * }, 5000);
         * // 1分钟后取消循环
         * setTimeout(() => clearInterval(id), 60 * 1000);
         * ```
         */
        function clearInterval(id: IntervalID | number): void;

        /**
         * @description: 取消一个由 `setTimeout()` 创建的定时任务。
         * @param {TimeoutID} id 一个 `setTimeout()` 返回的 id。
         * @example
         * ```typescript
         * // 每5秒就发出一次hello
         * let id = setInterval(function() {
         *     toast('hello');
         * }, 5000);
         * // 1分钟后取消循环
         * setTimeout(() => clearInterval(id), 60 * 1000);
         * ```
         */
        function clearTimeout(id: TimeoutID | number): void;

        /**
         * @description: 取消一个由 `setImmediate()` 创建的定时任务。
         * @param {ImmediateID} id 一个 `setImmediate()` 返回的 id。
         */
        function clearImmediate(id: ImmediateID | number): void;
    }

    class ImmediateID extends Number {
        private _id: 'ImmediateID';
    }

    class TimeoutID extends Number {
        private _id: 'TimeoutID';
    }

    class IntervalID extends Number {
        private _id: 'IntervalID';
    }
}