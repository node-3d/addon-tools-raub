# Addon Tools

This is a part of [Node3D](https://github.com/node-3d) project.

[![NPM](https://nodei.co/npm/addon-tools-raub.png?compact=true)](https://www.npmjs.com/package/addon-tools-raub)

[![Build Status](https://api.travis-ci.com/node-3d/addon-tools-raub.svg?branch=master)](https://travis-ci.com/node-3d/addon-tools-raub)
[![CodeFactor](https://www.codefactor.io/repository/github/node-3d/addon-tools-raub/badge)](https://www.codefactor.io/repository/github/node-3d/addon-tools-raub)

> npm i addon-tools-raub


## Synopsis

This module contains numerous helpers for Node.js **NAPI**
addons and dependency packages. In this file, helper scripts
are described. For details on **addon-tools.hpp** and some
additional snippets follow the links below.

**Go to**:

* [include/addon-tools.hpp](doc/addon-tools.md)
Macro shortcuts for C++ addons using NAPI.
* [Es5 Class Wrapping](doc/class-wrapping.md)
An alternative, lightweight native class-defining mechanism for addons.
* [Snippets](doc/snippets.md)
Some repetitive bits of code for addons.


## index.js

Main exports for cross-platform addon configuration.
* `paths(dir)` - function. Returns a set of platform dependent paths depending on
input `dir`.
	* `bin` - platform binary directory absolute path.
	* `include` - include directory for this `dir`.
* `include` - both `'addon-tools-raub'` and `'node-addon-api'` include paths.
Use with `node -p` through list context command expansion `<!@(...)`.
* `bin` - platform-dependent binary directory name.
* `platform` - platform name: `'windows', 'linux', 'osx'`.


## download.js

Downloads a file into the memory, **HTTP** or **HTTPS**.
`async WritableBuffer download(string url)` - accepts an **URL**, and
returns an in-memory buffer, when file is loaded.

Example use:
```
download(srcUrl).then(
	data => useData(data),
	err => emit('error', err)
);
// or
const data = await download(srcUrl);
useData(data);
```


## cpbin.js

Copies the addon binary from **src/build/Release** to the platform folder.
It is useful for development builds. Use it in your **src/package.json**:
```
	"scripts": {
		"build": "node-gyp rebuild && node -e \"require('addon-tools-raub/cpbin')('ADDON')\""
	},
```
Here ADDON should be replaced with the name of your addon, without `.node` extension.


## install.js

Downloads and unzips the platform specific binary for the calling package.
To use it, create a new script for your package, which may as well be named
**install.js**, with the following content:

```
'use strict';
const install = require('addon-tools-raub/install');
const prefix = 'https://github.com/USER/ADDON-NAME/releases/download';
const tag    = process.env.npm_package_config_install;
install(`${prefix}/${tag}`);
```

`prefix` - the constant base part of the download url.
`tag` - the version-dependent part of the url,
here `process.env.npm_package_config_install` is taken
([automatically](https://docs.npmjs.com/misc/config#per-package-config-settings))
from **package.json**:

```
	"config": {
		"install": "v2.0.0"
	},
	"scripts": {
		"postinstall": "node install"
	},
```


## writable-buffer.js

A [Writable](https://nodejs.org/api/stream.html#stream_writable_streams)
stream buffer, that is stored in-memory and can be fully
obtained when writing was finished. It is equivalent to stream-writing
a temporary file and then reading it into a Buffer.

Use `stream.get()` to obtain the data when writing was finished:
```
const stream = new WritableBuffer();
// ...
sourceStream.pipe(stream);
sourceStream.on('end', () => useData(stream.get()));
```
