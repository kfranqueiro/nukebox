define([
	'dojo/_base/lang',
	'dojo/Deferred',
	'dojo/on',
	'./util'
], function (lang, Deferred, on, util) {
	var mm = util.promisify(require('musicmetadata'));

	/**
	 * Returns information on the given File, including tags and song length.
	 * @param  {File} file File to process
	 * @return {Promise} Promise resolving to an object with artist, album, title, and length
	 */
	return function (file) {
		return mm(require('fs').createReadStream(file.path)).then(function (tags) {
			return tags;
		}, function () {
			return {};
		}).then(function (tags) {
			var dfd = new Deferred();

			var audioElement = document.createElement('audio');
			audioElement.src = file.path;
			document.body.appendChild(audioElement);

			on.once(audioElement, 'canplaythrough', function () {
				dfd.resolve(lang.mixin({
					length: util.readableTime(audioElement.duration)
				}, tags));
				document.body.removeChild(audioElement);
			});
			on.once(audioElement, 'error', function (event) {
				dfd.reject(event);
				document.body.removeChild(audioElement);
			});

			return dfd.promise;
		});
	};
});
