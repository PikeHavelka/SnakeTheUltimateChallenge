import { Food, Player, Canvas } from "./index";

export class Game {
  food: Food | null = null;
  canvas: Canvas;
  player: Player;

  animationID: number;

  constructor(width: number, height: number) {
    this.player = new Player(width, height);
    this.canvas = new Canvas(width, height, this.player);

    this.animationID = 0;
  }

  listeners() {
    document.addEventListener("keydown", (e) => {
      const key = e.key;

      //Player interactions
      if(["w", "a", "s", "d", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"].includes(key)) this.player.direction(key);
    });
  }

  stop(){
    cancelAnimationFrame(this.animationID);
  }

  collisions(){
    if(this.player.hitWall(this.canvas.width, this.canvas.height)) this.stop();
  }
  
  loop() {
    this.listeners();
    let interval = 200;
    let lastTime = 0;

    const gameLoop = (timestamp: number) => {
      if (timestamp - lastTime >= interval) {
        this.canvas.clear();
        
        this.player.move();
        
        this.canvas.draw();
        this.collisions();
        
        this.player.directionLocket = false;
        lastTime = timestamp;
      }
      
      this.animationID = requestAnimationFrame(gameLoop);
    };
    
    this.animationID = requestAnimationFrame(gameLoop);
  }
}