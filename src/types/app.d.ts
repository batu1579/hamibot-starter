/*
 * @Author: BATU1579
 * @CreateDate: 2022-05-25 00:20:15
 * @LastEditor: BATU1579
 * @LastTime: 2022-09-11 10:23:59
 * @FilePath: \\src\\types\\app.d.ts
 * @Description: app 模块
 */
declare module 'app' {
    import { Long } from 'threads';

    global {
        /**
         * @description: `app` 模块提供一系列函数，用于使用其他应用、与其他应用交互。例如发送意图、打开文件、发送邮件等。
        
        同时提供了方便的进阶函数 `startActivity` 和 `sendBroadcast`，用他们可完成 `app` 模块没有内置的和其他应用的交互。
         */
        const app: App;

        // 声明全局函数

        /**
         * @description: 通过应用名称启动应用。如果该名称对应多个应用，则只启动其中某一个。
         * @param {string} appName 应用名称。
         * @return {boolean} 如果该名称对应的应用不存在，则返回 false; 否则返回 true。
         * @example
         * ```typescript
         * // 启动 Hamibot
         * app.launchApp('Hamibot');
         * ```
         */
        function launchApp(appName: string): boolean;

        /**
         * @description: 通过应用包名启动应用。
         * @param {string} packageName 应用包名。
         * @return {boolean} 如果该包名对应的应用不存在，则返回 false；否则返回 true。
         * @example
         * ```typescript
         * // 启动 Hamibot
         * app.launch('com.hamibot.hamibot');
         * ```
         */
        function launch(packageName: string): boolean;

        /**
         * @description: 通过应用包名启动应用。
         * @param {string} packageName 应用包名。
         * @return {boolean} 如果该包名对应的应用不存在，则返回 false；否则返回 true。
         * @example
         * ```typescript
         * // 启动 Hamibot
         * launchPackage('com.hamibot.hamibot');
         * ```
         */
        function launchPackage(packageName: string): boolean;

        /**
         * @description: 获取应用名称对应的已安装的应用的包名。
         * @param {string} appName 应用名称。
         * @return {string | null} 如果该找不到该应用，返回 null；如果该名称对应多个应用，则只返回其中某一个的包名。
         * @example
         * ```typescript
         * let name = app.getPackageName('Hamibot'); // 返回 com.hamibot.hamibot
         * ```
         */
        function getPackageName(appName: string): string | null;

        /**
         * @description: 获取应用包名对应的已安装的应用的名称。
         * @param {string} packageName。
         * @return {string | null} 应用的名称，如果该找不到该应用，返回 null。
         * @example
         * ```typescript
         * let name = app.getAppName('com.hamibot.hamibot'); // 返回 Hamibot
         * ```
         */
        function getAppName(packageName: string): string | null;

        /**
         * @description: 打开应用的详情页（设置页）。
         * @param {string} packageName 应用包名。
         * @return {boolean} 如果找不到该应用，返回 false; 否则返回 true。
         */
        function openAppSetting(packageName: string): boolean;
    }

    interface App {
        /**
         * @description: 当前软件版本号。
         * @example 100
         */
        readonly versionCode: number;

        /**
         * @description: 当前软件的版本名称。
         * @example '1.0.2'
         */
        readonly versionName: string;

        /**
         * @description: 通过应用名称启动应用。如果该名称对应多个应用，则只启动其中某一个。
         * @param {string} appName 应用名称。
         * @return {boolean} 如果该名称对应的应用不存在，则返回 `false` ; 否则返回 `true` 。
         * @example
         * ```typescript
         * // 启动 Hamibot
         * app.launchApp('Hamibot');
         * ```
         */
        launchApp(appName: string): boolean;

        /**
         * @description: 通过应用包名启动应用。
         * @param {string} packageName 应用包名。
         * @return {boolean} 如果该包名对应的应用不存在，则返回 `false` ；否则返回 `true` 。
         * @example
         * ```typescript
         * // 启动 Hamibot
         * app.launch('com.hamibot.hamibot');
         * ```
         */
        launch(packageName: string): boolean;

