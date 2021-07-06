import { Debri } from "../js/debri"
import { Ship } from "../js/ship"

var canvas1 = document.getElementById('canvas1') as HTMLCanvasElement
var canvas2 = document.getElementById('canvas2') as HTMLCanvasElement
canvas1.width = 900
canvas1.height = 550
var context1 = canvas1.getContext('2d') as CanvasRenderingContext2D;
canvas2.width = 900
canvas2.height = 550
context1 ? context1.fillStyle = '#FF0000': console.error('context is null');


var context2 = canvas2.getContext('2d') as CanvasRenderingContext2D;
context1.fillStyle = 'rgba(0, 0, 200, 0.5)'

var gameRunning = true
var ship = new Ship(canvas1.width,canvas1.height)
var FPS = 3.5
var oneSecond = 1000 //ms

/**
 * Updates canvas one - clearing screen for next repaint/drawing
 */
function updateCanvas1() {
    context1?.clearRect(0,0,canvas1!.width,canvas1!.height)
    // context2?.clearRect(0,0,canvas2!.width,canvas2!.height)
    ship.drawShip(context1)
    updateShipScore()
    if (ship.health <= 0) {
        gameOver()
    }
    if(gameRunning) {
        requestAnimationFrame(updateCanvas1)
    }
}

/**
 * Enables ship scores
 */
function enableShipSteering() {
    ship.steerShip()
}

/**
 * Update Ship Score
 */
function updateShipScore() {
    var text = "Ship Health:"+ship.health
    var x = 20
    var y = 30
    context1.font = '30px Arial'
    context1.fillText(text,x,y)
}

/**
 * Clear Canvas 2
 */
function clearCanvas2() {
    context2.clearRect(0,0, canvas2.width,canvas2.height)
}

/**
 * Update Canvas2 - clearing it for new drawings one a frame
 */
function updateCanvas2() {
    clearCanvas2()
    setTimeout(() => {
        if (gameRunning) {
            updateCanvas2()
        }
    },oneSecond/FPS) // how often debri canvas is updated
}

/**
 * Generates debri on screen
 */
function generateDebri() {
    console.log('generating debri')
    var debri = new Debri(canvas2.width,canvas2.height)
    debri.drawDebri(context2)
    floatDebri(context2,debri)
    setTimeout(()=> {
        if(gameRunning) {
            generateDebri()
        }
    },1000)//how often debri is generated - in ms
}


/**
 * Returns the distance between a ship and debri
 * @param xDelta - the difference in x coordinates between ship and debri
 * @param yDelta - the difference in y coordinates between ship and debri
 * @returns 
 */
function pythagoras(xDelta:number,yDelta:number):number {
    var distance = (xDelta**2 + yDelta**2)**0.5
    return distance
}
/**
 * Floats debri on canvas along the x axis towards x=0 (left side of screen)
 * @param context CanvasRendinerContext2D
 * @param debri debri that is to be floated on canvas
 */
function floatDebri(context:CanvasRenderingContext2D,debri:Debri) {
    
    console.log('floating debri')
    var offscreen:number = (0 - debri.size)
    var x = ship.x_mid - debri.x_mid
    var y = ship.y_mid - debri.y_mid

    var distance = pythagoras(x,y)
    var allowedDistance = ship.radius + debri.radius
    if (debri.collision == false && distance <= allowedDistance) {
        console.log('Collision. Ship health:', ship.health)
        debri.collision = true
        if (ship.health <= 0) {
            gameOver()
        }
        if (debri.size < 25) {
            ship.health -= 2
        }
        else {
            ship.health -= 5
        }
        
    }
    if(debri.x_mid >= offscreen && gameRunning) {
        setTimeout(() => {
            debri.alterXPosition(-20)
            floatDebri(context,debri)
        },oneSecond/10)//how fast debri moves
        setTimeout(()=> {
            debri.drawDebri(context)

        }, oneSecond/100)//how often redrawn/painted on screen
    }
    
}

function gameOver() {
    gameRunning = false
}

/**
 * Calls all functions needed to run the game
 */
function runGame() {
    gameRunning = true
    // Game
    updateCanvas1()
    enableShipSteering()
    updateCanvas2()
    generateDebri()
}

//Play Game 
runGame()


