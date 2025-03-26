let colors = [[13, 16, 27], [107, 35, 65]];

p5.disableFriendlyErrors = true;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pixelDensity(2);
  frameRate(12);
  createLoop({ duration: 256 });
  animLoop.noiseFrequency(0.1);
}

function draw() {
  background(238, 36, 61);
  let mA = PI / 24;

  for (let o = 0; o < 2; o++) {
    push();
    rotateX(map(animLoop.noise({ seed: o * 3 }), -1, 1, -mA, mA));
    rotateZ(map(animLoop.noise({ seed: o * 5 }), -1, 1, -mA, mA));
    dS(colors[o], 1, 1);
    pop();
  }

  push();
  rotateX(map(animLoop.noise({ radius: 0.1 }), -1, 1, -mA, mA));
  dSA([40, 26, 45], [175, 39, 71], map(animLoop.noise({ radius: 0.1 }), -1, 1, 1, 2), height);
  pop();

  let pereklad = map(animLoop.noise({ radius: 0.05 }), -1, 1, -width / 2, width / 2);

  push();
  stroke(13, 16, 27);
  strokeWeight(40);
  ortho();
  translate(0, 0, 400);
  line(pereklad, -height / 2, pereklad, height / 2);
  line(width / 2, 0, -width / 2, 0);
  perspective();
  pop();
}

function dS(e, o, c) {
  stroke(e);
  strokeWeight(o);
  beginShape(LINES);
  for (let x = -width; x < width; x += 2.5) {
    vertex(x, -c * height);
    vertex(x, c * height);
  }
  endShape();
}

function dSA(p, p2, o, q) {
  strokeWeight(o);
  
  stroke(p);
  beginShape(LINES);
  for (let e = -width; e < width; e += 2.5) {
    if (e % 5 === 0) {
      vertex(e, -q);
      vertex(e, q);
    }
  }
  endShape();

  stroke(p2);
  beginShape(LINES);
  for (let e = -width; e < width; e += 2.5) {
    if (e % 5 !== 0) {
      vertex(e, -q);
      vertex(e, q);
    }
  }
  endShape();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
