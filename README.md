# Addon Tools

This is a part of [Node3D](https://github.com/node-3d) project.

[![NPM](https://badge.fury.io/js/addon-tools-raub.svg)](https://badge.fury.io/js/addon-tools-raub)
[![ESLint](https://github.com/node-3d/addon-tools-raub/actions/workflows/eslint.yml/badge.svg)](https://github.com/node-3d/addon-tools-raub/actions/workflows/eslint.yml)
[![Test](https://github.com/node-3d/addon-tools-raub/actions/workflows/test.yml/badge.svg)](https://github.com/node-3d/addon-tools-raub/actions/workflows/test.yml)
[![Cpplint](https://github.com/node-3d/addon-tools-raub/actions/workflows/cpplint.yml/badge.svg)](https://github.com/node-3d/addon-tools-raub/actions/workflows/cpplint.yml)

```console
npm i -s addon-tools-raub
```

Addon Tools provide build-time and run-time helpers for Node.js C++ addons.
- C++ shortcuts to replace repetitive code in method/class
declaration and commonly used calls (such as `console.log`).
- JS helpers to deliver the precompiled addons to end-users during NPM install.
- Common Logger for both C++ and JS sides with additional control,
compared to native (`printf/cout`) and console logging.

## include/addon-tools.hpp

Macros and helpers for C++ addons using **NAPI**.
See more detailed [docs here](/doc).

Example of a C++ method definition using Addon Tools:

```c++
// hpp:
#include <addon-tools.hpp>
DBG_EXPORT JS_METHOD(doSomething);
// cpp:
DBG_EXPORT JS_METHOD(doSomething) { NAPI_ENV;
	LET_INT32_ARG(0, param0);
	Napi::Value args[2] = { JS_STR("param0:"), JS_NUM(param0) };
	consoleLog(env, 2, &args[0]);
	RET_UNDEFINED;
}
```

Also, ES5 class helpers allow exporting a JS class directly from C++:

```cpp
// hpp:
#include <addon-tools.hpp>
class MyClass {
DECLARE_ES5_CLASS(MyClass, MyClass);
public:
	static void init(Napi::Env env, Napi::Object exports);
	explicit MyClass(const Napi::CallbackInfo& info);
	~MyClass();
private:
	JS_DECLARE_GETTER(MyClass, a);
	JS_DECLARE_GETTER(MyClass, b);
	JS_DECLARE_METHOD(MyClass, test);
};

// cpp:
IMPLEMENT_ES5_CLASS(MyClass);

void MyClass::init(Napi::Env env, Napi::Object exports) {
	Napi::Function ctor = wrap(env);
	JS_ASSIGN_GETTER(a);
	JS_ASSIGN_GETTER(b);
	JS_ASSIGN_METHOD(test);
	exports.Set("MyClass", ctor);
}

MyClass::MyClass(const Napi::CallbackInfo &info) {
	super(info);
}

MyClass::~MyClass() {}

JS_IMPLEMENT_GETTER(MyClass, a) { NAPI_ENV;
	RET_NUM(10);
}

JS_IMPLEMENT_GETTER(MyClass, b) { NAPI_ENV;
	RET_NUM(20);
}

JS_IMPLEMENT_METHOD(MyClass, test) { NAPI_ENV;
	consoleLog("test");
	RET_STR("test");
}

Napi::Object init(Napi::Env env, Napi::Object exports) {
	MyClass::init(env, exports);
	return exports;
}

NODE_API_MODULE(myaddon, init)
```

## JS Addon Helpers

### Example for an ADDON's **index.js**:

Get the platform-specific directory name to import the `ADDON.node` file.

```js
	const { getBin } = require('addon-tools-raub');
	const core = require(`./${getBin()}/ADDON`);
```


### Example for **binding.gyp**:

Using the include directories for both Addon Tools header
and Addon API header:

```gyp
	'include_dirs': [
		'<!@(node -p "require(\'addon-tools-raub\').getInclude()")',
	],
```

> NOTE: the optional `node-addon-api` dependency is used by the `getInclude()`
helper. If not found,
	the **napi.h** include path won't be a part of the returned string.

Using helpers for paths to dependency libs and own binaries:

```gyp
	'variables': {
		'bin': '<!(node -p "require(\'addon-tools-raub\').getBin()")',
		'gl_include': '<!(node -p "require(\'deps-opengl-raub\').include")',
		'gl_bin': '<!(node -p "require(\'deps-opengl-raub\').bin")',
	},
```


### Example of `cpbin` in **package.json :: scripts**:

Copy the addon file, for example, from `./src/build/Release/glfw.node`
to `./bin-windows/glfw.node`, but each platform uses a different folder.

```json
"build": "cd src && node-gyp rebuild -j max --silent && node -e \"require('addon-tools-raub').cpbin('glfw')\" && cd ..",
"build-only": "cd src && node-gyp build -j max --silent && node -e \"require('addon-tools-raub').cpbin('glfw')\" && cd ..",
```

### Example of `cpcpplint` in **cpplint.yml**:

Since all my addons use the same codestyle, I don't keep
copies of the [CPPLINT config](/utils/CPPLINT.cfg) in
every addon. If that same config fits for you,
here's how it can be used:

```yml
- name: Run Cpplint
  run: |
    node -e "require('addon-tools-raub').cpcpplint()"
    cpplint --recursive ./src/cpp
```

### Example of `install` in **install.js**:

Downloads the addon (for example, from GitHub releases) and places
it into a platform-specific folder.

```js
const { install } = require('addon-tools-raub');
const prefix = 'https://github.com/node-3d/glfw-raub/releases/download';
const tag = '5.5.0';
install(`${prefix}/${tag}`);
```

## JS Utils

JavaScript helpers for Node.js addon development. The short list of helpers:

```js
	'getBin', 'getPlatform', 'getInclude', 'getPaths',
	'install', 'cpbin', 'download', 'read', 'write', 'copy', 'exists',
	'mkdir', 'stat', 'isDir', 'isFile', 'dirUp', 'ensuredir', 'copysafe',
	'readdir', 'subdirs', 'subfiles', 'traverse', 'copyall',
	'rmdir', 'rm', 'WritableBuffer', 'actionPack',
	'createLogger', 'setLevel', 'getLevel', 'getLoggers',
```

See the [TypeScript declarations](/index.d.ts) with comments.

### Logger:

This helper provides simple logging interface, for both JS and C++, that may be used
locally or globally.

```js
	// to `console` by default
	const logger = utils.createLogger({ name: 'my-logger' });
```

Now the following JS calls are equal:

```js
	logger.warn(1, 2, '3');
	global.AddonTools.log('my-logger', 'warn', 1, 2, '3');
	require('addon-tools-raub').getLogger('my-logger').warn(1, 2, '3');
```

And the C++ calls are:

```cpp
	globalLog(env, "my-logger", "warn", "string log message");
	// or
	Napi::Value args[3] = { JS_NUM(1), JS_NUM(2), JS_STR("3") };
	globalLog(env, "cpp", "warn", 3, &args[0]);
```

See the [TS declarations](/index.d.ts) with comments.
