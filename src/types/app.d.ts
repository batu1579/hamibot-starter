/*
 * @Author: BATU1579
 * @CreateDate: 2022-05-25 00:20:15
 * @LastEditor: BATU1579
 * @LastTime: 2022-05-25 18:21:22
 * @FilePath: \\src\\types\\app.d.ts
 * @Description: app 模块
 */
interface EmailOptions {
    /**
     * @description: 收件人的邮件地址。如果有多个收件人，则用字符串数组表示
     */
    email?: string | string[];

    /**
     * @description: 抄送收件人的邮件地址。如果有多个抄送收件人，则用字符串数组表示
     */
    cc?: string | string[];

    /**
     * @description: 密送收件人的邮件地址。如果有多个密送收件人，则用字符串数组表示
     */
    bcc?: string | string[];

    /**
     * @description: 邮件主题(标题)
     */
    subject?: string;

    /**
     * @description: 邮件正文
     */
    text?: string;

    /**
     * @description: 附件的路径
     */
    attachments?: string;
}

interface IntentOptions {
    /**
     * @description: 意图的 `Action` ，指意图要完成的动作，是一个字符串常量。当 `action` 以 `android.intent.action` 开头时，可以省略前缀，直接用 `SEND` 代替。参见[Action](https://developer.android.com/reference/android/content/Intent.html#standard-activity-actions)
     * @example: "android.intent.action.SEND"
     */
    action?: string;

    /**
     * @description: 意图的 `MimeType` ，表示和该意图直接相关的数据的类型。比如 `text/plain` 为纯文本类型。
     * @example: "text/plain"
     */
    type?: string;

    /**
     * @description: 意图的 `Data` ，表示和该意图直接相关的数据，是一个 `Uri` , 可以是文件路径或者 `Url` 等。例如要打开一个文件, `action` 为 `android.intent.action.VIEW` , data 为 `file:///sdcard/1.txt` 。
     * @example: "file:///sdcard/1.txt"
     */
    data?: string;

    /**
     * @description: 意图的类别。参见 [Categories](https://developer.android.com/reference/android/content/Intent.html#standard-categories)。
     */
    category?: string[];

    /**
     * @description: 目标包名
     */
    packageName?: string;

    /**
     * @description: 目标 `Activity` 或 `Service` 等组件的名称
     */
    className?: string;

    /**
     * @description: 以键值对构成的这个 `Intent` 的额外信息。提供该意图的其他信息，例如发送邮件时的邮件标题、邮件正文。参见 [Extras](https://developer.android.com/reference/android/content/Intent.html#standard-extra-data)。
     */
    extras?: object;

    /**
     * @description: `Intent` 的标识，字符串数组，例如: ["activity_new_task", "grant_read_uri_permission"] 。参见 [Flags](https://developer.android.com/reference/android/content/Intent.html#setFlags%28int%29)。
     */
    flags?: string[];

    /**
     * @description: 是否以 `root` 权限启动、发送该 `Intent`。使用该参数后，不能使用 `context.startActivity()` 等方法，而应该直接使用诸如 `app.startActivity({...})` 的方法。
     */
    root?: boolean;
}

// TODO: 补全PackageInfo的定义
interface PackageInfo {

}

/**
 * @description: Uri对象的详细信息参见 [android.net.Uri](https://developer.android.com/reference/android/net/Uri)
 */
declare class Uri {
    /**
     * @description: 从颁发机构获取此URI的主机。例如，如果为 `bob@google.com` ，此方法将返回 `google.com` 。
     * @return {string | null} 此URI的主机，如果不存在，则为 `null` 。
     */
    getHost(): string | null;

    /**
     * @description: 获取解码路径。
     * @return {string | null} 解码路径，如果这不是分层 URI（如 `mailto:nobody@google.com` ）或 URI 无效，则为 `null` 。
     */
    getPath(): string | null;

    /**
     * @description: 从此 URI 的颁发机构获取端口。例如，如果权限为 `google.com:80` ，则此方法将返回 80。
     * @return {number} 此 URI 的端口，如果无效或不存在，则为 -1
     */
    getPort(): number;

    /**
     * @description: 从此 URI 获取已解码的查询组件。查询位于查询分隔符 （`？`） 之后，片段分隔符 （`#`） 之前。此方法将返回`http://www.google.com/search?q=android` 中的 `q=android`。
     * @return {string | null} 已解码的查询，如果没有，则为null
     */
    getQuery(): string | null;

    /**
     * @description: 使用给定键在查询字符串中搜索参数值
     * @param {string} key 要查找的键值对
     * @return {string[]} 解码值列表
     */
    getQueryParameters(key: string): string[];
}

