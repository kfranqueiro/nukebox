define([
	'dojo/_base/declare',
	'dojo/on'
], function (declare, on) {
	/**
	 * Makes a list/grid's content area a drop zone for files.
	 */
	return declare(null, {
		postCreate: function () {
			var self = this;
			this.inherited(arguments);

			on(this.contentNode, 'dragover', function (event) {
				event.preventDefault();
				event.dataTransfer.dropEffect = 'copy';
			});
			on(this.contentNode, 'drop', function (event) {
				event.preventDefault();
				var files = event.dataTransfer.files;
				if (files && files.length) {
					self._onFilesDrop(files);
				}
			});
		},

		/**
		 * Method intended to be overridden with specific logic for processing dropped files.
		 * @param {FileList} files Files dropped into the content area
		 */
		_onFilesDrop: function (/* files */) {}
	});
});
