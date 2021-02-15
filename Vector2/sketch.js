/* A lluminascence beam */
var a;
let beam;
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  beam = new Beam(windowHeight/1.25, 10);
}

function draw() {
  background(0,10);
  a = p5.Vector.random2D();
  beam.build(a);
  beam.display();
}

class Beam {
  constructor(n, nob ) {
    this.n = n;
    this.nob = nob; //number of beams
    this.arr = []; //array of vectors
  }
  // here should use static method
  build(cpos) {
    var controller = random(0, this.n);
    for (var i = 0; i < this.nob; i++) {
      this.arr[i] = p5.Vector.mult(cpos, controller);
      // this.arr[i] = cpos.mult(controller);
      this.arr[i].rotate(30 / (i - this.nob));
    }
    cpos.mult(controller);
    // console.log(cpos);
  }
  display() {
    
    translate(width / 2, height / 2);
    for (var i = 0; i < this.nob; i++) {
      strokeWeight(3);
      stroke(random(255), random(255), random(255), 255);
      line(0, 0, this.arr[i].x, this.arr[i].y);
      
    }
  }
}