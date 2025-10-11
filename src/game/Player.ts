export class Player {
  color: string;
  size: number;

  snakeBody: Record<string, number>[];
  headPositionX: number;
  headPositionY: number;

  playerSize: number;
  playerColor: string;

  width: number;
  height: number;

  directionX: number;
  directionY: number;
  directionLocket: boolean;

  lastKey: string;

  constructor(width: number, height: number) {
    this.color = "green";
    this.size = 20;

    this.lastKey = "right";

    this.width = width;
    this.height = height;

    this.directionX = 20; // Po spuštění hry had okamžitě beží.
    this.directionY = 0;
    this.directionLocket = false;

    this.playerSize = 20;
    this.playerColor = "green";

    // Počáteční pozice hada, střed hracího pole.
    this.headPositionX = this.width / 2 - this.size / 2;
    this.headPositionY = this.height / 2 - this.size / 2;

    this.snakeBody = [{ x: this.headPositionX, y: this.headPositionY }];
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

  resetPosition() {
    this.headPositionX = this.width / 2 - this.size / 2;
    this.headPositionY = this.height / 2 - this.size / 2;

    this.snakeBody = [{ x: this.headPositionX, y: this.headPositionY }];
  }

  move() {
    this.snakeBody[0].x += this.directionX;
    this.snakeBody[0].y += this.directionY;
  }

  direction(key: string) {
    switch (key) {
      case "up":
        if (this.lastKey != "down" && !this.directionLocket) {
          this.directionX = 0;
          this.directionY = -this.size;
          this.lastKey = key;
          this.directionLocket = true;
        }
        break;
      case "left":
        if (this.lastKey != "right" && !this.directionLocket) {
          this.directionX = -this.size;
          this.directionY = 0;
          this.lastKey = key;
          this.directionLocket = true;
        }
        break;
      case "down":
        if (this.lastKey != "up" && !this.directionLocket) {
          this.directionX = 0;
          this.directionY = this.size;
          this.lastKey = key;
          this.directionLocket = true;
        }
        break;
      case "right":
        if (this.lastKey != "left" && !this.directionLocket) {
          this.directionX = this.size;
          this.directionY = 0;
          this.lastKey = key;
          this.directionLocket = true;
        }
        break;
    }
  }
}
