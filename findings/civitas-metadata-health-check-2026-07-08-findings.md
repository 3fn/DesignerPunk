# Civitas Metadata Health-Check Findings — 2026-07-08

**Date**: 2026-07-08
**Steward**: Thurgood (Civitas)
**Contributing reviewers**: Ada (token-domain content currency), Lina (component-domain content currency)
**Trigger**: `node scripts/validate-steering-metadata.js` surfaced 1 error + 31 staleness warnings while closing the merge-on-coherent-unit ballot. Confirmed pre-existing (not introduced by the ballot — only the 5 ballot files were dirty).
**Scope**: (1) fix the invalid `relevantTasks` value in `Process-Orchestration-Model-Selection.md`; (2) triage all 31 staleness warnings (bump-after-real-review vs. flag-for-content-review).
**Status**: Complete — error fixed, 23 docs bumped after review, 8 flagged for content follow-up.

---

## Summary

| Disposition | Count | Meaning |
|-------------|-------|---------|
| **Error fixed** | 1 | `relevantTasks` moved off free-text prose onto controlled vocabulary |
| **Bumped `Last Reviewed` → 2026-07-08** | 23 | Content reviewed and verified current — a real review, not a rubber-stamp |
| **Flagged (NOT bumped)** | 8 | Genuine content drift; date left stale on purpose so the warning persists until content is fixed |

Validator after this change: **0 errors, 8 warnings** (down from 1 error / 31 warnings). The 8 residual warnings are the flagged docs and are *expected* — they must keep warning until their content is reconciled.

**Method (non-rubber-stamp guarantee).** `Last Reviewed` = "most recent metadata/currency review date" (Spec 020 metadata-template § "Last Reviewed"). A bump was applied only where the content was actually cross-checked against the changes that landed after the doc's prior review date. Token/component *content-correctness* verdicts were made by the domain owners (Ada/Lina) per the Civitas three-layer boundary; the steward applied the metadata action and independently verified the load-bearing drift claims against source before acting.

