{
	'targets': [
		{
			'target_name': 'test',
			'type': 'executable',
			'sources': [
				'test.cpp',
			],
			'include_dirs': [
				'<!@(node -p "require(\'..\').include")',
			],
		},
	],
}
