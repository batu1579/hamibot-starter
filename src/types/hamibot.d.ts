/*
 * @Author: BATU1579
 * @CreateDate: 2022-05-24 17:21:22
 * @LastEditor: BATU1579
 * @LastTime: 2022-05-25 18:43:33
 * @FilePath: \\src\\types\\hamibot.d.ts
 * @Description: hamibot 模块
 */

// TODO: 添加注释并补全类型
interface MessageOptions {
    telemetry: boolean;
    data: MessageData
}

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

interface MessageAttachment {
    /**
     * @description: 附件支持 text, json, image 三种类型，根据实际需要选择使用
     */
    type: MessageAttachmentType,

    /**
     * @description: 附件内容
     */
    data: string;
}

declare enum MessageAttachmentType {
    text = "text",
    json = "json",
    image = "image"
}

declare namespace hamibot {
    namespace env {
        /**
         * @description: 运行模式，可能是下列值之一：
         *  - `development`
         *  - `production`
         */
        let APP_ENV: string;
        /**
         * @description: 用户 `id`
         */
        let USER_ID: string;
        /**
         * @description: 机器人 `id`
         */
        let ROBOT_ID: string;
        /**
         * @description: 脚本 `id`
         */
        let SCRIPT_ID: string;
        /**
         * @description: 时间戳
         * @example: "2021-02-03 04:05:06"
         */
        let TIMESTAMP: string;
    }

    namespace plan {
        /**
         * @description: 计划名称（默认为 `免费` ）
         */
        let name: string;
        /**
         * @description: 定价模式，可以是下列值之一：
         *  - `free`
         *  - `flatRate`
         * （默认为 `free` ）
         */
        let mode: string;
        /**
         * @description: 是否处于免费试用期（默认为 `false` ）
         */
        let onFreeTrial: boolean;
    }

    /**
     * @description: 将信息发送到控制台的脚本消息，实现远程查看。
     * @param {string} text 消息内容
     * @param {MessageOptions} opts 选项
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
    function postMessage(text: string, opts?: MessageOptions): void

    /**
     * @description: 确保 `hamibot.postMessage()` 发送成功后再退出。
     */
    function exit(): void
}
