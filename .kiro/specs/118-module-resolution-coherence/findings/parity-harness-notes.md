# Parity-Harness Notes (Spec 118, Increment 2 — Task 7.1 + 7.2)

**Date**: 2026-06-25 · **Author**: Ada · **Status**: investigation-only (no swaps/exports/migration)

> **RETIRED in Increment 3a (Task 9.1, 2026-06-25):** the harness served its two-mechanism (ts-node vs tsx) purpose; with ts-node fully removed it has no second arm to compare against. `ParityOrchestrator.ts`, `ParityNormalizationRules.ts`, `__parity__/run-parity.js`, and their two unit-test suites were deleted; the `test:parity` npm script no longer exists. Evidence is preserved in this note + `evidence-table.md` (the all-green result and the volatile-only divergence set stand as the durable record).

Durable record of the parity-harness mechanics, the raw observed divergences, and
the post-normalization all-green result. The main loop assembles the formal
`evidence-table.md` / `divergence-hypothesis.md` from this + the reported data.

## The seam (verified, not re-derived)

Both token generators (`scripts/generate-platform-tokens.ts`) WRITE to cwd-relative
`dist/` + `token-index/` but READ token SOURCES from package-relative module paths.
So running the script from a scratch `cwd` with no config (→ DEFAULTS) produces a
clean fresh tree there. Running the SAME script under **ts-node** vs **tsx** isolates
the runtime mechanism as the single variable — the exact control the parity harness
needs.

