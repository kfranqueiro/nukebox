// Based on logic in https://github.com/mafintosh/electron-prebuilt,
// reorganized as a Grunt task.

var extract = require('extract-zip');
var download = require('electron-download');

module.exports = function (grunt) {
	grunt.registerTask('electron-download', 'Download a version of Electron for the host platform.', function () {
		var done = this.async();
		var options = this.options();

		this.requiresConfig(this.name + '.options.out', this.name + '.options.version');

		require('fs').readFile(require('path').join(options.out, 'version'), {
			encoding: 'utf8'
		}, function (error, version) {
			if (error || version && version.slice(1) !== options.version) {
				if (!error) {
					// A different version was previously downloaded/extracted
					grunt.file.delete(options.out);
				}

				download({ version: options.version }, function (error, zipPath) {
					if (error) {
						return done(error);
					}

					extract(zipPath, { dir: options.out }, done);
				});
			}
			else {
				done(error);
			}
		});
	});
};
