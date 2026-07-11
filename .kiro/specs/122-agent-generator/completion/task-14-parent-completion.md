# Task 14 Completion (Parent): Cutover — Sparky (U5, FIRST-GENERATION)

**Date**: 2026-07-11
**Task**: 14 — Cutover: Sparky (Parent, Unit U5, Tier 3)
**Spec**: 122-agent-generator
**Branch**: task/122-cutover-sparky (single-parent unit — opens U5's PR; accepted at Peter's merge, governance-law carve-out). Cutover position 4 (moved early per Peter 2026-07-07 to front-load first-generation risk).

---

## Success criteria — all met

1. **8 verified commands + 3 named gaps carried into canonical source BEFORE catalog generation (Req 21 AC2); a named gap IS valid content (Req 21 AC1)** ✅ — `canonical/agents/sparky.md` authored with `Source:` traceability; the 3 gaps landed as `gap:` command entries; no dev-server cue fabricated (`build:watch` verified tsc-only). Content-before-catalog honored.
2. **First CC generation is a first-generation cutover (Req 15 AC1 / Req 21 AC5 — mandatory Stacy trigger); baseline from `sparky.json` resources** ✅ — no prior `.claude/agents/sparky.md` existed; the merge gate is the content-completeness check (`cutover/sparky-content-completeness.md`), NOT a diff. Baseline captured from `sparky.json` (21 deduped members).
3. **Config-derived write scope (Req 15 AC3); dev-server absence intentional-and-unguarded (SP-D2)** ✅ — specs-only scope (`.kiro/specs/**` + `docs/specs/**`) carried from `sparky.json` `allowedPaths`; dev-server absence recorded intentional-and-unguarded in the acceptance signals.
4. **Content-completeness merge gate — zero unexplained omissions** ✅ — `cutover/sparky-content-completeness.md`: every canonical class + all 8 commands + 3 named gaps present in the generated CC output (independently grepped). The channel-move bucket rule does not apply (no diff).
5. **Sparky in the cutover ledger; artifacts diff-guarded** ✅ — ledger-derived guarded roots picked up his NEW `.claude/agents/sparky.md` + Kiro config/prompt + sidecars.

## Engineering delivered with this cutover

- **Ground-truth TRIMS render leg (`renderGroundTruthTrims`)** — the `none-trim-stale-snapshots` verdict now renders a `## Ground truth` section emitting each trim's `cue.negative` VERBATIM + its namespaced replacement tool (fail-loud on ungranted). This is the leg Lina's U3 flagged as unimplemented; Sparky is the first agent to carry a trim verdict. render.ts + both adapters + tests; sweep-8's K-D1 leg (asserting the negative appears in emitted text) now has a live producer. Both adapters dispatch faithfulnessVerbs XOR trims through one `## Ground truth` block.

## Acceptance signals (design C10.2 § Sparky)

Union **12** (always-set 9 + 3 law locks), per-agent lock == pinned {product-token-governance, web-authoring-standards, contract-system-reference}, baseline **21** → **12 removals** (3 dist-CSS trims + 9 doc demotions, each covered), both targets agree, verdict none-trim-stale-snapshots (dist CSS trimmed from Kiro config by construction), dev-server absence intentional-and-unguarded. Full detail: `cutover/sparky-content-completeness.md`.

## Found-and-fixed at this cutover

1. **Volatile-fact lint on a spec-number heading** — `### Product Tokens (Specs 108/109)` tripped the inventory-noun-adjacent-integer heuristic; dropped the spec-number parentheticals from both theming headings (provenance, not load-bearing).

## Content-freshness check (Peter-requested)

The carried Web Theming + Product Tokens body sections were verified CURRENT against live authority (generateProductTokens.ts, Product-Token-Governance, DesignerPunk-Integration-Guide L353–360/L621, spec 094) — not just faithfully carried but accurate. No drift; no content flag. One low-priority time-bound note routed (the "no `light-dark()`" line tracks M0a status). Detail in the cutover report.

## Validation signatures (amendment 4 — mandatory first-generation Stacy trigger)

- **Sparky (seat)**: **CONFIRMED 2026-07-11** — fresh-context first-generation seat stand-in (no pre-existing sparky subagent to self-review); independently verified trim token counts (demo-styles.css = 0), command strings vs package.json, all 3 gaps honest, every merge-gate claim TRUE. Zero disputes. (Full entry in the content-completeness artifact.)
- **Stacy (independent, mandatory first-generation trigger)**: **CONFIRMED 2026-07-11** — fault-injected the new sweep-8 K-D1 trim leg (proved it bites), lock-independent regen byte-identical across all 8 outputs, all signals re-derived, trim token counts independently measured (0/687/33), zero unexplained omissions, first-generation coverage sufficient. Zero disputes. (Full entry in the content-completeness appendix.)
- **Main loop (engineering)**: trims leg re-verified; final battery green.

## Validation (Tier 3)

`npm test` **8987/8987** (377 suites) · lane **326/326** · root + scripts + generator tsc clean · all ten checks + C7 + `audit:coverage-map` green · diff-guard full-run-green with lock refreshed.

## Carried forward (routed items)

1. U6+ cutovers: the trims render leg is live for any future none-trim verdict; verify FULL verbatim heading lines; keep spec-number provenance out of headings (volatile-fact lint).
2. Low-priority doc-currency (when both-mode/`light-dark()` ships): refresh Sparky's Web Theming "no light-dark()" line.
3. **First-generation seat-review pattern** (recurs at Kenya U8): a never-ported seat has no CC subagent to self-review; the fresh-context seat stand-in + the mandatory independent (Stacy) gate is the adaptation used here — Peter-visible, endorsed for U5.

## Delegated-tier capture

Planned `Agent: Thurgood + Sparky (+ Stacy)`; executed: main loop (Fable 5) engineering (trims leg) + authoring; **general-purpose fresh-context** seat stand-in (no sparky subagent existed pre-generation); **Stacy agent** (session model) independent validation — the mandatory first-generation gate. The seat-agent divergence (stand-in vs a real sparky subagent) is the first-generation condition, recorded as an agent-evolution signal.
