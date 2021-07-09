import { app, ipcMain, ipcRenderer } from "electron"

var new_game_btn = document.querySelector('#new-game-btn') as HTMLDivElement
var options_btn = document.querySelector('#options-btn') as HTMLDivElement

new_game_btn ? new_game_btn.onclick = () => clickNewGameBtn() : console.log('new_game_btn is null')

options_btn ? options_btn.onclick = () => clickOptionsBtn() : console.log('options_btn is null')


function clickNewGameBtn() {
    var message = ipcRenderer.invoke('new-game')
    console.log(message)
}

function clickOptionsBtn() {
    var message = ipcRenderer.invoke('options')
    console.log(message)
}
