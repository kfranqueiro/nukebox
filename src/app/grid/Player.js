define([
	'dojo/_base/declare',
	'dojo/on',
	'dojo/keys',
	'../util'
], function (declare, on, keys, util) {
	function dblclickOrEnter(target, handler) {
		return util.createCompositeHandle([
			on(target, 'dblclick', handler),
			on(target, util.createKeyExtensionEvent('keydown', keys.ENTER), handler)
		]);
	}

	/**
	 * dgrid mixin which interfaces with a PlayerControls instance.
	 */
	return declare(null, {
		playerControls: null,
		repeat: false,

		postCreate: function () {
			this.inherited(arguments);
			this.on(on.selector('.dgrid-content .dgrid-row', dblclickOrEnter), this._playTrackFromRow.bind(this));
			this.playerControls.on('ended', this.playNext.bind(this));
		},

		renderRow: function (item) {
			var row = this.inherited(arguments);
			if (item.playing) {
				row.classList.add('is-playing');
			}
			return row;
		},

		// Override highlightRow to not do anything
		// (since tracks get "updated" when they stop playing as well as when they start)
		highlightRow: function () {},

		_onNotification: function (rows, event) {
			this.inherited(arguments);
			var playingIndex = this._playingIndex;
			if (playingIndex == null) {
				return;
			}

			if (event.type === 'delete' && event.previousIndex <= playingIndex) {
				this._playingIndex--;
			}
			// TODO: need more logic here when reordering is added
		},

		/**
		 * Advances to the next track in the playlist and plays it.
		 */
		playNext: function () {
			var self = this;
			var next = this._playingIndex + 1;

			if (next >= this.get('total')) {
				if (this.repeat) {
					next = 0;
				}
				else {
					this._playingTrack = this._playingIndex = null;
					this.playerControls.stop();
					return;
				}
			}

			this.collection.fetchRange({ start: next, end: next + 1 }).then(function (results) {
				if (results[0]) {
					self._playTrack(results[0], next);
				}
			});
		},

		_playTrack: function (track, index) {
			if (this._playingTrack) {
				var collection = this.collection;
				// Update status of track, if it hasn't been removed since it started playing
				collection.get(collection.getIdentity(this._playingTrack)).then(function (playingTrack) {
					if (!playingTrack) {
						return;
					}
					playingTrack.playing = false;
					collection.put(playingTrack);
				});
			}

			this._playingIndex = index;
			this._playingTrack = track;
			this.playerControls.set('source', track.path);
			this.playerControls.play();
			track.playing = true;
			this.collection.put(track);
		},

		_playTrackFromRow: function (target) {
			var row = this.row(target);
			this._playTrack(row.data, row.element.rowIndex);
		}
	});
});
