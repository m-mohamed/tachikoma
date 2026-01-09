"use strict";
exports.id = 547;
exports.ids = [547];
exports.modules = {

/***/ 547:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  createSvg: () => (/* binding */ createSvg)
});

// EXTERNAL MODULE: ../types/grid.ts
var types_grid = __webpack_require__(105);
// EXTERNAL MODULE: ../types/snake.ts
var types_snake = __webpack_require__(777);
;// CONCATENATED MODULE: ../svg-creator/css-utils.ts
const percent = (x) => parseFloat((x * 100).toFixed(2)).toString() + "%";
const mergeKeyFrames = (keyframes) => {
    const s = new Map();
    for (const { t, style } of keyframes) {
        s.set(style, [...(s.get(style) ?? []), t]);
    }
    return Array.from(s.entries())
        .map(([style, ts]) => ({ style, ts }))
        .sort((a, b) => a.ts[0] - b.ts[0]);
};
/**
 * generate the keyframe animation from a list of keyframe
 */
const createAnimation = (name, keyframes) => `@keyframes ${name}{` +
    mergeKeyFrames(keyframes)
        .map(({ style, ts }) => ts.map(percent).join(",") + `{${style}}`)
        .join("") +
    "}";
/**
 * remove white spaces
 */
const minifyCss = (css) => css
    .replace(/\s+/g, " ")
    .replace(/.\s+[,;:{}()]/g, (a) => a.replace(/\s+/g, ""))
    .replace(/[,;:{}()]\s+./g, (a) => a.replace(/\s+/g, ""))
    .replace(/.\s+[,;:{}()]/g, (a) => a.replace(/\s+/g, ""))
    .replace(/[,;:{}()]\s+./g, (a) => a.replace(/\s+/g, ""))
    .replace(/\;\s*\}/g, "}")
    .trim();

;// CONCATENATED MODULE: ../svg-creator/tachikoma.ts

