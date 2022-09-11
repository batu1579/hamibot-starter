/*
 * @Author: BATU1579
 * @CreateDate: 2022-07-12 04:55:37
 * @LastEditor: BATU1579
 * @LastTime: 2022-09-11 10:24:19
 * @FilePath: \\src\\types\\sensors.d.ts
 * @Description: 传感器模块
 */
declare module 'sensors' {
    import { EventEmitter } from 'events';

    global {

        /**
         * @description: sensors 模块提供了获取手机上的传感器的信息的支持，这些传感器包括距离传感器、光线光感器、重力传感器、方向传感器等。要监听一个传感器时，需要使用 `sensors.register()` 注册监听器，之后才能开始监听；不需要监听时则调用 `sensors.unregister()` 注销监听器。在脚本结束时会自动注销所有的监听器。同时，这种监听会使脚本保持运行状态，如果不注销监听器，脚本会一直保持运行状态。
         * 
         * **注意！：**
         * 
         * - 脚本只能获取传感器的数据，不能模拟或伪造传感器的数据和事件。
         * 
         */
        const sensors: Sensors;
    }

    interface Sensors {
        /**
         * @description: 注册一个传感器监听并返回一个 SensorEventEmitter 对象 。
         * @param {string} sensorName 传感器名称（ `accelerometer` ）加速度传感器。
         * @param {number} [delay] 传感器数据更新频率（默认为 `sensors.delay.normal` ），可选的值为:
         * 
         * - `sensors.delay.fastest` - 最快的更新频率。
         * - `sensors.delay.game` - 适合于游戏的更新频率。
         * - `sensors.delay.ui` - 适合于用户界面的更新频率。
         * - `sensors.delay.normal` - 正常频率。
         * 
         * @return {AccelerometerEventEmitter | null} 传感器的监听器。
         * 
         * **注意！：**
         * 
         * - 如果不支持 `sensorName` 所指定的传感器，那么该函数将返回 `null` ；但如果 `sensors.ignoresUnsupportedSensor` 的值被设置为 `true` , 则该函数会返回一个不会分发任何传感器事件的 `SensorEventEmitter` 。
         * 
         * @example
         * ```typescript
         * console.show();
         * // 注册传感器监听
         * let sensor = sensors.register('gravity', sensors.delay.game);
         * if (sensor == null) {
         *     toast('不支持重力传感器');
         *     exit();
         * }
         * // 监听数据
         * sensor.on('change', (gx, gy, gz) => {
         *     log('重力加速度: %d, %d, %d', gx, gy, gz);
         * });
         * ```
         */
        register(sensorName: 'accelerometer', delay?: number): AccelerometerEventEmitter | null;

        /**
         * @description: 注册一个传感器监听并返回一个 SensorEventEmitter 对象 。
         * @param {string} sensorName 传感器名称（ `orientation` ）方向传感器。
         * @param {number} [delay] 传感器数据更新频率（默认为 `sensors.delay.normal` ），可选的值为:
         * 
         * - `sensors.delay.fastest` - 最快的更新频率。
         * - `sensors.delay.game` - 适合于游戏的更新频率。
         * - `sensors.delay.ui` - 适合于用户界面的更新频率。
         * - `sensors.delay.normal` - 正常频率。
         * 
         * @return {OrientationEventEmitter | null} 传感器的监听器。
         * 
         * **注意！：**
         * 
         * - 如果不支持 `sensorName` 所指定的传感器，那么该函数将返回 `null` ；但如果 `sensors.ignoresUnsupportedSensor` 的值被设置为 `true` , 则该函数会返回一个不会分发任何传感器事件的 `SensorEventEmitter` 。
         * 
         * @example
         * ```typescript
         * console.show();
         * // 注册传感器监听
         * let sensor = sensors.register('gravity', sensors.delay.game);
         * if (sensor == null) {
         *     toast('不支持重力传感器');
         *     exit();
         * }
         * // 监听数据
         * sensor.on('change', (gx, gy, gz) => {
         *     log('重力加速度: %d, %d, %d', gx, gy, gz);
         * });
         * ```
         */
        register(sensorName: 'orientation', delay?: number): OrientationEventEmitter | null;

