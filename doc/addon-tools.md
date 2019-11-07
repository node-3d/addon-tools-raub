# include/addon-tools.hpp

There is a C++ header file, `addon-tools.hpp`, shipped with this package. It
introduces several useful macros and utilities. Also it includes Napi automatically,
so that you can replace:

```
#include <napi.h>
```

with

```
#include <addon-tools.hpp>
```

In gyp, the include directory should be set for your addon to know where
to get it. An actual path to the directory is exported from the module
and is accessible like this:

```
require('addon-tools-raub').include // a string
```

### Helpers in **addon-tools.hpp**:

Usually all the helpers work within the context of JS call. In this case we
have `CallbackInfo info` passed as an argument.

```
#define NAPI_ENV Napi::Env env = info.Env();
#define NAPI_HS Napi::HandleScope scope(env);
```

<details>

<summary>Return value</summary>

* `RET_VALUE(VAL)`- return a given Napi::Value.
* `RET_UNDEFINED`- return `undefined`.
* `RET_NULL` - return `null`.
* `RET_STR(VAL)` - return `Napi::String`, expected `VAL` is `const char *`.
* `RET_NUM(VAL)` - return `Napi::Number`, expected `VAL` is `double`.
* `RET_EXT(VAL)` - return `Napi::External`, expected `VAL` is `void *`.
* `RET_BOOL(VAL)` - return `Napi::Boolean`, expected `VAL` is `bool`.
* `RET_FUN(VAL)` - return `Napi::Function`, expected `VAL` is a `napi_value`.
* `RET_OBJ(VAL)` - return `Napi::Object`, expected `VAL` is a `napi_value`.

</details>



<details>

<summary>New JS value</summary>

* `JS_STR(VAL)` - create a `Napi::String` value.
* `JS_NUM(VAL)` - create a `Napi::Number` value.
* `JS_EXT(VAL)` - create a `Napi::External` (from pointer) value.
* `JS_BOOL(VAL)` - create a `Napi::Boolean` value.
* `JS_FUN(VAL)` - create a `Napi::Function` value.
* `JS_OBJ(VAL)` - create a `Napi::Object` value.

</details>


<details>

<summary>Method check</summary>

These checks throw JS TypeError if not passed. Here `T` is always used as a typename
in error messages. `C` is a
[Napi::Value](https://github.com/nodejs/node-addon-api/blob/master/doc/value.md#isboolean)
check method, like `IsObject()`. `I` is the index of argument as in `info[I]`,
starting from `0`.

* `REQ_ARGS(N)` - check if at least `N` arguments passed
* `IS_ARG_EMPTY(I)` - check if argument `I` is `undefined` or `null`
* `CHECK_REQ_ARG(I, C, T)` - check if argument `I` is approved by `C` check.
* `CHECK_LET_ARG(I, C, T)` - check if argument `I` is approved by `C` check or empty.
* `CTOR_CHECK(T)` - check if method is called as a constructor
* `SETTER_CHECK(C, T)` - check if setter `value` is approved by `C` check.
* `DES_CHECK` - within dynamic method check if the instance wasn't
destroyed by `destroy()`.

</details>


<details>

<summary>Method arguments</summary>

The idea is to ease the transition from what inside the `CallbackInfo` to
what you work with in C++.
Three types of argument retrieval are supported: `REQ_`, `USE_` and `LET_`.
The difference:
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
* `REQ_STR_ARG` - JS `string` => C++ `std::string`.
* `USE_STR_ARG`
* `LET_STR_ARG` - default: `""`.
* `REQ_INT32_ARG` - JS `number` => C++ `int32_t`.
* `USE_INT32_ARG`
* `LET_INT32_ARG` - default: `0`.
* `REQ_INT_ARG` - JS `number` => C++ `int32_t`.
* `USE_INT_ARG`
* `LET_INT_ARG` - default: `0`.
* `REQ_UINT32_ARG` - JS `number` => C++ `uint32_t`.
* `USE_UINT32_ARG`
* `LET_UINT32_ARG` - default: `0`.
* `REQ_UINT_ARG` - JS `number` => C++ `uint32_t`.
* `USE_UINT_ARG`
* `LET_UINT_ARG` - default: `0`.
* `REQ_BOOL_ARG` - JS `Boolean` => C++ `bool`.
* `USE_BOOL_ARG`
* `LET_BOOL_ARG` - default: `false`.
* `REQ_OFFS_ARG` - JS `number` => C++ `size_t`.
* `USE_OFFS_ARG`
* `LET_OFFS_ARG` - default: `0`.
* `REQ_DOUBLE_ARG` - JS `number` => C++ `double`.
* `USE_DOUBLE_ARG`
* `LET_DOUBLE_ARG` - default: `0.0`.
* `REQ_FLOAT_ARG` - JS `number` => C++ `float`.
* `USE_FLOAT_ARG`
* `LET_FLOAT_ARG` - default: `0.f`.
* `REQ_EXT_ARG` - JS `native` => C++ `void*`.
* `USE_EXT_ARG`
* `LET_EXT_ARG` - default: `nullptr`.
* `REQ_FUN_ARG` - JS `function` => C++ `Napi::Function`.
* `REQ_OBJ_ARG` - JS `object` => C++ `Napi::Object`.
* `USE_OBJ_ARG`
* `LET_OBJ_ARG` - default: `{}`.
* `REQ_ARRV_ARG` - JS `ArrayBuffer` => C++ `Napi::ArrayBuffer`.
* `REQ_BUF_ARG` - JS `Buffer` => C++ `Napi::Buffer<uint8_t>`.


```
NAN_METHOD(test) {
	
	REQ_UINT32_ARG(0, width);
	REQ_UINT32_ARG(1, height);
	LET_FLOAT_ARG(2, z);
	// Variables created: unsigned int width, height; float z;
	...
```

</details>


<details>

<summary>Set object accessors</summary>

Simplified accessor assignment, adds accessors of NAME for OBJ. Read accessor is
assumed to have the name `NAME+'Getter'` and write accessor is `NAME+'Setter'`.

* `ACCESSOR_RW(CLASS, NAME)` - add read and write accessors NAME of CLASS.
* `ACCESSOR_R(CLASS, NAME)` - add read accessor NAME of CLASS.
* `ACCESSOR_M(CLASS, NAME)` - add method NAME of CLASS.


```
void MyClass::init(Napi::Env env, Napi::Object exports) {
	...
	Napi::Function ctor = DefineClass(env, "MyClass", {
		ACCESSOR_R(MyClass, isDestroyed),
		ACCESSOR_RW(MyClass, x),
		ACCESSOR_M(MyClass, reset),
	});
	...
}
JS_GETTER(MyClass::isDestroyedGetter) { ...
JS_GETTER(MyClass::xGetter) { ...
JS_SETTER(MyClass::xSetter) { ...
JS_METHOD(MyClass::save) { ...
```

</details>


<details>

<summary>Setter argument</summary>

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
JS_SETTER(MyClass::x) { SETTER_STR_ARG;
	// Variable created: std::string v;
	...
```

</details>


<details>

<summary>Data retrieval</summary>

* `T *getArrayData(value, num = NULL)` - extracts TypedArray data of any type from
the given JS value. Does not accept `Array`. Checks with `IsArrayBuffer()`.
Returns `nullptr` for empty JS values. For unacceptable values throws TypeError.

* `void *getData(value)` - if value is a TypedArray, then the result of
`getArrayData(value)` is returned. Otherwise if value has `'data'` property, it's
content is then returned as `node::Buffer`. Returns `nullptr` in other cases.

</details>
