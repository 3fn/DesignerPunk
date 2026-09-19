# .kiro/issues/ — the active-charter convention

**Established**: 2026-09-19 (the issues-dir triage — chartered as the load-bearing precondition of the monthly health check's active-charter walk; Spec 127 outline-settle ballot § 5.5, Peter's tracking ruling; owner Thurgood)
**The rule in one line**: **anything in this directory's root is ACTIVE; everything closed lives in `archive/`.** The active-charter walk is `ls .kiro/issues/*.md` — bounded by construction, minutes not sessions.

---

## The convention

1. **Root = active.** A file at the root is a live charter, an open defect, or a deferred item — and it SHALL carry an **owner** and a **named trigger** (an event, never a calendar hope). A root file without both is itself a walk finding.
2. **`archive/` = closed records.** Resolved defects, executed charters/session briefs, superseded notes, canonical adjudication records whose rulings are law elsewhere, stale investigation notes, and accidental duplicates. Files move by `git mv`, content UNCHANGED — the record is immutable; the move is the only edit.
3. **Citation resolution**: historical records (ballots, completion docs, register history entries) cite `.kiro/issues/<file>` paths as written at their time — those citations are point-in-time and are NOT rewritten when a file archives. **Resolution rule: a cited issue path not found at the root is in `archive/` under the same filename.** (One flat directory, no renames, so resolution is mechanical.)
4. **Resurrection**: an archived-stale item that turns out to be live moves BACK to the root by `git mv`, gaining an owner + trigger in the same commit. Archiving is never a ruling on the merits — the merits live in the file.
5. **Closing an item**: when a root item resolves/executes, record the outcome IN the file (dated), then `git mv` it to `archive/` — ideally in the PR that closes it, otherwise at the next health-check walk.
6. **The walk** (monthly health check, Thurgood): for each root file — *has its trigger fired? if fired, is there evidence/a record?* Fired-without-record = finding. Root growing stale items = finding. That is the whole walk.

**Ledger of the founding triage**: `archive/TRIAGE-2026-09-19.md` (every moved file, classed).

---

## Active roster at the founding triage (27; 26 after the first walk — rsa-orchestrator verified-executed and archived 2026-09-19 — owners and triggers as recorded in each file)

| File | Owner | Trigger / state |
|---|---|---|
| 2026-09-12-semantic-contrast-adjudication-queue.md | Ada (+Peter rulings) | WAS campaign-gated — **campaign closed 2026-09-18: now eligible**; next deep burst per D5 |
| 2026-09-14-color-token-enforcement-spec-candidate.md | Thurgood (formalization) | next deep burst per D5 — heir to the 125-B campaign method |
| 2026-09-12-spec-115-phase-b-colortokens-deletion.md | Thurgood → Ada | needs spec formalization before execution |
| 2026-09-17-platform-build-verification-harness-candidate.md | Kenya/Data | chartered, not scheduled; no build work authorized |
| 2026-09-17-disabled-guard-corpus-repairs.md | Lina | items 1–7 + D1 DONE (#169/#172); **residuals remain**: sibling vacuous-skips, CTA iOS/Android blend siblings, strict-key parser hardening, D2 scaffold touchpoint |
| 2026-09-13-component-meta-extractor-clobbers-handedits.md | Lina | next Lina session with extractor capacity |
| 2026-09-18-ada-token-doc-accuracy-pass.md | Ada | next Ada token-doc session; walked monthly |
| 2026-08-25-contract-education-content-debt.md | Lina | batch authorized 2026-08-25; next Lina docs session |
| 2026-08-12-release-manager-retirement-execution.md | Thurgood | own dedicated session (36-file inventory) |
| 2026-08-13-component-token-platform-references-noncompiling.md | Ada/Lina | open defect |
| 2026-07-19-application-mcp-search-tokens-partial-match-signal.md | Thurgood | was LATER-after-119-B — 119-B complete: eligible |
| 2026-06-28-spec-094-platform-theme-emission-unwired.md | Ada | deferred; theme-emission work |
| 2026-06-26-package-json-types-condition-ordering.md | Ada | seeded; next module-resolution touch |
| 2026-06-26-token-index-ordering-readdirsync-portability.md | Ada | seeded; deliberately not pursued in 124 |
| 2026-06-25-component-schema-token-name-drift.md | Lina | open follow-up |
| 2026-06-24-blend-system-architecture-and-oklch-alignment.md | Ada | SOON-triaged; the blend spec charter |
| 2026-06-24-mathematical-relationship-parser-validation-gaps.md | Ada | SOON-triaged |
| 2026-06-24-mcp-semantic-resolvedvalue-ignores-mode-overrides.md | Ada | LATER-triaged |
| 2026-06-24-oklch-shadow-color-family-not-migrated.md | Ada | deferred (out of 117 scope) |
| 2026-06-13-module-resolution-strategy.md | Ada | deferred to a dedicated spec |
| 2026-06-13-blendutilities-not-generated.md | Ada | split 2026-06-24; open doc-accuracy half |
| 2026-06-12-release-integrity-safety-nets.md | Thurgood | deferred (Peter-approved); revisit at release-manager retirement execution |
| 2026-06-10-post-v12-rgba-pipeline-cleanup.md | Ada | open (deferred) |
| 2026-05-03-civitas-trigger-effectiveness-followup.md | Thurgood | scheduled window Nov 2026 – May 2027 |
| 2026-05-03-steering-doc-metadata-errors.md | Thurgood | incremental at monthly health checks |
| ios-readonly-focusable-prototype.md | Kenya | DEFERRED (Peter 2026-07-15) — trigger: hardware access |
