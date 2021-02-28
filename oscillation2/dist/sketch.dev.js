"use strict";

var delta;
var step = 0.00001;
var n = 20; //number of blobs

var r = 100;
var vnumber = 0;
var maxRange = 300;

function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  delta = random(20);
}

function draw() {
  // blendMode(BLEND);
  // blendMode(ADD);
  vnumber = random(20, 100);
  background(0, 10);
  noStroke();
  var t = millis() / 1000;

  for (var i = 0; i < n; i++) {
    var noisiness = maxRange * (i / n);
    fill(255, 255, 250, 5);
    blob(r, width / 2, height / 2, delta, t - i * step, noisiness, vnumber);
  }
}

function blob(size, xC, yC, k, t, range, vn) {
  beginShape();
  var angleStep = 360 / vn;

  for (var angle = 0; angle <= 360 + 2 * angleStep; angle += angleStep) {
    var _r = size + noise(k * abs(cos(angle)), k * abs(sin(angle)), t) * range;

    curveVertex(xC + _r * cos(angle), yC + _r * sin(angle));
  }

  endShape();
}