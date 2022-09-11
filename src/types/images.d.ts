/*
 * @Author: Hamibot hello@hamibot.com
 * @Date: 2022-06-09 13:31:45
 * @LastEditors: BATU1579
 * @LastEditTime: 2022-06-10 09:53:47
 * @FilePath: \\src\\types\\images.d.ts
 * @Description: 图像操作模块
 * 
 * Copyright (c) 2022 by Hamibot hello@hamibot.com, All Rights Reserved. 
 */
declare module 'images' {
    import { ByteArray } from 'files';

    global {
        /**
         * @description: images 模块提供了一些手机设备中常见的图片处理函数，包括截图、读写图片、图片剪裁、旋转、二值化、找色找图等。
         * 
         * 该模块分为两个部分，找图找色部分和图片处理部分。
         * 
         * **注意！：**
         * 
         * - image 对象创建后尽量在不使用时进行回收，同时避免循环创建大量图片。Image 对象通过调用 `recycle()` 函数来回收。
         * -  `caputerScreen()` 返回的图片不需要回收。
         * 
         * @example
         * ```typescript
         * // 读取图片
         * let img = images.read('./1.png');
         * // 对图片进行操作
         * ...
         * // 回收图片
         * img.recycle();
         * ```
         */
        const images: Images;

        /**
         * @description: 在 Hamibot 有两种方式表示一个颜色。
         * 
         * 一种是使用一个字符串 `#AARRGGBB` 或 `#RRGGBB` ，其中 AA 是 Alpha 通道（透明度）的值，RR 是 R 通道（红色）的值，GG 是 G 通道（绿色）的值，BB 是 B 通道（蓝色）的值。例如 `#ffffff` 表示白色， `#7F000000` 表示半透明的黑色。
         * 
         * 另一种是使用一个 16 进制的 32 位整数 0xAARRGGBB 来表示一个颜色，例如 0xFF112233 表示颜色 `#112233` ， 0x11223344 表示颜色 `#11223344`。
         * 
         * 可以通过 `colors.toString()` 把颜色整数转换为字符串，通过 `colors.parseColor()` 把颜色字符串解析为颜色整数。
         */
        const colors: Colors;

        // 声明全局函数

        /**
         * @description: 向系统申请屏幕截图权限。该函数在截图脚本中只需执行一次，而无需每次调用 `captureScreen()` 都调用一次。
         * 
         * *建议（：*
         * 
         * - 第一次使用该函数会弹出截图权限请求，在对话框中选择总是允许。
         * 
         * 
         * *建议（：*
         * 
         * - 在本软件界面运行该函数，在其他软件界面运行时容易出现一闪而过的黑屏现象。
         * 
         * 
         * **注意！：**
         * 
         * - 如果不指定 `landscape` 值，则截图方向由当前设备屏幕方向决定，因此务必注意执行该函数时的屏幕方向。
         * - 这个函数只是申请截图权限，并不会真正执行截图，真正的截图函数是 `captureScreen()` 。
         * 
         * @param {boolean} landscape 要执行的截屏是否为横屏。如果 `landscape` 为 `false` ，则表示竖屏截图; `true` 为横屏截图。
         * @return {boolean} 权限是否获取成功。
         * @example
         * ```typescript
         * // 请求截图
         * auto.waitFor();
         * if (!requestScreenCapture()) {
         *     toastLog('没有授予 Hamibot 屏幕截图权限');
         *     hamibot.exit();
         * }
         * // 连续截图10张图片(间隔1秒)并保存到存储卡目录
         * for (let i = 0; i < 10; i++) {
         *     captureScreen('/sdcard/screencapture' + i + '.png');
         *     sleep(1000);
         * }
         * ```
         */
        function requestScreenCapture(landscape?: boolean): boolean;

        /**
         * @description: 截取当前屏幕并返回一个 Image 对象。没有截图权限时执行该函数会抛出  `SecurityException` 。
         * 
         * 该函数不会返回 `null` ，两次调用可能返回相同的 `Image` 对象。这是因为设备截图的更新需要一定的时间，短时间内（一般来说是 16 毫秒）连续调用则会返回同一张截图。截图需要转换为 Bitmap 格式，从而该函数执行需要一定的时间（ 0~20 毫秒）。另外在 `requestScreenCapture()` 执行成功后需要一定时间后才有截图可用，因此如果立即调用 `captureScreen()` ，会等待一定时间后（一般为几百毫秒）才返回截图。
         * @return {CaptureImage} 当前屏幕的截图。
         * @example
         * ```typescript
         * // 请求横屏截图
         * requestScreenCapture(true);
         * // 截图
         * let img = captureScreen();
         * // 获取在点(100, 100)的颜色值
         * let color = images.pixel(img, 100, 100);
         * // 显示该颜色值
         * toast(colors.toString(color));
         * ```
         */
        function captureScreen(): CaptureImage;

        /**
         * @description: 截取当前屏幕并以 `PNG` 格式保存到 `path` 中。如果文件不存在会被创建；文件存在会被覆盖。没有截图权限时执行该函数会抛出  `SecurityException` 。
         * @param {string} path 截图保存路径。
         */
        function captureScreen(path: string): void;

        /**
         * @description: 在图片中寻找颜色 color。
         * @param {BaseImage} image 操作的图片。
         * @param {Color} color 要寻找的颜色的 RGB 值。如果是一个整数，则以 0xRRGGBB 的形式代表 RGB 值（A 通道会被忽略）。如果是字符串，则以 `#RRGGBB` 代表其 RGB 值。
         * @param {ColorOptions2} options 查找选项。
         * @return {Point | null} 找到时返回找到的点 `Point` ，找不到时返回 `null` 。
         * @example
         * ```typescript
         * // 读取本地图片/sdcard/1.png
         * let img = images.read('/sdcard/1.png');
         * // 判断图片是否加载成功
         * if (!img) {
         *     toast('没有该图片');
         *     hamibot.exit();
         * }
         * // 在该图片中找色，指定找色区域为在位置(400, 500)的宽为300长为200的区域，指定找色临界值为4
         * let point = findColor(img, '#00ff00', {
         *     region: [400, 500, 300, 200],
         *     threshold: 4,
         * });
         * if (point) {
         *     toast('找到啦:' + point);
         * } else {
         *     toast('没找到');
         * }
         * ```
         */
        function findColor(image: BaseImage, color: Color, options?: ColorOptions2): Point | null;

        /**
         * @description: 在图片中寻找颜色 color。
         * @param {BaseImage} image 操作的图片。
         * @param {Color} color 要寻找的颜色的 RGB 值。如果是一个整数，则以 0xRRGGBB 的形式代表 RGB 值（A 通道会被忽略）。如果是字符串，则以 `#RRGGBB` 代表其 RGB 值。
         * @param {ColorOptions4} options 查找选项。
         * @return {Point | null} 找到时返回找到的点 `Point` ，找不到时返回 `null` 。
         * @example
         * ```typescript
         * // 读取本地图片/sdcard/1.png
         * let img = images.read('/sdcard/1.png');
         * // 判断图片是否加载成功
         * if (!img) {
         *     toast('没有该图片');
         *     hamibot.exit();
         * }
         * // 在该图片中找色，指定找色区域为在位置(400, 500)的宽为300长为200的区域，指定找色临界值为4
         * let point = findColor(img, '#00ff00', {
         *     region: [400, 500, 300, 200],
         *     threshold: 4,
         * });
         * if (point) {
         *     toast('找到啦:' + point);
         * } else {
         *     toast('没找到');
         * }
         * ```
         */
        function findColor(image: BaseImage, color: Color, options?: ColorOptions4): Point | null;

        /**
         * @description: 区域找色的简便方法。
         * @param {BaseImage} img 操作的图片。
         * @param {Color} color 要寻找的颜色的 RGB 值。如果是一个整数，则以 0xRRGGBB 的形式代表 RGB 值（A 通道会被忽略）。如果是字符串，则以 `#RRGGBB` 代表其 RGB 值。
         * @param {number} x 找色区域左上角的横坐标。
         * @param {number} y 找色区域左上角的纵坐标。
         * @param {number} width 找色区域的宽度。
         * @param {number} height 找色区域的高度。
         * @param {number} threshold 找色时颜色相似度的临界值（默认为 4 ），范围为 0-255（越小越相似，0 为颜色相等，255 为任何颜色都能匹配）。 `threshold` 和浮点数相似度（0.0-1.0）的换算为 ：
         * 
         * `similarity = (255 - threshold) / 255` 。
         * @return {Point | null} 找到时返回找到的点 `Point` ，找不到时返回 `null` 。
         */
        function findColorInRegion(img: BaseImage, color: Color, x: number, y: number, width?: number, height?: number, threshold?: number): Point | null;

        /**
         * @description: 在图片 `img` 指定区域中找到颜色和 `color` 完全相等的某个点。找色区域通过x, y, width, height指定，如果不指定找色区域，则在整张图片中寻找。
         * @param {BaseImage} img 操作的图片。
         * @param {Color} color 要寻找的颜色。
         * @param {number} [x] 找色区域的左上角横坐标。
         * @param {number} [y] 找色区域的左上角纵坐标。
         * @param {number} [width] 找色区域的宽度。
         * @param {number} [height] 找色区域的高度。
         * @return {Point | null} 找到时返回找到的点 `Point` ，找不到时返回 `null` 。
         * @example
         * ```typescript
         * // 通过找 QQ 红点的颜色来判断是否有未读消息
         * requestScreenCapture();
         * launchApp('QQ');
         * sleep(1200);
         * let p = findColorEquals(captureScreen(), '#f64d30');
         * if (p) {
         *     toast('有未读消息');
         * } else {
         *     toast('没有未读消息');
         * }
         * ```
         */
        function findColorEquals(img: BaseImage, color: Color, x?: number, y?: number, width?: number, height?: number): Point | null;

        /**
         * @description: 找图。在大图片 `img` 中查找小图片 `template` 的位置（模块匹配）。
         * @param {BaseImage} img 用于进行搜索的完整图片。
         * @param {BaseImage} template 要在 `img` 图片中寻找的子图片（模板）。
         * @param {TemplateOptions2} [options] 查找选项。
         * @return {Point | null} 找到时返回位置坐标（ `Point` ），找不到时返回 `null` 。
         * @example
         * ```typescript
         * // 简单的找图例子
         * let img = images.read('/sdcard/大图.png')!;
         * let templ = images.read('/sdcard/小图.png')!;
         * let p = findImage(img, templ);
         * if (p) {
         *     toast('找到啦:' + p);
         * } else {
         *     toast('没找到');
         * }
         * ```
         * @example
         * ```typescript
         * auto();
         * requestScreenCapture();
         * let wx = images.read('/sdcard/微信图标.png')!;
         * // 返回桌面
         * home();
         * // 截图并找图
         * let p = findImage(captureScreen(), wx, {
         *     region: [0, 50],
         *     threshold: 0.8,
         * });
         * if (p) {
         *     toast('在桌面找到了微信图标啦: ' + p);
         * } else {
         *     toast('在桌面没有找到微信图标');
         * }
         * ```
         */
        function findImage(img: BaseImage, template: BaseImage, options?: TemplateOptions2): Point | null;

        /**
         * @description: 找图。在大图片 `img` 中查找小图片 `template` 的位置（模块匹配）。
         * @param {BaseImage} img 用于进行搜索的完整图片。
         * @param {BaseImage} template 要在 `img` 图片中寻找的子图片（模板）。
         * @param {TemplateOptions4} [options] 查找选项。
         * @return {Point | null} 找到时返回位置坐标（ `Point` ），找不到时返回 `null` 。
         * @example
         * ```typescript
         * // 简单的找图例子
         * let img = images.read('/sdcard/大图.png')!;
         * let templ = images.read('/sdcard/小图.png')!;
         * let p = findImage(img, templ);
         * if (p) {
         *     toast('找到啦:' + p);
         * } else {
         *     toast('没找到');
         * }
         * ```
         * @example
         * ```typescript
         * auto();
         * requestScreenCapture();
         * let wx = images.read('/sdcard/微信图标.png')!;
         * // 返回桌面
         * home();
         * // 截图并找图
         * let p = findImage(captureScreen(), wx, {
         *     region: [0, 50],
         *     threshold: 0.8,
         * });
         * if (p) {
         *     toast('在桌面找到了微信图标啦: ' + p);
         * } else {
         *     toast('在桌面没有找到微信图标');
         * }
         * ```
         */
        function findImage(img: BaseImage, template: BaseImage, options?: TemplateOptions4): Point | null;

        /**
         * @description: 区域找图的简便方法。在大图片 `img` 中查找小图片 `template` 的位置（模块匹配）。
         * @param {BaseImage} img 用于进行搜索的完整图片。
         * @param {BaseImage} template 要在 `img` 图片中寻找的子图片（模板）。
         * @param {number} x 找色区域左上角的横坐标。
         * @param {number} y 找色区域左上角的纵坐标。
         * @param {number} [width] 找色区域的宽度。
         * @param {number} [height] 找色区域的高度。
         * @param {number} [threshold] 找色时颜色相似度的临界值（默认为 4 ），范围为 0-255（越小越相似，0 为颜色相等，255 为任何颜色都能匹配）。 `threshold` 和浮点数相似度（0.0-1.0）的换算为 ：
         * 
         * `similarity = (255 - threshold) / 255` 。
         * @return {Point | null} 找到时返回位置坐标（ `Point` ），找不到时返回 `null` 。
         */
        function findImageInRegion(img: BaseImage, template: BaseImage, x: number, y: number, width?: number, height?: number, threshold?: number): Point | null;
    }

