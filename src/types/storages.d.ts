/*
 * @Author: BATU1579
 * @CreateDate: 2022-07-12 15:05:54
 * @LastEditor: BATU1579
 * @LastTime: 2022-09-11 10:56:18
 * @FilePath: \\src\\types\\storages.d.ts
 * @Description: 存储模块
 */
declare module 'storages' {
    global {

        /**
         * @description: storages 模块提供了保存简单数据、用户配置等的支持。保存的数据除非应用被卸载或者被主动删除，否则会一直保留。
         * 
         * storages 支持number, boolean, string等数据类型以及把Object, Array用 `JSON.stringify` 序列化存取。
         * 
         * storages 保存的数据在脚本之间是共享的，任何脚本只要知道 storage 名称便可以获取到相应的数据，因此它不能用于敏感数据的储存。 storages 无法像 Web 开发中 `LocalStorage` 一样提供根据域名独立的存储，因为脚本的路径随时可能改变。
         */
        const storages: Storages;
    }

    interface Storages {
        /**
         * @description: 创建一个本地存储并返回一个 `Storage` 对象。不同名称的本地存储的数据是隔开的，而相同名称的本地存储的数据是共享的。
         * 
         * **注意！：**
         * 
         * - 本地存储的名称比较重要，尽量使用含有域名、作者邮箱等唯一信息的名称来避免冲突。
         * 
         * @param {string} name 本地存储名称
         * @return {Storage} 创建的本地存储对象
         * @example
         * ```typescript
         * let storage = storages.create('12345678@qq.com:ABC');
         * ```
         */
        create(name: string): Storage;

        /**
         * @description: 删除一个本地存储以及他的全部数据。
         * @param {string} name 本地存储名称
         * @return {boolean} 如果该存储不存在，返回 `false` ；否则返回 `true` 。
         */
        remove(name: string): boolean;
    }

    class Storage {
        /**
         * @description: 从本地存储中取出键为 `key` 的数据并返回。
         * 
         * **注意！：**
         * 
         * - 返回的数据可能是任意数据类型，这取决于使用 `Storage.put` 保存该键值的数据时的数据类型。
         * 
         * @param {string} key 要读取的键名
         * @param {any} [defaultValue] 键对应的默认值
         * @return {any | undefined} 键为 `key` 的数据。如果该存储中不包含该数据，这时若指定了默认值参数则返回默认值，否则返回 undefined。
         */
        get(key: string, defaultValue?: any): any | undefined;

        /**
         * @description: 把值 `value` 保存到本地存储中。 `value` 可以是 `undefined` 以外的任意数据类型。如果 `value` 为 `undefined` 则抛出 `TypeError` 。
         * 
         * **注意！：**
         * 
         * - 存储的过程实际上是使用 `JSON.stringify` 把 `value` 转换为字符串再保存，因此 `value` 必须是可 JSON 化的才能被接受。
         * 
         * @param {string} key 键名
         * @param {Object | null} value 要存储的值
         */
        put(key: string, value: Object | null): void;

        /**
         * @description: 移除键值为 `key` 的数据。
         * @param {string} key 要移除的键名
         */
        remove(key: string): void;

        /**
         * @description: 检查该本地存储是否包含键值为 key 的数据。
         * @param {string} key 要检查的键名
         * @return {boolean} 包含则返回 true，否则返回 false。
         */
        contains(key: string): boolean;

        /**
         * @description: 移除该本地存储的所有数据。
         */
        clear(): void;
    }
}