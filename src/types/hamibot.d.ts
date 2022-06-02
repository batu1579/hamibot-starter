/*
 * @Author: BATU1579
 * @CreateDate: 2022-05-24 17:21:22
 * @LastEditor: BATU1579
 * @LastTime: 2022-06-02 22:04:19
 * @FilePath: \\src\\types\\hamibot.d.ts
 * @Description: hamibot 模块
 */

declare module "hamibot" {
    global {
        /**
         * @description: 运行在 Hamibot 的脚本，可以使用额外的环境信息和功能。
         */
        namespace hamibot {

            /**
             * @description: 包含环境信息和开发者自定义的脚本配置（参见 [在脚本中使用配置](https://docs.hamibot.com/tutorials/tutorial-config#%E5%9C%A8%E8%84%9A%E6%9C%AC%E4%B8%AD%E4%BD%BF%E7%94%A8%E9%85%8D%E7%BD%AE)）
             */
            let env: HamibotEnv;

            interface HamibotEnv {
                /**
             * @description: 运行模式，可选值：
             *  - `development` - 开发模式
             *  - `production` - 生产模式
             */
                readonly APP_ENV: "development" | "production";

                /**
                 * @description: 用户 `id`
                 */
                readonly USER_ID: string;

                /**
                 * @description: 机器人 `id`
                 */
                readonly ROBOT_ID: string;

                /**
                 * @description: 脚本 `id`
                 */
                readonly SCRIPT_ID: string;

                /**
                 * @description: 时间戳
                 * @example: "2021-02-03 04:05:06"
                 */
                readonly TIMESTAMP: string;

                /**
                 * @description: 配置项的数据
                 * - 建议（：使用前手动检查数据
                 */
                readonly [prop: string]: any;
            }

            /**
             * @description: 脚本的定价计划信息，可用来区分版本。
             */
            let plan: PricePlan;

            /**
             * @description: 脚本定价计划
             */
            interface PricePlan {
                /**
                 * @description: 计划名称（默认为 `免费` ）
                 */
                readonly name: string;
                /**
                 * @description: 定价模式，可以是下列值之一：
                 *  - `free`
                 *  - `flatRate`
                 * （默认为 `free` ）
                 */
                readonly mode: "free" | "flatRate";
                /**
                 * @description: 是否处于免费试用期（默认为 `false` ）
                 */
                readonly onFreeTrial: boolean;
            }

            /**
             * @description: 消息选项
             */
            interface MessageOptions {
                telemetry: boolean;  // TODO： 询问这个键的意义

                /**
                 * @description: 消息数据
                 */
                data: MessageData | object;
            }

            /**
             * @description: 消息数据（包括消息标题和消息附件）
             */
            interface MessageData {
                /**
                 * @description: 消息标题
                 */
                title: string;

                /**
                 * @description: 存放附件的数组
                 */
                attachments: MessageAttachment[];
            }

            /**
             * @description: 消息附件
             */
            interface MessageAttachment {
                /**
                 * @description: 附件类型，根据实际需要选择使用。可选值：
                 * - `text` - 文本类型
                 * - `json` - JSON类型
                 * - `image` - 图片类型
                 */
                type: "text" | "json" | "image";

                /**
                 * @description: 附件内容
                 */
                data: string;
            }

            /**
             * @description: 将信息发送到控制台的脚本消息，实现远程查看。
             * @param {string} text 消息内容
             * @param {MessageOptions} [opts] 选项
             * @example
             * ```typescript
             * hamibot.postMessage(Date.now().toString(), {
             *     telemetry: true,
             *     data: {
             *         title: '标题',
             *         attachments: [
             *             // 支持 text, json, image 三种类型，根据实际需要选择使用
             *             {
             *                 type: 'text',
             *                 data: '文字内容',
             *             },
             *             {
             *                 type: 'json',
             *                 data: JSON.stringify({
             *                 currentActivity: currentActivity(),
             *                 }),
             *             },
             *             {
             *                 type: 'image',
             *                 data: 'data:image/png;base64,iVB...', // base64
             *             },
             *         ],
             *     },
             * });
             * ```
             */
            function postMessage(text: string, opts?: MessageOptions): void;

            /**
             * @description: 确保 `hamibot.postMessage()` 发送成功后再退出。
             */
            function exit(): void;
        }

        // 声明全局函数

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
        function launchApp(appName: string): boolean

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
        function launch(packageName: string): boolean

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
        function launchPackage(packageName: string): boolean

        /**
         * @description: 获取应用名称对应的已安装的应用的包名。
         * @param {string} appName 应用名称
         * @return {string | null} 如果该找不到该应用，返回 null；如果该名称对应多个应用，则只返回其中某一个的包名。
         * @example: 
         * ```typescript
         * let name = getPackageName('Hamibot'); // 返回 com.hamibot.hamibot
         * ```
         */
        function getPackageName(appName: string): string | null

        /**
         * @description: 获取应用包名对应的已安装的应用的名称。
         * @param {string} packageName
         * @return {string | null} 应用的名称，如果该找不到该应用，返回 null。
         * @example: 
         * ```typescript
         * let name = getAppName('com.hamibot.hamibot'); // 返回 Hamibot
         * ```
         */
        function getAppName(packageName: string): string | null

        /**
         * @description: 打开应用的详情页(设置页)。
         * @param {string} packageName 应用包名
         * @return {boolean} 如果找不到该应用，返回 false; 否则返回 true。
         */
        function openAppSetting(packageName: string): boolean
    }
}
