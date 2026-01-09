import type { Snake } from "@snk/types/snake";
import type { Point } from "@snk/types/point";
import { createAnimation } from "./css-utils";

export type Options = {
  colorSnake: string;
  sizeCell: number;
  sizeDot: number;
};

// Enhanced RX-78-2 Gundam SVG - iconic mecha from Mobile Suit Gundam
// Now with beam saber, shoulder armor, backpack, and more detail!
// Designed for 64px height
const createGundamPath = (height: number): string[] => {
  const s = height / 64; // scale factor (base design is 64px tall)

  return [
    // === BEAM SABER (energy blade - iconic weapon) ===
    // Handle (gray cylinder)
    `<rect class="gundam-saber-handle" x="${42*s}" y="${18*s}" width="${3*s}" height="${10*s}" rx="${1*s}"/>`,
    // Energy blade (pink/magenta glow)
    `<path class="gundam-saber-blade" d="M${43.5*s},${18*s} L${46*s},${2*s} L${50*s},${0*s} L${46*s},${4*s} L${44*s},${18*s} Z"/>`,

    // === BACKPACK (thrusters) ===
    `<rect class="gundam-backpack" x="${26*s}" y="${16*s}" width="${12*s}" height="${14*s}" rx="${1*s}"/>`,
    `<rect class="gundam-thruster" x="${27*s}" y="${28*s}" width="${4*s}" height="${4*s}"/>`,
    `<rect class="gundam-thruster" x="${33*s}" y="${28*s}" width="${4*s}" height="${4*s}"/>`,

    // === V-FIN ANTENNA (iconic yellow horns) ===
    `<path class="gundam-vfin" d="M${26*s},${6*s} L${32*s},${0*s} L${32*s},${8*s} Z"/>`,
    `<path class="gundam-vfin" d="M${38*s},${6*s} L${32*s},${0*s} L${32*s},${8*s} Z"/>`,
    // Center crest (red)
    `<rect class="gundam-crest" x="${30*s}" y="${4*s}" width="${4*s}" height="${4*s}"/>`,

    // === HEAD ===
    `<rect class="gundam-head" x="${26*s}" y="${8*s}" width="${12*s}" height="${10*s}" rx="${1*s}"/>`,
    // Face plate (darker)
    `<path class="gundam-faceplate" d="M${28*s},${12*s} L${36*s},${12*s} L${34*s},${18*s} L${30*s},${18*s} Z"/>`,
    // Eyes (yellow dual sensors)
    `<rect class="gundam-eye" x="${27*s}" y="${10*s}" width="${4*s}" height="${2*s}"/>`,
    `<rect class="gundam-eye" x="${33*s}" y="${10*s}" width="${4*s}" height="${2*s}"/>`,
    // Chin (red)
    `<rect class="gundam-chin" x="${29*s}" y="${16*s}" width="${6*s}" height="${2*s}"/>`,

    // === SHOULDER ARMOR (large pads) ===
    `<path class="gundam-shoulder" d="M${12*s},${18*s} L${20*s},${16*s} L${22*s},${20*s} L${22*s},${28*s} L${14*s},${28*s} Z"/>`,
    `<path class="gundam-shoulder" d="M${52*s},${18*s} L${44*s},${16*s} L${42*s},${20*s} L${42*s},${28*s} L${50*s},${28*s} Z"/>`,

    // === TORSO/CHEST (blue with yellow vents) ===
    `<path class="gundam-chest" d="M${22*s},${18*s} L${42*s},${18*s} L${40*s},${34*s} L${24*s},${34*s} Z"/>`,
    // Chest vents (yellow intake grilles)
    `<rect class="gundam-vent" x="${25*s}" y="${22*s}" width="${5*s}" height="${2*s}"/>`,
    `<rect class="gundam-vent" x="${34*s}" y="${22*s}" width="${5*s}" height="${2*s}"/>`,
    // Core fighter cockpit (red)
    `<polygon class="gundam-cockpit" points="${32*s},${26*s} ${35*s},${30*s} ${29*s},${30*s}"/>`,

    // === WAIST (red) ===
    `<rect class="gundam-waist" x="${24*s}" y="${34*s}" width="${16*s}" height="${4*s}"/>`,
    // Hip armor (yellow)
    `<rect class="gundam-hip" x="${22*s}" y="${36*s}" width="${6*s}" height="${4*s}"/>`,
    `<rect class="gundam-hip" x="${36*s}" y="${36*s}" width="${6*s}" height="${4*s}"/>`,

    // === ARMS ===
    // Upper arms (white)
    `<rect class="gundam-arm" x="${14*s}" y="${28*s}" width="${6*s}" height="${12*s}" rx="${1*s}"/>`,
    `<rect class="gundam-arm" x="${44*s}" y="${28*s}" width="${6*s}" height="${12*s}" rx="${1*s}"/>`,
    // Forearms (white with red bands)
    `<rect class="gundam-forearm" x="${12*s}" y="${40*s}" width="${8*s}" height="${10*s}" rx="${1*s}"/>`,
    `<rect class="gundam-forearm" x="${44*s}" y="${28*s}" width="${8*s}" height="${10*s}" rx="${1*s}"/>`,
    // Hands (gray)
    `<rect class="gundam-hand" x="${13*s}" y="${50*s}" width="${6*s}" height="${5*s}" rx="${1*s}"/>`,
    `<rect class="gundam-hand" x="${45*s}" y="${38*s}" width="${6*s}" height="${5*s}" rx="${1*s}"/>`,

    // === LEGS ===
    // Thighs (white)
    `<rect class="gundam-leg" x="${24*s}" y="${38*s}" width="${7*s}" height="${12*s}"/>`,
    `<rect class="gundam-leg" x="${33*s}" y="${38*s}" width="${7*s}" height="${12*s}"/>`,
    // Knee joints (gray)
    `<rect class="gundam-knee" x="${25*s}" y="${48*s}" width="${5*s}" height="${3*s}"/>`,
    `<rect class="gundam-knee" x="${34*s}" y="${48*s}" width="${5*s}" height="${3*s}"/>`,
    // Lower legs (white)
    `<rect class="gundam-leg" x="${23*s}" y="${50*s}" width="${8*s}" height="${10*s}"/>`,
    `<rect class="gundam-leg" x="${33*s}" y="${50*s}" width="${8*s}" height="${10*s}"/>`,

    // === FEET (red) ===
    `<path class="gundam-foot" d="M${20*s},${60*s} L${32*s},${60*s} L${32*s},${64*s} L${16*s},${64*s} Z"/>`,
    `<path class="gundam-foot" d="M${32*s},${60*s} L${44*s},${60*s} L${48*s},${64*s} L${32*s},${64*s} Z"/>`,
  ];
};

