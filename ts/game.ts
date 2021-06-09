window.onload = ()=> {
var canvas:HTMLCanvasElement|null = document.getElementById('canvas') as HTMLCanvasElement
canvas.width = 1200
canvas.height = 720
var context = canvas.getContext('2d');
context ? context.fillStyle = '#FFFFFF': null;



function loop() {
    var running = true
    while (running) {

    }
}
function steerShip() {

}

var ship = new Ship(canvas.width,canvas.height)
ship.drawShip(context!,0,0)

}