    interface Images {
        /**
         * @description: 读取在路径 `path` 的图片文件并返回一个 `Image` 对象。
         * @param {string} path 图片路径。
         * @return {Image | null} 读取到的图片对象。如果文件不存在或者文件无法解码则返回 `null` 。
         */
        read(path: string): Image | null;

        /**
         * @description: 加载在地址 URL 的网络图片并返回一个 `Image` 对象。
         * @param {string} url 图片 URL 地址。
         * @return {Image | null} 获取到的图片。如果地址不存在或者图片无法解码则返回 `null` 。
         */
        load(url: string): Image | null;

        /**
         * @description: 复制一张图片并返回新的副本。该函数会完全复制 img 对象的数据。
         * @param {BaseImage} img 要复制的图片。
         * @return {Image} 复制后的图片副本。
         */
        copy(img: BaseImage): Image;

        /**
         * @description: 把图片 `image` 以 `format` 格式保存到 `path` 中。如果文件不存在会被创建；文件存在会被覆盖。
         * @param {BaseImage} image 要存储的图片对象。
         * @param {string} path 文件路径。
         * @param {ImageFormat} [format] 图片格式（默认为 `png` ），可选的值为:
         * 
         * - `png`
         * - `jpeg`
         * - `jpg`
         * - `webp`
         * 
         * @param {number} [quality] 图片质量，为 0~100 的整数值（默认为 100 ）。
         * @example
         * ```typescript
         * // 把图片压缩为原来的一半质量并保存
         * let img = images.read('/sdcard/1.png');
         * images.save(img, '/sdcard/1.jpg', 'jpg', 50);
         * app.viewFile('/sdcard/1.jpg');
         * ```
         */
        save(image: BaseImage, path: string, format?: ImageFormat, quality?: number): void;

        /**
         * @description: 解码 Base64 数据为图片。
         * @param {string} base64 图片的 Base64 数据
         * @return {Image | null} 解码 Base64 数据并返回解码后的图片 `Image` 对象。如果 base64 无法解码则返回 `null` 。
         */
        fromBase64(base64: string): Image | null;

        /**
         * @description: 把图片编码为 base64 数据并返回。
         * @param {BaseImage} img 要编码的图片对象。
         * @param {ImageFormat} [format] 图片格式（默认为 `png` ），可选的值为:
         * 
         * - `png`
         * - `jpeg`
         * - `jpg`
         * - `webp`
         * 
         * @param {number} [quality] 图片质量，为 0~100 的整数值（默认为 100 ）。
         * @return {string} base64 编码后的字符串。
         */
        toBase64(img: BaseImage, format?: ImageFormat, quality?: number): string;

        /**
         * @description: 解码字节数组 `bytes` 为 Image 对象。
         * @param {ByteArray} bytes 字节数组。
         * @return {Image | null} 解码后的图片 Image 对象。如果 `bytes` 无法解码则返回 `null` 。
         */
        fromBytes(bytes: ByteArray): Image | null;

