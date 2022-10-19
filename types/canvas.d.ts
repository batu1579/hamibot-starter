declare module 'canvas' {
    global {
        /**
         * @description: canvas 提供了使用画布进行 2D 画图的支持，可用于简单的小游戏开发或者图片编辑。使用 canvas 可以轻松地在一张图片或一个界面上绘制各种线与图形。
         * 
         * **注意！：**
         * 
         * -  Canvas 模块本质上是将 [Android Canvas] 进行包装后的结果。本模块的部分用法和文档暂时缺失，但可以在 Android 文档中找到。请参阅 Android Canvas、Android Paint 与 Android Path 了解更多细节。
         * 
         * [Android Canvas]: https://developer.android.google.cn/reference/android/graphics/Canvas
         */
        const canvas: Canvas;

        interface Canvas {

        }
    }
}