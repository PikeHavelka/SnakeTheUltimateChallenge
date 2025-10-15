import { Player, Food } from "./index";

export class Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  width: number;
  height: number;

  player: Player;
  food: Food;

  constructor(width: number, height: number, player: Player, food: Food) {
    const canvas = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement | null;

    if (!canvas) throw new Error("Browser can't find any Canvas Element!");

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D | null;

    if (!ctx) throw new Error("Your browser doesn't support context!");

    this.canvas = canvas;
    this.ctx = ctx;

    this.width = this.canvas.width = width;
    this.height = this.canvas.height = height;

    this.player = player;
    this.food = food;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  draw() {
    this.food.draw(this.ctx);
    this.player.draw(this.ctx);
  }
}
