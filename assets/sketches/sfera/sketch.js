let globe;
let sliderino;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  sliderino = createSlider(4,30,6,2)
  sliderino.position(30,30)
  sliderino.size(180)
}
function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
const total = sliderino.value();
fill (0)
  background(200);
  lights();
  const r = min(width, height)*0.4;
  rotateY(mouseX/350)
  rotateX(mouseY/350)

  globe = new Array(total + 1);
  for (let i = 0; i < total + 1; i++) {
    const lat = map(i, 0, total, -HALF_PI, HALF_PI);
    globe[i] = new Array(total + 1);
    for (let j = 0; j < total + 1; j++) {
      const lon = map(j, 0, total, -PI, PI);
      const x = r * sin(lon) * cos(lat);
      const y = r * sin(lon) * sin(lat);
      const z = r * cos(lon);
      globe[i][j] = createVector(x, y, z);
    }
  }

  for (let i = 0; i < total; i++) {
    beginShape(TRIANGLE_STRIP);
    for (let j = 0; j < total + 1; j++) {
      const v1 = globe[i][j];
      stroke(255);
      strokeWeight(1);
      vertex(v1.x, v1.y, v1.z);
      const v2 = globe[i + 1][j];
      vertex(v2.x, v2.y, v2.z);
    }
    endShape();
  }
}
