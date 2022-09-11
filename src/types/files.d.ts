/*
 * @Author: BATU1579
 * @CreateDate: 2022-07-23 09:05:08
 * @LastEditor: BATU1579
 * @LastTime: 2022-09-11 10:56:20
 * @FilePath: \\src\\types\\files.d.ts
 * @Description: 文件操作模块
 */
declare module 'files' {
    import { encode } from 'base64';

    global {
        /**
         * @description: `files` 模块提供了一些常见的文件处理，包括文件读写、移动、复制、删掉等。一次性的文件读写可以直接使用 `files.read()` , `files.write()` , `files.append()` 等方便的函数，但如果需要频繁读写或随机读写，则因该使用 `open()` 函数打开一个文件对象来操作文件，并在操作完毕后调用 `close()` 函数关闭文件。
         */
        const files: Files;

        // 声明全局函数
        /**
         * @description: 打开一个文件。根据打开模式返回不同的文件对象。
         * 
         * **注意！：**
         * 
         * - 对于 `w` 模式，如果文件并不存在，则会创建一个，已存在则会清空该文件内容。其他模式文件不存在会抛出 `FileNotFoundException` 。
         * 
         * @param {string} path 文件路径。
         * @param {string} [mode] 文件打开模式（默认为 `r` ），可选的值为:
         * 
         * - `r` - 只读文本模式。该模式下只能对文件执行 **文本** 读取操作。
         * - `w` - 只写文本模式。该模式下只能对文件执行 **文本** 覆盖写入操作。
         * - `a` - 附加文本模式。该模式下将会把写入的文本附加到文件末尾。
         * - `rw` - 随机读写文本模式。该模式下将会把写入的文本附加到文件末尾。目前暂不支持二进制模式，随机读写模式。
         * 
         * @param {encode} [encoding] 字符编码（默认为 `utf-8` ）。
         * @param {number} [bufferSize] 文件读写的缓冲区大小。
         * @return {ReadableTextFile} 打开的文件对象。
         */
        function open(path: string, mode?: 'r', encoding?: encode, bufferSize?: number): ReadableTextFile;

        /**
         * @description: 打开一个文件。根据打开模式返回不同的文件对象。
         * 
         * **注意！：**
         * 
         * - 对于 `w` 模式，如果文件并不存在，则会创建一个，已存在则会清空该文件内容。其他模式文件不存在会抛出 `FileNotFoundException` 。
         * 
         * @param {string} path 文件路径。
         * @param {string} [mode] 文件打开模式（默认为 `r` ），可选的值为:
         * 
         * - `r` - 只读文本模式。该模式下只能对文件执行 **文本** 读取操作。
         * - `w` - 只写文本模式。该模式下只能对文件执行 **文本** 覆盖写入操作。
         * - `a` - 附加文本模式。该模式下将会把写入的文本附加到文件末尾。
         * - `rw` - 随机读写文本模式。该模式下将会把写入的文本附加到文件末尾。目前暂不支持二进制模式，随机读写模式。
         * 
         * @param {encode} [encoding] 字符编码（默认为 `utf-8` ）。
         * @param {number} [bufferSize] 文件读写的缓冲区大小。
         * @return {ReadableTextFile} 打开的文件对象。
         */
        function open(path: string, mode?: 'r', encoding?: string, bufferSize?: number): ReadableTextFile;

        /**
         * @description: 打开一个文件。根据打开模式返回不同的文件对象。
         * 
         * **注意！：**
         * 
         * - 对于 `w` 模式，如果文件并不存在，则会创建一个，已存在则会清空该文件内容。其他模式文件不存在会抛出 `FileNotFoundException` 。
         * 
         * @param {string} path 文件路径。
         * @param {string} [mode] 文件打开模式（默认为 `r` ），可选的值为:
         * 
         * - `r` - 只读文本模式。该模式下只能对文件执行 **文本** 读取操作。
         * - `w` - 只写文本模式。该模式下只能对文件执行 **文本** 覆盖写入操作。
         * - `a` - 附加文本模式。该模式下将会把写入的文本附加到文件末尾。
         * - `rw` - 随机读写文本模式。该模式下将会把写入的文本附加到文件末尾。目前暂不支持二进制模式，随机读写模式。
         * 
         * @param {encode} [encoding] 字符编码（默认为 `utf-8` ）。
         * @param {number} [bufferSize] 文件读写的缓冲区大小。
         * @return {WritableTextFile} 打开的文件对象。
         */
        function open(path: string, mode?: 'w' | 'a' | 'rw', encoding?: encode, bufferSize?: number): PWritableTextFile;

        /**
         * @description: 打开一个文件。根据打开模式返回不同的文件对象。
         * 
         * **注意！：**
         * 
         * - 对于 `w` 模式，如果文件并不存在，则会创建一个，已存在则会清空该文件内容。其他模式文件不存在会抛出 `FileNotFoundException` 。
         * 
         * @param {string} path 文件路径。
         * @param {string} [mode] 文件打开模式（默认为 `r` ），可选的值为:
         * 
         * - `r` - 只读文本模式。该模式下只能对文件执行 **文本** 读取操作。
         * - `w` - 只写文本模式。该模式下只能对文件执行 **文本** 覆盖写入操作。
         * - `a` - 附加文本模式。该模式下将会把写入的文本附加到文件末尾。
         * - `rw` - 随机读写文本模式。该模式下将会把写入的文本附加到文件末尾。目前暂不支持二进制模式，随机读写模式。
         * 
         * @param {encode} [encoding] 字符编码（默认为 `utf-8` ）。
         * @param {number} [bufferSize] 文件读写的缓冲区大小。
         * @return {WritableTextFile} 打开的文件对象。
         */
        function open(path: string, mode?: 'w' | 'a' | 'rw', encoding?: string, bufferSize?: number): PWritableTextFile;
    }

