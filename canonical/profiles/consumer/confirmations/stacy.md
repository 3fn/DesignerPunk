# Operative-set confirmation — `stacy` (C1, owner seat)

**Record**: `canonical/operative-sets/stacy.yaml` (drafted by Thurgood at 11.1; confirmed and corrected here)
**Source**: `canonical/agents/stacy.md`
**Owner**: Stacy · **Profile author**: Thurgood · **Confirmer**: **Stacy**. Under C1 the owner confirms, because the owner is not the profile author (Req 11.6.5d; design C16).
**Date**: 2026-09-27 · Spec 123 Task 11.2 (Stacy's half)
**Scope**: the six exemplar source units only. The charter's other units are confirmed at 15.4.

**Closed-negative disclosure** (S-D-A11): *not independently re-verified. Confirmed by the auditing seat.* I constructed exemplars A–E on this charter, I confirm their operative sets, and I run G1 over them.

**Format**: Thurgood's proposed convention, adopted as proposed. Each unit gets a `` ## `#anchor` `` heading, followed by `confirmer:`, `canonicalHash:`, `items:` (the record's ids, in record order, or `none`) and `date:` lines. The ruling prose follows those lines.

**The criterion applied throughout (5c)**: an item is operative if and only if a consumer implementation could violate it. Rationale, history, illustration, and statements about another instrument's behavior are not operative. Headings are labels (clause (c)).

**Record edits I made as confirmer** (in the same commit as this note; each is a reviewed diff):
- `#the-charter-cut-ratified-verbatim`: 0 → 2 items.
- `#honest-reach-…`: 0 → 2 items.
- `#the-owed-set-pipeline-…`: 15 → 14 items (removed `owed-set-midnight-pin`).
- `#what-parity-means`: `parity-not-identical` text trimmed. I removed the trailing `It means:` because it is the list's lead-in label, not operative text.

## `#audit-checklist`

confirmer: stacy
canonicalHash: sha256:e8a4873d6fac46e8ad81bb94168464be2bd4705494f9cb74687a79e4d8e3d221
items: spec-quality-1, spec-quality-2, spec-quality-3, implementation-coverage-1, implementation-coverage-2, implementation-coverage-3, test-coverage-1, test-coverage-2, test-coverage-3, cross-platform-parity-1, cross-platform-parity-2, cross-platform-parity-3, cross-platform-parity-4, cross-platform-parity-5, documentation-1, documentation-2, documentation-3, process-adherence-1, process-adherence-2, process-adherence-3, process-adherence-4, lessons-learned-capture-1, lessons-learned-capture-2, lessons-learned-capture-3, lessons-learned-capture-4, lessons-learned-capture-5, metadata-accuracy-1, metadata-accuracy-2, metadata-accuracy-3, metadata-accuracy-4
date: 2026-09-27

**Ruling: CONFIRMED at 30 items, as drafted.**
- Each checklist question is an audit step that an audit can skip, so each one is violable.
- The eight numbered headings are labels.
- This matches my R2 count (8 headings × about 4 sub-bullets ≈ 30).

**The duplicate text — kept, and it carries a consequence for 13.4.** `documentation-3` and `lessons-learned-capture-2` have the same text (*"Are structured requests to system agents complete and actionable?"*). They are two obligations in two different lists, so both stay.
- **The problem**: a strict matcher that tests `rendering.includes(text)` counts **both** items as retained when only **one** copy survives.
- **That is an over-count, the dangerous direction**, and it breaks the floor's soundness claim, which is that strict matching can only under-count, by one item on this unit.
- **The property 13.4 needs**: when k items in a unit share one text, the strict count credits at most as many of them as there are occurrences of that text in the rendering.
- This is recorded for Lina's `triviality.ts`. It is not something the record can fix: making one copy's text unique would mean bundling it with a neighbouring item.

## `#the-charter-cut-ratified-verbatim`

confirmer: stacy
canonicalHash: sha256:faf006560fb7d64d617114bc38e435003c2d75fcc7d07100aeb367ce7e55b191
items: cut-thurgood, cut-stacy
date: 2026-09-27

**Ruling: 2 items, not 0. Both ratified cut sentences are operative under 5c.**
- **`cut-thurgood`** assigns Thurgood's seat and limits it (*"he does **not** adjudicate whether a particular execution claim was true"*). A consumer rendering whose steward rules on whether a claim was true violates it.
- **`cut-stacy`** assigns my seat and limits it (*"against standards she does not author and checks she does not maintain"*). A consumer verifier that writes completion standards, or maintains the checker it audits with, violates it.
- These are boundary obligations. They are the same kind of norm as the In-scope and Out-of-scope lists, and the section's own title calls them the ratified cut.
- **Not operative**: the third paragraph. *"The dividing verb is …"* restates the two cuts. *"Product-side was not a grant …"* is history. *"The basis is separation of duties + method fit …"* is rationale.
- **Consequence, carried to G1 and not fixed here**:
  - C(c1)'s construction says this counterpart carries zero operative items, so its required verdict is "inapplicable" by clause (a). Under 5c that premise is false for this unit.
  - The definition is not broken by this. With 2 items, a byte-identical rendering is outside the entry set (C18), and a retained rendering clears the floor at 2/2. Neither files a false finding.
  - But this unit does not test clause (a). See the C(c1) summary under the honest-reach unit below.

## `#the-trigger-set-the-114-superset-table-names-never-numbers`

confirmer: stacy
canonicalHash: sha256:f7c24db5ef47bb5cb6dd2fd3c02de63de689396142d8d61d60f58968d88c5eae
items: trigger-lens, trigger-release, trigger-symptom, trigger-closeout, trigger-midpoint, trigger-arming, trigger-gate, trigger-education, trigger-straggler, trigger-liveness, trigger-burst, finding-routing, merge-path-status
date: 2026-10-29

