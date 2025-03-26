let colors = [
[13, 16, 27],
[107, 35, 65],
];

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL), pixelDensity(2), frameRate(30), createLoop({duration: 256}), animLoop.noiseFrequency(0.4);
}

function draw() {
	background(238, 36, 61);
	let e = PI / 36;
	for (let o = 0; o < 2; o++) 
		push(), 
	      resetMatrix(),
		  rotateX(map(animLoop.noise({seed: o*3}), 0, 1, -e, e)),
		  rotateZ(map(animLoop.noise({seed: o*5}), 0, 1, -e, e)),
		  dS(colors[o], 1, 2),
		pop();
	resetMatrix();
	translate(0,0,0), rotateX(map(animLoop.noise({radius:1}), 0, 1, -PI/24, PI/24)), rotateY(0);
	dSA([40, 26, 45], [175, 39, 71], map(animLoop.noise({radius:1}), 0, 1, 0, 2), height);
	
    let pereklad = map(animLoop.noise({radius: 0.1}), -1, 1, -width/2, width/2);

	push();
	stroke(13, 16, 27);
	strokeWeight(40);
	ortho();
	resetMatrix();
	translate(0,0,400);
	line(pereklad, -height / 2, pereklad, height / 2);
    line(width / 2, 0, -width / 2, 0);
    perspective();
    resetMatrix();
	translate(0,0,0);
	
    pop();
}

function dS(e, o, c) {
	stroke(e), strokeWeight(o);
	for (let e = 1 * -width; e < 1 * width; e += 2.5) line(e, c * -height, e, c * height)
}


function dSA(p, p2, o, q) {
	let alt = true;
	stroke(p), strokeWeight(o);
	for (let e = 1 * -width; e < 1 * width; e += 2.5) {
	 if (alt) {stroke(p)} else {stroke(p2)}; 
     line(e, -q, e, q);
     alt = !alt;
    }
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}
