"use strict";
exports.id = 280;
exports.ids = [280];
exports.modules = {

/***/ 280:
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

;// CONCATENATED MODULE: ../svg-creator/gundam.ts

// Enhanced RX-78-2 Gundam SVG - iconic mecha from Mobile Suit Gundam
// Now with beam saber, shoulder armor, backpack, and more detail!
// Designed for 64px height
const createGundamPath = (height) => {
    const s = height / 64; // scale factor (base design is 64px tall)
    return [
        // === BEAM SABER (energy blade - iconic weapon) ===
        // Handle (gray cylinder)
        `<rect class="gundam-saber-handle" x="${42 * s}" y="${18 * s}" width="${3 * s}" height="${10 * s}" rx="${1 * s}"/>`,
        // Energy blade (pink/magenta glow)
        `<path class="gundam-saber-blade" d="M${43.5 * s},${18 * s} L${46 * s},${2 * s} L${50 * s},${0 * s} L${46 * s},${4 * s} L${44 * s},${18 * s} Z"/>`,
        // === BACKPACK (thrusters) ===
        `<rect class="gundam-backpack" x="${26 * s}" y="${16 * s}" width="${12 * s}" height="${14 * s}" rx="${1 * s}"/>`,
        `<rect class="gundam-thruster" x="${27 * s}" y="${28 * s}" width="${4 * s}" height="${4 * s}"/>`,
        `<rect class="gundam-thruster" x="${33 * s}" y="${28 * s}" width="${4 * s}" height="${4 * s}"/>`,
        // === V-FIN ANTENNA (iconic yellow horns) ===
        `<path class="gundam-vfin" d="M${26 * s},${6 * s} L${32 * s},${0 * s} L${32 * s},${8 * s} Z"/>`,
        `<path class="gundam-vfin" d="M${38 * s},${6 * s} L${32 * s},${0 * s} L${32 * s},${8 * s} Z"/>`,
        // Center crest (red)
        `<rect class="gundam-crest" x="${30 * s}" y="${4 * s}" width="${4 * s}" height="${4 * s}"/>`,
        // === HEAD ===
        `<rect class="gundam-head" x="${26 * s}" y="${8 * s}" width="${12 * s}" height="${10 * s}" rx="${1 * s}"/>`,
        // Face plate (darker)
        `<path class="gundam-faceplate" d="M${28 * s},${12 * s} L${36 * s},${12 * s} L${34 * s},${18 * s} L${30 * s},${18 * s} Z"/>`,
        // Eyes (yellow dual sensors)
        `<rect class="gundam-eye" x="${27 * s}" y="${10 * s}" width="${4 * s}" height="${2 * s}"/>`,
        `<rect class="gundam-eye" x="${33 * s}" y="${10 * s}" width="${4 * s}" height="${2 * s}"/>`,
        // Chin (red)
        `<rect class="gundam-chin" x="${29 * s}" y="${16 * s}" width="${6 * s}" height="${2 * s}"/>`,
        // === SHOULDER ARMOR (large pads) ===
        `<path class="gundam-shoulder" d="M${12 * s},${18 * s} L${20 * s},${16 * s} L${22 * s},${20 * s} L${22 * s},${28 * s} L${14 * s},${28 * s} Z"/>`,
        `<path class="gundam-shoulder" d="M${52 * s},${18 * s} L${44 * s},${16 * s} L${42 * s},${20 * s} L${42 * s},${28 * s} L${50 * s},${28 * s} Z"/>`,
        // === TORSO/CHEST (blue with yellow vents) ===
        `<path class="gundam-chest" d="M${22 * s},${18 * s} L${42 * s},${18 * s} L${40 * s},${34 * s} L${24 * s},${34 * s} Z"/>`,
        // Chest vents (yellow intake grilles)
        `<rect class="gundam-vent" x="${25 * s}" y="${22 * s}" width="${5 * s}" height="${2 * s}"/>`,
        `<rect class="gundam-vent" x="${34 * s}" y="${22 * s}" width="${5 * s}" height="${2 * s}"/>`,
        // Core fighter cockpit (red)
        `<polygon class="gundam-cockpit" points="${32 * s},${26 * s} ${35 * s},${30 * s} ${29 * s},${30 * s}"/>`,
        // === WAIST (red) ===
        `<rect class="gundam-waist" x="${24 * s}" y="${34 * s}" width="${16 * s}" height="${4 * s}"/>`,
        // Hip armor (yellow)
        `<rect class="gundam-hip" x="${22 * s}" y="${36 * s}" width="${6 * s}" height="${4 * s}"/>`,
        `<rect class="gundam-hip" x="${36 * s}" y="${36 * s}" width="${6 * s}" height="${4 * s}"/>`,
        // === ARMS ===
        // Upper arms (white)
        `<rect class="gundam-arm" x="${14 * s}" y="${28 * s}" width="${6 * s}" height="${12 * s}" rx="${1 * s}"/>`,
        `<rect class="gundam-arm" x="${44 * s}" y="${28 * s}" width="${6 * s}" height="${12 * s}" rx="${1 * s}"/>`,
        // Forearms (white with red bands)
        `<rect class="gundam-forearm" x="${12 * s}" y="${40 * s}" width="${8 * s}" height="${10 * s}" rx="${1 * s}"/>`,
        `<rect class="gundam-forearm" x="${44 * s}" y="${28 * s}" width="${8 * s}" height="${10 * s}" rx="${1 * s}"/>`,
        // Hands (gray)
        `<rect class="gundam-hand" x="${13 * s}" y="${50 * s}" width="${6 * s}" height="${5 * s}" rx="${1 * s}"/>`,
        `<rect class="gundam-hand" x="${45 * s}" y="${38 * s}" width="${6 * s}" height="${5 * s}" rx="${1 * s}"/>`,
        // === LEGS ===
        // Thighs (white)
        `<rect class="gundam-leg" x="${24 * s}" y="${38 * s}" width="${7 * s}" height="${12 * s}"/>`,
        `<rect class="gundam-leg" x="${33 * s}" y="${38 * s}" width="${7 * s}" height="${12 * s}"/>`,
        // Knee joints (gray)
        `<rect class="gundam-knee" x="${25 * s}" y="${48 * s}" width="${5 * s}" height="${3 * s}"/>`,
        `<rect class="gundam-knee" x="${34 * s}" y="${48 * s}" width="${5 * s}" height="${3 * s}"/>`,
        // Lower legs (white)
        `<rect class="gundam-leg" x="${23 * s}" y="${50 * s}" width="${8 * s}" height="${10 * s}"/>`,
        `<rect class="gundam-leg" x="${33 * s}" y="${50 * s}" width="${8 * s}" height="${10 * s}"/>`,
        // === FEET (red) ===
        `<path class="gundam-foot" d="M${20 * s},${60 * s} L${32 * s},${60 * s} L${32 * s},${64 * s} L${16 * s},${64 * s} Z"/>`,
        `<path class="gundam-foot" d="M${32 * s},${60 * s} L${44 * s},${60 * s} L${48 * s},${64 * s} L${32 * s},${64 * s} Z"/>`,
    ];
};
const createGundam = (chain, { sizeCell }, duration) => {
    if (!chain[0])
        return { svgElements: [], styles: [] };
    // Track head positions for Gundam movement
    const headPositions = chain.map((snake) => ({
        x: snake[0] - 2 - 1.5, // offset for centering larger sprite
        y: snake[1] - 2 - 2, // Gundam is taller
    }));
    // Create keyframes for movement
    const keyframes = removeInterpolatedPositions(headPositions.map((pos, i, { length }) => ({
        ...pos,
        t: i / length,
    }))).map(({ t, ...p }) => ({
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
        createGundam(chain, drawOptions, duration),
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