    interface Files {
        /**
         * @description: 检查路径 `path` 是否是文件。
         * @param {string} path 文件路径。
         * @return {boolean} 是文件则返回 `true` ，否则返回 `false`。
         * @example
         * ```typescript
         * log(files.isDir('/sdcard/文件.txt')); // true
         * ```
         */
        isFile(path: string): boolean;

        /**
         * @description: 检查路径 `path` 是否是文件夹。
         * @param {string} path 文件夹路径。
         * @return {boolean} 是文件夹则返回 `true` ，否则返回 `false`。
         * @example
         * ```typescript
         * log(files.isDir('/sdcard/文件夹')); // true
         * ```
         */
        isDir(path: string): boolean;

        /**
         * @description: 检查文件夹 `path` 是否为空文件夹。
         * @param {string} path 文件夹路径。
         * @return {boolean} 为空文件夹则返回 `true` ，否则返回 `false` 。如果该路径并非文件夹，则直接返回 `false` 。
         */
        isEmptyDir(path: string): boolean;

        /**
         * @description: 连接两个路径并返回。
         * @param {string} parent 父目录路径。
         * @param {string} child 子目录路径。
         * @return {string} 连接后的路径。
         * @example
         * ```typescript
         * log(files.join('/sdcard/', '1.txt')) // /sdcard/1.txt
         * ```
         */
        join(parent: string, child: string): string;

        /**
         * @description: 创建一个文件或文件夹。
         * @param {string} path 文件或文件夹路径。
         * @return {boolean} 创建成功则返回 `true` ，否则返回 `false` 。如果文件或文件夹已经存在，则直接返回 `false` 。
         * @example
         * ```typescript
         * files.create('/sdcard/新文件夹/');
         * ```
         */
        create(path: string): boolean;

        /**
         * @description: 创建一个文件或文件夹并返回是否创建成功。如果文件所在文件夹不存在，则先创建他所在的一系列文件夹。
         * @param {string} path 文件或文件夹路径。
         * @return {boolean} 创建成功则返回 `true` ，否则返回 `false` 。如果文件或文件夹已经存在，则直接返回 `false` 。
         */
        createWithDirs(path: string): boolean;

        /**
         * @description: 检查路径 `path` 处的文件是否存在。
         * @param {string} path 文件路径。
         * @return {boolean} 文件存在则返回 `true` ，否则返回 `false` 。
         */
        exists(path: string): boolean;

        /**
         * @description: 确保路径 `path` 所在的文件夹存在。如果该路径所在文件夹不存在，则创建该文件夹。例如对于路径'/sdcard/Download/ABC/1.txt'，如果/Download/文件夹不存在，则会先创建 Download，再创建 ABC 文件夹。
         * @param {string} path 文件夹路径。
         */
        ensureDir(path: string): void;

