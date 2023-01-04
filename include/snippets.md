# Snippets

## C++ Addon building

### Binary distribution

In **package.json** use the `"postinstall"` script to download the libraries.
For example the following structure might work. Note that **Addon Tools** will
append any given URL with `/${getPlatform()}.gz`

In **package.json**:

```
	"scripts": {
		"postinstall": "node install",
	},
	"dependencies": {
		"addon-tools-raub": "^7.0.0",
	},
	"devDependencies": {
		"node-addon-api": "^5.0.0"
	}
```

Create the **install.js** file, see `install` in [index.d.ts](/index.d.ts).
**Addon Tools** will unpack (using **tar**) the downloaded file into the platform binary
directory. E.g. on Windows it will be **bin-windows**.

* For a dependency package:
	
	Place the following piece of code into the `index.js` without changes.
	
	```
	module.exports = require('addon-tools-raub').getPaths(__dirname);
	```
	
* For a compiled addon:
	
	Require the `ADDON.node` in your **index.js** from the platform-specific directory.
	```
	const { getBin } = require('addon-tools-raub');
	const core = require(`./${getBin()}/ADDON`);
	```


Publishing binaries is done by attaching a GZIPped platform folder to a GitHub
release. Zip file must NOT contain platform folder as a subfolder, but rather
contain the final binaries. The tag of the release should be the same as in
**install.js**.

> NOTE: You can publish your binaries to anywhere, not necessarily GitHub.
Just tweak **YOUR install.js** script as appropriate. The only limitation
from **Addon Tools** is that it should be a GZIPped set of files/folders.


### GYP Variables

```
	'variables': {
		'bin': '<!(node -p "require(\'addon-tools-raub\').getBin()")',
		'DEPS_include': '<!(node -p "require(\'DEPS\').getInclude()")',
		'DEPS_bin': '<!(node -p "require(\'DEPS\').getBin()")',
	},
```

* `bin` - the name of this platform's binary directory, e.g. *bin-linux*.
* `DEPS_include` - the include folder for some dependency package.
* `DEPS_bin` - the binary folder for some dependency package.



### Include directories

```
	'include_dirs' : [
		'<!@(node -p "require(\'addon-tools-raub\').getInclude()")',
		'<(DEPS_include)',
	],
```

See example of a working [**binding.gyp** here](/test-addon/binding.gyp)
