# Fixture spec: normalization-absorbed-artifacts-control

**Case**: `normalization-absorbed-artifacts-control`
**Class**: normalization (**PASS-expected control**) — *proposed manifest extension, see INDEX.md*
**Expected exit**: GREEN (zero)
**Author**: Stacy — Spec 127, Task 2.1 (Req 6.5; design C7/DD4)
**Date**: 2026-09-19

---

## Falsification intent

Four criteria, four different non-authorial rendering artifacts in the completion doc's cells, **zero authorial differences**. Each row exercises one of the four normalization rules, in isolation, so that a failure names which rule is missing:

1. **Rule (ii)** — the bullet wraps across two source lines; the author's cell carries `<br>` where the wrap fell. (A table cell cannot contain a newline, so `<br>` is the only way to reproduce a wrapped bullet verbatim — this rule exists because the law demands verbatim reproduction of text that physically cannot be pasted verbatim.)
2. **Rule (i)** — the criterion contains a literal `|`; inside a markdown table it must be written `\|` or the row breaks into extra columns. Escaping is mandatory, so un-escaping must be too.
3. **Rule (iii), whitespace-property half** — a no-break space arrived from a spreadsheet paste.
4. **Rule (iii), zero-width half** — a zero-width space arrived from a Figma paste, plus a run of collapsed whitespace and untrimmed ends.

Every one of these is invisible on the rendered page. An author looking at the doc sees a perfect match; the checker, comparing raw strings, sees four mismatches. **This is the fixture that decides whether the law is usable.** If the checker reds here, every author's first encounter with the rule is a false red on a doc they copied correctly, the rule acquires a reputation within a week, and the exemption string becomes the path of least resistance.

The control also bounds the rules in the other direction by what it *does not* contain: no bold stripping, no backtick folding, no case folding, no arrow or math-glyph normalization. Rule (iv) says *nothing else*, and the falsification fixtures (`reword-paraphrase-and-glyph-drift`, `normalization-one-word-differs`) enforce that boundary. This control proves the four rules are **implemented**; those two prove they are **all** that is implemented.

## tasks.md fragment

```markdown
# Implementation Plan: 148 — Spacing Scale Extension

**Date**: 2027-01-08
**Spec**: 148 — Spacing Scale Extension
**Author**: Ada
**Criteria mode**: per-parent

## Tasks

- [x] 1. Extend the spacing scale to the 800 step

  **Type**: Implementation
  **Agent**: Ada (main session)

  **Success Criteria:**
  - The generated spacing scale includes every step from `space025` through `space800` with no
    gaps, and each step's value derives from the baseline grid formula recorded in the architecture doc
  - Layout tokens accept the pair `space100 | space150` wherever a responsive pair is permitted
  - The mode-parity audit reports zero unmatched spacing keys in dark mode
  - Every generated platform constant name matches its registry entry exactly
```

## completion-doc fragment

`task-1-completion.md`:

```markdown
# Task 1 Completion: Extend the spacing scale to the 800 step

**Date**: 2027-01-12
**Task**: 1. Extend the spacing scale to the 800 step
**Type**: Implementation
**Status**: Complete

## Success Criteria Verification

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| The generated spacing scale includes every step from `space025` through `space800` with no<br>gaps, and each step's value derives from the baseline grid formula recorded in the architecture doc | ✅ | `SpacingScale.test.ts › scale is gapless from 025 to 800` |
| Layout tokens accept the pair `space100 \| space150` wherever a responsive pair is permitted | ✅ | `LayoutPair.test.ts › responsive pair accepted` |
| The mode-parity audit reports zero unmatched spacing keys in dark mode | ✅ | `npm run audit:mode-parity → 0 unmatched keys` |
|  Every generated  platform constant name matches its registry entry exactly  | ✅ | `src/tokens/registry/spacing.ts` |

Unmet or partially met criteria: None
```

> **Encoder instructions — invisible characters.** Two cells carry codepoints that cannot be written visibly here. The encoder SHALL insert them literally and record the insertion in the fixture's provenance header:
>
> - **Row 3**: the space between `mode-parity` and `audit` in the *completion-doc cell only* SHALL be a **no-break space (U+00A0)**. The `tasks.md` bullet keeps an ordinary space.
> - **Row 4**: a **zero-width space (U+200B)** SHALL be inserted immediately after `registry` in the *completion-doc cell only*. The cell's leading/trailing spaces and the doubled internal spaces (shown above) are literal and intentional.

## Required verdict

- **Verdict**: `PASS` on parent 1 — exact-set parity over all four criteria.
- **Exit semantics**: GREEN — exit zero. No emissions (this parent declares no artifacts, no gate, no exemption, no declared-none).
- **Must NOT be produced**: any `SET_MISMATCH`. A failure on row 1 means rule (ii) is missing; row 2, rule (i); row 3, the `White_Space`-property half of rule (iii); row 4, the zero-width/BOM stripping half plus the collapse-and-trim half. `expected.json` SHOULD therefore assert **per-row** match so a partial implementation reports which rule it lacks.

## Encoding notes

- Encode as `{ tasks.md, completion.md, expected.json }`.
- The `tasks.md` bullet in row 1 is genuinely wrapped across two source lines (continuation-line folding, Req 2.2.1) — keep the wrap.
- Do not run a formatter over the encoded files. Every artifact in this fixture is the kind a formatter removes.
