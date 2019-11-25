# include/addon-tools.hpp

There is a C++ header file, `addon-tools.hpp`, shipped with this package. It
introduces several useful macros and utilities. Also it includes **Napi**
implicitly, so you can replace:
```
#include <napi.h>
```
with
```
#include <addon-tools.hpp>
```
In **GYP**, the include directory should be set for your addon.
An actual path to the directory is exported from the module
and is accessible like this:
```
require('addon-tools-raub').include // a string
```


### Helpers in **addon-tools.hpp**:

Usually all the helpers work within the context of a method. In this case we
have `CallbackInfo info` passed as an argument. And we can return `undefined`
in case a problem has occured. So most of these macros are only usable
within `Napi::Value`-returning functions.

```
#define NAPI_ENV Napi::Env env = info.Env();
#define NAPI_HS Napi::HandleScope scope(env);
```

<details>

<summary><b>Return value</b></summary>

* `RET_VALUE(VAL)`- return a given Napi::Value.
* `RET_UNDEFINED`- return `undefined`.
* `RET_NULL` - return `null`.
* `RET_STR(VAL)` - return `Napi::String`, expected `VAL` is `const char *`.
* `RET_NUM(VAL)` - return `Napi::Number`, expected `VAL` is of numeric type.
* `RET_EXT(VAL)` - return `Napi::External`, expected `VAL` is a pointer.
* `RET_BOOL(VAL)` - return `Napi::Boolean`, expected `VAL` is convertible to bool.

</details>



<details>

<summary><b>New JS value</b></summary>

* `JS_STR(VAL)` - create a `Napi::String`, expected `VAL` is `const char *`.
* `JS_NUM(VAL)` - create a `Napi::Number`, expected `VAL` is of numeric type.
* `JS_EXT(VAL)` - create a `Napi::External`, expected `VAL` is a pointer.
* `JS_BOOL(VAL)` - create a `Napi::Boolean`, expected `VAL` is convertible to bool.

</details>


<details>

<summary><b>Method check</b></summary>