        /**
         * @description: 读取文本文件 `path` 的所有内容并返回。如果文件不存在，则抛出 `FileNotFoundException` 。
         * @param {string} path 文件路径。
         * @param {string} [encoding] 字符编码（默认为 `utf-8` ）。
         * @return {string} 读取的文件内容。
         * @example
         * ```typescript
         * log(files.read('/sdcard/1.txt'));
         * ```
         */
        read(path: string, encoding?: encode): string;

        /**
         * @description: 读取文本文件 `path` 的所有内容并返回。如果文件不存在，则抛出 `FileNotFoundException` 。
         * @param {string} path 文件路径。
         * @param {string} [encoding] 字符编码（默认为 `utf-8` ）。
         * @return {string} 读取的文件内容。
         * @example
         * ```typescript
         * log(files.read('/sdcard/1.txt'));
         * ```
         */
        read(path: string, encoding?: string): string;

        /**
         * @description: 读取文件 path 的所有内容并返回一个字节数组。如果文件不存在，则抛出 `FileNotFoundException` 。
         * 
         * **注意！：**
         * 
         * - 该数组是 Java 的数组，不具有 JavaScript 数组的 `forEach()` , `slice()` 等函数。
         * 
         * @param {string} path 文件路径。
         * @return {JavaByteArray} 16 进制数组。
         * @example
         * ```typescript
         * let data = files.readBytes('/sdcard/1.png');
         * let sb = new java.lang.StringBuilder();
         * for (let i = 0; i < data.length; i++) {
         *     sb.append(data[i].toString(16));
         * }
         * log(sb.toString());
         * ```
         */
        readBytes(path: string): JavaByteArray;

        /**
         * @description: 把 text 写入到文件 path 中。如果文件存在则覆盖，不存在则创建。
         * @param {string} path 文件路径。
         * @param {string} text 要写入的文本内容。
         * @param {string} [encoding] 字符编码（默认为 `utf-8` ）。
         * @example
         * ```typescript
         * // 写入文件
         * files.write('/sdcard/1.txt', 'some text');
         * // 用其他应用查看文件
         * app.viewFile('/sdcard/1.txt');
         * ```
         */
        write(path: string, text: string, encoding?: encode): void;

        /**
         * @description: 把 `text` 写入到文件 `path` 中。如果文件存在则覆盖，不存在则创建。
         * @param {string} path 文件路径。
         * @param {string} text 要写入的文本内容。
         * @param {string} [encoding] 字符编码（默认为 `utf-8` ）。
         * @example
         * ```typescript
         * // 写入文件
         * files.write('/sdcard/1.txt', 'some text');
         * // 用其他应用查看文件
         * app.viewFile('/sdcard/1.txt');
         * ```
         */
        write(path: string, text: string, encoding?: string): void;

        /**
         * @description: 把 `bytes` 写入到文件 `path` 中。如果文件存在则覆盖，不存在则创建。
         * @param {string} path 文件路径。
         * @param {ByteArray} bytes 字节数组，要写入的二进制数据。
         */
        writeBytes(path: string, bytes: ByteArray): void;

        /**
         * @description: 把 `text` 追加到文件 `path` 的末尾。如果文件不存在则创建。
         * @param {string} path 文件路径。
         * @param {string} text 要写入的文本内容。
         * @param {string} [encoding] 字符编码（默认为 `utf-8` ）。
         * @example
         * ```typescript
         * // 在文件后追加文本
         * files.append('/sdcard/1.txt', 'some text');
         * // 用其他应用查看文件
         * app.viewFile('/sdcard/1.txt');
         * ```
         */
        append(path: string, text: string, encoding?: encode): void;

        /**
         * @description: 把 `text` 追加到文件 `path` 的末尾。如果文件不存在则创建。
         * @param {string} path 文件路径。
         * @param {string} text 要写入的文本内容。
         * @param {string} [encoding] 字符编码（默认为 `utf-8` ）。
         * @example
         * ```typescript
         * // 在文件后追加文本
         * files.append('/sdcard/1.txt', 'some text');
         * // 用其他应用查看文件
         * app.viewFile('/sdcard/1.txt');
         * ```
         */
        append(path: string, text: string, encoding?: string): void;

        /**
         * @description: 把 `bytes` 追加到文件 `path` 的末尾。如果文件不存在则创建。
         * @param {string} path 文件路径。
         * @param {ByteArray} bytes 字节数组，要写入的二进制数据。
         */
        appendBytes(path: string, bytes: ByteArray): void;

