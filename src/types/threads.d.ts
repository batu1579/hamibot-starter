/*
 * @Author: BATU1579
 * @CreateDate: 2022-07-12 19:58:53
 * @LastEditor: BATU1579
 * @LastTime: 2022-09-11 10:51:30
 * @FilePath: \\src\\types\\threads.d.ts
 * @Description: 多线程模块
 */
declare module 'threads' {
    import { ImmediateID, IntervalID, TimeoutID } from 'timers';

    global {
        /**
         * @description: threads 模块提供了多线程支持，可以启动新线程来运行脚本。
         * 
         * 脚本主线程会等待所有子线程执行完成后才停止执行，因此如果子线程中有死循环，请在必要的时候调用 `exit()` 来直接停止脚本或 `threads.shutDownAll()` 来停止所有子线程。
         * 
         * **注意！：**
         * 
         * - 由于 JavaScript 自身没有多线程的支持，因此您可能会遇到意料之外的问题。
         * 
         */
        const threads: Threads;

        /**
         * @description: 给函数 `func` 加上同步锁并作为一个新函数返回。
         * @param {Function} func 要加锁的函数。
         * @return {Function} 加锁包装后的函数。
         */
        function sync(func: Function): Function;
    }

    interface Threads {
        /**
         * @description: 启动一个新线程并执行 `action` 。
         * 
         * **注意！：**
         * 
         * - 启动新线程的时候不能使用箭头函数！
         * - 通过 `threads.start()` 启动的所有线程会在脚本被强制停止时自动停止。
         * 
         * @param {Function} action
         * @return {Thread} 新建的线程对象。
         * @example
         * ```typescript
         * // 启动新线程
         * threads.start(function() {
         *     // 在新线程执行的代码
         *     while (true) {
         *         log('子线程');
         *     }
         * });
         * while (true) {
         *     log('脚本主线程');
         * }
         * ```
         */
        start(action: Function): Thread;

        /**
         * @description: 停止所有通过 `threads.start()` 启动的子线程。
         */
        shutDownAll(): void;

        /**
         * @description: 获取当前线程。
         * @return {Thread} 返回当前线程的对象。
         */
        currentThread(): Thread;

        /**
         * @description: 新建一个 `Disposable` 对象，用于等待另一个线程的某个一次性结果。
         * @return {Disposable} 新建的 `Disposable` 对象。
         */
        disposable(): Disposable;

        /**
         * @description: 新建一个整数原子变量。更多信息参见 [AtomicLong] 。
         * 
         * [AtomicLong]: https://docs.oracle.com/javase/7/docs/api/java/util/concurrent/atomic/AtomicLong.html
         * @param {number} [initialValue] 初始整数值（默认为 0 ）。
         * @return {AtomicLong} 新建的整数原子变量。
         */
        atomic(initialValue?: number): AtomicLong;

        /**
         * @description: 新建一个可重入锁。更多信息参见 线程安全 以及 [ReentrantLock] 。
         * 
         * [ReentrantLock]: https://docs.oracle.com/javase/7/docs/api/java/util/concurrent/locks/ReentrantLock.html
         * @return {ReentrantLock} 新建的 `ReentrantLock` 对象。
         */
        lock(): ReentrantLock;
    }

    /**
     * @description: 线程对象， `threads.start()` 返回的对象，用于获取和控制线程的状态，与其他线程交互等。 `Thread` 对象提供了和 `timers` 模块一样的 API，例如 `setTimeout()` ,  `setInterval()` 等，用于在该线程执行相应的定时回调，从而使线程之间可以直接交互。
     * @example
     * ```typescript
     * let thread = threads.start(function() {
     *     // 在子线程执行的定时器
     *     setInterval(function() {
     *         log('子线程:' + threads.currentThread());
     *     }, 1000);
     * });
     * 
     * log('当前线程为主线程:' + threads.currentThread());
     * 
     * // 等待子线程启动
     * thread.waitFor();
     * // 在子线程执行的定时器
     * thread.setTimeout(function() {
     *     // 这段代码会在子线程执行
     *     log('当前线程为子线程:' + threads.currentThread());
     * }, 2000);
     * 
     * sleep(30 * 1000);
     * thread.interrupt();
     * ```
     */
    class Thread {
        /**
         * @description: 中断线程运行。
         */
        interrupt(): void

