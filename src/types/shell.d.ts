/*
 * @Author: BATU1579
 * @CreateDate: 2022-07-31 02:26:26
 * @LastEditor: BATU1579
 * @LastTime: 2022-08-01 17:04:02
 * @FilePath: \\src\\types\\shell.d.ts
 * @Description: 终端模块
 */
declare module 'shell' {
    global {
        /**
         * @description: 一次性执行命令 `cmd` , 并返回命令的执行结果。
         * @param {string} cmd 要执行的命令。
         * @param {boolean} [root] 是否以 root 权限运行（默认为 `false` ）。
         * @return {CMDResult} 命令运行的结果。
         */
        function shell(cmd: string, root?: boolean): CMDResult;


        /**
         * @description: `shell()` 函数通过用来一次性执行单条命令并获取结果。如果有多条命令需要执行，用 Shell 对象的效率更高。这是因为，每次运行 `shell()` 函数都会打开一个单独的 shell 进程并在运行结束后关闭他，这个过程需要一定的时间；而 `Shell` 对象自始至终使用同一个 shell 进程。
         */
        class Shell {
            /**
             * @description: Shell 对象的构造函数。
             * @param {boolean} [root] 是否以 root 权限运行一个 shell 进程（默认为 `false` ）。这将会影响其后使用该 `Shell` 对象执行的命令的权限。
             */
            constructor(root?: boolean);

            /**
             * @description: 执行命令 `cmd` 。
             * 
             * **注意！：**
             * 
             * - 命令执行是"异步"的、非阻塞的。也就是不会等待命令完成后才继续向下执行。
             * 
             * @param {string} cmd 要执行的命令。
             */
            exec(cmd: string): void;

            /**
             * @description: 直接退出 shell。正在执行的命令会被强制退出。
             */
            exit(): void;

            /**
             * @description: 执行 `exit` 命令并等待执行命令执行完成再退出 shell 。
             */
            exitAndWaitFor(): void;

            /**
             * @description: 设置该 Shell 的回调函数，以便监听 Shell 的输出。
             * @param {ShellCallback} callback 回调函数集合。
             * @example
             * ```typescript
             * let sh = new Shell();
             * sh.setCallback({
             *     onNewLine: function(line) {
             *         // 有新的一行输出时打印到控制台
             *         log(line);
             *     }
             * })
             * while(true) {
             *     // 循环输入命令
             *     let cmd = dialogs.rawInput("请输入要执行的命令，输入exit退出");
             *     if (cmd == "exit") {
             *         break;
             *     }
             *     // 执行命令
             *     sh.exec(cmd);
             * }
             * sh.exit();
             */
            setCallback(callback: ShellCallback): void;
        }
    }

    interface ShellCallback {
        /**
         * @description: 每当 shell 有新的输出时便会调用该函数。其参数是一个字符串。
         */
        onOutput?: (line: string) => any;

        /**
         * @description: 每当 shell 有新的一行输出时便会调用该函数。其参数是一个字符串（不包括最后的换行符）。
         */
        onNewLine?: (line: string) => any;
    }

    class CMDResult {
        /**
         * @description: 返回码。执行成功时为 0 ，失败时为非 0 的数字。
         */
        readonly code: number;

        /**
         * @description: 运行结果（ stdout 输出结果）。
         */
        readonly result: string;

        /**
         * @description: 运行的错误信息（ stderr 输出结果）。例如执行需要 root 权限的命令但没有授予 root 权限会返回错误信息 `Permission denied` 。
         */
        readonly error: string;
    }
}