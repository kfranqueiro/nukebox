module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.loadTasks('tasks');

	grunt.initConfig({
		appName: 'Nukebox',
		electronVersion: '0.36.7',

		'electron-download': {
			options: {
				out: 'electron',
				version: '<%= electronVersion %>'
			}
		},

		'electron-packager': {
			release: {
				options: {
					name: '<%= appName %>',
					dir: 'src',
					out: 'dist',
					asar: true,
					prune: true,
					version: '<%= electronVersion %>',
					arch: 'all',
					platform: 'all'
				}
			}
		},

		clean: {
			css: {
				src: [ 'src/resources/**/*.css' ]
			},
			electron: {
				src: [ 'electron' ]
			},
			release: {
				src: [ 'dist' ]
			}
		},

		stylus: {
			options: {
				compress: true,
				'resolve url': true
			},

			compile: {
				files: {
					'src/resources/nukebox.css': 'src/resources/nukebox.styl',
					'src/resources/skins/default.css': 'src/resources/skins/default.styl'
				}
			}
		},

		watch: {
			options: {
				atBegin: true
			},

			stylus: {
				files: [ 'src/resources/**/*.styl' ],
				tasks: [ 'stylus' ]
			}
		}
	});

	grunt.registerTask('default', [ 'watch' ]);
	grunt.registerTask('dev', [ 'electron-download', 'stylus' ]);
	grunt.registerTask('release', [ 'stylus', 'clean:release', 'electron-packager' ]);
};