        /**
         * @description: 注册一个传感器监听并返回一个 SensorEventEmitter 对象 。
         * @param {string} sensorName 传感器名称（ `gyroscope` ）陀螺仪传感器。
         * @param {number} [delay] 传感器数据更新频率（默认为 `sensors.delay.normal` ），可选的值为:
         * 
         * - `sensors.delay.fastest` - 最快的更新频率。
         * - `sensors.delay.game` - 适合于游戏的更新频率。
         * - `sensors.delay.ui` - 适合于用户界面的更新频率。
         * - `sensors.delay.normal` - 正常频率。
         * 
         * @return {GyroscopeEventEmitter | null} 传感器的监听器。
         * 
         * **注意！：**
         * 
         * - 如果不支持 `sensorName` 所指定的传感器，那么该函数将返回 `null` ；但如果 `sensors.ignoresUnsupportedSensor` 的值被设置为 `true` , 则该函数会返回一个不会分发任何传感器事件的 `SensorEventEmitter` 。
         * 
         * @example
         * ```typescript
         * console.show();
         * // 注册传感器监听
         * let sensor = sensors.register('gravity', sensors.delay.game);
         * if (sensor == null) {
         *     toast('不支持重力传感器');
         *     exit();
         * }
         * // 监听数据
         * sensor.on('change', (gx, gy, gz) => {
         *     log('重力加速度: %d, %d, %d', gx, gy, gz);
         * });
         * ```
         */
        register(sensorName: 'gyroscope', delay?: number): GyroscopeEventEmitter | null;

        /**
         * @description: 注册一个传感器监听并返回一个 SensorEventEmitter 对象 。
         * @param {string} sensorName 传感器名称（ `magnetic_field` ）磁场传感器。
         * @param {number} [delay] 传感器数据更新频率（默认为 `sensors.delay.normal` ），可选的值为:
         * 
         * - `sensors.delay.fastest` - 最快的更新频率。
         * - `sensors.delay.game` - 适合于游戏的更新频率。
         * - `sensors.delay.ui` - 适合于用户界面的更新频率。
         * - `sensors.delay.normal` - 正常频率。
         * 
         * @return {MagneticFieldEventEmitter | null} 传感器的监听器。
         * 
         * **注意！：**
         * 
         * - 如果不支持 `sensorName` 所指定的传感器，那么该函数将返回 `null` ；但如果 `sensors.ignoresUnsupportedSensor` 的值被设置为 `true` , 则该函数会返回一个不会分发任何传感器事件的 `SensorEventEmitter` 。
         * 
         * @example
         * ```typescript
         * console.show();
         * // 注册传感器监听
         * let sensor = sensors.register('gravity', sensors.delay.game);
         * if (sensor == null) {
         *     toast('不支持重力传感器');
         *     exit();
         * }
         * // 监听数据
         * sensor.on('change', (gx, gy, gz) => {
         *     log('重力加速度: %d, %d, %d', gx, gy, gz);
         * });
         * ```
         */
        register(sensorName: 'magnetic_field', delay?: number): MagneticFieldEventEmitter | null;

        /**
         * @description: 注册一个传感器监听并返回一个 SensorEventEmitter 对象 。
         * @param {string} sensorName 传感器名称（ `gravity` ）重力传感器。
         * @param {number} [delay] 传感器数据更新频率（默认为 `sensors.delay.normal` ），可选的值为:
         * 
         * - `sensors.delay.fastest` - 最快的更新频率。
         * - `sensors.delay.game` - 适合于游戏的更新频率。
         * - `sensors.delay.ui` - 适合于用户界面的更新频率。
         * - `sensors.delay.normal` - 正常频率。
         * 
         * @return {GravityEventEmitter | null} 传感器的监听器。
         * 
         * **注意！：**
         * 
         * - 如果不支持 `sensorName` 所指定的传感器，那么该函数将返回 `null` ；但如果 `sensors.ignoresUnsupportedSensor` 的值被设置为 `true` , 则该函数会返回一个不会分发任何传感器事件的 `SensorEventEmitter` 。
         * 
         * @example
         * ```typescript
         * console.show();
         * // 注册传感器监听
         * let sensor = sensors.register('gravity', sensors.delay.game);
         * if (sensor == null) {
         *     toast('不支持重力传感器');
         *     exit();
         * }
         * // 监听数据
         * sensor.on('change', (gx, gy, gz) => {
         *     log('重力加速度: %d, %d, %d', gx, gy, gz);
         * });
         * ```
         */
        register(sensorName: 'gravity', delay?: number): GravityEventEmitter | null;

