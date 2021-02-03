function setup(){
  createCanvas(400,400);
}

function draw(){
  background(0);
}

class walker{
  constructor(initx, inity, latticel){
    this.x = initx;
    this.y = inity;
    this.latticel = latticel;//each step is 1 lattice unit, so defining lattice length here also defines the number of the lattice
  }
  move_record(){
    var x_num = windowWidth/this.latticel;
    var y_num = windowHeight/this.latticel;
    var DOF = 0;
    //initialize and store the first step
    var ix = floor(windowWidth/this.x)+1;
    var iy = floor(windowHeight/this.y)+1;
    var arr = [[],[]];
    arr [[ix], [iy]] = true;
    //calculate DOF
    switch(arr[[ix+1], [iy+1]] == true){
      case true: break;
      case false: DOF++; break;
    }
    switch(arr[[ix+1], [iy-1]] == true){
      case true: break;
      case false: DOF++; break;
    }
    switch(arr[[ix-1], [iy-1]] == true){
      case true: break;
      case false: DOF++; break;
    }
    switch(arr[[ix-1], [iy-1]] == true){
      case true: break;
      case false: DOF++; break;
    }

  }
  move(){

  }
  DOF(){
    
  }
  boundary_detect(){

  }



}