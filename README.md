<p align="center">
  <img src="https://img.shields.io/badge/StyleSession-v1.1.0-00E5CC?style=for-the-badge&labelColor=14141a" alt="StyleSession v1.1.0"/>
  <img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge&labelColor=14141a" alt="MIT License"/>
  <img src="https://img.shields.io/badge/zero_dependencies-vanilla_JS-ffa502?style=for-the-badge&labelColor=14141a" alt="Zero Dependencies"/>
  <img src="https://img.shields.io/badge/self--injecting-~236_KB-3b82f6?style=for-the-badge&labelColor=14141a" alt="Self-Injecting"/>
</p>

<h1 align="center">🔮 StyleSession</h1>

<p align="center">
  <strong>The visual CSS inspector that actually lets you undo.</strong><br/>
  Point-and-click style editing directly in the browser — with full session persistence, real undo/redo, clean CSS export, and developer workflow tools.
</p>

<p align="center">
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-features">Features</a> •
  <a href="#shortcuts">Shortcuts</a> •
  <a href="#-usage-methods">Usage</a> •
  <a href="#-workflow-tools">Workflow</a> •
  <a href="#-why-stylesession">Why?</a> •
  <a href="#-license">License</a>
</p>

---

## ⚡ Quick Start

**Option 1 — Chrome Extension (recommended):**
1. Open Chrome → navigate to `chrome://extensions`
2. Enable **Developer mode** (toggle in top-right)
3. Click **"Load unpacked"** → select the `extension/` folder
4. Click the StyleSession icon in your toolbar on any website

**Option 2 — DevTools Console:**
1. Open any website
2. Press `F12` → **Console** tab
3. Paste the contents of `stylesession.js` and press Enter
4. StyleSession is now active on the page

**Option 3 — Script tag (development):**
```html
<script src="stylesession.js"></script>
```

**Option 4 — Bookmarklet (use on any site):**
```javascript
javascript:void(fetch('https://raw.githubusercontent.com/mrtreyw07-lab/StyleSession/main/stylesession.js').then(r=>r.text()).then(eval))
```
Save the above as a bookmark URL. Click it on any page to inject StyleSession.

**Option 5 — DevTools Snippet (persistent):**
1. Open Chrome DevTools → **Sources** → **Snippets**
2. Create a new snippet, paste the contents of `stylesession.js`
3. Right-click → **Run** on any page

> **Re-run the script** (or click the extension icon again) to toggle StyleSession on/off. It detects double-injection automatically.

---

## 🎯 Why StyleSession?