        /**
         * @description: 注册一个传感器监听并返回一个 SensorEventEmitter 对象 。
         * @param {string} sensorName 传感器名称（ `linear_acceleration` ）线性加速度传感器。
         * @param {number} [delay] 传感器数据更新频率（默认为 `sensors.delay.normal` ），可选的值为:
         * 
         * - `sensors.delay.fastest` - 最快的更新频率。
         * - `sensors.delay.game` - 适合于游戏的更新频率。
         * - `sensors.delay.ui` - 适合于用户界面的更新频率。
         * - `sensors.delay.normal` - 正常频率。
         * 
         * @return {LinearAccelerationEventEmitter | null} 传感器的监听器。
         * 
         * **注意！：**
         * 
         * - 如果不支持 `sensorName` 所指定的传感器，那么该函数将返回 `null` ；但如果 `sensors.ignoresUnsupportedSensor` 的值被设置为 `true` , 则该函数会返回一个不会分发任何传感器事件的 `SensorEventEmitter` 。
         * 
         * @example
         * ```typescript
         * console.show();
         * // 注册传感器监听
         * let sensor = sensors.register('gravity', sensors.delay.game);
         * if (sensor == null) {
         *     toast('不支持重力传感器');
         *     exit();
         * }
         * // 监听数据
         * sensor.on('change', (gx, gy, gz) => {
         *     log('重力加速度: %d, %d, %d', gx, gy, gz);
         * });
         * ```
         */
        register(sensorName: 'linear_acceleration', delay?: number): LinearAccelerationEventEmitter | null;

        /**
         * @description: 注册一个传感器监听并返回一个 SensorEventEmitter 对象 。
         * @param {string} sensorName 传感器名称（ `ambient_temperature` ）环境温度传感器，大部分设备并不支持。
         * @param {number} [delay] 传感器数据更新频率（默认为 `sensors.delay.normal` ），可选的值为:
         * 
         * - `sensors.delay.fastest` - 最快的更新频率。
         * - `sensors.delay.game` - 适合于游戏的更新频率。
         * - `sensors.delay.ui` - 适合于用户界面的更新频率。
         * - `sensors.delay.normal` - 正常频率。
         * 
         * @return {AmbientTemperatureEventEmitter | null} 传感器的监听器。
         * 
         * **注意！：**
         * 
         * - 如果不支持 `sensorName` 所指定的传感器，那么该函数将返回 `null` ；但如果 `sensors.ignoresUnsupportedSensor` 的值被设置为 `true` , 则该函数会返回一个不会分发任何传感器事件的 `SensorEventEmitter` 。
         * 
         * @example
         * ```typescript
         * console.show();
         * // 注册传感器监听
         * let sensor = sensors.register('gravity', sensors.delay.game);
         * if (sensor == null) {
         *     toast('不支持重力传感器');
         *     exit();
         * }
         * // 监听数据
         * sensor.on('change', (gx, gy, gz) => {
         *     log('重力加速度: %d, %d, %d', gx, gy, gz);
         * });
         * ```
         */
        register(sensorName: 'ambient_temperature', delay?: number): AmbientTemperatureEventEmitter | null;

