{
	'targets': [{
		'target_name': 'test',
		'sources': [
			'test.cpp',
		],
		'defines': ['UNICODE', '_UNICODE'],
		'cflags_cc': ['-std=c++17'],
		'include_dirs': [
			'<!@(node -p "require(\'..\').include")',
		],
		'conditions': [
			['OS=="linux"', {
				'defines': ['__linux__'],
			}],
			['OS=="mac"', {
				'MACOSX_DEPLOYMENT_TARGET': '10.9',
				'defines': ['__APPLE__'],
				'CLANG_CXX_LIBRARY': 'libc++',
				'OTHER_CFLAGS': ['-std=c++17'],
			}],
			['OS=="win"', {
				'defines' : ['WIN32_LEAN_AND_MEAN', 'VC_EXTRALEAN', '_WIN32'],
				'msvs_settings' : {
					'VCCLCompilerTool' : {
						'AdditionalOptions' : [
							'/O2','/Oy','/GL','/GF','/Gm-', '/std:c++17',
							'/EHsc','/MT','/GS','/Gy','/GR-','/Gd',
						]
					},
					'VCLinkerTool' : {
						'AdditionalOptions' : ['/OPT:REF','/OPT:ICF','/LTCG']
					},
				},
			}],
		],
	}],
}
