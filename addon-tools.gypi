{
	'variables': {
		'_rd' : '<!(node -e "console.log(require(\'node-addon-tools-raub\')._rd)")',
		'_del' : '<!(node -e "console.log(require(\'node-addon-tools-raub\')._del)")',
	},
	'target_defaults': {
		'include_dirs': [
			'<!(node -e "require(\'nan\')")',
			'<!(node -e "console.log(require(\'node-addon-tools-raub\').include)")',
		],
	},
}
