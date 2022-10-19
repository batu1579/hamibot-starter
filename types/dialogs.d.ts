/*
 * @Author: BATU1579
 * @CreateDate: 2022-07-26 09:44:33
 * @LastEditor: BATU1579
 * @LastTime: 2022-09-11 10:56:21
 * @FilePath: \\src\\types\\dialogs.d.ts
 * @Description: 对话框模块
 */
declare module 'dialogs' {
    import { EventEmitter } from 'events';
    import { Color, Image } from 'images';

    global {
        /**
         * @description: dialogs 模块提供了简单的对话框支持，可以通过对话框和用户进行交互。
         * 
         * **注意！：**
         * 
         * - 对话框在 ui 模式下不能像通常那样使用，应该使用回调函数或者 [Promise] 的形式。
         * 
         * [Promise]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise
         * @example
         * ```typescript
         * let clear = confirm('要清除所有缓存吗?');
         * if (clear) {
         *     alert('清除成功!');
         * }
         * ```
         * @example
         * ```typescript
         * 'ui';
         * // 回调形式
         * confirm('要清除所有缓存吗?', function(clear) {
         *     if (clear) {
         *         alert('清除成功!');
         *     }
         * });
         * // Promise 形式
         * confirm('要清除所有缓存吗?').then((clear) => {
         *     if (clear) {
         *         alert('清除成功!');
         *     }
         * });
         * ```
         */
        const dialogs: Dialogs;

        /**
         * @description: 显示一个只包含'确定'按钮的提示对话框。直至用户点击确定脚本才继续运行。
         * @param {string} title 对话框的标题。
         * @param {string} [content] 对话框的内容（默认为空）。
         * @param {Function} [callback] 回调函数。当用户点击确定时被调用,一般用于 ui 模式。
         * @return {void | Promise<void>}  ui 模式下该函数返回一个 Promise 。
         * @example
         * ```typescript
         * dialogs.alert('出现错误~', '出现未知错误，请联系脚本作者');
         * ```
         * @example
         * ```typescript
         * 'ui';
         * alert('嘿嘿嘿').then(() => {
         *     // 当点击确定后会执行这里
         * });
         * ```
         */
        function alert(title: string, content?: string, callback?: Function): void | Promise<void>;

        /**
         * @description: 显示一个包含'确定'和'取消'按钮的提示对话框。
         * @param {string} title 对话框的标题。
         * @param {string} [content] 对话框的内容（默认为空）。
         * @param {Function} [callback] 回调函数。当用户点击确定时被调用,一般用于 ui 模式。参数为 boolean （用户点击的选项，点击确定则为 `true` ），返回值为 any 。
         * @return {boolean | Promise<boolean>} 如果用户点击确定则返回 `true` ，否则返回 `false` 。在 ui 模式下该函数返回一个 Promise 。
         * @example
         * ```typescript
         * let clear = confirm('要清除所有缓存吗?');
         * if (clear) {
         *     alert('清除成功!');
         * }
         * ```
         * @example
         * ```typescript
         * 'ui';
         * confirm('确定吗').then((value) => {
         *   // 当点击确定后会执行这里。
         * });
         * ```
         */
        function confirm(title: string, content?: string, callback?: (confirmed: boolean) => any): boolean | Promise<boolean>;

        /**
         * @description: 显示一个包含输入框的对话框，等待用户输入内容 。
         * @param {string} title 对话框的标题。
         * @param {string} [prefill] 对话框的内容（默认为空）。
         * @param {function} [callback] 回调函数。当用户点击确定时被调用,一般用于 ui 模式。参数为 string （用户输入的内容），返回值为 any 。
         * @return {string | null | Promise<string | null>} 在用户点击确定时将输入的字符串返回。如果用户取消了输入，返回 `null` 。在 ui 模式下该函数返回一个 Promise 。
         * @example
         * ```typescript
         * var name = dialogs.rawInput('请输入您的名字', '小明');
         * alert('您的名字是' + name);
         * ```
         * @example
         * ```typescript
         * 'ui';
         * // ui 模式下
         * dialogs.rawInput('请输入您的名字', '小明').then((name) => {
         *     alert('您的名字是' + name);
         * });
         * ```
         * @example
         * ```typescript
         * // 使用回调函数
         * dialogs.rawInput('请输入您的名字', '小明', (name) => {
         *     alert('您的名字是' + name);
         * });
         * ```
         */
        function rawInput(title: string, prefill?: string, callback?: (userInput: string | null) => any): string | null | Promise<string | null>;
    }

