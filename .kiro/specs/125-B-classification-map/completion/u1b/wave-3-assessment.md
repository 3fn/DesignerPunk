# Wave 3 (Task 5.4) — Assessment: Rules, Clause Scoring, Candidate Diff, Trial Rubric

**Date**: 2026-09-13
**Wave**: 3 of 4 (artifact-integrity territory) — executes tasks.md 5.W verbatim; fill slots per 5.4
**Rules**: C7 (never hand-edit 122-generated outputs), C8 (never hand-edit generated token/platform outputs), C9 (`no-hardcoded-color`)
**Step**: 5.W(a) — classification + candidate prune diff. NOTHING in this document is a prune; the diff is a CANDIDATE, consumed unchanged by (b) and applied only as ratified in (c).
**Status**: **POST-CONSULT FOLD COMPLETE, 2026-09-13.** Both owner consults returned (`wave-3-consult-ada.md`, `wave-3-consult-lina.md`); their incorporation is itemized per-item in **§11**, and the ratification package is **§12**. Sections §1–§10 are the PRE-CONSULT draft, preserved as written **except** where a fold edit is marked inline — the draft's errors stay legible, because a record that silently absorbs its own corrections teaches nothing about how the method behaves.
**Finding**: **ROWS-ONLY on all three rules — HELD post-consult, and re-tested under a vocabulary that could have overturned it (pass 10, §6).** `wave-3-candidate-diff.patch` remains a declared no-op. But **two of the three rows' FACT BASES did not survive**: C8's artifact enumeration was missing two whole classes and mis-framed a live published surface, and C9's `scope[]` overstated an armed barrier that detects essentially nothing today. A wave can be right about "nothing to prune" and wrong about what it is recording — that is this wave, and §11 is the accounting.

> **Disclosed process inversion (the wave-2 U2 lesson, stated up front rather than conceded later)**: these rows and this assessment were drafted BEFORE the owner consults. Wave 2's R1 draft reached an identical ROWS-ONLY verdict and was **FALSIFIED by Lina's consult** (4 BLOCKING items; the roster-bounded sweep was a method defect). §6 is written to make falsification cheap: every sweep is reproducible verbatim, and every rule carries an explicit **"what would falsify this"** clause. A consult that overturns any rule here is the method working, not a defect.

---

## 1. Gates that own each rule's *what* (verified live this pass)

| Rule | Gate | Mechanical since | Verification performed this pass |
|------|------|------------------|----------------------------------|
| **C7** | `122-diff-guard` (required check) | Spec 122 Task 6.1 | Read the implementation, not the name: `tools/agent-generator/diff-guard.ts` regenerates everything into a temp tree via the same `generateAll` path real regeneration uses, then compares **bidirectionally** over `guardedRoots(repoRoot)` — a hand-edit, a stale extra, and a missing output all FAIL. Guarded roots enumerated at `generate.ts:433-450` (static substrate + cutover-ledger-derived per-agent files + `CLAUDE.md`); input-closure roots at `diff-guard.ts:36-46`; fast no-op via `canonical/generated.lock`. Matrix registration confirmed at `.github/workflows/agent-generator.yml:104-107`. **The gate owns this rule's what exactly.** |
| **C8** | **TBD — Ada adjudicates (§3.1)** | n/a | No check found that owns it. The governed artifacts are `.gitignore`d (`dist/`, `src/types/generated/`) — see §3.1 for the full fact set and the candidate dispositions. **Deliberately not settled by the steward.** |
| **C9** | `lane-functional-root` via the per-component stemma suites — **a correction to the roster** | pre-125-A (the stemma suites predate the campaign) | `src/validators/StemmaTokenUsageValidator.ts:220` defines `hexColor: /#[0-9a-fA-F]{3,8}\b/g`, flagged at `:436-452` with code `HARDCODED_COLOR`. Seven `*.stemma.test.ts` files assert `it('should not have hardcoded color values')` → `expect(colorErrors).toHaveLength(0)`. Lane inclusion **verified by execution**, not inference: `npx jest --config jest.functional.config.js --listTests` selects all 7. The roster recorded "none armed (a proposed-check row)" — that was wrong. |

---

## 2. C7 — never hand-edit 122-generated outputs

### 2.1 Sweep result: zero imposters, and zero statements of the rule

Four independent vocabulary passes over the corpus at source grain (§6 for verbatim commands) returned **no imperative statement of C7 anywhere in `.kiro/steering/`, `governance/`, `canonical/agents/`, or `canonical/shared/`.** A fifth pass (`Spec 122|spec 122|122-`) returned five hits, none about generated-output discipline.

This is a stronger result than "no imposters found." The rule is not over-taught; it is **not taught at all** at source grain.

### 2.2 Where the rule actually lives (and why that is correct)

The only imperative home is the generator's own emitted banner:

- `tools/agent-generator/adapters/cc.ts:422-425` → emits into `CLAUDE.md`: *"GENERATED FILE — do not hand-edit. … a hand-edit here will be overwritten and caught by the diff-guard."*
- `tools/agent-generator/coverage-map.ts:182` / `:193` → the same banner on `coverage-manifest.yaml` / `coverage-map.yaml`.

This is **tooling, outside the education corpus** — the wave-1 `complete-task.sh:372` echo-disclosure class, disclosed here on the same footing. It is also the *best available placement*: the warning sits on the artifact, at the moment of hazard, and cannot drift from the generator because the generator emits it.

### 2.3 Scored KEEP set (descriptive, not imperative — each supplies routing the gate cannot)

| Clause | Scoring |
|---|---|
| `canonical/shared/skills-map.yaml:23` — "`.kiro/skills/**` is a GENERATED OUTPUT of this table, same as `.claude/skills/**` — Kiro is not the source" | **KEEP.** Declarative, and it names the SOURCE. The gate says "your edit produced a delta"; it never says "the table is where you edit instead." Blade 1 fails for a cut. |
| `canonical/agents/{ada,lina,thurgood}.md:5-6` — hand-port reconciliation headers ("hand-wiring preserved, never clobbered") | **KEEP.** Provenance comments about the 122 cutover, not instructions to a future author. |
| `canonical/agents/{kenya,sparky,data,stacy,leonardo}.md:4-6` — cutover-status headers | **KEEP.** Same class. |
| `canonical/agents/_fixture.md:7` — "It sits inside C6's guarded surface: every pipeline change re-runs it on every PR" | **KEEP.** Explains WHY the fixture exists — the gate cannot teach its own test specimen's purpose. |
| `canonical/agents/stacy.md:169` — "the coverage-of-coverage audit — every guarded surface mapped to its guarding check" | **KEEP.** A routing cue for an audit, not a hand-edit rule. |

### 2.4 Education-ABSENCE hazard — recorded, NOT actioned

The register schema admits `education.disposition` values of keep / **author** / prune. Two absences are in C7's exact territory:

1. **The generated `.claude/agents/*.md` and `.kiro/agents/*.json` carry no do-not-edit banner at all.** CC agent files must open with frontmatter, so the cc adapter's banner reaches only `CLAUDE.md`. Verified: `grep -n "GENERATED\|hand-edit\|do not edit" .claude/agents/*.md .kiro/agents/*.json` → zero hits. These are the files an agent is *most* likely to open and "fix."
2. **`Civitas-System-Overview.md:41-44`** — an always-loaded identity doc — describes agent configs and prompt files without naming them generator output or routing to `canonical/**`. It is the one always-loaded surface where an author would look, and it is silent.

**Cost assessment, stated honestly rather than inflated**: both cost **friction** (a loud `122-diff-guard` failure and a redo), never a silent defeat. This is the *inverse* of wave 2's C4 hazard, where education aimed authors PAST a correctly-aimed gate. A loud gate with no education is a worse experience but a sound system; a silent gate with confident education is an unsound one.

**Not actioned here.** Authoring new education is outside a prune wave's mandate and would be its own proposal to Peter. Recorded on the row and listed as open item O-3.

**Counter-argument to my own recording of it**: one could argue this is scope creep — the campaign prunes imposters, and "the corpus is silent" is the opposite of an imposter, so it does not belong in a wave assessment at all. I record it anyway because the register's education disposition is explicitly three-valued, and a wave that scores a rule's education layer while refusing to notice the layer is empty has scored nothing.

---

## 3. C8 — never hand-edit generated token/platform outputs

### 3.1 The gate question, as framed for Ada (THE open item — deliberately unsettled)

**Question**: *Which artifacts does C8's rule actually govern, and of those, which are committed to the repo? The answer determines the row's disposition, and it is a token-domain call, not a steward call.*

Facts established this pass, offered as **inputs, not conclusions**:

1. **The primary pipeline outputs are UNTRACKED.** `.gitignore` carries `dist/` and `src/types/generated/`. Generator output paths: `scripts/generate-platform-tokens.ts:34` → `dist/`; `scripts/generate-token-types.ts:63` → `src/types/generated/TokenTypes.ts`. `git ls-files dist` and `git ls-files src/types/generated` are both **empty**.
   Consequence: no regenerate-and-diff guard *can* exist at the PR gate for them (nothing committed to diff against), and a hand-edit is **locally ephemeral** — destroyed by the next `npm run build` / `generate:*`, invisible to the repo, unable to reach `main` or a consumer.