        /**
         * @description: 通过应用包名启动应用。
         * @param {string} packageName 应用包名。
         * @return {boolean} 如果该包名对应的应用不存在，则返回 `false` ；否则返回 `true` 。
         * @example
         * ```typescript
         * // 启动 Hamibot
         * app.launchPackage('com.hamibot.hamibot');
         * ```
         */
        launchPackage(packageName: string): boolean;

        /**
         * @description: 获取应用名称对应的已安装的应用的包名。
         * @param {string} appName 应用名称。
         * @return {string | null} 如果该找不到该应用，返回 `null` ；如果该名称对应多个应用，则只返回其中某一个的包名。
         * @example
         * ```typescript
         * let name = app.getPackageName('Hamibot'); // 返回 com.hamibot.hamibot
         * ```
         */
        getPackageName(appName: string): string | null;

        /**
         * @description: 获取应用包名对应的已安装的应用的名称。
         * @param {string} packageName。
         * @return {string | null} 应用的名称，如果该找不到该应用，返回 `null` 。
         * @example
         * ```typescript
         * let name = app.getAppName('com.hamibot.hamibot'); // 返回 Hamibot
         * ```
         */
        getAppName(packageName: string): string | null;

        /**
         * @description: 获取指定应用的详细信息。
         * @param {string} packageName 	应用包名。
         * @return {PackageInfo} 应用信息。
         * @since 1.4.0
         */
        getPackageInfo(packageName: string): PackageInfo;

        /**
         * @description: 获取所有已安装的应用包信息。
         * @return {array} 应用包信息数组。
         * @since 1.4.0
         */
        getInstalledPackages(): PackageInfo[];

        /**
         * @description: 获取所有已安装的应用信息。
         * @return {array} 应用信息数组。
         * @since 1.4.0
         */
        getInstalledApps(): PackageInfo[];

        /**
         * @description: 获取指定 APK 文件的详细信息。
         * @param {string} path APK 文件路径。
         * @return {PackageInfo} APK 文件的详细信息。
         * @since 1.4.0
         * @example
         * ```typescript
         * log(app.getApkInfo('/storage/emulated/0/com.hamibot.hamibot.apk'));
         * hamibot.exit();
         * ```
         */
        getApkInfo(path: string): PackageInfo;

        /**
         * @description: 打开应用的详情页（设置页）。
         * @param {string} packageName 应用包名。
         * @return {boolean} 如果找不到该应用，返回 `false` ; 否则返回 `true` 。
         */
        openAppSetting(packageName: string): boolean;

        /**
         * @description: 用其他应用查看文件。文件不存在的情况由查看文件的应用处理。如果找不出可以查看该文件的应用，则抛出 `ActivityNotException` 。
         * @param {string} path 文件路径。
         * @example
         * ```typescript
         * // 查看文本文件
         * app.viewFile('/sdcard/1.txt');
         * ```
         */
        viewFile(path: string): void;

        /**
         * @description: 用其他应用编辑文件。文件不存在的情况由编辑文件的应用处理。如果找不出可以编辑该文件的应用，则抛出`ActivityNotException` 。
         * @param {string} path 文件路径。
         */
        editFile(path: string): void;

        /**
         * @description: 卸载应用。执行后会会弹出卸载应用的提示框。如果该包名的应用未安装，由应用卸载程序处理，可能弹出'未找到应用'的提示。
         * @param {string} packageName 应用包名。
         * @example
         * ```typescript
         * // 卸载 QQ
         * app.uninstall('com.tencent.mobileqq');
         * ```
         */
        uninstall(packageName: string): void;

        /**
         * @description: 用浏览器打开网站 url。如果没有安装浏览器应用，则抛出 `ActivityNotException` 。
         * @param {string} url 网站的 Url，如果不以'http://'或'https://'开头则默认是'http://'。
         */
        openUrl(url: string): void;

