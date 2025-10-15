export class Food {
  x: number;
  y: number;

  color: string;
  size: number;

  cellsX: number;
  cellsY: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = 0;
    this.y = 0;

    this.color = "red";
    this.size = 20;

    this.cellsX = canvasWidth / this.size;
    this. cellsY = canvasHeight / this.size;

    this.randomGeneration();
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  randomGeneration() {
    this.x = Math.floor(Math.random() * this.cellsX) * this.size;
    this.y = Math.floor(Math.random() * this.cellsY) * this.size;
  }
}