    interface Dialogs {
        /**
         * @description: 显示一个只包含'确定'按钮的提示对话框。直至用户点击确定脚本才继续运行。
         * @param {string} title 对话框的标题。
         * @param {string} [content] 对话框的内容（默认为空）。
         * @param {Function} [callback] 回调函数。当用户点击确定时被调用,一般用于 ui 模式。
         * @return {void | Promise<void>}  ui 模式下该函数返回一个 Promise 。
         * @example
         * ```typescript
         * dialogs.alert('出现错误~', '出现未知错误，请联系脚本作者');
         * ```
         * @example
         * ```typescript
         * 'ui';
         * alert('嘿嘿嘿').then(() => {
         *     // 当点击确定后会执行这里
         * });
         * ```
         */
        alert(title: string, content?: string, callback?: Function): void | Promise<void>;

        /**
         * @description: 显示一个包含'确定'和'取消'按钮的提示对话框。
         * @param {string} title 对话框的标题。
         * @param {string} [content] 对话框的内容（默认为空）。
         * @param {Function} [callback] 回调函数。当用户点击确定时被调用,一般用于 ui 模式。参数为 boolean （用户点击的选项，点击确定则为 `true` ），返回值为 any 。
         * @return {boolean | Promise<boolean>} 如果用户点击确定则返回 `true` ，否则返回 `false` 。在 ui 模式下该函数返回一个 Promise 。
         * @example
         * ```typescript
         * let clear = confirm('要清除所有缓存吗?');
         * if (clear) {
         *     alert('清除成功!');
         * }
         * ```
         * @example
         * ```typescript
         * 'ui';
         * confirm('确定吗').then((value) => {
         *   // 当点击确定后会执行这里。
         * });
         * ```
         */
        confirm(title: string, content?: string, callback?: (confirmed: boolean) => any): boolean | Promise<boolean>;

        /**
         * @description: 显示一个包含输入框的对话框，等待用户输入内容 。
         * @param {string} title 对话框的标题。
         * @param {string} [prefill] 对话框的内容（默认为空）。
         * @param {function} [callback] 回调函数。当用户点击确定时被调用,一般用于 ui 模式。参数为 string （用户输入的内容），返回值为 any 。
         * @return {string | null | Promise<string | null>} 在用户点击确定时将输入的字符串返回。如果用户取消了输入，返回 `null` 。在 ui 模式下该函数返回一个 Promise 。
         * @example
         * ```typescript
         * var name = dialogs.rawInput('请输入您的名字', '小明');
         * alert('您的名字是' + name);
         * ```
         * @example
         * ```typescript
         * 'ui';
         * // ui 模式下
         * dialogs.rawInput('请输入您的名字', '小明').then((name) => {
         *     alert('您的名字是' + name);
         * });
         * ```
         * @example
         * ```typescript
         * // 使用回调函数
         * dialogs.rawInput('请输入您的名字', '小明', (name) => {
         *     alert('您的名字是' + name);
         * });
         * ```
         */
        rawInput(title: string, prefill?: string, callback?: (userInput: string | null) => any): string | null | Promise<string | null>;

        /**
         * @description: 显示一个包含输入框的对话框，等待用户输入内容 。此函数和 `rawInput` 的区别在于，会把输入的字符串用 `eval` 计算一遍再返回，返回的可能不是字符串。此函数等效于 `eval(dialogs.rawInput(title, prefill, callback))` 。
         * @param {string} title 对话框的标题。
         * @param {string} [prefill] 对话框的内容（默认为空）。
         * @param {function} [callback] 回调函数。当用户点击确定时被调用,一般用于 ui 模式。参数为 string （用户输入的内容），返回值为 any 。
         * @return {string | null | Promise<string | null>} 在用户点击确定时将输入的字符串用 `eval` 计算一遍再返回。如果用户取消了输入，返回 `null` 。在 ui 模式下该函数返回一个 Promise 。
         * @example
         * ```typescript
         * let age = dialogs.input('请输入您的年龄', '18');
         * // new Date().getYear() + 1900 可获取当前年份
         * let year = new Date().getYear() + 1900 - age;
         * alert('您的出生年份是' + year);
         * ```
         * @example
         * ```typescript
         * 'ui';
         * // ui 模式下
         * dialogs.input('请输入您的年龄', '18').then((age) => {
         *     let year = new Date().getYear() + 1900 - age;
         *     alert('您的出生年份是' + year);
         * });
         * ```
         */
        input(title: string, prefill?: string, callback?: (userInput: any | null) => any): any | null | Promise<any | null>;

