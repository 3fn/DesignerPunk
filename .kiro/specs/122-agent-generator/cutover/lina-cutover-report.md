# Lina cutover report (U3)

**Date**: 2026-07-11
**Branch**: task/122-cutover-lina · **Spec**: 122-agent-generator Task 10
**Sequence**: C10.1 steps 1–8 (content readiness → baseline → generate → checks → this report
→ diff-vs-baseline → validations → signals → PR)

---

## Per-check results (local runs on the final branch state; CI URLs on the PR checks tab — the platform record)

| Check | Result | Notes |
|---|---|---|
| 122-diff-guard (C6) | **PASS** (full-run-green) | Lina's runtime artifacts now LEDGER-DERIVED guarded surfaces (incl. attribution sidecars); lock refreshed |
| 122-canonical-vs-truth (C7) | **PASS** (clean, exit 0) | The L1 leg's live case: the hand `lina.json` granted no `@designerpunk-application`; the regenerated config carries it (fixed by construction) — a defect in BOTH current and generated that the diff artifact is blind to; C7 is the load-bearing gate |
| 122-sweep-1-refs | **PASS** (0 fail, 1 info) | All law claims + 10 doc routes live-resolved (standing interim crossRef INFO, same as U2) |
| 122-sweep-2-skills | **PASS** | `skills: []` recorded PASS (0 declared / 0 emitted) |
| 122-sweep-3-dupes | **PASS** | Regenerated config has zero double-loads |
| 122-sweep-4-ambient | **PASS** (0 info) | designed (§ Lina block ∪ always-set) == generated, both targets — ZERO deltas |
| 122-sweep-5-corrected-state | **PASS** | count-asserts hold: 0 `.web.tsx`; single distinct concept-count 136 (both landmines pre-fixed in `3dd50f94`, preserved by the carry) |
| 122-sweep-6-declarations | **PASS** (1 info) | Cue leg green; fleet-partial INFO now 25 pending tools (was 29 at U2 — Lina's cutover routed 4 application verbs) |
| 122-sweep-7-dispositions | **PASS** | All configs fully disposition-covered |
| 122-sweep-8-demotion | **PASS** | 27 removals, EVERY one covered by a `replaces:` cue; preserved StemmaComponentSource KB correctly cancels |
| audit:coverage-map | **PASS** | Lina's artifacts auto-appear as guarded rows (ledger-derived); 1 adjudicated blank (generated.lock, standing) |
| Full suite / lane / tsc | lane **322/322** · generator tsc clean | Full `npm test` + root tsc run at parent completion (Tier 3) — recorded in the completion doc |

## Engineering delivered with this cutover

- **Ground-truth directive RENDERED (Req 10 AC3 gap closed)**: `deriveGroundTruthDirective`
  carried her `catalog-is-manifest` verdict since Task 2, but neither adapter consumed it —
  the faithfulness verbs would have silently not appeared. `renderGroundTruthFaithfulness`
  (render.ts) + both adapters now emit `## Ground truth` (assembly-grain verbs
  `get_component_full` + `get_component_health`; namespaced on CC, native on Kiro; fail-loud
  when a verb is not granted by the subset). Regression-tested (render + both adapter
  suites). The `trims` leg of `none-trim-stale-snapshots` remains unimplemented — no ledger
  agent carries a trim verdict yet (routed forward).
- **First live `resolves` agent-route disposition**: her `routes.agents` ada entry renders
  without the not-yet-ported caveat (Ada is generator-SSOT since U2).
- **The L1 server-grant fix by construction**: `allowedTools` in the regenerated
  `lina.json` carries `@designerpunk-application` derived from `toolSubset` — the hand
  config's missing grant class cannot recur for any ledger agent.

## Found-and-fixed during authoring (the gates biting, recorded)

1. **Declared-id-vs-filename-id mismatch — found by the resolver's fail-loud (emission
   refused)**: the scaffolding-templates route was authored as doc `component-templates`
   (filename-derived); the doc's own frontmatter declares `id: component-family-templates`,
   which is what the docs MCP serves. Exactly the substrate's "ids are read from the doc's
   own frontmatter — never guessed from filename" rule (always-set.yaml header). Fixed in
   canonical source with a NOTE comment; resolution verified live.
2. **Baseline parity additions (Ada-precedent, fixed-before-merge)**: the hand port's MCP
   table rows for the Component Development Guide, Component Templates,
   Test-Behavioral-Contract-Validation, and Component-MCP-Document-Template had no
   structured carrier — three `routes.docs` entries + one `get_document_full` cue added
   before the diff artifact was finalized. Details: `lina-diff-vs-baseline.md`.

