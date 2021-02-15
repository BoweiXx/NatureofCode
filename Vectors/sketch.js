/* A lluminascence beam */
var a;
let beam;
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  beam = new Beam(200, 10, 255, 255, 255, 255);
  background(0);
}

function draw() {
  a = p5.Vector.random2D();
  beam.build(a);
  beam.display();
}

class Beam {
  constructor(n, nob, initR, initG, initB, alph) {
    this.n = n;
    this.nob = nob; //number of beams
    this.initR = initR; //initial red
    this.initG = initG; 
    this.initB = initB;
    this.alph = alph; //initial alph
    this.arr = []; //array of vectors
  }
  // here should use static method
  build(cpos) {
    var controller = random(0, this.n);
    for (var i = 0; i < this.nob; i++) {
      this.arr[i] = cpos.mult(controller);
      this.arr[i].rotate(30 / (i - this.nob));
    }
    cpos.mult(controller);
    console.log(cpos);
  }
  display() {
    translate(width / 2, height / 2);
    for (var i = 0; i < this.nob; i++) {
      strokeWeight(2);
      stroke(this.initR, this.initG, this.initB, this.alph);
      line(0, 0, this.arr[i].x, this.arr[i].y);
      
    }
  }
}