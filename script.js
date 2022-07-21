
// Random Arrays
let rand = [];
let rand2 = [];
let rand3 = [];

let flowers = [];

// Added Images Var
let trunk;
let seed;
let mountain;
let hills;
let clouds1;
let clouds2;
let clouds3;
let grass;
let bee;

// Added MP3 Var
let song;

// Flock
let flock;

// Random Vars
let mount;
let canvw;

// Slider
let slider;

function preload(){
  // Image Preload
  trunk = loadImage('tree.png');
  seed = loadImage('text.png');
  mountain = loadImage('mountain.png');
  hills = loadImage('hills.png');
  clouds1 = loadImage('clouds1.png');
  clouds2 = loadImage('clouds2.png');
  clouds3 = loadImage('clouds3.png');
  grass = loadImage('grass.png');
  bee = loadImage('bee.png');
  
  // MP3 Preload
  song = loadSound('music.mp3');
}

function setup() {
  // Canvas Stuff
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  
  // Random Values: Branches 
  rand = [
    random(-20, -30),
    random(0.7, 0.9),
    random(50, 60),
    random(0.7, 0.9),
    random(30, 40)
  ];
  
  // Random Values: Colors
  rand2 = [
    random(0, 80),
    random(0, 120),
    random(0, 40),
    random(-20, 20)
  ];
  
  // Random Values: Flowers
  rand3 = [
    random(255),
    random(255),
    random(255)
  ];
  
  // Flock
  flock = new Flock();
  for (let i = 0; i < 10; i++) {
    let b = new Boid(0, 0);
    flock.addBoid(b);
  }
  
  mount = floor((width / 1280) + 1);
  canvw = 1280;
  translate(width / 2, height / 2);
  slider = createSlider(0, 1, 0.5, 0.01);
  slider.position(120, height - 135);
}

// Flower Class
class Flower{
  constructor(x, y, r, g, b){
    this.x = x;
    this.y = y;
    this.r = r;
    this.g = g;
    this.b = b;
  }
  show(){
    fill(this.r, this.g, this.b);
    ellipse(this.x, this.y -8, 11, 10);
    ellipse(this.x - 8, this.y -3, 11, 10);
    ellipse(this.x + 8, this.y -3, 11, 10);
    ellipse(this.x + 5, this.y + 5, 11, 10);
    ellipse(this.x - 5, this.y + 5, 11, 10);
    fill('yellow');
    ellipse(this.x, this.y, 12, 10);
  }
}

function draw() {
  // Sky
  noStroke();
  background('#A5C5DC');
  translate(width / 2, height / 2);
  
  // Cloud Layer 1
  for(var i = 0; i < canvw + 1; i++){
    image(clouds1, -(width/2) + (i * canvw) - 100 + xParallax(0.625/3), -(height/2) + 100 + yParallax(0.0625/3));
  }
  
  // Cloud Layer 2
  for(var j = 0; j < canvw + 1; j++){
    image(clouds2, -(width/2) + (j * canvw) - 100 + xParallax(0.625/3.25), -(height/2) + 100 + yParallax(0.0625/3.25));
  }
  
  // Cloud Layer 3
  for(var k = 0; k < canvw + 1; k++){
    image(clouds3, -(width/2) + (k * canvw) - 100 + xParallax(0.625/3.5), -(height/2) + 100 + yParallax(0.0625/3.5));
  }
  
  // Mountains
  for(var l = 0; l < canvw + 1; l++){
    image(mountain, -(width/2) + (l * canvw) - 100 + xParallax(0.0625), -(height/2) + 100 + yParallax(0.0625));
  }
  
  // Hills
  for(var m = 0; m < canvw + 1; m++){
    image(hills, -(width/2) + (m * canvw) - 100 + xParallax(0.0625/2), -(height/2) + 100 + yParallax(0.0625/2));
  }
  
  // Ground / Grass
  fill('#91AB56')
  rect(-(width/2), 218, width, height/2)

  // Grass Cont.
  for(var n = 0; n < canvw + 1; n++){
    image(grass, -(width/2) + (n * canvw) - 100, -405);
  }
  
  // Sun
  fill('#ffe065');
  ellipse(mouseX - width/2, -height/2 - 50, 300, 300);
  
  if(flowers.length > 0){
    for(var o = 0; o < flowers.length; o++){
      flowers[o].show();
    }
  }
  
  // Flock
  flock.run();
  
  // Text "I am a seed of something beautiful"
  image(seed, 100, 0);
  
  // Tree
  branch(rand[4]);
  
  // Drawing of Person
  image(trunk, -175, -20);
  
  // How To / Settings?
  noStroke();
  fill('#799150');
  let h = 150;
  let w = 500;
  rect(-(width/2), (height/2) - h, w, h);
  fill('black');
  textSize(25);
  stroke(70, 40, 20);
  text('Volume:', -width/2 + 10, (height/2) - h + 30);
  text('Press Space to generate a new tree', -width/2 + 10, (height/2) - h + 65);
  text('Click above the grass to add a bee', -width/2 + 10, (height/2) - h + 95);
  text('Click on the grass to add a flower', -width/2 + 10, (height/2) - h + 125);
  // Debugging Mouse Cords
  // fill('black');
  // textSize(12)
  // text(mouseX - width / 2, mouseX - width /2 - 25, mouseY - height / 2);
  // text(mouseY - height / 2, mouseX - width /2 + 25, mouseY - height / 2);
  
  // Slider Stuff
  song.setVolume(slider.value());
}



