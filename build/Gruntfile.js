var os = require('os');

module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-build-atom-shell');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Note: Paths below generally all start with .. since this file is within the build subfolder.
	// Normally, atom-shell apps promote calling grunt.file.setBase to avoid this, but...
	// https://github.com/gruntjs/grunt-contrib-watch/issues/426

	grunt.initConfig({
		'build-atom-shell': {
			tag: 'v0.22.2',
			nodeVersion: '0.22.0',
			buildDir: os.tmpdir() + '/atom-shell',
			targetDir: '../atom-shell',
			projectName: 'nukebox',
			productName: 'Nukebox'
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
				'resolve url': true,
				use: [ require('nib') ]
			},

			compile: {
				files: { '../src/resources/nukebox.css': '../src/resources/nukebox.styl' }
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
	grunt.registerTask('build', [ 'build-atom-shell', 'stylus' ]);
};
