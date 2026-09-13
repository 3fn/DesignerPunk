# [ADA CONSULT — WAVE 3 (a)]

**Date**: 2026-09-13
**Consulted on**: `.kiro/specs/125-B-classification-map/completion/u1b/wave-3-assessment.md` (DRAFT, 2026-09-13), the three drafted rows in `governance/classification-map.md` (uncommitted, tail), `campaign-plan.md` §5.4, `wave-3-candidate-diff.patch`
**Branch state at consult**: `task/125-B-5-4-wave-3`, worktree `.claude/worktrees/wave-3a` (verified: `git branch --show-current`, `git rev-parse --show-toplevel`); `governance/classification-map.md` carries the uncommitted wave-3 row draft (+70 lines). Consult produced read-only against tracked files; no file edited except this new consult record. Nothing committed.
**Structural precedent**: `wave-2-consult-lina.md`.

---

## VERDICT (two parts — do not collapse them)

1. **The ROWS-ONLY finding SURVIVES owner review on all three rules.** I attempted falsification per §6's clauses and found **zero counter-citations**: no imperative statement of C7's or C8's rule exists on any token-domain surface, and C9's education is structurally un-imposter-able. Wave 2's verdict was overturned; this one is not. **The candidate diff stays a declared no-op.**

2. **The C8 row's FACT BASE does not survive.** Three BLOCKING defects: the row's artifact enumeration is incomplete (two whole classes missing), and its central framing question — "in-scope artifacts, or abandoned fixtures to delete?" — is answered **neither**: `docs/tokens.css` is a **live, published, consumer-facing surface that is serving a token value the project fixed as a WCAG AA failure one day ago**. A fourth BLOCKING defect lands on C9's `scope[]`, whose barrier claim is materially wider than the detector's actual bite.

A wave can be right about "nothing to prune" and wrong about what it is recording. That is this wave.

---

## 1. O-1 — THE C8 GATE ADJUDICATION (my ruling as token-pipeline owner) — [BLOCKING]

### 1.1 Ruling, two lines

**Which artifacts**: C8 governs the Rosetta pipeline's emitted token artifacts in **five** classes, not the three the row enumerates — untracked `dist/**` + `src/types/generated/**`; the **live published snapshot `docs/tokens.css`**; abandoned `final-verification/**`; deliberately-frozen spec fixtures (**excluded by design**); and **Figma Variables/Styles** (an out-of-repo generated token output that already has a hand-edit gate). `MotionTokens.swift/.kt` are hand-authored source and out of class — CONFIRMED.

