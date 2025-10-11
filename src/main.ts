"use strict";
import "./style.css";
import {
  menuBgMusic,
  hoverSoundEffect,
  pageTransition,
  countDown,
} from "./MainMenu/index";
import type { GameConfig1 } from "./types";
import { Game } from "./game/Game";

menuBgMusic();
hoverSoundEffect();

//todo - generování jídla v hřáci, skóre
// přidat na spustění intervalu opoždění o 3-4vteřiny
// pageTransition();
// countDown();

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const config1 = {
  ctx: canvas.getContext("2d") as CanvasRenderingContext2D,
  canvasWidth: (canvas.width = 300), // v menu nastavit aby šli vybrat pouze lichá čísla
  canvasHeight: (canvas.height = 300), // v menu nastavit aby šli vybrat pouze lichá čísla
  playerSize: 20,
  playerColor: "lime",
  playerName: "",
  gameSpeed: 110,
  showGrid: true,
  playerHead: [{ x: 100, y: 100 }],
  speed: 200,
  directionX: 20,
  directionY: 0,
  lastKey: "d",
  directionLock: true,
  foodColor: "red",
  foodX: 0,
  foodY: 0,
  animationFrameID: 0,
  lastTime: 0,
  isGameOver: false,
};

const moves = {
  up: ["w", "ArrowUp"],
  right: ["d", "ArrowRight"],
  down: ["s", "ArrowDown"],
  left: ["a", "ArrowLeft"],
};

class snakeTheUltimateChallenge {
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  playerSize: number;
  playerColor: string;
  playerName: string;
  gameSpeed: number;
  showGrid: boolean;
  playerHead: { x: number; y: number }[];
  speed: number;
  directionX: number;
  directionY: number;
  lastKey: string;
  directionLock: boolean;
  foodColor: string;
  foodX: number;
  foodY: number;
  animationFrameID: number;
  lastTime: number;
  isGameOver: boolean;

  constructor(config1: GameConfig1) {
    (this.ctx = config1.ctx),
      (this.canvasWidth = config1.canvasWidth),
      (this.canvasHeight = config1.canvasHeight),
      (this.playerSize = config1.playerSize),
      (this.playerColor = config1.playerColor),
      (this.playerName = config1.playerName),
      (this.gameSpeed = config1.gameSpeed),
      (this.showGrid = config1.showGrid),
      (this.playerHead = config1.playerHead),
      (this.speed = config1.speed),
      (this.directionX = config1.directionX),
      (this.directionY = config1.directionY),
      (this.lastKey = config1.lastKey);
    this.directionLock = config1.directionLock;
    this.foodColor = config1.foodColor;
    this.foodX = config1.foodX;
    this.foodY = config1.foodY;
    this.animationFrameID = config1.animationFrameID;
    this.lastTime = config1.lastTime;
    this.isGameOver = config1.isGameOver;
  }

