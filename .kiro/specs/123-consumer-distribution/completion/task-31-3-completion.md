# Task 31.3 Completion — the cite-only commit (divergents 6, 8 and 9), declared outside the re-sign round

**Date**: 2026-10-12
**Agent**: Thurgood (Opus) · PRIMARY, Task 31
**Branch**: `task/123-u3c-profile-corrections`, on 31.2 (`dc86ef3ac`)

**Declared and counted separately** (signing-act ballot § 2 clauses 4–5, the "Cite-only corrections stay outside the round" criterion):
- This commit is **authoring**: a `cites` change, not a signing act.
- It moves no hash, so no act follows from it.
- It is **not** part of the 31.4 re-sign round, and it **closes no divergent**: they are carried, pending Peter's RS-1 answer.

## The edit (before/after pairs)

| Divergent | Row | Before | After |
|---|---|---|---|
| 6 and 9 (J-6657's secondary ground; J-346E) | `kenya.dispositions.yaml` `ambient.groundTruthManifest.trims[dist/ComponentTokens.ios.swift]`, `removals[0]` ("a stale generated artifact, not the source of truth") | `cites: subtraction-3` | `cites: subtraction-1` |
| 8 (J-BA84) | `data.dispositions.yaml` `ambient.groundTruthManifest.trims[dist/ComponentTokens.android.kt]`, `removals[0]` (same text) | `cites: subtraction-3` | `cites: subtraction-1` |

**Why subtraction-1** (Thurgood, the profile author):
- The removed phrase characterizes this repo's own build snapshot, a repo-internal tooling artifact.
- The profile already cites subtraction-1 for that class: "the built `dist/*` snapshots" on the two theming rows, and Data's other snapshot-wording removals.
- Subtraction-3 (stewardship cadences and instruments as obligations) does not describe it. Three blind seats found that independently (J-BA84, J-346E, J-6657's secondary ground).

## The signers' reads (relayed by the orchestrator, 2026-10-12; read before this commit)

- **Kenya** (divergents 6 and 9): **ACCEPT** the cite change on `trims[dist/ComponentTokens.ios.swift]`, on the reasoning above. He explicitly does **not** read it as closing the divergents (carried; RS-1). He will **reject the `theming-1` removals cite at 31.4 if it does not hold**.
- **Data** (divergent 8): **ACCEPT** the cite change on `trims[dist/ComponentTokens.android.kt]`, on the same reasoning, also explicitly **not** as closing the divergent. Recorded, as he asked:
  - (a) subtraction-1 "fits better but is not exact": the phrase is a descriptor of a repo artifact, not literally a tooling invocation;
  - (b) clause (iii) requires the removed block to contain a deny-list hit, and he did not find the deny-list's source.
- **Thurgood on (b)**: no deny-list exists in code at this revision.
  - `git grep -i deny` over `tools/agent-generator` (tests excluded) finds none.
  - Req 11.3 (iii)'s applicability verification is therefore a human reading today. The schema checks only that `cites` is one of `subtraction-1`…`subtraction-5` (`tools/agent-generator/regrounding/dispositions.ts` L87–93 (the list), L338 (the removals check)).
  - That gap is recorded under the instruments block's `## Found later`.
- *Record form*: the reads above are the orchestrator's relay of the two seats' answers. They are not verbatim files. If the seats' own words are committed later, they go beside `task-31-reads/` and this section cites them.

## The instrument — the stale list before and after this commit is identical

Before (on `dc86ef3ac`):
```
STALE LIST (all freshness findings): 6
  stale-signature | canonical/profiles/consumer/data.dispositions.yaml | #android-theming-spec-094 | signature on #android-theming-spec-094 is stale — its canonical or rendered content changed since signing; re-sign or refuse
  stale-signature | canonical/profiles/consumer/data.dispositions.yaml | ambient.groundTruthManifest.verdict | signature on ambient.groundTruthManifest.verdict is stale — its canonical or rendered content changed since signing; re-sign or refuse
  stale-signature | canonical/profiles/consumer/data.dispositions.yaml | commands[platform-tokens] | signature on commands[platform-tokens] is stale — its canonical or rendered content changed since signing; re-sign or refuse
  stale-signature | canonical/profiles/consumer/kenya.dispositions.yaml | #ios-theming-spec-094 | signature on #ios-theming-spec-094 is stale — its canonical or rendered content changed since signing; re-sign or refuse
  stale-signature | canonical/profiles/consumer/kenya.dispositions.yaml | ambient.groundTruthManifest.verdict | signature on ambient.groundTruthManifest.verdict is stale — its canonical or rendered content changed since signing; re-sign or refuse
  stale-signature | canonical/profiles/consumer/kenya.dispositions.yaml | commands[platform-tokens] | signature on commands[platform-tokens] is stale — its canonical or rendered content changed since signing; re-sign or refuse
```
After (this commit's edit):
```
STALE LIST (all freshness findings): 6
  stale-signature | canonical/profiles/consumer/data.dispositions.yaml | #android-theming-spec-094 | signature on #android-theming-spec-094 is stale — its canonical or rendered content changed since signing; re-sign or refuse
  stale-signature | canonical/profiles/consumer/data.dispositions.yaml | ambient.groundTruthManifest.verdict | signature on ambient.groundTruthManifest.verdict is stale — its canonical or rendered content changed since signing; re-sign or refuse
  stale-signature | canonical/profiles/consumer/data.dispositions.yaml | commands[platform-tokens] | signature on commands[platform-tokens] is stale — its canonical or rendered content changed since signing; re-sign or refuse
  stale-signature | canonical/profiles/consumer/kenya.dispositions.yaml | #ios-theming-spec-094 | signature on #ios-theming-spec-094 is stale — its canonical or rendered content changed since signing; re-sign or refuse
  stale-signature | canonical/profiles/consumer/kenya.dispositions.yaml | ambient.groundTruthManifest.verdict | signature on ambient.groundTruthManifest.verdict is stale — its canonical or rendered content changed since signing; re-sign or refuse
  stale-signature | canonical/profiles/consumer/kenya.dispositions.yaml | commands[platform-tokens] | signature on commands[platform-tokens] is stale — its canonical or rendered content changed since signing; re-sign or refuse
```
`diff` of the two: **identical**. Regenerating after the edit (`npx tsx tools/agent-generator/generate.ts`) moved **no** output file, which confirms that `cites` is in neither hash (the sweep compares canonical source text and the rendered span only: `freshness.ts` L363–369).
