define([
	'dojo/on',
	'dojo/keys',
	'dojo/query'
], function (on, keys) {
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
		}
	};

	return util;
});