declare namespace app {
    /**
     * @description: 当前软件版本号。
     * @example: 100
     */
    let versionCode: number;

    /**
     * @description: 当前软件的版本名称。
     * @example: 1.0.2
     */
    let versionName: string;

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
    function launchApp(appName: string): boolean;

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
    function launch(packageName: string): boolean;

    /**
     * @description: 通过应用包名启动应用。
     * @param {string} packageName 应用包名
     * @return {boolean} 如果该包名对应的应用不存在，则返回 false；否则返回 true。
     * @example:
     * ```typescript
     * // 启动 Hamibot
     * app.launchPackage('com.hamibot.hamibot');
     * ```
     */
    function launchPackage(packageName: string): boolean;

    /**
     * @description: 获取应用名称对应的已安装的应用的包名。
     * @param {string} appName 应用名称
     * @return {string | null} 如果该找不到该应用，返回 null；如果该名称对应多个应用，则只返回其中某一个的包名。
     * @example: 
     * ```typescript
     * var name = app.getPackageName('Hamibot'); // 返回 com.hamibot.hamibot
     * ```
     */
    function getPackageName(appName: string): string | null;

    /**
     * @description: 获取应用包名对应的已安装的应用的名称。
     * @param {string} packageName
     * @return {string | null} 应用的名称，如果该找不到该应用，返回 null。
     * @example: 
     * ```typescript
     * var name = app.getAppName('com.hamibot.hamibot'); // 返回 Hamibot
     * ```
     */
    function getAppName(packageName: string): string | null;

    /**
     * @description: 获取指定应用的详细信息。
     * @param {string} packageName 	应用包名
     * @return {PackageInfo} 应用信息
     * @version 1.4.0
     */
    function getPackageInfo(packageName: string): PackageInfo;

    /**
     * @description: 获取所有已安装的应用包信息。
     * @return {PackageInfo[]} 应用包信息数组
     * @version 1.4.0
     */
    function getInstalledPackages(): PackageInfo[];

    /**
     * @description: 获取所有已安装的应用信息。
     * @return {PackageInfo[]} 应用信息数组
     * @version 1.4.0
     */
    function getInstalledApps(): PackageInfo[];

    /**
     * @description: 获取指定 APK 文件的详细信息。
     * @param {string} path APK 文件路径
     * @return {PackageInfo} APK 文件的详细信息
     * @version 1.4.0
     * @example: 
    ```typescript
    log(app.getApkInfo('/storage/emulated/0/com.hamibot.hamibot.apk'));
    hamibot.exit();
    ```
     */
    function getApkInfo(path: string): PackageInfo;

    /**
     * @description: 打开应用的详情页(设置页)。
     * @param {string} packageName 应用包名
     * @return {boolean} 如果找不到该应用，返回 false; 否则返回 true。
     */
    function openAppSetting(packageName: string): boolean;

    /**
     * @description: 用其他应用查看文件。文件不存在的情况由查看文件的应用处理。如果找不出可以查看该文件的应用，则抛出 `ActivityNotException` 。
     * @param {string} path 文件路径
     * @return {void}
     * @example: 
     * ```typescript
     * // 查看文本文件
     * app.viewFile('/sdcard/1.txt');
     * ```
     */
    function viewFile(path: string): void;

    /**
     * @description: 用其他应用编辑文件。文件不存在的情况由编辑文件的应用处理。如果找不出可以编辑该文件的应用，则抛出`ActivityNotException` 。
     * @param {string} path 文件路径
     * @return {void}
     */
    function editFile(path: string): void;

    /**
     * @description: 卸载应用。执行后会会弹出卸载应用的提示框。如果该包名的应用未安装，由应用卸载程序处理，可能弹出"未找到应用"的提示。
     * @param {string} packageName 应用包名
     * @return {void}
     * @example: 
     * ```typescript
     * // 卸载 QQ
     * app.uninstall('com.tencent.mobileqq');
     * ```
     */
    function uninstall(packageName: string): void;

    /**
     * @description: 用浏览器打开网站 url。如果没有安装浏览器应用，则抛出 `ActivityNotException` 。
     * @param {string} url 网站的 Url，如果不以"http://"或"https://"开头则默认是"http://"。
     * @return {void}
     */
    function openUrl(url: string): void;

    /**
     * @description: 根据选项 options 调用邮箱应用发送邮件。这些选项均是可选的。如果没有安装邮箱应用，则抛出`ActivityNotException` 。
     * @param {EmailOptions} option 发送邮件的参数。
     * @return {void}
     * @example: 
    ``` typescript
    // 发送邮件给 hamibot@example.com
    app.sendEmail({
    email: ['hamibot@example.com'],
    subject: '这是一个邮件标题',
    text: '这是邮件正文',
    });
    ```
     */
    function sendEmail(option: EmailOptions): void;

