# Spec 123 — Thurgood's G2 spec-text ruling (G2-F1, G2-F2, G2-F3): the recorded reading

**Date**: 2026-10-12
**Author**: Thurgood (spec standards; owner of the spec-text half of the three findings, `.kiro/issues/2026-10-02-g2-pass-four-findings.md` § "Split of work")
**Form**: FK-4, settled between owners in the U3 amendment round (Stacy and Thurgood; Lina has no stake beyond buildability; Ada abstains). The form is **a design C15 erratum plus this recorded reading**, and the erratum cites this file. **No `requirements.md` edit** is made, so the deferred "next requirements touch" folds stay deferred.
**Authority**:
- Peter's PR-5.5: the ruling is its own record, in its own PR, merged by Peter, before U3g's branch is cut.
- Stacy pre-reads it for verifiability only.
- Lina confirms she can build to it.
- Thurgood writes none of cycle 2's test text.
**Inputs**:
- Stacy's pass-four verdict record, § "Findings": `.kiro/specs/123-consumer-distribution/completion/re-grounding-pass-four.md`.
- Req 11.4 and 11.4.1.
- Design C15, C18.
- `tools/agent-generator/regrounding/derivation.ts` (`checkDerivation`), as merged.

---

## R1 — Clause (2), HONEST NAMING (G2-F1): membership, not containment

**Req 11.4's text governs, and design C15 departs from it.**
- Req 11.4 (2): "the destination named in the disposition is **among the spans satisfying (1)**".
- Design C15 reads it as "at least one span in `D` **lies within** the destination". `checkDerivation` implements that reading: `d.some((x) => containedIn(x.ref, destination, …))`.
- That containment accepts any ancestor of S as a destination. That is attack (f), measured on rows A3 and F5.

