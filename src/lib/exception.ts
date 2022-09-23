/*
 * @Author: BATU1579
 * @CreateDate: 2022-02-04 16:09:50
 * @LastEditor: BATU1579
 * @LastTime: 2022-09-23 20:17:53
 * @FilePath: \\src\\lib\\exception.ts
 * @Description: 全局异常类
 */
import { EVENT } from "../global"
import { getStackTrace, Record } from "./logger";

EVENT.on("ERROR", (err: BaseException) => {
    Record.error(err.toString());
})

export class BaseException {

    protected exceptionType: string;

    private message?: string;
    private traceBack: string;

    constructor(message?: string) {
        this.exceptionType = 'BaseException';

        this.message = message;
        this.traceBack = getStackTrace();

        EVENT.emit("ERROR", this);
    }

    toString(): string {
        return (
            "Traceback (most recent call last):\n" +
            this.traceBack + "\n" +
            this.exceptionType + (this.message ? ": " + this.message : "") + "\n"
        )
    }
}

export class PermissionException extends BaseException {
    constructor(message: string) {
        super(message);
        this.exceptionType = "PermissionException";
    }
}

export class PermissionObtainingFailure extends PermissionException {
    constructor(permission: string) {
        super(permission + " obtaining failure");
    }
}

export class ValueException extends BaseException {
    constructor(message: string) {
        super(message);
        this.exceptionType = "ValueException";
    }
}

export class ConfigInvalidException extends ValueException {
    constructor(message: string) {
        super(message + ", please check it again !");
        this.exceptionType = "ConfigInvalidException";
    }
}
