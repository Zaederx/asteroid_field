import {app, BrowserWindow, ipcMain} from 'electron';

let window:BrowserWindow;

function createWindow() {
    window = new BrowserWindow({
        width:921,
        height:600,
        minWidth: 921,
        minHeight: 468,
        webPreferences: {
            // worldSafeExecuteJavaScript: true ,
            contextIsolation: false,//otherwise "WorldSafe".. message still appears
            nodeIntegration: true //whether you can access node methods - e.g. requires, anywhere in the app's js
            // preload: path.join(__dirname, "preload.js")
        }
    })

    window.loadFile('html/game.html')

    if (process.env.NODE_ENV == 'dev-tools'){
        window.webContents.openDevTools()
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', ()=> {
    if(process.env.NODE_ENV === 'test') {
        app.quit()
    }
    else if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})