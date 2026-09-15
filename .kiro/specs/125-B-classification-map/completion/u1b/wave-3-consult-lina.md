# [LINA CONSULT — WAVE 3 (a)]

**Date**: 2026-09-13
**Consulted on**: `.kiro/specs/125-B-classification-map/completion/u1b/wave-3-assessment.md` (DRAFT, 2026-09-13) + the three drafted rows in the working-tree `governance/classification-map.md`
**Branch state at consult**: `task/125-B-5-4-wave-3` in worktree `.claude/worktrees/wave-3a`; `governance/classification-map.md` carries **uncommitted** wave-3 row edits (+70 lines); `wave-3-assessment.md` and `wave-3-candidate-diff.patch` untracked. Consult produced **read-only** — no repo file was edited, nothing committed or pushed.
**Scope of my duty**: C9 scope verification (O-2), falsification of the ROWS-ONLY verdict on component surfaces, the component-meta routing call (O-4), C7's education-absence disposition (O-3), and O-5 (mine).

---

## VERDICT

**The ROWS-ONLY verdict SURVIVES on my surfaces — I could not falsify it.** No imposter exists on any component-governance surface I swept: every C9 clause addresses surfaces the armed check does not reach, and every C7-territory clause is descriptive or out of class. That is a clean negative result, not an absence of effort — the attempts and their commands are recorded in §A below so the negative is checkable.

**But the C9 row's `scope[]` is not faithful to reality, in the OVERSTATED direction** (the draft's falsification clause anticipated only the understated one). Four BLOCKING items, all register-accuracy, none verdict-changing. Five advisory. The component-meta routing call is ENDORSED with a sharpened defect that makes the routed issue actionable. C7's record-unactioned disposition is ENDORSED with two amendments — including a falsification attempt on its central cost claim that **failed**, which I report because a survived attempt is evidence the row should carry.

Severity counts: **BLOCKING 4 · ADVISORY 5 · ENDORSED-with-amendment 2 (O-4, O-3) · ENDORSED-as-written 1 (O-5, and I take it).**

---

## (1) C9 SCOPE VERIFICATION — [BLOCKING ×2, ADVISORY ×3]

### Numbers CONFIRMED (verified independently, not inherited)

| Claim | Verdict | Evidence |
|---|---|---|
| 7 `*.stemma.test.ts` files, named correctly | **CONFIRMED** | `find src -name "*.stemma.test.ts"` → exactly the 7 named (Badge-Count-Base, Badge-Count-Notification, Badge-Label-Base, Button-Icon, Input-Checkbox-Base, Input-Radio-Base, Input-Radio-Set) |
| 34 core components | **CONFIRMED** | `ls src/components/core` → 34 |
| Assertion + detector as quoted | **CONFIRMED** | `expect(colorErrors).toHaveLength(0)` filtered to `HARDCODED_COLOR \| INLINE_STYLE_COLOR` in all 7; detector `hexColor: /#[0-9a-fA-F]{3,8}\b/g` at `:220`, flagged `:436-452` |
| Lane inclusion (all 7 in `lane-functional-root`) | **CONFIRMED by execution** | `npx jest --config jest.functional.config.js --listTests \| grep stemma` → 7; `lane-functional-root` registered at `.github/workflows/lane-timing.yml:149-150` |
| The color assertion runs on the **web component source only** | **CONFIRMED** | all 7 pass `webComponentSource, WEB_COMPONENT_PATH` — no CSS, no iOS, no Android path reaches it |
| CSS asserted only for `tokenReferencesFound > 0` | **CONFIRMED** | `validateTokenUsage(cssSource, CSS_PATH)` → `expect(result.stats.tokenReferencesFound).toBeGreaterThan(0)`, nothing about hex absence |
| No other armed color assertion anywhere | **CONFIRMED** | `HARDCODED_COLOR` appears only in the 7 suites + the validator + its own unit tests; the other `validateTokenUsage` (CompositionPatternValidator) is a different function taking a token object, not a source scan |
| Corpus counts (9 steering / 83 governance / 9 canonical-agents / 4 canonical-shared, no governance subdirs) | **CONFIRMED** | re-enumerated |

