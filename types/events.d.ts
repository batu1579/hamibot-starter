/*
 * @Author: BATU1579
 * @CreateDate: 2022-07-26 11:23:12
 * @LastEditor: BATU1579
 * @LastTime: 2022-09-11 10:23:04
 * @FilePath: \\src\\types\\events.d.ts
 * @Description: 事件模块
 */
declare module 'events' {
    import { Point } from 'images'
    global {
        /**
         * @description: `events` 本身是一个 `EventEmiiter` ，但内置了一些事件、包括按键事件、通知事件、Toast 事件等。
         * 
         * **注意！：**
         * 
         * - 事件的处理是单线程的，并且仍然在原线程执行，如果脚本主体或者其他事件处理中有耗时操作、轮询等，则事件将无法得到及时处理（会进入事件队列等待脚本主体或其他事件处理完成才执行）。
         * 
         */
        const events: Events;

        const keys: Keys;

        class KeyEvent {
            /**
             * @description: 获取事件的动作。
             * @return {number} 触发按键事件的动作，可能的值为：
             * 
             * - `KeyEvent.ACTION_DOWN` - 按下事件。
             * - `KeyEvent.ACTION_UP` - 弹起事件。
             * 
             */
            getAction(): number;

            /**
             * @description: 获取按键的按键编号。
             * @return {number} 触发按键事件的按键编号，可能的值为：
             * 
             * - `KeyEvent.KEYCODE_HOME` - 主页键。
             * - `KeyEvent.KEYCODE_BACK` - 返回键。
             * - `KeyEvent.KEYCODE_MENU` - 菜单键。
             * - `KeyEvent.KEYCODE_VOLUME_UP` - 音量上键。
             * - `KeyEvent.KEYCODE_VOLUME_DOWN` - 音量下键。
             * 
             */
            getKeyCode(): number;

            /**
             * @description: 获取事件发生的时间戳。
             * @return {number} 事件发生的时间戳，可以用于构造 `Date` 对象。
             */
            getEventTime(): number;

            /**
             * @description: 获取最近一次按下事件的时间戳。如果本身是按下事件，则与 `getEventTime()` 相同。
             * @return {number} 最近一次按下事件的时间戳，可以用于构造 `Date` 对象。
             */
            getDownTime(): number;

            /**
             * @description: 把按键编号转换为字符串。
             * @return {string} 按键名称。
             */
            keyCodeToString(keyCode: number): string;

            /**
             * @description: 按下事件。
             */
            static readonly ACTION_DOWN: number;

            /**
             * @description: 弹起事件。
             */
            static readonly ACTION_UP: number;

            /**
             * @description: 主页键。
             */
            static readonly KEYCODE_HOME: number;

            /**
             * @description: 返回键。
             */
            static readonly KEYCODE_BACK: number;

            /**
             * @description: 菜单键。
             */
            static readonly KEYCODE_MENU: number;

            /**
             * @description: 音量上键。
             */
            static readonly KEYCODE_VOLUME_UP: number;

            /**
             * @description: 音量下键。
             */
            static readonly KEYCODE_VOLUME_DOWN: number;
        }

        /**
         * @description: 脚本间通信除了使用 engines 模块提供的 `ScriptEngine.emit()` 方法以外，也可以使用 events 模块提供的 `broadcast` 广播。
         * 
         * `events.broadcast` 本身是一个 `EventEmitter` ，但它的事件是在脚本间共享的，所有脚本都能发送和监听这些事件；事件处理会在脚本主线程执行（后续可能加入函数 `onThisThread(eventName, ...args)` 来提供在其他线程执行的能力）。
         * @example
         * ```typescript
         * // 脚本 A
         * events.broadcast.emit("hello", "小明");
         * 
         * // 脚本 B
         * events.broadcast.on("hello", function(name) {
         *     toast("你好, " + name);
         * });
         * // 保持脚本运行
         * setInterval(()=>{}, 1000);
         * ```
         */
        const broadcast: EventEmitter;
    }

