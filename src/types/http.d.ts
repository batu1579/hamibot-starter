/*
 * @Author: Hamibot hello@hamibot.com
 * @Date: 2022-06-09 13:31:43
 * @LastEditors: Hamibot hello@hamibot.com
 * @LastEditTime: 2022-06-10 09:53:27
 * @Description: 
 * 
 * Copyright (c) 2022 by Hamibot hello@hamibot.com, All Rights Reserved. 
 */
declare namespace http {
  interface RequestOptions {
    headers?: object;
    method?: string | undefined;
    contentType?: string;
    body?: string | Array<string> | Function;
  }

  function get(
    url: string,
    options?: RequestOptions,
    callback?: (res: Response) => any
  ): Response;

  function post(
    url: string,
    data: string | object,
    options?: RequestOptions,
    callback?: (res: Response) => any
  ): Response;

  function postJson(
    url: string,
    data: object,
    options?: RequestOptions,
    callback?: (res: Response) => any
  ): Response;

  function postMultipart(
    url: string,
    files: object,
    options?: RequestOptions,
    callback?: (res: Response) => any
  ): Response;

  function request(
    url: string,
    options?: RequestOptions,
    callback?: (res: Response) => any
  ): Response;

  interface Response {
    /**
     * @description: 当前响应的 HTTP 状态码。例如 200(OK), 404(Not Found)等。
     */
    statusCode: number;
    /**
     * @description: 当前响应的 HTTP 状态信息。例如"OK", "Bad Request", "Forbidden"。
     */
    statusMessage: string;
    /**
     * @description: 当前响应的 HTTP 头部信息。该对象的键是响应头名称，值是各自的响应头值。
     */
    headers: object;
    /**
     * @description: 当前响应的内容。他有以下属性和函数：
     */
    body: object;
    /**
     * @description: 当前响应所对应的请求
     */
    request: object;
    /**
     * @description: 当前响应所对应的请求 URL
     */
    url: string;
    /**
     * @description: 当前响应所对应的 HTTP 请求的方法。例如"GET", "POST", "PUT"等
     */
    method: string;
  }
}