So the roster correction (C9 IS armed) is right, the `scoped` shape is right, and the file/lane facts are right. What follows is about what the scope **line says those facts mean**.

### W3-1 [BLOCKING] — "web TypeScript implementations of the 7" materially OVERSTATES the barrier

Two independent facts, both verified by execution, either sufficient:

**(a) The detector cannot see a hex inside a string literal.** `isInsideString(line, matchIndex)` (`StemmaTokenUsageValidator.ts:350-359`) counts quotes *before the match on the same line* and skips on an odd count. Empirical probe (ran the real exported `validateTokenUsage` against synthetic lines on a `.web.ts` path):

| Input line | Errors |
|---|---|
| `        background: #FF0000;` | `INLINE_STYLE_COLOR, HARDCODED_COLOR` |
| `const FALLBACK = '#3B82F6';` | **none** |
| `const FALLBACK = "#3B82F6";` | **none** |
| `el.setAttribute('fill', '#123456');` | **none** |
| `el.style.color = '#abcdef';` | **none** |
| `const c = getToken('color.primary') ?? '#3B82F6';` | **none** |

In TypeScript a color literal is almost always inside a string. The armed detector sees only *unquoted* occurrences — i.e. template-literal CSS regions.

**(b) The guarded file architecturally holds no style declarations.** All 7 import their CSS as a string from an external file and interpolate it (`import buttonIconStyles from './ButtonIcon.web.css'` → `<style>${buttonIconStyles}</style>`; same pattern in all 7). Counting unquoted `color|background|border|fill|stroke:` declaration lines inside the guarded `.web.ts`: Badge-Count-Base 0, Badge-Count-Notification 0, Badge-Label-Base 0, Button-Icon 0, Input-Checkbox-Base 2, Input-Radio-Base 0, Input-Radio-Set 0.

Combined: the armed assertion guards the file that, by the project's own external-CSS + esbuild-string-import architecture, essentially cannot contain a color declaration — while the file that does (`.css`) is unguarded even on the covered 7. **Corroboration**: I ran the real detector over all 34 components' `.web.ts` and all component `.css` — **zero files flagged**. The barrier has no current bite anywhere.

The draft already says the CSS exclusion is "the sharpest edge." It is sharper than that: the barrier is not "20% coverage," it is a tripwire on the wrong file type. The register will be read as settled fact by future waves ("future waves do not re-litigate"), so the line must say what the check actually detects.

**Ask**: rewrite the barrier `surface` + `rationale` to state the detection FORM — *"unquoted hex / property-prefixed rgb|rgba|hsl occurrences in the 7 components' `.web.ts` files; string-literal hexes are skipped by `isInsideString` (:350-359), and these components' style declarations live in external `.css` imported as a string — the guarded file holds ~0 color declarations"* — and note the empirical zero-hit sweep as the coverage evidence.

### W3-2 [BLOCKING] — "iOS/Android … have no detector at all" is factually wrong

Assessment §4.2 and the row's second `scope[]` rationale both state this. The detector HAS platform color patterns (`INLINE_STYLE_PATTERNS.ios.color`: `Color(red:`, `Color(#`, `UIColor(`, `.foregroundColor(Color(`, `.background(Color(`; `.android.color`: `Color(0x…)`, `Color(red=`, `Color.rgb(`, `Color.argb(`), and the platform-agnostic `hexColor` regex applies to any path. Verified by probe: an unquoted hex on a `.ios.swift` or `.android.kt` path yields `HARDCODED_COLOR`; `Color(0xFFFF0000)` on `.android.kt` yields `INLINE_STYLE_COLOR`.

What is missing is **assertion wiring on 68 files** (34 `.ios.swift` + 34 `.android.kt`, all present), not a detector. The distinction is decision-relevant: the remediation is "wire existing detection," not "build detection" — an order of magnitude apart, and the row is the artifact a future arming decision will read.

**Empirical result, offered as the row's evidence**: running the existing detector over all 68 files flags **3 files today** —

- `Avatar-Base/platforms/android/AvatarPreview.kt:319` — `color = Color(0xFFFF9800) /* orange400 - warning color */` — a **genuine** hardcoded literal duplicating a token value.
- `Input-Radio-Base/platforms/ios/InputRadioBase.ios.swift:563` — `.background(Color(.systemGray6))`
- `Input-Text-Password/platforms/ios/InputTextPassword.ios.swift:336` — `.foregroundColor(Color(UIColor.secondaryLabel))`

