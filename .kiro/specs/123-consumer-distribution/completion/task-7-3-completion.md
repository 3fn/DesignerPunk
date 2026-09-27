# Task 7.3 Completion — B-U1 record-first; Stacy's review of the register row

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 7 · **Agent**: Thurgood (Sonnet)

## What changed

**The full arc, in order**:

1. **Draft** — B-U1 authored (`.kiro/docs/ballots/2026-09-27-123-b-u1-publish-rail.md`), `Status: DRAFT`, carrying the RELEASE-FLOW.md step 6 text and the `publish-rail-guard` register row.
2. **Stacy's first review** — ACCEPT-WITH-CHANGES, two Critical findings: R1-1 (the `npm view` form + its required hermetic env vars broke every release, and would not have been hermetic even fixed) and R1-2 (the `.log` paste target is gitignored; step 6 named no route to protected `main`), plus four required/recommended corrections (R1-3..R1-7).
3. **Peter's ruling on R1-1** — drop the `npm` CLI entirely; the guard queries `registry.npmjs.org` directly over HTTP.
4. **First rework** — the script rewritten to the HTTP form; all six requirements/design/tasks errata applied; CHANGELOG.md's ten corrections (C1–C10) applied.
5. **Stacy's re-check** — ACCEPT (`task-7-3-stacy-review.md`, "Re-check addendum," commit `2d83f266`). Ruled `check_state: armed` STANDS, binding condition: only if the row and step 6 land in the same commit. Named five non-blocking fixes to land before ratification.
6. **Second rework** — the five fixes applied (`curl -q`, exit `2` for unset `VERSION`, the 404-after-publish note, "bite" reserved for reds, the 7.4 doc's Req 6.1 claim narrowed).
7. **Peter's ratification ruling** — reviewed the final step-6 text, the `FAIL[version]` message, and the unset-`VERSION` `USAGE` message verbatim. Ruled: add one more parenthetical (`~/.curlrc` + proxy-env honouring, matching the script header), **then ratify**.
8. **This commit** — the parenthetical applied to the ballot's § 3 text; `Status` flipped to `RATIFIED (Peter, 2026-09-27)`; the **`Ratified-machine:` line OMITTED, deliberately** (see below); the README index entry added; § 3's `RELEASE-FLOW.md` edit and § 4's register row **applied to their target files, in this same commit**, per the record-first protocol.

### The `Ratified-machine:` decision

**Omitted**, following the T1-(B) (`2026-09-26-tasks-row-write-scope-grant.md`) and `delegated-tier-capture` precedent, not the `2026-09-19-completion-claims-integrity.md` precedent. That mechanism is reserved for exactly the one ballot `completion-criteria-parity` parses for its in-force date — reproducing it on any other ballot would create a second parseable record for a checker built to read exactly one. B-U1 is not that ballot, so the omission precedent applies, and the ballot's `Status` line states this reasoning explicitly rather than leaving the omission to be discovered.

### Applied edits — `diff`-verified identical to the ratified ballot text

- **`.kiro/hooks/RELEASE-FLOW.md`**: new step 6 inserted after step 5, before "## What changed and why". Verified:
  ```
  $ sed -n '/^6\. \*\*Run the publish-rail guard/,/^   without a committed record the pass has nothing to read\.$/p' \
      .kiro/docs/ballots/2026-09-27-123-b-u1-publish-rail.md > /tmp/ballot-step6.txt
  $ sed -n '/^6\. \*\*Run the publish-rail guard/,/^   without a committed record the pass has nothing to read\.$/p' \
      .kiro/hooks/RELEASE-FLOW.md > /tmp/releaseflow-step6.txt
  $ diff /tmp/ballot-step6.txt /tmp/releaseflow-step6.txt && echo "IDENTICAL"
  IDENTICAL
  ```
- **`governance/classification-map.md`**: the `### publish-rail-guard` entry appended after `tasks-row-write-scope-grant`, in commit order. Verified:
  ```
  $ sed -n '127,141p' .kiro/docs/ballots/2026-09-27-123-b-u1-publish-rail.md > /tmp/ballot-row.txt
  $ sed -n '862,876p' governance/classification-map.md > /tmp/applied-row.txt
  $ diff /tmp/ballot-row.txt /tmp/applied-row.txt && echo "IDENTICAL"
  IDENTICAL
  ```
  **One deliberate non-addition, recorded so it isn't mistaken for an oversight**: the applied row does NOT carry a third history entry documenting the ratification/application event itself, even though one was drafted during this work. Peter's framing — "add it and then ratify," so he ratifies **the exact text that lands** — means the ratified ballot text is the canonical text; adding anything to the applied row that wasn't in the ratified ballot text would break exact equality and contradict that framing. The ratification event itself is fully recorded in the ballot document's own `Status`/`Ratified-machine` block instead, which is its natural durable home.
- **`.kiro/docs/ballots/README.md`**: one index entry added under "Ballots on record", per the convention every other ratified ballot follows.

## Targeted tests + result

- Both `diff` commands above: **IDENTICAL** (recorded, not just asserted).
- `grep -c "^### " governance/classification-map.md` → 32 (31 prior + this one; 31 live entries + the one non-entry "Illustrative Example" heading, consistent with the row's own "30 live ids + this one (31)" sweep count recorded before this row existed).
- No test suite parses `RELEASE-FLOW.md` or the ballots directory; `classification-map.md`'s schema conformance was Stacy's own re-check (ACCEPT), not re-verified mechanically here (no schema-linting tool exists for this register).

## Application-time adaptations

- **The drafted third history entry for the register row was written, then removed**, once the "exact text that lands" framing was applied literally to the diff-equality requirement. This is a visible course-correction within this same task, not a silent one — recorded here as the adaptation it was.
- **The README index entry's write scope**: `.kiro/docs/ballots/README.md` is not in Task 7's `Primary Artifacts` list, but the coordinator (relaying Peter's ruling) explicitly instructed "Add any README index entry the convention requires" — an explicit, named authorization for this specific edit, not an inferred one.
