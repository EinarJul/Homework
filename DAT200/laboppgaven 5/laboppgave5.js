
var canvas = document.getElementById("myCanvas");
if(canvas.getContext){
    var ctx = canvas.getContext("2d");
}
// Oppgave 1
ctx.fillStyle = "#EEEE9B";
var point_length = 20;
var polygon_points = []
var current = -1
var active = false;
GlobalPoint = new Point(0, 0)
point_amount = 3
curr_option = 0
ctx.fillRect(0,0, canvas.width, canvas.height)

function Point(x, y) {
    this.x = x;
    this.y = y;
}


function find(x, y) {
    if (polygon_points.length > 0){
        for (var i = 0; i < polygon_points.length; i++)
            if (polygon_points[i].x - point_length / 2 <= x
                && x <= polygon_points[i].x + point_length / 2
                && polygon_points[i].y - point_length / 2 <= y
                && y <= polygon_points[i].y + point_length / 2){
                return i;
            }
        return -1;
    } else {
        return -1
    }

}

function matrixMultiplier(base_matrix, transform){

    return base_matrix
}

// Basic drawing function for each point of our polygon
function drawPoints(points){
    ctx.beginPath()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillRect(0,0, canvas.width, canvas.height)
    ctx.moveTo(points[0].x, points[0].y)
    for (var i = 0; i < points.length; i++){
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath()
    ctx.stroke()
}

// Here we generate our points for the n sided polygon
// Currently has some weird flipping issues around the y axis
function generatePoints(x, y, numbpoints) {
    var delta_pos = {x: GlobalPoint.x - x, y: GlobalPoint.y - y}
    radius = Math.sqrt(Math.pow(delta_pos.x, 2) + Math.pow(delta_pos.y, 2))
    var startangle = Math.asin(delta_pos.y / radius)
    var centerAngle = 2*Math.PI / numbpoints
    polygon_points = []
    // for radius just implement a simple pythagoras for the click distance of when this function was called
    // and for whenever the mouse moves
    for (let i = 0; i < numbpoints; i++){
        var angle = startangle + (i * centerAngle);
        var xPoint = Math.round(GlobalPoint.x + radius * Math.sin(angle))
        var yPoint = Math.round(GlobalPoint.y + radius * Math.cos(angle))
        new_point = new Point(xPoint, yPoint)
        polygon_points.push(new_point)
    }
    drawPoints(polygon_points)
}

// While mousebutton is down and not on a point we can update our points as we want
document.addEventListener("wheel", function (e){
    if (curr_option === 0) {
        if (e.deltaY < 0){
            if (point_amount > 3){
                point_amount -= 1
                if (active){
                    generatePoints(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, point_amount, GlobalPoint)
                }
            }
        }
        else if (e.deltaY > 0 ){
            if (point_amount < 50){
                point_amount += 1
                if (active){
                    generatePoints(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, point_amount, GlobalPoint)
                }
            }
        }
    }
},false)

canvas.addEventListener("mousedown", function (e) {
    var x = e.clientX - canvas.offsetLeft;
    var y = e.clientY - canvas.offsetTop;
    current = find(x, y);
    active = true
    GlobalPoint.x = x
    GlobalPoint.y = y
    switch (curr_option){
        case 0:
            console.log(curr_option)
            generatePoints(x, y, point_amount)
            break
        case 1:
            GlobalPoint.x = x
            GlobalPoint.y = y
            break
        case 2:
            GlobalPoint.x = x
            GlobalPoint.y = y
            break
        case 3:
            GlobalPoint.x = x
            GlobalPoint.y = y
            break

    }
}, false);

canvas.addEventListener("mouseup", function (e) {
    active = false;
}, false);


canvas.addEventListener("mousemove", function (e) {
    var x = e.clientX - canvas.offsetLeft;
    var y = e.clientY - canvas.offsetTop;
    if (active) {
        switch (curr_option){
            case 0:
                generatePoints(x, y, point_amount)
                break
            case 1:
                if (current > -1){
                    // Though not technically matrix addition this is the equivelent to
                    // poly_current = [x,y] + [[1, 0, change_in_x],[0,1,change_in_y]]
                    polygon_points[current].y += y - GlobalPoint.y
                    polygon_points[current].x += x - GlobalPoint.x
                    GlobalPoint.x = x
                    GlobalPoint.y = y
                }
                break
            case 2:
                for (i = 0; i < polygon_points.length; i++){
                    multiplier = Math.sqrt(Math.pow(GlobalPoint.x - x, 2) + Math.pow(GlobalPoint.y - y, 2))
                    console.log(multiplier)
                    polygon_points[i] *= multiplier
                }
        }    }
    else {
        if (find(x, y) >= 0){
            document.getElementById("myCanvas").style.cursor = "pointer";
        }
        else{
            document.getElementById("myCanvas").style.cursor = "auto";
        }
    }
    if (polygon_points.length > 0)
        drawPoints(polygon_points)
}, false);



// His code

/*
var canvas = document.getElementById("myCanvas");
w = canvas.width;
h = canvas.height;
var ctx = canvas.getContext("2d");

var squares = [];
var nsquares = 0;
var SQUARELENGTH = 10;

var aktiv = false;
var current = -1;  //Number pointing to current rectangel in the table

function Point(x, y) {
    this.x = x;
    this.y = y;
}

canvas.addEventListener("mousedown", function (e) {
    var x = e.clientX - canvas.offsetLeft; // Alternative: var currx = e.layerX; (ikke støttet i alle browsere)
    var y = e.clientY - canvas.offsetTop;  // Alternative: var curry = e.layerY; (ikke støttet i alle browsere)
    current = find(x, y);
    if (current < 0) //not inside a square
        add(x, y);
    else
        aktiv = true;
}, false);

canvas.addEventListener("mouseup", function (e) {
    aktiv = false;
}, false);


canvas.addEventListener("mousemove", function (e) {
    var x = e.clientX - canvas.offsetLeft;
    var y = e.clientY - canvas.offsetTop;

    if (aktiv) {
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

function find(x, y) {
    for (var i = 0; i < nsquares; i++)
        if (squares[i].x - SQUARELENGTH / 2 <= x
            && x <= squares[i].x + SQUARELENGTH / 2
            && squares[i].y - SQUARELENGTH / 2 <= y
            && y <= squares[i].y + SQUARELENGTH / 2)
            return i;
    return -1; //Fant ikke noe rektangel i nærheten av muspeker
}


function add(x, y) {
    squares[nsquares] = new Point(x, y);
    current = nsquares;
    nsquares++;
    draw();
}

function remove(n) {
    if (n < 0 || n >= nsquares)
        return;

     squares[n] = squares[nsquares];
     if (current == n)
         current = -1;


    squares.splice(n,1);
    nsquares--;
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";

    for (var i = 0; i < nsquares; i++) {
        ctx.strokeRect(squares[i].x - SQUARELENGTH / 2, squares[i].y - SQUARELENGTH
            / 2, SQUARELENGTH, SQUARELENGTH);
    }
}
*/



