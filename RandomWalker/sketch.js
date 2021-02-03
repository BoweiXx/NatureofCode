let walker;

function setup() {
  createCanvas(windowWidth, windowHeight);
  walker = new Walker(floor(random(0, width)), floor(random(0, height)), 1);
  background(0);
}

function draw() {
  walker.move();
  walker._DOF();
  walker.edgeDetect();
  walker.display();
}

class Walker {
  constructor(initx, inity, latticel) {
    this.x = initx;
    this.y = inity;
    this.latticel = latticel; //each step is 1 lattice unit, so defining lattice length here also defines the number of the lattice
    this.speed = latticel;
    this.DOF = 4;
    this.arrx = [];
    this.arry = [];
    this.selector = 0;
  }
  _DOF() {
    this.DOF = 0;
    //initialize and store the first step
    this.arrx[this.x - 1] = true;
    this.arry[this.y - 1] = true;
    //calculate DOF
    if (
      this.arrx[this.x + this.speed - 1] == true &&
      this.arry[this.y + this.speed - 1] == true
    ) {
    } else {
      this.DOF++;
    }

    if (
      this.arrx[this.x + this.speed - 1] == true &&
      this.arry[this.y - this.speed - 1] == true
    ) {
    } else {
      this.DOF++;
    }

    if (
      this.arrx[this.x - this.speed - 1] == true &&
      this.arry[this.y - this.speed - 1] == true
    ) {
    } else {
      this.DOF++;
    }

    if (
      this.arrx[this.x - this.speed - 1] == true &&
      this.arry[this.y + this.speed - 1] == true
    ) {
    } else {
      this.DOF++;
    }
    console.log(this.DOF);
  }
  move() {
    this.selector = random(1, this.DOF);
    if (this.selector == 0) {
      this.y = this.y - 1;
      this.arrx.splice(this.x - 1, 0, true);
      this.arry.splice(this.y - this.speed - 1, 0, true);
    } else if (this.selector == 1) {
      this.x = this.x + 1;
      this.arrx.splice(this.x + this.speed - 1, 0, true);
      this.arry.splice(this.y - 1, 0, true);
    } else if (this.selector == 2) {
      this.y = this.y + 1;
      this.arrx.splice(this.x - 1, 0, true);
      this.arry.splice(this.y + this.speed - 1, 0, true);
    } else if ((this.selector = 3)) {
      this.x = this.x - 1;
      this.arrx.splice(this.x - this.speed - 1, 0, true);
      this.arry.splice(this.y - 1, 0, true);
    } else {
      alert("unexpected circumstance");
    }
    // console.log(this.arrx);
    console.log("this x loc is " + this.x + "\t" + "this y loc is" + this.y);
    // console.log(this.selector);
  }
  edgeDetect() {
    if (
      this.x > windowWidth ||
      this.x < 0 ||
      this.y > windowHeight ||
      this.y < 0
    ) {
      this.x = 0;
      this.y = 0;
    }
  }
  display() {
    
    stroke(255);
    strokeWeight(2);
    point(this.x, this.y);
  }
}