        /**
         * @description: 把图片编码为字节数组并返回。
         * @param {BaseImage} img 要编码的图片对象。
         * @param {ImageFormat} [format] 图片格式（默认为 `png` ），可选的值为:
         * 
         * - `png`
         * - `jpeg`
         * - `jpg`
         * - `webp`
         * 
         * @param {number} [quality] 图片质量，为 0~100 的整数值（默认为 100 ）。
         * @return {ByteArray} 编码后的字节数组。
         */
        toBytes(img: BaseImage, format?: ImageFormat, quality?: number): ByteArray;

        /**
         * @description: 从图片 `img` 的位置 (x, y) 处剪切大小为 `w` * `h` 的区域，并返回该剪切区域的新图片。
         * @param {BaseImage} img 要裁切的图片对象。
         * @param {number} x 剪切区域的左上角横坐标。
         * @param {number} y 剪切区域的左上角纵坐标。
         * @param {number} w 剪切区域的宽度。
         * @param {number} h 剪切区域的高度。
         * @return {Image} 裁切后的图片对象。
         * @example
         * ```typescript
         * let src = images.read('/sdcard/1.png');
         * let clip = images.clip(src, 100, 100, 400, 400);
         * images.save(clip, '/sdcard/clip.png');
         * ```
         */
        clip(img: BaseImage, x: number, y: number, w: number, h: number): Image;

        /**
         * @description: 调整图片大小，并返回调整后的新图片。
         * @param {BaseImage} img 要调整的图片。
         * @param {array} size 调整后图片的尺寸。两个元素的数组 [w, h] ，分别表示宽度和高度；如果只有一个元素 [x,] ，则宽度和高度相等。
         * @param {InterpolationFunction} [interpolation] 插值方法（默认为 `LINEAR` ），可选的值为:
         * 
         * - `NEAREST` - 最近邻插值。
         * - `LINEAR` - 线性插值。
         * - `AREA` - 区域插值。
         * - `CUBIC` - 三次样条插值。
         * - `LANCZOS4` - Lanczos 插值。
         * 
         * 更多信息参见 [InterpolationFlags] 。
         * 
         * [InterpolationFlags]: https://docs.opencv.org/3.4.4/da/d54/group__imgproc__transform.html#ga5bb5a1fea74ea38e1a5445ca803ff121
         * @return {Image} 调整后的图片。
         * @example
         * ```typescript
         * // 把图片放缩为 200*300
         * images.resize(img, [200, 300])
         * ```
         */
        resize(img: BaseImage, size: ImageSize, interpolation?: InterpolationFunction): Image;

        /**
         * @description: 调整图片大小，并返回调整后的新图片。
         * @param {BaseImage} img 要调整的图片。
         * @param {array} size 调整后图片的尺寸。两个元素的数组 [w, h] ，分别表示宽度和高度；如果只有一个元素 [x,] ，则宽度和高度相等。
         * @param {string} [interpolation] 插值方法（默认为 `LINEAR` ），可选的值为:
         * 
         * - `NEAREST` - 最近邻插值。
         * - `LINEAR` - 线性插值。
         * - `AREA` - 区域插值。
         * - `CUBIC` - 三次样条插值。
         * - `LANCZOS4` - Lanczos 插值。
         * 
         * 更多信息参见 [InterpolationFlags] 。
         * 
         * [InterpolationFlags]: https://docs.opencv.org/3.4.4/da/d54/group__imgproc__transform.html#ga5bb5a1fea74ea38e1a5445ca803ff121
         * @return {Image} 调整后的图片。
         * @example
         * ```typescript
         * // 把图片放缩为 200*300
         * images.resize(img, [200, 300])
         * ```
         */
        resize(img: BaseImage, size: ImageSize, interpolation?: string): Image;

        /**
         * @description: 放缩图片，并返回放缩后的新图片。
         * @param {BaseImage} img 要调整的图片。
         * @param {number} fx 宽度放缩倍数。
         * @param {number} fy 高度放缩倍数。
         * @param {InterpolationFunction} [interpolation] 插值方法（默认为 `LINEAR` ），可选的值为:
         * 
         * - `NEAREST` - 最近邻插值。
         * - `LINEAR` - 线性插值。
         * - `AREA` - 区域插值。
         * - `CUBIC` - 三次样条插值。
         * - `LANCZOS4` - Lanczos 插值。
         * 
         * 更多信息参见 [InterpolationFlags] 。
         * 
         * [InterpolationFlags]: https://docs.opencv.org/3.4.4/da/d54/group__imgproc__transform.html#ga5bb5a1fea74ea38e1a5445ca803ff121
         * @return {Image} 调整后的图片。
         * @example
         * ```typescript
         * // 把图片变成原来的一半
         * images.scale(img, 0.5, 0.5)
         * ```
         */
        scale(img: BaseImage, fx: number, fy: number, interpolation?: InterpolationFunction): Image;

        /**
         * @description: 放缩图片，并返回放缩后的新图片。
         * @param {BaseImage} img 要调整的图片。
         * @param {number} fx 宽度放缩倍数。
         * @param {number} fy 高度放缩倍数。
         * @param {string} [interpolation] 插值方法（默认为 `LINEAR` ），可选的值为:
         * 
         * - `NEAREST` - 最近邻插值。
         * - `LINEAR` - 线性插值。
         * - `AREA` - 区域插值。
         * - `CUBIC` - 三次样条插值。
         * - `LANCZOS4` - Lanczos 插值。
         * 
         * 更多信息参见 [InterpolationFlags] 。
         * 
         * [InterpolationFlags]: https://docs.opencv.org/3.4.4/da/d54/group__imgproc__transform.html#ga5bb5a1fea74ea38e1a5445ca803ff121
         * @return {Image} 调整后的图片。
         * @example
         * ```typescript
         * // 把图片变成原来的一半
         * images.scale(img, 0.5, 0.5)
         * ```
         */
        scale(img: BaseImage, fx: number, fy: number, interpolation?: string): Image;

        /**
         * @description: 将图片逆时针旋转 `degress` 度，返回旋转后的新图片。
         * @param {BaseImage} img 要调整的图片。
         * @param {number} degrees 图片逆时针旋转的角度。
         * @param {number} [x] 旋转中心 x 坐标，默认为图片中点。
         * @param {number} [y] 旋转中心 y 坐标，默认为图片中点。
         * @return {Image} 调整后的图片。
         * @example
         * ```typescript
         * // 将图片逆时针旋转 90 度
         * images.rotate(img, 90)
         * ```
         */
        rotate(img: BaseImage, degrees: number, x?: number, y?: number): Image;

        /**
         * @description: 连接两张图片，并返回连接后的图像。如果两张图片大小不一致，小的那张将适当居中。
         * @param {BaseImage} img1 图片1。
         * @param {BaseImage} img2 图片2。
         * @param {string} [direction] 连接方向（默认为 `RIGHT` ），可选的值为：
         * 
         * - `LEFT` - 将 `img2` 接到 `img1` 左边。
         * - `RIGHT` - 将 `img2` 接到 `img1` 右边。
         * - `TOP` - 将 `img2` 接到 `img1` 上边。
         * - `BOTTOM` - 将 `img2` 接到 `img1` 下边。
         * 
         * @return {Image} 连接后的图片。
         */
        concat(img1: BaseImage, img2: BaseImage, direction?: 'LEFT' | 'RIGHT' | 'BOTTOM' | 'TOP'): Image;

        /**
         * @description: 灰度化图片，并返回灰度化后的图片。
         * @param {BaseImage} img 要调整的图片。
         * @return {Image} 调整后的图片。
         */
        gratscale(img: BaseImage): Image;

        /**
         * @description: 对图片进行阈值化处理。可以参考有关博客（比如 [threshold 函数的使用] ）或者 OpenCV 文档 [threshold] 。
         * 
         * [threshold 函数的使用]: https://blog.csdn.net/u012566751/article/details/77046445
         * [threshold]: https://docs.opencv.org/3.4.4/d7/d1b/group__imgproc__misc.html#gae8a4a146d1ca78c626a53577199e9c57)
         * @param {BaseImage} img 要调整的图片。
         * @param {number} threshold 阈值。
         * @param {number} maxValue 最大值。
         * @param {ThresholdType} [type]  阈值化类型（默认为 `BINARY` ），参见 [ThresholdTypes] ，可选的值为：
         * 
         * - `BINARY` - 超过阈值的值设置 `maxValue` ，其他值设置为 `0` 。
         * - `BINARY_INV` - 超过阈值的值设置为 `0` ，其他值设置为 `maxValue` 。
         * - `TRUNC` - 过阈值的值设置为 `threshold` ，其他值 ***不变*** 。
         * - `TOZERO` - 超过阈值的值 ***不变*** ，其他值设置为 `0` 。
         * - `TOZERO_INV` - 超过阈值的值设置为 `0` ，其他值 ***不变*** 。
         * - `OTSU` - 大津法自动寻求全局阈值。
         * - `TRIANGLE` - 三角形法自动寻求全局阈值。
         * 
         * [ThresholdTypes]: https://docs.opencv.org/3.4.4/d7/d1b/group__imgproc__misc.html#gaa9e58d2860d4afa658ef70a9b1115576)
         * @return {Image} 调整后的图片。
         * @example
         * ```typescript
         * // 将图片中大于 100 的值全部变成 255，其余变成 0 。
         * images.threshold(img, 100, 255, 'BINARY')
         * ```
         */
        threshold(img: BaseImage, threshold: number, maxValue: number, type?: ThresholdType): Image;