**Change vectors checked against** (all landed after the docs' Dec-2025/Jan-2026 review dates): Spec 112/115 (OKLCH color migration, v12.0.0), Spec 118 (extensionless authoring / module-resolution contract), Spec 124 (Component-Token Return Contract), Spec 104 (token source portability), new `TokenCategory.SIZING`/`TokenCategory.BLUR` families + `space700/800`, Android family migrations, and the 2026-07-05 PR-gate workflow law.

**Not-counted-as-drift (deliberate).** Legacy `.kiro/steering/…md` path snippets inside MCP-query examples are the tracked **119-B OB-2** obligation (~176 corpus-wide), still resolve via the Req 2 AC3 legacy-path fallback, and are explicitly "not a relocation-integrity break." They were excluded from drift scoring — flagging them would have fabricated drift and duplicated a tracked obligation.

---

## 1. Error Fixed — `Process-Orchestration-Model-Selection.md`

**Error**: `Invalid task type in relevantTasks: "any task that delegates work to a subagent"` — free-text prose where the validator requires `all-tasks` or a comma-separated controlled-vocabulary list.

**Fix**: `**Relevant Tasks**: agent-architecture, general-task-execution`

**Rationale**: The doc governs model-tier choice when an agent *orchestrates/delegates* — `agent-architecture` is the closest vocabulary match for the orchestration angle; `general-task-execution` captures that it is consulted during general task work. `all-tasks` was rejected deliberately: that value is the reserved always-loaded (Layer-1) convention, but this is a Layer-2 `inclusion: manual` doc that is only relevant when delegating, not always. The free-text intent is preserved verbatim in the doc's `description:` frontmatter. Validator re-run: error cleared.

---

## 2. Bumped After Review (23 docs — verified current)

`Last Reviewed` advanced to 2026-07-08. Each was cross-checked against the change vectors above and found accurate.

**Token domain (Ada — 11):** Token-Family-Accessibility, -Border, -Glow (already reflects the unified Blur family + OKLCH output), -Motion, -Radius, -Responsive, -Shadow (Blur-family + OKLCH), -Spacing (carries space700/800; points component-dimension use to the split-out Sizing family), -Typography, Token-Semantic-Structure (Spec 080 theme-override pattern + OKLCH names present), Token-Resolution-Patterns.

**Component domain (Lina — 9):** Component-Family-Data-Display / -Divider / -Loading / -Modal (verified still intentional placeholders — no such components ship), Component-Family-Icon (Icon-Base production-ready, contracts/tokens accurate), Component-Primitive-vs-Semantic-Philosophy (conceptual, untouched), Component-Templates (schema/YAML authoring templates; list token names, not the Spec 124 return seam), platform-implementation-guidelines (token-consumption patterns unaffected by Spec 124, which governs `.tokens.ts` returns not platform `DesignTokens` access), cross-platform-vs-platform-specific-decision-framework (methodology; no existence/readiness claims).

**Process/test domain (Thurgood — 3):** Test-Failure-Audit-Methodology (uses direct `--testPathPatterns` invocations, insulated from the 125 lane rework; methodology + historical lessons stable), Test-Behavioral-Contract-Validation (cross-platform contract-validation framework; Spec 124 governs token returns, not behavioral contracts), browser-distribution-guide (verified `build:browser` → `scripts/build-browser-bundles.js` still emits the exact `dist/browser/designerpunk.esm.js` / `.umd.js` / `tokens.css` bundle names the guide documents; package.json `browser` field matches).

---

## 3. Flagged — NOT Bumped (8 docs — genuine content drift)

Date left stale intentionally. These keep tripping the warning until content is reconciled. Each has a specific, evidence-backed finding and an owner.

### Component readiness/inheritance drift (owner: Lina) — HIGH severity
- **Component-Inheritance-Structures.md** — Family Status Summary (lines 40-45) + §§6/7/11 mark **Avatars / Badges & Tags / Navigation as 🔴 Placeholder "(Planned)"**, but Avatar-Base, Badge-Count/Label/Notification, and Nav-Header-{App,Page,Base} / Nav-TabBar-Base / Nav-SegmentedChoice-Base all ship (web production-ready — verified in `src/components/core/`). Also claims "all 13 families" while omitting **Chip** and **Progress**. A reader would conclude shipped components don't exist.
- **Component-Readiness-Status.md** — the change-vector brief's prime suspect, confirmed wrong: readiness table (lines 566-594) lists **Avatar 🟡 Beta** (actually web production-ready), **omits the entire Navigation family** (6 shipped components), **mis-files Progress under "Loading"** and omits Progress-Bar-Base, and **omits Chip**. Routing table (lines 549-556) marks Icons/Navigation 🔴 despite both shipping.

### Component minor cell/example staleness (owner: Lina) — LOW severity
- **stemma-system-principles.md** — "The 13 Component Families" table otherwise correct; single stale cell: **Navigation | Nav-Base | Placeholder** (line 130) — Navigation now ships. One-line fix.
- **Component-MCP-Document-Template.md** — line 48 cites "Modals, Avatars, Badges, etc." as families "without implemented components"; Avatars and Badges now ship. Non-normative illustrative example in a template. One-line fix.

### Token completeness gap (owner: Ada) — LOW severity
- **rosetta-system-principles.md** — substantive content current (OKLCH, theme-override, Blend family present); §"The Token Families" enumeration (lines 133-146) reads as a complete list but **omits Sizing and Blur**, both now first-class `TokenCategory.SIZING`/`TokenCategory.BLUR` families with dedicated `Token-Family-Sizing.md` / `Token-Family-Blur.md` (verified in `src/tokens/`). Add two rows.

### Process/governance drift (owner: Thurgood) — MEDIUM severity
- **Process-Cross-Reference-Standards.md** — this is the doc that *defines* the cross-reference convention, and 119-A **changed that convention** (migrated 226 intra-doc refs to the bare-`id` form, Req 10 addressing grammar). Written 2026-01-03, it still teaches `.kiro/steering/…md` paths as the standard (e.g. line 37 "documents in `.kiro/steering/`"). This is drift in the *normative* standard, not an OB-2 example snippet. Reconcile with 119-A Req 10 / coordinate with 119-B **OB-1** (cross-ref parser id-awareness). Deserves its own focused revision, not a hurried edit inside this metadata-hygiene change.
- **Process-Hook-Operations.md** — describes the Kiro agent-hooks system with a **commit-triggers-release-detection** model and "on task completion" firing (lines 482, 509, 1122). The 2026-07-05 PR-gate law redefined "task completion" as *merge* and reworked commit/push semantics (subtask commit+push on branches; PR opens at unit completion). The release-detection trigger model and completion semantics plausibly need reconciliation with the PR flow — and possibly interact with whether Kiro agent-hooks remain the mechanism under Claude Code (122 territory). Substantive review, not a date bump.

### Human-owned identity doc (owner: Peter) — informational
- **personal-note.md** (`.kiro/steering/`, Layer 1) — Peter's personal introduction letter. Content is essentially timeless; the staleness warning is a false-positive class for a personal note. The steward will not bump another person's identity doc. **Recommend Peter refresh its `Last Reviewed` at his convenience** (last touched 2025-12-15) — likely a pure date refresh, his call.

---

## Follow-up obligations

| Doc(s) | Owner | Action | Severity |
|--------|-------|--------|----------|
| Component-Inheritance-Structures, Component-Readiness-Status | Lina | Correct readiness/family listings to match shipped catalog | High |
| stemma-system-principles (Nav cell), Component-MCP-Document-Template (example) | Lina | One-line fixes | Low |
| rosetta-system-principles | Ada | Add Sizing + Blur rows to the families table | Low |
| Process-Cross-Reference-Standards | Thurgood | Rewrite to teach the bare-`id` cross-ref convention; coordinate with 119-B OB-1 | Medium |
| Process-Hook-Operations | Thurgood | Reconcile hook/release-detection/completion model with the 125-A PR-gate flow | Medium |
| personal-note | Peter | Refresh `Last Reviewed` (his identity doc) | Info |

Content edits to domain docs proceed through the owning agent (Ada/Lina) per the three-layer boundary; the two process-doc revisions are Thurgood's and are scoped as their own follow-ups rather than folded into this metadata-hygiene change.
