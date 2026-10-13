# G2 cycle-2 consequence texts — pre-declared (Spec 123 Task 30, criterion 2)

**Author**: Lina, Task 30's PRIMARY and executing agent. **Every commit on this file carries `Agent: lina` as a parseable git trailer**, in the commit message's final block. Thurgood authors no line of it (Task 30; Stacy's refusal condition RF5).
**Frozen**: this file is committed once, at C0′ (the 30.0 commit). C0′ must be an ancestor of H′, the head cycle 2 is requested on. From C0′ through U3g's merge, `git diff C0′ <U3g PR head> -- <this file>` is empty. A cycle 3 (Task 30) reads these same texts. If a text here is wrong, the remedy is a dated record by Peter, never an edit to this file.
**Authority**: `tasks.md` Task 30, criteria 1, 2, 6 and 7; Peter's PR-5.3 (the hold) and his "accept" on the named limits (recorded in `completion/g2-cycle-2-refusal-conditions.md` § 6); Req 11.8.2 (the consequence table), 11.8.4–11.8.5; Req 24.3; design § "Gates and sequencing" (G2). The precedent is Task 18's `completion/g2-consequence-texts.md` (pass four), which is cited and not edited.
**What this file does not do**: it predicts no verdict, prefers no outcome, and reads no finding. Blocks appear in composition order, and that order implies nothing about outcomes. No text below varies with findings, with the verdict's reason, or with which rows a verdict names (Req 11.8.5).

---

## 1. Target

- **File**: `.kiro/specs/123-consumer-distribution/completion/task-30-completion.md`, the U3g gating parent's completion doc, on the unit branch.
- **Anchor**: the section whose heading line is exactly `## 24.3 acceptance table`. The section runs from that line to the line before the next line that begins `## `, or to EOF.
- **Operation**: create the section (at 30.2) with content exactly equal to the composed text in § 3, byte for byte. If the section is the file's last, the file ends with the composed text's final newline.
- **Freeze**: after the section is written, it does not change, except in one case. If a cycle 3 runs (Task 30, criterion 7), the section is re-composed **wholesale** from cycle 3's verdict, under the same rules and from the same texts. No other edit ever touches it.
- **The next heading follows immediately.** Nothing is ever placed between `FOOT`'s final blank line and the next `## ` heading.
- **Task 18's record is not edited** (Task 30, criterion 6). Its table (`completion/task-18-completion.md` § "24.3 acceptance table") stays as pass four's record. `HEAD` below states that this table supersedes it for release 3 onward.

## 2. The selector — Stacy's verdict record (read, never restated)

- **Record**: the **highest-numbered** `.kiro/specs/123-consumer-distribution/completion/re-grounding-g2-cycle-<n>.md` on the unit branch (`<n>` ∈ {2, 3}; cycle 3 exists only if cycle 2 did not hold). This is the same record the RELEASE-FLOW hold line reads (`tasks.md` § "Expected release count", the G2 hold, "What the line reads").
- **The verdict line**: exactly one line beginning `**Verdict**: `. The forms are `**Verdict**: HOLDS` · `**Verdict**: DOES-NOT-HOLD` · `**Verdict**: NOT-RUNNABLE — not re-verified — <reason>` (Stacy's record conditions § 5).
- **The verdict token**: the token that follows `**Verdict**: `, up to the first space or the end of the line (Task 30, criterion 1; as Task 18's § 2). It is exactly one of `HOLDS`, `DOES-NOT-HOLD`, `NOT-RUNNABLE`. The rest of the line is never read.
- **Never read**: the findings, the `<reason>`, the "does not mean" list, the rows, the sample. No domain line is read; cycle 2's verdict carries one token.
- **Malformed record → not applied.** No edit is applied, and the defect goes back to Stacy as a finding, if any of these holds:
  - the verdict line is missing;
  - it appears more than once;
  - its token is not one of the three.

  The applier interprets nothing.

## 3. Composition

- **Token `HOLDS`**: `HEAD` + `ROWS-FIXED` + `HOLDS-ROWS` + `LIMITS` + `FOOT`.
- **Token `DOES-NOT-HOLD` or `NOT-RUNNABLE`**: `HEAD` + `ROWS-FIXED` + `DEMOTION` + `HOLD` + `FOOT`. `NOT-RUNNABLE` is treated as `DOES-NOT-HOLD` for consequence, and this PR is not opened (Task 30, criterion 7).
- **Separator**: none. Blocks are concatenated as they stand. Each block is the exact bytes between its opening fence line and its closing fence line, and each ends with a newline.
- **Byte check (Task 30, criterion 6)**: extract the selected blocks from this file at C0′, concatenate them, and `diff` the result against the section in `task-30-completion.md`. The result is empty.

---

## 4. The texts (fenced, under stable labels)

### `HEAD`

```text
## 24.3 acceptance table

Requirement 24.3's labels for the re-grounding contract's instruments (Req 24.3: the list that follows "The acceptance table SHALL label the three instruments" in `requirements.md`), with (v)'s mechanical half placed by G2 cycle 2 under Requirement 11.8.2. For release 3 onward this table supersedes the one in `.kiro/specs/123-consumer-distribution/completion/task-18-completion.md` § "24.3 acceptance table" (pass four), which stays as that verdict's record and is not edited. Each row states what its passing does not establish (R26.8).

| Instrument | Label (Req 24.3) | What a pass does not establish |
|---|---|---|
```

### `ROWS-FIXED`

```text
| (i), (ii), (iii) with applicability verification, (iv) present-routes, and the all-`no-consumer-counterpart` floor | Deterministic clauses | Each clause establishes only its own stated property (Req 11.3–11.5); none establishes that a re-grounded unit's function survived. |
| `no-consumer-counterpart` signatures | Routed clause — mechanically enforced routing of a judgment the check cannot make | The routing is enforced; the judgment is the signer's, and a hollow assent passes it. |
| The behavioral instruments (Req 24.1 two-beat conformance run; 24.2 trio probe) | Behavioral backstop — non-deterministic, per-release, sampling | A sample: agents and domains it does not exercise are named per run (Req 24.2a), and an unexercised one is not covered. |
```

### `HOLDS-ROWS`

```text
| (v)'s mechanical half — body units | Deterministic, with respect to G2 cycle 2's attack set (G2 cycle 2 HOLDS), and applied to the committed consumer profile and every committed target rendering on every PR (`tools/agent-generator/__tests__/derivation.shipped-profile.test.ts`) | Attacks outside `.kiro/specs/123-consumer-distribution/completion/g2-cycle-2-attacks.md`; the check's named limitations (Req 11.7.1 text the rendering gained, 11.7.2 inversion or deadening inside a retained unit, 11.7.4 transform quality); the named limits below; that a re-grounded unit's function survived (the C18 floor's and the signer's). |
| (v)'s mechanical half — frontmatter entries | Deterministic, with respect to G2 cycle 2's attack set (G2 cycle 2 HOLDS), on the declared targets (`cc`, `kiro`, the Kiro agent JSON included), applied on every PR by the same standing test | Attacks outside the cycle-2 attack set; the named limitations above; the named limits below; that an entry's re-grounded value means what the canonical value meant (no per-field rule: the check reads the derived value's emptiness only). |
| (v)'s mechanical half — always-set member units | Deterministic, with respect to G2 cycle 2's attack set (G2 cycle 2 HOLDS), applied on every PR by the same standing test | Attacks outside the cycle-2 attack set; the named limitations above; the named limits below, L4 in particular. |
| (v)'s mechanical half — the shared-catalog member | Deterministic, with respect to G2 cycle 2's attack set (G2 cycle 2 HOLDS), decided in member-id space, applied on every PR by the same standing test | Attacks outside the cycle-2 attack set; the named limitations above; the named limits below, L5 in particular. |
```

### `LIMITS`

```text

**Named limits this verdict carries** (Peter's ruling of 2026-10-12, "accept", recorded in `.kiro/specs/123-consumer-distribution/completion/g2-cycle-2-refusal-conditions.md` § 6; the rows are `g2-cycle-2-attacks.md` § 2.4; the ruling's § "What this reading does not reach"). Each one re-grounds a unit or entry **in place** and names it as its own destination, so the check returns `VERIFIED` by construction:

- **L3 — a permission widened in place.** A `writeScope[…]` member re-pointed to a wider glob (for example `**`) passes, and no signer reads it.
- **L5 — the shared governance rule hollowed in place.** The one shared-catalog member is rendered into every agent and its row is unsigned. Emptied, with itself as its destination, it passes and reaches no human.
- **L1 — a body unit reduced to one token in place.** It passes the check; the C18 triviality floor routes it to a signer.
- **L2 — a frontmatter entry emptied in place.** It passes; no signature is owed and it reaches no human.
- **L4 — an always-set unit reduced to one token in place.** It passes; whether the C18 floor routes it is stated in the verdict record.

L3 and L5 are routed to Thurgood as a permission question, for a later C16/C18 touch.
```

### `DEMOTION`

```text
| (v)'s mechanical half — all domains | Not deterministic: G2 cycle 2 did not return `HOLDS` (NOT-RUNNABLE is treated as DOES-NOT-HOLD for consequence); the behavioral instruments (Req 24) own (v)'s property | — |
```

### `HOLD`

```text

**The G2 hold stands.** Peter's PR-5.3: "nothing that carries the consumer profile is tagged or published until a HOLDS verdict, or Peter lifts it by a dated record." The U3g PR is not opened on this verdict. The owner fixes on the branch, and at most one further request (cycle 3) runs on the same attack file and these same texts. A cycle 3 that does not return `HOLDS` stops and re-plans with Peter. No version ships with this as a written-down limit.
```

### `FOOT`

```text

The verdict, and its findings if any, are in Stacy's record: the highest-numbered `.kiro/specs/123-consumer-distribution/completion/re-grounding-g2-cycle-<n>.md` on the U3g branch (cycle 2, or cycle 3 if it ran), cited and not restated (Req 11.8.4). Planned dependency: `tasks.md` Task 27 (step 27.4, U5) is planned to read this table for Requirement 24.3's labelling.

```

---

## 5. The release-3 CHANGELOG statement (Task 22.4: "the treatment of 15.0.0's G2 limit disclosures, matched to U3g's verdict")

- **What it is.** 15.0.0's release notes disclosed two G2 limits under "Known limitations":
  - "The re-grounding check's findings";
  - "The derivation check's application limit".

  Release 3's CHANGELOG entry carries **exactly one** of the blocks below, byte for byte, chosen by the same selector (§ 2) at the release's squash S. Task 22.4 applies it; this file only declares it.
- **Selection**:
  - `HOLDS` → `CHANGELOG-HOLDS`.
  - A release cut while the token is `DOES-NOT-HOLD` or `NOT-RUNNABLE` can only happen under Peter's dated lift record (the G2 hold). In that case → `CHANGELOG-LIFTED`.
  - With neither a `HOLDS` verdict nor a lift record, **no release is cut**, so no block applies.
- **Only the G2 treatment is declared here.** Everything else in the entry is verdict-independent and is not declared here, for example the Kiro knowledge-fallback note this unit adds to Kiro agent prompts.

### `CHANGELOG-HOLDS`

```text
- **The agent-profile derivation check now runs on what ships.** The check that each re-worded section of a shipped agent really comes from its source section now runs over the shipped consumer profile and its renderings, in every change to them. A re-worded section can no longer name an enclosing or neighbouring section as where its content went, and a section emptied to blank lines no longer passes. This closes the two limits 15.0.0 disclosed (the check was not applied to the shipped profile; a one-token variant of an emptied section passed). Still not covered: a section changed in place that names itself as its destination passes the check. That includes a write permission widened in place, and the shared governance rule emptied in place, which no reviewer reads.
```

### `CHANGELOG-LIFTED`

```text
- **The agent-profile derivation check's 15.0.0 limits still stand.** The second check of the consumer profile did not hold, and this release ships under Peter's dated lift of the hold. The limits 15.0.0 disclosed (the check was not applied to the shipped profile; a one-token variant of an emptied section passed) are not closed by this release.
```
