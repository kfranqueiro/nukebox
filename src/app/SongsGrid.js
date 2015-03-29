define([
	'dojo/_base/declare',
	'dojo/keys',
	'dgrid/OnDemandGrid',
	'dgrid/Keyboard',
	'dgrid/Selection',
	'dgrid/extensions/ColumnHider',
	'./grid/FileDrop',
	'./grid/Player',
	'dstore/Memory',
	'dstore/Trackable',
	'dojo/i18n!./nls/main'
], function (declare, keys, OnDemandGrid, Keyboard, Selection, ColumnHider, FileDrop, Player,
		Memory, Trackable, i18n) {

	// TODO: persistence
	var store = new (declare([ Memory, Trackable ]))();

	return declare([ OnDemandGrid, Keyboard, Selection, ColumnHider, FileDrop, Player ], {
		className: 'SongsGrid',
		cellNavigation: false,
		collection: store,
		columns: {
			title: {
				label: i18n.title,
				unhidable: true
			},
			artist: i18n.artist,
			album: i18n.album,
			length: i18n.length
		},
		noDataMessage: i18n.dropSongsHere,

		postCreate: function () {
			this.inherited(arguments);
			// dgrid/List only applies className from params; we already set it on the prototype
			this.set('className', this.className);

			var removeSong = this._removeSong.bind(this);
			this.addKeyHandler(keys.BACKSPACE, removeSong);
			this.addKeyHandler(keys.DELETE, removeSong);
		},

		_removeSong: function (event) {
			event.preventDefault();
			for (var id in this.selection) {
				this.collection.remove(id);
			}
		},

		_onFilesDrop: function (files) {
			for (var i = 0, length = files.length; i < length; i++) {
				store.add({
					path: files[i].path,
					// TODO: process metadata
					title: files[i].name.slice(0, -4),
					length: files[i].size
				});
			}
		}
	});
});