    class Events extends EventEmitter {
        /**
         * @description: 创建一个新的 `EventEmitter` 。这个 `EventEmitter` 没有内置任何事件。
         * @return {EventEmitter} 新创建的 `EventEmitter` 对象。
         */
        emitter(): EventEmitter;

        /**
         * @description: 启用按键监听，例如音量键、Home 键。按键监听使用无障碍服务实现，如果无障碍服务未启用会抛出异常并提示开启。只有这个函数成功执行后, onKeyDown, onKeyUp等按键事件的监听才有效。
         * 
         * **注意！：**
         * 
         * - 此函数在安卓 4.3 以上才能使用。
         * 
         */
        observeKey(): void;

        /**
         * @description: 注册一个按键监听函数，当有 `keyName` 对应的按键按下会调用该函数。一次完整的按键动作包括了按键按下和弹起。按下事件会在手指按下一个按键的瞬间触发, 弹起事件则在手指放开这个按键时触发。
         * @param {string} keyName 要监听的按键名称，可选的值为：
         * 
         * - `volume_up` - 音量上键。
         * - `volume_down` - 音量下键。
         * - `home` - 主屏幕键。
         * - `back` - 返回键。
         * - `menu` - 菜单键。
         * 
         * @param {Function} listener 按键监听器。参数为 KeyEvent （按键事件），返回值为 any 。
         * @return {this} 返回自身以便链式调用。
         * @example
         * ```typescript
         * // 启用按键监听
         * events.observeKey();
         * // 监听音量下键按下
         * events.onKeyDown('volume_down', function(event) {
         *     toast('音量上键按下');
         * });
         * // 监听Home键按下
         * events.onKeyDown('home', function(event) {
         *     toast('Home键按下');
         *     exit();
         * });
         * ```
         */
        onKeyDown(keyName: KeyName, listener: (event: KeyEvent) => any): this;

        /**
         * @description: 注册一个按键监听函数，当有 `keyName` 对应的按键弹起会调用该函数。一次完整的按键动作包括了按键按下和弹起。按下事件会在手指按下一个按键的瞬间触发, 弹起事件则在手指放开这个按键时触发。
         * @param {string} keyName 要监听的按键名称，可选的值为：
         * 
         * - `volume_up` - 音量上键。
         * - `volume_down` - 音量下键。
         * - `home` - 主屏幕键。
         * - `back` - 返回键。
         * - `menu` - 菜单键。
         * 
         * @param {Function} listener 按键监听器。参数为 KeyEvent （按键事件），返回值为 any 。
         * @return {this} 返回自身以便链式调用。
         * @example
         * ```typescript
         * // 启用按键监听
         * events.observeKey();
         * // 监听音量下键弹起
         * events.onKeyDown('volume_down', function(event) {
         *     toast('音量上键弹起');
         * });
         * // 监听Home键弹起
         * events.onKeyDown('home', function(event) {
         *     toast('Home键弹起');
         *     exit();
         * });
         * ```
         */
        onKeyUp(keyName: KeyName, listener: (event: KeyEvent) => any): this;

        /**
         * @description: 注册一个按键监听函数，当有 `keyName` 对应的按键被按下时会调用该函数，之后会注销该按键监听器。也就是 `listener` 只有在 `onceKeyDown()` 调用后的第一次按键事件被调用一次。
         * @param {string} keyName 要监听的按键名称，可选的值为：
         * 
         * - `volume_up` - 音量上键。
         * - `volume_down` - 音量下键。
         * - `home` - 主屏幕键。
         * - `back` - 返回键。
         * - `menu` - 菜单键。
         * 
         * @param {Function} listener 按键监听器。参数为 KeyEvent （按键事件），返回值为 any 。
         * @return {this} 返回自身以便链式调用。
         */
        onceKeyDown(keyName: KeyName, listener: (event: KeyEvent) => any): this;

