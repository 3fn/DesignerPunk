# G2 cycle 2: attacks, expected outcomes and HOLDS conditions (Task 29, criterion C3)

**Author**: Stacy. This file is her audit artifact and sits outside every delegated-tier line. Thurgood is recused from U3g's text; Lina (Opus) is the executing agent and writes none of this file.
**Date**: 2026-10-12
**Unit**: U3g, branch `task/123-u3g-g2c2`, cut from `main` @ `c25470eac`. This file is committed on the branch as the child of `13dcfc08c`, before any commit that touches `tools/agent-generator/**` or `canonical/profiles/consumer/**` (Task 29 instrument: the attack file's commit is an ancestor of every such commit; `completion/u3g-sizing.md` @ `0e3a4c01f` is also an ancestor).
**Ruled text this file is written against**: `.kiro/specs/123-consumer-distribution/g2-spec-text-ruling.md` (R1–R5), as merged by #304 and present at the cut (`905dd1e62` per `u3g-sizing.md`). **If that file changes before the first fix commit, this file is amended by a new dated commit first. After the first fix commit, no expected outcome here is edited** (a wrong expectation is then a finding in the verdict record, never a quiet change).

**Dated additions after the first fix commit (2026-10-12; the first fix commit is Task 29.1, `4a8b65cf2`).** Two rows, M2 and L5, are added after the fix began. They are *ruled additions*, not edits of an expected outcome: no existing row's expectation changes. Their authority is Thurgood's erratum to the ruling (R2, shared-substrate members), merged by Peter in #310 (`fbd7549a7`), which answered the gap this file listed at § 6 item 1. Their tokens come from that merged text, and the adapters' `- ` prefix (`tools/agent-generator/adapters/cc.ts:215`, `adapters/kiro.ts:179`) it cites, read before the additions were written. Nothing was observed from a run. A reader who finds any other post-29.1 change to this file should treat it as a finding.
**Authority**: Task 29 criteria C3/C6 and Task 30; Peter's PR-5.6 (attacks and expected outcomes are committed before she sees the fix); Req 11.4, 11.4.1, 11.8.

---

## 0. What I have seen, and what I have not

- **Seen**: the ruling; pass four's record and the G2 findings issue; `completion/u3g-sizing.md` (169 rows, 163 VERIFIED, 6 FAIL, the fork and Peter's (A) ruling at `13dcfc08c`); Task 29 and 30 as amended; the committed profile and renderings.
- **Not seen**: any fix. At the time of writing, `git diff --stat c25470eac..HEAD` lists only `completion/*.md` and `tasks.md`. The check I judge is `tools/agent-generator/regrounding/derivation.ts` as merged (its input shape is `spans` carrying `source` only), unamended.
- **What this does not prove** (Task 29's own scope clause): the order of commits, not the order of knowledge. I know the shape of the six-row fix from the sizing. The attacks below are fixed by the findings (G2-F1, G2-F2, G2-F3) and by the ruling's R5, not by the fix.
- **Every expected token below is derived from the ruling's text, not from a run.** Rows marked **[run: pass four]** or **[run: sizing §2]** have an earlier run on the merged machinery that agrees on the *construction* (it built and reached the rendering). None of the ruled tokens has been observed yet; that is what the cycle is for.

## 1. Reading rules (so every row is decidable from this file)

1. **Verdict tokens per row**: `VERIFIED` · `FAIL_NO_DERIVATION` · `FAIL_DISHONEST_NAMING` (the check's own, `derivation.ts` `DERIVATION_VERDICTS`). Clause (1) is evaluated first; clause (2) only on a non-empty `D` (ruling R5).
2. **Surfaces** (ruling R3), named by the key `u3g-sizing.md` § 1 prints: body and always-set rows on `_canonical`, `cc`, `kiro`; frontmatter rows and the member row on `cc` and `kiro` only. A target's verdict pools every artifact of that target that renders the source file (`kiro` = prompt + JSON), as `u3g-sizing.md` reports it. **A row's expected token is the token on every surface listed for it.** If the standing check evaluates per artifact instead of per target, the tokens for a JSON-only artifact differ and I will say so in the request reply, before any verdict.
3. **Construction method** (as pass four): `git archive` of the frozen H′ into a scratch directory, built directories symlinked, the **real** `generateAll`, one `destination` value and one overlay block changed per row, signatures and `removals` left as committed. Nothing is committed. **A row whose construction is refused by `derive()` before rendering is not a verdict**: it is recorded `refused by derive()` with the refusal text, and it never counts toward HOLDS (see § 4).
4. **Rendered text is what the generator emits**, not a model of it (G2-F3). A row run against a hand-built span list does not count.
5. **Overlay edits** replace the block under the unit's `## @unit <anchor> @ sha256:…` (or `## @entry <path> @ sha256:…`) header; the header and its pin stay. The canonical sources are unchanged.
6. **Anchors used** (all verified present in the committed profile at the cut, `grep` of the dispositions files):
   - `S_body` = `#the-owed-set-pipeline-your-command-catalogs-owed-set-entry-documented-commands-deliberately-not-a-committed-script` in `stacy.dispositions.yaml` (L20), a `re-pointed` row, destination itself.
   - `T_body` (the trigger set, a sibling of `S_body`) = `#the-trigger-set-the-114-superset-table-names-never-numbers` (L18).
   - `P_body` (the `##` parent of both) = `#operational-mode-claims-audit-execution-claims-verification-the-q5-cut`.
   - `S_pre` = `#operational-mode-claims-audit-execution-claims-verification-the-q5-cut:preamble` (L16).
   - `S_as` = `#for-subtasks` and `T_as` = `#for-parent-tasks-implementation-or-architecture-type` in `always-set/task-completion-protocol.dispositions.yaml` (L9–10).
   - `S_fm` = `commands[ios-build-test]`, `T_fm` = `commands[product-screen-commands]`, `C_fm` = `commands` (entry tree), `commands[platform-tokens]`, `writeScope[.kiro/specs/**]`, all in `kenya.dispositions.yaml` (L73, 77–78, 99); `description` in `ada.dispositions.yaml`.
   - `S_mem` = `record-first-ratification` and `T_mem` = `find-docs-discovery` in `_shared.dispositions.yaml` (L9, L8).
   - `KB_*` = the four glob-only rows: data `knowledgeBases[android-components]`, kenya `knowledgeBases[ios-components]`, stacy `knowledgeBases[completion-docs]` and `[spec-summaries]`.
7. **Dependence on the knowledge-base fork**: Peter ruled (A) at `13dcfc08c` (the Kiro prompt renders glob-only knowledge bases, with per-entry spans). The expected outcomes below are the (A) outcomes. No other row depends on the fork. If (A) is reversed before the first fix commit, row `KB0` is amended by a dated commit first.

## 2. The rows

Columns: **ID** · lane · construction · surfaces · **expected token** · basis · what a wrong token means.

### 2.1 Honest controls: all expected `VERIFIED` (8 rows)

A control that fails means the check rejects honest work. That is not a pass on any other row.

| ID | Lane | Construction | Surfaces | Expected | Basis |
|---|---|---|---|---|---|
| S0 | body | `S_body` as committed (destination `S_body`) | `_canonical`, `cc`, `kiro` | `VERIFIED` | R1; pass-four S0 [run] |
| S0p | body | `S_pre` as committed (the `:preamble` anchor form) | `_canonical`, `cc`, `kiro` | `VERIFIED` | R1: identity, structural, never prefix (Req 11.4 pin) |
| T0 | always-set | `S_as` as committed | `_canonical`, `cc`, `kiro` | `VERIFIED` | R1; pass-four T0 [run] |
| K0 | frontmatter | `S_fm` as committed | `cc`, `kiro` | `VERIFIED` | R1; pass-four K0 [run] |
| W0 | frontmatter | `writeScope[.kiro/specs/**]` (kenya) as committed | `cc`, `kiro` | `VERIFIED` | R1; sizing § 1 (not among the six) |
| M0 | member | `S_mem` as committed | `cc`, `kiro` | `VERIFIED` | R1 member-id space (ruling L34); sizing § 1 |
| D0 | frontmatter | `description` as committed, rows for ada and leonardo | `cc`, `kiro` | `VERIFIED` | the fix's own rows; fixed on both fork readings by per-entry JSON spans |
| KB0 | frontmatter | the four `KB_*` rows as committed | `cc`, `kiro` | `VERIFIED` | (A): the prompt note carries per-entry spans sourcing each `knowledgeBases[<id>]` |

### 2.2 Rejections by clause (1): all expected `FAIL_NO_DERIVATION` (7 rows)

| ID | Lane | Construction | Surfaces | Expected | Basis |
|---|---|---|---|---|---|
| A1 | body | **attack (a) verbatim**: overlay of `S_body` empty; destination `T_body` | `_canonical`, `cc`, `kiro` | `FAIL_NO_DERIVATION` | R2 body rule; R5 row A1. The rendering keeps one blank line attributed to `S_body` [run: pass four A1], which `trim()` empties |
| A3 | body | overlay of `S_body` empty; destination `P_body` (S's `##` parent) | `_canonical`, `cc`, `kiro` | `FAIL_NO_DERIVATION` | R5 row A3, first half |
| A4 | body | overlay of `S_body` empty; destination `S_body` itself (emptied in place) | `_canonical`, `cc`, `kiro` | `FAIL_NO_DERIVATION` | R2: clause (1) is evaluated first, so a destination equal to S does not save an empty span |
| AS1 | always-set | overlay of `S_as` empty; destination `T_as` | `_canonical`, `cc`, `kiro` | `FAIL_NO_DERIVATION` | R5 row AS1 |
| WS1 | body | overlay of `S_body` is spaces, tabs and blank lines only; destination `T_body` | `_canonical`, `cc`, `kiro` | `FAIL_NO_DERIVATION` | R2: "whitespace" = what `trim()` removes |
| WS2 | body | overlay of `S_body` is U+00A0 (no-break space) characters only; destination `T_body` | `_canonical`, `cc`, `kiro` | `FAIL_NO_DERIVATION` | R2: `trim()` removes U+00A0 (same set as JS `\s`) |
| FS1 | frontmatter | `description` (ada) overlay value is a string of spaces; destination `frontmatter:description` | `cc`, `kiro` | `FAIL_NO_DERIVATION`, **or** a `derive()` refusal naming the entry; **never** `VERIFIED` | R2 frontmatter rule: a string empty after `trim()` is not in `D`. I cannot tell from the record whether `derive()` refuses a whitespace string first; either outcome rejects it. A `derive()` refusal is recorded as such and is not a verdict |

### 2.3 Rejections by clause (2): all expected `FAIL_DISHONEST_NAMING` (17 rows)

| ID | Lane | Construction | Surfaces | Expected | Basis |
|---|---|---|---|---|---|
| A2 | body | overlay of `S_body` is its heading line only; destination `T_body` | `_canonical`, `cc`, `kiro` | `FAIL_DISHONEST_NAMING` | R5 row A2: the heading line is text, so `D` is non-empty; `T_body` is not identical to a span source in `D` |
| A3f | body | **attack (f)**: `S_body`'s committed overlay kept; destination `P_body` | `_canonical`, `cc`, `kiro` | `FAIL_DISHONEST_NAMING` | R1, R5 row A3 second half: an ancestor does not satisfy clause (2). Shipped direction (containment) returns `VERIFIED` here [run: sizing §2 `parent`] |
| V1 | body | **one-token variant of attack (a)**: overlay of `S_body` is the single token `Owed.`; destination `T_body` | `_canonical`, `cc`, `kiro` | `FAIL_DISHONEST_NAMING` | R5 one-token row (G2-F1) |
| C1 | body | false label on true content: `S_body`'s committed overlay; destination `T_body` | `_canonical`, `cc`, `kiro` | `FAIL_DISHONEST_NAMING` | R5 row C1; pass-four C1 [run] |
| AS2 | always-set | overlay of `S_as` is its heading line only; destination `T_as` | `_canonical`, `cc`, `kiro` | `FAIL_DISHONEST_NAMING` | R5 row AS2 |
| F3 | frontmatter | **attack (a), frontmatter analogue, verbatim shape**: `S_fm` overlay keeps `class` and `runContext`, `gap` and `cue` = `""`; destination `frontmatter:` + `T_fm` | `cc`, `kiro` | `FAIL_DISHONEST_NAMING` | R5 row F3: the derived value keeps its members, so R2 does not reach it; the sibling is not a span source in `D`. Rejected by clause (2) and R1, not by clause (1) |
| F4 | frontmatter | as F3, but `gap` and `cue` replaced by the text "see product-screen-commands" | `cc`, `kiro` | `FAIL_DISHONEST_NAMING` | R1; pass-four F4 [run] |
| F5 | frontmatter | **F5's case**: as F3, destination `frontmatter:commands` (`C_fm`, the parent entry) | `cc`, `kiro` | `FAIL_DISHONEST_NAMING` | R5 row F5 |
| F5c | frontmatter | `commands[platform-tokens]` as committed; destination changed to `frontmatter:commands` | `cc`, `kiro` | `FAIL_DISHONEST_NAMING` | R1 on a committed non-empty row [run: sizing §2 `fm-parent`: merged machinery `VERIFIED`] |
| KB1 | frontmatter | kenya `knowledgeBases[ios-components]` as committed; destination `frontmatter:commands[ios-build-test]` | `cc`, `kiro` | `FAIL_DISHONEST_NAMING` | R1 on the new Kiro prompt note: the note's spans must source the member entry, and a different entry's path is not among them |
| WS3 | body | overlay of `S_body` is U+200B (zero-width space) only; destination `T_body` | `_canonical`, `cc`, `kiro` | `FAIL_DISHONEST_NAMING` | R2: U+200B is not removed by `trim()`; it is text (ruling L47), so `D` is non-empty and `T_body` is not a span source |
| WS4 | body | overlay of `S_body` is the HTML comment `<!-- -->` only; destination `T_body` | `_canonical`, `cc`, `kiro` | `FAIL_DISHONEST_NAMING` | R2 (ruling L47: an HTML comment is text) |
| WS5 | body | overlay of `S_body` is the single character `.`; destination `T_body` | `_canonical`, `cc`, `kiro` | `FAIL_DISHONEST_NAMING` | R2 (ruling L47: punctuation alone is text) |
| M1 | member | `S_mem` re-pointed with destination `T_mem` (a sibling member id) | `cc`, `kiro` | `FAIL_DISHONEST_NAMING` | R1 member-id space [run: sizing §2 `member`] |
| M2 *(added 2026-10-12)* | member | **emptied member**: the `_shared.overlay.md` entry for `S_mem` has `statement: ""`, with `id`, `kind`, `owner`, `source` and `crossRef` kept (derive()'s key-set rule); destination `T_mem` | `cc`, `kiro` | `FAIL_DISHONEST_NAMING` | ruling erratum #310 (R2, shared-substrate members): the body-unit rendered-text test applies, and the member renders as `- ` + the statement, so the span is `- ` and `D` is non-empty; the sibling is not among `D`'s sources (R1). If `derive()` refuses the construction, record the refusal; never `VERIFIED` |
| U1 | body | `S_body` as committed; destination `#no-such-unit` (an anchor absent from the tree) | `_canonical`, `cc`, `kiro` | `FAIL_DISHONEST_NAMING`, with **no thrown exception** | R1 (ruling L33): unknown ids stay non-matching; design C15 |
| U2 | body | `S_body` as committed; destination `frontmatter:description` (the other tree) | `_canonical`, `cc`, `kiro` | `FAIL_DISHONEST_NAMING` | R1 (ruling L31): identity is decided in one tree; cross-tree never matches |

### 2.4 Named limits: expected `VERIFIED`, and recorded as limits, not as passes of a rejection (5 rows)

Each of these is a hollowing **in place**, with S itself as the destination. The ruling states that the check does not reach them (ruling § "What this reading does not reach"). I commit the expected outcome so that the limit is measured and named, not discovered. **None of them is an attack that this cycle expects to reject.**

| ID | Lane | Construction | Surfaces | Expected | What I also record (an observation, not a verdict input) |
|---|---|---|---|---|---|
| L1 | body | overlay of `S_body` is the single token `Owed.`; destination `S_body` | `_canonical`, `cc`, `kiro` | `VERIFIED` | the C18 triviality floor's routing of this unit; the ruling says it routes to a signer (ruling L109). Pass-four B1 [run] was `VERIFIED` for a heading plus one pointer sentence |
| L2 | frontmatter | the F3 shape (`gap`, `cue` = `""`) with destination `S_fm` itself | `cc`, `kiro` | `VERIFIED` | that no signature is owed and the freshness sweep returns 0 findings, as pass four measured for F5 (ruling L110: reaches no human) |
| L3 | frontmatter | **permission-bearing**: `writeScope[.kiro/specs/**]` (kenya) overlay value widened from `specs/**` to `**`; destination itself | `cc`, `kiro` | `VERIFIED` | that the widened glob reaches the rendered `writeScope` on `cc` and the Kiro JSON `allowedPaths`, and that nothing routes to a human (ruling L111) |
| L4 | always-set | overlay of `S_as` is the single token `Done.`; destination `S_as` | `_canonical`, `cc`, `kiro` | `VERIFIED` | **whether the C18 floor routes an always-set unit hollowed in place.** The ruling does not establish it (ruling L113) and carries it to this cycle. I will run the floor over the rendering and state the result |
| L5 *(added 2026-10-12)* | member | as M2 (`statement: ""`); destination `S_mem` itself | `cc`, `kiro` | `VERIFIED` | ruling erratum #310: the residual's destination-S limit at its widest. The one shared member is a governance rule rendered into every agent, and its row is unsigned. I also record whether any route to a human exists for it (none is expected) |

**`toolSubset` is not a row.** The ruling names `toolSubset[…]` with `writeScope[…]` as the permission-bearing instance. In the committed profile every `toolSubset` member is `retained` (kenya L81–98) and no `toolSubset`, `preflight` or `knowledgeBases` row other than the four `KB_*` is `re-pointed` (grep of all eight agent dispositions files at the cut). A re-pointed `toolSubset` row cannot exist without a disposition edit, so the limit is stated and not measured. `writeScope` (L3) is the constructible instance.

### 2.5 Structural checks (not verdict rows; each has a red state)

| ID | Check | Red |
|---|---|---|
| E1 | **Scope half (2), re-run** (pass four's bite): with `S_body`'s committed operative-set record narrowed to 1 item, and then to 0, the freshness sweep refuses (`[confirmation] … note items (14) ≠ record items (N)`); with the record restored it reports 0 findings | any non-refusal on narrowing; any finding on the restored record |
| E2 | **The standing application cannot pass on zero rows** (G2-F2, R-8): the evaluated row count printed by the standing test equals the count derived from the committed dispositions (not a literal), is non-zero, and goes red on a temp copy with the dispositions removed | a literal count; a green zero |
| E3 | **The standing application bites** (G2-F2): planting row C1 (§ 2.3) in a temp copy of the committed profile turns the standing test red; removing it turns it green | no red, or no green |
| E4 | **It runs on every PR that touches its inputs**: the standing test file is in the resolved selection of `npm run test:agent-generator`, and `lane-timing.yml` runs that script with no paths filter (my ARMING read at U3g's merge confirms the file is in the selection; A-1 of my tasks-round read) | file absent from the selection |
| E5 | **The 16.1 parity test is green** and ties the rendering to what `dist/consumer-canonical` emits (`tools/agent-generator/__tests__/consumer-entry.parity.test.ts`, Task 16.1's referent) | red |
| E6 | **Harness control**: over the unmodified H′ copy, the generator's consumer output equals the committed `canonical/_consumer-output/**` byte for byte, every attribution sidecar's span list identical | any difference (this makes the cycle NOT-RUNNABLE, § 4) |

## 3. HOLDS conditions (Task 29 R-4; what each finding's closure means in rows)

`HOLDS` requires **all** of the following at the frozen H′:

1. **G2-F1 (rows A3, F5)** closed: A3f, A3, F5, F5c, F3, F4, C1, V1, A2, AS2, M1, M2, U1, U2, KB1, WS3, WS4, WS5 each return exactly their expected token on every listed surface.
2. **G2-F2 (rows C1, F3; a non-zero count; every PR touching the inputs)** closed:
   - C1 and F3 are rejected as in (1);
   - E2, E3, E4 and E5 are green;
   - **the committed profile is VERIFIED in full**: every one of the declared `re-pointed` rows (169 at the cut; the count is derived from the dispositions at H′) is `VERIFIED` on every surface § 1 rule 2 lists for it. Controls S0, S0p, T0, K0, W0, M0, D0 and KB0 are the named instances. **A row that stops being evaluated, or is silently excluded from a surface, is not a pass.** A row excluded from a surface is acceptable only if a dated record naming that row and that surface is an ancestor of H′;
   - the declared input set (Task 29, G2-F2) is written in the completion doc, and it contains at least the ruling's minimum (R3): `canonical/profiles/consumer/**`, the cited canonical sources, `canonical/consumer-profile.yaml`, `tools/agent-generator/**`, `canonical/_consumer-output/**`.
3. **G2-F3 (rows A1, A2, F3, AS1, AS2)** closed on the generator's own emission:
   - A1, A3, A4, AS1, WS1 and WS2 return `FAIL_NO_DERIVATION`, and A2, AS2 and F3 return `FAIL_DISHONEST_NAMING` (ruling R5, the token each row gets);
   - FS1 is rejected (`FAIL_NO_DERIVATION` or a recorded `derive()` refusal), never `VERIFIED`;
   - **Task 29's red line is read as the ruling reads it** (ruling L101): "attack (a) as the generator emits it is not rejected by clause 1" means A1 and AS1. F3 is rejected by clause (2), and the frontmatter lane's rejection of attack (a) rests on clause (2) plus R1 alone (Lina's surviving counter, ruling L103). The verdict record states this.
4. **Scope half (1)** (attack (a) verbatim): A1 as above. **Scope half (2)**: E1.
5. **E6 held**, so that every token above was read off the real substrate.
6. **No High or Critical finding raised by this cycle is still open.** The named limits in § 2.4 are *not* findings of this cycle (they are stated in the ruling and routed there); § 5 records Peter's ruling about them.

## 4. How the verdict is determined (closed, so nobody has to ask me)

- **`HOLDS`**: every condition in § 3, every control `VERIFIED`, every rejection row at its expected token.
- **`DOES-NOT-HOLD`**: any row returns a token other than its expected token (including a control rejected, an attack accepted, or the right rejection with the wrong clause); or any § 3 condition is unmet; or a High or Critical finding raised by the cycle is open. Under `DOES-NOT-HOLD` the record lists every wrong row with expected, observed and surface.
- **`NOT-RUNNABLE`**: E6 fails, or the toolchain to run the real `generateAll` is unavailable, or any row's construction cannot be built on the emitted substrate. The reason follows the token after ` — `. **A row I could not build is `not re-verified` and never counts toward HOLDS**; a cycle in which any listed row is unbuilt is `NOT-RUNNABLE`, not `HOLDS` with a note. A `derive()` refusal on FS1 is the one exception, and only because § 2.2 names it as an accepted outcome.
- A request I **refuse** (the conditions in `completion/g2-cycle-2-refusal-conditions.md`) produces no record and no token.

## 5. The fork about the named limits, RULED by Peter (2026-10-12: "accept")

The named limits L1–L4 are written-down limits, and the recommendation Peter agreed to under PR-5 was "fix and hold; never ship with a written-down limit". The ruling's own residual is that limit. Two defensible readings:

- **(a)** The limits are outside G2-F1/F2/F3 as defined, were measured before this cycle (pass-four B1 for the body lane; pass-four F5's "would survive even if the check were wired" for the frontmatter lane), and are routed by the ruling to a C16/C18 touch. `HOLDS` may carry them, and the verdict record names them in its "does not mean" list.
- **(b)** The permission-bearing instance (L3) in particular is a written-down limit that a consumer's `writeScope` could carry, and HOLDS should not be issued over it.

**Peter ruled (a) on 2026-10-12 ("accept"; relayed by the orchestrator, recorded in `completion/g2-cycle-2-refusal-conditions.md` § 6).** A `HOLDS` may carry the limits L1–L5 provided the verdict record names them, with L3 (the permission-bearing instance) and L5 (the unsigned shared governance rule) in its "does not mean" list, routed to Thurgood as a permission question. (The text below is kept as written before the ruling.) Counter-argument to my default: under (a) the hold lifts with a known permission-widening shape that reaches no human; what survives is that "never ship with a written-down limit" and "HOLDS may carry a named residual" cannot both be true, and I will not decide which governs.

## 6. What I cannot state an outcome against (Tasks 29 and 30), asked of their owners

1. **Emptied member (the `members:` lane): CLOSED 2026-10-12.** R2 was silent on a shared-catalog member whose rendered value is empty. Thurgood's erratum (#310, merged `fbd7549a7`) states it, and I corrected its first draft, which had named `FAIL_NO_DERIVATION` (the `- ` prefix keeps the span non-empty). Rows M2 and L5 now cover it.
2. **Per-target pooling.** § 1 rule 2 assumes the per-target pooling the sizing prints. If the standing check is per artifact, tokens on a JSON-only artifact change. Lina states which at the request.
3. **The unbuildable rows are not counted as passes** (§ 4). If `derive()` refuses a construction I list as buildable (FS1 is the one I already expect might), the row is recorded, not filled in.
4. **Task 29 C7 / 29.3's `git diff --stat` instrument** now names `*.attribution.json` plus the `*-prompt.md` of agents with a rendered glob-only knowledge base (amendment at `13dcfc08c`). Which agents those are is not stated. I will read it off the declared moved-outputs list, and I cannot state in advance which prompts. (Not a verdict input.)

## 7. Counts

| Expected verdict | Rows | IDs |
|---|---|---|
| `VERIFIED` (honest controls) | 8 | S0, S0p, T0, K0, W0, M0, D0, KB0 |
| `VERIFIED` (named limits) | 5 | L1, L2, L3, L4, L5 |
| `FAIL_NO_DERIVATION` | 7 | A1, A3, A4, AS1, WS1, WS2, FS1 (FS1 also accepts a recorded `derive()` refusal) |
| `FAIL_DISHONEST_NAMING` | 17 | A2, A3f, V1, C1, AS2, F3, F4, F5, F5c, KB1, WS3, WS4, WS5, M1, M2, U1, U2 |
| **Total verdict rows** | **37** | (13 `VERIFIED`, 7 `FAIL_NO_DERIVATION`, 17 `FAIL_DISHONEST_NAMING`) |
| Structural checks | 6 | E1–E6 |

`KB0` and `D0` each cover more than one committed row (four and two). The committed-profile condition in § 3(2) counts all 169.

**Standards implications**: none outstanding. The one this file raised (§ 6 item 1, the member lane's emptiness rule) was answered by Thurgood's erratum #310 on 2026-10-12.