        /**
         * @description: 根据选项 options 调用邮箱应用发送邮件。这些选项均是可选的。如果没有安装邮箱应用，则抛出`ActivityNotException` 。
         * @param {EmailOptions} option 发送邮件的参数。
         * @example
         * ``` typescript
         * // 发送邮件给 hamibot@example.com
         * app.sendEmail({
         *     email: ['hamibot@example.com'],
         *     subject: '这是一个邮件标题',
         *     text: '这是邮件正文',
         * });
         * ```
         */
        sendEmail(option: EmailOptions): void;

        /**
         * @description: 启动 Hamibot 的特定界面。
         * @param {string} name 活动名称，可选的值为:
         * 
         * - `console` - 日志界面
         * 
         * @example
         * ```typescript
         * app.startActivity('console');
         * ```
         */
        startActivity(name: string): void;

        /**
         * @description: 根据选项，构造一个意图 `Intent` 对象。需要注意的是，除非应用专门暴露 `Activity` 出来，否则在没有 `root` 权限的情况下使用 `Intent` 是无法跳转到特定 `Activity` 、应用的特定界面的。例如我们能通过 `Intent` 跳转到QQ的分享界面，是因为QQ对外暴露了分享的 `Activity` ；而在没有 `root` 权限的情况下，我们无法通过 `Intent` 跳转到QQ的设置界面，因为QQ并没有暴露这个 `Activity` 。更多信息，参见 [Intent] 。
         * 
         * [Intent]: https://developer.android.com/guide/components/intents-filters.html#Types
         * @param {IntentOptions} options 意图选项。
         * @example
         * ```typescript
         * // 打开应用来查看图片文件
         * let i = app.intent({
         *     action: 'VIEW',
         *     type: 'image/png',
         *     data: 'file:///sdcard/1.png',
         * });
         * context.startActivity(i);
         * ```
         */
        intent(options: IntentOptions): void;

        /**
         * @description: 根据选项构造一个 `Intent` ，并启动该 `Activity` 。
         * @param {IntentOptions} options 意图选项。
         * @example
         * ```typescript
         * app.startActivity({
         *     action: 'SEND',
         *     type: 'text/plain',
         *     data: 'file:///sdcard/1.txt',
         * });
         * ```
         */
        startActivity(options: IntentOptions): void;

        /**
         * @description: 根据选项构造一个 `Intent` ，并启动该服务。
         * @param {IntentOptions} options 意图选项。
         */
        startService(options: IntentOptions): void;

        /**
         * @description: 根据选项构造一个 `Intent` ，并发送该广播。
         * @param {IntentOptions} options 意图选项。
         */
        sendBroadcast(options: IntentOptions): void;

        /**
         * @description: 发送特定名称的广播可以触发 Hamibot 的布局分析，方便脚本调试。
         * @param {string} name 特定的广播名称，包括：。
         *      - inspect_layout_hierarchy 布局层次分析
         *      - inspect_layout_bounds 布局范围
         * @example
         * ```typescript
         * app.sendBroadcast('inspect_layout_bounds');
         * ```
         */
        sendBroadcast(name: string): void;

        /**
         * @description: 根据选项构造一个 `Intent` ，转换为对应的 `shell` 的 `Intent` 命令的参数。
         * @param {IntentOptions} options 意图选项。
         * @return {string} `Intent` 命令参数字符串。
         * @example
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
        intentToShell(options: IntentOptions): string;

        /**
         * @description: 解析 uri 字符串并返回相应的 `Uri` 对象。即使 `Uri` 格式错误，该函数也会返回一个 `Uri` 对象。需要注意的是，在高版本 Android 上，由于系统限制直接在 `Uri` 暴露文件的绝对路径，因此如果 uri 字符串是文件 `file://...` ，返回的 Uri 会是诸如 `content://...` 的形式。
         * @param {string} uri 一个代表 `Uri` 的字符串，例如 `file:///sdcard/1.txt` 或者 `https://hamibot.com`。
         * @return {Uri | null} 解析的 `Uri` 对象，但如果访问该对象的 scheme, path 等值可能因解析失败而返回 `null` 。
         */
        parseUri(uri: string): Uri | null;