        /**
         * @description: 对图片进行自适应阈值化处理。可以参考有关博客（比如 [threshold 与 adaptiveThreshold] ）或者 OpenCV 文档 [adaptiveThreshold] 。
         * 
         * [threshold 与 adaptiveThreshold]: https://blog.csdn.net/guduruyu/article/details/68059450
         * [adaptiveThreshold]: https://docs.opencv.org/3.4.4/d7/d1b/group__imgproc__misc.html#ga72b913f352e4a1b1b397736707afcde3
         * @param {BaseImage} img 要调整的图片。
         * @param {number} maxValue 最大值。
         * @param {string} adaptiveMethod 在一个邻域内计算阈值所采用的算法，可选的值为：
         * 
         * - `MEAN_C` - 计算出领域的平均值再减去参数 `C` 的值。
         * - `GAUSSIAN_C` - 计算出领域的高斯均值再减去参数 `C` 的值。
         * 
         * @param {string} ThresholdType 阈值化类型，可选的值有：
         * 
         * - `BINARY` - 超过阈值的值设置 `maxValue` ，其他值设置为 `0` 。
         * - `BINARY_INV` - 超过阈值的值设置为 `0` ，其他值设置为 `maxValue` 。
         * 
         * @param {number} blockSize 邻域块大小。
         * @param {number} C 偏移值调整量。
         * @return {Image} 调整后的图片。
         */
        adaptiveThreshold(img: BaseImage, maxValue: number, adaptiveMethod: 'MEAN_C' | 'GAUSSIAN_C', ThresholdType: 'BINARY' | 'BINARY_INV', blockSize: number, C: number): Image;

        /**
         * @description: 对图像进行颜色空间转换。可以参考有关博客（比如 [颜色空间转换] ）或者 OpenCV 文档 [cvtColor] 。
         * 
         * [颜色空间转换]: https://blog.csdn.net/u011574296/article/details/70896811?locationNum=14&fps=1
         * [cvtColor]: https://docs.opencv.org/3.4.4/d8/d01/group__imgproc__color__conversions.html#ga397ae87e1288a81d2363b61574eb8cab
         * @param {BaseImage} img 要调整的图片。
         * @param {string} code 颜色空间转换的类型，可选的值有一共有 205 个（参见  [ColorConversionCodes] ），这里只列出几个：
         * 
         * - `BGR2GRAY` - BGR 转换为灰度。
         * - `BGR2HSV` - BGR 转换为 HSV。
         * 
         * [ColorConversionCodes]: https://docs.opencv.org/3.4.4/d8/d01/group__imgproc__color__conversions.html#ga4e0972be5de079fed4e3a10e24ef5ef0
         * @param {number} [dstCn] 目标图像的颜色通道数量，如果不填写则根据其他参数自动决定。
         * @return {Image} 调整后的图片。
         */
        cvtColor(img: BaseImage, code: 'BGR2GRAY' | 'BGR2HSV', dstCn?: number): Image;

        /**
         * @description: 将图片二值化，在 lowerBound~upperBound 范围以外的颜色都变成 0，在范围以内的颜色都变成 255。
         * @param {BaseImage} img 要调整的图片。
         * @param {number} lowerBound 颜色下界（0~255 或 十六进制颜色代码）。
         * @param {number} upperBound 颜色上界（0~255 或 十六进制颜色代码）。
         * @return {Image} 调整后的图片。
         * @example
         * ```typescript
         * images.inRange(img, '#000000', '#222222');
         * ```
         */
        inRange(img: BaseImage, lowerBound: Color, upperBound: Color): Image;

        /**
         * @description: 将图片二值化，在 `color` - `interval` ~ `color` + `interval` 范围以外的颜色都变成 0，在范围以内的颜色都变成 255。这里对 color 的加减是对每个通道而言的。
         * @param {BaseImage} img 要调整的图片。()
         * @param {Color} color 颜色值（0~255 或 十六进制颜色代码）。
         * @param {number} interval 每个通道的范围间隔。
         * @return {Image} 调整后的图片。
         * @example
         * ```typescript
         * // 把 #787878~#989898 的颜色变成 #FFFFFF，把这个范围以外的变成 #000000。
         * images.interval(img, '#888888', 16)
         * ```
         */
        interval(img: BaseImage, color: Color, interval: number): Image;

        /**
         * @description: 对图像进行模糊（平滑处理）。可以参考有关博客（比如 [实现图像平滑处理] 、 [调整图像边缘] ）或者 OpenCV 文档 [blur] 。
         * 
         * [实现图像平滑处理]: https://www.cnblogs.com/denny402/p/3848316.html
         * [调整图像边缘]: https://blog.csdn.net/shuiyixin/article/details/106472722/
         * [blur]: https://docs.opencv.org/3.4.4/d4/d86/group__imgproc__filter.html#ga8c45db9afe636703801b0b2e440fce37
         * @param {BaseImage} img 要调整的图片。
         * @param {ImageSize} size 定义模糊内核大小，例如 `[3, 3]` 。
         * @param {array} [anchor] 指定锚点位置（被平滑点），默认为 `[-1, -1]` 即图像中心。
         * @param {BorderType} [type] 推断边缘像素类型，默认为 `DEFAULT` ，可选的值为：
         * 
         * > 示例说明：填充的左边界 | 图像内容 | 填充的右边界
         * 
         * - `CONSTANT` - iiiiii|abcdefgh|iiiiiii 使用指定像素值来填充边缘，需要额外指定的像素。
         * - `REPLICATE` - aaaaaa|abcdefgh|hhhhhhh 复制边界像素值来填充边缘。
         * - `REFLECT` - fedcba|abcdefgh|hgfedcb 反射复制边界像素值来反转填充边缘。
         * - `WRAP` - cdefgh|abcdefgh|abcdefg 用另外一边的像素来补偿填充。
         * - `REFLECT_101` - gfedcb|abcdefgh|gfedcba 反射复制边界像素旁边的像素值来反转填充边缘。
         * - `TRANSPARENT` - uvwxyz|abcdefgh|ijklmno 。
         * - `REFLECT101` - 和 `BORDER_REFLECT_101` 相同。
         * - `DEFAULT` - 和 `BORDER_REFLECT_101` 相同。
         * - `ISOLATED` - 使用黑色进行填充。
         * 
         * @return {Image} 调整后的图片。
         */
        blur(img: BaseImage, size: ImageSize, anchor?: [number, number], type?: BorderType): Image;

        /**
         * @description: 对图像进行中值滤波。可以参考有关博客（比如 [实现图像平滑处理] ）或者 OpenCV 文档 [blur] 。
         * 
         * [实现图像平滑处理]: https://www.cnblogs.com/denny402/p/3848316.html
         * [blur]: https://docs.opencv.org/3.4.4/d4/d86/group__imgproc__filter.html#ga8c45db9afe636703801b0b2e440fce37
         * @param {BaseImage} img 要调整的图片。
         * @param {ImageSize} size 定义模糊内核大小，例如 `[3, 3]` 。
         * @return {Image} 调整后的图片。
         */
        medianBlur(img: BaseImage, size: ImageSize): Image;

