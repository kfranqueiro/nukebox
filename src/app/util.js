define([
	'dojo/Deferred',
	'dojo/on',
	'dojo/string'
], function (Deferred, on, string) {
	var util = {
		/**
		 * Utility function for returning a removable handle which itself removes multiple handles.
		 * @param {Object[]} handles Handles (objects with a `remove` method) to be collectively removed later
		 */
		createCompositeHandle: function (handles) {
			return {
				remove: function () {
					handles.forEach(function (handle) {
						handle.remove();
					});
				}
			};
		},

		/**
		 * Creates an extension event which fires when a keyboard event is fired for a specific key.
		 * @param {string} type Type of keyboard event to listen for
		 * @param {number} code keyCode to fire the extension event for
		 */
		createKeyExtensionEvent: function (type, code) {
			return function (target, handler) {
				return on(target, type, function (event) {
					if (event.keyCode === code) {
						handler(event);
					}
				});
			};
		},

		readableTime: function (rawSeconds) {
			rawSeconds = Math.round(rawSeconds);
			var seconds = rawSeconds % 60;
			var minutes = Math.floor(rawSeconds / 60);
			var hours = 0;

			if (minutes > 60) {
				hours = Math.floor(minutes / 60);
				minutes = minutes % 60;
			}
			return (hours ? string.pad(hours, 2) + ':' : '') +
				string.pad(minutes, 2) + ':' + string.pad(seconds, 2);
		},

		/**
		 * Given a callback(err, res) style function, returns a function that returns a promise instead.
		 * @param {Function} func Original function to be wrapped
		 */
		promisify: function (func) {
			return function () {
				var dfd = new Deferred();
				func.apply(this, Array.prototype.slice.call(arguments).concat(function (err, res) {
					if (err) {
						dfd.reject(err);
					}
					else {
						dfd.resolve(res);
					}
				}));
				return dfd.promise;
			};
		}
	};

	return util;
});
