let shapes = [];

function setup() {
  createCanvas(800, 800);
  noLoop(); // Lai izveidotu tikai vienu kadru
  background(255);
  generateShapes();
}

function draw() {
  background(255); // Balts fons
  for (let shape of shapes) {
    shape.display();
  }
}

function generateShapes() {
  let numShapes = 150;
  for (let i = 0; i < numShapes; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(10, 100);
    let shapeType = random(["ellipse", "rect", "triangle", "line"]);
    let angle = random(TWO_PI); // Random angle for rotation
    let shape = new Shape(x, y, size, shapeType, angle);
    shapes.push(shape);
  }
}

class Shape {
  constructor(x, y, size, type, angle) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.type = type;
    this.angle = angle;
    this.color = this.randomColor();
  }

  randomColor() {
    return color(random(255), random(255), random(255), random(100, 200));
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    fill(this.color);
    noStroke();
    if (this.type === "ellipse") {
      ellipse(0, 0, this.size, this.size * random(0.5, 1.5));
    } else if (this.type === "rect") {
      rect(0, 0, this.size, this.size * random(0.5, 1.5));
    } else if (this.type === "triangle") {
      triangle(
        -this.size / 2, this.size / 2,
        this.size / 2, this.size / 2,
        0, -this.size / 2 * random(1, 2)
      );
    } else if (this.type === "line") {
      stroke(this.color);
      strokeWeight(random(1, 5));
      line(0, 0, this.size, this.size * random(0.5, 1.5));
    }
    pop();
  }
}
