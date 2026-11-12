# Peter's ruling: the 16.3.0 rule-11 escalation batch, "As recommended"

**Recorded by**: the orchestrator. Times are from `date -u` at receipt.

## The exchange

1. **The question.** Stacy's RELEASE 16.3.0 phase-1 read raised it as RL-52, draft PR #857, item (3); the findings are in `.kiro/issues/2026-11-10-release-16.3.0-phase-1-findings.md`. Records lapsed at 16.3.0's S `6f507c039` under rule 11 (`.kiro/issues/README.md`), and rule 11 sends the escalating ones to Peter as one batch (rule 6), each with three options: spec, drop or fix-now.
2. **2026-11-12**, Peter: "Run the consults, please". The orchestrator consulted the owners read-only in three rounds: Thurgood, Stacy, Lina and Ada. The round files are in `consult-163/` in the orchestrator's scratchpad. The consult changed the batch in three ways:
   - `2026-10-25-token-docs-unvetted-name-hits` left the batch. Ada's `## Outcome (2026-11-01)` closed it before S, Stacy and Thurgood agreed, and its item B goes to a new Lina record.
   - `2026-11-07-github-grant-coverage-check` joined it. It lapses, because under B2 the commit that set its token (#851) is not a re-rule. Stacy and Thurgood agreed.
   - Thurgood's #856 Open-for-Peter line on two unrowed records was withdrawn: a lapse is not a choice. `2026-11-09-link7-f2b-applied-before-816` does not escalate, and its owner settles it.
3. **What was put to Peter** (orchestrator, 2026-11-12). Each row is the owner's recommendation after the cross-read. Every fix-now is due by 16.4.0's S.

   | # | Record | Owner | Recommended |
   |---|---|---|---|
   | 1 | `2026-10-24-b-ci-post-flip-owed-acts` (second lapse) | Thurgood | **fix-now**: Peter rules ballot #460's F-1–F-4 in one sitting, then the small application (the `complete-task.sh` array plus one CDG sentence) |
   | 2 | `2026-10-26-release-16-1-standards-implications` (the RS queue) | Thurgood | **spec 131**: 131's outline names it. RS-44's build half moves to Lina's matching guard record |
   | 3 | `2026-11-07-github-grant-coverage-check` | Thurgood | **fix-now**: a warn-only check in `scripts/completion-claims/`, with Stacy's fixtures first |
   | 4 | `2026-11-05-hand-written-readiness-claims-disagree-with-generated-readiness` | Lina | **fix-now** on the ~80 lines across 13 served docs, each claim stated per platform. The class question (generate the tables, or guard them against the generated file) moves under rule 9 to a new rule-10 record with `path:.kiro/specs/132-…/requirements.md` |
   | 5 | `2026-11-08-icon-base-name-values-list-unchecked` | Lina | **fix-now**: add a `values:` list to `Icon-Base.schema.yaml` from the `IconBaseName` union, with a test that fails if the two differ |
   | 6 | `2026-11-09-examples-guard-a5-token-boundary` | Lina (predicate), Thurgood (instrument) | **fix-now**, via an A-5 erratum ballot that Peter ratifies. If it is not ratified by 16.4.0's S, the record lapses and fix-now is gone |
   | 7 | `2026-11-08-generate-component-token-warning-spacing-sizing-only` | Ada | **drop**, after a Spec 129 requirements amendment narrowing Req 13.2 to "spacing and sizing, and borderWidth if it has a grid rule". `defineComponentTokens` cannot declare radius, fontSize or colour. Thurgood authors the amendment, Ada is consulted, and Peter ratifies |
   | + | (new) the false "DTCG generation failed (non-blocking)" warning in release builds | Ada | **file** a P3 defect record with trigger `release:16.4.0:phase-1` |

   - **Class option, stated with the batch**: B2 goes to its own small ballot now, with Thurgood drafting. It includes a line that a "carried" walk row is not a re-rule. All four seats agreed.
   - **Settled by the seats; no question to Peter**:
     - RL-60, the 24 non-Stacy flagged acts. § 5.4 puts them into J, and § 8 trigger (a) is the route to Peter for anything a recording slip does not explain. Stacy withdraws #857 item (4a).
     - RL-53, the `pending.json` header 72 → 75. It is restored by a one-item ballot that Peter ratifies (adoption § 2 clause 4); Thurgood and Stacy chose that over the A-5 rider. This replaces #857 item (4b).
4. **2026-11-12T13:29:02Z**, Peter: **"As recommended"**

## What was ruled

- Rows 1–7 and the add-on, each exactly as recommended above. The class option also stands: B2 goes to its own ballot now.
- Each owner writes the disposition into their own record (rules 1 and 9), citing this file:
  - fix-now records carry `release:16.4.0:phase-1`, re-tokened to `merge:#<N>` once the fixing PR opens;
  - row 2 carries the spec-131 `path:` token;
  - row 7 drops when the amendment is ratified and merged.
- **Later acts for Peter that these answers create**:
  - a sitting on ballot #460's F-1–F-4 (row 1);
  - ratification of the A-5 erratum (row 6);
  - ratification of the Req 13.2 amendment (row 7);
  - ratification of the B2 ballot;
  - ratification of the one-item header ballot (RL-53).

## Correction (2026-11-12T21:43:29Z, the orchestrator)

- **Row 2 is wrong where it says "131's outline names it".** Neither Thurgood's search nor the orchestrator's finds `2026-10-26-release-16-1-standards-implications` anywhere in `.kiro/specs/131-governance-simplification/`. That wording was Thurgood's round-1 consult claim, and the orchestrator passed it to Peter without checking it. Peter's "spec 131" answer stands. To carry it out, Thurgood adds a row to Spec 131's outline that names the record. The spec-131 `path:` token is valid only once that row is merged.
- **Item 3's "Settled by the seats; no question to Peter" was not ruled by "As recommended".** That answer covered the batch rows. Peter closed RL-60 (#857 item 4a), RL-53 (item 4b) and #856's lapse question separately, in `2026-11-12-peter-ruling-857-856-settled.md`.
- **Item 3's RL-60 bullet** (2026-11-12T21:48:37Z) has the same slips. Its "§ 5.4" and "§ 8 trigger (a)" are sections of ballot `2026-10-01-signing-act-chain`. Trigger (a) has Thurgood charter an issue, and is not a route to Peter. See the Correction in `2026-11-12-peter-ruling-857-856-settled.md`.