        /**
         * @description: 注册一个传感器监听并返回一个 SensorEventEmitter 对象 。
         * @param {string} sensorName 传感器名称（ `light` ）光线传感器。
         * @param {number} [delay] 传感器数据更新频率（默认为 `sensors.delay.normal` ），可选的值为:
         * 
         * - `sensors.delay.fastest` - 最快的更新频率。
         * - `sensors.delay.game` - 适合于游戏的更新频率。
         * - `sensors.delay.ui` - 适合于用户界面的更新频率。
         * - `sensors.delay.normal` - 正常频率。
         * 
         * @return {LightEventEmitter | null} 传感器的监听器。
         * 
         * **注意！：**
         * 
         * - 如果不支持 `sensorName` 所指定的传感器，那么该函数将返回 `null` ；但如果 `sensors.ignoresUnsupportedSensor` 的值被设置为 `true` , 则该函数会返回一个不会分发任何传感器事件的 `SensorEventEmitter` 。
         * 
         * @example
         * ```typescript
         * console.show();
         * // 注册传感器监听
         * let sensor = sensors.register('gravity', sensors.delay.game);
         * if (sensor == null) {
         *     toast('不支持重力传感器');
         *     exit();
         * }
         * // 监听数据
         * sensor.on('change', (gx, gy, gz) => {
         *     log('重力加速度: %d, %d, %d', gx, gy, gz);
         * });
         * ```
         */
        register(sensorName: 'light', delay?: number): LightEventEmitter | null;

        /**
         * @description: 注册一个传感器监听并返回一个 SensorEventEmitter 对象 。
         * @param {string} sensorName 传感器名称（ `pressure` ）压力传感器。
         * @param {number} [delay] 传感器数据更新频率（默认为 `sensors.delay.normal` ），可选的值为:
         * 
         * - `sensors.delay.fastest` - 最快的更新频率。
         * - `sensors.delay.game` - 适合于游戏的更新频率。
         * - `sensors.delay.ui` - 适合于用户界面的更新频率。
         * - `sensors.delay.normal` - 正常频率。
         * 
         * @return {PressureEventEmitter | null} 传感器的监听器。
         * 
         * **注意！：**
         * 
         * - 如果不支持 `sensorName` 所指定的传感器，那么该函数将返回 `null` ；但如果 `sensors.ignoresUnsupportedSensor` 的值被设置为 `true` , 则该函数会返回一个不会分发任何传感器事件的 `SensorEventEmitter` 。
         * 
         * @example
         * ```typescript
         * console.show();
         * // 注册传感器监听
         * let sensor = sensors.register('gravity', sensors.delay.game);
         * if (sensor == null) {
         *     toast('不支持重力传感器');
         *     exit();
         * }
         * // 监听数据
         * sensor.on('change', (gx, gy, gz) => {
         *     log('重力加速度: %d, %d, %d', gx, gy, gz);
         * });
         * ```
         */
        register(sensorName: 'pressure', delay?: number): PressureEventEmitter | null;

        /**
         * @description: 注册一个传感器监听并返回一个 SensorEventEmitter 对象 。
         * @param {string} sensorName 传感器名称（ `proximity` ）距离传感器。
         * @param {number} [delay] 传感器数据更新频率（默认为 `sensors.delay.normal` ），可选的值为:
         * 
         * - `sensors.delay.fastest` - 最快的更新频率。
         * - `sensors.delay.game` - 适合于游戏的更新频率。
         * - `sensors.delay.ui` - 适合于用户界面的更新频率。
         * - `sensors.delay.normal` - 正常频率。
         * 
         * @return {ProximityEventEmitter | null} 传感器的监听器。
         * 
         * **注意！：**
         * 
         * - 如果不支持 `sensorName` 所指定的传感器，那么该函数将返回 `null` ；但如果 `sensors.ignoresUnsupportedSensor` 的值被设置为 `true` , 则该函数会返回一个不会分发任何传感器事件的 `SensorEventEmitter` 。
         * 
         * @example
         * ```typescript
         * console.show();
         * // 注册传感器监听
         * let sensor = sensors.register('gravity', sensors.delay.game);
         * if (sensor == null) {
         *     toast('不支持重力传感器');
         *     exit();
         * }
         * // 监听数据
         * sensor.on('change', (gx, gy, gz) => {
         *     log('重力加速度: %d, %d, %d', gx, gy, gz);
         * });
         * ```
         */
        register(sensorName: 'proximity', delay?: number): ProximityEventEmitter | null;