        /**
         * @description: 复制文件。
         * @param {string} fromPath 要复制的 **原文件** 路径。
         * @param {string} toPath 复制到的 **新文件** 路径。
         * @return {boolean} 是否复制成功。
         * @example
         * ```typescript
         * // 把 1.txt 文件从 sd 卡根目录复制到 Download 文件夹
         * files.copy('/sdcard/1.txt', '/sdcard/Download/1.txt');
         * ```
         */
        copy(fromPath: string, toPath: string): boolean;

        /**
         * @description: 移动文件。
         * @param {string} fromPath 要移动的 **原文件** 路径。
         * @param {string} toPath 移动到的 **新文件** 路径。
         * @return {boolean} 是否移动成功。
         * @example
         * ```typescript
         * // 把 1.txt 文件从 sd 卡根目录移动到 Download 文件夹
         * files.move('/sdcard/1.txt', '/sdcard/Download/1.txt');
         * ```
         */
        move(fromPath: string, toPath: string): boolean;

        /**
         * @description: 重命名文件。
         * @param {string} path 要重命名的 **原文件** 路径。
         * @param {string} newName 要重命名的 **新文件名**。
         * @return {boolean} 是否重命名成功。
         * @example
         * ```typescript
         * // 将 sd 卡根目录下的 1.txt 文件重命名为 2.txt
         * files.rename('/sdcard/1.txt', '2.txt');
         * ```
         */
        rename(path: string, newName: string): boolean;

        /**
         * @description: 重命名文件，不包含拓展名。
         * @param {string} path 要重命名的 **原文件** 路径。
         * @param {string} newName 要重命名的 **新文件名** （不带扩展名）。
         * @return {boolean} 是否重命名成功。
         * @example
         * ```typescript
         * // 将 sd 卡根目录下的 1.txt 文件重命名为 2.txt
         * files.renameWithoutExtension('/sdcard/1.txt', '2');
         * ```
         */
        renameWithoutExtension(path: string, newName: string): boolean;

        /**
         * @description: 获取路径中的文件名。
         * @param {string} path 文件路径。
         * @return {string} 文件名。
         * @example
         * ```typescript
         * // 返回 '1.txt'
         * files.getName('/sdcard/1.txt');
         * ```
         */
        getName(path: string): string;

        /**
         * @description: 获取路径中的文件名（不含拓展名）。
         * @param {string} path 文件路径。
         * @return {string} 文件名。
         * @example
         * ```typescript
         * // 返回 '1'
         * files.getNameWithoutExtension('/sdcard/1.txt');
         * ```
         */
        getNameWithoutExtension(path: string): string;

        /**
         * @description: 获取路径中文件的拓展名。
         * @param {string} path 文件路径。
         * @return {string} 文件扩展名。
         * @example
         * ```typescript
         * // 返回 'txt'
         * files.getExtension('/sdcard/1.txt');
         * ```
         */
        getExtension(path: string): string;

        /**
         * @description: 删除单个文件或 **空文件夹**。
         * 
         * **注意！：**
         * 
         * - 此方法只能删除空文件夹，如果要删除非空文件夹需要使用 `removeDir` 方法。
         * 
         * @param {string} path 文件或文件夹路径。
         * @return {boolean} 是否删除成功。
         */
        remove(path: string): boolean;

        /**
         * @description: 删除文件夹，如果文件夹不为空，则删除该文件夹的所有内容再删除该文件夹。
         * @param {string} path 文件夹路径。
         * @return {boolean} 是否全部删除成功。
         */
        removeDir(path: string): boolean;

        /**
         * @description: 获取 SD 卡路径。所谓 SD 卡，即外部存储器。
         * @return {string} SD 卡路径。
         */
        getSdcardPath(): string;

        /**
         * @description: 获取脚本的 '当前工作文件夹路径'。
         * @return {string | null} 如果脚本本身为脚本文件，则返回这个脚本文件所在目录；否则返回null获取其他设定路径。
         * @example
         * ```typescript
         * // 脚本文件路径：'/sdcard/脚本/1.js'
         * // 返回 '/sdcard/脚本/'
         * files.cwd()
         * ```
         */
        cwd(): string | null;

        /**
         * @description: 将相对路径转换为绝对路径。
         * @param {string} relativePath 相对路径。
         * @return {string} 转换后的绝对路径。
         * @example
         * ```typescript
         * // 脚本文件路径：'/sdcard/脚本/1.js'
         * // 返回 '/sdcard/脚本/1.png'
         * files.path('./1.png')
         * ```
         */
        path(relativePath: string): string;

