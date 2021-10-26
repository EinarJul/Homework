
var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")
var points = []
var npoints = 4
var point_len = 10
var active = false;
var current = -1
function Point(x, y){
    this.x = x;
    this.y = y;
}


defined_points = [new Point(250, 400), new Point(250, 200), new Point(450, 200), new Point(450, 400)]

canvas.addEventListener("mousedown", function (e){
    var x = e.clientX - canvas.offsetLeft
    var y = e.clientY - canvas.offsetTop;

    current = find(x, y);
    if (current < 0){

    }
    else
        active = true

}, false)

canvas.addEventListener("mouseup", function (e){
    active = false
})

canvas.addEventListener("mousemove", function (e) {
    var x = e.clientX - canvas.offsetLeft;
    var y = e.clientY - canvas.offsetTop;

    if (active) {
        defined_points[current].x = x;
        defined_points[current].y = y;
        draw();
    }

    else {
        if (find(x, y) >= 0) //inside a square
            document.getElementById("myCanvas").style.cursor = "pointer";
        else
            document.getElementById("myCanvas").style.cursor = "auto";
    }
}, false);

function find(x, y) {
    for (var i = 0; i < npoints; i++)
        if (defined_points[i].x - point_len / 2 <= x
            && x <= defined_points[i].x + point_len / 2
            && defined_points[i].y - point_len / 2 <= y
            && y <= defined_points[i].y + point_len / 2)
            return i;
    return -1; //Fant ikke noe rektangel i nærheten av muspeker
}

function draw(){

    // baseline drawing of all initial points
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";

    for (var i = 0; i < npoints; i++){
        ctx.strokeRect(defined_points[i].x - point_len / 2, defined_points[i].y - point_len
            / 2, point_len, point_len);
    }
    ctx.stroke()

    steps = 1/100
    degree_1 = []
    degree_2 = []
    degree_3 = []

    for (let i = 0; i < 1; i+= steps){
        for (j = 1; j < defined_points.length; j++){
            degree_1.push(lerp(defined_points[j-1], defined_points[j], i))
        }
        for (j = 1; j < degree_1.length; j++){
            degree_2.push(lerp(degree_1[j-1], degree_1[j], i))
        }
        degree_3.push(lerp(degree_2[0], degree_2[1], i))
    }

    console.log(degree_1)
    ctx.moveTo(degree_3[0].x, degree_3[0].y)
    for (each in degree_3){
        ctx.lineTo(each.x, each.y)
    }
    ctx.stroke()

}

function lerp(p1, p2, t){
    return new Point((1-t)*p1.x + t*p2.x, (1-t)*p1.y + t*p2.y)

}

function splineGeneration(points){
    temp_array = []


    for (let i of points){
        temp_array.push(i)
    }
    console.log(points)
    console.log(temp_array)

    for (let i = 1; i < temp_array.length; i++){
    }

    console.log(temp_array)

}

draw()