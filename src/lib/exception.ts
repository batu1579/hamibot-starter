/*
 * @Author: BATU1579
 * @CreateDate: 2022-02-04 16:09:50
 * @LastEditor: BATU1579
 * @LastTime: 2022-09-25 22:40:09
 * @FilePath: \\src\\lib\\exception.ts
 * @Description: 全局异常类
 */
import { EVENT } from "../global"
import {
    Record,
    getStackTrace,
    TraceCollectionType,
    TraceStackFrameType
} from "./logger";

EVENT.on("ERROR", (err: BaseException) => {
    Record.error(err.toString());
})

export interface Exception {
    filter(frame: TraceStackFrameType, index: number, array: TraceStackFrameType[]): boolean;
    traceFormatter(line: number, callerName: string): string;
    toString(): string;
}

export class BaseException implements Exception {

    protected exceptionType: string;
    protected message?: string;
    protected traceBack: string;

    constructor(message?: string) {
        this.exceptionType = 'BaseException';
        this.message = message;

        let trace: TraceCollectionType = getStackTrace().filter(this.filter);
        this.traceBack = trace.toString(this.traceFormatter);

        EVENT.emit("ERROR", this);
    }

    public filter(frame: TraceStackFrameType, index: number, array: TraceStackFrameType[]): boolean {
        return true;
    }

    public traceFormatter(line: number, callerName: string): string {
        return `  | at line ${line}, in <${callerName}>`;
    };

    public toString(): string {
        return (
            "Traceback (most recent call last):\n" +
            this.traceBack + "\n" +
            this.exceptionType + (this.message ? ": " + this.message : "") + "\n"
        )
    }
}

export class PermissionException extends BaseException implements Exception {
    constructor(message: string) {
        super(message);
        this.exceptionType = "PermissionException";
    }
}

export class PermissionObtainingFailure extends PermissionException implements Exception {
    constructor(permission: string) {
        super(permission + " obtaining failure");
    }
}

export class ValueException extends BaseException implements Exception {
    constructor(message: string) {
        super(message);
        this.exceptionType = "ValueException";
    }
}

export class ConfigInvalidException extends ValueException implements Exception {
    constructor(message: string) {
        super(message + ", please check it again !");
        this.exceptionType = "ConfigInvalidException";
    }
}
