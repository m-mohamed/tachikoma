/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 919:
/***/ ((module) => {

module.exports = require("canvas");

/***/ }),

/***/ 434:
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ 667:
/***/ ((module) => {

module.exports = require("gifsicle");

/***/ }),

/***/ 421:
/***/ ((module) => {

module.exports = require("node:child_process");

/***/ }),

/***/ 24:
/***/ ((module) => {

module.exports = require("node:fs");

/***/ }),

/***/ 161:
/***/ ((module) => {

module.exports = require("node:os");

/***/ }),

/***/ 760:
/***/ ((module) => {

module.exports = require("node:path");

/***/ }),

/***/ 203:
/***/ ((module) => {

module.exports = require("stream");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__nccwpck_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__nccwpck_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__nccwpck_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nccwpck_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nccwpck_require__.o(definition, key) && !__nccwpck_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__nccwpck_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__nccwpck_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__nccwpck_require__.f).reduce((promises, key) => {
/******/ 				__nccwpck_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__nccwpck_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".index.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nccwpck_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			792: 1
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		var installChunk = (chunk) => {
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__nccwpck_require__.o(moreModules, moduleId)) {
/******/ 					__nccwpck_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__nccwpck_require__);
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 1;
/******/ 		
/******/ 		};
/******/ 		
/******/ 		// require() chunk loading for javascript
/******/ 		__nccwpck_require__.f.require = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					installChunk(require("./" + __nccwpck_require__.u(chunkId)));
/******/ 				} else installedChunks[chunkId] = 1;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXTERNAL MODULE: external "node:fs"
var external_node_fs_ = __nccwpck_require__(24);
// EXTERNAL MODULE: external "node:path"
var external_node_path_ = __nccwpck_require__(760);
;// CONCATENATED MODULE: ./palettes.ts
const basePalettes = {
    "github-light": {
        colorBackground: "#ffffff",
        colorDotBorder: "#1b1f230a",
        colorDots: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
        colorEmpty: "#ebedf0",
        colorSnake: "purple",
    },
    "github-dark": {
        colorBackground: "#0c1116",
        colorDotBorder: "#1b1f230a",
        colorEmpty: "#161b22",
        colorDots: ["#161b22", "#01311f", "#034525", "#0f6d31", "#00c647"],
        colorSnake: "purple",
    },
};
// aliases
const palettes = {
    ...basePalettes,
    // aliases
    github: basePalettes["github-light"],
    default: basePalettes["github-light"],
};

;// CONCATENATED MODULE: ./outputsOptions.ts

const parseOutputsOption = (lines) => lines.map(parseEntry);
const parseEntry = (entry) => {
    const m = entry.trim().match(/^(.+\.(svg|gif))(\?(.*)|\s*({.*}))?$/);
    if (!m)
        return null;
    const [, filename, format, _, q1, q2] = m;
    const query = q1 ?? q2;
    let sp = new URLSearchParams(query || "");
    try {
        const o = JSON.parse(query);
        if (Array.isArray(o.color_dots))
            o.color_dots = o.color_dots.join(",");
        sp = new URLSearchParams(o);
    }
    catch (err) {
        if (!(err instanceof SyntaxError))
            throw err;
    }
    const drawOptions = {
        sizeDotBorderRadius: 2,
        sizeCell: 16,
        sizeDot: 12,
        ...palettes["default"],
    };
    const animationOptions = {
        frameByStep: 1,
        stepDurationMs: 100,
    };
    {
        const palette = palettes[sp.get("palette")];
        if (palette) {
            Object.assign(drawOptions, palette);
        }
    }
    if (sp.has("color_dots")) {
        const colors = sp.get("color_dots").split(/[,;]/);
        drawOptions.colorDots = colors;
        drawOptions.colorEmpty = colors[0];
    }
    if (sp.has("color_snake"))
        drawOptions.colorSnake = sp.get("color_snake");
    if (sp.has("color_background"))
        drawOptions.colorBackground = sp.get("color_background");
    if (sp.has("color_dot_border"))
        drawOptions.colorDotBorder = sp.get("color_dot_border");
    return {
        filename,
        format: format,
        drawOptions,
        animationOptions,
    };
};

// EXTERNAL MODULE: external "node:os"
var external_node_os_ = __nccwpck_require__(161);
;// CONCATENATED MODULE: ./github-action.ts

/**
 * re-export getInput from "@actions/core" without the bloat
 */
const getInput = (name) => process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] || "";
/**
 * re-export setFailed from "@actions/core" without the bloat
 */
const setFailed = (message) => {
    process.exitCode = 1;
    process.stdout.write(`::error::${escapeData(message)}::${external_node_os_.EOL}`);
};
function escapeData(s) {
    return s.replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
}

;// CONCATENATED MODULE: ./index.ts




(async () => {
    try {
        const userName = getInput("github_user_name");
        const outputsRaw = [
            ...getInput("outputs").split("\n"),
            //
            // legacy
            getInput("gif_out_path"),
            getInput("svg_out_path"),
        ]
            .map((x) => x.trim())
            .filter(Boolean);
        const outputs = parseOutputsOption(outputsRaw);
        const githubToken = process.env.GITHUB_TOKEN ?? getInput("github_token");
        const { generateContributionSnake } = await __nccwpck_require__.e(/* import() */ 324).then(__nccwpck_require__.bind(__nccwpck_require__, 324));
        const results = await generateContributionSnake(userName, outputs, {
            githubToken,
        });
        outputs.forEach((out, i) => {
            const result = results[i];
            if (out?.filename && result) {
                console.log(`💾 writing to ${out?.filename}`);
                external_node_fs_.mkdirSync(external_node_path_.dirname(out?.filename), { recursive: true });
                external_node_fs_.writeFileSync(out?.filename, result);
            }
        });
    }
    catch (e) {
        setFailed(`Action failed with "${e.message}"`);
    }
})();

module.exports = __webpack_exports__;
/******/ })()
;