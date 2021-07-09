import { app, ipcMain, ipcRenderer } from 'electron'
import * as run from '../js/run'
var easy_btn = document.querySelector('#easy') as HTMLDivElement
var medium_btn = document.querySelector('#medium') as HTMLDivElement
var hard_btn = document .querySelector('#hard') as HTMLDivElement

easy_btn.onclick = () => clickEasy()
medium_btn.onclick = () => clickMedium()
hard_btn.onclick = () => clickHard()

function clickEasy() {
    var gameLevel = 0
    ipcRenderer.invoke('game-level-persist',gameLevel)
    ipcRenderer.invoke('new-game')
}
function clickMedium() {
    var gameLevel = 1
    ipcRenderer.invoke('game-level-persist',gameLevel)
    ipcRenderer.invoke('new-game')
}
async function clickHard() {
    var gameLevel = 2
    ipcRenderer.invoke('game-level-persist',gameLevel)
    ipcRenderer.invoke('new-game')
}