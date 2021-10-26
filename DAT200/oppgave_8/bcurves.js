var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")

var points = [];
var npoints = 0;
var point_len = 10;
var active = false
var current = -1

function Point(x, y){
    this.x = x
    this.y = y
}

canvas.addEventListener("mousedown", function (e) {
    var x = e.clientX - canvas.offsetLeft; // Alternative: var currx = e.layerX; (ikke støttet i alle browsere)
    var y = e.clientY - canvas.offsetTop;  // Alternative: var curry = e.layerY; (ikke støttet i alle browsere)
    current = find(x, y);
    if (current < 0) //not inside a square
        add(x, y);
    else
        active = true;
}, false);

canvas.addEventListener("mouseup", function (e) {
    active = false;
}, false);


canvas.addEventListener("mousemove", function (e) {
    var x = e.clientX - canvas.offsetLeft;
    var y = e.clientY - canvas.offsetTop;

    if (active) {
        points[current].x = x;
        points[current].y = y;
        draw();
    }

    else {
        if (find(x, y) >= 0) //inside a square
            document.getElementById("canvas").style.cursor = "pointer";
        else
            document.getElementById("canvas").style.cursor = "auto";
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
    for (var i = 0; i < npoints; i++)
        if (points[i].x - point_len / 2 <= x
            && x <= points[i].x + point_len / 2
            && points[i].y - point_len / 2 <= y
            && y <= points[i].y + point_len / 2)
            return i;
    return -1; //Fant ikke noe rektangel i nærheten av muspeker
}


function add(x, y) {
    points[npoints] = new Point(x, y);
    current = npoints;
    npoints++;
    draw();
}

function remove(n) {
    if (n < 0 || n >= npoints)
        return;

    /* points[n] = points[npoints];
     if (current == n)
         current = -1;*/

    //Metodeblokken over er et alternativ til å bruke splice

    points.splice(n,1);
    npoints--;
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";
    ctx.fillStyle = "#FDD20EFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    if (npoints > 0){
        ctx.beginPath()
        ctx.strokeStyle = "black"
        ctx.moveTo(points[0].x, points[0].y)
        for (var i = 0; i < points.length; i++){
            ctx.lineTo(points[i].x, points[i].y)
        }
        ctx.stroke()
        ctx.fillStyle = "#F93822FF"
        for (var i = 0; i < points.length; i++) {
            ctx.beginPath()
            ctx.arc(points[i].x, points[i].y, 3, 0, 2*Math.PI)
            ctx.fill()
            ctx.stroke()
            ctx.closePath()
        }
    }

    if (points.length > 3){
        for (j = 3; j < points.length ; j++){
            drawbSpline(j, 20);
        }
    }
}

function drawbSpline(i, n){
    var curvepoints = [];
    var delta = 1.0 / n;

    for (var j = 0; j <= n; j++){
        var t = j * delta
        var x = points[i-3].x * ((1.0 - t) * (1.0 - t) * (1.0 -t)) / 6 +
            points[i-2].x * (3.0 * t * t * t - 6 * t * t + 4) / 6 +
            points[i-1].x * (-3.0 * t * t * t + 3 * t * t + 3 * t + 1) / 6 +
            points[i].x * (t * t * t) / 6

        var y = points[i-3].y * ((1.0 - t) * (1.0 - t) * (1.0 -t)) / 6 +
            points[i-2].y * (3.0 * t * t * t - 6 * t * t + 4) / 6 +
            points[i-1].y * (-3.0 * t * t * t + 3 * t * t + 3 * t + 1) / 6 +
            points[i].y * (t * t * t) / 6

        curvepoints.push(new Point(x, y))
    }
    ctx.beginPath();
    ctx.strokeStyle = "black"
    ctx.moveTo(curvepoints[0].x, curvepoints[0].y)
    for (var k = 1; k <= n; k++){
        ctx.lineTo(curvepoints[k].x, curvepoints[k].y)
    }
    ctx.stroke()


}