2. **A committed residue DOES exist, and it is stale.**
   | Path | Size | Header stamp | Last touched |
   |---|---|---|---|
   | `docs/tokens.css` | 45,680 B | `Generated: 2026-03-19T16:03:08Z` | `6163cf00`, 2026-03-24 |
   | `final-verification/DesignTokens.web.css` | 41,415 B | `Generated: 2026-01-14T14:43:02Z` | `37797542`, 2026-01-14 |
   | `final-verification/DesignTokens.{web.js,ios.swift,android.kt}` | — | ~~same vintage~~ **[FOLD CORRECTION, Ada A-5]** THREE distinct stamps: `web.js` 2025-10-23, `ios.swift`/`android.kt` 2026-02-07 — an ~8-month spread | same commit |
   | `demos/tokens.css` | symlink | → `../dist/browser/tokens.css` (untracked target) | — |
   These are committed generated snapshots with no guard, no regeneration trigger, and no staleness alarm. Given PRs #150/#152/#153 changed color token source values within the last weeks, `docs/tokens.css` is ~6 months behind source and `final-verification/*` ~8 months.
3. **NOT in this class** (hand-authored source despite platform-shaped names, per their own file headers): `src/tokens/platforms/ios/MotionTokens.swift`, `src/tokens/platforms/android/MotionTokens.kt`.

**Candidate dispositions** (Ada picks, or names a fourth):

- **(A) `disposition: none, check_state: none`** — the rule has no mechanical owner because the governed artifacts are not in the repo. "Enforcement" is build ephemerality, a property of the build rather than a gate. Under the imposter test this makes every C8 prose surface education **by definition**, permanently; re-rostering C8 in a later wave would buy nothing.
- **(B) `disposition: scoped`** — barrier-eligible on the committed subset (the `docs/` + `final-verification/` snapshots) via a 122-diff-guard-pattern regenerate-and-diff guard; `none` on the untracked outputs. Requires `scope[]` per the schema.
- **(C) `check_state: proposed`** with (B)'s mechanism named but unbuilt (the `inverse-drift-incremental-build` WATCH-row pattern).

**The steward's read, offered and overridable**: (A) or (C) fits the facts, and (B) first requires Ada to rule whether those stale snapshots are in-scope artifacts at all or abandoned fixtures to delete. **Counter-argument to my own read**: if Ada judges the committed snapshots to be real consumer-facing surfaces (`docs/tokens.css` plausibly serves documentation), then (B) is not merely available but overdue, and calling it "none" would record a comfortable fiction about a surface that is demonstrably lying about token values today — which is exactly the failure class of the open dual-color-source divergence issue.

### 3.2 Sweep result: zero imposters — structurally, not incidentally

With no armed gate owning C8's *what*, the two-blade test **cannot** classify any C8 prose as an imposter. The education layer is the only layer this rule has today. The sweep still ran corpus-wide (§6) to establish the scope and confirm no armed-gate overlap.

### 3.3 Scored KEEP set

| Clause | Scoring |
|---|---|
| `Platform-Resource-Map.md:58` — "`dist/` contains build artifacts — not source files. Do not reference for implementation work." | **KEEP.** An imperative, but it governs which file an agent **READS** — no check owns that — and it is the corpus's clearest single statement of the source/output boundary. |
| `Platform-Resource-Map.md:41` (source-of-truth table), `:57` (component-meta provenance) | **KEEP.** Routing data. |
| `canonical/agents/sparky.md:57,:65`; `kenya.md:53,:62`; `data.md:66,:75` — "do NOT read the built … snapshot — it is a stale generated artifact, not the source of truth" | **KEEP.** Staleness routing, not edit discipline. Note they **independently corroborate §3.1 finding (2)**: three platform agents already carry per-agent negative cues about stale generated snapshots, which is the corpus compensating by hand for an absent guard. |
| `Rosetta-System-Architecture.md:405-429` (Stage 6 Platform Output), `Token-Semantic-Structure.md:364-399,:541` (verify-generated-output procedure) | **KEEP.** Architecture + procedure. |
| `BUILD-SYSTEM-SETUP.md:31,:121,:140,:184-188` — "Always run `npm run build` before testing generated output" | **KEEP.** Local dev-loop guidance where no gate exists at that grain — the wave-1 retained-class precedent (BUILD-SYSTEM-SETUP:188/:210 scored KEEP for the same reason). |
| `DesignerPunk-Integration-Guide.md:289-296,:1000` | **KEEP, out of territory.** A *consumer repo's* pipeline, which has no in-repo gate at all. |
| `Token-Resolution-Patterns.md:177,:208`; `Transformer-Development-Guide.md:173,:190,:265`; `MCP-Integration-Guide.md:381-404`; `DTCG-Integration-Guide.md` | **KEEP.** Illustrative code (blade-2 illustrative-use sub-rule). |

### 3.4 Adjacent gap surfaced — routed, not folded

Scoring the KEEP line `Platform-Resource-Map.md:57` surfaced a **third generated-artifact class** (the wave-2 `contract-platforms-specified` pattern — a gap found by adjudicating a KEEP line, not by hunting):

- **`component-meta.yaml`** — **39 tracked files**, produced by `scripts/extract-component-meta.ts` (`npm run extract:meta`).
- It is taught with a real **edit-prohibition imperative**: `component-meta-authoring-guide.md:55` and `:97` — *"Do not edit directly in meta file — edit the family doc and run `npm run extract:meta`."*
- It has **no regenerate-and-diff guard** (not in `guardedRoots`) and **no register row**.
- The guide simultaneously sanctions hand-editing two fields (`:34`, `:215`: "hand-edit usage/alternatives"), so a naive guard would be wrong — a partial-regeneration artifact, harder than C7's case.

Not C7 (outside `guardedRoots`), not C8 (component metadata — Lina's domain, not Ada's). **Recorded as open item O-4** so it is not lost, and offered to the 5.6 closeout's existing "are the remaining armed/unregistered rows rostered anywhere" checklist item as a sibling: this is the *unarmed*-and-unregistered direction of the same audit.

---

## 4. C9 — `no-hardcoded-color`

### 4.1 Material correction to the ratified roster

The roster (`campaign-plan.md:27`) recorded C9's owning gate as **"none armed (a proposed-check row)"**. That is **wrong**, and the wave found it by sweeping rather than inheriting:

- `src/validators/StemmaTokenUsageValidator.ts:220` — `hexColor: /#[0-9a-fA-F]{3,8}\b/g`, flagged `:436-452` as `HARDCODED_COLOR` with guidance "Use semantic color tokens instead of hardcoded hex values."
- Seven `*.stemma.test.ts` files assert it: Badge-Count-Base, Badge-Count-Notification, Badge-Label-Base, Button-Icon, Input-Checkbox-Base, Input-Radio-Base, Input-Radio-Set.
- All seven are selected by `jest.functional.config.js` (verified by `--listTests`, not inferred) → they run in **`lane-functional-root`, a required check**.

So an **armed, blocking barrier exists**. This is why the row is `scoped[]` rather than scalar: a scalar `none` would miss a live gate, and a scalar `barrier` would falsely claim 34 components' worth of coverage.

### 4.2 The scope, stated precisely (the part that matters)

| Surface | State |
|---|---|
| Web **TypeScript** implementations of **7 of 34** core components | **BARRIER, armed** |
| The other **27** components (no stemma test) | none |
| **CSS files — including the covered 7's** | none. Their CSS is asserted only for `tokenReferencesFound > 0` (that a token reference *exists*), **never for hex absence**. The most natural place to write a hex is unguarded even on the covered components. |
| **iOS / Android implementations** — the platforms `platform-implementation-guidelines.md:416` explicitly addresses | ~~none. No detector at all.~~ **[FOLD CORRECTION — FACTUALLY WRONG, Lina BLOCKING W3-2]**: the detector HAS iOS/Android color patterns; the **assertion wiring** is missing on 68 files. 3 files flag today under the existing detector. See §11 and the row's iOS/Android scope entry. |
| Token definitions, theme overrides, DTCG/Figma export, doc examples | none — literals by design. |

Coverage: ~20% of components, on one of three platforms, on one of two file types.

### 4.3 Rows-only is ENTAILED here, not merely observed

Two independent reasons, either sufficient:

1. **The committed exclusion**: C9 is the NAMED classify-only commitment — the row lands, no lint task ships in 125-B. (Carried into the roster by the `[ADA R1]` named-inclusions requirement at Task 5.1, precisely so a prior commitment could not silently drop. It did not drop.)
2. **The imposter test cannot bite**: it requires an armed gate owning the rule's what *for the surface the prose addresses*. Every prose surface found teaches all platforms and all components — ~5× wider than the armed scope line. No clause can be an imposter by construction.

### 4.4 Scored KEEP set (reasons, not a wave-through)

