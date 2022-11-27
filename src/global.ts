/*
 * @Author: BATU1579
 * @CreateDate: 2022-02-04 21:03:08
 * @LastEditor: BATU1579
 * @LastTime: 2022-11-28 02:01:56
 * @FilePath: \\src\\global.ts
 * @Description: 全局常量和配置项验证
 */

import { ConfigInvalidException } from "./lib/exception";
import { LogLevel, logStack, Record, sendLog, setToken } from "./lib/logger";

export const PROJECT_NAME = "Untitled Script"

/**
 * @description: 脚本版本号。建议根据 [语义化版本号] 迭代
 */
export const VERSION = "0.1.0";

export const LISTENER_INTERVAL = 100;

export const SHORT_WAIT_MS = 300;

export const LONG_WAIT_MS = 1000;

export const EVENT = events.emitter();

Record.info(`Launching...\n\n\tCurrent script version: ${VERSION}\n`);

// ---------------------- configuration -------------------------

const {
    _TOKEN,
    _SHOW_CONSOLE,
} = hamibot.env;

// -------------------- register listener -----------------------

// register kill thread listener
events.on("exit", () => {
    threads.shutDownAll();
    Record.info("Exit...");

    sleep(LONG_WAIT_MS * 5);
    console.hide();
});

// ------------------------ validation --------------------------

Record.info("Verifying configurations");

// pushplus token
if (_TOKEN !== "" && setToken(_TOKEN) == false) {
    throw new ConfigInvalidException("pushplus token", "needs to be a 32-bit hexadecimal number");
}

// show console
if (typeof _SHOW_CONSOLE !== "boolean") {
    throw new ConfigInvalidException("show console");
}
export const SHOW_CONSOLE = _SHOW_CONSOLE;

Record.info("Start running script");
