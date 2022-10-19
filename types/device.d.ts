/*
 * @Author: BATU1579
 * @CreateDate: 2022-06-03 01:55:44
 * @LastEditor: BATU1579
 * @LastTime: 2022-09-11 10:51:46
 * @FilePath: \\src\\types\\device.d.ts
 * @Description: device 模块
 */
declare module 'device' {
    global {
        /**
         * @description: `device` 模块提供了与设备有关的信息与操作，例如获取设备宽高，内存使用率，IMEI，调整设备亮度、音量等。此模块的部分函数，例如调整音量，需要'修改系统设置'的权限。如果没有该权限，会抛出 `SecurityException` 并跳转到权限设置界面。
         */
        const device: Device;
    }

    interface Device {
        /**
         * @description: 设备屏幕分辨率宽度。例如 1080。
         */
        readonly width: number;

        /**
         * @description: 设备屏幕分辨率高度。例如 1920。
         */
        readonly height: number;

        /**
         * @description: 修订版本号，或者诸如 'M4-rc20' 的标识。
         */
        readonly buildId: string;

        /**
         * @description: 设备的主板（?）型号。例如 'goldfish' 。
         */
        readonly broad: string;

        /**
         * @description: 与产品或硬件相关的厂商品牌，如 'Xiaomi' , 'Huawei' 等。
         */
        readonly brand: string;

        /**
         * @description: 设备在工业设计中的名称。
         */
        readonly device: string;

        /**
         * @description: 设备型号。
         */
        readonly model: string;

        /**
         * @description: 产品完整名称。
         */
        readonly product: string;

        /**
         * @description: 设备 Bootloader 的版本。
         */
        readonly bootloader: string;

        /**
         * @description: 设备的硬件名称（来自内核命令行或者/proc）。
         */
        readonly hardware: string;

        /**
         * @description: 构建（build）的唯一标识码。
         */
        readonly fingerprint: string;

        /**
         * @description: 硬件序列号。
         */
        readonly serial: string;

        /**
         * @description: 安卓系统 API 版本。例如安卓 4.4 的 sdkInt 为 19。
         */
        readonly sdkInt: number;

        /**
         * @description: 源代码管理生成的内部值。例如，git 提交的散列值。
         */
        readonly incremental: string;

        /**
         * @description: Android 系统版本号。例如 '5.0' , '7.1.1' 。
         */
        readonly releases: string;

        /**
         * @description: 产品构建所基于的操作系统。
         */
        readonly baseOS: string;

        /**
         * @description: 安全补丁程序级别。
         */
        readonly securityPatch: string;

        /**
         * @description: 开发代号，例如发行版是 'REL' 。
         */
        readonly codename: string;

        /**
         * @description: 获取设备的 IMEI。
         * @return {string} 设备的 IMEI。
         */
        getIMEI(): string;

        /**
         * @description: 获取设备的 Android ID 。Android ID 为一个用 16 进制字符串表示的 64 位整数，在设备第一次使用时随机生成，之后不会更改，除非恢复出厂设置。
         * @return {string} 设备的 Android ID。
         */
        getAndroidId(): string;

        /**
         * @description: 获取设备的 Mac 地址。
         * 
         * **注意！：**
         * 
         * - 未来可能增加有 root 权限的情况下通过 root 权限获取，从而在没有 WLAN 连接的情况下也能返回正确的 Mac 地址，因此请勿使用此函数判断 WLAN 连接。
         * 
         * @return {string | null} 在有 WLAN 连接的情况下返回设备的 Mac 地址，否则会返回 `null` 。
         */
        getMacAddress(): string | null;

        /**
         * @description: 获取当前屏幕亮度。
         * @return {number} 当前的（手动）亮度。范围为 0~255。
         */
        getBrightness(): number;

        /**
         * @description: 获取当前亮度模式。
         * @return {number} 设置为手动亮度时返回 0 ，为自动亮度时返回 1 。
         */
        getBrightnessMode(): number;

        /**
         * @description: 设置当前手动亮度。如果当前是自动亮度模式，该函数不会影响屏幕的亮度。
         * 
         * **注意！：**
         * 
         * - 此函数需要'修改系统设置'的权限。如果没有该权限，会抛出 `SecurityException` 并跳转到权限设置界面。
         * 
         * @param {number} b 要设置的亮度，范围 0~255。
         */
        setBrightness(b: number): void;

        /**
         * @description: 设置当前亮度模式。
         * 
         * **注意！：**
         * 
         * - 此函数需要'修改系统设置'的权限。如果没有该权限，会抛出 `SecurityException` 并跳转到权限设置界面。
         * 
         * @param {number} mode 亮度模式，0 为手动亮度，1 为自动亮度。
         */
        setBrightnessMode(mode: number): void;

        /**
         * @description: 获取当前媒体音量。
         * @return {number} 当前媒体音量。
         */
        getMusicVolume(): number;

        /**
         * @description: 获取当前通知音量。
         * @return {number} 当前通知音量。
         */
        getNotificationVolume(): number;

        /**
         * @description: 获取当前闹钟音量。
         * @return {number} 当前闹钟音量。
         */
        getAlarmVolume(): number;

