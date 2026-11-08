# Task 18 — Instruments block

**Written**: 2026-11-08T14:41:00Z (`date -u`), before subtask 18.1 · **PRIMARY**: Thurgood (Sonnet), on U12's unit branch `task/129-closeout` at `2837754fd` · **Sha convention**: as of `2837754fd`.
**Criteria** (by order in tasks.md): C1 charter quotation · C2–C7 D1/D2/D3 at head · C8 component-repair record · C9 Consumer Guard · C10 fourteen units' run records · C11 release-text grep · C12 retired-file sentences · C13 Req 9.3 · C14 Native status · C15 Token-Governance ballot · C16 readiness patterns · C17 no runtime-theme claim · C18 in-lane-guards entries · C19 root records naming `task-18-completion.md`.

| # | Criterion | Instrument | State | Fit | Dependent subtasks |
|---|---|---|---|---|---|
| 1 | C1 | `git show b841db957` and `requirements.md` Introduction | exists | byte comparison by diff of the quoted sentence | 18.1 |
| 2 | C2–C7, C9 | the four contexts + `Consumer Guard` on the U12 PR at head H, read from the checks API (`gh api`) | exists once the PR is ready (#781 exists as draft) | a run at head H exists only after Lina's lock refresh and the `main` merge, so these read last | 18.1 |
| 3 | C2–C7 | `scripts/harness/compare.ts` summary lines in the run logs | exists | pasted, not linked (Conventions) | 18.1 |
| 4 | C8 | Lina's component-repair record at the issues root | MISSING-CHECK → read at 18.1 | not yet confirmed present or with a firing Trigger; read before C8 is claimed | 18.1 |
| 5 | C10 | the fourteen gating parents' completion docs; checks API per unit PR | exists | #739, #763, #775 merged before H; their rows are in #741, #765, #778 | 18.1 |
| 6 | C11 | `git grep`/`git log` over the release range and each S's tree for "compiles" | exists | the grep decides "compiles" only | 18.2 |
| 7 | C12 | `governance/DesignerPunk-Integration-Guide.md` L167–L181 region; `scripts/derive-install-doc.ts` | exists | rewrite the four sentences, re-derive INSTALL (Ada consulted on that script) | 18.2 |
| 8 | C13 | CHANGELOG history over 129's range | exists | read, or state it did not arise | 18.2 |
| 9 | C16 | `git log` over the range on `application-mcp-server/src/indexer/ComponentIndexer.ts` | exists | empty log is the pass | 18.2 |
| 10 | C14 | Kenya's and Data's passage | MISSING → Kenya, Data (via orchestrator brief) | drafts on seat branches as a CORRECTION edit; I join with `--no-ff` and byte-check | 18.3 |
| 11 | C15 | `.kiro/docs/ballots/2026-11-08-token-governance-theme-registry-as-shipped.md` @ `0d682564e` on `origin/chore/ballot-token-governance-theme-registry` | exists as DRAFT, not ratified | ratification is Peter's; recorded truthfully (warning) unless ratified and applied before the PR is ready | 18.4 |
| 12 | C18 | `.github/in-lane-guards.json`; `scripts/__tests__/in-lane-guards.test.ts`; additivity predicate | exists | two added entries for `d2-check.test.ts` and `native-rules-emitter.test.ts` (both files exist); step output must read `N registered; N selected` | 18.x |
| 13 | C17 | grep of shipped text for runtime theme switching on iOS/Android | exists | read with 18.2's grep | 18.2 |
| 14 | parent close | `npm test`, `test:consumer`, `test:scripts`, MCP sub-suites, `tsc`, parity, 122 diff-guard, `test:pack-contents` | exists | lock refresh is Lina's; I do not commit it | parent close |

**Records whose Trigger names `task-18-completion.md`** (grep of non-archive `.kiro/issues/*.md`, C19):
- `.kiro/issues/2026-11-08-oracle-floors-compare-and-stability.md` — owner Stacy (Thurgood is the reader at the trigger). Needs its owner's rule 5 outcome line or a re-ruled Trigger with a dated reason, in U12's PR or earlier. State: open, no outcome line.
(`2026-10-01-plan-blast-radius-and-carry-tracking.md` mentions Spec 123's Task 18, not a Trigger on this doc.)

**MISSING rows**: row 10 (Kenya, Data: the 18.3 passage). Row 4 is an unread check, not yet a MISSING finding.
