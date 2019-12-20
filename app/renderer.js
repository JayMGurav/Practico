const { remote } = require('electron');

const minimize = document.getElementById('minimize');
const close = document.getElementById('close');

minimize.addEventListener('click', () => {
    remote.BrowserWindow.getFocusedWindow().minimize();
});

close.addEventListener('click', () => {
    remote.BrowserWindow.getFocusedWindow().close();
});