**Disposition: (B) — `scoped`**, with per-surface `check_state` (the C9 row's shape), **not** (A) and not flat (C). `disposition: none` would record a comfortable fiction about a surface that is demonstrably lying to the public today.

### 1.2 The ruled `scope[]` (what I am asking Thurgood to fold)

| Surface | disposition | check_state | Basis |
|---|---|---|---|
| `dist/**` (DesignTokens.{web.css,ios.swift,android.kt,dtcg.json,figma.json}, ComponentTokens.*, dist/browser/tokens.css), `src/types/generated/TokenTypes.ts` | `none` | `none` | Untracked (`.gitignore:7`, `:14`; `git ls-files dist` = 0, `git ls-files src/types/generated` = 0 — re-verified). No committed copy exists to diff against, so no PR-gate guard **can** exist. A hand-edit is destroyed by the next build and cannot reach `main`. Enforcement here is build ephemerality — a property of the build, **not a gate**. The steward's (A) reasoning is correct *for this class* and I adopt it verbatim. |
| `docs/tokens.css` | `barrier` | **`proposed`** | **A live published surface** (§1.3). Staleness here is silent and user-visible. Regenerate-and-diff on the 122-diff-guard pattern is the named-but-unbuilt mechanism. See the elimination path in §1.5 — this surface may be *removed* rather than guarded, which is the cheaper correct answer. |
| `final-verification/DesignTokens.{web.css,web.js,ios.swift,android.kt}` | `none` | `none` | Out of scope **pending deletion** — abandoned verification residue, zero corpus references (sweep A, §2.1). Disposition in §4. |
| `.kiro/specs/094-portable-pipeline-and-theme-registry/fixtures/pre-migration/DesignTokens.*` + `ComponentTokens.web.css`; `.kiro/specs/web-format-cleanup/baseline-DesignTokens.web.css` | `none` | `none` | **EXCLUDED BY DESIGN.** These are frozen pre-migration/baseline snapshots; their entire value is that they do **not** regenerate. Any guard MUST carry this exclusion explicitly. |
| Figma Variables + Styles (out-of-repo) | `barrier` | `armed` **(tool-time, not PR-gate)** | `npm run figma:push` drift detection blocks the sync when variables were manually edited in Figma (`Figma-Workflow-Guide.md:170-185`), with `--force` as the documented override. See B-2. |
| `demos/tokens.css` | n/a | n/a | A committed **symlink** → `../dist/browser/tokens.css` (verified). A pointer, not a generated file; editing "through" it edits untracked `dist/`, which is ephemeral. Out of class. |
| `src/tokens/platforms/ios/MotionTokens.swift`, `.../android/MotionTokens.kt` | — | — | **NOT in class — AGREE with the steward.** Re-verified from their own headers: hand-authored iOS/Android motion constants, platform-shaped names only. |

`boundary_call.class: functional` stands, and its `rationale` can drop "PROVISIONAL": output-equals-regeneration is mechanical wherever a committed copy exists, and the `scope[]` now says exactly where that is.

### 1.3 Why (A) is wrong — the fact that decides it

The row and §3.1 treat the committed residue as possibly-abandoned. For `docs/tokens.css` that is **false**, and the evidence is three independent checks:

1. **It is published.** `docs/_config.yml` → `url: "https://3fn.github.io"`, `baseurl: "/DesignerPunk"`. `docs/_layouts/default.html:8` and `docs/_layouts/deep-dive.html:8` both emit `<link rel="stylesheet" href="{{ '/tokens.css' | relative_url }}">`. Every page of the GitHub Pages showcase loads this file. 614 custom properties.
2. **It is stale by a measurable, load-bearing amount.** Last regenerated `6163cf00` (2026-03-24, "Set Up Token Dogfooding"), header stamp `Generated: 2026-03-19T16:03:08Z`. Since that commit: **19 commits touch `src/tokens/`**, **4 of them touch color token sources** (`6825c954` #153, `528120b6` #152, `71120a5d` v12.0.0 Spec 112 OKLCH migration, `73661332` Spec 104).
3. **It is serving a value that was fixed as an accessibility failure.** Source today: `color.feedback.success.text` → `primitiveReferences: { value: 'green500' }` (`src/tokens/semantic/ColorTokens.ts:103-106`), `green500` web light = `rgba(0, 204, 110, 1)`. Published file: `docs/tokens.css:443` → `--color-feedback-success-text: rgba(0, 255, 136, 1)` — that is **green400** (`docs/tokens.css:132`), the pre-#152 value. PR #152 (2026-09-12, **yesterday**) is titled *"Fix color.feedback.success.text WCAG AA failure."* The showcase is currently publishing the failing value.

That is not residue. That is the **same failure class as the open dual-color-source divergence issue** — a generated artifact asserting values the source no longer holds — on a second, public surface. The steward's own counter-argument to his own read (§3.1, "calling it 'none' would record a comfortable fiction") is the correct one, and the fact set now supports it rather than merely raising it.

**Scope honesty**: I confirmed **one** value drift by hand. I could not enumerate the full drift — this worktree has no `node_modules`, so I could not regenerate and diff. One confirmed WCAG-remediated drift plus 19 unpropagated token-source commits is sufficient to rule; the exhaustive diff is the fix's first step (§4), not the ruling's precondition.

### 1.4 Why not flat (C)

(C) — `check_state: proposed` with one unbuilt mechanism — under-describes a five-class artifact set where the classes need *opposite* treatments. A single `proposed` scalar cannot simultaneously say "guard this published file," "never guard these fixtures," and "no gate is possible for `dist/`." `scoped[]` is the only shape that does not lie about one class in order to describe another. (C) survives *inside* (B) as the `check_state` on the one guardable in-repo surface, which is exactly where I placed it.

### 1.5 Counter-argument to my own ruling — take it seriously

**(A) is genuinely defensible, and here is its strongest form**: `docs/tokens.css` may not be a "token output" at all. Its originating commit calls it *dogfooding* — a showcase-site asset that happens to have been produced by the generator. Under that reading the right move is not to register a barrier but to **delete the committed copy and have the Pages publish path generate it**. Do that, and the artifact leaves the class entirely, the last in-repo committed generated token output disappears, and the row correctly collapses to **(A) `none`** — the steward's read, arrived at by removing the exception rather than by guarding it. That is cheaper than building a guard, and I am wary of my own complexity bias here: a `proposed` barrier row is the more elaborate answer, and elaborate answers feel more rigorous than they are.

**Why I still rule (B)**: the register records the repo **as it is at ratification**, not as it will be after a fix. Today a committed generated token output is published and wrong. If the elimination path lands, the row amends to (A) with a history entry — a clean, cheap, honest transition. Recording `none` *now*, on the strength of a fix that has not happened, is the failure mode the campaign exists to prevent.

**I therefore ask the row to carry the elimination path explicitly** in the `docs/tokens.css` surface rationale: *"this surface may be eliminated rather than guarded; if the Pages build generates it, this entry amends to `none`."* Then whichever way Peter goes, the record is not surprised.

---

## 2. FALSIFICATION ATTEMPT — outcome: CLEAN (no counter-citation) — [AGREE, with two advisories]

I ran the assessment's §6 falsifiers against my surfaces plus three passes of my own.

### 2.1 Sweeps run (verbatim, worktree root, `classification-map.md` excluded)

```
# Sweep A — does any doc ROUTE readers to the stale committed snapshots as a source?
grep -rniE "docs/tokens\.css|final-verification|demos/tokens\.css" governance/ .kiro/steering/ canonical/
  -> ZERO hits.

# Sweep B — edit-prohibition imperatives in TOKEN-domain docs
grep -rniE "do not (edit|modify)|don't (edit|modify)|never (edit|modify|hand)|hand[- ]edit|manually (edit|modif)|regenerate" \
  governance/Token-*.md governance/Rosetta-*.md governance/rosetta-*.md governance/DTCG-Integration-Guide.md \
  governance/Figma-Workflow-Guide.md governance/Transformer-Development-Guide.md governance/BUILD-SYSTEM-SETUP.md \
  governance/Platform-Resource-Map.md

# Sweep C — source-of-truth / generated-artifact vocabulary, same surface set
grep -rniE "source of truth|SSOT|generated (file|output|artifact|token)|is generated|are generated|build artifact|not source" <same set>

# Sweep D — the two roster-named C8 surfaces, directly and separately
grep -niE "dist/|generated|output|hand[- ]edit|regenerat|build artifact|source of truth" governance/Token-Governance.md
grep -niE "dist/|generated|platform output|hand[- ]edit|regenerat|build artifact" governance/Token-Quick-Reference.md
```

### 2.2 Result

**Zero C8-territory imperatives on any token-domain surface.** The roster named Token-Governance and Token-Quick-Reference as C8 sweep surfaces and the assessment's KEEP set cites neither — I checked whether that was an omission. It is not. Every hit on both is descriptive architecture:

- `Token-Governance.md:235` (dimensions have cascading impact across generator output), `:249` (the pipeline generates output for registered themes), `:261` (`output: './dist/tokens'` inside a config example), `:270` (per-platform theme-aware idioms) — all declarative, none an edit rule.
- `Token-Quick-Reference.md:119` (theme-varying determination), `:137-138` (the drift-audit / skeleton commands) — routing data. `:115` ("Product teams … do NOT edit these files") is an imperative but it governs **base-source vs product-source**, not source-vs-output — out of C8's territory entirely.

**C7 falsifier**: zero. No token-domain surface states the 122 rule; I independently re-verified both education-ABSENCE claims (§3).

**C9 falsifier**: not applicable in the falsifying direction — my findings in §3 make the armed scope *narrower*, which strengthens "no clause can be an imposter by construction" rather than weakening it.

**The §6 C8 falsification clause fires but does not falsify.** §6 says C8 falsifies if I land on (B), because `Platform-Resource-Map.md:58` and the three platform-agent negative cues must then be re-scored against a real scope. I have re-scored them: **all four remain KEEP, unchanged.** PRM:58 ("`dist/` contains build artifacts — not source files. Do not reference for implementation work") governs which file an agent **reads**; the ruled barrier governs whether a **committed** file equals regeneration. Different *what*, no overlap, no imposter. The sparky/kenya/data negative cues are staleness routing about untracked `dist/` — the class I ruled `none`. The clause fired; the finding held.

### 2.3 Advisory findings from my sweeps (my surfaces, my fixes — not wave items)

- **[ADVISORY A-1] `Token-Quick-Reference.md:73` and `:87` cite `dist/DesignTokens.web.css:527` and `:559` by line number** as evidence for a token's emitted value. `dist/` is untracked: in a fresh clone or this worktree the citation is **unresolvable by construction**, and generated line numbers shift with every token addition. Not an imposter (no armed gate), but volatile content in a durable home. My surface, my fix — routing it to the already-queued Token-Family claims-vs-source pass, not to this wave.
- **[ADVISORY A-2] `DTCG-Integration-Guide.md:231`** shows `"color.feedback.success.text": { "$value": "{color.green400}" }`. Source is **green500** since #152. Same stale value as the `docs/tokens.css` defect, on a doc surface — corroborating evidence that #152 did not propagate to its documentation surfaces. My fix; same queued pass.

---

## 3. C7 AND C9 REVIEW

### 3.1 C7 — [AGREE], both absence findings ENDORSED for recording unactioned

Independently re-verified, both exact:

- `grep -l "GENERATED\|hand-edit\|do not edit" .claude/agents/*.md .kiro/agents/*.json` → **0 of 8** agent files carry a banner. `CLAUDE.md:2` and `:5` do carry it. The asymmetry is real and has the cause the assessment gives (CC agent files must open with frontmatter).
- `Civitas-System-Overview.md:41-44` — verified verbatim: describes the 8 agent configs and "a JSON config … and a prompt file" with **no** mention that they are generator output and **no** route to `canonical/**`.

**ENDORSE recording both, unactioned.** I also endorse the steward's disclosed counter-argument against himself (that noticing an empty layer is arguably scope creep) and reject it for the reason he gives: a three-valued education disposition that never reports `absent` has not scored the layer.

One amendment to the cost framing, small but worth the words: "friction, never a silent defeat" holds **because** the diff-guard's bidirectional compare covers those exact paths — the steward verified that this pass (`guardedRoots` at `generate.ts:433-450`). The cost claim is downstream of that verification, not independent of it; if a file ever left `guardedRoots`, the cost would silently become a defeat. Worth one clause on the row so the dependency is visible.

KEEP set (§2.3): **AGREE**, all five. `skills-map.yaml:23` naming the SOURCE is the strongest of them and would be a bad cut.

### 3.2 C9 — scope[] VERIFIED with one BLOCKING correction

**Verified exactly as claimed:**

| Claim | Result |
|---|---|
| `hexColor: /#[0-9a-fA-F]{3,8}\b/g` at `StemmaTokenUsageValidator.ts:220` | **CONFIRMED**, verbatim |
| `HARDCODED_COLOR` emitted with guidance "Use semantic color tokens instead of hardcoded hex values" | **CONFIRMED** (~`:436-452`) |
| **7** `*.stemma.test.ts` files | **CONFIRMED** — and the component list is exact: Badge-Count-Base, Badge-Count-Notification, Badge-Label-Base, Button-Icon, Input-Checkbox-Base, Input-Radio-Base, Input-Radio-Set |
| **34** core components | **CONFIRMED** (`ls -d src/components/core/*/ \| wc -l` = 34) |
| Assertion targets web **TS**, not CSS | **CONFIRMED** — `validateTokenUsage(webComponentSource, WEB_COMPONENT_PATH)` where `WEB_COMPONENT_PATH` = `.../platforms/web/X.web.ts`; the CSS file is asserted **only** for `expect(result.stats.tokenReferencesFound).toBeGreaterThan(0)`. The row's CSS claim is right. |
| `INLINE_STYLE_COLOR` is real, not dead | **CONFIRMED** — emitted at `:424` via `INLINE_STYLE_${category.toUpperCase()}` from `INLINE_STYLE_PATTERNS[platform].color` (`:135-143`). I initially suspected a dead filter branch; I was wrong. |
| Lane inclusion (`jest.functional.config.js` selects all 7 → `lane-functional-root`) | **NOT re-verified by me** — no `node_modules` in this worktree, so `--listTests` was unavailable. Accepting the steward's execution-verified record; flagging that I did not independently reproduce this leg. |

**[BLOCKING B-3] The `scope[]` surface-1 claim is materially overstated.** The row says the barrier covers *"web TypeScript implementations of the 7 components."* The detector's real bite is far narrower, and it is narrow by **explicit design in the code**, not by accident. Both color paths — `HARDCODED_COLOR` (`:437-441`) and `INLINE_STYLE_COLOR` (`:415-418`) — apply the same `isInsideString(line, matchIndex)` skip, the latter with the comment *"Skip if inside a string literal (likely a comment or documentation)"*; and the whole per-line loop first `continue`s on `isCommentLine` (`:396-398`).

`isInsideString` (`:350-359`) counts quotes **before the match, on that line only**, and treats an odd count as inside-a-string. In a `.ts` file a color literal can essentially only appear inside a string, a template literal, or a comment. I modelled both paths exactly and ran them:

```
skipped     this.style.color = '#ff0000';
skipped     el.setAttribute("fill", "#00ff88");
skipped     const css = `background-color: #123456;`;
skipped     const c = getToken('color.primary') ?? '#3B82F6';     <- CDG:1692's own anti-pattern
skipped     // fallback #3B82F6
FLAGGED     background-color: #ff0000;      <- multi-line template-literal BODY line
FLAGGED     color: rgba(255, 0, 0, 1);      <- multi-line template-literal BODY line
```

The barrier reaches exactly one authoring form: **a color in the body of a multi-line template literal**, where the line itself carries no preceding quote. (That form is plausible in these components — `BadgeCountBase.web.ts` contains 9 backticks — so the barrier is real, not vacuous. But it is one form, not a file.)

**Two consequences the row must carry:**
1. Rewrite surface 1 to: *"colors appearing in multi-line template-literal body position within the 7 components' `.web.ts` files; single-line string, template-literal, attribute, and comment forms are skipped by `isInsideString`/`isCommentLine` and are NOT covered."*
2. Note the sharpest instance: **`CDG:1598-1692`'s silent-fallback example is itself a skipped form.** The assessment (§4.4) keeps that clause partly on the irony that a naive presence regex would flag it. The actual detector **does not flag it** — it is inside a string. The KEEP ruling is still right, and now for a stronger reason: the corpus teaches the one C9 failure mode the armed check provably cannot see.

**[ADVISORY A-3]** `rgbColor: /rgba?\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+/gi` is defined at `:223` and **never consumed anywhere in `src/`** — a dead detector. `rgba(...)` is caught only in `color:`-family property position via `INLINE_STYLE_PATTERNS`. This matters more here than in most codebases: **DesignerPunk's own token source values are written in `rgba()` form**, so `rgba()` is the most likely literal an author would paste. Flagging rather than claiming: `src/validators/**` is in my write scope, but this validator's subject matter is component token usage — I'd want Lina's read on the domain call before anyone touches it. Route to O-2 alongside Lina's scope review.

**AGREE** on: rows-only ENTAILED for C9 (§4.3, both reasons independently sufficient); the entire KEEP set (§4.4) — `PIG:410-422` supplying the per-family replacement is the clearest "how the gate cannot supply" in the wave; the §4.5 vacuous-skip cross-rule disclosure and its routing to Lina as O-5.

---

## 4. STALE-RESIDUE DISPOSITION (task 4 — specified, NOT fixed here) — [BLOCKING that it is recorded; the fix is a separate issue]

**Ruling: yes, the residue is a DEFECT, and it is a defect independent of C8's row.** The row records classification; the defect exists whether or not the row ever ratifies. Do not let the row's disposition become the vehicle for the fix, and do not let "the row says `proposed`" become a reason the fix waits.

Recommended issue-ledger entry — **new issue file**, and I recommend **pairing its session with the open dual-color-source divergence session** (`.kiro/issues/2026-08-25-dual-color-source-divergence.md`): same failure family (a generated artifact asserting values the source no longer holds), different surface, and a reviewer holding both at once will see the pattern rather than two incidents.

| # | Artifact | Disposition | Detail |
|---|---|---|---|
| **F-1** | `docs/tokens.css` | **REGENERATE + WIRE — HIGH** | (a) Regenerate from current source and **diff the result** — that diff is the first deliverable and the honest measure of the drift I could only sample. (b) Commit the regenerated file. (c) Wire regeneration into the Pages publish path or add a CI staleness check, so it cannot silently re-stale. **Do NOT simply delete** — it is load-bearing for the published showcase. **Alternative preferred if it is clean** (see §1.5): make the Pages build generate it and drop the committed copy, which eliminates the artifact class and amends C8's row to (A). |
| **F-2** | `final-verification/DesignTokens.{web.css,web.js,ios.swift,android.kt}` | **DELETE — MEDIUM** | Zero corpus references (sweep A). Vintages: `web.js` 2025-10-23, `ios.swift`/`android.kt` 2026-02-07, `web.css` 2026-01-14 — completed-spec verification residue, not a fixture anyone reads. Deleting removes the guard question entirely. |
| **F-3** | `.kiro/specs/094-.../fixtures/pre-migration/*`, `.kiro/specs/web-format-cleanup/baseline-*` | **KEEP, mark EXCLUDED — LOW** | Deliberate frozen snapshots. Record the exclusion now, in the row, so a future guard author does not "fix" them. |
| **F-4** | `demos/tokens.css` symlink | **KEEP — LOW (note only)** | Correct by construction. Note the consequence: `demos/` is broken in a fresh clone until `npm run build`, which is the known worktree-needs-generated-artifacts class, not a C8 defect. |

**[ADVISORY A-4, out of my territory]** `coverage/` is listed in `.gitignore:17` yet **298 files are tracked in HEAD** (`git ls-tree HEAD coverage/` confirms). Pre-existing tracked-then-ignored residue. Not token output, not C8 — routing to Thurgood as repo hygiene, mentioned only because I found it while enumerating tracked generated artifacts.

---

## 5. CORRECTIONS TO THE ASSESSMENT'S FACT SET

- **[BLOCKING B-1]** §3.1(2)'s table and the row's `gate_adjudication` **omit two artifact classes**: (i) the **spec fixtures** of §1.2 — a naive regenerate-and-diff guard over "committed generated token outputs" would RED on them, which is the strongest concrete argument against the steward's own (B) sketch and is currently absent from the record; (ii) **Figma Variables/Styles** — see B-2.
- **[BLOCKING B-2] Figma Variables/Styles are a generated token output class with an existing hand-edit gate, and the assessment does not mention them at all.** Pipeline: `Figma-Workflow-Guide.md:125-132` (Rosetta TS → DTCG → FigmaTransformer → `dist/DesignTokens.figma.json` → TokenSyncWorkflow → Figma Variables + Styles). Gate: `:170-185` — the workflow compares current Figma state against expected and **blocks the sync** on drift ("3 variables have been edited in Figma since last push"), with `--force` as the documented override (`:140-141`) and a three-option resolution block (`:181-185`). This is C8's rule, armed, on a non-repo surface. **It is not an imposter** — `:172-185` *describes the mechanism and supplies the resolution routing* (including "if these values should be tokens, create them through the spec process first," which the gate cannot say), the retained-teaching class. Two asks: add the surface to `scope[]`, and have the register state whether `check_state: armed` means *blocks at the PR gate* or *blocks at its point of use* — this row is the first to need the distinction, and leaving it implicit invites a later reader to conclude a PR check exists.
- **[ADVISORY A-5]** §3.1(2)'s table says `final-verification/DesignTokens.{web.js,ios.swift,android.kt}` are "same vintage" as the 2026-01-14 `web.css`. They are not: `ios.swift`/`android.kt` stamp **2026-02-07**, `web.js` stamps **2025-10-23**. An ~8-month spread, not a single vintage. Immaterial to the ruling; material to a record that other waves will cite.
- **[AGREE]** §3.1(1) verified exactly — `.gitignore:7` `dist/`, `:14` `src/types/generated/`; both `git ls-files` empty; generator output paths as cited.
- **[AGREE]** §3.4's `component-meta.yaml` adjacent gap and its routing to Lina/O-4: correct, and correctly **not** folded into C8. Component metadata is not a token output.

---

## 6. ROWS-ONLY CONSEQUENCES (O-7) — [AGREE]

No window, no A2 patterns, no probe, no trial; rows-only instrument-excluded PR (class 3, the J2 precedent); `rebuild_index` on the docs MCP after merge because `governance/classification-map.md` is served. The §5 both-results disclosure of `git apply --check` (bare error, `--allow-empty` green) is the right call — reporting only the green form would have been the quiet half-truth the campaign keeps catching elsewhere. §8's A2-EMPTY caveat ("no pattern set to score ≠ a pattern set that scored zero") is correct and load-bearing for 5.6.

The §7 rubric is pre-committed before evidence and I have no changes to it. One note on §7.1's C8 replay fallback: the confound disclosure prefers #153 over #150, which is right — but if C8 ever does need a trial, note that **#152** is now the sharper specimen, since its fix is the exact value the published snapshot is still contradicting.

---

## SUMMARY OF ASKS

**BLOCKING (4)**

1. **C8 → disposition (B) `scoped`** with the five-surface `scope[]` of §1.2; drop "PROVISIONAL" from `boundary_call.rationale`; carry the §1.5 elimination path in the `docs/tokens.css` rationale so an amendment to (A) is pre-authorized rather than surprising.
2. **Add the two missed artifact classes** to the row's fact set: spec fixtures (**excluded by design** — a naive guard would red on them) and **Figma Variables/Styles** (armed at tool time). State in the register whether `armed` means PR-gate or point-of-use.
3. **Rewrite C9 `scope[]` surface 1** to the detector's actual bite (multi-line template-literal body position only; `isInsideString`/`isCommentLine` skip every other form), and record that **CDG:1692's silent-fallback example is itself a skipped form** — which strengthens its KEEP rather than weakening it.
4. **Record the stale-residue defect** (§4, F-1–F-4) as a **new issue, independent of the row**, session-paired with the dual-color-source divergence issue. F-1 is HIGH: a published surface is serving a value fixed yesterday as a WCAG AA failure.

**ADVISORY (5)**

5. A-1 / A-2 — `Token-Quick-Reference.md:73,:87` dist/ line-number citations; `DTCG-Integration-Guide.md:231` stale green400 example. My surfaces, my fixes, routed to the queued Token-Family claims-vs-source pass. Not wave items.
6. A-3 — dead `rgbColor` detector at `StemmaTokenUsageValidator.ts:223`; `rgba()` is the format DesignerPunk's own token sources use. Route to O-2 with Lina.
7. A-4 — `coverage/` tracked despite `.gitignore:17` (298 files). Thurgood, repo hygiene, out of territory.
8. A-5 — correct §3.1(2)'s "same vintage" claim (three distinct stamps spanning ~8 months).
9. C7 — add one clause noting that the "friction, never a silent defeat" cost claim is **contingent on those paths staying inside `guardedRoots`**.

**ENDORSED AS DRAFTED**

10. ROWS-ONLY on all three rules — **falsification attempted per §6, zero counter-citations, verdict holds.** Candidate diff stays a declared no-op.
11. C7's two education-ABSENCE findings — recorded unactioned, and the steward's self-counter-argument correctly rejected. Both claims independently re-verified.
12. C7 KEEP set (all five); C9 KEEP set (§4.4) and the §4.5 vacuous-skip disclosure routed to Lina; §3.4 `component-meta.yaml` routed to Lina, correctly not folded into C8.
13. MotionTokens.swift/.kt NOT in class — confirmed from their headers.
14. Rows-only consequences (O-7) and the §7 pre-committed rubric — unchanged.

**Item counts** — BLOCKING **4**, advisory **5**, endorsed-as-drafted **5**.

*Nothing in this consult was applied. The assessment, the register, and the patch are untouched; Thurgood folds after both consults.*