**The reading.**
- A `re-pointed` disposition satisfies clause (2) **iff its destination is identical to the source reference of at least one span in `D`**. Identity is decided in the same tree (body partition tree or frontmatter entry tree) and resolved structurally, never by anchor-string prefix (the containment pin's rule, Req 11.4).
- **An ancestor of a span's source does not satisfy it. A sibling does not satisfy it.** No containment relation in either direction satisfies it.
- Under 10.G's same-partition invariant, a span and a unit coincide, so for every in-place re-pointing the passing destination is **S itself**. That is what the committed dispositions name (for example `"#identity"` → `"destination": "#identity"`).

**Why membership is right.** Clause (2) exists so that the destination a disposition *claims* is one the generator *shows* deriving from S. Containment lets the claim be any enclosing section, so it verifies a claim nobody made.

## R2 — Clause (1), DERIVATION (G2-F3): a whitespace-only span derives nothing

**The finding.** `emitSpans` renders an emptied re-pointed overlay as a one-line span (`ensureTrailingNewline('')` → `'\n'`) attributed to S. So clause (1) can never fail on the re-pointed lane. The pre-statement ("so (1) fails") and Task 14's rows describe a test model, not the generator's emission of attack (a).

**The reading.** Req 11.4 (1) requires that "something in the shipped charter demonstrably *derives from* S".
- **A span whose rendered text, over its declared line range, is empty or whitespace-only is not in `D`.**
- For a frontmatter entry, a rendered value that is empty or whitespace-only is not in `D`.
- So an emptied overlay leaves `D` empty, and the result is `FAIL_NO_DERIVATION`, as the pre-statement and Task 14's rows said.

**Where the fix lives is Lina's.** Either `emitSpans` emits no span for an empty overlay (`tools/agent-generator/spans.ts`, which Task 29 lists as conditional on this ruling), or `checkDerivation` filters `D` against the rendering. Either one meets this reading.

## R3 — Req 11.4.1, "implemented" (G2-F2): ruled by Peter (PR-5.4), recorded here

- **The ruling.** "Implemented … against Requirement 10's substrate" means **the check ran on the shipped material**: the committed consumer profile and every committed target rendering under `canonical/_consumer-output/{_canonical,cc,kiro}/**`, including the Kiro agent JSON.
- **What it requires**:
  - a stated, non-zero row count;
  - it runs on every PR that touches its inputs.
- **Ruled out**: a reading under which tests over fixture renderings alone suffice. Under that reading, `checkDerivation` was "implemented" while it was applied to nothing.

## R4 — The two non-readings: neither is adopted

- **(α) Re-rendered overlay (`render`) spans do not count as derivation: NOT adopted.**
  - An overlay re-grounds S's canonical text. It is pinned to S's canonical hash, a stale overlay is refused (design § Error Handling, "stale overlay"), and a routed unit carries a signer's itemized assent (C17, C18). An overlay span sourcing S is exactly the derivation clause (1) asks for.
  - Adopting (α) would fail 141 honest rows (Lina's provisional sizing).
- **(β) The check extends to `superseded-by` rows: NOT adopted.**
  - Req 11.4's criterion is stated for "a `re-pointed` disposition". A `superseded-by` row names what replaces S, not where S's content went, so a derivation check is the wrong instrument for it (20 rows would fail by construction).
  - The honesty of a `superseded-by` row stays with its existing instruments: clause (iii), deletion accounting, and the signer.

Adopting neither means neither fires Task 29's ceiling by construction.

## R5 — Pass/fail on the measured rows (for Lina's build and Stacy's attack file)

Clause (1) is evaluated first. A row that fails it reports `FAIL_NO_DERIVATION`. Clause (2) is evaluated only on a non-empty `D`.

| Row | Shape (pass four's record) | Under this reading |
|---|---|---|
| A3 | body S emptied; destination = S's own `##` parent | **FAIL**: `FAIL_NO_DERIVATION` (R2). With S's overlay non-empty and the parent as destination: `FAIL_DISHONEST_NAMING` (R1) |
| F5 | `commands[ios-build-test]` emptied; destination = `commands` | **FAIL**: `FAIL_NO_DERIVATION` (R2). Non-empty with destination `commands`: `FAIL_DISHONEST_NAMING` (R1; the parent entry is not the span's source) |
| C1 | a true rendering of S; destination = a sibling | **FAIL**: `FAIL_DISHONEST_NAMING` (`D` non-empty; the sibling is not among `D`'s sources) |
| F3 | frontmatter analogue of attack (a), verbatim (emptied; sibling destination) | **FAIL**: `FAIL_NO_DERIVATION` |
| A1, A2, AS1, AS2 | attack (a) rows, currently `FAIL_DISHONEST_NAMING` | **FAIL**: `FAIL_NO_DERIVATION` where S is emptied (attack (a) verbatim); `FAIL_DISHONEST_NAMING` for any row whose S keeps non-whitespace text and names a destination other than S |
| attack (a), one-token variant (G2-F1) | S reduced to one token; sibling destination | **FAIL**: `FAIL_DISHONEST_NAMING` |
| honest in-place re-pointing | S re-grounded in place; destination = S | **VERIFIED** |

**Every attack row is rejected.** The verdict token for each follows the two rules above, and Stacy's attack file states each expected outcome.

## What this reading does not reach (residual, stated)

- **A hollowed re-pointing that names S itself as its destination passes (v).**
  - Example: S's overlay reduced to one token, with `"destination": S`. Clause (1) has a non-whitespace span, and clause (2) holds.
  - In the **body** lane, the C18 triviality floor catches it: the unit routes to a signer. That is where it belongs.
  - In the **frontmatter** lane, scalar leaves have no operative-set records (C16), and frontmatter re-pointings are outside the C18 routing population. So a frontmatter entry re-pointed in place with an altered value **reaches no human**, the same property G2-F1 named for F5.
  - This ruling does not close that. It is a candidate for cycle 2's attack set (Stacy's) and a standards question for a later C16/C18 touch. It is not a clause-(2) question.
- **Req 11.4.1's text stays ambiguous on `main`** (Stacy's surviving counter at FK-4). CLOSEOUT audits against a requirement plus this side record until a requirements touch folds R3 in.

## The erratum this record backs

Design C15, § "C15. The 11.4 derivation checker", carries a dated erratum (2026-10-12) that restates DERIVATION and HONEST NAMING per R1 and R2, and cites this file. Nothing else in C15 changes: the per-target guard, the bites, and unknown anchors non-matching all stay.
