const NUM_POINTS = 600;
const VEL = 0.5;


let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < NUM_POINTS; ++i) {
    points.push(new Point(random(width), random(height)));       
  }
}
function windowResized(){
    resizeCanvas(windowWidth, windowHeight)

	for (let i = 0; i < NUM_POINTS; ++i) {
		points[i] = new Point(random(width), random(height));       
	  }
	
}

function draw() {
  noStroke();
  fill(255);
  rect(0, 0, width, height);

  points = points.map((p) => p.move());

  noFill();
  stroke(0);
  strokeWeight(1);
  dmesh(points);
}

function dmesh(pts) {
  const {points, halfedges, triangles} = new d3.Delaunay(pts.flatMap(pt => [pt.x, pt.y]));
  for (let i=0; i<halfedges.length; ++i) {
    const j = halfedges[i];
    if (j < i) continue;
    const ti = triangles[i];
    const tj = triangles[j];
    line(points[ti * 2], points[ti * 2 + 1], points[tj * 2], points[tj * 2 + 1]);
  }
}

function mesh(pts) {
  let allLines = [];
  for (let i = 0; i < pts.length - 1; ++i) {
    for (let j = i + 1; j < pts.length; ++j) {
      allLines.push(new Line(pts[i], pts[j]));
    }
  }
  allLines.sort((a, b) => a.length - b.length);

  let addedLines = [];
  for (const ln of allLines) {
    if (addedLines.some((lineB) => lineB.intersects(ln))) continue;
    addedLines.push(ln);
  }
  addedLines.forEach((ln) => ln.show());
}

class Line {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.length = start.distSq(end);
  }

  intersects(that) {
    return intersects(
      this.start.x,
      this.start.y,
      this.end.x,
      this.end.y,
      that.start.x,
      that.start.y,
      that.end.x,
      that.end.y
    );
  }

  show() {
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
}

class Point {
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    if (typeof vx !== "undefined" && typeof vy !== "undefined") {
      this.vx = vx;
      this.vy = vy;
    } else {
      const r = p5.Vector.random3D().mult(VEL);
      this.vx = r.x;
      this.vy = r.y;
    }
  }

  show() {
    point(this.x, this.y);
  }

  move() {
    let nx = this.x + this.vx;
    let ny = this.y + this.vy;
    let nvx = this.vx;
    let nvy = this.vy;
    if (nx < 0 || nx >= width) {
      nvx *= -1;
      nx = this.x + this.vx;
    }
    if (ny < 0 || ny >= height) {
      nvy *= -1;
      ny = this.y + this.vy;
    }
    return new Point(nx, ny, nvx, nvy);
  }

  distSq(that) {
    const xx = this.x - that.x;
    const yy = this.y - that.y;
    return xx * xx + yy * yy;
  }
}

function intersects(x1, y1, x2, y2, x3, y3, x4, y4) {
  
  function onSegment(px, py, qx, qy, rx, ry) {
    return (
      qx <= max(px, rx) &&
      qx >= min(px, rx) &&
      qy <= max(py, ry) &&
      qy >= min(py, ry)
    );
    
      

  }

  function orientation(px, py, qx, qy, rx, ry) {
    const val = (qy - py) * (rx - qx) - (qx - px) * (ry - qy);


  }
  
  if (
    (x1 == x3 && y1 == y3) ||
    (x2 == x3 && y2 == y3) ||
    (x1 == x4 && y1 == y4) ||
    (x2 == x4 && y2 == y4)
  )
    return false;

  const o1 = orientation(x1, y1, x2, y2, x3, y3);
  const o2 = orientation(x1, y1, x2, y2, x4, y4);
  const o3 = orientation(x3, y3, x4, y4, x1, y1);
  const o4 = orientation(x3, y3, x4, y4, x2, y2);
  if (o1 != o2 && o3 != o4) return true;
  if (o1 == 0 && onSegment(x1, y1, x3, y3, x2, y2)) return true;
  if (o2 == 0 && onSegment(x1, y1, x4, y4, x2, y2)) return true;
//  if (o3 == 0 && onSegment(x3, y3, x1, y1, x4, y4)) return true;
  if (o4 == 0 && onSegment(x3, y3, x2, y2, x4, y4)) return true;
  return false;

  
}
