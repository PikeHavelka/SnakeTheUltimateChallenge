import { Player } from "./Player";

export class Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  canvasWidth: number;
  canvasHeight: number;

  player: Player;

  constructor(width: number, height: number, player: Player) {
    const canvas = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement | null;

    if (!canvas) throw new Error("Browser can't find any Canvas Element!");

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D | null;

    if (!ctx) throw new Error("Your browser doesn't support context!");

    this.canvas = canvas;
    this.ctx = ctx;

    this.canvasWidth = this.canvas.width = width;
    this.canvasHeight = this.canvas.height = height;

    this.player = player;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  draw() {
    this.player.draw(this.ctx);
  }
}