        /**
         * @description: 等待线程执行完成。如果 `timeout` 为 0，则会一直等待直至该线程执行完成；否则最多等待 `timeout` 毫秒的时间。
         * @param {number} [timeout] 等待时间，单位毫秒。
         * @example
         * ```typescript
         * var sum = 0;
         * // 启动子线程计算1加到10000
         * let thread = threads.start(function() {
         *     for (var i = 0; i < 10000; i++) {
         *         sum += i;
         *     }
         * });
         * // 等待该线程完成
         * thread.join();
         * toast('sum = ' + sum);
         * ```
         */
        join(timeout?: number): void;

        /**
         * @description: 返回线程是否存活。
         * @return {boolean} 如果线程仍未开始或已经结束，返回 `false` ; 如果线程已经开始或者正在运行中，返回 `true` 。
         */
        isAlive(): boolean;

        /**
         * @description: 等待线程开始执行。调用 `threads.start()` 以后线程仍然需要一定时间才能开始执行，因此调用此函数会等待线程开始执行；如果线程已经处于执行状态则立即返回。
         * @example
         * ```typescript
         * var thread = threads.start(function() {
         *     // do something
         * });
         * thread.waitFor();
         * thread.setTimeout(function() {
         *     // do something
         * }, 1000);
         * ```
         */
        waitFor(): void;

        /**
         * @description: 预定每隔 `delay` 毫秒重复执行的 `callback` 。
         * 
         * **注意！：**
         * 
         * - 定时器仍然是单线程的。如果脚本主体有耗时操作或死循环，则设定的定时器不能被及时执行。
         * - 该定时器会在该线程执行。如果当前线程仍未开始执行或已经执行结束，则抛出 `IllegalStateException` 。
         * 
         * @param {Function} callback 当定时器到点时要调用的函数。
         * @param {number} delay 调用 `callback` 之前要等待的毫秒数。当 `delay` 小于 0 时， `delay` 会被设为 0。
         * @param {array} [args] 当调用 `callback` 时要传入的可选参数。
         * @return {IntervalID} 返回一个用于 `clearInterval()` 的定时器 id 。
         */
        setInterval(callback: Function, delay: number, ...args: any[]): IntervalID;

        /**
         * @description: 预定在 `delay` 毫秒之后执行的单次 `callback` 。
         * 
         * **注意！：**
         * 
         * - 定时器仍然是单线程的。如果脚本主体有耗时操作或死循环，则设定的定时器不能被及时执行。
         * -  `callback` 可能不会精确地在 `delay` 毫秒被调用。 Hamibot 不能保证回调被触发的确切时间，也不能保证它们的顺序。 回调会在尽可能接近所指定的时间上调用。
         * - 该定时器会在该线程执行。如果当前线程仍未开始执行或已经执行结束，则抛出 `IllegalStateException` 。
         * 
         * @param {Function} callback 当定时器到点时要调用的函数。
         * @param {number} delay 调用 `callback` 之前要等待的毫秒数。当 `delay` 小于 0 时， `delay` 会被设为 0。
         * @param {array} [args] 当调用 `callback` 时要传入的可选参数。
         * @return {TimeoutID} 返回一个用于 `clearTimeout()` 的定时器 id 。
         */
        setTimeout(callback: Function, delay: number, ...args: any[]): TimeoutID;

        /**
         * @description: 预定立即执行的 callback，它是在 I/O 事件的回调之后被触发。
         * 
         * 当多次调用 `setImmediate()` 时， `callback` 函数会按照它们被创建的顺序依次执行。 每次事件循环迭代都会处理整个回调队列。 如果一个立即定时器是被一个正在执行的回调排入队列的，则该定时器直到下一次事件循环迭代才会被触发。
         * 
         * **注意！：**
         * 
         * - 该定时器会在该线程执行。如果当前线程仍未开始执行或已经执行结束，则抛出 `IllegalStateException` 。
         * 
         * @param {Function} callback 在 Looper 循环的当前回合结束时要调用的函数。
         * @param {array} [args] 当调用 `callback` 时要传入的可选参数。
         * @return {ImmediateID} 返回一个用于 `clearImmediate()` 的 id。
         */
        setImmediate(callback: Function, ...args: any[]): ImmediateID;