        /**
         * @description: 注册一个按键监听函数，当有 `keyName` 对应的按键弹起时会调用该函数，之后会注销该按键监听器。也就是 `listener` 只有在 `onceKeyUp()` 调用后的第一次按键事件被调用一次。
         * @param {string} keyName 要监听的按键名称，可选的值为：
         * 
         * - `volume_up` - 音量上键。
         * - `volume_down` - 音量下键。
         * - `home` - 主屏幕键。
         * - `back` - 返回键。
         * - `menu` - 菜单键。
         * 
         * @param {Function} listener 按键监听器。参数为 KeyEvent （按键事件），返回值为 any 。
         * @return {this} 返回自身以便链式调用。
         */
        onceKeyUp(keyName: KeyName, listener: (event: KeyEvent) => any): this;

        /**
         * @description: 删除该按键的 `KeyDown` 按下事件的所有监听。
         * @param {string} keyName 要取消监听的按键名称，可选的值为：
         * 
         * - `volume_up` - 音量上键。
         * - `volume_down` - 音量下键。
         * - `home` - 主屏幕键。
         * - `back` - 返回键。
         * - `menu` - 菜单键。
         * 
         * @return {this} 返回自身以便链式调用。
         */
        removeAllKeyDownListeners(keyName: KeyName): this;

        /**
         * @description: 删除该按键的 `KeyDown` 弹起事件的所有监听。
         * @param {string} keyName 要取消监听的按键名称，可选的值为：
         * 
         * - `volume_up` - 音量上键。
         * - `volume_down` - 音量下键。
         * - `home` - 主屏幕键。
         * - `back` - 返回键。
         * - `menu` - 菜单键。
         * 
         * @return {this} 返回自身以便链式调用。
         */
        removeAllKeyUpListeners(keyName: KeyName): this;

        /**
         * @description: 设置 **全部** 按键屏蔽状态。所谓按键屏蔽指的是，屏蔽原有按键的功能，例如使得音量键不再能调节音量，但此时仍然能通过按键事件监听按键。
         * 
         * **注意！：**
         * 
         * - 只要有一个脚本屏蔽了某个按键，该按键便会被屏蔽；当脚本退出时，会自动解除所有按键屏蔽。
         * 
         * @param {boolean} enabled 是否屏蔽所有按键。
         * @return {this} 返回自身以便链式调用。
         * @example
         * ```typescript
         * events.setKeyInterceptionEnabled("volume_up", true);
         * events.observeKey();
         * events.onKeyDown("volume_up", ()=>{
         *     log("音量上键被按下");
         * });
         * ```
         */
        setKeyInterceptionEnabled(enabled: boolean): this;

        /**
         * @description: 设置 **单个** 按键屏蔽状态。所谓按键屏蔽指的是，屏蔽原有按键的功能，例如使得音量键不再能调节音量，但此时仍然能通过按键事件监听按键。
         * 
         * **注意！：**
         * 
         * - 只要有一个脚本屏蔽了某个按键，该按键便会被屏蔽；当脚本退出时，会自动解除所有按键屏蔽。
         * 
         * @param {KeyName} key 要屏蔽的按键，可选的值为：
         * 
         * - `volume_up` - 音量上键。
         * - `volume_down` - 音量下键。
         * - `home` - 主屏幕键。
         * - `back` - 返回键。
         * - `menu` - 菜单键。
         * 
         * @param {boolean} enabled 是否屏蔽按键 `key` 。
         * @return {this} 返回自身以便链式调用。
         * @example
         * ```typescript
         * events.setKeyInterceptionEnabled("volume_up", true);
         * events.observeKey();
         * events.onKeyDown("volume_up", ()=>{
         *     log("音量上键被按下");
         * });
         * ```
         */
        setKeyInterceptionEnabled(key: KeyName, enabled: boolean): this;

