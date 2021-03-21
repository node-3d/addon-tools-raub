# Addon Tools

This is a part of [Node3D](https://github.com/node-3d) project.

[![NPM](https://nodei.co/npm/addon-tools-raub.png?compact=true)](https://www.npmjs.com/package/addon-tools-raub)
[![CodeFactor](https://www.codefactor.io/repository/github/node-3d/addon-tools-raub/badge)](https://www.codefactor.io/repository/github/node-3d/addon-tools-raub)

```
npm i addon-tools-raub
```


## Synopsis

This module contains numerous helpers for Node.js **NAPI**
addons and dependency packages. On this page, helper scripts
are described. For details on **addon-tools.hpp** and some
additional snippets follow the links below.

**Go to**:

* [include/addon-tools.hpp](doc/addon-tools.md)
	
	Macro shortcuts for C++ addons using **NAPI**.
* [Es5 Class Wrapping](doc/class-wrapping.md)
	
	An alternative, lightweight native class-defining mechanism for addons.
* [Snippets](doc/snippets.md)
	
	Some repetitive bits of code for addons.


## index.js

Main exports for cross-platform addon configuration.

```
export const paths: (dir: string) => Readonly<{
    bin: string;
    include: string;
}>;
export const bin: string;
export const platform: string;
export const include: string;
```

* `paths` - Returns a set of platform dependent paths depending on
input `dir`.
	* `bin` - platform binary directory absolute path.
	* `include` - include directory for this `dir`.
* `bin` - platform-dependent binary directory name.
* `platform` - platform name: `'windows', 'linux', 'osx'`.
* `include` - both `'addon-tools-raub'` and `'node-addon-api'` include paths.
Use with `node -p` through list context command expansion `<!@(...)`.


## download.js

Downloads a file into the memory, **HTTP** or **HTTPS**.

```
declare const download: (url: string) => Promise<Buffer>;
export default download;
```

Accepts an **URL**, and returns an in-memory file Buffer,
when the file is loaded. Use for small files, as the whole
file will be loaded into memory at once.

Example:
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

Copies the addon binary from `src/build/Release` to the platform folder.

```
declare const cpbin: (name: string) => Promise<void>;
export default cpbin;
```

It is useful for development builds. Use it in your **src/package.json**:
```
	"scripts": {
		"build": "node-gyp rebuild && node -e \"require('addon-tools-raub/cpbin')('ADDON')\""
	},
```
Here ADDON should be replaced with the name of your addon, without `.node` extension.


## install.js

Downloads and unzips the platform specific binary for the calling package.

```
declare const install: (folder: string) => void;
export default install;
```

To use it, create a new script for your package, which may as well be named
**install.js**, with the following content:

```
'use strict';
const install = require('addon-tools-raub/install');
const prefix = 'https://github.com/USER/ADDON-NAME/releases/download';
const tag    = process.env.npm_package_config_install;
install(`${prefix}/${tag}`);
```

* `prefix` - the constant base part of the download url.
* `tag` - the version-dependent part of the url,
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
a temporary file and then reading it into a `Buffer`.

```
import type { Writable } from 'stream';
export class WritableBuffer extends Writable {
    constructor();
    get(): Buffer;
};
```

Use `stream.get()` to obtain the data when writing was finished:
```
const stream = new WritableBuffer();
// ...
sourceStream.pipe(stream);
sourceStream.on('end', () => useData(stream.get()));
```


## utils.js

Async `fs` based helpers for common addon-related file operations.

```
import type { Stats } from 'fs';
export const read: (name: string) => Promise<string>;
export const write: (name: string, text: string) => Promise<void>;
export const copy: (src: string, dest: string) => Promise<void>;
export const exists: (name: string) => Promise<boolean>;
export const mkdir: (name: string) => Promise<void>;
export const stat: (name: string) => Promise<Stats>;
export const isDir: (name: string) => Promise<boolean>;
export const isFile: (name: string) => Promise<boolean>;
export const dirUp: (dir: string) => string;
export const ensuredir: (dir: string) => Promise<void>;
export const copysafe: (src: string, dest: string) => Promise<void>;
export const readdir: (src: string, dest: string) => Promise<ReadonlyArray<string>>;
export const subdirs: (name: string) => Promise<ReadonlyArray<string>>;
export const subfiles: (name: string) => Promise<ReadonlyArray<string>>;
export const traverse: (name: string, showDirs?: boolean) => Promise<ReadonlyArray<string>>;
export const copyall: (src: string, dest: string) => Promise<void>;
export const rmdir: (name: string) => Promise<void>;
export const rm: (name: string) => Promise<void>;
```

* `read` - (async) Reads a whole file to string, NOT A Buffer.
* `write` - (async) Write a file.
* `copy` - (async) Copy a file.
* `exists` - (async) Check if a file/folder exists.
* `mkdir` - (async) Create an empty folder.
* `stat` - (async) Get status on a file.
* `isDir` - (async) Check if the path is a folder.
* `isFile` - (async) Check if the path is a file.
* `dirUp` - Cut the path one folder up.
* `ensuredir` - (async) Like `mkdir -p`, makes sure a directory exists.
* `copysafe` - (async) Copy a file, `dest` folder is created if needed.
* `readdir` - (async) Get file/folder names of the 1st level.
* `subdirs` - (async) Get folder paths (concatenated with input) of the 1st level.
* `subfiles` - (async) Get file paths (concatenated with input) of the 1st level.
* `traverse` - (async) Get all nested files recursively.
* `copyall` - (async) Copy a folder with all the contained files.
* `rmdir` - (async) Like `rm -rf`, removes everything recursively.
* `rm` - (async) Remove a file. Must be a file, not a folder. Just `fs.unlink`.
