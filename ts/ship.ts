
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
    
    constructor(winWidth:number,winHeight:number,imgSrc?:string) {
        this.health = 50
        this.size = 50//100
        this.radius = this.size/2
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

    moveYCoordinates(num:number) {
        this.y += num
        this.y1 += num
        this.y2 += num
        this.y3 += num
        this.y_mid += num
    }

    moveXCoordinates(num:number) {
        this.x += num
        this.x1 += num
        this.x2 += num
        this.x3 += num
        this.x_mid += num
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
    steerShip() {
        document.addEventListener('keydown', this.steering)
    }
    

    disableSteering() {
        document.removeEventListener('keydown', this.steering)
    }

}