        /**
         * @description: 从一个文件路径创建一个 `Uri` 对象。需要注意的是，在高版本 Android 上，由于系统限制直接在 `Uri` 暴露文件的绝对路径，因此返回的 `Uri` 会是诸如 `content://...` 的形式。
         * @param {string} path 文件路径，例如'/sdcard/1.txt'。
         * @return {Uri} 指向该文件的 Uri 的对象。
         */
        getUriForFile(path: string): Uri;
    }

    interface EmailOptions {
        /**
         * @description: 收件人的邮件地址。如果有多个收件人，则用字符串数组表示。
         */
        email?: string | string[];

        /**
         * @description: 抄送收件人的邮件地址。如果有多个抄送收件人，则用字符串数组表示。
         */
        cc?: string | string[];

        /**
         * @description: 密送收件人的邮件地址。如果有多个密送收件人，则用字符串数组表示。
         */
        bcc?: string | string[];

        /**
         * @description: 邮件主题（标题）。
         */
        subject?: string;

        /**
         * @description: 邮件正文。
         */
        text?: string;

        /**
         * @description: 附件的路径。
         */
        attachments?: string;
    }

    interface IntentOptions {
        /**
         * @description: 意图的 `Action` ，指意图要完成的动作，是一个字符串常量。当 `action` 以 `android.intent.action` 开头时，可以省略前缀，直接用 `SEND` 代替。参见[Action] 。
         * 
         * [Action]: https://developer.android.com/reference/android/content/Intent.html#standard-activity-actions
         * @example 'android.intent.action.SEND'
         */
        action?: string;

        /**
         * @description: 意图的 `MimeType` ，表示和该意图直接相关的数据的类型。比如 `text/plain` 为纯文本类型。
         * @example 'text/plain'
         */
        type?: string;

        /**
         * @description: 意图的 `Data` ，表示和该意图直接相关的数据，是一个 `Uri` , 可以是文件路径或者 `Url` 等。例如要打开一个文件, `action` 为 `android.intent.action.VIEW` , data 为 `file:///sdcard/1.txt` 。
         * @example 'file:///sdcard/1.txt'
         */
        data?: string;

        /**
         * @description: 意图的类别。参见 [Categories] 。
         * 
         * [Categories]: https://developer.android.com/reference/android/content/Intent.html#standard-categories
         */
        category?: string[];

        /**
         * @description: 目标包名。
         */
        packageName?: string;

        /**
         * @description: 目标 `Activity` 或 `Service` 等组件的名称。
         */
        className?: string;

        /**
         * @description: 以键值对构成的这个 `Intent` 的额外信息。提供该意图的其他信息，例如发送邮件时的邮件标题、邮件正文。参见 [Extras] 。
         * 
         * [Extras]: https://developer.android.com/reference/android/content/Intent.html#standard-extra-data
         */
        extras?: object;

        /**
         * @description: `Intent` 的标识，字符串数组，例如: `['activity_new_task', 'grant_read_uri_permission']` 。参见 [Flags] 。
         * 
         * [Flags]: https://developer.android.com/reference/android/content/Intent.html#setFlags%28int%29
         */
        flags?: string[];

        /**
         * @description: 是否以 `root` 权限启动、发送该 `Intent`。使用该参数后，不能使用 `context.startActivity()` 等方法，而应该直接使用诸如 `app.startActivity({...})` 的方法。
         */
        root?: boolean;
    }

    class PackageInfo {
        /**
         * @description: 包含 <application> 下包含的所有 <activity> 标记的数组，如果没有，则为 `null` 。
         */
        readonly activities: ActivityInfo[] | null;

        /**
         * @description: 从<application>标记收集的信息，如果没有则为null。
         */
        readonly applicationInfo: ApplicationInfo | null;