        /**
         * @description: 取消一个由 `setInterval()` 创建的循环定时任务。
         * 
         * **注意！：**
         * 
         * - 该定时器会在该线程执行。如果当前线程仍未开始执行或已经执行结束，则抛出 `IllegalStateException` 。
         * 
         * @param {IntervalID} id 一个 `setInterval()` 返回的 id。
         * @example
         * ```typescript
         * // 每5秒就发出一次hello
         * let id = setInterval(function() {
         *     toast('hello');
         * }, 5000);
         * // 1分钟后取消循环
         * setTimeout(() => clearInterval(id), 60 * 1000);
         * ```
         */
        clearInterval(id: IntervalID | number): void;

        /**
         * @description: 取消一个由 `setTimeout()` 创建的定时任务。
         * 
         * **注意！：**
         * 
         * - 该定时器会在该线程执行。如果当前线程仍未开始执行或已经执行结束，则抛出 `IllegalStateException` 。
         * 
         * @param {TimeoutID} id 一个 `setTimeout()` 返回的 id。
         * @example
         * ```typescript
         * // 每5秒就发出一次hello
         * let id = setInterval(function() {
         *     toast('hello');
         * }, 5000);
         * // 1分钟后取消循环
         * setTimeout(() => clearInterval(id), 60 * 1000);
         * ```
         */
        clearTimeout(id: TimeoutID | number): void;

        /**
         * @description: 取消一个由 `setImmediate()` 创建的定时任务。
         * 
         * **注意！：**
         * 
         * - 该定时器会在该线程执行。如果当前线程仍未开始执行或已经执行结束，则抛出 `IllegalStateException` 。
         * 
         * @param {ImmediateID} id 一个 `setImmediate()` 返回的 id。
         */
        clearImmediate(id: ImmediateID | number): void;
    }

    // TODO: 补全方法
    class Disposable {
        /**
         * @description: 向主线程提交执行结果。
         * @param {any} value 要返回的值
         */
        setAndNotify(value: any): void;

        /**
         * @description: 等待子线程的执行结果。
         * @return {any} 子线程提交的值。
         */
        blockedGet(): any;
    }

    /**
     * @description: Java 原子长整数。更多信息参见 [AtomicLong] 。
     * 
     * **注意！：**
     * 
     * - 这里使用的是长整型，但是因为 BigInt 是 ES2020 的新增语法，这里暂时先用 Number 类型代替，可能会导致丢失数据！！
     * 
     * [AtomicLong]: https://docs.oracle.com/javase/7/docs/api/java/util/concurrent/atomic/AtomicLong.html
     */
    class AtomicLong extends Object {
        /**
         * @description: 使用将给定函数应用于当前值和给定值的结果原子更新当前值。
         * @param {Long} x 给定用来计算的另一个值。
         * @param {LongBinaryOperator} accumulatorFunction 计算方法。
         * @return {Long} 更新后的值。
         */
        accumulateAndGet(x: Long, accumulatorFunction: LongBinaryOperator): Long;

        /**
         * @description: 以原子方式将 `delta` 与当前值相加，并返回相加后的值。
         * @param {Long} delta 要相加的数。
         * @return {Long} 当前的整数值加上 `delta` 后的值。
         */
        addAndGet(delta: Long): Long;

        /**
         * @description: 如果当前整数值等于 `expect` 则以原子方式将整数值设置为 `update` 。不相等则不修改原值。
         * @param {Long} expect 期望等于的值。
         * @param {Long} update 要更新的值。
         * @return {boolean} 相等返回 `true` 否则返回 `false` 。
         */
        compareAndSet(expect: Long, update: Long): boolean;

        /**
         * @description: 以原子方式将当前值减 1，并返回减1后的值。等价于 `--num` 。
         * @return {Long} 当前的整数值减一后的值。
         */
        decrementAndGet(): Long;

        /**
         * @description: 获取当前值对应的 `double` 值。
         * @return {Double} 当前值对应的 `double` 值。
         */
        doubleValue(): Double;

        /**
         * @description: 获取当前值对应的 `float` 值。
         * @return {number} 当前值对应的 `float` 值。
         */
        floatValue(): number;

        /**
         * @description: 获取当前的整数值。
         * @return {Long} 当前的整数值。
         */
        get(): Long;

