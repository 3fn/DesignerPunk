# Issue: Release-Manager Retirement — Execution (Q6 ballot application)

**Date**: 2026-08-12
**Authority**: ballot `.kiro/docs/ballots/2026-08-12-q6-release-manager-retirement.md` (RATIFIED — Peter, 2026-08-12; the ballot is the design, this issue is the checklist)
**Owner**: Thurgood coordinates; steering/governance edits Peter-merged
**Status**: IN EXECUTION (2026-08-12, session-direct with Peter live; issue amended per the two safeguards agreed with Peter before execution began). **Re-run the reference sweep at execution start** (`grep -rln "release:analyze\|release:notes\|release:run\|release-tool\|release manager\|release-analysis\|NpmPublisher\|release-management"`) — the inventory below is point-in-time (2026-08-12), never load-bearing.

---

## Declared merge units (safeguard 1 — the coherent-unit law applied to issue work; agreed with Peter 2026-08-12)

- **PR 1 — the KILL PR** (`chore/release-manager-retirement-kill`): all DELETE-class items + the ARCHIVE/DELETE-class docs adjudications. Mechanically reviewable mass deletion; full suite + tsc verify (suite count drops by the tool's 11 test files — record before/after).
- **PR 2 — the LAW-AND-TEACHING PR** (`chore/release-manager-retirement-law`): all UPDATE-class items (steering amendments, the mental-model rewrite, RELEASE-FLOW addition, banner fix, governance-reference adjudications). Small diff, high scrutiny, governance-law carve-out — Peter-merged with full attention.
- **Safeguard 2**: the rewritten `release-management-system.md` receives a **Stacy consult** (scoped, returned-as-data, folded) before PR 2 opens — it is consumer-shipped educational content.
- PR 2 branches from main AFTER PR 1 merges (sequential dependent units; the rewrite describes a world where the tool is already gone).

## Checklist (per-file adjudication classes from the ballot)

### DELETE (tool + machinery)
- [x] `src/tools/release/` (24 TS files incl. `NpmPublisher.ts`) + its 11 `*.test.ts` — DELETED (PR 1); suite 9020→8891 tests (−129 = the tool's own), tsc clean
- [x] `.github/workflows/release-analysis.yml` — DELETED (PR 1)
- [x] `scripts/validate-release-setup.js`, `scripts/diagnose-release-issues.js` — DELETED (PR 1). **`discovery-oracle.ts` KEPT — sweep FALSE POSITIVE**: it is 119-A's frozen discovery map-oracle (measurement fixture), merely contains the word "release"; verify-before-delete caught it
- [x] hook surfaces ×3 — DELETED (PR 1); no external registrations referenced them (verified)
- [x] `package.json` scripts ×5 — REMOVED (PR 1); JSON validity asserted
- [x] `npm test` 8891/8891 green (before: 9020) + `tsc` clean (PR 1)

### UPDATE (law + live teaching surfaces — governance PR, Peter-merged)
- [x] TCP :80 amended (PR 2) — "atomic-commit-per-unit history that serves as the release changelog spine". **HANDOFF NOTE for 125-B Wave 1(b)/(c): this touches the SAME TCP line as candidate hunk W1-6 — the staged `wave-1-candidate-diff.patch` needs mechanical re-derivation post-merge (context refresh only; cuts unchanged; record a dated note in the wave-1 assessment).**
- [x] start-up-tasks ×3 re-anchored to performance-systems-only (PR 2)
- [x] release-management-system.md REWRITTEN (PR 2) — recipe + C1 discovery chain + Stacy-consult folds: audience-framing banner (consumer worked-example), role-framed release owner, guard-scripts consumer qualifier, inline tag mechanics, **`package.json` files[] as the authoritative shipped-surface list**, name/description frontmatter. Consult record: transcribed below.
- [x] RELEASE-FLOW.md § "Deriving the delta" added (PR 2), files[]-authority included
- [x] complete-task.sh banner + both stale comments removed (PR 2); bash -n clean
- [x] All 8 adjudicated (PR 2): PDW pointers re-aimed; PHO framing + dead get_section citations + dead hook pointers fixed (Stacy consult catch); CDG + PSP release-detection rationale passages rewritten w/ historical notes (consult catch); BUILD-SYSTEM-SETUP example swapped + orphan tsconfig line dropped; hooks README re-pointed; test-infra guide example swapped. Test-Failure-Audit-Methodology KEPT untouched (OPP-043 + lessons are audit HISTORY). PSP :2305+ quoted historical content untouched per consult.
- [x] Index rebuilds server-side at serve/CI; frontmatter conformance hand-checked on the rewrite (id/name/description/aliases + full metadata block); CI lanes verify (PR 2)

### ARCHIVE or DELETE (per-file call at execution; git history preserves regardless)
- [x] `docs/release-management/` — DELETED (PR 1; git history preserves)
- [x] `docs/examples/` SURGICAL delete (PR 1): tutorials/ + integrations/ + configurations/ + README.md removed — ALL release-tool content, already marked SUPERSEDED-do-not-follow since 2026-06-27 and documenting the PRE-065 CLI (two generations dead; nothing salvageable for 123 — the CI examples configure the dead tool, not consumer CI). **KEPT: `design-outline-example.md` + `design-exploration/`** (non-release content sharing the dir)
- [x] `docs/roadmap/release-system-review.md` — KEPT as history (PR 1 decision; 065-era analysis record)

### KEEP untouched (verify only)
- [x] Guard scripts re-verified standalone at PR 1 (green)
- [x] Untouched; v14 notes' "reproduce at this tag" verified still-true as historical record (consult)
- [x] Untouched (history)

### Cross-spec notes
- [x] DONE — `.kiro/specs/123-consumer-distribution/inbound-from-q6-release-retirement.md` authored (rides PR 2's fix push): notes-shipping deferral + the systemic internal-vs-consumer framing question, both routed to 123. **NEW from consult: (i) EXECUTED 2026-08-12 — register row `section-citation-resolution` (proposed) + defect/checker issue `2026-08-12-section-citation-defects-and-checker.md` (first scan: ~14 pre-existing dead citations); (ii) systemic internal-vs-consumer framing for the ~80 shipped governance docs → Spec 123's consumer-surface story.**
- [ ] If a U1b wave window is OPEN at execution time: this work's PRs are ordinary observed PRs (not instrument PRs — this is Q6 work, not 125-B measurement); no special handling


## Stacy consult record (safeguard 2 — RMS rewrite, 2026-08-12)

Returned pre-PR-2; ALL items folded, zero declined: (a) ballot-fidelity clean incl. C1 chain; (b) CRITICAL dead get_section citations in PHO → fixed in PR 2, + register-candidate rule recorded above; (c) CRITICAL consumer dead-pointer + 3 MEDIUMs → audience-framing banner + role-framing + guard-script qualifier + inline tag mechanics + chain consumer-note (her one-line fix adopted; systemic question routed to 123 per her own counter-argument); (d) MEDIUM shipped-surface under-specification → files[] named authoritative in BOTH docs; adjacent residue (CDG/PSP hook-rationale passages) → rewritten with historical notes; nits (frontmatter name/description; Historical Note retained given the banner) → taken.
