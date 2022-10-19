/*
 * @Author: BATU1579
 * @CreateDate: 2022-06-19 09:21:11
 * @LastEditor: BATU1579
 * @LastTime: 2022-08-16 04:21:42
 * @FilePath: \\src\\types\\floaty.d.ts
 * @Description: 悬浮窗模块
 */
declare module 'floaty' {
    import { View } from 'ui'

    global {
        /**
         * @description: floaty 模块提供了悬浮窗的相关函数，可以在屏幕上显示自定义悬浮窗，控制悬浮窗大小、位置等。
         * 
         * 悬浮窗在脚本停止运行时会自动关闭，因此，要保持悬浮窗不被关闭，可以用一个空的 `setInterval` 来实现。
         */
        const floaty: Floaty;
    }

    interface Floaty {
        /**
         * @description: 指定悬浮窗的布局，创建并显示一个悬浮窗。该悬浮窗自带关闭、调整大小、调整位置按键，可根据需要调用 `setAdjustEnabled()` 函数来显示或隐藏。
         * 
         * **注意！：**
         * 
         * - 因为脚本运行的线程不是 UI 线程，而所有对控件的修改操作需要在 UI 线程执行
         * 
         * @param {object} layout 悬浮窗界面的 XML 或者 View。更多信息参见 [UI 模块] 。
         * 
         * [UI 模块]: https://docs.hamibot.com/reference/ui
         * @return {FloatyWindow} 悬浮窗对象。
         * @example
         * ```typescript
         * // 在屏幕上显示悬浮文字，并在两秒后消失。
         * let w = floaty.window(
         *     <frame gravity='center' bg='#FF0000'>
         *         <text id='text'>悬浮文字</text>
         *     </frame>
         * );
         * setTimeout(() => {
         *     w.close();
         * }, 2000);
         * ```
         * @example
         * ```typescript
         * // 创建悬浮窗并修改文本
         * let w = floaty.window(
         * <frame gravity='center' bg='#FF0000'>
         *     <text id='text'>悬浮文字</text>
         * </frame>
         * );
         * setTimeout(() => {
         *     ui.run(function() {
         *        w.text.setText('文本');
         *     });
         * }, 2000);
         * setTimeout(() => {
         *     w.close();
         * }, 5000);
         * ```
         */
        window(layout: object): FloatyWindow & {
            [prop: string]: View;
        };

        /**
         * @description: 指定悬浮窗的布局，创建并显示一个原始悬浮窗。与 `floaty.window()` 函数不同的是，该悬浮窗不会增加任何额外设施（例如调整大小、位置按钮），您可以根据自己需要编写任何布局。而且，该悬浮窗支持完全全屏，可以覆盖状态栏，因此可以做护眼模式之类的应用。
         * 
         * **注意！：**
         * 
         * - 因为脚本运行的线程不是 UI 线程，而所有对控件的修改操作需要在 UI 线程执行
         * 
         * @param {object} layout 悬浮窗布局。
         * @return {FloatyRawWindow} 新建的悬浮窗。
         * @example
         * ```typescript
         * // 在屏幕上显示悬浮文字，并在两秒后消失。
         * let w = floaty.rawWindow(
         *     <frame gravity='center' bg='#FF0000'>
         *         <text id='text'>悬浮文字</text>
         *     </frame>
         * );
         * 
         * w.setPosition(500, 500);
         * 
         * setTimeout(() => {
         *     w.close();
         * }, 2000);
         * ```
         */
        rawWindow(layout: object): FloatyRawWindow & {
            [prop: string]: View;
        };

        /**
         * @description: 关闭所有本脚本的悬浮窗。
         */
        closeAll(): void;
    }

    class FloatyWindow {
        /**
         * @description: 设置悬浮窗是否可调整。
         * @param {boolean} enabled 是否启用悬浮窗调整（大小、位置）， 为 `true` 则在悬浮窗左上角、右上角显示可供位置、大小调整的标示，就像控制台一样； 如果为 `false` ，则隐藏上述标示。
         */
        setAdjustEnabled(enabled: boolean): void;

