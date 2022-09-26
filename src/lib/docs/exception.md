# 自定义异常

> 未来可能还会添加一些其他的常用异常。

这里用来存放一些常见的异常的基类，可以扩展这些基类来展示比较详细的异常信息。

如果需要使用自定义异常可以继承这些基类然后扩展自己想要的功能，例如：

```TypeScript
class HttpException extends BaseException {
    constructor(errorCode: number) {
        super(errorCode);
        this.exceptionType = "HttpException";
    }

    protected traceFormatter(line: number, callerName: string) {
        // 设置自定义的调用追踪样式
        return `  Called by ${callerName} on line ${line}`
    }

    public toString() {
        // 设置自定义的异常输出样式
        return (
            "Traceback:\n" +
            this.traceBack + "\n" +
            this.exceptionType + (this.message ? ": " + this.message : "") + "\n"
        )
    }
}
```

或者如果 `BaseException` 类无法提供所需的灵活程度，需要自己重新构造异常。需要达成两点：

1. 实现 `Exception` 接口。
2. 在构造方法最后一行用全局的事件发射器 `EVENT` 发射一个 `Error` 事件，并将实例引用 `this` 当作事件的参数传递。

```typescript
class MyException implements Exception {

    protected message: string

    constructor(message: string) {
        this.message = message;
        this.exceptionType = "MyException";

        EVENT.emit("ERROR", this);
    }

    public toString(): string {
        return "Some custom exceptions have occurred";
    }
}
```

## interface Exception

异常接口，如果不想继承自基类或者其他预制基类，可以选择改为实现此接口并在构造方法中用全局的事件发射器 `EVENT` 发射一个 `Error` 事件。

## class BaseException

所有自定义异常的基类，在抛出这些继承自 `BaseException` 类的异常时会用全局的事件发射器 `EVENT` 发射一个 `Error` 事件。在脚本运行之前自动会给 `EVENT` 注册一个 `Error` 事件的监听器，来捕获输出这个异常相关的信息。

目前还没找到接收全局未捕获的异常的办法，所以暂时用这种办法代替一下。

### protected BaseException.message: string | undefined

异常要发送的信息，用来在覆盖 `toString()` 方法时获取异常要发送的信息。

### protected BaseException.exceptionType: string

异常类型，用来在覆盖 `toString()` 方法时获取异常的类型。

### protected BaseException.traceBack: string

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

## class ValueException

值异常，继承自 [BaseException](#class-baseexception) 。

## clase ConfigInvalidException

脚本配置中的属性值非法异常，继承自 [BaseException](#class-baseexception) 。
