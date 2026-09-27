# Task 7.4 Completion — CHANGELOG.md with release 1's entry

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 7 · **Agent**: Thurgood (Sonnet)

## What changed

- **`CHANGELOG.md`** (new, repo root): one `[Unreleased] — planned Release 1` section, plain and consumer-facing (per T2's ruling — no advertisement of the onboarding path to strangers, since the install doc doesn't ship until release 3). Drew consumer-facing content from Tasks 1–6's summary docs (`docs/specs/123-consumer-distribution/task-{1..6}-summary.md`) and Task 9.0's completion doc's own hand-off section:
  - **Breaking**: narrowed package surface (`src/` no longer ships wholesale; `designerpunk.config.ts` dropped); `init` refuses in born/partial/package-mode repos; `sync` no longer refreshes the consumer's token tier, `src/types`, or component copies; the opt-in component-copy migration.
  - **Changed**: key-grained `sync` for MCP config keys; generated (not hand-maintained) MCP approval lists on both harnesses; the third `designerpunk-product` MCP server entry; the name contract + type contract now reported by `sync`; the smaller tarball.
  - **Retained for now**: the still-copied agents/steering/governance files (sequencing decision 7, Leonardo A5 (ii)) — named explicitly so it isn't read as an oversight.
  - **Fixed**: Task 9.0's two items, using its own hand-off wording near-verbatim (browser-bundle absolute-path leak; the four orphaned Input-Text `.browser.ts` files removed).
  - **Publishing**: one line naming the new publish-rail guard (Task 7) as a release-process improvement, without naming GitHub Packages as an install path (Req 6.1).
- **`package.json`**: added `"CHANGELOG.md"` to `files[]` (first entry in the array, ahead of the `dist/browser/...` glob).

## The CHANGELOG entry, as written

See `/CHANGELOG.md` in full — reproduced here is the header and section list for the record:

```
## [Unreleased] — planned Release 1 (substrate & packaging truth)

### Breaking
### Changed
### Retained for now
### Fixed
### Publishing
```

Each bullet under those five headings is drawn from a named source (Tasks 1–6 summaries, Task 9.0's hand-off section) — no bullet describes work this branch has not actually shipped, and Task 7's own publish-rail guard is described only as a process improvement, not as a consumer-facing behavior change.

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