        /**
         * @description: 启用屏幕触摸监听。只有这个函数被成功执行后, 触摸事件的监听才有效。
         * 
         * **注意！：**
         * 
         * - 此函数需要 root 权限。没有 root 权限调用该函数则什么也不会发生。
         * 
         */
        observeKey(): void;

        /**
         * @description: 设置两个触摸事件分发的最小时间间隔。例如间隔为 10 毫秒的话，前一个触摸事件发生并被注册的监听器处理后，至少要过 10 毫秒才能分发和处理下一个触摸事件，这 10 毫秒之间的触摸将会被忽略。
         * 
         * *建议（：*
         * 
         * - 在满足需要的情况下尽量提高这个间隔。
         * 
         * 
         * **注意！：**
         * 
         * - 如果 timeout 设置过低可能造成事件拥堵。强烈建议不要设置 `timeout` 为 0 。
         * 
         * @param {number} timeout 两个触摸事件的最小间隔。单位毫秒。默认为 10 毫秒。如果小于 0 ，视为 0 处理。
         */
        setTouchEventTimeout(timeout: number): void;

        /**
         * @description: 查询触摸事件的最小时间间隔。
         * @return {number} 触摸事件的最小时间间隔。
         */
        getTouchEventTimeout(): number;

        /**
         * @description: 注册一个触摸监听函数。相当于 `on('touch', listener)` 。
         * @param {function} listener 触摸事件监听器。参数为 Point （屏幕坐标），返回值为 any 。
         * @return {this} 返回自身以便链式调用。
         * @example
         * ```typescript
         * // 启用触摸监听
         * events.observeTouch();
         * // 注册触摸监听器
         * events.onTouch(function(p) {
         *     // 触摸事件发生时, 打印出触摸的点的坐标
         *     log(p.x + ", " + p.y);
         * });
         * ```
         */
        onTouch(listener: (p: Point) => any): this;

        /**
         * @description: 删除所有触摸事件监听函数。
         */
        removeAllTouchListeners(): this;

        /**
         * @description: 当有按键被按下或弹起时触发的事件。 
         * @param {string} eventName 事件名称（ `key` ）。
         * @param {KeyListener} listener 当事件发生时要执行的回调函数。
         * @return {this} 返回自身以便链式调用。
         * @example
         * ```typescript
         * auto();
         * events.observeKey();
         * events.on("key", function(keyCode, event){
         *     if(keyCode == keys.menu && event.getAction() == event.ACTION_UP){
         *         toast("菜单键按下");
         *     }
         * });
         * ```
         */
        on(eventName: 'key', listener: KeyListener): this;

        /**
         * @description: 当有按键被按下时触发的事件。 
         * @param {string} eventName 事件名称（ `key_down` ）。
         * @param {KeyListener} listener 当事件发生时要执行的回调函数。
         * @return {this} 返回自身以便链式调用。
         * @example
         * ```typescript
         * auto();
         * events.observeKey();
         * events.on("key_down", function(keyCode, event){
         *     // 处理按键按下事件
         * });
         * ```
         */
        on(eventName: 'key_down', listener: KeyListener): this;

        /**
         * @description: 当有按键弹起时触发的事件。 
         * @param {string} eventName 事件名称（ `key_up` ）。
         * @param {KeyListener} listener 当事件发生时要执行的回调函数。
         * @return {this} 返回自身以便链式调用。
         * @example
         * ```typescript
         * auto();
         * events.observeKey();
         * events.on("key_up", function(keyCode, event){
         *     // 处理按键按下事件
         * });
         * ```
         */
        on(eventName: 'key_up', listener: KeyListener): this;

