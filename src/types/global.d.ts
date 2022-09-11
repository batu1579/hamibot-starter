/*
 * @Author: BATU1579
 * @CreateDate: 2022-05-25 00:21:22
 * @LastEditor: BATU1579
 * @LastTime: 2022-09-11 10:56:19
 * @FilePath: \\src\\types\\global.d.ts
 * @Description: 全局函数和变量
 */

declare module 'global' {
    global {
        /**
         * @description: 暂停脚本运行 `n` 毫秒的时间。
         * @param {number} n 要暂停的毫秒数。
         * @example
         * ```typescript
         * // 暂停5秒
         * sleep(5000);
         * ```
         */
        function sleep(n: number): void;

        /**
         * @description: 返回最近一次监测到的正在运行的应用的包名，一般可以认为就是当前正在运行的应用的包名。
         * 
         * **注意！：**
         * 
         * - 此函数有一定延迟，可以通过 `selector()` 创建一个空选择器然后使用 `findOne()` 获取第一个找到的控件，然后直接访问控件的 `packageName` 属性来实时查询
         * - 此函数依赖于无障碍服务，如果服务未启动，则抛出异常并提示用户启动
         * 
         * @return {string} 最近一次运行的应用包名。
         */
        function currentPackage(): string;

        /**
         * @description: 返回最近一次监测到的正在运行的 `Activity` 的名称，一般可以认为就是当前正在运行的 `Activity` 的名称。
         * 
         * **注意！：**
         * 
         * - 此函数依赖于无障碍服务，如果服务未启动，则抛出异常并提示用户启动
         * 
         * @return {string} 最近运行的 `Activity` 的名称。
         */
        function currentActivity(): string;

        /**
         * @description: 设置剪贴板内容。此剪贴板即系统剪贴板，在一般应用的输入框中'粘贴'既可使用。
         * @param {string} text 剪贴板内容。
         */
        function setClip(text: string): void;

        /**
         * @description: 以气泡显示信息 `message` 几秒。（具体时间取决于安卓系统，一般都是 2 秒）。
         * 
         * **注意！：**
         * 
         * - 信息的显示是'异步'执行的，并且，不会等待信息消失程序才继续执行。如果在循环中执行该命令，可能出现脚本停止运行后仍然有不断的气泡信息出现的情况。
         * 
         * @param {string} message 要显示的信息。
         */
        function toast(message: string): void;

        /**
         * @description: 相当于 `toast(message); log(message)` 。显示信息 `message` 并在控制台中输出。
         * @param {string} message 要显示的信息。
         */
        function toastLog(message: string): void;

        /**
         * @description: 等待指定的 Activity 出现。
         * @param {string} activity Activity 名称。
         * @param {number} [period] 轮询等待间隔，单位毫秒（默认为200）。
         */
        function waitForActivity(activity: string, period?: number): void;

        /**
         * @description: 等待指定的应用出现。
         * @param {string} package 应用包名。
         * @param {number} [period] 轮询等待间隔，单位毫秒（默认为200）。
         * @example
         * ```typescript
         * // 等待当前界面为微信
         * waitForPackage('com.tencent.mm');
         * ```
         */
        function waitForPackage(package: string, period?: number): void;

        /**
         * @description: 产生一个指定区间的随机数。
         * @param {number} min 随机数产生的区间下界。
         * @param {number} max 随机数产生的区间上界。
         * @return {number} 返回一个在[min...max]之间的随机整数数。
         * @example
         * ```typescript
         * // 可能为 0, 1, 2 中的任意一个
         * log(random(0, 2));
         * ```
         */
        function random(min: number, max: number): number;

        /**
         * @description: 产生一个 0 到 1 之间的随机数。
         * @return {number} 返回一个在[0, 1)的随机浮点数。
         */
        function random(): number;

        /**
         * @description: 表示此脚本需要 Android API 版本达到指定版本才能运行。例如 `requiresApi(19)` 表示脚本需要在 Android 4.4 以及以上运行。调用该函数时会判断运行脚本的设备系统的版本号，如果没有达到要求则抛出异常。[API 版本号对照表] 。
         * 
         * [API 版本号对照表]: https://docs.hamibot.com/reference/globals/#requiresapiapi
         * @param {string} api Android 版本号。
         */
        function requireApi(api: string): void;

        /**
         * @description: 表示此脚本需要 Hamibot 版本达到指定版本才能运行。调用该函数时会判断运行脚本的 Hamibot 的版本号，如果没有达到要求则抛出异常。可以通过 `app.autojs.versionCode` 和 `app.autojs.versionName` 获取当前的 Hamibot 版本号和版本。
         * @param {string | number} version Hamibot 的版本或版本号。可以是整数表示版本号，例如 250 也可以是字符串格式表示的版本，例如'3.0.0 Beta', '3.1.0 Alpha4', '3.2.0'等。
         * @deprecated
         */
        function requiresAutojsVersion(version: string | number): void;

        const runtime: Runtime;

        /**
         * @description: 一个 android.content.Context 对象。
         * 
         * **注意！：**
         * 
         * - 该对象为 ApplicationContext，因此不能用于界面、对话框等的创建
         * 
         * @return {object} android.content.Context 对象
         */
        const context: object;
    }

    interface Runtime {
        /**
         * @description: 动态申请安卓的权限。您可以通过 APK 编辑器来增加 Hamibot 以及 Hamibot 打包的应用的权限。
         * 
         * **注意！：**
         * 
         * - 尽管安卓有很多权限，但必须写入 Manifest 才能动态申请，为了防止权限的滥用，目前 Hamibot 只能额外申请两个权限
         * 
         * @param {array} permissions 权限的字符串数组，可选的值为:
         * 
         * - `access_fine_location` - GPS 权限
         * - `record_audio` - 录音权限
         * 
         * @example
         * ```typescript
         * // 请求 GPS 权限
         * runtime.requestPermissions(['access_fine_location']);
         * ```
         */
        requestPermissions(permissions: ('access_fine_location' | 'record_audio')[]): void;

        /**
         * @description: 动态申请安卓的权限。您可以通过 APK 编辑器来增加 Hamibot 以及 Hamibot 打包的应用的权限。
         * 
         * **注意！：**
         * 
         * - 尽管安卓有很多权限，但必须写入 Manifest 才能动态申请，为了防止权限的滥用，目前 Hamibot 只能额外申请两个权限
         * 
         * @param {array} permissions 权限的字符串数组，可选的值为:
         * 
         * - `access_fine_location` - GPS 权限
         * - `record_audio` - 录音权限
         * 
         * @example
         * ```typescript
         * // 请求 GPS 权限
         * runtime.requestPermissions(['access_fine_location']);
         * ```
         */
        requestPermissions(permissions: string[]): void;

        /**
         * @description: 加载目标 jar 文件，加载成功后将可以使用该 Jar 文件的类。
         * @param {string} path jar 文件路径
         * @example
         * ```typescript
         * // 加载jsoup.jar
         * runtime.loadJar('./jsoup.jar');
         * // 使用jsoup解析html
         * importClass(org.jsoup.Jsoup);
         * log(Jsoup.parse(files.read('./test.html')));
         * ```
         */
        loadJar(path: string): void;

        /**
         * @description: 加载目标 dex 文件，加载成功后将可以使用该 dex 文件的类。因为加载 jar 实际上是把 jar 转换为 dex 再加载的，因此加载 dex 文件会比 jar 文件快得多。可以使用 Android SDK 的 build tools 的 dx 工具把 jar 转换为 dex。
         * @param {string} path dex 文件路径
         */
        loadDex(path: string): void;
    }
}
