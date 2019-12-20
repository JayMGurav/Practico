const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

let win;
let originalAppName = 'Practico';
const appPath = app.getPath('exe');
const appDirname = path.dirname(appPath);
let appName = path.basename(appPath).split('.')[0];

if (originalAppName === appName) {
    const createWindow = () => {
        win = new BrowserWindow({
            width: 400,
            height: 400,
            webPreferences: {
                nodeIntegration: true
            },
            frame: false,
            hasShadow: true,
            transparent: true,
            maximizable: false,
            show: false
        });

        win.loadFile(`${__dirname}/index.html`);

        win.once('ready-to-show', () => {
            win.setMenu(null);
            console.log(appName);
            win.show();
        });

        win.on('closed', () => {
            win = null;
        });
    };
    app.on('ready', createWindow);

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        if (win === null) {
            createWindow();
        }
    });
} else {
    const createWindow = () => {
        let url =
            `http://${appName}.com` ||
            `http://${appName}.org` ||
            `http://${appName}.io` ||
            `http://${appName}.dev`;
        win = new BrowserWindow({
            width: 400,
            height: 600,
            webPreferences: {
                nodeIntegration: true
            },
            hasShadow: true,
            show: false,
            icon: `${url}/favicon.ico`
        });

        win.loadURL(url);

        win.once('ready-to-show', async () => {
            try {
                win.show();
                // await changName(appPath, `${appDirname}/Practico.exe`);
            } catch (err) {
                console.log(err);
            }
        });

        const changName = (one, two) => {
            return new Promise((resolve, reject) => {
                fs.rename(one, two, err => {
                    resolve('Done');
                    if (err) {
                        reject('Error :' + err.message);
                    }
                });
            });
        };

        win.on('closed', () => {
            win = null;
        });
    };
    app.on('ready', createWindow);

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        if (win === null) {
            createWindow();
        }
    });
}