        /**
         * @description: 列出文件夹 `path` 下的满足条件的文件和文件夹的名称的数组。如果不加 `filter` 参数，则返回所有文件和文件夹。
         * @param {string} path 路径。
         * @param {function} [filter] 用于过滤的回调函数。参数为string（文件名），返回值为 boolean （是否符合过滤条件）。
         * @return {array} 满足条件的文件和文件夹的名称。
         * @example
         * ```typescript
         * // 列出 sdcard 目录下所有文件和文件夹
         * log(files.listDir('/sdcard/'));
         * ```
         * @example
         * ```typescript
         * // 列出脚本目录下所有 js 脚本文件
         * let dir = '/sdcard/脚本'
         * let jsFiles = files.listDir(dir, (i) => {
         *     return i.endsWith('.js') && files.isFile(files.join(dir, i));
         * });
         * log(jsFiles);
         * ```
         */
        listDir(path: string, filter?: (i: string) => boolean): string[];

        /**
         * @description: 打开一个文件。根据打开模式返回不同的文件对象。
         * 
         * **注意！：**
         * 
         * - 对于 `w` 模式，如果文件并不存在，则会创建一个，已存在则会清空该文件内容。其他模式文件不存在会抛出 `FileNotFoundException` 。
         * 
         * @param {string} path 文件路径。
         * @param {string} [mode] 文件打开模式（默认为 `r` ），可选的值为:
         * 
         * - `r` - 只读文本模式。该模式下只能对文件执行 **文本** 读取操作。
         * - `w` - 只写文本模式。该模式下只能对文件执行 **文本** 覆盖写入操作。
         * - `a` - 附加文本模式。该模式下将会把写入的文本附加到文件末尾。
         * - `rw` - 随机读写文本模式。该模式下将会把写入的文本附加到文件末尾。目前暂不支持二进制模式，随机读写模式。
         * 
         * @param {encode} [encoding] 字符编码（默认为 `utf-8` ）。
         * @param {number} [bufferSize] 文件读写的缓冲区大小。
         * @return {ReadableTextFile} 打开的文件对象。
         */
        open(path: string, mode?: 'r', encoding?: encode, bufferSize?: number): ReadableTextFile;

        /**
         * @description: 打开一个文件。根据打开模式返回不同的文件对象。
         * 
         * **注意！：**
         * 
         * - 对于 `w` 模式，如果文件并不存在，则会创建一个，已存在则会清空该文件内容。其他模式文件不存在会抛出 `FileNotFoundException` 。
         * 
         * @param {string} path 文件路径。
         * @param {string} [mode] 文件打开模式（默认为 `r` ），可选的值为:
         * 
         * - `r` - 只读文本模式。该模式下只能对文件执行 **文本** 读取操作。
         * - `w` - 只写文本模式。该模式下只能对文件执行 **文本** 覆盖写入操作。
         * - `a` - 附加文本模式。该模式下将会把写入的文本附加到文件末尾。
         * - `rw` - 随机读写文本模式。该模式下将会把写入的文本附加到文件末尾。目前暂不支持二进制模式，随机读写模式。
         * 
         * @param {encode} [encoding] 字符编码（默认为 `utf-8` ）。
         * @param {number} [bufferSize] 文件读写的缓冲区大小。
         * @return {ReadableTextFile} 打开的文件对象。
         */
        open(path: string, mode?: 'r', encoding?: string, bufferSize?: number): ReadableTextFile;

        /**
         * @description: 打开一个文件。根据打开模式返回不同的文件对象。
         * 
         * **注意！：**
         * 
         * - 对于 `w` 模式，如果文件并不存在，则会创建一个，已存在则会清空该文件内容。其他模式文件不存在会抛出 `FileNotFoundException` 。
         * 
         * @param {string} path 文件路径。
         * @param {string} [mode] 文件打开模式（默认为 `r` ），可选的值为:
         * 
         * - `r` - 只读文本模式。该模式下只能对文件执行 **文本** 读取操作。
         * - `w` - 只写文本模式。该模式下只能对文件执行 **文本** 覆盖写入操作。
         * - `a` - 附加文本模式。该模式下将会把写入的文本附加到文件末尾。
         * - `rw` - 随机读写文本模式。该模式下将会把写入的文本附加到文件末尾。目前暂不支持二进制模式，随机读写模式。
         * 
         * @param {encode} [encoding] 字符编码（默认为 `utf-8` ）。
         * @param {number} [bufferSize] 文件读写的缓冲区大小。
         * @return {WritableTextFile} 打开的文件对象。
         */
        open(path: string, mode?: 'w' | 'a' | 'rw', encoding?: encode, bufferSize?: number): PWritableTextFile;