        /**
         * @description: 此包的基本APK的修订版号，由 <manifest> 标记的 revisionCode 属性指定。
         */
        readonly baseRevisionCode: number;

        /**
         * @description: Application指定的首选配置 <uses-configuration> <manifest> 下包含的标签，如果没有，则为 `null` 。
         */
        readonly configPreferences: ConfigurationInfo[] | null;

        /**
         * @description: 此应用程序请求的功能组。 每个组都包含一组必需的功能。 设备必须与 reqFeatures 列出的功能以及一个或多个功能组匹配才能满足功能要求。
         */
        readonly featureGroups: FeatureGroupInfo[];

        /**
         * @description: 应用程序首次安装的时间，单位毫秒。
         */
        readonly firstInstallTime: Long;

        /**
         * @description: 所有已分配给此包的内核组标识。 只有在标志 GET_GIDS 被设置的情况下才会填写。
         */
        readonly gids: number[];

        /**
         * @description: 包所请求的安装位置。
         */
        readonly installLocation: number;

        /**
         * @description: 包含 <manifest> 下包含的所有 <instrumentation> 标记的数组，如果没有，则为 `null` 。 只有在标志 GET_INSTRUMENTATION 被设置时才会填写。
         */
        readonly instrumentation: InstrumentationInfo[] | null;

        /**
         * @description: 该应用上次更新的时间，单位毫秒。
         */
        readonly lastUpdateTime: Long;

        /**
         * @description: 这个包的名字。 来自 <manifest> 标签的 `name` 属性。
         */
        readonly PackageName: string;

        /**
         * @description: 包含 <manifest> 下包含的所有 <permission> 标记的数组，如果没有，则为 `null` 。 只有在标志 GET_PERMISSIONS 已设置时才会填充 GET_PERMISSIONS 。
         */
        readonly permissions: PermissionInfo[] | null;

        /**
         * @description: 包含 <application> 下包含的所有 <provider> 标记的数组，如果没有，则为 `null` 。 只有在标志 GET_PROVIDERS 已设置时才会填充 GET_PROVIDERS 。
         */
        readonly providers: ProviderInfo[] | null;

        /**
         * @description: 包含 <application> 下包含的所有 <receiver> 标记的数组，如果没有，则为 `null` 。 只有在标志 GET_RECEIVERS 被设置的情况下才会填写。
         */
        readonly receivers: ActivityInfo[] | null;

        /**
         * @description: 此应用程序要求的功能。
         */
        readonly reqFeatures: FeatureInfo[];

        /**
         * @description: 包含 <manifest> 下包含的所有 <uses-permission> 标记的数组，如果没有，则为 `null` 。 只有在标志 GET_PERMISSIONS 被设置的情况下才会填写。 此列表包含所有请求的权限，即使是在安装时系统未授权或未知的权限。
         */
        readonly requestedPermissions: string[] | null;

        /**
         * @description:  <manifest> 下包含的所有 <uses-permission> 标记的标记数组，如果没有，则为 `null` 。 这仅在标志 GET_PERMISSIONS 已设置时填充。 每个值都与 `requestedPermissions` 中的相应条目相匹配，并将根据 REQUESTED_PERMISSION_GRANTED 设置标志 REQUESTED_PERMISSION_GRANTED 。
         */
        readonly requesterPermissionsFlags: number[] | null;

        /**
         * @description: 包含 <application> 下包含的所有 <service> 标记的数组，如果没有，则为 `null` 。 只有在设置了标志 GET_SERVICES 时才会填写。
         */
        readonly services: ServiceInfo[] | null;

        /**
         * @description: 此包的共享用户标识名称，由 <manifest> 标记的 sharedUserId 属性指定。
         */
        readonly sharedUserId: string;

        /**
         * @description: 此包的共享用户标识标签，由 <manifest> 标记的 sharedUserLabel 属性指定。
         */
        readonly SharedUserLabel: number;