        /**
         * @description: 注册一个传感器监听并返回一个 SensorEventEmitter 对象 。
         * @param {string} sensorName 传感器名称（ `relative_humidity` ）湿度传感器，大部分设备并不支持。
         * @param {number} [delay] 传感器数据更新频率（默认为 `sensors.delay.normal` ），可选的值为:
         * 
         * - `sensors.delay.fastest` - 最快的更新频率。
         * - `sensors.delay.game` - 适合于游戏的更新频率。
         * - `sensors.delay.ui` - 适合于用户界面的更新频率。
         * - `sensors.delay.normal` - 正常频率。
         * 
         * @return {RelativeHumidityEventEmitter | null} 传感器的监听器。
         * 
         * **注意！：**
         * 
         * - 如果不支持 `sensorName` 所指定的传感器，那么该函数将返回 `null` ；但如果 `sensors.ignoresUnsupportedSensor` 的值被设置为 `true` , 则该函数会返回一个不会分发任何传感器事件的 `SensorEventEmitter` 。
         * 
         * @example
         * ```typescript
         * console.show();
         * // 注册传感器监听
         * let sensor = sensors.register('gravity', sensors.delay.game);
         * if (sensor == null) {
         *     toast('不支持重力传感器');
         *     exit();
         * }
         * // 监听数据
         * sensor.on('change', (gx, gy, gz) => {
         *     log('重力加速度: %d, %d, %d', gx, gy, gz);
         * });
         * ```
         */
        register(sensorName: 'relative_humidity', delay?: number): RelativeHumidityEventEmitter | null;

        /**
         * @description: 注册一个传感器监听并返回一个 SensorEventEmitter 对象 。
         * @param {string} sensorName 传感器名称。
         * @param {number} [delay] 传感器数据更新频率（默认为 `sensors.delay.normal` ），可选的值为:
         * 
         * - `sensors.delay.fastest` - 最快的更新频率。
         * - `sensors.delay.game` - 适合于游戏的更新频率。
         * - `sensors.delay.ui` - 适合于用户界面的更新频率。
         * - `sensors.delay.normal` - 正常频率。
         * 
         * @return {SensorsEventEmitter | null} 传感器的监听器。
         * 
         * **注意！：**
         * 
         * - 如果不支持 `sensorName` 所指定的传感器，那么该函数将返回 `null` ；但如果 `sensors.ignoresUnsupportedSensor` 的值被设置为 `true` , 则该函数会返回一个不会分发任何传感器事件的 `SensorEventEmitter` 。
         * 
         * @example
         * ```typescript
         * console.show();
         * // 注册传感器监听
         * let sensor = sensors.register('gravity', sensors.delay.game);
         * if (sensor == null) {
         *     toast('不支持重力传感器');
         *     exit();
         * }
         * // 监听数据
         * sensor.on('change', (gx, gy, gz) => {
         *     log('重力加速度: %d, %d, %d', gx, gy, gz);
         * });
         * ```
         */
        register(sensorName: string, delay?: number): SensorEventEmitter | null;

        /**
         * @description: 注销该传感器监听器。被注销的监听器将不再能监听传感器数据。
         * @param {SensorEventEmitter} emitter 要注销的监听器对象。
         * @example
         * ```typescript
         * // 注册一个传感器监听器
         * let sensor = sensors.register('gravity');
         * if (sensor == null) {
         *     exit();
         * }
         * // 2秒后注销该监听器
         * setTimeout(() => {
         *     sensors.unregister(sensor);
         * }, 2000);
         * ```
         */
        unregister(emitter: SensorEventEmitter): void;

        /**
         * @description: 注销所有传感器监听器。
         */
        unregisterAll(): void;

        /**
         * @description: 绑定当事件发生时的行为。
         * @param {string} eventName 事件名称（ `unsupported_sensor` ）。
         * @param {function} listener 当事件发生时要执行的回调函数。参数为 string （不支持的传感器名称），返回值为 any 。
         * @example
         * ```typescript
         * // 忽略不支持的传感器
         * sensors.ignoresUnsupportedSensor = true;
         * // 监听有不支持的传感器时的事件
         * sensors.on('unsupported_sensor', function(sensorName) {
         *     toastLog('不支持的传感器: ' + sensorName);
         * });
         * // 随便注册一个不存在的传感器。
         * log(sensors.register('aaabbb'));
         * ```
         */
        on(eventName: 'unsupported_sensor', listener: (sensorName: string) => any): this;