The latter two are **platform semantic colors**, not literals — plausibly sanctioned idiom, and therefore false positives for this rule as written. So arming iOS/Android is *not* a free wiring job: it requires adjudicating the platform-system-color question first (see W3-8). That precondition belongs on the row, because "no detector at all" currently implies the opposite cost profile.

Note the illustration this hands you for free: **Input-Radio-Base is one of the covered 7** and carries an unflagged hit on an uncovered platform. The scope gap is visible inside a "covered" component.

**Ask**: replace "no detector at all" with "the detector has iOS/Android color patterns; no assertion invokes it on the 68 platform files," and record the 3-file empirical result + the platform-semantic-color precondition.

### W3-3 [ADVISORY-HIGH] — the CDG:1692 irony note is empirically false

Row + §4.4: *"it teaches a silent-fallback failure mode using a hex literal that a naive presence regex would flag as the very violation it warns against."* Probed: `const c = getToken('color.primary') ?? '#3B82F6';` → **zero errors** (three quotes precede the hex → skipped). The KEEP disposition is not merely unchanged, it is **strengthened** — the education covers a case the gate structurally cannot see. But the stated reason is wrong, and it is a claim *about the detector*, which is the one thing this row is authoritative for.

**Ask**: keep the clause, fix the reason.

### W3-4 [ADVISORY] — `boundary_call.rationale` overstates machine-detectability; `oklch()` is invisible

The row says *"A hex literal in an implementation file is machine-detectable by regex against the file's own bytes."* True for hex; the detectable set is narrower than "a color value." Probed on a `.web.ts` path:

| Form | Detected |
|---|---|
| `color: #f00;` / `background: #FF0000;` | yes |
| `background: rgb(255,0,0);` / `color: hsl(200,50%,40%);` | yes — via the `property:`-prefixed inline pattern only |
| `const c = 'rgb(255,0,0)';` | no |
| `color: oklch(0.52 0.02 200);` | **no** |
| `color: rebeccapurple;` | **no** |

`oklch()` matters specifically: it is the project's own current color source format (per the open dual-color-source divergence issue), so the one color syntax a present-day author is most likely to copy from a token definition is the one form the barrier cannot see. Worth one clause on the row — a future lint task would otherwise inherit a detector that misses the house format.

### W3-5 [ADVISORY-HIGH] — surface classes absent from `scope[]` entirely, and these are where violations are MATERIALIZED

