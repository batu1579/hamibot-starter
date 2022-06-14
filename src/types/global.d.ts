/*
 * @Author: BATU1579
 * @CreateDate: 2022-05-25 00:21:22
 * @LastEditor: BATU1579
 * @LastTime: 2022-06-01 01:03:46
 * @FilePath: \\src\\types\\global.d.ts
 * @Description: 全局函数和变量
 */

declare function sleep(n: number): void;
declare function currentPackage(): string;
declare function currentActivity(): string;
declare function setClip(text: string): void;
declare function getClip(): string;
declare function toast(message: string): void;
/**
 * @description:
 * @param {string} text
 * @return {boolean}
 * @example:
 */
// TODO 和大大了解具体函数定义
declare function toastLog(text: string): void;
declare function waitForActivity(activity: string, period?: number): void;
declare function waitForPackage(package: string, period?: number): void;
declare function random(min: number, max: number): number;
declare function random(): number;
