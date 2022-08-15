/*
 * @Author: BATU1579
 * @CreateDate: 2022-06-03 01:16:42
 * @LastEditor: BATU1579
 * @LastTime: 2022-08-16 03:08:49
 * @FilePath: \\src\\types\\ocr.d.ts
 * @Description: 文字识别模块
 */
declare module 'ocr' {
    import { Image } from "images";

    global {
        /**
         * @description: 文字识别（OCR）可以将图片中的文字信息转换为可编辑文本。
         * @author linkecoding
         */
        const ocr: OCR;
    }

    interface OCR {
        /**
         * @description: 识别图片中的文字。
         * @param {Image} img 要识别的图片。
         * @return {OcrResult} OCR 识别结果。
         * @since 1.2.2
         * @example
         * ```typescript
         * if (!requestScreenCapture()) {
         *     toastLog('没有授予 Hamibot 屏幕截图权限');
         *     hamibot.exit();
         * }
         * const img = captureScreen();
         * const res = ocr.recognize(img);
         * log(res);
         * ```
         */
        recognize(img: Image): OcrResult;

        /**
         * @description: 识别图片中的文字，只返回文本结果。
         * @param {Image} img 要识别的图片。
         * @return {OcrResult} OCR 识别结果。
         * @since 1.2.2
         * @example
         * ```typescript
         * if (!requestScreenCapture()) {
         *     toastLog('没有授予 Hamibot 屏幕截图权限');
         *     hamibot.exit();
         * }
         * const img = captureScreen();
         * const res = ocr.recognizeText(img);
         * log(res);
         * ```
         */
        recognizeText(img: Image): OcrResult;
    }

    // TODO: 补全属性和方法
    interface OcrResult {
        [prop: string]: any;
    }
}