/*
 * @Author: BATU1579
 * @CreateDate: 2022-06-03 20:18:32
 * @LastEditor: BATU1579
 * @LastTime: 2022-07-23 09:30:31
 * @FilePath: \\src\\types\\utils.d.ts
 * @Description: 
 */
declare module 'utils' {
    global {
        // TODO: 补全其他支持的编码
        /**
         * @description: 可选的编码。
         */
        type encode = 'utf-8' | 'gbk';

        type ByteArray = Uint8Array | number[];

        class ImmediateID extends Number {
            private _id: 'ImmediateID';
        }
        class TimeoutID extends Number {
            private _id: 'TimeoutID';
        }
        class IntervalID extends Number {
            private _id: 'IntervalID';
        }
    }
}