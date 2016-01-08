// This is effectively the task from https://github.com/sindresorhus/grunt-electron
// maintained locally to reference an alternate electron-packager version

var electronPackager = require('electron-packager');

module.exports = function (grunt) {
	grunt.registerMultiTask('electron-packager', 'Package Electron apps', function () {
		electronPackager(this.options(), this.async());
	});
};
