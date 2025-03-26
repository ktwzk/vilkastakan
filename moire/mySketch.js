let colors = [
	[102, 176, 199],
	[52, 65, 157],
];

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL), pixelDensity(2), frameRate(30), createLoop({duration: 16}), animLoop.noiseFrequency(0.3)
}

function draw() {
	background(206, 217, 236);
	let e = PI / 36;
	for (let o = 0; o < 2; o++) 
		push(), 
		  rotateX(map(animLoop.noise({seed: o*3}), 0, 1, -e, e)),
			rotateZ(map(animLoop.noise({seed: o*5}), 0, 1, -e, e)),
		  dS(colors[o], 1, 2),
		pop();
	translate(0,0,100), rotateX(0), rotateY(0);
	dS([206, 217, 236], 2, 0.01);
}

function dS(e, o, c) {
	stroke(e), strokeWeight(o);
	for (let e = 1 * -width; e < 1 * width; e += 2.5) line(e, c * -height, e, c * height)
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}
