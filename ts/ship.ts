
class Ship {
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

    constructor(winWidth:number,winHeight:number) {
        this.health = 50
        this.x = winWidth/2
        this.y = winHeight/2
        this.x1 = 0
        this.y1 = 0
        this.x2 = 100
        this.y2 = 50
        this.x3 = 0
        this.y3 = 100
        this.halfHeight = 50
        this.up = 'ArrowUp' || 'Up'
        this.down = 'ArrowDown' || 'Down'
        this.left = 'ArrowLeft' || 'Left'
        this.right = 'ArrowRight' || 'Right'
    }

    drawShip(context:CanvasRenderingContext2D) {
        context?.beginPath()
        context?.moveTo(this.x1,this.y1)
        context?.lineTo(this.x2, this.y2)
        context?.stroke()
        context?.lineTo(this.x3, this.y3)
        context?.stroke()
        context?.lineTo(this.x1,this.y1)
        context?.stroke()
    }

    moveYCoordinates(num:number) {
        this.y1 += num
        this.y2 += num
        this.y3 += num
    }

    moveXCoordinates(num:number) {
        this.x1 += num
        this.x2 += num
        this.x3 += num
    }

    steerShip() {
        document.addEventListener('keydown', (event) => {
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
        })
    }

}