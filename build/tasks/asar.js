var asar = require('asar');
var path = require('path');

module.exports = function (grunt) {
	grunt.registerTask('asar', 'Creates an asar of the application and puts it in the target folder.', function () {
		this.requiresConfig(this.name + '.outputDir');

		var done = this.async();
		var outputDir = grunt.config.get(this.name + '.outputDir');
		var destination = grunt.file.exists(path.join(outputDir, 'Nukebox.app')) ?
			path.resolve(outputDir, 'Nukebox.app', 'Contents', 'Resources', 'app.asar') :
			path.resolve(outputDir, 'resources', 'app.asar');

		asar.createPackage('../src', destination, done);
	});
};
