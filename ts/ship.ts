
export class Ship {
    up:string
    down:string
    left:string
    right:string
    health:number;
    x:number;
    y:number;
    x1:number;
    x2:number;
    x3:number;
    y1:number;
    y2:number;
    y3:number;
    halfHeight:number;
    size:number;//num that represents width and length of ship
    radius:number;
    x_mid:number;
    y_mid:number;
    image:any;
    crashImage:any;
    crash:boolean;
    winWidth:number;
    winHeight:number
    constructor(winWidth:number,winHeight:number,imgSrc?:string, crashImgSrc?:string) {
        this.winHeight = winHeight
        this.winWidth = winWidth
        this.health = 4
        this.size = 50//100
        this.radius = (this.size/2) - ((this.size/2)/3)
        this.x = 0
        this.y = winHeight/2
        this.x1 = 0 
        this.y1 = winHeight/2 - (this.size/2)
        this.x2 = this.size
        this.y2 = winHeight/2
        this.x3 = 0
        this.y3 = winHeight/2 + (this.size/2)
        this.halfHeight = 50
        this.up = 'ArrowUp' || 'Up'
        this.down = 'ArrowDown' || 'Down'
        this.left = 'ArrowLeft' || 'Left'
        this.right = 'ArrowRight' || 'Right'
        this.x_mid = this.size/2 + this.x1
        this.y_mid = this.size/2 + this.y1
        if (imgSrc) {
            this.image = new Image()
            this.image.src = imgSrc
        }
        if (crashImgSrc) {
            this.crashImage = new Image()
            this.crashImage.src = crashImgSrc
        }
        this.crash = false
    }

    print() {
        console.log('ship x:', this.x,'ship y:',this.y)
    }
    drawShip(context:CanvasRenderingContext2D) {
        if (this.image) {
            context.drawImage(this.image,this.x,this.y,this.size,this.size)
        }
        else {
            context?.beginPath()
            context?.moveTo(this.x1,this.y1)
            context?.lineTo(this.x2, this.y2)
            context?.stroke()
            context?.lineTo(this.x3, this.y3)
            context?.stroke()
            context?.lineTo(this.x1,this.y1)
            context?.stroke()
        }
    }

    drawShipCollision(context:CanvasRenderingContext2D) {
        if (this.crashImage) {
            context.drawImage(this.crashImage,this.x,this.y,this.size,this.size)
        }
    }

    updateYs(num:number){
        this.y += num
        this.y1 += num
        this.y2 += num
        this.y3 += num
        this.y_mid += num
    }
    setYs(num:number) {
        this.y = num
        this.y1 = num
        this.y2 = num
        this.y3 = num
        this.y_mid = num
    }
    moveYCoordinates(num:number) {
        // past top of screen - appear at bottom of screen
        if (this.y < 0 + this.radius) {
            this.setYs((this.winHeight - this.radius))
        }
        //below bottom of screen - appear at top of screen
        else if (this.y > this.winHeight - this.radius) {
            this.setYs((0+this.radius))
        }
        else {
            this.updateYs(num)
        }
        
    }
    updateXs(num:number) {
        this.x += num
        this.x1 += num
        this.x2 += num
        this.x3 += num
        this.x_mid += num
    }
    
    setXs(num:number) {
        this.x = num
        this.x1 = num
        this.x2 = num
        this.x3 = num
        this.x_mid = num
    }

    moveXCoordinates(num:number) {
         // past top of screen - appear at bottom of screen
         if (this.x < 0 - this.radius) {
            this.setXs((this.winWidth - this.size))
        }
        //below bottom of screen - appear at top of screen
        else if (this.x > this.winWidth) {
            this.setXs((0+this.radius+10))
        }
        else {
            this.updateXs(num)
        }
    }
    steering = (event) => {
        if(event.key == this.up){
            this.moveYCoordinates(-20)
        }
        if(event.key == this.down) {
            this.moveYCoordinates(+20)
        }
        if (event.key == this.left) {
            this.moveXCoordinates(-20)
        }
        if (event.key == this.right) {
            this.moveXCoordinates(+20)
        }
    }

    enableSteering() {
        document.addEventListener('keydown', this.steering)
    }
    
    disableSteering() {
        document.removeEventListener('keydown', this.steering)
    }

}