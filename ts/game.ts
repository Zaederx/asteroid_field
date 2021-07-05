import {Debri} from '../js/debri'

window.onload = ()=> {
var canvas1 = document.getElementById('canvas1') as HTMLCanvasElement
var canvas2 = document.getElementById('canvas2') as HTMLCanvasElement
canvas1.width = 900
canvas1.height = 550
var context1 = canvas1.getContext('2d') as CanvasRenderingContext2D;
canvas2.width = 900
canvas2.height = 550
context1 ? context1.fillStyle = '#FF0000': console.error('context is null');


var context2 = canvas2.getContext('2d') as CanvasRenderingContext2D;
context1.fillStyle = 'rgba(0, 0, 200, 0.5)'



var ship = new Ship(canvas1.width,canvas1.height)
// var FPS = 50
// setInterval(() => {   
//     context?.clearRect(0,0,canvas!.width,canvas!.height)
//     ship.drawShip(context!)
//     ship.steerShip()
//     },1000/FPS)

function update() {
    context1?.clearRect(0,0,canvas1!.width,canvas1!.height)
    // context2?.clearRect(0,0,canvas2!.width,canvas2!.height)
    ship.drawShip(context1)
    
    requestAnimationFrame(update)
}
update()
ship.steerShip()

function generateDebri() {
    //every 2 seconds - generate debri
    context2.clearRect(0,0, canvas2.width,canvas2.height)
    console.log('generating debri')
    var debri = new Debri()
    debri.drawDebri(context2)
    floatDebri(context2,debri)
    setTimeout(()=> {
        generateDebri()
    },2000)
}

function floatDebri(context:CanvasRenderingContext2D,debri:Debri) {
    
    
    console.log('floating debri')
    var offscreen:number = (0 - debri.size)
    if(debri.x_mid >= offscreen) {
        setTimeout(() => {
            debri.alterXPosition(-20)
            debri.drawDebri(context)
            floatDebri(context,debri)
        },500)
    }
    
}
generateDebri()
}