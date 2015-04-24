var fs = require('fs');
var path = require('path');

function rename(basePath, oldName, newName) {
	fs.renameSync(path.resolve(basePath, oldName), path.join(basePath, newName));
}

module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-download-electron');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-text-replace');

	grunt.registerTask('rename-electron', 'Renames the electron app/binary.', function () {
		var originalName = 'Electron';
		var lcOriginalName = originalName.toLowerCase();
		var name = grunt.config.get('rename-electron').name;
		var lcName = name.toLowerCase();
		var outputDir = grunt.config.get('download-electron').outputDir;

		// Mac OS X (rename ALL the things!)
		grunt.file.expand({
			cwd: '../electron'
		}, [
			'**/MacOS/Electron Helper*',
			'**/MacOS/Electron',
			'**/Electron Helper*.app',
			'**/Electron.app'
		]).forEach(function (filename) {
			var destination = path.join(path.dirname(filename),
				path.basename(filename).replace(originalName, name));
			rename('../electron', filename, destination);
		});

		if (grunt.file.exists(outputDir, lcOriginalName + '.exe')) {
			// Windows
			rename(outputDir, lcOriginalName + '.exe', lcName + '.exe');
		}
		else if (grunt.file.exists(outputDir, lcOriginalName)) {
			// Linux
			rename(outputDir, lcOriginalName, lcName);
		}
	});

	// Note: Paths below generally all start with .. since this file is within the build subfolder.
	// Normally, Electron apps promote calling grunt.file.setBase to avoid this, but...
	// https://github.com/gruntjs/grunt-contrib-watch/issues/426

	grunt.initConfig({
		'download-electron': {
			version: '0.25.1',
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
