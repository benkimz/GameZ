// Get the canvas element and context
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// Set the initial game state
let gameState = "start";
let score = 0;

// Define the car object
const car = {
  x: canvas.width / 2 - 25,
  y: canvas.height - 100,
  width: 50,
  height: 80,
  speed: 5,
};

// Define the enemy object
let enemy = {
  x: Math.floor(Math.random() * (canvas.width - 50)),
  y: -50,
  width: 50,
  height: 50,
  speed: 3,
};

// Listen for button clicks to start and pause the game
const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const moveLeftButton = document.getElementById("move-left-button");
const moveRightButton = document.getElementById("move-right-button");

startButton.addEventListener("click", () => {
  if (gameState === "start") {
    gameState = "play";
    loop();
  }
});

pauseButton.addEventListener("click", () => {
  if (gameState === "play") {
    gameState = "pause";
  } else if (gameState === "pause") {
    gameState = "play";
    loop();
  }
});

moveLeftButton.addEventListener("click", () => {
  if (gameState === "play" && car.x > 0) {
    car.x -= car.speed * 5;
  }
});

moveRightButton.addEventListener("click", () => {
  if (gameState === "play" && car.x < canvas.width - car.width) {
    car.x += car.speed * 5;
  }
});

// Listen for keyboard input to move the car
document.addEventListener("keydown", (event) => {
  if (gameState === "play") {
    if (event.code === "ArrowLeft" && car.x > 0) {
      car.x -= car.speed;
    } else if (event.code === "ArrowRight" && car.x < canvas.width - car.width) {
      car.x += car.speed;
    }
  }
});

// Draw the game elements on the canvas
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the car
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(car.x, car.y, car.width, car.height);

  // Draw the enemy
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
}

// Update the game state on each frame
function update() {
  // Move the enemy down the screen
  enemy.y += enemy.speed * 4;

  // Check for collision between the car and the enemy
  if (
    car.x < enemy.x + enemy.width &&
    car.x + car.width > enemy.x &&
    car.y < enemy.y + enemy.height &&
    car.y + car.height > enemy.y
  ) {
    gameState = "game-over";
  }

  // Check if the enemy has reached the bottom of the screen
  if (enemy.y > canvas.height) {
    score++;
    enemy = {
      x: Math.floor(Math.random() * (canvas.width - 50)),
      y: -50,
      width: 50,
      height: 50,
      speed: enemy.speed + 0.5,
    };
  }
}

// Main game loop
function loop() {
  if (gameState === "play") {
    update();
    draw();
    window.requestAnimationFrame(loop);
  } else if (gameState === "game-over") {
    alert("Game Over! Your score is " + score);
    gameState = "start";
    score = 0;
  }
}

// Call the loop function to start the game
loop();