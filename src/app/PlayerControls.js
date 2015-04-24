define([
	'dojo/_base/declare',
	'dojo/dom-construct',
	'dojo/on',
	'dojo/Stateful',
	'./util',
	'dojo/text!./templates/PlayerControls.html'
], function (declare, domConstruct, on, Stateful, util, template) {
	return declare(Stateful, {
		baseClass: 'PlayerControls',

		seekIncrement: 5,

		constructor: function () {
			var node = this.domNode = domConstruct.toDom(template);
			node.className = this.baseClass;
			var audioNode = this.audioNode = document.createElement('audio');
			node.appendChild(audioNode);
			this._attachNodes();
			this._attachEvents();
		},

		_attachMap: {
			'controls-previous': 'previous',
			'controls-rewind': 'rewind',
			'controls-stop': 'stop',
			'controls-play': 'play',
			'controls-fastforward': 'fastForward',
			'controls-next': 'next',
			'seek-slider': 'seek',
			'time-elapsed': 'timeElapsed',
			'volume-unmuted': 'mute',
			'volume-slider': 'volume'
		},

		_attachNodes: function () {
			Object.keys(this._attachMap).forEach(function (key) {
				this[this._attachMap[key] + 'Node'] =
					this.domNode.querySelector('.' + this.baseClass + '-' + key);
			}, this);
		},

		_attachEvents: function () {
			var self = this;

			function onClickBind(attachPoint, methodName) {
				on(self[attachPoint], 'click', self[methodName].bind(self));
			}

			function onClickEmit(attachPoint, type) {
				on(self[attachPoint], 'click', function () {
					self.emit({
						bubbles: true,
						cancelable: false,
						target: self.domNode,
						type: type
					});
				});
			}

			onClickEmit('previousNode', 'previous');
			onClickEmit('nextNode', 'next');

			onClickBind('rewindNode', 'rewind');
			onClickBind('stopNode', 'stop');
			onClickBind('playNode', 'togglePlay');
			onClickBind('fastForwardNode', 'fastForward');
			onClickBind('muteNode', '_toggleMute');
			on(this.audioNode, 'timeupdate', this._updateTime.bind(this));

			on(this.seekNode, 'mousedown', function () {
				// Set flag to prevent seek bar from moving due to elapsed time while user is dragging it
				self._isUserSeeking = true;
				on.once(document.documentElement, 'mouseup', function () {
					self._isUserSeeking = false;
				});
			});
			on(this.seekNode, 'change', function () {
				self.seek(self.seekNode.value);
			});
			on(this.volumeNode, 'change', function () {
				self.set('volume', self.volumeNode.value / 100);
			});

			// Forward ended events for grid to handle for automatic track advance
			on(this.audioNode, 'ended', function (event) {
				self.emit(event);
			});
		},

		startup: function () {
		},

		_sourceGetter: function () {
			return this.audioNode.src;
		},

		_sourceSetter: function (source) {
			var audioNode = this.audioNode;
			var seekNode = this.seekNode;

			this._canplaythroughHandle && this._canplaythroughHandle.remove();
			audioNode.src = source;
			seekNode.max = 0;

			this._canplaythroughHandle = on.once(audioNode, 'canplaythrough', function () {
				seekNode.max = audioNode.duration;
			});
		},

		_volumeGetter: function () {
			return this.audioNode.volume;
		},

		_volumeSetter: function (volume) {
			this.audioNode.volume = volume;
			this.volumeNode.value = Math.round(volume * 100);

			this.muteNode.classList.remove('PlayerControls-volume-' + (volume ? '' : 'un') + 'muted');
			this.muteNode.classList.add('PlayerControls-volume-' + (volume ? 'un' : '') + 'muted');
		},

		_isPausedGetter: function () {
			return this.audioNode.paused;
		},

		on: function (type, handler) {
			return on(this.domNode, type, handler);
		},

		emit: function (event) {
			return on.emit(this.domNode, event.type, event);
		},

		_updateTime: function () {
			var time = Math.round(this.audioNode.currentTime);
			if (!this._isUserSeeking) {
				this.seekNode.value = time;
			}
			this.timeElapsedNode.innerHTML = util.readableTime(time);
		},

		_toggleMute: function () {
			this.mute(this.audioNode.volume > 0);
		},

		mute: function (mute) {
			if (mute !== false) {
				this._previousVolume = this.audioNode.volume;
				this.set('volume', 0);
				this.muteNode.classList.remove('PlayerControls-volume-unmuted');
				this.muteNode.classList.add('PlayerControls-volume-muted');
			}
			else {
				this.set('volume', this._previousVolume);
			}
		},

		fastForward: function () {
			this.seekByIncrement(this.seekIncrement);
		},

		rewind: function () {
			this.seekByIncrement(-this.seekIncrement);
		},

		pause: function () {
			this.audioNode.pause();
			this.playNode.classList.remove('PlayerControls-controls-pause');
			this.playNode.classList.add('PlayerControls-controls-play');
		},

		play: function () {
			if (this.audioNode.networkState) {
				this.audioNode.play();
				this.playNode.classList.remove('PlayerControls-controls-play');
				this.playNode.classList.add('PlayerControls-controls-pause');
			}
		},

		togglePlay: function () {
			var paused = this.audioNode.paused;
			this[paused ? 'play' : 'pause']();
		},

		seek: function (time) {
			this.audioNode.currentTime = time;
		},

		seekByIncrement: function (increment) {
			this.seek(this.audioNode.currentTime + (increment || this.seekIncrement));
		},

		stop: function () {
			this.pause();
			this.seek(0);
		}
	});
});
