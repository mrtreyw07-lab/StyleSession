# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Annotations**: Implemented drag-and-drop mechanics to allow users to dynamically move placed notes around the viewport.

### Fixed
- **Sanitization**: Hardened `escAttr` and patched an XSS injection vulnerability within `updateLabel()`.
- **Runtime**: Added node validation in `getEffectiveBgColor()` to prevent application crashes during deep DOM traversal.
- **Performance**: Debounced rendering loops for the `drawRulers()` event listeners to eliminate layout thrashing.
- **Memory Management**: Implemented a garbage-collecting `MutationObserver` that prunes detached DOM elements from `state.originalStyles` and the undo/redo stacks, mitigating memory leaks.
- **UI Visibility**: Significantly boosted the core `z-index` of the main toolbar and floating panels ensuring they remain interactive when using full-screen overlays like Snapshot Mode.
