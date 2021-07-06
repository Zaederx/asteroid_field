export class StopClock {
    mins:number;
    secs:number;
    msecs:number;
    running:boolean;

    constructor() {
        this.mins = 0
        this.secs = 0
        this.msecs = 0
        this.running = false
    }

    getClockDisplay() {
        var displayText = this.mins + ':'+ this.secs +':' + this.msecs
        return displayText
    }

    /**
     * Every millisecond - update time
     */
    async tick() {
        this.running = true
        setTimeout(() => {
            if(this.running) {
                if (this.msecs == 59) {
                    this.secs++
                    this.msecs = 0
                }
                this.msecs++
                if (this.secs == 59) {
                    this.mins++
                    this.secs = 0
                }
            }
        }, 1000)
    }

    stopTicking() {
        this.running = false
    }
    
}