These checks throw JS `TypeError` if not passed. `T` is always used as a typename
in error messages. `C` is a
[Napi::Value](https://github.com/nodejs/node-addon-api/blob/master/doc/value.md)
check method, like `IsObject()`. `I` is the index of argument as in `info[I]`,
starting from `0`.

* `REQ_ARGS(N)` - check if at least `N` arguments passed
* `IS_ARG_EMPTY(I)` - check if argument `I` is `undefined` or `null`
* `CHECK_REQ_ARG(I, C, T)` - check if argument `I` is approved by `C` check.
* `CHECK_LET_ARG(I, C, T)` - check if argument `I` is approved by `C` check or empty.
* `SETTER_CHECK(C, T)` - check if setter `value` is approved by `C` check.
* `DES_CHECK` - for void-returning methods, check if the instance wasn't
destroyed by `destroy()`.
* `THIS_CHECK` - check if the instance wasn't
destroyed by `destroy()`, and then fetch `env`.

</details>


<details>

<summary><b>Method arguments</b></summary>

Following macros convert JS arguments into C++ variables.
Three types of argument retrieval are supported:
* `REQ_` - 2 params, requires an argument to have a value
* `USE_` - 3 params, allows the argument to be empty and have a default
* `LET_` - 2 params, is `USE_` with a preset zero-default.

What it does, basically:
```
// REQ_DOUBLE_ARG(0, x)
double x = info[0].ToNumber().DoubleValue();

// USE_DOUBLE_ARG(0, x, 5.7)
double x = IS_ARG_EMPTY(0) ? 5.7 : info[0].ToNumber().DoubleValue();

// LET_DOUBLE_ARG(0, x)
double x = IS_ARG_EMPTY(0) ? 0.0 : info[0].ToNumber().DoubleValue();
```

That extrapolates well to all the helpers below:

|     Macro        | JS type       | C++ type                | Default   |
| :---             | :---:         | :---:                   | :---:     |
| `REQ_STR_ARG`    | `string`      | `std::string`           | -         |
| `USE_STR_ARG`    | `string`      | `std::string`           | -         |
| `LET_STR_ARG`    | `string`      | `std::string`           | `""`      |
| `REQ_INT32_ARG`  | `number`      | `int32_t`               | -         |
| `USE_INT32_ARG`  | `number`      | `int32_t`               | -         |
| `LET_INT32_ARG`  | `number`      | `int32_t`               | `0`       |
| `REQ_INT_ARG`    | `number`      | `int32_t`               | -         |
| `USE_INT_ARG`    | `number`      | `int32_t`               | -         |
| `LET_INT_ARG`    | `number`      | `int32_t`               | `0`       |
| `REQ_UINT32_ARG` | `number`      | `uint32_t`              | -         |
| `USE_UINT32_ARG` | `number`      | `uint32_t`              | -         |
| `LET_UINT32_ARG` | `number`      | `uint32_t`              | `0`       |
| `REQ_UINT_ARG`   | `number`      | `uint32_t`              | -         |
| `USE_UINT_ARG`   | `number`      | `uint32_t`              | -         |
| `LET_UINT_ARG`   | `number`      | `uint32_t`              | `0`       |
| `REQ_BOOL_ARG`   | `Boolean`     | `bool`                  | -         |
| `USE_BOOL_ARG`   | `Boolean`     | `bool`                  | -         |
| `LET_BOOL_ARG`   | `Boolean`     | `bool`                  | `false`   |
| `REQ_OFFS_ARG`   | `number`      | `size_t`                | -         |
| `USE_OFFS_ARG`   | `number`      | `size_t`                | -         |
| `LET_OFFS_ARG`   | `number`      | `size_t`                | `0`       |
| `REQ_DOUBLE_ARG` | `number`      | `double`                | -         |
| `USE_DOUBLE_ARG` | `number`      | `double`                | -         |
| `LET_DOUBLE_ARG` | `number`      | `double`                | `0.0`     |
| `REQ_FLOAT_ARG`  | `number`      | `float`                 | -         |
| `USE_FLOAT_ARG`  | `number`      | `float`                 | -         |
| `LET_FLOAT_ARG`  | `number`      | `float`                 | `0.f`     |
| `REQ_EXT_ARG`    | `native`      | `void*`                 | -         |
| `USE_EXT_ARG`    | `native`      | `void*`                 | -         |
| `LET_EXT_ARG`    |  `native`     | `void*`                 | `nullptr` |
| `REQ_FUN_ARG`    | `function`    | `Napi::Function`        | -         |
| `REQ_OBJ_ARG`    | `object`      | `Napi::Object`          | -         |
| `USE_OBJ_ARG`    | `object`      | `Napi::Object`          | -         |
| `LET_OBJ_ARG`    | `object`      | `Napi::Object`          | `{}`      |
| `REQ_ARRV_ARG`   | `ArrayBuffer` | `Napi::ArrayBuffer`     | -         |
| `REQ_BUF_ARG`    | `Buffer`      | `Napi::Buffer<uint8_t>` | -         |


```
JS_METHOD(test) {
	REQ_UINT32_ARG(0, width); // uint32_t width
	REQ_UINT32_ARG(1, height); // uint32_t height
	LET_FLOAT_ARG(2, z); // float z
	// An error is thrown if width or height are not passed as numbers.
	// Argument z can be undefined, null, or number; error otherwise.
	...
```

</details>


<details>

<summary><b>Setter argument</b></summary>

Works similar to method arguments. But there is always `value`
argument, from which a C++ value is extracted.

* `SETTER_STR_ARG`
* `SETTER_INT32_ARG`
* `SETTER_INT_ARG`
* `SETTER_BOOL_ARG`
* `SETTER_UINT32_ARG`
* `SETTER_UINT_ARG`
* `SETTER_OFFS_ARG`
* `SETTER_DOUBLE_ARG`
* `SETTER_FLOAT_ARG`
* `SETTER_EXT_ARG`
* `SETTER_FUN_ARG`
* `SETTER_OBJ_ARG`
* `SETTER_ARRV_ARG`

```
JS_IMPLEMENT_SETTER(MyClass, x) { THIS_CHECK; SETTER_STR_ARG;
	// Variable created: std::string v;
	...
```

See also: [Class Wrapping](class-wrapping.md)

</details>


<details>

<summary><b>JS Data to C++ Data</b></summary>

* `T *getArrayData(value, num = NULL)` - extracts TypedArray data of any type from
the given JS value. Does not accept `Array`. Checks with `IsArrayBuffer()`.
Returns `nullptr` for empty JS values. For unacceptable values throws TypeError.

* `T *getBufferData(value, num = NULL)` - extracts Buffer data from
the given JS value. Checks with `IsBuffer()`.
Returns `nullptr` for empty JS values. For unacceptable values throws TypeError.

* `void *getData(value)` - if `value` is a `TypedArray|Buffer`,
calls `getArrayData` or `getArrayData` on it. Otherwise, if 
`value.data` is a `TypedArray|Buffer`,
calls `getArrayData` or `getArrayData` on it.
Returns `nullptr` in other cases.

</details>
