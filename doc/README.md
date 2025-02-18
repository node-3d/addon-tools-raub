# include/addon-tools.hpp

C++ header `addon-tools.hpp` introduces several macros and utilities.
Also it includes **NAPI** implicitly, so you can replace:

```cpp
#include <napi.h>
```

with

```cpp
#include <addon-tools.hpp>
```

For **GYP**, the include directory is accessible with:

```gyp
'include_dirs': [
	'<!@(node -p "require(\'addon-tools-raub\').getInclude()")',
],
```


## Logging

Console logging and "global" logging helpers for C++ side are available:

Global logging expects a named logger to be created from JS side.
See JS Utils section in [README](/README.md).

```js
	// to `console` by default
	const logger = utils.createLogger({ name: 'my-logger' });
```

```cpp
	consoleLog(env, "test");
	// or
	Napi::Value args[2] = { JS_STR("test"), JS_NUM(2) };
	consoleLog(env, 2, &args[0]);
	// or
	globalLog(env, "cpp", "info", "test");
	// or
	globalLog(env, "cpp", "warn", 2, &args[0]);
```


### Function Helpers

Most of the helpers work within functions, where `Napi::CallbackInfo info` is
passed as an argument, and `Napi::Value` is to be returned.

```cpp
#define NAPI_ENV Napi::Env env = info.Env();
#define NAPI_HS Napi::HandleScope scope(env);
```

Other global helpers:
* `DBG_EXPORT`- set symbol visibility (mainly for callstack traces). On Windows, that is
	equal to exporting a symbol: `__declspec(dllexport)`. On Unix it does nothing.
* `JS_THROW(text)` - throws JS exception with the given text message.

---

**Return value**

* `RET_VALUE(VAL)`- return a given Napi::Value.
* `RET_UNDEFINED`- return `undefined`.
* `RET_NULL` - return `null`.
* `RET_STR(VAL)` - return `Napi::String`, expected `VAL` is `const char *`.
* `RET_NUM(VAL)` - return `Napi::Number`, expected `VAL` is of numeric type.
* `RET_EXT(VAL)` - return `Napi::External`, expected `VAL` is a pointer.
* `RET_BOOL(VAL)` - return `Napi::Boolean`, expected `VAL` is convertible to bool.
* `RET_ARRAY_STR(VAL)` - return `Napi::Array`, expected `VAL` is `std::vector<std::string>`.

---

**New JS value**

* `JS_UNDEFINED` - an `undefined` value.
* `JS_NULL` - a `null` value.
* `JS_STR(VAL)` - create a `Napi::String`, expected `VAL` is `const char *`.
* `JS_NUM(VAL)` - create a `Napi::Number`, expected `VAL` is of numeric type.
* `JS_EXT(VAL)` - create a `Napi::External`, expected `VAL` is a pointer.
* `JS_BOOL(VAL)` - create a `Napi::Boolean`, expected `VAL` is convertible to bool.
* `JS_OBJECT` - a new empty `Object` instance.
* `JS_ARRAY` - a new empty `Array` instance.

---

**Method check**

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

---

**Method arguments**

Following macros convert JS arguments into C++ variables.
Three types of argument retrieval are supported:
* `REQ_` - 2 params, requires an argument to have a value of specific type.
* `USE_` - 3 params, allows the argument to be empty and have a default.
* `LET_` - 2 params, is `USE_` with a preset zero-default.
* `SOFT_` - 2 params, is `LET_` without type and arity checks.
* `WEAK_` - 2 params, uses type coercion, doesn't check if arg exists.

What it does, basically:

```cpp
// REQ_DOUBLE_ARG(0, x)
if (info.Length() < 1 || !info[0].IsNumber()) { JS_THROW; RET_UNDEFINED; }
double x = info[0].As<Napi::Number>().DoubleValue();

// USE_DOUBLE_ARG(0, x, 5.7)
if (info.Length() < 1 || !info[0].IsNumber()) { JS_THROW; RET_UNDEFINED; }
double x = IS_ARG_EMPTY(0) ? 5.7 : info[0].ToNumber().DoubleValue();

// LET_DOUBLE_ARG(0, x)
USE_DOUBLE_ARG(0, x, 0.0);

// SOFT_DOUBLE_ARG(0, x)
double x = info.Length() < 1 ? 0.0 : info[0].ToNumber().DoubleValue();

// WEAK_DOUBLE_ARG(0, x)
double x = info[0].ToNumber().DoubleValue();
```

That extrapolates well to all the helpers below:

|     Macro        | JS type       | C++ type                | Default   |
| :---             | :---:         | :---:                   | :---:     |
| `REQ_STR_ARG`    | `string`      | `std::string`           | -         |
| `USE_STR_ARG`    | `string`      | `std::string`           | -         |
| `WEAK_STR_ARG`   | `string`      | `std::string`           | -         |
| `LET_STR_ARG`    | `string`      | `std::string`           | `""`      |
| `REQ_INT32_ARG`  | `number`      | `int32_t`               | -         |
| `USE_INT32_ARG`  | `number`      | `int32_t`               | -         |
| `WEAK_INT32_ARG` | `number`      | `int32_t`               | -         |
| `LET_INT32_ARG`  | `number`      | `int32_t`               | `0`       |
| `REQ_INT_ARG`    | `number`      | `int32_t`               | -         |
| `USE_INT_ARG`    | `number`      | `int32_t`               | -         |
| `WEAK_INT_ARG`   | `number`      | `int32_t`               | -         |
| `LET_INT_ARG`    | `number`      | `int32_t`               | `0`       |
| `REQ_UINT32_ARG` | `number`      | `uint32_t`              | -         |
| `USE_UINT32_ARG` | `number`      | `uint32_t`              | -         |
| `WEAK_UINT32_ARG`| `number`      | `uint32_t`              | -         |
| `LET_UINT32_ARG` | `number`      | `uint32_t`              | `0`       |
| `REQ_UINT_ARG`   | `number`      | `uint32_t`              | -         |
| `USE_UINT_ARG`   | `number`      | `uint32_t`              | -         |
| `WEAK_UINT_ARG`  | `number`      | `uint32_t`              | -         |
| `LET_UINT_ARG`   | `number`      | `uint32_t`              | `0`       |
| `REQ_BOOL_ARG`   | `Boolean`     | `bool`                  | -         |
| `USE_BOOL_ARG`   | `Boolean`     | `bool`                  | -         |
| `WEAK_BOOL_ARG`  | `Boolean`     | `bool`                  | -         |
| `LET_BOOL_ARG`   | `Boolean`     | `bool`                  | `false`   |
| `SOFT_BOOL_ARG`  | `Boolean`     | `bool`                  | `false`   |
| `REQ_OFFS_ARG`   | `number`      | `size_t`                | -         |
| `USE_OFFS_ARG`   | `number`      | `size_t`                | -         |
| `WEAK_OFFS_ARG`  | `number`      | `size_t`                | -         |
| `LET_OFFS_ARG`   | `number`      | `size_t`                | `0`       |
| `REQ_DOUBLE_ARG` | `number`      | `double`                | -         |
| `USE_DOUBLE_ARG` | `number`      | `double`                | -         |
| `WEAK_DOUBLE_ARG`| `number`      | `double`                | -         |
| `LET_DOUBLE_ARG` | `number`      | `double`                | `0.0`     |
| `REQ_FLOAT_ARG`  | `number`      | `float`                 | -         |
| `USE_FLOAT_ARG`  | `number`      | `float`                 | -         |
| `WEAK_FLOAT_ARG` | `number`      | `float`                 | -         |
| `LET_FLOAT_ARG`  | `number`      | `float`                 | `0.f`     |
| `REQ_EXT_ARG`    | `native`      | `void*`                 | -         |
| `USE_EXT_ARG`    | `native`      | `void*`                 | -         |
| `LET_EXT_ARG`    |  `native`     | `void*`                 | `nullptr` |
| `REQ_OBJ_ARG`    | `object`      | `Napi::Object`          | -         |
| `USE_OBJ_ARG`    | `object`      | `Napi::Object`          | -         |
| `LET_OBJ_ARG`    | `object`      | `Napi::Object`          | `{}`      |
| `REQ_ARRAY_ARG`  | `object`      | `Napi::Array`           | -         |
| `USE_ARRAY_ARG`  | `object`      | `Napi::Array`           | -         |
| `LET_ARRAY_ARG`  | `object`      | `Napi::Array`           | `[]`      |
| `LET_ARRAY_STR_ARG` | `object`   | `std::vector<std::string>` | `std::vector<std::string>()` |
| `REQ_FUN_ARG`    | `function`    | `Napi::Function`        | -         |
| `REQ_ARRV_ARG`   | `ArrayBuffer` | `Napi::ArrayBuffer`     | -         |
| `REQ_BUF_ARG`    | `Buffer`      | `Napi::Buffer<uint8_t>` | -         |


```cpp
JS_METHOD(test) {
	REQ_UINT32_ARG(0, width); // uint32_t width
	REQ_UINT32_ARG(1, height); // uint32_t height
	LET_FLOAT_ARG(2, z); // float z
	// An error is thrown if width or height are not passed as numbers.
	// Argument z can be undefined, null, or number; error otherwise.
	...
```

---

**Setter argument**

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

```cpp
JS_IMPLEMENT_SETTER(MyClass, x) { THIS_CHECK; SETTER_STR_ARG;
	// Variable created: std::string v;
	...
```

See also: [Class Wrapping](class-wrapping.md)

---

**JS Data to C++ Data**

* `T *getArrayData(env, obj, num = NULL)` - extracts TypedArray data of any type from
the given JS object. Does not accept `Array`. Checks with `IsArrayBuffer()`.
Returns `nullptr` for empty JS values. For unacceptable values throws TypeError.

* `T *getBufferData(env, obj, num = NULL)` - extracts Buffer data from
the given JS object. Checks with `IsBuffer()`.
Returns `nullptr` for empty JS values. For unacceptable values throws TypeError.

* `void *getData(env, obj)` - if `obj` is a `TypedArray|Buffer`,
calls `getArrayData` or `getBufferData` on it. Otherwise, if 
`obj.data` is a `TypedArray|Buffer`,
calls `getArrayData` or `getBufferData` on it.
Returns `nullptr` in other cases.


### ES5 Classes

Addon Tools provides C++ macro helpers for ES5 Classes (`function`-based).
See the [class-wrapping doc here](class-wrapping.md).
