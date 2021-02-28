let delta;
let step = 0.00001;
let n = 20; //number of blobs
let r = 100;
let vnumber = 0;
let maxRange = 300;
function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  delta = random(20);
}

function draw() {
  // blendMode(BLEND);
  // blendMode(ADD);
  vnumber = random(20,100);
  background(0,10);
  noStroke();
  let t = millis()/1000;
  for (let i = 0; i < n; i++) {
    let noisiness = maxRange * (i / n);
    fill(255,255,250,5);
    blob(r, width / 2, height / 2, delta, t - i * step, noisiness,vnumber);
  }
}

function blob(size, xC, yC, k, t, range,vn) {
  beginShape();
  let angleStep = 360 / vn;
  for (let angle = 0; angle <= 360 + 2 * angleStep; angle += angleStep) {
    let r = size + noise(k * abs(cos(angle)), k * abs(sin(angle)), t) * range;
    curveVertex(xC + r * cos(angle), yC + r * sin(angle));    
  }
  endShape();
}