| Clause | Scoring |
|---|---|
| `core-goals.md:50,:53,:71` — token priority ladder, "Inform user if hard-coded values are necessary", "only as last resort, requires user approval" | **KEEP.** Teaches the ORDER and the escalation path. A presence detector supplies neither. |
| `Component-Development-Guide.md:183` — "Never use hard-coded values" | **KEEP.** The loudest imperative in C9 territory — and it is scoped to **component tokens**, where no detector runs at all. |
| `CDG:913,:1746` authoring checklists | **KEEP.** Cover icon sizing and component-token construction; the armed check reads neither. |
| `CDG:1598-1692` anti-pattern section, incl. `:1692` `getToken('color.primary') ?? '#3B82F6'` | **KEEP — and note the irony deliberately**: it teaches a silent-fallback failure mode using a hex literal that a naive presence regex would flag as the very violation it warns against. Deleting it would remove the corpus's only worked example of the subtlest C9 failure. |
| `platform-implementation-guidelines.md:410-422` — "Hardcoded values that bypass the token system are prohibited" + per-family replacements (`color.*`, `space.*`, `typography.*`, `motion.*`) | **KEEP.** The prohibition plus **which token family replaces each bypass** — the how the gate cannot supply — and it addresses iOS/Android, where nothing is armed. |
| `PIG:125,:486,:523` checklist lines | **KEEP.** Same territory, no owning gate. |
| `Web-Authoring-Standards.md:92,:235` — "There is no 'hard-code and move on' path" + product-token escalation | **KEEP.** Teaches what to do *instead* (author a product token), which is the whole answer. `:361,:373` examples KEEP. |
| `Component-Family-Chip.md:35` — "Token-first: All styling via design tokens, no hard-coded values" | **KEEP.** Family-principle statement; Chip has no stemma test, so no gate covers it. |
| `Test-Development-Standards.md:116,:138,:177` | **KEEP.** The evergreen-vs-temporary decision framework uses hardcoded-color detection as its **worked specimen**; cutting it breaks the teaching model — the wave-2 `TDS:1472` precedent exactly. `:1213,:1574` validator inventory KEEP. |
| `Token-Semantic-Structure.md:594` — names not values (`purple300` not `#9333EA`) | **KEEP.** |
| Family-doc hex in examples (`Badge:283-284`, `Icon:197-222`) | **KEEP.** Illustrative use. |

### 4.5 Cross-rule interaction, disclosed

All seven stemma color assertions open with:

```
if (!webComponentSource) { console.warn('Web component file not found, skipping test'); return; }
```

A missing file makes the assertion **pass vacuously** — a dormancy path *inside* an armed check (the register's `dormant` concept at sub-assertion grain). It is currently backstopped **by accident**: that `console.warn` is not in `src/__tests__/console-allowlist.json`, so the vacuous path reds the lane via `console-fail-root-lanes` (C6, wave 2). **An allowlist entry added later would silently remove the backstop.** Recorded on the row; flagged to Lina as open item O-5 (hers — component test surface), not fixed here.

---

## 5. Candidate prune diff (the (a) artifact) — a declared no-op

`wave-3-candidate-diff.patch` contains **zero hunks across zero files**. It is a comment-only, explicitly-declared no-op.

**Verification, reported honestly**: `git apply --check wave-3-candidate-diff.patch` returns **`error: No valid patches in input (allow with "--allow-empty")`**. That is the *correct* signal for a rows-only wave, not a defect. The green form is:

```
git apply --check --allow-empty .kiro/specs/125-B-classification-map/completion/u1b/wave-3-candidate-diff.patch   # exit 0
```

Both results verified in the worktree. Reporting only the second would have been a quiet half-truth.

**Generated/served-surface consequences**: no source surface changes → **generator leg NULL** and **docs-MCP leg NULL** (no served doc is modified; the register itself changes, and `governance/classification-map.md` IS docs-MCP-served, so the row-only PR still needs a `rebuild_index` after merge — the one live substitution consequence of an otherwise-null wave). Zero `generated.lock` delta expected; any output delta at (c) is an **anomaly finding** under 5.W(d), and this wave is the one where that rule is load-bearing by design.

---

## 6. Sweep record — reproducible verbatim (so a consult can falsify cheaply)

**Corpus at source grain, counts as-enumerated 2026-09-13** (not quoted from the roster): `.kiro/steering/*.md` = **9**; `governance/*.md` = **83**; `canonical/agents/*.md` = **9**; `canonical/shared/*.yaml` = **4**; plus `skills/` (scanned; its only hit is a `GENERATED -- do not edit` banner inside a bundled JS artifact, i.e. tooling). Generated outputs scanned as *surfaces* only, never as sources.

Every command below was run from the worktree root with `governance/classification-map.md` excluded (the register would otherwise match itself):

```
# Pass 1 — C7 edit-discipline vocabulary
grep -rniE "hand[- ]edit|never edit|do not edit|don't edit|edit (the )?canonical|regenerat" \
  .kiro/steering/ governance/ canonical/agents/ canonical/shared/ skills/

# Pass 2 — C7 generator/guard vocabulary
grep -rniE "diff-guard|122-sweep|generated output|generator output|guarded (root|surface)|\.claude/agents|generated CLAUDE|canonical/agents" \
  .kiro/steering/ governance/ canonical/agents/ canonical/shared/

# Pass 3 — source-of-truth vocabulary (C7 + C8)
grep -rniE "SSOT|source of truth|NEVER hand|by hand|hand-place|hand place|GENERATED OUTPUT" \
  .kiro/steering/ governance/ canonical/agents/ canonical/shared/

# Pass 4 — consequence vocabulary (C7 + C8)
grep -rniE "overwritten|clobber|will be lost|edit the source|source, not the output|artifact.*not.*source|build artifact|stale artifact|generated artifact|generator is|pipeline output" \
  .kiro/steering/ governance/ canonical/agents/ canonical/shared/

# Pass 5 — generic edit-prohibition imperatives (C7 + C8)
grep -rniE "do not (edit|modify|change|hand)|don't (edit|modify)|never (edit|modify)|not source files|edit(ing)? (the )?(generated|output)|manually (edit|modif)" \
  .kiro/steering/ governance/ canonical/agents/ canonical/shared/

# Pass 6 — C8 token-output vocabulary
grep -rniE "dist/|DesignTokens\.(web|ios|android)|generated (token|css|swift|kotlin)|platform output|token output" \
  .kiro/steering/ governance/ canonical/agents/ canonical/shared/

# Pass 7 — C9
grep -rniE "hard.?cod(e|ed|ing)|hex (value|literal|code)|#[0-9a-fA-F]{6}" \
  .kiro/steering/ governance/ canonical/agents/ canonical/shared/

# Pass 8 — Spec-122 mentions anywhere in the education corpus
grep -rn "Spec 122\|spec 122\|122-" .kiro/steering/ governance/

# Pass 9 — do generated agent surfaces carry any banner?
grep -n "GENERATED\|hand-edit\|do not edit" .claude/agents/*.md .kiro/agents/*.json    # -> zero hits
```

### Pass 10 — THE CHECK-WORDED RE-SWEEP (added post-consult; the wave's most important methodological correction)

**Why it exists.** Lina's consult (W3-8, BLOCKING) identified that passes 1–9 are **rule-worded**: they hunt the vocabulary of the *rule* (`hard-coded`, `hand-edit`, `hex value`). But **an imposter restates the CHECK**, and can do so without ever using the rule's noun — `- [ ] Token Usage: validateTokenUsage() passes` is an imposter-shaped clause that pass 7 could never return. Until this class was swept, **"zero imposters corpus-wide" was an unsupported claim**, and §6's own framing offers the passes as the reproducible basis for exactly that claim. This is wave 2's lesson restated at **vocabulary grain** rather than surface grain: *a wave cannot report zero imposters on a clause class its method cannot see.*

**The recipe** (run from the worktree root, `classification-map.md` excluded — it would match itself). Three vocabularies, one per rule, each naming the CHECK rather than the rule:

```
# Pass 10a — C9: the check, its validator, its error code, its suites
grep -rniE "validateTokenUsage|Stemma.*[Vv]alidator|stemma.*(test|suite)|HARDCODED_COLOR" \
  governance/ .kiro/steering/ canonical/ | grep -v classification-map.md

# Pass 10b — C7: the guard, its lock, its generator, its sweeps
grep -rniE "diff-guard|generated\.lock|agent-generator|generateAll|noop-probe|canonical-vs-truth|122-sweep|guardedRoots" \
  governance/ .kiro/steering/ canonical/ | grep -v classification-map.md

# Pass 10c — C8: the (tool-time) gate, the pipelines, the regeneration commands
grep -rniE "figma:push|TokenSyncWorkflow|drift detect|drift audit|regenerate-and-diff|extract:meta|generate:platform-tokens|generate:types|staleness check" \
  governance/ .kiro/steering/ canonical/ | grep -v classification-map.md

# Fence-parity check used to score the two structurally-riskiest hits (an UNFENCED checklist
# restating a check is the wave-2 CDS:686 imposter shape; a FENCED one is a template):
awk 'NR<=1482 && /^```/ {c++} END{print c}' governance/Test-Development-Standards.md        # -> 74 (EVEN => unfenced)
awk 'NR<1092  && /^```/ {c++} END{print c}' governance/Component-Development-Standards.md   # -> 43 (ODD  => inside a fence)
```

**Every hit scored, two-blade. RESULT: ZERO IMPOSTERS. The ROWS-ONLY verdict HELD.**

| Hit | Fence state | Blade 1 — does an ARMED gate own the rule's *what* for the surface this clause addresses? | Blade 2 — does it supply what the gate cannot? | Score |
|---|---|---|---|---|
| `TDS:1482` — "`- [ ] **Token Usage**: validateTokenUsage() passes`" | **UNFENCED** (parity 74, even) — the wave-2 `CDS:686` shape exactly | **NO.** It sits under "**For New Components**". A new component has **no** stemma suite until someone writes one; the armed assertion exists for 7 existing components only | **YES** — it is the corpus's only mechanism by which coverage gets *created at all* | **KEEP** |
| `TDS:1490` — "`- [ ] **Linting**: All validators still pass`" (For Component Updates) | unfenced | **NO** for the span it addresses: "all validators" = four validators across all components, of which only the token one is wired, on 7 of 34 | **YES** — local pre-merge dev-loop guidance (the BUILD-SYSTEM-SETUP retained class) | **KEEP** |
| `CDS:1092/:1096/:1100` — the `validator_integration` block naming `StemmaTokenUsageValidator` | **FENCED** (parity 43, odd — inside ```` ```yaml ```` at 1088–1101) | n/a | Template wearing code formatting — the wave-2 fence-fact class | **KEEP** |
| `TDS:1213`, `:1498-1512` — validator inventory + source-file cross-reference list | unfenced prose/table | NO | Routing data (where the validators live) | **KEEP** |
| `TDS:1560/:1573/:1783/:1786/:1814`, `a-vision-of-the-future.md:346` | fenced code | n/a | Illustrative use (blade-2 sub-rule) | **KEEP** |
| `TDS:1987-1989` — `npm run lint:stemma{,:naming,:tokens}` | fenced bash | NO | Command routing — **but see the accuracy defect below** | **KEEP + DEFECT FLAGGED** |
| `Badge:466`, `Chip:419` — "Stemma validator tests verifying contract compliance"; `PIG:512` | unfenced bullets | NO (neither family has a stemma suite; Chip has none at all) | Family-level testing expectation | **KEEP** |
| `DIG:498-503` | fenced | n/a | A **consumer repo's** validators — out of territory (same treatment DIG gets under C8) | **KEEP** |
| Pass 10b — `Process-Hook-Operations.md:30`, `BUILD-SYSTEM-SETUP.md:128`, `skills-map.yaml:57`, `always-set.yaml:19`, `stacy.md:190`, `_fixture.md:108` | mixed | NO — none restates the guard's *what* as an instruction | Descriptive provenance / tool routing / illustrative | **KEEP (6)** |
| Pass 10c — Figma drift block (`Figma-Workflow-Guide.md:170-185`), `component-meta-authoring-guide.md:31/:34/:55/:97/:214`, `Transformer-Development-Guide.md:343/:364`, `Platform-Resource-Map.md:57` | prose | Figma: **YES, armed at tool time** — so blade 2 decides it; component-meta: NO (no guard at all) | Figma block supplies the 3-option resolution routing incl. "if these values should be tokens, create them through the spec process first"; component-meta is the O-4 gap | **KEEP (all)** |

