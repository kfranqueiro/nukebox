define([
	'dojo/_base/declare',
	'dojo/on',
	'dojo/Stateful'
], function (declare, on, Stateful) {
	// TODO: This should eventually present custom controls instead of just using the audio element's.
	return declare(Stateful, {
		constructor: function () {
			var node = this.domNode = this.audioNode = document.createElement('audio');
			node.className = 'PlayerControls';
			node.controls = true;
		},

		startup: function () {
		},

		_sourceGetter: function () {
			return this.audioNode.src;
		},

		_sourceSetter: function (source) {
			this.audioNode.src = source;
		},

		_isPausedGetter: function () {
			return this.audioNode.paused;
		},

		on: function (type, handler) {
			return on(this.audioNode, type, handler);
		},

		pause: function () {
			this.audioNode.pause();
		},

		play: function () {
			this.audioNode.play();
		},

		seek: function (time) {
			this.audioNode.currentTime = time;
		},

		seekIncrement: function (increment) {
			this.audioNode.currentTime += increment;
		},

		stop: function () {
			this.audioNode.pause();
			this.seek(0);
		}
	});
});
