let particles = [];
const particleCount = 2025;
const diffusionRate = 0.2025;
let leftColor, rightColor;
let vignetteRadius;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(2);
  frameRate(25);
  noStroke();
  background(0);

  vignetteRadius = windowWidth / 4;
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
  fill(0, 5); 
  rect(0, 0, width, height);

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
