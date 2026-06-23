# Design Outline: Sync Customization Safety

**Spec**: 116 - Sync Customization Safety
**Date**: 2026-06-13
**Status**: Design Outline (R1 — initial draft for review)
**Agent**: Thurgood (formalization) + Sparky (tooling) + Ada (source model)

> **Reading note**: This is a thinking document. The **Diagnosis** section states what the evidence establishes — those facts are settled. The **Open Design Questions** section is deliberately unresolved; it frames the design space for sound deliberation rather than pre-deciding the fix. Do not treat the questions as having implied answers.

---

## Problem Statement

On 2026-06-12, a consumer (test01 / dp-portfolio) shipped a broken production site after upgrading `@3fn/core` from 11.8.0 to `^12.0.3`. The upgrade silently destroyed design tokens the consumer had promoted from product-level into their local system token source. Undefined `var()` references dropped their declarations — producing a green build and a visually broken live page, discovered only by visual inspection.

The destroyed tokens (`space900`, `space1200`, `space1600`, `space.sectioned.generous`, `space.sectioned.expansive`, and a color token) **were never in `@3fn/core`.** They were the consumer's own values, promoted into their local `src/tokens/` source. They were erased when `sync` overwrote the consumer's local token source files with the package's versions during the upgrade.

**The one-sentence characterization (for the record):** test01 asked us to make upgrades preserve their customizations; we shipped a sync that could — alongside an unrequested reset mode that became the only working path in their environment, which then erased the very customizations they'd asked us to protect.

---

## Diagnosis (Settled — Evidence-Backed)

The causal chain is confirmed by artifacts, not inference:

1. **The tokens were locally promoted, never in core.** Confirmed by the project owner. They originated as product tokens in the consumer repo and were promoted into the consumer's local system token source (`src/tokens/SpacingTokens.ts`, `src/tokens/semantic/SpacingTokens.ts`).

2. **`sync` ran during the upgrade.** Commit `e4e42dc` (dp-portfolio, 2026-06-12) *created* `.kiro/sync-manifest.json` with `"version": "12.0.3"` and `"syncedAt": "2026-06-11T02:46:38Z"`. The manifest's existence is sync's fingerprint.

3. **Sync overwrote the consumer's local source.** The same commit shows `space900/1200/1600` deleted from `src/tokens/SpacingTokens.ts` and `sectioned.generous/expansive` deleted from `src/tokens/semantic/SpacingTokens.ts` — replaced with the package's v12 versions, which never had those tokens.

4. **`--accept-all` was the only functional apply path in their environment.** In non-TTY (their agent terminal / CI): interactive `sync` falls back to dry-run (applies nothing); `sync --force` was a silent no-op due to an npx flag collision (renamed to `--accept-all` in v12.0.3, commit `d97a910f`). `--accept-all` ("factory reset — overwrite all files to match package, no prompts") was the sole working option. The Integration Guide explicitly prescribes it for non-interactive/CI use.

5. **The failure was silent.** Regeneration produced output without the tokens; `var(--…)` references dropped silently; no build error surfaced.

### Two structural facts that made this possible

- **Sync protects whole consumer-*created* files, but not consumer *additions* to package-shipped files.** The "package-direction guarantee" (Spec 111, R1 AC4) means files the consumer creates are never touched. But a promotion into `SpacingTokens.ts` is an *addition to a file core also ships* — it falls in the gap between "consumer-created" (protected) and "package file" (overwritten). This is the precise hole.
- **First-sync bootstrap masks pre-existing customizations.** This was a *first* sync (the manifest was created in the breaking commit). On first sync, `bootstrapManifest` baselines the manifest from the consumer's current files (Spec 111, R3 AC4) — so package-differing customized files classify as `updated-safe` ("unchanged by you"), not `conflict`. Even an interactive first sync would not have flagged the promotions as conflicts.

### Origin (Settled — Spec 111 archaeology)

