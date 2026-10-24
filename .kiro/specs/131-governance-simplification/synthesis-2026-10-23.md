# Governance Simplification — Joint Synthesis (working draft v4)

**Status**: WORKING DRAFT — uncommitted, not a ballot, not law. Peter has ruled nothing.
**Date**: 2026-10-23
**Assembled by**: the orchestrator, from consults with Thurgood, Stacy, Lina, Ada and Leonardo; one cross-read; a charter-free outside reader; an accuracy check; and round A, in which all five seats annotated the whole of v3.
**Next**: the outside reader checks v4 for smoothed-over forks; then Peter reads and gives his view; then each seat responds once to his view.

**What changed from v3**: F24 corrected (a real consumer existed and stopped 2026-06-15); new facts F25–F31; §0 thesis amended (checks catch known classes, use finds new ones); P1–P6 tightened; P10 added (restore real use); L3, L5, L6, L7, L8 closed; §4 converged on a shape. **v4.1** applies the final outside read: F16 corrected for the open release PRs (#450–#452), a §5 item 0 on how 16.1.0 ships, P1's freshness gap and write-scope objection stated, L1 split, a counter-position added to §4, and law changes moved into §5.

## Read this first

Since September almost all the work has been governance; product code is net zero. Real use stopped in June. Every defect that mattered was found by a compiler, a source read or a person using the product — never by a signature or a claims pass. Today native output doesn't compile and readiness claims say otherwise. Four decisions come first: **(1)** how 16.1.0 ships — the three open PRs (#450–#452) and their forks, plus an honest "native doesn't compile" note; **(2)** whether to suspend the signing, grant and census layers now, knowing your merge has already missed one seat editing its own charter; **(3)** fund a native compile lane and a consumer build with a named owner, and revive test01 or adopt a standing consumer; **(4)** how much the agents may delete without you. Everything else can follow one release later, and each piece is still yours to ratify.

**Weight of this document**: every "agreed" and "converged" below is agreement among one model family in six prompts — the low-independence evidence §0 warns about. The evidence that counts is the facts verified by command in §1.

---

## 0. Why this exists

**Peter's concern (2026-10-23)**: we built too many layers while closing the gap between what was said to be built and what was built. Simplify, not slash — keep the same accountability.

**Peter's aim, verbatim**: "I really want this project to be as self-governed and self-sustaining by the agents as possible; and many of these choices and directions to operate holistically, sustainably, thoroughly, and thoughtful have been in service of that aim."

**The accountability tests** every proposal is judged against:
- **A1** Claims match what shipped.
- **A2** Every rule and authority traces to Peter's recorded decision.
- **A3** Problems found get recorded and routed, not lost.
- **A4** A release is what it says it is.

**The working thesis, as amended in round A**:
1. Agent-on-agent attestation is correlated evidence. Every seat is the same model family with a different charter, tools and inputs. Different inputs (domain knowledge, a tool that runs something) give partial independence of evidence, not of judgment.
2. **Checks catch repeats of known defect classes**: compilers, browsers, registry bytes, ratchets, a fixture. They prove what they test — a compiler proves the code compiles, not that it is right (Ada).
3. **Use finds new defect classes**: test01's lessons, Leonardo's Settings study (G6), Sparky's and Lina's source reads (E1) (Leonardo).
4. Agents can govern themselves safely to the degree both are present. Today checks are partial and use has stopped (F24).

---

## 1. Settled facts

Verification key: **cmd** = run by command on 2026-10-23; **read** = read in the file; the name is who verified it.

| # | Fact | Verified by |
|---|---|---|
| F1 | Since 2026-09-01: 291 commits on main; 17 touched `src/components` or `src/tokens` (net ≈0 lines); ≈+158k / −9k lines in `.kiro/`, `governance/`, `canonical/`. The 7 claims-pass records alone are ≈80k words. | orchestrator (cmd), Stacy (read) |
| F2 | Ballots per month Jul–Oct 2026: 6, 4, 16, 21. 48 ballots ≈260k words. The August prune waves were followed by acceleration. | orchestrator (cmd) |
| F3 | Consumer signatures: 364, 0 refusals, 258 assent `surviving: []`, 144 are Stacy's (C1 routes Thurgood-owned rows to her). | Lina (cmd), orchestrator (cmd) |
| F4 | Peter's sample of Stacy-signed acts read 0/297 (MIDPOINT) then 0/309 (15.0.0 RELEASE) — never performed. | orchestrator (read, `claims-pass-release-15.0.0.md` L303) |
| F5 | `canonical/generated.lock` is a speed cache: `generate.ts` writes it; `diff-guard.ts` and `sweeps/noop-probe.ts` read it; a stale lock triggers a full regeneration, not a FAIL (`diff-guard.ts` L276–300). `agent-generator.yml` L188 skips work when the probe matches. | Thurgood (cmd), Lina (cmd), orchestrator (read) |
| F6 | `verify-signing-chain --ci` runs on every PR (`agent-generator.yml` triggers on all `pull_request`; the step runs before the no-op early exit). The freshness sweep runs **inside** `runGuard` on every guard run and FAILs on any finding (`diff-guard.ts` L266–270, imported L47) — switching off CI steps does not suspend it. | orchestrator (read), Lina (read) |
| F7 | No CI workflow compiles Swift or Kotlin. CI is 12 × `ubuntu-latest`, 0 macOS. The repo is **public** (GitHub API `visibility: public`). | orchestrator (cmd), Thurgood (cmd) |
| F8 | `dist/DesignTokens.ios.swift` fails `swiftc -parse`: 17 distinct errors on 11 lines (34 raw — Swift prints each twice), on 4 font-family lines and 7 WCAG `oklch(...)` lines. Typecheck: 197 distinct errors in DesignTokens, 29 in ComponentTokens (first measured by Kenya, harness charter L59/L68; reproduced by Ada). | Ada (cmd), Kenya (cmd); orchestrator reproduced the raw parse output |
| F9 | The repo has no Gradle. 13 of 39 component `.kt` files import `android.*` (harness charter L101). No local `kotlinc`/JDK (charter L80). | Data (read), outside reader (cmd); **not re-verified by the orchestrator** |
| F10 | Native "contract" tests are text-presence checks (e.g. `NavTabBarBase.ios.test.ts` asserts `toContain` on the Swift file). They are cited as contract evidence in Spec 050 (`task-4-parent-completion.md` L13, "27 contract tests") and Spec 049 completion docs; the readiness doc defines Basic Contracts as "Basic contract tests pass" (L94). They are not cited in the readiness tables or the application MCP source. Ada's `FormatProviders.test.ts:357` asserts `import UIKit` — a defect locked in by a text test, which will fail when the defect is fixed. | orchestrator (read), Thurgood (read), Lina (cmd), Ada (read) |
| F11 | Readiness, three disagreeing shipped answers: all 34 schemas and all 102 served entries say `reviewed: true`; the MCP serves web `production-ready` ×34 and native `scaffold` ×68 — native only because the test-file patterns (`ComponentIndexer.ts` L854–857) miss `*.ios.test.ts`; `Component-Readiness-Status.md` rates 32/34 🟡; `Component-Family-Button.md` marks Button-CTA, Button-Icon and Button-VerticalList-* "🟢 Production Ready". | orchestrator (cmd/read), Lina (cmd), Leonardo (cmd) |
| F12 | Record `2026-10-13-native-readiness-test-patterns-miss-repo-tests.md` plans to extend those patterns; landing it with `reviewed: true` flips native to production-ready on code nothing compiles. | Leonardo (read) |
| F13 | How the shipped defects were found: Swift font literals by **Kenya running `swiftc` ad hoc** (a compiler, not a pass); Kotlin output with no imports by **Data reading source**; web checkbox E1 by **Sparky's and Lina's source reads** — its runtime failure is marked REASONING, not confirmed in a browser. None by a claims pass. Spec 123 had three RELEASE passes (15.0.0, 15.1.0, 16.0.0) plus MIDPOINT and CLOSEOUT; the passes had no compiler or browser, so behaviour defects were outside what they could see. When E1 was introduced is not traced. | Stacy (read), Thurgood (cmd), Ada (read), Leonardo (read), orchestrator (read, record L8) |
| F14 | Stacy's passes caught real gaps in shipped packaging and text — R-2 (two registries, different bytes, 15.0.0), R-1, R-3, RL-11, RL-12, MP-5, MP-1 — by running things (registry bytes, pack listings, `git show`), and none in component or token behaviour. ≈7 of 37 findings touched shipped bytes (hand-classified). | Stacy (cmd/read) |
| F15 | `package.json` `files[]` ships all of `governance/` (84 docs; ≈51 are domain docs) plus 8 steering docs. Process law outweighs the Component-Family-* and Token-Family-* docs (≈63k words). | orchestrator (cmd), Leonardo (cmd), outside reader (cmd) |
| F16 | Open product records: 4 P0 + 6 P1, oldest 2026-06-24. **Release prep is running in parallel**: open PRs #450 (E1 checkbox form participation, browser-verified in Chromium, two forks for Peter incl. an E7 real-browser test-lane charter), #451 (theme claims corrected, P0; seats re-signed on it 2026-10-23) and #452 (schema token-name drift + consumer index truth; one fork), opened 2026-10-23 from 22:48Z. The other P0/P1s have no fixing PR. Four P1s are Ada's, routed to Spec 129; `2026-06-28-spec-094-…` carries `Trigger: release:next:phase-1` and fires at the 16.1.0 walk with no fix. E1 (Lina's P0) is due `release:next:phase-1`. While these are open, the next release ships known non-compiling native output. | Thurgood (cmd), Leonardo (cmd), Ada (read), Lina (read) |
| F17 | **A3 failed inside one seat**: three Swift defects Kenya reported to Ada in prose on 2026-10-20 (`shadowBlack100` unemitted, `fontWeight*` typed `UIFont.Weight = 100`, `radiusHalf: CGFloat = "Circle"`) had no record three days later, under a filing rule Ada is bound by. Ada found two more by inspection. | Ada (read), orchestrator (cmd: no records) |
| F18 | Token-Family docs ship native samples that don't compile against our output (e.g. `Token-Family-Accessibility.md` L322 → `.dp.dp`; `Token-Family-Layering.md` L139 names a nonexistent member). | Ada (cmd/read) |
| F19 | The signing code (`tools/agent-generator/regrounding/`) is 4,260 lines, imported by `derive.ts`, shipped in `dist/generator/**`; VALVE-1 is Spec 123 Req 11.5.6. Charters carry signing duties (Leonardo `canonical/agents/leonardo.md` L318 "Delegate signing audit"; Ada and Stacy likewise). | orchestrator (cmd/read), outside reader, Leonardo, Ada |
| F20 | The platform harness charter (`.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md`) is "CHARTERED — not scheduled" while ≈30 ballots landed. | orchestrator (read), Thurgood |
| F21 | ≈6 signing-shape ballots in 22 days; none arose from a finding that touched shipped bytes. | Lina (read) |
| F22 | The census rule's one real catch (S6: hand count 7, instrument 14; `2026-09-26-materiality-extractor-truncation.md`, counts under the L84 heading) was caught by a stop condition added at the census ballot's R2 (`2026-10-19-instrument-census-at-draft.md` L21). | Lina (read), Thurgood (read) |
| F23 | All four `.kiro/hooks/ada-*.kiro.hook` are user-triggered LLM prompts; none enforces anything. | Ada (read) |
| F24 | **Real use stopped 2026-06-15.** The only real consumer, `../test01`, pins `@3fn/core` 12.0.5; its last commit is 2026-06-15; its 7 lessons (2026-05-07 → 06-12) include "Verification Without a Rendered Page" — completion docs ticked against design intent, caught when the page rendered. No consumer tracks current releases; the only later use was Leonardo's disposable Settings study. Ballots accelerated after use stopped (F2) — correlation, not proven cause. | Leonardo (read), orchestrator (cmd) |
| F25 | A known defect crossed a release: the 7 WCAG `oklch(...)` parse failures were on record 2026-10-03; 16.0.0 shipped them 2026-10-16 with only a general "native not supported" disclosure. | Ada (read) |
| F26 | The repo has no browser test tooling — jsdom only, no Playwright or Puppeteer. jsdom cannot evaluate media queries and supports form association only partly. | Lina (read), orchestrator (cmd) |
| F27 | RL-11 (16.0.0) had to be caught **before the tag** (fixed at S1); `release-publish.ts` runs after tagging and covers only R-2's two-registry check. | Stacy (read) |
| F28 | The release falsity floor has had **zero firings**; its first is the 16.1.0 walk. The evidence for it is RL-11's catch, which predates the floor. | Stacy (read) |
| F29 | The claims passes carry a second growth engine: every pass records `Standards implications` (the EDUCATION route), and Thurgood repairs from it; the obligation-drain ballot was built directly from RS-13, RS-27 and RS-28. | Stacy (read) |
| F30 | The same finding class recurs four times — MP-2, MP-7, CL-3, RL-9 (out-of-scope or out-of-grant edits, all honest mistakes). MP-2 got through Peter-merged #262. | Stacy (read), Thurgood (read) |
| F31 | Seat conflicts, stated by the seats: Thurgood authored much of what P1 suspends, so retiring it lightens his seat; Stacy specified several layers she proposes to cut; Lina built the disposition modules the signatures sit on. | Thurgood, Stacy, Lina (self-reported) |

---

## 2. Agreed proposals

Agreement here means no seat objected after round A. Each carries what survives against it.

### Now

**P1 — Suspension record (Peter, dated), then chore PRs.**
Suspends, effective immediately:
- the signing chain: signatures, C1 routing, `verify-signing-chain` and its fixtures, routes floor, hold act, signing census, confirmation-hash freshness (operative-set item lists stay). Condition (Stacy): freshness goes only because P10b's recorded release read replaces it;
- edit-kind lines (keep "a LAW edit cites its ballot");
- the delegated-tier line and its verification;
- the Consulted-line presence count (consulting for domain knowledge stays);
- write-scope grants — the tasks-row grant **and** the issue-row grants (README rule 8), their ARMING reads and the grant-activation query (LIVENESS item 4), as one mechanism; keep only "a `.github/**` deletion is quoted in the PR body". The record names Peter's merge as the control (Ada, Thurgood);
- instrument census at draft → one sentence: "a count the instrument can compute is run, not hand-counted, before ratifying";
- subtask completion docs → a one-line adaptations entry in the parent completion doc (L6 closed).

The record names the identity-doc sites it touches: Task-Completion-Protocol's S-4 sentence ("a ticked subtask without its doc is a finding"), Agent-Directory's `**Consulted**:` line rule, and the charters' signing duties (F19), with prompts regenerated. Obligations are waived for the PRs that remove these.
The first PR is a **code change** as well as a CI change: `runGuard` stops calling the freshness sweep (F6), in Lina's scope with Thurgood consulted; and the signing step comes out of `agent-generator.yml`.
Pure deletions run now; rewrites wait one release (L8 closed).
*Survives*:
- It is a deliberate exception to record-first ratification. Peter's dated record satisfies A2, but the precedent is real.
- **The control it names has already failed on this class.** P1 makes Peter's merge the control for write scope, but MP-2 (a seat editing its own charter, `claims-pass-midpoint.md` L76) got through Peter-merged #262, and §2 "Kept" calls the merge authorization, not detection. L2 is therefore part of this decision, not separate from it.
- **A gap release.** Stacy's condition says freshness goes only because P10b replaces it, but P10b is "after one release". Suspending freshness now leaves at least 16.1.0 — the falsity floor's first firing (F28) — with neither. Either keep freshness until P10b runs, or Peter accepts the gap.
- **Timing against open PRs.** #450–#452 are being signed under the current regime; an "effective immediately" suspension lands mid-release (§5 item 0).

**P2 — Readiness truth.**
- Readiness becomes evidence per platform: `compiles: verified | unverified`, `contractEvidence: runtime | static-text | none`, `knownDefects: [record ids]` — `knownDefects` generated from a component field in issue records, never hand-listed (Leonardo). Web is overclaimed too (E1, E3).
- **Vehicle**: spec-lite in Lina's scope. It changes what the MCP serves (schema format doc, `ComponentIndexer.ts`, the `PlatformReadiness` type, all 34 schemas), so it may be a minor rather than a patch release (Lina).
- **Order**: after E1's fix (it changes the contract evidence P2 labels), and before or with the 10-13 pattern fix, whose open question is answered **no** — a `.ios.test.ts` Jest file is not a native test (F12).
- Token tier: no per-component field carries it; its state lives in a generated native-status line in the Integration Guide, from ratchet counts (Ada).
- Correct `Component-Family-Button.md`; label or strip Token-Family native samples (F18). Annotate — not rewrite — completion docs that count text-presence tests as contract evidence (F10). `FormatProviders.test.ts:357` is not annotated; it changes with P3's fix.
*Survives*: a public downgrade of claims already shipped; the schema field must first say what it means.

**P3 — Fixes and disclosure now.**
- Lina: **E1** (P0) is already in flight as #450, browser-verified in Chromium; its E7 real-browser test-lane fork overlaps P4's fixture — Peter rules them together. Then web forced-colors (W1) and `prefers-contrast` (W2). Browser verification is manual until a browser lane exists (F26).
- Ada: escape font-family quotes and fix the WCAG literal format (together they take `swiftc -parse` on the token file to zero); add the Kotlin `.dp` import (a compile fix). File her five unfiled defects (F17).
- The next release's notes state, under the falsity floor, that native output does not compile, naming the open records (F16, F25) — whatever Peter rules on the boundary (Thurgood, Ada).
*Survives*: the disclosure is itself a consumer-facing claim and must be true; and it hides a real fork — ship 16.1.0 with the disclosure, or hold it until the token file parses (§5 item 0).

**P4 — Native compile lane and consumer fixture.**
- Token tier first. Floor: `swiftc -parse` = 0 (after P3). Ratchet on token-tier **typecheck** distinct errors (197 + 29): "count must not rise" is required from day one; "count = 0" stays non-required until each tier is promoted (Ada). Count distinct diagnostics on the packed-install output. A path filter (generator and token paths) bounds macOS runtime; the repo is public, so cost is mostly concurrency and minutes (F7). Android is CI-only (F9).
- **Consumer fixture**: Leonardo's Settings screen, built every release against the **release candidate's packed tarball** (not a pinned version — test01's lesson): Playwright for web, `swiftc`/`xcodebuild` for iOS, a Gradle compile for Android. Stacy's RELEASE pass cites fixture results instead of reading prose. **Owner seat: unnamed** (Lina) — needs one.
*Survives*: checks prove what they test, not correctness (Ada); they catch repeats of known classes, not new ones (Leonardo, P10). And an instrument with no owner is the F20 pattern again — the harness charter sat unscheduled for the same reason.

### After one release under the reduced regime

**P5 — Remove the signing code.** Removal gate, not an afterthought: confirm consumer `sync`/`derive` and the consumer profile's per-section signatures don't break a consumer build when signatures are absent (Leonardo, Lina). Needs a Spec 123 requirement amendment (F19).

**P6 — Claims passes.**
- CLOSEOUT + RELEASE + SYMPTOM; MIDPOINT optional; ARMING reduced to "a PR that changes a required check or its fixtures gets a read at merge", git-decidable predicates scripted.
- Scope: consumer-facing claims; shipped notes, CHANGELOG and MCP contracts are never record-form. State plainly that without a compiler or browser, passes cannot see behaviour defects; P4 is what covers them (Thurgood).
- **The pack-diff against the last published tarball runs on the release PR, before the tag** (F27); the notes and CHANGELOG are read against it — the fixture runs no text (Stacy).
- Records under ≈3k words. Findings filed directly as issue records, with a one-line index per pass so the health check can verify them. Method-honesty clause kept.
- The EDUCATION route (F29): a finding's `Standards implications` defaults to deleting or narrowing a rule, not adding one (Stacy).
- Open detail: whether the falsity floor's per-row "Peter's dated answer" citation survives (Stacy flags a tension with §0).

**P7 — Shrink the law.** One short operating-rules doc (current text; ballots archived as history); register → a table (rule, check path, state, ballot); issues README → ≈5 rules plus a per-record word cap; spec tiers (issue / spec-lite / full); instruments block → an evidence-command column in tasks.md; parity → verbatim rows + status; charters rewritten around duties, with the standing six-roots scope moved into one OWNERS-style file rendered into the charters (Thurgood); tooling writes PR-body fields; health check script-first.

**P8 — Served corpus.** Move process law out of the shipped and served corpus. Domain docs, `Token-Governance.md` and `Product-Token-Governance.md` stay. Regenerate in-repo routes that point at moved docs. Replace the signed consumer always-set with a short consumer-authored one (Leonardo).

**P9 — Token governance.** Keep token-creation review via the PR gate — validators check mathematical fit, not whether a new semantic concept should exist (Ada). Narrow component-token approval to creation. Retire three of four Ada hooks (F23).

**P10 — Restore real use, and a sunset for everything kept.**
- **P10a — A standing consumer** that tracks current releases: test01 upgraded, or the P4 fixture used as a product. Leonardo's point: P1–P9 cut the result of missing use; none restores the input. A periodic use-driven consumer session gives partly independent evidence (it exercises the real tools), not independent judgment.
- **P10b — The release domain read** (L3 closed): CI prints the rendered paths that changed; only their owners read; each read records its referent and what it **found**, never bare assent; it sunsets after N releases with zero FOUND items.
- **P10c — Kept mechanisms get sunsets too**, including the owed-set script (Thurgood) — except required checks on shipped bytes (hermetic publish, release falsity floor, consumer guard), which catch rarely by design and never sunset for rarity (Lina).

### Kept, unchanged in kind
PR gate with Peter's merge (authorization, not detection); required CI including did-it-really-run floors; full-run diff-guard and the agent generator; hermetic publish; release falsity floor; method-honesty clause; forced-negative line; owed-set script (under P10c); "Open for Peter" merge hold; filing rule with owner + one-line trigger; record-first ratification (shortened); token index; coverage map; `adjudications.yaml`; cutover ledger frozen.

---

## 3. Disagreements

### Closed in round A
- **L3** domain read → P10b (Lina, Stacy, Thurgood, Leonardo converged on the outside reader's form).
- **L5** lock → measure one full regeneration, then delete the lock if the time is acceptable; a CI cache is the fallback (Lina withdrew "whoever regenerates writes the lock").
- **L6** subtask docs → one-line adaptations entry in the parent completion doc, checkable at a sha (Stacy, Thurgood conceded).
- **L7** vehicle → suspension record plus chore PRs (Thurgood conceded: an omnibus ballot owes the ceremony it retires).
- **L8** timing → pure deletions now; rewrites after one release.

### L1 — The growth rule (four parts; two are separate forks)
The seats proposed four parts. Parts 1 and 4 compose cleanly. **Parts 2 and 3 are separate forks** (final outside read): the word budget is itself a new mechanical check, added in a document arguing growth came from additions; and the freeze fires today on Ada's four P1s, which blocks Spec 129 work Peter already ranked first (priorities ruled 2026-10-18) — Ada's objection is not answered by the others.
1. **Admission** (Stacy, amended by Thurgood): a rule becomes law only on ≥2 instances, or one instance touching a consumer-facing claim about product behaviour.
2. **Ceiling** (outside reader; Thurgood concedes one-in-one-out to it): one CI word budget on law docs — the only mechanical part. Plus Thurgood's retained half: advice never raises a finding.
3. **Priority** (Lina): no new governance ballot while a P0/P1 product defect is older than N days with no fixing PR, unless Peter waives. Exempt: a ballot that only removes or narrows rules (Lina), and corrections that remove a false claim (Leonardo). "Fixing PR" = a PR that cites the record path and touches the owning code (Ada); that needs a record line naming its fixing PR, which doesn't exist yet. Fires today.
4. **The engines** (outside reader, orchestrator, Stacy): the class-option duty first tries deleting or narrowing an existing rule; governance-on-governance incidents get recorded, not legislated; the EDUCATION route defaults to delete/narrow (P6).
- *Survives*: a word budget alone would not have caught any defect on Ada's surface (Ada); the freeze is a scheduling rule and fires on four of Ada's P1s on day one.

### L2 — `Agent:`-trailer CI check (open)
Flags a commit whose `Agent: X` touches `canonical/agents/X.md`.
- *Thurgood, Stacy*: the realistic failure is honest error, not forgery (the signing ballot's own threat model); the class recurred four times (F30); MP-2 got through a Peter merge; if the merge is authorization, not detection, this is the only detector for a seat editing its own charter. Thurgood: optional under a growth freeze.
- *Outside reader*: the trailer is typed text any session can type — apparatus, not a truth check.
- *Fact (Lina)*: every `canonical/agents/**` edit is already Peter-merged under the governance carve-out; the check would only detect ahead of his merge.

### L4 — Peter's read (open)
- *Converged*: no read duty for Peter as law unless he commits to it (F4: never performed). Thurgood, Stacy, Ada and the outside reader agree.
- *Still open*: whether the fixture plus scripted pack-diff covers what a human read covers.
  - *Leonardo*: they check different things. A fixture checks only what it was built for; a sampled read of shipped claims can catch a claim nobody wrote a test for, such as E1's MCP contract sentence. If Peter commits, size it as Stacy suggests; if not, the fixture plus P10a's consumer session is next best.
  - *Stacy*: what an optional read would cover is narrow and real — release text against bytes (R-3, RL-12 kinds), ≈10–15 minutes.
  - *Ada*: on the token tier, the compile lane replaces any human read; the rest isn't hers to say.

---

## 4. Where self-governance stops

**Options as drafted in v3**:
- **(a)** Agents verify themselves through non-model checks; Peter ratifies all law and merges every PR.
- **(b)** As (a), plus agents retire or narrow process rules on their own, within a word budget and through sunsets. Peter ratifies identity-level law only.
- **(c)** As (b), plus a recorded delegation of merge-on-green for non-governance PRs, only after the compile lane and fixture exist.

**What the seats converged on — every view here is from an interested party**: the seats were asked how much autonomy the seats should have.
- **Now**: (a) for anything that adds law; **(b) with an asymmetry** for removal — agents may delete or narrow process rules on their own, under sunsets; any **addition** needs Peter (Stacy, Thurgood; Lina and Ada after P4 exists). Reason: the growth came from additions, and deletions are reversible under the PR gate.
- **Lines inside (b)**:
  - Retiring or weakening a CI check, a claims check, or any consumer-facing claim surface (MCP contracts, readiness, release notes) stays Peter's — removing a process rule can't make a shipped claim false, but removing a check can (Leonardo).
  - Required checks on shipped bytes never sunset for rarity (Lina).
  - Only rules whose own check proves them dead sunset automatically (Ada).
  - Token creation stays Peter-reviewed: no check measures whether a new semantic concept should exist (Ada).
- **(c)**: only after the compile lane and fixture have run N green releases on the packed output, with consumer-facing claim surfaces excluded (Leonardo, Thurgood, Ada). Stacy: under (c) her post-acceptance pass becomes the only judgment check on merged work, and she must never sit on the merge path.
- **Evidence against self-governance, from the seats themselves**: F17 — A3 failed inside one seat with no correlation problem involved; only a check would have caught it (Ada). F24 — without consumer pressure, agent work drifted toward governing itself (Leonardo).

**The counter-position no seat took** (final outside read): all five seats moved toward less Peter involvement right after reading his autonomy aim — the completion and confirmation bias AI-Collaboration-Principles warns about. No seat argued for more of Peter's judgment, though F13 says no agent pass found a behaviour defect. "Deletions are reversible" ignores F31: the seats would be deleting duties they carry. A stated alternative: **Peter samples deletions too** — agents may propose and merge removals, and Peter reads a sample of them each release. Note also that under (b) Peter's merge of a seat-authored deletion becomes de facto ratification, which Task-Completion-Protocol (§ "Completion State in the PR Flow", point 9) says a checks-only merge is not.

*Survives*: checks cover only what someone thought to check, and use has stopped. Every step toward (c) trades Peter's judgment for coverage that is only as good as its weakest lane — and today there is no lane for new defect classes except use.

**How Peter's aim changed the seats' earlier recommendations**:
- Thurgood: Peter's read → replaced by the fixture (L4); omnibus → suspension (L7); PR body → parent doc (L6).
- Stacy: Peter's sample is an option, not law; the EDUCATION route defaults to delete/narrow.
- Lina: the release read becomes found-items plus a sunset with no Peter step; the WIP freeze is computed by an agent-run script with Peter's waiver as the only human act; the claims page is generated from P2's fields and checked by the fixture, not read by Peter.
- Ada: strengthens "no rise" as required and the generated native-status line; token creation stays with Peter.
- Leonardo: the fixture becomes load-bearing; add a standing consumer that tracks releases (P10a).

---

## Rulings (Peter, recorded by the orchestrator as given)

- **Update 2026-10-24 (orchestrator, from `gh`)**: #451 and #452 MERGED (#452 with Button-CTA minWidth option (b)); #450 still OPEN on its two held questions; **#453 OPEN** (Lina, Android interim fix, P1) — adds a CHANGELOG `[Unreleased]` disclosure that the Android components and generated Android token files are "reference source, not compile-verified", and files a new P1 record for 52 more unit-type sites.
- **2026-10-24, vehicle and status (Peter)**: "If we were going to do this, I would want to do it in a spec and would consider this planning. Execution would begin after we follow spec development processes and I complete the series of open issues I'm resolving in the PRs that I've been keeping you aware of." Everything in this walkthrough is **planning input to a spec**, not a ruling to execute. No suspension record is issued outside the spec.
- **2026-10-24, item 1a — hypothetical, as planning input**: "in the hypothetical where we were going to do this, I would go with (i)" — the suspension scope as drafted in P1.
- **2026-10-24, item 0 scope (Peter: "Proceed as recommended")**: item 0 stops at 0a. Disclosure wording, Ada's parse fixes and #450's held questions belong to the release work, not this walkthrough. One input handed to the release work, not a ruling: the synthesis (P3) suggests an iOS "reference source, not compile-verified" disclosure matching #453's Android one.
- **2026-10-23, item 0a — regime for 16.1.0**: "(i) — current rules through the 16.1.0 tag". The suspension record (if issued under item 1) is written and dated now, effective at the 16.1.0 tag; nothing in flight (#450–#452, the release walk) changes regime.

## 5. Only Peter can decide

**First**
0. **How 16.1.0 ships**: under the current regime or the suspended one; before or after P3's fixes; with the "native doesn't compile" disclosure or held until the token file parses. The open forks on #450 (incl. E7, which overlaps P4) and #452 are ruled here, once, not twice.

**The four decisions**
1. The suspension record (P1) — including the freshness gap (keep freshness until P10b, or accept the gap) and whether the `Agent:`-trailer check (L2) comes with it, since P1's named control already missed MP-2.
2. The native compile lane and consumer fixture (P4) — and an **owner seat** for the fixture; and whether to restore a standing consumer (P10a: upgrade test01, or make the fixture a product).
3. The boundary (§4): the seats' shape — (b) with the asymmetry and its lines, (c) later — or the counter-position (Peter samples deletions too), or something else.
4. The growth rule (L1): accept parts 1 and 4; rule separately on the word budget (part 2) and the freeze (part 3), including whether the freeze exempts Spec 129 work; whether the class-option duty changes — his own stated preference is part of it.

**Also his, riding on the four or after one release**
5. The readiness change's vehicle and release (P2): spec-lite, minor or patch.
6. L4: whether he takes an optional per-release read of release text against bytes.
7. Law changes listed as "agreed" that still need his ratification: P5's Spec 123 requirement amendment; P6's claims-pass shape and the falsity floor's per-row citation; P7's rewrites (operating-rules doc, register, README, charters, OWNERS file); P8's corpus move; shortening record-first ratification.
8. The numbers left unset: N for the freeze; N for the P10b sunset; N green releases before (c); the word-budget size; what regeneration time counts as acceptable (L5).
9. Go on the remaining fixes now (P3: Ada's three fixes and five filings; Lina's W1/W2).
