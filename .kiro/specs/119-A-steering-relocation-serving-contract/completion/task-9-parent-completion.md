# Task 9 Completion: Per-Agent Five-Class Ambient-Set Design Artifact (Req 14, design-only)

**Date**: 2026-06-29
**Task**: 9. Per-Agent Five-Class Ambient-Set Design Artifact (Req 14, design-only)
**Type**: Parent (subtask 9.1, Architecture)
**Status**: Complete (pending main-loop re-verification + commit)
**Agent**: Thurgood (Civitas steward / AXA design)
**Validation**: Tier 3 — Comprehensive (includes success criteria)

> **Not committed by me** — the main loop reviews against Req 14 + the assessments, re-runs the suite, and commits on `spec-119a-relocation`. This task introduces **no running code** — it produces ONE design artifact (a `PerAgentAmbientDesign[]` design appendix, 122's canonical input).

---

## What Was Done

Produced `.kiro/specs/119-A-steering-relocation-serving-contract/per-agent-ambient-design.md` — the typed `PerAgentAmbientDesign[]` design artifact covering **all 8 agents** (Ada, Lina, Thurgood, Leonardo, Sparky, Kenya, Data, Stacy). For each agent, every piece of ambient context is assigned to one of the five AXA classes (formative / reflexive-principle / governance-as-law / ground-truth-manifest / capability-catalog) using the Component-7 shape from `design.md` §7 (`agent`, `agentType`, `members[]` with `ref` / `class` / `rationale` / `status119A`).

The content was **sourced from `per-agent-ax-assessments.md`** (the input-of-record, Req 14 AC5) and captured as a design appendix — **not re-derived**. Where the input-of-record was silent, ambiguous, or forward-referencing, the gap was **flagged** (six flags recorded in the artifact's § "Input-of-record gaps flagged, not invented") rather than filled with invented content.

## Success Criteria — met

- **A per-agent ambient-set DESIGN exists for all 8 agents**, assigning each ambient member to one of the five classes, typed so 122 has a contract to generate against. ✅ (Eight `PerAgentAmbientDesign` blocks + a coverage matrix.)
- **Ground-truth-manifest and capability-catalog members are marked `design-only-*`** (build/generation explicitly behind the seam). ✅ — every ground-truth-manifest member carries `design-only-build-deferred`; every capability-catalog member carries `design-only-gen-deferred`; only formative / reflexive-principle / governance-as-law members are `locked-always`. This is the seam encoded in the data.
- **Sourced from `per-agent-ax-assessments.md` and captured as a design appendix, not re-derived.** ✅ — each block cites its source section; gaps are flagged, not invented.
- **No manifest is built and no catalog is generated; the "generate, don't curate" invariant (Req 4 AC8) is honored.** ✅ — no manifest built, no catalog generated, no hand-curated ambient map committed; no interim hand-curation was required, so no replacement-obligation receipt was needed.

## Design Decisions

1. **`agentType` derived directly from the assessments' three emergent types** — owners (Ada, Lina), consumers (Leonardo, Sparky, Kenya, Data), differential-auditors (Thurgood, Stacy). 2 / 4 / 2 split.
2. **Formative + reflexive-principle treated as roughly universal** (Req 14 AC2) — defined once (`personal-note` formative, `ai-collaboration-principles` reflexive-principle) and included in every block for self-contained 122 input. Per-agent additions the assessments DID name on top (e.g. `core-goals`, `spec-feedback-protocol` for Leonardo/Stacy) are kept per-agent, not promoted to universal, because the input-of-record only names them for some agents.
3. **governance-as-law members chosen by the silent-failure discriminator** (AXA §3.3) exactly as the assessments worked it — Ada→`token-governance`, Lina→`contract-system-reference`, Thurgood→`test-development-standards`, Sparky→`web-authoring-standards`+`product-token-governance`, Leonardo→`cross-platform-vs-platform-specific-decision-framework`, etc.
4. **The differential-auditor manifest-collapse is encoded** (Thurgood, Stacy): ground-truth is computed (scripts), not snapshot — the manifest class collapses into the capability-catalog; the manifest member records "no snapshot; the scripts/audit-commands ARE the provisioning."
5. **The consumer no-manifest rule is encoded** (AXA §5.3): Leonardo's manifest is empty; the platform consumers' (Sparky/Kenya/Data) manifest design is "trim the `dist/*` snapshots, MCP is faithful" — with Kenya/Data noting the snapshots are STALE pre-094 (bug `task_3a3f1cf2`, not a 119-A fix).
6. **`ref` fields use real doc `id`s** for all `locked-always` members (verified against on-disk frontmatter); manifest/catalog members use descriptive design-names (`manifest:<agent>`, `catalog:<agent>`) since those artifacts are not built/generated here.

## Seam Handling (Req 14 AC3/AC4/AC6 + Req 8 AC8)

- **Ground-truth-manifest:** DESIGN specified (what it contains / that it is empty / MCP-served / computed); BUILD marked `design-only-build-deferred` (severable → 119-B/122). Not built.
- **Capability-catalog:** DESIGN specified (commands/scripts, activation cues, deferred-tool awareness, absorbed Agent-Directory routing per Req 6 AC6); GENERATION marked `design-only-gen-deferred` (severable → 119-B/122). Not generated.
- The Req 8 AC8 gate asserts this **design exists** but NOT that any manifest/catalog is built/generated — this artifact is the "design exists" object.

## Input-of-record gaps flagged (not invented)

Six flags recorded in the artifact (full text there):
1. Named build/test/audit command **strings** absent from the assessments (Sparky/Kenya/Data/Stacy) — catalog slot designed, exact command capture left to 122/build owner.
2. `task-completion-protocol` is a NEW always-doc (Req 6 AC2) created in Task 8, not yet on disk and not named per-agent in the assessments — not listed as a per-agent member; 122 picks it up via the always-set.
3. Thurgood's `process-development-workflow` keep is **section-grain** (git/commit core); 119-A is doc-grain (Gap 7 deferred) — recorded with an explicit caveat.
4. `core-goals` formative-vs-operational is an open re-cut (AXA §8.5) — classified `formative`, flagged unresolved.
5. Orientation-reference docs (`designerpunk-systems-overview`, `civitas-system-overview`) map to none of the five classes cleanly (AXA §3.7) — deliberately NOT forced into a member; retained-ambient orientation pending the silent-failure test.
6. `resources` over-provisioning / dedupe items — carried as flags, NOT actioned (severable → 119-B/122).

## Verification

- **Design artifact only — no code introduced.** `npm test` was run to confirm the green baseline is unaffected: see § "Test Baseline" below.
- All 8 agents present with `agentType` assigned (coverage matrix in the artifact).
- All ground-truth-manifest members `design-only-build-deferred`; all capability-catalog members `design-only-gen-deferred`; all formative/reflexive/law members `locked-always`.
- `locked-always` `ref`s verified against on-disk `id:` frontmatter.

### Test Baseline

`npm test` — green baseline confirmed unaffected (a Markdown design artifact introduces no code). See the summary doc for the run line; the main loop re-runs authoritatively.

## Honest Notes

- **This artifact is disposable input to 122** (AXA §7), not a maintained living map — that is the structural reason it does not become the next permanent meta-guide. It must not be treated as a hand-curated ambient map that ships to agents.
- **Section-grain vs doc-grain tension (Thurgood's git/commit core)** is real and unresolved at 119-A's doc-grain addressing; it is a Gap-7 / 122 concern, flagged not papered over.
- **Command/skill content is intentionally absent** where the input-of-record did not supply it; the catalog slots are designed but their concrete content is a 122/build-owner deliverable. A reviewer should not read the empty command strings as an omission in this design — they are an explicit deferral.
