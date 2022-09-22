/*
 * @Author: BATU1579
 * @CreateDate: 2022-02-04 21:03:08
 * @LastEditor: BATU1579
 * @LastTime: 2022-09-22 22:56:43
 * @FilePath: \\src\\global.ts
 * @Description: 全局常量和配置项验证
 */

/**
 * @description: 脚本版本号。建议根据 [语义化版本号] 迭代
 */
export const VERSION = "0.1.0";

export const LISTENER_INTERVAL = 100;

export const SHORT_WAIT_MS = 300;

export const LONG_WAIT_MS = 1000;

export const EVENT = events.emitter();

// ------------------------- configuration -------------------------

export let {
    TOKEN,
    SHOW_CONSOLE,
} = hamibot.env;
