{
	'variables': {
		'rm'     : '<!(node -e "require(\'addon-tools-raub\').rm()")',
		'cp'     : '<!(node -e "require(\'addon-tools-raub\').cp()")',
		'mkdir'  : '<!(node -e "require(\'addon-tools-raub\').mkdir()")',
		'binary' : '<!(node -e "require(\'addon-tools-raub\').bin()")',
	},
	'targets': [
		{
			'target_name': 'addon',
			'sources': [
				'cpp/bindings.cpp',
				'cpp/example.cpp',
			],
			'include_dirs': [
				'<!@(node -e "require(\'addon-tools-raub\').include()")',
			],
			'conditions'   : [
				[
					'OS=="win"',
					{
						'msvs_settings' : {
							'VCCLCompilerTool' : {
								'AdditionalOptions' : [
									'/O2','/Oy','/GL','/GF','/Gm-', '/Fm-',
									'/EHsc','/MT','/GS','/Gy','/GR-','/Gd',
								]
							},
							'VCLinkerTool' : {
								'AdditionalOptions' : ['/RELEASE','/OPT:REF','/OPT:ICF','/LTCG']
							},
						},
					},
				],
			],
		},
		{
			'target_name'  : 'make_directory',
			'type'         : 'none',
			'dependencies' : ['addon'],
			'actions'      : [{
				'action_name' : 'Directory created.',
				'inputs'      : [],
				'outputs'     : ['build'],
				'action': ['<(mkdir)', '-p', '<(binary)']
			}],
		},
		{
			'target_name'  : 'copy_binary',
			'type'         : 'none',
			'dependencies' : ['make_directory'],
			'actions'      : [{
				'action_name' : 'Module copied.',
				'inputs'      : [],
				'outputs'     : ['binary'],
				'action'      : ['<(cp)', 'build/Release/addon.node', '<(binary)/addon.node'],
			}],
		},
		{
			'target_name'  : 'remove_extras',
			'type'         : 'none',
			'dependencies' : ['copy_binary'],
			'actions'      : [{
				'action_name' : 'Build intermediates removed.',
				'inputs'      : [],
				'outputs'     : ['cpp'],
				'conditions'  : [
					[ 'OS=="linux"', { 'action' : [
						'rm',
						'<(module_root_dir)/build/Release/obj.target/addon/cpp/addon.o',
						'<(module_root_dir)/build/Release/obj.target/addon.node',
						'<(module_root_dir)/build/Release/addon.node'
					] } ],
					[ 'OS=="mac"', { 'action' : [
						'rm',
						'<(module_root_dir)/build/Release/obj.target/addon/cpp/bindings.o',
						'<(module_root_dir)/build/Release/obj.target/addon/cpp/example.o',
						'<(module_root_dir)/build/Release/addon.node'
					] } ],
					[ 'OS=="win"', { 'action' : [
						'<(rm)',
						'<(module_root_dir)/build/Release/addon.*',
						'<(module_root_dir)/build/Release/obj/addon/*.*'
					] } ],
				],
			}],
		},
	]
}
