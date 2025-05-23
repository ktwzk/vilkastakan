let particles = [];
const particleCount = 2025 * 2;
const diffusionRate = 0.2025;
let leftColor, rightColor, thirdColor;
let vignetteRadius;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(2);
  frameRate(25);
  noStroke();
  
  initColorsAndParticles();
}

function initColorsAndParticles() {
  vignetteRadius = min(windowHeight,windowWidth) / 2 - 10;
  leftColor = color(random(150, 255), random(50, 150), random(0, 50), 127);
  rightColor = color(random(0, 50), random(50, 150), random(150, 255), 127);
  if (random(100) > 50) {
    [leftColor, rightColor] = [rightColor, leftColor];
  }
  thirdColor = makeThirdColor(leftColor, rightColor);
  background(thirdColor);
  
  particles = [];
  
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
      xRight = width / 2 + (windowWidth / 1000);
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
  fill(red(thirdColor), green(thirdColor), blue(thirdColor), 10); 
  rect(0, 0, width, height);

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];

    if (width < height) {
      p.x += random(-1, 1);
      p.y += random(-8, 8);
    } else {
      p.x += random(-8, 8);
      p.y += random(-1, 1);
    }

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
    if (width < height) {
      rect(p.x, p.y, 1, 4);
    } else {
      rect(p.x, p.y, 4, 1);
    }
    
  }
}

function invertColor(c) {
  return color(255 - red(c), 255 - green(c), 255 - blue(c), 127);
}

function makeThirdColor(c1, c2) {
  return color((red(c1)+red(c2))/4, (green(c1)+green(c2))/4, (blue(c1)+blue(c2))/4);
}

function mouseClicked() {
  initColorsAndParticles();
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initColorsAndParticles();
}