        /**
         * @description: 获取媒体音量的最大值。
         * @return {number}媒体音量的最大值。
         */
        getMusicMaxVolume(): number;

        /**
         * @description: 获取通知音量的最大值。
         * @return {number} 通知音量的最大值。
         */
        getNotificationMaxVolume(): number;

        /**
         * @description: 获取闹钟音量的最大值。
         * @return {number} 闹钟音量的最大值。
         */
        getAlarmMaxVolume(): number;

        /**
         * @description: 设置当前媒体音量。
         * 
         * **注意！：**
         * 
         * - 此函数需要'修改系统设置'的权限。如果没有该权限，会抛出 `SecurityException` 并跳转到权限设置界面。
         * 
         * @param {number} volume 目标音量。
         */
        setMusicVolume(volume: number): void;

        /**
         * @description: 设置当前通知音量。
         * 
         * **注意！：**
         * 
         * - 此函数需要'修改系统设置'的权限。如果没有该权限，会抛出 `SecurityException` 并跳转到权限设置界面。
         * 
         * @param {number} volume 目标音量。
         */
        setNotificationVolume(volume: number): void;

        /**
         * @description: 设置当前闹钟音量。
         * 
         * **注意！：**
         * 
         * - 此函数需要 '修改系统设置' 的权限。如果没有该权限，会抛出 `SecurityException` 并跳转到权限设置界面。
         * 
         * @param {number} volume 目标音量。
         */
        setAlarmVolume(volume: number): void;

        /**
         * @description: 获取当前电量百分比。
         * @return {number} 当前电量（ 0.0 ~ 100.0 的浮点数）。
         */
        getBattery(): number;

        /**
         * @description: 检查设备是否正在充电。
         * @return {boolean} 正在充电返回 `true` 否则返回 `false`。
         */
        isCharging(): boolean;

        /**
         * @description: 获取设备内存总量。
         * @return {number} 设备内存总量（单位字节（Byte）， 1MB = 1024 * 1024B。）。
         */
        getTotalMem(): number;

        /**
         * @description: 获取设备当前可用的内存。
         * @return {number} 设备当前可用的内存（单位字节（Byte）， 1MB = 1024 * 1024B。）。
         */
        getAcailMem(): number;

        /**
         * @description: 检查设备屏幕是否是亮着的。
         * 
         * **注意！：**
         * 
         * - 类似于 vivo xplay 系列的息屏时钟不属于'屏幕亮着'的情况，虽然屏幕确实亮着但只能显示时钟而且不可交互，此时 `isScreenOn()` 也会返回 `false` 。
         * 
         * @return {boolean} 如果屏幕亮着，返回 `true` ; 否则返回 `false` 。
         */
        isScreenOn(): boolean;

        /**
         * @description: 唤醒设备。包括唤醒设备 CPU、屏幕等。可以用来点亮屏幕。
         */
        wakeUp(): void;

        /**
         * @description: 如果屏幕没有点亮，则唤醒设备。
         */
        wakeUpIfNeeded(): void;

        /**
         * @description: 保持屏幕常亮。如果此函数调用时屏幕没有点亮，则会唤醒屏幕。可以使用 `device.cancelKeepingAwake()` 来取消屏幕常亮。
         * 
         * *建议（：*
         * 
         * - 使用比较长的时长来代替'一直保持屏幕常亮'的功能，例如 `device.keepScreenOn(3600 * 1000)` 。
         * 
         * 
         * **注意！：**
         * 
         * - 此函数无法阻止用户使用锁屏键等正常关闭屏幕，只能使得设备在无人操作的情况下保持屏幕常亮。
         * - 在某些设备上，如果不加参数 `timeout` ，只能在 Hamibot 的界面保持屏幕常亮，在其他界面会自动失效，这是因为设备的省电策略造成的。
         * 
         * @param {number} [timeout] 屏幕保持常亮的时间, 单位毫秒。如果不加此参数，则一直保持屏幕常亮。
         */
        keepScreenOn(timeout?: number): void;

        /**
         * @description: 保持屏幕常亮，但允许屏幕变暗来节省电量。此函数可以用于定时脚本唤醒屏幕操作，不需要用户观看屏幕，可以让屏幕变暗来节省电量。如果此函数调用时屏幕没有点亮，则会唤醒屏幕。可以使用 `device.cancelKeepingAwake()` 来取消屏幕常亮。
         * 
         * **注意！：**
         * 
         * - 此函数无法阻止用户使用锁屏键等正常关闭屏幕，只能使得设备在无人操作的情况下保持屏幕常亮。
         * 
         * @param {number} [timeout] 屏幕保持常亮的时间, 单位毫秒。如果不加此参数，则一直保持屏幕常亮。
         */
        keepScreenDim(timeout?: number): void;

        /**
         * @description: 取消设备保持唤醒状态。用于取消 `device.keepScreenOn()` , `device.keepScreenDim()` 等函数设置的屏幕常亮。
         */
        cancelKeepingAwake(): void;

        /**
         * @description: 使设备震动一段时间。
         * @param {number} millis 震动时间，单位毫秒。
         */
        vibrate(millis: number): void;

        /**
         * @description: 如果设备处于震动状态，则取消震动。
         */
        cancelVibration(): void;
    }
}