function branch(len){
  push();
  if(len > 10){
    strokeWeight(map(len, 10, 100, 1, 15));
    stroke(70, 40, 20);
    line(0, 0, 0, -len);
    translate(0, -len);
    rotate(rand[0]);
    branch(len * rand[1]);
    rotate(rand[2]);
    branch(len * rand[3]);
  }
  else{
    var R = rand2[0] + rand2[3];
    var G = rand2[1] + rand2[3];
    var B = rand2[2] + rand2[3];
    fill(R, G, B);
    noStroke();
    
    beginShape();
    for(var i = 45; i < 135; i++){
      var rad = 15;
      var x = rad * cos(i);
      var y = rad * sin(i);
      vertex(x, y)
    }
    for(var i2 = 135; i > 40; i --){
      var rad2 = 15;
      var x2 = rad * cos(i);
      var y2 = rad * sin(-i) + 20;
      vertex(x2, y2);
    }
    endShape(CLOSE);
  }
  pop();
}

function Flock() {
  // An array for all the boids
  this.boids = []; // Initialize the array
}

Flock.prototype.run = function() {
  for (let i = 0; i < this.boids.length; i++) {
    this.boids[i].run(this.boids);  // Passing the entire list of boids to each boid individually
  }
}

Flock.prototype.addBoid = function(b) {
  this.boids.push(b);
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Boid class
// Methods for Separation, Cohesion, Alignment added

function Boid(x, y) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.position = createVector(x, y);
  this.r = 3.0;
  this.maxspeed = 4;    // Maximum speed
  this.maxforce = 0.05; // Maximum steering force
}

Boid.prototype.run = function(boids) {
  this.flock(boids);
  this.update();
  // this.borders();
  this.render();
}

Boid.prototype.applyForce = function(force) {
  // We could add mass here if we want A = F / M
  this.acceleration.add(force);
}

// We accumulate a new acceleration each time based on three rules
Boid.prototype.flock = function(boids) {
  let sep = this.separate(boids);   // Separation
  let ali = this.align(boids);      // Alignment
  let coh = this.cohesion(boids);   // Cohesion
  let avo = this.avoid(boids);      // Avoid walls
  // Arbitrarily weight these forces
  sep.mult(10.0); // og - 10
  ali.mult(2.0);
  coh.mult(0.25); // old - 0.125
  avo.mult(3.0);
  // Add the force vectors to acceleration
  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
  this.applyForce(avo);
}

// Method to update location
Boid.prototype.update = function() {
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);
}

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Boid.prototype.seek = function(target) {
  let desired = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  let steer = p5.Vector.sub(desired,this.velocity);
  steer.limit(this.maxforce);  // Limit to maximum steering force
  return steer;
}

Boid.prototype.render = function() {
  // Draw a triangle rotated in the direction of velocity
  let theta = this.velocity.heading() + radians(90);
  fill(127);
  stroke(200);
  push();
  translate(this.position.x, this.position.y);
  rotate(theta);
  imageMode(CENTER);
  image(bee, 0, 0);
  imageMode(CORNER);
  pop();
}

// Wraparound
Boid.prototype.borders = function() {
  if (this.position.x < -this.r)  this.position.x = width + this.r;
  if (this.position.y < -this.r)  this.position.y = height + this.r;
  if (this.position.x > width + this.r) this.position.x = -this.r;
  if (this.position.y > height + this.r) this.position.y = -this.r;
}

// Separation
// Method checks for nearby boids and steers away
Boid.prototype.separate = function(boids) {
  let desiredseparation = 25.0;
  let steer = createVector(0, 0);
  let count = 0;
  // For every boid in the system, check if it's too close
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      let diff = p5.Vector.sub(this.position, boids[i].position);
      diff.normalize();
      diff.div(d);        // Weight by distance
      steer.add(diff);
      count++;            // Keep track of how many
    }
  }
  // Average -- divide by how many
  if (count > 0) {
    steer.div(count);
  }

  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
}

// Alignment
// For every nearby boid in the system, calculate the average velocity
Boid.prototype.align = function(boids) {
  let neighbordist = 50;
  let sum = createVector(0,0);
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].velocity);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxspeed);
    let steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
}

// Cohesion
// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
Boid.prototype.cohesion = function(boids) {
  let neighbordist = 75;
  let sum = createVector(0, 0);   // Start with empty vector to accumulate all locations
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].position); // Add location
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum);  // Steer towards the location
  } else {
    return createVector(0, 0);
  }
}

Boid.prototype.avoid = function(boids) {
  let steer = createVector(0, 0);
  if (this.position.x <= -(width / 2)){
    steer.add(createVector(1, 0));
  }
  if (this.position.x > width/2) { // width of canvas
    steer.add(createVector(-1, 0));
  }
  if (this.position.y <= -(height/2)) {
    steer.add(createVector(0, 1));
  }
  if (this.position.y > 218) { // height of canvas
    steer.add(createVector(0, -1));
  }
  return steer;
}

function xParallax(scale){
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
    return (((-width/2) + mouseX)*scale);
  }
  return 0;
}

function yParallax(scale){
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height)
    return (((-height/2) + mouseY)*scale);
  return 0;
}

function keyPressed() {
  if(keyCode == 32){
    if(song.isPlaying() == false){
      song.play();
    }
    rand = [
      random(-20, -30),
      random(0.7, 0.9),
      random(50, 60),
      random(0.7, 0.9),
      random(30, 40)
    ];
    rand2 = [
      random(0, 80),
      random(0, 120),
      random(0, 40),
      random(-20, 20)
    ];
  }
}

function mousePressed(){
  if(mouseY - height/2 < 200){  
    flock.addBoid(new Boid(mouseX - width/2, mouseY - height/2));
  }
  else{
    rand3 = [
      random(255),
      random(255),
      random(255)
    ];
    append(flowers, new Flower(mouseX - width/2, mouseY - height/2, rand3[0], rand3[1], rand3[2]));
    // flowers.pushback(new Flower(mouseX - width/2, mouseY - height/2));
  }
}