Proven commands (macOS has no `timeout`; natural exit):
```
SCRATCH_A=$(mktemp -d); ( cd "$SCRATCH_A" && npx ts-node <repo>/scripts/generate-platform-tokens.ts )
SCRATCH_B=$(mktemp -d); ( cd "$SCRATCH_B" && npx tsx    <repo>/scripts/generate-platform-tokens.ts )
```
Both exit 0 and produce all **11 non-optional** INVENTORY artifacts (3 token-index/*.yaml
+ 8 dist/* token files). The 3 optional `dist/product/*` artifacts are absent on both
(DEFAULTS has no productTokens) — not a divergence.

## Raw (pre-normalization) divergences — the COMPLETE observed set

Byte-diff of the two fresh trees, per artifact:

| Artifact | Raw diff |
|---|---|
| token-index/{primitives,semantics,components}.yaml | **byte-identical** |
| dist/DesignTokens.figma.json | **byte-identical** (no timestamp field) |
| dist/DesignTokens.web.css | 1 line: ` * Generated: <ISO>` |
| dist/DesignTokens.ios.swift | 1 line: `/// Generated: <ISO>` (the `///` Swift form) |
| dist/DesignTokens.android.kt | 1 line: ` * Generated: <ISO>` |
| dist/DesignTokens.dtcg.json | 1 field: `"generatedAt": "<ISO>"` |
| dist/ComponentTokens.{web.css,ios.swift,android.kt} | 1 line each: `Generated: <ISO>` |

**Every raw divergence is a volatile timestamp.** No token value, no structural,
no ordering divergence appeared between ts-node and tsx output.

## Post-normalization result — ALL GREEN

117's existing `DEFAULT_NORMALIZATION_RULES` already neutralize EVERY observed
divergence (text-kind ISO-datetime line filter strips the `Generated:` headers incl.
the Swift `///` form; `VOLATILE_KEYS` strips DTCG `generatedAt`). So after
normalization the two trees are **semantically equal across all 11 non-optional
artifacts** — no 118 rule is needed to reach today's green.

Standalone runner output (`npm run test:parity`, exit 0):
```
artifact                              | ts-node | tsx     | parity | notes
token-index/primitives.yaml           | present | present | green  | byte-identical
token-index/semantics.yaml            | present | present | green  | byte-identical
token-index/components.yaml           | present | present | green  | byte-identical
dist/DesignTokens.web.css             | present | present | green  | raw differs (volatile only); equal after normalization
dist/DesignTokens.ios.swift           | present | present | green  | raw differs (volatile only); equal after normalization
dist/DesignTokens.android.kt          | present | present | green  | raw differs (volatile only); equal after normalization
dist/DesignTokens.dtcg.json           | present | present | green  | raw differs (volatile only); equal after normalization
dist/DesignTokens.figma.json          | present | present | green  | byte-identical
dist/ComponentTokens.web.css          | present | present | green  | raw differs (volatile only); equal after normalization
dist/ComponentTokens.ios.swift        | present | present | green  | raw differs (volatile only); equal after normalization
dist/ComponentTokens.android.kt       | present | present | green  | raw differs (volatile only); equal after normalization
dist/product/ProductTokens.*          | absent  | absent  | green  | optional; absent on both (not a divergence)
```

## Harness mechanics

- **Logic** (`src/tools/integrity/ParityOrchestrator.ts`): thin glue over 117's
  reused `Normalizer.normalize(raw, kind)` + `SemanticComparator.compare(artifact, A, B)`,
  iterating `INVENTORY` as the artifact-list driver. `compareTrees(rootA, rootB)`
  is PURE over two roots; `runParity()` spawns the two mechanisms to scratch cwds,
  compares, and cleans up (try/finally `fs.rmSync`).
- **Runner** (`src/tools/integrity/__parity__/run-parity.js` + `npm run test:parity`):
  standalone `.js` mirroring the `run-matrix.js` precedent. NOT jest (compares file
  outputs, not module loading; two full generations are slow). Exits non-zero if any
  non-optional artifact diverges semantically → usable as a standing check.
- **NO `FreshGenerator` abstraction needed** for the two-tree seam — two roots
  suffice (open design question answered). Direct `fs.readFileSync` per path;
  `DiskFreshGenerator` was available as a per-tree reader but added nothing.
- **Does NOT route through `GenerationIntegrityCheckImpl`** (hardwired committed-vs-fresh,
  one FreshGenerator + reads committed itself — cannot ingest two fresh trees). No
  second normalization/comparison engine was written.

## Volatile-field normalization set (OQ-2)

117's defaults cover today's reality. The 118 additions
(`src/tools/integrity/ParityNormalizationRules.ts`, `PARITY_NORMALIZATION_RULES =
[...DEFAULT_NORMALIZATION_RULES, ...ADDED_PARITY_RULES]`) are **defensive /
class-completeness** — they do NOT change today's green but neutralize false-diff
vectors a parity run under different conditions would surface:

1. **`rosettaVersion` + embedded `version`** (DTCG `$extensions.designerpunk`,
   `DTCGFormatGenerator.ts:235-237`) — strip as volatile DTCG version keys. A bumped
   `package.json` version or a future format-version bump between runs would false-diff.
2. **`extensions.themes`** (`DTCGFormatGenerator.ts:240-242`) — BOTH false-diff
   vectors normalized: (a) **conditional presence** — emitted only behind
   `registeredThemes.length > 0`; empty/absent canonicalized to absent; (b) **array
   ordering** — `SemanticComparator` compares arrays positionally, so theme entries
   are sorted by `name|mode`.

**`duration` / build-timing: NONE in the artifacts.** Enumerated from actual output:
the only `duration` matches are the animation `duration*` DESIGN TOKENS (iOS `Duration`
enum, `duration150/250/350`) — token VALUES that must NOT be normalized. No
build-timing/elapsed field is written to any artifact, so no `duration` rule was added.

Each added rule is surgical and individually unit-tested
(`src/tools/integrity/__tests__/ParityNormalizationRules.test.ts`): positive test
(target ignored) + sentinel test (a genuine token-value/theme change still surfaces).
117's exported default is EXTENDED (composed), never mutated — no cross-spec regression.

## Surprising vs. design expectations

- Design seeded `duration` / build-timing as a candidate. **Confirmed it does NOT
  appear** in on-disk artifacts (the design itself flagged "likely do NOT appear" —
  confirmed). The `duration` token family is a deliberate non-target.
- `DesignTokens.figma.json` is **byte-identical** because it carries NO `generatedAt`
  header at all — so it needs no normalization even raw.
- Under DEFAULTS, `extensions.themes` is **absent** (no registered themes), so the
  themes rules are purely defensive today — but real (a themed parity run would
  false-diff without them).

## Verification

- `npm run test:parity`: exit 0, all 11 non-optional GREEN; scratch dirs cleaned.
- New unit tests: **17 passing** (10 in ParityNormalizationRules + 7 in ParityOrchestrator).
- Full `npm test`: **376 suites / 8989 tests passing** (baseline 374/8972; delta = my +2 suites/+17 tests — no regression).
- `npx tsc --noEmit`: clean (exit 0, zero output).
- `git status`: only intended files; NO changes to `dist/`, `token-index/`, `package-lock.json`.
```