        /**
         * @description: 使用将给定函数应用于当前值和给定值的结果原子更新当前值。
         * @param {Long} x 给定用来计算的另一个值。
         * @param {LongBinaryOperator} accumulatorFunction 计算方法。
         * @return {Long} 更新前的值。
         */
        getAndAccumulate(x: Long, accumulatorFunction: LongBinaryOperator): Long;

        /**
         * @description: 以原子方式将 `delta` 与当前值相加，并返回相加前的值。
         * @param {Long} delta 要相加的数。
         * @return {Long} 当前的整数值加上 `delta` 前的值。
         */
        getAndAdd(delta: Long): Long;

        /**
         * @description: 以原子方式将当前值减 1，并返回减1前的值。等价于 `num--` 。
         * @return {Long} 当前的整数值减一前的值。
         */
        getAndDecrement(): Long;

        /**
         * @description: 以原子方式将当前值加 1，并返回加1前的值。等价于 `num++` 。
         * @return {Long} 当前的整数值加一前的值。
         */
        getAndIncrement(): Long;

        /**
         * @description: 以原子方式设置当前值为 `newValue` ，并返回旧值。
         * @param {Long} newValue 要设置的值。
         * @return {Long} 更改前的数值。
         */
        getAndSet(newValue: Long): Long;

        /**
         * @description: 用应用给定函数的结果原子更新当前值。
         * @param {LongUnaryOperator} updateFunction 计算方法。
         * @return {Long} 更改前的数值。
         */
        getAndUpdate(updateFunction: LongUnaryOperator): Long;

        /**
         * @description: 以原子方式将当前值加 1，并返回加1后的值。等价于 `++num` 。
         * @return {Long} 当前的整数值加一后的值。
         */
        incrementAndGet(): Long;

        /**
         * @description: 返回当前值对应的 `int` 值。
         * @return {number} 前值对应的 `int` 值。
         */
        intValue(): number;

        /**
         * @description: 最终将整数值设定为 `newValue` 。
         * @param {Long} newValue 要设置的数值。
         */
        lazySet(newValue: Long): void;

        /**
         * @description: 获取当前值对应的 `long` 值。
         * @return {Long} 当前值对应的 `long` 值。
         */
        longValue(): Long;

        /**
         * @description: 以原子方式设置当前值为 `newValue` 。
         * @param {Long} newValue 要设置的数值。
         */
        set(newValue: Long): void;

        /**
         * @description: 用应用给定函数的结果原子更新当前值。
         * @param {LongUnaryOperator} updateFunction 计算方法。
         * @return {Long} 更改后的数值。
         */
        updateAndGet(updateFunction: LongUnaryOperator): Long;
    }

    interface LongBinaryOperator {
        /**
         * @description: 定义对两个 long 操作数的操作，并产生一个 long 结果。 
         * @param {number} left 第一个操作数。
         * @param {number} right 第二个操作数。
         * @return {number} 操作后的结果。
         */
        applyAsLong(left: number, right: number): number;
    }

    interface LongUnaryOperator {
        /**
         * @description: 定义对一个 long 操作数的操作，并产生一个 long 结果。 
         * @param {Long} operand 操作数。
         * @return {Long} 操作后的结果。
         */
        applyAsLong(operand: Long): Long;
    }

    /**
     * @description: Java 可重入互斥锁。更多信息参见 [ReentrantLock] 。
     * 
     * [ReentrantLock]: https://docs.oracle.com/javase/7/docs/api/java/util/concurrent/locks/ReentrantLock.html
     */
    class ReentrantLock extends Object {
        /**
         * @description: 获得锁
         * 
         * 如果锁没有被另一个线程占用并且立即返回，则将锁定计数设置为1。
         * 
         * 如果当前线程已经保持锁定，则保持计数增加1，该方法立即返回。
         * 
         * 如果锁被另一个线程保持，则当前线程将被禁用以进行线程调度，并且在锁定已被获取之前处于休眠状态，此时锁定保持计数被设置为1。
         */
        lock(): void;