**Re-confirmed 2026-10-29 (Req 11.6.5d).**
- **What changed**: one row, RELEASE (canonical L400). Ballot `.kiro/docs/ballots/2026-10-26-release-flow-batch-16-1.md` (RATIFIED, Peter, 2026-10-26/27; Status read at `origin/main` `0bfc45621`) site 12 replaces the phase-1 floor-read lead-in ("the walk record … exists, its greps re-run at its `main at:` SHA, and every row carries a disposition;") with a pointer: "What phase 1 reads, and at which SHA, is RELEASE-FLOW step 6's Phase 1 bullet, not restated here *(amended 2026-10-29 by …, site 12; prior text at `08b9c7a8e`)*. Your record's lines:". It is composed with #536's site-2b sentence, which stays at its anchor (Peter: "Allow the Composition"; `9b43dfc33`). Thurgood applied it at `13bd1d57d` and re-quoted `trigger-release` at `70fe68a8d` (authoring; neither moves this canonicalHash).
- **Byte-identity, checked**: I took the resolved site-12 After from the ballot (§ "Resolved after-texts"), substituted `<application date>` → `2026-10-29`, inserted the site-2b sentence before "Phase 2 reads", and found the result once in the charter. The charter's diff against `origin/main` is three changed lines (L400, L432, L463: sites 12, 13 and 11), each matching its resolved text. `trigger-release` equals the canonical row byte for byte (1,805 characters) and occurs once in the unit.
- **What did not change**: the operative set, still 13 items; the row stays one `member` item. The other 12 items are untouched and verbatim, one occurrence each. The canonicalHash moves from `sha256:7b2664513beb395592f793b497590e8a031039c286cf5c72d8c072336e1f5fe7` to the value above. `operative-set-freshness` printed it at `4428ec6e7`, and I recomputed it independently from `partition(splitFrontmatter(...).body)` with `regrounding/hash.ts` (body lines 141–160). The two agree and equal the overlay pin.
- **Consumer rendering**: unchanged. The RELEASE row's range removal ("Phase 1 also carries the `release-falsity-floor` read … A read, never a gate.", `subtraction-3`) keeps both end strings and now spans the pointer too. The pointer names RELEASE-FLOW, a DesignerPunk process a consumer does not run. The other removals resolve as before.
- **Read before this act**: the canonical unit, `canonical/agents/stacy.md` L395–L414, read through a tool call (`sed -n`) at `4428ec6e7` before this commit (Peter's link-7 ruling; my 2026-10-29 line).

**Ruling: CONFIRMED at 13 items.**

**Re-confirmed 2026-10-27 (prior record, superseded)**: canonicalHash `sha256:7b2664513beb395592f793b497590e8a031039c286cf5c72d8c072336e1f5fe7`, 13 items, as below.

**Re-confirmed 2026-10-27 (Req 11.6.5d).**
- **What changed**: two rows, four edits, from ballot `.kiro/docs/ballots/2026-10-26-governance-examples-guard-adoption.md` § 3 (RATIFIED, Peter, 2026-10-26, F-1 answered (a); Status line read at this branch's base `bad7222ef`). **ARMING**, site 1: 1a adds `scripts/governance-examples/**` to the instrument-path list; 1b adds `scripts/governance-examples/__tests__/*.test.ts` to the deletion read, with its RATIFIED-at-`<m>` referent; 1c, under F-1 (a), adds the fourth read, on `scripts/governance-examples/pending.json`. **RELEASE**, site 2b (my text, verbatim): "Phase 1 also carries the governance-examples read (the counting block; ballot 2026-10-26-governance-examples-guard § 2.4)." Thurgood applied them at `6a29412fe` (authoring) and re-quoted `trigger-arming` and `trigger-release` at `c1fd0e06e` (authoring; neither commit moves this canonicalHash).
- **Byte-identity, checked**: I extracted the ten fenced blocks of § 3 sites 1, 2 and 2b (five Before/After pairs) and applied each pair as an exact replacement, each Before occurring once, to `canonical/agents/stacy.md` at `bad7222ef`. The result equals the committed charter as a whole file, byte for byte (69,315 bytes); `git diff --numstat bad7222ef HEAD` is three changed lines (RELEASE, ARMING, the counting block). `trigger-release` and `trigger-arming` each equal their canonical table line byte for byte (1,749 and 7,698 characters) and occur once in the unit.
- **What did not change**: the operative set, still 13 items. Both rows stay one `member` item each, as at every earlier re-confirmation; the new reads sit inside the rows' cells and are not split out. The other 11 items are untouched and remain verbatim substrings (one occurrence each). The canonicalHash moves from `sha256:17ef45beb34513cb4d848de44544358d44ad5d99e13791e56b8f8b522cb5ca12` to the value above, as `operative-set-freshness` printed it at `848594a81` and as I recomputed it independently from `partition(splitFrontmatter(...).body)` with `regrounding/hash.ts` (body lines 141–160); the two agree and equal the overlay pin.
- **Consumer rendering (my decisions, stated for the dispositions)**: (a) the **ARMING row stays removed for consumers, whole, with 1a–1c removed with it** (`subtraction-3`, as before; the removal now quotes the 7,698-character row verbatim). The new limb, test file and `pending.json` read audit DesignerPunk's own guard, register row and pending list, none of which a consumer repo has. (b) The **RELEASE pointer sentence is removed** (`subtraction-3`): the read it points to is a DesignerPunk instrument read, removed from the consumer counting block in the same way (the claims-pass unit, below). The consumer RELEASE row is unchanged. The overlay text is unchanged, and the rendering's span hash is unchanged (recomputed).

**Ruling: CONFIRMED at 13 items.**

**Re-confirmed 2026-10-21 (prior record, superseded)**: canonicalHash `sha256:17ef45beb34513cb4d848de44544358d44ad5d99e13791e56b8f8b522cb5ca12`, 13 items, as below.

**Re-confirmed 2026-10-21 (Req 11.6.5d).**
- **What changed**: two rows, three replacements, all my text from ballot `.kiro/docs/ballots/2026-10-20-grant-ci-deletions-and-activating-merge-read.md` § 2 (RATIFIED, Peter, 2026-10-20: "Let's proceed with revised option 2 as recommended"; my `[STACY R1]` and `[STACY R2]` on record). **ARMING, A-1, two replacements** in the `.github/**` issue-row grant read: (1) "at activation the list names no governance-law path and names any M1-excluded act it admits" gains "each line of its `**Deleted lines**:` block read there as one such act or not, and the read carries, at column 0, the line `**Grant activation read**: .kiro/issues/<file> @ <activating-merge sha, 9 characters>`"; (2) "with `--numstat` deletions `0` on CI paths unless the grant names the act" becomes "with `--numstat` deletions `0` on CI paths, or every deleted line quoted in the grant's `**Deleted lines**:` block as it stood at the activating merge, never in the fixing PR's body", with the diff command, the count-equality stop, the line-matching rule, the M1-excluded-act sentence and the known-gap sentence. **LIVENESS, A-2, one insertion** after "Events without records = finding.**": the grant-activation read (Thurgood's item 4), a candidate without its `**Grant activation read**:` line being a finding routed to me. Thurgood applied them (`3978fdfb0`); that is his authoring, not this act.
- **Byte-identity, checked**: I extracted the two A-1 replacement blockquotes and the A-2 insertion from the ballot's § 2 and applied them, as exact string replacements at their named anchors (each anchor occurring once), to `canonical/agents/stacy.md` at `c219488d6` (the P1b application, the charter's previous version). The result equals the committed charter **as a whole file, byte for byte**; `git diff --numstat c219488d6 HEAD -- canonical/agents/stacy.md` is two changed lines (the ARMING and LIVENESS rows) and nothing else moved. `trigger-arming` and `trigger-liveness` each equal their canonical table line byte for byte (one occurrence in the charter, and a whole line of it) and are verbatim substrings of the unit (one occurrence).
- **What did not change**: the operative set, still 13 items. Both rows stay one `member` item each, as at every earlier re-confirmation; the Deleted-lines read, the marker line and the grant-activation sentence sit inside the rows' cells and are not split out. The other 11 items are untouched. The canonicalHash moves from `sha256:ad17a9e68ed401c046c11a9917f9b1059f7a112aade4ba8accf98dc65fb5fcca` to the value above, as `operative-set-freshness` printed it and as I recomputed it independently from `partition(splitFrontmatter(...).body)` with `regrounding/hash.ts` (the two agree).
- **Consumer rendering (my decisions, stated for the dispositions)**: (d) the **ARMING row stays removed for consumers, whole, with both A-1 replacements removed with it** (`subtraction-3`, as before). The deleted-lines read audits a DesignerPunk grant record's `**Deleted lines**:` block and the `**Grant activation read**:` marker against `.github/**` CI paths under the issue-row grant standing scope, none of which a consumer repo has; the whole-row removal quotes the row verbatim, so Thurgood rewrote its `text` to the new ARMING line (cite unchanged; I checked it equals the canonical row, one occurrence). (e) The **LIVENESS row stays in the overlay without the grant-activation sentence**: the overlay row (`stacy.overlay.md` L78) is not changed by this act. The read needs Thurgood's LIVENESS item 4 and its query over root `.kiro/issues/` `**Grant paths**` blocks; a consumer has no `.kiro/issues/` records, no grants and no item 4 (his `#trigger-types` removes it, below). A consumer verifier that carried the sentence would be pointed at a read that does not exist. The row already omits the "active-charter walk" for the same reason. `trigger-liveness` is not among this row's surviving items (5 of 13: `trigger-symptom`, `trigger-midpoint`, `trigger-education`, `finding-routing`, `merge-path-status`), so my assent set is unchanged. Pin only: the overlay's `## @unit` pin for this unit moves to the new canonicalHash (Thurgood); the overlay body is unchanged and the rendered hash is expected unchanged.

**Ruling: CONFIRMED at 13 items.**

**Re-confirmed 2026-10-20 (prior record, superseded)**: canonicalHash `sha256:ad17a9e68ed401c046c11a9917f9b1059f7a112aade4ba8accf98dc65fb5fcca`, 13 items, as below.

**Re-confirmed 2026-10-20 (Req 11.6.5d).**
- **What changed**: the ARMING row, two insertions: one in its event cell, one in its scope cell. They are my text from ballot `.kiro/docs/ballots/2026-10-20-in-lane-guard-registry-additive-entries.md` (P1b; RATIFIED, Peter, 2026-10-20), § 7 `[STACY R1]` item 3. The event cell gains "a PR whose diff touches `.github/in-lane-guards.json` merges", keyed on the path and never on the PR's own claim to be P1b. The scope cell gains the P1b read, placed after the issue-row-grant read and before the instrument-path read: five reads at the PR's merge `<m>` against `<m>^`, four decidable from git, the workflow and the check, the fifth a judgment (the assertion the record rests on, named, or a finding that the entry guards in name only); a `false` predicate or a touched entry is a finding on the executing agent routed to Peter, a name-only entry a finding on the adder with a stronger file as its remedy. Thurgood applied it under errata (f) (`ae68f130b`); that is his authoring, not this act.
- **Byte-identity, checked**: I extracted both fenced blocks from the ballot's § 7 and checked them against `canonical/agents/stacy.md`. Each occurs verbatim in the charter, and the charter equals the 2026-10-19 charter (`42d412846`) plus exactly those two insertions at their named anchors ("(ballot 2026-10-17-standing-write-scope-six-roots § 3 item 4)" and "on CI paths unless the grant names the act"), with no other byte moved (`git diff --numstat`: two changed lines). The `trigger-arming` item equals the canonical ARMING line byte for byte and is a verbatim substring of the unit (one occurrence).
- **What did not change**: the operative set, still 13 items. The row stays one `member` item, as at every earlier re-confirmation; the P1b read sits inside the row's cells and is not split out. The other 12 items are untouched and remain verbatim substrings, in order. The canonicalHash moves from `sha256:bef1274f376dbc6f7c385f1341f0c40a84928d3cdf163a640539f436e442b1b0` to the value above, as `operative-set-freshness` printed it and as I recomputed it independently from `partition(splitFrontmatter(...).body)` with `regrounding/hash.ts` (the two agree).
- **Consumer rendering (my decision, stated for the disposition)**: the ARMING row stays **removed for consumers; the P1b read is removed with it, not kept**. The read audits a PR against DesignerPunk's `.github/in-lane-guards.json`, its additivity predicate (a ballot § 2 text consumers never receive), its `EXPECTED_CONTEXTS` and its `lane-functional-root` check. A consumer repo has none of these, so a consumer verifier has nothing to run it against; it is a steward-side duty on DesignerPunk's own CI, the same ground on which the whole row was already removed (`subtraction-3`). The whole-row removal quotes the row verbatim, so its `text` was rewritten to the new ARMING line (Thurgood, same commit, cite unchanged; I checked it equals the canonical row). Pin only: the overlay body is unchanged (it carries no ARMING row) and the rendered hash is expected unchanged. `assent.surviving` is unchanged (5 of 13). The pin and the re-sign follow in later turns.

**Ruling: CONFIRMED at 13 items.**

**Re-confirmed 2026-10-19 (prior record, superseded)**: canonicalHash `sha256:bef1274f376dbc6f7c385f1341f0c40a84928d3cdf163a640539f436e442b1b0`, 13 items, as below.

**Re-confirmed 2026-10-19 (Req 11.6.5d).**
- **What changed**: the ARMING row, one insertion in its scope cell: the shipping-PR re-run read, placed after the instrument-path reads and before "Nothing else fires on a weakened checker". It is my text from ballot `.kiro/docs/ballots/2026-10-19-instrument-census-at-draft.md` (site 3; RATIFIED, Peter, 2026-10-19): for a path-list PR that ships a change a ballot's census line ruled on, the ballot's scratch diff and the shipped code, each run at the PR's own base, give equal digests, with no carve-out, decidable from the PR and the ballot's `## Census appendix`; the stop is the PR author's, a merge past one a finding on the author; an instrument outside the path list is left to RELEASE as the backstop. Thurgood applied it byte for byte to the charter and as `trigger-arming`'s text (`cd6ee604c`); that is his authoring, not this act.
- **`trigger-arming`'s text, verified verbatim**: it equals the canonical ARMING line byte for byte, the inserted sentence occurs verbatim in my site-3 text, and the item is a verbatim substring of the unit (one occurrence).
- **What did not change**: the operative set, still 13 items. The row stays one `member` item, as at every earlier re-confirmation; the new read sits inside the row's scope cell and is not split out. No other item's text moved; the other 12 remain verbatim substrings of the unit, in order. The canonicalHash moves from `sha256:ea4f4b52be0b5544d4721d485ae3b509839b271d376079158d8bca376b64a545` to the value above, as `operative-set-freshness` printed it and as I recomputed it independently from `partition(splitFrontmatter(...).body)` with `regrounding/hash.ts` (the two agree).
- **Consumer rendering (my decision, stated for the disposition)**: the ARMING row stays **removed for consumers; the new clause is removed with it, not kept**. The clause reads a DesignerPunk ballot's census appendix and compares a ballot scratch diff to the shipped code at the PR's base. Consumers of the package adopt no ballots and no instrument census, so there is nothing for a consumer verifier to run it against; it is a steward-side duty on DesignerPunk's own instrument paths, the same ground on which the whole row was already removed (`subtraction-3`). The whole-row removal quotes the row verbatim, so its quoted text no longer matches: Thurgood rewrites the removal's `text` to the new ARMING line, cite unchanged. Pin only: the overlay body is unchanged (it carries no ARMING row) and the rendered hash is expected unchanged. `assent.surviving` is unchanged (5 of 13). The pin and the re-sign follow in later turns.

**Ruling: CONFIRMED at 13 items.**

**Confirmed 2026-10-18 (prior record, superseded)**: canonicalHash `sha256:ea4f4b52be0b5544d4721d485ae3b509839b271d376079158d8bca376b64a545`, 13 items, as below.

**Re-confirmed 2026-10-18 (Req 11.6.5d).**
- **What changed**: the RELEASE row. Ballot `.kiro/docs/ballots/2026-10-18-obligation-drain-and-release-falsity-floor.md` (RATIFIED, Peter, 2026-10-18) § 7 (M7) names my RELEASE row as the home of the `release-falsity-floor` read. I drafted the sentence that carries it (inserted after "carries Q2 guard (i)'s arming line."), and Thurgood applied it byte for byte under six-roots errata (f) at `9072db1ed`, to the canonical row and as `trigger-release`'s item text. That is his authoring, not this act.
- **`trigger-release`'s text, verified verbatim**: it equals the canonical RELEASE line byte for byte, equals the row I drafted (`cmp`-identical, 1,626 characters), and is a verbatim substring of the unit (one occurrence).
- **What did not change**: the operative set, still 13 items. The row stays one `member` item, as at every earlier re-confirmation; the floor read sits inside the row's scope cell and is not split out. No other item's text moved; the other 12 remain verbatim substrings of the unit. The canonicalHash moves from `sha256:aa674a0127352f1c012ddfd8f8d9742d7470063ed604415526f83de6e8056d1c` to the value above, as `operative-set-freshness` printed it and as recomputed from `partition(splitFrontmatter(...).body)` with `regrounding/hash.ts`.

**Ruling: CONFIRMED at 13 items.**

**Re-confirmed 2026-10-17 (Req 11.6.5d).**
- **What changed**: the ARMING row. Edit site 5a of the ratified ballot `.kiro/docs/ballots/2026-10-17-standing-write-scope-six-roots.md` (RATIFIED, Peter, 2026-10-17) adds the § 3 item 4 instrument-change trigger: the instrument-path Event, the instrument paths, the three reads with Peter's 2026-10-17 widening (the generator's `__tests__/fixtures/**`, the § 4 B checkers' tests by the tests-follow-the-module rule, and the three steward-verb tests), the known-gap clause, "an audit trigger, never a gate", and the cost. Under Peter's ruling on the 5a substitute, Thurgood applied my drafted row byte for byte (`2c8e448ff`) and this confirmation is my act over it.
- **`trigger-arming`'s text, verified verbatim**: it equals the canonical ARMING line byte for byte, equals the row I drafted (3,088 bytes, compared with `cmp`), and is a verbatim substring of the unit (one occurrence). The item-text edit is Thurgood's authoring (`2c8e448ff`), not this act.
- **What did not change**: the operative set, still 13 items. The row stays one `member` item, as at the 2026-09-28, 2026-09-29 and 2026-10-03 re-confirmations; the instrument-path reads sit inside the row's cells and are not split out. No other item's text moved. The canonicalHash moves from `sha256:eb7326f4705918216be6d929ec192f58cd092d82110ee7fcb2c9b29eb07f3b1a` to the value above.

**Ruling: CONFIRMED at 13 items.**

**Re-confirmed 2026-10-03 (Req 11.6.5d).**
- **What changed**: the RELEASE row. Ballot `.kiro/docs/ballots/2026-10-03-hermetic-publish-path.md` (RATIFIED, Peter, 2026-10-03) § 5 item 6 replaced it with Stacy's § 10 [STACY R1] item (7) wording: the two-phase event cell, the appended phase-2 scope sentence, and the F-2 clause (F-2 ruled permitted, § 9). One period was added after "arming line" as the sentence separator. Canonical commit `59e2b7ff`.
- **`trigger-release`'s text, verified verbatim**: it equals the canonical RELEASE line byte for byte, is a verbatim substring of the unit (one occurrence), and each appended cell matches § 10 item (7) exactly. That text edit is authoring, not this act (signing-act ballot § 2 clause 4): commit `db3b7454`, authorized for Peter's carve-out merge of this PR.
- **What did not change**: the operative set, still 13 items. The row stays one `member` item, as LENS did on 2026-09-29 and ARMING on 2026-09-28; the phase-2 reads and the F-2 clause sit inside the row's cells and are not split out. No other item's text moved; all 13 remain verbatim substrings of the unit. The canonicalHash moves from `sha256:5055f134c5a6c6fc5ecd2f499d3eb428ff14a0679946152f88e630c0c8de3d7a` to the value above.
- **History**: an earlier seat made this same re-confirmation on PR #284 (`8a8e97a2`, now closed, kept at `refs/pull/284/head`). This act is taken afresh on the re-cut branch and stands on its own.

**Ruling: CONFIRMED at 13 items.**

**Re-confirmed 2026-09-29 (Req 11.6.5d).**
- **What changed**: `trigger-lens`'s text, which is the LENS row. Edit site 5b of the ratified ballot `.kiro/docs/ballots/2026-09-28-parent-instrument-existence-check.md` (RATIFIED, Peter, 2026-09-29) adds question 6 (existence at the review base, never fit) and its plan-time form for M4-bound specs, which reads each parent's declared `**Instruments:**` block.
- **What did not change**: the operative set, still 13 items. The row stays one `member` item, as the ARMING row did at the 2026-09-28 re-confirmation below; question 6 is part of the LENS row's cell and is not split out. The canonicalHash is updated from `sha256:48826ac4369cbc915c1bfa78eef861818d2630a2fdd4ee95279a6a7063603699` to the value above.

**Ruling: CONFIRMED at 13 items.**

**Re-confirmed 2026-09-28 (Req 11.6.5d).**
- **What changed**: `trigger-arming`'s text, which is the ARMING row, rewritten by edit site 4 of the ratified ballot `.kiro/docs/ballots/2026-09-27-ci-regime-standing-scope.md` (RATIFIED, Peter, 2026-09-28). Its Event and Scope gain the P1 standing-scope reads and the `.github/**` issue-row grant reads.
- **What did not change**: the operative set, still 13 items. The canonicalHash is updated from `sha256:08619eb21d0b3f41e6e5205308394abeb6e0a88c4b26b8700fc10b6e2070c0a7` to the value above.
- **The Event's `(at its activating merge, and again when its fixing PR merges)`** is an **orchestrator ruling under fork 4's ratified intent**, which was to close the latency of auditing only at RELEASE. It is **flagged for Peter's veto at the PR**.

**Ruling: CONFIRMED at 13 items, as drafted.**
- **The 11 table rows** match exemplar D's "11-row table", which counted BURST.
- **The retired BURST row stays an item.** Its retirement is a norm: a verifier that still fires BURST's sampling pass on "a gap" violates the supersession by CLOSEOUT + MIDPOINT. The row's preserved counter-argument is part of the same cell, and I do not split it out.
- **The finding-routing paragraph** is operative: two additive routes, a single instance with no threshold, and an explicit message rather than a file only.
- **The merge-path paragraph** is operative: never a required check, a gate or a blocker.
- Their trailing rationale clauses (*"The ground is the co-signer argument …"*) sit inside the item text. That can only make strict matching under-count, so they stay.
- **Not operative**: the table's header row.

## `#the-owed-set-pipeline-your-command-catalogs-owed-set-entry-documented-commands-deliberately-not-a-committed-script`

confirmer: stacy
canonicalHash: sha256:c33de65dbe1f520848954760b2d2abcc539c3454b81de434e75ff6721d85dbd4
items: owed-set-predicate, owed-set-emits-exclusions, owed-set-run, owed-set-row-classes, owed-set-count-line, owed-set-candidate-not-verdict, owed-set-heuristics, owed-set-unavailable, owed-set-one-code-path, owed-set-class-a, owed-set-class-b, owed-set-class-c, owed-set-git-history
date: 2026-10-22

**Re-confirmed 2026-10-22 (Req 11.6.5d; errata (f)).**
- **What changed**: the unit stops pasting the pipeline and calls the committed script. The sentence "The query is a committed script, not pasted commands; Thurgood maintains it and you specify its cases" and the one-line fenced call `./scripts/owed-set.sh` replace the staged commands; a paragraph of output contract follows (the row classes, the count line and its row-sum identity, "a candidate is not a verdict", the two heuristic classes, the `unavailable` line, one code path). The text is mine, from the script PR (`.kiro/issues/2026-10-19-owed-set-query-over-lists-in-progress-specs.md`; Peter's "Yes.", 2026-10-21). Thurgood applied it byte for byte at `0e2d81d00` and drafted the record at `b7c32ae44`; the script is `a4bf25429`. The canonicalHash moves from `sha256:e3f6f82a3b33e37b2e4862e259510551fd4c3d33b19da0357164b26f2742f837` to the value above, as `operative-set-freshness` printed it and as I recomputed it independently from `partition(splitFrontmatter(...).body)` with `regrounding/hash.ts` (the two agree).
- **Fourteen items become thirteen** (items are authoring, signing-act ballot § 2 clause 4; I confirm them). Kept, six: `owed-set-predicate`, `owed-set-class-a`, `-b`, `-c`, `owed-set-git-history`, and `owed-set-emits-exclusions` with changed text ("emits every spec it leaves out, by class"). New, seven: `owed-set-run` (command; the fenced call), `owed-set-row-classes`, `owed-set-count-line` (with the row-sum identity read first), `owed-set-candidate-not-verdict`, `owed-set-heuristics`, `owed-set-unavailable`, `owed-set-one-code-path`. Retired, eight: `owed-set-ratification-resolve`, `owed-set-stage-1a`, `-1b`, `-2`, `-3`, `-4`, `owed-set-three-copies`, `owed-set-staged-mechanization`. 6 kept + 7 new = 13, matching the record's 13; the `items:` line above lists them in the record's order.
- **Each of the 13 is a verbatim, unique substring of the unit** (checked by script: 1 occurrence each). Each is violable under 5c: `owed-set-candidate-not-verdict` (opening a pass on a candidate whose unit has not merged), `owed-set-heuristics` (calling the set empty without spot-reading an `open` or `touch-only` row), `owed-set-unavailable` (writing "empty" after an `unavailable` line) and `owed-set-count-line` (trusting output whose row sum does not add) are the ones a run can break.
- **This is a narrowing, the direction 5d watches, and I name the ground.** The eight retired items are the staged commands and the two pre-commitments. Their function did not leave; it moved into a checked instrument: the midnight pin, the post-ratification activity filter, the class split, the anchor and the exit behaviour are the script's, pinned by 24 falsification cases in `scripts/__tests__/owed-set.test.ts` (I ran it under `npm run test:scripts`'s config at `060894526`: 24 of 24 pass). The ratification-resolve block's FATAL is replaced by the one-line `unavailable` result (`owed-set-unavailable`). `owed-set-three-copies` is superseded by `owed-set-one-code-path` (one script, no copy). `owed-set-staged-mechanization` fired and discharged: Peter's "Yes." is the second-wrong-result rung, and the script is the mechanization it promised. The threshold effect on exemplars B and E is Thurgood's `ff4148d43` (0/14 to 0/13 ROUTES).
- **Not items**: the heading (a label); the lead-in "Run it from the repository root with the defaults" (the command is the item); "The output is one tab-separated row per spec ... then one count line" (a fact about the script's output, with the classes and count line itemized beside it); and "The query is a committed script, not pasted commands; Thurgood maintains it and you specify its cases". That last sentence is the closest call: it limits this seat (I do not maintain the checker), but that boundary is already `out-7` in `#out-of-scope` ("The claims instrument ... are Thurgood's; you specify the falsification fixtures"), and "not pasted commands" is entailed by `owed-set-run` and `owed-set-one-code-path`. I did not itemize it a second time; a rendering that pastes the pipeline back breaks `owed-set-run`.
- **Consumer rendering (for the disposition)**: re-pointed to `bash node_modules/@3fn/core/scripts/owed-set.sh --specs-dir specs` (the consumer package ships the script), with the generic wording for adoption, specs dir and "more than one place". Expected: all 13 survive; I judge that at the re-sign, against the fresh rendering and the script's real output, not on the removals list.

**Ruling: CONFIRMED at 13 items.**

**Prior record (superseded, 2026-09-27; `canonicalHash` `sha256:e3f6f82a3b33e37b2e4862e259510551fd4c3d33b19da0357164b26f2742f837`, 14 items: `owed-set-predicate`, `owed-set-emits-exclusions`, `owed-set-ratification-resolve`, `owed-set-stage-1a`, `-1b`, `-2`, `-3`, `-4`, `owed-set-class-a`, `-b`, `-c`, `owed-set-three-copies`, `owed-set-staged-mechanization`, `owed-set-git-history`)**: the ruling below stands as history.


**Ruling: 14 items. The draft had 15, and my R2 estimate was about 10.**
- **Why my estimate was low.** "≈10" counted *"4 stages, 3 exclusion classes, the predicate, the commands"* by kind. Counting at verbatim-substring grain finds more:
  - five stages, not four, because 1a and 1b are separate steps;
  - a separate ratification-resolve block (FATAL when no record is found);
  - the exclusions-by-name obligation;
  - three governance obligations I did not estimate: the three copies kept as one text, the staged-mechanization pre-commitment, and git history as provisioning.
- Each of these is violable. The estimate was the one that was wrong.
- **Removed: `owed-set-midnight-pin`.** That comment block is rationale: it explains why the boundary is pinned and names the incident that caused the pin. The pin itself, `--since="$RATIFIED 00:00"`, is operative, and it sits inside `owed-set-stage-1a` and `owed-set-stage-1b`.
  - A rendering that drops the comment but keeps `00:00` has lost no function.
  - A rendering that keeps the comment but drops `00:00` has broken stage 1a, and stage 1a's strict match already fails.
  - I applied the same rule to G's "User may want …" bullets.
- **This is a narrowing, which is the direction 5d watches.** It is a reviewed diff in the owner's seat. It moves B's clearing threshold from 8/15 to 7/14, a change of about half an item, and B's verdict rests on its routed judgment anyway.
- **Not operative**: the heading's parenthetical (a label), the fence lines, and *"The exclusion classes, enumerated"* (a lead-in).

## `#the-owed-set-query-your-command-catalogs-owed-set-entry-the-committed-script`

confirmer: stacy
canonicalHash: sha256:fcf52f052773d8f801d52ae79152e04e167d892cb2d568b549429486b1da75bf
items: owed-set-predicate, owed-set-emits-exclusions, owed-set-run, owed-set-row-classes, owed-set-count-line, owed-set-candidate-not-verdict, owed-set-heuristics, owed-set-unavailable, owed-set-one-code-path, owed-set-class-a, owed-set-class-b, owed-set-class-c, owed-set-git-history
date: 2026-10-23

**Re-confirmed 2026-10-23 under the renamed key (Req 11.6.5d; errata (f)).**
- **What changed**: one line, the unit's heading, which is the unit's key. It read "The owed-set pipeline (your command catalog's owed-set entry — documented commands, deliberately not a committed script)", which said the opposite of the body since #439 made the query the committed script `scripts/owed-set.sh`. It now reads "The owed-set query (your command catalog's owed-set entry — the committed script)". The text is mine (`.kiro/issues/2026-10-22-stacy-owed-set-heading-false-after-439.md`, § 2 step 1); Thurgood applied it byte for byte at `6a00748ac` (errata (f)) and moved the operative-set key and confirmation fragment at `d06620cdb`. The body under the heading is byte-identical to the one I confirmed on 2026-10-22 (`git diff 6a00748ac^ 6a00748ac -- canonical/agents/stacy.md` is the heading line alone).
- **The canonicalHash moves** from `sha256:c33de65dbe1f520848954760b2d2abcc539c3454b81de434e75ff6721d85dbd4` to the value above, because the hash covers the heading line. I recomputed it independently (`hashText` over the unit text from `partition(splitFrontmatter(...).body).units`, via a scratchpad script outside the repo): `sha256:fcf52f05…75bf`. It equals the overlay pin Thurgood wrote at `d06620cdb`.
- **The set is unchanged: 13 items, the same ids in the same order.** A heading is a label, not an operative item, so the rename removes and adds nothing (5c, clause (c)). Items are authoring and I re-confirm them as they stand.
- **Each of the 13 is a verbatim, unique substring of the renamed unit** (checked by script against the unit text at `0cd0b45d1`: 1 occurrence each, 13 of 13). The five I name as the ones a run can break are unchanged from the 2026-10-22 confirmation: `owed-set-candidate-not-verdict`, `owed-set-heuristics`, `owed-set-unavailable`, `owed-set-count-line` and `owed-set-one-code-path`.
- **Not a narrowing.** No function leaves; the consumer rendering is untouched (the overlay body is unchanged, only its `@unit` slug and pin moved).
- **The ledger**: the section under the old key `#the-owed-set-pipeline-…-deliberately-not-a-committed-script` stays above as history and is not rewritten. It no longer corresponds to a record key.

**Ruling: CONFIRMED at 13 items.**

## `#honest-reach-carried-so-you-never-inherit-an-over-claimed-instrument`

confirmer: stacy
canonicalHash: sha256:7b2a7c8edaa9ba38463e8afa521851f7b4350e0892cf5ed9596497f90aaeaa18
items: reach-checker-greens-plausible, reach-platform-trust, reach-artifact-truth, reach-green-is-not-honesty
date: 2026-09-29

**Re-confirmed 2026-09-29 under the narrowed 5c reading (the classifier owner's "can contradict" ruling): 2 → 4.** The two sentences I ruled non-operative below are stated facts that this seat's verifier builds against. A verifier that treats a plausible Evidence path as verified contradicts the first. One that reports iOS or Android evidence as re-verified in this environment contradicts the second. Added: `reach-checker-greens-plausible` and `reach-platform-trust`. The canonicalHash is unchanged, because the text did not change. This departs from the owner's expectation of no change, and I state it as such. The 2026-09-27 ruling below stands as history.

**Ruling (2026-09-27): 2 items, not 0.**
- **`reach-artifact-truth`** is an ownership assignment. A consumer verifier that leaves artifact truth to the parity gate, rather than to its claims pass, violates it.
- **`reach-green-is-not-honesty`** is, in the charter's own words, *"the framing sentence that binds every reader."* Reading a green gate as claim honesty is exactly the violation it names.
- **Not operative**:
  - *"An Evidence cell containing a plausible-looking path is green to the checker regardless of truth"*: a fact about the checker, which no implementation can violate.
  - *"For iOS and Android, 'command + result' evidence is trust-the-reported-result …"*: a fact about the environment.
  - **That second sentence is the closest call.** It reads almost like a classification rule. The binding form of that rule, however, lives in the claims-pass record's Method clause (`not re-verified — toolchain unavailable`), not here.
- **C(c1) consequence, summarised (carried to G1)**:
  - Under 5c, **neither** of C(c1)'s named units carries zero operative items. As instantiated, C(c1) does not test clause (a) (the domain restriction) on this charter.
  - Clause (a) is still exercised in G1 by exemplar F's `#purpose` (0 items), provided Lina confirms it.
  - **A fork, not mine to pick here**:
    - (i) re-instantiate C(c1) on a unit with genuinely zero items before G1 runs. A quick look at this charter's preambles found every candidate carrying a trigger or an instruction.
    - (ii) G1's record states that C(c1)'s premise is false on its named units, and names F's `#purpose` as the only unit exercising clause (a).
  - Either way, **this is an instantiation finding, not a BREAKS of the definition**: no false finding follows from either unit.

## `#what-parity-means`

confirmer: stacy
canonicalHash: sha256:51334f67aede639a78d8b5ae5e15b2672a07f69ca0d7e9977fdfe083f9ea43a2
items: parity-not-identical, parity-information-architecture, parity-interaction-model, parity-accessibility-guarantees, parity-source-semantic-tokens, parity-divergence-documented, parity-platform-native-expression
date: 2026-09-27

**Ruling: CONFIRMED at 7 items.**
- These are the six members, which are operative under 5c, plus the negative clause. A review that flags token-string differences as drift violates *"Parity does NOT mean … identical token strings."* This matches my own S3-A3 correction.
- **Text corrected**: `parity-not-identical` no longer ends with *"It means:"*, which introduces the list and is not operative.
- **Not operative**: the closing SwiftUI/Compose/Web Component sentence, which is an illustration.

## `#identity`

confirmer: stacy
canonicalHash: sha256:43defd686fc5d68ce4f4d13231c8b98631b1292cdf2135f489299b751d856700
items: stacy-role, stacy-deliver-promises, stacy-claims-both-tiers, stacy-domain, stacy-tone, stacy-build-systems, stacy-hold-the-line, stacy-collaborators, stacy-route-via-thurgood, stacy-human-decides, stacy-partner
date: 2026-09-29

**Ruling: CORRECTED 7 → 11.**
- Added `stacy-tone` and `stacy-build-systems`: norms of conduct that a consumer implementation can act against (5c).
- Added `stacy-collaborators`, the named agents she works with and her system-side counterpart. These are names the implementation routes against (the "can contradict" reading).
- Added `stacy-route-via-thurgood`: the other system agents are reached through Thurgood's triage.
- **Not operative**: the namesake narrative (orientation), the inward/outward framing (its operative form is `thurgood-3` in `#with-thurgood-system-counterpart`), and the product-side-history sentence.

## `#in-scope`

confirmer: stacy
canonicalHash: sha256:c5c798aafe80cf38d78e3023987450a2dae382e5f1a46effc4f10fe99df45579
items: scope-1, scope-2, scope-3, scope-4, scope-5, scope-6, scope-7, scope-8, scope-9, scope-10
date: 2026-09-29

**Ruling: CONFIRMED at 10, as drafted.**

## `#out-of-scope`

confirmer: stacy
canonicalHash: sha256:be1ba8ba9bf4d3c3c2ff657fc3b6aabf428cd21aff585d49d44b0268b058f4ab
items: out-1, out-2, out-3, out-4, out-5, out-6, out-7
date: 2026-09-29

**Ruling: CONFIRMED at 7, as drafted.**

## `#the-audit-vs-write-distinction`

confirmer: stacy
canonicalHash: sha256:03bbb1a5dbfc7e97d04e786d75c5c6094dffd58358ed6f6bebbc1c56e6a0533a
items: audit-not-write
date: 2026-09-29

**Ruling: CONFIRMED at 1, as drafted.** The Audit / Write / Fix pairs are illustrations. "This mirrors Thurgood's model exactly" is description.

## `#operational-mode-process-audit:preamble`

confirmer: stacy
canonicalHash: sha256:87470ed51c60c7908225d504f181d60b464fe7468c8fcebc2ac93f18a042ab4d
items: audit-when
date: 2026-09-29

**Ruling: CONFIRMED at 1, as drafted.**

## `#incremental-capture-rule`

confirmer: stacy
canonicalHash: sha256:175aa9e1663d5d611bd16ff862881edf0032ca490c8a19557f2f2f73ca1120e6
items: capture-immediately, capture-running-file, capture-both
date: 2026-09-29

**Ruling: CONFIRMED at 3, as drafted.** "If the session ends prematurely, the partial capture survives" is rationale. **Referent scan**: `capture-both` ("This applies …") is left as drafted. Widening it to carry its referent would contain `capture-immediately` and `capture-running-file`, and the occurrence assignment cannot credit overlapping items. Its referent is this unit's own rule, and 5e reads within the unit's rendering.

## `#audit-output`

confirmer: stacy
canonicalHash: sha256:d2ae19342bd9c4ef627b2ea242693848e83cd66daae905655ed640441cbecb74
items: output-severity, severity-1, severity-2, severity-3, severity-4
date: 2026-09-29

**Ruling: CONFIRMED at 5, as drafted.**

## `#audit-is-analysis-not-implementation`

confirmer: stacy
canonicalHash: sha256:2be345314a2c476ea7473791f278f3086aa4f2bc1f688e1d28236d68aa52a1b7
items: analysis-not-fix, route-1, route-2, route-3
date: 2026-09-29

**Ruling: CONFIRMED at 4, as drafted.**

## `#operational-mode-claims-audit-execution-claims-verification-the-q5-cut:preamble`

confirmer: stacy
canonicalHash: sha256:b9f4104614bde7bf3dcf7fc95a316fa126266e2816cc636ddabc2a555d94ffb1
items: authority-precedence
date: 2026-09-29

**Ruling: CORRECTED 0 → 1.** Added `authority-precedence`: where this text and the co-signed agreement and amendment disagree, they govern. That is a precedence rule a consumer implementation can violate. The ballot citation and "Applied to this charter by Spec 127 U3" are history. The drafted zero was declared, but it was wrong.

## `#the-claims-pass-record-claims-passmd-the-template`

confirmer: stacy
canonicalHash: sha256:e34637d77b83861846c927149c655b3386d9d096bfb6df79daec934f137df423
items: record-committed, closeout-path, midpoint-path, section-scope, section-findings, section-method, method-honesty, closed-negative-string, mandatory-line, counting-1, counting-2, counting-3, counting-4, counting-5, counting-6, counting-7, counting-8, counting-9, counting-9b-census, counting-10-buckets, counting-10-ncc-rate, counting-10-assent-refusal, counting-10-spot-check, counting-10-full-survival, counting-11, counting-11b-governance-examples, counting-12, report-set-comparison, emission-reading, delegated-tier-read, deferral-walk-back, instruments-read, governance-edit-kind-read, delegate-audit-pointer, instrument-census-read, never-a-gate
date: 2026-10-29

**Re-confirmed 2026-10-29 (Req 11.6.5d).**
- **What changed**: one bullet, "The governance-edit-kind read" (canonical L432). Ballot `.kiro/docs/ballots/2026-10-26-release-flow-batch-16-1.md` (RATIFIED, Peter, 2026-10-26/27) site 13, under F-40d (charter), inserts the `**Sweep**:` read: on a PR carrying a CORRECTION line, the sweep lines' presence, grammar and command re-run, the `left:` records' resolution and Trigger line, and the `0 hits` rate. Judgment stays judgment, read by sample, and the pointer is "*(added 2026-10-29 … RS-40)*". Thurgood applied it at `ae6a84d77` and re-quoted item `governance-edit-kind-read` at `a620ff970` (authoring).
- **Byte-identity, checked**: the resolved site-13 After, with `<application date>` → `2026-10-29`, occurs once in the charter. `governance-edit-kind-read` equals that bullet less its list marker, byte for byte (2,036 characters), and occurs once. All 36 items are verbatim substrings, in document order (checked by script).
- **Item grain**: still one `obligation`. The sweep read sits inside the same bullet, is read at the same surface (the PR body's lines against the merge's diff) and is scoped by the same tail ("Observation, not a guard — never a gate"), so it is not split out.
- **What did not change**: the operative set, still 36 items. The canonicalHash moves from `sha256:f6d74d3343f268919882d4c7011091ef7774f9784e67fddfbb53a428e5f9a280` to the value above. `operative-set-freshness` printed it at `4428ec6e7`, and I recomputed it independently with `partition` + `regrounding/hash.ts` (body lines 161–182). The two agree and equal the overlay pin.
- **Consumer rendering**: unchanged. The bullet is dropped for consumers by its head, in the `subtraction-3` removal of the read bullets' labels ("… **The governance-edit-kind read**; …"). The sweep read audits DesignerPunk's own `**Sweep**:` lines (`.kiro/docs/ballots/README.md`), which a consumer does not have.
- **Read before this act**: the canonical unit, `canonical/agents/stacy.md` L415–L436, read through a tool call (`sed -n`) at `039090923` before this commit.

**Ruling: CONFIRMED at 36 items.**

**Re-confirmed 2026-10-27 (prior record, superseded)**: canonicalHash `sha256:f6d74d3343f268919882d4c7011091ef7774f9784e67fddfbb53a428e5f9a280`, 36 items, as below. *(Its act, `82faa95b1`, reads FAIL 7 on `--audit`: no tool read of the unit preceded it. Peter let that stand, 2026-10-29; `.kiro/issues/2026-10-26-signing-chain-audit-false-verdicts.md`.)*

**Re-confirmed 2026-10-27 (Req 11.6.5d).**
- **What changed**: one insertion inside "The counting block, in full", between "**populations**" and "**M3 / M4 / M5**": "**the governance-examples read**", my text from ballot `.kiro/docs/ballots/2026-10-26-governance-examples-guard-adoption.md` § 3 site 2 (RATIFIED, Peter, 2026-10-26; Status read at `bad7222ef`). Thurgood applied it byte for byte to the charter at `6a29412fe` and as item `counting-11b-governance-examples` at `c1fd0e06e` (authoring); this act moves only the canonicalHash.
- **The new item's text, verified verbatim**: it occurs once in the unit (1,323 characters) and is a substring of my site-2 After text. The charter equals `bad7222ef` plus the five ratified replacements of sites 1, 2 and 2b, byte for byte (the trigger-set re-confirmation above). All 36 items are verbatim substrings occurring once, in document order (checked by script).
- **Item grain and span (my judgement on Thurgood's reading: agreed)**: one `member`, like its neighbours in the counting block, placed in document order between `counting-11` and `counting-12`. The span runs from `**the governance-examples read**` through "— observation, never a gate". It leaves out the preceding "never a gate; ", which closes `counting-11` (whose text ends "never a gate"), and the following "; and ", the list's joiner before `counting-12`. That is the grain every counting item already has. The read's parts (adoption at S, the report line, P against the header and the prior S, opt-outs and K, the marker spot-check and its fraction, the census versions, each `home` open with a trigger, the delta's ARMING `pending.json` reads) are one read at one surface, RELEASE phase 1, and its tail scopes it, so it is not split.
- **What did not change**: the other 35 items, each still a verbatim substring of the unit. The canonicalHash moves from `sha256:006d7a0b20b48f56a4769ba2d44042284270b2a9bd7e620b4c79cfd2cc247b74` to the value above, as `operative-set-freshness` printed it at `848594a81` and as I recomputed it independently from `partition` + `regrounding/hash.ts` (body lines 161–182); the two agree and equal the overlay pin.
- **Consumer rendering (my decision, stated for the disposition)**: the new item is not kept for consumers. It reads DesignerPunk's own instrument (`scripts/governance-examples/check.ts`, `pending.json`, register row `governance-examples`, the issues root, Ada's sweep record), which a consumer repo does not have. The `subtraction-3` removal of the counting block's labels gains "; **the governance-examples read**", between "**populations**" and "**M3 / M4 / M5**" (`subtraction-3`: our stewardship instruments as obligations). That is the citation the labels beside it already carry, and it applies: the item names `scripts/governance-examples/`. The overlay body is unchanged and the rendered hash is unchanged (recomputed).

**Ruling: CONFIRMED at 36 items.**

**Re-confirmed 2026-10-19, second this date (prior record, superseded)**: canonicalHash `sha256:006d7a0b20b48f56a4769ba2d44042284270b2a9bd7e620b4c79cfd2cc247b74`, 35 items, as below.

**Re-confirmed 2026-10-19, second this date (Req 11.6.5d).**
- **What changed**: two insertions, both my text from ballot `.kiro/docs/ballots/2026-10-19-instrument-census-at-draft.md` (site 3; RATIFIED, Peter, 2026-10-19). (1) A new bullet, "The instrument-census read", between "The delegate-audit pointer" and "The never-a-gate sentence" in the list "Plus, on every pass:". (2) A new entry, "**instrument census**", inside "The counting block, in full", between "**orchestrator consult line**" and "**re-grounding dispositions**". Thurgood applied both byte for byte to the charter and as items `instrument-census-read` and `counting-9b-census` (`cd6ee604c`); that is his authoring, not this act.
- **The two new items' texts, verified verbatim**: each occurs once in the unit, in list order, and equals the inserted charter text; each insertion occurs verbatim in my site-3 text. All 35 items are verbatim substrings occurring once, in document order (checked by script).
- **Item grain**: `instrument-census-read` is one `obligation`, not split. The `**Census**:` line's presence and grammar, the in-scope call, the exemption ground, the digest reproduction at the line's `<sha>`, the `classification-map` `census`-field comparison and the routing of a disputed exemption are one read at one surface (the ballot's one Census line), and its tail ("A read, never a gate") scopes it. `counting-9b-census` is one `member`, like its neighbours in the counting block, placed in document order.
- **What did not change**: the other 33 items, each still a verbatim substring of the unit. The canonicalHash moves from `sha256:11c50738271b1e8436109a51b12d12a8f2b19463d04dfdeb805b6bd69570c5e9` to the value above, as `operative-set-freshness` printed it and as I recomputed it independently from `partition` + `regrounding/hash.ts` (the two agree).
- **Consumer rendering (my decision, stated for the disposition)**: neither new item is kept for consumers. Both operate on DesignerPunk's own ballots (`.kiro/docs/ballots/**` and the `census` field of `governance/classification-map.md`); consumers of the package run no ballots and have no instrument census to read or count. This is the principle applied to the delegate-audit pointer: consumers do not carry DesignerPunk-internal governance duties. Pin only; the overlay body is unchanged and the rendered hash is expected unchanged. Two removals widen, both cited `subtraction-3`: (a) the read-bullets removal gains "; **The instrument-census read**" after "**The delegate-audit pointer**"; (b) the counting-block removal gains "**instrument census**" between "**orchestrator consult line**" and "**re-grounding dispositions**". Neither item is credited: `assent.surviving` is unchanged, so 18 of 35 items survive. The pin and the re-sign follow in later turns.

**Ruling: CONFIRMED at 35 items.**

**Confirmed 2026-10-19 (earlier same-day record, superseded)**: canonicalHash `sha256:11c50738271b1e8436109a51b12d12a8f2b19463d04dfdeb805b6bd69570c5e9`, 33 items, as below.

**Re-confirmed 2026-10-19 (Req 11.6.5d).**
- **What changed**: one bullet, "The delegate-audit pointer", inserted between "The governance-edit-kind read" and "The never-a-gate sentence" in the list "Plus, on every pass:". It is my text from ballot `2026-10-18-sitting-2-subtask-tests-tasks-sweep-criteria-form` S5 (RATIFIED, Peter, 2026-10-18/19). Thurgood applied it byte for byte to the charter (`canonical/agents/stacy.md`, cmp-identical to my patched file) and as item `delegate-audit-pointer` at `47afb433c`; that is his authoring, not this act.
- **`delegate-audit-pointer`'s text, verified verbatim**: it occurs once in the unit and equals the inserted charter line.
- **Item grain**: one `obligation`, not split. The `<k> / <N>` line, the N-from-signature-history rule, the straight-to-Peter routing of a `FAIL` or `anomaly`, and the separate Peter-sample line are one pointer duty read at one surface (the record's delegate-audit line).
- **What did not change**: the other 32 items, each still a verbatim substring of the unit. The canonicalHash moves from `sha256:29f67487340c5c5a970f454430b234269a73503f5caec77340985c065e109a33` to the value above, as `operative-set-freshness` printed it and as recomputed with `partition` + `regrounding/hash.ts`.
- **Consumer rendering (my decision, stated for the disposition)**: pin only; the overlay body is unchanged and the rendered hash is expected unchanged. The `subtraction-3` removal (the four read bullets) gains "; **The delegate-audit pointer**": consumers run no signing chain and have no delegate seats. `assent.surviving` is unchanged, so 18 of 33 items survive. The pin and the re-sign follow in later turns.

**Ruling: CONFIRMED at 33 items.**

**Confirmed 2026-10-18 (prior record, superseded)**: canonicalHash `sha256:29f67487340c5c5a970f454430b234269a73503f5caec77340985c065e109a33`, 32 items, as below.

**Re-confirmed 2026-10-18 (Req 11.6.5d).**
- **What changed**: one bullet, "The governance-edit-kind read", inserted between "The instruments read" and "The never-a-gate sentence" in the list "Plus, on every pass:". It is my text from ballot `.kiro/docs/ballots/2026-10-18-governance-edit-kinds.md` § 3b (RATIFIED, Peter, 2026-10-18), including my CORRECTION clause "…or whose only referent is governance text or enforcement code changed in the same PR (the ballot's § 2 list)". Under six-roots errata (f), Thurgood applied it byte for byte to the charter and as item `governance-edit-kind-read` (`a0e25936c`); that is his authoring, not this act.
- **`governance-edit-kind-read`'s text, verified verbatim**: it equals the ballot's § 3b quoted text byte for byte (1,290 characters; the ruled L62 text, not the superseded R1 draft at L149) and occurs once in the unit.
- **Item grain**: one `obligation`, as the instruments read is. Its missing / no-authority count and its rot-mode count read one surface (the `**Edit kind**:` lines against the merge's diff) and are not split out.
- **What did not change**: the other 31 items, each still a verbatim substring of the unit. The canonicalHash moves from `sha256:8103d28ef4a140c355a2c82c2395c492fceb1b48c46a87b24f49b6713fb38ac7` to the value above, as `operative-set-freshness` printed it and as recomputed with `partition` + `regrounding/hash.ts`.

**Ruling: CONFIRMED at 32 items.**

**Confirmed 2026-09-29 (prior record, superseded)**: canonicalHash `sha256:8103d28ef4a140c355a2c82c2395c492fceb1b48c46a87b24f49b6713fb38ac7`, 31 items, as below.

**Ruling: CORRECTED 27 → 31. Recorded and confirmed against the post-13.8 + post-#239 text.** The canonicalHash above is `sha256:8103d28e…38ac7`, which I verified equal to the hash of the current unit. The text includes B-U2's counting-block edit (13.8) and the instruments-read bullet (#239, merged at `c34ee564`). **No A4 re-confirmation is owed later on #239's account.**
- **Split**: `counting-10` bundled five separately violable metrics into one item, so a rendering keeping four of the five could not be credited for any. It is replaced by `counting-10-buckets`, `counting-10-ncc-rate`, `counting-10-assent-refusal` (they share the from-history clause, so they stay one item), `counting-10-spot-check` and `counting-10-full-survival`.
- **Widened**: `never-a-gate` now carries its bold lead-in, *"The never-a-gate sentence, restated wherever the practice is documented"*. The restating duty is itself operative, and the draft kept only the quoted sentence.
- **Not an item**: the `<!-- volatile-ok: … -->` marker is a lint annotation with repo-bound text. The consumer overlay drops it.
- **Not operative**: the midpoint-collision rationale, the product-tier load-bearing remark and the quoted N6 line.

## `#the-mirror-anti-rot-clause-verbatim-at-countersigned-strength`

confirmer: stacy
canonicalHash: sha256:c460743c0430e9fa04163a6d13a0d880ce59bb401480896fd12d7d70445171f3
items: mirror-clause, mirror-called-at-exchange, mirror-binds-lens
date: 2026-09-29

**Ruling: CONFIRMED at 3, as drafted.** "Thurgood should call it out as such" binds his seat: no implementation of this seat can act against it. The symmetry sentence describes his clause. **Referent scan**: `mirror-binds-lens` ("It binds …") is left as drafted, for the same containment reason as `capture-both`: widening it would contain `mirror-called-at-exchange`. Its referent is the unit's own clause.

## `#the-steward-verb-carve-out-his-side-of-the-seam-enumerated-never-a-live-config-reference`

confirmer: stacy
canonicalHash: sha256:5ee037e6fcbfad1bfb0b13161645ec5942657afd355a34ed6a9cc65d8fa3577a
items: carve-out-scope, carve-out-falsification, carve-out-no-silent-rescope, carve-out-routing-test, carve-out-tiebreak
date: 2026-09-29

**Ruling: CORRECTED 4 → 5.** Added `carve-out-no-silent-rescope`: if the verbs change, the carve-out is re-argued, not silently re-scoped. Silent re-scoping violates it. "The anti-rot pair above" points to the mirror unit and is not a separate item.

## `#operational-mode-parity-review:preamble`

confirmer: stacy
canonicalHash: sha256:77c3468b344869f176902ff6f5dc12abc97a9500e25527a0752c51a1560e71a1
items: parity-when, parity-dormant
date: 2026-09-29

**Ruling: CONFIRMED at 2, as drafted.**

## `#review-process`

confirmer: stacy
canonicalHash: sha256:015cc9f65020a3524feb8dedcdf4dc2d64ef609ceff801037d82b09a42f195e6
items: parity-1, parity-2, parity-3, parity-4, parity-5, parity-6
date: 2026-09-29

**Ruling: CONFIRMED at 6, as drafted.**

## `#operational-mode-lessons-synthesis-review:preamble`

confirmer: stacy
canonicalHash: sha256:783778832b4eea537c8d5980b8e5e2e40b4f08996b7c735fc8b23472d80c9ffe
items: synthesis-lead, synthesis-handoff-protocol
date: 2026-09-29

**Ruling: CORRECTED 1 → 2.** Added `synthesis-handoff-protocol`: the review's structure, triggers and template come from the Product Handoff Protocol. That is a route the implementation builds against, so it is operative under the narrowed 5c reading. "The forcing function" sentence is rationale.

## `#your-role`

confirmer: stacy
canonicalHash: sha256:b48ed925de0d75bad9fb8f62563b35ff500e393402e815e79bea67c85dc5e7c5
items: role-1, role-2, role-3, role-4, role-5, role-6, role-7
date: 2026-09-29

**Ruling: CONFIRMED at 7, as drafted.**

## `#what-you-dont-do`

confirmer: stacy
canonicalHash: sha256:7f0f4de7aab0d9183809ae4a9c6cb875d3651c04461ca28090f87688babccfd6
items: dont-1, dont-2, dont-3
date: 2026-09-29

**Ruling: CONFIRMED at 3, as drafted.**

## `#with-leonardo`

confirmer: stacy
canonicalHash: sha256:028c0b26f4dbfd9a1d842f986d7a0481f7ec5359d5ea1bd073603e0e4eafaab1
items: leonardo-1, leonardo-2, leonardo-3, leonardo-4, leonardo-5
date: 2026-09-29

**Ruling: CONFIRMED at 5, as drafted.**

## `#with-platform-agents-kenya-data-sparky`

confirmer: stacy
canonicalHash: sha256:8ae7cef2485a3fe5254ad84002f6613a3f0e06f96b86f3c954ad0e4dfb2982ea
items: platforms-1, platforms-2, platforms-3, platforms-4, platforms-5
date: 2026-09-29

**Ruling: CONFIRMED at 5, as drafted.**

## `#with-thurgood-system-counterpart`

confirmer: stacy
canonicalHash: sha256:e5aa54f1f1a72f07c1f25d602eac46a08c738839516f23bd779091715e35931c
items: thurgood-1, thurgood-2, thurgood-3, thurgood-4, thurgood-5
date: 2026-09-29

**Ruling: CONFIRMED at 5, as drafted.** Earlier in this run I removed `thurgood-4` as a statement of what Peter may do. I restored it under Thurgood's narrowed 5c reading: an implementation that refuses a joint consultation at the boundary acts against it.

## `#with-peter`

confirmer: stacy
canonicalHash: sha256:0c18fa9f023514cba761392331f1235750a385855b9601e56e3a2787b74b1f15
items: human-1, human-2, human-3, human-4
date: 2026-09-29

**Ruling: CONFIRMED at 4, as drafted.**

## `#mcp-practice-notes`

confirmer: stacy
canonicalHash: sha256:64c55f317e18e344f8b476a9c73a8aff44b2ac4bca321671c415d779b2fa26f3
items: mcp-roster, ground-truth-computed, standards-on-demand, product-mcp-caveat, mcp-fallback
date: 2026-09-29

**Ruling: CORRECTED 4 → 5.** Added `mcp-roster`: the three servers and what each serves are names the implementation queries against, which makes them operative under the narrowed reading. "Your routing section names the query tools" is orientation.

## `#collaboration-standards:preamble`

confirmer: stacy
canonicalHash: sha256:62c2b17e682f621eade4f4a07026fb0103a58e9d04cbc6fa763405e63d2c6ae0
items: apply-aicp
date: 2026-09-29

**Ruling: CONFIRMED at 1, as drafted.**

## `#counter-arguments-are-mandatory`

confirmer: stacy
canonicalHash: sha256:cdd13024b15a07644f07774d9cfe25f1f60a1bf9e38ddfd597a5708871378e2c
items: counter-provide, counter-fold-back
date: 2026-09-29

**Ruling: CONFIRMED at 2, as drafted.** The quoted parity-review example is an illustration.

## `#candid-over-comfortable`

confirmer: stacy
canonicalHash: sha256:cc87165148bdfc5a2d1faf5cb85a66e38affbf37efa6689947c37d7a200956fe
items: candid
date: 2026-09-29

**Ruling: CONFIRMED at 1, as drafted.**

## `#bias-self-monitoring`

confirmer: stacy
canonicalHash: sha256:c574e9a5866a449edcaa3cfcfc5fd8d2390ce8f30420097d3f29716dcfd6a614
items: bias-watch
date: 2026-09-29

**Ruling: CONFIRMED at 1, as drafted.**

## `#ask-if-unsure`

confirmer: stacy
canonicalHash: sha256:88270860692bc1f9fd962527d4132c79951301a4de895af5c3ef0e29bd279ff0
items: ask
date: 2026-09-29

**Ruling: CONFIRMED at 1, as drafted.**

## `#what-you-own`

confirmer: stacy
canonicalHash: sha256:206930931d15e1ddac909f181379a4891ac9a9c5680a34cb17ea8397221314f6
items: own-1, own-2, own-3, own-4
date: 2026-09-29

**Ruling: CONFIRMED at 4, as drafted.**

## `#what-you-dont-own`

confirmer: stacy
canonicalHash: sha256:4108acaf8110eaee5e9ea615b318c75057946bf2fec0bf903da6d49b9aa6dcab
items: not-own-1, not-own-2, not-own-3, jest-not-vitest
date: 2026-09-29

**Ruling: CONFIRMED at 4, as drafted.** The Commands-section pointer is a reference, not an item.

## Confirmation run summary (2026-09-29, run 1)

**Scope**: Task 15.5 phase one, run 1: `stacy.yaml`, the 29 units without a note (owner seat), and `thurgood.yaml`, all 47 units (C1 counterpart seat, because the owner is the profile author). The identity docs are run 2.

**Commits** (three):
- `bfa80eba`: stacy, first pass.
- `5815a167`: thurgood, first pass.
- the commit that carries this section: both records re-read under the classifier owner's narrowed 5c ruling and his referent scan (both received mid-run). It also re-checks my six 11.2 units.

**Criterion**: 5c as narrowed on 2026-09-29, the "can contradict" reading. Stated facts about a name, path, type shape or spelling the implementation builds against are operative. Repo-specificity is a signing question, never an exclusion. This narrows my 11.2 wording ("statements about another instrument's behavior are not operative") to "… that the implementation does not build against".

**Units confirmed**:
- **`stacy.yaml`**: 29 new units (35 of 35 now have notes), plus one of the six 11.2 units amended.
  - The counting-block unit was confirmed first, against the post-13.8 + post-#239 text (`sha256:8103d28e…38ac7`, verified fresh). No A4 re-confirmation is owed on #239's account.
- **`thurgood.yaml`**: 47 of 47.

**Items added and removed, by key** (net):
- `stacy.yaml`, record total 210:
  - `#identity` +`stacy-tone`, +`stacy-build-systems`, +`stacy-collaborators`, +`stacy-route-via-thurgood` (7 → 11);
  - claims-audit `:preamble` +`authority-precedence` (0 → 1);
  - `#the-claims-pass-record-…` −`counting-10`, then +`counting-10-buckets`, +`counting-10-ncc-rate`, +`counting-10-assent-refusal`, +`counting-10-spot-check`, +`counting-10-full-survival`; `never-a-gate` widened (27 → 31);
  - steward-verb carve-out +`carve-out-no-silent-rescope` (4 → 5);
  - lessons-synthesis `:preamble` +`synthesis-handoff-protocol` (1 → 2);
  - `#mcp-practice-notes` +`mcp-roster` (4 → 5);
  - `#honest-reach-…` +`reach-checker-greens-plausible`, +`reach-platform-trust` (2 → 4; an 11.2 unit, amended);
  - `#with-thurgood-system-counterpart` unchanged at 5. `thurgood-4` was removed in `bfa80eba` and restored here.
- `thurgood.yaml`, record total 171:
  - `#in-scope` −`scope-11`, then +`civitas-1` to `civitas-9` (12 → 20);
  - `#step-1-query-audit-methodology` +`audit-methodology-route` (0 → 1);
  - `#step-2-gather-evidence` +`evidence-dir-1` to `evidence-dir-4` (3 → 7);
  - `#trigger-types` +`instruments-named`, +`liveness-records-not-verdicts`, +`owed-set-three-copies`, +`owed-set-predicate`, +`owed-set-pipeline`, +`owed-set-exclusion-classes`, +`owed-set-promotion` (13 → 20);
  - `#the-three-boundary-bounds-…` +`framing-sentence` (4 → 5);
  - Q5 `:preamble` +`authority-precedence` (0 → 1);
  - `#mcp-practice-notes` +`prompts-not-indexed` (4 → 5).
  - Widened to carry a referent or a named fact: `thurgood-handoff`, `query-standards`, `cross-reference`, `register-read`, `caller-out`, `shared-layer-not-unilateral`, `monitor-exceptions`.

**Referent scan** (the classifier owner's candidates):
- **Widened**: `thurgood-handoff` and `shared-layer-not-unilateral`.
- **Left as drafted**: `capture-both`, `mirror-binds-lens`, `parity-platform-native-expression` (an 11.2 unit) and `practice-4`. In each case, widening to carry the referent would contain sibling items, and the occurrence assignment cannot credit overlapping items. Each one's referent is its own unit's rule or list, and 5e reads within the unit's rendering. **Residual**: a signer could credit one of these while its referent's siblings are gone. The floor still counts the siblings missing, so the unit routes.

**Units ruled zero (declared)**: `thurgood.yaml` `#domain-boundary-response-examples` (illustrations) and `#fallibility` (orientation; its operative content is `correction-2`). `stacy.yaml` has none. Both of its drafted zeros that this run touched were wrong.

**Drafts that were materially wrong, and why**:
1. **`thurgood.yaml` `scope-11` credited a group label**, "**Civitas infrastructure stewardship:**". Under clause (c) a label retains nothing. As drafted, a rendering could drop all nine stewardship duties and still be credited.
2. **`thurgood.yaml` `#trigger-types` left out what LIVENESS runs, and its bound.** It carried the three reads but not the read-for-records bound, and not the owed-set predicate, pipeline, classes or ladder that the reads run.
3. **`stacy.yaml` `counting-10` bundled five separately violable metrics into one item**, which made the assent read all-or-nothing.
4. **Both Q5 preambles were declared zero**, but each carries a precedence rule: the co-signed documents govern on disagreement.
5. **Under the narrowed ruling, `thurgood.yaml` `#step-2-gather-evidence` and `#step-1-query-audit-methodology`** left out paths and a methodology name the implementation builds against. I made the same error myself in `bfa80eba`/`5815a167` for `evidence-dir-*`, before the ruling reached me.

**The 11.2 re-check (six units)**:
- Five are unchanged: `#audit-checklist`, `#the-charter-cut-ratified-verbatim`, `#the-trigger-set-…`, `#the-owed-set-pipeline-…` and `#what-parity-means`.
- **`#honest-reach-…` is amended 2 → 4**, against the owner's expectation of no change. Its two "facts about the checker / environment" are facts this seat's verifier builds against. The 2026-09-27 ruling itself called the second "the closest call".

**Checks**:
- `triviality.records.test.ts` over the edited live records: `Tests: 666 passed, 666 total`.
- The freshness sweep, run from this worktree: 0 `confirmation` findings for `stacy.yaml` and `thurgood.yaml` (the report cites the run). The other records still have findings, as expected.
- The full `tools/agent-generator` jest config: 25 suites passed; 27 suites failed to run, because the TypeScript compile cannot find `../../mcp-server/dist/index`, which this worktree does not have. No test assertion failed (`Tests: 1057 passed`).

**Residuals**:
- **Self-confirmation, disclosed.** Under C1 I confirm my own charter as its owner, and I confirm Thurgood's as the counterpart seat. His charter includes units that describe my seat (the charter cut, the caller-out duty, the three bounds), so on those I am a party to what I confirmed. *Not independently re-verified. Confirmed by the auditing seat.*
- **Judgment calls another confirmer could rule differently**:
  - the two conduct items in `stacy.yaml` `#identity`;
  - `thurgood-4` restored;
  - `#fallibility` ruled zero;
  - the four referent items left unwidened.
- **`owed-set-pipeline` is one large command item.** Any byte change to the pipeline in a rendering routes the unit. That is conservative, and it adds volume at signing.
- **Routing volume**: the corrected units' item counts rose, so their floor denominators rose too. Some renderings that cleared against the draft may now route at phase two.
- **The hash sheet** `first-render/drafting/sheets/stacy.md` still lists the drafted ids (for example `counting-10` and `scope-11`). It is a read-only snapshot, so I did not edit it. The records are the truth.
