"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//A field that would restrain the dir of particles by N2 Law
var array_v = [];
var vertices = 3;
var lens = 300;
var parnum = 5000;
var particles = [];
var fieldVector = [];
var unit = 1600; //num of units

var forceMag = 1;
var h = 100,
    s = 360,
    b = 360;
var xoff = 0;
var yoff = 0;
var time = 0;
var perlinstep = 0.1;

function setup() {
  angleMode(DEGREES);
  colorMode(HSB);
  createCanvas(windowWidth, windowHeight);
  polygon(vertices, lens);

  for (var i = 0; i < parnum; i++) {
    particles[i] = new particle();
  }
}

function draw() {
  push();
  colorMode(RGB);
  background(0, 120);
  pop();
  forceGen();

  for (var i = 0; i < particles.length; i++) {
    particles[i].accelerate_change(fieldVector);
    particles[i].update();
    particles[i].display();
    particles[i].edgeDetect();
  } //

  /*---------------------------------------testing code-----------------------------------------------*/
  // push();
  // translate(width / 2, height / 2);
  // ellipse(width / 2, height / 2, 1, 1);
  // //testing if the functions work
  // stroke(255, 125);
  // strokeWeight(4);
  // /* polygon() is okay*/
  // for (var i = 0; i < vertices; i++) {
  //   if (i == vertices - 1) {
  //     line(array_v[i].x, array_v[i].y, array_v[0].x, array_v[0].y);
  //   } else {
  //     line(array_v[i].x, array_v[i].y, array_v[i + 1].x, array_v[i + 1].y);
  //   }
  // }
  // pop();
  // console.log(array_v[0].x); //5
  // console.log(array_v[1].x); //-90
  // console.log(array_v[2].x); //83 : l = 100

  /* slopeGetter() and interceptGetter() are okay*/
  // for (var i = array_v[0].x; i > array_v[1].x; i--) {
  //   stroke(255, 255, 0);
  //   strokeWeight(4);
  //   point(i, slopeGetter(0) * i + interceptGetter(0));
  // }
  // for (var i = array_v[1].x; i < array_v[2].x; i++) {
  //   stroke(255, 0, 0);
  //   strokeWeight(4);
  //   point(i, slopeGetter(1) * i + interceptGetter(1));
  // }
  // for (var i = array_v[2].x; i > array_v[0].x; i--) {
  //   stroke(255, 0, 255);
  //   strokeWeight(4);
  //   point(i, slopeGetter(2) * i + interceptGetter(2));
  // }
  // console.log("slope" + slopeGetter(2));

  /*---------------------------------------testing code-----------------------------------------------*/

} // vector usage here is just for convinience


function polygon(v, l) {
  var pangle = 360 / v; //angle in polar coordiante

  var start = 90 - v; //calculating each vetice's coordinate in cartesian

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
    return (array_v[a + 1].y - array_v[a].y) / (array_v[a + 1].x - array_v[a].x);
  }
} //so here by processing the inerception, we can move the function around


function interceptGetter(a) {
  return array_v[a].y - slopeGetter(a) * array_v[a].x;
}
/*so the function for the edges are in this manner: array_v[a].y = slopeGetter(a) * array_v[a].x + interceptGetter(a)
  by input the range of the y axis or x axis, we could get the all the coordinates on that line*/


function forceGen() {
  //this part does not help rn
  // noiseSeed(600);
  // var x = floor(width / sqrt(unit));
  // var y = floor(height / sqrt(unit));
  // fieldVector = [x * y];
  // for (var i = 0; i < sqrt(unit); i++) {
  //   xoff = 1;
  //   for (var j = 0; j < sqrt(unit); j++) {
  //     let angle = noise(xoff, yoff, time) * 4 * PI;
  //     let dir = p5.Vector.fromAngle(angle);
  //     // console.log(angle);
  //     dir.setMag(forceMag);
  //     fieldVector[i + j * x] = dir;
  //     xoff += perlinstep;
  //     //   push();
  //     //   translate(i * x, y * j);
  //     //   rotate(angle);
  //     //   stroke(255);
  //     //   line(0, 0, x, 0);
  //     //   pop();
  //     }
  //   yoff += perlinstep;
  // }
  // yoff =0;
  // time += 0.01;
  //here i represents the x coordiante on the canvas, needs to compute cooresponding position in the fieldVector array and use splice to replace it
  for (var i = array_v[0].x + width / 2; i > array_v[1].x + width / 2; i--) {
    //x pos in the array
    var x = floor(i / sqrt(unit));
    var ytemp = slopeGetter(0) * i + interceptGetter(0); //y pos in the array;

    var y = floor(ytemp / sqrt(unit));
    var replaceVec = createVector(i, slopeGetter(0) * i + interceptGetter(0));
    replaceVec.normalize();
    replaceVec.mult(20);
    fieldVector.splice(x + y * width / sqrt(unit), 1, replaceVec); // push();
    // translate(i * x, y * j);
    // rotate(PI/3);
    // stroke(255);
    // strokeWeight(2);  
    // line(0, 0, x, 0);
    // pop();

    console.log(x);
  }

  for (var i = array_v[1].x + width / 2; i < array_v[2].x + width / 2; i++) {
    var x = floor(abs(i) / sqrt(unit));
    var ytemp = slopeGetter(1) * i + interceptGetter(1); //y pos in the array;

    var y = floor(abs(ytemp)) / sqrt(unit);
    var replaceVec = createVector(i, slopeGetter(1) * i + interceptGetter(1));
    replaceVec.normalize();
    replaceVec.mult(20);
    fieldVector.splice(x + y * width / sqrt(unit), 1, replaceVec); // console.log(x);
  }

  for (var i = array_v[2].x + width / 2; i > array_v[0].x + width / 2; i--) {
    var x = floor(abs(i) / sqrt(unit));
    var ytemp = slopeGetter(2) * i + interceptGetter(2); //y pos in the array;

    var y = floor(abs(ytemp) / sqrt(unit));
    var replaceVec = createVector(i, slopeGetter(2) * i + interceptGetter(2));
    replaceVec.normalize();
    replaceVec.mult(20);
    fieldVector.splice(x + y * width / sqrt(unit), 1, replaceVec); // console.log(x);
  }
}

var particle =
/*#__PURE__*/
function () {
  function particle() {
    _classCallCheck(this, particle);

    this.x = random(width);
    this.y = random(height);
    this.loc = createVector(this.x, this.y);
    this.speed = createVector(0, 0);
    this.accel = createVector(0, 0);
    this.size = 2;
    this.speedMax = 5;
  }

  _createClass(particle, [{
    key: "update",
    value: function update() {
      this.speed.add(this.accel);
      this.speed.limit(this.speedMax);
      this.loc.add(this.speed); //reset acceleration

      this.accel.mult(0);
    }
  }, {
    key: "accelerate_change",
    value: function accelerate_change(vec) {
      var x = floor(this.loc.x / floor(width / sqrt(unit)));
      var y = floor(this.loc.y / floor(height / sqrt(unit)));
      this.accel.add(fieldVector[x + y * floor(width / sqrt(unit))]);
    }
  }, {
    key: "display",
    value: function display() {
      stroke(h, s, b);
      strokeWeight(this.size);
      point(this.loc.x, this.loc.y);
      h = h % 360 + 10;
    }
  }, {
    key: "edgeDetect",
    value: function edgeDetect() {
      if (this.loc.x < 0 || this.loc.x > width || this.loc.y > height || this.loc.y < 0) {
        this.loc.x = random(width);
        this.loc.y = random(height);
      }
    }
  }]);

  return particle;
}();