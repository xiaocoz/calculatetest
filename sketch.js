let answer = 0;
let correct = 0;
let problem = "";
let finished = false;
let startTime;
let problemCount = 0;
let input;

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput();
  
  input.changed(inputEvent);

  textFont('Courier New');
  textSize(25);

  startTime = millis();
  generateProblem();
}

function draw() {
  background(0);
  fill(255);
  
  colorMode(HSB);

  if (problemCount >= 16) {
    finished = true;
  }

  if (!finished) {
    text(problem, width / 2 - textWidth(problem) / 2, height / 2);
    input.position(width / 2 + textWidth(problem) / 2 + 5, height / 2 - 10);
    text("Problem: " + (problemCount+1) + "/16", width - 220, 50);
  } else {
    let timeUsed = (millis() - startTime) / 1000;
    input.hide();
    textSize(20);
    text("You have completed all the problems.", width / 2 - 150, height / 2 - 80);
    text("Time used: " + timeUsed + " seconds.", width / 2 - 150, height / 2 - 50);
    text("Your accuracy rate: " + int((correct / problemCount) * 100) + "%.", width / 2 - 150, height / 2 - 20);
    textSize(35);
    fill(map(millis() % 1000, 0, 1000, 0, 255), 255, 255);
    text("You are awesome!", width / 2 - 150, height / 2 + 30 + sin(millis() / 200) * 20);
    noLoop(); // Stop the draw loop
  }
}

function generateProblem() {
  let num1 = 0, num2 = 0;
  
  // Generate single-digit or two-digit problems randomly
  if (random(1) < 0.5) {
    num1 = int(random(1, 9));
    num2 = int(random(1, 9));
  } else {
    num1 = int(random(10, 99));
    num2 = int(random(10, 99));
  }
  
  if (random(1) < 0.5) {
    problem = num1 + " + " + num2 + " =";
    answer = num1 + num2;
  } else {
    problem = num1 + " - " + num2 + " =";
    answer = num1 - num2;
  }
}

function inputEvent() {
  let inputValue = parseInt(this.value());
  if (inputValue === answer) {
    correct++;
  }
  problemCount++;
  this.value('');
  if (!finished) generateProblem();
}
