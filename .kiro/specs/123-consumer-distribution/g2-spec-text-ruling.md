# Spec 123 — Thurgood's G2 spec-text ruling (G2-F1, G2-F2, G2-F3): the recorded reading

**Date**: 2026-10-12 (first draft `b00dcf10c`; amended the same day, in one pass, on Stacy's pre-read and Lina's buildability read). **Erratum 2026-10-12** (later, its own PR): one clause added under R2, for shared-substrate members. See § "Erratum 2026-10-12: the shared member under R2".
**Author**: Thurgood (spec standards; owner of the spec-text half of the three findings, `.kiro/issues/2026-10-02-g2-pass-four-findings.md` § "Split of work")
**Form**: FK-4, settled between owners in the U3 amendment round (Stacy and Thurgood; Lina has no stake beyond buildability; Ada abstains). The form is **a design C15 erratum plus this recorded reading**, and the erratum cites this file. **No `requirements.md` edit** is made, so the deferred "next requirements touch" folds stay deferred.
**Authority**:
- Peter's PR-5.5: the ruling is its own record, in its own PR, merged by Peter, before U3g's branch is cut.
- Stacy pre-reads it for verifiability only.
- Lina confirms she can build to it.
- Thurgood writes none of cycle 2's test text.
**Reads** (preserved byte-equal in `g2-spec-text-ruling.reads/`):
- Stacy, `stacy.md`: PRE-READ CLEAR-WITH-CHANGES.
- Lina, `lina.md`: BUILDABLE-WITH-CHANGES. Her scan of every committed re-pointed row is in `repointed.tsv`.
- § "What changed at the amendment" lists what was taken from each read, and what was not, with the reason.
**Inputs**:
- Stacy's pass-four verdict record, § "Findings": `.kiro/specs/123-consumer-distribution/completion/re-grounding-pass-four.md`.
- Req 11.4 and 11.4.1.
- Design C15, C16, C18, C19.
- `tools/agent-generator/regrounding/derivation.ts` (`checkDerivation`), `spans.ts` and `derive.ts`, as merged.

---

## R1 — Clause (2), HONEST NAMING (G2-F1): identity, not containment

**Req 11.4's text governs, and design C15 departs from it.**
- Req 11.4 (2): "the destination named in the disposition is **among the spans satisfying (1)**".
- Design C15 reads it as "at least one span in `D` **lies within** the destination". `checkDerivation` implements that reading (`derivation.ts` L118, `containedIn(x.ref, destination, …)`).
- That containment accepts any ancestor of S as a destination. That is attack (f), measured on rows A3 and F5.