        /**
         * @description: 对图像进行高斯模糊。可以参考有关博客（比如 [实现图像平滑处理] 、 [调整图像边缘] ）或者 OpenCV 文档 [blur] 。
         * 
         * [实现图像平滑处理]: https://www.cnblogs.com/denny402/p/3848316.html
         * [调整图像边缘]: https://blog.csdn.net/shuiyixin/article/details/106472722/
         * [blur]: https://docs.opencv.org/3.4.4/d4/d86/group__imgproc__filter.html#ga8c45db9afe636703801b0b2e440fce37
         * @param {BaseImage} img 要调整的图片。
         * @param {ImageSize} size 定义模糊内核大小，例如 `[3, 3]` 。
         * @param {number} [sigmaX] x 方向的标准方差，不填写则自动计算。
         * @param {number} [sigmaY] y 方向的标准方差，不填写则自动计算。
         * @param {BorderType} [type] 推断边缘像素类型，默认为 `DEFAULT` ，可选的值为：
         * 
         * > 示例说明：填充的左边界 | 图像内容 | 填充的右边界
         * 
         * - `CONSTANT` - iiiiii|abcdefgh|iiiiiii 使用指定像素值来填充边缘，需要额外指定的像素。
         * - `REPLICATE` - aaaaaa|abcdefgh|hhhhhhh 复制边界像素值来填充边缘。
         * - `REFLECT` - fedcba|abcdefgh|hgfedcb 反射复制边界像素值来反转填充边缘。
         * - `WRAP` - cdefgh|abcdefgh|abcdefg 用另外一边的像素来补偿填充。
         * - `REFLECT_101` - gfedcb|abcdefgh|gfedcba 反射复制边界像素旁边的像素值来反转填充边缘。
         * - `TRANSPARENT` - uvwxyz|abcdefgh|ijklmno 。
         * - `REFLECT101` - 和 `BORDER_REFLECT_101` 相同。
         * - `DEFAULT` - 和 `BORDER_REFLECT_101` 相同。
         * - `ISOLATED` - 使用黑色进行填充。
         * 
         * @return {Image} 调整后的图片。
         */
        gaussianBlur(img: BaseImage, size: ImageSize, sigmaX?: number, sigmaY?: number, type?: BorderType): Image;

        /**
         * @description: 把 Mat 对象转换为 `Image` 对象。
         * @param {object} mat OpenCV 的 Mat 对象
         * @return {Image} 转换后的 `Image` 对象
         */
        matToImage(mat: object): Image;

        /**
         * @description: 向系统申请屏幕截图权限。该函数在截图脚本中只需执行一次，而无需每次调用 `captureScreen()` 都调用一次。
         * 
         * *建议（：*
         * 
         * - 第一次使用该函数会弹出截图权限请求，在对话框中选择总是允许。
         * 
         * 
         * *建议（：*
         * 
         * - 在本软件界面运行该函数，在其他软件界面运行时容易出现一闪而过的黑屏现象。
         * 
         * 
         * **注意！：**
         * 
         * - 如果不指定 `landscape` 值，则截图方向由当前设备屏幕方向决定，因此务必注意执行该函数时的屏幕方向。
         * - 这个函数只是申请截图权限，并不会真正执行截图，真正的截图函数是 `captureScreen()` 。
         * 
         * @param {boolean} [landscape] 要执行的截屏是否为横屏。如果 `landscape` 为 `false` ，则表示竖屏截图; `true` 为横屏截图。
         * @return {boolean} 权限是否获取成功。
         * @example
         * ```typescript
         * // 请求截图
         * auto.waitFor();
         * if (!requestScreenCapture()) {
         *     toastLog('没有授予 Hamibot 屏幕截图权限');
         *     hamibot.exit();
         * }
         * // 连续截图10张图片(间隔1秒)并保存到存储卡目录
         * for (let i = 0; i < 10; i++) {
         *     captureScreen('/sdcard/screencapture' + i + '.png');
         *     sleep(1000);
         * }
         * ```
         */
        requestScreenCapture(landscape?: boolean): boolean;

        /**
         * @description: 截取当前屏幕并返回一个 Image 对象。没有截图权限时执行该函数会抛出  `SecurityException` 。
         * 
         * 该函数不会返回 `null` ，两次调用可能返回相同的 `Image` 对象。这是因为设备截图的更新需要一定的时间，短时间内（一般来说是 16 毫秒）连续调用则会返回同一张截图。截图需要转换为 Bitmap 格式，从而该函数执行需要一定的时间（ 0~20 毫秒）。另外在 `requestScreenCapture()` 执行成功后需要一定时间后才有截图可用，因此如果立即调用 `captureScreen()` ，会等待一定时间后（一般为几百毫秒）才返回截图。
         * @return {CaptureImage} 当前屏幕的截图。
         * @example
         * ```typescript
         * // 请求横屏截图
         * requestScreenCapture(true);
         * // 截图
         * let img = captureScreen();
         * // 获取在点(100, 100)的颜色值
         * let color = images.pixel(img, 100, 100);
         * // 显示该颜色值
         * toast(colors.toString(color));
         * ```
         */
        captureScreen(): CaptureImage;

        /**
         * @description: 截取当前屏幕并以 `PNG` 格式保存到 `path` 中。如果文件不存在会被创建；文件存在会被覆盖。没有截图权限时执行该函数会抛出  `SecurityException` 。
         * @param {string} path 截图保存路径。
         */
        captureScreen(path: string): void;

        /**
         * @description: 返回图片 image 在点 (x, y) 处的像素的 ARGB 值。坐标系以图片左上角为原点。以图片左侧边为 y 轴，上侧边为 x 轴。
         * @param {BaseImage} image 操作的图片。
         * @param {number} x 要获取的像素的横坐标。
         * @param {number} y 要获取的像素的纵坐标。
         * @return {number} 点 (x, y) 处的像素的 ARGB 值。该值的格式为 0xAARRGGBB，是一个'32 位整数'（虽然 JavaScript 中并不区分整数类型和其他数值类型）。
         */
        pixel(image: BaseImage, x: number, y: number): number;

        /**
         * @description: 在图片中寻找颜色 color。
         * @param {BaseImage} image 操作的图片。
         * @param {Color} color 要寻找的颜色的 RGB 值。如果是一个整数，则以 0xRRGGBB 的形式代表 RGB 值（A 通道会被忽略）。如果是字符串，则以 `#RRGGBB` 代表其 RGB 值。
         * @param {ColorOptions2} [options] 查找选项。
         * @return {Point | null} 找到时返回找到的点 `Point` ，找不到时返回 `null` 。
         * @example
         * ```typescript
         * // 读取本地图片/sdcard/1.png
         * let img = images.read('/sdcard/1.png');
         * // 判断图片是否加载成功
         * if (!img) {
         *     toast('没有该图片');
         *     hamibot.exit();
         * }
         * // 在该图片中找色，指定找色区域为在位置(400, 500)的宽为300长为200的区域，指定找色临界值为4
         * let point = findColor(img, '#00ff00', {
         *     region: [400, 500, 300, 200],
         *     threshold: 4,
         * });
         * if (point) {
         *     toast('找到啦:' + point);
         * } else {
         *     toast('没找到');
         * }
         * ```
         */
        findColor(image: BaseImage, color: Color, options?: ColorOptions2): Point | null;

        /**
         * @description: 在图片中寻找颜色 color。
         * @param {BaseImage} image 操作的图片。
         * @param {Color} color 要寻找的颜色的 RGB 值。如果是一个整数，则以 0xRRGGBB 的形式代表 RGB 值（A 通道会被忽略）。如果是字符串，则以 `#RRGGBB` 代表其 RGB 值。
         * @param {ColorOptions4} [options] 查找选项。
         * @return {Point | null} 找到时返回找到的点 `Point` ，找不到时返回 `null` 。
         * @example
         * ```typescript
         * // 读取本地图片/sdcard/1.png
         * let img = images.read('/sdcard/1.png');
         * // 判断图片是否加载成功
         * if (!img) {
         *     toast('没有该图片');
         *     hamibot.exit();
         * }
         * // 在该图片中找色，指定找色区域为在位置(400, 500)的宽为300长为200的区域，指定找色临界值为4
         * let point = findColor(img, '#00ff00', {
         *     region: [400, 500, 300, 200],
         *     threshold: 4,
         * });
         * if (point) {
         *     toast('找到啦:' + point);
         * } else {
         *     toast('没找到');
         * }
         * ```
         */
        findColor(image: BaseImage, color: Color, options?: ColorOptions4): Point | null;

