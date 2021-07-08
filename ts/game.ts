import { ipcRenderer } from "electron"
import { Debri } from "../js/debri"
import { Ship } from "../js/ship"
import { StopClock } from "../js/stopClock"

//canvases & contexts
var canvas1 = document.getElementById('canvas1') as HTMLCanvasElement
var canvas2 = document.getElementById('canvas2') as HTMLCanvasElement
var canvas3 = document.getElementById('canvas3') as HTMLCanvasElement

canvas1.width = 918
canvas1.height = 570
canvas2.width = 918
canvas2.height = 570
canvas3.width = 918
canvas3.height = 570



var context1 = canvas1.getContext('2d') as CanvasRenderingContext2D;//ship canvas
var context2 = canvas2.getContext('2d') as CanvasRenderingContext2D;//debri canvas
var context3 = canvas3.getContext('2d') as CanvasRenderingContext2D;//background canvas

//context1 fillStyle
context1.fillStyle = 'rgb(200, 200, 200)'

//Images
var backgroundImage = new Image()
backgroundImage.src = '../img/starry-background.svg'
var imageSrc = '../img/ship.svg'
var crashImgSrc = '../img/ship-crash.svg'

//Create new ship
var ship = new Ship(canvas1.width,canvas1.height,imageSrc,crashImgSrc)

//FramesPerSecond
var canvas2FPS = 4.5 //for debri canvas
var debriGenerationSpeed = 1000//every x milliseconds
var debriRepaintFPS = 20 //every x milliseconds
var oneSecond = 1000 //ms

//Game is Running & stopClock
var gameRunning = false
var clock = new StopClock()


/**
 * Draws the background image on canvas3
 */
function drawBackground() {
    //Add Background
    context3.drawImage(backgroundImage,0,0,canvas3.width,canvas3.height)
    requestAnimationFrame(drawBackground)
}

/**
 * Updates canvas1 - clearing screen for next repaint/drawing of ship and stopClock
 */
function updateCanvas1() {
    context1?.clearRect(0,0,canvas1.width,canvas1.height)
    context3.drawImage(backgroundImage,0,0,canvas3.width,canvas3.height)
    if(ship.crash == true){
        ship.drawShipCollision(context1)
    }
    else {
        ship.drawShip(context1)
    }
    displayTime(clock)
    updateShipScore()
    if (ship.health <= 0) {
        gameOver()
    }
    if(gameRunning) {
        requestAnimationFrame(updateCanvas1)
    }
}

/**
 * Displays stopClock time on canvas1
 * @param clock stopClock to be displayed
 */
async function displayTime(clock:StopClock) {
    var text = clock.getClockDisplay()
    var x = 500
    var y = 30
    context1.font = '30px Arial'
    context1.fillText(text,x,y)
}

/**
 * Update Ship Score on canvas1
 */
function updateShipScore() {
    var text = "Ship Health:"+ship.health
    var x = 20
    var y = 30
    context1.font = '30px Arial'
    context1.fillText(text,x,y)
}

/**
 * Clears canvas2
 */
function clearCanvas2() {
    context2.clearRect(0,0, canvas2.width,canvas2.height)
}

/**
 * Update canvas2 - clearing it for new drawings of debri once a frame
 */
function updateCanvas2() {
    clearCanvas2()
    setTimeout(() => {
        if (gameRunning) {
            updateCanvas2()
        }
    },oneSecond/canvas2FPS) // how often debri canvas is updated
}

/**
 * Generates debri on screen
 */
function generateDebri() {
    console.log('generating debri')
    var imgSrc = '../img/asteroid.svg'
    var debri = new Debri(canvas2.width,canvas2.height, imgSrc)
    debri.drawDebri(context2)
    floatDebri(context2,debri)
    setTimeout(()=> {
        if(gameRunning) {
            generateDebri()
        }
    },debriGenerationSpeed)//how often debri is generated - in ms
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
            ship.crash = true
            gameOver()
        }
        if (debri.size < 25) {
            ship.crash = true
            ship.health -= 2
            ship.drawShipCollision(context)
        }
        else {
            ship.crash = true
            ship.health -= 5
            ship.drawShipCollision(context)
        }
        
    }
    else {
        ship.crash = false
    }

    //this sections stop when game is paused / not running so that debri positions is not altered during paused game time
    if(debri.x_mid >= offscreen && gameRunning) {
        setTimeout(() => {
            debri.alterXPosition(-20)
        },oneSecond/10)//how fast debri moves
        setTimeout(()=> {
            debri.drawDebri(context)

        }, oneSecond/(debriRepaintFPS))//how often redrawn/painted on screen
    }
    setTimeout(() => {
        floatDebri(context,debri)
    },oneSecond/10)
    
    
}


// **** Pause play functionality ****

var pause_btn = document.querySelector('#pause-btn') as HTMLDivElement
pause_btn ? pause_btn.onclick = () => togglePauseButton() : console.log('pause-btn is null')
var play_btn_img = new Image()
play_btn_img.src = '../img/play-btn.svg'
var pause_btn_img = document.querySelector('#pause-btn-img') as HTMLImageElement

function pauseGame() {
    gameRunning = false;
    clock.stopTicking()
    ship.disableSteering()
    pause_btn_img.src = '../img/play-btn.svg'
}

function resumeGame() {
    runGame()
    pause_btn_img.src = '../img/pause-btn.svg'
}

function togglePauseButton() {
    if (gameRunning) {
        console.log('pausing game')
        pauseGame()
    }
    else {
        console.log('resuming game')
        resumeGame()
    }
}



/**
 * Ends game
 */
function gameOver() {
    gameRunning = false
    clock.stopTicking()
    ship.disableSteering()
    playLoseMusic()
    pauseGamePlayMusic()
    toMainMenu()
}


// *** For Menu Button back to main menu ***

var options = document.querySelector('#options') as HTMLDivElement
options.style.display = 'none'
function toMainMenu() {
    options.style.display = 'block'
}

var main_menu_btn = document.querySelector('#main-menu') as HTMLDivElement
main_menu_btn ? main_menu_btn.onclick = () => clickMainMenuBtn() : console.error('main-menu btn is null')
function clickMainMenuBtn() {
    var message = ipcRenderer.invoke('main-menu')
    console.log(message)
}


/**
 * Calls all functions needed to run the game
 */
 export function runGame() {
    gameRunning = true
    // Game
    clock.tick()
    drawBackground()
    updateCanvas1()
    ship.enableSteering()
    updateCanvas2()
    generateDebri()
}

//Play Game 
runGame()


//** Audio **/
var gamePlayMusic = document.querySelector('#game-play-music') as HTMLAudioElement
var loseGameMusic = document.querySelector('#lose-music') as HTMLAudioElement
function pauseGamePlayMusic() {
    gamePlayMusic.loop = false
    gamePlayMusic.pause()
}
function playLoseMusic() {
    loseGameMusic.play()
}

function pauseLoseMusic() {
    loseGameMusic.pause()
}