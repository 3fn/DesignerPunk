# Task 3.4 Completion — The platform-closure rows (iOS + Android) with counts

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 3 · **Agent**: Ada (Sonnet)

## What changed

`package.json` `files[]` gained the explicit iOS/Android platform-closure entries (Task 3.3's diff), and `scripts/pack-assert.ts` gained the row-count assertions below, run against a real `npm pack --dry-run --json`.

## `files[]` rows added

```
"src/components/core/**/platforms/ios/*.swift",
"!src/components/core/**/platforms/ios/*Tests.swift",
"src/components/core/**/platforms/android/*.kt",
"!src/components/core/**/platforms/android/*Test.kt",
"src/components/core/**/platforms/android/res/**",
"src/blend/*.ios.swift",
"src/blend/*.android.kt"
```

(`src/tokens/platforms/{ios,android}/**` needs no separate entry — already covered by the `"src/tokens/**"` wholesale glob from Task 3.3.)

## iOS closure rows — against Kenya's R2 counts (`feedback/tasks.md` § "[KENYA R2]")

| Row | Kenya's count | Measured (this pack) | Match |
|---|---|---|---|
| Component production `.swift` incl. `*Preview.swift`, excl. `*Tests.swift` | 39 | **39** | ✅ |
| `*Tests.swift` ABSENT | 0 | **0** | ✅ |
| `src/blend/*.ios.swift` | 1 | **1** | ✅ |
| `src/tokens/platforms/ios/**` | 3 (per tasks.md's original text, quoting Kenya R2: "MotionTokens.swift, MotionTokens.md, README.md — all three ship") | **2** | ❌ — see "Discrepancy" below |

**Discrepancy, attributed**: `src/tokens/platforms/ios/` on this tree contains exactly **2** files: `MotionTokens.swift`, `MotionTokens.md`. There is **no `README.md`** at that path. Checked `git log --all --diff-filter=D -- src/tokens/platforms/ios/README.md` → zero commits (it has never existed in this repo's history at any point I could find, on any branch). This rules out "source change after `5e98bd8f`" (nothing changed — it was never there) and "tool defect" (a plain `find src/tokens/platforms/ios -type f` independently confirms the same 2 files; this isn't a floor-closure.ts artifact, since `src/tokens/platforms/**` is covered by the wholesale `src/tokens/**` glob, not a closure-2-specific computation). **Most likely explanation: a measurement slip in Kenya's R2 re-check** — her own text says "Tree re-checked: `src/blend/` has 1 `.ios.swift`; `src/tokens/platforms/ios/` has 3 files," possibly conflating this path with a DIFFERENT README.md that does exist nearby (e.g. `src/components/core/Icon-Base/platforms/android/res/drawable/README.md`, or `src/components/core/Icon-Base/platforms/ios/ASSET_CATALOG_SETUP.md`). **This does not hit Task 3's escalation trigger** (it is not a closure-2 difference, not a `files[]` list change outside C5's decided shape, and not a CUT verdict) — I am recording the RE-MEASURED count (2) as the asserted value in `pack-assert.ts`, with this note, rather than asserting a count I cannot reproduce against the actual tree.

## Android closure rows — against Data's R2 counts (`feedback/tasks.md` § "[DATA R2]")

| Row | Data's count | Measured (this pack) | Match |
|---|---|---|---|
| Component `.kt` incl. `*Preview.kt`, excl. `*Test.kt` | 39 | **39** | ✅ |
| `*Test.kt` ABSENT | 0 | **0** | ✅ |
| `res/**` (50 drawable XML + 1 README.md) | 51 | **51** | ✅ |
| `src/blend/*.android.kt` | 1 | **1** | ✅ |
| `src/tokens/platforms/android/**` | 2 | **2** | ✅ |
| `.gitkeep` (bare `platforms/android/.gitkeep`, 8 files) | "INCLUDED and counted (swept in by `**`; harmless)" | **8 — INCLUDED** (see 2026-09-26 addendum below) | ✅ |

**~~`.gitkeep` divergence, attributed to glob choice, not drift~~ — SUPERSEDED, see the 2026-09-26 addendum below.** *(Original text, kept for the record of what was first done and why it was wrong to do it: Data's own count assumed a broader `**` glob would sweep the 8 bare `platforms/android/.gitkeep` placeholder files in — verified they exist: `find src/components/core -path "*/platforms/android/*" -name ".gitkeep"` → 8 files, e.g. `Avatar-Base/platforms/android/.gitkeep`, for components with no Android implementation yet. My first implementation's glob choice (`*.kt` for sources, `res/**` for resources — narrower than a bare `**`) did not match these. I read Data's own advisory — "count them or exclude them, but state which" — as leaving the choice open, and chose exclude. That reading was wrong: see the addendum.)*

---

### Addendum — 2026-09-26 (verification correction)

**I first EXCLUDED the 8 `platforms/android/.gitkeep` files, on the (incorrect) belief that Data's "count or exclude, state which" advisory left it as my open choice. It does not.** The tasks.md criterion, as SETTLED at the tasks round, reads: *"**`.gitkeep` = 8, INCLUDED and counted** (swept in by `**`; harmless)."* Data's advisory was folded into the plan, and the plan RULED include — the settled criterion is not itself an open choice, whatever latitude the advisory that fed it once had. Excluding them was a divergence from a merged criterion made without a ruling to support it, caught at the coordinator's verification pass.

**Corrected**:
- `package.json` `files[]` gained an explicit entry: `"src/components/core/**/platforms/android/.gitkeep"` (a narrow glob targeting exactly the bare placeholder files, not a broad `**` sweep — the SETTLED count of 8 is achieved either way; the narrow form is preferred since it's self-documenting about what it's for).
- `scripts/pack-assert.ts`'s Android `.gitkeep` assertion now checks `=== 8` (PRESENT, ruled INCLUDE) instead of `=== 0` (excluded).
- Re-ran `npx tsx scripts/pack-assert.ts` → **40/40 assertions pass**, `Android platforms/android/.gitkeep PRESENT = 8 (ruled INCLUDE) — measured 8`.
- **Bite recorded red**: removed the new `files[]` entry (`sed`, with a backup) → re-ran → `FAIL: Android platforms/android/.gitkeep PRESENT = 8 (ruled INCLUDE) — measured 0`, `39/40 assertions passed` → restored from backup → confirmed `git diff --stat package.json` shows only the one intended line → re-ran → green (40/40).
- Tarball counts shifted by exactly 8 entries: `entryCount` 1589→**1597**, `unpackedSize` 21307954→**21308710**. `tarball-target.json` regenerated from this corrected pack (Task 3.6's artifact; see its own completion doc's addendum).

## Assertion transcript (from `pack-assert.ts`, POST-ADDENDUM run — the current, correct state)

```
PASS: iOS component .swift PRESENT (excl. *Tests.swift) = 39 — measured 39
PASS: iOS *Tests.swift ABSENT = 0 — measured 0
PASS: iOS src/blend/*.ios.swift PRESENT = 1 — measured 1
PASS: iOS src/tokens/platforms/ios/** PRESENT = 2 (re-measured; see completion doc) — measured 2
PASS: Android component .kt PRESENT (incl. *Preview.kt, excl. *Test.kt) = 39 — measured 39
PASS: Android *Test.kt ABSENT = 0 — measured 0
PASS: Android res/** PRESENT = 51 (50 drawable XML + README.md) — measured 51
PASS: Android src/blend/*.android.kt PRESENT = 1 — measured 1
PASS: Android src/tokens/platforms/android/** PRESENT = 2 — measured 2
PASS: Android platforms/android/.gitkeep PRESENT = 8 (ruled INCLUDE) — measured 8
```

*(The pre-addendum transcript asserted `Android bare platforms/android/.gitkeep NOT swept in ... measured 0` — superseded above; kept out of this doc's live transcript since it recorded a divergence that has since been corrected, not a fact still true.)*

## Targeted tests + result

Same `pack-assert.ts` run as Task 3.3 (one script, one invocation covers both subtasks' assertions): **40/40 assertions passed** (10 of the 40 are the platform-closure rows above).

## Application-time adaptations

1. **iOS `src/tokens/platforms/ios/**` count corrected from 3 to 2** (README.md doesn't exist at that path) — see "Discrepancy, attributed" above. Flagged for Peter/Thurgood in the orchestrator report rather than silently editing tasks.md's criterion text (not this subtask's write scope). This one is NOT a divergence from a ruling — the criterion's own text says "Differences are attributed," and this is exactly that: an attributed difference, not a corrected mistake.
2. **Android `.gitkeep` — INITIALLY excluded on a misreading, CORRECTED at verification to INCLUDE (2026-09-26 addendum above).** Unlike the iOS count, this was not a case the criterion invited attribution for — the settled text ruled INCLUDE outright, and my exclusion was a divergence from a merged criterion, not a defensible measurement call. Caught before parent completion; see the addendum for the full correction.

## Known issues

- The iOS-README discrepancy remains recorded as an attributed difference per the criterion's own "Differences are attributed" clause — not a carried-forward open item, and not something requiring further correction.
- The Android `.gitkeep` divergence is CLOSED as of the 2026-09-26 addendum (corrected to INCLUDE, bite-verified, tarball-target.json regenerated). Nothing carried forward from it.
