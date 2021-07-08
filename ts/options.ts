import { ipcRenderer } from 'electron'
import * as game from '../js/game'
var easy_btn = document.querySelector('#easy') as HTMLDivElement
var medium_btn = document.querySelector('#medium') as HTMLDivElement
var hard_btn = document .querySelector('#hard') as HTMLDivElement

easy_btn.onclick = () => clickEasy()
medium_btn.onclick = () => clickMedium()
hard_btn.onclick = () => clickHard()

function clickEasy() {
    // game.setGameLevel(0)
    var message = ipcRenderer.invoke('new-game')
    console.log(message)
}
function clickMedium() {
    // game.setGameLevel(1)
    var message = ipcRenderer.invoke('new-game')
    console.log(message)
}
function clickHard() {
    // game.setGameLevel(2)
    var message = ipcRenderer.invoke('new-game')
    console.log(message)
}