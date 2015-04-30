var app = require('app');
var BrowserWindow = require('browser-window');

var menu = module.exports = [];
var isDarwin = process.platform === 'darwin';

menu.push(
	{
		label: '&File',
		submenu: [
			{
				label: '&Quit',
				accelerator: 'CmdOrCtrl+Q',
				click: function () {
					app.quit();
				}
			}
		]
	},
	{
		label: '&Options',
		submenu: [
			{
				label: '&Repeat',
				type: 'checkbox',
				accelerator: 'CmdOrCtrl+L',
				click: function (item) {
					var webContents = BrowserWindow.getFocusedWindow().webContents;
					webContents.send('option', 'repeat', item.checked);
				}
			}
		]
	}
);

if (process.env.NUKEBOX_DEBUG) {
	menu.push(
		{
			label: '&Debug',
			submenu: [
				{
					label: '&Reload',
					accelerator: 'CmdOrCtrl+R',
					click: function () {
						BrowserWindow.getFocusedWindow().reloadIgnoringCache();
					}
				},
				{
					label: 'Toggle &Developer Tools',
					accelerator: isDarwin ? 'Alt+Cmd+I' : 'Ctrl+Shift+I',
					click: function () {
						BrowserWindow.getFocusedWindow().toggleDevTools();
					}
				}
			]
		}
	);
}
