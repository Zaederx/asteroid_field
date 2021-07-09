export class StopClock {
    mins:number;
    secs:number;
    millisecs:number;
    running:boolean;

    constructor() {
        this.mins = 0
        this.secs = 0
        this.millisecs = 0
        this.running = false
    }

    getClockDisplay() {
        var displayText = this.mins + ':'+ this.secs +':' + this.millisecs
        return displayText
    }

    /**
     * Every millisecond (1000 microseconds) - update time
    */
    async tick() {
        this.running = true
        setInterval(() => {
            if(this.running) {
                if (this.millisecs == 59) {
                    this.secs++
                    this.millisecs = 0
                }
                this.millisecs++
                if (this.secs == 59) {
                    this.mins++
                    this.secs = 0
                }
            }
        }, 1000/60)//every 60th of a second - 1000ms/60 - i.e. 1second/60
    }


    stopTicking() {
        this.running = false
    }
    
}