        /**
         * @description: 从包文件中读取所有签名的数组。 这只在标志 GET_SIGNATURES 被设置时填充。
         */
        readonly signatures: Signature[];

        /**
         * @description: 此软件包的所有已安装拆分APK的名称。
         */
        readonly splitNames: string[];

        /**
         * @description: 此包的任何拆分APK的修订版号，由 <manifest> 标记的 revisionCode 属性指定。 索引是针对 `splitNames` 的1：1映射。
         */
        readonly splitRevisionCode: number[];

        /**
         * @description: 此包的版本号，由 <manifest> 标记的 versionCode 属性指定。
         */
        readonly versionCode: number;

        /**
         * @description: 此包的版本名称，由 <manifest> 标记的 versionName 属性指定。
         */
        readonly versionName: string;

        [prop: string]: any;
    }

    class ActivityInfo {
        /**
         * @description: 此活动可以自行处理的配置更改种类的位掩码（不由系统重新启动）。
         */
        readonly configChanges: number;

        /**
         * @description: 活动请求的文档启动模式样式。
         */
        readonly documentLaunchMode: number;

        /**
         * @description: 在清单中的活动声明中设置的选项。
         */
        readonly flags: number;

        /**
         * @description: 活动请求的启动模式样式。
         */
        readonly launchMode: number;

        /**
         * @description: 根植于此活动的最大任务数量可以在最近的任务列表中。
         */
        readonly maxRecents: number;

        /**
         * @description: 如果已定义，则此处命名的活动是此活动的逻辑父项。
         */
        readonly parentActivityName: string;

        /**
         * @description: 为了能够访问此活动所需的权限的可选名称。
         */
        readonly permission: string;

        /**
         * @description: 指示如何在重新启动时持续保留此活动以便在“最近”列表中进行还原的值。
         */
        readonly persistableMode: number;

        /**
         * @description: 此活动希望运行的首选屏幕方向。
         */
        readonly screenOrientation: number;

        /**
         * @description: 该活动主窗口所需的软输入模式。
         */
        readonly softInputMode: number;

        /**
         * @description: 如果这是一个活动别名，这是真正的活动类为它运行。
         */
        readonly targetActivity: string;

        /**
         * @description: 此活动对系统中的其他任务具有亲和力。
         */
        readonly taskAffinity: string;

        /**
         * @description: 此活动主题的样式资源标识符（位于程序包的资源中）。
         */
        readonly theme: number;

        /**
         * @description: 此活动及其主窗口所需的额外UI选项。
         */
        readonly uiOptions: number;

        [prop: string]: any;
    }

    class ApplicationInfo {
        /**
         * @description: 实现应用程序备份功能的类。
         */
        readonly backupAgentName: string;

        /**
         * @description: 实现Application对象的类。
         */
        readonly className: string;

        /**
         * @description: 应用程序设计的最小屏幕宽度。
         */
        readonly compatibleWidthLimitDp: number;

        /**
         * @description: 完整路径分配给包的持久数据的默认目录。
         */
        readonly dataDir: string;

        /**
         * @description: 应用程序描述的样式资源标识符（位于程序包的资源中）。
         */
        readonly descriptionRes: number;

        /**
         * @description: 设备保护目录的完整路径，分配给软件包的永久数据。
         */
        readonly deviceProtectedDataDir: string;

        /**
         * @description: 如果为false，则表示此应用程序中的所有组件均被视为已禁用，无论其单独设置为启用状态。
         */
        readonly enabled: boolean;

        /**
         * @description: 与应用程序关联的标志。
         */
        readonly flags: number;

        /**
         * @description: 应用程序将使用的最小屏幕宽度。
         */
        readonly largestWidthLimitDp: number;

        /**
         * @description: 实现应用程序管理空间功能的类。
         */
        readonly manageSpaceActivityName: string;

        /**
         * @description: 此应用程序可以运行的最低SDK版本。
         */
        readonly minSdkVersion: number;

