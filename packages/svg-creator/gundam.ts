import type { Snake } from "@snk/types/snake";
import type { Point } from "@snk/types/point";
import { createAnimation } from "./css-utils";

export type Options = {
  colorSnake: string;
  sizeCell: number;
  sizeDot: number;
};

// Simplified RX-78-2 Gundam SVG - iconic mecha from Mobile Suit Gundam
// Designed for 48px height, scaled proportionally
const createGundamPath = (height: number): string[] => {
  const s = height / 48; // scale factor (base design is 48px tall)

  // Iconic RX-78-2 features:
  // - V-fin antenna (yellow)
  // - Dual yellow eyes
  // - White/gray body armor
  // - Blue chest
  // - Red accents (chin, feet)

  return [
    // V-fin antenna (iconic yellow horns)
    `<path class="gundam-vfin" d="M${20*s},${4*s} L${24*s},${0*s} L${24*s},${6*s} Z"/>`,
    `<path class="gundam-vfin" d="M${28*s},${4*s} L${24*s},${0*s} L${24*s},${6*s} Z"/>`,

    // Head (white with red chin)
    `<rect class="gundam-head" x="${19*s}" y="${6*s}" width="${10*s}" height="${8*s}" rx="${1*s}"/>`,
    `<rect class="gundam-chin" x="${21*s}" y="${12*s}" width="${6*s}" height="${2*s}"/>`,

    // Eyes (yellow dual sensors)
    `<rect class="gundam-eye" x="${20*s}" y="${8*s}" width="${3*s}" height="${2*s}"/>`,
    `<rect class="gundam-eye" x="${25*s}" y="${8*s}" width="${3*s}" height="${2*s}"/>`,

    // Torso/Chest (blue)
    `<path class="gundam-chest" d="M${16*s},${14*s} L${32*s},${14*s} L${30*s},${26*s} L${18*s},${26*s} Z"/>`,

    // Chest vents (yellow accents)
    `<rect class="gundam-vent" x="${19*s}" y="${18*s}" width="${4*s}" height="${1*s}"/>`,
    `<rect class="gundam-vent" x="${25*s}" y="${18*s}" width="${4*s}" height="${1*s}"/>`,

    // Waist (red)
    `<rect class="gundam-waist" x="${18*s}" y="${26*s}" width="${12*s}" height="${4*s}"/>`,

    // Arms (white)
    `<rect class="gundam-arm" x="${10*s}" y="${14*s}" width="${6*s}" height="${16*s}" rx="${2*s}"/>`,
    `<rect class="gundam-arm" x="${32*s}" y="${14*s}" width="${6*s}" height="${16*s}" rx="${2*s}"/>`,

    // Hands (gray)
    `<rect class="gundam-hand" x="${11*s}" y="${30*s}" width="${4*s}" height="${4*s}" rx="${1*s}"/>`,
    `<rect class="gundam-hand" x="${33*s}" y="${30*s}" width="${4*s}" height="${4*s}" rx="${1*s}"/>`,

    // Legs (white)
    `<rect class="gundam-leg" x="${18*s}" y="${30*s}" width="${5*s}" height="${14*s}"/>`,
    `<rect class="gundam-leg" x="${25*s}" y="${30*s}" width="${5*s}" height="${14*s}"/>`,

    // Feet (red)
    `<path class="gundam-foot" d="M${16*s},${44*s} L${24*s},${44*s} L${24*s},${48*s} L${14*s},${48*s} Z"/>`,
    `<path class="gundam-foot" d="M${24*s},${44*s} L${32*s},${44*s} L${34*s},${48*s} L${24*s},${48*s} Z"/>`,
  ];
};

export const createGundam = (
  chain: Snake[],
  { sizeCell }: Options,
  duration: number,
) => {
  if (!chain[0]) return { svgElements: [], styles: [] };

  // Track head positions for Gundam movement
  // Offset to center the 48px tall Gundam on the path
  const headPositions: Point[] = chain.map((snake) => ({
    x: snake[0] - 2 - 1, // head x (offset for centering)
    y: snake[1] - 2 - 1.5, // head y (Gundam is taller)
  }));

  // Create keyframes for movement
  const keyframes = removeInterpolatedPositions(
    headPositions.map((pos, i, { length }) => ({
      ...pos,
      t: i / length,
    })),
  ).map(({ t, ...p }) => ({
    t,
    style: `transform:translate(${p.x * sizeCell}px,${p.y * sizeCell}px)`,
  }));

  const styles = [
    // Gundam color styles - classic RX-78-2 colors
    `.gundam-vfin {
      fill: #FFD700;
      stroke: #B8860B;
      stroke-width: 0.5;
    }`,
    `.gundam-head {
      fill: #FFFFFF;
      stroke: #333333;
      stroke-width: 0.5;
    }`,
    `.gundam-chin {
      fill: #CB1009;
    }`,
    `.gundam-eye {
      fill: #FFD700;
      stroke: #B8860B;
      stroke-width: 0.3;
    }`,
    `.gundam-chest {
      fill: #4169E1;
      stroke: #2850A7;
      stroke-width: 0.5;
    }`,
    `.gundam-vent {
      fill: #FFD700;
    }`,
    `.gundam-waist {
      fill: #CB1009;
      stroke: #8B0000;
      stroke-width: 0.3;
    }`,
    `.gundam-arm {
      fill: #F5F5F5;
      stroke: #333333;
      stroke-width: 0.5;
    }`,
    `.gundam-hand {
      fill: #9A9999;
      stroke: #666666;
      stroke-width: 0.3;
    }`,
    `.gundam-leg {
      fill: #F5F5F5;
      stroke: #333333;
      stroke-width: 0.5;
    }`,
    `.gundam-foot {
      fill: #CB1009;
      stroke: #8B0000;
      stroke-width: 0.5;
    }`,
    // Gundam container animation
    `.gundam {
      animation: gundam-move linear ${duration}ms infinite;
    }`,
    createAnimation("gundam-move", keyframes),
  ];

  // Gundam at 48px height (3x cell size)
  const gundamHeight = sizeCell * 3;

  const svgElements = [
    `<g class="gundam">`,
    ...createGundamPath(gundamHeight),
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
