# G2 consequence texts — pre-declared (Spec 123 Task 18, criterion 1)

**Author**: Lina, Task 18's PRIMARY and executing agent. **Every commit on this file carries `Agent: lina` as a parseable git trailer**, in the commit message's final block, adjacent to its other trailers.
**Frozen**: this file is committed once, at C0 (the 18.0 commit, an ancestor of H, the head pass four is requested on). From C0 through U2b's merge, `git diff C0 <U2b PR head> -- <this file>` is empty. If a text here is wrong, the remedy is a new falsification cycle after U2b merges (Lina condition 2), never an edit to this file.
**Authority**: `tasks.md` Task 18, criteria 1 and 4; Req 11.8.2 (the consequence table); Req 24.3–24.4; design § "Gates and sequencing" (G2).
**What this file does not do**: it predicts no verdict, prefers no outcome, and orders none. Blocks appear in composition order, and that order implies nothing about outcomes.

---

## 1. Target (Stacy C3, C4)

- **File**: `.kiro/specs/123-consumer-distribution/completion/task-18-completion.md`.
- **Anchor**: the section whose heading line is exactly `## 24.3 acceptance table`. The section runs from that line to the line before the next line that begins `## `, or to EOF.
- **Pre-image at H**: `completion/task-18-completion.md` does not exist at H, and § "24.3 acceptance table" is created at 18.2.
- **Operation**: create the section. Its content is exactly the composed text in § 3, byte for byte. If the section is the file's last, the file ends with the composed text's final newline.
- **Freeze**: from the 18.2 commit through U2b's merge, the section does not change. Writing the rest of the completion doc later never touches it.
- **The next heading follows immediately.** Because the section runs to the line before the next `## `, any line placed between `FOOT`'s final blank line and the next `## ` heading would change the section. Nothing is ever placed there.
- **Why this target**: Peter's ruling of 2026-10-02, "Go with your recommendations on all four". Recommendation 3 was to name the target in this record, with no `tasks.md` amendment.

## 2. The selector — Stacy's verdict record (read, never restated)

Record: `.kiro/specs/123-consumer-distribution/completion/re-grounding-pass-four.md`. The selection reads exactly two of its lines. Each appears once, at the start of a line:

- the verdict line: `**Verdict**: PASSES with respect to attack (a)` · `**Verdict**: FAILS with respect to attack (a)` · `**Verdict**: NOT-RUNNABLE — not re-verified — <reason>`;
- the domain line: `**Domain line**: body: <S>; frontmatter: <S>; always-set: <S>`, with `<S>` ∈ {`exercised, held`, `exercised, did not hold`, `not exercised`}.

**The verdict token.** The verdict is selected by the token that follows `**Verdict**: `, up to the first space. That token is exactly one of `PASSES`, `FAILS` or `NOT-RUNNABLE`. The rest of the line is never read: the NOT-RUNNABLE form carries a free `<reason>`, so matching the whole line would be undefined.

**The domain states.** Each domain's state is the text after `<domain>: ` up to the next `;`, or to the end of the line. It must be exactly one of the three state tokens.

**Malformed record → not applied.** No edit is applied, and the defect goes back to Stacy as a finding, if any of these holds:
- the verdict line is missing or appears more than once;
- the verdict token is not one of the three;
- under a PASSES verdict, the domain line is missing or appears more than once, a domain is absent, or a domain's state is not one of the three tokens.

The applier interprets nothing. Under FAILS or NOT-RUNNABLE the domain line is not read, so its defects do not block the demotion.

The findings line (`**Findings**: …`) is never read. No text below varies with findings (Req 11.8.5). The `<reason>` string is never read or copied either.

## 3. Composition (Stacy C6, C7)

- **Verdict PASSES**: `HEAD` + `ROWS-FIXED` + one row for **body**, then **frontmatter**, then **always-set**, in that order + `FOOT`. Each domain row is chosen by that domain's `<S>` alone:
  - `exercised, held` → `PASSES-<domain>`;
  - `exercised, did not hold` → `DID-NOT-HOLD-<domain>`;
  - `not exercised` → `NOT-EXERCISED-<domain>`.
- **Verdict FAILS or NOT-RUNNABLE**: `HEAD` + `ROWS-FIXED` + `DEMOTION` + `FOOT`. The domain line is not read.
- **Separator**: none. Blocks are concatenated as they stand. Each block is the exact bytes between its opening fence line and its closing fence line, and each ends with a newline.
- **The zero-domains case** (PASSES with no domain reading `exercised, held`): the composition rule is unchanged. The table then lists (v)'s mechanical half as deterministic for no domain.
- **Byte check (criterion 4)**: extract the selected blocks from this file at C0, concatenate them, and `diff` the result against the section in `task-18-completion.md` at the 18.2 commit. The result is empty.

---

## 4. The texts (Stacy C5 — fenced, under stable labels)

### `HEAD`

```text
## 24.3 acceptance table

Requirement 24.3's labels for the re-grounding contract's instruments (Req 24.3: the list that follows "The acceptance table SHALL label the three instruments" in `requirements.md`), with (v)'s mechanical half placed by G2 (pass four) under Requirement 11.8.2. The G1 record this unit was cut on is `.kiro/specs/123-consumer-distribution/completion/re-grounding-c3-falsification.md` (U2a, `24c7f060`), cited and not restated; P2 branch A's label is not used in this table. Each row states what its passing does not establish (R26.8).

| Instrument | Label (Req 24.3) | What a pass does not establish |
|---|---|---|
```

