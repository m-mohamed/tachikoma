import type { Color, Empty } from "@snk/types/grid";
import type { Point } from "@snk/types/point";
import { createAnimation } from "./css-utils";
import { h } from "./xml-utils";

export type Options = {
  colorDots: Record<Color, string>;
  colorEmpty: string;
  colorDotBorder: string;
  sizeCell: number;
  sizeDot: number;
  sizeDotBorderRadius: number;
};

export const createGrid = (
  cells: (Point & { t: number | null; color: Color | Empty })[],
  { sizeDotBorderRadius, sizeDot, sizeCell }: Options,
  duration: number,
) => {
  const svgElements: string[] = [];
  const styles = [
    `.c{
      shape-rendering: geometricPrecision;
      fill: var(--ce);
      stroke-width: 1px;
      stroke: var(--cb);
      animation: none ${duration}ms linear infinite;
      width: ${sizeDot}px;
      height: ${sizeDot}px;
      transform-origin: center;
    }`,
    // Explosion flash effect
    `.explosion {
      fill: #ff6b6b;
      opacity: 0;
      filter: drop-shadow(0 0 3px #ff6b6b);
    }`,
  ];

  let i = 0;
  for (const { x, y, color, t } of cells) {
    const id = t && "c" + (i++).toString(36);
    const m = (sizeCell - sizeDot) / 2;
    const cx = x * sizeCell + m + sizeDot / 2;
    const cy = y * sizeCell + m + sizeDot / 2;

    if (t !== null && id) {
      const animationName = id;
      const explosionName = `exp-${id}`;

      // Cell destruction animation - delay then flash and shrink (looks like being shot)
      // Tachikoma reaches cell at t, explosion happens at t + 0.003 (small delay for "shooting" feel)
      const hitTime = t + 0.003;
      styles.push(
        createAnimation(animationName, [
          { t: t, style: `fill:var(--c${color});transform:scale(1)` },
          { t: hitTime, style: `fill:var(--c${color});transform:scale(1)` },
          { t: hitTime + 0.001, style: `fill:#ff6b6b;transform:scale(1.3)` },
          { t: hitTime + 0.003, style: `fill:var(--ce);transform:scale(0)` },
          { t: hitTime + 0.02, style: `fill:var(--ce);transform:scale(1)` },
          { t: 1, style: `fill:var(--ce);transform:scale(1)` },
        ]),

        `.c.${id}{
          fill: var(--c${color});
          animation-name: ${animationName};
          transform-box: fill-box;
          transform-origin: center;
        }`,

        // Explosion flash overlay - bigger and more visible
        createAnimation(explosionName, [
          { t: hitTime, style: `opacity:0;r:0` },
          { t: hitTime + 0.001, style: `opacity:1;r:${sizeDot * 1.2}` },
          { t: hitTime + 0.008, style: `opacity:0;r:${sizeDot * 2}` },
          { t: 1, style: `opacity:0;r:0` },
        ]),

        `.explosion.${id}{
          animation-name: ${explosionName}
        }`,
      );

      // Add explosion overlay element
      svgElements.push(
        h("circle", {
          class: `explosion ${id}`,
          cx,
          cy,
          r: 0,
        }),
      );
    }

    svgElements.push(
      h("rect", {
        class: ["c", id].filter(Boolean).join(" "),
        x: x * sizeCell + m,
        y: y * sizeCell + m,
        rx: sizeDotBorderRadius,
        ry: sizeDotBorderRadius,
      }),
    );
  }

  return { svgElements, styles };
};
