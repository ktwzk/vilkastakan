p5.disableFriendlyErrors = true;

let particles = [];
const particleCount = 2025;
const diffusionRate = 0.2025;
let leftColor, rightColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(2);
  frameRate(25);
  noStroke();
  background(0);

  leftColor = color(random(255), random(255), random(255), 127);
  rightColor = invertColor(leftColor);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: random(0, width / 2),
      y: random(height),
      color: leftColor,
      isLeft: true
    });

    particles.push({
      x: random(width / 2, width),
      y: random(height),
      color: rightColor,
      isLeft: false
    });
  }
}

function draw() {
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];

    p.x += random(-8, 8);
    p.y += random(-1, 1);
    p.x = constrain(p.x, 0, width);
    p.y = constrain(p.y, 0, height);

    const crossedLeft = p.isLeft && p.x > width / 2;
    const crossedRight = !p.isLeft && p.x < width / 2;

    if (crossedLeft || crossedRight) {
      if (random() < diffusionRate) {
        p.isLeft = !p.isLeft;
      } else {
        p.x = crossedLeft ? width / 2 - 1 : width / 2 + 1;
      }
    }

    fill(p.color);
    rect(p.x, p.y, 4, 1);
  }
}

function invertColor(c) {
  return color(255 - red(c), 255 - green(c), 255 - blue(c), 127);
}


function windowResized() {
  
  background(0);
  resizeCanvas(windowWidth, windowHeight);
}

