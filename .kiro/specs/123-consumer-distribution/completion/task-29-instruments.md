# Task 29 — Instruments block

**Written**: 2026-10-12, before subtask 29.0 (unit head `c25470eac` = `origin/main`; branch `task/123-u3g-g2c2`) · **PRIMARY**: Lina (Opus)

**Binding**: the instrument-existence ballot (`.kiro/docs/ballots/2026-09-28-parent-instrument-existence-check.md`) is RATIFIED, and Spec 123 stays on M1's execution-time form (§ 4a). No subtask of Task 29 has started. This block is the unit branch's first commit.
**Sha convention**: each `exists` row names the commit that last touched `<path>` as of `c25470eac` (`git log -1 --format=%h -- <path>`). For a command, `<path>` is its defining file.
**Baseline at the cut** (before any edit; worktree build: `npm ci` ×3 (root, `mcp-server`, `application-mcp-server`), `npm run build` ×3; the prebuild's `docs/tokens.css` reverted):
- `tsc --noEmit` exit 0;
- `npm run test:agent-generator`: 58 suites, 1637 tests passed.
**Criteria order**: Task 29's criteria in `tasks.md` order (`tasks.md` @ `8a0c0e46a`). The parity parser reads **9** criterion rows (`parseTasksMd`, 0 malformations), numbered C1–C9:
- C1 the spec-text ruling comes first
- C2 the read-only sizing run (29.0) and the row ceiling
- C3 Stacy's attacks committed before she sees the fix
- C4 G2-F1, clause 2 per the ruling
- C5 G2-F3, the clause-1 rows on the generator's own emission
- C6 G2-F2, the check runs on the shipped material
- C7 the six Kiro-JSON rows
- C8 one re-sign round
- C9 validation
**The ruling the criteria now read through**: `.kiro/specs/123-consumer-distribution/g2-spec-text-ruling.md` @ `905dd1e62` (R1 identity; R2 empty/whitespace out of `D`, located in the check; R3 surfaces, aggregation and the minimum input set; R5 the expected tokens).

| # | Criterion (short ref) | Instrument | State | Fit (one line, `exists` rows) | Dependent subtasks |
|---|---|---|---|---|---|
| 1.1 | C1 the ruling precedes the cut | `git merge-base --is-ancestor 905dd1e62 c25470eac` | exists (`.kiro/specs/123-consumer-distribution/g2-spec-text-ruling.md` @ `905dd1e62`) | ran at the cut: exit 0 | all |
| 1.2 | C1 U3c precedes the cut | `git merge-base --is-ancestor 8a0c0e46a c25470eac` | exists (`.kiro/specs/123-consumer-distribution/tasks.md` @ `8a0c0e46a`) | ran at the cut: exit 0 | all |
| 1.3 | C1 Stacy's pre-read; Lina's buildability read | the preserved reads | exists (`.kiro/specs/123-consumer-distribution/g2-spec-text-ruling.reads/stacy.md` @ `905dd1e62`; `…/lina.md` @ `905dd1e62`) | both reads are committed beside the ruling, byte-equal | — |
| 2.1 | C2 the sizing's inputs: committed renderings and sidecars | `canonical/_consumer-output/{_canonical,cc,kiro}/**` | exists (`canonical/_consumer-output` @ `8a0c0e46a`) | U3c's regenerated output, so the sizing runs on a `main` that carries U3c | 29.0 |
| 2.2 | C2 the sizing's inputs: committed profile | `canonical/profiles/consumer/**` | exists (`canonical/profiles/consumer` @ `8a0c0e46a`) | every re-pointed row the ruling counts | 29.0 |
| 2.3 | C2 the merged check and its trees | `checkDerivation`, `partition`/`entryTree`, `derive()` | exists (`tools/agent-generator/regrounding/derivation.ts` @ `669b51b09`; `tools/agent-generator/partition.ts` @ `669b51b09`; `tools/agent-generator/derive.ts` @ `669b51b09`) | the sizing applies R1–R3 over these as merged, never edits them | 29.0 |
| 2.4 | C2 the ruled-text sizing harness (R1 identity, R2 filter, R3 surfaces and aggregation) | a read-only scratch harness, run over the committed material | built here (29.0) | — | 29.0 |
| 2.5 | C2 the dry run of 29.3 (per-entry Kiro-JSON spans in a temp copy; would-move signed rows) | temp-copy harness + `renderedHashOf`/`readConsumerSpans` + `runFreshnessSweep` | built here (29.0), over exists (`tools/agent-generator/derive.ts` @ `669b51b09`; `tools/agent-generator/regrounding/freshness.ts` @ `669b51b09`) | VALVE-1's own hash, so a would-move row is the row the sweep would report | 29.0 |
| 2.6 | C2 the ceiling | the four limbs | exists (`.kiro/specs/123-consumer-distribution/tasks.md` @ `8a0c0e46a`) | (i) > 12 failing rows; (ii) > 3 re-authorings; (iii) a second re-signing seat; (iv) any body or always-set row fails | 29.0 (stop) |
| 2.7 | C2 the record | `.kiro/specs/123-consumer-distribution/completion/u3g-sizing.md` | built here (29.0) | — | 29.0 |
| 3.1 | C3 the attack file, with expected outcomes and the HOLDS conditions | `.kiro/specs/123-consumer-distribution/completion/g2-cycle-2-attacks.md` (Stacy's audit artifact, outside the delegated-tier line) | MISSING → Stacy: not written. **Blocks every commit touching `tools/agent-generator/**` or `canonical/profiles/consumer/**`**, so 29.1–29.4 and 29.6. It does not block 29.0, which commits only `completion/u3g-sizing.md` → resolved 2026-10-12: exists (`.kiro/specs/123-consumer-distribution/completion/g2-cycle-2-attacks.md` @ `fe488ff52`, a child of `13dcfc08c`; refusal and witness conditions at `completion/g2-cycle-2-refusal-conditions.md` @ `f32a21f76`). Both precede 29.1's commit | — | **29.1, 29.2, 29.3, 29.4, 29.6** |
| 3.2 | C3 the order instrument: every touching commit in `<base>..<H′>` has the attack-file commit and the `u3g-sizing.md` commit as ancestors | `git log --format=%H <base>..<H′> -- tools/agent-generator canonical/profiles/consumer` + `git merge-base --is-ancestor` per commit | exists (`.kiro/specs/123-consumer-distribution/tasks.md` @ `8a0c0e46a`) | the criterion prescribes it; git computes it | 29.7, 30.1 |
| 4.1 | C4 clause 2 to edit | `checkDerivation` L118 (`containedIn(x.ref, destination, …)`) | exists (`tools/agent-generator/regrounding/derivation.ts` @ `669b51b09`) | the line R1 replaces, with mutual `isDescendantOrSelf` (`partition.ts` L101–109) | 29.1 |
| 4.2 | C4 the member-id space (the `_shared` `members:` row) | a member-id identity in the check | built here (29.1) | — | 29.1 |
| 4.3 | C4 attack (f) and one-token-variant fixtures; two-sided bites with exact outputs | fixtures + bite records | built here (29.1), in the existing bite form (`tools/agent-generator/__fixtures__/semantics-guard/__bites__` @ `669b51b09`) | — | 29.1 |
| 5.1 | C5 the generator's own emission of attack (a) | `emitSpans` + `derive()` over a temp copy of the committed profile | exists (`tools/agent-generator/spans.ts` @ `669b51b09`; `tools/agent-generator/derive.ts` @ `669b51b09`) | the path pass four ran end to end (`re-grounding-pass-four.md` @ `669b51b09`, § "Sample") | 29.2 |
| 5.2 | C5 R2 in the check: `D` excludes empty/whitespace body spans and empty derived entry values; the widened input | `checkDerivation` input + filter | built here (29.2) | — | 29.2 |
| 5.3 | C5 the rebuilt clause-1 rows and their corrected expectations | `derivation.test.ts`, `derivation.frontmatter.test.ts` | built here (29.2), over exists (`tools/agent-generator/__tests__/derivation.test.ts` @ `669b51b09`; `…/derivation.frontmatter.test.ts` @ `669b51b09`) | — | 29.2 |
| 5.4 | C5 Task 14's ticked rows are not edited | `git diff <base> HEAD -- .kiro/specs/123-consumer-distribution/tasks.md` shows no Task 14 hunk | exists (`.kiro/specs/123-consumer-distribution/tasks.md` @ `8a0c0e46a`) | git computes it | 29.7 |
| 5.5 | C5 MP-1 closes | MIDPOINT's MP-1 | exists (`.kiro/specs/123-consumer-distribution/completion/claims-pass-midpoint.md` @ `fff59ddaf`) | L65 names it; this parent's completion doc records the closure, the record is not edited | 29.7 |
| 6.1 | C6 the standing application | `tools/agent-generator/__tests__/derivation.shipped-profile.test.ts` | built here (29.4) | — | 29.4 |
| 6.2 | C6 it runs on every PR touching its inputs | `npm run test:agent-generator` in `lane-timing.yml`, with its floor (`[ "$COUNT" -ge 1 ]`) | exists (`.github/workflows/lane-timing.yml` @ `dec738aa1`; `package.json` @ `762b8c209`) | L281–282, an existing step in an existing required job; no workflow edit, no new context | 29.4 |
| 6.3 | C6 these renderings are the shipped material | the 16.1 parity test | exists (`tools/agent-generator/__tests__/consumer-entry.parity.test.ts` @ `669b51b09`) | ties `canonical/_consumer-output` to what `dist/consumer-canonical` emits | 29.4, 29.7 |
| 6.4 | C6 the count equals the count derived from the committed dispositions; red on zero | assertions in 6.1 | built here (29.4) | — | 29.4 |
| 6.5 | C6 the bite: one rejected row planted in a temp copy turns the standing test red | bite record | built here (29.4) | — | 29.4 |
| 6.6 | C6 the declared input (trigger) set | the completion doc's list; the minimum is the ruling's R3 | built here (29.4), over exists (`.kiro/specs/123-consumer-distribution/g2-spec-text-ruling.md` @ `905dd1e62`) | R3 names the minimum; the doc may add, never remove | 29.4 |
| 6.7 | C6 the ARMING event (units table: "a check newly applied on every PR touching its inputs, criterion 29 C6") | Stacy's ARMING record | MISSING → Stacy: the event fires at U3g's merge. **Blocks nothing in Task 29** | — | none (post-merge) |
| 7.1 | C7 the adapter to change | `tools/agent-generator/adapters/kiro.ts` (the JSON emission and its one glue span) | exists (`tools/agent-generator/adapters/kiro.ts` @ `8a0c0e46a`) | the glue span `C1:frontmatter+ambient-manifest` is the one the six rows sit under | 29.3 |
| 7.2 | C7 per-entry spans for the JSON fields | the 29.3 edit | built here (29.3) | — | 29.3 |
| 7.3 | C7 JSON bytes unchanged | `git diff --stat <29.3^> <29.3> -- canonical/_consumer-output/kiro` names `*.attribution.json` only | exists (`.kiro/specs/123-consumer-distribution/tasks.md` @ `8a0c0e46a`) | the criterion prescribes it, on 29.3's commit | 29.3 |
| 7.4 | C7 the eight steward sidecars move with it | `.kiro/agents/*.json.attribution.json` (8 files) | exists (`.kiro/agents` @ `8a0c0e46a`) | regenerated, never hand-edited; named in 29.6's moved-outputs list | 29.3, 29.6 |
| 7.5 | C7 the tarball never carries the sidecars | `scripts/pack-assert.ts` row "attribution sidecars ABSENT" | exists (`scripts/pack-assert.ts` @ `762b8c209`) | L389 | 29.7 |
| 7.6 | C7 the stale list after 29.3, pasted before 29.6 | `runFreshnessSweep` through the no-write runner (`runGuard(repoRoot, { refreshLock: false })`) | exists (`tools/agent-generator/regrounding/freshness.ts` @ `669b51b09`; `tools/agent-generator/diff-guard.ts` @ `669b51b09`) | L265; never the lock-writing mode before 29.6 | 29.3, 29.6 |
| 8.1 | C8 the re-sign rules and the chain verifier | signing-act ballot (batching, merge-only seat commits) + `verify-signing-chain` | exists (`.kiro/docs/ballots/2026-10-01-signing-act-chain.md` @ `dff78bcde`; `tools/agent-generator/regrounding/verify-signing-chain.ts` @ `669b51b09`) | the ballot is the rule; the verifier walks every signing commit in range | 29.6 |
| 8.2 | C8 Stacy's re-sign of `knowledgeBases[spec-summaries]` (and any row the stale list names) | the seat's signing commit, merged in, never amended | built here (29.6, the seat; attestation, outside every line) | — | 29.6 |
| 8.3 | C8 "until Thurgood's RS-1 erratum lands, a re-sign is a new act, not a closed divergent" | Thurgood's RS-1 erratum | MISSING → Thurgood: not drafted (no RS-1 in the ballot @ `dff78bcde`). **Blocks nothing**: the criterion already reads a re-sign here as a new act | — | none |
| 8.4 | C8 a Stacy-signed row moved is disclosed and falls in Peter's sample (trigger (d)) | the § 5.3 amendment (trigger-(d) issue) | MISSING → Thurgood: the issue is ACTIVE, no amendment (`.kiro/issues/2026-10-03-stacy-signed-sample-trigger-d.md` @ `cb28f0112`). **Blocks nothing in U3g**: U3g discloses the row; the sample is owed at release 3's RELEASE pass | — | none |
| 8.5 | C8 the PR body's stale list and one line per act | the U3g PR body | built here (30.3) | — | 30.3 |
| 8.6 | C8 one lock refresh, by the guard's own write, from a clean tree | `npm run check:122:diff-guard` | exists (`tools/agent-generator/diff-guard.ts` @ `669b51b09`; `canonical/generated.lock` @ `8a0c0e46a`; `package.json` @ `762b8c209`) | writes only on `full-run-green`; moved outputs listed; any undeclared path is the stop | 29.6 |
| 9.1 | C9 validation | `npm test`, full `tsc`, `npm run test:agent-generator` | exists (`package.json` @ `762b8c209`) | the lanes the criterion names; baseline green at the cut (above) | 29.7 |

**Counts (at writing)**: N = 40 — exists 22 · built-here 14 · missing 4 · unlisted 0. Rows 2.5, 5.3 and 6.6 are built here over existing instruments and are counted as built here.

**MISSING rows and what each blocks**:
- 3.1 (Stacy's attack file): blocks 29.1, 29.2, 29.3, 29.4 and 29.6. **29.0 can run now.**
- 6.7 (Stacy's ARMING record): post-merge; blocks nothing in Task 29.
- 8.3 (Thurgood's RS-1): blocks nothing; a re-sign here is a new act.
- 8.4 (Thurgood's § 5.3 amendment): blocks nothing in U3g; owed before release 3's RELEASE pass.

**Not a Task 29 instrument (named so it is not mistaken for one)**: Peter's dated re-ruling path for 22.5 (`.kiro/issues/2026-10-02-g2-pass-four-findings.md`, a section naming 22.5). It is Task 22's G2 backstop and U3's instrument, not U3g's. U3g's merge on `HOLDS` is the other limb of that backstop.

## Found later
- 2026-10-12 — misfit — rows 7.1 and 7.2 (`kiro.ts` per-entry JSON spans) — criterion C7 — found at 29.0 (`u3g-sizing.md` § 5).
  - Per-entry spans give derivation evidence for the two `description` rows only.
  - The four `knowledgeBases[…]` rows (data `android-components`, kenya `ios-components`, stacy `completion-docs` and `spec-summaries`) are glob-only and render nowhere in the Kiro target, on the consumer or the steward leg. `emitConfig` keeps only source-bearing knowledge bases (`kiro.ts` L259–260), and the Kiro prompt renders no knowledge note (L428–434).
  - So C7's evidence cannot be produced for them by the instrument as listed.
  - Route: a fork for Peter, surfaced in `u3g-sizing.md` § 5:
    - (A) Kiro renders glob-only knowledge bases, which needs a dated amendment to C7;
    - (B) an R3 surface amendment to Thurgood's ruling;
    - the class option.
  - Blocks 29.3 until ruled. The plan is not edited.
- 2026-10-12 — added-by-ruling (Thurgood proposed this kind for this case; `unlisted` is the nearest kind in the guide's vocabulary) — criterion C7 — Peter RULED (A) on the 29.0 fork; amendment dated 2026-10-12 under Task 29's C7 in `tasks.md`.
  - Rows 7.1 and 7.2 now cover two kinds of span: per-entry Kiro-JSON spans for the two `description` rows, and **a Kiro-prompt knowledge-fallback note with per-entry spans** for the four glob-only `knowledgeBases[…]` rows. Both are built here at 29.3.
  - Row 7.3 widens: the `git diff --stat` on 29.3's commit names `*.attribution.json` plus the `*-prompt.md` files of agents with a rendered glob-only knowledge base.
  - New instruments are needed before 29.3 commits:
    - **Kenya's, Data's and Stacy's reads of the rendered note**: MISSING → Kenya, Data, Stacy; requested at 29.3; **block 29.3's commit**.
    - The reconciled `kiro.ts` L428–434 comment: built here (29.3).
  - The steward `.kiro/agents/*-prompt.md` join row 7.4's moved outputs.
  - The 29.0 `misfit` entry above is resolved by this ruling.
- 2026-10-12 — unlisted — criterion C5 (the clause-1 rows; R2 widens the check's input) — found at 29.2.
  - `tools/agent-generator/__tests__/grain-guard.two-sided.test.ts` calls `checkDerivation` and is not in Task 29's Primary Artifacts. The ruling says "Task 29 lists the tests that change", and the list omits this file.
  - The edit changes the spans' shape only (three lines; its two assertions are unchanged).
  - The alternative, a fail-open check when rendered text is absent, would reopen G2-F3, so it was not taken.
  - Route: the orchestrator, as an out-of-list edit to record or to grant. It is not reverted unless ruled. → granted 2026-10-12 (tasks.md amendment `6dc435cc5`).
- 2026-10-12 — unlisted — criteria C5 and C7 — found at 29.2 and 29.3. **Four edits outside Task 29's Primary Artifacts, forced by ruling (A) — grant requested from Peter 2026-10-12 → granted 2026-10-12 (tasks.md amendment `6dc435cc5`), with `canonical/_fixture-output/kiro/**` declared a moved output.**
  1. `tools/agent-generator/__tests__/grain-guard.two-sided.test.ts`: R2 widens the check's input. This supersedes the 29.2 entry above.
  2. `tools/agent-generator/__tests__/kiro-adapter.test.ts`: two assertions encoded the pre-(A) behavior, a single JSON span and no Kiro knowledge section.
  3. `tools/agent-generator/__tests__/consumer-rendering.survivors.test.ts`: the survivor checker now also sees the Kiro JSON's per-member `allowedPaths` line.
  4. `canonical/_fixture-output/kiro/.kiro/agents/_fixture.json.attribution.json`: regenerated, never hand-edited; the Spec 122 standing fixture's Kiro JSON sidecar.

  - Each change is shape-only or expectation-only, and is recorded in `task-29-2-completion.md` or `task-29-3-completion.md`.
  - The dated Primary-Artifacts amendment is `6dc435cc5`.
- 2026-10-12 — resolved — the 29.3 reads (the `added-by-ruling` entry above): Kenya, Data and Stacy ACCEPT, no change to the note. Relayed by the orchestrator, quoted in `task-29-3-completion.md`; the read files are not on disk.
