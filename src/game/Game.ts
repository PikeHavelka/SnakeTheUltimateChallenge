"use strict";
import "../style.css";
import { Food, Player, Canvas } from "./index";

export class Game {
  food: Food | null = null;
  canvas: Canvas;
  player: Player;

  width: number;
  height: number;

  private animationID: number;

  constructor(width: number, height: number) {
    this.player = new Player(width, height);
    this.canvas = new Canvas(width, height, this.player);
    
    this.width = width;
    this.height = height;

    this.animationID = 0;
  }

  listeners() {
    const keyMap: Record<string, () => void> = {
      // Player moves
      w: () => this.player.direction("up"),
      ArrowUp: () => this.player.direction("up"),
      a: () => this.player.direction("left"),
      ArrowLeft: () => this.player.direction("left"),
      s: () => this.player.direction("down"),
      ArrowDown: () => this.player.direction("down"),
      d: () => this.player.direction("right"),
      ArrowRight: () => this.player.direction("right"),

      // Menu
      // Grid
      // Pause
    };

    document.addEventListener("keydown", (e) => {
      const action = keyMap[e.key];
      if (action) action();
    });
  }

  stop(){
    cancelAnimationFrame(this.animationID);
  }
  
  loop() {
    game.listeners();
    let interval = 200;
    let lastTime = 0;

    const gameLoop = (timestamp: number) => {
      if (timestamp - lastTime >= interval) {
        this.canvas.clear();
        
        this.player.move();
        
        this.canvas.draw();
        
        this.player.directionLocket = false;
        lastTime = timestamp;
      }
      
      this.animationID = requestAnimationFrame(gameLoop);
    };
    
    this.animationID = requestAnimationFrame(gameLoop);
  }
}

const game = new Game(300, 300);
game.loop();