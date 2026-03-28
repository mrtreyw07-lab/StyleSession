/**
 * Build script: Generates stylesession.js from stylesession.html
 * Extracts CSS, HTML, and JS then combines into a self-injecting script.
 */
const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'stylesession.html');
const outPath = path.join(__dirname, 'stylesession.js');

const html = fs.readFileSync(htmlPath, 'utf8');
const lines = html.split('\n');
const fail = (msg) => {
  console.error(`❌ Build failed: ${msg}`);
  process.exit(1);
};

// --- Extract CSS (content of <style id="__vi-styles">) ---
const styleOpenIdx = lines.findIndex(l => l.includes('<style id="__vi-styles">'));
const styleCloseIdx = lines.findIndex((l, i) => i > styleOpenIdx && l.trim() === '</style>');
if (styleOpenIdx === -1 || styleCloseIdx === -1 || styleCloseIdx <= styleOpenIdx) {
  fail('stylesession.html is missing a valid <style id="__vi-styles"> block.');
}
const cssLines = lines.slice(styleOpenIdx + 1, styleCloseIdx);
const css = cssLines.join('\n');

// --- Extract HTML (the #__vi-root element and everything inside) ---
const rootOpenIdx = lines.findIndex(l => l.includes('<div id="__vi-root"'));
if (rootOpenIdx === -1) {
  fail('stylesession.html is missing <div id="__vi-root">.');
}
// Find the matching closing tag — it's the last </div> before the <script> line
const scriptIdx = lines.findIndex((l, i) => i > rootOpenIdx && l.trim().startsWith('<script>'));
if (scriptIdx === -1) {
  fail('stylesession.html is missing an inline <script> block with the engine code.');
}
// The HTML block ends at the line before the comment block preceding <script>
let rootCloseIdx = scriptIdx - 1;
while (rootCloseIdx > rootOpenIdx && lines[rootCloseIdx].trim() === '') rootCloseIdx--;
// Walk back past comment lines
while (rootCloseIdx > rootOpenIdx && lines[rootCloseIdx].trim().startsWith('<!--')) rootCloseIdx--;
while (rootCloseIdx > rootOpenIdx && lines[rootCloseIdx].trim() === '') rootCloseIdx--;
const htmlContent = lines.slice(rootOpenIdx, rootCloseIdx + 1).join('\n');

// --- Extract JS engine (inside the IIFE, after 'use strict') ---
const iifeOpenIdx = lines.findIndex(l => l.includes("(function StyleSession()"));
const useStrictIdx = lines.findIndex((l, i) => i > iifeOpenIdx && l.includes("'use strict'"));
if (iifeOpenIdx === -1 || useStrictIdx === -1) {
  fail('stylesession.html is missing the expected `(function StyleSession(){ ... })();` engine wrapper.');
}
// Find the actual last })(); line
let lastIifeClose = -1;
for (let i = lines.length - 1; i >= 0; i--) {
  if (lines[i].trim() === '})();') { lastIifeClose = i; break; }
}
if (lastIifeClose === -1 || lastIifeClose <= useStrictIdx) {
  fail('stylesession.html has no valid closing `})();` for the engine.');
}
const jsLines = lines.slice(useStrictIdx + 1, lastIifeClose);
let jsEngine = jsLines.join('\n');
if (!jsEngine.includes('const state =') || !jsEngine.includes('init()')) {
  fail('Engine extraction sanity check failed. Refusing to write broken stylesession.js.');
}

