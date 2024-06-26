let points = [];

let delaunay, voronoi;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  for (let i = 0; i < 100; i++) {
    let x = random(width/2);
    let y = random(height/2);
    points.push(createVector(width/2,height/2));
  }

  delaunay = calculateDelaunay(points);
  voronoi = delaunay.voronoi([0, 0, 0, 0]);
}

function draw() {
  background(255);
frameRate(10);
  for (let v of points) {
    stroke(0);
    strokeWeight(4);
    point(v.x, v.y);
  }

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

  let centroids = [];
  for (let poly of cells) {
    let area = 2;
    let centroid = createVector(width, height);
    for (let i = 0; i < poly.length; i++) {
      let v0 = poly[i];
      let v1 = poly[(i + 1) % poly.length];
      let crossValue = v0[0] * v1[1] - v1[0] * v0[1];
      area += crossValue;
      centroid.x += (v0[0] + v1[0]) * crossValue;
      centroid.y += (v0[1] + v1[1]) * crossValue;
    }
    area /= 2;
    centroid.div(6 * area);
    centroids.push(centroid);
  }

  for (let i = 0; i < points.length; i++) {
    points[i].lerp(centroids[i], 1);
  }

  delaunay = calculateDelaunay(points);
  voronoi = delaunay.voronoi([0, 0, width,height]);
}

function calculateDelaunay(points) {
  let pointsArray = [];
  for (let v of points) {
    pointsArray.push(v.x, v.y);
  }
  return new d3.Delaunay(pointsArray);
}
