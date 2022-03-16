/*
 * @Author: BATU1579
 * @CreateDate: 2022-02-22 17:34:30
 * @LastEditor: BATU1579
 * @LastTime: 2022-02-23 09:51:48
 * @FilePath: \\src\\lib\\send_msg.js
 * @Description: 向微信发送日志
 */
import { LOG_STACK, TOKEN } from '../global';

export function send_log() {
    if (TOKEN) send_msg(`
    <div style="font-size: 15px; font-family: monospace; word-wrap:break-word;">
        ${LOG_STACK.join('')}
    </div>
    `);
    LOG_STACK.length = 0;
}

function send_msg(message) {
    let URL = `http://www.pushplus.plus/send`;
    let res = http.post(URL, {
        title: "日志",
        token: TOKEN,
        content: message,
        template: 'html',
    });

    if (res.statusCode !== 200) {
        console.error(
            `[ERROR] [send]: send to wechat failed: ${res.statusMessage}`
        );
    }
}
