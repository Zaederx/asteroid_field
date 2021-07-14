import { ipcRenderer } from 'electron'
var easy_btn = document.querySelector('#easy') as HTMLDivElement
var medium_btn = document.querySelector('#medium') as HTMLDivElement
var hard_btn = document .querySelector('#hard') as HTMLDivElement

easy_btn.onclick = async () => clickEasy()
medium_btn.onclick = async () => clickMedium()
hard_btn.onclick = async () => clickHard()

async function clickEasy() {
    var gameLevel = 0
    var levelMessage = await ipcRenderer.invoke('game-level-persist',gameLevel)
    console.log(levelMessage)
    ipcRenderer.invoke('new-game')
}
async function clickMedium() {
    var gameLevel = 1
    var levelMessage = await ipcRenderer.invoke('game-level-persist',gameLevel)
    console.log(levelMessage)
    ipcRenderer.invoke('new-game')
}
async function clickHard() {
    var gameLevel = 2
    var levelMessage = await ipcRenderer.invoke('game-level-persist',gameLevel)
    console.log(levelMessage)
    ipcRenderer.invoke('new-game')
}