        /**
         * @description: 表示是否忽略不支持的传感器。如果该值被设置为 `true` ，则函数 `sensors.register()` 即使对不支持的传感器也会返回一个无任何数据的虚拟传感器监听，也就是 `sensors.register()` 不会返回 `null` 从而避免非空判断，并且此时会触发 `sensors` 的 `unsupported_sensor` 事件。
         * @example
         * ```typescript
         * // 忽略不支持的传感器
         * sensors.ignoresUnsupportedSensor = true;
         * // 监听有不支持的传感器时的事件
         * sensors.on('unsupported_sensor', function(sensorName) {
         *     toastLog('不支持的传感器: ' + sensorName);
         * });
         * // 随便注册一个不存在的传感器。
         * log(sensors.register('aaabbb'));
         * ```
         */
        ignoresUnsupportedSensor: boolean;

        /**
         * @description: 传感器数据更新频率，可选的值为:
         * 
         * - `sensors.delay.fastest` - 最快的更新频率。
         * - `sensors.delay.game` - 适合于游戏的更新频率。
         * - `sensors.delay.ui` - 适合于用户界面的更新频率。
         * - `sensors.delay.normal` - 正常频率。
         * 
         */
        readonly delay: Delay;
    }

    type SensorEventEmitter = {
        /**
         * @description: 绑定当事件发生时的行为。
         * @param {string} eventName 事件名称（ `change` ）。当传感器数据改变时触发该事件。该事件触发的最高频繁由 `sensors.register()` 指定的 `delay` 参数决定。
         * @param {array} [args] 传感器参数。
         */
        on(eventName: 'change', ...args: any[]): SensorEventEmitter;
    } & BaseSensorEventEmitter;

    /**
     * @description: 传感器数据更新频率。
     */
    interface Delay {
        readonly fastest: number,
        readonly game: number,
        readonly ui: number,
        readonly normal: number
    }

    type BaseSensorEventEmitter = EventEmitter & {
        /**
         * @description: 当传感器精度发生变化时触发的事件。
         * @param {string} eventName 事件名称（ `accuracy_change` ）。
         * @param {number} accuracy 表示传感器精度，可选的值为:
         * 
         * - `-1` - 传感器未连接。
         * - `0` - 传感器不可读。
         * - `1` - 低精度。
         * - `2` - 中精度。
         * - `3` - 高精度。
         * 
         */
        on(eventName: 'accuracy_change', accuracy: -1 | 0 | 1 | 2 | 3): BaseSensorEventEmitter;
    }

    type AddChangeEventListener<T> = {
        /**
         * @description: 当传感器数值变化时触发的事件。
         * @param {string} eventName 事件名称（ `change` ）。当传感器数据改变时触发该事件。该事件触发的最高频繁由 `sensors.register()` 指定的 `delay` 参数决定。
         * @param {T} listener 当事件发生时要执行的回调函数。
         */
        on(eventName: 'change', listener: T): AddChangeEventListener<T>;
    } & BaseSensorEventEmitter;

    type AccelerometerEventEmitter = AddChangeEventListener<AccelerometerListener>;

    type OrientationEventEmitter = AddChangeEventListener<OrientationListener>;

    type GyroscopeEventEmitter = AddChangeEventListener<GyroscopeListener>;

    type MagneticFieldEventEmitter = AddChangeEventListener<MagneticFieldListener>;

    type GravityEventEmitter = AddChangeEventListener<GravityListener>;

    type LinearAccelerationEventEmitter = AddChangeEventListener<LinearAccelerationListener>;

    type AmbientTemperatureEventEmitter = AddChangeEventListener<AmbientTemperatureListener>;

    type LightEventEmitter = AddChangeEventListener<LightListener>;

    type PressureEventEmitter = AddChangeEventListener<PressureListener>;

    type ProximityEventEmitter = AddChangeEventListener<ProximityListener>;

    type RelativeHumidityEventEmitter = AddChangeEventListener<RelativeHumidityListener>;