        /**
         * @description: 区域找色的简便方法。
         * @param {BaseImage} img 操作的图片。
         * @param {Color} color 要寻找的颜色的 RGB 值。如果是一个整数，则以 0xRRGGBB 的形式代表 RGB 值（A 通道会被忽略）。如果是字符串，则以 `#RRGGBB` 代表其 RGB 值。
         * @param {number} x 找色区域左上角的横坐标。
         * @param {number} y 找色区域左上角的纵坐标。
         * @param {number} [width] 找色区域的宽度。
         * @param {number} [height] 找色区域的高度。
         * @param {number} [threshold] 找色时颜色相似度的临界值（默认为 4 ），范围为 0-255（越小越相似，0 为颜色相等，255 为任何颜色都能匹配）。 `threshold` 和浮点数相似度（0.0-1.0）的换算为 ：
         * 
         * `similarity = (255 - threshold) / 255` 。
         * @return {Point | null} 找到时返回找到的点 `Point` ，找不到时返回 `null` 。
         */
        findColorInRegion(img: BaseImage, color: Color, x: number, y: number, width?: number, height?: number, threshold?: number): Point | null;

        /**
         * @description: 在图片 `img` 指定区域中找到颜色和 `color` 完全相等的某个点。找色区域通过x, y, width, height指定，如果不指定找色区域，则在整张图片中寻找。
         * @param {BaseImage} img 操作的图片。
         * @param {Color} color 要寻找的颜色。
         * @param {number} [x] 找色区域的左上角横坐标。
         * @param {number} [y] 找色区域的左上角纵坐标。
         * @param {number} [width] 找色区域的宽度。
         * @param {number} [height] 找色区域的高度。
         * @return {Point | null} 找到时返回找到的点 `Point` ，找不到时返回 `null` 。
         * @example
         * ```typescript
         * // 通过找 QQ 红点的颜色来判断是否有未读消息
         * requestScreenCapture();
         * launchApp('QQ');
         * sleep(1200);
         * let p = findColorEquals(captureScreen(), '#f64d30');
         * if (p) {
         *     toast('有未读消息');
         * } else {
         *     toast('没有未读消息');
         * }
         * ```
         */
        findColorEquals(img: BaseImage, color: Color, x?: number, y?: number, width?: number, height?: number): Point | null;

        /**
         * @description: 多点找色，类似于按键精灵的多点找色，其过程如下：
         * 1. 在图片 img 中找到颜色 `firstColor` 的位置 (x0, y0) 。
         * 2. 对于数组 `colors` 的每个元素 [x, y, color] ，检查图片 `img` 在位置 (x + x0, y + y0) 上的像素是否是颜色 `color` ，是的话返回 (x0, y0) ，否则继续寻找 `firstColor` 的位置，重新执行第一步。
         * 3. 整张图片都找不到时返回 null 。
         * @param {BaseImage} img 操作的图片。
         * @param {Color} firstColor 起始点的颜色。
         * @param {array} colors 表示剩下的点相对于第一个点的位置和颜色的数组，数组的每个元素为 [x, y, color] 。
         * @param {ColorOptions2} [options] 查找选项。
         * @return {Point | null} 找到时返回第一个找到的点 `Point` ，找不到时返回 `null` 。
         * @example
         * ```typescript
         * // 假设图片在(100, 200)的位置的颜色为 #123456
         * // 这时如果 (110, 220) 的位置的颜色为 #fffff
         * // 且 (130, 240) 的位置的颜色为 #000000
         * // 则函数返回点 (100, 200)
         * images.findMultiColors(
         *     img,
         *     '#123456',
         *     [
         *         [10, 20, '#ffffff'],
         *         [30, 40, '#000000']
         *     ]
         * )
         * ```
         */
        findMultiColors(img: BaseImage, firstColor: Color, colors: ([number, number, Color])[], options?: ColorOptions2): Point | null;

        /**
         * @description: 多点找色，类似于按键精灵的多点找色，其过程如下：
         * 1. 在图片 img 中找到颜色 `firstColor` 的位置 (x0, y0) 。
         * 2. 对于数组 `colors` 的每个元素 [x, y, color] ，检查图片 `img` 在位置 (x + x0, y + y0) 上的像素是否是颜色 `color` ，是的话返回 (x0, y0) ，否则继续寻找 `firstColor` 的位置，重新执行第一步。
         * 3. 整张图片都找不到时返回 null 。
         * @param {BaseImage} img 操作的图片。
         * @param {Color} firstColor 起始点的颜色。
         * @param {array} colors 表示剩下的点相对于第一个点的位置和颜色的数组，数组的每个元素为 [x, y, color] 。
         * @param {ColorOptions4} [options] 查找选项。
         * @return {Point | null} 找到时返回第一个找到的点 `Point` ，找不到时返回 `null` 。
         * @example
         * ```typescript
         * // 假设图片在(100, 200)的位置的颜色为 #123456
         * // 这时如果 (110, 220) 的位置的颜色为 #fffff
         * // 且 (130, 240) 的位置的颜色为 #000000
         * // 则函数返回点 (100, 200)
         * images.findMultiColors(
         *     img,
         *     '#123456',
         *     [
         *         [10, 20, '#ffffff'],
         *         [30, 40, '#000000']
         *     ]
         * )
         * ```
         */
        findMultiColors(img: BaseImage, firstColor: Color, colors: ([number, number, Color])[], options?: ColorOptions4): Point | null;

        /**
         * @description: 检测图片 `image` 在位置 (x, y) 处是否匹配到颜色 `color` 。用于检测图片中某个位置是否是特定颜色。
         * @param {BaseImage} image 操作的图片。
         * @param {Color} color 要检测的颜色。
         * @param {number} x 要检测的位置横坐标。
         * @param {number} y 要检测的位置纵坐标。
         * @param {number} [threshold] 找色时颜色相似度的临界值（默认为 4 ），范围为 0-255（越小越相似，0 为颜色相等，255 为任何颜色都能匹配）。 `threshold` 和浮点数相似度（0.0-1.0）的换算为 ：
         * 
         * `similarity = (255 - threshold) / 255` 。
         * @param {string} [algorithm] 颜色匹配算法，可选的值为：
         * 
         * - `equal` - 相等匹配，只有与给定颜色 `color` 完全相等时才匹配。
         * - `diff` - 差值匹配。与给定颜色的 R、G、B 差的绝对值之和小于 `threshold` 时匹配。
         * - `rgb` - RGB 欧拉距离相似度。与给定颜色 `color` 的 RGB 欧拉距离小于等于 `threshold` 时匹配。
         * - `rgb+` - 加权 RGB 欧拉距离匹配（LAB Delta E）。
         * - `hs` - hs 欧拉距离匹配。hs 为 HSV 空间的色调值。
         * 
         * @return {boolean} 匹配成功返回 `true` 否则返回 `false` 。
         * @example
         * ```typescript
         * requestScreenCapture();
         * // 找到点赞控件
         * let like = id('ly_feed_like_icon').findOne();
         * // 获取该控件中点坐标
         * let x = like.bounds().centerX();
         * let y = like.bounds().centerY();
         * // 截图
         * let img = captureScreen();
         * // 判断在该坐标的颜色是否为橙红色
         * if (images.detectsColor(img, '#fed9a8', x, y)) {
         *     // 是的话则已经是点赞过的了，不做任何动作
         * } else {
         *     // 否则点击点赞按钮
         *     like.click();
         * }
         * ```
         */
        detectsColor(image: BaseImage, color: Color, x: number, y: number, threshold?: number, algorithm?: string): boolean;

        /**
         * @description: 找图。在大图片 `img` 中查找小图片 `template` 的位置（模块匹配）。
         * @param {BaseImage} img 用于进行搜索的完整图片。
         * @param {BaseImage} template 要在 `img` 图片中寻找的子图片（模板）。
         * @param {TemplateOptions2} [options] 查找选项。
         * @return {Point | null} 找到时返回位置坐标（ `Point` ），找不到时返回 `null` 。
         * @example
         * ```typescript
         * // 简单的找图例子
         * let img = images.read('/sdcard/大图.png')!;
         * let templ = images.read('/sdcard/小图.png')!;
         * let p = findImage(img, templ);
         * if (p) {
         *     toast('找到啦:' + p);
         * } else {
         *     toast('没找到');
         * }
         * ```
         * @example
         * ```typescript
         * // 稍微复杂点的区域找图例子
         * auto();
         * requestScreenCapture();
         * let wx = images.read('/sdcard/微信图标.png')!;
         * // 返回桌面
         * home();
         * // 截图并找图
         * let p = findImage(captureScreen(), wx, {
         *     region: [0, 50],
         *     threshold: 0.8,
         * });
         * if (p) {
         *     toast('在桌面找到了微信图标啦: ' + p);
         * } else {
         *     toast('在桌面没有找到微信图标');
         * }
         * ```
         */
        findImage(img: BaseImage, template: BaseImage, options?: TemplateOptions2): Point | null;