        /**
         * @description: 当脚本正常或者异常退出时会触发该事件。事件处理中如果有异常抛出，则立即中止 exit 事件的处理（即使 exit 事件有多个处理函数）并在控制台和日志中打印该异常。
         * 
         * 一个脚本停止运行时，会关闭该脚本的所有悬浮窗，触发 exit 事件，之后再回收资源。如果 exit 事件的处理中有死循环，则后续资源无法得到及时回收。 此时脚本会停留在任务列表，如果在任务列表中关闭，则会强制结束exit事件的处理并回收后续资源。
         * @param {string} eventName 事件名称（ `exit` ）。
         * @param {Function} listener 当事件发生时要执行的回调函数。
         * @return {this} 返回自身以便链式调用。
         * @example
         * ```typescript
         * log("开始运行")
         * events.on("exit", function(){
         *     log("结束运行");
         * });
         * log("即将结束运行");
         * ```
         */
        on(eventName: 'exit', listener: Function): this;

        /**
         * @description: 开启通知监听。例如QQ消息、微信消息、推送等通知。通知监听依赖于通知服务，如果通知服务没有运行，会抛出异常并跳转到通知权限开启界面。
         * 
         * **注意！：**
         * 
         * - 有时即使通知权限已经开启通知服务也没有运行，这时需要关闭权限再重新开启一次。
         * 
         * @example
         * ```typescript
         * events.obverseNotification();
         * events.onNotification(function(notification){
         *     log(notification.getText());
         * });
         * ```
         */
        observeNotification(): void;

        /**
         * @description: 开启 Toast 监听。 Toast 监听依赖于无障碍服务，因此此函数会确保无障碍服务运行。
         */
        observeToast(): void;

        /**
         * @description: 当有应用发出 toast （气泡消息）时会触发该事件。但 Hamibot 软件本身的 toast 除外。
         * @param {string} eventName 事件名称（ `toast` ）。
         * @param {ToastListener} listener 当事件发生时要执行的回调函数。
         * @return {this} 返回自身以便链式调用。
         * @example
         * ```typescript
         * events.observeToast();
         * events.onToast(function(toast) {
         *     log("Toast内容: " + toast.getText() + " 包名: " + toast.getPackageName());
         * });
         * ```
         */
        on(eventName: 'toast', listener: ToastListener): this;

        /**
         * @description: 当有应用发出通知时会触发该事件。
         * @param {string} eventName 事件名称（ `notification` ）。
         * @param {ToastListener} listener 当事件发生时要执行的回调函数。
         * @return {this} 返回自身以便链式调用。
         * @example
         * ```typescript
         * events.observeNotification();
         * events.on("notification", function(n) {
         *     log(
         *         "收到新通知:\n 标题: %s, 内容: %s, \n包名: %s",
         *         n.getTitle(),
         *         n.getText(),
         *         n.getPackageName()
         *     );
         * });
         * ```
         */
        on(eventName: 'notification', listener: NotificationListener): this;
    }

    class Notification {
        /**
         * @description: 通知数量。例如 QQ 连续收到两条消息时 number 为 2。
         */
        readonly number: number;

        /**
         * @description: 通知发出时间的时间戳，可以用于构造 `Date` 对象。
         * @example
         * ```typescript
         * events.observeNotification();
         * events.on("notification", function(n) {
         *     log("通知时间为}" + new Date(n.when));
         * });
         * ```
         */
        readonly when: number;

        /**
         * @description: 获取发出通知的应用包名。
         * @return {string} 发出通知的应用包名。
         */
        getPackageName(): string;

        /**
         * @description: 获取通知的标题。
         * @return {string} 通知的标题。
         */
        getTitle(): string;

        /**
         * @description: 获取通知的内容。
         * @return {string} 通知的内容。
         */
        getText(): string;

        /**
         * @description: 点击该通知。例如对于一条 QQ 消息，点击会进入具体的聊天界面。
         */
        click(): void;

        /**
         * @description: 删除该通知。该通知将从通知栏中消失。
         */
        delete(): void;
    }

    interface Keys {
        /**
         * @description: 主页键。
         */
        readonly home: number;

        /**
         * @description: 返回键。
         */
        readonly back: number;

        /**
         * @description: 菜单键。
         */
        readonly menu: number;

