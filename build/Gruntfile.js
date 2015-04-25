module.exports = function (grunt) {
	var electronVersion = '0.25.1';
	var appVersion = grunt.file.readJSON('../package.json').version;

	grunt.loadNpmTasks('grunt-download-electron');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadTasks('tasks');

	// Note: Paths below generally all start with .. since this file is within the build subfolder.
	// Normally, Electron apps promote calling grunt.file.setBase to avoid this, but...
	// https://github.com/gruntjs/grunt-contrib-watch/issues/426

	grunt.initConfig({
		'download-electron': {
			version: electronVersion,
			outputDir: '../electron'
		},

		'rename-electron': {
			name: 'Nukebox'
		},

		replace: {
			plist: {
				src: [
					'../electron/Nukebox.app/Contents/Info.plist',
					'../electron/Nukebox.app/Contents/Frameworks/*Helper*/Contents/Info.plist'
				],
				overwrite: true,
				replacements: [ {
					from: 'Electron',
					to: 'Nukebox'
				}, {
					from: electronVersion,
					to: appVersion
				} ]
			}
		},

		clean: {
			options: {
				force: true // Unfortunately necessary due to this being under the build subfolder
			},
			css: {
				src: [ '../src/resources/**/*.css' ]
			}
		},

		stylus: {
			options: {
				compress: true,
				'resolve url': true
			},

			compile: {
				files: {
					'../src/resources/nukebox.css': '../src/resources/nukebox.styl',
					'../src/resources/skins/default.css': '../src/resources/skins/default.styl'
				}
			}
		},

		watch: {
			stylus: {
				files: [ '../src/resources/**/*.styl' ],
				tasks: [ 'stylus' ]
			}
		}
	});

	grunt.registerTask('default', [ 'stylus', 'watch' ]);
	grunt.registerTask('build', [ 'download-electron', 'rename-electron', 'replace', 'stylus' ]);
};