        /**
         * @description: 找图。在大图片 `img` 中查找小图片 `template` 的位置（模块匹配）。
         * @param {BaseImage} img 用于进行搜索的完整图片。
         * @param {BaseImage} template 要在 `img` 图片中寻找的子图片（模板）。
         * @param {TemplateOptions4} [options] 查找选项。
         * @return {Point | null} 找到时返回位置坐标（ `Point` ），找不到时返回 `null` 。
         * @example
         * ```typescript
         * // 简单的找图例子
         * let img = images.read('/sdcard/大图.png')!;
         * let templ = images.read('/sdcard/小图.png')!;
         * let p = findImage(img, templ);
         * if (p) {
         *     toast('找到啦:' + p);
         * } else {
         *     toast('没找到');
         * }
         * ```
         * @example
         * ```typescript
         * // 稍微复杂点的区域找图例子
         * auto();
         * requestScreenCapture();
         * let wx = images.read('/sdcard/微信图标.png')!;
         * // 返回桌面
         * home();
         * // 截图并找图
         * let p = findImage(captureScreen(), wx, {
         *     region: [0, 50],
         *     threshold: 0.8,
         * });
         * if (p) {
         *     toast('在桌面找到了微信图标啦: ' + p);
         * } else {
         *     toast('在桌面没有找到微信图标');
         * }
         * ```
         */
        findImage(img: BaseImage, template: BaseImage, options?: TemplateOptions4): Point | null;

        /**
         * @description: 区域找图的简便方法。在大图片 `img` 中查找小图片 `template` 的位置（模块匹配）。
         * @param {BaseImage} img 用于进行搜索的完整图片。
         * @param {BaseImage} template 要在 `img` 图片中寻找的子图片（模板）。
         * @param {number} x 找色区域左上角的横坐标。
         * @param {number} y 找色区域左上角的纵坐标。
         * @param {number} [width] 找色区域的宽度。
         * @param {number} [height] 找色区域的高度。
         * @param {number} [threshold] 找色时颜色相似度的临界值（默认为 4 ），范围为 0-255（越小越相似，0 为颜色相等，255 为任何颜色都能匹配）。 `threshold` 和浮点数相似度（0.0-1.0）的换算为 ：
         * 
         * `similarity = (255 - threshold) / 255` 。
         * @return {Point | null} 找到时返回位置坐标（ `Point` ），找不到时返回 `null` 。
         */
        findImageInRegion(img: BaseImage, template: BaseImage, x: number, y: number, width?: number, height?: number, threshold?: number): Point | null;

        /**
         * @description: 在大图片中搜索小图片。该函数可以用于找图时找出多个位置，可以通过 `max` 参数控制最大的结果数量。也可以对匹配结果进行排序、求最值等操作。
         * @param {BaseImage} img 用于进行搜索的完整图片。
         * @param {BaseImage} template 要在 `img` 图片中寻找的子图片（模板）。
         * @param {TemplateOptions2} [options] 查找选项。
         * @return {MatchingResult} 搜索结果。
         */
        matchTemplate(img: BaseImage, template: BaseImage, options: TemplateOptions2): MatchingResult;

        /**
         * @description: 在大图片中搜索小图片。该函数可以用于找图时找出多个位置，可以通过 `max` 参数控制最大的结果数量。也可以对匹配结果进行排序、求最值等操作。
         * @param {BaseImage} img 用于进行搜索的完整图片。
         * @param {BaseImage} template 要在 `img` 图片中寻找的子图片（模板）。
         * @param {TemplateOptions4} [options] 查找选项。
         * @return {MatchingResult} 搜索结果。
         */
        matchTemplate(img: BaseImage, template: BaseImage, options: TemplateOptions4): MatchingResult;
    }

    class MatchingResult {
        /**
         * @description: 匹配结果的数组。
         */
        matches: Match[];

        /**
         * @description: 匹配到的图片左上角位置的数组。
         */
        points: Point[];

        /**
         * @description: 获取第一个匹配结果。
         * @return {Match | null} 匹配结果数组中的第一个元素，如果没有任何匹配，则返回null。
         */
        first(): Match | null;

        /**
         * @description: 获取最后一个匹配结果。
         * @return {Match | null} 匹配结果数组中的最后一个元素，如果没有任何匹配，则返回null。
         */
        last(): Match | null;

        /**
         * @description: 获取位于大图片最左边的匹配结果。
         * @return {Match | null} 匹配结果中匹配位置横坐标最小的结果，如果没有任何匹配，则返回null。
         */
        leftmost(): Match | null;

        /**
         * @description: 获取位于大图片最上边的匹配结果。
         * @return {Match | null} 匹配结果中匹配位置纵坐标最小的结果，如果没有任何匹配，则返回null。
         */
        topmost(): Match | null;

        /**
         * @description: 获取位于大图片最右边的匹配结果。
         * @return {Match | null} 匹配结果中匹配位置横坐标最大的结果，如果没有任何匹配，则返回null。
         */
        rightmost(): Match | null;

        /**
         * @description: 获取位于大图片最下边的匹配结果。
         * @return {Match | null} 匹配结果中匹配位置纵坐标最大的结果，如果没有任何匹配，则返回null。
         */
        bottommost(): Match | null;

        /**
         * @description: 获取相似度最高的匹配结果。
         * @return {Match | null} 匹配结果中 `similarity` 属性数值最大的结果，如果没有任何匹配，则返回null。
         */
        best(): Match | null;

        /**
         * @description: 获取相似度最高的匹配结果。
         * @return {Match | null} 匹配结果中 `similarity` 属性数值最小的结果，如果没有任何匹配，则返回null。
         */
        worst(): Match | null;

        /**
         * @description: 对匹配结果进行排序
         * @param {string} cmp 排序方向。
         * 
         * 例如 `left` 表示将匹配结果按匹配位置从左往右排序、 `top` 表示将匹配结果按匹配位置从上往下排序， `left-top` 表示将匹配结果按匹配位置从左往右、从上往下排序。方向包括 `left` （左）， `top` （上）， `right` （右）， `bottom` （下）。
         * @return {MatchingResult} 排序后的结果。
         * @example
         * ```typescript
         * let result = images.matchTemplate(img, template, {
         *     max: 100,
         * });
         * log(result.sortBy('top-right'));
         * ```
         */
        sortBy(cmp: SortDirection): MatchingResult;
    }

    class BaseImage {
        /**
         * @description: 获取图片宽度。
         * @return {number} 图片宽度，单位像素。
         */
        getWidth(): number;

        /**
         * @description: 获取图片高度。
         * @return {number} 图片高度，单位像素。
         */
        getHeight(): number;

        /**
         * @description: 把图片保存到路径 `path` 。（如果文件存在则覆盖）
         * @param {string} path 图片存放路径。
         */
        saveTo(path: string): void;

        /**
         * @description: 获取图片 `image` 在点 (x, y) 处的像素的 ARGB 值。
         * 
         * **注意！：**
         * 
         * - 坐标系以图片左上角为原点。以图片左侧边为 y 轴，上侧边为 x 轴。
         * 
         * @param {number} x 横坐标。
         * @param {number} y 纵坐标。
         * @return {number} 点 (x, y) 处的像素的 ARGB 值。该值的格式为 0xAARRGGBB，是一个'32 位整数'（虽然 JavaScript 中并不区分整数类型和其他数值类型）。
         */
        pixel(x: number, y: number): number;
    }

    class Image extends BaseImage {
        /**
         * @description: 回收创建的图片对象。
         */
        recycle(): void;
    }

    class CaptureImage extends BaseImage {}

    class Point {
        /**
         * @description: 横坐标。
         */
        x: number;

        /**
         * @description: 纵坐标。
         */
        y: number;
    }

    interface Colors {
        /**
         * @description: 将颜色数值转换为字符串。
         * @param {number} color 整数 RGB 颜色值。
         * @return {string} 颜色值的字符串，格式为 `#AARRGGBB` 。
         */
        toString(color: number): string;

        /**
         * @description: 提取颜色中红色通道的值。
         * @param {Color} color 颜色值。
         * @return {number} 颜色 `color` 的 R 通道的值，范围 0~255 。
         */
        red(color: Color): number;