        /**
         * @description: 获取锁定，除非当前线程为 interrupted 。
         * 
         * 如果锁没有被另一个线程占用并且立即返回，则将锁定计数设置为1。
         * 
         * 如果当前线程已经保存此锁，则保持计数将递增1，该方法立即返回。
         * 
         * 如果锁被另一个线程保持，则当前线程将被禁用以进行线程调度，并且处于休眠状态，直到发生两件事情之一：
         * 
         * - 锁是由当前线程获取的; 要么
         * - 一些其他线程当前线程interrupts 。
         * 
         * 如果当前线程获取锁定，则锁定保持计数被设置为 1 。
         * 
         * **注意！：**
         * 
         * - 由于该方法是明确的中断点，所以优先考虑通过锁定正常或可重入的采集来响应中断。
         * 
         */
        lockInterruptibly(): void;

        /**
         * @description: 只有在调用时没有被另一个线程持有时才获取锁。
         * @return {boolean} 如果锁未被另一个线程持有，则获取锁，并立即返回值 `true` ，将锁定保持计数设置为1。
         * 
         * 如果当前线程已经保持此锁定，则保持计数加1，方法返回 `true` 。
         * 
         * 如果锁由另一个线程持有，则此方法将立即返回值 `false` 。
         */
        tryLock(): boolean;

        /**
         * @description: 如果锁在给定的等待时间内没有被另一个线程持有并且当前线程不是interrupted ，则获取该锁。
         * @param {Long} timeout 等待的最长时间。
         * @param {TimeUnit} unit `timeout` 参数的时间单位
         * @return {boolean} 如果未被另一个线程持有，则获取锁定并立即返回值 `true` ，将锁定保持计数设置为1。 
         * 
         * 如果当前线程已经保持此锁定，则保持计数增加1，并且该方法返回 `true` 。
         * 
         * 如果锁由另一个线程持有，那么当前线程将被禁用以进行线程调度，并且在发生以下三种情况之一之前处于休眠状态：
         *  - 锁定由当前线程获取。
         *  - 其他一些线程interrupts当前线。
         *  - 指定的等待时间过去了。
         * 
         * 如果获取了锁，则返回值true ，并将锁定保持计数设置为1。
         * 
         * 如果超过指定的等待时间，则返回值 `false` 。 如果时间小于或等于零，则该方法将不会等待。
         */
        tryLock(timeout: Long, unit: TimeUnit): boolean;

        /**
         * @description: 尝试释放此锁。
         * 
         * 如果当前线程是该锁定的持有者，则保持计数减少。 如果保持计数现在为零，则释放锁定。 如果当前线程不是此锁的持有者，则抛出 `IllegalMonitorStateException` 。
         */
        unlock(): void;

        /**
         * @description: 返回 `Condition` 实例以与此 `Lock` 实例一起使用。
         * @return {Condition} 新建的 `Condition` 实例。
         */
        newCondition(): Condition;

        /**
         * @description: 查询当前线程对此锁定的保持数。
         * 
         * 对于与解锁操作不匹配的每个锁定操作，线程都具有锁定保持。
         * 
         * 保持计数信息通常仅用于测试和调试目的。
         * @return {number} 当前线程对此锁的暂停数量。
         */
        getHoldCount(): number;

        /**
         * @description: 查询当前线程是否持有此锁定。
         * 
         * **注意！：**
         * 
         * - 此方法通常用于调试和测试。
         * 
         * @return {boolean} 当前线程持有此锁定返回 `true` 否则返回 `false` 。
         */
        isHeldByCurrentThread(): boolean;

        /**
         * @description: 查询此锁是否由任何线程持有。 此方法设计用于监视系统状态，而不是用于同步控制。
         * @return {boolean} 如果有任何线程持有此锁返回 `true` 否则返回 `false` 。
         */
        isLocked(): boolean;

        /**
         * @description: 检查此锁定的公平性设置。
         * @return {boolean} 如果此锁定的公平性设置为真返回 `true` 否则返回 `false` 。
         */
        isFair(): boolean;

        /**
         * @description: 查询当前拥有此锁的线程。
         * @return {Thread | null} 返回当前拥有此锁的线程。如果不拥有，则返回 `null` 。当此方法由非所有者的线程调用时，返回值反映当前锁定状态的尽力近似值。 例如，即使有线程尝试获取锁定但尚未执行此操作，所有者可能暂时为 `null` 。 
         */
        getOwner(): Thread | null;

