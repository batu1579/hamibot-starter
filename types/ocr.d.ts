/*
 * @Author: BATU1579
 * @CreateDate: 2022-06-03 01:16:42
 * @LastEditor: BATU1579
 * @LastTime: 2022-10-23 22:32:24
 * @FilePath: \\types\\ocr.d.ts
 * @Description: 文字识别模块
 */
declare module 'ocr' {
    import { BaseImage } from "images";

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
         * @param {BaseImage} img 要识别的图片。
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
        recognize(img: BaseImage): OcrResult;

        /**
         * @description: 识别图片中的文字，只返回完整文本结果。
         * @param {BaseImage} img 要识别的图片。
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
        recognizeText(img: BaseImage): string;
    }

    interface OcrResult {
        /**
         * @description: 识别结果组合成的完整结果
         */
        text: string;

        /**
         * @description: 全部识别结果
         */
        results: OcrResultDetail[];

        /**
         * @description: 识别用时，单位毫秒。
         */
        elapsed: number;
    }

    interface OcrResultDetail {
        /**
         * @description: 识别结果的边缘坐标。
         */
        bounds: OcrResultBounds;

        /**
         * @description: 结果的置信度。
         */
        confidence: number;

        /**
         * @description: 识别结果。
         */
        text: string;
    }

    interface OcrResultBounds {
        bottom: number;
        left: number;
        right: number;
        top: number;
    }
}