        /**
         * @description: 提取颜色中绿色通道的值。
         * @param {Color} color 颜色值。
         * @return {number} 颜色 `color` 的 G 通道的值，范围 0~255 。
         */
        green(color: Color): number;

        /**
         * @description: 提取颜色中蓝色通道的值。
         * @param {Color} color 颜色值。
         * @return {number} 颜色 `color` 的 B 通道的值，范围 0~255 。
         */
        blue(color: Color): number;

        /**
         * @description: 提取颜色中透明度通道的值。
         * @param {Color} color 颜色值。
         * @return {number} 颜色 `color` 的 A 通道的值，范围 0~255 。
         */
        alpha(color: Color): number;

        /**
         * @description: 将 RGB 三个通道合成为颜色值。Alpha 通道将是 255（不透明）。
         * @param {number} red 颜色的 R 通道的值
         * @param {number} green 颜色的 G 通道的值
         * @param {number} blue 颜色的 B 通道的值
         * @return {number} 合成的颜色值。
         */
        rgb(red: number, green: number, blue: number): number;

        /**
         * @description: 将 ARGB 四个通道合成为颜色值。
         * @param {number} alpha 颜色的 Alpha 通道的值
         * @param {number} red 颜色的 R 通道的值
         * @param {number} green 颜色的 G 通道的值
         * @param {number} blue 颜色的 B 通道的值
         * @return {number} 合成的颜色值。
         */
        argb(alpha: number, red: number, green: number, blue: number): number;

        /**
         * @description: 将颜色字符串转换为数值。
         * @param {string} colorStr 表示颜色的字符串，例如 `#112233` 。
         * @return {number} 转换后的颜色值。
         */
        parseColor(colorStr: string): number;

        /**
         * @description: 比较两个颜色是否相似。
         * @param {Color} color1 颜色值 1。
         * @param {Color} color2 颜色值 2。
         * @param {number} [threshold] 找色时颜色相似度的临界值（默认为 4 ），范围为 0-255（越小越相似，0 为颜色相等，255 为任何颜色都能匹配）。 `threshold` 和浮点数相似度（0.0-1.0）的换算为 ：
         * 
         * `similarity = (255 - threshold) / 255` 。
         * @param {string} [algorithm] 颜色匹配算法，可选的值为：
         * 
         * - `equal` - 相等匹配，只有与给定颜色 `color` 完全相等时才匹配。
         * - `diff` - 差值匹配。与给定颜色的 R、G、B 差的绝对值之和小于 `threshold` 时匹配。
         * - `rgb` - RGB 欧拉距离相似度。与给定颜色 `color` 的 RGB 欧拉距离小于等于 `threshold` 时匹配。
         * - `rgb+` - 加权 RGB 欧拉距离匹配（LAB Delta E）。
         * - `hs` - hs 欧拉距离匹配。hs 为 HSV 空间的色调值。
         * 
         * @return {boolean} 相似返回 `true` 否则返回 `false` 。
         */
        isSimilar(color1: Color, color2: Color, threshold?: number, algorithm?: string): boolean;

        /**
         * @description: 比较两个颜色是否相等。
         * 
         * **注意！：**
         * 
         * - 该函数会忽略 Alpha 通道的值进行比较。
         * 
         * @param {Color} color1 颜色值 1。
         * @param {Color} color2 颜色值 2。
         * @return {boolean} 相等返回 `true` 否则返回 `false` 。
         */
        equals(color1: Color, color2: Color): boolean;

        /**
         * @description: 黑色，颜色值 #FF000000
         */
        readonly BLACK: string;

        /**
         * @description: 深灰色，颜色值 #FF444444
         */
        readonly DKGRAY: string;

        /**
         * @description: 灰色，颜色值 #FF888888
         */
        readonly GRAY: string;

        /**
         * @description: 亮灰色，颜色值 #FFCCCCCC
         */
        readonly LTGRAY: string;

        /**
         * @description: 白色，颜色值 #FFFFFFFF
         */
        readonly WHITE: string;

        /**
         * @description: 红色，颜色值 #FFFF0000
         */
        readonly RED: string;

        /**
         * @description: 绿色，颜色值 #FF00FF00
         */
        readonly GREEN: string;

        /**
         * @description: 蓝色，颜色值 #FF0000FF
         */
        readonly BLUE: string;

        /**
         * @description: 黄色，颜色值 #FFFFFF00
         */
        readonly YELLOW: string;

        /**
         * @description: 青色，颜色值 #FF00FFFF
         */
        readonly GYAN: string;

        /**
         * @description: 品红色，颜色值 #FFFF00FF
         */
        readonly MAGENTA: string;

        /**
         * @description: 透明，颜色值 #00000000
         */
        readonly TRANSPARENT: string;

    }

    type Color = number | string;

    type ImageFormat = 'png' | 'jpeg' | 'jpg' | 'webp';

    type InterpolationFunction = 'NEAREST' | 'LINEAR' | 'AREA' | 'CUBIC' | 'LANCZOS4';

    type ThresholdType = (
        'BINARY' |
        'BINARY_INV' |
        'TRUNC' |
        'TOZERO' |
        'TOZERO_INV' |
        'OTSU' |
        'TRIANGLE'
    )

    type ImageSize = number | [number] | [number, number]

    type BorderType = (
        'BORDER_CONSTANT' |
        'BORDER_REPLICATE' |
        'BORDER_REFLECT' |
        'BORDER_WRAP' |
        'BORDER_REFLECT_101' |
        'BORDER_TRANSPARENT' |
        'BORDER_REFLECT101' |
        'BORDER_DEFAULT' |
        'BORDER_ISOLATED'
    )

    type ColorOptions2 = TwoItemRegionOptions & ThresholdOptions;

    type ColorOptions4 = FourItemRegionOptions & ThresholdOptions;

    type TemplateOptions2 = ColorOptions2 & TemplateOptions;

    type TemplateOptions4 = ColorOptions4 & TemplateOptions;

    interface ThresholdOptions {
        /**
         * @description: 找色时颜色相似度的临界值（默认为 4 ），范围为 0-255（越小越相似，0 为颜色相等，255 为任何颜色都能匹配）。 `threshold` 和浮点数相似度（0.0-1.0）的换算为 ：
         * 
         * `similarity = (255 - threshold) / 255` 。
         */
        threshold?: number;
    }

    interface TwoItemRegionOptions {
        /**
         * @description: 设置找色区域为 (region[0], region[1]) 到图片右下角。如果不指定 `region` 选项，则找色区域为整张图片。
         * 
         * - `region[0]` - 找色区域左上角的横坐标。
         * - `region[1]` - 找色区域左上角的纵坐标。
         * 
         */
        region?: [number, number];
    }

    interface FourItemRegionOptions {
        /**
         * @description: 设置找色区域为 (region[0], region[1]) 到 (region[0] + region[2], region[1] + region[3]) 。如果不指定 `region` 选项，则找色区域为整张图片。
         * 
         * - `region[0]` - 找色区域左上角的横坐标。
         * - `region[1]` - 找色区域左上角的纵坐标。
         * - `region[2]` - 找色区域的宽度。
         * - `region[3]` - 找色区域的高度。
         * 
         */
        region?: [number, number, number, number];
    }

    interface TemplateOptions {
        /**
         * @description: 找图算法是采用图像金字塔进行的， `level` 参数表示金字塔的层次, `level` 越大可能带来越高的找图效率，但也可能造成找图失败（图片因过度缩小而无法分辨）或返回错误位置。因此，除非您清楚该参数的意义并需要进行性能调优，否则不需要用到该参数。
         * 
         * **注意！：**
         * 
         * - 一般而言不必修改此参数。不加此参数时该参数会根据图片大小自动调整。
         * 
         */
        level?: number;

        /**
         * @description: 找图结果最大数量（默认为 5 ）。
         */
        max?: number;
    }

    type DetectAlgorithm = (
        'equal' |
        'diff' |
        'rgb' |
        'rgb+' |
        'hs'
    )

    class Match {
        /**
         * @description: 匹配到的子图片（ `template` ）左上角的坐标。
         */
        point: Point;

        /**
         * @description: 搜索到的图片和子图片（ `template` ）相似度。
         */
        similarity: number;
    }

    type SortDirection = (
        'left' |
        'right' |
        'top' |
        'bottom' |
        'left-top' |
        'left-bottom' |
        'right-top' |
        'right-bottom'
        // 'bottom-left' |
        // 'bottom-right' |
        // 'top-left' |
        // 'top-right'
    )
}
