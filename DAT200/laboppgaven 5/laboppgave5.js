
var canvas = document.getElementById("myCanvas");
if(canvas.getContext){
    var ctx = canvas.getContext("2d");
}

var point_length = 10;
var polygon_points = []
var current = -1
var active = false;
global_x = 0
global_y = 0

// Oppgave 1
ctx.fillStyle = "#EEEE9B";
function Point(x, y) {
    this.x = x;
    this.y = y;
}

function find(x, y) {
    for (var i = 0; i < polygon_points; i++)
        if (polygon_points[i].x - point_length / 2 <= x
            && x <= polygon_points[i].x + point_length / 2
            && polygon_points[i].y - point_length / 2 <= y
            && y <= polygon_points[i].y + point_length / 2)
            return i;
    return -1; //Fant ikke noe rektangel i nærheten av muspeker
}


function draw(option){

    switch (option){
        case 0:
            console.log("haha")
            break
        case 1:
            break
        case 2:
            break
        case 3:
            break
        default:
            console.log("Select an option")

    }

}

function drawPoints(points){
    ctx.beginPath()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillRect(0,0, canvas.width, canvas.height)
    console.log(points)
    ctx.moveTo(points[0][0], points[0][1])
    for (var i = 0; i < points.length; i++){
        ctx.lineTo(points[i][0], points[i][1]);
    }
    ctx.stroke()
    ctx.closePath()
}


function generatePoints(x, y, numbpoints, initial_click) {

    var delta_pos = {x:  initial_click[0]-x, y: initial_click[1]-y}
    console.log(delta_pos)
    radius = Math.sqrt(Math.pow(delta_pos.x, 2) + Math.pow(delta_pos.y, 2))
    var startangle = Math.asin(delta_pos.y / radius)
    var centerAngle = 2*Math.PI / numbpoints
    poly_points = []
    // for radius just implement a simple pythagoras for the click distance of when this function was called
    // and for whenever the mouse moves

    for (let i = 0; i < numbpoints; i++){
        var angle = startangle + (i * centerAngle);
        var xPoint = Math.round(global_x + radius * Math.sin(angle))
        var yPoint = Math.round(global_y + radius * Math.cos(angle))
        var pointX = ( Math.sin( i / numbpoints * 2 * Math.PI )  * radius + delta_pos.x);
        var pointY = ( Math.cos( i / numbpoints * 2 * Math.PI ) * radius + delta_pos.y);
        poly_points.push([xPoint, yPoint])
    }

    console.log(poly_points)

    drawPoints(poly_points)
}

canvas.addEventListener("mousedown", function (e) {
    var x = e.clientX - canvas.offsetLeft; // Alternative: var currx = e.layerX; (ikke støttet i alle browsere)
    var y = e.clientY - canvas.offsetTop;  // Alternative: var curry = e.layerY; (ikke støttet i alle browsere)
    //current = find(x, y);
    if (current < 0) {
        global_x = x
        global_y = y
        generatePoints(x, y, 5, [x, y])
    }
    else
        active = true;
}, false);






canvas.addEventListener("mouseup", function (e) {
    active = false;
}, false);


canvas.addEventListener("mousemove", function (e) {
    var x = e.clientX - canvas.offsetLeft;
    var y = e.clientY - canvas.offsetTop;
    console.log(x)
    console.log(global_x)
    console.log("Above is x, global x")
    generatePoints(x, y, 5, [global_x, global_y])

    if (active) {
        squares[current].x = x;
        squares[current].y = y;
        draw();
    }

    else {
        if (find(x, y) >= 0) //inside a square
            document.getElementById("myCanvas").style.cursor = "pointer";
        else
            document.getElementById("myCanvas").style.cursor = "auto";
    }
}, false);


canvas.addEventListener("dblclick", function (e) {
    var x = e.clientX - canvas.offsetLeft;
    var y = e.clientY - canvas.offsetTop;
    current = find(x, y);
    if (current >= 0) remove(current);
    console.log("dblclick occured");
}, false);




function add(x, y) {
    squares[nsquares] = new Point(x, y);
    current = nsquares;
    nsquares++;
    draw();
}

function remove(n) {
    if (n < 0 || n >= nsquares)
        return;

    /* squares[n] = squares[nsquares];
     if (current == n)
         current = -1;*/

    //Metodeblokken over er et alternativ til å bruke splice

    squares.splice(n,1);
    nsquares--;
    draw();
}



