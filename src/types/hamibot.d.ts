/*
 * @Author: BATU1579
 * @CreateDate: 2022-05-24 17:21:22
 * @LastEditor: BATU1579
 * @LastTime: 2022-05-31 00:38:45
 * @FilePath: \\src\\types\\hamibot.d.ts
 * @Description: hamibot 模块
 */

declare module "hamibot" {
    global {
        /**
         * @description: 运行在 Hamibot 的脚本，可以使用额外的环境信息和功能。
         */
        namespace hamibot {
            interface HamibotEnv {
                /**
             * @description: 运行模式，可能是下列值之一：
             *  - `development`
             *  - `production`
             */
                APP_ENV: string;

                /**
                 * @description: 用户 `id`
                 */
                USER_ID: string;

                /**
                 * @description: 机器人 `id`
                 */
                ROBOT_ID: string;

                /**
                 * @description: 脚本 `id`
                 */
                SCRIPT_ID: string;

                /**
                 * @description: 时间戳
                 * @example: "2021-02-03 04:05:06"
                 */
                TIMESTAMP: string;

                /**
                 * @description: 配置项的数据
                 * - 建议（：使用前手动检查数据
                 */
                [prop: string]: any;
            }

            /**
             * @description: 脚本定价计划
             */
            interface PricePlan {
                /**
                 * @description: 计划名称（默认为 `免费` ）
                 */
                name: string;
                /**
                 * @description: 定价模式，可以是下列值之一：
                 *  - `free`
                 *  - `flatRate`
                 * （默认为 `free` ）
                 */
                mode: string;
                /**
                 * @description: 是否处于免费试用期（默认为 `false` ）
                 */
                onFreeTrial: boolean;
            }

            /**
             * @description: 消息选项
             */
            interface MessageOptions {
                telemetry: boolean;  // TODO： 询问这个键的意义

                /**
                 * @description: 消息数据
                 */
                data: MessageData;
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
                 * @description: 附件支持 text, json, image 三种类型，根据实际需要选择使用
                 */
                type: MessageAttachmentType;

                /**
                 * @description: 附件内容
                 */
                data: string;
            }

            /**
             * @description: 附件的可选类型
             */
            enum MessageAttachmentType {
                text = "text",
                json = "json",
                image = "image"
            }

            /**
             * @description: 包含环境信息和开发者自定义的脚本配置（参见 [在脚本中使用配置](https://docs.hamibot.com/tutorials/tutorial-config#%E5%9C%A8%E8%84%9A%E6%9C%AC%E4%B8%AD%E4%BD%BF%E7%94%A8%E9%85%8D%E7%BD%AE)）
             */
            let env: HamibotEnv;

            /**
             * @description: 脚本的定价计划信息，可用来区分版本。
             */
            let plan: PricePlan;

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
    }
}