        /**
         * @description: 存储本机JNI库的目录的完整路径。
         */
        readonly nativeLibraryDir: string;

        /**
         * @description: 为了能够访问这个应用程序的组件所需的权限的可选名称。
         */
        readonly permission: string;

        /**
         * @description: 这个应用程序应该运行的进程的名称。
         */
        readonly processName: string;

        /**
         * @description: 公共可用部分 sourceDir完整路径，包括资源和清单。
         */
        readonly publicSourceDir: string;

        /**
         * @description: 应用程序可以运行所需的最小屏幕宽度。
         */
        readonly requiresSmallestWidthDp: number;

        /**
         * @description: 与此应用程序链接的所有共享库的路径。
         */
        readonly sharedLibraryFiles: string[];

        /**
         * @description: 适用于此应用程序的基本APK的完整路径。
         */
        readonly sourceDir: string;

        /**
         * @description: 公开可用部分 splitSourceDirs完整路径，包括资源和清单。
         */
        readonly splitPublicSourceDirs: string[];

        /**
         * @description: 完整路径为零个或多个拆分APK，当与 sourceDir定义的基本APK结合时，形成一个完整的应用程序。
         */
        readonly splitSourceDirs: string[];

        /**
         * @description: 此应用程序的最低SDK版本。
         */
        readonly targetSdkVersion: number;

        /**
         * @description: 此应用程序中所有活动的默认任务关联。
         */
        readonly taskAffinity: string;

        /**
         * @description: 应用程序的默认视觉主题的样式资源标识符（位于程序包的资源中）。
         */
        readonly theme: number;

        /**
         * @description: 此应用程序中活动的默认额外UI选项。
         */
        readonly uiOptions: number;

        /**
         * @description: 已分配给此应用程序的内核用户标识; 目前这不是一个唯一的ID（多个应用程序可以具有相同的uid）。
         */
        readonly uid: number;

        [prop: string]: any;
    }

    class ConfigurationInfo {
        /**
         * @description: 应用程序使用的GLES版本。
         */
        readonly reqGlEsVersion: number;

        /**
         * @description: 与输入要素关联的标志。
         */
        readonly reqInputFeatures: number;

        /**
         * @description: 应用程序的输入法偏好。
         */
        readonly reqKeyboardType: number;

        /**
         * @description: 一个标志，指示是否有任何键盘可用。
         */
        readonly reqNavigation: number;

        /**
         * @description: 这种触摸屏连接到设备。
         */
        readonly reqTouchScreen: number;

        [prop: string]: any;
    }

    class FeatureGroupInfo {
        /**
         * @description: 该组所需的功能列表。
         */
        readonly features: FeatureInfo[];

        [prop: string]: any;
    }

    class InstrumentationInfo {
        /**
         * @description: 完整路径分配给包的持久性数据的目录。
         */
        readonly dataDir: string;

        /**
         * @description: 指定是否将此工具作为功能测试运行
         */
        readonly functionalTest: boolean;

        /**
         * @description: 指定此检测是否将处理分析。
         */
        readonly handleProfiling: boolean;

        /**
         * @description: 公共可用部分 sourceDir完整路径，包括资源和清单。
         */
        readonly publicSourceDir: string;

        /**
         * @description: 适用于此应用程序的基本APK的完整路径。
         */
        readonly sourceDir: string;

        /**
         * @description: 公共可用部分 splitSourceDirs完整路径，包括资源和清单。
         */
        readonly splitPublicSourceDirs: String[];

        /**
         * @description: 完整路径到零个或多个拆分APK，当与 sourceDir定义的基本APK结合时，形成一个完整的应用程序。
         */
        readonly splitSourceDirs: String[];

        /**
         * @description: 正在检测的应用程序包的名称。
         */
        readonly targetPackage: string;

        [prop: string]: any;
    }

    class PermissionInfo {
        /**
         * @description: 此权限描述的字符串资源标识符（位于程序包的资源中）。
         */
        readonly descriptionRes: number;

