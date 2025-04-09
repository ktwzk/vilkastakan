let particles = [];
const particleCount = 2025 * 2;
const diffusionRate = 0.2025;
let leftColor, rightColor;
let vignetteRadius;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(2);
  frameRate(25);
  noStroke();
  background(0);

  initParticles();
}

function initParticles(){
  particles = [];
  vignetteRadius = min(windowHeight,windowWidth)/2 - 10;
  leftColor = color(random(255), random(255), random(255), 127);
  rightColor = invertColor(leftColor);


  for (let i = 0; i < particleCount; i++) {
    let angleLeft = random(TWO_PI);
    let radiusLeft = random(vignetteRadius);
    let xLeft = width / 2 + radiusLeft * cos(angleLeft);
    let yLeft = height / 2 + radiusLeft * sin(angleLeft);

    if (xLeft >= width / 2) {
      xLeft = width / 2 - (windowWidth / 1000);
    }

    particles.push({
      x: xLeft,
      y: yLeft,
      color: leftColor,
      isLeft: true
    });

    let angleRight = random(TWO_PI);
    let radiusRight = random(vignetteRadius);
    let xRight = width / 2 + radiusRight * cos(angleRight + PI);
    let yRight = height / 2 + radiusRight * sin(angleRight + PI);


    if (xRight <= width / 2) {
      xRight = width / 2 +  (windowWidth / 1000);
    }

    particles.push({
      x: xRight,
      y: yRight,
      color: rightColor,
      isLeft: false
    });
  }
}

function draw() {
  fill(0, Math.trunc(127/12)); 
  rect(0, 0, width, height);

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    
    if (width > height) {
      p.x += random(-8, 8);
      p.y += random(-1, 1);
    }
    else {
      p.x += random(-1, 1);
      p.y += random(-8, 8);
    }
    
    
    p.x = constrain(p.x, 0, width);
    p.y = constrain(p.y, 0, height);

    let crossedLeft = p.isLeft && p.x > width / 2;
    let crossedRight = !p.isLeft && p.x < width / 2;
    
    let d = dist(p.x, p.y, width/2, height/2);
    let crossedVignette = d > vignetteRadius;

    if (crossedLeft || crossedRight || crossedVignette) {
      if (random() < diffusionRate) {
        if (crossedLeft || crossedRight) {
          p.isLeft = !p.isLeft;
        }
      } else {
        if (crossedLeft || crossedRight) {
          p.x = crossedLeft ? width / 2 - 1 : width / 2 + 1;
        }
        
        if (crossedVignette) {
          let angle = atan2(p.y - height/2, p.x - width/2);
          p.x = width/2 + (vignetteRadius-8) * cos(angle);
          p.y = height/2 + (vignetteRadius-8) * sin(angle);
        }
      }
    }

    fill(p.color);
    if (width > height) {
      rect(p.x, p.y, 4, 1);
    }
    else {
      rect(p.x, p.y, 1, 4);
    }
    
  }
}
function invertColor(c) {
  return color(255 - red(c), 255 - green(c), 255 - blue(c), 127);
}

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  initParticles();
}