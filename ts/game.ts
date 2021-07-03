window.onload = ()=> {
var canvas:HTMLCanvasElement|null = document.getElementById('canvas') as HTMLCanvasElement
canvas.width = 900
canvas.height = 550
var context = canvas.getContext('2d');
context ? context.fillStyle = '#FF0000': null;



var ship = new Ship(canvas.width,canvas.height)
// var FPS = 50
// setInterval(() => {   
//     context?.clearRect(0,0,canvas!.width,canvas!.height)
//     ship.drawShip(context!)
//     ship.steerShip()
//     },1000/FPS)

function update() {
    context?.clearRect(0,0,canvas!.width,canvas!.height)
    ship.drawShip(context!)
    
    requestAnimationFrame(update)
}
update()
ship.steerShip()
}