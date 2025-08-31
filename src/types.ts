export type GameConfig = {
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  playerSize: number;
  playerColor: string;
  playerName: string;
  gameSpeed: number;
  showGrid: boolean;
  playerX: number;
  playerY: number;
  speed: number;
  directionX: number;
  directionY: number;
  lastKey: string;
  directionLock: boolean;
  foodColor: string;
};
