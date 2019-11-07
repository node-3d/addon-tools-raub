# Addon Tools

This is a part of [Node3D](https://github.com/node-3d) project.

[![NPM](https://nodei.co/npm/addon-tools-raub.png?compact=true)](https://www.npmjs.com/package/addon-tools-raub)

[![Build Status](https://api.travis-ci.com/node-3d/addon-tools-raub.svg?branch=master)](https://travis-ci.com/node-3d/addon-tools-raub)
[![CodeFactor](https://www.codefactor.io/repository/github/node-3d/addon-tools-raub/badge)](https://www.codefactor.io/repository/github/node-3d/addon-tools-raub)

> npm i addon-tools-raub


## Synopsis

Helpers for Node.js **NAPI** addons and dependency packages.

**Go to**:

[include/addon-tools.hpp](doc/addon-tools.md)
Macro shortcuts for NAPI.
[Es5 Class Wrapping](doc/class-wrapping.md)
An alternative, lightweight native class-defining mechanism for addons.
* [Script Helpers](doc/script-helpers.md)
Additional scripts for addon management.
* [Snippets](doc/snippets.md)
Some repetitive bits of code for addons.


## index.js

Main exports for cross-platform addon configuration. Exports:
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
