let palettes = [
  [[249, 197, 196], [239, 169, 197], [209, 168, 217], [174, 158, 225], [147, 154, 223], [249, 197, 196]], // 04:00-08:00 ;18:00-22:00
  [[255, 255, 255], [12, 230, 242], [0, 152, 219], [30, 87, 156], [32, 53, 98], [32, 21, 51]], // 08:00-18:00
  [[2, 4, 8], [19, 25, 52], [38, 38, 94], [74, 61, 133], [117, 87, 168], [2, 4, 8]] // 22:00-04:00
];

let colors = palettes[0];

let pereklad;

p5.disableFriendlyErrors = true;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pixelDensity(2);
  frameRate(12);
  createLoop({ duration: 256 });
  animLoop.noiseFrequency(0.1);
  selectPaletteBasedOnTime();
  pereklad = random(-width/4, width/4);
}

function draw() {
  if (frameCount % (12 * 60 * 60) == 0) {
    selectPaletteBasedOnTime();
  }

  background(colors[0]);
  let mA = PI / 24;

  for (let o = 0; o < 2; o++) {
    push();
    rotateX(map(animLoop.noise({ seed: o * 3 }), -1, 1, -mA, mA));
    rotateZ(map(animLoop.noise({ seed: o * 5 }), -1, 1, -mA, mA));
    dS(colors[o+1], 1, 1);
    pop();
  }

  push();
  rotateX(map(animLoop.noise({ radius: 0.1 }), -1, 1, -mA, mA));
  dSA(colors[3], colors[4], map(animLoop.noise({ radius: 0.1 }), -1, 1, 1, 2), height);
  pop();

  push();
  stroke(colors[5]);
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

function selectPaletteBasedOnTime() {
  const now = new Date();
  const hours = now.getHours();
  
  if ((hours >= 4 && hours < 8) || (hours >= 18 && hours < 22)) {
    colors = palettes[0];
  } else if (hours >= 8 && hours < 18) {
    colors = palettes[1];
  } else {
    colors = palettes[2];
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  selectPaletteBasedOnTime();
}
