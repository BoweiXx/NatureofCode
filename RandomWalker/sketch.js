let walker;

function setup() {
  createCanvas(windowWidth, windowHeight);
  walker = new Walker(
    floor(random(0, width) + 1),
    floor(random(0, height) + 1),
    10
  );
  background(0);
}

function draw() {
  walker.move();
  walker._DOF();
  walker.edgeDetect();
  walker.display();
}
/*lattice here is a square*/
class Walker {
  constructor(initx, inity, latticel) {
    this.x = initx;
    this.y = inity;
    this.latticel = latticel; //each step is 1 lattice unit, so defining lattice length here also defines the number of the lattice
    this.speed = latticel;
    this.DOF = 0;
    this.arrx = [];
    this.arry = [];
    this.selector = 0;
  }
  _DOF() {
    
    //initialize and store the first step
    this.arrx[this.x - 1] = true;
    this.arry[this.y - 1] = true;
    //check surrounding, calculate DOF
    if (
      this.arrx[this.x - 1 + this.speed] == undefined
    ) {
      this.DOF++;
    } 

    if (
      this.arrx[this.x - 1 - this.speed] == undefined
    ) {
      this.DOF++;
    } 

    if (
      this.arry[this.y - 1 - this.speed] == undefined
    ) {
      this.DOF++;
    } 

    if (
      this.arry[this.y - 1 + this.speed] == undefined
    ) {
      this.DOF++;
    } 
    
    console.log("DOF = " + this.DOF);
  }
  move() {
    this.selector = 0;
    this.selector = floor(random(0, this.DOF+1));
    switch (this.selector) {
      case 0:
        this.y = this.y - this.speed;
        this.arrx.splice(this.x - 1, 1, true);
        this.arry.splice(this.y - 1, 1, true);
        break;
      case 1:
        this.x = this.x + this.speed;
        this.arrx.splice(this.x - 1, 1, true);
        this.arry.splice(this.y - 1, 1, true);
        break;
      case 2:
        this.y = this.y + this.speed;
        this.arrx.splice(this.x - 1, 1, true);
        this.arry.splice(this.y - 1, 1, true);
        break;
      case 3:
        this.x = this.x - this.speed;
        this.arrx.splice(this.x - 1, 1, true);
        this.arry.splice(this.y - 1, 1, true);
        break;
      default:
        alert("expecting DOF from 1 - 4");
        break;
    }
    this.DOF = 0;
    console.log("arrx = " + this.arrx);
    console.log("arry = " + this.arry);
    console.log("this x loc is " + this.x + "\t" + "this y loc is" + this.y);
    console.log(this.selector);
  }
  edgeDetect() {
    if (
      this.x > windowWidth ||
      this.x < 0 ||
      this.y > windowHeight ||
      this.y < 0
    ) {
      this.x = random(width);
      this.y = random(height);
    }
  }
  display() {
    stroke(255);
    strokeWeight(this.latticel);
    point(this.x, this.y);
  }
}