        /**
         * @description: 显示一个包含输入框的对话框，等待用户输入内容 。
         * 
         * *建议（：*
         * 
         * - 用 `dialogs.rawInput()` 代替此函数。
         * 
         * @param {string} title 对话框的标题。
         * @param {string} [prefill] 对话框的内容（默认为空）。
         * @param {function} [callback] 回调函数。当用户点击确定时被调用,一般用于 ui 模式。参数为 string （用户输入的内容），返回值为 any 。
         * @return {string | null | Promise<string | null>} 在用户点击确定时将输入的字符串返回。如果用户取消了输入，返回 `null` 。在 ui 模式下该函数返回一个 Promise 。
         * @example
         * ```typescript
         * var name = dialogs.rawInput('请输入您的名字', '小明');
         * alert('您的名字是' + name);
         * ```
         * @example
         * ```typescript
         * 'ui';
         * // ui 模式下
         * dialogs.rawInput('请输入您的名字', '小明').then((name) => {
         *     alert('您的名字是' + name);
         * });
         * ```
         * @example
         * ```typescript
         * // 使用回调函数
         * dialogs.rawInput('请输入您的名字', '小明', (name) => {
         *     alert('您的名字是' + name);
         * });
         * ```
         */
        prompt(title: string, prefill?: string, callback?: (userInput: string | null) => any): string | null | Promise<string | null>;

        /**
         * @description: 显示一个带有选项列表的对话框，等待用户选择。
         * @param {string} title 对话框的标题。
         * @param {array} items 对话框的选项列表，是一个字符串数组。
         * @param {function} [callback] 回调函数。当用户点击确定时被调用,一般用于 ui 模式。参数为 number （用户选择的选项索引），返回值为 any 。
         * @return {number | Promise<number>} 返回用户选择的选项索引（ `0` ~ `item.length - 1` ）。如果用户取消了选择，返回 `-1` 。
         * @example
         * ```typescript
         * let options = ['选项A', '选项B', '选项C', '选项D'];
         * let i = dialogs.select('请选择一个选项', options);
         * if (i >= 0) {
         *     toast('您选择的是' + options[i]);
         * } else {
         *     toast('您取消了选择');
         * }
         * ```
         * @example
         * ```typescript
         * 'ui';
         * // ui 模式下
         * dialogs.select(
         *     '请选择一个选项',
         *     ['选项A', '选项B', '选项C', '选项D']
         * ).then((i) => {
         *     toast(i);
         * });
         * ```
         */
        select(title: string, items: string[], callback?: (i: number) => any): number | Promise<number>;

        /**
         * @description: 显示一个单选列表对话框，等待用户选择。
         * @param {string} title 对话框的标题。
         * @param {string} items 对话框的选项列表，是一个字符串数组。
         * @param {number} [index] 对话框的初始选项的位置（默认为 0）。
         * @param {function} [callback] 回调函数。当用户点击确定时被调用,一般用于 ui 模式。参数为 number （用户选择的选项索引），返回值为 any 。
         * @return {number | Promise<number>} 返回用户选择的选项索引（ `0` ~ `item.length - 1` ）。如果用户取消了选择，返回 `-1` 。
         */
        singleChoice(title: string, items: string[], index?: number, callback?: (i: number) => any): number | Promise<number>;

