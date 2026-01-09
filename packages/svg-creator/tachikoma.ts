import type { Snake } from "@snk/types/snake";
import type { Point } from "@snk/types/point";
import { createAnimation } from "./css-utils";

export type Options = {
  colorSnake: string;
  sizeCell: number;
  sizeDot: number;
};

// Tachikoma SVG path - spider-tank from Ghost in the Shell
// Designed for ~16px cell, scales with sizeCell
const createTachikomaPath = (size: number): string[] => {
  const s = size / 16; // scale factor
  // Simplified Tachikoma: body + eye + 4 legs
  return [
    `<ellipse cx="${8 * s}" cy="${8 * s}" rx="${5 * s}" ry="${4 * s}" class="tachi-body"/>`,
    `<circle cx="${10 * s}" cy="${7 * s}" r="${2 * s}" class="tachi-eye"/>`,
    `<circle cx="${10.5 * s}" cy="${6.5 * s}" r="${0.8 * s}" class="tachi-pupil"/>`,
    `<path class="tachi-leg" d="M${3 * s},${6 * s} Q${1 * s},${3 * s} ${0 * s},${1 * s}"/>`,
    `<path class="tachi-leg" d="M${3 * s},${10 * s} Q${1 * s},${13 * s} ${0 * s},${15 * s}"/>`,
    `<path class="tachi-leg" d="M${13 * s},${6 * s} Q${15 * s},${3 * s} ${16 * s},${1 * s}"/>`,
    `<path class="tachi-leg" d="M${13 * s},${10 * s} Q${15 * s},${13 * s} ${16 * s},${15 * s}"/>`,
  ];
};

export const createTachikoma = (
  chain: Snake[],
  { sizeCell }: Options,
  duration: number,
) => {
  if (!chain[0]) return { svgElements: [], styles: [] };

  // Track head positions for Tachikoma movement
  // Offset by -0.5 to center the 2x sized Tachikoma on the cell
  const headPositions: Point[] = chain.map((snake) => ({
    x: snake[0] - 2 - 0.5, // head x (offset for centering)
    y: snake[1] - 2 - 0.5, // head y
  }));

  // Find when the Tachikoma changes direction (for facing)
  const getDirection = (i: number): "left" | "right" => {
    if (i === 0) return "right";
    const prev = headPositions[i - 1];
    const curr = headPositions[i];
    return curr.x >= prev.x ? "right" : "left";
  };

  // Create keyframes for head movement
  const keyframes = removeInterpolatedPositions(
    headPositions.map((pos, i, { length }) => ({
      ...pos,
      t: i / length,
      dir: getDirection(i),
    })),
  ).map(({ t, dir, ...p }) => ({
    t,
    style:
      dir === "left"
        ? `transform:translate(${p.x * sizeCell}px,${p.y * sizeCell}px) scaleX(-1)`
        : `transform:translate(${p.x * sizeCell}px,${p.y * sizeCell}px)`,
  }));

  const styles = [
    // Tachikoma body styles - blue spider-tank from Ghost in the Shell
    `.tachi-body {
      fill: #4a9eff;
      stroke: #2d7dd2;
      stroke-width: 1;
      filter: drop-shadow(0 0 3px rgba(74, 158, 255, 0.5));
    }`,
    `.tachi-eye {
      fill: #ff6b6b;
      stroke: #c92a2a;
      stroke-width: 0.8;
      filter: drop-shadow(0 0 2px #ff6b6b);
    }`,
    `.tachi-pupil {
      fill: #1a1a2e;
    }`,
    `.tachi-leg {
      fill: none;
      stroke: #4a9eff;
      stroke-width: 2;
      stroke-linecap: round;
      filter: drop-shadow(0 0 2px rgba(74, 158, 255, 0.5));
    }`,
    // Tachikoma container animation
    `.tachikoma {
      animation: tachi-move linear ${duration}ms infinite;
    }`,
    createAnimation("tachi-move", keyframes),

    // Projectile styles
    `.projectile {
      fill: #ff6b6b;
      filter: drop-shadow(0 0 2px #ff6b6b);
    }`,
  ];

  // Make Tachikoma 2x cell size for better visibility
  const tachiSize = sizeCell * 2;

  const svgElements = [
    `<g class="tachikoma">`,
    ...createTachikomaPath(tachiSize),
    `</g>`,
  ];

  return { svgElements, styles };
};

const removeInterpolatedPositions = <T extends Point>(arr: T[]) =>
  arr.filter((u, i, arr) => {
    if (i - 1 < 0 || i + 1 >= arr.length) return true;

    const a = arr[i - 1];
    const b = arr[i + 1];

    const ex = (a.x + b.x) / 2;
    const ey = (a.y + b.y) / 2;

    return !(Math.abs(ex - u.x) < 0.01 && Math.abs(ey - u.y) < 0.01);
  });
