
/*
 * @Author: BATU1579
 * @CreateDate: 2022-08-07 17:39:23
 * @LastEditor: BATU1579
 * @LastTime: 2022-09-11 10:51:25
 * @FilePath: \\src\\types\\ui.d.ts
 * @Description: 
 */
declare module 'ui' {
    import { Color } from 'images';

    global {
        /**
         * @description: ui 模块提供了编写用户界面的支持。
         * 
         * 给 Android 开发者或者高阶用户的提醒：Hamibot 的 UI 系统来自于 Android，所有属性和方法都能在 Android 源码中找到。如果某些代码或属性没有出现在 Hamibot 的文档中，可以参考 Android 的文档。
         * 
         * - [View]
         * - [Widget]
         * 
         * 界面是由视图（ View ）组成的。View 分成两种：
         * 
         * - 控件（ Widget ）
         * - 布局（ Layout ）
         * 
         * 控件（ Widget ）用来具体显示文字、图片、网页等。
         * 
         * 比如文本控件（ text ）用来显示文字，按钮控件（ button ）则可以显示一个按钮并提供点击效果，图片控件（ img ）则用来显示来自网络或者文件的图片，除此之外还有输入框控件（ input ）、进度条控件（ progressbar ）、单选复选框控件（ checkbox ）等。
         * 
         * 布局（ Layout ）则是装着一个或多个控件的"容器"，用于控制在他里面的控件的位置。
         * 
         * 比如垂直布局（ vertical ）会把他里面的控件从上往下依次显示（ 即纵向排列 ），水平布局（ horizontal ）则会把他里面的控件从左往右依次显示（ 即横向排列 ），以及帧布局（ frame ），他会把他里面的控件直接在左上角显示，如果有多个控件，后面的控件会重叠在前面的控件上。
         * 
         * 一个界面便由一些布局和控件组成。为了便于文档阅读，我们再说明一下以下术语：
         * 
         * - 子视图, 子控件: 布局里面的控件是这个布局的子控件/子视图。实际上布局里面不仅仅只能有控件，还可以是嵌套的布局。因此用子视图（ Child View ）更准确一些。在上面的例子中，按钮便是垂直布局的子控件。
         * - 父视图，父布局：直接包含一个控件的布局是这个控件的父布局/父视图（ Parent View ）。在上面的例子中，垂直布局便是按钮的父布局。
         * 
         * **注意！：**
         * 
         * - 带有 ui 的脚本的的最前面必须使用 `'ui'` ，指定 ui 模式，否则脚本将不会以 ui 模式运行。
         * 
         * [View]: https://developer.android.google.cn/reference/android/view/View?hl=cn
         * [Widget]: https://developer.android.google.cn/reference/android/widget/package-summary?hl=cn
         * 
         * @example
         * ```typescript
         * 'ui';
         * ui.layout(
         *     <vertical>
         *         <button text='第一个按钮' />
         *         <button text='第二个按钮' />
         *     </vertical>
         * );
         * ```
         */
        const ui: UI & {
            [prop: string]: View;
        };
    }

    interface UI {
        /**
         * @description: 将布局 XML 渲染为视图（ View ）对象， 并设置为当前视图。
         * @param {string} xml 布局 XML 对象或者 XML 字符串。
         */
        layout(xml: string | object): void;

        /**
         * @description: 此函数和 `ui.layout()` 相似，只不过允许传入一个 xml 文件路径来渲染布局。
         * @param {string} xmlFile xml 文件路径。
         */
        layoutFile(xmlFile: string): void;

        /**
         * @description: 将布局 XML 渲染为视图（ View ）对象。如果该 View 将作为某个 View 的子 View ，我们建议传入 `parent` 参数，这样在渲染时依赖于父视图的一些布局属性能够正确应用。
         * 
         * 此函数用于动态创建、显示 View 。
         * @param {string} xml 布局 XML 或者 XML 字符串。
         * @param {View} [parent] 父视图（默认为 `null` ）。
         * @param {boolean} [attachToParent] 是否渲染的 View 加到父视图中，（默认为 `false` ）。
         * @return {View} 渲染的视图对象。
         * @example
         * ```typescript
         * 'ui';
         * 
         * ui.layout(<linear id='container'></linear>);
         * 
         * // 动态创建3个文本控件，并加到 container 容器中
         * // 这里仅为实例，实际上并不推荐这种做法，如果要展示列表，
         * // 使用 list 组件；动态创建十几个、几十个 View 会让界面卡顿
         * for (let i = 0; i < 3; i++) {
         *     let textView = ui.inflate(
         *         <text textColor='#000000' textSize='14sp' />,
         *         ui.container
         *     );
         *     textView.attr('text', '文本控件' + i);
         *     ui.container.addView(textView);
         * }
         * ```
         */
        inflate(xml: string | object, parent?: View, attachToParent?: boolean): View;

        /**
         * @description: 注册一个自定义组件。
         * @param {string} name 组件名称。
         * @param {Function} widget 组件。
         */
        registerWidget(name: string, widget: Function): void;