**Byproduct — a class worth naming: the PHANTOM-GATE CLAIM (the mirror image of an imposter).** An imposter restates a check that *exists*; a phantom-gate claim asserts a check that **does not**. Pass 10 surfaced two, neither in this wave's prune territory, both routed rather than fixed:

1. **`TDS:1987-1989` documents `npm run lint:stemma`, `lint:stemma:naming`, `lint:stemma:tokens`.** `grep stemma package.json` returns **nothing** — no such script exists. A documented command set that cannot run. → **O-9.**
2. **`Token-Governance.md:546`**: "The theme drift audit (`npm run audit:theme-drift`) **catches missing entries in CI**." The script exists (`package.json:122`) but appears in **no workflow** (`grep -rn "theme-drift\|ThemeFileGenerator" .github/workflows/` → zero hits), **and its own definition ends in `|| echo '⚠️ …'`, so it cannot fail even when run.** A prose claim of an armed gate that is neither armed nor capable of biting. Different rule (theme drift, Ada's), so out of C7/C8/C9 territory — but it is precisely the false-assurance failure the campaign exists to find. → **O-10**, and it belongs to 5.6's unregistered-rows audit as that audit's **inverse** direction: not "an armed check with no row" but "a claimed check with no arming."

I am deliberately **not** inflating these into wave findings. Neither is an imposter; neither changes a disposition. They are recorded because a sweep that notices them and says nothing has wasted the evidence.

### What would falsify each rule's ROWS-ONLY finding

Stated as concrete, checkable claims so a consult can overturn them with evidence rather than argument:

- **C7 falsifies if**: any source-grain surface carries an imperative restating "do not hand-edit a guarded output" (as opposed to naming the source or describing provenance). Passes 1–5 and 8 found none. Ada/Lina/Stacy own surfaces I may weight differently — a single counter-citation ends the finding. *Second falsifier*: if the reviewer judges `skills-map.yaml:23` or `_fixture.md:7` to be operative instruction rather than description, those become cut candidates (I scored them KEEP on the declarative/imperative line — the same line the wave-2 consult ruled on for `PIG:468`, and ruled **against** the steward's formatting-based reading).
- **C8 falsifies if**: Ada's adjudication lands on disposition **(B)** — then a gate owns the rule's what for the committed subset, and `Platform-Resource-Map.md:58` plus the three platform-agent negative cues must be **re-scored against that scope**, because a "do not reference `dist/`" line sitting beside an armed regenerate-and-diff guard is a different clause than the same line sitting alone.
- **C9 falsifies if**: Lina finds the scope line understated — e.g. another armed assertion reaching CSS or non-stemma components, or a component test I did not enumerate. My scope claim is a strong, checkable one (7 of 34, web TS only) and one counter-example narrows or widens the row.

---

## 7. Pre-committed rubric (probe AND trial — fixed BEFORE any run, contingent by design)

**Under the ROWS-ONLY finding, (b) does not run**: there is no prune to probe and nothing to trial. Per the campaign law a rows-only wave merges as a **rows-only PR, instrument-excluded (class 3 — purpose is 125-B instrumentation, the J2 precedent)**, with **no window, no A2 patterns, no probe, no trial**. The wave-4 template records the same shape.

The rubric below is pre-committed **now**, before any run, so that if a consult falsifies any rule (§6) the (b) step has a rubric that predates its own evidence — the Req 8.1 discipline, and the specific wave-2 hole (a rubric revised after seeing the candidate) that must not recur.

### 7.1 Battery task — queue checked, no live candidate; replay fallbacks named

The live queue was checked. Nothing currently queued traverses any of the three territories in a way that would score control-arm PRESENT: the open items are doc-repair and audit work (Lina's contract-education content debt, Ada's Token-Family claims-vs-source pass, the issues-dir triage, Spec 127's design outline). **Named synthetic-replay fallbacks, pre-committed:**

| Rule | Replay fallback | Why it is in territory | Confound disclosure |
|---|---|---|---|
| **C7** | **PR #106** (`e5d695bd`, 119-B U-final — batched canonical edits + the one regen) | Edits `canonical/agents/*.md` and `canonical/_fixture-output/**` then regenerates — C7 territory exactly, and it is the only recent merged task that does | Its own completion record discusses the generator; a replaying agent could read regeneration discipline downstream of the measured action (the wave-1 tooling-echo class) |
| **C8** | **PR #150** (`d17c9448`, "Fix dual color source divergence: DTCG/Figma export reads OKLCH source"); alternate **PR #153** (`6825c954`, dark-text WCAG overrides) | #150 is squarely about generated token-export correctness; #153 changes color token source values, so the loop regenerates platform outputs | #150's task is *about* an export defect, which may prime source-vs-output reasoning independent of the pruned prose — disclosed as a **strong** confound, not a weak one. If C8 ever needs a trial, prefer #153 |
| **C9** | **PR #127** (`950bcddf`, Avatar icon-size token family mislabel + family-mismatch guard) | Component token-family work | **Relevance uncertain and stated as such**: it is token-family correction, not color authoring. If the control arm does not score PRESENT, C9's line stays INFORMATIONAL (it has no prune to gate) — but under the 5.W(b) failure branch, any rule whose prune depended on an unexercised trial **leaves the wave and re-rosters**. A rule is never pruned on an unexercised trial |

### 7.2 Presence rubric (relevance and behavior SPLIT — the wave-1 R1'-C1 / wave-2 R2-2 precedent, applied pre-emptively)

| ID | Rule | PRESENT iff (mechanical, presence-shaped) |
|----|------|-------------------------------------------|
| R1'-C7 | C7 | **Relevance only**: the transcript modifies a file under `canonical/**` whose change alters a `guardedRoots` output. Full stop — no compliance conjunct |
| B'-C7 | C7 | **Scored behavior (separate, arm-comparable)**: the resulting change reaches the generated surface via the generator (regeneration run / `generated.lock` refreshed), NOT by writing bytes into a guarded root. A pruned-arm omission scores as a BEHAVIOR difference, never as irrelevance |
| R4'-C7 | C7 | IF the transcript shows a direct edit to a guarded output at any point, THEN a correction (revert + regenerate) appears before the completion signal; N/A if the trigger never occurs |
| R1'-C8 | C8 | **Relevance only**: the transcript reads or writes a path under `dist/`, `src/types/generated/`, or the committed snapshots in §3.1(2). INFORMATIONAL while C8 is rows-only; becomes a gating line only if Ada's adjudication lands on (B) and a cut follows |
| R1'-C9 | C9 | Any authored or modified implementation file introduces a color value; scored for whether it is a token reference or a literal. **INFORMATIONAL — feeds no verdict** (committed rows-only rule, wave-2 R1'-C5 class) |

**Probe reading (pre-committed)**: pilot three-leg substitution at probe grain — worktree corpus ✓; **generator leg NULL** and **docs-MCP leg NULL** under the rows-only finding (§5), both stated explicitly so a later LIVE leg is a visible change of premise rather than a silent one. Difference criteria + aggregation: pilot §2 inherited verbatim. Caps ≤5 × 2 arms × ≤2 runs; **trials serialize** (at most one in flight repo-wide); substitution integrity verified at run START and END; per-arm `--mcp-config` + `--strict-mcp-config` (the wave-1 MCP-leak guard, recipe in `wave-1-trial-diff-table.md` §1).

### 7.3 Pre-committed consequences (honored verbatim, per 5.W(b))

- **DIFFERENCE-DETECTED** → no prune as drafted; criteria tighten; the rule re-rosters.
- **MIXED / INDETERMINATE** → Peter's call. Never default-proceed. INDETERMINATE never converts to pass.
- **Relevance unmet after the named fallback** → that RULE leaves the wave and re-rosters (a 5.1-owned mechanical roster edit). A rule is NEVER pruned on an unexercised trial.
- **Rows-only holds** → the wave merges as a rows-only, instrument-excluded PR; no window opens; `rebuild_index` after merge (the register is served).

---

## 8. Wave-A1 / Wave-A2 (emitted HERE per campaign protocol §7 — frozen at wave-open; (d) consumes, never re-derives)

**Status**: under the rows-only finding these are **conditional**. Protocol §7 freezes A1/A2 at a wave's **prune merge**; a wave with no prune opens no window and consumes neither. They are emitted now because a consult-produced cut (§6) would open a window immediately, and the freeze must not be authored after the evidence.

**Wave-A1 (surfaces — 37 files across 3 rule territories; every file a wave-3 rule lives on, pruned or education-only)**

*C7 (13 source files + generated scan set)*
1. `canonical/agents/ada.md` 2. `canonical/agents/lina.md` 3. `canonical/agents/thurgood.md` 4. `canonical/agents/kenya.md` 5. `canonical/agents/data.md` 6. `canonical/agents/sparky.md` 7. `canonical/agents/leonardo.md` 8. `canonical/agents/stacy.md` 9. `canonical/agents/_fixture.md` 10. `canonical/shared/skills-map.yaml` 11. `canonical/shared/shared-catalog.yaml` 12. `.kiro/steering/Civitas-System-Overview.md` 13. `.kiro/steering/DesignerPunk-Systems-Overview.md`
— **Generated, anomaly-scan only, NEVER W2-counted** (5.W(d) rule, load-bearing this wave): `CLAUDE.md`, `CLAUDE.md.attribution.json`, `.claude/agents/*.md`, `.kiro/agents/*.{json,-prompt.md}`, `canonical/manifests/**`, `canonical/coverage-map.yaml`, `canonical/coverage-manifest.yaml`, `canonical/registry/**`, `canonical/_fixture-output/**`, `.claude/skills/**`, `.kiro/skills/**`.

*C8 (14 files)*
14. `governance/Platform-Resource-Map.md` 15. `governance/Token-Quick-Reference.md` 16. `governance/Token-Governance.md` 17. `governance/Rosetta-System-Architecture.md` 18. `governance/Token-Semantic-Structure.md` 19. `governance/BUILD-SYSTEM-SETUP.md` 20. `governance/DesignerPunk-Integration-Guide.md` 21. `governance/Token-Resolution-Patterns.md` 22. `governance/Transformer-Development-Guide.md` 23. `governance/MCP-Integration-Guide.md` 24. `governance/DTCG-Integration-Guide.md` 25. `governance/Figma-Workflow-Guide.md` 26. `governance/component-meta-authoring-guide.md` (the O-4 adjacent-gap surface — scanned, never C8-counted) 27. `governance/rosetta-system-principles.md`

*C9 (10 files as drafted; **15 after the fold** — see the A1 correction below)*
28. `.kiro/steering/core-goals.md` 29. `governance/Component-Development-Guide.md` 30. `governance/platform-implementation-guidelines.md` 31. `governance/Web-Authoring-Standards.md` 32. `governance/Component-Family-Chip.md` 33. `governance/Test-Development-Standards.md` 34. `governance/Component-Development-Standards.md` 35. `governance/Component-Family-Badge.md` 36. `governance/Component-Family-Icon.md` 37. `governance/Token-Family-Color.md`

#### A1 CORRECTION (fold, 2026-09-13 — Lina BLOCKING W3-7; applied BEFORE any freeze, which is why it is free)

The draft **swept** `canonical/agents/` under pass 7 but its C9 scored set and its A1 list contained **zero** canonical files. Five carry **live C9 imperatives**, and every one of them sits on a platform with **zero** armed coverage — a window that does not watch them would be blind to re-accretion exactly where nothing is armed. Verified by the steward this pass (`grep -niE "hard.?cod" canonical/agents/*.md` — note the case-insensitive flag: a case-sensitive grep misses `lina.md:459` because its clause capitalizes "Hard-coded", which is itself a small lesson about sweep vocabulary):

38. `canonical/agents/lina.md` (`:459` — "**Hard-coded values** — only as last resort. Requires user approval. Always flag these.")
39. `canonical/agents/kenya.md` (`:406` — "Never hard-code values that have token equivalents" — **iOS**)
40. `canonical/agents/data.md` (`:411` — same clause — **Android**)
41. `canonical/agents/sparky.md` (`:434` — same clause — **web product**)
42. `canonical/agents/ada.md` (`:326` — the cross-agent flag protocol)

All five scored **KEEP** (§11); the A1 addition is about **watching**, not scoring.

**Second tier, disclosed rather than silently dropped**: ten further files returned pass-7 hits and are not in A1 — `a-vision-of-the-future.md` (13 hits), `Product-Token-Governance.md` (3), `DTCG-Integration-Guide.md` (3), `MCP-Integration-Guide.md` (2), `cross-platform-vs-platform-specific-decision-framework.md` (1 — the sanctioned carve-out, now scored), `Token-Family-Accessibility.md`, `Test-Failure-Audit-Methodology.md`, `Rosetta-System-Architecture.md`, `Process-Spec-Planning.md`, `Figma-Workflow-Guide.md`. Their hits are predominantly illustrative hex inside code blocks, **but A1's rule as written ("every file a wave-3 rule lives on") includes them**. **Steward decision: include them.** A1 costs nothing to over-populate and its failure mode is exclusively under-inclusion — and `cross-platform-vs-platform-specific-decision-framework.md` has now been *scored*, which by the draft's own rule makes it mandatory rather than optional. A1 is therefore **52 files** (37 drafted + 5 canonical + 10 second-tier). *Counter-argument to my own decision, recorded: an over-broad A1 inflates the (d) anomaly-scan surface and can manufacture noise-hits that cost review time. I accept that cost because this wave opens no window at all (below), so the practical cost today is zero and the precedent it sets — inclusive A1 — is the one that survives contact with a real window.*

**Wave-A2 (pattern literals)** — **EMPTY, CONFIRMED POST-CONSULT AND EMPTY BY CONSTRUCTION.** A2 is defined as "the pruned imperative literals, verbatim from the ratified diff"; a no-op diff yields none. Both consults attempted falsification and neither produced a cut, so the diff remains a no-op and A2 remains unpopulated — **not because nothing scored, but because nothing was cut.**

**THE NO-MISREAD NOTE (restated at the fold, because this is the line a 5.6 reader is most likely to skim):** the closeout must **not** read A2-EMPTY as *"the patterns were scored and found zero."* **There is no pattern set to score.** That is categorically different from a pattern set that scored zero — one step further than the wave-2 R2-4 limitation ("A2 detects the STRING, not the idea"). A2-EMPTY carries **no** evidential weight about re-accretion in either direction. Ada's consult independently confirmed this caveat is "correct and load-bearing for 5.6." If a later amendment ever produces a cut on these rules, A2 is populated from the ratified diff **at that moment and before any window opens**, superseding this line by a **dated amendment**, never a silent overwrite.

---

## 9. Open items for the consult round

> **FOLD STATUS (2026-09-13)**: O-1 **CLOSED** (Ada ruled (B); §11). O-2 **CLOSED** (Lina verified + corrected; §11). O-4 **CLOSED-AND-CHARTERED** (Lina endorsed the route and took the defect — `.kiro/issues/2026-09-13-component-meta-extractor-clobbers-handedits.md`). O-5 **CLOSED** (Lina endorsed as written and took the repair). O-3, O-6, O-7 **remain open for Peter** (O-7's reading is now *confirmed* by campaign law — §12). New items **O-8 … O-11** added below.

| # | Item | Owner | Priority |
|---|------|-------|----------|
| **O-1** | **C8 gate adjudication — THE blocking item.** Which artifacts does C8 govern; of those, which are committed; therefore which disposition (A/B/C of §3.1). Includes the sub-question: are `docs/tokens.css` (6 months stale) and `final-verification/DesignTokens.*` (8 months stale) in-scope artifacts, or abandoned fixtures to delete? | **Ada** | **BLOCKING** — the row cannot ratify without it |
| **O-2** | **C9 scope[] verification.** Is "7 of 34 components, web TS only, CSS excluded, iOS/Android excluded" complete and correct? Any other armed assertion reaching color literals? | **Lina** (surface owner) + Ada (row owner) | HIGH — a wrong scope line is a register defect |
| **O-3** | **C7 education-ABSENCE** (§2.4): generated `.claude/agents/*` carry no banner; `Civitas-System-Overview.md:41-44` omits the generator-SSOT model. Author, or accept the friction? Authoring is a separate proposal to Peter, not a wave action | Thurgood proposes → **Peter** | MEDIUM |
| **O-4** | **`component-meta.yaml` — 39 tracked generated files, a real edit-prohibition imperative taught at `component-meta-authoring-guide.md:55/:97`, no guard, no register row** (§3.4). Partial-regeneration artifact (two fields sanctioned for hand-edit), so a naive guard would be wrong. Route to a register row? To 5.6's unregistered-rows audit? | **Lina** (domain) → 5.6 closeout | MEDIUM |
| **O-5** | **C9 vacuous-skip path** (§4.5): the 7 stemma color assertions pass vacuously on a missing file, backstopped only accidentally by an unallowlisted `console.warn`. A future allowlist entry silently removes the backstop | **Lina** | MEDIUM |
| **O-6** | **Roster correction, recorded**: `campaign-plan.md:27` states C9's gate as "none armed." It is armed (§4.1). Mechanical 5.1-owned roster edit, or a recorded erratum on the row alone? | Thurgood → **Peter** | LOW (the row already carries the correction) |
| **O-7** | **Rows-only wave consequences confirmation**: no window, no probe, no trial, instrument-excluded PR (class 3), `rebuild_index` after merge. Confirm this reading before (c) | **Peter** | LOW — restates settled campaign law. **FOLD: reading independently confirmed by Ada and derived from campaign law with precedent cites in §12** |
| **O-8** | **Register-schema clarification PROPOSED, not applied**: `check_state: armed` currently means "a required PR check" everywhere in the register; the C8 Figma scope entry is the first `armed` that blocks **at its point of use** (a CLI workflow), not at the gate. The distinction is stated inline on that row. Amending the register's own **Entry Schema** to define the two senses is a governance-law change to this document and belongs to Peter, not to a wave fold | Thurgood proposes → **Peter** | MEDIUM — leaving it implicit invites a future reader to conclude a PR check exists |
| **O-9** | **Phantom-gate claim**: `Test-Development-Standards.md:1987-1989` documents `npm run lint:stemma{,:naming,:tokens}`; **no such script exists** (`grep stemma package.json` → nothing). Found by pass 10 (§6). Not an imposter — the inverse class | Thurgood (TDS is a governance doc; edit rides the ballot model) → **Peter** | MEDIUM |
| **O-10** | **Phantom-gate claim, higher stakes**: `Token-Governance.md:546` says the theme drift audit "catches missing entries **in CI**". The script exists but is in **no workflow**, and its definition ends in `\|\| echo`, so it cannot fail even when run. Different rule (theme drift) — out of C7/C8/C9 territory. Belongs to **5.6's unregistered-rows audit as its INVERSE direction**: a *claimed* check with no arming | **Ada** (rule owner) → 5.6 closeout | MEDIUM |
| **O-11** | **Repo hygiene, out of wave territory** (Ada advisory A-4, steward-verified): `coverage/` is `.gitignore`d at line 17 yet **298 files are tracked in HEAD**. Pre-existing tracked-then-ignored residue | **Thurgood** | LOW |

---

## 10. Decisions required from Peter at row ratification (record-first, before any (b))

1. **Ratify the three rows** (§ register entries `never-hand-edit-122-generated`, `never-hand-edit-generated-token-outputs`, `no-hardcoded-color`) — including C9's `scope[]` shape and the roster correction it records, and including C8's **deliberately open** gate field.
2. **Accept or reject the ROWS-ONLY finding** for wave 3, after the Ada and Lina consults have had their chance to falsify it (§6). Wave 2's identical pre-consult finding was overturned; treat this one as provisional until the consults return.
3. **O-1 disposition** once Ada reports — if she lands on (B), C8's education layer re-scores against the new scope and this wave may cease to be rows-only.
4. **O-3** — author C7 education, or accept the friction on the record.

> **FOLD**: items 1–4 are superseded by §12's ratification package, which restates them against the post-consult rows. Item 3's contingency **fired** — Ada landed on (B), the education layer WAS re-scored, and it held (§11, C8-3).

---

## 11. Consult outcomes and incorporation (the fold record)

Both consults returned 2026-09-13. **Neither overturned the ROWS-ONLY verdict; both overturned parts of the fact base.** That split is the headline, and it is the *opposite* of wave 2 (where the verdict itself fell) — worth stating plainly so the campaign's record shows both failure modes have now occurred.

### 11.1 Verdicts

| Consult | On the verdict | On the facts |
|---|---|---|
| **Ada** (`wave-3-consult-ada.md`) — token-pipeline owner, C8 central | **ROWS-ONLY SURVIVES on all three rules.** Falsification attempted per §6's clauses plus three sweeps of her own (A–D): **zero counter-citations** | **The C8 fact base does NOT survive** — 3 BLOCKING on C8 + 1 BLOCKING on C9's `scope[]` |
| **Lina** (`wave-3-consult-lina.md`) — component owner, C9 scope + C7 consumption | **ROWS-ONLY SURVIVES on component surfaces** — could not falsify; C7 misrouting hunt CLEAN; C7's central cost claim falsification-TESTED and it **held** | **The C9 `scope[]` is not faithful — in the OVERSTATED direction**, which the draft's own falsification clause failed to anticipate (it anticipated only understatement). 4 BLOCKING, 5 advisory |

### 11.2 Incorporation, per item, with disposition

**Ada — BLOCKING (4/4 incorporated)**

| # | Ask | Disposition |
|---|---|---|
| A-B1 | C8 → disposition **(B) `scoped`**, five-surface `scope[]`, drop "PROVISIONAL", carry the elimination path as a pre-authorized amendment | **INCORPORATED VERBATIM-IN-SUBSTANCE.** All five classes + a sixth NOT-IN-CLASS entry (demos symlink, MotionTokens) so the boundary is checkable rather than re-derived |
| A-B2 | Add the two missed artifact classes (spec fixtures excluded-by-design; Figma Variables/Styles armed at tool time); state whether `armed` means PR-gate or point-of-use | **INCORPORATED**, with one **deviation, declared**: the PR-gate-vs-point-of-use distinction is stated **inline on the row** (`armed_semantics_note`) rather than amended into the register's Entry Schema. Reason: a schema amendment is a governance-law change to this document's own contract and belongs to Peter under the ballot model, not to a steward's wave fold. Raised as **O-8** |
| A-B3 | Rewrite C9 `scope[]` surface 1 to the detector's actual bite; record that CDG:1692's own example is a skipped form | **INCORPORATED, AND EXTENDED** — see §11.3 (the `dormant` call, which Ada did not ask for) |
| A-B4 | Record the stale-residue defect as a **new issue independent of the row**, session-paired with the divergence issue; F-1 HIGH | **INCORPORATED** → `.kiro/issues/2026-09-13-docs-tokens-css-stale-published.md`, F-1–F-4 verbatim-in-substance, HIGH, the live Pages WCAG regression named in the title line, pairing recorded, owner Ada |

**Ada — advisory (5/5 dispositioned)**: A-1/A-2 (dist/ line-number citations; stale green400 DTCG example) → recorded on the C8 row, routed to **her** queued Token-Family claims-vs-source pass, **not** wave items. A-3 (dead `rgbColor` detector at `:223`, never consumed; matters because `rgba()` is DesignerPunk's own source format) → recorded, routed to Lina/Ada jointly. A-4 (`coverage/` tracked despite `.gitignore`) → **steward-verified** (298 files) → **O-11**. A-5 (three vintages, not one) → **corrected inline in §3.1(2)** and on the row.

**Lina — BLOCKING (4/4 incorporated)**

| # | Ask | Disposition |
|---|---|---|
| W3-1 | Rewrite C9's barrier `scope[]` to the detection FORM + the external-CSS architecture fact; record the empirical zero-hit sweep | **INCORPORATED**, and taken further to `dormant` (§11.3). **One fact CONTESTED** (§11.4) |
| W3-2 | Strike "no detector at all" — the detector HAS iOS/Android patterns; the wiring is missing on 68 files; record the 3 hits + the platform-semantic-color precondition | **INCORPORATED VERBATIM-IN-SUBSTANCE**, as its own `scope[]` entry. The cost-profile point is the decision-relevant half and is stated as such |
| W3-7 | Add the five canonical agent files to Wave-A1 before the freeze; score their clauses | **INCORPORATED, AND WIDENED** — the 10 second-tier files are included too (§8 A1 correction), with my counter-argument recorded |
| W3-8 | Run the check-worded pass as **pass 10** and score its hits | **INCORPORATED** — run independently by the steward (not inherited), recipe + fence-parity verification + per-hit two-blade scoring in §6. **Zero imposters; verdict held.** Two phantom-gate byproducts routed (O-9, O-10) |

**Lina — advisory (5/5 dispositioned)**: W3-3 (the CDG:1692 irony reason is empirically false) → **clause kept, reason replaced** on the row; a wrong reason on a right disposition is still a register defect, especially one *about the detector*. W3-4 (`oklch()` and named colors undetected; rgb/hsl only in property position) → `boundary_call.rationale` softened, with the house-format point named. W3-5 (demos/READMEs/prop-passed values absent from `scope[]`) → **added as a fourth scope entry**, including the method's permanent ceiling. W3-6 (latent vs materialized) → incorporated; it favours the draft and is the strongest available evidence the KEEP-scored education is working. W3-9 (the sanctioned carve-out at `cross-platform-…:143`) → **scored KEEP** and named as the collision any future iOS/Android arming meets.

**Lina — endorsements (3)**: O-4 route-don't-fold **endorsed** + her new preservation-predicate defect chartered as `.kiro/issues/2026-09-13-component-meta-extractor-clobbers-handedits.md` (owner Lina, with the field-grain requirements her future row needs). O-3 **endorsed record-unactioned**, with amendment 1 (banner absence is **placement, not format** — cheap adapter fix, recurring context cost, both sides recorded) and amendment 2 (**the guard is ledger-conditional**; the row read as static) — both folded onto the C7 row, the second as a named `verification.guard_is_ledger_conditional` field. O-5 **endorsed as written; she takes the repair.**

### 11.3 The one call NEITHER consult proposed: C9 surface-1 `armed` → `dormant`

Both owners asked only that the surface *line* be narrowed. I went further and changed the **state**. That is a steward call on an Ada-owned row, so it is flagged loudly rather than buried, and either owner may contest it.

**The corrected joint fact base**: the check is live and blocking (7 suites, verified in `lane-functional-root` by execution twice independently) — **and it detects nothing real today.** `isInsideString` + `isCommentLine` skip every string, attribute, and comment form, leaving only unquoted template-literal CSS body lines; the 7 guarded `.web.ts` files contain **0** such lines (steward re-count; see the contest below); the real detector over all 34 `.web.ts` + every component `.css` flags **zero files**; and the styling the rule exists to police lives in the *unguarded* external `.css`.

**Why not `proposed`** (the option the fold brief offered): `proposed` means *not built*. The check is built, selected, and running. Recording `proposed` would repeat the roster's original "none armed" error with the sign flipped — and this wave's single most valuable correction was catching that error.

**Why not leave `armed`**: `armed` is a true statement about CI state and a **misleading** one about coverage. The register's own purpose is to be read as settled fact by future waves ("future waves do not re-litigate"). The field is what gets scanned; the rationale is what gets skimmed.

**Why `dormant`**: the register defines it as *"an armed, blocking check whose selection is empty or **stale** — it runs and passes while verifying nothing."* The second half describes this check exactly. The first half is where I am **extending** the term: jest selection is non-empty (7 suites), so `dormant` moves from "empty selection" to "**selection stale relative to where the governed content now lives**" — which the definition's own word "stale" admits, and which routes to the correct remediation (*re-point the assertion at the `.css` file* — the cheapest available repair) rather than the wrong one (*build a detector*). The extension is **declared on the row**, not smuggled.

**Falsification clause (on the row)**: `dormant` reverts to `armed` if any guarded `.web.ts` gains a template-literal CSS region (one such line restores real bite), or if the assertion is re-pointed at the `.css` file.

**Counter-argument to my own call, stated because it is genuinely strong**: `armed` is *mechanically verifiable* — "the check exists in a required lane and blocks" — while `dormant` requires a judgment about yield, and judgment fields drift. Worse, a reader who takes `dormant` as "no gate here" and writes a hex into a template literal gets a surprise red. And I should name my own bias: a steward who has just been handed four BLOCKING corrections is under pressure to demonstrate rigor, and "downgrade the state" is the *shape* of a decision that performs rigor. I believe the call is right on the evidence; I would not be surprised to be overruled, and being overruled here costs the wave nothing — the rationale carries the facts either way.

**No circularity**: the state change cannot affect this wave's education scoring in a self-serving direction. Blade 1 requires an **armed** gate; moving to `dormant` makes ROWS-ONLY *more* entailed, and there is no prune either way.

### 11.4 Contests (steward disagreements with a consult, raised WITH evidence)

**One contest, and it strengthens the finding it contests.** Lina (W3-1b) reported, per-file, unquoted color-declaration counts in the guarded `.web.ts` files: "Input-Checkbox-Base **2**, all others 0." I re-counted and inspected the two lines:

```
src/components/core/Input-Checkbox-Base/platforms/web/InputCheckboxBase.web.ts:420        color: 'inherit'
src/components/core/Input-Checkbox-Base/platforms/web/InputCheckboxBase.web.ts:426        color: 'inherit'
```

These are **JS object properties with quoted values**, not CSS declarations — and a color literal written there would be *inside a string*, hence skipped by `isInsideString` anyway. **The correct count is 0 of 7, not 2.** (My own first regex reproduced her count before I looked at the lines — `\s*[^'"]` lets the space itself satisfy the negated class. Recorded so the next person writing this sweep does not repeat it.)

This matters because I nearly used her "2" as the evidence *against* `dormant` — a live authoring path where the barrier bites. It is not one. **The contest removes my counter-evidence and makes her hollow-barrier finding stronger than she stated it.**

*Nothing else in either consult is contested.* Where I went beyond a consult (§11.3, and the A1 widening), it is marked as steward judgment, not as a correction of the owner.

---

## 12. Ratification package

### 12.1 Campaign-law consequences of ROWS-ONLY (the chain, stated once)

**No cut → no prune → no window → no (b) → instrument-excluded PR.** Each link, with its source:

1. **No prune.** `wave-3-candidate-diff.patch` is a declared no-op; both consults attempted falsification and neither produced a cut; pass 10 re-tested under the vocabulary that could have overturned it and found zero imposters. A rows-only wave is an explicitly **legitimate** outcome, not a failure to find something: *"a wave finding zero imposters merges rows-only"* (`campaign-plan.md:13`, the settled amendment).
2. **No window opens.** Protocol §7 freezes A1/A2 at a wave's **prune merge**; with no prune there is no freeze event and no window. (Independent of that: **no window is currently open at all** — both the wave-1 and wave-2 windows CLOSED at observation pass 3, PR #149 — so there is nothing for this PR to enter regardless.)
3. **Step (b) does NOT run.** There is no prune to probe and nothing to trial. The §7 rubric was nonetheless pre-committed **before** any evidence (the Req 8.1 discipline and the specific wave-2 hole — a rubric revised after seeing its candidate — that must not recur); it stands unused and unrevised, which is exactly what a pre-commitment is for.
4. **The PR is class-3 instrument-excluded.** `campaign-measurement-protocol.md:50` class 3: *"Any PR whose purpose is 125-B instrumentation — campaign-plan, dataset-transcription, **register-only**/roster PRs (J2 precedent)."* This PR's purpose is register rows. **Disclosed for the exclusion's own audit trail**: it also carries two `.kiro/issues/**` defect charters, which are *routed records produced by the classification*, not a separate work product — the class-3 test is "purpose is instrumentation," not "touches nothing else" (the J-C1 ruling made exactly this distinction when it INCLUDED #105 for having a spec-work-product purpose). If Peter reads the issue charters as changing the PR's purpose, the exclusion is contestable → Peter (J1/J3 pattern).
5. **Endogenous, so no segmentation.** Register/roster PRs are campaign-endogenous and do not segment the shared W1 window (methodology note 5, Peter's 2026-08-02 ruling).
6. **`rebuild_index` after merge.** `governance/classification-map.md` IS docs-MCP-served, so the register change must be reindexed. *(Distinguish from §5's probe language: the probe's **docs-MCP substitution leg** is NULL because no served doc is substituted into an arm; the served **corpus** still changed and still needs reindexing. Two different things that share a name.)*
7. **Generator leg NULL.** No `canonical/**` source changes → no regeneration, no `generated.lock` delta expected. Any output delta at (c) is an **anomaly finding** under 5.W(d) — the rule that is load-bearing precisely in a wave like this one.

### 12.2 Ratification FORM — determination: **Peter's merge, rows record-first in the PR body. NO ballot required.**

**The ballot trigger is scoped to prunes, and it does not fire here.** Campaign law, `tasks.md:263` [STACY R1]: *"**every wave prune** is a governance-law diff — record-first wave ballot always, citing the wave's ratified register rows AND recording the wave's revert path."* The trigger's subject is the **prune**, and its two mandated contents (the diff's ratification, the revert path) are both prune artifacts. With a no-op diff there is no governance-law diff to ratify and nothing to revert — the ballot would be an empty instrument.

**Register rows have always ratified at merge; only the prune ever needed a ballot.** Four precedents, all in the same direction:

| Precedent | What ratified how |
|---|---|
| **#113** (Task 5.1, `5ea404e5`) — the closest structural analogue | *"Register methodology notes: A1–A4 + campaign params recorded in `governance/classification-map.md` (steward-written; **ratified at this PR's merge**)"* (`campaign-plan.md:47`). Register content, in a `governance/` file, ratified by merge. **No ballot.** |
| `section-citation-resolution` row (PR #122) | *"**Peter ratifies the row at this PR's merge**, the ARMING remains his separate flip"* — row history, 2026-08-12 |
| `certainty-calibration` row (119-B U1) | *"the row is presented for ratification with the 119-B U1 PR and **reaches main only through Peter's ratifying merge**"* |
| **Waves 1 and 2** | Rows ratified **record-first in-session at step (a) completion**; the **PRUNE** rode a separate ballot at (c) (`2026-08-12-wave-1-workflow-gate-prune`, `2026-08-25-wave-2-component-test-gov-prune`). The split is explicit in the histories: rows one way, prune the other |

**The cleanest contrast available**: wave 2's PR (#133) carried a ballot **because it carried 5 prune hunks**. Strip the hunks and the ballot has no subject. That is wave 3.

**Also satisfied, mechanically**: `governance/**` is inside the standing Peter-merged carve-out (Task-Completion-Protocol § The Merge Rule), so the merge is a Peter act by existing law — and **record-first is satisfied by construction**: the rows are committed on the branch *before* the ratifying merge, and the PR body cites them. The record precedes the act.

**RECOMMENDATION, with its counter-argument.** Campaign law does not *require* more than the merge — but I recommend Peter additionally ratify **in-session at (a) completion**, matching waves 1 and 2 exactly, for one specific reason: this wave's rows carry **a state call (`armed → dormant`) that neither owner proposed**, plus a schema question deferred to him (O-8) and a downgraded-then-corrected fact base on two of three rows. An in-session "yes/no/amend" on those three points before the PR opens is cheap and makes the merge a confirmation rather than a first look. *Counter-argument: it is also redundant ceremony — the rows are committed, legible, and revertible, the merge is already his act under the carve-out, and adding an unrequired ratification step to a rows-only wave sets a precedent that rows-only waves need two ratifications, which is exactly the process bloat the campaign's own chafe-line tracking exists to catch. If Peter prefers merge-only, that is fully compliant and I would not re-raise it.*

### 12.3 What Peter is being asked to ratify (the three rows, plus four open decisions)

**Ratify**:
1. `never-hand-edit-122-generated` — unchanged classification (`barrier` / `armed`); amended with the ledger-conditional guard fact, the tested-and-survived cost claim + its two contingencies, and the corrected education-absence cause.
2. `never-hand-edit-generated-token-outputs` — **`none` → `scoped`**, Ada's five-class ruling, `docs/tokens.css` at `barrier`/`proposed` with a **pre-authorized elimination path to `none`**, and the inline `armed_semantics_note`.
3. `no-hardcoded-color` — `scoped` retained; surface 1 **`armed` → `dormant`** (the steward call, §11.3); iOS/Android split out with "no detector at all" struck; a fourth scope entry for demos/READMEs/prop-values; the roster correction stands.

**Decide** (each already framed with both sides): **O-3** (author C7 education, or accept the friction — now with Lina's "it's placement, not format" reframing and the recurring-context-cost counter); **O-6** (roster erratum for C9's "none armed" — mechanical 5.1 edit, or leave the correction on the row alone); **O-7** (confirm §12.1's chain); **O-8** (the `armed` PR-gate-vs-point-of-use schema clarification — proposed, not applied).

### 12.4 PR-body draft (verbatim-ready for the main session)

**Title**: `Wave 3: artifact-integrity rows (rows-only, no prune) (125-B)`

```markdown
**Spec**: 125-B-classification-map
**Task**: 5.4 Wave 3 — artifact-integrity territory (executes 5.W verbatim)
**Unit**: wave 3 (one wave = one merge unit)
**Agent**: Thurgood steward (main loop); Ada owner consult (C8 central) + Lina owner consult (C9 scope, C7 consumption)
**Completion docs on branch**: `completion/u1b/wave-3-assessment.md`, `wave-3-consult-ada.md`, `wave-3-consult-lina.md`, `wave-3-candidate-diff.patch`
**Validation**: ROWS-ONLY — no prune, so no probe and no trial (step (b) does not run; its rubric was pre-committed before evidence and stands unused). Candidate diff verified a declared no-op: `git apply --check --allow-empty` exit 0 (bare `git apply --check` returns "No valid patches in input" — the correct signal for a rows-only wave; both results reported). Register schema self-check: entry-ids unique + non-substring, `scoped` sentinel correct on both scoped rows (no top-level `check_state`/`checks`), per-scope `check_state`/`checks` present.

## Rule count + sizing (Req 10.4)

3 rostered rules — **C7** never-hand-edit-122-generated, **C8** never-hand-edit-generated-token-outputs, **C9** no-hardcoded-color (the named classify-only commitment). **ALL THREE ROWS-ONLY**: zero imposters corpus-wide across 12 sweep passes, including **pass 10**, a check-worded re-sweep added after Lina's consult established that passes 1–9 were rule-worded and structurally blind to the imposter class (an imposter restates the CHECK, not the rule). Pass 10 scored every hit two-blade; zero imposters; **the verdict held under the vocabulary that could have overturned it.**

## What the consults changed (the verdict held; two fact bases did not)

- **C8 → `scoped` (Ada's ruling, BLOCKING ×3)**: the draft's artifact enumeration missed two whole classes (deliberately-frozen spec fixtures — a naive guard would RED on them; and Figma Variables/Styles — an armed *tool-time* hand-edit gate), and mis-framed `docs/tokens.css` as possibly-abandoned residue. It is a **live published GitHub Pages surface currently serving `--color-feedback-success-text: rgba(0,255,136,1)` — green400, the value PR #152 fixed one day earlier as a WCAG AA failure.** Five-class `scope[]` adopted; the elimination path (delete the committed copy, let Pages generate it → row amends to `none`) carried on the row as a pre-authorized amendment.
- **C9 `scope[]` was OVERSTATED (Lina BLOCKING ×4)**: the armed barrier guards `.web.ts` while the styling lives in external `.css`; `isInsideString`/`isCommentLine` skip every string, attribute and comment form; the real detector flags **zero files** across all 34 components' `.web.ts` and every component `.css`. **Surface 1 moves `armed` → `dormant`** — a steward call neither owner proposed, recorded as an explicit extension of the register's `dormant` definition ("selection stale relative to where the governed content lives"), with a falsification clause. "iOS/Android have no detector at all" **struck as false** — the detectors exist unwired on 68 files, 3 currently flag.
- **C7 held** — both education-absence findings independently re-verified; the "friction, never a silent defeat" claim was falsification-TESTED by Lina and **survived**, with its two contingencies now explicit.

## Governance records riding this PR

- Register: three wave-3 rows in `governance/classification-map.md` (+ history entries recording the consult fold per row).
- **No ballot.** Campaign law requires a record-first wave ballot for **every wave PRUNE** (`tasks.md:263`); this wave has no prune, so the ballot has no subject and nothing to revert. Rows ratify at Peter's merge, record-first — the #113 precedent (register content "ratified at this PR's merge"), the `section-citation-resolution` row (PR #122) and the `certainty-calibration` row (119-B U1). `governance/**` is inside the standing Peter-merged carve-out.
- **Two defect issues chartered as routed records** (deliberately independent of the rows — each defect exists whether or not its row ratifies): `.kiro/issues/2026-09-13-docs-tokens-css-stale-published.md` (HIGH, owner **Ada**, session-paired with the dual-color-source divergence issue) and `.kiro/issues/2026-09-13-component-meta-extractor-clobbers-handedits.md` (owner **Lina**, who took the predicate repair).

## At merge

**No window opens** (no prune → no A1/A2 freeze event; both prior wave windows already closed at observation pass 3, #149). **Step (b) does not run.** This PR is **class-3 instrument-excluded** (register-only, J2 precedent) and campaign-endogenous, so it does not segment the shared W1 window. **Docs-MCP `rebuild_index` follows the merge** — `governance/classification-map.md` is served. Generator leg NULL: no `canonical/**` change, so zero `generated.lock` delta is expected and any output delta is an anomaly finding under 5.W(d).

## Open for Peter

**O-3** author C7 education or accept the friction (now reframed: the missing banner is a *placement* choice, not a format constraint — with the recurring per-session context cost recorded on the other side). **O-6** roster erratum for C9's "none armed". **O-7** confirm the rows-only consequence chain. **O-8** register-schema clarification of `armed` (PR-gate vs point-of-use) — **proposed, not applied**, because amending this document's own Entry Schema is his call, not a steward's wave fold. **O-9/O-10** two "phantom-gate claims" found by pass 10 — prose asserting checks that do not exist (`npm run lint:stemma`, absent from package.json; the theme-drift audit claimed to run "in CI", absent from every workflow and `|| echo`-guarded so it cannot fail). **O-11** `coverage/` is gitignored yet 298 files are tracked.
```