`scope[]` enumerates three buckets (the 7's web TS / the rest + CSS + iOS + Android / token definitions, theme overrides, DTCG-Figma export, doc examples). Two live component surfaces fit none of them, and unlike component source they are **not clean**:

1. **Demo pages** (`demos/**`, tracked; explicitly my domain per Agent-Directory "demo pages"):
   - `demos/icon-base-demo.html:244,248,252,269,273,279,283` — `<icon-base color="#FF6B9D">` etc.: raw hex passed **into a component's public prop**. This is the method's ceiling and deserves a line of its own: a component prop that accepts a color string is a bypass route **no file-scanning detector can ever cover**, because the literal lives in consumer code. `Icon-Base/types.ts:257-258` documents the prop as `'inherit' | token-reference` — the demo contradicts the component's own documented contract.
   - `demos/progress-pagination-demo.html:25,28,29,35,45,46,60` — `var(--color-text-subtle, #999)`, `var(--color-action-primary, #6c5ce7)` …: **the taught silent-fallback anti-pattern, live**, in its CSS form. `#999` would be flagged by the existing detector today; nothing scans `demos/`.
2. **Component READMEs** — `Icon-Base/README.md:33` teaches `color="#A855F7"`; `Badge-Count-Notification/README.md` carries 4 hexes (value documentation). The README is a component's primary education surface and is in no wave's corpus.

Both are mine. I am not asking the wave to prune or repair them — I am asking that `scope[]` stop implying its enumeration is complete, because the row's whole function is to tell a future reader where this rule is and is not enforced.

**Ask**: add a fourth `scope[]` entry — *"component demo pages (`demos/**`), component READMEs, and color values passed into component props from consumer code: `disposition: none`, `check_state: none`; the prop-value route is undetectable by file scanning in principle"* — and route the two live instances to me.

### W3-6 [ADVISORY] — the latent-vs-materialized framing is missing, and it favours the draft

I verified: all 34 `.web.ts`, all component `.css`, and all 34 `.ios.swift` are color-literal clean; the only implementation-side hit is `AvatarPreview.kt:319`. The unguarded 80% is **compliant today**. The gap is latent risk, not live defect. Saying so costs the draft nothing and prevents the row being read as an alarm — and it is the strongest available evidence that the KEEP-scored education layer is actually working, which is the campaign's central empirical question.

---

## (2) FALSIFICATION ATTEMPT ON THE ROWS-ONLY VERDICT — [BLOCKING ×2 on SUPPORT; verdict CLEAN]

I replicated pass 7 and pass 1/5 and extended past the draft's corpus. Commands in §A. Outcome: **no counter-citation of an imposter.** Two defects in what supports the claim, though — one of them the same *shape* as wave 2's BLOCKING item, and I am obliged to raise it on the same footing.

### W3-7 [BLOCKING] — Wave-A1's C9 list omits five files carrying live C9 imperatives, all on zero-coverage platforms

Pass 7 replicated verbatim. Hits per file (excluding the register):

```
17 Component-Development-Guide · 13 a-vision-of-the-future · 9 platform-implementation-guidelines
 5 Web-Authoring-Standards · 5 Test-Development-Standards · 4 Token-Semantic-Structure
 4 Component-Family-Icon · 3 Product-Token-Governance · 3 DTCG-Integration-Guide · 3 core-goals
 2 MCP-Integration-Guide · 2 Component-Family-Badge · 1 each: cross-platform-vs-platform-specific-
 decision-framework, Token-Family-Color, Token-Family-Accessibility, Test-Failure-Audit-Methodology,
 Rosetta-System-Architecture, Process-Spec-Planning, Figma-Workflow-Guide, Component-Family-Chip,
 canonical/agents/{sparky, lina, kenya, data, ada}
```

The draft **swept** `canonical/agents/` (pass 7 names it) but its C9 KEEP table scores **zero** clauses from it and its Wave-A1 C9 list (files 28–37) contains **zero** canonical files. The unscored clauses:

- `canonical/agents/lina.md:459` — "**Hard-coded values** — only as last resort. Requires user approval. Always flag these."
- `canonical/agents/kenya.md:406`, `data.md:411`, `sparky.md:434` — "Never hard-code values that have token equivalents" — imperatives carried by the **iOS, Android and web-product agents**, i.e. exactly the platforms with zero armed coverage.
- `canonical/agents/ada.md:326` — the cross-agent flag protocol ("if you observe a component using hard-coded values … flag it as a concern for Lina").

I score all five **KEEP** — no armed gate owns any of those platforms, so blade 1 fails for a cut. The verdict is unaffected. **The A1 omission is the BLOCKING part**: A1 is frozen at wave-open, consumed by (d), and defined by the draft as "every file a wave-3 rule lives on." A window that does not watch the five surfaces carrying the platform agents' C9 imperatives is blind to re-accretion precisely where nothing is armed. Fixing it now is free; after the freeze it needs a dated amendment.

Also unlisted despite pass-7 hits (lower severity, mostly illustrative hex in code blocks — but the A1 rule as written includes them): `a-vision-of-the-future.md` (13), `Product-Token-Governance.md` (3), `DTCG-Integration-Guide.md` (3), `MCP-Integration-Guide.md` (2), `cross-platform-vs-platform-specific-decision-framework.md` (1 — see W3-8), `Token-Family-Accessibility.md`, `Test-Failure-Audit-Methodology.md`, `Rosetta-System-Architecture.md`, `Process-Spec-Planning.md`, `Figma-Workflow-Guide.md`.

### W3-8 [BLOCKING] — the C9 sweep's vocabulary structurally cannot see the imposter class

Pass 7's vocabulary (`hard.?cod(e|ed|ing)|hex (value|literal|code)|#[0-9a-fA-F]{6}`) is **rule-worded**. An imposter restates the **CHECK**, and can do so without ever using the rule's noun. Running the check-worded vocabulary (`validateTokenUsage|Stemma.*[Vv]alidator|stemma.*(test|suite)|HARDCODED_COLOR`) surfaces clauses pass 7 could never have returned:

- `Test-Development-Standards.md:1482` — "`- [ ] **Token Usage**: validateTokenUsage() passes`" — **UNFENCED** markdown checklist (last fence closes at :1451). Structurally the wave-2 `CDS:686` shape.
- `Test-Development-Standards.md:1490` — "`- [ ] **Linting**: All validators still pass`" (For Component Updates).
- `Component-Development-Standards.md:1092/1096/1100` — the `validator_integration` block naming `StemmaTokenUsageValidator` — **INSIDE a ```yaml fence** (1088–1101); the wave-2 fence-fact class, template wearing code formatting.

**My scoring, offered so the fix is cheap**: all **KEEP**. A new component has no stemma suite until someone writes one — TDS:1482 is the corpus's only mechanism by which coverage gets created at all, and it addresses components that by definition have no gate yet. CDS:1088-1101 is a fenced template. So I expect the verdict to hold. But *"ZERO imposters corpus-wide"* is not a **supported** claim until the check-worded pass has been run and its hits scored, and the draft's §6 offers its nine passes as the reproducible basis for exactly that claim. This is wave 2's finding restated at vocabulary grain rather than surface grain: the wave cannot report zero imposters on a clause class its method cannot see.

**Ask**: run the check-worded pass (command in §A), score the hits, and record it as pass 10.

### W3-9 [ADVISORY-HIGH] — the corpus's only SANCTIONED hardcode carve-out is unscored, and it is mine

`governance/cross-platform-vs-platform-specific-decision-framework.md:143` — **"When platform-native animations may use hard-coded values:"** followed by four permitted cases (platform interaction feedback, system-level animations, accessibility-driven animations, performance-critical platform APIs) and "Document rationale when choosing platform idioms over tokens."

Motion rather than color, so strictly C9-adjacent — but the draft already scores multi-family clauses into C9 (`core-goals:50/:53/:71`, `CDG:183`, `PIG:410-422` covering `color.*`/`space.*`/`typography.*`/`motion.*`). On that treatment this belongs in the scored set, and it is the **only** clause in the whole territory that *permits* hardcoding. It matters operationally, not just for completeness: it is the collision the row's `check_state: proposed` direction will hit on day one, and W3-2's two iOS hits (`.systemGray6`, `UIColor.secondaryLabel`) are that collision already materialized. Same structural shape as the component-meta gap — a partial sanction that defeats a naive guard.

### C7 falsification on component surfaces — CLEAN (reported, not assumed)

- **Edit-prohibition imperatives**: swept `src/components/**` and `application-mcp-server/**` for C7/C8 vocabulary. Zero. The only hits are `auto-generated` in prop tables (`Input-Radio-Base/README.md:204` etc., describing an `id` default) and three comments in `Badge-Count-Notification/index.ts:56-60` describing the token build pipeline. No imperative, no misdirection.
- **Misrouting hunt** (a class the draft did not look for — prose aiming authors *at* a guarded output, the wave-2 C4 hazard shape, which is worse than a missing prohibition): grepped `governance/` + `.kiro/steering/` for `.claude/agents|.kiro/agents|.claude/skills|.kiro/skills|canonical/registry|canonical/manifests|coverage-map|coverage-manifest`. Three hits, none an instruction: `MCP-Evolution-Roadmap.md:217` is a historical record of a past sweep, `DesignerPunk-Integration-Guide.md:238,:983` are a **consumer repo's** `.kiro/agents/` (out of territory, same treatment the draft gives DIG under C8). **No C7 misrouting exists in the corpus.**

---

## (3) COMPONENT-META ROUTING (O-4) — [ENDORSE the route-don't-fold call] + [one NEW defect]

**Endorsed.** It is neither C7 (outside `guardedRoots` — verified against `generate.ts:433-450`) nor C8 (component metadata, mine not Ada's). Folding it into either row would put a third artifact class under a rule whose gate does not reach it. Route to 5.6's unregistered-rows audit is the right home.

**Draft's facts, verified**: 39 tracked `component-meta.yaml` (`git ls-files` → 39); the imperative verbatim at `component-meta-authoring-guide.md:55` and `:97`; the hand-edit sanction at `:34` ("These fields may be hand-edited directly in `component-meta.yaml` when derived content is insufficient") and the workflow step at `:217`; `extract:meta` present in `package.json:98` **only** — not in any workflow, not in any hook; the four test files touching `component-meta` (app-MCP indexer/parsers/readiness, product-MCP GapDetector) test consumption, none asserts source↔output equality. **No guard, no register row: confirmed.**

**NEW DEFECT — the "naive guard would be wrong" claim is right, but for a sharper and more actionable reason.** The preservation predicate is **array LENGTH, not content**:

```
extract-component-meta.ts:343   if (existing && existing.usage.when_to_use.length > finalUsage.when_to_use.length)
extract-component-meta.ts:371   if (existing && existing.alternatives.length > alternatives.length)
```

and the usage branch swaps the **whole** usage object keyed on `when_to_use` length alone. Consequences, independent of any guard:

- A sanctioned hand-edit that **rewrites** existing `when_to_use` entries without adding one is silently clobbered by the next `npm run extract:meta`.
- A hand-edit to **`when_not_to_use` alone** is silently clobbered unless `when_to_use` happens to be longer than derived.

The guide tells authors to do exactly this at `:217` step 5 ("if `usage` or `alternatives` are too generic, hand-edit them directly"). **The guide sanctions an edit the tooling does not durably preserve.** That is a live defect on my surface today, with no guard involved.

**What the future row/guard needs (so the routed issue is actionable):**

1. **Field-grain rule statement, not file-grain.** `purpose` + `contexts` = unconditionally derived, edit the family doc. `usage` + `alternatives` = hand-editable with preservation. The row's `scope[]` carries that split — the same shape as C9's.
2. **Guard design**: regenerate-and-diff restricted to `purpose` + `contexts`, compared as **parsed YAML fields, not bytes**. Those two fields are unconditionally derived, so a field-grain compare is sound **today with no tooling change**. A byte-grain guard (the 122 pattern) is unsound while preservation is length-keyed.
3. **Precondition**: fix the preservation predicate (content-aware, or per-field) **or** document the clobber before any guard ships — otherwise the guard's green says nothing about half the file.
4. **Disposition today**: `disposition: none`, `check_state: proposed`, `owner: lina`, with the field split in `scope[]` and the preservation defect named in the rationale.

**I take the preservation-predicate defect as my own issue**, separate from this wave's PR (scope + caps), same handling as my wave-2 U1/U3 items.

**Counter-argument to my own endorsement**: one could argue folding it into C7 is better — both are "generator output with a canonical source," and a second row multiplies rows where one concept lives. I reject that because C7's row is defined by `guardedRoots` membership and its gate is `122-diff-guard`; a row whose `checks[]` describes a guard that provably does not reach the artifact would be a comfortable fiction of exactly the kind this campaign exists to remove.

---

## (4) C7 EDUCATION-ABSENCE (O-3) — [ENDORSE record-unactioned] + [2 AMENDMENTS] + [1 FAILED falsification, reported]

**Endorsed**: authoring new education is outside a prune wave's mandate; recording it on the row and routing the decision to Peter is correct. I also endorse the draft's self-counter-argument — a three-valued `education.disposition` that never notices an empty layer has scored nothing.

**Falsification attempt on the central cost claim ("FRICTION, never a silent defeat") — ATTEMPTED AND FAILED.** I report the attempt because a survived challenge is evidence the row should carry, and because the claim is load-bearing for O-3's disposition. Hypothesis: the fast no-op path could let a hand-edit through silently. Checked:

- `tools/agent-generator/sweeps/noop-probe.ts:22-25` compares **both** legs — `lock.inputClosure === inputClosure && lock.outputs === outputs`, where `computeOutputsHash` covers the guarded surface as sorted `(path, content-hash)` pairs. A hand-edit to a guarded output flips the output leg → `noop=false` → the full diff-guard runs.
- `.github/workflows/agent-generator.yml` — `on: pull_request` with **no path filter**, declared law ("Latency remedy … is caching/parallelism — NEVER path-filtering").
- All **8** agents are in `canonical/cutover-ledger.yaml` (ada, lina, thurgood, sparky, leonardo, data, kenya, stacy), so every `.claude/agents/*.md` and `.kiro/agents/*.{json,-prompt.md}` is inside `guardedRoots(repoRoot)` today.

**Claim holds.** A hand-edit to any agent file is a loud failure on the next PR.

**Amendment 1 [ADVISORY-HIGH] — the banner absence is a placement choice, not a format constraint.** §2.4(i) explains the absence as "CC agent files must open with frontmatter, so the cc adapter's banner reaches only `CLAUDE.md`." The *opening* constraint is real (verified: `.claude/agents/lina.md` opens `---\nname: lina`), but it does not prevent a banner — a comment as the first **body** line after the closing `---` is unconstrained, and `.kiro/agents/*.json` can carry a `"_generated"` key (JSON has no comments; the extra-key idiom is standard, though Kiro schema tolerance is unverified). That changes O-3's cost from "accept the friction" to "a small adapter change," which is a different decision.

Both sides on the record, since I am arguing for a change and owe the counter: a body banner is **prose the agent reads every session** — a few tokens of context per invocation, forever, on eight files, to protect against a hazard that already fails loud. Peter should decide with the true cost visible on both sides; my own lean is that the `Civitas-System-Overview.md:41-44` gap (§2.4(ii)) is the more valuable half, because it costs nothing recurring and it is the one **always-loaded** surface where an author would look before touching an agent config.

**Amendment 2 [ADVISORY] — the guard is ledger-conditional, and the row describes it as if static.** `guardedRoots(repoRoot)` derives the per-agent files from `canonical/cutover-ledger.yaml` — "from an agent's ledger entry forward." Any **future** agent whose `.claude/agents/<a>.md` exists before its ledger entry is an **unguarded** output where a hand-edit IS silent until cutover. Today N = 0, so this is a structural condition, not a current defect — but the C7 row's `checks[]` reads as though the guarded set were static, and a future ninth agent is exactly the moment someone would rely on that reading. One clause fixes it.

**Component-tier consumption angle (the reason this was routed to me)**: `.claude/agents/lina.md` and the platform agents' files are the component tier's operating instructions, and they carry real C9 content (`lina.md:459`, `kenya.md:406`, `data.md:411`, `sparky.md:434` — the same five files W3-7 shows are missing from A1). An agent that "fixes" its own routing in the generated file gets a loud failure, which is the right outcome — but it never learns *where* to fix it, because neither the file nor any always-loaded doc names `canonical/agents/**` as the source. That is the concrete shape of the harm, and it is worth one sentence on the row.

---

## (5) O-5 — C9 VACUOUS-SKIP PATH — [ENDORSE as written; MINE, and I take it]

Verified: all 7 assertions open with `if (!webComponentSource) { console.warn('Web component file not found, skipping test'); return; }`, and `src/__tests__/console-allowlist.json` (12 entries) contains **no** matching entry — the nearest is a GapDetector `console.error` pattern. So the backstop is real and accidental exactly as described: the vacuous path reds the lane via `console-fail-root-lanes` (C6), and a future allowlist entry would silently remove it.

Disposition correct — record on the row, do not fix in the wave. I take the fix: the right repair is `expect(fileExists(WEB_COMPONENT_PATH)).toBe(true)` before the guard (fail on absence rather than skip on it), which removes the dependency on an unrelated check. Note it interacts with W3-1: a component whose styles moved fully into `.css` already makes this assertion near-vacuous *without* the file being missing, so the skip path is the second-order version of a first-order problem.

---

## §A — REPRODUCIBLE COMMANDS FOR MY NEGATIVE RESULTS

Run from the worktree root. The empirical probes ran the **real exported** `validateTokenUsage` via `tsx` (the worktree has no `node_modules`; executed from the main repo against worktree paths).

```
# Pass 10 (NEW — the check-worded vocabulary pass 7 cannot see; W3-8)
grep -rniE "validateTokenUsage|Stemma.*[Vv]alidator|stemma.*(test|suite)|HARDCODED_COLOR" \
  governance/ .kiro/steering/ canonical/ | grep -v classification-map.md

# Pass 11 (NEW — misrouting hunt: prose aiming authors AT a guarded output; C7)
grep -rniE "\.claude/(agents|skills)|\.kiro/(agents|skills)|canonical/(registry|manifests)|coverage-map\.yaml|coverage-manifest\.yaml" \
  governance/ .kiro/steering/ | grep -v classification-map.md

# Pass 12 (NEW — C7/C8 vocabulary on component surfaces, outside the draft's corpus)
grep -rniE "do not (edit|modify)|don't edit|never edit|hand[- ]edit|auto[- ]?generated|GENERATED FILE|generated by" \
  src/components application-mcp-server/src --include="*.md" --include="*.yaml" --include="*.ts"

# Pass 7 replication, counted per file (W3-7's table)
grep -rniE "hard.?cod(e|ed|ing)|hex (value|literal|code)|#[0-9a-fA-F]{6}" \
  .kiro/steering/ governance/ canonical/agents/ canonical/shared/ \
  | grep -v classification-map.md | awk -F: '{print $1}' | sort | uniq -c | sort -rn

# Lane inclusion by execution (confirms the draft)
npx jest --config jest.functional.config.js --listTests | grep -c "stemma.test.ts"   # -> 7

# Materialized-violation sweep (W3-2 / W3-6): run the real detector over every component
# platform file, bucketed by covered-7 / other-27 / css / ios / android.
#   -> web.ts covered 7: 0 · web.ts other 27: 0 · css: 0 · ios.swift: 2 · android.kt: 1
```

---

## SUMMARY OF ASKS

**BLOCKING**
1. **W3-1** — rewrite C9's barrier `scope[]` to state the detection FORM (unquoted occurrences only; `isInsideString` skips string literals) and the architecture fact (styles live in the unguarded external `.css`; the guarded `.web.ts` holds ~0 color declarations). Record the empirical zero-hit sweep as coverage evidence.
2. **W3-2** — strike "no detector at all"; the detector has iOS/Android patterns, the wiring is missing. Record the 3-file empirical result and the platform-semantic-color precondition for arming.
3. **W3-7** — add `canonical/agents/{lina, kenya, data, sparky, ada}.md` to Wave-A1's C9 list **before the freeze**, and score their five clauses (I score all KEEP). Consider the ten other pass-7 files A1 omits.
4. **W3-8** — run the check-worded pass as pass 10 and score `TDS:1482`, `TDS:1490`, `CDS:1092-1100` (I score all KEEP; `TDS:*` unfenced, `CDS:*` fenced). "Zero imposters corpus-wide" is unsupported until this class is swept.

**ADVISORY**
5. **W3-3** — keep the CDG:1692 clause, fix the reason (the regex does **not** flag it).
6. **W3-4** — soften `boundary_call.rationale`; note `oklch()` and named colors are undetected, and `rgb`/`hsl` only in `property:` position.
7. **W3-5** — add a fourth `scope[]` entry for demo pages, component READMEs, and prop-passed color values (the last undetectable by file scanning in principle); route the two live instances to me.
8. **W3-6** — state that the unguarded surfaces are compliant today: latent risk, not live defect.
9. **W3-9** — score `cross-platform-vs-platform-specific-decision-framework.md:143`, the corpus's only sanctioned hardcode carve-out, and name it as the collision any future iOS/Android guard meets.

**ENDORSEMENTS**
10. **O-4** — route-don't-fold ENDORSED; record the length-keyed preservation defect (`:343`, `:371`) and the four actionability requirements; the field-grain split (`purpose`/`contexts` generated vs `usage`/`alternatives` hand-editable) is what its future row needs. I take the preservation-predicate repair as my own issue.
11. **O-3** — record-unactioned ENDORSED, with amendment 1 (the banner absence is placement, not format — cheap fix, recurring context cost, both sides on the record) and amendment 2 (the guard is ledger-conditional; the row reads as static). The "friction, never silent" claim SURVIVED my falsification attempt — record that it was tested.
12. **O-5** — ENDORSED as written; mine, and I take the `expect(fileExists(...)).toBe(true)` repair.

**Verdict restated**: ROWS-ONLY survives on component surfaces. Nothing here overturns the wave; four items say the rows must describe reality more exactly before they are ratified as the thing future waves will not re-litigate.
