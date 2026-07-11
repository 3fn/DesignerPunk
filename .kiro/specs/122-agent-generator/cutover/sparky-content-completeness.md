# Sparky cutover — content-completeness check (U5 merge-gate artifact)

**Date**: 2026-07-11
**Generated**: `.claude/agents/sparky.md` on `task/122-cutover-sparky` (generator-emitted — the FIRST CC port of this seat)

> **NOT a diff-against-baseline.** Sparky was NEVER CC-ported — there is no current
> `.claude/agents/sparky.md` to diff against (that absence IS the 122 condition his
> first-generation cutover exercises). The merge gate is therefore a **content-completeness
> check**: the generated CC output must cover (a) canonical source and (b) his supplied
> input-of-record (8 verified commands + 3 named gaps) with **zero unexplained omissions**.
> A named gap present-as-gap is COMPLETE, not an omission (Req 21 AC1). The channel-move
> bucket rule does not apply (no diff); the omissions gate + C7 + the independent validation
> signature govern (Req 21 AC5 — mandatory Stacy trigger for a first-generation cutover).

## (a) Canonical-source coverage — every frontmatter class rendered

| Canonical class | Rendered in generated CC output? |
|---|---|
| 3 governance-as-law embeds (product-token-governance § "System-First Value Selection"; web-authoring-standards § "Hard Rules"; contract-system-reference § "Naming Convention") | ✅ all three inline in `## Ambient (per-agent)`, verbatim, C7 class (a) VERIFIED (all predicates hold live) |
| ground-truth `none-trim-stale-snapshots` verdict (3 dist-CSS trims) | ✅ `## Ground truth` section renders all 3 trim negatives VERBATIM + namespaced replacement tool (sweep-8 K-D1 PASS) |
| 5 doc routes | ✅ rendered in `## Routing` (sweep-1 live-resolved) |
| 1 agent route (leonardo, `not-yet-ported`) | ✅ rendered in `## Routing` |
| 7 capability cues + 9 demotion `replaces:` cues | ✅ rendered in `## Routing` (sweep-8 PASS: all 9 doc removals covered; the 3 trims covered by the trim cues' `replaces:`) |
| 8 commands + 3 gap entries | ✅ rendered in `## Commands` (see table (b)) |
| writeScope (specs-only) | ✅ `## Write scope` note (facet-7 enforcement options named) |
| kiro.agentSpawn | ✅ `## Pre-flight` |
| skills [] / knowledgeBases [] | ✅ correctly render nothing (no `## Knowledge fallback`) |
| pass-through body | ✅ identity (Sarah Parks), domain boundaries, 2 operational modes, collaboration model, token consumption, platform currency, web-specific guidance, MCP practice notes, collaboration standards, testing — all carried |

## (b) Input-of-record coverage — 8 commands + 3 named gaps (zero unexplained omissions)

Source: `feedback/requirements.md` § "[SPARKY R1]"; command strings verified against `package.json` (C7 class (d) — all 8 `this-repo` script names resolve; the consumer-repo + per-product entries carry non-empty run-context annotations).

| # | Input-of-record item | Kind | Present in generated CC? |
|---|---|---|---|
| 1 | `npm run build` (full web build) | command | ✅ |
| 2 | `npm run build:browser` (gzipped-bundle soft ceiling) | command | ✅ (ceiling SOURCE-routed to `scripts/build-browser-bundles.js`, NOT a hard `125KB` literal — SP-D1 drift avoidance) |
| 3 | path-scoped web tests | command | ✅ `npm test -- src/components/` |
| 4 | `npm test` (full suite) | command | ✅ |
| 5 | `npm run lint` | command | ✅ |
| 6 | `npm run serve` (static, port 8001, demo pages, `file://` caveat) | command | ✅ (port + `file://` caveat in cue; volatile "24 demo pages" count dropped — SP-D1) |
| 7 | `npm run test:consumer` | command | ✅ |
| 8 | `npx designerpunk generate` (consumer-side) | command | ✅ `runContext: consumer-repo`, annotation rendered |
| G1 | **NO dev server** (`build:watch` tsc-only — never generate a dev-server cue) | named gap | ✅ present-as-gap (`class: web-dev-server`); the SP-D2 intentional-and-unguarded absence |
| G2 | no web-only test lane (path selection is the honest form) | named gap | ✅ present-as-gap (`class: web-test-lane`) |
| G3 | product-screen commands are per-product, unextractable here | named gap | ✅ present-as-gap (`class: product-screen-commands`, `runContext: per-product`) |

**Omissions gate: ZERO unexplained omissions.** Every input-of-record item is present; all 3 named gaps are present-as-gaps (valid authored content, Req 21 AC1). No dev-server cue was generated (Req 21 AC1 — the gate did not pressure fabrication).

## Acceptance signals (design C10.2 § Sparky)

| Signal | Predicted | Measured | Verdict |
|---|---|---|---|
| Lock-set == pinned set (`per-agent-ambient-design.md` § Sparky) | product-token-governance + web-authoring-standards + contract-system-reference | per-agent members == those 3 | ✅ |
| ground-truth verdict = none-trim-stale-snapshots; 3 dist-CSS snapshots trimmed | trims not ambient; negatives emitted | verdict honored; 3 trims rendered; dist CSS GONE from Kiro `resources` | ✅ |
| \|union\| | always-set 9 + 3 | **12** | ✅ |
| \|per-agent members\| | 3 | **3** | ✅ |
| Both targets agree | equal member sets | cc == kiro (id-set equality) | ✅ |
| Observed baseline (committed `sparky.json` at cutover) | ~21 resources | **21** (deduped; `Product-Token-Governance` was double-loaded — fixed by construction) | ✅ |
| Shrink | 3 trims + doc demotions | **12 removals** (3 trims + 9 docs), each covered | ✅ |
| **Dev-server absence (SP-D2)** | recorded **intentional-and-unguarded** | the `web-dev-server` gap entry is a DECISION, not an oversight; nothing asserts the absence stays true, and that is by design — distinguished from a coverage gap so a later reviewer does not read the missing guard as an omission | ✅ (intentional-and-unguarded) |

## Firsts at this cutover

- **First FIRST-GENERATION cutover** (never CC-ported) — content-completeness check replaces the diff-against-baseline; content-before-catalog (his 8+3 authored BEFORE the catalog generated, Req 21 AC2).
- **First `none-trim-stale-snapshots` verdict** — the trims render leg (render.ts `renderGroundTruthTrims` + both adapters) was implemented at this cutover (the leg Lina's U3 flagged as unimplemented); sweep-8 K-D1 verifies each trim negative appears verbatim in the emitted CC text.
- **First all-three-MCP consumer** (docs + application + product grants).
- **First three-entry law lock.**

## Validation signatures (independent-validation default, amendment 4 — mandatory first-generation trigger)

**Owning seat — Sparky (content confirmation, 14.1):**
> [SPARKY(seat) — U5 content confirmation] CONFIRMED — 2026-07-11
> (First-generation NOTE: no pre-existing `sparky` subagent could self-review — this cutover
> creates his first CC port — so this is a fresh-context seat stand-in operating under his
> canonical source, NOT a self-review. Findings: all 3 law embeds verbatim + right reflexive
> sections for daily web work (Hard Rules governs every CSS file, System-First every token
> decision, Naming Convention prevents silent taxonomy fragmentation); 3 embeds appropriate
> for a consumer, not heavy. Ground-truth trims correct — independently measured
> demo-styles.css = **0 token definitions** (confirming demo-chrome), DesignTokens.web.css =
> 687 / ComponentTokens.web.css = 33 real stale snapshots. All 8 command strings match
> package.json; build:browser gzip-ceiling source-routing ruled the correct anti-drift call.
> All 3 gaps honest (build:watch verified tsc-only; no web-only Jest lane exists). All-3-MCP
> subset serves the consumer seat. Body complete; nothing material lost (MCP Usage→Practice
> Notes; /knowledge KB table → Grep/Glob fallback; hotkeys correctly absent). Every merge-gate
> "present in generated CC" claim independently grepped and TRUE. Zero disputes.)

**Independent validation — Stacy (mandatory first-generation trigger, Req 21 AC5):**
> [STACY — U5 Sparky cutover validation] CONFIRMED — independent re-derivation + coverage-of-coverage; 2026-07-11
> (State: `task/122-cutover-sparky` @ `e7c47830`; working tree only cutover/completion docs, no
> artifact drift. Her checks: diff-guard no-op-green; canonical-vs-truth clean; sweep-4 PASS
> non-vacuous (both sparky manifests in scope, 12 members each); sweep-8 PASS; coverage-map
> PASS (256/255/1); lane **326/326**; **lock-independent generateAll→compareTrees — all 8
> sparky outputs byte-IDENTICAL**. **sweep-8 K-D1 fault-injection (the load-bearing proof for
> the new trims leg): mangled trim[0]'s negative → sweep-8 FAILED exit 1 naming
> `sparky @ groundTruthManifest.trims[0] (dist/web/DesignTokens.web.css)` → restored → PASS.
> The unconditional-trim leg bites.** Signals re-derived: baseline 21 (sole dup
> product-token-governance), union 12, per-agent 3 == pinned lock-set, cc==kiro, 12 removals
> = 3 trims + 9 docs each replaces-covered, dist CSS trimmed from Kiro config by construction.
> Trim rationale independently measured: demo-styles.css = **0** token defs → search_tokens;
> DesignTokens = **687**, ComponentTokens = **33** → get_token_details (discovery-vs-detail
> discriminator correct). Content-completeness: ZERO unexplained omissions — all 8 commands +
> 3 gaps-as-gaps + 3 law embeds present (grepped); 125KB/24-demo-pages volatile literals
> correctly dropped. Two-absence-correctness confirmed (no diff artifact = correct for
> never-ported; no faithfulness verbs = correct for a negative-cue verdict). First-generation
> coverage: seat stand-in + her load-bearing independent gate = SUFFICIENT (her gate did not
> lean on the stand-in — she re-derived and fault-injected independently). Zero disputes.
> Full entry: appendix below.)

**Main-loop engineering verification:** the trims render leg (`renderGroundTruthTrims` + both
adapters + tests) re-verified after authoring; all fixes green; final battery green (ten
checks + C7 clean + coverage; full suite 8987/8987; lane 326/326; root + scripts + generator
tsc clean); Stacy's state-validated commit matches the branch head at PR time.

---

## Appendix — Stacy's recorded entry (verbatim, key sections)

> **[STACY — U5 Sparky cutover validation] CONFIRMED — independent re-derivation +
> coverage-of-coverage; 2026-07-11**
>
> **State**: branch `task/122-cutover-sparky` @ `e7c47830`; working tree only the cutover-doc
> + completion/summary edits — NO artifact/emitted-file changes (fault-injection restore + a
> stray `undefined/regen` dir from her own lock-independent regen both cleaned).
> **Checks (mine)**: diff-guard `no-op-green` (0) · canonical-vs-truth `clean, 0 findings` (0) ·
> sweep-4 `PASS` **non-vacuous** (both sparky.{cc,kiro} manifests in scope, 12 members each) ·
> sweep-8 `PASS` (no delta drift) · audit:coverage-map `PASS` (256/255/1 adjudicated-blank =
> generated.lock) · test:agent-generator **326 passed, 27 suites** · **lock-independent
> generateAll→compareTrees: all 8 sparky outputs byte-IDENTICAL to committed**.
> **sweep-8 K-D1 fault-injection**: mangled trim[0]'s negative in the emitted CC file → sweep-8
> **FAILED exit 1** naming `[FAIL] sparky @ groundTruthManifest.trims[0] (dist/web/DesignTokens.web.css)`
> "unconditional trim's negative cue is ABSENT" → restored → PASS, git byte-clean. The K-D1
> leg bites.
> **Signals**: baseline `main:sparky.json` 22 raw → **21 unique** (sole dup product-token-governance
> file://+skill://) · |union| **12**, |per-agent| **3** = {contract-system-reference,
> product-token-governance, web-authoring-standards} == pinned 119-A § "5. Sparky" · cc==kiro
> TRUE · verdict none-trim-stale-snapshots, emitArtifactRefs false, no faithfulness verbs, 3
> trims fires:unconditional · demotion-delta = (21∖12) = **12 removals** (3 trims + 9 docs),
> every removal replaces-covered, 3 always-set additions explain the delta · regenerated
> sparky.json = 12 resources, **zero dist/CSS, zero dups** · trim rationale measured:
> demo-styles.css **0** defs, DesignTokens **687**, ComponentTokens **33**.
> **Content-completeness (the merge gate)**: ZERO unexplained omissions — all 8 commands
> (6 in-repo script names resolve in package.json), all 3 gaps present-as-gaps (build:watch
> verified tsc-only), all 3 law embeds full-verbatim. 125KB → source-routed (0 occurrences);
> "24 demo pages" dropped (0 occurrences). Two principled absences correct (no diff artifact;
> no faithfulness verbs — none-trim emits negatives, not faithfulness).
> **Coverage-of-coverage**: all 8 sparky surfaces guarded rows; none blank.
> **First-generation**: stand-in + her load-bearing independent gate = SUFFICIENT; her gate
> re-derived every signal + fault-injected the novel leg rather than leaning on the stand-in.
> **Routed (non-blocking)**: (1) LOW generator foot-gun — `writeOutputs(root,…)` silently
> created `undefined/regen` on a falsy-resolving root; consider asserting a non-empty root.
> (2) informational — transcribe this stamp into the signature block (done). (3) the
> first-generation template (omissions gate + lock-independent regen + fault-inject-the-novel-leg)
> is reusable for Kenya/Data's never-ported consumer seats (same stale-snapshot trim shape;
> K-D1 now proven).
