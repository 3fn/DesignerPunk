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
| `.gitkeep` (bare `platforms/android/.gitkeep`, 8 files) | "INCLUDED and counted (swept in by `**`; harmless)" | **0 — NOT swept in** | Deliberate divergence, see below |

**`.gitkeep` divergence, attributed to glob choice, not drift**: Data's own count assumed a broader `**` glob would sweep the 8 bare `platforms/android/.gitkeep` placeholder files in (verified they exist: `find src/components/core -path "*/platforms/android/*" -name ".gitkeep"` → 8 files, e.g. `Avatar-Base/platforms/android/.gitkeep`, for components with no Android implementation yet). This implementation's actual glob choice (`*.kt` for sources, `res/**` for resources — narrower than a bare `**`) does not match bare `.gitkeep` files sitting directly under `platforms/android/` (outside `res/`). Data's own advisory explicitly left this a judgment call: *"count them or exclude them, but state which."* **Chosen: exclude.** A placeholder file with zero content serves no consumer purpose, and the narrower glob is what actually ships from the chosen `files[]` entries — asserting a broader "swept in" claim would be asserting behavior the implementation doesn't have.

## Assertion transcript (from `pack-assert.ts`, full run)

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
PASS: Android bare platforms/android/.gitkeep NOT swept in (deliberate; see completion doc) — measured 0
```

## Targeted tests + result

Same `pack-assert.ts` run as Task 3.3 (one script, one invocation covers both subtasks' assertions): **40/40 assertions passed** (10 of the 40 are the platform-closure rows above).

## Application-time adaptations

1. **iOS `src/tokens/platforms/ios/**` count corrected from 3 to 2** (README.md doesn't exist at that path) — see "Discrepancy, attributed" above. Flagged for Peter/Thurgood in the orchestrator report rather than silently editing tasks.md's criterion text (not this subtask's write scope).
2. **Android `.gitkeep` sweep-in declined** — see "divergence, attributed" above.

## Known issues

- The iOS-README discrepancy and the Android-`.gitkeep` divergence are both recorded here as the corrected/chosen values now in force; neither is a carried-forward open item (both are resolved — the resolution is "assert the re-measured/narrower value," not "TBD").