    /**
     * @callback AccelerometerListener
     * @param {SensorEvent} event 加速度传感器事件，用于获取加速度传感器数据变化时的所有信息。
     * @param {number} ax  x 轴上的加速度，单位 m/(s)^2 。
     * @param {number} ay  y 轴上的加速度，单位 m/(s)^2 。
     * @param {number} az  z 轴上的加速度（垂直于设备屏幕），单位 m/(s)^2 。
     * @return {any}
     */
    type AccelerometerListener = (
        /** 加速度传感器事件，用于获取加速度传感器数据变化时的所有信息。 */
        event: SensorEvent,
        /** x 轴上的加速度，单位 m/(s)^2 。 */
        ax: number,
        /** y 轴上的加速度，单位 m/(s)^2 。 */
        ay: number,
        /** z 轴上的加速度（垂直于设备屏幕），单位 m/(s)^2 。 */
        az: number
    ) => any;

    /**
     * @callback OrientationListener
     * @param {SensorEvent} event 方向传感器事件，用于获取方向传感器数据变化时的所有信息。
     * @param {number} azimuth 方位角，从地磁指北方向线起，依顺时针方向到 y 轴之间的水平夹角，单位角度，范围 0~359 。
     * @param {number} pitch 绕 x 轴旋转的角度，当设备水平放置时该值为 0 ，当设备顶部翘起时该值为正数，当设备尾部翘起时该值为负数，单位角度，范围 -180~180 。
     * @param {number} roll 绕 y 轴顺时针旋转的角度，单位角度，范围 -90~90 。
     * @return {any}
     */
    type OrientationListener = (
        /** 方向传感器事件，用于获取方向传感器数据变化时的所有信息。 */
        event: SensorEvent,
        /** 方位角，从地磁指北方向线起，依顺时针方向到 y 轴之间的水平夹角，单位角度，范围 0~359 。 */
        azimuth: number,
        /** 绕 x 轴旋转的角度，当设备水平放置时该值为 0 ，当设备顶部翘起时该值为正数，当设备尾部翘起时该值为负数，单位角度，范围 -180~180 。 */
        pitch: number,
        /** 绕 y 轴顺时针旋转的角度，单位角度，范围 -90~90 。 */
        roll: number
    ) => any;

    /**
     * @callback GyroscopeListener
     * @param {SensorEvent} event 陀螺仪传感器事件，用于获取陀螺仪传感器数据变化时的所有信息。
     * @param {number} wx 绕 x 轴的角速度，单位弧度/s 。
     * @param {number} wy 绕 y 轴的角速度，单位弧度/s 。
     * @param {number} wz 绕 z 轴的角速度，单位弧度/s 。
     * @return {any}
     */
    type GyroscopeListener = (
        /** 陀螺仪传感器事件，用于获取陀螺仪传感器数据变化时的所有信息。 */
        event: SensorEvent,
        /** 绕 x 轴的角速度，单位弧度/s 。 */
        wx: number,
        /** 绕 y 轴的角速度，单位弧度/s 。 */
        wy: number,
        /** 绕 z 轴的角速度，单位弧度/s 。 */
        wz: number
    ) => any;

    /**
     * @callback MagneticFieldListener
     * @param {SensorEvent} event 磁场传感器事件，用于获取磁场传感器数据变化时的所有信息。
     * @param {number} bx x 轴上的磁场强度，单位 uT 。
     * @param {number} by y 轴上的磁场强度，单位 uT 。
     * @param {number} bz z 轴上的磁场强度，单位 uT 。
     * @return {any}
     */
    type MagneticFieldListener = (
        /** 磁场传感器事件，用于获取磁场传感器数据变化时的所有信息。 */
        event: SensorEvent,
        /** x 轴上的磁场强度，单位 uT 。 */
        bx: number,
        /** y 轴上的磁场强度，单位 uT 。 */
        by: number,
        /** z 轴上的磁场强度，单位 uT 。 */
        bz: number
    ) => any;

    /**
     * @callback GravityListener
     * @param {SensorEvent} event 重力传感器事件，用于获取重力传感器数据变化时的所有信息。
     * @param {number} gx x 轴上的重力加速度，单位 m/(s)^2 。
     * @param {number} gy y 轴上的重力加速度，单位 m/(s)^2 。
     * @param {number} gz z 轴上的重力加速度，单位 m/(s)^2 。
     * @return {any}
     */
    type GravityListener = (
        /** 重力传感器事件，用于获取重力传感器数据变化时的所有信息。 */
        event: SensorEvent,
        /** x 轴上的重力加速度，单位 m/(s)^2 。 */
        gx: number,
        /** y 轴上的重力加速度，单位 m/(s)^2 。 */
        gy: number,
        /** z 轴上的重力加速度，单位 m/(s)^2 。 */
        gz: number
    ) => any;

