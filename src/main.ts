import "./style.css";
import {
  menuBgMusic,
  hoverSoundEffect,
  pageTransition,
  countDown,
} from "./MainMenu/index";
import { PlayerMoves } from "./TheGame/index";
import type { GeneralProperty } from "./types.ts";

// Global declarations
const canvas = (document.getElementById("canvas") as HTMLCanvasElement) || null;

const generalProperty: GeneralProperty = {
  canvasWidth: (canvas.width = 300),
  canvasHeight: (canvas.height = 300),
  playerSize: 20,
  ctx: canvas.getContext("2d"),
  showGrid: false
};
/**********************************************/

// Listener for show/hide grid
document.addEventListener("keydown", (e) => {
  console.log(e.key, generalProperty.showGrid);
  
  if (e.key === "g") generalProperty.showGrid = !generalProperty.showGrid;
});
/**********************************************/

menuBgMusic();
hoverSoundEffect();

// přidat na spustění intervalu opoždění o 3-4vteřiny
// pageTransition();
// countDown();

PlayerMoves(generalProperty);
