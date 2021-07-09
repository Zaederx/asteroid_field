import { ipcRenderer } from "electron";
import { Game } from "../js/game";

declare var gameLevel:number;
window.onload = async () => {
    var levelStr:string = await ipcRenderer.invoke('game-level-retrieve')
    var level = parseInt(levelStr)
    console.warn('run - gameLevel:',level)
    var game = new Game(level)
    game.runGame()
}





