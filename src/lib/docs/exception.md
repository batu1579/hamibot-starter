# 自定义异常

> 未来可能还会添加一些其他的常用异常。

这里用来存放一些常见的异常的基类，可以扩展这些基类来展示比较详细的异常信息。

如果需要使用自定义异常可以继承这些基类然后扩展自己想要的功能，例如：

```TypeScript
class HttpException extends BaseException {
    readonly exceptionType: string = "HttpException";

    constructor(errorCode: number) {
        super(errorCode.toString());
    }

    public traceFilter(frame: TraceStackFrameType, index: number, array: TraceStackFrameType[]): boolean {
        // 设置自定义的调用堆栈过滤器
        return frame.getCallerName() !== "xxx" && index !== 0;
    }

    public traceFormatter(line: number, callerName: string): string {
        // 设置自定义的调用追踪样式
        return `  Called by ${callerName} on line ${line}`;
    }

    public toString(): string {
        // 设置自定义的异常输出样式
        return (
            "Traceback:\n" +
            this.traceBack + "\n" +
            this.exceptionType + (this.message ? ": " + this.message : "") + "\n"
        );
    }
}
```

或者如果 `BaseException` 类无法提供所需的灵活程度，需要自己重新构造异常。至少需要满足两点：

1. 实现 `Exception` 接口。

2. 在构造方法最后一行用异常事件发射器 `ERROR_EVENT` 发射一个 `error` 事件，并将实例引用 `this` 当作事件的参数传递。

```typescript
class MyException implements Exception {

    readonly message: stringl;
    readonly exceptionType: string = "MyException";

    constructor(message: string) {
        this.message = message;
        ERROR_EVENT.emit("error", this);
    }

    public toString(): string {
        return "Some custom exceptions have occurred";
    }
}
```

## interface Exception

异常接口，如果不想继承自基类或者其他预制基类，可以选择改为实现此接口并在构造方法中用异常事件发射器 `ERROR_EVENT` 发射一个 `error` 事件。

### readonly exceptionType: string

用来标记异常类型，一般和异常类名相同即可。

### readonly message: string

异常的详细描述信息。

### Exception.toString(): string

用于将异常对象转换成字符串输出，默认注册的监听器就是调用这个方法来输出异常信息。

## class BaseException

所有自定义异常的基类，继承自 `Error` 实现了 `Exception` 接口。

> 目前还没找到接收全局未捕获的异常的办法，所以暂时用这种办法代替一下。

### BaseException.message: string | undefined

异常要发送的信息，用来在覆盖 `toString()` 方法时获取异常要发送的信息。

### BaseException.exceptionType: string

异常类型，用来在覆盖 `toString()` 方法时获取异常的类型。

### BaseException.traceBack: string

引发异常的调用堆栈信息，用来在覆盖 `toString()` 方法时获取调用堆栈的信息。
调用堆栈信息。转换字符串的结果可以使用异常类中的 `filter()` 和 `traceFormatter()` 方法来调整。

### protected BaseException.traceFilter(frame: TraceStackFrameType, index: number, array: TraceStackFrameType[]): boolean

- `frame` 调用堆栈的栈帧对象。
- `index` 调用堆栈的序号。
- `array` 调用堆栈本身的对象。

声明式的定义调用堆栈的过滤器，来过滤一些不需要的调用栈帧。在子类中可以通过方法覆盖来自定义过滤哪些栈帧。

> 注意！：这个方法本质上是作为一个回调函数使用，所以请不要使用异常中的属性。

### protected BaseException.traceFormatter(line: number, callerName: string): string

- `line` 调用栈帧的行号。
- `callerName` 调用者的函数名。

声明式的定义调用栈帧的格式化方法。在子类中可以通过方法覆盖来自定义栈帧格式化为字符串的样式。

默认样式为：

```txt
  | at line ${line}, in <${callerName}>
```

> 注意！：这个方法本质上是作为一个回调函数使用，所以请不要使用异常类中的属性。

### BaseException.toString()

声明式的定义异常的格式化方法。在子类中可以通过方法覆盖来自定义异常格式化为字符串的样式。

默认样式为：

```txt
Traceback (most recent call last):
${traceBack}
${exceptionType}: ${message}
```

## class PermissionException

权限异常类，继承自 [BaseException](#class-baseexception) 。

## class ServiceNotEnabled

无障碍服务异常类，继承自 [BaseException](#class-baseexception) 。

## class ValueException

值异常，继承自 [BaseException](#class-baseexception) 。

## class WidgetNotFoundException

未找到控件，继承自 [BaseException](#class-baseexception) 。

## clase ConfigInvalidException

脚本配置中的属性值非法异常，继承自 [BaseException](#class-baseexception) 。

## 判断异常类型的辅助函数

> 建议使用自定义异常时也提供类似的判断函数

- `isBaseException(error: any)`: 判断一个 any 对象是否是 `BaseException` 类的实例。
- `isPermissionException(error: any)`: 判断一个 any 对象是否是 `PermissionException` 类的实例。
- `isServiceException(error: any)`: 判断一个 any 对象是否是 `ServiceNotEnabled` 类的实例。
- `isValueException(error: any)`: 判断一个 any 对象是否是 `ValueException` 类的实例。
- `isWidgetNotFoundException(error: any)`: 判断一个 any 对象是否是 `WidgetNotFoundException` 类的实例。
- `isConfigurationException(error: any)`: 判断一个 any 对象是否是 `ConfigInvalidException` 类的实例。
