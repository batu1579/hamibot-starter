/*
 * @Author: BATU1579
 * @CreateDate: 2022-06-03 20:18:32
 * @LastEditor: BATU1579
 * @LastTime: 2022-08-16 01:16:27
 * @FilePath: \\src\\types\\utils.d.ts
 * @Description: 
 */
declare module 'utils' {
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

    // TODO: 想办法替换成长整数
    class Long extends Number {

    }

    class Double extends Number {

    }

    type Color = number | string;
}