        /**
         * @description: 查看当前线程是否是 UI 线程。
         * @return {boolean} 当前正在 UI 线程返回 `true` 否则返回 `false` 。
         * @example
         * ```typescript
         * "ui";
         * 
         * log(ui.isUiThread()); // => true
         * 
         * threads.start(function () {
         *     log(ui.isUiThread()); // => false
         * });
         * ```
         */
        isUiThread(): boolean;

        /**
         * @description: 在当前视图中根据 ID 查找相应的视图对象并返回。一般都是通过 `ui.xxx` 来获取 ID 为 `xxx` 的控件，如果 `xxx` 是一个 `ui` 已经有的属性，就可以通过 `ui.findView()` 来获取这个控件。
         * @param {string} id 要查找的 View 的 ID 。
         * @return {View | null} 返回找到的视图对象，如果当前未设置视图或找不到此 ID 的视图时返回 `null` 。
         */
        findView(id: string): View | null;

        /**
         * @description: 结束当前活动并销毁界面。
         */
        finish(): void;

        /**
         * @description: 将视图对象 `view` 设置为当前视图。
         * @param {View} view 要设置的视图对象。
         */
        setContentView(view: View): void;

        /**
         * @description: 将 `callback` 加到 UI 线程的消息循环中，并延迟 `delay` 毫秒后执行（不能准确保证一定在 `delay` 毫秒后执行）。
         * 
         * 此函数可以用于 UI 线程中延时执行动作（ `sleep()` 不能在 UI 线程中使用），也可以用于子线程中更新 UI。
         * @param {Function} callback 回调函数。
         * @param {number} [delay] 延迟，单位毫秒。
         */
        post(callback: Function, delay?: number): void;

        /**
         * @description: 将 `callback` 在 UI 线程中执行。如果当前已经在 UI 线程中，则直接执行 `callback` ；否则将 `callback` 抛到 UI 线程中执行（加到 UI 线程的消息循环的末尾），并等待 `callback` 执行结束（阻塞当前线程）。
         * @param {Function} callback 回调函数。
         * @return {any} `callback` 的执行结果
         */
        run(callback: Function): any;

        /**
         * @description: 设置当前界面的状态栏颜色。
         * @param {Color} color 颜色。
         */
        statusBarColor(color: Color): void;

        /**
         * @description
         * 启用使用 Android 的布局（ layout ）、绘图（ drawable ）、动画（ anim ）、样式（ style ）等资源的特性。启用该特性后，在 `project.json` 中进行以下配置，就可以像写 Android 原生一样写界面：
         * ```ts
         * {
         *     androidResources: {
         *         "resDir": "res",  // 资源文件夹
         *         "manifest": "AndroidManifest.xml" // AndroidManifest文件路径
         *     }
         * }
         * ```
         * res文件夹通常为以下结构：
         * ```
         * - res
         *     - layout  // 布局资源
         *     - drawable // 图片、形状等资源
         *     - menu // 菜单资源
         *     - values // 样式、字符串等资源
         *     // ...
         * ```
         **/
        useAndroidResources(): void;
    }

    interface View {
        /**
         * @description: 设置属性的值。属性指定是 View 在 xml 中的属性。
         * 
         * 例如可以通过语句 `attr('text', '文本');` 来设置文本控件的文本值。
         * 
         * **注意！：**
         * 
         * - 并不是所有属性都能在 js 代码中设置，有一些属性只能在布局创建时设置，例如 style 属性。还有一些属性虽然能在代码中设置，但是还没支持。
         * 
         * @param {string} name 属性名称。
         * @param {string} value 属性的值。
         * @example
         * ```typescript
         * 'ui';
         * 
         * ui.layout(
         *     <frame>
         *         <text id='example' text='Hello' />
         *     </frame>
         * );
         * 
         * // 5秒后执行
         * ui.post(() => {
         *     // 修改文本
         *     ui.example.attr('text', 'Hello, Hamibot UI');
         *     // 修改背景
         *     ui.example.attr('bg', '#ff00ff');
         *     // 修改高度
         *     ui.example.attr('h', '500dp');
         * }, 5000);
         * ```
         */
        attr(name: string, value: string): void;

        /**
         * @description: 获取属性的值。
         * @param {string} name 属性名称。
         * @return {string} 属性的值。
         * @example
         * ```typescript
         * 'ui';
         * 
         * ui.layout(
         *     <frame>
         *         <text id='example' text='1' />
         *     </frame>
         * );
         * 
         * plusOne();
         * 
         * function plusOne() {
         *     // 获取文本
         *     let text = ui.example.attr('text');
         *     // 解析为数字
         *     let num = parseInt(text);
         *     // 数字加1
         *     num++;
         *     // 设置文本
         *     ui.example.attr('text', String(num));
         *     // 1秒后继续
         *     ui.post(plusOne, 1000);
         * }
         * ```
         */
        attr(name: string): string;

        [prop: string]: any;
    }
}