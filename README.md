# Addon Tools

This is a part of [Node3D](https://github.com/node-3d) project.

[![NPM](https://nodei.co/npm/addon-tools-raub.png?compact=true)](https://www.npmjs.com/package/addon-tools-raub)

[![Build Status](https://api.travis-ci.com/node-3d/addon-tools-raub.svg?branch=master)](https://travis-ci.com/node-3d/addon-tools-raub)
[![CodeFactor](https://www.codefactor.io/repository/github/node-3d/addon-tools-raub/badge)](https://www.codefactor.io/repository/github/node-3d/addon-tools-raub)

> npm i -s addon-tools-raub


## Synopsis

Helpers for Node.js **NAPI** addons and dependency packages:

* Supported platforms (x64): Windows, Linux, OSX.
* C++ helpers:
	* Macro shortcuts for NAPI.
	* `consoleLog()` function.
	* `eventEmit()` function.
	* `getData()` function.
* Module helpers:
	* Crossplatform commands for GYP: `cp`, `rm`, `mkdir`.
	* Deps unzip installer.
	* Url-to-buffer downloader.

Useful links: [N-API Docs](https://nodejs.org/api/n-api.html),
[Napi Docs](https://github.com/nodejs/node-addon-api/blob/master/doc/setup.md),
[GYP Docs](https://gyp.gsrc.io/docs/UserDocumentation.md).

**Jump to**:

[Snippets](#snippets)

[include/addon-tools.hpp](#includeaddon-toolshpp)

[index.js](#indexjs)

[Crossplatform commands](#crossplatform-commands)

[Function consoleLog](#function-consolelog)

[Function eventEmit](#function-eventEmit)

---


## Snippets


### Crossplatform commands

```
'variables': {
	'rm'    : '<!(node -p "require(\'addon-tools-raub\').rm")',
	'cp'    : '<!(node -p "require(\'addon-tools-raub\').cp")',
	'mkdir' : '<!(node -p "require(\'addon-tools-raub\').mkdir")',
},
```

On both Windows and Unix those commands now have the same result:

```
{
	'target_name'  : 'make_directory',
	'type'         : 'none',
	'dependencies' : ['addon'],
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
		'action'      : [
			'<(cp)',
			'build/Release/addon.node',
			'<(binary)/addon.node'
		],
	}],
},
```


### Addon binary directory

```
'variables': {
	'binary' : '<!(node -p "require(\'addon-tools-raub\').bin")',
},
```


### Include directories

```
	'include_dirs': [
		'<!@(node -p "require(\'addon-tools-raub\').include")',
	],
```

Those are the directory paths to C++ include files for **Addon Tools** and
**Napi** (which is preinstalled with Addon Tools).


### Binary dependency package

If you design a module with binary dependencies for several platforms,
**Addon Tools** may help within the following guidelines:

* In **package.json** use a `"postinstall"` script to download the libraries.
For example the following structure might work. Note that **Addon Tools** will
append any given URL with ``/${platform}.zip``
	
	```
	"config" : {
		"install" : "v1.0.0"
	},
	"scripts": {
		"postinstall": "install",
	},
	```
	
	where `config.install` is  **YOUR install.js** is:
	
	```
	const install = require('addon-tools-raub/install');
	const prefix = 'https://github.com/user/addon/releases/download';
	const tag = process.env.npm_package_config_install;
	install(`${prefix}/${tag}`);
	```
	
	**Addon Tools** will unzip the downloaded file into the platform binary
	directory. E.g. on Windows it will be **bin-windows**.
	
* Per platform binary directories:
	
	* bin-windows
	* bin-linux
	* bin-osx
	
* The following piece of code in your `index.js` without changes. Method `paths()`
is described [here](#indexjs).
	
	```
	module.exports = require('addon-tools-raub').paths(__dirname);
	```
	
* Publishing is done by attaching a zipped platform folder to the Github
release. Zip file must NOT contain platform folder as a subfolder, but rather
contain the final binaries. The tag of the release should be the same as in
`npm_package_config_install` - that is the way installer will find it.
	
* NOTE: You can publish your binaries to anywhere, not necessarily Github.
Just tweak the **install.js** script as appropriate. The only limitation
from **Addon Tools** is that it should be a zipped set of files/folders.


### Compiled addon

With the advent of N-API the focus of compiled addons shifted towards the
word "addons". Since ABI is now compatible across Node.js versions, now addons
are just plain DLLs. Therefore distribution of the binaries is covered in the
previous section. But for an addon you have to provide a GYP compilation step.
N-API changes it's role to out-of-install compilation, so we can't/shouldnt
put the file **binding.gyp** to the module root anymore.

The workaround would be to have a separate directory within your project
(with simplified package.json) for the sake of addon compilation.

```
{
	"name": "build",
	"version": "0.0.0",
	"private": true,
	"dependencies": {
		"addon-tools-raub": "5.0.0",
		"deps-EXT_LIB": "1.0.0"
	}
}
```

* Assume `EXT_LIB` is the name of a binary dependency.
* Assume `deps-EXT_LIB` is the name of an Addon Tools compliant dependency module.
* Assume `MY_ADDON` is the name of this addon's resulting binary.
* Assume C++ code goes to `cpp` subdirectory.

That together with **binding.gyp**, this would be enough to get the addon compiled.
Then the binaries are published to the Github release. When the addon
is installed, its **index.js** is responsible for reexport of the binary.
Just require the built module like this:

```
const { bin } = require('addon-tools-raub');
const core = require(`./${bin}/MY_ADDON`);
```

<details>

<summary>See a snipped for binding.gyp here</summary>

* Assume `EXT_LIB` is the name of a binary dependency.
* Assume `deps-EXT_LIB` is the name of an Addon Tools compliant dependency module.
* Assume `MY_ADDON` is the name of this addon's resulting binary.
* Assume C++ code goes to `cpp` subdirectory.

```
{
	'variables': {
		'rm'              : '<!(node -e "require(\'addon-tools-raub\').rm")',
		'cp'              : '<!(node -e "require(\'addon-tools-raub\').cp")',
		'mkdir'           : '<!(node -e "require(\'addon-tools-raub\').mkdir")',
		'binary'          : '<!(node -e "require(\'addon-tools-raub\').bin")',
		'EXT_LIB_include' : '<!(node -e "require(\'deps-EXT_LIB\').include")',
		'EXT_LIB_bin'     : '<!(node -e "require(\'deps-EXT_LIB\').bin")',
	},
	'targets': [
		{
			'target_name': 'MY_ADDON',
			'sources': [
				'cpp/MY_ADDON.cpp',
			],
			'include_dirs': [
				'<!(node -e "require(\'addon-tools-raub\').include")',
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
						'xcode_settings': {
							'DYLIB_INSTALL_NAME_BASE': '@rpath',
						},
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
				'action'      : [
					'<(cp)',
					'build/Release/MY_ADDON.node',
					'<(binary)/MY_ADDON.node',
				],
			}],
		},
		
	]
}
```

</details>

---


## include/addon-tools.hpp

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

---


## index.js

Exports:
* `paths(dir)` - function. Returns a set of platform dependent paths depending on
input `dir`.
	* `bin` - platform binary directory absolute path.
	* `include` - include directory for this `dir`.
* `include` - both `'addon-tools-raub'` and `'node-addon-api'` include paths.
Use with `node -p` through list context command expansion `<!@(...)`
* `rm` - the location of `'_rm.bat'` file on Windows and plain `rm` on Unix.
* `cp` - the location of `'_cp.bat'` file on Windows and plain `cp` on Unix.
* `mkdir` - the location of `'_mkdir.bat'` file on Windows and plain `mkdir` on Unix.
* `bin` - platform binary directory name.

---


### mkdir

On Unix, it will be an actual system `mkdir`, whereas on Windows it will use the
**mkdir.bat** file, located at the root of this package. This BAT file behaves
as if it was a `mkdir -p ...` call. You can still pass `-p` switch, which is
ignored. And the limitation is that you can not create a relative-path **-p**
folder. This can possibly be bypassed by supplying `./-p` or something like this.


```
'variables': {
	'mkdir' : '<!(node -p "require(\'addon-tools-raub\').mkdir")',
},
...
'action' : ['<(mkdir)', '-p', 'binary'],
```


### rm

Disregard `del` and `rd` on Windows command line. Now the same command can
be used on all platforms to remove single and multiple files and directories.

```
'variables': {
	'rm'  : '<!(node -e "require(\'addon-tools-raub\').rm")',
},
...
'action' : ['<(rm)', '-rf', 'dirname'],
```

### cp

For Windows the `/y` flag was embedded.

```
'variables': {
	'cp'  : '<!(node -e "require(\'addon-tools-raub\').cp")',
},
...
'action' : ['<(cp)', 'a', 'b'],
```


## Function consoleLog

In C++ addons, the use of **iostream** is discouraged because **Node.js** has its own
perspective on **stdout** behavior.
At first it may look as if `cout << "msg" << endl;` works nice, but it doesn't.
After a while, it just ceases on a midword, and you end up thinking something has
broken really hard in your addon.

To overcome this, we can use some `eval` magic to make a real `console.log`
call from C++ land. And this is where `consoleLog` comes into play.

* `inline void consoleLog(int argc, V8_VAR_VAL *argv)` - a generic logger,
receives any set of arguments.

* `inline void consoleLog(const std::string &message)` - an alias to log a single
string.

> Note: only use this within JS function stack


## Function eventEmit

In N-API there is no inheritance. And no `eval('require(...)')` possible at
the time of module init. But `require('events')` is very tempting...
The solution is:

```
// JS
const EventEmitter = require('events');
const { bin } = require('addon-tools-raub');
const MyClass = require(`./${bin}/addon`);
MyClass.prototype.__proto__ = EventEmitter.prototype;
// Since now it is possible to call `emit` from instancess of MyClass
```

```
// C++
void MyClass::emit(const Napi::CallbackInfo& info, const char* name) {
	NAPI_ENV;
	THIS_OBJ(that);
	eventEmit(env, that, name);
}
```

Signature:
```
inline void eventEmit(
	Napi::Env env,
	Napi::Object that,
	const std::string &name,
	int argc = 0,
	Napi::Value *argv = nullptr
)
```
