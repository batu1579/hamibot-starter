/*
 * @Author: BATU1579
 * @CreateDate: 2022-02-04 20:58:39
 * @LastEditor: BATU1579
 * @LastTime: 2022-11-28 11:16:01
 * @FilePath: \\src\\lib\\init.ts
 * @Description: 脚本初始化
 */
import { Record } from "./logger";
import { SHOW_CONSOLE, SHORT_WAIT_MS } from "../global";
import { PermissionException, ServiceNotEnabled } from "./exception";

export function init() {
    // check accessibility permission
    if (auto.service === null) {
        if (!confirm('Please enable accessibility permission')) {
            throw new PermissionException("Accessibility permission obtaining failure.");
        }
        auto.waitFor();
    } else {
        Record.verbose("Accessibility permissions enabled");
    }

    // check is service alive
    if (device.height === 0 || device.width === 0) {
        throw new ServiceNotEnabled(
            'Failed to get the screen size. ' +
            'Please try restarting the service or re-installing Hamibot'
        );
    } else {
        Record.debug("Screen size: " + device.height + " x " + device.width);
    }

    // show console
    if (SHOW_CONSOLE === "true") {
        console.show();
        sleep(SHORT_WAIT_MS);
        console.setPosition(0, 100);
        console.setSize(device.width, device.height / 4);
    }

    setScreenMetrics(1080, 2400);
}
