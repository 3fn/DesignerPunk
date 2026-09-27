# Issue: `dist/components/**/*.web.js` require sibling `.web.css` files that the build never emits

**Date**: 2026-09-26
**Status**: ACTIVE
**Owner**: Lina (component build output)
**Trigger**: Lina's next component-content or build session, **or** the first report of anything importing `dist/components/**` directly, whichever comes first. Not a Spec 123 blocker.
**Source**: Lina's Spec 123 design-round finding (A7, design.md C5). Re-verified live by Ada at U1 Task 3 and by the steward on 2026-09-26. Lina asked for it to be filed rather than carried in memory.

## The defect

`tsc` compiles `import styles from './X.web.css'` in the web component sources to `require("./X.web.css")` in `dist/components/core/**`. Nothing copies the `.css` files alongside, so `find dist/components -name "*.css"` returns **0**. Source has 29 web `.css` files.

Seven production modules carry a dangling require:
- `Button-CTA/platforms/web/ButtonCTA.web.js`
- `Button-Icon/platforms/web/ButtonIcon.web.js`
- `Input-Checkbox-Base/platforms/web/InputCheckboxBase.web.js`
- `Input-Checkbox-Legal/platforms/web/InputCheckboxLegal.web.js`
- `Input-Radio-Base/platforms/web/InputRadioBase.web.js`
- `Input-Radio-Set/platforms/web/InputRadioSet.web.js`
- `Input-Text-Base/platforms/web/InputTextBase.web.js`

Example: `ButtonCTA.web.js:40` → `require("./ButtonCTA.web.css")`.

## Why it isn't visible today

The shipped browser bundle (`dist/browser/designerpunk.esm.js`, built by esbuild from `src/browser-entry.ts`) inlines the CSS, so it's the bundle that consumers load. `package.json` `exports` don't expose `dist/components/**`, but `files[]` ships `dist/**/*.js`. So a deep-path `require('@3fn/core/dist/components/…')` throws `MODULE_NOT_FOUND`.

## Options (owner decides)

- (a) Copy the web `.css` files into `dist/components/**` as a build step.
- (b) Stop shipping `dist/components/**/*.web.js`, since the bundle is the supported surface. This is a `files[]` change, and `package.json` is Spec 123 Task 3's artifact while U1 is open, so it would go through a later unit or a post-U1 chore.
- (c) Make the web sources import CSS in a form `tsc` output can resolve.

Whichever is chosen, add a guard: every `require("./*.css")` in `dist/components` resolves.

## Filed by

Steward (main-loop), 2026-09-26, at Lina's request (U1 Task 4 hand-back).
