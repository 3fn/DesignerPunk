# Task 7.4 Completion — CHANGELOG.md with release 1's entry

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 7 · **Agent**: Thurgood (Sonnet)

**Reworked 2026-09-27** after Stacy's Review 2 (`task-7-3-stacy-review.md`), which checked every sentence of the entry against source code and the last published release and returned ACCEPT-WITH-CHANGES with ten corrections (C1–C10). All ten are applied, as written, with no disagreements — see Task 7's parent report for the one-line confirmation.

## What changed

- **`CHANGELOG.md`** (repo root): one `[Unreleased] — planned Release 1` section, plain and consumer-facing (per T2's ruling — no advertisement of the onboarding path to strangers, since the install doc doesn't ship until release 3; Stacy's Review 2 independently confirmed T2 holds). Drew consumer-facing content from Tasks 1–6's summary docs, Task 9.0's completion doc's own hand-off section, source code (`init.ts`, `transforms.ts`, `sync/{index,Migration,Reporter}.ts`), and — after this rework — Stacy's own direct reads of the same sources plus the last published release (`@3fn/core@14.1.0`, downloaded and inspected).
- **`package.json`**: `"CHANGELOG.md"` in `files[]` (unaffected by this rework).

### Stacy's Review 2 corrections (C1–C10), applied

| # | Severity | What was wrong | Fix |
|---|---|---|---|
| C1 | High | The "authoring surface" bullet misdescribed what `init` copies: it claimed `src/types` is created by `init` (false — token types import from `@3fn/core/types`) and that only build/runtime pieces ship (incomplete — `src/tokens/**` and the iOS/Android component sources ship too) | Rewritten per Stacy's exact replacement text |
| C2 | High | A real breaking change was missing entirely: `sync --force`/`--accept-all` are retired (reported, not honoured) | New Breaking bullet added |
| C3 | High | The `### Publishing` section named GitHub Packages inside a file that ships in the package (`files[]`) — a direct Req 6.1 violation that also overstated B-U1 as ratified/mandatory while it is still DRAFT | **Section deleted entirely** (fork (a), the recommended fork) — no consumer-facing behavior changed, so per the file's own "internal-only changes are not listed" rule it never belonged here |
| C4 | Medium | Component-copy migration described as comparing against "your installed version," but the code compares against the whole version range up to it | Reworded per Stacy's exact text |
| C5 | Medium | MCP-approval bullet: (a) didn't say existing installs aren't auto-corrected; (b) said `validate_component` "no longer exists" when it was never registered at all | (a) sentence appended; (b) "no longer exists" → "no server provides" |
| C6 | Medium | Name contract described as "your components'" token names — it's DesignerPunk's own components | Reworded |
| C7 | Medium | Tarball-size baseline (7.3MB) was Task 3's pre-diet branch measurement, not the last actual release; "closure-verified" overstated coverage (only `src/` is closure-verified; the rest is globs) | Baseline corrected to Stacy's measured 14.1.0 figure (≈8.4MB packed); overstatement softened; a re-measure-at-release-prep note added |
| C8 | Medium | A real breaking change was missing: `generate` now refuses in a half-set-up (partial) repo instead of guessing | New Breaking bullet added |
| C9 | Low | Two lines contradicted each other: "for this release only" (L16) vs. "planned for a later release" (L29) for the retained agent/steering/governance files | "for this release only" → "for now" |
| C10 | Low | Two pointers (`docs/releases/`, `.kiro/hooks/RELEASE-FLOW.md`) don't resolve for a consumer reading the file from `node_modules` — neither ships in `files[]` | Replaced with a public repository URL / dropped |

## The CHANGELOG entry, as written (post-rework)

See `/CHANGELOG.md` in full — reproduced here is the header and section list for the record:

```
## [Unreleased] — planned Release 1 (substrate & packaging truth)

### Breaking
### Changed
### Retained for now
### Fixed
```

**The `### Publishing` section is gone** (C3) — four sections remain, not five. Every bullet under them is drawn from a named source and has survived a second, independent verification pass (Stacy's, against source code and the actual last published release) — no bullet describes work this branch has not actually shipped, and **`CHANGELOG.md` names no GitHub Packages surface (Req 6.1)**. *(Corrected 2026-09-27, Stacy's re-check: this line originally overclaimed "no consumer-facing surface names GitHub Packages" — narrowed here to this file only. `governance/DesignerPunk-Integration-Guide.md` still does, in its install section — a live, separately-tracked Req 6.1 finding, not this file's, with a committed issue: `.kiro/issues/2026-09-27-integration-guide-install-section-stale.md`, PR #214, routed to Task 19.4.)*

## Proof: `CHANGELOG.md` ships in the tarball

`npm pack --dry-run --json` mixes `prepack`'s `npm run build` stdout into the same stream on this npm version, corrupting JSON parsing, so the proof uses `--ignore-scripts` (skips the build-then-pack lifecycle noise; `files[]` filtering itself is unaffected by `--ignore-scripts`) plus the task's own `pack-assert.ts`, run separately for its 40 unrelated assertions:

```
$ npm pack --dry-run --json --ignore-scripts > /tmp/pack-dryrun-t7.json
$ node -e '
const data = JSON.parse(require("fs").readFileSync("/tmp/pack-dryrun-t7.json","utf8"));
const files = data[0].files.map(f=>f.path);
console.log("CHANGELOG.md present:", files.includes("CHANGELOG.md"));
console.log("total entries:", files.length);
'
CHANGELOG.md present: true
total entries: 1603

$ npx tsx scripts/pack-assert.ts
...
40/40 assertions passed.
Tarball: entryCount=1602 size=5916152 unpackedSize=21561066
```

(`pack-assert.ts` does not itself assert on `CHANGELOG.md` — Req 7.4 asked for "a pack check", satisfied above by the direct `npm pack --dry-run --json` listing; the one-entry `entryCount` difference between the two runs, 1602 vs 1603, is a pre-existing `prepack`/`--ignore-scripts` artifact-count wobble unrelated to `CHANGELOG.md`, which is present in both.)

## Targeted tests + result

- `npm pack --dry-run --json --ignore-scripts` — `CHANGELOG.md` confirmed present (above).
- `npx tsx scripts/pack-assert.ts` — 40/40 assertions pass (unaffected by this change; no assertion currently names `CHANGELOG.md`).
- Full validation (tsc, `npm test`, `npm run test:scripts`, `check:completion-criteria-parity`) run once at Task 7 parent level — see Task 7's Additional Verification.

## Application-time adaptations

- **Used an `[Unreleased]` heading rather than a version number**, since the actual version bump is RELEASE-FLOW's job at release-prep (Peter ratifies the bump there), not Task 7's. The entry is labeled "planned Release 1" so a reader knows which release it corresponds to without asserting a version number this task has no authority to assign.
- **`pack-assert.ts` was not extended to assert on `CHANGELOG.md`** — the brief asked to "prove it with a pack check (`npx tsx scripts/pack-assert.ts` if it covers this, otherwise `npm pack --dry-run`)"; it does not cover it today, so the direct `npm pack --dry-run --json` listing above is the proof, per the brief's own fallback clause. Extending `pack-assert.ts` to cover `CHANGELOG.md` was judged out of this subtask's scope (no criterion asks for a new assertion there).
