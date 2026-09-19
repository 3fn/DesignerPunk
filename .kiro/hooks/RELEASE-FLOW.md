# Release Flow Under the PR Gate

**Date**: 2026-07-05
**Purpose**: The release sequence once `main` is branch-protected (Spec 125-A) — how version bumps, release notes, and the token-index traverse the gate, and why `npm publish` no longer touches git
**Organization**: process-standard
**Scope**: cross-project

> Built by Spec 125-A Task 2 (Req 4.4, form (a): **traverse — no standing exemption**).
> Task 4's law application references this doc. Before this reconciliation,
> `package.json`'s `postpublish` pushed a token-index commit directly to `main`,
> which would hard-fail MID-PUBLISH the moment branch protection lands (Task 3).

---

## The rule

**`npm publish` is a read-only git citizen.** Everything that must land in git —
version bump, release notes, regenerated `token-index/` — lands via a **release PR**
that traverses the gate *before* publish. Publish happens **from merged `main`**.
Nothing in the publish lifecycle commits or pushes.

## Deriving the delta (the judgment half — added 2026-08-12, Q6 ballot; proven by the v14.0.0 release)

Before step 1 below, the release author derives-classifies-ratifies:

1. **Derive**: `git log $(git describe --tags --abbrev=0)..main --oneline` (all changes — squash titles are the changelog spine) and the same log scoped to the SHIPPED surface — **authoritative list: `package.json` `files[]`** (`src/` alone misses served-content roots like `governance/`; v14's docs-corpus entry lived there). Issue-driven work appears ONLY here — never assume spec summaries cover the delta.
2. **Classify** each change 🔴 breaking / 🟡 minor / 🔵 patch-internal, reading task summaries or PR bodies for substance.
3. **Peter ratifies the bump**; notes are hand-authored at `docs/releases/release-X.Y.Z.md` (v14.0.0 = format precedent) and ride the release PR below.
4. Publish mechanics: the dual-registry playbook (public npm needs Peter's login/2FA; expect the ~30-day token expiry — an E404 on publish is a masked auth failure).
5. **Claims-pass owed set + the arming question** — see the named step below. **Both lines produce artifacts, not reminders.**

### Step 5 — run the owed-set query, paste its output, and confront the arming question

Release is where both of this repository's consumer-reaching completion-claim escapes crossed. Two named lines run here, at release-prep start.

#### 5a — RUN the owed-set query and PASTE its output into release-notes prep

**The predicate**, verbatim:

> **`closeout-owed(S)`** ⟺ S's final declared unit has merged **AND** `.kiro/specs/S/completion/claims-pass.md` does not exist **AND** that merge is dated on or after the ratification date recorded in `.kiro/docs/ballots/2026-09-19-completion-claims-integrity.md`.

**The pipeline** — four stages, as **documented commands, not a committed script**. Run it; paste what it prints.

```bash
BALLOT=.kiro/docs/ballots/2026-09-19-completion-claims-integrity.md
RATIFIED=$(grep -m1 '^Ratified-machine: ' "$BALLOT" | awk '{print $2}')
[ -n "$RATIFIED" ] || { echo "FATAL: cannot resolve ratification record at $BALLOT"; exit 1; }
echo "ratification date: $RATIFIED"

# Stage 1a — every spec with post-ratification merge activity on main's first-parent line
SPECS=$(git log --first-parent --since="$RATIFIED" --name-only --pretty=format: -- '.kiro/specs/' \
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
    n=$(git log --first-parent --oneline --since="$RATIFIED" -- ".kiro/specs/$S/" | wc -l | tr -d ' ')
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

**What each class means, and why class (b) is spelled out**: **(a)** the spec declares units in any recognized form — the canonical `## Declared Merge Units` heading, the legacy bold-prose declaration, or a heading containing "merge unit", tried in that precedence order — so CLOSEOUT anchors on the **final declared unit**. **(b)** no units block and a single PR: that PR **is** the spec's only unit. *This is the corpus's most common shape, and a stage that silently drops it produces a healthy-looking short list — the exact failure this enumeration exists to make impossible.* **(c)** no units block, more than one PR: the anchor is the PR carrying the **last parent completion doc**.

**The one judgment point, named rather than hidden**: stage 2 resolves the anchor as *the most recent first-parent commit touching the spec*. For class (a) that is a proxy for "the final declared unit merged" and for class (c) a proxy for "the PR carrying the last parent completion doc". **Where the proxy and the definition disagree, the definition governs and the operator says so in the pasted output.** A wrong owed-set result noticed here counts toward the promotion ladder below.

**Named classes in the exclusion line, so a wrong answer is a falsifiable count rather than a healthy-looking short list.** Stacy's command catalog (`canonical/agents/stacy.md`, U3) carries this same pipeline as its authoritative home; this step and the monthly health check's LIVENESS item are its two run surfaces.

**An empty set is pasted as an empty result.** The step produces a record either way — that is the whole point of running a query instead of recalling an obligation.

*Note on the MIDPOINT record*: a spec declaring ≥ 3 units carries its midpoint pass at `completion/claims-pass-midpoint.md`. The predicate above keys on `claims-pass.md` **exactly**, so a midpoint record never discharges a closeout obligation.

#### 5b — *"if arming is undecided, decide it now"*

**Release-prep start — concretely, the creation of the version-bump PR — is the event anchor for the `completion-criteria-parity` arming decision.** If that decision is still open when this step runs, **it is decided here**, not deferred past a release. Deciding **not** to arm is a lawful outcome: the evidence guard forbids arming before the convention has shipped, the Tier-3 worked example is fixed, and **N ≥ 5** in-scope parents have completed under the convention with parity **measured by audit, not by the checker**. What is not lawful is shipping a release with the question unexamined.

#### The staged-mechanization ladder, and its named de-facto detectors

The owed-set pipeline is **documented commands, not a committed script**, deliberately. Its promotion path is pre-committed and is the only path:

**documented pipeline → (second wrong result) committed script + scoped grant → (the Q2 re-evaluation sitting) publish-hook decision.**

**The de-facto detectors are named**: a wrong owed-set result **noticed in ordinary use** counts toward promotion, and the two ordinary-use surfaces are **(1) the LIVENESS read at the monthly Civitas health check** and **(2) this release step**. No detection project is created and no new obligation is added — the two places the query is already run are the two places a wrong answer is already visible. *Recorded honestly: this is detection-by-use, not detection-by-guard. It cannot catch an omission that neither reader recognizes. It converts an unfireable trigger into a fireable one; it does not make the pipeline self-checking.*

**Successor release tooling inherits this step as a REQUIREMENT, not as a convention it may re-derive.** Any future release tooling that replaces this document carries step 5 forward in both halves — the run-and-paste owed-set query and the arming line. **There is to be no parallel second mechanism**: the ladder above is the only path from documented pipeline to automation.

*(The automated analyze/notes/release CLI was retired 2026-08-12 — ballot `2026-08-12-q6-release-manager-retirement.md`; tag + GitHub release are manual: `git tag -a vX.Y.Z && git push origin vX.Y.Z && gh release create vX.Y.Z --notes-file docs/releases/release-X.Y.Z.md`.)*

## The sequence

1. **Release branch**: `git switch -c task/<spec>-<N>-<slug>` (or `chore/release-vX.Y.Z`
   for a standalone release) from up-to-date `main`.
2. **Prepare the release on the branch**:
   - version bump in `package.json` (and any sub-packages),
   - release notes / changelog updates,
   - **regenerate the token-index**: run `npm run build` (its generation steps
     refresh `token-index/`), then commit any resulting `token-index/` diff.
3. **Open the release PR** (`./.kiro/hooks/complete-task.sh` for spec-task releases,
   or `gh pr create` for standalone chores). Required checks run on the PR.
4. **Peter merges on green.** The version bump + notes + token-index land on `main`
   as one squash commit.
5. **Publish from merged `main`**: `git switch main && git pull`, then `npm publish`
   (per the dual-registry playbook where applicable).
   - `prepublishOnly` runs `build` + `check:drift` + `verify:token-index-clean` —
     if the freshly-built `token-index/` differs from what's committed, **publish
     aborts loudly before anything ships** (the fix: go back to step 2's regeneration
     on a branch; the release PR was incomplete).
   - `postpublish` never pushes. If `token-index/` somehow changed during publish
     anyway, it prints a warning telling you to route the diff through a PR.

## What changed and why (Req 4.4 justification)

| Lifecycle script | Before | After |
|---|---|---|
| `prepublishOnly` | `build && check:drift` | `build && check:drift && verify:token-index-clean` — blocks publish if `token-index/` wasn't committed on the release branch |
| `postpublish` | `git add token-index/ && git commit … && git push origin main` | warn-only tripwire; **no git write, no push** |

**Form chosen: pre-publish verification on the release branch** (Req 4.4 form (a),
"regenerated on the release branch pre-merge") rather than a postpublish auto-PR,
because:

- **Deterministic publish**: the published artifact and the committed `token-index/`
  are guaranteed in sync *at publish time*; an auto-PR form ships first and
  reconciles later, leaving `main` lagging the registry until someone merges.
- **No mid-publish git mutation**: publish cannot half-fail with a dangling local
  commit (the old failure mode Task 3 would have created).
- **Structurally cannot push `main`**: neither lifecycle script contains a push at all.

## Emergency note

If a publish is somehow needed while the gate blocks a required fix, that is the
Item 1f emergency procedure (Peter lifts protection, acts, re-enables, logs in the
125-A findings ledger) — never a script-level bypass.
