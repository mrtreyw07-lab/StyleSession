# StyleSession — Changelog

## [1.0.1] - 2026-04-01

### Added
- **Shape Tool**: Added a robust Layout Prototyping tool (G) that allows users to click-drag dynamic `<div>` containers onto the page, style them visually (including 6 quick presets), and automatically generate production-ready CSS output.
- **Annotations**: Implemented drag-and-drop mechanics to allow users to dynamically move placed notes around the viewport.

### Fixed
- **Pre-Commit Audit**: Resolved multiple vulnerabilities and memory leaks including class masking regex logic, orphaned `keydown` event listeners on inline edits, and destructive element removals during Snapshot Mode.
- **Selection Race Condition**: Patched a sync bug where the Move and Shape tools would inadvertently hijack the entire `html` document element due to unhandled generic browser click events.
- **Sanitization**: Hardened `escAttr` and patched an XSS injection vulnerability within `updateLabel()`.
- **Runtime**: Added node validation in `getEffectiveBgColor()` to prevent application crashes during deep DOM traversal.
- **Performance**: Debounced rendering loops for the `drawRulers()` event listeners to eliminate layout thrashing.
- **Memory Management**: Implemented a garbage-collecting `MutationObserver` that prunes detached DOM elements from `state.originalStyles` and the undo/redo stacks, mitigating memory leaks.
- **UI Visibility**: Significantly boosted the core `z-index` of the main toolbar and floating panels ensuring they remain interactive when using full-screen overlays like Snapshot Mode.
