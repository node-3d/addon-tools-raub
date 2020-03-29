{
	'targets': [
		{
			'target_name': 'test',
			'sources': [
				'test.cpp',
			],
			'cflags!': ['-fno-exceptions'],
			'cflags_cc!': ['-fno-exceptions'],
			'include_dirs': [
				'<!@(node -p "require(\'..\').include")',
			],
			'conditions': [
				[
					'OS=="linux"',
					{
						'defines': ['__linux__'],
					}
				],
				[
					'OS=="mac"',
					{
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
									'/O2','/Oy','/GL','/GF','/Gm-',
									'/EHsc','/MT','/GS','/Gy','/GR-','/Gd',
								]
							},
							'VCLinkerTool' : {
								'AdditionalOptions' : ['/OPT:REF','/OPT:ICF','/LTCG']
							},
						},
					},
				],
			],
		},
	],
}
