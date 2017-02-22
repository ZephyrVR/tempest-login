const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const log = require('./res/js/console').setup();

let mainWindow;

log.info('Zephyr Login v' + app.getVersion());

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 400,
    minHeight: 600,
    resizable: false,
    icon: __dirname + '/res/img/icon.ico'
  });

  mainWindow.setMenu(null);

  mainWindow.loadURL('file://' + __dirname + '/index.html');
  
  mainWindow.on('closed', function () {
    mainWindow = null
  });
}

app.on('ready', function() {
  createWindow();
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', function (event) {
  log.info('Quitting Zephyr Login v' + app.getVersion());
  log.info('------------------------------------');
});