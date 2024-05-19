let points = [];
let triangles = [];

function setup() { 
  createCanvas(800, 400);
  for(let i=0;i<40;i++) {
  points.push([random(width), random(height)]);
  }
  triangles = Delaunay.triangulate(points);
} 

function draw() { 
  background(255);
  noFill();
  stroke(0);
  // for (let i = 0; i < points.length; i++) {
  //   ellipse(points[i][0], points[i][1], 5, 5);
  // }
  points.forEach((el,i) => {
    //el[0] += sin(((frameCount+i)*111.1)*0.1);
    //el[1] += cos(((frameCount+i)*1101.1)*0.1);
  });
  for (let i = 0; i < triangles.length; i += 3) {
    beginShape();
    vertex(points[triangles[i]][0], points[triangles[i]][1]);
    vertex(points[triangles[i+1]][0], points[triangles[i+1]][1]);
	vertex(points[triangles[i+2]][0], points[triangles[i+2]][1]);
    endShape(CLOSE);
  }
  
}

function mousePressed() {
  points.push([mouseX, mouseY]);
  triangles = Delaunay.triangulate(points);
}