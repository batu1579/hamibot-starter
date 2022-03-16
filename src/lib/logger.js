/*
 * @Author: BATU1579
 * @CreateDate: 2022-02-05 04:00:16
 * @LastEditor: BATU1579
 * @LastTime: 2022-02-23 09:06:07
 * @FilePath: \\src\\lib\\logger.js
 * @Description: 简单包装一下 console
 */

import { LOG_STACK } from "../global";

export class Logger {
    constructor(modules_name) {
        this.modules_name = modules_name;
    }

    /**
     * @param {string} level log level
     * @param {string} message log message
     * @return {string} Generated log message
     * @description: Generate logs in a unified format based on the template
     */
    pattern(level, message) {
        return `[${level}] [${this.modules_name}]: ${message}`
    }

    template(encoded_message, color) {
        return (
            `<span style="color: ${color};">
                ${encoded_message}
            </span></br>`
        );
    }

    verbose(message) {
        let msg = this.pattern("DEBUG", message);
        console.verbose(msg);
        LOG_STACK.push(this.template(msg, "grey"));
    }

    info(message) {
        let msg = this.pattern("INFO ", message);
        console.info(msg);
        LOG_STACK.push(this.template(msg, "green"));
    }

    warn(message) {
        let msg = this.pattern("WARN ", message);
        console.warn(msg);
        LOG_STACK.push(this.template(msg, "yellow"));
    }

    error(message) {
        let msg = this.pattern("ERROR", message);
        console.error(msg);
        LOG_STACK.push(this.template(msg, "red"));
    }
}
