import { ipcRenderer } from "electron"
import { Debri } from "../js/debri"
import { Ship } from "../js/ship"
import { StopClock } from "../js/stopClock"

/**
 * Class to represent the Game
 */
export class Game {
    //** Game Settings */
    gameLevel = 0
    shipHealth = 0
    debriSize = 0
    debriGenerationSpeed = 0//every x milliseconds
    debriFloatingFPS = 0


    //Main Game Variable

    //canvases & contexts
    canvas1 = document.getElementById('canvas1') as HTMLCanvasElement
    canvas2 = document.getElementById('canvas2') as HTMLCanvasElement
    canvas3 = document.getElementById('canvas3') as HTMLCanvasElement
    WIDTH = 918
    HEIGHT = 575

    //see - https://javascript.info/bind - losing this problem
    context1 = (document.getElementById('canvas1') as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
    context2 = (document.getElementById('canvas2') as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
    context3 = (document.getElementById('canvas3') as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D
    // context1:CanvasRenderingContext2D;//ship canvas
    // context2:CanvasRenderingContext2D;//debri canvas
    // context3:CanvasRenderingContext2D;//background canvas


    // **** Pause play functionality ****
    pause_btn = document.querySelector('#pause-btn') as HTMLDivElement
    play_btn_img = new Image()
    pause_btn_img = document.querySelector('#pause-btn-img') as HTMLImageElement

    //Ship
    ship:Ship

    //FramesPerSecond
    canvas1FPS = 60
    canvas2FPS = 4.5 //for debri canvas
    canvas3FPS = 4.5 //for debri canvas
    debriRepaintFPS = 20 //every x milliseconds
    oneSecond = 1000 //ms

    //Game is Running & stopClock
    gameRunning = false
    clock = new StopClock()

    //Images
    backgroundImage = new Image()

    imageSrc = '../img/ship.svg'
    crashImgSrc = '../img/ship-crash.svg'


    // *** For Menu Button back to main menu ***
    options = document.querySelector('#options') as HTMLDivElement
    
    main_menu_btn = document.querySelector('#main-menu') as HTMLDivElement

    //** Audio **/
    gamePlayMusic = document.querySelector('#game-play-music') as HTMLAudioElement
    loseGameMusic = document.querySelector('#lose-music') as HTMLAudioElement

    constructor(level:number) {
        //set canvas width and height
        this.canvas1.width = this.WIDTH
        this.canvas1.height = this.HEIGHT
        this.canvas2.width = this.WIDTH
        this.canvas2.height = this.HEIGHT
        this.canvas3.width = this.WIDTH
        this.canvas3.height = this.HEIGHT
        //set background image
        this.backgroundImage.src = '../img/starry-background.svg'
        //context1 fillStyle
        this.context1.fillStyle = 'rgb(200, 200, 200)'
        this.pause_btn ? this.pause_btn.onclick = () => this.togglePauseButton() : console.log('pause-btn is null')
        this.play_btn_img.src = '../img/play-btn.svg'
        //hide options menu
        this.options.style.display = 'none'
        //enable menu button
        this.main_menu_btn ? this.main_menu_btn.onclick = () => this.clickMainMenuBtn() : console.error('main-menu btn is null')
        //prepare ship
        this.ship = new Ship(this.canvas1.width,this.canvas1.height,this.imageSrc,this.crashImgSrc)
        this.setGameLevel(level) //sets game setting objects
    }

    /**
     * Draws the background image on canvas3
     */
    drawBackground() {
        // console.log('context3.width:',this.canvas3.width)
        //Add Background
        this.context3.drawImage(this.backgroundImage,0,0,this.canvas3.width,this.canvas3.height)
        // setInterval(() => this.drawBackground(),1000/this.canvas3FPS)
        requestAnimationFrame(() => {this.drawBackground()})
    }

    /**
     * Updates canvas1 - clearing screen for next repaint/drawing of ship and stopClock
     */
    updateCanvas1() {
        this.ship.print()
        this.context1.clearRect(0,0,this.canvas1.width,this.canvas1.height)
        this.context3.drawImage(this.backgroundImage,0,0,this.canvas3.width,this.canvas3.height)
        if(this.ship.crash == true){
            this.ship.drawShipCollision(this.context1)
        }
        else {
            this.ship.drawShip(this.context1)
        }
        this.displayTime(this.clock)
        this.updateShipScore()
        if (this.ship.health <= 0) {
            this.gameOver()
        }
        if(this.gameRunning) {
            // setInterval(() => this.updateCanvas1(), 1000/this.canvas1FPS)
            requestAnimationFrame(() => this.updateCanvas1())
        }
    }

    /**
     * Displays stopClock time on canvas1
     * @param clock stopClock to be displayed
     */
    async displayTime(clock:StopClock) {
        var text = clock.getClockDisplay()
        var x = 500
        var y = 30
        this.context1.font = '30px Arial'
        this.context1.fillText(text,x,y)
    }

    /**
     * Update Ship Score on canvas1
     */
    updateShipScore() {
        var text = "Ship Health:"+this.ship.health
        var x = 20
        var y = 30
        this.context1.font = '30px Arial'
        this.context1.fillText(text,x,y)
    }
    /**
     * Clears canvas2
     */
    clearCanvas2() {
        this.context2.clearRect(0,0, this.canvas2.width,this.canvas2.height)
    }

    /**
     * Update canvas2 - clearing it for new drawings of debri once a frame
     */
    updateCanvas2() {
        this.clearCanvas2()
        setTimeout(() => {
            if (this.gameRunning) {
                this.updateCanvas2()
            }
        },this.oneSecond/this.canvas2FPS) // how often debri canvas is updated
    }

    /**
     * Generates debri on screen
     */
    generateDebri() {
        // console.log('generating debri')
        var imgSrc = '../img/asteroid.svg'
        var debri = new Debri(this.canvas2.width,this.canvas2.height, imgSrc, this.debriSize)
        debri.drawDebri(this.context2)
        this.floatDebri(this.context2,debri)
        setTimeout(()=> {
            if(this.gameRunning) {
                this.generateDebri()
            }
        },this.debriGenerationSpeed)//how often debri is generated - in ms
    }

    /**
     * Returns the distance between a ship and debri
     * @param xDelta - the difference in x coordinates between ship and debri
     * @param yDelta - the difference in y coordinates between ship and debri
     * @returns 
     */
    pythagoras(xDelta:number,yDelta:number):number {
        var distance = (xDelta**2 + yDelta**2)**0.5
        return distance
    }

    /**
     * Floats debri on canvas along the x axis towards x=0 (left side of screen)
     * @param context CanvasRendinerContext2D
     * @param debri debri that is to be floated on canvas
     */
    floatDebri(context:CanvasRenderingContext2D,debri:Debri) {
        
        // console.log('floating debri')
        var offscreen:number = (0 - debri.size)
        var x = this.ship.x_mid - debri.x_mid
        var y = this.ship.y_mid - debri.y_mid

        var distance = this.pythagoras(x,y)
        var allowedDistance = this.ship.radius + debri.radius
        if (debri.collision == false && distance <= allowedDistance) {
            // console.log('Collision. Ship health:', this.ship.health)
            debri.collision = true
            if (this.ship.health <= 0) {
                this.ship.crash = true
                this.gameOver()
            }
            if (debri.size < 25) {
                this.ship.crash = true
                this.ship.health -= 2
                this.ship.drawShipCollision(context)
            }
            else {
                this.ship.crash = true
                this.ship.health -= 5
                this.ship.drawShipCollision(context)
            }
            
        }
        else {
            this.ship.crash = false
        }

        //this sections stop when game is paused / not running so that debri positions is not altered during paused game time
        if(debri.x_mid >= offscreen && this.gameRunning) {
            setTimeout(() => {
                debri.alterXPosition(-20)
            },this.oneSecond/10)//how fast debri moves
            setTimeout(()=> {
                debri.drawDebri(context)

            }, this.oneSecond/(this.debriRepaintFPS))//how often redrawn/painted on screen
        }
        setTimeout(() => {
            this.floatDebri(context,debri)
        },this.oneSecond/10)
    }


    /**
     * Pause Game
     */
    pauseGame() {
        this.gameRunning = false;
        this.clock.stopTicking()
        this.ship.disableSteering()
        this.pause_btn_img.src = '../img/play-btn.svg'
        this.displayMenu()
    }
    
    /**
     * Resume Game
     */
    resumeGame() {
        this.runGame()
        this.pause_btn_img.src = '../img/pause-btn.svg'
        this.hideMenu()
    }
    
    /**
     * Toggles pause button
     */
    togglePauseButton() {
        if (this.gameRunning) {
            console.log('pausing game')
            this.pauseGame()
        }
        else {
            console.log('resuming game')
            this.resumeGame()
        }
    }

    
    /**
     * Ends game
     */
    gameOver() {
        this.gameRunning = false
        this.clock.stopTicking()
        this.ship.disableSteering()
        this.playLoseMusic()
        this.pauseGamePlayMusic()
        this.displayMenu()
    }

    /**
     * Displays Back to Main Menu button when
     * game is lost
     */
    displayMenu() {
        this.options.style.display = 'block'
    }

    hideMenu() {
        this.options.style.display = 'none'
    }

    /**
     * Click Main Menu Button
     */
    clickMainMenuBtn() {
        var message = ipcRenderer.invoke('main-menu')
        console.log(message)
    }


    /**
     * Calls all functions needed to run the game
     */
    runGame() {
        this.gameRunning = true
        // Game
        this.clock.tick()
        this.drawBackground()
        this.updateCanvas1()
        this.ship.enableSteering()
        this.updateCanvas2()
        this.generateDebri()
    }



    //Set Game Level
    setGameLevel(level:number) {
        this.gameLevel = level
        if (this.gameLevel == 0) {
            this.ship.health = 30
            this.debriSize = 80
            this.debriGenerationSpeed = 700 //every x milliseconds
            this.debriFloatingFPS = 30 //1000/debriFloatingFPS
        }
        else if (this.gameLevel == 1) {
            this.ship.health = 30
            this.debriSize = 100
            this.debriGenerationSpeed = 500 //every x milliseconds
            this.debriFloatingFPS = 40 //1000/debriFloatingFPS
        }
        else if (this.gameLevel == 2) {
            this.ship.health = 30
            this.debriSize = 200
            this.debriGenerationSpeed = 300 //every x milliseconds
            this.debriFloatingFPS = 20 //1000/debriFloatingFPS
        }
    }

    /**
     * Plays game music
     */
    pauseGamePlayMusic() {
        this.gamePlayMusic.loop = false
        this.gamePlayMusic.pause()
    }

    /**
     * Plays losing music
     */
    playLoseMusic() {
        this.loseGameMusic.play()
    }

    /**
     * Pauses losing music
     */
    pauseLoseMusic() {
        this.loseGameMusic.pause()
    }
    

}

