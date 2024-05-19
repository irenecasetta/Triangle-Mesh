let seedPoints = [];
let velocities = [];

let delaunay;

function setup() {
  createCanvas(1000, 900);
  for (let i = 0; i < 1000; i++) {
    seedPoints[i] = createVector(random(width), random(height));
    velocities[i] = p5.Vector.random2D().setMag(random(0.25, 1));
  }
}

function draw() {
  background(255);

  delaunay = calculateDelaunay(seedPoints);
  voronoi = delaunay.voronoi([0, 0, width, height]);

  for (let i = 0; i < seedPoints.length; i++) {
    let p = seedPoints[i];
    let v = velocities[i];
    stroke(0);
    strokeWeight(1);
    point(p.x, p.y);
    p.add(v);
    if (p.x > width || p.x < 0) {
      v.x *= -1;
    }
    if (p.y > height || p.y < 0) {
      v.y *= -1;
    }
  }

  noFill();
  strokeWeight(1);
  let { points, triangles } = delaunay;
  // for (let i = 0; i < triangles.length; i += 3) {
  //   let a = 2 * delaunay.triangles[i];
  //   let b = 2 * delaunay.triangles[i + 1];
  //   let c = 2 * delaunay.triangles[i + 2];
  //   triangle(
  //     points[a],
  //     points[a + 1],
  //     points[b],
  //     points[b + 1],
  //     points[c],
  //     points[c + 1]
  //   );
  // }

  let polygons = voronoi.cellPolygons();
  let cells = Array.from(polygons);

  for (let poly of cells) {
    stroke(0);
    strokeWeight(1);
    noFill();
    beginShape();
    for (let i = 0; i < poly.length; i++) {
      vertex(poly[i][0], poly[i][1]);
    }
    endShape();
  }
}

function calculateDelaunay(points) {
  let pointsArray = [];
  for (let v of points) {
    pointsArray.push(v.x, v.y);
  }
  return new d3.Delaunay(pointsArray);
}