### `ROWS-FIXED`

```text
| (i), (ii), (iii) with applicability verification, (iv) present-routes, and the all-`no-consumer-counterpart` floor | Deterministic clauses | Each clause establishes only its own stated property (Req 11.3–11.5); none establishes that a re-grounded unit's function survived. |
| `no-consumer-counterpart` signatures | Routed clause — mechanically enforced routing of a judgment the check cannot make | The routing is enforced; the judgment is the signer's, and a hollow assent passes it. |
| The behavioral instruments (Req 24.1 two-beat conformance run; 24.2 trio probe) | Behavioral backstop — non-deterministic, per-release, sampling | A sample: agents and domains it does not exercise are named per run (Req 24.2a), and an unexercised one is not covered. |
```

### `PASSES-body`

```text
| (v)'s mechanical half — body units | Deterministic, for body units only, with respect to attack (a) (G2 PASSES) | Attacks other than (a); the check's named limitations (Req 11.7.1 text the rendering gained, 11.7.2 inversion or deadening inside a retained unit, 11.7.4 transform quality); that the derivation check is applied to the committed consumer rendering (at C0, `checkDerivation` has no importer outside `tools/agent-generator/__tests__/`; those tests read real canonical sources, the renderings and dispositions they check come from test fixtures, and none reads `canonical/_consumer-output/`); frontmatter and always-set units unless their own rows say so. |
```

### `DID-NOT-HOLD-body`

```text
| (v)'s mechanical half — body units | Not deterministic: exercised by pass four and did not hold; the behavioral instruments own the property for body units | — |
```

### `NOT-EXERCISED-body`

```text
| (v)'s mechanical half — body units | Not deterministic: not exercised by pass four; the behavioral instruments own the property for body units | — |
```

### `PASSES-frontmatter`

```text
| (v)'s mechanical half — frontmatter entries | Deterministic, for frontmatter entries only, with respect to attack (a) (G2 PASSES) | Attacks other than (a); the check's named limitations (Req 11.7.1 text the rendering gained, 11.7.2 inversion or deadening inside a retained unit, 11.7.4 transform quality); that the derivation check is applied to the committed consumer rendering (at C0, `checkDerivation` has no importer outside `tools/agent-generator/__tests__/`; those tests read real canonical sources, the renderings and dispositions they check come from test fixtures, and none reads `canonical/_consumer-output/`); body and always-set units unless their own rows say so. |
```

### `DID-NOT-HOLD-frontmatter`

```text
| (v)'s mechanical half — frontmatter entries | Not deterministic: exercised by pass four and did not hold; the behavioral instruments own the property for frontmatter entries | — |
```

### `NOT-EXERCISED-frontmatter`

```text
| (v)'s mechanical half — frontmatter entries | Not deterministic: not exercised by pass four; the behavioral instruments own the property for frontmatter entries | — |
```

### `PASSES-always-set`

```text
| (v)'s mechanical half — always-set member units | Deterministic, for always-set member units only, with respect to attack (a) (G2 PASSES) | Attacks other than (a); the check's named limitations (Req 11.7.1 text the rendering gained, 11.7.2 inversion or deadening inside a retained unit, 11.7.4 transform quality); that the derivation check is applied to the committed consumer rendering (at C0, `checkDerivation` has no importer outside `tools/agent-generator/__tests__/`; those tests read real canonical sources, the renderings and dispositions they check come from test fixtures, and none reads `canonical/_consumer-output/`); body and frontmatter units unless their own rows say so. |
```

### `DID-NOT-HOLD-always-set`

```text
| (v)'s mechanical half — always-set member units | Not deterministic: exercised by pass four and did not hold; the behavioral instruments own the property for always-set member units | — |
```

### `NOT-EXERCISED-always-set`

```text
| (v)'s mechanical half — always-set member units | Not deterministic: not exercised by pass four; the behavioral instruments own the property for always-set member units | — |
```

### `DEMOTION`

```text
| (v)'s mechanical half — all domains | Struck from the deterministic list (Fork A, Req 11.8.2; NOT-RUNNABLE is treated as FAILS for consequence): not deterministic for any domain; the behavioral instruments (Req 24) own (v)'s property | — |

Fork A's edit is this documentation label, and the label is the whole of the edit. It changes no other file: no check, test, register row (no register row claims (v)) or CI context. Whatever runs the derivation and triviality-floor checks (design C15, C18) at C0 runs unchanged; this table no longer claims either as deterministic evidence for (v).
```

### `FOOT`

```text

The verdict, its domain line and its findings, if any, are in `.kiro/specs/123-consumer-distribution/completion/re-grounding-pass-four.md` (Stacy's record, cited and not restated — Req 11.8.4). Planned dependency: `tasks.md` Task 27 (step 27.4, U5) is planned to read this table for Requirement 24.3's labelling.

```

---

## 5. The release-2 CHANGELOG (Stacy C10)

The release-2 CHANGELOG entry carries nothing outcome-dependent. The CHANGELOG lists consumer-facing changes only, and the G2 verdict changes no shipped behavior. So no CHANGELOG text is pre-declared here.
