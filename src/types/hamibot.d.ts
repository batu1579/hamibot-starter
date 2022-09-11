/*
 * @Author: BATU1579
 * @CreateDate: 2022-05-24 17:21:22
 * @LastEditor: BATU1579
 * @LastTime: 2022-09-11 10:23:24
 * @FilePath: \\src\\types\\hamibot.d.ts
 * @Description: hamibot 模块
 */

declare module 'hamibot' {
    global {
        /**
         * @description: 运行在 Hamibot 的脚本，可以使用额外的环境信息和功能。
         */
        const hamibot: Hamibot;

        // 声明全局函数

        /**
         * @description: 立即停止脚本运行。
         * 
         * **注意！：**
         * 
         * - 此函数是通过抛出 `ScriptInterrupttedException` 来实现的，因此如果用 `try...catch` 把 `exit()` 函数的异常捕捉，则脚本不会立即停止，仍会运行几行后再停止。
         * 
         */
        function exit(): void;
    }

    interface Hamibot {

        /**
         * @description: 包含环境信息和开发者自定义的脚本配置（参见 [在脚本中使用配置] ）。
         * 
         * [在脚本中使用配置]: https://docs.hamibot.com/tutorials/tutorial-config#%E5%9C%A8%E8%84%9A%E6%9C%AC%E4%B8%AD%E4%BD%BF%E7%94%A8%E9%85%8D%E7%BD%AE
         */
        readonly env: HamibotEnv;

        /**
         * @description: 脚本的定价计划信息，可用来区分版本。
         */
        readonly plan: PricePlan;

        /**
         * @description: 将信息发送到控制台的脚本消息，实现远程查看。
         * @param {string} text 消息内容。
         * @param {MessageOptions} [opts] 选项。
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
        postMessage(text: string, opts?: MessageOptions): void;

        /**
         * @description: 确保 `hamibot.postMessage()` 发送成功后再退出。
         */
        exit(): void;
    }

    interface HamibotEnv {
        /**
     * @description: 运行模式，可选的值为:
     *  - `development` - 开发模式
     *  - `production` - 生产模式
     */
        readonly APP_ENV: 'development' | 'production';

        /**
         * @description: 用户 `id`。
         */
        readonly USER_ID: string;

        /**
         * @description: 机器人 `id`。
         */
        readonly ROBOT_ID: string;

        /**
         * @description: 脚本 `id`。
         */
        readonly SCRIPT_ID: string;

        /**
         * @description: 时间戳。
         * @example '2021-02-03 04:05:06'
         */
        readonly TIMESTAMP: string;

        /**
         * @description: 配置项的数据。
         * 
         * *建议（：*
         * 
         * - 使用前手动检查数据
         * 
         */
        readonly [prop: string]: any;
    }

    /**
     * @description: 脚本定价计划。
     */
    interface PricePlan {
        /**
         * @description: 计划名称（默认为 `免费` ）。
         */
        readonly name: string;
        /**
         * @description: 定价模式，可以是下列值之一：。
         *  - `free`
         *  - `flatRate`
         * （默认为 `free` ）
         */
        readonly mode: 'free' | 'flatRate';
        /**
         * @description: 是否处于免费试用期（默认为 `false` ）。
         */
        readonly onFreeTrial: boolean;
    }

    /**
     * @description: 消息选项。
     */
    interface MessageOptions {
        telemetry: boolean;  // TODO： 询问这个键的意义

        /**
         * @description: 消息数据。
         */
        data: MessageData | Object;
    }

    /**
     * @description: 消息数据（包括消息标题和消息附件）。
     */
    interface MessageData {
        /**
         * @description: 消息标题。
         */
        title: string;

        /**
         * @description: 存放附件的数组。
         */
        attachments: MessageAttachment[];
    }

    /**
     * @description: 消息附件。
     */
    interface MessageAttachment {
        /**
         * @description: 附件类型，根据实际需要选择使用，可选的值为:
         * 
         * - `text` - 文本类型
         * - `json` - JSON类型
         * - `image` - 图片类型
         * 
         */
        type: 'text' | 'json' | 'image';

        /**
         * @description: 附件内容。
         */
        data: string;
    }
}
