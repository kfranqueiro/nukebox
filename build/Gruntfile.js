var os = require('os');

module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-build-atom-shell');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.file.setBase(require('path').resolve('..'));

	grunt.initConfig({
		'build-atom-shell': {
			tag: 'v0.22.2',
			nodeVersion: '0.22.0',
			buildDir: os.tmpdir() + '/atom-shell',
			projectName: 'nukebox',
			productName: 'Nukebox'
		},

		clean: {
			css: {
				src: [ 'src/resources/**/*.css' ]
			}
		},

		stylus: {
			options: {
				compress: true,
				'resolve url': true,
				use: [ require('nib') ]
			},

			compile: {
				files: { 'src/resources/nukebox.css': 'src/resources/nukebox.styl' }
			}
		},

		watch: {
			stylus: {
				files: [ 'src/resources/**/*.styl' ],
				tasks: [ 'stylus' ]
			}
		}
	});

	grunt.registerTask('default', [ 'stylus', 'watch' ]);
	grunt.registerTask('build', [ 'build-atom-shell', 'stylus' ]);
};
