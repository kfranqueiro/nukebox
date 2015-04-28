module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-download-electron');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadTasks('tasks');

	// Note: Paths below generally all start with .. since this file is within the build subfolder.
	// Normally, Electron apps promote calling grunt.file.setBase to avoid this, but...
	// https://github.com/gruntjs/grunt-contrib-watch/issues/426

	grunt.initConfig({
		appVersion: grunt.file.readJSON('../package.json').version,
		electronVersion: '0.25.1',

		'download-electron': {
			version: '<%= electronVersion %>',
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
					from: '<%= electronVersion %>',
					to: '<%= appVersion %>'
				} ]
			}
		},

		asar: {
			outputDir: '../electron'
		},

		clean: {
			options: {
				force: true // Unfortunately necessary due to this being under the build subfolder
			},
			css: {
				src: [ '../src/resources/**/*.css' ]
			},
			electron: {
				src: [ '../electron' ]
			},
			release: {
				// Remove file with Electron's version number
				src: [ '../electron/version' ]
			}
		},

		copy: {
			release: {
				// Overwrite Electron's LICENSE with this repo's
				src: '../LICENSE',
				dest: '../electron/LICENSE'
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
	grunt.registerTask('release', [ 'build', 'asar', 'clean:release', 'copy:release' ]);
};
