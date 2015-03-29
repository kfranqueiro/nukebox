define([
	'dojo/_base/lang',
	'dojo/on',
	'dojo/keys',
	'./PlayerControls',
	'./SongsGrid'
], function (lang, on, keys, PlayerControls, SongsGrid) {
	var controls = new PlayerControls();
	var grid = new SongsGrid({
		playerControls: controls
	});

	[ controls, grid ].forEach(function (widget) {
		document.body.appendChild(widget.domNode);
		widget.startup();
	});

	var keymap = {};
	keymap[keys.LEFT_ARROW] = lang.hitch(controls, 'seekIncrement', -5);
	keymap[keys.RIGHT_ARROW] = lang.hitch(controls, 'seekIncrement', 5);
	keymap[keys.ESCAPE] = lang.hitch(controls, 'stop');
	keymap[keys.SPACE] = function () {
		controls[controls.get('isPaused') ? 'play' : 'pause']();
	};

	on(document.body, 'keydown', function (event) {
		if (keymap[event.keyCode]) {
			event.preventDefault();
			keymap[event.keyCode]();
		}
	});

	// Catch-all to prevent app from navigating to a dropped file
	on(document.body, 'dragover, drop', function (event) {
		event.preventDefault();
	})
});
