{
	'targets': [
		{
			'target_name': 'test',
			'sources': [
				'test.cpp',
			],
			'defines': [
				'UNICODE', '_UNICODE'
			],
			'include_dirs': [
				'<!@(node -p "require(\'..\').include")',
			],
			'cflags_cc': ['-std=c++17'],
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
  						'OTHER_CFLAGS': ['-std=c++17'],
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