        /**
         * @description: 打开一个文件。根据打开模式返回不同的文件对象。
         * 
         * **注意！：**
         * 
         * - 对于 `w` 模式，如果文件并不存在，则会创建一个，已存在则会清空该文件内容。其他模式文件不存在会抛出 `FileNotFoundException` 。
         * 
         * @param {string} path 文件路径。
         * @param {string} [mode] 文件打开模式（默认为 `r` ），可选的值为:
         * 
         * - `r` - 只读文本模式。该模式下只能对文件执行 **文本** 读取操作。
         * - `w` - 只写文本模式。该模式下只能对文件执行 **文本** 覆盖写入操作。
         * - `a` - 附加文本模式。该模式下将会把写入的文本附加到文件末尾。
         * - `rw` - 随机读写文本模式。该模式下将会把写入的文本附加到文件末尾。目前暂不支持二进制模式，随机读写模式。
         * 
         * @param {encode} [encoding] 字符编码（默认为 `utf-8` ）。
         * @param {number} [bufferSize] 文件读写的缓冲区大小。
         * @return {WritableTextFile} 打开的文件对象。
         */
        open(path: string, mode?: 'w' | 'a' | 'rw', encoding?: string, bufferSize?: number): PWritableTextFile;
    }

    /**
     * @description: 只读文件对象。
     */
    class ReadableTextFile {
        /**
         * @description: 读取该文件剩余的所有内容。
         * @return {string} 该文件剩余的所有内容的字符串。
         */
        read(): string;

        /**
         * @description: 读取该文件接下来最长为 `maxCount` 的字符串。
         * 
         * **注意！：**
         * 
         * - 即使文件剩余内容不足 `maxCount` 也不会出错。
         * 
         * @param {number} maxCount 最大读取的字符数量。
         * @return {string} 接下来最长为 `maxCount` 的字符串。
         */
        read(maxCount: number): string;

        /**
         * @description: 读取该文件的下一行的文本（不包含换行符）。
         * @return {string} 下一行的文本。
         */
        readline(): string;

        /**
         * @description: 读取该文件剩余的所有行。
         * @return {array} 文件剩余所有行按顺序组成的字符串数组。
         */
        readlines(): string[];

        /**
         * @description: 关闭该文件。
         * 
         * **注意！：**
         * 
         * - 打开一个文件不再使用时务必关闭
         * 
         */
        close(): void;
    }

    /**
     * @description: 只写文件对象。
     */
    class PWritableTextFile {
        /**
         * @description: 把文本内容 `text` 写入到文件中。
         * @param {string} text 要写入的文本。
         */
        write(text: string): void;

        /**
         * @description: 把文本 `line` 写入到文件中，并写入一个换行符。
         * @param {string} line 要写入的整行文本。
         */
        writeline(line: string): void;

        /**
         * @description: 把多行文本写入到文件中，并在每行结束写入一个换行符。
         * @param {array} lines 多行文本的字符串数组。
         */
        writelines(lines: string[]): void;

        /**
         * @description: 把缓冲区内容输出到文件中。
         */
        flush(): void;

        /**
         * @description: 关闭文件。同时会被缓冲区内容输出到文件。
         * 
         * **注意！：**
         * 
         * - 打开一个文件写入后，不再使用时务必关闭，否则文件可能会丢失
         * 
         */
        close(): void;
    }

    type ByteArray = Uint8Array | number[];

    type JavaByteArray = {
        [K in keyof Uint8Array as K extends JSArrayFunction ? never : K]: Uint8Array[K]
    };

    // TODO: 验证每个方法是否都不可用
    type JSArrayFunction = 'push' | 'pop' | 'unshift' | 'shift' | 'valueOf' | 'indexOf' | 'splice' | 'slice' | 'sort' | 'concat' | 'reverse' | 'join' | 'forEach' | 'filter' | 'map' | 'reduce' | 'find' | 'every' | 'some' | 'lastIndexOf' | 'reduceRight' | 'findIndex' | 'fill' | 'keys' | 'values' | 'copyWithin'
}