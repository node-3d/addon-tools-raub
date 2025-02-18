{
	'targets': [{
		'target_name': 'test',
		'includes': ['../utils/common.gypi'],
		'sources': [
			'test.cpp',
		],
		'include_dirs': [
			'<!@(node -p "require(\'..\').getInclude()")',
		],
	}],
}
