# Issue: four Input-Text `*.browser.ts` files appear orphaned — audit and (likely) delete; correct the #202 record's user-visibility claim

**Date**: 2026-09-26
**Status**: ACTIVE
**Owner**: Lina
**Trigger**: Lina's next burst slot, parallel to Spec 123 U1 (blocks nothing in U1). **Must land, or be explicitly deferred with a reason, before Spec 123 release 1 publishes** — a deletion changes what the package ships and belongs in that release's CHANGELOG (Task 7.4 starts the CHANGELOG).
**Source**: steward verification of PR #203 (Input-Text-Password hover blend), 2026-09-26. Peter ruled: file for Lina (not either of the two options in #203's stop-and-report).

## The finding

`src/components/core/Input-Text-{Base,Email,Password,PhoneNumber}/platforms/web/*.browser.ts` (added 2026-01-01, `343c2903`) are **imported by nothing**:

- `npm run build:browser` (`scripts/build-browser-bundles.js`) bundles from `src/browser-entry.ts`, which imports the **`.web.ts`** files (e.g. `browser-entry.ts:18` → `InputTextPassword.web`). esbuild inlines dependencies (incl. blend math), so the shipped `dist/browser/designerpunk.esm.js` never touches `.browser.ts`.
- `git grep` for `.browser` imports outside docs/`.kiro/`: only hit is the Input-Text resolve-guard itself (`Input-Text-Base/__tests__/InputTextFamily.token-resolution.test.ts`), which scans them and allow-lists `InputTextPassword.browser.ts`'s `--color-background-hover`.
- `package.json` `exports` do not expose them. They ship only as loose files because `files` includes `src/`; born repos carry copies (dp-portfolio/test01 has Input-Text READMEs that mention them).

## Why it matters

1. **#203's stop-and-report fork rests on a false premise.** It weighed inlining ~650 lines of colour math into `InputTextPassword.browser.ts` vs breaking its zero-import convention — for a file no build consumes. Neither option is warranted.
2. **The #202 record overstates user impact.** `archive/2026-09-26-input-text-phantom-css-vars.md` (and `archive/2026-09-26-container-base-phantom-css-vars.md` "Left open" item 1) call the Input-Text phantoms USER-VISIBLE ("error/success styling renders nothing in the browser variants"). Almost all phantoms were in these orphaned files. The live `.web.ts` path had two: the Input-Text-Base error icon colour literal (fixed #202) and the Password toggle hover (fixed #203). The records should say so — the fixes are still right, the impact claim is not.
3. **A drifting parallel copy** is a standing contamination vector: it already diverged (phantom names the `.web.ts` files didn't have) and now forces a guard allow-list entry.

## Scope

1. **Confirm orphan status** (Lina's call — owner of the family): nothing in build, tests (other than the guard), demos, docs-as-instructions, or the Application MCP depends on them. Check the family READMEs / component docs that name them.
2. **If confirmed orphaned: delete the four files**; remove the `KNOWN_DEFERRED` entry and the `.browser.ts` scan from the Input-Text guard (keep the guard's non-vacuity assertions meaningful); update READMEs/docs that reference them. Record the removal for the release-1 CHANGELOG (package-contents change; zero known external consumers per T2 ruling — dp-portfolio is ours).
3. **If NOT orphaned** (a real consumer surfaces): stop and report — then #203's fork reopens for Peter with the consumer named.
4. **Correct both archived records' user-visibility claims** with a dated addendum (records are immutable except by dated addendum; do not rewrite history).

## Counter-argument (recorded)

The files ship in the npm package's `src/`, so a deep-path consumer could exist that we cannot see. Weighed against zero known external consumers and a drifting copy that already shipped phantom names; the CHANGELOG entry is the mitigation.

## Filed by

Steward (main-loop), 2026-09-26, at Peter's direction.