        /**
         * @description: 有关此权限的其他标志由 permissionFlags给出。
         */
        readonly flags: number;

        /**
         * @description: 根据 permissionGroup ，该许可是该组的一部分。
         */
        readonly group: string;

        /**
         * @description: AndroidManifest文件中提供的描述字符串（如果有的话）。
         */
        readonly nonLocalizedDescription: CharSequence;

        /**
         * @description: 根据 protectionLevel ，访问权限的级别得到保护。
         */
        readonly protectionLevel: number;

        [prop: string]: any;
    }

    class ProviderInfo {
        /**
         * @description: 名称提供者在内容下发布：//
         */
        readonly authority: string;

        /**
         * @description: 在清单中的提供程序声明中设置的选项。
         */
        readonly flags: number;

        /**
         * @description: 如果为true，则可以根据 grantUriPermissions属性授予对此内容提供者中特定Uris的附加权限。
         */
        readonly grantUriPermissions: boolean;

        /**
         * @description: 用于控制在同一进程中运行的单进程提供程序的初始化顺序。
         */
        readonly initOrder: number;

        /**
         * @description: 此字段在API级别5中已弃用。此标志现在被忽略。 使提供者可以同步的当前方式是为给定提供者/账户类型提供SyncAdapter服务。
         */
        readonly isSyncable: boolean;

        /**
         * @description: 如果为true，则此内容提供者允许其自身的多个实例以不同的过程运行。
         */
        readonly multiprocess: boolean;

        /**
         * @description: 如果非空，则这些是允许访问提供程序的路径特定的权限。
         */
        readonly pathPermissions: PathPermission[];

        /**
         * @description: 只读访问此内容提供程序所需的可选权限。
         */
        readonly readPermission: string;

        /**
         * @description: 如果非null，则这些是允许授予URI权限的模式。
         */
        readonly uriPermissionPatterns: PatternMatcher[] | null;

        /**
         * @description: 读/写访问此内容提供程序所需的可选许可权。
         */
        readonly writePermission: string;

        [prop: string]: any;
    }

    class FeatureInfo {
        /**
         * @description: 其他标志。
         */
        readonly flags: number;

        /**
         * @description: 此功能的名称，例如“android.hardware.camera”。
         */
        readonly name: string;

        /**
         * @description: 应用程序使用的GLES版本。
         */
        readonly reqGlEsVersion: number;

        /**
         * @description: 如果此对象表示设备支持的功能，则此设备支持此功能的最大版本。
         */
        readonly version: number;
    }

    class ServiceInfo {
        /**
         * @description: 已在清单中的服务声明中设置的选项。
         */
        readonly flags: number;

        /**
         * @description: 可以访问此服务所需的权限的可选名称。
         */
        readonly permission: string;

        [prop: string]: any;
    }

    class Signature {
        [prop: string]: any;
    }

    class CharSequence {
        [prop: string]: any;
    }

    class PathPermission {
        [prop: string]: any;
    }

    class PatternMatcher {
        [prop: string]: any;
    }

    /**
     * @description: Uri对象的详细信息参见 [android.net.Uri] 。
     * 
     * [android.net.Uri]: https://developer.android.com/reference/android/net/Uri
     */
    class Uri {
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
         * @return {number} 此 URI 的端口，如果无效或不存在，则为 -1。
         */
        getPort(): number;

        /**
         * @description: 从此 URI 获取已解码的查询组件。查询位于查询分隔符 （`？`） 之后，片段分隔符 （`#`） 之前。此方法将返回`http://www.google.com/search?q=android` 中的 `q=android`。
         * @return {string | null} 已解码的查询，如果没有，则为null。
         */
        getQuery(): string | null;

        /**
         * @description: 使用给定键在查询字符串中搜索参数值。
         * @param {string} key 要查找的键值对。
         * @return {array} 解码值列表。
         */
        getQueryParameters(key: string): string[];
    }
}