        /**
         * @description: 获取可能正在等待获取此锁的线程的集合。
         * @return {Collection<Thread>} 正在等待获取此锁的线程的集合。
         */
        getQueuedThreads(): Collection<Thread>;

        /**
         * @description: 估计等待获取此锁的线程数。
         * @return {number} 等待获取此锁的线程数。
         */
        getQueuedLength(): number;

        /**
         * @description: 获取包含可能在与此锁相关联的给定条件下等待的线程的集合。
         * @param {Condition} condition 检验条件。
         * @return {Collection<Thread>} 与此锁相关联的符合条件的等待的线程的集合。
         */
        getWaitingThreads(condition: Condition): Collection<Thread>;

        /**
         * @description: 获取与此锁相关联的给定条件等待的线程数。
         * 
         * **注意！：**
         * 
         * - 由于超时和中断可能在任何时间发生，因此估计仅用作实际服务员数量的上限。 此方法设计用于监视系统状态，而不是用于同步控制。
         * 
         * @param {Condition} condition 检验条件。
         * @return {number} 与此锁相关联的符合条件的等待的线程的个数。
         */
        getWaitQueueLength(condition: Condition): number;

        /**
         * @description: 查询给定线程是否等待获取此锁。
         * 
         * **注意！：**
         * 
         * - 由于取消可能随时发生，因此返回 `true` 不保证任何其他线程将获得此锁定。 该方法主要用于监视系统状态。
         * 
         * @param {Thread} thread 要查询的线程。
         * @return {boolean} 指定线程在等待则返回 `true` 否则返回 `false` 。
         */
        hasQueuedThread(thread: Thread): boolean;

        /**
         * @description: 查询是否有线程正在等待获取此锁。
         * 
         * **注意！：**
         * 
         * - 由于取消可能随时发生，因此返回 `true` 不保证任何其他线程将获得此锁定。 该方法主要用于监视系统状态。
         * 
         * @return {boolean} 有线程在等待返回 `true` 否则返回 `false` 。
         */
        hasQueuedThreads(): boolean;

        /**
         * @description: 查询任何线程是否等待与此锁相关联的给定条件。
         * 
         * **注意！：**
         * 
         * - 由于超时和中断可能会随时发生，所以 `true` 返回并不能保证将来的 signal 将唤醒任何线程。 该方法主要用于监视系统状态。
         * 
         * @param {Condition} condition 检验条件。
         * @return {boolean} 如果有任何等待线程返回 `true` 否则返回 `false` 。
         */
        hasWaiters(condition: Condition): boolean;
    }

    enum TimeUnit {
        NANOSECONDS,
        MICROSECONDS,
        MILLISECONDS,
        SECONDS,
        MINUTES,
        HOURS,
        DAYS
    }

    /**
     * @description: 更多信息参见 [Condition]
     * 
     * [Condition]: https://www.apiref.com/java11-zh/java.base/java/util/concurrent/locks/Condition.html
     */
    interface Condition {
        /**
         * @description: 导致当前线程等到发出信号或 interrupted 。
         */
        await(): void;

        /**
         * @description: 导致当前线程等待直到发出信号。
         */
        awaitUninterruptibly(): void;

        /**
         * @description: 导致当前线程等待，直到发出信号或中断，或者指定的等待时间过去。
         * @param {Long} nanosTimeout 等待的最长时间，单位纳秒。
         * @return {Long} 该方法返回在给定返回时提供的 `nanosTimeout` 值时等待的剩余纳秒数的估计值，或者如果超时则返回小于或等于零的值。 此值可用于确定在等待返回但等待条件仍未成立的情况下是否以及等待多长时间。
         */
        awaitNanos(nanosTimeout: Long): Long;

        /**
         * @description: 导致当前线程等待，直到发出信号或中断，或者指定的等待时间过去。
         * 
         * 此方法在行为上等同于：
         * ```java
         * awaitNanos(unit.toNanos(time)) > 0
         * ```
         * @param {Long} time 等待的最长时间。
         * @param {TimeUnit} unit `time` 参数的时间单位。
         * @return {boolean} 如果在从方法返回之前检测到等待时间返回 `false` 否则 `true` 。
         */
        await(time: Long, unit: TimeUnit): boolean;