export const createGundam = (
  chain: Snake[],
  { sizeCell }: Options,
  duration: number,
) => {
  if (!chain[0]) return { svgElements: [], styles: [] };

  // Track head positions for Gundam movement
  const headPositions: Point[] = chain.map((snake) => ({
    x: snake[0] - 2 - 1.5, // offset for centering larger sprite
    y: snake[1] - 2 - 2, // Gundam is taller
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
    // === BEAM SABER GLOW ===
    `.gundam-saber-handle {
      fill: #666666;
      stroke: #444444;
      stroke-width: 0.5;
    }`,
    `.gundam-saber-blade {
      fill: #FF69B4;
      stroke: #FF1493;
      stroke-width: 0.5;
      filter: drop-shadow(0 0 4px #FF69B4) drop-shadow(0 0 8px #FF1493);
    }`,

    // === BACKPACK ===
    `.gundam-backpack {
      fill: #E8E8E8;
      stroke: #333333;
      stroke-width: 0.5;
    }`,
    `.gundam-thruster {
      fill: #333333;
      stroke: #1a1a1a;
      stroke-width: 0.3;
    }`,

    // === HEAD ===
    `.gundam-vfin {
      fill: #FFD700;
      stroke: #B8860B;
      stroke-width: 0.5;
      filter: drop-shadow(0 0 2px #FFD700);
    }`,
    `.gundam-crest {
      fill: #CB1009;
    }`,
    `.gundam-head {
      fill: #FFFFFF;
      stroke: #333333;
      stroke-width: 0.5;
    }`,
    `.gundam-faceplate {
      fill: #E0E0E0;
      stroke: #333333;
      stroke-width: 0.3;
    }`,
    `.gundam-eye {
      fill: #FFD700;
      stroke: #B8860B;
      stroke-width: 0.3;
      filter: drop-shadow(0 0 2px #FFD700);
    }`,
    `.gundam-chin {
      fill: #CB1009;
    }`,

    // === SHOULDERS ===
    `.gundam-shoulder {
      fill: #F5F5F5;
      stroke: #333333;
      stroke-width: 0.5;
    }`,

    // === TORSO ===
    `.gundam-chest {
      fill: #4169E1;
      stroke: #2850A7;
      stroke-width: 0.5;
    }`,
    `.gundam-vent {
      fill: #FFD700;
    }`,
    `.gundam-cockpit {
      fill: #CB1009;
    }`,
    `.gundam-waist {
      fill: #CB1009;
      stroke: #8B0000;
      stroke-width: 0.3;
    }`,
    `.gundam-hip {
      fill: #FFD700;
    }`,

    // === ARMS ===
    `.gundam-arm {
      fill: #F5F5F5;
      stroke: #333333;
      stroke-width: 0.5;
    }`,
    `.gundam-forearm {
      fill: #F5F5F5;
      stroke: #333333;
      stroke-width: 0.5;
    }`,
    `.gundam-hand {
      fill: #9A9999;
      stroke: #666666;
      stroke-width: 0.3;
    }`,

    // === LEGS ===
    `.gundam-leg {
      fill: #F5F5F5;
      stroke: #333333;
      stroke-width: 0.5;
    }`,
    `.gundam-knee {
      fill: #9A9999;
    }`,
    `.gundam-foot {
      fill: #CB1009;
      stroke: #8B0000;
      stroke-width: 0.5;
    }`,

    // === CONTAINER WITH GLOW ===
    `.gundam {
      animation: gundam-move linear ${duration}ms infinite;
      filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.5));
    }`,
    createAnimation("gundam-move", keyframes),
  ];

  // Gundam at 64px height (4x cell size) for better detail
  const gundamHeight = sizeCell * 4;

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