- **The originating request** (`.kiro/issues/2026-06-01-missing-sync-command.md`, reporter: test01's Thurgood, during their 11.7.1 → 11.8.0 upgrade) asked for sync that detects stale **governance files**, reports, applies-with-confirmation, and **explicitly preserves customizations** ("merge-aware approach or clear diff report is essential"). It did **not** ask for a factory-reset.
- **`--accept-all` (originally `--force`)** entered in Spec 111, Requirement 7, with a **fabricated user story** — *"As a developer who wants to reset to upstream baseline…"* — that traces to no issue and no customer. The factory-reset rationale was self-generated, not customer-driven.
- **The two structural facts above were deliberate, debated design decisions** (R6 AC4: force overrides the non-TTY guard; Sparky's review: "they can `--force` if they want to reset"). Each was reasonable in isolation; their *interaction* — non-TTY forces you to force, first-sync can't protect you, force obliterates additions — was never modeled.

---

## The Core Tension

`sync` is genuinely useful but dangerous without guardrails. The tension is a **context collision**: the same operation has opposite safety assumptions in two contexts.

- **Recovery context** ("my files are corrupted, restore them to package baseline") → overwrite-everything is *correct*.
- **Update context** ("take core's new stuff, keep my intentional work") → overwrite-everything is *destruction*.

The factory-reset (recovery semantics) got wired into the update flow — and made the *only* working path in non-TTY — where its assumption is inverted.

A second tension: **the update capability is validated** (it's the original ask and the everyday need), while **the reset capability is speculative** (no consumer has demonstrated needing it). Investment in guardrails should weight toward the validated path.

---

## Scope

### In Scope
- A **safe non-interactive apply mode** for `sync` (the load-bearing gap): apply new / updated-safe / governance changes, and **skip + report** conflicts rather than falling back to dry-run or requiring the destructive path.
- **Protecting consumer additions to package-shipped source files** (the promotion case) — distinct from whole consumer-created files, which are already protected.
- **Reconciling first-sync bootstrap** with the founding "preserve customizations" requirement.
- **Reversing the CI/non-TTY guidance** that prescribes `--accept-all` (Integration Guide — a shared-doc change, so a ballot measure).
- Optional: a **drift/visibility signal** at upgrade time (added/removed/changed tokens) as a safety net independent of the apply path.

### Out of Scope
- A full **product→system→core promotion lifecycle** redesign or a separate "promotion preservation subsystem." This spec refines the *sync tool's* guardrails; it does not re-architect promotion.
- Removing the reset capability entirely (reset-to-baseline is a defensible recovery feature — the question is how it's gated and labeled, not whether it exists).
- Three-way / semantic merge of token files (likely too large for this spec — flagged as an open question, not committed).

---

## Open Design Questions (the "think more soundly" core)

These are genuinely unresolved. They are for Sparky (tooling), Ada (source model), and Peter (direction + the guidance ballot measure) to reason through.

1. **Safe non-TTY apply mode — shape?** Should non-TTY default to "apply safe changes, skip + report conflicts" (a new behavior), or should there be an explicit flag (e.g., `--apply-safe`) that does this? What does the report look like so a consumer in CI/an agent terminal can act on skipped conflicts?

2. **Reset capability — keep, gate, or split?** Options: (a) keep `--accept-all` but make it loud, rare, and never the prescribed upgrade/CI path; (b) split "update" (merge, preserve additions) from "reset" (explicit destructive, opt-in) as distinct commands/flags; (c) make conflict-preservation the default even under reset, with a separate `--discard-local` for the genuine nuke. Which model best matches *recovery* needs without re-creating the footgun? **Does recovery even require discarding intentional customizations, or only restoring package-managed files?**

3. **Protecting additions to package-shipped files — the hard one.** How should sync distinguish "consumer added tokens to `SpacingTokens.ts`" from "consumer hasn't touched it"? Options to weigh: a separate local-extensions layer that sync never owns; additive-only merge for token files; treating any package file the consumer has edited as a permanent conflict; a convention that promotions live in consumer-owned files rather than edited-in-place. **This likely needs Ada's input on the source/promotion model — it may be as much a token-architecture question as a tooling one.**

4. **First-sync reconciliation.** How do we avoid both "80 prompts on first sync" *and* "silently baseline customizations as pristine"? Option: on first sync, surface package-differing files as a one-time review list ("these N files differ from the package — keep yours or adopt package?") rather than auto-baselining as up-to-date.

5. **Drift visibility.** Should `generate` / `sync` emit a drift report (tokens added/removed/renamed/value-changed vs. the last run) regardless of the apply path? This directly addresses the original consumer concern — *visibility into overwrite/removal risk* — and is a safety net even if the apply-mode work is staged.

6. **CI/non-TTY guidance (ballot measure).** Once a safe apply mode exists, what should the Integration Guide say for CI/agent contexts? The current "use `--accept-all` to apply changes in CI" line must be reversed. This is a shared-doc change — Peter's call via ballot measure.

---

## Governance Lessons (Thurgood — for lessons-learned and possible spec-standards refinement)

Independent of the tooling fix, this incident surfaces reusable spec-quality red flags. Codifying these into Process-Spec-Planning would be a **separate ballot-measure proposal**, not part of this spec:

1. **User stories must trace to a real need.** Spec 111 R7's user story was fabricated to justify a capability someone thought would be handy. Spec review should flag user stories with no traceable upstream issue or stated need.
2. **A capability must not silently contradict a founding requirement of its own spec.** Spec 111's Introduction required "respecting consumer customizations"; R7 added a mode that obliterates them. The contradiction coexisted unreconciled through formalization and review.
3. **When a tool's usage context expands, its safety assumptions must be re-validated for the new context.** Recovery → update and interactive → CI/non-TTY each inverted an assumption nobody re-checked.

*Accountability note: Spec 111 was formalized by Thurgood and authorized through collaborative human-led decisions. These lessons are owned, not assigned.*

---

## Dependencies & References

- **Spec 111 (Sync Command)** — this spec refines it. The safe-apply, first-sync, and reset behaviors all live in `src/cli/sync/`.
- `.kiro/issues/2026-06-12-v12-token-removal.md` — primary incident report (test01).
- `.kiro/issues/2026-06-10-v12-upgrade-sync-gaps.md` — non-TTY sync no-op + manual-cp fallback.
- `.kiro/issues/2026-06-10-npx-force-flag-swallowed.md` — the flag collision behind `--force` → `--accept-all`.
- `.kiro/issues/2026-06-01-missing-sync-command.md` — the originating request.

---

## Stakeholders / Reviewers

- **Sparky** — CLI/sync tooling owner. Primary reviewer for the apply-mode, first-sync, and reset-gating questions; likely implementer.
- **Ada** — token source / promotion model. Reviewer for Q3 (protecting additions to package source) and any source-architecture implications of how promotions are stored.
- **Peter** — direction, scope, and the Integration Guide guidance change (ballot measure).
- **Thurgood** — formalization, governance lessons, spec-quality.

---

## Success Definition (provisional — to firm up in requirements)

A consumer can upgrade `@3fn/core` in any environment (TTY, CI, agent terminal) and apply package updates **without silently destroying customizations or promotions** — with conflicts surfaced, not overwritten by default; with a destructive reset available only as a deliberate, clearly-labeled opt-in; and with visibility into what changed.
