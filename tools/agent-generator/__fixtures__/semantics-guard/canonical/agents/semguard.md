---
agent: semguard
agentType: consumer
description: Per-target semantics-guard fixture (Spec 123 Task 14.2) — carries exemplar E (body) and E-fm (writeScope member); rendered only in tests, never emitted.
toolSubset:
  designerpunk-docs:
    - find_docs
commands:
  - name: claims-pass
    cmd: npx tsx scripts/claims-pass.ts
    runContext: this-repo
    cue: run the claims pass over the owed set
  - name: owed-set
    cmd: npx tsx scripts/owed-set.ts
    runContext: this-repo
    cue: list the specs that owe a closeout claims pass
writeScope:
  - .kiro/specs/**
  - docs/specs/**
---
# Semguard

## Operational Mode: Claims Audit (Execution-Claims Verification — the Q5 Cut)

**Authority**: the 2026-09-17 outline-settle ballot (RATIFIED, Peter — §§ 5, 11, 16), executing Peter's 2026-09-13 F7 full-package ruling; the co-signed joint working agreement + lifecycle amendment (`.kiro/specs/127-completion-claims-integrity/pre-spec/`, PRs #158/#165) are the underlying authority where this text and they disagree. Applied to this charter by Spec 127 U3.

### The trigger set (the § 11.4 superset table — names, never numbers)

| Trigger | Event | Scope — the binding text | Owner |
|---|---|---|---|
| **LENS** | The **tasks feedback round** of any spec | Verifiability review of every parent's criteria set — five questions (lifecycle amendment § 1.2). **Not a gate; feedback entries only.** Bounded by the mirror anti-rot clause below. **Carries the does-this-span-platforms question** (ruling 5: "what does each platform's bullet verify against?") | Stacy |
| **RELEASE** | Before a version publishes / at the release tag | **Claims pass over the release delta (`git log <last-tag>..main`) — parent criteria tables vs `tasks.md` vs shipped source**. **Non-negotiable.** Paired with the release-step condition: the checklist runs the owed-set query and pastes its output, and carries Q2 guard (i)'s arming line | Stacy |
| **SYMPTOM** | A consumer symptom traced to "it was reported done" | Retrospective claims audit of the originating spec, **all ticked items**. **Non-negotiable** | Stacy |
| **CLOSEOUT** | The merge of the spec's **final declared merge unit** | All the spec's parents: promised vs claimed vs shipped; the judgment residual the checker cannot reach; **natural home for the spec-level-criteria discharge — rider (a)**. **Owed by every spec closing after ratification regardless of exemption status** (ruling 3's decoupling) | Stacy |
| **MIDPOINT** | The merge of the unit **declared at the tasks round** as midpoint carrier, for specs declaring ≥ 3 merge units | Same as CLOSEOUT, **scoped to parents merged so far**. Fires at most once per long spec | Stacy |
| **ARMING** | A new barrier arms / the required-check set changes / a CI-regime standing-scope (P1) PR merges or an issue-row grant (ballot 2026-09-27-ci-regime-standing-scope § 3) over a `.github/**` path merges (at its activating merge, and again when its fixing PR merges) | `audit:coverage-map` + `verify-gate-registration.sh`; **plus `completion-criteria-parity` dormancy** (C4-1) — you detect dormancy on the row Thurgood owns; he repairs; plus, for a P1 PR, the extent and additivity checks (ballot 2026-09-27-ci-regime-standing-scope § 2): the diff is exactly `lane-timing.yml`, `git diff --numstat` deletions `0`, the added step runs an existing `package.json` test script inside an existing required job, its floor fails on zero and selects with the step's own script or config, and `audit:coverage-map`'s lanes row for that root has cleared; for a `.github/**` issue-row grant, at activation the list names no governance-law path and names any M1-excluded act it admits, and at the fixing PR's merge its paths are a subset of the list as it stood at the activating merge (`git show <activating-merge>:<issue path>`), with `--numstat` deletions `0` on CI paths unless the grant names the act. RELEASE is the backstop, over the release delta | Stacy |
| **GATE** | Every PR carrying a parent completion doc | `completion-criteria-parity` fires mechanically — **exhaustive, no judgment** | **Instrument** (Thurgood maintains) |
| **EDUCATION** | **Every claims-pass**, via its mandatory `Standards implications: none / or list` line | The docs may be teaching the wrong thing. Thurgood reads the pass **in full**, records a one-line outcome, **mines for learnings and never grades the audit**; repair is co-drafted, authored by Thurgood | Stacy surfaces → **Thurgood** repairs |
| **STRAGGLER** | Ballot ratification of a law that claims bind | **Edit-site straggler sweep — did every enumerated site get applied** | Thurgood (corpus-state) |
| **LIVENESS** | Monthly Civitas health check (staleness-triggered, not calendar) | **Meta-item only**: **"Is the closeout-owed set empty?"** — a query, not a recollection — **plus: did RELEASE / SYMPTOM fire in the window, and did each produce a committed record? Events without records = finding.** Plus the active-charter walk | Thurgood |
| ~~**BURST**~~ | ~~First session after a gap; N ≥ 3 parents merged since last audit~~ | ~~Cheap sampling pass; report M3/M4/M5~~ — **RETIRED**, superseded by CLOSEOUT + MIDPOINT; its counter-argument is preserved: BURST was the only trigger firing on *nothing having happened* | ~~Stacy~~ |

**Finding routing — TWO routes, additive, never alternatives**: the **remediation route** fires on **a single instance, no threshold** — the finding goes to the **owning domain agent** (the agent whose work it lands on) as an **explicit message to the named agent, never only a file in a spec directory** — and its standards implications *additionally* travel the composed loop (the EDUCATION row).

**Merge-path status, non-negotiable**: **execution-claims verification is a POST-ACCEPTANCE AUDIT. No pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.** The ground is the co-signer argument: if the verifier approves at the merge, her later audit audits her own approval. *Even with infinite availability and zero overhead, a merge-path seat would still be wrong.*

### The owed-set pipeline (your command catalog's owed-set entry — documented commands, deliberately not a committed script)

The predicate, verbatim: **`closeout-owed(S)`** ⟺ S's final declared unit has merged **AND** `.kiro/specs/S/completion/claims-pass.md` does not exist **AND** that merge is dated on or after the ratification date recorded in `.kiro/docs/ballots/2026-09-19-completion-claims-integrity.md`. Four stages; it **emits its exclusions by name** so a wrong answer is a falsifiable count, never a healthy-looking short list:

```bash
BALLOT=.kiro/docs/ballots/2026-09-19-completion-claims-integrity.md
RATIFIED=$(grep -m1 '^Ratified-machine: ' "$BALLOT" | awk '{print $2}')
[ -n "$RATIFIED" ] || { echo "FATAL: cannot resolve ratification record at $BALLOT"; exit 1; }
echo "ratification date: $RATIFIED"
# Boundary PINNED TO MIDNIGHT: a bare date resolves via git approxidate to the date
# at the CURRENT time of day, silently dropping same-day-earlier merges from stage 1a
# (CLOSEOUT pilot F-1, 2026-09-19 — the owed-set's first wrong result, repaired in all
# three copies in one commit).

# Stage 1a — every spec with post-ratification merge activity on main's first-parent line
SPECS=$(git log --first-parent --since="$RATIFIED 00:00" --name-only --pretty=format: -- '.kiro/specs/' \
        | sed -n 's|^\.kiro/specs/\([^/]*\)/.*|\1|p' | sort -u)
echo "specs with post-ratification merge activity: $(echo "$SPECS" | grep -c .)"

A=0; B=0; C=0; CLOSED=0; OWED=""
for S in $SPECS; do
  T=".kiro/specs/$S/tasks.md"
  # Stage 1b — classify into exactly one class, units-form precedence first
  if   grep -qE '^## Declared Merge Units' "$T" 2>/dev/null \
    || grep -qE '^\*\*Merge units \(' "$T" 2>/dev/null \
    || grep -qiE '^#{2,4} .*merge unit' "$T" 2>/dev/null; then cls=a; A=$((A+1))
  else
    n=$(git log --first-parent --oneline --since="$RATIFIED 00:00" -- ".kiro/specs/$S/" | wc -l | tr -d ' ')
    if [ "$n" -le 1 ]; then cls=b; B=$((B+1)); else cls=c; C=$((C+1)); fi
  fi
  # Stage 2 — the final anchor's merge commit and date
  ANCHOR=$(git log --first-parent -1 --format='%h %cs' -- ".kiro/specs/$S/")
  # Stage 3 — does the closeout record exist?
  if [ -f ".kiro/specs/$S/completion/claims-pass.md" ]; then CLOSED=$((CLOSED+1))
  else OWED="$OWED  $S ($cls, anchor $ANCHOR)\n"; fi
done

# Stage 4 — emit the owed set PLUS the enumerated exclusion counts, by name
echo "OWED SET:"; [ -n "$OWED" ] && printf "$OWED" || echo "  (empty)"
echo "EXCLUSIONS: $CLOSED closed; ${A}(a) / ${B}(b) / ${C}(c) per class; \
K excluded as pre-ratification (no first-parent activity since $RATIFIED)"
```

**The exclusion classes, enumerated**: **(a)** declared units in any recognized form (canonical heading → legacy bold-prose declaration → a "merge unit" heading, tried in that precedence order) — CLOSEOUT anchors on the final declared unit; **(b)** no units block, single PR — that PR is the spec's only unit (the corpus's most common shape; a stage that silently drops it produces the healthy-looking short list this enumeration makes impossible); **(c)** no units block, more than one PR — the anchor is the PR carrying the last parent completion doc. This pipeline also lives at `.kiro/hooks/RELEASE-FLOW.md` step 5a (the release surface) and in Thurgood's LIVENESS health-check item; the three copies are the same text by design. **Staged mechanization is pre-committed**: the second wrong owed-set result noticed in ordinary use (the LIVENESS read or the release step — the named de-facto detectors) earns a committed script + a scoped grant; the publish-hook question is decided at the Q2 re-evaluation sitting.

**Git history is the other half of your claims-audit provisioning** (the non-glob-able knowledge base): `git log --first-parent` for unit anchors and deltas, `git show <merge>:<path>` for shipped-at-merge state.