        /**
         * @description: 显示一个多选列表对话框，等待用户选择，返回用户选择的选项索引的数组。
         * @param {string} title 对话框的标题。
         * @param {string} items 对话框的选项列表，是一个字符串数组。
         * @param {number} [indices] 选项列表中初始选中的项目索引的数组（默认为空数组）。
         * @param {Function} [callback]  回调函数，可选。当用户点击确定时被调用,一般用于 ui 模式。
         * @return {number[] | Promise<number[]>} 如果用户取消了选择，返回[]。在 ui 模式下该函数返回一个 Promise 。
         */
        multiChoice(title: string, items: string[], indices?: number[], callback?: (arr: number[]) => any): number[] | Promise<number[]>;

        /**
         * @description: 创建一个可自定义的对话框，并通过监听返回的 `Dialog` 对象的按键、输入事件来实现交互。使用这个函数来构造对话框，一个明显的不同是需要使用回调函数而不能像 `dialogs` 其他函数一样同步地返回结果。
         * @param {DialogProperties} properties 对话框属性，用于配置对话框。
         * @return {Dialog} 自定义的对话框对象。
         * @example
         * ```typescript
         * // 模拟 alert 对话框
         * dialogs.build({
         *     title: "你好",
         *     content: "今天也要元气满满哦",
         *     positive: "好的"
         * }).show();
         * ```
         * @example
         * ```typescript
         * // 模拟 confirm 对话框
         * dialogs.build({
         *     title: "你好",
         *     content: "请问你是笨蛋吗?",
         *     positive: "是的",
         *     negative: "我是大笨蛋"
         * }).on("positive", ()=>{
         *     alert("哈哈哈笨蛋");
         * }).on("negative", ()=>{
         *     alert("哈哈哈大笨蛋");
         * }).show();
         * ```
         * @example
         * ```typescript
         * // 模拟单选框
         * dialogs.build({
         *     title: "单选",
         *     items: ["选项1", "选项2", "选项3", "选项4"],
         *     itemsSelectMode: "single",
         *     itemsSelectedIndex: 3
         * }).on("single_choice", (index, item)=>{
         *     toast("您选择的是" + item);
         * }).show();
         * ```
         * @example
         * ```typescript
         * // 处理中对话框
         * let d = dialogs.build({
         *     title: "下载中...",
         *     progress: {
         *         max: -1
         *     },
         *     cancelable: false
         * }).show();
         * 
         * setTimeout(()=>{
         *     d.dismiss();
         * }, 3000);
         * ```
         * @example
         * ```typescript
         * // 输入对话框
         * dialogs.build({
         *     title: "请输入您的年龄",
         *     inputPrefill: "18"
         * }).on("input", (input)=>{
         *     var age = parseInt(input);
         *     toastLog(age);
         * }).show();
         * ```
         * @example
         * ```typescript
         * dialogs.build({
         *     // 对话框标题
         *     title: '发现新版本',
         *     // 对话框内容
         *     content: '更新日志: 新增了若干 BUG',
         *     // 确定键内容
         *     positive: '下载',
         *     // 取消键内容
         *     negative: '取消',
         *     // 中性键内容
         *     neutral: '到浏览器下载',
         *     // 勾选框内容
         *     checkBoxPrompt: '不再提示',
         * }).on('positive', () => {
         *     // 监听确定键
         *     toast('开始下载....');
         * }).on('neutral', () => {
         *     // 监听中性键
         *     app.openUrl('https://hamibot.com/');
         * }).on('check', (checked) => {
         *     // 监听勾选框
         *     log(checked);
         * }).show();
         * ```
         */
        build(properties: DialogProperties): Dialog;
    }

    /**
     * @description: `dialogs.build()` 返回的对话框对象，内置一些事件用于响应用户的交互，也可以获取对话框的状态和信息。
     */
    class Dialog extends EventEmitter {
        /**
         * @description: 获取当前进度条的进度值。
         * @return {number} 当前进度值。
         */
        getProgress(): number;

        /**
         * @description: 获取当前进度条的最大进度值。
         * @return {number} 进度条最大值。
         */
        getMaxProgress(): number;

        /**
         * @description: 获取被点击的按钮。
         * 
         * **注意！：**
         * 
         * - 这个函数的作用文档当中并没有，是我猜的。。。
         * 
         * @param {string} action 动作，可选的值为:
         * 
         * - `positive`
         * - `negative`
         * - `neutral`
         * 
         */
        getActionButton(action: 'positive' | 'negative' | 'neutral'): void;