    /**
     * @description: 启动 Hamibot 的特定界面。
     * @param {string} name 活动名称，可选的值为:
     *      - `console` 日志界面
     * @return {void}
     * @example: 
     * ```typescript
     * app.startActivity('console');
     * ```
     */
    function startActivity(name: string): void;

    /**
     * @description: 根据选项，构造一个意图 `Intent` 对象。需要注意的是，除非应用专门暴露 `Activity` 出来，否则在没有 `root` 权限的情况下使用 `Intent` 是无法跳转到特定 `Activity` 、应用的特定界面的。例如我们能通过 `Intent` 跳转到QQ的分享界面，是因为QQ对外暴露了分享的 `Activity` ；而在没有 `root` 权限的情况下，我们无法通过 `Intent` 跳转到QQ的设置界面，因为QQ并没有暴露这个 `Activity` 。更多信息，参见 [Intent](https://developer.android.com/guide/components/intents-filters.html#Types)
     * @param {IntentOptions} options 意图选项
     * @return {void}
     * @example: 
     * ```typescript
     * //打开应用来查看图片文件
     * var i = app.intent({
     *     action: 'VIEW',
     *     type: 'image/png',
     *     data: 'file:///sdcard/1.png',
     * });
     * context.startActivity(i);
     * ```
     */
    function intent(options: IntentOptions): void;

    /**
     * @description: 根据选项构造一个 `Intent` ，并启动该 `Activity` 。
     * @param {IntentOptions} options 意图选项
     * @return {void}
     * @example: 
     * ```typescript
     * app.startActivity({
     *     action: 'SEND',
     *     type: 'text/plain',
     *     data: 'file:///sdcard/1.txt',
     * });
     * ```
     */
    function startActivity(options: IntentOptions): void;

    /**
     * @description: 根据选项构造一个 `Intent` ，并启动该服务。
     * @param {IntentOptions} options 意图选项
     * @return {void}
     */
    function startService(options: IntentOptions): void;

    /**
     * @description: 根据选项构造一个 `Intent` ，并发送该广播。
     * @param {IntentOptions} options 意图选项
     * @return {void}
     */
    function sendBroadcast(options: IntentOptions): void;

    /**
     * @description: 发送特定名称的广播可以触发 Hamibot 的布局分析，方便脚本调试。
     * @param {string} name 特定的广播名称，包括：
     *      - inspect_layout_hierarchy 布局层次分析
     *      - inspect_layout_bounds 布局范围
     * @return {void}
     * @example: 
     * ```typescript
     * app.sendBroadcast('inspect_layout_bounds');
     * ```
     */
    function sendBroadcast(name: string): void;

    /**
     * @description: 根据选项构造一个 `Intent` ，转换为对应的 `shell` 的 `Intent` 命令的参数。
     * @param {IntentOptions} options 意图选项
     * @return {string} `Intent` 命令参数字符串
     * @example: 
     * ```typescript
     * shell(
     *     'am start ' + app.intentToShell({
     *         packageName: 'com.hamibot.hamibot',
     *         className: 'com.hamibot.hamibot.ui.log.LogActivity_',
     *     }),
     *     true
     * );
     * ```
     */
    function intentToShell(options: IntentOptions): string;

    /**
     * @description: 解析 uri 字符串并返回相应的 `Uri` 对象。即使 `Uri` 格式错误，该函数也会返回一个 `Uri` 对象。需要注意的是，在高版本 Android 上，由于系统限制直接在 `Uri` 暴露文件的绝对路径，因此如果 uri 字符串是文件 `file://...` ，返回的 Uri 会是诸如 `content://...` 的形式。
     * @param {string} uri 一个代表 `Uri` 的字符串，例如 `file:///sdcard/1.txt` 或者 `https://hamibot.com`
     * @return {Uri} 解析的 `Uri` 对象，但如果访问该对象的 scheme, path 等值可能因解析失败而返回 `null` 。
     */
    function parseUri(uri: string): Uri;

    /**
     * @description: 从一个文件路径创建一个 `Uri` 对象。需要注意的是，在高版本 Android 上，由于系统限制直接在 `Uri` 暴露文件的绝对路径，因此返回的 `Uri` 会是诸如 `content://...` 的形式。
     * @param {string} path 文件路径，例如"/sdcard/1.txt"
     * @return {Uri} 指向该文件的 Uri 的对象。
     */
    function getUriForFile(path: string): Uri;
}
