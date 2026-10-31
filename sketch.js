// Geometry Variables

let x,y,ellipseHeight,ellipseWidth,color,c;
let colorR, colorG, colorB;
let pointArray = [];
let colorsArray = [];
let petalFadeBoolean = false;
let petalIndex;
let f = 255
let noPetals = 10;
let theta = 0;
let d = 185;
let t = 0;

// Text Variables

let myCustomFont, heart, star;
let textBoolean = false;
let textResult;
let textX = 0;
let textY = 0;
let textFade = 0;
let textTarget;
let coin;
let vel = 0
const easing = 0.08;
const friction = 0.93;

// End Game Variable

let counter = 0;

// Text Function

function coinFlip() {
    coin = Math.random();
    if (coin > 0.5) {
      return '💘 بحبني هيهي';
    } else {
      return '💔 ما بحبني لاااع';
    }
}

// Colors

function randomColors() {
  colorsArray = []
  for (let i = 0; i < noPetals; i++) {
    colorR = Math.round(215 + Math.random() * 5);
    colorG = Math.round(90 + Math.random() * 30);
    colorB = Math.round(130 + Math.random() * 30);
    colorsArray.push([colorR,colorG,colorB,255]);
  }
}

// shuffling Colors Array

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// PetalFade



// Points Initiation

function petals() {
  pointArray = [];
  for (let i = 0; i < noPetals; i++) {
    theta += (2*Math.PI) / noPetals;
    x = d / 2 * Math.cos(theta);
    y = d / 2 * Math.sin(theta);
    color = colorsArray[i]
    ellipseHeight = d - d * 0.2;
    ellipseWidth = (Math.PI*d) / noPetals;
    ellipseWidth += ellipseWidth * 0.25
    pointArray.push([x, y, ellipseHeight, ellipseWidth, theta ,color]);
  }
}

randomColors()
shuffle(colorsArray);
petals();


// Setup Function

function setup() {
  createCanvas(windowWidth, windowHeight);
}

// Click Function
function mousePressed() {

  c = get(mouseX, mouseY);

  for (let i = 0; i < pointArray.length; i++) {
    
    if (c[0] == pointArray[i][5][0] && c[1] == pointArray[i][5][1] && c[2] == pointArray[i][5][2]) {

    petalFadeBoolean = true
    petalIndex = i

    // Text Boolean

    textBoolean = true;
    textResult = coinFlip();
    vel = 0;
    textFade = 0;

    // Update Stats
    counter += 1

  }

  if (counter == noPetals) {
    if (c[0] == 245) {
      counter += 1;
    }
   }
  }
}

// Draw Function
function draw() {

  background(245);

  let centerX = windowWidth / 2;
  let centerY = windowHeight / 2;
  textTarget = windowHeight / 5;
  
  // Text Display

  if (textBoolean) {
    let acc = (textTarget - centerY) * easing;
    vel = (vel + acc) * friction;
    if (textFade < 255) {
      textFade = (textFade - acc * 0.75) * friction;
    }
  }
  
  //

  if (petalFadeBoolean) {
    if (f > 125){
      f-= 10
      pointArray[petalIndex][5][3] = f;
    } else {
      f = 255
      petalFadeBoolean = false
    }   
  }

  fill(0,0,0,(textFade));
  textSize(windowHeight / 30);
  textAlign(CENTER)
  text(textResult,centerX,centerY + vel);
  

  // Stem

  stroke('#5D9253');
  strokeWeight(d/20);
  line(centerX,centerY,centerX,windowHeight);

  // Flower Center

  let n = noise(t);
  t += 0.002;
  translate(centerX,centerY);
  rotate(n);
  strokeWeight(0);
  fill('#FFF6A9');
  circle(0,0,d);


  // Petal Drawing

  for (let i = 0; i < pointArray.length; i++) {
    let pX = pointArray[i][0];
    let pY = pointArray[i][1];
    let pH = pointArray[i][2];
    let pW = pointArray[i][3];
    let pTheta = pointArray[i][4];
    let pColor = pointArray[i][5];
    push();
    translate(pX,pY);
    rotate(pTheta);
    fill(pColor);
    ellipse(0,0,pH,pW);
    pop();
  }

  // Restart Game
  if (counter == noPetals + 1 && petalFadeBoolean == false) {
    restart();
  }

}

// Windows Resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Restart Function

function restart() {
  const min = 5;
  const max = 12;
  noPetals = Math.floor(Math.random() * (max - min + 1)) + min;
  counter = 0;
  randomColors()
  shuffle(colorsArray);
  petals();
  textResult = ''
}