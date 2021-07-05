export class Debri {
    x:number
    y:number
    size:number
    number:number
    x_mid:number
    y_mid:number
    static count:number = 0
    constructor() {
        // Coordinates and size
        this.x = Math.random() * 100
        this.y = Math.random() * 100
        this.size = Math.random() * 10

        // Debri mid point
        this.x_mid = this.x + (this.size/2)
        this.y_mid = this.y + (this.size/2)

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
        this.print()
        context.fillStyle = '#000000'
        context.fillRect(this.x,this.y, this.size, this.size)
    }

    alterXPosition(addition:number) {
        this.x += addition
    }

    alterYPosition(addition:number) {
        this.y += addition
    }

    async floatDebri(context:CanvasRenderingContext2D) {
        
        var offscreen:number = (0 - this.size)
        while(this.x_mid <= offscreen) {
            console.log()
            setInterval(async()=> {
                this.alterXPosition(-20)
                this.drawDebri(context)
                console.log('floating debri')
            }, 1000)
            
        }
    }

    static async generateDebri(context:CanvasRenderingContext2D) {
        //every 2 seconds - generate debri
        setInterval(async()=> {
            console.log('generating debri')
            var debri = new Debri()
            debri.drawDebri(context)
            await debri.floatDebri(context)
        }, 1000)
    }

}