Born out of frustration with [VisBug](https://github.com/GoogleChromeLabs/ProjectVisBug) — a popular visual CSS tool that **doesn't have a functional undo button**. If you've ever lost 20 minutes of visual tweaks to an accidental click, StyleSession was built for you.

**StyleSession is different because it:**

| Pain Point | VisBug / Others | StyleSession |
|---|---|---|
| Undo/Redo | Broken or missing | ✅ Full command-pattern stack (unlimited) |
| Session persistence | None — refresh = gone | ✅ Auto-saves every 5s, survives refresh |
| CSS export | Partial or none | ✅ Clean, scoped CSS with proper selectors |
| Design tokens | Not available | ✅ Auto-extracts colors, fonts, spacing, variables |
| A11y auditing | Separate tool needed | ✅ Built-in WCAG contrast + ARIA checks |
| Comparison mode | Not available | ✅ Side-by-side before/after snapshot |
| Session download | Not available | ✅ Download/restore `.stylesession` files |
| Element diffing | Not available | ✅ 2-element property diff matrix |
| Batch editing | Not available | ✅ Multi-select → batch apply to all |
| Change reports | Not available | ✅ Markdown diff reports with before/after |
| Screenshot capture | Not available | ✅ Annotated viewport capture with html2canvas |
| Element bookmarks | Not available | ✅ Pin frequently-used elements for quick access |

---

## ✨ Features

### 🔍 Browse & Inspect
- **Browse mode** — Hover to see element dimensions, tag, classes, and box model in real-time
- **Select mode** — Click to lock an element for editing. **Shift+Click** to multi-select
- **Breadcrumb navigation** — Walk up/down the DOM tree from any selected element
- **Element label** — Live tooltip shows tag name, dimensions, and classes on hover
- **Computed tab** — Full computed styles for any selected element with searchable filter and one-click copy per property

### ✏️ Visual Editing Tools
- **Move** — Grab-and-drag in one motion (auto-selects on mousedown). GPU-accelerated transforms during drag with rAF throttling. Arrow-key nudge (1px / Shift+10px). Freezes CSS transitions and animations during drag so elements follow the cursor instantly. Auto-sets `position: relative`
- **Spacing** — Edit margin, padding, width, height, display, and gap on all 4 sides with numeric inputs
- **Typography** — Font family (30+ Google Fonts + system fonts), size, weight, line-height, letter-spacing, word-spacing, text-align, color, decoration, transform
- **Fill & Color** — Background color picker, text color picker, opacity slider, gradient builder with 6 presets, and native EyeDropper API support
- **Border & Shadow** — Border width/style/color, per-corner radius editing, box-shadow with 6 presets, text-shadow
- **Effects** — Transform (with origin), CSS filter with 8 presets (blur, brightness, contrast, grayscale, sepia, saturate, hue-rotate, invert), backdrop-filter, mix-blend-mode, overflow, and cursor type
- **Animation** — Transition property/duration/timing/delay, animation name/duration/timing/iteration/direction/fill-mode with 8 easing presets including cubic-bezier
- **Shape Tool** — Click-drag to draw isolated `<div>` containers directly on the page. Style with fill, border, and 6 quick presets (Card, Pill, Circle, Glass, Outline, Shadow). Generates live, production-ready CSS output with one-click copy

### 🎨 Draw Tool
- **Freehand drawing** — Draw annotations directly on the page with configurable brush size and color
- **Line tool** — Click two points to draw straight lines. Hold **Shift** to lock to horizontal or vertical axes
- **Eraser** — Click any drawn path to remove it
- **5 color swatches** — Quick-select red, green, blue, orange, and teal
- **Adjustable brush size** — Slider from 1px to 20px
- **Clear all** — One-click clear all drawings
- **Session-persistent** — Drawings are saved and restored with sessions

### 🔎 Element Diffing & Batch Editing
- **2-element diff matrix** — Select exactly 2 elements to see a side-by-side property comparison highlighting differences across 15 key CSS properties
- **Batch editing** — Multi-select 3+ elements with Shift+Click, then switch to any tool (Spacing, Typography, Color, etc.) to apply changes to all selected elements simultaneously

### 💎 Design Tokens
Auto-scans the entire page and extracts:
- **Colors** — All unique background and text colors with hex values and usage counts (click to copy)
- **Fonts** — All font families in use with sample preview and usage counts
- **Spacing** — All unique margin/padding/gap values with frequency (top 12)
- **CSS Variables** — All custom properties from `:root` and stylesheets (excludes StyleSession's own `--vi-` variables). Editable in-place with live preview

### ♿ Accessibility Auditing
- **WCAG contrast checker** — Flags text elements below 3:1 as errors and below 4.5:1 as warnings with live ratio badges
- **Missing alt text** — Detects images without `alt` attributes
- **Missing labels** — Detects buttons and links without text or `aria-label`
- **Live badges** — Color-coded error/warning badges render directly on flagged elements

### 📐 Measurement & Layout
- **Pixel-perfect rulers** — Horizontal and vertical rulers with tick marks at 10px/50px/100px intervals (toggle with Shift+R)
- **Interactive guides** — Click and drag on rulers to drop persistent measurement guides (drag back to ruler to delete)
- **Distance measurement** — Auto-measures horizontal and vertical gaps between selected and hovered elements
- **Layout grid inspector** — Highlights flexbox and grid containers with labeled overlays (FLEX in pink, GRID in teal)
- **Margin & padding overlays** — Color-coded box-model visualization on hover (orange = margin, green = padding)

### 🔮 Session System
- **Auto-save** — Debounced 5-second save to `localStorage` after every undo stack change
- **Session restore** — Automatically rehydrates all changes on page reload using dual selector + DOM path targeting
- **Download session** — Export a `.stylesession` JSON file with all changes, notes, text edits, drawings, bookmarks, and injected CSS
- **Load session** — Re-apply downloaded sessions to matching pages
- **Import session** — File upload UI for `.stylesession` files
- **Backward compatibility** — Automatically handles legacy CSS-only session payloads from earlier versions
- **Structured format** — Version 2 JSON with CSS selectors + nth-of-type DOM paths for resilient targeting

---

## 🚀 Workflow Tools

### 📋 Structured Change Report (`Ctrl+Shift+R`)
Generate a Markdown-formatted report of all session changes — optimized for pasting into AI coding assistants, PR descriptions, or design handoffs.

**Output includes:**
- Page URL and session timestamp
- Per-element before/after diff tables with CSS selectors and DOM paths
- Text content changes section

**Access:** Keyboard `Ctrl+Shift+R` · Command Palette `> Change Report` · Context Menu `📋 Copy Change Report`

### 🌳 Component Tree Export
Export all StyleSession changes within a component subtree as a single CSS block using **modern CSS nesting syntax**. Automatically builds relative selectors from the root element to all modified children.

```css
/* Component: .card */
.card {
  border-radius: 16px;

  h2 {
    font-size: 24px;
  }
  .btn {
    background: #00E5CC;
  }
}
```

**Access:** Command Palette `> Export Component CSS` · Context Menu `🌳 Export Component CSS`

### 🔖 Element Bookmarks (`Ctrl+Shift+B`)
Pin up to 8 frequently-used elements as teal chips below the breadcrumb bar. Click a bookmark to instantly select and scroll to the element. Right-click to remove.

- Bookmarks persist across auto-saves, session downloads, and imports
- Labeled with tag name + class or ID for quick identification
- Integrated into the full session lifecycle

**Access:** Keyboard `Ctrl+Shift+B` · Command Palette `> Toggle Bookmark` · Context Menu `🔖 Toggle Bookmark`

### 📸 Annotated Screenshot (`Shift+X`)
Capture a viewport screenshot with all your annotations (draw marks, sticky notes) visible but with the StyleSession toolbar and panel cropped out. Powered by [html2canvas](https://html2canvas.hertzen.com/) loaded on-demand from CDN.

- Downloads as `stylesession-capture-{timestamp}.png`
- Copies to clipboard (via `ClipboardItem` API where supported)
- Preserves draw annotations and sticky notes in the capture
- Excludes toolbar, panel, overlays, rulers, and bookmark chips

**Access:** Keyboard `Shift+X` · Command Palette `> Capture Screenshot`

---

### 🛠️ Power Features
- **Command palette** — Shift+P to search elements by tag/class/ID/text content, or type `>` for command mode (18+ commands with shortcuts)
- **Context menu** — Right-click any element for quick actions:
  - Copy CSS selector
  - Copy computed styles (14 key properties)
  - Copy outer HTML
  - Select all siblings
  - Select parent element
  - Scroll parent into view
  - Hide element (undoable)
  - Copy Change Report
  - Export Component CSS
  - Toggle Bookmark
- **CSS Editor** — Live CSS injection panel with syntax-highlighted textarea, auto-apply on `Ctrl+Enter`, and Tab key support. Injected CSS persists with sessions
- **Split-view snapshot** — Resizable before/after comparison with full-page clone in iframe (Shift+S)
- **Compare mode** — Toggle between current and original styles with one click (Shift+C)
- **Optical Lens Dark Mode** — High-fidelity dark scheme rendering engine for testing pages without washing out media (Shift+D)
- **Mobile viewport** — Simulate 375px mobile width with responsive wrapper and darkened edges (Shift+M)
- **Annotations** — Click to drop sticky-note text annotations at any point on the page. Notes are natively resizable and scale with content (Shift+N)
- **Inline text editing** — Double-click any text element to edit content in-place
- **Copy/Paste styles** — Copy computed styles from one element (`Ctrl+Alt+C`) and paste onto another (`Ctrl+Alt+V`)
- **Hidden elements manager** — View and restore all elements hidden during the session
- **Undo history** — Visual stack of all changes with one-click jump
- **Clean CSS export** — Copy or auto-save scoped CSS with proper selectors and formatted output
- **Draggable toolbar** — Grab the toolbar drag handle to reposition anywhere on screen (full XY axis)
- **Draggable panel** — Grab the panel header to reposition and float anywhere on screen
- **Resizable panel** — Drag the left edge to adjust panel width (minimum 260px)
- **Toast notifications** — Color-coded feedback system (success, warning, error) for all actions
- **Re-enable shortcut** — Press Ctrl+Shift+I to re-enable StyleSession after turning it off

---

<a id="shortcuts"></a>

## ⌨️ Keyboard Shortcuts

### Tool Selection
| Key | Action |
|-----|--------|
| `Q` | Browse mode (default) |
| `V` | Select tool |
| `M` | Move tool |
| `S` | Spacing tool |
| `T` | Typography tool |
| `F` | Fill & Color tool |
| `B` | Border & Shadow tool |
| `E` | Effects tool |
| `O` | Animation tool |
| `K` | Design Tokens |
| `G` | Shape Tool |
| `W` | Draw Tool |

### Actions
| Key | Action |
|-----|--------|
| `Ctrl+Z` | Undo |
| `Ctrl+Shift+Z` | Redo |
| `Ctrl+S` | Save session |
| `Ctrl+Shift+E` | Export CSS to clipboard |
| `Ctrl+Shift+R` | Copy Change Report (Markdown) |
| `Ctrl+Shift+B` | Toggle Element Bookmark |
| `Ctrl+Shift+I` | Re-enable after turning off |
| `Ctrl+Alt+C` | Copy element styles |
| `Ctrl+Alt+V` | Paste element styles |
| `Delete` / `Backspace` | Hide selected element(s) |
| `Escape` | Deselect / close modal / close palette |
| `?` | Show shortcuts reference |

### Feature Toggles
| Key | Action |
|-----|--------|
| `Shift+R` | Toggle rulers |
| `Shift+L` | Toggle layout grid |
| `Shift+A` | Toggle accessibility scan |
| `Shift+P` | Open command palette |
| `Shift+M` | Toggle mobile view |
| `Shift+D` | Toggle dark mode |
| `Shift+N` | Drop annotation note |
| `Shift+S` | Toggle snapshot comparison |
| `Shift+C` | Toggle before/after compare |
| `Shift+X` | Capture annotated screenshot |

### Navigation
| Key | Action |
|-----|--------|
| `Shift+Click` | Multi-select elements |
| `Arrow keys` | Nudge element 1px (Move tool) |
| `Shift+Arrow` | Nudge element 10px |
| `Right-click` | Context menu (10 actions) |
| `Double-click` | Edit text in-place |

---

## 📦 Usage Methods

### 1. Chrome Extension (recommended)
Load the `extension/` folder as an unpacked extension in Chrome. One-click toggle from the toolbar — works on any website instantly. Uses minimal permissions (`activeTab` + `scripting`).

### 2. Console Paste
Open DevTools Console on any page. Paste the contents of `stylesession.js`. Instant injection.

### 3. Script Tag
Add to any HTML page during development:
```html
<script src="stylesession.js"></script>
```

### 4. Browser Bookmarklet
Create a bookmark with the JavaScript snippet from [Quick Start](#-quick-start). Click it on any website.

### 5. DevTools Snippet
Save as a Chrome DevTools snippet under Sources → Snippets. Run on any page anytime.

### 6. Userscript (Tampermonkey / Greasemonkey)
Wrap the script in a userscript header to auto-inject on specific domains:
```javascript
// ==UserScript==
// @name         StyleSession
// @match        https://your-site.com/*
// @grant        none
// ==/UserScript==
```

### 7. Open HTML File
Open `stylesession.html` directly in a browser. It loads `stylesession.js` on a blank page for quick testing.

---

## 🏗️ Architecture

StyleSession is a **self-injecting, zero-dependency** tool. The core is a single JavaScript file that injects its own CSS, HTML, and fonts when executed on any page. The only external dependency is **html2canvas** (loaded on-demand from CDN when capturing screenshots).

```text
stylesession.js (~4,820 lines, ~236 KB)
├── Self-Injection Guard   — Prevents double-load, toggles visibility
├── Font Injection         — Google Fonts (Inter + JetBrains Mono)
├── CSS Injection          — Glassmorphism dark theme, __vi- namespace
├── HTML Injection         — Toolbar, panel, overlays, modals
└── Engine IIFE            — All logic in a single closure
    ├── State Management   — Central state object with Map-based original style tracking
    ├── Command System     — applyChange() → undo stack → redo stack (auto-save hooked)
    ├── Render Loop        — 60fps requestAnimationFrame for overlays
    ├── Tool Renderers     — Per-tool panel UI generators (12 tools + computed tab)
    ├── Session System     — JSON v2 with selector + DOM path persistence + legacy compat
    ├── Workflow Tools     — Change Report, Component Export, Bookmarks, Screenshot
    ├── Security           — escAttr() sanitization, CSS.escape() selectors
    ├── A11y Engine        — WCAG luminance-based contrast ratio calculations
    ├── Draw Engine        — Freehand, line, and eraser modes with SVG paths
    ├── CSS Editor         — Live stylesheet injection with Tab/Ctrl+Enter support
    ├── Command Palette    — Element search + > command mode (18+ commands)
    └── Event System       — Mouse, keyboard, drag, resize, context menu

stylesession.html          — Source file (edit here, then build)
build.js                   — Build script: regenerates .js from .html source + copies to extension/

extension/
├── manifest.json          — Chrome Manifest V3 (activeTab + scripting)
├── background.js          — Service worker: injects stylesession.js on icon click
├── stylesession.js        — Auto-copied from root on build
└── icons/                 — Extension toolbar icons (16/48/128px)

.github/
└── workflows/             — Automated Open-Core build and release pipeline
```

### Design Decisions
- **Self-injecting** — Drop the JS into any page via console, bookmarklet, script tag, or userscript
- **`__vi-` CSS prefix** — All inspector styles are namespaced to avoid conflicts with host pages
- **`Map` for original styles** — Tracks per-element, per-property originals for correct undo
- **Dual targeting** — Sessions use both CSS selectors and `nth-of-type` DOM paths for resilient element matching
- **`escAttr()` everywhere** — All dynamic content injected into `innerHTML` is sanitized against XSS
- **Double-injection guard** — Running the script again toggles visibility instead of duplicating UI
- **No build step required** — Works by pasting the script. `build.js` is only needed if editing the HTML source
- **Late-injection safe** — `_bindPaletteInput()` uses a `DOMContentLoaded` fallback pattern for immediate-or-deferred binding
- **Auto-save via monkey-patch** — The undo stack's `.push()` is overridden to trigger debounced auto-save after every change. Stack pruning uses in-place `splice()` to preserve this hook
- **Canvas-based rulers** — Rulers are rendered on `<canvas>` elements for crisp pixel-perfect tick marks at 10px intervals
- **CDN lazy-load** — html2canvas is loaded on first screenshot capture only, keeping the base bundle dependency-free

---

## 🎨 Theming

StyleSession uses CSS custom properties for its UI. Override these to customize:

```css
:root {
  --vi-bg: rgba(20, 20, 24, 0.96);        /* Panel background */
  --vi-panel-bg: linear-gradient(145deg, rgba(32, 32, 36, 0.95) 0%, rgba(14, 14, 18, 0.98) 100%);
  --vi-accent: #00E5CC;                      /* Primary accent (teal) */
  --vi-hover: #3b82f6;                       /* Hover highlight (blue) */
  --vi-text: #F3F4F6;                        /* Primary text */
  --vi-text-dim: #9CA3AF;                    /* Secondary text */
  --vi-warn: #ff4757;                        /* Warning/error */
  --vi-success: #2ed573;                     /* Success indicators */
  --vi-orange: #ffa502;                      /* Attention color */
  --vi-input-bg: rgba(255, 255, 255, 0.04); /* Input backgrounds */
  --vi-border: rgba(255, 255, 255, 0.06);   /* Border color */
}
```

Fonts: **Inter** (UI) and **JetBrains Mono** (code/values) loaded from Google Fonts.

---

## 📄 Session File Format

StyleSession saves and loads `.stylesession` JSON files:

```json
{
  "version": 2,
  "date": "2026-04-12T12:00:00.000Z",
  "changes": [
    {
      "selector": ".hero h1",
      "path": "body>header:nth-of-type(1)>h1:nth-of-type(1)",
      "styles": {
        "font-size": "72px",
        "color": "#ff6b6b",
        "letter-spacing": "-3px"
      }
    }
  ],
  "notes": [
    { "x": "100px", "y": "200px", "text": "Fix this spacing" }
  ],
  "textChanges": [
    { "selector": ".hero h1", "path": "body>header>h1", "text": "Updated headline" }
  ],
  "drawings": [
    { "d": "M10,20 L30,40", "color": "#ff4757", "size": 3 }
  ],
  "bookmarks": [
    { "selector": ".hero h1", "path": "body>header>h1", "label": "h1.hero-title" }
  ],
  "injectedCSS": ".my-class { color: red; }"
}
```

- **`selector`** — CSS selector (escaped with `CSS.escape`)
- **`path`** — Stable `nth-of-type` DOM path as fallback
- **`styles`** — Only properties changed by StyleSession (not all inline styles)
- **`notes`** — Sticky note annotations with position and text
- **`textChanges`** — Inline text content edits
- **`drawings`** — SVG path data from the draw tool
- **`bookmarks`** — Pinned element references
- **`injectedCSS`** — CSS Editor content

---

## 🛠️ Building from Source

If you edit the HTML source directly, use the build script to regenerate `stylesession.js`:

```bash
node build.js
```

The build script:
1. Extracts CSS from the `<style id="__vi-styles">` block
2. Extracts HTML from the `#__vi-root` element
3. Extracts the JS engine from the IIFE
4. Patches `DOMContentLoaded` for late-injection safety
5. Cleans snapshot selectors to exclude injected elements
6. Escapes backticks and `${}` for template literal embedding
7. Combines everything into a single self-injecting IIFE

**Output:** `stylesession.js` — ready to paste, inject, or include anywhere.

---

## 🤝 Contributing

Contributions are welcome! Please note that this project uses a **non-commercial license** — see [License](#-license) for details.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Edit the source in `stylesession.html` (this is the source of truth)
4. Run `node build.js` to regenerate `stylesession.js` and copy to `extension/`
5. Test by opening `stylesession.html` or pasting the JS into any site's console
6. Submit a pull request

### Areas for Contribution
- Chrome Web Store publishing & review
- VS Code extension wrapper
- Additional tool panels (grid editor, variable editor)
- Theme presets (light mode, high contrast)
- Localization / i18n
- Performance optimization for very large DOMs
- Firefox / Safari extension ports

---

## 🗺️ Roadmap

- [x] Chrome extension (unpacked — load from `extension/` folder)
- [x] GPU-accelerated move tool with grab-and-drag
- [x] Inline text editing (double-click)
- [x] Copy/paste element styles (Ctrl+Alt+C / Ctrl+Alt+V)
- [x] CSS variable import and token conversion
- [x] Element diff matrix (2 elements)
- [x] Batch editing (3+ multi-select)
- [x] Mobile viewport simulation
- [x] Dark mode toggle
- [x] Annotation sticky notes
- [x] Shape Tool — layout prototyping with CSS export
- [x] Draw Tool — freehand, line, and eraser with Shift-lock
- [x] Split-view snapshot comparison
- [x] Command palette with element search and command mode
- [x] Context menu (10 actions)
- [x] Session file upload/import UI
- [x] CSS Editor — live stylesheet injection
- [x] Structured Change Report (Markdown export)
- [x] Component Tree Export (CSS nesting)
- [x] Element Bookmarks with session persistence
- [x] Annotated Screenshot Capture (html2canvas)
- [x] Computed styles tab with searchable filter
- [x] Undo History panel
- [ ] Chrome Web Store publishing
- [ ] VS Code sidebar extension
- [ ] CSS grid visual editor tool
- [ ] Animation keyframe timeline
- [ ] Multi-page session support
- [ ] Collaborative editing (WebRTC)
- [ ] Export to Tailwind / CSS-in-JS
- [ ] Light theme / high-contrast theme
- [ ] Plugin system for custom tools
- [ ] Style Transfer Brush (reference-based style application)
- [ ] Design System Drift Detector (token consistency checks)
- [ ] Session Merge & Diff (intelligent preview/merge)
- [ ] Responsive Breakpoint Preview Strip

---

## 📜 License

StyleSession is released under the [MIT License](LICENSE). Free for any use — personal, commercial, whatever. Just keep the copyright notice.

---

<p align="center">
  <sub>Built by Charles Wright with frustration, caffeine, and vanilla JavaScript.</sub><br/>
  <sub>If StyleSession saved you time, consider <a href="https://github.com/mrtreyw07-lab/StyleSession">starring the repo</a> ⭐</sub>
</p>
