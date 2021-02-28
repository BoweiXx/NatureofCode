
let tonerange = 14;
let xarray = [];
let yarray = [];
let matrix = [xarray, yarray];
let freqarray = []
let alphanum = 255;
let time = 0;
let par = 0;
let thresh = 0; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  par = width/tonerange;

  for(var i = 0; i < tonerange; i++){
    freqarray[i] = 880 * (i + 1) ;
  }
  thresh = height/2;
  
}

function draw() {
  background(0,20);
  for (var i = 1; i < tonerange + 1; i++) {
    xarray[i] = (width / tonerange) * i - width / tonerange / 2;
  }
  xarray.shift();
  console.log(matrix);

  for (var i = 0; i < xarray.length; i++) {
    noStroke();
    fill(255,90,0,90)
    ellipse(xarray[i], yarray[i], par, par);
  }

  //yloc updater
  for(let i = 0; i < tonerange; i++){
    yarray[i] = height/2 * sin(freqarray[i] + time) + height/2 ;
    //time step = 13

    time += 13;
    if(yarray[i] == height/2);
      fill(255,0,0);
  }
}