        /**
         * @description: 对话框显示时会触发的事件。
         * @param {string} eventName 事件名称（ `show` ）。
         * @param {function} listener 当事件发生时要执行的回调函数。参数为 Dialog （自定义的对话框），返回值为 any 。
         * @return {this} 返回对话框对象自身以便链式调用。
         * @example
         * ```typescript
         * dialogs.build({
         *     title: "标题"
         * }).on("show", (dialog)=>{
         *     toast("对话框显示了");
         * }).show();
         * ```
         */
        on(eventName: 'show', listener: (dialog: Dialog) => any): this;

        /**
         * @description: 对话框被取消时会触发的事件。
         * 
         * **注意！：**
         * 
         * - 一个对话框可能按取消按钮、返回键取消或者点击对话框以外区域取消。
         * 
         * @param {string} eventName 事件名称（ `cancel` ）。
         * @param {function} listener 当事件发生时要执行的回调函数。参数为 Dialog （自定义的对话框），返回值为 any 。
         * @return {this} 返回对话框对象自身以便链式调用。
         * @example
         * ```typescript
         * dialogs.build({
         *     title: "标题",
         *     positive: "确定",
         *     negative: "取消"
         * }).on("cancel", (dialog)=>{
         *     toast("对话框取消了");
         * }).show();
         * ```
         */
        on(eventName: 'cancel', listener: (dialog: Dialog) => any): this;

        /**
         * @description: 对话框消失时会触发的事件。对话框被取消或者手动调用 `dialog.dismiss()` 函数都会触发该事件。
         * 
         * **注意！：**
         * 
         * - 一个对话框可能按取消按钮、返回键取消或者点击对话框以外区域取消。
         * 
         * @param {string} eventName 事件名称（ `dismiss` ）。
         * @param {function} listener 当事件发生时要执行的回调函数。参数为 Dialog （自定义的对话框），返回值为 any 。
         * @return {this} 返回对话框对象自身以便链式调用。
         * @example
         * ```typescript
         * let d = dialogs.build({
         *     title: "标题",
         *     positive: "确定",
         *     negative: "取消"
         * }).on("dismiss", (dialog)=>{
         *     toast("对话框消失了");
         * }).show();
         * 
         * setTimeout(()=>{
         *     d.dismiss();
         * }, 5000);
         * ```
         */
        on(eventName: 'dismiss', listener: (dialog: Dialog) => any): this;

        /**
         * @description: 确定按钮按下时触发的事件。
         * @param {string} eventName 事件名称（ `positive` ）。
         * @param {function} listener 当事件发生时要执行的回调函数。参数为 Dialog （自定义的对话框），返回值为 any 。
         * @return {this} 返回对话框对象自身以便链式调用。
         * @example
         * ```typescript
         * let d = dialogs.build({
         *     title: "标题",
         *     positive: "确定",
         *     negative: "取消"
         * }).on("positive", (dialog)=>{
         *     toast("你点击了确定");
         * }).show();
         * ```
         */
        on(eventName: 'positive', listener: (dialog: Dialog) => any): this;

        /**
         * @description: 取消按钮按下时触发的事件。
         * @param {string} eventName 事件名称（ `negative` ）。
         * @param {function} listener 当事件发生时要执行的回调函数。参数为 Dialog （自定义的对话框），返回值为 any 。
         * @return {this} 返回对话框对象自身以便链式调用。
         * @example
         * ```typescript
         * let d = dialogs.build({
         *     title: "标题",
         *     positive: "确定",
         *     negative: "取消"
         * }).on("negative", (dialog)=>{
         *     toast("你点击了取消");
         * }).show();
         * ```
         */
        on(eventName: 'negative', listener: (dialog: Dialog) => any): this;

        /**
         * @description: 中性按钮按下时触发的事件。
         * @param {string} eventName 事件名称（ `neutral` ）。
         * @param {function} listener 当事件发生时要执行的回调函数。参数为 Dialog （自定义的对话框），返回值为 any 。
         * @return {this} 返回对话框对象自身以便链式调用。
         * @example
         * ```typescript
         * let d = dialogs.build({
         *     title: "标题",
         *     positive: "确定",
         *     negative: "取消",
         *     neutral: "稍后提示"
         * }).on("neutral", (dialog)=>{
         *     toast("你点击了稍后提示");
         * }).show();
         * ```
         */
        on(eventName: 'neutral', listener: (dialog: Dialog) => any): this;