// Tachikoma SVG path - spider-tank from Ghost in the Shell
// Designed for ~16px cell, scales with sizeCell
const createTachikomaPath = (size) => {
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
const createTachikoma = (chain, { sizeCell }, duration) => {
    if (!chain[0])
        return { svgElements: [], styles: [] };
    // Track head positions for Tachikoma movement
    // Offset by -0.5 to center the 2x sized Tachikoma on the cell
    const headPositions = chain.map((snake) => ({
        x: snake[0] - 2 - 0.5, // head x (offset for centering)
        y: snake[1] - 2 - 0.5, // head y
    }));
    // Create keyframes for head movement
    // Note: removed scaleX(-1) flip as it caused spinning animation artifact
    const keyframes = removeInterpolatedPositions(headPositions.map((pos, i, { length }) => ({
        ...pos,
        t: i / length,
    }))).map(({ t, ...p }) => ({
        t,
        style: `transform:translate(${p.x * sizeCell}px,${p.y * sizeCell}px)`,
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
const removeInterpolatedPositions = (arr) => arr.filter((u, i, arr) => {
    if (i - 1 < 0 || i + 1 >= arr.length)
        return true;
    const a = arr[i - 1];
    const b = arr[i + 1];
    const ex = (a.x + b.x) / 2;
    const ey = (a.y + b.y) / 2;
    return !(Math.abs(ex - u.x) < 0.01 && Math.abs(ey - u.y) < 0.01);
});

;// CONCATENATED MODULE: ../svg-creator/xml-utils.ts
const h = (element, attributes) => `<${element} ${toAttribute(attributes)}/>`;
const toAttribute = (o) => Object.entries(o)
    .filter(([, value]) => value !== null)
    .map(([name, value]) => `${name}="${value}"`)
    .join(" ");

;// CONCATENATED MODULE: ../svg-creator/grid.ts


const createGrid = (cells, { sizeDotBorderRadius, sizeDot, sizeCell }, duration) => {
    const svgElements = [];
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
            styles.push(createAnimation(animationName, [
                { t: t, style: `fill:var(--c${color});transform:scale(1)` },
                { t: hitTime, style: `fill:var(--c${color});transform:scale(1)` },
                { t: hitTime + 0.001, style: `fill:#ff6b6b;transform:scale(1.3)` },
                { t: hitTime + 0.003, style: `fill:var(--ce);transform:scale(0)` },
                { t: hitTime + 0.02, style: `fill:var(--ce);transform:scale(1)` },
                { t: 1, style: `fill:var(--ce);transform:scale(1)` },
            ]), `.c.${id}{
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
            ]), `.explosion.${id}{
          animation-name: ${explosionName}
        }`);
            // Add explosion overlay element
            svgElements.push(h("circle", {
                class: `explosion ${id}`,
                cx,
                cy,
                r: 0,
            }));
        }
        svgElements.push(h("rect", {
            class: ["c", id].filter(Boolean).join(" "),
            x: x * sizeCell + m,
            y: y * sizeCell + m,
            rx: sizeDotBorderRadius,
            ry: sizeDotBorderRadius,
        }));
    }
    return { svgElements, styles };
};

;// CONCATENATED MODULE: ../svg-creator/stack.ts


const createStack = (cells, { sizeDot }, width, y, duration) => {
    const svgElements = [];
    const styles = [
        `.u{ 
      transform-origin: 0 0;
      transform: scale(0,1);
      animation: none linear ${duration}ms infinite;
    }`,
    ];
    const stack = cells
        .slice()
        .filter((a) => a.t !== null)
        .sort((a, b) => a.t - b.t);
    const blocks = [];
    stack.forEach(({ color, t }) => {
        const latest = blocks[blocks.length - 1];
        if (latest?.color === color)
            latest.ts.push(t);
        else
            blocks.push({ color, ts: [t] });
    });
    const m = width / stack.length;
    let i = 0;
    let nx = 0;
    for (const { color, ts } of blocks) {
        const id = "u" + (i++).toString(36);
        const animationName = id;
        const x = (nx * m).toFixed(1);
        nx += ts.length;
        svgElements.push(h("rect", {
            class: `u ${id}`,
            height: sizeDot,
            width: (ts.length * m + 0.6).toFixed(1),
            x,
            y,
        }));
        styles.push(createAnimation(animationName, [
            ...ts
                .map((t, i, { length }) => [
                { scale: i / length, t: t - 0.0001 },
                { scale: (i + 1) / length, t: t + 0.0001 },
            ])
                .flat(),
            { scale: 1, t: 1 },
        ].map(({ scale, t }) => ({
            t,
            style: `transform:scale(${scale.toFixed(3)},1)`,
        }))), `.u.${id} {
        fill: var(--c${color});
        animation-name: ${animationName};
        transform-origin: ${x}px 0
      }
      `);
    }
    return { svgElements, styles };
};

;// CONCATENATED MODULE: ../svg-creator/index.ts







const getCellsFromGrid = ({ width, height }) => Array.from({ length: width }, (_, x) => Array.from({ length: height }, (_, y) => ({ x, y }))).flat();
const createLivingCells = (grid0, chain, cells) => {
    const livingCells = (cells ?? getCellsFromGrid(grid0)).map(({ x, y }) => ({
        x,
        y,
        t: null,
        color: (0,types_grid/* getColor */.oU)(grid0, x, y),
    }));
    const grid = (0,types_grid/* copyGrid */.mi)(grid0);
    for (let i = 0; i < chain.length; i++) {
        const snake = chain[i];
        const x = (0,types_snake/* getHeadX */.tN)(snake);
        const y = (0,types_snake/* getHeadY */.Ap)(snake);
        if ((0,types_grid/* isInside */.FK)(grid, x, y) && !(0,types_grid/* isEmpty */.Im)((0,types_grid/* getColor */.oU)(grid, x, y))) {
            (0,types_grid/* setColorEmpty */.l$)(grid, x, y);
            const cell = livingCells.find((c) => c.x === x && c.y === y);
            cell.t = i / chain.length;
        }
    }
    return livingCells;
};
const createSvg = (grid, cells, chain, drawOptions, animationOptions) => {
    const width = (grid.width + 2) * drawOptions.sizeCell;
    const height = (grid.height + 5) * drawOptions.sizeCell;
    const duration = animationOptions.stepDurationMs * chain.length;
    const livingCells = createLivingCells(grid, chain, cells);
    const elements = [
        createGrid(livingCells, drawOptions, duration),
        createStack(livingCells, drawOptions, grid.width * drawOptions.sizeCell, (grid.height + 2) * drawOptions.sizeCell, duration),
        createTachikoma(chain, drawOptions, duration),
    ];
    const viewBox = [
        -drawOptions.sizeCell,
        -drawOptions.sizeCell * 2,
        width,
        height,
    ].join(" ");
    const style = generateColorVar(drawOptions) +
        elements
            .map((e) => e.styles)
            .flat()
            .join("\n");
    const svg = [
        h("svg", {
            viewBox,
            width,
            height,
            xmlns: "http://www.w3.org/2000/svg",
        }).replace("/>", ">"),
        "<desc>",
        "Generated with https://github.com/m-mohamed/tachikoma",
        "</desc>",
        "<style>",
        optimizeCss(style),
        "</style>",
        ...elements.map((e) => e.svgElements).flat(),
        "</svg>",
    ].join("");
    return optimizeSvg(svg);
};
const optimizeCss = (css) => minifyCss(css);
const optimizeSvg = (svg) => svg;
const generateColorVar = (drawOptions) => `
    :root {
    --cb: ${drawOptions.colorDotBorder};
    --cs: ${drawOptions.colorSnake};
    --ce: ${drawOptions.colorEmpty};
    ${Object.entries(drawOptions.colorDots)
    .map(([i, color]) => `--c${i}:${color};`)
    .join("")}
    }
    ` +
    (drawOptions.dark
        ? `
    @media (prefers-color-scheme: dark) {
      :root {
        --cb: ${drawOptions.dark.colorDotBorder || drawOptions.colorDotBorder};
        --cs: ${drawOptions.dark.colorSnake || drawOptions.colorSnake};
        --ce: ${drawOptions.dark.colorEmpty};
        ${Object.entries(drawOptions.dark.colorDots)
            .map(([i, color]) => `--c${i}:${color};`)
            .join("")}
      }
    }
`
        : "");


/***/ })

};
;