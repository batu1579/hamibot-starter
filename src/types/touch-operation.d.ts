/*
 * @Author: BATU1579
 * @CreateDate: 2022-05-30 18:17:34
 * @LastEditor: BATU1579
 * @LastTime: 2022-09-11 10:51:28
 * @FilePath: \\src\\types\\touch-operation.d.ts
 * @Description: 触摸操作模块
 */
declare module 'touch-operation' {
    global {
        /**
         * @description: 设置脚本坐标点击所适合的屏幕宽高。如果脚本运行时，屏幕宽度不一致会自动放缩坐标。例如在 1920*1080 的设备中，某个操作的代码为 `setScreenMetrics(1080, 1920);` 那么在其他设备上 Hamibot 会自动放缩坐标以便脚本仍然有效。例如在 540 * 960 的屏幕中 `click(800, 200)` 实际上会点击位置 (400, 100) 。
         * @param {number} width 屏幕宽度，单位像素。
         * @param {number} height 屏幕高度，单位像素。
         * @example
         * ```typescript
         * // 在 540 * 960 的屏幕中,实际点击位置为(400, 100)。
         * setScreenMetrics(1080, 1920);
         * click(800, 200);
         * ```
         */
        function setScreenMetrics(width: number, height: number): void;

        /**
         * @description: 模拟点击坐标 (x, y) ，并返回是否点击成功。只有在点击执行完成后脚本才继续执行。一般而言，只有点击过程（大约 150 毫秒）中被其他事件中断（例如用户自行点击）才会点击失败。使用该函数模拟连续点击时可能有点击速度过慢的问题，这时可以用 `press()` 函数代替。
         * 
         * **注意！：**
         * 
         * - 此函数只有 Android 7.0 及以上才有效 !
         * 
         * @param {number} x 要点击的横坐标。
         * @param {number} y 要点击的纵坐标。
         */
        function click(x: number, y: number): void;

        /**
         * @description: 模拟长按坐标 (x, y) , 并返回是否成功。只有在长按执行完成（大约 600 毫秒）时脚本才会继续执行。一般而言，只有长按过程中被其他事件中断（例如用户自行点击）才会长按失败。
         * 
         * **注意！：**
         * 
         * - 此函数只有 Android 7.0 及以上才有效 !
         * 
         * @param {number} x 要按住的横坐标。
         * @param {number} y 要按住的纵坐标。
         */
        function longClick(x: number, y: number): void;

        /**
         * @description: 模拟按住坐标 (x, y) , 并返回是否成功。只有按住操作执行完成时脚本才会继续执行。如果按住时间过短，那么会被系统认为是点击；如果时长超过 500 毫秒，则认为是长按。一般而言，只有按住过程中被其他事件中断才会操作失败。
         * 
         * **注意！：**
         * 
         * - 此函数只有 Android 7.0 及以上才有效 !
         * 
         * @param {number} x 要按住的横坐标。
         * @param {number} y 要按住的纵坐标。
         * @param {number} duration 按住时长，单位毫秒。
         * @example
         * ```typescript
         * // 循环100次
         * for (let i = 0; i < 100; i++) {
         *     // 点击位置(500, 1000), 每次用时1毫秒
         *     press(500, 1000, 1);
         * }
         * ```
         */
        function press(x: number, y: number, duration: number): void;

        /**
         * @description: 模拟从坐标 (x1, y1) 滑动到坐标 (x2, y2) ，并返回是否成功。只有滑动操作执行完成时脚本才会继续执行。一般而言，只有滑动过程中被其他事件中断才会滑动失败。
         * 
         * **注意！：**
         * 
         * - 此函数只有 Android 7.0 及以上才有效 !
         * 
         * @param {number} x1 滑动的起始横坐标。
         * @param {number} y1 滑动的起始纵坐标。
         * @param {number} x2 滑动的起始横坐标。
         * @param {number} y2 滑动的起始纵坐标。
         * @param {number} duration 滑动时长，单位毫秒。
         */
        function swipe(x1: number, y1: number, x2: number, y2: number, duration: number): void;

        /**
         * @description: 模拟手势操作。
         * 
         * **注意！：**
         * 
         * - 此函数只有 Android 7.0 及以上才有效 !
         * 
         * @param {number} duration 手势的时长。
         * @param {array} [points] 手势滑动路径的一系列坐标。
         * @example
         * ```typescript
         * // 模拟一个从 (0, 0) 到 (500, 500) 到 (500, 100) 的手势操作，时长为 2 秒。
         * gesture(1000, [0, 0], [500, 500], [500, 1000])
         * ```
         */
        function gesture(duration: number, ...points: [number, number][]): void;

        /**
         * @description: 同时模拟多个手势。
         * @param {array} [gesture] `[delay, duration, [横坐标, 纵坐标]]` , `delay` 为延迟多久（毫秒）才执行该手势；`duration` 为手势执行时长；坐标数组为手势经过的点的坐标。
         * 
         * **注意！：**
         * 
         * - 此函数只有 Android 7.0 及以上才有效 !
         * 
         * @example
         * ```typescript
         * gestures([0, 500, [800, 300], [500, 1000]], [0, 500, [300, 1500], [500, 1000]]);
         * ```
         */
        function gestures(...gesture: [number, number?, ...[number, number][]][]): void;

        /**
         * @description: `RootAutomator` 是一个使用 root 权限来模拟触摸的对象，用它可以完成触摸与多点触摸，并且这些动作的执行没有延迟。一个脚本中最好只存在一个 `RootAutomator` ，并且保证脚本结束退出他。可以在 `exit` 事件中退出 `RootAutomator` 。
         * @example
         * ```typescript
         * let ra = new RootAutomator();
         * events.on('exit', function() {
         *     ra.exit();
         * });
         * // 执行一些点击操作
         * ...
         * ```
         */
        class RootAutomator {
            /**
             * @description: 点击位置 (x, y) 。其中 `id` 是一个整数值，用于区分多点触摸，不同的 `id` 表示不同的'手指'。如果不需要多点触摸，则不需要 `id` 这个参数。 多点触摸通常用于手势或游戏操作，例如模拟双指捏合、双指上滑等。
             * 
             * **注意！：**
             * 
             * - 某些情况下可能存在 tap 点击无反应的情况，这时可以用 `RootAutomator.press()` 函数代替。
             * - 此函数需要 root 权限。
             * 
             * @param {number} x 横坐标。
             * @param {number} y 纵坐标。
             * @param {number} [id] 多点触摸 id（默认为 1），可以通过 `setDefaultId` 指定。
             * @example
             * ```typescript
             * let ra = new RootAutomator();
             * // 让'手指1'点击位置(100, 100)
             * ra.tap(100, 100, 1);
             * // 让'手指2'点击位置(200, 200);
             * ra.tap(200, 200, 2);
             * ra.exit();
             * ```
             */
            tap(x: number, y: number, id?: number): void;

            /**
             * @description: 模拟一次从 (x1, y1) 到 (x2, y2) 的时间为 `duration` 毫秒的滑动。
             * 
             * **注意！：**
             * 
             * - 此函数需要 root 权限。
             * 
             * @param {number} x1 滑动起点横坐标。
             * @param {number} y1 滑动起点纵坐标。
             * @param {number} x2 滑动终点横坐标。
             * @param {number} y2 滑动终点纵坐标。
             * @param {number} [duration] 滑动时长，单位毫秒（默认为 300）。
             * @param {number} [id] 多点触摸 id（默认为 1）。
             */
            swipe(x1: number, y1: number, x2: number, y2: number, duration?: number, id?: number): void;

            /**
             * @description: 模拟按下位置 (x, y) ，时长为 `duration` 毫秒。
             * 
             * **注意！：**
             * 
             * - 此函数需要 root 权限。
             * 
             * @param {number} x 按下位置的横坐标。
             * @param {number} y 按下位置的纵坐标。
             * @param {number} duration 按下时长。
             * @param {number} [id] 多点触摸 id（默认为 1）。
             */
            press(x: number, y: number, duration: number, id?: number): void;

            /**
             * @description: 模拟长按位置 (x, y) 。
             * 
             * **注意！：**
             * 
             * - 此函数需要 root 权限。
             * 
             * @param {number} x 横坐标。
             * @param {number} y 纵坐标。
             * @param {number} duration 纵坐标。
             * @param {number} [id] 多点触摸 id（默认为 1）。
             */
            longPress(x: number, y: number, duration: number, id?: number): void;

            /**
             * @description: 模拟手指按下位置 (x, y) 。
             * 
             * **注意！：**
             * 
             * - 此函数需要 root 权限。
             * 
             * @param {number} x 按下位置的横坐标。
             * @param {number} y 按下位置的纵坐标。
             * @param {number} [id] 多点触摸 i（默认为 1）。
             */
            touchDown(x: number, y: number, id?: number): void;

            /**
             * @description: 模拟手指抬起。
             * 
             * **注意！：**
             * 
             * - 此函数需要 root 权限。
             * 
             * @param {number} [id] 多点触摸 id（默认为 1）。
             */
            touchUp(id?: number): void;
        }

        /**
         * @description: 点击位置 (x, y) 。
         * 
         * **注意！：**
         * 
         * - 此函数在后续版本很可能有改动！请勿过分依赖此函数的副作用。推荐使用`RootAutomator`代替此函数。
         * - 此函数的执行是异步的、非阻塞的，在不同机型上所用的时间不同。脚本不会等待动作执行完成才继续执行。因此最好在每个函数之后加上适当的 sleep 来达到期望的效果。
         * - 动作的执行可能无法被停止，代码执行后可能会出现在任务管理中停止脚本后点击仍然继续的情况。
         * - 此函数需要 root 权限。
         * 
         * @param {number} x 要点击的横坐标。
         * @param {number} y 要点击的纵坐标。
         * @example
         * ```typescript
         * Tap(100, 100);
         * sleep(500);
         * ```
         */
        function Tap(x: number, y: number): void;

        /**
         * @description: 从 (x1, y1) 位置滑动到 (x2, y2) 位置。
         * 
         * **注意！：**
         * 
         * - 此函数在后续版本很可能有改动！请勿过分依赖此函数的副作用。推荐使用`RootAutomator`代替此函数。
         * - 此函数的执行是异步的、非阻塞的，在不同机型上所用的时间不同。脚本不会等待动作执行完成才继续执行。因此最好在每个函数之后加上适当的 sleep 来达到期望的效果。
         * - 动作的执行可能无法被停止，代码执行后可能会出现在任务管理中停止脚本后点击仍然继续的情况。
         * - 此函数需要 root 权限。
         * 
         * @param {number} x1 滑动起点的横坐标。
         * @param {number} y1 滑动起点的纵坐标。
         * @param {number} x2 滑动终点的横坐标。
         * @param {number} y2 滑动终点的纵坐标。
         * @param {number} [duration] 滑动动作所用的时间。
         */
        function Swipe(x1: number, y1: number, x2: number, y2: number, duration?: number): void;
    }
}