        /**
         * @description: 导致当前线程等待，直到发出信号或中断，或者指定的截止时间过去。
         * @param {Date} deadline 等待的绝对时间。
         * @return {boolean} 如果截止日期已经过去返回 `false` 否则返回 `true` 。
         */
        awaitUntil(deadline: Date): boolean;

        /**
         * @description: 唤醒一个等待线程。
         * 
         * 如果有任何线程在这种情况下等待，则选择一个线程进行唤醒。 然后该线程必须在从 `await` 返回之前重新获取锁。
         */
        signal(): void;

        /**
         * @description: 唤醒所有等待的线程。
         * 
         * 如果任何线程正在等待这种情况，那么它们都被唤醒了。 每个线程必须重新获取锁，然后才能从 `await` 返回。
         */
        signalAll(): void;
    }

    /**
     * @description: 更多信息参见 [Collection] 。
     * 
     * [Collection]: https://www.apiref.com/java11-zh/java.base/java/util/Collection.html
     */
    interface Collection<E> {
        /**
         * @description: 获取此集合中的元素数。 如果此集合包含超过 Integer.MAX_VALUE 元素，则返回 Integer.MAX_VALUE 。
         * @return {number} 此集合中的元素数。
         */
        size(): number;

        /**
         * @description: 检查集合是否为空。
         * @return {boolean} 如果此集合不包含任何元素，则返回 `true` 。
         */
        isEmpty(): boolean;

        /**
         * @description: 检查集合中是否存在指定元素。
         * @param {E} o 要测试其在此集合中的存在的元素。
         * @return {boolean} 如果此 collection 包含指定的元素，则返回 `true` 。
         */
        contains(o: E): boolean;

        /**
         * @description: 获取集合中元素组成的迭代器。
         * @return {Iterator} 此集合中元素的迭代器。
         * 
         * **注意！：**
         * 
         * - 对于返回元素的顺序没有任何保证（除非此集合是某个提供保证的类的实例）。
         * 
         */
        iterator(): Iterator<E>;

        /**
         * @description: 获取集合包含的所有元素组成的数组。
         * @return {array} 返回包含此集合中所有元素的数组。
         * 
         * **注意！：**
         * 
         * - 如果此集合对其迭代器返回的元素的顺序做出任何保证，则此方法必须以相同的顺序返回元素。
         * 
         */
        toArray(): E[];

        /**
         * @description: 确保此集合包含指定的元素（可选操作）。
         * @param {E} e 如果此集合因调用而更改，则返回 `true` （如果此集合不允许重复并且已包含指定的元素，则返回 `false` ）。
         */
        add(e: E): void;

        /**
         * @description: 从此集合中移除指定元素的单个实例（如果存在）（可选操作）。
         * @return {boolean} 如果此集合包含指定的元素，则返回 `true`（或等效地，如果此集合因调用而更改，则返回 `false` ）。
         */
        remove(o: E): boolean;

        /**
         * @description: 检查此集合是否包含指定集合中的所有元素。
         * @param {Collection} c 要检查此集合中的包含的集合。
         * @return {boolean} 如果此集合包含指定集合中的所有元素返回 `true` 否则返回 `false` 。
         */
        containsAll(c: Collection<E>): boolean;

        /**
         * @description: 将指定集合中的所有元素添加到此集合中（可选操作）。 如果在操作正在进行时修改了指定的集合，则此操作的行为是不确定的（这意味着如果指定的集合是此集合，则此调用的行为是未定义的，并且此集合是非空的。）。
         * @param {Collection} c 包含要添加到此集合的元素的集合。
         * @return {boolean} 如果此集合因调用而更改返回 `true` 否则返回 `false` 。
         */
        addAll(c: Collection<E>): boolean;

        /**
         * @description: 删除此集合的所有元素，这些元素也包含在指定的集合中（可选操作）。 此调用返回后，此集合将不包含与指定集合相同的元素。
         * @param {Collection} c 包含要从此集合中删除的元素的集合。
         * @return {boolean} 如果此集合因调用而更改返回 `true` 否则返回 `false` 。
         */
        removeAll(c: Collection<E>): boolean;

        /**
         * @description: 从此集合中删除所有元素（可选操作）。 此方法返回后，该集合将为空。
         */
        clear(): void;
    }

    // TODO: 想办法替换成长整数
    class Long extends Number { }

    class Double extends Number { }
}