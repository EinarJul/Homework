
var canvas = document.getElementById("myCanvas");
if(canvas.getContext){
    var ctx = canvas.getContext("2d");
}

// Oppgave 1
ctx.fillStyle = "#EEEE9B"
function draw(){

    // Here we store the amount of points we want to generate (a good circle forms at around 20-25 points)
    resolution = document.getElementById("resolution").value
    // Here we decide on how many times we want to itterate our kx for
    kx = document.getElementById("kx").value
    // Since a circle is Math.PI *2 we divide it by the resolution to get our total amount of points
    steps = (Math.PI * 2) / resolution
    // These are arrays to store our coordinate in, we generate these below
    x_cords = []
    y_cords = []
    x_1_cords = []
    y_1_cords = []

    // Every time we draw the circle we want to clear the old one first and then make our background
    ctx.clearRect(0,0,canvas.width, canvas.height)
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    i = 0

    // Here i use a while loop but it can work easily as a for function as well
    // Here i = 0 and with every iteration we slowly come closer to being pi*2
    // with our steps variable above handling how quickly we approach that
    while (i < (Math.PI * 2)){
        // Since the formula for these is defined by x + a*cos(i) and y + b*cos(i) where x and y are our positions and
        // the multiplication the width of the circle we can define these by the size of our canvas

        x = canvas.width / 2 + canvas.width/2 * Math.cos(i)
        y = canvas.height/2 + canvas.height/2 * Math.sin(i)
        // We push our coordinates into our array to draw later
        x_cords.push(x)
        y_cords.push(y)
        x_1 = canvas.width / 2 + canvas.width/2 * Math.cos(i*kx)
        y_2 = canvas.width / 2 + canvas.width/2 * Math.sin(i*kx)
        x_1_cords.push(x_1)
        y_1_cords.push(y_2)
        i += steps
    }

    drawCords(x_cords, y_cords, x_1_cords, y_1_cords)

    // Here we draw our coordinates using a for loop
    // One loop for drawing our circle and the second loop to draw the shape approximating the kx
    function drawCords(x, y, x_1, y_1){
        ctx.beginPath()
        for (i=0; i < x_cords.length; i++){
            ctx.lineTo(x[i], y[i])
        }
        ctx.closePath()
        ctx.stroke()

        for (i = 0; i < x_1_cords.length; i++){
            console.log(i)
            ctx.moveTo(x[i], y[i])
            ctx.lineTo(x_1[i], y_1[i])
        }
        ctx.stroke()

    }
}

// Oppgave 2
function draw_Squares(){
    // Here our resolution value is how many times we want to iterate on our boxes going inwards
    resolution = document.getElementById("resolution").value
    // Here we get our number of divisions
    division_number = document.getElementById("kx").value;
    // I added a little slider for the p value, its nost necessary but it looks neat sometimes
    p = document.getElementById("p_value").value;
    // Here we define the division of x and y
    // Example if our canvas is 1200 and is divided by 3 we get 400
    // We can then start with our p0 being 0,0 and with every for loop getting
    // +400 +400 to represent that the p0 is now in a new start
    // p1 gets to be [0+400, 0] for every loop, p2 [+400, +400] p3[0, +400] and so on for any arbitrarily sized canvas
    // and division number
    division_x = canvas.width/division_number;
    division_y = canvas.height/division_number;
    // We clear the view every time before drawing
    ctx.clearRect(0,0,canvas.width, canvas.height)
    // Here is a typical x and y coordinate for loop
    // i iterates through the canvas on the y axis and starts at point 0 up in the top left corner
    // j starts in the same corner but goes on the x axis
    // j will run for the row until it hits the wall and then i will count up and j starts on the new row
    // repeating until we are all the way in the bottom right corner
    for (let i = 0; i <= canvas.height; i+=division_y){
        // because the second image we generate has them going both forwards and backwards i use a quick fix mod counter
        // can probably be implemented directly and easily in some other way
        mod_counter = 0
        for (let j=0; j < canvas.width; j+=division_x) {
            console.log(division_x)
            // Here we set out coordinates based on the width and height of our canvas
            // j and i and 1 will always be the size of the canvas
            // as such p_2 is in the top right corner because the canvas divided by 1 is the canvas size
            // so we can push into p_2 j=0 + the division_x and for every iteration it will work
            p_1 = [[j,i]]
            p_2 = [[j+division_x,i]]
            p_3 = [[j+division_x, i+division_y]]
            p_4 = [[j, i+division_y]]
            if (mod_counter % 2 === 0){
                draw_spiral(p_1, p_2, p_3, p_4)
            } else {
                draw_spiral(p_4, p_3, p_2, p_1)
            }
            mod_counter += 1
            /*
            p_1 = [[j, i]]
            p_2 = [[j+division_x, i]]
            p_3 = [[j+division_x, i+division_y]]
            p_4 = [[j, i+division_y]]

            */
        }
        //  draw_spiral(p_1, p_2, p_3, p_4)
    }
}

// this is where the spiral is actually drawn, it takes any 4 points as an argument so we could draw
// from point 2 to 0 to 1 to 3 if we wanted
function draw_spiral(p_1, p_2, p_3, p_4){
    ctx.beginPath()
    // Every loop starts by putting in the new numbers to the coordinate arrays
    // we then go through the current (not new) points and to a line to to each of them as normal
    // at the end we do the stroke and are done
    // i use a pseudo tuple to store my coordinates but its probably overkill for this assignment
    for (i = 0; i < resolution; i++){
        p1_x = (1-p)*p_1[i][0] + p*p_2[i][0]
        p1_y = (1-p)*p_1[i][1] + p*p_2[i][1]
        p2_x = (1-p)*p_2[i][0] + p*p_3[i][0]
        p2_y = (1-p)*p_2[i][1] + p*p_3[i][1]
        p3_x = (1-p)*p_3[i][0] + p*p_4[i][0]
        p3_y = (1-p)*p_3[i][1] + p*p_4[i][1]
        p4_x = (1-p)*p_4[i][0] + p*p_1[i][0]
        p4_y = (1-p)*p_4[i][1] + p*p_1[i][1]
        p_1.push([p1_x, p1_y])
        p_2.push([p2_x, p2_y])
        p_3.push([p3_x, p3_y])
        p_4.push([p4_x, p4_y])
        ctx.lineTo(p_1[i][0],p_1[i][1])
        ctx.lineTo(p_2[i][0],p_2[i][1])
        ctx.lineTo(p_3[i][0],p_3[i][1])
        ctx.lineTo(p_4[i][0],p_4[i][1])

    }
    ctx.stroke()

}

//draw()
draw_Squares()