        /**
         * @description: 音量上键。
         */
        readonly volume_up: number;

        /**
         * @description: 音量下键。
         */
        readonly volume_down: number;
    }

    class EventEmitter {
        /**
         * @description: 每个事件默认可以注册最多 10 个监听器。 单个 `EventEmitter` 实例的限制可以使用 `emitter.setMaxListeners(n)` 方法改变。 所有 `EventEmitter` 实例的默认值可以使用 `EventEmitter.defaultMaxListeners` 属性改变。
         * 
         * 设置 `EventEmitter.defaultMaxListeners` 要谨慎，因为会影响所有 `EventEmitter` 实例，包括之前创建的。 因而，调用 `emitter.setMaxListeners(n)` 优先于 `EventEmitter.defaultMaxListeners` 。
         * 
         * **注意！：**
         * 
         * - 与 Node.js 不同，这是一个硬性限制。 `EventEmitter` 实例不允许添加更多的监听器，监听器超过最大数量时会抛出 `TooManyListenersException` 。
         * 
         * @example
         * ```typescript
         * emitter.setMaxListeners(emitter.getMaxListeners() + 1);
         * emitter.once('event', () => {
         *     // 做些操作
         *     emitter.setMaxListeners(Math.max(emitter.getMaxListeners() - 1, 0));
         * });
         * ```
         */
        static defaultMaxListeners: number;

        /**
         * @description: 添加 `listener` 函数到名为 `eventName` 的事件的监听器数组的末尾。
         * 
         * 此函数是 `emitter.on(eventName, listener)` 的别名。
         * 
         * **注意！：**
         * 
         * - 多次调用并传入相同的 `eventName` 和 `listener` 会导致 `listener` 被添加与调用多次。
         * 
         * @param {string} eventName 事件名称。
         * @param {Function} listener 当事件发生时要执行的回调函数。
         * @return {this} 返回自身以便链式调用。
         */
        addListener(eventName: string, listener: Function): this;

        /**
         * @description: 按监听器的注册顺序，同步地调用每个注册到名为 eventName 事件的监听器，并传入提供的参数。
         * @param {string} eventName 事件名称。
         * @param {array} [args] 要传入的参数。
         * @return {boolean} 如果事件有监听器，则返回 true ，否则返回 false。
         */
        emit(eventName: string, ...args: any[]): boolean;

        /**
         * @description: 查询全部已注册监听器的事件。
         * @return {(string | Symbol)[]} 返回一个列出触发器已注册监听器的事件的数组。数组中的值为字符串或符号。
         * @example
         * ```typescript
         * const myEE = events.emitter();
         * myEE.on('foo', () => {});
         * myEE.on('bar', () => {});
         * 
         * const sym = Symbol('symbol');
         * myEE.on(sym, () => {});
         * 
         * console.log(myEE.eventNames());
         * // 打印: [ 'foo', 'bar', Symbol(symbol) ]
         * ```
         */
        eventNames(): (string | Symbol)[];

        /**
         * @description: 获取 `EventEmitter` 当前的最大监听器限制值，该值可以通过 `emitter.setMaxListeners(n)` 设置或默认为 `EventEmitter.defaultMaxListeners` 。
         * @return {number} 当前的最大监听器限制值。
         */
        getMaxListeners(): number;

        /**
         * @description: 获取注册在 `eventName` 事件的监听器的数量。
         * @param {string} eventName 要查询的事件名。
         * @return {number} 当前正在监听 `eventName` 事件的监听器的数量。
         */
        listenerCount(eventName: string): number;

        /**
         * @description: 获取注册在名为 `eventName` 的事件的全部监听器数组的副本。
         * @param {string} eventName 要查询的事件名。
         * @return {Function[]} 名为 `eventName` 的事件的全部监听器数组的副本。
         * @example
         * ```typescript
         * server.on('connection', (stream) => {
         *     console.log('someone connected!');
         * });
         * console.log(util.inspect(server.listeners('connection')));
         * // 打印: [ [Function] ]
         * ```
         */
        listeners(eventName: string): Function[];

