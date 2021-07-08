export class Debri {
    x:number
    y:number
    size:number
    radius:number
    number:number
    x_mid:number
    y_mid:number
    collision:boolean
    static count:number = 0

     /* 
     * @param screenWidth 
     * @param screenHeight 
     */
    
    constructor(screenWidth:number, screenHeight:number, imgSrc?:string, debriSize?:number) {
        // Coordinates and size
        this.x = Math.random() * (screenWidth/2) +(screenWidth/2)  //random number between 1 and 550
        //generate beyond halfway point of screen to give ship time to react
        this.y = Math.random() * screenHeight// between 1 and 900
        this.size = Math.random() * 50 + 10// 10 - 60
        
        if(debriSize) {
            this.size = debriSize
        }
        else {
            this.size = Math.random() * 40 + 10// 10 - 50
        }
        
        this.radius = this.size/2
        // Debri mid point
        this.x_mid = this.x + (this.size/2)
        this.y_mid = this.y + (this.size/2)

        this.collision = false
        // Debri Number
        this.number = Debri.count
        Debri.count++
    }

    /** Print Debri information */
    print() {
        console.log('Debri',this.number)
        console.log('x:',this.x,'y:',this.y)
        console.log('debri x_mid:', this.x_mid, 'debri y_mid',this.y_mid, 'debri size:',this.size)
    }

    drawDebri(context:CanvasRenderingContext2D) {
        // this.print()
        context.fillStyle = '#000000'
        context.fillRect(this.x,this.y, this.size, this.size)
    }

    alterXPosition(addition:number) {
        this.x += addition
        this.x_mid += addition
    }

    alterYPosition(addition:number) {
        this.y += addition
        this.y_mid += addition
    }

    

}