**The reading.**
- A `re-pointed` disposition satisfies clause (2) **iff its destination is identical to the source reference of at least one span in `D`**. Identity is decided in the same tree (body partition tree or frontmatter entry tree) and resolved structurally, never by anchor-string prefix (the containment pin's rule, Req 11.4).
- **An ancestor of a span's source does not satisfy it. A sibling does not satisfy it.** No one-way containment relation satisfies it.
- **Buildable as** (Lina): mutual `isDescendantOrSelf` in the same tree, which holds only for the same node; unknown ids stay non-matching.
- **Shared-substrate members**: the one committed `members:` row (`_shared.dispositions.yaml#record-first-ratification`) is decided in the member-id space. `D` is the set of spans sourcing `canonical/shared/shared-catalog.yaml#<id>`, and identity is id equality. It is in the count, not excluded.
- **The committed profile today** (Lina's scan, `repointed.tsv`): 169 re-pointed rows (141 body, always-set included; 27 frontmatter; 1 shared member), and **every one names S itself as its destination**. So R1 moves no committed row.
- **If an honest frontmatter row fails R1 at 29.0** because an adapter cites a path other than S's own as the span's source, that is an attribution defect in the adapter. It goes to Lina's machinery and is counted under Task 29's ceiling, like the six Kiro rows. It is **never resolved by widening R1**.

**Why identity is right.** Clause (2) exists so that the destination a disposition *claims* is one the generator *shows* deriving from S. Containment lets the claim be any enclosing section, so it verifies a claim nobody made.

## R2 — Clause (1), DERIVATION (G2-F3): an empty or whitespace-only span derives nothing

**The finding.** An emptied re-pointed overlay renders a one-line span (`ensureTrailingNewline('')` → `'\n'`) attributed to S, so clause (1) can never fail on the body lane. The pre-statement ("so (1) fails") and Task 14's rows describe a test model.

**The reading.** Req 11.4 (1) requires that "something in the shipped charter demonstrably *derives from* S".
- **Body units**: a span whose rendered text over its declared line range is empty after `String.prototype.trim()` is not in `D`.
  - "Whitespace" means exactly the set `trim()` removes, which is the same set JS `\s` matches.
  - A zero-width space (U+200B), an HTML comment, or punctuation alone is **text**, and keeps the span in `D`.
- **Frontmatter entries**: the test is on the entry's **derived value** (`derive()`'s YAML value at the entry's canonical path), not on its rendered text.
  - `null`, an empty list, or a string that is empty after `trim()` is not in `D`.
  - A map value that keeps any member is not empty. **No per-field rule is added**: `derive()` validates at class level by design (`derive.ts` L212–214).
- **Shared-substrate members** *(erratum 2026-10-12, corrected the same day on Stacy's pre-read)*: the body-unit rendered-text test applies to each span in `D`. Here `D` is the set R1 defines, the spans sourcing `canonical/shared/shared-catalog.yaml#<id>`. **No per-field rule is added**, for the same reason as frontmatter.
  - **Why `D` is never empty for the governance-rule member.** Both adapters render it as `- ${member.statement ?? member.id}` (`tools/agent-generator/adapters/cc.ts` L215, `adapters/kiro.ts` L179). With `statement: ""` the span is `- `; with `statement` deleted it is `- <id>`. Neither is empty after `trim()`, so clause (1) never fails for this member.
  - **Expected verdicts**:
    - An emptied member with a sibling destination: `FAIL_DISHONEST_NAMING` (R1).
    - An emptied member with itself as the destination: `VERIFIED`, a named limit (§ "What this reading does not reach").
- **Where it is built: in the check, not in `emitSpans`** (Lina). `emitSpans` never sees frontmatter values, and dropping the blank line's span there would break P2 attribution totality. `checkDerivation`'s input widens to each span's rendered lines and the derived value. Task 29 lists the tests that change.

## R3 — Req 11.4.1, "implemented" (G2-F2): ruled by Peter (PR-5.4), recorded here with its nouns filled

- **The ruling.** "Implemented … against Requirement 10's substrate" means **the check ran on the shipped material**.
- **Ruled out**: a reading under which tests over fixture renderings alone suffice.
- **Surfaces**:
  - **Body and always-set rows** are evaluated against every committed target rendering under `canonical/_consumer-output/{_canonical,cc,kiro}/**`.
  - **Frontmatter rows** are evaluated against the declared targets **`cc` and `kiro` only**. `_canonical/` carries no per-entry frontmatter spans (pass four: the honest control K0 fails there), so it is not a frontmatter surface.
  - **The Kiro agent JSON** is included: the six rows Lina expects to fail render only into it, under its one glue span (her sidecar read). Pass four did not measure it, so 29.0 is its first measurement.
  - The shared member is evaluated on whichever targets render the shared catalog.
- **Aggregation and grain**: a row is `VERIFIED` only if it is `VERIFIED` on every surface above that carries its source file. **The stated count is rows, never row × target**: 169 today, which must be non-zero and must equal the count derived from the committed dispositions.
- **Inputs (the trigger set; minimum)**:
  - `canonical/profiles/consumer/**`;
  - the canonical sources the dispositions cite: `canonical/agents/**`, `canonical/shared/**`, the always-set source docs;
  - `canonical/consumer-profile.yaml`;
  - `tools/agent-generator/**`;
  - `canonical/_consumer-output/**`.

  Task 29's completion doc declares the final set, and **may add to it, never remove**.

## R4 — The two non-readings: neither is adopted

- **(α) Re-rendered overlay (`render`) spans do not count as derivation: NOT adopted.**
  - An overlay re-grounds S's canonical text. It is pinned to S's canonical hash, a stale overlay is refused (design § Error Handling, "stale overlay"), and a routed unit carries a signer's itemized assent (C17, C18).
  - Adopting (α) would fail every body re-pointed row: 141 in Lina's scan, which matches her provisional sizing.
- **(β) The check extends to `superseded-by` rows: NOT adopted.**
  - Req 11.4's criterion is stated for "a `re-pointed` disposition". A `superseded-by` row names what replaces S, not where S's content went.
  - Lina's provisional count of 20 rows failing by construction is not re-measured here, and it carries no verdict.
  - Those rows keep their existing instruments: clause (iii) and the signer.

Adopting neither means neither fires Task 29's ceiling by construction.

## R5 — Expected verdict per measured row (for Lina's build and Stacy's attack file)

Clause (1) is evaluated first, and a row that fails it reports `FAIL_NO_DERIVATION`. Clause (2) is evaluated only on a non-empty `D`.

| Row | Shape (pass four's record) | Expected verdict |
|---|---|---|
| A3 | body S emptied; destination = S's own `##` parent | `FAIL_NO_DERIVATION` (R2). With S's overlay non-empty and the parent as destination: `FAIL_DISHONEST_NAMING` (R1) |
| F5 | `commands[ios-build-test]` emptied (key set kept, `gap`/`cue` = `""`); destination = `commands` | `FAIL_DISHONEST_NAMING` (R1). The emptied shape keeps `class` and `runContext`, so the derived value is not empty and `D` is non-empty |
| C1 | a true rendering of S; destination = a sibling | `FAIL_DISHONEST_NAMING` |
| F3 | frontmatter attack (a), verbatim (key set kept, `gap`/`cue` = `""`; sibling destination) | `FAIL_DISHONEST_NAMING`. `derive()` keeps the key set and the identity field, so the derived value is not empty (R2 does not reach it), and the sibling is not among `D`'s sources |
| A1, AS1 | S emptied entirely; sibling destination | `FAIL_NO_DERIVATION` |
| A2, AS2 | S emptied to its heading line (label kept); sibling destination | `FAIL_DISHONEST_NAMING` (the heading line is text, so `D` is non-empty) |
| attack (a), one-token variant (G2-F1) | S reduced to one token; sibling destination | `FAIL_DISHONEST_NAMING` |
| honest in-place re-pointing | S re-grounded in place; destination = S | `VERIFIED` |

**Every measured attack row above is rejected.** Unmeasured shapes that are not rejected are listed under "What this reading does not reach".

**Task 29's G2-F3 red line, read under this ruling.** "Attack (a) as the generator emits it is not rejected by clause 1" reads "attack (a)" as **the shapes R2 excludes (A1, AS1)**. The frontmatter verbatim shape (F3) is rejected by clause 2 and R1, not by clause 1.
- **Fork picked** (Thurgood, with both reads converging; Lina's lean): **correct the expected tokens** rather than add a per-field emptiness rule.
- **Surviving counter-argument (Lina)**: on the frontmatter lane, clause 1 never rejects the verbatim attack (a). Its rejection there rests only on clause 2 plus R1.

## What this reading does not reach (residual, stated)

- **A re-pointing hollowed in place, with S itself as the destination, passes (v).**
  - Example: S's overlay reduced to one token, with `"destination": S`. Clause (1) has a non-empty span, and clause (2) holds.
  - **Body lane**: the C18 triviality floor routes it to a signer. That is where it belongs.
  - **Frontmatter lane**: scalar leaves have no operative-set records (C16), and frontmatter re-pointings are outside the C18 routing population, so **it reaches no human**.
  - **The sharpest instance is permission-bearing**: a `writeScope[…]` or `toolSubset[…]` member re-pointed in place to a **wider** value (for example a glob widened to `**`). That is a permission widening, not a content hollowing. Its expected outcome under (v) is `VERIFIED`, with the limit named.
  - It routes to a later C16/C18 touch **as a permission question**. The committed profile has such rows today, unsigned, re-pointed and destination-S (Stacy, `kenya.dispositions.yaml` L77–79, L99).
  - **The shared-member lane** *(erratum 2026-10-12)*: the one shared member, `record-first-ratification`, is a governance rule rendered into every agent, and its row is unsigned. Hollowed in place with itself as the destination, its rendered span stays `- ` and the row is `VERIFIED`. It reaches no human, so it routes with the permission-bearing instance above.
- **The always-set lane.** Pass four measured three lanes: body, frontmatter, always-set (AS1, AS2, T0). Whether the C18 floor routes an always-set unit hollowed in place with destination S is **not established here**. C18's entry set names body units, and C19 derives always-set members through the same `derive()`, but no read here confirms how they route. It is carried into cycle 2's attack set (Stacy's) rather than asserted.
- **Clause (1)'s bar is low**: one non-whitespace token derives. This is the weakest point of the check, and it is the destination-S case above.
- **Req 11.4.1's text and clause (1)'s non-empty condition (R2) stay ambiguous or silent on `main`** (Stacy's surviving counter at FK-4, extended to R2). R2 narrows a clause marked verbatim, consistent with "demonstrably *derives*". CLOSEOUT audits against a requirement plus this side record until a requirements touch folds R2 and R3 in.

## What changed at the amendment (from the two reads), and what was not taken

**Taken**:
- R5 split row by row: A1/AS1 → `FAIL_NO_DERIVATION`; A2/AS2 → `FAIL_DISHONEST_NAMING` (Stacy 1(a), Lina change 5).
- F3/F5 tokens → `FAIL_DISHONEST_NAMING`, plus the G2-F3 red-line reading (Lina change 1; Stacy 1(b) reached the same gap).
- "Whitespace" defined (Stacy 1(c), Lina change 2; the two definitions coincide in JS).
- "Every *measured* attack row" (Stacy 1(d)).
- R2's frontmatter test on the derived value, with the locus in the check (Lina change 2 and § 1).
- R3: the per-target aggregation and count grain (Lina change 3); frontmatter on `cc` and `kiro` only; the inputs named (Stacy scope 1–2).
- The shared member decided in member-id space (Lina change 4).
- R1's "S itself" premise for frontmatter, and what happens if it fails (Stacy 3).
- The permission-bearing residual and the always-set lane (Stacy 3).
- The side-record caveat extended to R2 (Stacy scope 3).
- R4's counts labelled (Stacy scope 4).

**Not taken, with the reason**:
- Stacy 1(b)'s map-entry rule ("the rendered text of its non-identity members; for a command, `gap` and `cue`"). It is a per-field emptiness rule, Lina's option (b): it would need field-shape knowledge that `derive()` keeps out by design, and it would make F3 reach `FAIL_NO_DERIVATION` only by adding that knowledge. **Fork (a) was picked instead.** F3/F5 are still rejected, by R1.
- Stacy scope 5 (R1 versus Req 11.4's "descendant" spans in `D`). No change: under 10.G a span and a unit coincide, so identity and the sub-range rule give the same verdict on every committed row (169/169 name S). A finer future grain reopens it, as the containment pin already reserves.

## Erratum 2026-10-12: the shared member under R2

- **The defect.** R2 assigned its emptiness tests by lane: body units and frontmatter entries. R1 decides the one shared-substrate row (`_shared.dispositions.yaml#record-first-ratification`) in member-id space, which is neither lane. So R2 was silent on an emptied `members:` entry.
- **How it surfaced.** Stacy could not state an expected verdict for that row from the text. Under bound 1 of the Q5 charter cut ("compliant" must be decidable without consulting the author), that is a defect in this text, not a question to answer in conversation.
- **The first draft was wrong** (`3ea84ae1b`). It stated `FAIL_NO_DERIVATION` for an emptied member. Stacy's pre-read showed that the stated outcome does not follow from the clause's own test, because the adapters render a `- ` prefix (`cc.ts` L215, `kiro.ts` L179). Thurgood verified this by reading both lines. It was G2-F3's error again, a test model of the emission instead of the emission. The corrected clause states the verdicts the emission actually gives.
- **The pick: (a), the rendered-text test and its real outcomes** (Thurgood, as author). The alternative was (b): a derived-value test on the member's `statement`, which would make `FAIL_NO_DERIVATION` reachable.
  - (b) is a **per-field rule**. The check would have to know which field carries each member kind's content (`statement` for a governance rule, `cue` for a tool cue).
  - R2 declined exactly that for frontmatter: it was Stacy's 1(b), not taken, because `derive()` keeps field-shape knowledge out by design.
  - Adopting it for one lane would make the two lanes disagree on the same question. Under (a) the shared member behaves as the frontmatter entries F3 and F5 do: rejected by R1 when the destination is a sibling, and a named limit when the destination is S.
  - (b) would also cost Lina a kind-aware read of the member's fields in `checkDerivation`, beside the span text R2 already adds.
- **Surviving counter-argument** (Stacy's pre-read, and the reason (b) existed):
  - The one shared member is a **governance rule that reaches every agent's rendering**, and its disposition row is **unsigned**. A statement hollowed in place with itself as the destination is `VERIFIED` and **reaches no human**. Its blast radius is every seat, not one entry.
  - That is the residual's destination-S limit at its widest. It is now named there and routes with the permission-bearing instance to the later C16/C18 touch. Choosing (b) instead is Peter's to make at merge.
- **What does not change.** No other clause, and no expected verdict in R5. No committed row moves: per R1's scan, the committed shared member is re-pointed with itself as the destination and a non-empty statement.
- **Reads.** Stacy pre-reads the corrected clause for verifiability, and Peter merges. Lina's build is unaffected beyond applying the existing body test to the shared member's spans.

## The erratum this record backs

Design C15, § "C15. The 11.4 derivation checker", carries a dated erratum (2026-10-12) that restates DERIVATION, HONEST NAMING and the scope per R1–R3 and cites this file. Nothing else in C15 changes: the per-target guard, the bites, and unknown anchors non-matching all stay.
