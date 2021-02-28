"use strict";

var tonerange = 14;
var xarray = [];
var yarray = [];
var matrix = [xarray, yarray];
var freqarray = [];
var alphanum = 255;
var time = 0;
var par = 0;
var thresh = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  par = width / tonerange;

  for (var i = 0; i < tonerange; i++) {
    freqarray[i] = 880 * (i + 1);
  }

  thresh = height / 2;
}

function draw() {
  background(0, 20);

  for (var i = 1; i < tonerange + 1; i++) {
    xarray[i] = width / tonerange * i - width / tonerange / 2;
  }

  xarray.shift();
  console.log(matrix);

  for (var i = 0; i < xarray.length; i++) {
    noStroke();
    fill(255, 90, 0, 90);
    ellipse(xarray[i], yarray[i], par, par);
  } //yloc updater


  for (var _i = 0; _i < tonerange; _i++) {
    yarray[_i] = height / 2 * sin(freqarray[_i] + time) + height / 2; //time step = 13

    time += 13;
    if (yarray[_i] == height / 2) ;
    fill(255, 0, 0);
  }
}