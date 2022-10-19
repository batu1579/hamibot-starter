/*
 * @Author: BATU1579
 * @CreateDate: 2022-07-11 19:29:25
 * @LastEditor: BATU1579
 * @LastTime: 2022-09-11 10:51:31
 * @FilePath: \\src\\types\\keys.d.ts
 * @Description: 模拟物理按键模块
 */
declare module 'keys' {
    global {
        /**
         * @description: 模拟按下返回键。
         * 
         * **注意！：**
         * 
         * - 此函数依赖于无障碍服务。
         * 
         * @return {boolean} 是否执行成功。
         */
        function back(): boolean;

        /**
         * @description: 模拟按下 Home 键。
         * 
         * **注意！：**
         * 
         * - 此函数依赖于无障碍服务。
         * 
         * @return {boolean} 是否执行成功。
         */
        function home(): boolean;

        /**
         * @description: 弹出电源键菜单。
         * 
         * **注意！：**
         * 
         * - 此函数依赖于无障碍服务。
         * 
         * @return {boolean} 是否执行成功。
         */
        function powerDialog(): boolean;

        /**
         * @description: 显示快速设置（下拉通知栏到底）。
         * 
         * **注意！：**
         * 
         * - 此函数依赖于无障碍服务。
         * 
         * @return {boolean} 是否执行成功。
         */
        function notifications(): boolean;

        /**
         * @description: 显示最近任务。
         * 
         * **注意！：**
         * 
         * - 此函数依赖于无障碍服务。
         * 
         * @return {boolean} 是否执行成功。
         */
        function recents(): boolean;

        /**
         * @description: 分屏。
         * 
         * **注意！：**
         * 
         * - 此函数依赖于无障碍服务。
         * - 此函数需要系统自身功能的支持。
         * 
         * @return {boolean} 是否执行成功。
         */
        function splitScreen(): boolean;

        /**
         * @description: 模拟按下 Home 键。
         * 
         * **注意！：**
         * 
         * - 此函数依赖于 root 权限。
         * 
         */
        function Home(): void;

        /**
         * @description: 模拟按下返回键。 
         * 
         * **注意！：**
         * 
         * - 此函数依赖于 root 权限。
         * 
         */
        function Back(): void;

        /**
         * @description: 模拟按下电源键。 
         * 
         * **注意！：**
         * 
         * - 此函数依赖于 root 权限。
         * 
         */
        function Power(): void;

        /**
         * @description: 模拟按下菜单键。
         * 
         * **注意！：**
         * 
         * - 此函数依赖于 root 权限。
         * 
         */
        function Menu(): void;

        /**
         * @description: 按下音量上键。
         * 
         * **注意！：**
         * 
         * - 此函数依赖于 root 权限。
         * 
         */
        function VolumeUp(): void;

        /**
         * @description: 按下音量下键。
         * 
         * **注意！：**
         * 
         * - 此函数依赖于 root 权限。
         * 
         */
        function VolumeDown(): void;

        /**
         * @description: 模拟按下照相键。
         * 
         * **注意！：**
         * 
         * - 此函数依赖于 root 权限。
         * 
         */
        function Camera(): void;

        /**
         * @description: 模拟按下物理按键上。
         * 
         * **注意！：**
         * 
         * - 此函数依赖于 root 权限。
         * 
         */
        function Up(): void;

        /**
         * @description: 模拟按下物理按键下。
         * 
         * **注意！：**
         * 
         * - 此函数依赖于 root 权限。
         * 
         */
        function Down(): void;

        /**
         * @description: 模拟按下物理按键左。
         * 
         * **注意！：**
         * 
         * - 此函数依赖于 root 权限。
         * 
         */
        function Left(): void;

        /**
         * @description: 模拟按下物理按键右。
         * 
         * **注意！：**
         * 
         * - 此函数依赖于 root 权限。
         * 
         */
        function Right(): void;

        /**
         * @description: 模拟按下物理按键确定。
         * 
         * **注意！：**
         * 
         * - 此函数依赖于 root 权限。
         * 
         */
        function OK(): void;

        /**
         * @description: 输入文字text。
         * 
         * **注意！：**
         * 
         * - 此函数依赖于 root 权限。
         * 
         * @param {string} text 要输入的文字，只能为英文或英文符号。
         * @example
         * ```typescript
         * Text('aaa'): void;
         * ```
         */
        function Text(text: string): void;

        /**
         * @description: 模拟按下物理按键。
         * 
         * **注意！：**
         * 
         * - 此函数依赖于 root 权限。
         * 
         * @param {number | KeyCode} code
         * @example
         * ```typescript
         * // 按下 A 键
         * KeyCode(29);
         * 
         * // 按下 A 键
         * KeyCode('KEYCODE_A')
         * ```
         */
        function KeyCode(code: number | KeyCode): void;
    }

