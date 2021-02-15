/*this project is going to be a particles that is restarined by some sort of movement patterns*/
let vortex;
var a;
function setup() {
  createCanvas(400, 400);
  a = createVector(100, 100);
  vortex = new Vortex(a, 100, 100);
  background(0);
}

function draw() {
  blob.show();
}

class Vortex {
  constructor(initpos, bwidth, bheight) {
    this.initpos = initpos;
    this.bwidth = bwidth;
    this.bheight = bheight;
    this.lattice = 10;
    this.mass = 1;
    this.gravity = createVector(0, -9.8);
  }
  show() {
    const xcomp = this.initpos.x;
    for (var i = 0; i < this.bheight / this.lattice; i++) {
      for (var j = 0; j < this.bwidth / this.lattice; j++) {
        stroke(255);
        strokeWeight(3);
        point(this.initpos.x, this.initpos.y);
        this.initpos.x += this.lattice;
        this.initpos.y += this.lattice;
      }
     
    }
  }
}
