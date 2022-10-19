/*
 * @Author: Hamibot hello@hamibot.com
 * @CreateDate: 2022-06-09 13:31:43
 * @LastEditors: BATU1579
 * @LastTime: 2022-09-11 10:01:13
 * @FilePath: \\src\\types\\http.d.ts
 * @Description: 网络操作模块
 * 
 * Copyright (c) 2022 by Hamibot hello@hamibot.com, All Rights Reserved. 
 */
declare module 'http' {
    import { ByteArray } from 'files';
    import { PWritableTextFile, ReadableTextFile } from 'files';

    global {
        /**
         * @description: http 模块提供一些进行 http 请求的函数。
         */
        const http: Http;
    }

    interface Http {
        /**
         * @description: 对地址 `url` 进行一次 HTTP GET 请求。如果没有回调函数，则在请求完成或失败时返回此次请求的响应。
         * @param {string} url 请求的 URL 地址，需要以'http://'或'https://'开头。如果 `url` 没有以'http://'开头，则默认为'http://'。
         * @param {HttpRequestOptions} [options] 请求选项。
         * @param {function} [callback] 回调函数。参数为 `Response` 对象。返回值为 any 。如果不加回调函数，则该请求将阻塞、同步地执行。
         * @return {Response} 请求的响应对象
         * @example
         * ```typescript
         * console.show();
         * let r = http.get('www.baidu.com');
         * log('code = ' + r.statusCode);
         * log('html = ' + r.body.string());
         * ```
         * @example
         * ```typescript
         * // 使用回调函数显示响应信息
         * console.show();
         * http.get('www.baidu.com', {}, function(res, err) {
         *     if (err) {
         *         console.error(err);
         *         return;
         *     }
         *     log('code = ' + res.statusCode);
         *     log('html = ' + res.body.string());
         * });
         * ```
         * @example
         * ```typescript
         * // 设置 HTTP 头部信息
         * console.show();
         * let r = http.get('www.baidu.com', {
         *     headers: {
         *         'Accept-Language': 'zh-cn,zh;q=0.5',
         *         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.84 Safari/537.36',
         *     },
         * });
         * log('code = ' + r.statusCode);
         * log('html = ' + r.body.string());
         * ```
         */
        get(url: string, options?: HttpRequestOptions, callback?: (res: Response) => any): Response;

        /**
         * @description: 对地址 `url` 进行一次 HTTP POST 请求。如果没有回调函数，则在请求完成或失败时返回此次请求的响应。其中 POST 数据可以是字符串或键值对。具体含义取决于 `options.contentType` 的值。默认为'application/x-www-form-urlencoded', 这种方式是 JQuery 的 ajax 函数的默认方式。
         * @param {string} url 请求的 URL 地址，需要以'http://'或'https://'开头。如果 `url` 没有以'http://'开头，则默认为'http://'。
         * @param {Object} data POST 数据。
         * @param {HttpRequestOptions} [options] 请求选项。
         * @param {function} [callback] 回调函数。参数为 `Response` 对象。返回值为 any 。如果不加回调函数，则该请求将阻塞、同步地执行。
         * @return {Response} 请求的响应对象
         * @example
         * ```typescript
         * // 模拟表单提交登录淘宝
         * var url = 'https://login.taobao.com/member/login.jhtml';
         * let username = '你的用户名';
         * let password = '你的密码';
         * let res = http.post(url, {
         *     TPL_username: username,
         *     TPL_password: password,
         * });
         * let html = res.body.string();
         * if (html.contains('页面跳转中')) {
         *     toast('登录成功');
         * } else {
         *     toast('登录失败');
         * }
         * ```
         */
        post(url: string, data: Object, options?: HttpRequestOptions, callback?: (res: Response) => any): Response;

        /**
         * @description: 以 JSON 格式向目标 `Url` 发起 POST 请求。如果没有回调函数，则在请求完成或失败时返回此次请求的响应。JSON 格式指的是，将会调用 `JSON.stringify()` 把 `data` 对象转换为 JSON 字符串，并在 HTTP 头部信息中把'Content-Type'属性置为'application/json'。这种方式是 AngularJS 的 ajax 函数的默认方式。
         * @param {string} url 请求的 URL 地址，需要以'http://'或'https://'开头。如果 `url` 没有以'http://'开头，则默认为'http://'。
         * @param {object} data POST 数据。
         * @param {HttpRequestOptions} [options] 请求选项。
         * @param {function} [callback] 回调函数。参数为 `Response` 对象。返回值为 any 。如果不加回调函数，则该请求将阻塞、同步地执行。
         * @return {Response} 请求的响应对象
         * @example
         * ```typescript
         * // 调用图灵机器人接口
         * let url = 'http://www.tuling123.com/openapi/api';
         * r = http.postJson(url, {
         *     key: 'key',
         *     info: '你好啊',
         *     userid: '1',
         * });
         * toastLog(r.body.string());
         * ```
         */
        postJson(url: string, data: object, options?: HttpRequestOptions, callback?: (res: Response) => any): Response;

