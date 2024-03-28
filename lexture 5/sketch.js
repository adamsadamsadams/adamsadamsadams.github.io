let img;

// Load the image and create a p5.Image object.
function preload() {
  img = loadImage("./images.jpeg");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    image(img, 0, 0, width, height);
if(
    mouseX > width/2
    &&
    mouseY < height/2
    ) {
    background("red");
    circle(mouseX, mouseY, 50);
} 

if(
    mouseX > width/2
    &&
    mouseY > height/2
    ) {
    background("blue");
    square(mouseX, mouseY, 50);
} 

}