        /**
         * @description: 任意按钮按下时触发的事件。
         * @param {string} eventName 事件名称（ `any` ）。
         * @param {function} listener 当事件发生时要执行的回调函数。
         * @return {this} 返回对话框对象自身以便链式调用。
         * @example
         * ```typescript
         * let d = dialogs.build({
         *     title: "标题",
         *     positive: "确定",
         *     negative: "取消",
         *     neutral: "稍后提示"
         * }).on("any", (action, dialog)=>{
         *     if (action == "positive") {
         *         toast("你点击了确定");
         *     }else if (action == "negative") {
         *         toast("你点击了取消");
         *     }
         * }).show();
         * ```
         */
        on(eventName: 'any', listener: DialogAnyListener): this;

        /**
         * @description: 对话框列表的项目被点击选中时触发的事件。
         * - **`注意！：此事件只在 itemsSelectMode` 为 `select` 时触发。**
         * @param {string} eventName 事件名称（ `item_select` ）。
         * @param {function} listener 当事件发生时要执行的回调函数。
         * @return {this} 返回对话框对象自身以便链式调用。
         * @example
         * ```typescript
         * let d = dialogs.build({
         *     title: "请选择",
         *     positive: "确定",
         *     negative: "取消",
         *     items: ["A", "B", "C", "D"],
         *     itemsSelectMode: "select"
         * }).on("item_select", (index, item, dialog)=>{
         *     toast("您选择的是第" + (index + 1) + "项, 选项为" + item);
         * }).show();
         * ```
         */
        on(eventName: 'item_select', listener: DialogItemSelectListener): this;

        /**
         * @description: 对话框列表的项目被点击选中时触发的事件。
         * - **`注意！：此事件只在 itemsSelectMode` 为 `singleChoice` 时触发。**
         * @param {string} eventName 事件名称（ `single_choice` ）。
         * @param {function} listener 当事件发生时要执行的回调函数。
         * @return {this} 返回对话框对象自身以便链式调用。
         * @example
         * ```typescript
         * let d = dialogs.build({
         *     title: "请选择",
         *     positive: "确定",
         *     negative: "取消",
         *     items: ["A", "B", "C", "D"],
         *     itemsSelectMode: "singleChoice"
         * }).on("single_choice", (index, item, dialog)=>{
         *     toast("您选择的是第" + (index + 1) + "项, 选项为" + item);
         * }).show();
         * ```
         */
        on(eventName: 'single_choice', listener: DialogItemSelectListener): this;

        /**
         * @description: 对话框列表的项目被点击选中时触发的事件。
         * - **`注意！：此事件只在 itemsSelectMode` 为 `multiChoice` 时触发。**
         * @param {string} eventName 事件名称（ `multi_choice` ）。
         * @param {function} listener 当事件发生时要执行的回调函数。
         * @return {this} 返回对话框对象自身以便链式调用。
         * @example
         * ```typescript
         * let d = dialogs.build({
         *     title: "请选择",
         *     positive: "确定",
         *     negative: "取消",
         *     items: ["A", "B", "C", "D"],
         *     itemsSelectMode: "multiChoice"
         * }).on("item_select", (indices, items, dialog)=>{
         *     toast(util.format("您选择的项目为%o, 选项为%o", indices, items);
         * }).show();
         * ```
         */
        on(eventName: 'multi_choice', listener: DialogMultiChoiceListener): this;

        /**
         * @description: 带有输入框的对话框点击确定时触发的事件。
         * @param {string} eventName 事件名称（ `input` ）。
         * @param {function} listener 当事件发生时要执行的回调函数。
         * @return {this} 返回对话框对象自身以便链式调用。
         * @example
         * ```typescript
         * dialogs.build({
         *     title: "请输入",
         *     positive: "确定",
         *     negative: "取消",
         *     inputPrefill: ""
         * }).on("input", (text, dialog)=>{
         *     toast("你输入的是" + text);
         * }).show();
         * ```
         */
        on(eventName: 'input', listener: DialogInputListener): this;

