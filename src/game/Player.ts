export class Player {
  color: string;
  size: number;

  snakeBody: Record<string, number>[];
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

    this.snakeBody = [];
    this.headPositionX = 0;
    this.headPositionY = 0;

    // // Počáteční pozice hada, střed hracího pole.
    this.resetPosition(canvasWidth, canvasHeight);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;

    for (let i = 0; i < this.snakeBody.length; i++) {
      ctx.fillRect(
        this.snakeBody[i].x,
        this.snakeBody[i].y,
        this.size,
        this.size
      );
    }
  }

  resetPosition(canvasWidth: number, canvasHeight: number) {
    this.headPositionX = canvasWidth / 2 - this.size / 2;
    this.headPositionY = canvasHeight / 2 - this.size / 2;

    this.snakeBody = [{ x: this.headPositionX, y: this.headPositionY }];
  }

  hitWall(canvasWidth: number, canvasHeight: number) {
    const head = this.snakeBody[0];

    if(head.x > canvasWidth || head.x < 0 || head.y > canvasHeight || head.y < 0) return true;
  }

  move() {
    this.snakeBody[0].x += this.directionX;
    this.snakeBody[0].y += this.directionY;
  }

  direction(key: string) {
    if (key === "w" && this.lastKey != "s" && !this.directionLocket) {
      this.directionX = 0;
      this.directionY = -this.size;
      this.directionLocket = true;
      this.lastKey = key;
    } else if (key === "a" && this.lastKey != "d" && !this.directionLocket) {
      this.directionX = -this.size;
      this.directionY = 0;
      this.directionLocket = true;
      this.lastKey = key;
    } else if (key === "s" && this.lastKey != "w" && !this.directionLocket) {
      this.directionX = 0;
      this.directionY = this.size;
      this.directionLocket = true;
      this.lastKey = key;
    } else if (key === "d" && this.lastKey != "a" && !this.directionLocket) {
      this.directionX = this.size;
      this.directionY = 0;
      this.directionLocket = true;
      this.lastKey = key;
    }
  }
}