// --- Fix DOMContentLoaded for late injection ---
// Replace `document.addEventListener('DOMContentLoaded', () => {` with an immediate-or-deferred pattern
const beforeDclOpen = jsEngine;
jsEngine = jsEngine.replace(
  /document\.addEventListener\('DOMContentLoaded', \(\) => \{/,
  `function _bindPaletteInput() {`
);
if (jsEngine === beforeDclOpen) {
  fail('Could not rewrite DOMContentLoaded opener in engine block.');
}
// Find the matching closing `});` for this DOMContentLoaded and replace with call
// We need to find the `});` that closes this specific block
const dclPattern = /\n\s*\}\);\s*\n\s*\n\s*function renderOrCommandPaletteResults/;
const beforeDclClose = jsEngine;
jsEngine = jsEngine.replace(
  dclPattern,
  `\n  }\n  if (document.readyState === 'loading') {\n    document.addEventListener('DOMContentLoaded', _bindPaletteInput);\n  } else {\n    _bindPaletteInput();\n  }\n\n  function renderOrCommandPaletteResults`
);
if (jsEngine === beforeDclClose) {
  fail('Could not rewrite DOMContentLoaded closer in engine block.');
}

// --- Also update snapshot to filter out injected style ---
jsEngine = jsEngine.replace(
  "clone.querySelectorAll('#__vi-root, #__vi-session-style')",
  "clone.querySelectorAll('#__vi-root, #__vi-session-style, #__vi-styles, link[href*=\"fonts.googleapis.com\"][href*=\"Inter\"]')"
);

// --- Escape backticks and ${} in CSS and HTML for template literals ---
function escapeForTemplateLiteral(str) {
  return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

const escapedCss = escapeForTemplateLiteral(css);
const escapedHtml = escapeForTemplateLiteral(htmlContent);

// --- Build output ---
const output = `// ╔══════════════════════════════════════════════════════════════╗
// ║  StyleSession — Visual CSS Inspector for Any Website        ║
// ║  https://github.com/mrtreyw07-lab/StyleSession              ║
// ║  MIT License                                                ║
// ╚══════════════════════════════════════════════════════════════╝
(function StyleSession() {
  'use strict';

  // ════════════════════════════════════════════════════════════
  // SELF-INJECTION GUARD
  // ════════════════════════════════════════════════════════════
  if (document.getElementById('__vi-root')) {
    // Already loaded — toggle visibility
    const root = document.getElementById('__vi-root');
    const isHidden = root.style.display === 'none';
    root.style.display = isHidden ? '' : 'none';
    return;
  }

  // ════════════════════════════════════════════════════════════
  // INJECT GOOGLE FONTS
  // ════════════════════════════════════════════════════════════
  if (!document.querySelector('link[href*="fonts.googleapis.com/css2"][href*="Inter"]')) {
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap';
    document.head.appendChild(fontLink);
  }

  // ════════════════════════════════════════════════════════════
  // INJECT CSS
  // ════════════════════════════════════════════════════════════
  const _ssStyle = document.createElement('style');
  _ssStyle.id = '__vi-styles';
  _ssStyle.textContent = \`
${escapedCss}
\`;
  document.head.appendChild(_ssStyle);

  // ════════════════════════════════════════════════════════════
  // INJECT HTML
  // ════════════════════════════════════════════════════════════
  const _ssContainer = document.createElement('div');
  _ssContainer.innerHTML = \`
${escapedHtml}
\`;
  document.body.appendChild(_ssContainer.firstElementChild);

  // ════════════════════════════════════════════════════════════
  // ENGINE
  // ════════════════════════════════════════════════════════════
${jsEngine}
})();
`;

if (!output.includes("document.getElementById('__vi-root')") || !output.includes("init();")) {
  fail('Output sanity check failed. Refusing to overwrite stylesession.js.');
}

fs.writeFileSync(outPath, output, 'utf8');
const lineCount = output.split('\n').length;
console.log(`✅ Built stylesession.js (${lineCount} lines, ${(output.length / 1024).toFixed(1)} KB)`);

// Copy to extension folder
const extPath = path.join(__dirname, 'extension', 'stylesession.js');
if (fs.existsSync(path.join(__dirname, 'extension'))) {
  fs.copyFileSync(outPath, extPath);
  console.log(`📦 Copied to extension/stylesession.js`);
}
