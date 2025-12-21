import { init_panic_hook, get_grid_sample, IColorGrid } from "snk-js";
import { createCanvas } from "../utils/canvas";

init_panic_hook();

const cells = new Uint8Array(80);
cells[1] = 2;
const grid = IColorGrid.create(10, 8, cells);

{
  // const grid = get_grid_sample("realistic");
  const grid = get_grid_sample("caves");
  const { canvas, draw } = createCanvas(grid);
  draw({ width: grid.width, height: grid.height, data: grid.cells }, [], []);
  document.body.appendChild(canvas);
}