## Acceptance signals (Req 23 AC2 / design C10.2, Lina row — A-D5/LE-D4 discipline)

| Signal | Predicted (design) | Measured | Verdict |
|---|---|---|---|
| Generated lock-set == pinned set (`per-agent-ambient-design.md` § Lina) | personal-note + ai-collaboration-principles (always-set) + contract-system-reference (per-agent) | pinned ⊆ ambient union; per-agent members == {contract-system-reference} | ✅ |
| Zero `Component-Family-*` / `*-Standards` doc ids in her ambient manifest | 0 | **0** (mechanical regex over both manifests) | ✅ |
| \|union\| (ambient manifest members) | always-set 9 + 1 | **10** | ✅ |
| \|per-agent members\| (union factored out) | 1 | **1** (`contract-system-reference`) | ✅ |
| Both targets agree | equal member sets | cc == kiro (id-set equality verified) | ✅ |
| Observed baseline (committed `lina.json` at cutover) | ~35 resources | **35** (`canonical/baselines/lina.ambient-baseline.json`, mechanically normalized — 34 doc + 1 KB) | ✅ |
| Shrink (delta against the baseline) | the ~29→on-demand trim | **27 removals** (`demotion-delta.json`), each `replaces:`-covered; the KB survives as the preserved rich object | ✅ |

## Validation signatures (independent-validation default, amendment 4)

**Owning seat — Lina (content confirmation, 10.1):**
> [LINA — U3 content confirmation] CONFIRMED — 2026-07-11
> (Her per-item findings: law embed verbatim vs live corpus, both predicates hold, right
> two sections for her seat with catalog/format correctly routed; Ground truth rendered
> both targets with correct per-target naming; all 10 doc routes live-resolved by her; the
> 27 demotion cues matched one-for-one against the 27 trimmed resources; tool grants
> mechanically set-identical both directions (and the L1 missing-grant defect confirmed
> real against the pre-cutover json); body audited section-by-section — stale pre-119-A
> paths, fake tool names, and a never-actually-wired KB table row all corrected by
> construction; Kiro wiring field-for-field faithful. Diff-artifact render claims audited:
> none half-false. Zero disputed items; 4 non-blocking routed items below.)

