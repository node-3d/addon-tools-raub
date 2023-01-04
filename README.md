# Addon Tools

This is a part of [Node3D](https://github.com/node-3d) project.

[![NPM](https://badge.fury.io/js/addon-tools-raub.svg)](https://badge.fury.io/js/addon-tools-raub)
[![CodeFactor](https://www.codefactor.io/repository/github/node-3d/addon-tools-raub/badge)](https://www.codefactor.io/repository/github/node-3d/addon-tools-raub)

```
npm i addon-tools-raub
```


## include/addon-tools.hpp

Macro shortcuts for C++ addons using **NAPI**.
See [docs inside the folder](/include).

Example of an addon method definition:

```
// hpp:
#include <addon-tools.hpp>
DBG_EXPORT JS_METHOD(doSomething);
// cpp:
DBG_EXPORT JS_METHOD(doSomething) { NAPI_ENV;
	LET_INT32_ARG(0, param0);
	std::cout << "param0: " << param0 << std::endl;
	RET_UNDEFINED;
}
```


## index.js

JavaScript helpers for Node.js addon development. The short list of helpers:
```
	'getBin', 'getPlatform', 'getInclude', 'getPaths',
	'install', 'cpbin', 'download', 'read', 'write', 'copy', 'exists',
	'mkdir', 'stat', 'isDir', 'isFile', 'dirUp', 'ensuredir', 'copysafe',
	'readdir', 'subdirs', 'subfiles', 'traverse', 'copyall',
	'rmdir', 'rm', 'WritableBuffer', 'actionPack',
```


See the [TypeScript definitions](/index.d.ts) with comments.


### Example for an ADDON's **index.js**:

```
	const { getBin } = require('addon-tools-raub');
	const core = require(`./${getBin()}/ADDON`); // uses the platform-specific ADDON.node
```


### Example for **binding.gyp**:

```
	'include_dirs': [
		'<!@(node -p "require(\'addon-tools-raub\').getInclude()")',
	],
```

> NOTE: the optional `node-addon-api` dependency is used by the `getInclude()` helper. If not found,
	the **napi.h** include path won't be a part of the returned string.


### Example of `cpbin` usage in **package.json :: scripts**:

```
	"build-all": "cd src && node-gyp rebuild -j max --silent && node -e \"require('addon-tools-raub').cpbin('segfault')\" && cd ..",
	"build-only": "cd src && node-gyp build -j max --silent && node -e \"require('addon-tools-raub').cpbin('segfault')\" && cd ..",
```
