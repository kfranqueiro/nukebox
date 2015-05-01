define([
	'dojo/_base/declare',
	'dojo/keys',
	'dgrid/OnDemandGrid',
	'dgrid/Keyboard',
	'dgrid/Selection',
	'dgrid/extensions/ColumnResizer',
	'dgrid/extensions/DnD',
	'./grid/FileDrop',
	'./grid/Player',
	'dstore/Memory',
	'dstore/Trackable',
	'./audioInfo',
	'dojo/i18n!./nls/main'
], function (declare, keys, OnDemandGrid, Keyboard, Selection, ColumnResizer, DnD, FileDrop, Player,
		Memory, Trackable, audioInfo, i18n) {

	// TODO: persistence
	var store = new (declare([ Memory, Trackable ]))();

	return declare([ OnDemandGrid, Keyboard, Selection, ColumnResizer, DnD, FileDrop, Player ], {
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

		renderRow: function (item) {
			var row = this.inherited(arguments);
			if (item.unplayable) {
				row.classList.add('is-unplayable');
			}
			return row;
		},

		_removeSong: function (event) {
			event.preventDefault();
			for (var id in this.selection) {
				this.collection.remove(id);
			}
		},

		_onFilesDrop: function (files, beforeId) {
			var tracks = [];

			for (var i = 0, length = files.length; i < length; i++) {
				tracks[i] = store.addSync({
					path: files[i].path,
					title: files[i].name.slice(0, -4)
				}, { beforeId: beforeId });
			}

			// Attempt to parse id3 metadata; update the store if successful
			tracks.forEach(function (track, i) {
				audioInfo(files[i]).then(function (info) {
					track.artist = info.artist;
					track.album = info.album;
					track.title = info.title || track.title;
					track.length = info.length;
				}, function () {
					track.unplayable = true;
				}).then(function () {
					store.put(track);
				});
			});
		}
	});
});