  // Event Listeners
  initControls() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "g") this.toggleGrid();
    });

    document.addEventListener("keydown", (e) => {
      if (
        (moves.up.includes(e.key) ||
          moves.right.includes(e.key) ||
          moves.down.includes(e.key) ||
          moves.left.includes(e.key)) &&
        this.directionLock
      ) {
        this.playerDirection(e.key);
      }
    });
  }

  // Show Grid
  toggleGrid() {
    if (this.showGrid) this.drawGrid();
    else this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasWidth);

    this.showGrid = !this.showGrid;
  }

  drawGrid() {
    // Vertical lines
    for (let i = this.playerSize; i < this.canvasWidth; i += this.playerSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(i, 0);
      this.ctx.lineTo(i, this.canvasHeight);
      this.ctx.stroke();
    }

    // Horizontal lines
    for (let i = this.playerSize; i < this.canvasHeight; i += this.playerSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, i);
      this.ctx.lineTo(this.canvasWidth, i);
      this.ctx.stroke();
    }
  }

  // Always show player in the center of the square. Minus player size for better starting.
  playerStartPosition() {
    this.playerHead[0].x =
      this.canvasWidth / 2 - this.playerSize / 2 - this.playerSize;
    this.playerHead[0].y = this.canvasHeight / 2 - this.playerSize / 2;
  }

  // Player direction, wasd and arrows keybinds.
  playerDirection(key: string) {
    if (moves.up.includes(key) && !moves.down.includes(this.lastKey)) {
      this.directionY = -this.playerSize;
      this.directionX = 0;
      this.lastKey = key;
      this.directionLock = false;
    } else if (
      moves.right.includes(key) &&
      !moves.left.includes(this.lastKey)
    ) {
      this.directionX = this.playerSize;
      this.directionY = 0;
      this.lastKey = key;
      this.directionLock = false;
    } else if (moves.down.includes(key) && !moves.up.includes(this.lastKey)) {
      this.directionY = this.playerSize;
      this.directionX = 0;
      this.lastKey = key;
      this.directionLock = false;
    } else if (
      moves.left.includes(key) &&
      !moves.right.includes(this.lastKey)
    ) {
      this.directionX = -this.playerSize;
      this.directionY = 0;
      this.lastKey = key;
      this.directionLock = false;
    }
  }

  // Just clearing whole Canvas.
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  // Draw head of the Snake and whole body.
  drawPlayer() {
    this.ctx.fillStyle = this.playerColor;

    for (let i = 0; i < this.playerHead.length; i++) {
      this.ctx.fillRect(
        this.playerHead[i].x,
        this.playerHead[i].y,
        this.playerSize,
        this.playerSize
      );
    }
  }

  // Food generation in whole square.
  randomFoodGeneration() {
    let xFood: number;
    let yFood: number;
    let foodCollision = false;

    do {
      foodCollision = false;

      xFood =
        Math.floor(Math.random() * (this.canvasWidth / this.playerSize)) *
        this.playerSize;

      yFood =
        Math.floor(Math.random() * (this.canvasHeight / this.playerSize)) *
        this.playerSize;

      for (let i = 0; i < this.playerHead.length; i++) {
        if (this.playerHead[i].x === xFood && this.playerHead[i].y === yFood) {
          foodCollision = true;
          break; // If you find first collision => end cyklus
        }
      }

      if (!foodCollision) {
        this.foodX = xFood;
        this.foodY = yFood;
      }
    } while (foodCollision);
  }

  // What will happen, when you eat a food or not.
  whenEatOrNot() {
    if (
      this.playerHead[0].x === this.foodX &&
      this.playerHead[0].y === this.foodY
    ) {
      this.randomFoodGeneration();
    } else {
      this.playerHead.pop();
    }

    this.drawFood();
  }

  // Just draw food.
  drawFood() {
    this.ctx.fillStyle = this.foodColor;
    this.ctx.fillRect(this.foodX, this.foodY, this.playerSize, this.playerSize);
  }

  // Creating body of the snake.
  playerMove() {
    let snakeBody = {
      x: this.playerHead[0].x + this.directionX,
      y: this.playerHead[0].y + this.directionY,
    };

    this.playerHead.unshift({ x: snakeBody.x, y: snakeBody.y });
  }

  // Literally stop the game
  stopGame() {
    this.isGameOver = true;
    cancelAnimationFrame(this.animationFrameID);
  }

  // End the game if you touch the wall
  wallCollision() {
    if (
      this.playerHead[0].x === this.canvasWidth ||
      this.playerHead[0].y === this.canvasHeight ||
      this.playerHead[0].x < 0 ||
      this.playerHead[0].y < 0
    ) {
      this.stopGame();
    }
  }

  // End of the game if you touch the snake
  snakeBodyCollision() {
    for (let i = 1; i < this.playerHead.length; i++) {
      if (
        this.playerHead[0].x === this.playerHead[i].x &&
        this.playerHead[0].y === this.playerHead[i].y
      ) {
        this.stopGame();
      }
    }
  }

  // Game loop
  gameLoop() {
    const snakeGameLoop = (timestamp: number) => {
      if (timestamp - this.lastTime >= this.speed) {
        this.clearCanvas();
        this.playerMove();
        this.whenEatOrNot();
        this.drawPlayer();

        // Collisions
        this.wallCollision();
        this.snakeBodyCollision();

        this.directionLock = true;
        this.lastTime = timestamp;
      }
      if (!this.isGameOver)
        this.animationFrameID = requestAnimationFrame(snakeGameLoop);
    };
    this.animationFrameID = requestAnimationFrame(snakeGameLoop);
  }
}

const snakeGame = new snakeTheUltimateChallenge(config1);
snakeGame.initControls();
snakeGame.playerStartPosition();
snakeGame.randomFoodGeneration();
snakeGame.gameLoop();