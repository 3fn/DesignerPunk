# The owed-set script still lists closed specs as candidates: the anchor proxy, five releases running (RS-3)

**Date**: 2026-10-25
**Filed by**: Thurgood, under README rule 10, in the 16.1.0 walk's PR (`.kiro/issues/2026-10-25-release-16.1.0-walk.md` row 26). Stacy surfaced it in her walk read of 2026-10-25, quoted below. Until now the fork had no home: "RS-3 lives only in my 15.0.0/16.0.0 Standards-implications and the walk's note" (Stacy, 2026-10-25).
**Owner**: Thurgood. I own `scripts/owed-set.sh` and its test, and I author RELEASE-FLOW § 5a's text through its review round. Stacy specifies the falsification fixtures (Q5 instrument pattern). The fork is Peter's.
**Class**: P2 obligation (record) · defect *(set 2026-10-25, Thurgood, rule 12, on Stacy's proposal: "propose P2 (record) with Thurgood's re-class". The script over-lists, and over-listing is the safe direction: no owed spec is hidden, and the operator's reading corrects the printed set at each release. What is wrong is the form of the result, a candidate list that needs a correction every release, not a guard that claims more than it holds.)*
**Trigger**: `release:next:phase-1` — the next release's walk reads whether Peter has picked (A) or (B) and, for (A), whether the fixing PR has merged. *(Set 2026-10-25, Thurgood, rule 1: a P2 that would ride another change takes this token. When an (A) PR exists, the owner re-tokens it to `merge:#<N>`.)*
**Consulted**: Stacy — her walk read of 2026-10-25 (quoted below) is the consult. She specifies the fixtures.

---

## What happens

At the 16.1.0 walk (`main` `652074c6b`), `bash scripts/owed-set.sh` printed **2 candidates**, and both are closed specs:
- **`122`** (class a): its final unit is #67, merged 2026-07-11, before ratification. The anchor `7fa64c6d8` is a later touch.
- **`023`** (class b): new this run. The anchor `a6ed875a9` is #452, which appended a supersession to `design.md` and a correction to `completion/task-4-parent-completion.md`. That is an erratum to a closed spec. Its last unit merged 2025-12-19 (`f546c494c`).

Stacy, 2026-10-25: "the script's documented known limit (anchor = path proxy) has now produced a false candidate in 2 of 2 candidate rows at this release (5th consecutive release needing operator correction; 15.0.0 RS-3 fork never homed). Over-listing is the safe error, so (B) 'working as designed' is defensible; but the script was built to remove the operator correction and the correction is still being made every release."

## The fork (Peter's)

- **(A) Replace the proxy with the definition**, plus Stacy's falsification fixtures. Stacy's class option, quoted: "replace the anchor proxy with the definition — candidate iff the post-adoption history contains a first-parent commit that ticked the last `- [ ]` of `tasks.md` (or merged the declared final unit). Cost: script change + falsification fixtures (I specify them: a pre-adoption-closed spec touched post-adoption in completion/ and design.md must print touch-only)."
- **(B) Accept the over-list and document it.** Stacy: "(B) accept the over-list and document 2/2 as the expected rate."
- **The surviving counter-argument against (A)**, Stacy's words: "more logic puts the script's 'never hides an owe' property at risk; a wrong exclusion is the costly direction."

## Effort

My estimate, not measured: for (A), the classification change in `scripts/owed-set.sh`, plus Stacy's fixtures in `scripts/__tests__/owed-set.test.ts`, about half a day, plus her fixture specification. For (B), one sentence in RELEASE-FLOW § 5a under "The one judgment point", a governance path, Peter-merged.

## What closes it

(A): the fixing PR merges, with the fixtures, and names this record. (B): the § 5a sentence merges. Either PR adds rule 5's dated outcome line, and the record moves to `archive/`.

## Ruled (2026-10-25)

**Fork (A)**, on Peter, 2026-10-25, in chat, relayed verbatim by the orchestrator: "Fix all of them as the owners recommend; T is (A)". Line R of the 16.1.0 walk's batch adopts Stacy's class option: replace the anchor proxy with the definition, with her falsification fixtures. *Unverified here: chat only. Peter may confirm the relay on the PR, and his words are now committed in this record.*
- **Owed by Thurgood**: the `scripts/owed-set.sh` change, and the fixtures in `scripts/__tests__/owed-set.test.ts` once Stacy specifies them. Her named case: "a pre-adoption-closed spec touched post-adoption in completion/ and design.md must print touch-only." Plus her guard on the change: a wrong exclusion is the costly direction.
- **Trigger**: unchanged until the fixing PR exists, then re-tokened to `merge:#<N>`.

*Signed: Thurgood, 2026-10-25.*
