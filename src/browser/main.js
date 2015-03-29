var app = require('app');
var BrowserWindow = require('browser-window');
var Menu = require('menu');

var menu = require('./menu');

var mainWindow;

app.on('window-all-closed', function () {
	app.quit();
});

app.on('ready', function () {
	mainWindow = new BrowserWindow({ width: 800, height: 600 });

	Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
	mainWindow.loadUrl('file://' + require('path').resolve(__dirname, '..', 'index.html'));

	mainWindow.on('closed', function () {
		mainWindow = null;
	});
});
