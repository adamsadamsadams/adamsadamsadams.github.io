class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.r = random(1, 15);
      this.xSpeed = random(-2, 5);
      this.ySpeed = random(-2, 5);
      this.color = color(random(255), random(255), random(255));
      this.history = [];
    }
    
    createParticle() {
      noStroke();
      fill(this.color);
      circle(this.x, this.y, this.r);
      
      // Create particle trails
      for (let i = 0; i < this.history.length; i++) {
        let pos = this.history[i];
        let alpha = map(i, 0, this.history.length, 0, 255);
        fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], alpha);
        circle(pos.x, pos.y, this.r);
      }
    }
    
    moveParticle() {
      if (this.x < 0 || this.x > width)
        this.xSpeed *= -1;
      if (this.y < 0 || this.y > height)
        this.ySpeed *= -1;
      this.x += this.xSpeed;
      this.y += this.ySpeed;
      
      // Record particle's position for trails
      let v = createVector(this.x, this.y);
      this.history.push(v);
      if (this.history.length > 25) {
        this.history.splice(0, 1);
      }
    }
    
    joinParticles(particles) {
      particles.forEach(element => {
        let dis = dist(this.x, this.y, element.x, element.y);
        if (dis < 85) {
          stroke(255, 255, 255, 50);
          line(this.x, this.y, element.x, element.y);
        }
      });
    }
  }
  
  let particles = [];
  let particleMode = false;
  let offScreenGraphics;
  let colorSlider, speedSlider;
  let lastColorVal = 127;
  let lastSpeedVal = 5;
  
  function setup() {
    createCanvas(windowWidth, windowHeight);
    offScreenGraphics = createGraphics(width, height);
    createSwitchButton();
    createColorSlider(); // Add Color Slider
    createSpeedSlider(); // Add Speed Slider
  }
  
  function createSwitchButton() {
    let switchButton = createButton('???');
    switchButton.position(20, 210);
    switchButton.mousePressed(toggleParticleMode);
    switchButton.style('font-family', 'Arial'); // Set the font-family
    switchButton.style('font-size', '16px'); // Set the font-size
    switchButton.style('width', '120px'); // Set the width
    switchButton.style('height', '40px'); // Set the height
}
  // Create Color Slider
  function createColorSlider() {
    colorSlider = createSlider(0, 255, lastColorVal);
    colorSlider.position(30, 150);
    colorSlider.style('width', '80px');
    colorSlider.input(changeParticleColor);
  }

  // Change Particle Color based on Slider Value
  function changeParticleColor() {
    let val = colorSlider.value();
    if (val !== lastColorVal) {
      lastColorVal = val;
      particles.forEach(particle => {
        particle.color = color(val, val, val);
      });
    }
  }

  // Create Speed Slider
  function createSpeedSlider() {
    speedSlider = createSlider(1, 10, lastSpeedVal);
    speedSlider.position(30, 180);
    speedSlider.style('width', '80px');
    speedSlider.input(changeParticleSpeed);
  }

  // Change Particle Speed based on Slider Value
  function changeParticleSpeed() {
    let val = speedSlider.value();
    if (val !== lastSpeedVal) {
      lastSpeedVal = val;
      particles.forEach(particle => {
        particle.xSpeed = random(-val, val);
        particle.ySpeed = random(-val, val);
      });
    }
  }
  
  function draw() {
    if (!particleMode) {
      background(255);
    } else {
      updateBackground();
      updateParticles();
    }
  }
  
  
  
  function updateBackground() {
    offScreenGraphics.clear();
    let density = 2000; // Number of stars
    let speed = 10; // Speed of the background animation
    let colorAlpha = 120; // Alpha value of star color
    offScreenGraphics.noStroke();
    for (let i = 0; i < density; i++) {
      let x = random(width);
      let y = random(height);
      let size = random(1, 3);
      let alpha = random(100, colorAlpha);
      offScreenGraphics.fill(255, alpha);
      offScreenGraphics.circle(x, y, size);
      x += speed * noise(i);
      y += speed * noise(i + 1);
    }
    image(offScreenGraphics, 0, 0);
  }
  
  function updateParticles() {
    if (particles.length > 0) {
      for (let i = particles.length - 1; i >= 0; i--) {
        let particle = particles[i];
        particle.createParticle();
        particle.moveParticle();
        particle.joinParticles(particles.slice(i));
      }
    }
  }
  
  function toggleParticleMode() {
    particleMode = !particleMode;
    if (particleMode) {
      particles = [];
      for (let i = 0; i < width / 10; i++) {
        particles.push(new Particle(random(width), random(height)));
      }
    }
  }
  
  function mouseClicked() {
    if (particleMode) {
      for (let i = 0; i < 4; i++) {
        particles.push(new Particle(mouseX, mouseY));
      }
    }
  }


  function keyPressed() {
    if (key === ' ') {
        particleMode = !particleMode;
        return false; // Prevent default behavior
    } else if (key === 'b' || key === 'B') {
        background(random(255), random(255), random(255));
    }
}