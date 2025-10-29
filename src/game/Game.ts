import { Food, Player, Canvas } from "./index";

export class Game {
  food: Food;
  canvas: Canvas;
  player: Player;

  animationID: number;
  isLoopWorking: boolean;

  constructor(width: number, height: number) {
    this.food = new Food(width, height);
    this.player = new Player(width, height);
    this.canvas = new Canvas(width, height, this.player, this.food);

    this.animationID = 0;
    this.isLoopWorking = true;
  }

  listeners() {
    const keyMap: Record<string, () => void> = {
      w: () => this.player.direction("up"),
      d: () => this.player.direction("right"),
      s: () => this.player.direction("down"),
      a: () => this.player.direction("left"),

      ArrowUp: () => this.player.direction("up"),
      ArrowRight: () => this.player.direction("right"),
      ArrowDown: () => this.player.direction("down"),
      ArrowLeft: () => this.player.direction("left"),
    };

    document.addEventListener("keydown", (e) => {
      const key = e.key;

      if (keyMap[key]) keyMap[key]();
    });
  }

  stop() {
    cancelAnimationFrame(this.animationID);
    this.isLoopWorking = false;
  }

  collisions() {
    // If head of the snake hit a wall, stop the game.
    if (this.player.hitWall(this.canvas.width, this.canvas.height)) this.stop();

    // If snake eat food, grow. If not, cut a tail.
    if (
      this.player.snake[0].x === this.food.x &&
      this.player.snake[0].y === this.food.y
    ) {
      let isCollision = true;
      let i = 0;

      while (isCollision) {
        if(i === 0) this.food.randomGeneration();

        if (
          this.player.snake[i].x === this.food.x &&
          this.player.snake[i].y === this.food.y
        ) {
          i = 0;
        } else i++;

        if (i >= this.player.snake.length) isCollision = false;
      }
    } else this.player.snake.pop();

    // Head collision with the snake body.
    if (this.player.snake.length > 4) {
      for (let i = 1; i < this.player.snake.length; i++) {
        if (
          this.player.headPositionX === this.player.snake[i].x &&
          this.player.headPositionY === this.player.snake[i].y
        ) {
          this.stop();
        }
      }
    }
  }

  loop() {
    this.listeners();
    let interval = 200;
    let lastTime = 0;

    const gameLoop = (timestamp: number) => {
      if (timestamp - lastTime >= interval) {
        this.canvas.clear();

        this.player.move();
        this.collisions();

        this.canvas.draw();

        this.player.directionLocket = false;
        lastTime = timestamp;
      }

      if (this.isLoopWorking) this.animationID = requestAnimationFrame(gameLoop);
    };

    this.animationID = requestAnimationFrame(gameLoop);
  }
}
