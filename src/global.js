/*
 * @Author: BATU1579
 * @CreateDate: 2022-02-04 21:03:08
 * @LastEditor: BATU1579
 * @LastTime: 2022-03-28 09:33:08
 * @FilePath: \\src\\global.js
 * @Description: 全局常量和配置项验证
 */
export const VERSION = "1.0.0";

export const LISTENER_INTERVAL = 100;

export const SHORT_WAIT_MS = 300;

export const LONG_WAIT_MS = 1000;

export const EVENT = events.emitter();

export var LOG_STACK = [];

// ------------------------- configuration -------------------------

export let {
    TOKEN,
    SHOW_CONSOLE
} = hamibot.env;
