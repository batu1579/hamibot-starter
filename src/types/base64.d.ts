/*
 * @Author: BATU1579
 * @CreateDate: 2022-06-03 01:38:14
 * @LastEditor: BATU1579
 * @LastTime: 2022-08-16 03:18:55
 * @FilePath: \\src\\types\\base64.d.ts
 * @Description: base64 模块
 */
declare module 'base64' {
    global {

        /**
         * @description: Base64 编码和解码器。Base64 常用于在通常处理文本数据的场合，表示、传输、存储一些二进制数据，包括 MIME 的电子邮件及 XML 的一些复杂数据。
         */
        const base64: Base64;
    }

    interface Base64 {
        /**
         * @description: 将字符串进行 Base64 编码。
         * @param {string} str 目标字符串。
         * @param {string} [encoding] 字符串编码。
         * @return {string} 编码后的字符串。
         * @since 1.4.0
         * @example
         * ```typescript
         * log(base64.encode('Hamibot')); // => SGFtaWJvdA==
         * ```
         */
        encode(str: string, encoding?: encode): string;

        /**
         * @description: 将字符串进行 Base64 编码。
         * @param {string} str 目标字符串。
         * @param {string} [encoding] 字符串编码。
         * @return {string} 编码后的字符串。
         * @since 1.4.0
         * @example
         * ```typescript
         * log(base64.encode('Hamibot')); // => SGFtaWJvdA==
         * ```
         */
        encode(str: string, encoding?: string): string;

        /**
         * @description: 将字符串进行 Base64 解码。
         * @param {string} str 目标字符串。
         * @param {string} [encoding] 字符串编码。
         * @return {string} 解码后的字符串。
         * @since 1.4.0
         * @example
         * ```typescript
         * log(base64.decode('SGFtaWJvdA==')); // => Hamibot
         * ```
         */
        decode(str: string, encoding?: encode): string;

        /**
         * @description: 将字符串进行 Base64 解码。
         * @param {string} str 目标字符串。
         * @param {string} [encoding] 字符串编码。
         * @return {string} 解码后的字符串。
         * @since 1.4.0
         * @example
         * ```typescript
         * log(base64.decode('SGFtaWJvdA==')); // => Hamibot
         * ```
         */
        decode(str: string, encoding?: string): string;
    }

    // TODO: 补全其他支持的编码
    /**
     * @description: 可选的编码。
     */
    type encode = 'utf-8' | 'gbk';
}