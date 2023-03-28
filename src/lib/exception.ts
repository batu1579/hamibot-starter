/*
 * @Author: BATU1579
 * @CreateDate: 2022-02-04 16:09:50
 * @LastEditor: BATU1579
 * @LastTime: 2023-03-28 19:08:12
 * @FilePath: \\src\\lib\\exception.ts
 * @Description: 全局异常类
 */
import {
    Record,
    getStackTrace,
    TraceCollectionType,
    TraceStackFrameType,
    LoggerSchemes
} from "./logger";

const ERROR_EVENTS = events.emitter();

ERROR_EVENTS.on("error", function errorListener(err: Exception) {
    // 防止重复输出异常信息
    Record.customLog(
        LoggerSchemes.error,
        {
            needPrint: false,
            needRecord: true,
            skipCallerNumber: 2
        },
        err.toString()
    );
})

export interface Exception {
    readonly exceptionType: string;
    readonly message: string;

    toString(): string;

    traceFormatter?: (line: number, callerName: string) => string;

    traceFilter?: (frame: TraceStackFrameType, index: number, array: TraceStackFrameType[]) => boolean;
}

export class BaseException extends Error implements Exception {

    readonly exceptionType: string = 'BaseException';
    readonly message: string;
    protected traceBack: string;

    constructor(message: string) {
        super();
        this.message = message;

        let trace: TraceCollectionType = getStackTrace()
        if (this.traceFilter) {
            trace = trace.filter(this.traceFilter);
        }
        this.traceBack = trace.toString(this.traceFormatter);

        ERROR_EVENTS.emit("error", this);
    }

    public traceFilter = undefined;

    public traceFormatter = undefined;

    public toString(): string {
        return (
            "Traceback (most recent call last):\n" +
            this.traceBack + "\n" +
            this.exceptionType + (this.message ? ": " + this.message : "") + "\n"
        )
    }
}

function __isExceptionType<T extends BaseException>(error: any, targetException: string): error is T {
    let exceptionType = Object.getOwnPropertyDescriptor(error, "exceptionType");

    if (exceptionType === undefined) {
        return false;
    }

    return exceptionType.value === targetException;
}

export function isBaseException(error: any): error is BaseException {
    return __isExceptionType<BaseException>(error, "BaseException");
}

export class PermissionException extends BaseException {
    readonly exceptionType: string = "PermissionException";
}

export function isPermissionException(error: any): error is PermissionException {
    return __isExceptionType<PermissionException>(error, 'PermissionException');
}

export class ServiceNotEnabled extends BaseException {
    readonly exceptionType: string = "ServiceNotEnabled";
}

export function isServiceNotEnabled(error: any): error is ServiceNotEnabled {
    return __isExceptionType<ServiceNotEnabled>(error, 'ServiceNotEnabled');
}

export class ValueException extends BaseException {
    readonly exceptionType: string = "ValueException";
}

export function isValueException(error: any): error is ValueException {
    return __isExceptionType<ValueException>(error, 'ValueException');
}

export class WidgetNotFoundException extends BaseException {
    readonly exceptionType: string = "WidgetNotFoundException";
}

export function isWidgetNotFoundException(error: any): error is WidgetNotFoundException {
    return __isExceptionType<WidgetNotFoundException>(error, 'WidgetNotFoundException');
}

export class ConfigInvalidException extends ValueException {
    readonly exceptionType: string = "ConfigInvalidException";

    constructor(fieldName: string, helpInfo?: string) {
        super(
            `The '${fieldName}' field in the configuration is invalid${", " + helpInfo}. ` +
            "please check it again !"
        );
    }
}

export function isConfigInvalidException(error: any): error is ConfigInvalidException {
    return __isExceptionType<ConfigInvalidException>(error, 'ConfigInvalidException');
}
