import "./style.css";
import {
  menuBgMusic,
  hoverSoundEffect,
  pageTransition,
  countDown,
} from "./MainMenu/index";

menuBgMusic();
hoverSoundEffect();
// pageTransition();
// countDown();

// playground area (NORMAL)
const canvas = (document.getElementById("canvas") as HTMLCanvasElement) || null;
const ctx = canvas.getContext("2d");

canvas.width = 300;
canvas.height = 300;
let playerSize = 20;

// Background grid, just for testing the game. Press G for show/hide grid.
const developerPurposes = () => {
    let showGrid = true;
    
    document.addEventListener("keydown", (e) => {
      console.log(e.key, showGrid);
      if (e.key === "g") {showGrid = !showGrid;
        bgGrid();
      }
    });
    
    const bgGrid = () => {
      if (ctx) {
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
    
        ctx.fillStyle = "lime";
        ctx.fillRect(0, 0, 20, 20);
    
        if (showGrid) {
          //vertical line
          for (let i = 0; i <= canvas.width; i += playerSize) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.strokeStyle = "#ddd";
            ctx.stroke();
          }
    
          //horizontal line
          for (let i = 0; i <= canvas.height; i += playerSize) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.strokeStyle = "#ddd";
            ctx.stroke();
          }
        }
      }
    };
    
    bgGrid();
}
developerPurposes();
/************************************************/