        /**
         * @description: 向目标地址发起类型为 multipart/form-data 的请求（通常用于文件上传等）, 其中 files 参数是<name1: value1, name2: value2, ...>的键值对，value 的格式可以是以下几种情况：
         *  - 文件类型，即 `open()` 返回的类型
         *  - [fileName, filePath]
         *  - [fileName, mimeType, filePath]
         * @param {string} url 请求的 URL 地址，需要以'http://'或'https://'开头。如果 `url` 没有以'http://'开头，则默认为'http://'。
         * @param {FileOptions} files POST 数据。
         * @param {HttpRequestOptions} [options] 请求选项。
         * @param {function} [callback] 回调函数。参数为 `Response` 对象。返回值为 any 。如果不加回调函数，则该请求将阻塞、同步地执行。
         * @return {Response} 请求的响应对象
         * @example
         * ```typescript
         * // 文件类型
         * let res = http.postMultipart(url, {
         *     file: open('/sdcard/1.txt'),
         * });
         * log(res.body.string());
         * ```
         * @example
         * ```typescript
         * // [fileName, filePath]
         * let res = http.postMultipart(url, {
         *     file: ['1.txt', '/sdcard/1.txt'],
         * });
         * log(res.body.string());
         * ```
         * @example
         * ```typescript
         * // [fileName, mimeType, filePath]
         * var res = http.postMultipart(url, {
         *     file: ['1.txt', 'text/plain', '/sdcard/1.txt'],
         * });
         * log(res.body.string());
         * ```
         */
        postMultipart(url: string, files: FileOptions, options?: HttpRequestOptions, callback?: (res: Response) => any): Response;

        /**
         * @description: 对目标地址 url 发起一次 HTTP 请求。如果没有回调函数，则在请求完成或失败时返回此次请求的响应。
         * 
         * **注意！：**
         * 
         * - 该函数是 get, post, postJson 等函数的基础函数。因此除非是 PUT, DELET 等请求，或者需要更高定制的 HTTP 请求，否则直接使用 get, post, postJson 等函数会更加方便
         * 
         * @param {string} url 请求的 URL 地址，需要以'http://'或'https://'开头。如果 `url` 没有以'http://'开头，则默认为'http://'。
         * @param {HttpRequestOptions} [options] 请求选项。
         * @param {function} [callback] 回调函数。参数为 `Response` 对象。返回值为 any 。如果不加回调函数，则该请求将阻塞、同步地执行。
         * @return {Response} 请求的响应对象
         */
        request(url: string, options?: HttpRequestOptions, callback?: (res: Response) => any): Response;
    }

    /**
     * @description: HTTP 请求的响应。
     */
    interface Response {
        /**
         * @description: 当前响应的 HTTP 状态码。例如 200（OK）, 404（Not Found）等。有关 HTTP 状态码的信息，参见 [HTTP 响应代码] 。
         * 
         * [HTTP 响应代码]: https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status
         */
        readonly statusCode: number;

        /**
         * @description: 当前响应的 HTTP 状态信息。例如'OK', 'Bad Request', 'Forbidden'。有关 HTTP 状态码的信息，参见 [HTTP 响应代码] 。
         * 
         * [HTTP 响应代码]: https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status
         * @example
         * ```typescript
         * let res = http.get('www.baidu.com');
         * if (res.statusCode >= 200 && res.statusCode < 300) {
         *     toast('页面获取成功!');
         * } else if (res.statusCode == 404) {
         *     toast('页面没找到哦...');
         * } else {
         *     toast('错误: ' + res.statusCode + ' ' + res.statusMessage);
         * }
         * ```
         */
        readonly statusMessage: string;

        /**
         * @description: 当前响应的 HTTP 头部信息。该对象的键是响应头名称，值是各自的响应头值。
         * @example
         * ```typescript
         * console.show();
         * let res = http.get('www.qq.com');
         * console.log('HTTP Headers:');
         * for (var headerName in res.headers) {
         *     console.log('%s: %s', headerName, res.headers[headerName]);
         * }
         * ```
         */
        readonly headers: object;

        /**
         * @description: 当前响应的内容。
         */
        readonly body: ResponseBody;

        /**
         * @description: 当前响应所对应的请求。
         */
        readonly request: object;

        /**
         * @description: 当前响应所对应的请求 URL。
         */
        readonly url: string;

        /**
         * @description: 当前响应所对应的 HTTP 请求的方法。例如'GET', 'POST', 'PUT'等。
         */
        readonly method: string;
    }

    interface HttpRequestOptions {
        /**
         * @description: 键值对形式的 HTTP 头部信息。有关 HTTP 头部信息，参见 [HTTP Headers] 。
         * 
         * [HTTP Headers]: https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers
         */
        headers: object;

        /**
         * @description: HTTP 请求方法。
         */
        method: (
            'GET' |
            'POST' |
            'PUT' |
            'DELETE' |
            'PATCH' |
            'OPTIONS' |
            'HEAD' |
            'TRACE' |
            'CONNECT'
        );

        /**
         * @description: HTTP 头部信息中的'Content-Type', 表示 HTTP 请求的内容类型。例如'text/plain', 'application/json'。更多信息参见 [Content-Type] 。
         * 
         * [Content-Type]: https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type
         */
        contentType: string;

        // TODO: 明确函数定义。
        /**
         * @description: HTTP 请求的内容。可以是一个字符串，也可以是一个字节数组；或者是一个以 [BufferedSink] 为参数的函数。
         * 
         * [BufferedSink]: https://github.com/square/okio/blob/master/okio/src/main/java/okio/BufferedSink.java
         */
        body: string | ByteArray | Function;
    }

    // TODO: 检查多文件传输的情况
    interface FileOptions {
        file: (
            ReadableTextFile |
            PWritableTextFile |
            [string, string] |
            [string, string, string]
        );
        [prop: string]: any;
    }

    interface ResponseBody {
        /**
         * @description: 以字节数组形式返回响应内容
         */
        bytes(): ByteArray;

        /**
         * @description: 以字符串形式返回响应内容
         */
        string(): string;

        /**
         * @description: 把响应内容作为 JSON 格式的数据并调用 JSON.parse，返回解析后的对象
         */
        json(): object;

        /**
         * @description: 当前响应的内容类型
         */
        readonly contentType: string;
    }
}
