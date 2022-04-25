const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
//    "electron-is-dev": "^2.0.0",

function createWindow() {
    const win = new BrowserWindow({
        minWidth:600,
        width: 600,
        maxWidth: 600,

        minHeight:600,
        height: 600,
        maxHeight: 600,

        center: true,
        resizable: false,
        autoHideMenuBar: true,

        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
        }
    });

    void win.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`);
    // Open the DevTools.
    if (isDev) {
         win.webContents.openDevTools({ mode: 'detach' });
     }
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
