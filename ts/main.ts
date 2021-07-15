import {app, BrowserWindow, ipcMain} from 'electron';
import * as fs from 'fs'
import * as path from 'path'
import * as Store from 'electron-store'

let window:BrowserWindow;
const store = new Store();
var imagePath = path.join(__dirname,'..','img','ship.png'); 
console.log(imagePath)
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
        },
        icon: imagePath
    })

    window.setIcon(path.join(__dirname, '..','img','ship.png'));
    window.loadFile('html/main-menu.html')

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

ipcMain.handle('new-game', () => {
    window.loadFile('html/game.html')
    var message = 'game.html loaded'
    return message
})

ipcMain.handle('options', () => {
    window.loadFile('html/options.html')
    var message = 'options.html loaded'
    return message
})

ipcMain.handle('main-menu', () => {
    window.loadFile('html/main-menu.html')
    var message = 'main-menu.html loaded'
    return message
})

ipcMain.handle('game-level-persist', async (event, gameLevel) => {
    store.set('gameLevel', gameLevel)
    var message = 'gameLevel:'+gameLevel+' stored'
    return message
})

ipcMain.handle('game-level-retrieve', async (event) => {
   var level = store.get('gameLevel')
   return level
})

