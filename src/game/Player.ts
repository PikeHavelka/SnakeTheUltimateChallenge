export class Player {
  color: string;
  size: number;

  snake: [Record<string, number>];
  headPositionX: number;
  headPositionY: number;

  directionX: number;
  directionY: number;
  directionLocket: boolean;

  lastKey: string;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.color = "green";
    this.size = 20;

    this.lastKey = "right";

    this.directionX = 20; // Po spuštění hry had okamžitě beží.
    this.directionY = 0;
    this.directionLocket = false;

    this.snake = [{}];
    this.headPositionX = 0;
    this.headPositionY = 0;

    // // Počáteční pozice hada, střed hracího pole.
    this.resetPosition(canvasWidth, canvasHeight);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;

    for (let i = 0; i < this.snake.length; i++) {
      ctx.fillRect(
        this.snake[i].x,
        this.snake[i].y,
        this.size,
        this.size
      );
    }
  }

  resetPosition(canvasWidth: number, canvasHeight: number) {
    this.headPositionX = canvasWidth / 2 - this.size / 2;
    this.headPositionY = canvasHeight / 2 - this.size / 2;

    this.snake = [{ x: this.headPositionX, y: this.headPositionY }];
  }

  hitWall(canvasWidth: number, canvasHeight: number) {
    const head = this.snake[0];

    if(head.x > canvasWidth || head.x < 0 || head.y > canvasHeight || head.y < 0) return true;
  }

  move() {
    const head = {
      x: this.headPositionX += this.directionX,
      y: this.headPositionY += this.directionY
    }

    this.snake.unshift(head);
  }

  direction(key: string) {
    if (key === "up"  && this.lastKey !== "down" && !this.directionLocket) {
      this.directionX = 0;
      this.directionY = -this.size;
      this.directionLocket = true;
      this.lastKey = key;
    } else if (key === "left" && this.lastKey !== "right" && !this.directionLocket) {
      this.directionX = -this.size;
      this.directionY = 0;
      this.directionLocket = true;
      this.lastKey = key;
    } else if (key === "down" && this.lastKey !== "up" && !this.directionLocket) {
      this.directionX = 0;
      this.directionY = this.size;
      this.directionLocket = true;
      this.lastKey = key;
    } else if (key === "right" && this.lastKey !== "left" && !this.directionLocket) {
      this.directionX = this.size;
      this.directionY = 0;
      this.directionLocket = true;
      this.lastKey = key;
    }
  }
}
