# Issue: the RELEASE claims pass is worded "at the tag, before publish" in two places and "reads the post-publish record" in two others — a one-paragraph clarification of RELEASE-FLOW is owed

**Date**: 2026-10-02
**Status**: ACTIVE
**Owner**: Thurgood (RELEASE-FLOW and the plan text are his; the pass itself is Stacy's). **Decision**: Peter, on the vehicle (below).
**Trigger**: **after 15.0.0's publish-verification PR merges** (RELEASE-FLOW § "The sequence", step 6's release-record PR). **Backstop**: the monthly LIVENESS read (`did RELEASE fire in the window, and did each produce a committed record? Events without records = finding`), which would surface a phase 2 that never happened.
**Source**: Thurgood's release-prep consult of 2026-10-02 (§ 2); Stacy's reconciliation, below; Peter's ruling of 2026-10-02.

---

## The clash (read)

- **"At the tag, before publish":**
  - `.kiro/specs/123-consumer-distribution/tasks.md` § "Expected release count": "RELEASE fires at the release tag, before publish" (the plan text, Thurgood's).
  - Stacy's charter row (`canonical/agents/stacy.md` L393): "Before a version publishes / at the release tag".
- **"Reads the post-publish record":**
  - `.kiro/hooks/RELEASE-FLOW.md` step 6: "The RELEASE claims pass reads the committed `.txt` file to determine liveness (Req 6.7)". That file, `docs/releases/<v>/publish-verification.txt`, can exist only after step 5's publish, and lands by a second, post-publish release-record PR.
  - Spec 123 Req 6.7: liveness "SHALL be detected by the RELEASE claims pass reading whether the guard ran and what it returned", the release step recording its result at a named location.
- The two cannot both hold for one pass at one moment. RELEASE-FLOW itself contains no "before publish" sentence; the clash is across the documents.

## Stacy's reconciliation, adopted as the operating reading for 15.0.0

**Two phases, one record.**
- **Phase 1**, on the release PR's squash commit **S**, before the tag: the pass over the release delta, with the owed-set paste and the 5b arming line. Its record lands by a record-only PR and states "publish-rail liveness: owed".
- **Phase 2**: a dated section appended to the same record after the publish-verification PR merges, reading the committed `.txt`.
- **Ordering:** tag = S, not the head after the record PR, and the publish is made **from the tag**. (RELEASE-FLOW step 5's "`git switch main && git pull`, then `npm publish`" can publish a head that differs from S once a record-only PR lands; the tarball content would likely match, but the rule should not depend on that.)

Thurgood accepts this reading. His consult answer and Peter's ruling:

> Peter, 2026-10-02, on the release questions: **"Go with B, record the reading in the PR body. Let's also capture this if we haven't already."**

So for 15.0.0 the reading is stated in the release PR's body, and this issue is the capture.

## The owed act

1. **A one-paragraph amendment to `.kiro/hooks/RELEASE-FLOW.md` step 6**, with a pointer sentence in step 5, stating the two phases, the tag-equals-S ordering, and **naming phase 2's trigger: the publish-verification PR's merge**.
   - `.kiro/hooks/RELEASE-FLOW.md` is outside Thurgood's write scope and is ratified law he does not edit unilaterally.
   - **The vehicle is Peter's pick**: a record-first ballot, or the orchestrator's `chore/` route if he rules the clarification needs none.
2. **A dated annotation** by Thurgood on the `tasks.md` line "RELEASE fires at the release tag, before publish" (his scope), pointing at the amendment.
3. Stacy's charter row ("Before a version publishes / at the release tag") is hers; whether it should say "phase 1" is her call and is not owed here.

**Surviving counter-argument**: this is a clarification of ratified text, and a ballot's overhead is out of proportion to it; recording the reading in each release PR's body would suffice. What survives: a reading that lives only in PR bodies is the shape that rots, and the next release author re-derives the clash. Phase 2 also has no detector except the LIVENESS read, so naming its trigger in the law text is what makes a skipped phase 2 a recordable event.

## Not in scope here

Any edit to RELEASE-FLOW, the plan text or a charter. This issue is the tracked flag.

## Filed by

Thurgood, 2026-10-02, in the release-picks PR.

**2026-10-03 — triggered and absorbed.** Triggered by #273's merge (`eadc7f45`, the publish-verification PR). Phase 2 then ran against #273 while it was open, and the merged `.txt` differed from the read (`087f7697`). That is Stacy's RS-9, the evidence this issue lacked. **Absorbed** into ballot `.kiro/docs/ballots/2026-10-03-hermetic-publish-path.md` (DRAFT), together with RS-6…RS-9: § 3.4 carries the two-phase form, the tag-equals-S ordering and the phase-2 trigger; § 5 item 3 carries this issue's owed act 2 (the `tasks.md` annotation). **Vehicle**: that ballot. It is Peter's pick, recorded as the ballot's existence and pending his merge. This issue closes at the ballot's application (its § 5 item 5). — Thurgood

---

## 2026-10-03 — documentation consistency sweep (Civitas steward; Peter: "check with the agents to see if there's any documentation that needs to be updated for them")

**What was checked.** Agents carry nothing between sessions, so "what the agents know" is what their charters and the MCP-served corpus say.

**Method.** A read-only search at `762b8c20` (#279 merged), outside `node_modules/`, `dist/` and `.git/`:
- **Phrases**: `npm publish`, `publish from merged`, `git switch main && git pull`, `dual-registry`, `prepublishOnly`, `postpublish`, `then tag and GitHub release`, `RELEASE-FLOW`.
- **Surfaces**: every repo surface, plus the steering corpus, `governance/`, `README.md`, the Integration Guide, `docs/`, `.kiro/docs/`, `canonical/**` and its renderings.

**Results**: 11 stale surfaces. 5 go by vehicle (a), 2 by (b), 4 are other owners' records (d). Several classes are left as historical (c), and 8 surfaces were checked accurate.

**Vehicle key**:
- **(a)** the ballot's application PR at ratification;
- **(b)** a canonical-charter edit plus regeneration (Spec 122; never hand-edit `.claude/agents/*` or `CLAUDE.md`);
- **(c)** deliberately left as a historical record;
- **(d)** another owner's record, fixed by that owner.

### Stale: vehicle (a), the ballot `2026-10-03-hermetic-publish-path` application PR
| # | Surface | Owner | What is stale | Ballot site |
|---|---|---|---|---|
| A1 | `.kiro/hooks/RELEASE-FLOW.md`: "Deriving" item 4; "The sequence" steps 5–6 (11 hits) | Thurgood | Publishes from the merged `main` working checkout; cites a "dual-registry playbook" that is not in this repo; no two-registry record; no two-phase form; announce-before-verify not ruled out | § 3.1–3.4 |
| A2 | `governance/release-management-system.md` L41 (MCP-served; ships in the package) | Thurgood | "publish from merged `main` → then tag" (publish before tag) | § 3.5 |
| A3 | `governance/release-management-system.md` L31 | Thurgood | Says the "`prepublishOnly` chain" blocks a broken publish. It is now a tripwire; the checks run in `scripts/release-publish.ts` | § 3.6 (added by this sweep) |
| A4 | `.kiro/hooks/README.md` L109 | Thurgood | "the `prepublishOnly` token-index gate" | § 3.7 (added by this sweep) |
| A5 | Spec 123 `tasks.md` § "Expected release count": "RELEASE fires at the release tag, before publish" | Thurgood | Phase 1 only. This issue's owed act 2 | § 5 item 3 |

The MCP index is refreshed at application by `rebuild_index` (ballot § 5 item 4), so the docs MCP stops serving A2/A3 when the edits merge.

### Stale: vehicle (b), charter edit plus regeneration, in a separate PR after the ballot merges
| # | Surface | Owner | What is stale |
|---|---|---|---|
| B1 | `canonical/agents/stacy.md` L393, the RELEASE row ("Before a version publishes / at the release tag") | **Stacy** authors her own wording | The event is now two phases. Phase 1 runs on S before the tag. Phase 2 follows the step-6 record PR's merge and reads the rail result plus the **6b two-registry record** (packument `time[<v>]`, file count, and per-registry sha1 equal to the script's sha1). If drafted against an open PR, phase 2 ends with the merge-confirmation line |
| B2 | `canonical/agents/thurgood.md` L448, LIVENESS read 2 | Thurgood | "Did RELEASE fire … and produce a committed record" should also say that a RELEASE record with phase 1 only (`publish-rail liveness: owed`, no phase 2 or confirmation line) is an event without a complete record |

- **Unchanged and accurate**: both charters' owed-set references (L451; Stacy's catalog). They cite "Deriving the delta" **Step 5a**, which the ballot does not touch. The ballot adds a numbering note, because its new "The sequence" substeps 5.1–5.4 sit beside the same number.
- **Regeneration cost to check at the PR**: whether B1's row is rendered into the consumer profile. If it is, its operative-set entry re-renders and the signing chain applies (ballot `2026-10-01-signing-act-chain`).

### Stale: (d), another owner's record, by pointer only
| # | Surface | Owner | Vehicle |
|---|---|---|---|
| D1 | `docs/releases/release-15.0.0.md` L153, "published under three manual guards" (Stacy R-3) | Ada | Her record-corrections grant (`.kiro/issues/2026-10-02-release-15-files-grant.md`, 2026-10-03). The GitHub release body is Peter's or the orchestrator's |
| D2 | `.kiro/issues/2026-10-02-token-index-meta-ships-absolute-path.md` L101: `verify:token-index-clean` "runs inside `prepublishOnly`" | Ada / Lina | A dated note at that issue's next touch or closure. It now runs in `release-publish.ts` after the pack |
| D3 | `package.json` `postpublish` | Ada | Her deferred row (h), triggered by the ballot's ratification |
| D4 | The orchestrator's npm-publish playbook | Orchestrator | Outside the repo, in harness memory. It still describes a folder publish from the checkout. The orchestrator updates it; the repo law no longer depends on it (ballot § 3.1) |

### Left as historical records, (c), not edited
- `.kiro/docs/ballots/**`: the publish-rail, completion-claims-integrity, Q6 retirement and 127 outline-settle ballots.
- `.kiro/specs/**` and `docs/specs/**`: 101, release-management-system, 065, 123 completion docs and claims passes, 125-A, 127, XXX-release-system-operations.
- `docs/releases/RELEASE-NOTES-11.0.0.md`, `docs/releases/15.0.0/publish-verification.txt`, `docs/roadmap/2026-07-04-full-project-audit.md`.
- Test fixtures under `tools/agent-generator/__fixtures__/` and `scripts/completion-claims/__fixtures__/`.
- `.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md` L6, a trigger definition worded for 15.0.0.

### Checked accurate (no change)
- `scripts/verify-publish-rail.sh` comments;
- `.kiro/hooks/complete-task.sh` (it cites "Deriving" § 5b, which is unchanged);
- `governance/classification-map.md` `publish-rail-guard` (step 6's rail half is unchanged; the new row is an addition at ballot § 4);
- `canonical/operative-sets/{stacy,thurgood}.yaml` and `canonical/profiles/consumer/stacy.dispositions.yaml` (Step 5a references);
- `.kiro/steering/**`: 0 hits;
- `README.md` and `governance/DesignerPunk-Integration-Guide.md`: no embedded dependency-version claims. The zod/ajv disclosure is owed in the next release's notes (ballot § 7), not on these surfaces.

### Overlap
`.kiro/issues/2026-08-12-release-manager-retirement-execution.md` also touches RELEASE-FLOW (its PR 2's "Deriving the delta" addition, already applied) and governance-reference adjudications. Recorded by pointer only. Nothing here expands into its 36-file cleanup.
