import type { GeneralProperty } from "../types";
import { BGFieldGrid } from "./BGFieldGrid";

export const PlayerMoves = (generalProperty: GeneralProperty) => {
  // Snake moves
  const moveUp = ["w", "ArrowUp"];
  const moveRight = ["d", "ArrowRight"];
  const moveDown = ["s", "ArrowDown"];
  const moveLeft = ["a", "ArrowLeft"];

  let headX = 140;
  let headY = 140;
  let snake = [
    {
      x: headX,
      y: headY,
    },
  ];

  //  Snake keyboard movies
  let directionX = 20;
  let directionY = 0;
  let lastKey = "";
  let canChangeDirection = true;

  document.addEventListener("keydown", (e) => {
    if (!canChangeDirection) return;

    const keyPress = e.key;

    if (moveUp.includes(keyPress) && lastKey != "down") {
      directionY = -generalProperty.playerSize;
      directionX = 0;
      lastKey = "up";
      canChangeDirection = false;
    } else if (moveRight.includes(keyPress) && lastKey != "left") {
      directionX = +generalProperty.playerSize;
      directionY = 0;
      lastKey = "right";
      canChangeDirection = false;
    } else if (moveDown.includes(keyPress) && lastKey != "up") {
      directionY = +generalProperty.playerSize;
      directionX = 0;
      lastKey = "down";
      canChangeDirection = false;
    } else if (moveLeft.includes(keyPress) && lastKey != "right") {
      directionX = -generalProperty.playerSize;
      directionY = 0;
      lastKey = "left";
      canChangeDirection = false;
    }
  });
  /*************************************************/

  let lastMoveTime = 0;
  const moveDelay = 150;

  const gameLoop = (timestamp: number) => {
    if (generalProperty.ctx) {
      if (timestamp - lastMoveTime > moveDelay) {
        snake[0].x += directionX;
        snake[0].y += directionY;
        lastMoveTime = timestamp;
        canChangeDirection = true;
      }

      generalProperty.ctx.clearRect(
        0,
        0,
        generalProperty.canvasWidth,
        generalProperty.canvasHeight
      );
      generalProperty.ctx.fillStyle = "LimeGreen";
      generalProperty.ctx.fillRect(
        snake[0].x,
        snake[0].y,
        generalProperty.playerSize,
        generalProperty.playerSize
      );

      if(generalProperty.showGrid) BGFieldGrid(generalProperty);
      requestAnimationFrame(gameLoop);
    }
  };

  requestAnimationFrame(gameLoop);
};
