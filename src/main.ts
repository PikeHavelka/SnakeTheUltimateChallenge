"use strict";
import "./style.css";
import {
  menuBgMusic,
  hoverSoundEffect,
  pageTransition,
  countDown,
} from "./MainMenu/index";
import type { GameConfig } from "./types";

menuBgMusic();
hoverSoundEffect();

// přidat na spustění intervalu opoždění o 3-4vteřiny
// pageTransition();
// countDown();

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const config = {
  ctx: canvas.getContext("2d") as CanvasRenderingContext2D,
  canvasWidth: (canvas.width = 300),
  canvasHeight: (canvas.height = 300),
  playerSize: 20,
  playerColor: "lime",
  playerName: "",
  gameSpeed: 110,
};

let showGrid = false;

document.addEventListener("keydown", (e) => {
  if(e.key === "g") {
    showGrid = !showGrid;

    if(showGrid) game.drawGrid();
    else config.ctx.clearRect(0, 0, config.canvasWidth, config.canvasWidth);
  }
});

class Game {
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  playerSize: number;
  playerColor: string;
  playerName: string;
  gameSpeed: number;

  constructor(config: GameConfig) {
    this.ctx = config.ctx,
    this.canvasWidth = config.canvasWidth,
    this.canvasHeight = config.canvasHeight,
    this.playerSize = config.playerSize,
    this.playerColor = config.playerColor,
    this.playerName = config.playerName,
    this.gameSpeed = config.gameSpeed
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
}

const game = new Game(config);
