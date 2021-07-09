import { Game } from '../js/game'

window.onload = () => {
    // var canvas1 = document.getElementById('canvas1') as HTMLCanvasElement
    // var canvas2 = document.getElementById('canvas2') as HTMLCanvasElement
    // var canvas3 = document.getElementById('canvas3') as HTMLCanvasElement
    
    

    var game = new Game(0)
    game.runGame()
}
