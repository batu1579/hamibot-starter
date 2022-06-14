/*
 * @Author: Hamibot hello@hamibot.com
 * @Date: 2022-06-09 13:31:45
 * @LastEditors: Hamibot hello@hamibot.com
 * @LastEditTime: 2022-06-10 09:53:47
 * @Description: 
 * 
 * Copyright (c) 2022 by Hamibot hello@hamibot.com, All Rights Reserved. 
 */
declare namespace images {
  interface Image {
    headers?: object;
    method?: string | undefined;
    contentType?: string;
    body?: string | Array<string> | Function;
  }

  interface Point {
    x: number;
    y: number;
  }

  function read(path: string): Image;
  function load(url: string): Image;
  function copy(img: Image): Image;
  function save(
    img: Image,
    path: string,
    format?: 'png' | 'jpeg' | 'jpg' | 'webp',
    quality?: number
  ): void;
  function fromBase64(base64: string): Image | null;
  function toBase64(
    img: Image,
    format?: 'png' | 'jpeg' | 'jpg' | 'webp',
    quality?: number
  ): string;

  function findImage(
    img: Image,
    template: Image,
    options?: object
  ): Point | null;

  function requestScreenCapture(landscape?: boolean): boolean;
  function captureScreen(): Image;
}

declare function requestScreenCapture(landscape?: boolean): boolean;
declare function captureScreen(): images.Image;
