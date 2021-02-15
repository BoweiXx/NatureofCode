"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var p;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  translate(width / 2, height / 2);
  p = new Particles(3, 200, 1);
  p.polygonbuilder();
}

function draw() {}

var Particles =
/*#__PURE__*/
function () {
  function Particles(n, l, u) {
    _classCallCheck(this, Particles);

    this.n = n; //sides of polygon

    this.l = l; //length of polygon

    this.u = u; //unit length of the lattice;

    this.posarryp = [];
  }

  _createClass(Particles, [{
    key: "polygonbuilder",
    value: function polygonbuilder() {
      var tau = 360 / this.n;
      var start_angle = 90 - tau; //calculating coordinate of each point in cartisian
      //could use tau here 

      for (var i = 0; i < this.n; i++) {
        var tester = start_angle + tau * i;
        var x = this.l * cos(start_angle + tau * i),
            y = this.l * sin(start_angle + tau * i); // console.log(tester);

        this.posarryp.push(createVector(x, y)); // console.log(this.posarryp);
      }

      strokeWeight(10);

      for (var j = 1; j < this.n; j++) {
        line(this.posarryp[j - 1].x, this.posarryp[j - 1].y, this.posarryp[j].x, this.posarryp[j].y);
        console.log(this.posarryp);

        if (j == this.n - 1) {
          line(this.posarryp[j].x, this.posarryp[j].y, this.posarryp[0].x, this.posarryp[0].y);
        }
      }
    }
  }, {
    key: "fieldbuilder",
    value: function fieldbuilder() {}
  }]);

  return Particles;
}();

function Field() {
  // x is how many units at x coordinate
  var x = floor(width / sqrt(unit) + 1); // y is how many units at y coordinate

  var y = floor(height / sqrt(unit) + 1);
  fieldVector = [x * y];

  for (var i = 0; i < sqrt(unit) + 1; i++) {
    xoff = 0;

    for (var j = 0; j < sqrt(unit) + 1; j++) {
      var angle = noise(xoff, yoff, time) * 4 * PI;
      var dire = p5.Vector.fromAngle(angle); //set the magnitude of 'force'

      dire.setMag(1);
      fieldVector[i + j * x] = dire; //fieldVector[i + j * x] = dire;

      xoff += indexN; // push();
      // translate(i*x,j*y);
      // rotate(angle);
      // stroke(255);
      // //line(0,0,x,0);
      // pop();
    }

    yoff += indexN;
  } //reset the yoff here to 0 to remain static


  yoff = 0; //keep the other 2 Dimension stable, and change the third direction, so the image would not go crazy

  time += 0.01;
}

function polygon(n, l) {
  push(); //tau is the angle in polar coordination

  var tau = 360 / n;
  var start_angle = 90 - tau;
  var dot_array_x = [];
  var dot_array_y = []; //calculating coordinate of each point in cartisian
  //could use tau here 

  for (var i = 0; i < n; i++) {
    var tester = start_angle + tau * i;
    var x = l * cos(start_angle + tau * i),
        y = l * sin(start_angle + tau * i); // console.log(tester);

    dot_array_x.push(x);
    dot_array_y.push(y);
  }

  strokeWeight(1);

  for (var j = 0; j < n; j++) {
    line(dot_array_x[j], dot_array_y[j], dot_array_x[j + 1], dot_array_y[j + 1]);

    if (j == n - 1) {
      line(dot_array_x[j], dot_array_y[j], dot_array_x[0], dot_array_y[0]);
    }
  }

  pop();
}