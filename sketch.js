
let shapes = [];
const MAX_SHAPES = 50;
let palette;

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  
 
  palette = [
    color(255, 89, 94, 150),  
    color(255, 202, 58, 150), 
    color(138, 201, 38, 150), 
    color(25, 130, 196, 150), 
    color(106, 76, 147, 150)  
  ];

  background(10); 
  
  
  for (let i = 0; i < MAX_SHAPES; i++) {
    shapes.push(new GeoShape());
  }
}

function draw() {
  
  background(10, 10, 10, 5); 

  for (let s of shapes) {
    s.move();
    s.display();
  }
}

class GeoShape {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(width);
    this.y = random(height);
    this.w = random(20, 80);
    this.h = random(20, 80);
    this.color = random(palette);
    this.type = random(10);
    // Añadimos velocidad para que no sea estático
    this.speedX = random(-0.5, 0.5);
    this.speedY = random(-0.5, 0.5);
    this.rot = 0;
    this.rotSpeed = random(-0.02, 0.02);
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.rot += this.rotSpeed;

    if (this.x < -100 || this.x > width + 100) this.x = random(width);
    if (this.y < -100 || this.y > height + 100) this.y = random(height);
  }

  display() {
    push(); 
    translate(this.x, this.y);
    rotate(this.rot);
    
    noStroke();
    fill(this.color);
    
    // 
    blendMode(ADD); 

    if (this.type < 5) {
      rectMode(CENTER);
      rect(0, 0, this.w, this.h);
    } else {
      triangle(
        -this.w/2, this.h/2, 
        0, -this.h/2, 
        this.w/2, this.h/2
      );
    }
    
    pop(); 
    blendMode(BLEND); 
  }
}


function keyPressed() {
  if (key === 's' || key === 'S') saveCanvas('mi_arte_pro', 'png');
  if (key === ' ') background(10); 
}