    /**
     * @callback LinearAccelerationListener
     * @param {SensorEvent} event 线性加速度传感器事件，用于获取线性加速度传感器数据变化时的所有信息。
     * @param {number} ax x 轴上的线性加速度，单位 m/(s)^2 。
     * @param {number} ay y 轴上的线性加速度，单位 m/(s)^2 。
     * @param {number} az z 轴上的线性加速度，单位 m/(s)^2 。
     * @return {any}
     */
    type LinearAccelerationListener = (
        /** 线性加速度传感器事件，用于获取线性加速度传感器数据变化时的所有信息。 */
        event: SensorEvent,
        /** x 轴上的线性加速度，单位 m/(s)^2 。 */
        ax: number,
        /** y 轴上的线性加速度，单位 m/(s)^2 。 */
        ay: number,
        /** z 轴上的线性加速度，单位 m/(s)^2 。 */
        az: number
    ) => any;

    /**
     * @callback AmbientTemperatureListener
     * @param {SensorEvent} event 环境温度传感器事件，用于获取环境温度传感器数据变化时的所有信息。
     * @param {number} t 环境温度，单位摄氏度。
     * @return {any}
     */
    type AmbientTemperatureListener = (
        /** 环境温度传感器事件，用于获取环境温度传感器数据变化时的所有信息。 */
        event: SensorEvent,
        /** 环境温度，单位摄氏度。 */
        t: number
    ) => any;

    /**
     * @callback LightListener
     * @param {SensorEvent} event 光线传感器事件，用于获取光线传感器数据变化时的所有信息。
     * @param {number} light 环境光强度，单位 lux 。
     * @return {any}
     */
    type LightListener = (
        /** 光线传感器事件，用于获取光线传感器数据变化时的所有信息。 */
        event: SensorEvent,
        /** 环境光强度，单位 lux 。 */
        light: number
    ) => any;

    /**
     * @callback PressureListener
     * @param {SensorEvent} event 压力传感器事件，用于获取压力传感器数据变化时的所有信息。
     * @param {number} p 大气压，单位 hPa 。
     * @return {any}
     */
    type PressureListener = (
        /** 压力传感器事件，用于获取压力传感器数据变化时的所有信息。 */
        event: SensorEvent,
        /** 大气压，单位 hPa 。 */
        p: number
    ) => any;

    /**
     * @callback ProximityListener
     * @param {SensorEvent} event 距离传感器事件，用于获取距离传感器数据变化时的所有信息。
     * @param {number} distance 一般指设备前置摄像头旁边的距离传感器到前方障碍物的距离，并且很多设备上这个值只有两种情况：当障碍物较近时该值为 0，当障碍物较远或在范围内没有障碍物时该值为 5 。
     * @return {any}
     */
    type ProximityListener = (
        /** 距离传感器事件，用于获取距离传感器数据变化时的所有信息。 */
        event: SensorEvent,
        /** 一般指设备前置摄像头旁边的距离传感器到前方障碍物的距离，并且很多设备上这个值只有两种情况：当障碍物较近时该值为 0，当障碍物较远或在范围内没有障碍物时该值为 5 。 */
        distance: number
    ) => any;

    /**
     * @callback RelativeHumidityListener
     * @param {SensorEvent} event 湿度传感器事件，用于获取湿度传感器数据变化时的所有信息。
     * @param {number} rh 相对湿度，范围为 0~100（百分比）。
     * @return {any}
     */
    type RelativeHumidityListener = (
        /** 湿度传感器事件，用于获取湿度传感器数据变化时的所有信息。 */
        event: SensorEvent,
        /** 相对湿度，范围为 0~100（百分比）。 */
        rh: number
    ) => any;

    // TODO: 补全方法和属性
    interface SensorEvent {
        /**
         * @description: 精度。
         */
        readonly accuracy: number;

        /**
         * @description: 时间戳。
         */
        readonly timestamp: number;

        /**
         * @description: 传感器读取到的值。
         */
        readonly value: number[];

        readonly sensor: object;

        [prop: string]: any;
    }
}