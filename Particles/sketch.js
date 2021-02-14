let particles = [];
let amount_p = 10000;
let indexN = 0.11;
let xoff = 0;
let yoff = 0;
let zoff = 0;
let unit = 1600;
let time = 0;
let fieldVector= [];
function setup() {

  createCanvas(800, 800);
  colorMode(HSB);
  for (var i = 0; i< amount_p; i++){
    particles[i] = new Particle();
  }
}

function draw() {
  background(0);
  Field();
  for (var j = 0; j < particles.length; j++){
    particles[j].accelerate_change(fieldVector);
    particles[j].update()
    particles[j].display();
    particles[j].edgeDetect();
    particles[j].color_change();
  }

}
//for this part, we draw the field at beginning, after finished this part, we might just return a array that stores every single square's vector information
function Field(){
  // x is how many units at x coordinate
  var x = floor(((width)/sqrt(unit))+1);
  // y is how many units at y coordinate
  var y = floor(((height)/sqrt(unit))+1);
   fieldVector = [x * y];
  for (var i = 0; i < sqrt(unit)+1; i++){
    xoff = 0;
    for (var j = 0; j < sqrt(unit)+1; j++){
      let angle = noise(xoff, yoff,time) * 4* PI ;
      let dire = p5.Vector.fromAngle(angle);
      //set the magnitude of 'force'
      dire.setMag(1);
      fieldVector[i + j * x] = dire;
      //fieldVector[i + j * x] = dire;
      xoff += indexN;
      // push();
      // translate(i*x,j*y);
      // rotate(angle);
      // stroke(255);
      // //line(0,0,x,0);      
      // pop();
    }
    yoff += indexN;
  }
  //reset the yoff here to 0 to remain static
  yoff = 0;
  //keep the other 2 Dimension stable, and change the third direction, so the image would not go crazy 
  time += 0.01;
  //console.log(fieldVector)
}
//in this part, particle's initial velocity is (0,0)
class Particle{
  constructor(){
    this.x = random(width);
    this.y = random(height);
    this.loc = createVector(this.x, this.y)
    this.speed = createVector(0,0);
    this.accel = createVector(0,0);
    this.size = 1;
    this.speedMax = 5;
    this.col = color(0,0,0,5);
    this.color_index = 0;
  }
  color_change(){
    this.color_index = (this.color_index + 1) % 360;
    this.col = color(this.color_index, 360,360,5)
  }
  update(){
    this.speed.add(this.accel);
    this.speed.limit(this.speedMax);
    this.loc.add(this.speed);
    this.accel.mult(0);
  }
  accelerate_change(vec){
    var x = floor(this.loc.x/(width/sqrt(unit)));
    var y = floor(this.loc.y/(height/sqrt(unit)));
    this.accel.add(vec[x + y * width/sqrt(unit)]);
  }
  //this part controls the magnitude of speed
  display(){
    stroke(this.col,360,360,5);
    point(this.loc.x,this.loc.y);
  }
  edgeDetect(){
if(this.loc.x>width|| this.loc.x<0||this.loc.y>height|| this.loc.y<0){
      this.loc.x = random(width);
      this.loc.y = random(height);
}
  
}
}