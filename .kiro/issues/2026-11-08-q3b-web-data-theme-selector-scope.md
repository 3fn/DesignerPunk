# Issue: Q3b, the scope of the web `data-theme` selector: page-wide only, subtree, or opt-in

**Date**: 2026-11-08
**Status**: ACTIVE
**Owner**: Ada (the emitted theme block is generator output), with Leonardo on intent. The fork is Peter's.
**Trigger**: `manual` — the first screen spec or consumer request that needs a theme on less than the whole page. Screen specs live in a consumer's `product/`, which this repository does not have, so no path token can see the event; Leonardo's reading of it, at screen specification, fires this record.
**Class**: P3 improvement · owed-act *(rule 12: nothing is false and nothing is misleading. A registered theme emits as `:root[data-theme="<name>"]`, which matches `<html>` only, and every served sentence says so. This is the question of whether it should ever do more.)*
**Source**: Spec 129 design § 10 "Q3b" ("stays Peter's fork after Sparky's committed browser check"); tasks.md Task 14.5; `.kiro/specs/129-consumer-generation-completeness/evidence/q3b-browser-check.md`.

U9's PR asks Peter nothing about this fork. Until a trigger event, option (i) is what ships.

## What is true today (Sparky's browser check)

Chrome 149.0.7827.54, headless, on a scratch consumer built from a tarball packed at `ec23a5a18` with config C:
- A custom theme on `<html>` themes a real DesignerPunk component inside its shadow root, in both colour schemes, including the one-mode form (`light-dark()` with the base in the uncovered half). Custom properties inherit into the shadow root, and Chrome resolves `light-dark()` there against the inherited `color-scheme`.
- The same attribute on a wrapping `div`, with `<html>` unthemed, themes nothing: a `button-cta` inside `<div data-theme="brand">` resolved to base. The selector is `:root[data-theme="<name>"]`; its specificity is (0,2,0).

## The fork

- **(i) Page-wide only (today).** Keep `:root[data-theme="<name>"]`. Nothing changes. Cascade: the theme block (0,2,0) outranks the base `:root` block (0,1,0) regardless of order, and only one theme can be active, because there is one `<html>`. Shadow DOM: nothing to decide; properties inherit in from the root.
- **(ii) Subtree scope.** Write `[data-theme="<name>"]`, beside or instead of the `:root[...]` form. Cascade: specificity drops to (0,1,0), the same as the base `:root` block, so source order decides between them, and a nested theme inside another needs the inner block later in the file. Shadow DOM: components inside the themed element inherit the properties through their shadow roots, as they do from `<html>`. Single-mode themes: `light-dark()` follows the `color-scheme` the element inherits, so a scoped element must not set its own `color-scheme` unless the theme means to force a scheme. Changing the block's shape is a release-note item.
- **(iii) Opt-in scope.** A per-theme or config flag, or a distinct attribute for subtree use, so today's output stays the default. Cascade and Shadow DOM: those of (ii) for a theme that opts in, and of (i) for the rest. It adds a config surface.

## Leonardo's lean (his, marked), and what survives

Leonardo (intent read, 2026-11-08): subtree theming is a real pattern (a themed card or brand section, a live preview pane showing another theme beside the current one, a modal or embedded widget in a host page, a high-contrast region); native, and 128's React Native theme context, scope by tree by construction, so web is the odd one out. His lean is toward (ii), or (iii) if compatibility matters. **Named consumer need now: none known.** This repository has no `product/` directory, test01 is page-wide, and Sparky found no consumer who sets the attribute off the root.

**Surviving counter-argument**: with no known need, (i) avoids speculative cascade risk (the specificity drop in (ii) is a change every existing theme block would carry) and a change to the emitted block's shape. If no trigger event has come by the 129 follow-up close, it stays (i).

## Pointer (2026-11-08, Ada, owner)

Spec 128 meets the same question for React web and React Native, where the theme context scopes by tree. Leonardo's inbound, which cites this record and decides nothing, is at `.kiro/specs/128-react-react-native-platform-admission/inbound-from-leonardo-2026-11-08-theme-scope.md`. If 128's design takes a position on subtree scope, that position is an event for this record's Trigger: read it then.