    // TODO: 转换成枚举类型
    type KeyCode = (
        'KEYCODE_MENU' |
        'KEYCODE_SOFT_RIGHT' |
        'KEYCODE_HOME' |
        'KEYCODE_BACK' |
        'KEYCODE_CALL' |
        'KEYCODE_ENDCALL' |
        'KEYCODE_0' |
        'KEYCODE_1' |
        'KEYCODE_2' |
        'KEYCODE_3' |
        'KEYCODE_4' |
        'KEYCODE_5' |
        'KEYCODE_6' |
        'KEYCODE_7' |
        'KEYCODE_8' |
        'KEYCODE_9' |
        'KEYCODE_STAR' |
        'KEYCODE_POUND' |
        'KEYCODE_DPAD_UP' |
        'KEYCODE_DPAD_DOWN' |
        'KEYCODE_DPAD_LEFT' |
        'KEYCODE_DPAD_RIGHT' |
        'KEYCODE_DPAD_CENTER' |
        'KEYCODE_VOLUME_UP' |
        'KEYCODE_VOLUME_DOWN' |
        'KEYCODE_POWER' |
        'KEYCODE_CAMERA' |
        'KEYCODE_CLEAR' |
        'KEYCODE_A' |
        'KEYCODE_B' |
        'KEYCODE_C' |
        'KEYCODE_D' |
        'KEYCODE_E' |
        'KEYCODE_F' |
        'KEYCODE_G' |
        'KEYCODE_H' |
        'KEYCODE_I' |
        'KEYCODE_J' |
        'KEYCODE_K' |
        'KEYCODE_L' |
        'KEYCODE_M' |
        'KEYCODE_N' |
        'KEYCODE_O' |
        'KEYCODE_P' |
        'KEYCODE_Q' |
        'KEYCODE_R' |
        'KEYCODE_S' |
        'KEYCODE_T' |
        'KEYCODE_U' |
        'KEYCODE_V' |
        'KEYCODE_W' |
        'KEYCODE_X' |
        'KEYCODE_Y' |
        'KEYCODE_Z' |
        'KEYCODE_COMMA' |
        'KEYCODE_PERIOD' |
        'KEYCODE_ALT_LEFT' |
        'KEYCODE_ALT_RIGHT' |
        'KEYCODE_SHIFT_LEFT' |
        'KEYCODE_SHIFT_RIGHT' |
        'KEYCODE_TAB' |
        'KEYCODE_SPACE' |
        'KEYCODE_SYM' |
        'KEYCODE_EXPLORER' |
        'KEYCODE_ENVELOPE' |
        'KEYCODE_ENTER' |
        'KEYCODE_DEL' |
        'KEYCODE_GRAVE' |
        'KEYCODE_MINUS' |
        'KEYCODE_EQUALS' |
        'KEYCODE_LEFT_BRACKET' |
        'KEYCODE_RIGHT_BRACKET' |
        'KEYCODE_BACKSLASH' |
        'KEYCODE_SEMICOLON' |
        'KEYCODE_APOSTROPHE' |
        'KEYCODE_SLASH' |
        'KEYCODE_AT' |
        'KEYCODE_NUM' |
        'KEYCODE_HEADSETHOOK' |
        'KEYCODE_FOCUS' |
        'KEYCODE_PLUS' |
        'KEYCODE_MENU' |
        'KEYCODE_NOTIFICATION' |
        'KEYCODE_SEARCH' |
        'TAG_LAST_KEYCODE'
    )
}