        /**
         * @description: 带有输入框的对话框中的文本发生变化时触发的事件。
         * @param {string} eventName 事件名称（ `input_change` ）。
         * @param {function} listener 当事件发生时要执行的回调函数。
         * @return {this} 返回对话框对象自身以便链式调用。
         * @example
         * ```typescript
         * dialogs.build({
         *     title: "请输入",
         *     positive: "确定",
         *     negative: "取消",
         *     inputPrefill: ""
         * }).on("input_change", (text, dialog)=>{
         *     toast("你输入的是" + text);
         * }).show();
         * ```
         */
        on(eventName: 'input_change', listener: DialogInputChangeListener): this;

        /**
         * @description: 对话框中的复选框发生变化时触发的事件。
         * @param {string} eventName 事件名称（ `check` ）。
         * @param {function} listener 当事件发生时要执行的回调函数。
         * @return {this} 返回对话框对象自身以便链式调用。
         * @example
         * ```typescript
         * dialogs.build({
         *     // 对话框标题
         *     title: '发现新版本',
         *     // 对话框内容
         *     content: '更新日志: 新增了若干 BUG',
         *     // 确定键内容
         *     positive: '下载',
         *     // 取消键内容
         *     negative: '取消',
         *     // 勾选框内容
         *     checkBoxPrompt: '不再提示',
         * }).on('positive', () => {
         *     // 监听确定键
         *     toast('开始下载....');
         * }).on('check', (checked) => {
         *     log(checked);
         * }).show();
         * ```
         */
        on(eventName: 'check', listener: DialogCheckListener): this;

        /**
         * @description: 显示配置好的对话框。
         * @return {ShowedDialog} 正在显示的对话框对象。
         */
        show(): ShowedDialog;
    }

    interface DialogProperties {
        /**
         * @description: 对话框标题。
         */
        title?: string;

        /**
         * @description: 对话框标题的颜色。
         */
        titleColor?: Color;

        /**
         * @description: 对话框按钮的波纹效果颜色。
         */
        buttonRippleColor?: Color;

        /**
         * @description: 对话框的图标，是一个 URL 或者图片对象。
         */
        icon?: string | Image;

        /**
         * @description: 对话框文字内容。
         */
        content?: string;

        /**
         * @description: 对话框文字内容的颜色。
         */
        contentColor?: Color;

        /**
         * @description: 对话框文字内容的行高倍数，`1.0` 为一倍行高。
         */
        contentLineSpacing?: number;

        /**
         * @description: 对话框列表的选项。
         */
        items?: string[];

        /**
         * @description: 对话框列表的选项的文字颜色。
         */
        itemsColor?: Color;

        /**
         * @description: 对话框列表的选项选择模式，可选的值为:
         * 
         * - `select` - 普通选择模式。
         * - `single` - 单选模式。
         * - `multi` - 多选模式。
         * 
         */
        itemsSelectMode?: 'select' | 'single' | 'multi';

        /**
         * @description: 对话框列表中预先选中的项目索引。如果是单选模式为一个索引，多选模式则为数组。
         */
        itemsSelectedIndex?: number | number[];

        /**
         * @description: 对话框确定按钮的文字内容（最右边按钮）。
         */
        positive?: string;

        /**
         * @description: 对话框确定按钮的文字颜色（最右边按钮）。
         */
        positiveColor?: Color;

        /**
         * @description: 对话框中立按钮的文字内容（最左边按钮）。
         */
        neutral?: string;

        /**
         * @description: 对话框中立按钮的文字颜色（最左边按钮）。
         */
        neutralColor?: Color;

        /**
         * @description: 对话框取消按钮的文字内容（确定按钮左边的按钮）。
         */
        negative?: string;

        /**
         * @description: 对话框取消按钮的文字颜色（确定按钮左边的按钮）。
         */
        negativeColor?: Color;

        /**
         * @description: 勾选框文字内容。
         */
        checkBoxPrompt?: string;

        /**
         * @description: 勾选框是否勾选。
         */
        checkBoxChecked?: boolean;

        /**
         * @description: 配置对话框进度条的对象。
         */
        progress?: DialogProgress;