        /**
         * @description: 添加 `listener` 函数到名为 `eventName` 的事件的监听器数组的末尾。
         * 
         * 默认情况下，事件监听器会按照添加的顺序依次调用。 `emitter.prependListener()` 方法可用于将事件监听器添加到监听器数组的开头。
         * 
         * **注意！：**
         * 
         * - 多次调用并传入相同的 `eventName` 和 `listener` 会导致 `listener` 被添加与调用多次。
         * 
         * @param {string} eventName 事件名称。
         * @param {Function} listener 当事件发生时要执行的回调函数。
         * @return {this} 返回自身以便链式调用。
         * @example
         * ```typescript
         * server.on('connection', (stream) => {
         *     console.log('有连接！');
         * });
         * ```
         * @example
         * ```typescript
         * const myEE = events.emitter();
         * myEE.on('foo', () => console.log('a'));
         * myEE.prependListener('foo', () => console.log('b'));
         * myEE.emit('foo');
         * // 打印:
         * //   b
         * //   a
         * ```
         */
        on(eventName: string, listener: Function): this;

        /**
         * @description: 添加一个单次 `listener` 函数到名为 `eventName` 的事件的监听器数组的末尾。下次触发 eventName 事件时，监听器会被移除，然后调用。
         * 
         * 默认情况下，事件监听器会按照添加的顺序依次调用。 `emitter.prependOnceListener() ` 方法可用于将事件监听器添加到监听器数组的开头。
         * 
         * **注意！：**
         * 
         * - 多次调用并传入相同的 `eventName` 和 `listener` 会导致 `listener` 被添加与调用多次。
         * 
         * @param {string} eventName 事件名称。
         * @param {Function} listener 当事件发生时要执行的回调函数。
         * @return {this} 返回自身以便链式调用。
         * @example
         * ```typescript
         * server.once('connection', (stream) => {
         *     console.log('首次调用！');
         * });
         * ```
         * @example
         * ```typescript
         * const myEE = events.emitter();
         * myEE.once('foo', () => console.log('a'));
         * myEE.prependOnceListener('foo', () => console.log('b'));
         * myEE.emit('foo');
         * // 打印:
         * //   b
         * //   a
         * ```
         */
        once(eventName: string, listener: Function): this;

        /**
         * @description: 添加 `listener` 函数到名为 `eventName` 的事件的监听器数组的开头。
         * 
         * **注意！：**
         * 
         * - 多次调用并传入相同的 `eventName` 和 `listener` 会导致 `listener` 被添加与调用多次。
         * 
         * @param {string} eventName 事件名称。
         * @param {Function} listener 当事件发生时要执行的回调函数。
         * @return {this} 返回自身以便链式调用。
         * @example
         * ```typescript
         * server.prependListener('connection', (stream) => {
         *     console.log('有连接！');
         * });
         * ```
         */
        prependListener(eventName: string, listener: Function): this;

        /**
         * @description: 添加一个单次 `listener` 函数到名为 `eventName` 的事件的监听器数组的开头。下次触发 `eventName` 事件时，监听器会被移除，然后调用。
         * 
         * **注意！：**
         * 
         * - 多次调用并传入相同的 `eventName` 和 `listener` 会导致 `listener` 被添加与调用多次。
         * 
         * @param {string} eventName 事件名称。
         * @param {Function} listener 当事件发生时要执行的回调函数。
         * @return {this} 返回自身以便链式调用。
         * @example
         * ```typescript
         * server.prependListener('connection', (stream) => {
         *     console.log('有连接！');
         * });
         * ```
         */
        prependOnceListener(eventName: string, listener: Function): this;

