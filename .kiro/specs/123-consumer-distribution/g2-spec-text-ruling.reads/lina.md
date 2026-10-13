# Lina: buildability read of Thurgood's G2 spec-text ruling

Read-only. I read `origin/chore/123-g2-spec-text-ruling` @ `b00dcf10c` (the ruling plus the design.md C15 erratum hunk) and the code on `origin/main` @ `dcd337dcf`. The main working tree was not touched. Scan output is in this folder: `repointed.tsv`.

## Verdict: BUILDABLE-WITH-CHANGES

R1, R2's body half, R3, R4, and seven of R5's rows can be built as written. One R5 expectation (F3, and F5's emptied shape) can't be reached under R2 as worded. Three wording gaps would otherwise leave decisions to me. The exact text for each is in § "Changes" at the end.

---

## 1. Can I build R1 and R2, and where would each go?

### R1 (identity): yes. Locus: `tools/agent-generator/regrounding/derivation.ts`, `checkDerivation`, L118

- Replace `d.some((x) => containedIn(x.ref, destination, …))` with `d.some((x) => sameNode(x.ref, destination, trees))`. [verified, code read]
- Define `sameNode(x, s)` as same tree AND `isDescendantOrSelf(x.id, s.id)` AND `isDescendantOrSelf(s.id, x.id)`. [verified, partition.ts L101-109]
  - `isDescendantOrSelf` returns false when either id is unknown.
  - Ids in the tree are unique and the tree is acyclic, so mutual containment holds only for the same node.
  - So the identity test is structural, uses no string prefix, needs no new tree API, and treats unknown anchors as non-matching, exactly as `containedIn` does today. [verified]
- `containedIn` stays in place for clause (1). Its header comment L8/L11 gets the identity line.

### R2 (whitespace-only spans out of D): yes. I would put both halves in the check, not in `emitSpans`. Three reasons:

1. **`emitSpans` can't see frontmatter values.** [verified, spans.ts L129-135, L308-315]
   - A frontmatter piece is the adapter's rendered text. For example, kenya's `commands[ios-build-test]` renders as `- <gap> — <cue> (run from your product repo)` (cc kenya.md L377).
   - The R2 frontmatter half therefore can't live in `emitSpans` at all.
2. **Dropping only the span in `emitSpans` breaks P2 totality.** [verified, spans.ts L206-216; attribution.ts `checkAttributionTotality`]
   - `ensureTrailingNewline('')` still emits the `'\n'` line. If that line has no span, the artifact has an attribution gap.
   - So an `emitSpans` fix would also have to drop the line. That changes rendered bytes, and the emptied unit would render as an omission, which hides the attack in the shipped rendering.
3. **One rule in one place.**
   - The standing test (29.4) already reads three things the check needs: the committed rendering, its sidecar, and `derive()`'s output.
   - The cost is that `checkDerivation`'s input widens from `Pick<AttributionSpan,'source'>` (L96) [verified] to two things:
     - each span's rendered lines;
     - for entries, an accessor for the derived value.
   - The existing derivation tests change shape. All of them are in Task 29's Primary Artifacts. `spans.ts` is then not touched.
- **Counter-argument that survives:** the sidecar keeps an S-attributed span for a blank line. That provenance is literally true, since the line came from S's overlay, but a reader of the sidecar alone could misread it.

## 2. Was identity among my four clause-2 readings? Does 29.0 change the "6 failing rows" estimate?

- **Whether identity was one of the four: unverified.**
  - The record (feedback/tasks.md L1148) says "four clause-2 readings tried" but doesn't name them, and I found no scratch for the sizing.
  - The question turns out not to matter, for the reason below.
- **Every committed re-pointed destination is byte-identical to its S. [verified]**
  - I scanned every `*.dispositions.yaml` on origin/main.
  - **169 re-pointed rows: 141 body (always-set included), 27 frontmatter and 1 shared member. 169/169 name S itself.**
  - 141 + 27 = 168, which matches the provisional count. So the sizing excluded the one `members:` row.
  - Any clause-2 reading that accepts S itself (identity, containment either way, membership) therefore gives the same verdict on every committed row. R1 moves no committed row. [verified, by the scan]
- **R2 moves no committed row either.** [verified, crude scan]
  - No committed `## @unit` overlay is empty or whitespace-only.
  - No `## @entry` value is `""`.
- **The six failures are clause-1 failures (D is empty) on the Kiro target. They are not clause-2 failures.** [verified, by reading the sidecars; the check itself was not run]
  - The Kiro JSON sidecar is one glue span, `C1:frontmatter+ambient-manifest` (stacy.json.attribution.json).
  - The Kiro prompt sidecars carry per-entry spans for `writeScope` only.
  - So the rows that render only into the JSON are the six:
    - `description`: ada, leonardo;
    - `knowledgeBases`: data `[android-components]`, kenya `[ios-components]`, stacy `[completion-docs]`, stacy `[spec-summaries]`.
- **Best current estimate: still 6**, with the same fix (29.3) and the same single re-sign (Stacy).
  - **Plus 0 or 1, depending on scope:** if R3's "committed consumer profile" includes `_shared.dispositions.yaml#record-first-ratification`, today's machinery reads it as `FAIL_NO_DERIVATION`. [verified, code read]
    - `parseRef` gives the body id `record-first-ratification`.
    - `spanRef` gives `#record-first-ratification`.
    - No tree exists for the shared catalog.
  - 7 rows stay under ceiling limb (i), and the members row is not a body or always-set row, so limb (iv) doesn't fire.
  - This rests on: the 169-row scan, the sidecar read, and the code read. It does not rest on a run; 29.0 is the run.

## 3. Can each R5 row be implemented and tested as a fixture?

All of these go through the real generator, as pass four did [verified, pass-four L175], built in a temp copy of the committed profile.

| Row | Implementable? | Note |
|---|---|---|
| A3 emptied | yes | An emptied body overlay renders `'\n'` attributed to S (pass-four L79) [verified]. R2 excludes it, so `FAIL_NO_DERIVATION`. |
| A3 non-empty | yes | The parent is a tree node (pass four reached `VERIFIED` under containment). Mutual containment is false, so `FAIL_DISHONEST_NAMING`. |
| C1 | yes | `FAIL_DISHONEST_NAMING`. |
| one-token variant | yes | `FAIL_DISHONEST_NAMING`. |
| honest in-place | yes | `VERIFIED`. 168/168 committed rows have this shape. |
| A1, AS1 | yes | Emptied, so `FAIL_NO_DERIVATION`. |
| A2, AS2 | yes, but the token should be named per row | "Emptied to its heading" keeps the heading line, which is non-whitespace, so `FAIL_DISHONEST_NAMING`. That is what R5's rule gives, but the row lumps the four together. |
| **F3** | **No, as written** | See below. |
| **F5 emptied** | **No, as written** | See below. |

**Why F3 and F5's emptied shape can't reach `FAIL_NO_DERIVATION`:**
- The verbatim frontmatter attack (a) keeps the key set, with `gap`/`cue = ""` (pass-four L70). `derive()` refuses any other shape: F1 and F2 were refused (L80; derive.ts L216-221, `overlayValue`) [verified].
- So the derived map keeps `class: ios-build-test`, which is the identity field and is forced, and `runContext: consumer-repo`.
- The rendered line also keeps the adapter's ` — … (run from your product repo)`.
- Under either reading of "rendered value" (the rendered text or the derived value), the entry is not empty. D is non-empty, clause 2 decides, and the result is `FAIL_DISHONEST_NAMING`.
- Both rows are still rejected. But:
  - R5's expected token is unreachable;
  - Task 29's G2-F3 red line ("attack (a) as the generator emits it is not rejected by clause 1") would go red on F3 by construction.
- The only way to reach `FAIL_NO_DERIVATION` is a per-field emptiness rule that knows which fields are content. `derive()` deliberately validates at class level, never per field (derive.ts L212-214) [verified].
- **This is a fork, and the pick is Thurgood's and Stacy's:**
  - (a) Correct the expected tokens. I recommend this.
  - (b) Add a per-field rule. I don't recommend it: it adds field-shape knowledge the design has kept out.
  - Surviving counter-argument to (a): on the frontmatter lane, clause 1 never rejects the verbatim attack (a). Rejection there rests only on clause 2 plus R1.

**Determinism:** nothing found that is undecidable. Two pins are worth adding: "whitespace" (A zero-width space is not removed by `trim()`, so it counts as a token. That is decidable but should be stated.) and the cross-target aggregation (changes 3 and 4).

## Changes (exact text, one line each)

1. **R5, F3 row** → "**FAIL**: `FAIL_DISHONEST_NAMING`. `derive()` keeps the key set and identity field, so the derived value is not empty (R2 does not reach it) and the sibling is not among `D`'s sources." **R5, F5 row, first sentence** → "**FAIL**: `FAIL_DISHONEST_NAMING` (R1). The emptied shape keeps `class` and `runContext`, so `D` is non-empty." **Add under R5**: "Task 29's G2-F3 red line reads 'attack (a)' as the shapes R2 excludes (A1, AS1). The frontmatter verbatim shape (F3) is rejected by clause 2."
2. **R2, frontmatter bullet** → "For a frontmatter entry, the test is on its derived value (`derive()`'s YAML value at the entry's canonical path), not its rendered text: `null`, an empty list, or a string empty after `String.prototype.trim()` is not in `D`." **Body bullet**: add "whitespace is the set `String.prototype.trim()` removes."
3. **R3** → "A row's verdict is `VERIFIED` only if it is `VERIFIED` against every committed target rendering that carries its source file. The stated count is rows, not row × target."
4. **R1/R3, the shared member** → "The `_shared.dispositions.yaml` `members:` row is decided in the member-id space: `D` is the spans sourcing `canonical/shared/shared-catalog.yaml#<id>`, and identity is id equality." (Or exclude it by name. Either way, the row count is then 169 or 168, stated.)
5. **R5, the A1/A2/AS1/AS2 row** → name the tokens per row: "A1, AS1: `FAIL_NO_DERIVATION`. A2, AS2 (heading kept): `FAIL_DISHONEST_NAMING`."
