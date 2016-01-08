var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var Menu = electron.Menu;

var menu = require('./menu');

var mainWindow;

app.on('window-all-closed', function () {
	app.quit();
});

app.on('ready', function () {
	mainWindow = new BrowserWindow({
		center: true,
		title: 'Nukebox',
		width: 800,
		height: 600
	});

	Menu.setApplicationMenu(Menu.buildFromTemplate(menu));
	mainWindow.loadURL('file://' + require('path').resolve(__dirname, '..', 'index.html'));

	mainWindow.on('closed', function () {
		mainWindow = null;
	});
});
