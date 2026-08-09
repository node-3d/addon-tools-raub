# Addon Tools

This is a part of [Node3D](https://github.com/node-3d) project.

[![NPM](https://badge.fury.io/js/@node-3d%2Faddon-tools.svg)](https://badge.fury.io/js/@node-3d%2Faddon-tools)
[![Lint](https://github.com/node-3d/addon-tools/actions/workflows/lint.yml/badge.svg)](https://github.com/node-3d/addon-tools/actions/workflows/lint.yml)
[![Test](https://github.com/node-3d/addon-tools/actions/workflows/test.yml/badge.svg)](https://github.com/node-3d/addon-tools/actions/workflows/test.yml)
[![Cpplint](https://github.com/node-3d/addon-tools/actions/workflows/cpplint.yml/badge.svg)](https://github.com/node-3d/addon-tools/actions/workflows/cpplint.yml)

```bash
npm install @node-3d/addon-tools
```

Addon Tools provide build-time and run-time helpers for Node.js C++ addons.
- C++ shortcuts to replace repetitive code in method/class
declaration and commonly used calls (such as `console.log`).
- JS helpers to deliver the precompiled addons to end-users during npm install.
- Common Logger for both C++ and JS sides with additional control,
compared to native (`printf/cout`) and console logging.

## include/addon-tools.hpp

Macros and helpers for C++ addons using **NAPI**.
See more detailed [docs here](doc).

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
generated wrappers validate the JS receiver before dispatching to the native
instance, while exposing `unwrap()` for lower-level manual probing.

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
	import { createRequire } from 'node:module';
	import { getBin } from '@node-3d/addon-tools';

	const require = createRequire(import.meta.url);
	const core = require(`./${getBin()}/ADDON`);
```


### Example for **binding.gyp**:

Using the include directories for both Addon Tools header
and Addon API header:

```gyp
	'include_dirs': [
		'<!@(node -e "import(\'@node-3d/addon-tools\').then((m) => m.printInclude())")',
	],
```

> NOTE: the optional `node-addon-api` dependency is used by the `getInclude()`
helper. If not found,
	the **napi.h** include path won't be a part of the returned string.

Using helpers for paths to dependency libs and own binaries:

```gyp
	'variables': {
		'bin': '<!(node -e "import(\'@node-3d/addon-tools\').then((m) => m.printBin())")',
		'gl_include': '<!(node -p "require(\'@node-3d/deps-opengl\').include")',
		'gl_bin': '<!(node -p "require(\'@node-3d/deps-opengl\').bin")',
	},
```


### Example of `cpbin` in **package.json :: scripts**:

Copy the addon file, for example, from `./src/build/Release/glfw.node`
to `./bin-windows/glfw.node`, but each platform uses a different folder.

```json
"build": "cd src && node-gyp rebuild -j max --silent && node -e \"import('@node-3d/addon-tools').then((m) => m.cpbin('glfw'))\"",
"build-only": "cd src && node-gyp build -j max --silent && node -e \"import('@node-3d/addon-tools').then((m) => m.cpbin('glfw'))\"",
```

### Example of `cpcpplint` in **cpplint.yml**:

Since all my addons use the same codestyle, I don't keep
copies of the [CPPLINT config](utils/CPPLINT.cfg) in
every addon. If that same config fits for you,
here's how it can be used:

```yml
- name: Run Cpplint
  run: |
    node -e "import('@node-3d/addon-tools').then((m) => m.cpcpplint())"
    cpplint --recursive ./src/cpp
```

### Example of `cpclangformat` in **package.json :: scripts**:

Since all my addons use the same C++ formatting style, I don't keep
copies of the [.clang-format config](utils/.clang-format) in every addon.
If that same config fits for you, use `clang-format-node` from package scripts
so the formatter version is locked by `package-lock.json`:

```json
"format:src": "node -e \"import('@node-3d/addon-tools').then((m) => m.cpclangformat())\" && node -e \"const { readdirSync } = require('node:fs'); const { execFileSync } = require('node:child_process'); const { clangFormatPath } = require('clang-format-node'); const files = readdirSync('src/cpp').filter((file) => /\\.(?:cpp|hpp)$/.test(file)).map((file) => 'src/cpp/' + file); execFileSync(clangFormatPath, ['-i', ...files], { stdio: 'inherit' });\"",
"format:src:ci": "node -e \"import('@node-3d/addon-tools').then((m) => m.cpclangformat())\" && node -e \"const { readdirSync } = require('node:fs'); const { execFileSync } = require('node:child_process'); const { clangFormatPath } = require('clang-format-node'); const files = readdirSync('src/cpp').filter((file) => /\\.(?:cpp|hpp)$/.test(file)).map((file) => 'src/cpp/' + file); execFileSync(clangFormatPath, ['--dry-run', '--Werror', ...files], { stdio: 'inherit' });\""
```

The copied `.clang-format` is a generated package-local file. Keep it ignored
and let `cpclangformat()` overwrite it.

### Example of `install` in **install.js**:

Downloads the addon (for example, from GitHub releases) and places
it into a platform-specific folder.

```js
import { install } from '@node-3d/addon-tools';

const prefix = 'https://github.com/node-3d/glfw/releases/download';
const tag = '5.5.0';
install(`${prefix}/${tag}`);
```

## JS Utils

JavaScript helpers for Node.js addon development. The short list of helpers:

```js
	'getBin', 'getPlatform', 'getInclude', 'getPaths',
	'install', 'cpbin', 'download', 'copy', 'exists',
	'ensuredir', 'subdirs', 'subfiles', 'traverse',
	'rmdir', 'rm', 'actionPack', 'checkGypi',
	'createLogger', 'setLevel', 'getLevel', 'getLoggers',
```

The public JS helpers are:

* `getPaths(dir)` - return `{ bin, include }` for a dependency package and prepend `bin`
  to `PATH` on Windows.
* `getBin()`, `printBin()` - current platform binary directory, such as `bin-windows`.
* `getPlatform()`, `printPlatform()` - current platform key.
* `getInclude()`, `printInclude()` - include flags for addon-tools and optional
  `node-addon-api`.
* `cpbin(name)` - copy `src/build/Release/<name>.node` into the platform `bin-*` directory.
* `cpcpplint()` - copy the shared `CPPLINT.cfg` into the current directory.
* `cpclangformat()` - copy the shared `.clang-format` into the current directory.
* `checkGypi(path?)` - verify a local `common.gypi` matches the shared one.
* `install(folderUrl)` - download and unpack `<platform>.gz` into the current platform bin dir.
* `download(url)` - fetch a URL into a `Buffer`.
* `copy`, `exists`, `ensuredir`, `subdirs`, `subfiles`, `traverse`, `rmdir`, `rm`.
* `actionPack()` - pack the current platform bin directory as `<platform>.gz`.

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
	const { getLogger } = await import('@node-3d/addon-tools');
	getLogger('my-logger').warn(1, 2, '3');
```

And the C++ calls are:

```cpp
	globalLog(env, "my-logger", "warn", "string log message");
	// or
	Napi::Value args[3] = { JS_NUM(1), JS_NUM(2), JS_STR("3") };
	globalLog(env, "cpp", "warn", 3, &args[0]);
```

Logger helpers:

* `createLogger({ name, ...methods })` - create or update a named logger.
* `getLogger(name)` - get an existing logger or create one with console methods.
* `setLevel(level | null)` and `getLevel()` - control global log filtering.
* `getLoggers()` - return the logger registry snapshot.

`global.AddonTools.log(name, level, ...args)` is installed for C++ helpers that need to
route log messages back into JavaScript.