        /**
         * @description: 移除全部或指定 `eventName` 的监听器。
         * 
         * **注意！：**
         * 
         * - 注意，在代码中移除其他地方添加的监听器是一个不好的做法，尤其是当 EventEmitter 实例是其他组件或模块创建的。
         * 
         * @param {string} [eventName] 事件名称。
         * @return {this} 返回自身以便链式调用。
         */
        removeAllListeners(eventName?: string): this;

        /**
         * @description: 从名为 `eventName` 的事件的监听器数组中移除指定的 `listener` 。
         * 
         * `removeListener()` 最多只会从监听器数组里移除一个监听器实例。 如果任何单一的监听器被多次添加到指定 `eventName` 的监听器数组中，则必须多次调用 `removeListener()` 才能移除每个实例。
         * 
         * 因为监听器是使用内部数组进行管理的，所以调用它会改变在监听器被移除后注册的任何监听器的位置索引。 虽然这不会影响监听器的调用顺序，但意味着由 `emitter.listeners()` 方法返回的监听器数组副本需要被重新创建。
         * 
         * **注意！：**
         * 
         * - 一旦一个事件被触发，所有绑定到它的监听器都会按顺序依次触发。 这意味着，在事件触发后、最后一个监听器完成执行前，任何 `removeListener()` 或 `removeAllListeners()` 调用都不会从 `emit()` 中移除它们。 随后的事件会像预期的那样发生。
         * 
         * @param {string} eventName 事件名称。
         * @param {Function} listener 要移除的监听器。
         * @return {this} 返回自身以便链式调用。
         * @example
         * ```typescript
         * const callback = (stream) => {
         *     console.log('有连接！');
         * };
         * server.on('connection', callback);
         * // ...
         * server.removeListener('connection', callback);
         * ```
         */
        removeListener(eventName: string, listener: Function): this;

        /**
         * @description: 默认情况下，如果为特定事件添加了超过 10 个监听器，则 `EventEmitter` 会打印一个警告。 此限制有助于寻找内存泄露。 但是，并不是所有的事件都要被限为 10 个。 `emitter.setMaxListeners()` 方法允许修改指定的 `EventEmitter` 实例的限制。 值设为 Infinity（或 0）表明不限制监听器的数量。
         * @param {number} n 要设置的监听器数量上限。
         * @return {this} 返回自身以便链式调用。
         */
        setMaxListeners(n: number): this;

    }

    type KeyName = keyof typeof keys;

    /**
     * @callback KeyListener
     * @description: 当有按键被按下或弹起时要执行的回调函数。
     * @param {number} keyCode 触发事件的按键编号。
     * 
     * *建议（：*
     * 
     * - 使用 `keys` 比较 `keyCode` 的值。
     * 
     * @param {KeyEvent} event 按键事件。
     */
    type KeyListener = (
        /**
         * 触发事件的按键编号。
         * 
         * *建议（：*
         * 
         * - 使用 `keys` 比较 `keyCode` 的值。
         * 
         */
        keyCode: number,
        /**
         * 按键事件。
         */
        event: KeyEvent
    ) => any;

    /**
     * @callback ToastListener
     * @description: 当有应用发出 toast （气泡消息）时要执行的回调函数。
     * @param {ToastObject} toast 触发事件的 toast 对象。
     */
    type ToastListener = (
        /**
         * 触发事件的 toast 对象。
         */
        toast: ToastObject
    ) => any;

    class ToastObject {
        /**
         * @description: 获取 toast 的文本内容。
         * @return {string} toast 对象的文本。
         */
        getText(): string;

        /**
         * @description: 获取发出 toast 的应用包名。
         * @return {string} 发出 toast 的应用包名。
         */
        getPackageName(): string;
    }

    /**
     * @callback NotificationListener
     * @description: 当有应用发出通知时要执行的回调函数。
     * @param {Notification} notification 触发事件的通知对象。
     */
    type NotificationListener = (
        /**
         * 触发事件的通知对象。
         */
        notification: Notification
    ) => any;
}