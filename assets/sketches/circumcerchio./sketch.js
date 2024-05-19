let points = [];

function setup() {
  createCanvas(640, 360);
}

function mousePressed() {
  if (points.length == 3) {
    points = [];
  }
  points.push(createVector(mouseX, mouseY));
}

function draw() {
  background(255);
  noFill();

  if (points.length == 3) {
    let [a, b, c] = points;

    
    strokeWeight(2);
    triangle(a.x, a.y, b.x, b.y, c.x, c.y);
    stroke(255,0,0);
    strokeWeight(2);
    fill(255,0,0, 10);
    circumcircle(a, b, c);
  }

  strokeWeight(5);
  stroke(0);
  for (let p of points) {
    point(p.x, p.y);
  }
}

function circumcircle(a, b, c) {
  let ab = p5.Vector.sub(b, a);
  let ac = p5.Vector.sub(c, a);
  let abmid = p5.Vector.add(a, b);
  abmid.div(2);

  let acmid = p5.Vector.add(a, c);
  acmid.div(2);

  

  ab.rotate(PI / 2);
  ac.rotate(PI / 2);

  let numerator = ac.x * (abmid.y - acmid.y) - ac.y * (abmid.x - acmid.x);
  let denominator = ac.y * ab.x - ac.x * ab.y;
  ab.mult(numerator / denominator);
  // The center of the circumcircle is that intersection!
  let center = p5.Vector.add(abmid, ab);
  // The radius is the distance from the center to one of the triangle vertices
  let r = p5.Vector.dist(center, c);
  circle(center.x, center.y, r * 2);

  //point(center.x, center.y);
}
