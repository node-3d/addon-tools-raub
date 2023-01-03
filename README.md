# Addon Tools

This is a part of [Node3D](https://github.com/node-3d) project.

[![NPM](https://badge.fury.io/js/addon-tools-raub.svg)](https://badge.fury.io/js/addon-tools-raub)
[![CodeFactor](https://www.codefactor.io/repository/github/node-3d/addon-tools-raub/badge)](https://www.codefactor.io/repository/github/node-3d/addon-tools-raub)

```
npm i addon-tools-raub
```

This module contains helpers for Node.js **NAPI** addons and dependency packages.
On this page, helper scripts are described. For details on **addon-tools.hpp** and some
additional snippets follow the links below.


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

Main exports for cross-platform addon configuration.
See the [TypeScript definitions](/index.d.ts) with comments.

> NOTE: the peer dependency `node-addon-api` is used by this helper.

Example for an ADDON's **index.js**:

```
	const { bin } = require('addon-tools-raub');
	const core = require(`./${bin}/ADDON`); // uses the platform-specific ADDON.node
```

Example for **binding.gyp**:

```
	'include_dirs': [
		'<!@(node -p "require(\'addon-tools-raub\').include")',
	],
```


## utils.js

JS utils for Node.js modules and addons.

```
const utils = require('addon-tools-raub/utils');
```


Example of `cpbin` usage in **package.json :: scripts**:

```
	"build-all": "cd src && node-gyp rebuild -j max --silent && node -e \"require('addon-tools-raub/utils').cpbin('segfault')\" && cd ..",
	"build-only": "cd src && node-gyp build -j max --silent && node -e \"require('addon-tools-raub/utils').cpbin('segfault')\" && cd ..",
```


See the [TypeScript definitions](/utils.d.ts) with comments.
