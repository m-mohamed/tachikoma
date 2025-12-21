import { beforeAll, expect, it } from "bun:test";
import { IColorGrid, init_panic_hook } from "snk-js";

beforeAll(() => init_panic_hook());

it("should init wasm and create struct", async () => {
  const cells = new Uint8Array(120);
  cells[1] = 2;
  cells[10] = 3;
  const grid = IColorGrid.create(10, 12, cells);

  expect(grid.width).toBe(10);
  expect(grid.height).toBe(12);
  expect(grid.cells).toEqual(cells);
});
