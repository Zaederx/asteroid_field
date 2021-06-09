
class Ship {
    health:number;
    x:number;
    y:number
    halfHeight:number
    constructor(winWidth:number,winHeight:number) {
        this.health = 50
        this.x = winWidth/2
        this.y = winHeight/2
        this.halfHeight = 50
    }

    drawShip(context:CanvasRenderingContext2D,x:number,y:number) {
        context?.beginPath()
        context?.moveTo(0+x,0+y)
        context?.lineTo(100+x, 50+x)
        context?.stroke()
        context?.lineTo(0+x, 100+y)
        context?.stroke()
        context?.lineTo(0+x,0+y)
        context?.stroke()
    }

    


}