var fs = require('fs');
var path = require('path');

function rename(basePath, oldName, newName) {
	fs.renameSync(path.resolve(basePath, oldName), path.join(basePath, newName));
}

module.exports = function (grunt) {
	grunt.registerTask('rename-electron', 'Renames the electron app/binary.', function () {
		var originalName = 'Electron';
		var lcOriginalName = originalName.toLowerCase();
		var name = grunt.config.get('rename-electron').name;
		var lcName = name.toLowerCase();
		var outputDir = grunt.config.get('download-electron').outputDir;

		// Mac OS X (rename ALL the things!)
		grunt.file.expand({
			cwd: outputDir
		}, [
			'**/MacOS/Electron Helper*',
			'**/MacOS/Electron',
			'**/Electron Helper*.app',
			'**/Electron.app'
		]).forEach(function (filename) {
			var destination = path.join(path.dirname(filename),
				path.basename(filename).replace(originalName, name));
			rename(outputDir, filename, destination);
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
};
