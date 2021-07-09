import {app, BrowserWindow, ipcMain, ipcRenderer} from 'electron';
import * as fs from 'fs'
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

ipcMain.handle('game-level-persist', (event, gameLevel) => {
    persistGameLevel(gameLevel)
})

ipcMain.handle('game-level-retrieve', async (event, gameLevel) => {
   var level = await retrieveGameLevel()
   return level
})

function persistGameLevel(level:number) {
    var path = 'json/gameLevel.json'

    try{
        fs.promises.writeFile(path,level.toString())
    }
    catch(error) {
        console.error(error)
    }
    
}

async function retrieveGameLevel():Promise<number> {
    var path = 'json/gameLevel.json'
    var gameLevel:number = 0;
    try{
        var data:string = await fs.promises.readFile(path,'utf-8')
        gameLevel = parseInt(data)
        return gameLevel;
    }
    catch(error) {
        console.error(error)
    }
    return gameLevel
}

