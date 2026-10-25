# Owed act: a consumer's `npm install @3fn/core` prints "3 low severity vulnerabilities", all in DesignerPunk's own declared dependencies

**Date**: 2026-10-25
**Filed by**: Ada, under rule 10, from the 16.1.0 trio's R1-14 attribution and R2-11 (`tests/onboarding-trio/records/16.1.0/trio-1-backend.md`, `trio-2-designer.md`), re-checked in run 1's born repo (`.kiro/issues/2026-10-15-123-cannot-tell-cells.md`, outcome line 2026-10-25, "row 5's attribution at the 16.1.0 trio install").
**Owner**: **Ada** (which ranges to move, and the check that they are safe for the CLI). The root `package.json` and `package-lock.json` are not in my write scope; the seat that writes them is named in the fixing PR (Thurgood wrote #483's). **Consulted**: Thurgood (the dependency manifests and the CODEOWNERS pin-bump gate); Thurgood also owns the INSTALL sentence R2-11 asks for, which is not this record's close.
**Trigger**: `manual` — the event is this record's own fixing PR, the one that moves `diff` and `tsx` to ranges whose resolved versions are outside both advisories. *(Rule 1: a P3 that would ride takes `manual`, naming its own fixing PR. Ada, 2026-10-25.)*
**Class**: P3 improvement · owed-act *(set 2026-10-25, Ada, rule 12. The install line is true and no doc claims a clean audit, so nothing is false; both advisories are low, and the code paths they name are not ones the CLI is known to call (below). What is owed is a cleaner first command for a founder, who cannot tell that the line is about the package and not about her site.)*
**Grant paths**: none.

---

## What is there

Measured 2026-10-25 by `npm audit --json` in a fresh install of the 16.1.0 candidate tarball (sha1 `42515c34784552f6d87453ac3e67dc033a773d19`):

| npm entry | Resolved | Advisory | Vulnerable | Why a consumer cannot clear it |
|---|---|---|---|---|
| `diff` | 7.0.0 | "jsdiff has a Denial of Service vulnerability in parsePatch and applyPatch" | `>=6.0.0 <8.0.3` | `@3fn/core` declares `^7.0.0`; the fix is 8.0.3, a major |
| `@3fn/core` | 16.0.0 | the `diff` advisory, through its dependency | — | as above |
| `esbuild` | 0.27.7, via `tsx` 4.21.1 | "esbuild allows arbitrary file read when running the development server on Windows" | `>=0.27.3 <0.28.1` | `@3fn/core` declares `tsx` `~4.21.0`, whose `esbuild` range is `~0.27.0` |

`npm audit fix --dry-run` and `npm audit fix --force --dry-run` both leave all three. npm still prints "fix available via `npm audit fix`" for `esbuild`, which is not so in this tree.

**What the CLI reaches**: its one `diff` call is `createTwoFilesPatch` (`src/cli/sync/Prompter.ts` L98), not `parsePatch` or `applyPatch`. Whether `tsx` ever starts esbuild's development server is not checked.

## The fix, and what makes it more than a bump

1. **`diff` to `^8.0.3`.** A major. Check that `createTwoFilesPatch` keeps its signature and output in 8.x (unchecked), and that the `sync` prompt's diff output is unchanged (`src/cli/sync/__tests__`).
2. **`tsx` past 4.21.x**, to a version whose `esbuild` range resolves to 0.28.1 or later (`tsx` 4.23.15, `latest`, asks for `~0.28.0`). The `~4.21.0` pin is deliberate: Spec 118 pinned `tsx` patch-only as the only runtime-TS executor, with a pin-bump review gate (`.kiro/specs/118-module-resolution-coherence/completion/task-9.1-completion.md` L23). So this bump re-runs the Module-Resolution Contract's checks (`tsx/cjs/api` scoped loading in `scopedTsRequire`, the bin, consumer `.ts` config and token loading), not just the unit lanes.

## The class, and an option for it

The release audit I ran for 16.1.0 (#481) read the committed lockfiles. That answers what the bundles inline, not what a consumer's install prints: a consumer resolves `@3fn/core`'s declared ranges afresh. The root lockfile pins `esbuild` 0.27.2, under this advisory's floor, so the steward tree shows no `esbuild` finding while every fresh install does. **Class option**: release prep runs `npm audit` in an empty project after installing the candidate tarball alone (row 5's original 2026-10-15 exit), next to the lockfile audit, and the release record carries both counts. That is a release-procedure change, outside this record and outside my write scope; it is named here for routing, not decided.

## What closes it

The fixing PR merges, and `npm audit` in an empty project with that release's tarball installed alone shows no advisory in `@3fn/core`'s dependency tree. Its outcome line goes here, and the record moves to `archive/`.

## Walk

Has a PR moved `diff` and `tsx`? If not, does a fresh install of the latest release still print advisories from our tree? Under rule 5, a `manual` P3 still unfired at two consecutive walks is archived stale.

*Signed: Ada, 2026-10-25.*
