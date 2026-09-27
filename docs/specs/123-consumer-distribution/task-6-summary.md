# Task 6 Summary: The name contract and the type contract

**Date**: 2026-09-27
**Purpose**: Concise summary of Task 6 completion
**Organization**: spec-summary
**Scope**: 123-consumer-distribution

---

## What Was Done

**The name contract (Req 5A)** is built at package-build time from the compiled web surface.
- `scripts/build-name-contract.ts` writes `dist/name-contract.json`. It lists every semantic and primitive token name our web components reference: 143 semantic + 41 primitive today. Each entry carries its tier, DesignerPunk's value, the components using it, and its declared use.
- The component tier is excluded, per Peter's P1 ruling.
- **The build fails loudly on:**
  - a name the bundle contains but no source does;
  - a component that builds token names at runtime at a site not in the committed site record (21 sites, each with one of three dispositions);
  - any name that is missing from DesignerPunk's own generated CSS. That is a component defect, routed to Lina, and it never reaches a consumer.

**`sync` reports the contract and never writes her tokens.**
- A name her generated web CSS lacks is reported with the component that uses it, DesignerPunk's value for reference, and where her tokens live.
- If she has no generated output, the result is "cannot check", never clean.

**The type contract (DD11).**
- A content hash of the emitted `PrimitiveToken` / `SemanticToken` / `TokenCategory` / `SemanticCategory` declarations ships with the contract, and `init` records it.
- On `sync`, a changed hash fetches the previously installed version's contract through her own npm setup and lists the removed and added members. A comment-only change says "no member changes detected".
- Offline reads "cannot tell". A missing or pre-contract baseline reads "no baseline".
- The new hash is recorded only when `sync` writes the manifest.

## Why It Matters

Under Model B the consumer's tokens are hers, and our components keep updating. The name contract is the one seam between the two. It turns *"an `npm update` silently broke a component"* into a named report. The own-index check makes sure the report never blames her for our defects.

## Key Changes

- **New**: `scripts/build-name-contract.ts`, `src/cli/sync/NameContract.ts`, and four test suites (49 tests in total).
- **Wired**: `npm run build` (the contract builds after the browser bundle), `sync` steps 6b/6c, and `init`'s `contractHash`.
- **Peter's rulings (2026-09-27)**:
  - type-contract baseline = fetch the previous version (B);
  - the `borderColor` alias is deprecated on native (N). That is filed separately, and it has no 5A effect.
- Seven strings with no catalog row are handed to Thurgood for a design erratum.

## Impact

- `dist/name-contract.json` ships (pack-assert 40/40).
- `npm test`: 383 suites, 9251 tests. `npm run test:scripts`: 11 suites, 206 tests.
- Routed:
  - the `test:scripts` lane has no CI home;
  - a phantom variable in an unbundled `InputTextPassword.browser.ts` (Lina);
  - absolute build paths leak in the browser bundle;
  - the long declared-use clause (Leonardo).
