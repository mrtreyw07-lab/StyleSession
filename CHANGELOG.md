# StyleSession — Changelog

## [1.1.0] - 2026-04-24

### Added
- **Draw Tool**: A comprehensive annotation system (W) allowing freehand drawing, straight lines (with Shift-axis lock), and an eraser. Features include 5 color swatches, an adjustable brush size slider (1px to 20px), and an interactive undo stack that integrates seamlessly with the primary state manager.
- **Optical Lens Dark Mode**: Upgraded the dark mode algorithm to an optical-lens rendering approach for higher fidelity color inversion without washing out images or videos.
- **Resizable Annotations**: Sticky Note annotations can now be manually resized via CSS `resize: both` and scale automatically using `fit-content`.
- **Automated Release Pipeline**: Re-architected the build system with GitHub Actions to securely synchronize the public `StyleSession` repository with the private dev environment, ensuring a clean Open-Core separation.

### Fixed
- **Filter Slider Hardening**: Refactored the CSS filter sliders (blur, contrast, brightness) to track initial state on `pointerdown` and only execute undo-stack commits on `change`. This prevents the undo stack from flooding and eliminates compounding math errors during rapid dragging.
- **Strict Falsy Handling**: Patched core property extraction logic to explicitly handle strict falsy values, preventing bugs where `0px` margins or opacity values were being inadvertently skipped during serialization.
- **Tool Mapping**: Fixed an edge case race condition where rapid toggling between the Shape and Draw tools would cause overlapping cursor artifacts and input hijacking.
- **Async Selection Parsing**: Resolved race condition bugs with CSS selector generation.

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