        /**
         * @description: 设置悬浮窗位置。
         * @param {number} x 悬浮窗左上角横坐标。
         * @param {number} y 悬浮窗左上角纵坐标。
         */
        setPosition(x: number, y: number): void;

        /**
         * @description: 获取悬浮窗位置（X）。
         * @return {number} 悬浮窗左上角横坐标。
         */
        getX(): number;

        /**
         * @description: 获取悬浮窗位置（Y）。
         * @return {number} 悬浮窗左上角纵坐标。
         */
        getY(): number;

        /**
         * @description: 设置悬浮窗宽高。
         * @param {number} width 悬浮窗宽度。
         * @param {number} height 悬浮窗高度。
         */
        setSize(width: number, height: number): void;

        /**
         * @description: 获取悬浮窗宽度。
         * @return {number} 悬浮窗宽度。
         */
        getWidth(): number;

        /**
         * @description: 获取悬浮窗高度。
         * @return {number} 悬浮窗高度。
         */
        getHeight(): number;

        /**
         * @description: 关闭悬浮窗。如果悬浮窗已经是关闭状态，则此函数将不执行任何操作。
         * 
         * **注意！：**
         * 
         * - 被关闭后的悬浮窗不能再显示
         * 
         */
        close(): void;

        /**
         * @description: 使悬浮窗被关闭时自动结束脚本运行。
         */
        exitOnClose(): void;
    }

    class FloatyRawWindow {
        /**
         * @description: 设置悬浮窗是否可触摸。
         * @param {boolean} touchable 如果为 true, 则悬浮窗将接收到触摸、点击等事件并且无法继续传递到悬浮窗下面；如果为 false, 悬浮窗上的触摸、点击等事件将被直接传递到悬浮窗下面。
         * @example
         * ```typescript
         * let w = floaty.rawWindow(
         *     <frame gravity='center' bg='#44ffcc00' />
         * );
         * 
         * w.setSize(-1, -1);
         * w.setTouchable(false);
         * 
         * setTimeout(() => {
         *     w.close();
         * }, 5000);
         * ```
         */
        setTouchable(touchable: boolean): void;

        /**
         * @description: 设置悬浮窗位置。
         * @param {number} x 悬浮窗左上角横坐标。
         * @param {number} y 悬浮窗左上角纵坐标。
         */
        setPosition(x: number, y: number): void;

        /**
         * @description: 获取悬浮窗位置（X）。
         * @return {number} 悬浮窗左上角横坐标。
         */
        getX(): number;

        /**
         * @description: 获取悬浮窗位置（Y）。
         * @return {number} 悬浮窗左上角纵坐标。
         */
        getY(): number;

        /**
         * @description: 设置悬浮窗宽高。如果设置为 -1 ，则为占满全屏；设置为 -2 则为根据悬浮窗内容大小而定。
         * @param {number} width 悬浮窗宽度。
         * @param {number} height 悬浮窗高度。
         * @example
         * ```typescript
         * // 创建并显示全屏悬浮窗，5秒后消失
         * let w = floaty.rawWindow(
         *     <frame gravity='center' bg='#77ff0000'>
         *         <text id='text'>悬浮文字</text>
         *     </frame>
         * );
         * 
         * w.setSize(-1, -1);
         * 
         * setTimeout(() => {
         *     w.close();
         * }, 5000);
         * ```
         */
        setSize(width: number, height: number): void;

        /**
         * @description: 获取悬浮窗宽度。
         * @return {number} 悬浮窗宽度。
         */
        getWidth(): number;

        /**
         * @description: 获取悬浮窗高度。
         * @return {number} 悬浮窗高度。
         */
        getHeight(): number;

        /**
         * @description: 关闭悬浮窗。如果悬浮窗已经是关闭状态，则此函数将不执行任何操作。
         * 
         * **注意！：**
         * 
         * - 被关闭后的悬浮窗不能再显示
         * 
         */
        close(): void;

        /**
         * @description: 使悬浮窗被关闭时自动结束脚本运行。
         */
        exitOnClose(): void;
    }
}