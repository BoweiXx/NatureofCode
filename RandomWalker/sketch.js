 let walker;

function setup() {
  createCanvas(windowWidth, windowHeight);
  walker = new Walker(random(0,width),random(0,height),1);
}

function draw() {
  background(0);
  walker.move();
  walker._DOF();
  walker.edgeDetect();
}

class Walker{
  constructor(initx, inity, latticel) {
    this.x = initx;
    this.y = inity;
    this.latticel = latticel; //each step is 1 lattice unit, so defining lattice length here also defines the number of the lattice
    this.speed = 1;
    this.DOF = 0;
    this.arr = [[], []];
    this.ix = floor(windowWidth / this.x) + 1;
    this.iy = floor(windowHeight / this.y) + 1;
    this.selector = 0; 
  }
  _DOF() {
    this.DOF = 0;
    //initialize and store the first step
    this.arr[[this.ix], [this.iy]] = true;
    //calculate DOF
    switch (this.arr[[this.ix + this.speed], [this.iy + this.speed]] == true) {
      case true:
        break;
      case false:
        this.DOF++;
        break;
    }
    switch (this.arr[[this.ix + this.speed], [this.iy - this.speed]] == true) {
      case true:
        break;
      case false:
        this.DOF++;
        break;
    }
    switch (this.arr[[this.ix - this.speed], [this.iy - this.speed]] == true) {
      case true:
        break;
      case false:
        this.DOF++;
        break;
    }
    switch (this.arr[[this.ix - this.speed], [this.iy - this.speed]] == true) {
      case true:
        break;
      case false:
        this.DOF++;
        break;
    }
    console.log(this.DOF);
  }
  move() {
    this.selector = random(this.DOF);
    if (this.selector == 0) {
      this.y--;
      this.arr[[this.ix], [this.iy - this.speed]] = true;
    } else if (this.selector == 1) {
      this.x++;
      this.arr[[this.ix + this.speed], [this.iy]] = true;
    } else if (this.selector == 2) {
      this.y++;
      this.arr[[this.ix], [this.iy+this.speed]] = true;
    } else if (this.selector = 3) {
      this.x--;
      this.arr[[this.ix-this.speed], [this.iy]] = true;
    } else {
      alert("unexpected circumstance");
    }
    console.log("this x loc is " + this.x +"\t" + "this y loc is" + this.y);
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
}
