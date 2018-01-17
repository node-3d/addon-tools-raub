# Addon Tools


## Synopsis

This is a set of helpers for simplification and standardization of addons and
dependency packages.

* Contains helpers of following types: GYP, C++, JS, BAT(Windows).
* Platforms: win x32/x64, linux x32/x64, mac x64.
* Useful links: [V8 Ref](https://v8docs.nodesource.com/node-0.8/d2/dc3/namespacev8.html),
[Nan Docs](https://github.com/nodejs/nan#api),
[GYP Docs](https://gyp.gsrc.io/docs/UserDocumentation.md).


## Install

`npm i -s node-addon-tools-raub`


## Contents

[addon-tools.gypi](#addon-toolsgypi)

[include/addon-tools.hpp](#includeaddon-toolshpp)

[index.js](#indexjs)

[\_rd.bat / \_del.bat](#_rdbat--_delbat)


---

## addon-tools.gypi

Include this gyp file into your `bindings.gyp`.

```
	'includes': [ '<!(node -e "require(\'node-addon-tools-raub\').gypi")' ],
```

This will add Nan and Addon Tools include paths to all your targets. Also variables
`_rd` and `_del` are set for convenience.


---

## include/addon-tools.hpp

There is a C++ header file, `addon-tools.hpp`, shipped with this package. It
introduces several useful macros and utilities. Also it includes Nan automatically,
so that you can replace.

```
// #include <v8.h> // node.h includes it
// #include <node.h> // nan.h includes it
#include <nan.h>
```

with

```
#include <addon-tools.hpp>
```

In gyp, the include directory should be set for your addon to know where to get it.
As it was mentioned above, this can be done automatically. Also an actual path to the
directory is exported from the module and is accessible like this:

```
require('node-addon-tools-raub').include
```

In the file, currently there are following helpers:


#### Handle scope

* `NAN_HS` - creates a HandleScope. Also, you do not need them within `NAN_METHOD`,
`NAN_SETTER`, and `NAN_GETTER`, as it is stated in
[Nan doc](https://github.com/nodejs/nan/blob/master/doc/methods.md#api_nan_method).
So it is most likely to be used in native callbacks.

```
void windowFocusCB(GLFWwindow *window, int focused) { NAN_HS;
	...
}
...
glfwSetWindowFocusCallback(window, windowFocusCB);
```


#### Method return

* RET_VALUE(VAL) - set method return value
* RET_UNDEFINED - set method return value as undefined


#### New JS value

* JS_STR(...) - create a string value
* JS_INT(val) - create an integer value
* JS_NUM(val) - create a numeric value
* JS_EXT(val) - create an external (pointer) value
* JS_BOOL(val) - create a boolean value


#### Method check

These checks throw JS TypeError if not passed. Here `T` is always used as a typename
in error messages. `C` is
[v8::Value](https://v8docs.nodesource.com/node-0.8/dc/d0a/classv8_1_1_value.html)
check method, like `IsObject()`. `I` is the index of argument as in `info[I]`,
starting from `0`.

* REQ_ARGS(N) - check if at least `N` arguments passed
* IS_ARG_EMPTY(I) - check if argument `I` is `undefined` or `null`
* CHECK_REQ_ARG(I, C, T) - check if argument `I` is approved by `C` check.
* CHECK_LET_ARG(I, C, T) - check if argument `I` is approved by `C` check or empty.
* CTOR_CHECK(T) - check if method is called as a constructor
* SETTER_CHECK(C, T) - check if setter `value` is approved by `C` check.


#### Method arguments

Two types of argument retrieval are supported: `REQ_` and `LET_`. The difference
is that `LET_` allows the argument to be empty, using some zero-default in this case.
`I` is the index of argument as in `info[I]`,
starting from `0`. `VAR` is the name of the `Local<Value>` variable to be created.

* REQ_UTF8_ARG(I, VAR)
* LET_UTF8_ARG(I, VAR)
* REQ_INT32_ARG(I, VAR)
* LET_INT32_ARG(I, VAR)
* REQ_BOOL_ARG(I, VAR)
* LET_BOOL_ARG(I, VAR)
* REQ_UINT32_ARG(I, VAR)
* LET_UINT32_ARG(I, VAR)
* REQ_OFFS_ARG(I, VAR)
* LET_OFFS_ARG(I, VAR)
* REQ_DOUBLE_ARG(I, VAR)
* LET_DOUBLE_ARG(I, VAR)
* REQ_FLOAT_ARG(I, VAR)
* LET_FLOAT_ARG(I, VAR)
* REQ_EXT_ARG(I, VAR)
* LET_EXT_ARG(I, VAR)
* REQ_FUN_ARG(I, VAR)
* REQ_OBJ_ARG(I, VAR)
* REQ_ARRV_ARG(I, VAR)

```
NAN_METHOD(testScene) {
	
	REQ_UINT32_ARG(0, width);
	REQ_UINT32_ARG(1, height);
	LET_FLOAT_ARG(2, z);
	// Variables created: unsigned int width, height; float z;
	...
```


#### Set properties

Set-helpers for string and numeric keys. String keys are converted to JS strings
automatically.

* SET_PROP(OBJ, KEY, VAL)
* SET_I(ARR, I, VAL)


#### Set object accessors

Simplified accessor assignment, adds accessors of NAME for OBJ. Read accessor is
assumed to have the name `NAME+'Getter'` and write accessor is `NAME+'Setter'`.

* ACCESSOR_RW(OBJ, NAME) - add read and write accessors of NAME for OBJ.
* ACCESSOR_R(OBJ, NAME) - read-only property.

```
void MyClass::init(Handle<Object> target) {
	...
	Local<ObjectTemplate> proto = ctor->PrototypeTemplate();
	ACCESSOR_RW(proto, message);
	...
}
NAN_GETTER(MyClass::messageGetter) { ...
NAN_SETTER(MyClass::messageSetter) { ...
```


#### Setter argument

Useful addition to NAN_SETTER macro. 

* SETTER_UTF8_ARG
* SETTER_INT32_ARG
* SETTER_BOOL_ARG
* SETTER_UINT32_ARG
* SETTER_OFFS_ARG
* SETTER_DOUBLE_ARG
* SETTER_FLOAT_ARG
* SETTER_EXT_ARG
* SETTER_FUN_ARG
* SETTER_OBJ_ARG

```
NAN_SETTER(MyClass::messageSetter) { SETTER_UTF8_ARG;
	// Variable created: Nan::Utf8String v;
	...
```


#### Data retrieval

* `T *getArrayData(value, num = NULL)` - extracts TypedArray data of any type from
the given JS value. Does not accept Array, checked with `IsArrayBufferView()`.
Returns `NULL` for empty JS values. For unacceptable values throws TypeError.


* `BYTE *getImageData(value)` - if value is a TypedArray, then the result of
`getArrayData(value)` is returned. Otherwise if value has `'data'` property, it's
content is then returned as `node::Buffer`. Returns `NULL` for empty JS values.
For unacceptable values throws TypeError.


---

## index.js

Exports:
* `paths(dir)` - function. Returns a set of platform dependent paths depending on
input `dir`.
	* `bin` - platform binary path.
	* `rem` - a space-separated list of binary paths to be cleaned on this platform.
	* `include` - include directory for this `dir`.
* `root` - where `'node-addon-tools-raub'` module is situated.
* `include` - `'node-addon-tools-raub'` own 'include' directory.
* `_rd` - the location of `'_rd.bat'` file.
* `_del` - the location of `'_del.bat'` file.


---

## \_rd.bat / \_del.bat

Windows-only utilities. Because in gyp any `/` on Windows is converted to `\`, it is
impossible to put correct commands for file/directory removal. Those need such
parameters as `/Q`, but gyp makes them `\Q` which is inappropriate. So these files
simply contain their respective commands with all necessary parameters, avoiding any
conflict with gyp.

```
...
[ 'OS=="mac"', { 'action' : [
	'rm',
	'<(module_root_dir)/build/Release/obj.target/addon/cpp/bindings.o',
	'<(module_root_dir)/build/Release/addon.node'
] } ],
[ 'OS=="win"', { 'action' : [
	'<(_del) "<(module_root_dir)/build/Release/addon.*" && ' +
	'<(_del) "<(module_root_dir)/build/Release/obj/addon/*.*"'
] } ],
```
