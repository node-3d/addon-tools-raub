# Addon Tools

This is a part of [Node3D](https://github.com/node-3d) project.

![NPM](https://nodei.co/npm/addon-tools-raub.png?compact=true)

![Build Status](https://travis-ci.com/node-3d/addon-tools-raub.svg?branch=master)


## Synopsis

Helpers for Node.js addons and dependency packages:

* `consoleLog()` C++ implementation.
* `EventEmitter` C++ implementation.
* C++ macros and shortcuts.
* Crossplatform commands for GYP: `cp`, `rm`, `mkdir`.
* Regarded platforms: win x32/x64, linux x32/x64, mac x64.

Useful links: [V8 Ref](https://v8.paulfryzel.com/docs/master/),
[Nan Docs](https://github.com/nodejs/nan#api),
[GYP Docs](https://gyp.gsrc.io/docs/UserDocumentation.md).

---


## Contents

[Snippets](#snippets)

[include/addon-tools.hpp](#includeaddon-toolshpp)

[index.js](#indexjs)

[Crossplatform commands](#crossplatform-commands)

[Class EventEmitter](#class-eventemitter)

[Function consoleLog](#function-consolelog)

---


## Snippets


### binding.gyp

<details>

<summary>Crossplatform commands</summary>
	
	```
	'variables': {
		'rm'    : '<!(node -e "require(\'addon-tools-raub\').rm()")',
		'cp'    : '<!(node -e "require(\'addon-tools-raub\').cp()")',
		'mkdir' : '<!(node -e "require(\'addon-tools-raub\').mkdir()")',
	},
	```
	
	On both Windows and Unix those are the console commands for various
	file system operations. No need for GYP conditions, yay!
	
</details>


<details>

<summary>Addon binary directory</summary>
	
	```
	'variables': {
		'binary' : '<!(node -e "require(\'addon-tools-raub\').bin()")',
	},
	```
	
	In some cases, you'd like to have your addon installed for multiple architectures
	simultaneously. For example, when using NVM to fluently switch environments.
	Because the target directory is different for each arch, you only have to do
	`npm rebuild` after the first switch.
	
</details>


<details>

<summary>Include directories</summary>
	
	```
		'include_dirs': [
			'<!@(node -e "require(\'addon-tools-raub\').include()")',
		],
	```
	
	Those are the directory paths to C++ include files for Addon Tools and Nan
	(which is preinstalled with Addon Tools)
	
</details>


<details>

<summary>Remove intermediates</summary>
	
	```
		[ 'OS=="linux"', { 'action' : [
			'<(rm)',
			'<(module_root_dir)/build/Release/obj.target/addon/cpp/addon.o',
			'<(module_root_dir)/build/Release/addon.node'
		] } ],
		[ 'OS=="mac"', { 'action' : [
			'<(rm)',
			'<(module_root_dir)/build/Release/obj.target/addon/cpp/addon.o',
			'<(module_root_dir)/build/Release/addon.node'
		] } ],
		[ 'OS=="win"', { 'action' : [
			'<(rm)',
			'<(module_root_dir)/build/Release/addon.*',
			'<(module_root_dir)/build/Release/obj/addon/*.*'
		] } ],
	```
	
	Build-files can be removed in a separate build-step with `<(rm)`. Those are
	usually PDB and OBJ files, which are rather big. However, in case of a hardcore
	debug session you might want to comment this out.
	
</details>


### Binary dependency package

If you design a module with binary dependencies for several platforms, **Addon Tools**
would encourage you to abide by the following rules:

* Your binary directories are:
	
	* bin-win32
	* bin-win64
	* bin-linux32
	* bin-linux64
	* bin-mac64
	
* The following piece of code in your `index.js` without changes. Method `paths()`
is described [here](#indexjs).
	
	```
	module.exports = require('addon-tools-raub').paths(__dirname);
	```
	
* Your whole **binding.gyp**:
	
	<details>
	
	<summary>Show binding.gyp</summary>
	
	```
	{
		'variables': {
			'rm'   : '<!(node -e "require(\'addon-tools-raub\').rm()")',
			'rem'  : '<!(node -e "require(\'.\').rem()")',
			'XALL%': 'false',
		},
		'targets': [
			{
				'target_name' : 'remove_extras',
				'type'        : 'none',
				'conditions'  : [['XALL=="false"', {'actions': [
					{
						'action_name' : 'Unnecessary binaries removed.',
						'inputs'      : [],
						'outputs'     : ['build'],
						'action'      : ['<(rm)', '-rf', '<@(rem)'],
					}
				]}]],
			}
		]
	}
	```
	
	Notice the `XALL` variable here. If the package is installed with `npm i`, then
	quite expectedly all but the required arch directories are removed. But with
	`npm i --XALL` you can keep all the binaries. It might be useful when debugging
	multiple archs and switching Node.js versions with
	[NVM](https://github.com/creationix/nvm).
	
	</details>


### Compiled addon

It is easy to build a C++ addon with **Addon Tools**. To have a full picture, you
can view the
[official example](https://github.com/node-3d/addon-tools-raub/tree/master/examples/addon).

The main file for an addon is **binding.gyp**. Here's a snippet with most of the features.

<details>

<summary>binding.gyp</summary>

* Assume `EXT_LIB` is the name of an Addon Tools compliant binary dependency module.
* Assume `MY_ADDON` is the name of this addon.
* Assume C++ code goes to `cpp` directory.

```
{
	'variables': {
		'rm'              : '<!(node -e "require(\'addon-tools-raub\').rm()")',
		'cp'              : '<!(node -e "require(\'addon-tools-raub\').cp()")',
		'mkdir'           : '<!(node -e "require(\'addon-tools-raub\').mkdir()")',
		'binary'          : '<!(node -e "require(\'addon-tools-raub\').bin()")',
		'EXT_LIB_include' : '<!(node -e "require(\'node-deps-EXT_LIB-raub\').include()")',
		'EXT_LIB_bin'     : '<!(node -e "require(\'node-deps-EXT_LIB-raub\').bin()")',
	},
	'targets': [
		{
			'target_name': 'MY_ADDON',
			'sources': [
				'cpp/MY_ADDON.cpp',
			],
			'include_dirs': [
				'<!(node -e "require(\'addon-tools-raub\').include()")',
				'<(EXT_LIB_include)',
				'<(module_root_dir)/include',
			],
			'library_dirs': [ '<(EXT_LIB_bin)' ],
			'conditions': [
				[
					'OS=="linux"',
					{
						'libraries': [
							'-Wl,-rpath,<(EXT_LIB_bin)',
							'<(EXT_LIB_bin)/libEXT_LIB.so',
						],
					}
				],
				[
					'OS=="mac"',
					{
						'libraries': [
							'-Wl,-rpath,<(EXT_LIB_bin)',
							'<(EXT_LIB_bin)/EXT_LIB.dylib',
						],
					}
				],
				[
					'OS=="win"',
					{
						'libraries': [ 'EXT_LIB.lib' ],
						'defines' : [
							'WIN32_LEAN_AND_MEAN',
							'VC_EXTRALEAN'
						],
						'msvs_version'  : '2013',
						'msvs_settings' : {
							'VCCLCompilerTool' : {
								'AdditionalOptions' : [
									'/O2','/Oy', # Comment this for debugging
									# '/Z7', # Unomment this for debugging
									'/GL','/GF','/Gm-','/EHsc',
									'/MT','/GS','/Gy','/GR-','/Gd',
								]
							},
							'VCLinkerTool' : {
								'AdditionalOptions' : ['/OPT:REF','/OPT:ICF','/LTCG']
							},
						},
					}
				],
			],
		},
		
		{
			'target_name'  : 'make_directory',
			'type'         : 'none',
			'dependencies' : ['MY_ADDON'],
			'actions'      : [{
				'action_name' : 'Directory created.',
				'inputs'      : [],
				'outputs'     : ['build'],
				'action': ['<(mkdir)', '-p', '<(binary)']
			}],
		},
		{
			'target_name'  : 'copy_binary',
			'type'         : 'none',
			'dependencies' : ['make_directory'],
			'actions'      : [{
				'action_name' : 'Module copied.',
				'inputs'      : [],
				'outputs'     : ['binary'],
				'action'      : ['<(cp)', 'build/Release/MY_ADDON.node', '<(binary)/MY_ADDON.node'],
			}],
		},
		
		{
			'target_name'  : 'remove_extras',
			'type'         : 'none',
			'dependencies' : ['copy_binary'],
			'actions'      : [{
				'action_name' : 'Build intermediates removed.',
				'inputs'      : [],
				'outputs'     : ['cpp'],
				'conditions'  : [
					[ 'OS=="linux"', { 'action' : [
						'rm',
						'<(module_root_dir)/build/Release/obj.target/MY_ADDON/cpp/MY_ADDON.o',
						'<(module_root_dir)/build/Release/obj.target/MY_ADDON.node',
						'<(module_root_dir)/build/Release/MY_ADDON.node'
					] } ],
					[ 'OS=="mac"', { 'action' : [
						'rm',
						'<(module_root_dir)/build/Release/obj.target/MY_ADDON/cpp/MY_ADDON.o',
						'<(module_root_dir)/build/Release/MY_ADDON.node'
					] } ],
					[ 'OS=="win"', { 'action' : [
						'<(_del)',
						'<(module_root_dir)/build/Release/MY_ADDON.*',
						'<(module_root_dir)/build/Release/obj/MY_ADDON/*.*'
					] } ],
				],
			}],
		},
		
	]
}
```

Then require the built module like this:

```
const { binPath } = require('addon-tools-raub');
const core = require(`./${binPath}/MY_ADDON`);
```

</details>

---


## include/addon-tools.hpp

There is a C++ header file, `addon-tools.hpp`, shipped with this package. It
introduces several useful macros and utilities. Also it includes Nan automatically,
so that you can replace:

```
// #include <v8.h> // already in node.h
// #include <node.h> // already in nan.h
#include <nan.h>
```

with

```
#include <addon-tools.hpp> // or event-emitter.hpp
```

In gyp, the include directory should be set for your addon to know where to get it.
As it was mentioned above, this can be done automatically. Also an actual path to the
directory is exported from the module and is accessible like this:

```
require('addon-tools-raub').include() // implicit console.log()
require('addon-tools-raub').includePath // just a string
```

Currently, there are following helpers in **addon-tools.hpp**:


<details>

<summary>Handle scope</summary>

* `NAN_HS` - creates a HandleScope. Also, you do not need them within `NAN_METHOD`,
`NAN_SETTER`, and `NAN_GETTER`, as it is stated in
[Nan doc](https://github.com/nodejs/nan/blob/master/doc/methods.md#api_nan_method).
So it is most likely to be used in parts of code called from C++ land.

```
void windowFocusCB(GLFWwindow *window, int focused) { NAN_HS;
	...
}
...
glfwSetWindowFocusCallback(window, windowFocusCB);
```

</details>


<details>

<summary>Method return</summary>

* `RET_VALUE(VAL)` - set method return value, where `VAL` is `v8::Local<v8::Value>`.
* `RET_UNDEFINED` - set method return value as `undefined`.
* `RET_STR(VAL)` - set method return value, where `VAL` is `const char *`.
* `RET_UTF8(VAL)` - set method return value, where `VAL` is `const char *`.
* `RET_INT(VAL)` - set method return value, where `VAL` is `int32`.
* `RET_INT32(VAL)` - set method return value, where `VAL` is `int32`.
* `RET_UINT32(VAL)` - set method return value, where `VAL` is `uint32`.
* `RET_NUM(VAL)` - set method return value, where `VAL` is `double`.
* `RET_OFFS(VAL)` - set method return value, where `VAL` is `size_t`.
* `RET_FLOAT(VAL)` - set method return value, where `VAL` is `float`.
* `RET_DOUBLE(VAL)` - set method return value, where `VAL` is `double`.
* `RET_EXT(VAL)` - set method return value, where `VAL` is `void *`.
* `RET_BOOL(VAL)` - set method return value, where `VAL` is `bool`.
* `RET_FUN(VAL)` - set method return value, where `VAL` is `Nan::Persistent<v8::Function>`.
* `RET_OBJ(VAL)` - set method return value, where `VAL` is `Nan::Persistent<v8::Object>`.

</details>


<details>

<summary>Shortcut types</summary>

* `V8_VAR_VAL` = `v8::Local<v8::Value>`
* `V8_VAR_OBJ` = `v8::Local<v8::Object>`
* `V8_VAR_ARR` = `v8::Local<v8::Array>`
* `V8_VAR_STR` = `v8::Local<v8::String>`
* `V8_VAR_FUNC` = `v8::Local<v8::Function>`
* `V8_VAR_FT` = `v8::Local<v8::FunctionTemplate>`
* `V8_VAR_OT` = `v8::Local<v8::ObjectTemplate>`
* `V8_STORE_FT` = `Nan::Persistent<v8::FunctionTemplate>`
* `V8_STORE_FUNC` = `Nan::Persistent<v8::Function>`
* `V8_STORE_OBJ` = `Nan::Persistent<v8::Object>`
* `V8_STORE_VAL` = `Nan::Persistent<v8::Value>`

</details>


<details>

<summary>New JS value</summary>

* `JS_STR(...)` - create a string value
* `JS_UTF8(...)` - same as JS_STR
* `JS_INT(val)` - create an integer value
* `JS_INT32(val)` - same as `JS_INT`
* `JS_UINT32(val)` - same as `JS_INT`
* `JS_NUM(val)` - create a numeric value
* `JS_OFFS(val)` - same as `JS_NUM`, but has a cast designed to avoid `size_t -> double` warning
* `JS_FLOAT(val)` - same as `JS_NUM`
* `JS_DOUBLE(val)` - same as `JS_NUM`
* `JS_EXT(val)` - create an external (pointer) value
* `JS_BOOL(val)` - create a boolean value
* `JS_FUN(val)` - get a function from persistent `Nan::Persistent<v8::Function>`.
* `JS_OBJ(val)` - get an object from persistent `Nan::Persistent<v8::Object>`.

</details>


<details>

<summary>Method check</summary>

These checks throw JS TypeError if not passed. Here `T` is always used as a typename
in error messages. `C` is
[v8::Value](https://v8docs.nodesource.com/node-0.8/dc/d0a/classv8_1_1_value.html)
check method, like `IsObject()`. `I` is the index of argument as in `info[I]`,
starting from `0`.

* `REQ_ARGS(N)` - check if at least `N` arguments passed
* `IS_ARG_EMPTY(I)` - check if argument `I` is `undefined` or `null`
* `CHECK_REQ_ARG(I, C, T)` - check if argument `I` is approved by `C` check.
* `CHECK_LET_ARG(I, C, T)` - check if argument `I` is approved by `C` check or empty.
* `CTOR_CHECK(T)` - check if method is called as a constructor
* `SETTER_CHECK(C, T)` - check if setter `value` is approved by `C` check.
* `DES_CHECK` - within dynamic method check if the instance wasn't destroyed by `destroy()`.

</details>


<details>

<summary>Method arguments</summary>

Two types of argument retrieval are supported: `REQ_` and `LET_`. The difference
is that `LET_` allows the argument to be empty, using some zero-default in this case.
`I` is the index of argument as in `info[I]`,
starting from `0`. `VAR` is the name of the variable to be created.

* `REQ_UTF8_ARG(I, VAR)` - require `I`'th argument to be a `string`. Stored at `Nan::Utf8String VAR`.
* `LET_UTF8_ARG(I, VAR)` - let optional `I`'th argument to be a `string`, the default is `""`. Stored at `Nan::Utf8String VAR`.
* `REQ_STR_ARG(I, VAR)` - require `I`'th argument to be a `string`. Stored at `Nan::Utf8String VAR`.
* `LET_STR_ARG(I, VAR)` - let optional `I`'th argument to be a `string`, the default is `""`. Stored at `Nan::Utf8String VAR`.
* `REQ_INT32_ARG(I, VAR)` - require `I`'th argument to be a `number`. Stored at `int VAR`.
* `LET_INT32_ARG(I, VAR)` - let optional `I`'th argument to be a `number`, the default is `0`. Stored at `int VAR`.
* `REQ_INT32_ARG(I, VAR)` - require `I`'th argument to be a `number`. Stored at `int VAR`.
* `LET_INT32_ARG(I, VAR)` - let optional `I`'th argument to be a `number`, the default is `0`. Stored at `int VAR`.
* `REQ_UINT32_ARG(I, VAR)` - require `I`'th argument to be a `number`. Stored at `unsigned VAR`.
* `LET_UINT32_ARG(I, VAR)` - let optional `I`'th argument to be a `number`, the default is `0`. Stored at `unsigned VAR`.
* `REQ_BOOL_ARG(I, VAR)` - require `I`'th argument to be a `boolean`. Stored at `bool VAR`.
* `LET_BOOL_ARG(I, VAR)` - let optional `I`'th argument to be a `boolean`, the default is `false`. Stored at `Nan::Utf8String VAR`.
* `REQ_OFFS_ARG(I, VAR)` - require `I`'th argument to be a `number`. Stored at `size_t VAR`.
* `LET_OFFS_ARG(I, VAR)` - let optional `I`'th argument to be a `number`, the default is `0`. Stored at `Nan::Utf8String VAR`.
* `REQ_DOUBLE_ARG(I, VAR)` - require `I`'th argument to be a `number`. Stored at `double VAR`.
* `LET_DOUBLE_ARG(I, VAR)` - let optional `I`'th argument to be a `number`, the default is `0.0`. Stored at `Nan::Utf8String VAR`.
* `REQ_FLOAT_ARG(I, VAR)` - require `I`'th argument to be a `number`. Stored at `float VAR`.
* `LET_FLOAT_ARG(I, VAR)` - let optional `I`'th argument to be a `number`, the default is `0.0f`. Stored at `Nan::Utf8String VAR`.
* `REQ_EXT_ARG(I, VAR)` - require `I`'th argument to be an `external`. Stored at `Local<External> VAR`.
* `LET_EXT_ARG(I, VAR)` - let optional `I`'th argument to be an `external`, the default is `nullptr`. Stored at `Nan::Utf8String VAR`.
* `REQ_FUN_ARG(I, VAR)` - require `I`'th argument to be a `function`. Stored at `Local<Function> VAR`.
* `REQ_OBJ_ARG(I, VAR)` - require `I`'th argument to be an `object`. Stored at `Local<Object> VAR`.
* `REQ_ARRV_ARG(I, VAR)` - require `I`'th argument to be a `TypedArray`. Stored at `Local<ArrayBufferView> VAR`.

```
NAN_METHOD(test) {
	
	REQ_UINT32_ARG(0, width);
	REQ_UINT32_ARG(1, height);
	LET_FLOAT_ARG(2, z);
	// Variables created: unsigned int width, height; float z;
	...
```

NOTE: The conversion from `Nan::Utf8String` to `std::string` (via `char *`)
is possible with unary `*` operator.

</details>


<details>

<summary>Set properties</summary>

Set-helpers for string and numeric keys. String keys are converted to JS strings
automatically.

* `SET_PROP(OBJ, KEY, VAL)`
* `SET_I(ARR, I, VAL)`

</details>


<details>

<summary>Set object accessors</summary>

Simplified accessor assignment, adds accessors of NAME for OBJ. Read accessor is
assumed to have the name `NAME+'Getter'` and write accessor is `NAME+'Setter'`.

* `ACCESSOR_RW(OBJ, NAME)` - add read and write accessors of NAME for OBJ.
* `ACCESSOR_R(OBJ, NAME)` - read-only property.

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

</details>


<details>

<summary>Setter argument</summary>

Useful addition to NAN_SETTER macro. Works similar to method arguments. But there
is always only one required argument stored in `v`.

* `SETTER_UTF8_ARG` - require the value to be a `string`. Stored at `Nan::Utf8String v`.
* `SETTER_STR_ARG` - require the value to be a `string`. Stored at `Nan::Utf8String v`.
* `SETTER_INT32_ARG` - require the value to be a `number`. Stored at `int v`.
* `SETTER_INT_ARG` - require the value to be a `number`. Stored at `int v`.
* `SETTER_UINT32_ARG` - require the value to be a `number`. Stored at `unsigned v`.
* `SETTER_BOOL_ARG` - require the value to be a `boolean`. Stored at `bool v`.
* `SETTER_OFFS_ARG` - require the value to be a `number`. Stored at `size_t v`.
* `SETTER_DOUBLE_ARG` - require the value to be a `number`. Stored at `double v`.
* `SETTER_FLOAT_ARG` - require the value to be a `number`. Stored at `float v`.
* `SETTER_EXT_ARG` - require the value to be an `external`. Stored at `Local<External> v`.
* `SETTER_FUN_ARG` - require the value to be a `function`. Stored at `Local<Function> v`.
* `SETTER_OBJ_ARG` - require the value to be an `object`. Stored at `Local<Object> v`.
* `SETTER_ARRV_ARG` - require the value to be a `TypedArray`. Stored at `Local<ArrayBufferView> v`.

```
NAN_SETTER(MyClass::messageSetter) { SETTER_UTF8_ARG;
	// Variable created: Nan::Utf8String v;
	...
```

</details>


<details>

<summary>Data retrieval</summary>

* `T *getArrayData(value, num = NULL)` - extracts TypedArray data of any type from
the given JS value. Does not accept Array, checked with `IsArrayBufferView()`.
Returns `NULL` for empty JS values. For unacceptable values throws TypeError.


* `void *getData(value)` - if value is a TypedArray, then the result of
`getArrayData(value)` is returned. Otherwise if value has `'data'` property, it's
content is then returned as `node::Buffer`. Returns `nullptr` in other cases.

</details>

---


## index.js

Exports:
* `paths(dir)` - function. Returns a set of platform dependent paths depending on
input `dir`.
	* `bin()` - prints platform binary directory absolute path.
	* `rem()` - prints a space-separated list of binary paths to be cleaned on this platform.
	* `include()` - prints include directory for this `dir`.
	* `binPath` - platform binary directory absolute path.
	* `remPath` - a space-separated list of binary paths to be cleaned on this platform.
	* `includePath` - include directory for this `dir`.
* `root()` - prints where `'addon-tools-raub'` module is situated.
* `include()` - prints both `'addon-tools-raub'` and `'nan'` include paths. Use with
`node -e` through list context command expansion `<!@(...)`
* `rm()` - prints the location of `'_rm.bat'` file on Windows and plain `rm` on Unix.
* `cp()` - prints the location of `'_cp.bat'` file on Windows and plain `cp` on Unix.
* `mkdir()` - prints the location of `'_mkdir.bat'` file on Windows and plain `mkdir` on Unix.
* `bin()` - prints platform binary directory name.
* `binPath` - platform binary directory name.
* `rootPath` - where `'addon-tools-raub'` module is situated.
* `includePath` - both `'addon-tools-raub'` and `'nan'` include paths.
* `rmPath` - the location of `'_rm.bat'` file on Windows and plain `rm` on Unix.
* `cpPath` - the location of `'_cp.bat'` file on Windows and plain `cp` on Unix.
* `mkdirPath` - the location of `'_mkdir.bat'` file on Windows and plain `mkdir` on Unix.

---


## Crossplatform commands

Because of the differences between Windows and Unix command shells, often a whole
lot of conditions have to be introduced in **binding.gyp** file. Now some of
them can be easily omitted with the new crossplatform commands, supplied by this
package.

This comes especially handy together with GYP's executable list expansion. For
example a list of files to be removed for cleaning. Or a list of unnecessary
binaries to be removed upon installation of a binary-dependency package.


### mkdir

On Unix, it will be an actual system `mkdir`, whereas on Windows it will use the
**mkdir.bat** file, located at the root of this package. This BAT file behaves
as if it was a `mkdir -p ...` call. You can still pass `-p` switch, which is
ignored. And the limitation is that you can not create a relative-path **-p**
folder. This can possibly be bypassed by supplying `./-p` or something like this.


```
'variables': {
	'mkdir' : '<!(node -e "require(\'addon-tools-raub\').mkdir()")',
},
...
'action' : ['<(mkdir)', '-p', 'binary'],
```


### rm

Disregard `del` and `rd` on Windows command line. Now the same command can
be used on all platforms to remove single and multiple files and directories.

```
'variables': {
	'rm'  : '<!(node -e "require(\'addon-tools-raub\').rm()")',
	'rem' : '<!(node -e "require(\'.\').rem()")',
},
...
'action' : ['<(rm)', '-rf', '<@(rem)'],
```

### cp

For Windows the `/y` flag was embedded.

```
'variables': {
	'cp'  : '<!(node -e "require(\'addon-tools-raub\').cp()")',
},
...
'action' : ['<(cp)', 'a', 'b'],
```

---


## Class EventEmitter

A C++ implementation of [Events API](https://nodejs.org/api/events.html).

> Note: This implementation has some minor deviations from the above standard.
Specifically there is no static `EventEmitter.defaultMaxListeners` property.
However the dynamic one persists and is infinite (`0`) by default.

Also
[EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)
is implemented. Not in full detail, but should be fine for callers.

An example can be found in **examples/node-addon** directory.
There is `Example` class, implemented in **cpp/example.cpp**, that inherits
EventEmitter behavior and is exported to JS.

For the C++ side `EventEmitter` has following public methods:

* `void emit(const std::string &name, int argc = 0, v8::Local<v8::Value> *argv = NULL)` -
emits an event with the given `name` and, optionally, some additional arguments where
`argc` is the number of arguments and `argv` is a pointer to the arguments array.

* `void on(const std::string &name, V8_VAR_FUNC cb)` -
subscribes `cb` to receive `name` events from this emitter, basically
`emitter.on(name, cb)`.

* `void destroy()` - destroys the object, i.e. deactivates it and frees
resources. This is what also called inside
`~EventEmitter()`, but only the first call is effective anyway.


Be sure to add the include directory in **binding.gyp**:

```
	'include_dirs': [
		'<!@(node -e "require(\'addon-tools-raub\').include()")',
	],
```

Then include the **event-emitter.hpp**, it also includes **addon-tools.hpp**.
Inherit from `EventEmitter`, it already inherits from `Nan::ObjectWrap`:

```
#include <event-emitter.hpp>

class Example : public EventEmitter {
	...
}
```

> Note: Do not forget to call `EventEmitter::init()` once, in the module `init()`.


<details>

<summary>V8 Inheritance</summary>

Now that everything is in place, consider providing **V8** with JS inheritance info:

```
void Example::init(Handle<Object> target) {
	
	Local<FunctionTemplate> proto = Nan::New<FunctionTemplate>(newCtor);
	
	// -------------------------- HERE!
	// class Example extends EventEmitter
	Local<FunctionTemplate> parent = Nan::New(EventEmitter::_prototype);
	proto->Inherit(parent);
	// --------------------------
	
	proto->InstanceTemplate()->SetInternalFieldCount(1);
	proto->SetClassName(JS_STR("Example"));
	
	Local<Function> ctor = Nan::GetFunction(proto).ToLocalChecked();
	
	_constructor.Reset(ctor);
	
	Nan::Set(target, JS_STR("Example"), ctor);
	
}
```

</details>

---


## Function consoleLog

In C++ addons, the use of **iostream** is discouraged because **Node.js** has its own
perspective on **stdout** behavior.
At first it may look as if `cout << "msg" << endl;` works nice, but it doesn't.
After a while, it just ceases on a midword, and you end up thinking something has
broken really hard in your addon.

To overcome this, we can use some V8 `eval` magic to make a real `console.log`
call from C++ land. And this is where `consoleLog` comes into play.

* `inline void consoleLog(int argc, V8_VAR_VAL *argv)` - a generic logger,
receives any set of arguments.

* `inline void consoleLog(const std::string &message)` - an alias to log a single
string.

> Note: Don't do it in GC-accessible code: sometimes it works, sometimes it crashes.
