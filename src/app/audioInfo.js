define([
	'dojo/_base/lang',
	'dojo/Deferred',
	'dojo/on',
	'id3',
	'./util'
], function (lang, Deferred, on, id3, util) {
	id3 = util.promisify(id3);

	/**
	 * Returns information on the given File, including tags and song length.
	 * @param  {File} file File to process
	 * @return {Promise} Promise resolving to an object with artist, album, title, and length
	 */
	return function (file) {
		return id3(file).then(function (tags) {
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

			return dfd.promise;
		});
	}
});