        /**
         * @description: 对话框是否可取消，如果为 `false` ，则对话框只能用代码手动取消。
         */
        cancelable?: boolean;

        /**
         * @description: 对话框是否在点击对话框以外区域时自动取消，默认为 `true` 。
         */
        canceledOnTouchOutside?: boolean;

        /**
         * @description: 对话框的输入框的输入提示。
         */
        inputHint?: string;

        /**
         * @description: 对话框输入框的默认输入内容
         */
        inputPrefill?: string;
    }

    interface DialogProgress {
        /**
         * @description: 进度条的最大值，如果为 -1 则为无限循环的进度条。
         */
        max?: number;

        /**
         * @description: 如果为 `true` , 则对话框无限循环的进度条为水平进度条。
         */
        horizontal?: boolean;

        /**
         * @description: 是否显示进度条的最大值和最小值。
         */
        showMinMax?: boolean;
    }

    /**
     * @callback DialogAnyListener
     * @description: 当任意按钮按下事件发生时要执行的回调函数。
     * @param {string} action 被点击的按钮，可选的值为：
     * 
     * - `positive` - 确定按钮。
     * - `negative` - 取消按钮。
     * - `neutral` - 中性按钮。
     * 
     * @param {Dialog} dialog 自定义的对话框对象。
     */
    type DialogAnyListener = (
        /**
         * 被点击的按钮，可选的值为：
         * 
         * - `positive` - 确定按钮。
         * - `negative` - 取消按钮。
         * - `neutral` - 中性按钮。
         * 
         */
        action: "positive" | "negative" | "neutral",
        /**
         * 自定义的对话框对象。
         */
        dialog: Dialog
    ) => any;

    /**
     * @callback DialogItemSelectListener
     * @description: 当对话框列表的项目被点击选中时要执行的回调函数。
     * @param {number} index 被选中的项目索引，从 0 开始。
     * @param {any} item 被选中的项目。
     * @param {Dialog} dialog 自定义的对话框对象。
     */
    type DialogItemSelectListener = (
        /**
         * 被选中的项目索引，从 0 开始。
         */
        index: number,
        /**
         * 被选中的项目。
         */
        item: any,
        /**
         * 自定义的对话框对象。
         */
        dialog: Dialog
    ) => any;

    /**
     * @callback DialogMultiChoiceListener
     * @description: 当对话框多选列表的项目被选中时要执行的回调函数。
     * @param {number} indices 被选中的项目的索引的数组。
     * @param {string} items 被选中的项目的数组。
     * @param {Dialog} dialog 自定义的对话框对象。
     */
    type DialogMultiChoiceListener = (
        indices: number[],
        items: string[],
        dialog: Dialog
    ) => any;

    /**
     * @callback DialogInputListener
     * @description: 当带有输入框的对话框点击确定时要执行的回调函数。
     * @param {string} text 输入框的内容。
     * @param {Dialog} dialog 自定义的对话框对象。
     */
    type DialogInputListener = (
        /**
         * 输入框的内容。
         */
        text: string,
        /**
         * 自定义的对话框对象。
         */
        dialog: Dialog
    ) => any;

    /**
     * @callback DialogInputChangeListener
     * @description: 当带有输入框的对话框中的文本发生变化时要执行的回调函数。
     * @param {string} text 输入框的内容。
     * @param {Dialog} dialog 自定义的对话框对象。
     */
    type DialogInputChangeListener = (
        /**
         * 输入框的内容。
         */
        text: string,
        /**
         * 自定义的对话框对象。
         */
        dialog: Dialog
    ) => any;

    /**
     * @callback DialogCheckListener
     * @description: 对话框中的复选框发生变化时要执行的回调函数。
     * @param {boolean} checked 当前复选框状态，勾选为 `true` 。
     * @param {Dialog} dialog 自定义的对话框对象。
     */
    type DialogCheckListener = (
        /**
         * 当前复选框状态，勾选为 `true` 。
         */
        checked: boolean,
        /**
         * 自定义的对话框对象。
         */
        dialog: Dialog
    ) => any;

    class ShowedDialog {
        /**
         * @description: 让正在显示的对话框消失。
         */
        dismiss(): void;
    }
}