**Independent validation — Stacy (re-derivation + coverage-of-coverage):**
> [STACY — U3 Lina cutover validation] CONFIRMED — independent re-derivation + coverage-of-coverage; 2026-07-11
> (Her full entry: appendix below. Beyond the brief: a LOCK-INDEPENDENT full
> regenerate-and-compare — generateAll → compareTrees over all guarded roots, no lock
> consulted — CLEAN 0/0/0; sweep-4 non-vacuity verified IN CODE; all signals re-derived by
> her own set arithmetic and matching; classification audit — every render claim holds,
> zero regression-class lines found. One Low cosmetic finding — the law embed's dangling
> "above"/volatile "136" — converging with Lina's routed item (i); routed, non-blocking.)

**Thurgood (engineering verification, main loop):** all fixes re-verified after every
change; final battery green (ten checks + C7 clean + coverage audit; full suite 8987/8987;
lane 322/322; root + scripts + generator tsc clean); delegated validations independently
spot-checked (Lina's byte→field wording fix applied; Stacy's state-validated commit matches
the branch head at PR time).

---

## Appendix — Stacy's recorded entry (verbatim, key sections)

> **[STACY — U3 Lina cutover validation] CONFIRMED — independent re-derivation +
> coverage-of-coverage; 2026-07-11**
>
> **State validated**: branch `task/122-cutover-lina` @ commit `d4a82d11`, plus
> working-tree wording edits confined to the two cutover docs — no artifact or
> generated-file drift (confirmed by my own full regeneration).
> **Check runs (mine)**: diff-guard `no-op-green` (0) PLUS a lock-independent full
> regenerate-and-compare — **CLEAN, 0 changed / 0 missing / 0 extra** with lina's 3
> runtime files + 3 sidecars in the compared roots · canonical-vs-truth `clean, 0
> findings` (0) · sweep-4 `PASS — 0 info` (**non-vacuous, verified in code**: 4 manifests
> in scope incl. lina cc+kiro; the vacuous-PASS path emits info, not taken) · sweep-8
> `PASS` (2 agents in delta) · audit:coverage-map `PASS — 236/235/1` · lane **322/322**.
> **Signals re-derived**: baseline **35** (= 8 file:// + 26 skill:// + 1 KB from the
> `main` config, one-to-one id mapping) · |cc| == |kiro| == **10**, id-sets equal ·
> per-agent lane exactly `{contract-system-reference}` both targets · **zero**
> family/standards ids · baseline ∖ union = 28, minus the field-faithfully-carried KB =
> **27 removals** matching demotion-delta.json; cue coverage removals∖cues = ∅ and
> cues∖removals = ∅, no duplicates · union ∖ baseline = 3 expected always-set gains
> (civitas-system-overview, designerpunk-systems-overview, task-completion-protocol) ·
> pinned lock-set holds; groundTruth block matches the pinned design exactly.
> **Classification audit**: 14 rows vs `git show main:.claude/agents/lina.md` — every
> render claim spot-checked and holding (tool sets IDENTICAL by sorted diff; law embed
> with no-directional-prefixes + full Classification Rules; Ground truth namespaced on CC
> and native on Kiro; 10 § routes; per-server rebuild cues; ada `resolves` / thurgood
> `not-yet-ported`; commands, write scope, pre-flight all carried). Regression
> adjudications table empty AND no regression-class line found that it should contain.
> Kiro-side L1 fix confirmed in the emitted config. **One Low finding** (cosmetic,
> routed): the embedded law text's "The Concept Catalog above lists all 136 concepts" —
> verbatim-faithful but deictically dangling in the embed; the adjacent routing line
> resolves it.
> **Coverage-of-coverage**: all 11 lina-relevant surfaces are guarded rows in
> coverage-map.yaml with named 122 checks (direct row extraction + the audit's own PASS).
> **Routed**: embed-lint candidate for dangling positional references in section-grain
> embeds (alongside the volatile-fact lint); the 119-A "117 vs 136" ballot now flows
> through regeneration automatically once resolved — no separate action; lina-prompt.md's
> single named check (122-diff-guard) is consistent with byte-fidelity-by-construction
> (U2 pattern).

## Routed items (non-blocking, carried forward)

1. **Generator team**: the `trims` render leg (`none-trim-stale-snapshots` → per-trim
   demotion cues) is still unimplemented — no ledger agent exercises it yet; implement at
   the first cutover that carries a trim verdict.
1a. **Lina's seat-review routed items (4)**: (i) the embedded Naming Convention section
   retains "The Concept Catalog above lists all 136 concepts" — deictically wrong in the
   embed context (the catalog is routed, not above) and a volatile count on an
   always-loaded surface; candidate source-doc rewording ballot or embed-side deictic
   handling. (ii) The old rebuild-protocol row enumerating "experience patterns, layout
   templates, family guidance → application rebuild_index" lost its enumeration in the
   carry; the general rule keeps behavior correct but the enumeration had value —
   candidate cue/note addition. (iii) Fallback's "flag the issue for Peter" softened to
   "acknowledge the limitation" — negligible; note only. (iv) "byte-faithfully" →
   "field-faithfully (JSON key-order-normalized)" — FIXED in the diff artifact
   pre-merge.
2. **U4+ cutovers inherit**: verify each routed doc's DECLARED frontmatter id before
   authoring (the component-family-templates lesson); the groundTruth render is now live
   for any future catalog-is-manifest / faithfulness-verb verdict.
3. **MCP child-process leak — client half FIXED AT THIS CUTOVER, server half routed**:
   each local check run boots docs/application/product MCP servers as child processes; a
   check that dies ungracefully (timeout, kill) ORPHANED them, because the servers do not
   self-exit on stdin EOF (the docs server's file watcher holds its loop open). Found
   live: ~230 orphaned MCP processes accumulated since 2026-06-29, wedging a C7 run >1h
   and inflating every MCP boot from seconds to minutes — the orphan pile, not the
   checks, was the local battery's perceived cost. **Fixed on this branch (client half)**:
   `child-process-guard.ts` — every spawned transport registered for SIGTERM-reap at
   process exit/fatal signal, with a connect-time pid SNAPSHOT (the SDK's `close()` nulls
   `transport.pid` ~2s before the child actually dies; a signal landing in that window
   otherwise reaps nothing — found by live kill-testing). Verified: mid-run SIGTERM now
   leaves zero orphans; guard unit tests cover the snapshot path. **Routed (server
   half)**: each MCP server should self-exit on stdin EOF — also removes the 2s
   SDK-close timeout every graceful boot currently pays. CI unaffected (fresh runners).
