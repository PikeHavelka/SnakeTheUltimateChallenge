// playground area (NORMAL)
import type { GeneralProperty } from "../types";
export const BGFieldGrid = (generalProperty: GeneralProperty) => {

  // Background grid, just for testing the game. Press G for show/hide grid.
  const bgGrid = () => {
    if (generalProperty.ctx) {
      //vertical lines
      for (
        let i = 0;
        i <= generalProperty.canvasWidth;
        i += generalProperty.playerSize
      ) {
        generalProperty.ctx.beginPath();
        generalProperty.ctx.moveTo(i, 0);
        generalProperty.ctx.lineTo(i, generalProperty.canvasHeight);
        generalProperty.ctx.strokeStyle = "#ddd";
        generalProperty.ctx.stroke();
      }

      //horizontal lines
      for (
        let i = 0;
        i <= generalProperty.canvasHeight;
        i += generalProperty.playerSize
      ) {
        generalProperty.ctx.beginPath();
        generalProperty.ctx.moveTo(0, i);
        generalProperty.ctx.lineTo(generalProperty.canvasWidth, i);
        generalProperty.ctx.strokeStyle = "#ddd";
        generalProperty.ctx.stroke();
      }
    }
  };

  bgGrid();
};
