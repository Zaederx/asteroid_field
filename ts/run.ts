import { Game } from '../js/game'

window.onload = () => {
    var canvas1 = document.getElementById('canvas1') as HTMLCanvasElement
    var canvas2 = document.getElementById('canvas2') as HTMLCanvasElement
    var canvas3 = document.getElementById('canvas3') as HTMLCanvasElement
    
    canvas1!.width = 918
    canvas1.height = 570
    canvas2.width = 918
    canvas2.height = 570
    canvas3.width = 918
    canvas3.height = 570

    var game = new Game(0,canvas1,canvas2,canvas3)
    game.runGame()
}
