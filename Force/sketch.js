//A field that would restrain the dir of particles by N2 Law
let array_v = [];
let vertices = 3;
let lens = 100;
function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  polygon(vertices, lens);
}

function draw() {
  background(0);
  fill(255, 0, 0);
  ellipse(width / 2, height / 2, 1, 1);
  translate(width / 2, height / 2);
  //testing if the functions work
  stroke(255, 125);
  strokeWeight(4);
  /* polygon() is okay*/
  for (var i = 0; i < vertices; i++) {
    if (i == vertices - 1) {
      line(array_v[i].x, array_v[i].y, array_v[0].x, array_v[0].y);
    } else {
      line(array_v[i].x, array_v[i].y, array_v[i + 1].x, array_v[i + 1].y);
    }
  }
  console.log(array_v[0].x); //5
  console.log(array_v[1].x); //-90
  console.log(array_v[2].x); //83

  /* slopeGetter() and interceptGetter()*/
  for (var i = array_v[0].x; i > array_v[1].x; i--) {
    stroke(255, 255, 0);
    strokeWeight(4);
    point(i, slopeGetter(0) * i + interceptGetter(0));
  }
  for (var i = array_v[1].x; i < array_v[2].x; i++) {
    stroke(255, 0, 0);
    strokeWeight(4);
    point(i, slopeGetter(1) * i + interceptGetter(1));
  }
  for (var i = array_v[2].x; i > array_v[0].x; i--) {
    stroke(255, 0, 255);
    strokeWeight(4);
    point(i, slopeGetter(2) * i + interceptGetter(2));
  }
  // console.log(slopeGetter(0));
}

// vector usage here is just for convinience
function polygon(v, l) {
  var pangle = 360 / v; //angle in polar coordiante
  var start = 90 - v;
  //calculating each vetice's coordinate in cartesian
  for (var i = 0; i < v; i++) {
    var tempx = floor(l * cos(start + pangle * i));
    var tempy = floor(l * sin(start + pangle * i));
    var tempv = createVector(tempx, tempy);
    array_v.push(tempv);
  }
}

function slopeGetter(a) {
  //this part calc slope, para takes index in the array
  if (a == vertices - 1) {
    return (array_v[a].y - array_v[0].y) / (array_v[a].x - array_v[0].x);
  } else {
    return (
      (array_v[a + 1].y - array_v[a].y) / (array_v[a + 1].x - array_v[a].x)
    );
  }
}

function interceptGetter(a) {
  return array_v[a].y - slopeGetter(a) * array_v[a].x;
}
/*so the function for the edges are in this manner: array_v[a].y = slopeGetter(a) * array_v[a].x + interceptGetter(a)
  by input the range of the y axis or x axis, we could get the coordinate on that line*/

function pointGetter() {}

function forceField() {}

function particles() {}

function edge() {}
