# Task 2 Summary: Package.json Restructuring

**Spec**: 095 - Ecosystem Package Assembly
**Date**: 2026-04-08
**Agent**: Lina

## What Changed

Restructured `package.json` for the `@designerpunk/core` ecosystem package:

- Renamed from `designer-punk-v2` to `@designerpunk/core`
- Added `files` allowlist (32 entries) — only intended content ships. Specs, issues, roadmap, demos, source maps, UMD bundles all excluded.
- Replaced exports map — 9 ESM-only consumer paths. Removed legacy `./BlendUtilities` and CJS root condition.
- Added `bin` field for `npx designerpunk` CLI commands
- Added `tsx` as runtime dependency for pipeline execution in product repos
- Removed duplicate `dist/android/` and `dist/ios/` directories

## Package Metrics

5.8 MB packed, 19.9 MB unpacked, 1,481 files.
