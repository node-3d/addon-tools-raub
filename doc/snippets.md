# Snippets

## C++ Addon building

**NAPI** addons are built separately from the installation, so we shouldn't
put the file **binding.gyp** to the module root anymore. It is better to have a
separate folder with a separate **package.json**, **binding.gyp** and the sources.

A snippet for **src/package.json**:
```
{
	"name": "build",
	"version": "0.0.0",
	"private": true,
	"scripts": {
		"build": "node-gyp rebuild && node -e \"require('addon-tools-raub/cpbin')('ADDON')\""
	},
	"dependencies": {
		"addon-tools-raub": "6.0.0",
		"DEPS": "1.0.0"
	}
}
```

* `ADDON` - the name of this addon (and subsequently of its binary).
* `DEPS` - dependency package(s).



### Binary distribution

In **package.json** use the `"postinstall"` script to download the libraries.
For example the following structure might work. Note that **Addon Tools** will
append any given URL with `/${platform}.zip`

```
	"config" : {
		"install" : "v1.0.0"
	},
	"scripts": {
		"postinstall": "install",
	},
```

Here `config.install` is the tag name to download the binaries from.
To use it, create the *install.js* file in your addon:

```
const install = require('addon-tools-raub/install');
const prefix = 'https://github.com/USER/ADDON/releases/download';
const tag = process.env.npm_package_config_install;
install(`${prefix}/${tag}`);
```

**Addon Tools** will unzip the downloaded file into the platform binary
directory. E.g. on Windows it will be **bin-windows**.

* For a dependency package:
	
	Place the following piece of code in the `index.js` without changes. Method `paths()`
	is described [here](../README.md).
	```
	module.exports = require('addon-tools-raub').paths(__dirname);
	```
	
* For a compiled addon:
	
	Require it in your **index.js** from the platform-specific directory.
	```
	const { bin } = require('addon-tools-raub');
	const core = require(`./${bin}/ADDON`);
	```


Publishing binaries is done by attaching a zipped platform folder to the Github
release. Zip file must NOT contain platform folder as a subfolder, but rather
contain the final binaries. The tag of the release should be the same as in
`npm_package_config_install` - that is the way installer will find it.

> NOTE: You can publish your binaries to anywhere, not necessarily Github.
Just tweak **YOUR install.js** script as appropriate. The only limitation
from **Addon Tools** is that it should be a zipped set of files/folders.


### GYP Variables

```
	'variables': {
		'bin'          : '<!(node -p "require(\'addon-tools-raub\').bin")',
		'DEPS_include' : '<!(node -p "require(\'DEPS\').include")',
		'DEPS_bin'     : '<!(node -p "require(\'DEPS\').bin")',
	},
```

* `bin` - the name of this platform's binary directory, e.g. *bin-linux*.
* `DEPS_include` - the include folder for some dependency package.
* `DEPS_bin` - the binary folder for some dependency package.



### Include directories

```
	'include_dirs' : [
		'<!@(node -p "require(\'addon-tools-raub\').include")',
		'<(DEPS_include)',
	],
```

The former contains both the path to include **Addon Tools** and the one for
**Napi** (which is preinstalled with Addon Tools). The latter can be any other
dependency include path(s).


<details>

<summary><b>See a snipped for src/binding.gyp here</b></summary>

* Assume `DEPS` is the name of an Addon Tools compliant dependency module.
* Assume `ADDON` is the name of this addon's resulting binary.
* Assume C++ code goes to `cpp` subdirectory.

```
{
	'variables': {
		'bin'          : '<!(node -p "require(\'addon-tools-raub\').bin")',
		'DEPS_include' : '<!(node -p "require(\'DEPS\').include")',
		'DEPS_bin'     : '<!(node -p "require(\'DEPS\').bin")',
	},
	'targets': [
		{
			'target_name' : 'bullet',
			'sources' : [
				'cpp/addon.cpp',
			],
			'include_dirs' : [
				'<!@(node -p "require(\'addon-tools-raub\').include")',
				'<(DEPS_include)',
			],
			'library_dirs' : [ '<(DEPS_bin)' ],
			'libraries'    : [ '-lDEPS' ],
			'cflags!': ['-fno-exceptions'],
			'cflags_cc!': ['-fno-exceptions'],
			'conditions': [
				
				[
					'OS=="linux"',
					{
						'libraries': [
							"-Wl,-rpath,'$$ORIGIN'",
							"-Wl,-rpath,'$$ORIGIN/../node_modules/DEPS/<(bin)'",
							"-Wl,-rpath,'$$ORIGIN/../../DEPS/<(bin)'",
						],
						'defines': ['__linux__'],
					}
				],
				
				[
					'OS=="mac"',
					{
						'libraries': [
							'-Wl,-rpath,@loader_path',
							'-Wl,-rpath,@loader_path/../node_modules/DEPS/<(bin)',
							'-Wl,-rpath,@loader_path/../../DEPS/<(bin)',
						],
						'defines': ['__APPLE__'],
					}
				],
				
				[
					'OS=="win"',
					{
						'defines' : [
							'WIN32_LEAN_AND_MEAN',
							'VC_EXTRALEAN',
							'_WIN32',
						],
						'msvs_settings' : {
							'VCCLCompilerTool' : {
								'AdditionalOptions' : [
									'/GL', '/GF', '/EHsc', '/GS', '/Gy', '/GR-',
								]
							},
							'VCLinkerTool' : {
								'AdditionalOptions' : ['/RELEASE','/OPT:REF','/OPT:ICF','/LTCG'],
							},
						},
					},
				],
				
			],
		},
	]
}
```

</details>
