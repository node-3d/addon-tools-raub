# Addon Tools

This is a part of [Node3D](https://github.com/node-3d) project.

[![NPM Package][npm]][npm-url]
[![NPM](https://nodei.co/npm/addon-tools-raub.png?compact=true)](https://www.npmjs.com/package/addon-tools-raub)
[![CodeFactor](https://www.codefactor.io/repository/github/node-3d/addon-tools-raub/badge)](https://www.codefactor.io/repository/github/node-3d/addon-tools-raub)

```
npm i addon-tools-raub
```

This module contains numerous helpers for Node.js **NAPI**
addons and dependency packages. On this page, helper scripts
are described. For details on **addon-tools.hpp** and some
additional snippets follow the links below.

**Docs**:

* [include/addon-tools.hpp](doc/addon-tools.md)
	
	Macro shortcuts for C++ addons using **NAPI**.
* [Es5 Class Wrapping](doc/class-wrapping.md)
	
	An alternative, lightweight native class-defining mechanism for addons.
* [Snippets](doc/snippets.md)
	
	Some repetitive bits of code for addons.


## index.js

> NOTE: peer dependency `node-addon-api` is required for this helper.

Main exports for cross-platform addon configuration.
See [TypeScript definitions](/index.d.ts) with comments.


## download.js

Downloads a file into the memory, **HTTP** or **HTTPS**.
See [TypeScript definitions](/download.d.ts) with comments.


## cpbin.js

Downloads a file into the memory, **HTTP** or **HTTPS**.
See [TypeScript definitions](/cpbin.d.ts) with comments.


## install.js

> NOTE: peer dependency `adm-zip` is required for this helper.

Downloads and unzips the platform specific binary for the calling package.
See [TypeScript definitions](/install.d.ts) with comments.


## writable-buffer.js

A [Writable](https://nodejs.org/api/stream.html#stream_writable_streams)
stream buffer.
See [TypeScript definitions](/writable-buffer.d.ts) with comments.


## utils.js

Async `fs` based helpers for common addon-related file operations.
See [TypeScript definitions](/utils.d.ts) with comments.
