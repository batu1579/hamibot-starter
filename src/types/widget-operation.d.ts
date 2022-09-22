/*
 * @Author: BATU1579
 * @CreateDate: 2022-05-31 13:19:44
 * @LastEditor: BATU1579
 * @LastTime: 2022-09-22 17:54:37
 * @FilePath: \\src\\types\\widget-operation.d.ts
 * @Description: 控件操作
 */
declare module 'widget-operation' {
    global {
        /**
         * @description: 检查无障碍服务是否已经启用，如果没有启用则抛出异常并跳转到无障碍服务启用界面，同时设置无障碍模式为 mode。
         * 
         * *建议（：*
         * 
         * - 使用 `auto.waitFor()` 和 `auto.setMode()` 代替该函数，因为 `auto()` 函数如果无障碍服务未启动会停止脚本；而 `auto.waitFor()` 则会在在无障碍服务启动后继续运行。
         * 
         * @param {string} [mode] 无障碍模式（默认为 `normal` ），可选的值为:
         * 
         * - `fast` - 快速模式。该模式下会启用控件缓存，从而选择器获取屏幕控件更快。对于需要快速的控件操作的脚本可以使用该模式，一般脚本则没有必要使用该函数。
         * - `normal` - 正常模式。
         * 
         * @example
         * ```typescript
         * auto('fast');
         * ```
         */
        function auto(mode?: 'fast' | 'normal'): void;

        namespace auto {
            /**
             * @description: 检查无障碍服务是否已经启用，如果没有启用则跳转到无障碍服务启用界面，并等待无障碍服务启动；当无障碍服务启动后脚本会继续运行。因为该函数是阻塞的，因此除非是有协程特性，否则不能在 ui 模式下运行该函数。
             * 
             * *建议（：*
             * 
             * - 在 ui 模式下使用 `auto()` 函数。
             * 
             */
            function waitFor(): void;

            /**
             * @description: 设置无障碍模式为 mode。
             * @param {string} mode 无障碍模式（默认为 `normal` ），可选的值为:
             * 
             * - `fast` - 快速模式。该模式下会启用控件缓存，从而选择器获取屏幕控件更快。对于需要快速的控件操作的脚本可以使用该模式，一般脚本则没有必要使用该函数。
             * - `normal` - 正常模式。
             * 
             */
            function setMode(mode: 'fast' | 'normal'): void;

            /**
             * @description: 启用有关 automator 的一些特性。
             * @param {string | string[]} flags 标志，来启用和禁用某些特性，可选的值为:
             * 
             * - `findOnUiThread` - 使用该特性后，选择器搜索时会在主进程进行。该特性用于解决线程安全问题导致的次生问题，不过目前貌似已知问题并不是线程安全问题。
             * - `useUsageStats` - 使用该特性后，将会以'使用情况统计'服务的结果来检测当前正在运行的应用包名（需要授予'查看使用情况统计'权限）。如果觉得 `currentPackage()` 返回的结果不太准确，可以尝试该特性。
             * - `useShell` - 使用该特性后，将使用 shell 命令获取当前正在运行的应用的包名、活动名称，但是需要 root 权限。
             * 
             * @example
             * ```typescript
             * auto.setFlags(['findOnUiThread', 'useShell']);
             * ```
             */
            function setFlags(flags: Flags | Flags[]): void;

            /**
             * @description: 启用有关 automator 的一些特性。
             * @param {string | string[]} flags 标志，来启用和禁用某些特性，可选的值为:
             * 
             * - `findOnUiThread` - 使用该特性后，选择器搜索时会在主进程进行。该特性用于解决线程安全问题导致的次生问题，不过目前貌似已知问题并不是线程安全问题。
             * - `useUsageStats` - 使用该特性后，将会以'使用情况统计'服务的结果来检测当前正在运行的应用包名（需要授予'查看使用情况统计'权限）。如果觉得 `currentPackage()` 返回的结果不太准确，可以尝试该特性。
             * - `useShell` - 使用该特性后，将使用 shell 命令获取当前正在运行的应用的包名、活动名称，但是需要 root 权限。
             * 
             * @example
             * ```typescript
             * auto.setFlags(['findOnUiThread', 'useShell']);
             * ```
             */
            function setFlags(flags: string | string[]): void;

            /**
             * @description: 获取无障碍服务。如果无障碍服务没有启动，则为 `null` 。
             */
            const service: object | null;

            /**
             * @description: 当前所有窗口（ `AccessibilityWindowInfo` ）的数组，可能包括状态栏、输入法、当前应用窗口，弹出窗口、悬浮窗、分屏应用窗口等。可以分别获取每个窗口的布局信息。
             * 
             * 更多信息参见 [AccessibilityWindowInfo] ，返回值为 Boolean （是否符合过滤条件）。
             * 
             * **注意！：**
             * 
             * - 该函数需要 Android 5.0 以上才能运行
             * 
             * [AccessibilityWindowInfo]: https://developer.android.com/reference/android/view/accessibility/AccessibilityWindowInfo
             */
            const windows: object[];

            /**
             * @description: 当前窗口的布局根元素。如果无障碍服务未启动或者 `WindowFilter` 均返回  `false` ，则会返回 `null` 。如果不设置 `windowFilter` ，则当前窗口即为活跃的窗口（获取到焦点、正在触摸的窗口）；如果设置了 `windowFilter` ，则获取的是过滤的窗口中的第一个窗口。
             * 
             * **注意！：**
             * 
             * - 如果系统是 Android5.0 以下，则始终返回当前活跃的窗口的布局根元素
             * 
             */
            const root: UiObject | null;

            /**
             * @description: 当前活跃的窗口（获取到焦点、正在触摸的窗口）的布局根元素。
             * 
             * **注意！：**
             * 
             * - 无障碍服务未启动则为 `null`
             * 
             */
            const rootInActiveWindow: UiObject | null;

            /**
             * @description: 返回当前被 `WindowFilter` 过滤的窗口的布局根元素组成的数组。
             * 
             * **注意！：**
             * 
             * - 如果系统是 Android5.0 以下，则始终返回当前活跃的窗口的布局根元素的数组
             * 
             */
            const windowRoots: UiObject | null;

            /**
             * @description: 设置窗口过滤器。这个过滤器可以决定哪些窗口是目标窗口，并影响选择器的搜索。选择器默认是在当前活跃的窗口中搜索，不会搜索诸如悬浮窗、状态栏之类的，使用 `WindowFilter` 则可以控制搜索的窗口。
             * 
             * **注意！：**
             * 
             * -  如果 `WindowFilter` 返回的结果均为 `false` ，则选择器的搜索结果将为空。
             * -  setWindowFilter 函数会影响 `auto.windowRoots` 的结果。
             * -  该函数需要 Android 5.0 以上才有效。
             * 
             * @param {function} filter 用于过滤的回调函数。参数为窗口，更多信息参见 [AccessibilityWindowInfo] ，返回值为 Boolean （是否符合过滤条件）。
             * 
             * [AccessibilityWindowInfo]: https://developer.android.com/reference/android/view/accessibility/AccessibilityWindowInfo
             */
            function setWindowFilter(filter: (window: AccessibilityWindowInfo) => boolean): void;
        }

        const automator: SimpleActionAutomator;

        interface SimpleActionAutomator {
            /**
             * @description: 该函数可以点击大部分包含文字的按钮。例如微信主界面下方的'微信', '联系人', '发现', '我'的按钮。通常与 `while` 同时使用以便点击按钮直至成功。当不指定参数 `i` 时则会尝试点击屏幕上出现的所有文字 `text` 并返回是否全部点击成功。
             * @param {string} text 要点击的文本。
             * @param {number} [i] 如果相同的文本在屏幕中出现多次，则 `i` 表示要点击第 `i + 1` 个文本, `i` 从 0 开始计算。
             * @return {boolean} 是否点击成功。当屏幕中并未包含该文本，或者该文本所在区域不能点击时返回 `false` ，否则返回 `true` 。文本所在区域指的是，从文本处向其父视图寻找，直至发现一个可点击的部件为止。
             * @example
             * ```typescript
             * while (!click('扫一扫'));
             * ```
             */
            click(text: string, i?: number): boolean;

            /**
             * @description: 点击在指定区域的控件。有些按钮或者部件是图标而不是文字（例如发送朋友圈的照相机图标以及 QQ 下方的消息、联系人、动态图标），这时不能通过 `click(text, i)` 来点击，可以通过描述图标所在的区域来点击。`left` , `bottom` , `top` , `right` 描述的就是点击的区域。至于要定位点击的区域，可以在悬浮窗使用布局分析工具查看控件的 `bounds` 属性。通过无障碍服务录制脚本会生成该语句。
             * 
             * **注意！：**
             * 
             * - 该函数一般只用于录制的脚本中使用，在自己写的代码中使用该函数一般不要使用该函数。
             * 
             * @param {number} left 要点击的长方形区域左边与屏幕左边的像素距离。
             * @param {number} top 要点击的长方形区域上边与屏幕上边的像素距离。
             * @param {number} bottom 要点击的长方形区域下边与屏幕下边的像素距离。
             * @param {number} right 要点击的长方形区域右边与屏幕右边的像素距离。
             * @return {boolean} 当屏幕中并未包含与该区域严格匹配的区域，或者该区域不能点击时返回 `false`，否则返回 `true`。
             */
            click(left: number, top: number, bottom: number, right: number): boolean;

            /**
             * @description: 长按指定的文本。当不指定参数 `i` 时则会尝试点击屏幕上出现的所有文字 text 并返回是否全部长按成功。
             * @param {string} text 要长按的文本。
             * @param {number} [i] 如果相同的文本在屏幕中出现多次，则 `i` 表示要长按第 `i + 1` 个文本, `i` 从 0 开始计算。
             * @return {boolean} 是否点击成功。当屏幕中并未包含该文本，或者该文本所在区域不能点击时返回 `false`，否则返回 `true`。
             */
            longClick(text: string, i?: number): boolean;

            /**
             * @description: 找到第 `i + 1` 个可滑动控件**上滑或左滑**。另外不加参数时 `scrollUp()` 会寻找面积最大的可滑动的控件上滑或左滑，例如微信消息列表等。
             * @param {number} [i] 限定滑动第 `i + 1` 个可滑动控件。
             * @return {boolean} 是否操作成功。屏幕上没有可滑动的控件时返回 `false` ，否则返回 `true` 。
             */
            scrollUp(i?: number): boolean;

            /**
             * @description: 找到第 `i + 1` 个可滑动控件**下滑或右滑**。另外不加参数时 `scrollUp()` 会寻找面积最大的可滑动的控件下滑或右滑，例如微信消息列表等。
             * @param {number} [i] 限定滑动第 `i + 1` 个可滑动控件。
             * @return {boolean} 是否操作成功。屏幕上没有可滑动的控件时返回 `false` ，否则返回 `true` 。
             */
            scrollDown(i?: number): boolean;

            /**
             * @description: 把所有输入框的文本都设置为 `text` 。
             * 
             * **注意！：**
             * 
             * -  这里的输入文本的意思是，把输入框的文本置为 `text` ，而不是在原来的文本上追加。
             * 
             * @param {string} text 要输入的文本。
             * @return {boolean} 是否输入成功。当找不到对应的文本框时返回 `false` ，否则返回 `true` 。
             */
            setText(text: string): boolean;

            /**
             * @description: 将第 `i + 1` 个输入框的文本设置为 `text`。
             * 
             * **注意！：**
             * 
             * -  这里的输入文本的意思是，把输入框的文本置为 `text` ，而不是在原来的文本上追加。
             * 
             * @param {number} i 表示要输入的为第 `i + 1` 个输入框。
             * @param {string} text 要输入的文本。
             * @return {boolean} 是否输入成功。当找不到对应的文本框时返回 `false` ，否则返回 `true` 。
             */
            setText(i: number, text: string): boolean;

            /**
             * @description: 向所有输入框的文本后追加 `text` 。
             * @param {string} text 要输入的文本。
             * @return {boolean} 是否输入成功。当找不到对应的文本框时返回 `false` ，否则返回 `true` 。
             */
            input(text: string): boolean;

            /**
             * @description: 向第 `i + 1` 个输入框的文本后追加 `text`。
             * @param {number} i 表示要输入的为第 `i + 1` 个输入框。
             * @param {string} text 要输入的文本。
             * @return {boolean} 是否输入成功。当找不到对应的文本框时返回 `false` ，否则返回 `true` 。
             */
            input(i: number, text: string): boolean;
        }

        /**
         * @description: UiSelector 即选择器，用于通过各种条件选取屏幕上的控件，再对这些控件进行点击、长按等动作。
         */
        class UiSelector {
            /**
             * @description: 指定选择器的搜索算法。广度优先在控件所在层次较低时，或者布局的层次不多时，通常能更快找到控件。
             * @param {string} algorithm 搜索算法（默认为 `DFS` ），可选的值为:
             * 
             * - `DFS` - 深度优先算法
             * - `BFS` - 广度优先算法
             * 
             * @return {this} 返回选择器自身以便链式调用。
             * @example
             * ```typescript
             * log(
             *     selector()
             *         .text('文本')
             *         .algorithm('BFS')
             *         .find()
             * );
             * ```
             */
            algorithm(algorithm: 'DFS' | 'BFS'): this;

            /**
             * @description: 为当前选择器附加控件 `text` 等于字符串 `str` 的筛选条件。控件的 `text` （文本）属性是文本控件上的显示的文字，例如微信左上角的'微信'文本。
             * @param {string} str 控件文本。
             * @return {this} 返回选择器自身以便链式调用。
             */
            text(str: string): this;

            /**
             * @description: 为当前选择器附加控件 `text` 需要包含字符串 `str` 的筛选条件。这是一个比较有用的条件，例如 QQ 动态页和微博发现页上方的'大家都在搜....'的控件可以用 `textContains('大家都在搜').findOne()` 来获取。
             * @param {string} str 要包含的字符串。
             * @return {this} 。
             */
            textContains(str: string): this;

            /**
             * @description: 为当前选择器附加控件 `text` 需要以 `prefix` 开头的筛选条件。这也是一个比较有用的条件，例如要找出 Hamibot 脚本列表中名称以'QQ'开头的脚本的代码为 `textStartsWith('QQ').find()` 。
             * @param {string} prefix 前缀字符串。
             * @return {this} 返回选择器自身以便链式调用。
             */
            textStartsWith(prefix: string): this;

            /**
             * @description: 为当前选择器附加控件 `text` 需要以 `suffix` 结束的筛选条件。
             * @param {string} suffix 后缀字符串。
             * @return {this} 返回选择器自身以便链式调用。
             */
            textEndsWith(suffix: string): this;

            /**
             * @description: 为当前选择器附加控件 `text` 需要满足正则表达式 `reg` 的条件。有关正则表达式，可以查看 [正则表达式] 。需要注意的是，如果正则表达式是字符串，则需要使用 `\\` 来表达 `\` （也即 Java 正则表达式的形式），例如 `textMatches('\\d+')` 匹配多位数字；但如果使用 JavaScript 语法的正则表达式则不需要，例如 `textMatches(/\d+/)` 。但如果使用字符串的正则表达式则该字符串不能同时以'/'开头和结束，也即不能写诸如 `textMatches('/\\d+/')` 的表达式，否则会被开头的'/'和结尾的'/'会被忽略。
             * 
             * **注意！：**
             * 
             * - 有些情况会出现匹配不到的问题。请尽量减少使用。
             * 
             * [正则表达式]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions
             * @param {RegExp | string} reg 要满足的正则表达式。
             * @return {this} 返回选择器自身以便链式调用。
             */
            textMatches(reg: RegExp | string): this;

            /**
             * @description: 为当前选择器附加控件 `desc` 等于字符串 `str` 的筛选条件。控件的 `desc` （描述，全称为 `Content-Description` ）属性是对一个控件的描述，例如网易云音乐右上角的放大镜图标的描述为搜索。要查看一个控件的描述，同样地可以借助悬浮窗查看。
             * @param {string} str 控件描述文本。
             * @return {this} 返回选择器自身以便链式调用。
             */
            desc(str: string): this;

            /**
             * @description: 为当前选择器附加控件 `desc` 需要包含字符串 `str` 的筛选条件。
             * @param {string} str 控件描述要包含的文本。
             * @return {this} 返回选择器自身以便链式调用。
             */
            descContains(str: string): this;

            /**
             * @description: 为当前选择器附加控件 `desc` 需要以 `prefix` 开头的筛选条件。
             * @param {string} prefix 控件描述前缀。
             * @return {this} 返回选择器自身以便链式调用。
             */
            descStartsWith(prefix: string): this;

            /**
             * @description: 为当前选择器附加控件 `desc` 需要以 `suffix` 结束的筛选条件。
             * @param {string} suffix 控件描述后缀。
             * @return {this} 返回选择器自身以便链式调用。
             */
            descEndsWith(suffix: string): this;

            /**
             * @description: 为当前选择器附加控件 `desc` 需要满足正则表达式 `reg` 的条件。有关正则表达式，可以查看 [正则表达式] 。需要注意的是，如果正则表达式是字符串，则需要使用 `\\` 来表达 `\` （也即 Java 正则表达式的形式），例如 `textMatches('\\d+')` 匹配多位数字；但如果使用 JavaScript 语法的正则表达式则不需要，例如 `textMatches(/\d+/)` 。但如果使用字符串的正则表达式则该字符串不能同时以'/'开头和结束，也即不能写诸如 `textMatches('/\\d+/')` 的表达式，否则会被开头的'/'和结尾的'/'会被忽略。
             * 
             * **注意！：**
             * 
             * - 有些情况会出现匹配不到的问题。请尽量减少使用。
             * 
             * [正则表达式]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions
             * @param {RegExp | string} regex 要满足的正则表达式。
             * @return {this} 返回选择器自身以便链式调用。
             */
            descMatches(regex: RegExp | string): this;

            /**
             * @description: 为当前选择器添加附加控件 `depth` 深度条件。
             * @return {this} 返回选择器自身以便链式调用。
             */
            depth(depth: number): this;

            /**
             * @description: 为当前选择器附加 `id` 等于 `resId` 的筛选条件。控件的 `id` 属性 **通常** 是可以用来确定控件的唯一标识，如果一个控件有 `id` ，那么使用 `id` 来找到他是最好的方法。不过，在列表中会出现多个控件的 `id` 相同的情况。
             * 
             * **注意！：**
             * 
             * - 在 QQ 界面经常会出现多个 `id` 为 `name` 的控件，在微信上则每个版本的 `id` 都会变化。对于这些软件而言比较难用 `id` 定位控件。
             * 
             * @param {string} resId 控件的 `id` ，以'包名:id/'开头，例如 `com.tencent.mm:id/send_btn` 。也可以不指定包名，这时会以当前正在运行的应用的包名来补全 `id` 。例如 `id('send_btn')` ,在 QQ 界面相当于 `id('com.tencent.mobileqq:id/send_btn')` 。
             * @return {this} 返回选择器自身以便链式调用。
             */
            id(resId: string): this;

            /**
             * @description: 为当前选择器附加控件 `id` 包含字符串 `str` 的筛选条件。
             * @param {string} str `id` 要包含的字符串。
             * @return {this} 返回选择器自身以便链式调用。
             */
            idContains(str: string): this;

            /**
             * @description: 为当前选择器附加 `id` 需要以 `prefix` 开头的筛选条件。
             * @param {string} prefix 指定的 `id` 前缀。
             * @return {this} 返回选择器自身以便链式调用。
             */
            idStartsWith(prefix: string): this;

            /**
             * @description: 为当前选择器附加 `id` 需要以 `suffix` 结束的筛选条件。
             * @param {string} suffix 指定的 `id` 后缀。
             * @return {this} 返回选择器自身以便链式调用。
             */
            idEndsWith(suffix: string): this;

            /**
             * @description: 附加 `id` 需要满足正则表达式。有关正则表达式，可以查看 [正则表达式] 。需要注意的是，如果正则表达式是字符串，则需要使用 `\\` 来表达 `\` （也即 Java 正则表达式的形式），例如 `textMatches('\\d+')` 匹配多位数字；但如果使用 JavaScript 语法的正则表达式则不需要，例如 `textMatches(/\d+/)` 。但如果使用字符串的正则表达式则该字符串不能同时以'/'开头和结束，也即不能写诸如 `textMatches('/\\d+/')` 的表达式，否则会被开头的'/'和结尾的'/'会被忽略。
             * 
             * **注意！：**
             * 
             * - 有些情况会出现匹配不到的问题。请尽量减少使用。
             * 
             * [正则表达式]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions
             * @param {RegExp} reg `id` 要满足的正则表达式。
             * @return {this} 返回选择器自身以便链式调用。
             * @example
             * ```typescript
             * idMatches('[a-zA-Z]+');
             * ```
             */
            idMatches(reg: RegExp | string): this;

            /**
             * @description: 为当前选择器附加控件 `className` 等于字符串 `str` 的筛选条件。控件的 `className` （类名）表示一个控件的类别，例如文本控件的类名为 `android.widget.TextView` 。如果一个控件的类名以 `android.widget.` 开头，则可以省略这部分，例如文本控件可以直接用 `className('TextView')` 的选择器。
             * @param {string} str 控件 `className` 属性。
             * @return {this} 返回选择器自身以便链式调用。
             */
            className(str: CommonClassName): this;

            /**
             * @description: 为当前选择器附加控件 `className` 等于字符串 `str` 的筛选条件。控件的 `className` （类名）表示一个控件的类别，例如文本控件的类名为 `android.widget.TextView` 。如果一个控件的类名以 `android.widget.` 开头，则可以省略这部分，例如文本控件可以直接用 `className('TextView')` 的选择器。
             * @param {string} str 控件 `className` 属性。
             * @return {this} 返回选择器自身以便链式调用。
             */
            className(str: string): this;

            /**
             * @description: 为当前选择器附加控件 `className` 需要包含字符串 `str` 的筛选条件。
             * @param {string} str `className` 要包含的字符串。
             * @return {this} 返回选择器自身以便链式调用。
             */
            classNameContent(str: string): this;

            /**
             * @description: 为当前选择器附加控件 `className` 需要以 `prefix` 开头的筛选条件。
             * @param {string} prefix 指定的 `className` 前缀。
             * @return {this} 返回选择器自身以便链式调用。
             */
            classNameStartsWith(prefix: string): this;

            /**
             * @description: 为当前选择器附加控件 `className` 需要以 `suffix` 结束的筛选条件。
             * @param {string} suffix 指定的 `className` 后缀。
             * @return {this} 返回选择器自身以便链式调用。
             */
            classNameEndsWith(suffix: string): this;

            /**
             * @description: 为当前选择器附加控件 `className` 需要满足正则表达式 `reg` 的条件。有关正则表达式，可以查看 [正则表达式] 。需要注意的是，如果正则表达式是字符串，则需要使用 `\\` 来表达 `\` （也即 Java 正则表达式的形式），例如 `textMatches('\\d+')` 匹配多位数字；但如果使用 JavaScript 语法的正则表达式则不需要，例如 `textMatches(/\d+/)` 。但如果使用字符串的正则表达式则该字符串不能同时以'/'开头和结束，也即不能写诸如 `textMatches('/\\d+/')` 的表达式，否则会被开头的'/'和结尾的'/'会被忽略。
             * 
             * **注意！：**
             * 
             * - 有些情况会出现匹配不到的问题。请尽量减少使用。
             * 
             * [正则表达式]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions
             * @param {RegExp} reg 要满足的正则表达式。
             * @return {this} 返回选择器自身以便链式调用。
             */
            classNameMatches(reg: RegExp | string): this;

            /**
             * @description: 为当前选择器附加控件 `packageName` 等于字符串 `str` 的筛选条件。控件的 `packageName` 表示控件所属界面的应用包名。例如微信的包名为 `com.tencent.mm` , 那么微信界面中所有的控件的 `packageName` 都为 `com.tencent.mm` 。
             * @param {string} str 指定的包名。
             * @return {this} 返回选择器自身以便链式调用。
             */
            packageName(str: string): this;

            /**
             * @description: 为当前选择器附加控件 `packageName` 需要包含字符串 `str` 的筛选条件。
             * @param {string} str 控件 `packageName` 要包含的字符串。
             * @return {this} 返回选择器自身以便链式调用。
             */
            packageNameContains(str: string): this;

            /**
             * @description: 为当前选择器附加控件 `packageName` 需要以 `prefix` 开头的筛选条件。
             * @param {string} prefix 指定控件 `packageName` 的前缀。
             * @return {this} 返回选择器自身以便链式调用。
             */
            packageNameStartsWith(prefix: string): this;

            /**
             * @description: 为当前选择器附加控件 `packageName` 需要以 `suffix` 结束的筛选条件。
             * @param {string} suffix 指定控件 `packageName` 的后缀。
             * @return {this} 返回选择器自身以便链式调用。
             */
            packageNameEndsWith(suffix: string): this;

            /**
             * @description: 为当前选择器附加控件 `packageName` 需要满足正则表达式 `reg` 的条件。有关正则表达式，可以查看 [正则表达式] 。需要注意的是，如果正则表达式是字符串，则需要使用 `\\` 来表达 `\` （也即 Java 正则表达式的形式），例如 `textMatches('\\d+')` 匹配多位数字；但如果使用 JavaScript 语法的正则表达式则不需要，例如 `textMatches(/\d+/)` 。但如果使用字符串的正则表达式则该字符串不能同时以'/'开头和结束，也即不能写诸如 `textMatches('/\\d+/')` 的表达式，否则会被开头的'/'和结尾的'/'会被忽略。
             * 
             * **注意！：**
             * 
             * - 有些情况会出现匹配不到的问题。请尽量减少使用。
             * 
             * [正则表达式]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions
             * @param {RegExp | string} reg 要满足的正则表达式。
             * @return {this} 返回选择器自身以便链式调用。
             */
            packageNameMatches(reg: RegExp | string): this;

            /**
             * @description: 通过控件的 `bounds` 属性查找控件。一个控件的 bounds 属性为这个控件在屏幕上显示的范围。尽管用这个方法定位控件对于静态页面十分准确，却无法兼容不同分辨率的设备；同时对于列表页面等动态页面无法达到效果，因此使用不推荐该选择器。
             * 
             * **注意！：**
             * 
             * - 参数的这四个数字不能随意填写，必须精确的填写控件的四个边界才能找到该控件。
             * 
             * @param {number} left 控件左边缘与屏幕左边的距离。
             * @param {number} top 控件上边缘与屏幕上边的距离。
             * @param {number} right 控件右边缘与屏幕左边的距离。
             * @param {number} bottom 控件下边缘与屏幕上边的距离。
             * @return {this} 返回选择器自身以便链式调用。
             */
            bounds(left: number, top: number, right: number, bottom: number): this;

            /**
             * @description: 为当前选择器附加控件 `bounds` 需要在 `left` , `top` , `right` , `buttom` 构成的范围里面的条件。这个条件用于限制选择器在某一个区域选择控件。
             * @param {number} left。
             * @param {number} top。
             * @param {number} right。
             * @param {number} bottom。
             * @return {this} 返回选择器自身以便链式调用。
             * @example
             * ```typescript
             * // 在屏幕上半部分寻找文本控件 TextView
             * let w = className('TextView')
             *     .boundsInside(0, 0, device.width, device.height / 2)
             *     .findOne();
             * log(w.text());
             * ```
             */
            boundsInside(left: number, top: number, right: number, bottom: number): this;

            /**
             * @description: 为当前选择器附加控件 `bounds` 需要包含 `left` , `top` , `right` , `buttom` 构成的范围'的条件。这个条件用于限制控件的范围必须包含所给定的范围。
             * @param {number} left 范围左边缘与屏幕左边的距离。
             * @param {number} top 范围上边缘与屏幕上边的距离。
             * @param {number} right 范围右边缘与屏幕左边的距离。
             * @param {number} bottom 范围下边缘与屏幕上边的距离。
             * @return {this} 返回选择器自身以便链式调用。
             * @example
             * ```typescript
             * // 寻找在点(500, 300)上的可点击控件
             * let w = boundsContains(500, 300, 500, 300)
             *     .clickable()
             *     .findOne();
             * w.click();
             * ```
             */
            boundsContains(left: number, top: number, right: number, bottom: number): this;

            /**
             * @description: 为当前选择器附加控件 `drawingOrder` 等于 `order` 的条件。 `drawingOrder` 为一个控件在父控件中的绘制顺序，通常可以用于区分同一层次的控件。
             * 
             * **注意！：**
             * 
             * - 此方法在 Android 7.0 以上才能使用。
             * 
             * @param {number} order 控件在父视图中的绘制顺序。
             * @return {this} 返回选择器自身以便链式调用。
             */
            drawingOrder(order: number): this;

            /**
             * @description: 为当前选择器附加控件是否可点击的条件。但并非所有 `clickable` 为 `false` 的控件都真的不能点击，这取决于控件的实现。对于自定义控件（例如显示类名为 `android.view.View` 的控件）很多的 `clickable` 属性都为 `false` 都却能点击。
             * @param {boolean} [b] 控件是否可点击（默认为 `true` ）。
             * @return {this} 返回选择器自身以便链式调用。
             * @example
             * ```typescript
             * // 查找不能点击的图片
             * className('ImageView').clickable(false).find()
             * ```
             */
            clickable(b?: boolean): this;

            /**
             * @description: 为当前选择器附加控件是否可长按的条件。
             * @param {boolean} [b] 控件是否可长按（默认为 `true` ）。
             * @return {this} 返回选择器自身以便链式调用。
             */
            longClickable(b?: boolean): this;

            /**
             * @description: 为当前选择器附加控件是否可勾选的条件。勾选通常是对于勾选框而言的，例如图片多选时左上角通常有一个勾选框。
             * @param {boolean} [b] 控件是否可勾选（默认为 `true` ）。
             * @return {this} 返回选择器自身以便链式调用。
             */
            checkable(b?: boolean): this;

            /**
             * @description: 为当前选择器附加控件是否已选中的条件。被选中指的是，例如 QQ 聊天界面点击下方的'表情按钮'时，会出现自己收藏的表情，这时'表情按钮'便处于选中状态，其 `selected` 属性为 `true` 。
             * @param {boolean} [b] 控件是否被选（默认为 `true` ）。
             * @return {this} 返回选择器自身以便链式调用。
             */
            selected(b?: boolean): this;

            /**
             * @description: 为当前选择器附加控件是否已启用的条件。大多数控件都是启用的状态（ `enabled` 为 `true` ），处于“禁用”状态通常是灰色并且不可点击。
             * @param {boolean} [b] 控件是否已启用（默认为 `true` ）。
             * @return {this} 返回选择器自身以便链式调用。
             */
            enabled(b?: boolean): this;

            /**
             * @description: 为当前选择器附加控件是否可滑动的条件。滑动包括上下滑动和左右滑动。可以用这个条件来寻找可滑动控件来滑动界面。
             * @param {boolean} [b] 控件是否可滑动（默认为 `true` ）。
             * @return {this} 返回选择器自身以便链式调用。
             * @example
             * ```typescript
             * // 滑动 Hamibot 的脚本列表
             * classNameEndsWith('RecyclerView')
             *     .scrollable()
             *     .findOne()
             *     .scrollForward();
             * ```
             */
            scrollable(b?: boolean): this;

            /**
             * @description: 为当前选择器附加控件是否可编辑的条件。一般来说可编辑的控件为输入框（ `EditText` ），但不是所有的输入框（ `EditText` ）都可编辑。
             * @param {boolean} [b] 控件是否可编辑（默认为 `true` ）。
             * @return {this} 返回选择器自身以便链式调用。
             */
            editable(b?: boolean): this;

            /**
             * @description: 为当前选择器附加控件是否文本或输入框控件是否是多行显示的条件。
             * @param {boolean} [b] 文本或输入框控件是否是多行显示的（默认为 `true` ）。
             * @return {this} 返回选择器自身以便链式调用。
             */
            multiLine(b?: boolean): this;

            /**
             * @description: 根据当前的选择器所确定的筛选条件，对屏幕上的控件进行搜索，直到屏幕上出现满足条件的一个控件为止，并返回该控件。如果找不到控件，当屏幕内容发生变化时会重新寻找，直至找到。
             * 
             * **注意！：**
             * 
             * - 如果屏幕上一直没有出现所描述的控件，则该函数会阻塞，直至所描述的控件出现为止。因此此函数不会返回 `null` 。如果想要只在屏幕上搜索一次而不是一直搜索，请使用 `findOnce()` 。
             * - 如果屏幕上有多个满足条件的控件，`findOne()` 会返回根据指定的搜索算法（默认为 `DFS` ）找到的第一个控件。
             * 
             * @return {UiObject} 根据选择器查找到的控件。
             */
            findOne(): UiObject;

            /**
             * @description: 根据当前的选择器所确定的筛选条件，对屏幕上的控件进行搜索，直到屏幕上出现满足条件的一个控件为止，并返回该控件；如果在 `timeout` 毫秒的时间内没有找到符合条件的控件，则终止搜索并返回 `null` 。
             * @param {number} timeout 搜索的超时时间，单位毫秒。
             * @return {UiObject | null} 根据选择器查找到的控件。
             * @example
             * ```typescript
             * // 启动 Hamibot
             * launchApp('Hamibot');
             * // 在6秒内找出日志图标的控件
             * let w = id('action_log').findOne(6000);
             * // 如果找到控件则点击
             * if (w != null) w.click();
             * // 否则提示没有找到
             * else toast('没有找到日志图标');
             * ```
             */
            findOne(timeout: number): UiObject | null;

            /**
             * @description: 根据当前的选择器所确定的筛选条件，对屏幕上的控件进行搜索，如果找到符合条件的控件则返回该控件；否则返回 `null` 。
             * @return {UiObject | null} 根据选择器查找到的控件。
             */
            findOnce(): UiObject | null;

            /**
             * @description: 根据当前的选择器所确定的筛选条件，对屏幕上的控件进行搜索，并返回第 `i + 1` 个符合条件的控件；如果没有找到符合条件的控件，或者符合条件的控件个数小于 `i` , 则返回 `null` 。
             * @param {number} i 要查找的控件的索引值。
             * @return {UiObject | null} 根据选择器查找到的控件。
             */
            findOnce(i: number): UiObject | null;

            /**
             * @description: 根据当前的选择器所确定的筛选条件，对屏幕上的控件进行搜索，找到所有满足条件的控件集合并返回。这个搜索只进行一次，并不保证一定会找到，因而会出现返回的控件集合为空的情况。不同于 `findOne()` 或者 `findOnce()` 只找到一个控件并返回一个控件， `find()` 函数会找出所有满足条件的控件并返回一个控件集合。之后可以对控件集合进行操作。可以通过 `empty()` 函数判断找到的是否为空。
             * @return {UiCollection} 根据选择器查找到的控件集合。
             * @example
             * ```typescript
             * let c = className('AbsListView').find();
             * if (c.empty()) toast('没找到╭(╯^╰)╮');
             * else toast('找到啦!');
             * ```
             */
            find(): UiCollection;

            /**
             * @description: 根据当前的选择器所确定的筛选条件，对屏幕上的控件进行搜索，直到找到至少一个满足条件的控件为止，并返回所有满足条件的控件集合。该函数与 `find()` 函数的区别在于，该函数永远不会返回空集合；。
             * 
             * **注意！：**
             * 
             * - 如果屏幕上一直没有出现满足条件的控件，该函数会保持阻塞。
             * 
             * @return {UiCollection} 根据选择器查找到的控件集合。
             */
            untilFind(): UiCollection;

            /**
             * @description: 判断屏幕上是否存在控件符合选择器所确定的条件。
             * @return {boolean} 屏幕上是否存在选择器限定的控件。
             * @example
             * ```typescript
             * // 如果有跳过按钮则点击
             * if (text('跳过').exists()) text('跳过').findOne().click();
             * ```
             */
            exists(): boolean;

            /**
             * @description: 等待屏幕上出现符合条件的控件；在满足该条件的控件出现之前，该函数会一直保持阻塞。
             * @example
             * ```typescript
             * // 等待包含'你好'的文本控件出现
             * textContains('你好').waitFor();
             * ```
             */
            waitFor(): void;

            /**
             * @description: 为当前选择器附加自定义的过滤条件。
             * @param {function} f 用于过滤的回调函数。参数为 UiObject ，返回值为 boolean （是否符合过滤条件）。
             * @return {this} 返回选择器自身以便链式调用。
             * @example
             * ```typescript
             * // 找出屏幕上所有文本长度为 10 的文本控件
             * let uc = className('TextView')
             * .filter((i) => i.text().length == 10);
             * ```
             */
            filter(f: (i: UiObject) => boolean): this;
        }

        /**
         * @description: `UiObject` 表示一个控件，可以通过这个对象获取到控件的属性，也可以对控件进行点击、长按等操作。获取一个 `UiObject` 通常通过选择器的 `findOne()` , `findOnce()` 等函数，也可以通过 `UiCollection` 来获取，或者通过 `UiObject.child()` , `UiObject.parent()` 等函数来获取一个控件的子控件或父控件。
         */
        class UiObject {
            /**
             * @description: 点击该控件，并返回是否点击成功。如果该函数返回 `false` ，可能是该控件不可点击（ `clickable` 为 `false` ），当前界面无法响应该点击等。
             * @return {boolean} 操作是否成功。
             */
            click(): boolean;

            /**
             * @description: 长按该控件，并返回是否点击成功。如果该函数返回 `false` ，可能是该控件不可点击（ `longClickable` 为 `false` ），当前界面无法响应该点击等。
             * @return {boolean} 操作是否成功。
             */
            longClick(): boolean;

            /**
             * @description: 设置输入框控件的文本内容，并返回是否设置成功。
             * 
             * **注意！：**
             * 
             * - 该函数只对可编辑的输入框（ `editable` 为 `true` ）有效。
             * 
             * @param {string} text 要设置的文本。
             * @return {boolean} 操作是否成功。
             */
            setText(text: string): boolean;

            /**
             * @description: 对输入框文本的选中内容进行复制。可以通过 `setSelection()` 函数来设置输入框选中的内容。
             * 
             * **注意！：**
             * 
             * - 该函数只能用于输入框控件，并且该控件有选中的文本。
             * 
             * @return {boolean} 操作是否成功。
             * @example
             * ```typescript
             * let et = className('EditText').findOne();
             * // 选中前两个字
             * et.setSelection(0, 2);
             * // 对选中内容进行复制
             * if (et.copy()) toast('复制成功');
             * else toast('复制失败');
             * ```
             */
            copy(): boolean;

            /**
             * @description: 对输入框文本的选中内容进行剪切。可以通过 `setSelection()` 函数来设置输入框选中的内容。
             * 
             * **注意！：**
             * 
             * - 该函数只能用于输入框控件，并且该控件有选中的文本。
             * 
             * @return {boolean} 操作是否成功。
             */
            cut(): boolean;

            /**
             * @description: 对输入框控件进行粘贴操作，把剪贴板内容粘贴到输入框中。
             * 
             * **注意！：**
             * 
             * - 该函数只能用于输入框控件，并且该控件有选中的文本。
             * 
             * @return {boolean} 操作是否成功。
             * @example
             * ```typescript
             * // 设置剪贴板内容为“你好”
             * setClip('你好');
             * let et = className('EditText').findOne();
             * et.paste();
             * ```
             */
            paste(): boolean;

            /**
             * @description: 对输入框控件设置选中的文字内容。索引是从 0 开始计算的；并且，选中内容不包含 `end` 位置的字符。该函数也可以用来设置光标位置，只要参数的 `end` 等于 `start` ，即可把输入框光标设置在 `start` 的位置。
             * @param {number} start 选中内容起始位置。
             * @param {number} end 选中内容结束位置（不包括）。
             * @return {boolean} 操作是否成功。
             * @example
             * ```typescript
             * // 文本框中的内容为 '123456789'
             * let et = className('EditText').findOne();
             * 
             * // 选中 '4567' 的文字
             * et.setSelection(3, 7)
             * 
             * // 把光标设置在第一个字符的后面
             * et.setSelection(1, 1)
             * ```
             */
            setSelection(start: number, end: number): boolean;

            /**
             * @description: 对控件执行向前滑动的操作。向前滑动包括了向右和向下滑动。
             * 
             * **注意！：**
             * 
             * - 如果一个控件既可以向右滑动和向下滑动，那么执行 `scrollForward()` 的行为是未知的。因为 Android 文档没有指出这一点，同时也没有充分的测试可供参考。
             * 
             * @return {boolean} 操作是否成功。
             */
            scrollForward(): boolean;

            /**
             * @description: 对控件执行向后滑动的操作。向后滑动包括了向右和向下滑动。
             * 
             * **注意！：**
             * 
             * - 如果一个控件既可以向右滑动和向下滑动，那么执行 `scrollForward()` 的行为是未知的。因为 Android 文档没有指出这一点，同时也没有充分的测试可供参考。
             * 
             * @return {boolean} 操作是否成功。
             */
            scrollBackward(): boolean;

            /**
             * @description: 对控件执行选中操作。选中和 `isSelected` 的属性相关，但该操作十分少用。
             * @return {boolean} 操作是否成功。
             */
            select(): boolean;

            /**
             * @description: 对控件执行折叠操作。
             * @return {boolean} 操作是否成功。
             */
            collapse(): boolean;

            /**
             * @description: 对控件执行展开操作。
             * @return {boolean} 操作是否成功。
             */
            expand(): boolean;

            /**
             * @description: 获取该控件的所有子控件组成的控件集合。可以用于遍历一个控件的子控件。
             * @return {UiCollection} 所有子控件组成的控件集合。
             * @example
             * ```typescript
             * className('AbsListView')
             * .findOne()
             * .children()
             * .forEach((child) => {
             *     log(child.className());
             * });
             * ```
             */
            children(): UiCollection;

            /**
             * @description: 获取该控件的子控件数目。
             * @return {number} 子控件数目。
             */
            childCount(): number;

            /**
             * @description: 返回第 `i + 1` 个子控件。如果 `i` 大于控件数目或者小于 0 ，则抛出异常。
             * 
             * **注意！：**
             * 
             * - 由于布局捕捉的问题，该函数可能返回 `null` ，也就是可能获取不到某个子控件。
             * 
             * @param {number} i 子控件索引。
             * @return {UiObject | null} 指定的子控件。
             * @example
             * ```typescript
             * let list = className('AbsListView').findOne();
             * for (var i = 0; i < list.childCount(); i++) {
             *     var child = list.child(i);
             *     log(child.className());
             * }
             * ```
             */
            child(i: number): UiObject | null;

            /**
             * @description: 返回该控件的父控件。如果该控件没有父控件，返回 `null` 。
             * @return {UiObject | null} 该控件的父控件。
             */
            parent(): UiObject | null;

            /**
             * @description: 返回控件在屏幕上的范围，其值是一个 `Rect` 对象。如果一个控件本身无法通过 `click()` 点击，那么我们可以利用 `bounds()` 函数获取其坐标，再利用坐标点击。
             * @return {Rect} 返回控件在屏幕上的范围。
             * @example
             * ```typescript
             * var b = desc('打开侧拉菜单')
             *     .findOne()
             *     .bounds();
             * click(b.centerX(), b.centerY());
             * ```
             */
            bounds(): Rect;

            /**
             * @description: 返回控件在父控件中的范围，其值是一个 `Rect` 对象。
             * @return {Rect} 控件在父控件中的范围。
             */
            boundsInParent(): Rect;

            /**
             * @description: 获取控件在父控件中的绘制次序。
             * 
             * **注意！：**
             * 
             * - 该函数在安卓 7.0 及以上才有效，7.0 以下版本调用会返回 0。
             * 
             * @return {number} 控件在父控件中的绘制次序。
             */
            drawingOrder(): number;

            /**
             * @description: 获取控件的 `id` ，如果一个控件没有 `id` ，则返回 `null` 。
             * @return {string | null} 控件的 `id`。
             */
            id(): string | null;

            /**
             * @description: 获取控件的文本，如果控件没有文本，返回''。
             * @return {string} 控件的文本。
             */
            text(): string;

            /**
             * @description: 在子控件中递归地寻找并返回文本（ `text` ）或描述（ `desc` ）包含这段文本 `str` 的控件，返回它们组成的集合。该函数会在当前控件的子控件，孙控件，曾孙控件...中搜索文本或描述包含 `str` 的控件，并返回它们组合的集合。
             * @return {UiCollection} 子控件中匹配的控件集合。
             */
            findByText(str: string): UiCollection;

            /**
             * @description: 根据选择器 `selector` 在该控件的子控件、孙控件...中搜索符合该选择器条件的控件，并返回找到的第一个控件；如果没有找到符合条件的控件则返回 `null` 。
             * @param {UiSelector} selector 用来匹配的选择器。
             * @return {UiObject | null} 根据选择器查找到的子控件。
             * @example
             * ```typescript
             * // 酷安动态列表
             * // 找出动态列表
             * let list = id('recycler_view').findOne();
             * // 遍历动态
             * list.children().forEach(function(child) {
             *     // 找出点赞图标
             *     let like = child.findOne(id('feed_action_view_like'));
             *     // 找出点赞数量
             *     let likeCount = child.findOne(id('text_view'));
             *     // 如果这两个控件没有找到就不继续了
             *     if (like == null || likeCount == null) return;
             *     // 判断点赞数量是否小于10
             *     if (parseInt(likeCount.text()) < 10) like.click();
             * });
             * ```
             */
            findOne(selector: UiSelector): UiObject | null;

            /**
             * @description: 根据选择器 `selector` 在该控件的子控件、孙控件...中搜索符合该选择器条件的控件，并返回它们组合的集合。
             * @return {UiCollection} 根据选择器查找到的控件集合。
             */
            find(selector: UiSelector): UiCollection;

            /**
             * @description: 获取控件的深度。
             * @return {number} 控件的深度。
             */
            depth(): number;

            /**
             * @description: 控件在屏幕中的范围。
             */
            readonly boundsInScreen: Rect;

            /**
             * @description: 控件的应用包名称。
             */
            readonly packageName: string;

            /**
             * @description: 控件的 `className` 属性。
             */
            readonly className: string;

            /**
             * @description: 控件的 `desc` 属性。
             */
            readonly contentDescription: string | null;

            /**
             * @description: 控件是否可勾选。
             */
            readonly checkable: boolean;

            /**
             * @description: 控件是否被勾选。
             */
            readonly checked: boolean;

            /**
             * @description: 控件的 `focusable` 属性。
             */
            readonly focusable: boolean;

            /**
             * @description: 控件是否为焦点。
             */
            readonly focused: boolean;

            /**
             * @description: 控件是否被选中。
             */
            readonly selected: boolean;

            /**
             * @description: 控件是否可点击。
             */
            readonly clickable: boolean;

            /**
             * @description: 控件是否可长按。
             */
            readonly longClickable: boolean;

            /**
             * @description: 控件是否已启用。
             */
            readonly enabled: boolean;

            /**
             * @description: 控件是否是密码。
             */
            readonly password: boolean;

            /**
             * @description: 控件是否可滑动。
             */
            readonly scrollable: boolean;
        }

        /**
         * @description: `UiCollection` , 控件集合, 通过选择器的 `find()` 、 `untilFind()` 方法返回的对象。 `UiCollection` 继承自数组，实际上是一个 `UiObject` 的数组，因此可以使用数组的函数和属性，例如使用 `length` 属性获取 `UiCollection` 的大小，使用 `forEach()` 函数来遍历 `UiCollection` 。 如果想要对该集合的所有元素进行操作，可以直接在集合上调用相应的函数，例如 `uc.click()` ，该代码会对集合上所有 `UiObject` 执行点击操作并返回是否全部点击成功。因此， `UiCollection` 具有所有 `UiObject` 对控件操作的函数，包括 `click()` , `longClick()` , `scrollForward()` 等等，不再赘述。
         * @example
         * ```typescript
         * className('TextView')
         *     .find()
         *     .forEach(function(tv) {
         *         if (tv.text() != '') log(tv.text());
         *     });
         * ```
         * @example
         * ```typescript
         * let uc = className('TextView').find();
         * for (let i = 0; i < uc.length; i++) {
         *     let tv = uc[i];
         *     if (tv.text() != '') log(tv.text());
         * }
         * ```
         */
        class UiCollection extends Array<UiObject> {
            /**
             * @description: 获取集合中的控件数。历史遗留函数，相当于属性 length。
             * @return {number} 集合中的控件数。
             */
            size(): number;

            /**
             * @description: 获取集合中的控件（ `UiObject` ）。历史遗留函数。
             * 
             * *建议（：*
             * 
             * - 直接使用数组下标的方式访问元素。
             * 
             * @return {UiObject} 集合中第 `i + 1` 个控件。
             */
            get(i: number): UiObject;

            /**
             * @description: 遍历集合。
             * @param {function} func 遍历时要执行的操作。参数为 UiObject ，用来规定遍历时进行的操作，返回值为 any 。
             */
            each(func: (obj: UiObject) => any): void;

            /**
             * @description: 查询控件集合是否为空。
             * @return {boolean} 控件集合为空则返回 `true`，否则返回 `false` 。
             */
            empty(): boolean;


            /**
             * @description: 查询控件集合是否非空。
             * @return {boolean} 控件集合为空则返回 `false`，否则返回 `true` 。
             */
            nonEmpty(): boolean;

            /**
             * @description: 根据 `selector` 所确定的条件在该控件集合的控件、子控件、孙控件...中找到所有符合条件的控件并返回找到的控件集合。
             * 
             * **注意！：**
             * 
             * - 此方法递归地遍历控件集合里所有的控件以及他们的子控件。和数组的filter函数不同。
             * 
             * @param {UiSelector} selector 规定筛选条件的选择器。
             * @return {UiCollection} 根据选择器查找到的控件集合。
             * @example
             * ```typescript
             * let names = id('name').find();
             * let clickableNames = names.find(clickable());
             * ```
             */
            // @ts-ignore
            find(selector: UiSelector): UiCollection;

            /**
             * @description: 根据选择器 `selector` 在该控件集合的控件的子控件、孙控件...中搜索符合该选择器条件的控件，并返回找到的第一个控件。
             * @param {UiSelector} selector 规定筛选条件的选择器。
             * @return {UiObject | null} 第一个符合选择器条件的控件；如果没有找到符合条件的控件则返回 `null`。
             */
            findOne(selector: UiSelector): UiObject | null;

            // 和 UiObject 相同的方法

            /**
             * @description: 点击集合内的所有控件，并返回是否点击成功。如果该函数返回 `false` ，可能是该控件不可点击（ `clickable` 属性为 `false` ），当前界面无法响应该点击等。
             * @return {boolean} 操作是否成功。
             */
            click(): boolean;

            /**
             * @description: 长按集合内的所有控件，并返回是否点击成功。如果该函数返回 `false` ，可能是该控件不可点击（ `longClickable` 属性为 `false` ），当前界面无法响应该点击等。
             * @return {boolean} 操作是否成功。
             */
            longClick(): boolean;

            /**
             * @description: 设置集合内的所有输入框控件的文本内容，并返回是否设置成功。
             * 
             * **注意！：**
             * 
             * - 该函数只对可编辑的输入框（ `editable` 属性为 `true` ）有效。
             * 
             * @param {string} text 要设置的文本。
             * @return {boolean} 操作是否成功。
             */
            setText(text: string): boolean;

            /**
             * @description: 对集合内的所有输入框文本的选中内容进行复制。可以通过 `setSelection()` 函数来设置输入框选中的内容。
             * 
             * **注意！：**
             * 
             * - 该函数只能用于输入框控件，并且该控件有选中的文本。
             * 
             * @return {boolean} 操作是否成功。
             * @example
             * ```typescript
             * let et = className('EditText').findOne();
             * // 选中前两个字
             * et.setSelection(0, 2);
             * // 对选中内容进行复制
             * if (et.copy()) toast('复制成功');
             * else toast('复制失败');
             * ```
             */
            copy(): boolean;

            /**
             * @description: 对集合内的所有输入框文本的选中内容进行剪切。可以通过 `setSelection()` 函数来设置输入框选中的内容。
             * 
             * **注意！：**
             * 
             * - 该函数只能用于输入框控件，并且该控件有选中的文本。
             * 
             * @return {boolean} 操作是否成功。
             */
            cut(): boolean;

            /**
             * @description: 对集合内的所有输入框控件进行粘贴操作，把剪贴板内容粘贴到输入框中。
             * 
             * **注意！：**
             * 
             * - 该函数只能用于输入框控件，并且该控件有选中的文本。
             * 
             * @return {boolean} 操作是否成功。
             * @example
             * ```typescript
             * // 设置剪贴板内容为“你好”
             * setClip('你好');
             * let et = className('EditText').findOne();
             * et.paste();
             * ```
             */
            paste(): boolean;

            /**
             * @description: 对集合内的所有输入框控件设置选中的文字内容。索引是从 0 开始计算的；并且，选中内容不包含 `end` 位置的字符。该函数也可以用来设置光标位置，只要参数的 `end` 等于 `start` ，即可把输入框光标设置在 `start` 的位置。
             * @param {number} start 选中内容起始位置。
             * @param {number} end 选中内容结束位置（不包括）。
             * @return {boolean} 操作是否成功。
             * @example
             * ```typescript
             * // 文本框中的内容为 '123456789'
             * let et = className('EditText').findOne();
             * 
             * // 选中 '4567' 的文字
             * et.setSelection(3, 7)
             * 
             * // 把光标设置在第一个字符的后面
             * et.setSelection(1, 1)
             * ```
             */
            setSelection(start: number, end: number): boolean;

            /**
             * @description: 对集合内的所有控件执行向前滑动的操作。向前滑动包括了向右和向下滑动。
             * 
             * **注意！：**
             * 
             * - 如果一个控件既可以向右滑动和向下滑动，那么执行 `scrollForward()` 的行为是未知的。因为 Android 文档没有指出这一点，同时也没有充分的测试可供参考。
             * 
             * @return {boolean} 操作是否成功。
             */
            scrollForward(): boolean;

            /**
             * @description: 对集合内的所有控件执行向后滑动的操作。向后滑动包括了向右和向下滑动。
             * 
             * **注意！：**
             * 
             * - 如果一个控件既可以向右滑动和向下滑动，那么执行 `scrollForward()` 的行为是未知的。因为 Android 文档没有指出这一点，同时也没有充分的测试可供参考。
             * 
             * @return {boolean} 操作是否成功。
             */
            scrollBackward(): boolean;

            /**
             * @description: 对集合内的所有控件执行'选中'操作。'选中'和 `isSelected` 的属性相关，但该操作十分少用。
             * @return {boolean} 操作是否成功。
             */
            select(): boolean;

            /**
             * @description: 对集合内的所有控件执行折叠操作。
             * @return {boolean} 操作是否成功。
             */
            collapse(): boolean;

            /**
             * @description: 对集合内的所有控件执行展开操作。
             * @return {boolean} 操作是否成功。
             */
            expand(): boolean;
        }

        /**
         * @description: `UiObject.bounds()` , `UiObject.boundsInParent()` 返回的对象。表示一个长方形范围。
         */
        class Rect {
            /**
             * @description: 长方形左边界的 x 坐标。
             */
            left: number;

            /**
             * @description: 长方形右边界的 x 坐标。
             */
            right: number;

            /**
             * @description: 长方形上边界的 y 坐标。
             */
            top: number;

            /**
             * @description: 长方形下边界的 y 坐标。
             */
            bottom: number;

            /**
             * @description: 创建一个新的空 `Rect` 。
             */
            constructor();

            /**
             * @description: 创建一个具有指定坐标的新 `Rect` 。
             */
            constructor(r: Rect);

            /**
             * @description: 创建一个新 `Rect` ，使用指定 `Rect` 中的值进行初始化（未修改）。
             */
            constructor(left: number, top: number, right: number, bottom: number);

            /**
             * @description: 获取长方形中点 x 坐标。
             * @return {number} 长方形中点 x 坐标（像素）。
             */
            centerX(): number;

            /**
             * @description: 获取长方形中点 y 坐标。
             * @return {number} 长方形中点 y 坐标（像素）。
             */
            centerY(): number;

            /**
             * @description: 获取长方形宽度。通常可以作为控件宽度。
             * @return {number} 长方形宽度（像素）。
             */
            width(): number;

            /**
             * @description: 获取长方形高度。通常可以作为控件高度。
             * @return {number} 长方形高度（像素）。
             */
            height(): number;

            /**
             * @description: 检查当前长方形是否包含另一个长方形 `r` 。包含指的是，长方形 `r` 在该长方形的里面（包含边界重叠的情况）。
             * @return {boolean} 当前长方形包含长方形 `r` 则返回 `true` 否则返回 `false` 。
             */
            contains(r: Rect): boolean;

            /**
             * @description: 检查当前长方形是否与另一个长方形 `r` 相交（包含边界重叠的情况）。
             * @return {boolean} 当前长方形与长方形 `r` 相交则返回 `true` 否则返回 `false` 。
             */
            intersect(r: Rect): boolean;
        }

        class RectF extends Rect {
            /**
             * @description: 创建一个新 `Rect` ，使用指定 `Rect` 中的值进行初始化（未修改）。
             */
            constructor(r: RectF);
        }

        // 声明全局函数

        /**
         * @description: 创建一个新的选择器。但一般情况不需要使用该函数，因为可以直接用相应条件的语句创建选择器。由于历史遗留原因，本不应该这样设计（不应该让 `id()` , `text()` 等作为全局函数，而是应该用 `By.id()` ， `By.text()` ），但为了后向兼容性只能保留这个设计。这样的 API 设计会污染全局变量，后续可能会支持 '去掉这些全局函数而使用 By.***' 的选项。
         * @return {UiSelector} 新的选择器。
         */
        function selector(): UiSelector;

        /**
         * @description: 该函数可以点击大部分包含文字的按钮。例如微信主界面下方的'微信', '联系人', '发现', '我'的按钮。通常与 `while` 同时使用以便点击按钮直至成功。当不指定参数 `i` 时则会尝试点击屏幕上出现的所有文字 text 并返回是否全部点击成功。
         * @param {string} text 要点击的文本。
         * @param {number} [i] 如果相同的文本在屏幕中出现多次，则 `i` 表示要点击第 `i + 1` 个文本, `i` 从 0 开始计算。
         * @return {boolean} 是否点击成功。当屏幕中并未包含该文本，或者该文本所在区域不能点击时返回 `false` ，否则返回 `true` 。文本所在区域指的是，从文本处向其父视图寻找，直至发现一个可点击的部件为止。
         * @example
         * ```typescript
         * while (!click('扫一扫'));
         * ```
         */
        function click(text: string, i?: number): boolean;

        /**
         * @description: 点击在指定区域的控件。有些按钮或者部件是图标而不是文字（例如发送朋友圈的照相机图标以及 QQ 下方的消息、联系人、动态图标），这时不能通过 `click(text, i)` 来点击，可以通过描述图标所在的区域来点击。`left` , `bottom` , `top` , `right` 描述的就是点击的区域。至于要定位点击的区域，可以在悬浮窗使用布局分析工具查看控件的 `bounds` 属性。通过无障碍服务录制脚本会生成该语句。
         * 
         * **注意！：**
         * 
         * - 该函数一般只用于录制的脚本中使用，在自己写的代码中使用该函数一般不要使用该函数。
         * 
         * @param {number} left 要点击的长方形区域左边与屏幕左边的像素距离。
         * @param {number} top 要点击的长方形区域上边与屏幕上边的像素距离。
         * @param {number} bottom 要点击的长方形区域下边与屏幕下边的像素距离。
         * @param {number} right 要点击的长方形区域右边与屏幕右边的像素距离。
         * @return {boolean} 当屏幕中并未包含与该区域严格匹配的区域，或者该区域不能点击时返回 `false`，否则返回 `true`。
         */
        function click(left: number, top: number, bottom: number, right: number): boolean;

        /**
         * @description: 长按指定的文本。当不指定参数 `i` 时则会尝试点击屏幕上出现的所有文字 text 并返回是否全部长按成功。
         * @param {string} text 要长按的文本。
         * @param {number} [i] 如果相同的文本在屏幕中出现多次，则 `i` 表示要长按第 `i + 1` 个文本, `i` 从 0 开始计算。
         * @return {boolean} 是否点击成功。当屏幕中并未包含该文本，或者该文本所在区域不能点击时返回 `false`，否则返回 `true`。
         */
        function longClick(text: string, i?: number): boolean;

        /**
         * @description: 找到第 `i + 1` 个可滑动控件**上滑或左滑**。另外不加参数时 `scrollUp()` 会寻找面积最大的可滑动的控件上滑或左滑，例如微信消息列表等。
         * @param {number} [i] 限定滑动第 `i + 1` 个可滑动控件。
         * @return {boolean} 是否操作成功。屏幕上没有可滑动的控件时返回 `false` ，否则返回 `true` 。
         */
        function scrollUp(i?: number): boolean;

        /**
         * @description: 找到第 `i + 1` 个可滑动控件**下滑或右滑**。另外不加参数时 `scrollUp()` 会寻找面积最大的可滑动的控件下滑或右滑，例如微信消息列表等。
         * @param {number} [i] 限定滑动第 `i + 1` 个可滑动控件。
         * @return {boolean} 是否操作成功。屏幕上没有可滑动的控件时返回 `false` ，否则返回 `true` 。
         */
        function scrollDown(i?: number): boolean;

        /**
         * @description: 把所有输入框的文本都设置为 `text` 。
         * 
         * **注意！：**
         * 
         * -  这里的输入文本的意思是，把输入框的文本置为 `text` ，而不是在原来的文本上追加。
         * 
         * @param {string} text 要输入的文本。
         * @return {boolean} 是否输入成功。当找不到对应的文本框时返回 `false` ，否则返回 `true` 。
         */
        function setText(text: string): boolean;

        /**
         * @description: 将第 `i + 1` 个输入框的文本设置为 `text`。
         * 
         * **注意！：**
         * 
         * -  这里的输入文本的意思是，把输入框的文本置为 `text` ，而不是在原来的文本上追加。
         * 
         * @param {number} i 表示要输入的为第 `i + 1` 个输入框。
         * @param {string} text 要输入的文本。
         * @return {boolean} 是否输入成功。当找不到对应的文本框时返回 `false` ，否则返回 `true` 。
         */
        function setText(i: number, text: string): boolean;

        /**
         * @description: 向所有输入框的文本后追加 `text` 。
         * @param {string} text 要输入的文本。
         * @return {boolean} 是否输入成功。当找不到对应的文本框时返回 `false` ，否则返回 `true` 。
         */
        function input(text: string): boolean;

        /**
         * @description: 向第 `i + 1` 个输入框的文本后追加 `text`。
         * @param {number} i 表示要输入的为第 `i + 1` 个输入框。
         * @param {string} text 要输入的文本。
         * @return {boolean} 是否输入成功。当找不到对应的文本框时返回 `false` ，否则返回 `true` 。
         */
        function input(i: number, text: string): boolean;

        /**
         * @description: 指定选择器的搜索算法。广度优先在控件所在层次较低时，或者布局的层次不多时，通常能更快找到控件。
         * @param {string} algorithm 搜索算法（默认为 `DFS` ），可选的值为:
         * 
         * - `DFS` - 深度优先算法
         * - `BFS` - 广度优先算法
         * 
         * @return {UiSelector} 返回选择器自身以便链式调用。
         * @example
         * ```typescript
         * log(
         *     selector()
         *         .text('文本')
         *         .algorithm('BFS')
         *         .find()
         * );
         * ```
         */
        function algorithm(algorithm: 'DFS' | 'BFS'): UiSelector;

        /**
         * @description: 为当前选择器附加控件 `text` 等于字符串 `str` 的筛选条件。控件的 `text` （文本）属性是文本控件上的显示的文字，例如微信左上角的'微信'文本。
         * @param {string} str 控件文本。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function text(str: string): UiSelector;

        /**
         * @description: 为当前选择器附加控件 `text` 需要包含字符串 `str` 的筛选条件。这是一个比较有用的条件，例如 QQ 动态页和微博发现页上方的'大家都在搜....'的控件可以用 `textContains('大家都在搜').findOne()` 来获取。
         * @param {string} str 要包含的字符串。
         * @return {UiSelector} 。
         */
        function textContains(str: string): UiSelector;

        /**
         * @description: 为当前选择器附加控件 `text` 需要以 `prefix` 开头的筛选条件。这也是一个比较有用的条件，例如要找出 Hamibot 脚本列表中名称以'QQ'开头的脚本的代码为 `textStartsWith('QQ').find()` 。
         * @param {string} prefix 前缀字符串。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function textStartsWith(prefix: string): UiSelector;

        /**
         * @description: 为当前选择器附加控件 `text` 需要以 `suffix` 结束的筛选条件。
         * @param {string} suffix 后缀字符串。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function textEndsWith(suffix: string): UiSelector;

        /**
         * @description: 为当前选择器附加控件 `text` 需要满足正则表达式 `reg` 的条件。有关正则表达式，可以查看 [正则表达式] 。需要注意的是，如果正则表达式是字符串，则需要使用 `\\` 来表达 `\` （也即 Java 正则表达式的形式），例如 `textMatches('\\d+')` 匹配多位数字；但如果使用 JavaScript 语法的正则表达式则不需要，例如 `textMatches(/\d+/)` 。但如果使用字符串的正则表达式则该字符串不能同时以'/'开头和结束，也即不能写诸如 `textMatches('/\\d+/')` 的表达式，否则会被开头的'/'和结尾的'/'会被忽略。
         * 
         * **注意！：**
         * 
         * - 有些情况会出现匹配不到的问题。请尽量减少使用。
         * 
         * [正则表达式]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions
         * @param {RegExp | string} reg 要满足的正则表达式。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function textMatches(reg: RegExp | string): UiSelector;

        /**
         * @description: 为当前选择器附加控件 `desc` 等于字符串 `str` 的筛选条件。控件的 `desc` （描述，全称为 `Content-Description` ）属性是对一个控件的描述，例如网易云音乐右上角的放大镜图标的描述为搜索。要查看一个控件的描述，同样地可以借助悬浮窗查看。
         * @param {string} str 控件描述文本。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function desc(str: string): UiSelector;

        /**
         * @description: 为当前选择器附加控件 `desc` 需要包含字符串 `str` 的筛选条件。
         * @param {string} str 控件描述要包含的文本。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function descContains(str: string): UiSelector;

        /**
         * @description: 为当前选择器附加控件 `desc` 需要以 `prefix` 开头的筛选条件。
         * @param {string} prefix 控件描述前缀。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function descStartsWith(prefix: string): UiSelector;

        /**
         * @description: 为当前选择器附加控件 `desc` 需要以 `suffix` 结束的筛选条件。
         * @param {string} suffix 控件描述后缀。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function descEndsWith(suffix: string): UiSelector;

        /**
         * @description: 为当前选择器附加控件 `desc` 需要满足正则表达式 `reg` 的条件。有关正则表达式，可以查看 [正则表达式] 。需要注意的是，如果正则表达式是字符串，则需要使用 `\\` 来表达 `\` （也即 Java 正则表达式的形式），例如 `textMatches('\\d+')` 匹配多位数字；但如果使用 JavaScript 语法的正则表达式则不需要，例如 `textMatches(/\d+/)` 。但如果使用字符串的正则表达式则该字符串不能同时以'/'开头和结束，也即不能写诸如 `textMatches('/\\d+/')` 的表达式，否则会被开头的'/'和结尾的'/'会被忽略。
         * 
         * **注意！：**
         * 
         * - 有些情况会出现匹配不到的问题。请尽量减少使用。
         * 
         * [正则表达式]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions
         * @param {RegExp | string} regex 要满足的正则表达式。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function descMatches(regex: RegExp | string): UiSelector;

        /**
         * @description: 为当前选择器添加附加控件 `depth` 深度条件。
         * @return {this} 返回选择器自身以便链式调用。
         */
        function depth(depth: number): UiSelector;

        /**
         * @description: 为当前选择器附加 `id` 等于 `resId` 的筛选条件。控件的 `id` 属性 **通常** 是可以用来确定控件的唯一标识，如果一个控件有 `id` ，那么使用 `id` 来找到他是最好的方法。不过，在列表中会出现多个控件的 `id` 相同的情况。
         * 
         * **注意！：**
         * 
         * - 在 QQ 界面经常会出现多个 `id` 为 `name` 的控件，在微信上则每个版本的 `id` 都会变化。对于这些软件而言比较难用 `id` 定位控件。
         * 
         * @param {string} resId 控件的 `id` ，以'包名:id/'开头，例如 `com.tencent.mm:id/send_btn` 。也可以不指定包名，这时会以当前正在运行的应用的包名来补全 `id` 。例如 `id('send_btn')` ,在 QQ 界面相当于 `id('com.tencent.mobileqq:id/send_btn')` 。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function id(resId: string): UiSelector;

        /**
         * @description: 为当前选择器附加控件 `id` 包含字符串 `str` 的筛选条件。
         * @param {string} str `id` 要包含的字符串。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function idContains(str: string): UiSelector;

        /**
         * @description: 为当前选择器附加 `id` 需要以 `prefix` 开头的筛选条件。
         * @param {string} prefix 指定的 `id` 前缀。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function idStartsWith(prefix: string): UiSelector;

        /**
         * @description: 为当前选择器附加 `id` 需要以 `suffix` 结束的筛选条件。
         * @param {string} suffix 指定的 `id` 后缀。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function idEndsWith(suffix: string): UiSelector;

        /**
         * @description: 附加 `id` 需要满足正则表达式。有关正则表达式，可以查看 [正则表达式] 。需要注意的是，如果正则表达式是字符串，则需要使用 `\\` 来表达 `\` （也即 Java 正则表达式的形式），例如 `textMatches('\\d+')` 匹配多位数字；但如果使用 JavaScript 语法的正则表达式则不需要，例如 `textMatches(/\d+/)` 。但如果使用字符串的正则表达式则该字符串不能同时以'/'开头和结束，也即不能写诸如 `textMatches('/\\d+/')` 的表达式，否则会被开头的'/'和结尾的'/'会被忽略。
         * 
         * **注意！：**
         * 
         * - 有些情况会出现匹配不到的问题。请尽量减少使用。
         * 
         * [正则表达式]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions
         * @param {RegExp} reg `id` 要满足的正则表达式。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         * @example
         * ```typescript
         * idMatches('[a-zA-Z]+');
         * ```
         */
        function idMatches(reg: RegExp | string): UiSelector;

        /**
         * @description: 为当前选择器附加控件 `className` 等于字符串 `str` 的筛选条件。控件的 `className` （类名）表示一个控件的类别，例如文本控件的类名为 `android.widget.TextView` 。如果一个控件的类名以 `android.widget.` 开头，则可以省略这部分，例如文本控件可以直接用 `className('TextView')` 的选择器。
         * @param {string} str 控件 `className` 属性。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function className(str: CommonClassName): UiSelector;

        /**
         * @description: 为当前选择器附加控件 `className` 等于字符串 `str` 的筛选条件。控件的 `className` （类名）表示一个控件的类别，例如文本控件的类名为 `android.widget.TextView` 。如果一个控件的类名以 `android.widget.` 开头，则可以省略这部分，例如文本控件可以直接用 `className('TextView')` 的选择器。
         * @param {string} str 控件 `className` 属性。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function className(str: string): UiSelector;

        /**
         * @description: 为当前选择器附加控件 `className` 需要包含字符串 `str` 的筛选条件。
         * @param {string} str `className` 要包含的字符串。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function classNameContent(str: string): UiSelector;

        /**
         * @description: 为当前选择器附加控件 `className` 需要以 `prefix` 开头的筛选条件。
         * @param {string} prefix 指定的 `className` 前缀。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function classNameStartsWith(prefix: string): UiSelector;

        /**
         * @description: 为当前选择器附加控件 `className` 需要以 `suffix` 结束的筛选条件。
         * @param {string} suffix 指定的 `className` 后缀。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function classNameEndsWith(suffix: string): UiSelector;

        /**
         * @description: 为当前选择器附加控件 `packageName` 需要满足正则表达式 `reg` 的条件。有关正则表达式，可以查看 [正则表达式] 。需要注意的是，如果正则表达式是字符串，则需要使用 `\\` 来表达 `\` （也即 Java 正则表达式的形式），例如 `textMatches('\\d+')` 匹配多位数字；但如果使用 JavaScript 语法的正则表达式则不需要，例如 `textMatches(/\d+/)` 。但如果使用字符串的正则表达式则该字符串不能同时以'/'开头和结束，也即不能写诸如 `textMatches('/\\d+/')` 的表达式，否则会被开头的'/'和结尾的'/'会被忽略。
         * 
         * **注意！：**
         * 
         * - 有些情况会出现匹配不到的问题。请尽量减少使用。
         * 
         * [正则表达式]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions
         * @param {RegExp} reg 要满足的正则表达式。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function classNameMatches(reg: RegExp | string): UiSelector;

        /**
         * @description: 为当前选择器附加控件 `packageName` 等于字符串 `str` 的筛选条件。控件的 `packageName` 表示控件所属界面的应用包名。例如微信的包名为 `com.tencent.mm` , 那么微信界面中所有的控件的 `packageName` 都为 `com.tencent.mm` 。
         * @param {string} str 指定的包名。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function packageName(str: string): UiSelector;

        /**
         * @description: 为当前选择器附加控件 `packageName` 需要包含字符串 `str` 的筛选条件。
         * @param {string} str 控件 `packageName` 要包含的字符串。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function packageNameContains(str: string): UiSelector;

        /**
         * @description: 为当前选择器附加控件 `packageName` 需要以 `prefix` 开头的筛选条件。
         * @param {string} prefix 指定控件 `packageName` 的前缀。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function packageNameStartsWith(prefix: string): UiSelector;

        /**
         * @description: 为当前选择器附加控件 `packageName` 需要以 `suffix` 结束的筛选条件。
         * @param {string} suffix 指定控件 `packageName` 的后缀。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function packageNameEndsWith(suffix: string): UiSelector;

        /**
         * @description: 为当前选择器附加控件 `packageName` 需要满足正则表达式 `reg` 的条件。有关正则表达式，可以查看 [正则表达式] 。需要注意的是，如果正则表达式是字符串，则需要使用 `\\` 来表达 `\` （也即 Java 正则表达式的形式），例如 `textMatches('\\d+')` 匹配多位数字；但如果使用 JavaScript 语法的正则表达式则不需要，例如 `textMatches(/\d+/)` 。但如果使用字符串的正则表达式则该字符串不能同时以'/'开头和结束，也即不能写诸如 `textMatches('/\\d+/')` 的表达式，否则会被开头的'/'和结尾的'/'会被忽略。
         * 
         * **注意！：**
         * 
         * - 有些情况会出现匹配不到的问题。请尽量减少使用。
         * 
         * [正则表达式]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions
         * @param {RegExp | string} reg 要满足的正则表达式。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function packageNameMatches(reg: RegExp | string): UiSelector;

        /**
         * @description: 通过控件的 `bounds` 属性查找控件。一个控件的 bounds 属性为这个控件在屏幕上显示的范围。尽管用这个方法定位控件对于静态页面十分准确，却无法兼容不同分辨率的设备；同时对于列表页面等动态页面无法达到效果，因此使用不推荐该选择器。
         * 
         * **注意！：**
         * 
         * - 参数的这四个数字不能随意填写，必须精确的填写控件的四个边界才能找到该控件。
         * 
         * @param {number} left 控件左边缘与屏幕左边的距离。
         * @param {number} top 控件上边缘与屏幕上边的距离。
         * @param {number} right 控件右边缘与屏幕左边的距离。
         * @param {number} bottom 控件下边缘与屏幕上边的距离。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function bounds(left: number, top: number, right: number, bottom: number): UiSelector;

        /**
         * @description: 为当前选择器附加控件 `bounds` 需要在 `left` , `top` , `right` , `buttom` 构成的范围里面的条件。这个条件用于限制选择器在某一个区域选择控件。
         * @param {number} left。
         * @param {number} top。
         * @param {number} right。
         * @param {number} bottom。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         * @example
         * ```typescript
         * // 在屏幕上半部分寻找文本控件 TextView
         * let w = className('TextView')
         *     .boundsInside(0, 0, device.width, device.height / 2)
         *     .findOne();
         * log(w.text());
         * ```
         */
        function boundsInside(left: number, top: number, right: number, bottom: number): UiSelector;

        /**
         * @description: 为当前选择器附加控件 `bounds` 需要包含 `left` , `top` , `right` , `buttom` 构成的范围'的条件。这个条件用于限制控件的范围必须包含所给定的范围。
         * @param {number} left 范围左边缘与屏幕左边的距离。
         * @param {number} top 范围上边缘与屏幕上边的距离。
         * @param {number} right 范围右边缘与屏幕左边的距离。
         * @param {number} bottom 范围下边缘与屏幕上边的距离。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         * @example
         * ```typescript
         * // 寻找在点(500, 300)上的可点击控件
         * let w = boundsContains(500, 300, 500, 300)
         *     .clickable()
         *     .findOne();
         * w.click();
         * ```
         */
        function boundsContains(left: number, top: number, right: number, bottom: number): UiSelector;

        /**
         * @description: 为当前选择器附加控件 `drawingOrder` 等于 `order` 的条件。 `drawingOrder` 为一个控件在父控件中的绘制顺序，通常可以用于区分同一层次的控件。
         * 
         * **注意！：**
         * 
         * - 此方法在 Android 7.0 以上才能使用。
         * 
         * @param {number} order 控件在父视图中的绘制顺序。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function drawingOrder(order: number): UiSelector;

        /**
         * @description: 为当前选择器附加控件是否可点击的条件。但并非所有 `clickable` 为 `false` 的控件都真的不能点击，这取决于控件的实现。对于自定义控件（例如显示类名为 `android.view.View` 的控件）很多的 `clickable` 属性都为 `false` 都却能点击。
         * @param {boolean} [b] 控件是否可点击（默认为 `true` ）。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         * @example
         * ```typescript
         * // 查找不能点击的图片
         * className('ImageView').clickable(false).find()
         * ```
         */
        function clickable(b?: boolean): UiSelector;

        /**
         * @description: 为当前选择器附加控件是否可长按的条件。
         * @param {boolean} [b] 控件是否可长按（默认为 `true` ）。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function longClickable(b?: boolean): UiSelector;

        /**
         * @description: 为当前选择器附加控件是否可勾选的条件。勾选通常是对于勾选框而言的，例如图片多选时左上角通常有一个勾选框。
         * @param {boolean} [b] 控件是否可勾选（默认为 `true` ）。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function checkable(b?: boolean): UiSelector;

        /**
         * @description: 为当前选择器附加控件是否已选中的条件。被选中指的是，例如 QQ 聊天界面点击下方的'表情按钮'时，会出现自己收藏的表情，这时'表情按钮'便处于选中状态，其 `selected` 属性为 `true` 。
         * @param {boolean} [b] 控件是否被选（默认为 `true` ）。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function selected(b?: boolean): UiSelector;

        /**
         * @description: 为当前选择器附加控件是否已启用的条件。大多数控件都是启用的状态（ `enabled` 属性为 `true` ），处于“禁用”状态通常是灰色并且不可点击。
         * @param {boolean} [b] 控件是否已启用（默认为 `true` ）。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function enabled(b?: boolean): UiSelector;

        /**
         * @description: 为当前选择器附加控件是否可滑动的条件。滑动包括上下滑动和左右滑动。可以用这个条件来寻找可滑动控件来滑动界面。
         * @param {boolean} [b] 控件是否可滑动（默认为 `true` ）。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         * @example
         * ```typescript
         * // 滑动 Hamibot 的脚本列表
         * classNameEndsWith('RecyclerView')
         *     .scrollable()
         *     .findOne()
         *     .scrollForward();
         * ```
         */
        function scrollable(b?: boolean): UiSelector;

        /**
         * @description: 为当前选择器附加控件是否可编辑的条件。一般来说可编辑的控件为输入框（ `EditText` ），但不是所有的输入框（ `EditText` ）都可编辑。
         * @param {boolean} [b] 控件是否可编辑（默认为 `true` ）。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function editable(b?: boolean): UiSelector;

        /**
         * @description: 为当前选择器附加控件是否文本或输入框控件是否是多行显示的条件。
         * @param {boolean} [b] 文本或输入框控件是否是多行显示的（默认为 `true` ）。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         */
        function multiLine(b?: boolean): UiSelector;

        /**
         * @description: 根据当前的选择器所确定的筛选条件，对屏幕上的控件进行搜索，直到屏幕上出现满足条件的一个控件为止，并返回该控件。如果找不到控件，当屏幕内容发生变化时会重新寻找，直至找到。
         * 
         * **注意！：**
         * 
         * - 如果屏幕上一直没有出现所描述的控件，则该函数会阻塞，直至所描述的控件出现为止。因此此函数不会返回 `null` 。如果想要只在屏幕上搜索一次而不是一直搜索，请使用 `findOnce()` 。
         * - 如果屏幕上有多个满足条件的控件，`findOne()` 会返回根据指定的搜索算法（默认为 `DFS` ）找到的第一个控件。
         * 
         * @return {UiObject} 根据选择器查找到的控件。
         */
        function findOne(): UiObject;

        /**
         * @description: 根据当前的选择器所确定的筛选条件，对屏幕上的控件进行搜索，直到屏幕上出现满足条件的一个控件为止，并返回该控件；如果在 `timeout` 毫秒的时间内没有找到符合条件的控件，则终止搜索并返回 `null` 。
         * @param {number} timeout 搜索的超时时间，单位毫秒。
         * @return {UiObject | null} 根据选择器查找到的控件。
         * @example
         * ```typescript
         * // 启动 Hamibot
         * launchApp('Hamibot');
         * // 在6秒内找出日志图标的控件
         * let w = id('action_log').findOne(6000);
         * // 如果找到控件则点击
         * if (w != null) w.click();
         * // 否则提示没有找到
         * else toast('没有找到日志图标');
         * ```
         */
        function findOne(timeout: number): UiObject | null;

        /**
         * @description: 根据当前的选择器所确定的筛选条件，对屏幕上的控件进行搜索，如果找到符合条件的控件则返回该控件；否则返回 `null` 。
         * @return {UiObject | null} 根据选择器查找到的控件。
         */
        function findOnce(): UiObject | null;

        /**
         * @description: 根据当前的选择器所确定的筛选条件，对屏幕上的控件进行搜索，并返回第 `i + 1` 个符合条件的控件；如果没有找到符合条件的控件，或者符合条件的控件个数小于 `i` , 则返回 `null` 。
         * @param {number} i 要查找的控件的索引值。
         * @return {UiObject | null} 根据选择器查找到的控件。
         */
        function findOnce(i: number): UiObject | null;

        /**
         * @description: 根据当前的选择器所确定的筛选条件，对屏幕上的控件进行搜索，找到所有满足条件的控件集合并返回。这个搜索只进行一次，并不保证一定会找到，因而会出现返回的控件集合为空的情况。不同于 `findOne()` 或者 `findOnce()` 只找到一个控件并返回一个控件， `find()` 函数会找出所有满足条件的控件并返回一个控件集合。之后可以对控件集合进行操作。可以通过 `empty()` 函数判断找到的是否为空。
         * @return {UiCollection} 根据选择器查找到的控件集合。
         * @example
         * ```typescript
         * let c = className('AbsListView').find();
         * if (c.empty()) toast('没找到╭(╯^╰)╮');
         * else toast('找到啦!');
         * ```
         */
        function find(): UiCollection;

        /**
         * @description: 根据当前的选择器所确定的筛选条件，对屏幕上的控件进行搜索，直到找到至少一个满足条件的控件为止，并返回所有满足条件的控件集合。该函数与 `find()` 函数的区别在于，该函数永远不会返回空集合；。
         * 
         * **注意！：**
         * 
         * - 如果屏幕上一直没有出现满足条件的控件，该函数会保持阻塞。
         * 
         * @return {UiCollection} 根据选择器查找到的控件集合。
         */
        function untilFind(): UiCollection;

        /**
         * @description: 判断屏幕上是否存在控件符合选择器所确定的条件。
         * @return {boolean} 屏幕上是否存在选择器限定的控件。
         * @example
         * ```typescript
         * // 如果有跳过按钮则点击
         * if (text('跳过').exists()) text('跳过').findOne().click();
         * ```
         */
        function exists(): boolean;

        /**
         * @description: 等待屏幕上出现符合条件的控件；在满足该条件的控件出现之前，该函数会一直保持阻塞。
         * @example
         * ```typescript
         * // 等待包含'你好'的文本控件出现
         * textContains('你好').waitFor();
         * ```
         */
        function waitFor(): void;

        /**
         * @description: 为当前选择器附加自定义的过滤条件。
         * @param {function} f 用于过滤的回调函数。参数为 UiObject ，返回值为 boolean （是否符合过滤条件）。
         * @return {UiSelector} 返回选择器自身以便链式调用。
         * @example
         * ```typescript
         * // 找出屏幕上所有文本长度为 10 的文本控件
         * let uc = className('TextView')
         *     .filter((i) => i.text().length == 10);
         * ```
         */
        function filter(f: (i: UiObject) => boolean): UiSelector;
    }

    // TODO: 补全常用属性
    /**
     * @description: 更多信息参见 [AccessibilityWindowInfo]
     * 
     * [AccessibilityWindowInfo]: https://www.apiref.com/android-zh/android/view/accessibility/AccessibilityWindowInfo.html
     */
    interface AccessibilityWindowInfo {
        [prop: string]: any;
    }

    type Flags = 'findOnUiThread' | 'useUsageStats' | 'useShell';

    type CommonClassName = (
        'TextView' |
        'ImageView' |
        'Button' |
        'EditText' |
        'AbsListView' |
        'LinearLayout' |
        'FrameLayout' |
        'RelativeLayout' |
        'android.support.v7.widget.RecyclerView'
    );
}