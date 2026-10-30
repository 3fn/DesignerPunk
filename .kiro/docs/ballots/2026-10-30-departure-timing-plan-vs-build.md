# Ballot Measure: when a design departure is found decides who decides it — ask a human at planning; record, proceed and name it during development

**Date**: 2026-10-30
**Drafted by**: Thurgood (ballots steward; owner of the record this closes, `.kiro/issues/2026-10-19-decision-framework-consistency-after-tnd.md`, item 1's motion list). Lina wrote the framework text (her draft, `1a-peter-rule-lina.md`); I adapted it to the converged definitions, and the changes are listed under each site. Drafter's clock: 2026-10-30T15:16:25Z (`date -u`).
**Status**: **DRAFT**
**Peter's words** (chat, relayed by the orchestrator):
- **The rule**, received before 2026-10-30T15:05:25Z (the orchestrator's clock), verbatim: *"if it's caught in a planning stage, pause and ask a human. If it's discovered mid-development, record, proceed, and notify after."*
- **The confirmation**, received before 2026-10-30T15:15:17Z, verbatim: *"Confirm and review, please"*. He confirmed the measure in the form the orchestrator presented, with its converged definitions and its two recommendations.
- **The orchestrator's reading is flagged for overturn** (§ 6). It covers the boundary, the notify line, the `discoverable` field, "a human", the class clause, the token carve-out, and no brand-critical exception.
**Base**: `2c00cea49` (`origin/main` when this was cut). Every Before block below was cut from that SHA by `git show 2c00cea49:<path> | sed -n <L>p`, and is byte-exact.
**Required reviewer**: **Stacy**. Item 1 is her finding class (a design-axis choice routed two ways). The `**Departures**:` line is read in her existing claims pass, and she is the census reader.
**Reviewers**:
- **Lina**: the framework's owner and the author of its text.
- **Kenya**: iOS. Her seat implements against screen specs, so "found during development" is mostly hers.
- **Leonardo**: owner of the design philosophy by domain (Agent-Directory: visual direction). Site 2 edits `design-language/design-philosophy.yaml` § "The Native-Behavior Rule".
**Consulted**: Lina — her draft measure (L172–178 → two token bullets kept and a pointer to Q4; Q4's "No" split with definitions and the "already showed" sentence; L251 and L364 → "a human"); she accepts dropping the brand-critical bullet, with notify landing before acceptance; Kenya — <pending R1>; Leonardo — <pending R1>; Stacy — <pending R1>
**Class**: LAW. The text changes when governance requires a human's answer. Site 1e (the banner) is EXECUTION of the banner convention.
**Class option**: one clause in the design philosophy's Native-Behavior Rule (site 2), the source every screen and component read through the Application MCP. Each surface's rule then cites it, instead of restating timing in each list. It is the same shape as #535's product-token rule ("identified at screen specification … a need the spec missed is surfaced, never filled silently"). The cost is a second file in this ballot, with Leonardo consulted. **It is design-only**: a system token found mid-build still waits for human review (Core Goals, Token Governance § "Token Creation Governance"), and site 2 says so.
**Amends** (one application PR, Peter-merged):
- `governance/cross-platform-vs-platform-specific-decision-framework.md` (Lina's, served by the docs MCP, packed via `governance/` in `files[]`):
  - **site 1a**, Q4's "No" at L135–L136 (LAW);
  - **site 1b**, the motion pause list at L172–L178 (LAW);
  - **site 1c**, the token-mapping list's lead at L251, "a human" (LAW);
  - **site 1d**, the closing line at L364, "a human" (LAW);
  - **site 1e**, an audience banner after the H1 at L9 (EXECUTION, ballot `2026-10-13-123-b-u4-release-recipe` § "Banners"). It is owed because the dated pointers sites 1a–1d add contain "ballot", which matches banner predicate v1 (`scripts/audience-banner/predicate.ts`). That is RS-51's instance.
- `design-language/design-philosophy.yaml` L53, the Native-Behavior Rule's `constraint` (site 2, LAW). It is packed (`design-language/` in `files[]`) and served by the Application MCP's design-language tools (`application-mcp-server/src/index.ts` L799, L866). **No seat's `writeScope` names it** (a grep of all charters gives 0 hits), so this ballot's grant covers it. It is another instance for Spec 131's unowned-paths inbound (§ 5 step 6).
- `.kiro/issues/2026-10-19-decision-framework-consistency-after-tnd.md`: a dated outcome line for item 1's motion list (1a), at the application's merge. That record is mine. Lina resolves items 2 and 3, and the token-mapping list (1b), in her CORRECTION PR.
- **Not edited**: Stacy's charter. The `**Departures**:` line is read in her existing claims pass (§ 3 site 1a, "Why"; § 7 S1). Token Governance, which site 1a and site 2 only cite. No register row.

**Census** (ballots README § "Conventions", "Instrument census"):
- `**Census**: not in scope — governance-examples (scripts/governance-examples/check.ts; census mode --census) — sites 1a–1e edit a scoped doc, governance/cross-platform-vs-platform-specific-decision-framework.md, and add no token-name candidate, declared path, token-file shape or @3fn/core import line; measured, heuristic: --census at 2c00cea49 as committed and with sites 1a–1e and 2 applied is byte-identical (sha256 6c5b98efdd10b5e30f6d3efecb60f220cb21aa715be8a719fe8e32b18fba4573; selected 1990 over 91 docs; the doc's line 1:0:0 both times)`
- `**Census**: not in scope — section-citation-resolution (scripts/check-section-citations.ts, citing corpus governance/, .kiro/steering/, canonical/) — the sites add no get_section / get_document_* citation (site 1a's Token Governance § "Token Creation Governance" is a prose reference); measured: PASS with the sites applied at 2c00cea49`
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts) — governance/ is an input-closure root (L62–L72), so site 1 moves the lock's inputClosure hash and the lock is refreshed at application (§ 4 step 4); design-language/ is outside the closure; no rule, pattern or grammar changes`
- **No line owed**:
  - The audience-banner guard is named in no row's `checks`. It is the reason for site 1e. Measured with the sites applied: "23 match; 23 carry"; without site 1e, the doc would be the one match without a banner.
  - No register row's `checks` reads `design-language/design-philosophy.yaml`. `src/__tests__/integration/Spec107-DesignLanguageContext.test.ts` reads it for shape only: measured, 10/10 with site 2 applied.
  - `edit-kind-pointers` is at `check_state: none`.

**Cap**: four line-level edits and one banner in the framework, one clause in the design philosophy, and one outcome line in a record.

**Retroactivity**: none. Departures already recorded in component READMEs stay. The PR-body line binds PRs opened after the application merges.

> **Conflicts, stated first.**
> - I own the record this closes, and I wrote reviewer notes (`1a-peter-rule-thurgood.md`) whose boundary and notify reads are two of the recommendations Peter confirmed.
> - Stacy's review and Peter's ratification are the checks.

---

## 1. The gap

- **The record**, item 1: after the True Native ballot changed Q4's "No" to "Record the departure" (L135), the motion list at L172–L178 still routes "Platform idiom conflicts with design system consistency" and "Animation is critical to brand expression" to a pause. One doc answers one question two ways, and nothing says which governs.
- **Peter's rule decides it on a fact, not a judgment**: *when* the conflict was found, not whether it is brand-critical.
- **Three readers meet the text**:
  - an agent planning (outline, requirements, design, tasks, screen spec);
  - an agent building (Lina's component work; Kenya, Data and Sparky on product screens);
  - a consumer's agents, since the doc and the design philosophy ship.

  The doc names "Peter" three times (L174, L251, L364), which a consumer has no way to resolve.

## 2. The definitions (the orchestrator's reading, flagged in § 6)

- **The boundary is the plan's approval.**
  - *Planning*: any conflict found while an outline, requirements, design, tasks or screen spec is being written or reviewed.
  - *Development*: after that plan is approved and work has started.
  - In this repo it is decidable as before or after the merge of the plan artifact the work executes (for spec work, the merged `tasks.md`).
  - Not "the unit branch is cut" (Lina's first draft): consumers, and non-spec work here, may have no unit branch.
- **Notify** is one fixed `**Departures**:` line in the PR body, landing before the work is accepted. "After" means after the decision, not after the merge (Lina). The README record (§ "Documentation Requirements") stays the record; the line is the notice at the act a human already performs.
- **`discoverable: <plan artifact § | not in plan>`** is written by the implementing agent. Stacy checks only what is decidable: the cited section exists, and for `not in plan`, that no plan section names the component and idiom. That is a read for the record, not a re-decision of the design.
- **"Peter" → "a human"** at L174, L251 and L364. In-repo agents know their human lead from Agent-Directory.
- **No brand-critical exception.** Lina's old bullet goes, and she accepts that. A brand-critical departure is a Q4 "No" case, so the timing rule covers it.
- **Two cases still stop, whatever the timing**: an unclear tokens-or-native choice, and a missing motion token. A system token found mid-build waits for human review. Semantics never depart (L29).

## 3. Edit sites

### Site 1a — the framework, Q4's "No", L135–L136 (LAW)

**Before** (L135–L136 at `2c00cea49`, verbatim):

```
- **No**: Record the departure
  - Example: Platform color scheme conflicts with brand colors
```

**After**:

```
- **No**: Record the departure. When it was found decides what happens next (the Native-Behavior Rule, `design-language/design-philosophy.yaml`): *(amended <application date> by ballot 2026-10-30-departure-timing-plan-vs-build, site 1a; prior text at `2c00cea49`)*
  - **Found while planning**, that is, while the plan the work executes is written or reviewed (a spec's outline, requirements, design or tasks, or a product screen spec): pause and ask a human before the plan is approved.
  - **Found during development**, that is, after that plan is approved and work has started (in DesignerPunk's own repo, after the merge of the plan artifact the work executes): record the departure and its reason in the component README (§ "Documentation Requirements"), proceed, and name it before the work is accepted, as one line in the PR body: `**Departures**: <component, platform> — <what departs, and why> — <README §> — discoverable: <the plan artifact § that names it | not in plan>`.
  - A conflict the plan already showed is a planning-stage conflict, wherever it was first noticed.
  - A system token the work needs is not a departure: it waits for human review whenever it is found (Token Governance § "Token Creation Governance").
  - Example: Platform color scheme conflicts with brand colors
```

*Changes from Lina's draft, and why*:
- **The boundary is "after that plan is approved and work has started"**, with the merge of the plan artifact as this repo's decidable instance, not "after the unit branch is cut" (§ 2).
- **The hand-off is the fixed PR-body line**, not "PR body or completion report", so the notice has one form a reader can check (§ 2).
- **The token carve-out is added**, because site 2 states the same carve-out and the two should agree.
- **Split into sub-bullets** for reading. Lina's "already showed" sentence is kept verbatim apart from "planning documents" → "the plan".
- **"Pause and ask a human before the plan is approved"**: Peter's "pause and ask a human", placed at the act that ends planning.

**Why no new limb for Stacy**: today her pass counts subtask-doc presence and the reflexive `adaptations: none` rate (`canonical/agents/stacy.md` L426), and does not read adaptation content. Under this site, a README departure with no `**Departures**:` line in its PR body is a shipped choice the PR did not claim. Her existing promised / claimed / shipped read can count that as a finding, with no new duty unless she asks for one (§ 7 S1).

### Site 1b — the framework, the motion pause list, L172–L178 (LAW)

**Before** (L172–L178 at `2c00cea49`, verbatim):

```
### When to Pause and Ask

**Pause and ask Peter when:**
- Unclear whether platform animation should use tokens or native values
- Motion token doesn't exist for the needed animation
- Platform idiom conflicts with design system consistency
- Animation is critical to brand expression
```

**After** (Lina's text, with the pointer):

```
### When to Pause and Ask

**Pause and ask a human when:** *(amended <application date> by ballot 2026-10-30-departure-timing-plan-vs-build, site 1b; prior text at `2c00cea49`)*
- Unclear whether platform animation should use tokens or native values
- Motion token doesn't exist for the needed animation

A platform idiom that conflicts with design system consistency is Q4's "No" case, and the rule there says when to ask.
```

The example questions at L180–L182 are unchanged. They are planning-stage questions, and the rule now says when to ask them.

### Site 1c — the framework, the token-mapping list's lead, L251 (LAW)

**Before** (L251 at `2c00cea49`, verbatim):

```
**Pause and ask Peter when:**
```

**After**:

```
**Pause and ask a human when:** *(amended <application date> by ballot 2026-10-30-departure-timing-plan-vs-build, site 1c; prior text at `2c00cea49`)*
```

Only "Peter" changes. The list's three bullets are Lina's to resolve in her CORRECTION PR (the record's item 1, the token-mapping half).

### Site 1d — the framework, the closing line, L364 (LAW)

**Before** (L364 at `2c00cea49`):

```
*This framework provides strategic guidance for balancing cross-platform consistency with platform-appropriate UX. When in doubt, pause and ask Peter for guidance.*
```

**After**:

```
*This framework provides strategic guidance for balancing cross-platform consistency with platform-appropriate UX. When in doubt, pause and ask a human for guidance.* *(amended <application date> by ballot 2026-10-30-departure-timing-plan-vs-build, site 1d; prior text at `2c00cea49`)*
```

### Site 1e — the framework, an audience banner after the H1 (EXECUTION of ballot `2026-10-13-123-b-u4-release-recipe` § "Banners")

**Anchor** (L9–L10 at `2c00cea49`, verbatim). The banner and one blank line go between L10 and L11:

```
# Cross-Platform vs Platform-Specific Decision Framework

```

**Inserted** (`renderBanner`'s template, subject "process and components"; the text is Lina's to review as owner, per the convention's "owner-reviewed, no vote per banner"):

```
> **Audience framing**: this describes **DesignerPunk's own process and components**, not yours. **Worked example**: the amendment notes and their ballot paths, the plan artifacts named (DesignerPunk's specs, tasks and screen specs, and the merge that approves them), the `**Departures**:` PR-body line, and the components and platform examples are DesignerPunk's. **Transferable**: the four decision criteria, the rule that a departure found while planning is asked of a human and one found during development is recorded, built and named before the work is accepted, the motion and token-mapping patterns, and the README documentation requirements.

```

There is no pointer: a banner is EXECUTION of the convention, and banners on `main` carry none.

### Site 2 — `design-language/design-philosophy.yaml` L53, the Native-Behavior Rule's `constraint` (LAW, the class clause)

**Before** (L53 at `2c00cea49`, verbatim):

```
    constraint: "True Native is how DesignerPunk is built, not a requirement on how it looks or behaves: design may follow a platform's idiom or part from it for a product's user needs or brand, carried by tokens and themes, with each choice recorded. Accessibility semantics, interaction the platform owns, and system surfaces never part."
```

**After**:

```
    constraint: "True Native is how DesignerPunk is built, not a requirement on how it looks or behaves: design may follow a platform's idiom or part from it for a product's user needs or brand, carried by tokens and themes, with each choice recorded. Accessibility semantics, interaction the platform owns, and system surfaces never part. When a departure is found decides who decides it: one found while the plan the work executes is written or reviewed is asked of a human before the plan is approved; one found during development is recorded, built, and named to a human before the work is accepted. A system token the work needs is not a departure: it waits for human review whenever it is found."
```

- **No pointer**: `design-language/**` is not a bound path (ballots README L31). The commit that changes the line names this ballot in its message.
- **Why here**: L53 already says "with each choice recorded". The clause says who decides the choice, and when. Site 1a cites the rule by name.
- **Leonardo's questions** (§ 7 L-1, L-2): the wording, and whether this conflicts with the Break-Glass Rule (L49–L51, "only sparingly and with explicit authorization").

## 4. Application (after the Status commit)

1. **The Status commit** (record-first): `**Status**: **RATIFIED (Peter, <date>)**`, with his words and their clock bounds, and the orchestrator's reading recorded (§ 6).
2. **Thurgood, the application PR** (branch `chore/apply-departure-timing`), in one authoring commit: sites 1a–1e and 2, as written.
   - `<application date>` is the date of the application PR's merge, as its squash commit records it.
   - The commit message names this ballot (README L31, for site 2's unbound path).
3. **Seat acts: zero.** No charter, operative set, overlay or dispositions file changes.
4. **Lock**: `governance/` is in the generator's input closure (`diff-guard.ts` L62–L72), so site 1 moves the lock's inputClosure hash. The lock is refreshed by a full-run-green `check:122:diff-guard`, then read no-op-green. If any generated output changes too (no charter embeds this doc's text; it is `inclusion: manual`), the application stops and reports.
5. **Checks**, each pasted in the PR body with its result:
   - `npm test`;
   - `npm run test:scripts` (the audience-banner guard: 23 match, 23 carry);
   - `npm run -s check:section-citations`;
   - `node scripts/validate-steering-metadata.js`;
   - `npx tsx scripts/governance-examples/check.ts --census`, whose digest equals the census line's;
   - `npx jest src/__tests__/integration/Spec107-DesignLanguageContext.test.ts`;
   - `npx tsx scripts/completion-claims/edit-kind-pointers.ts --pr <this PR>`: the framework reads `ok`.
6. **Owed after merge**:
   - the docs MCP's `rebuild_index` and `validate_metadata` on the framework;
   - the record's dated outcome line for item 1's motion list;
   - a line for Spec 131's unowned-paths inbound naming `design-language/design-philosophy.yaml` (no seat's `writeScope`);
   - a CHANGELOG line at the next release (both files ship), owned by the release author.
7. **Straggler sweep**, case-sensitive: `git grep -n -F` for `ask Peter`, `Animation is critical to brand expression` and `Platform idiom conflicts with design system consistency`, over `governance canonical/agents canonical/profiles/consumer .kiro/steering design-language`. Expected after the edit:
   - `ask Peter`: no hit in the framework. Other hits are listed and read; each is left with its owner and filed under rule 10 if false.
   - `Animation is critical to brand expression` and `Platform idiom conflicts with design system consistency`: none.
8. **The PR body carries**:
   - `**Edit kind**: governance/cross-platform-vs-platform-specific-decision-framework.md L<Q4 range>, L<motion range>, L<token-mapping lead>, L<closing line> — LAW (.kiro/docs/ballots/2026-10-30-departure-timing-plan-vs-build.md)`;
   - `**Edit kind**: governance/cross-platform-vs-platform-specific-decision-framework.md L11 — EXECUTION (.kiro/docs/ballots/2026-10-13-123-b-u4-release-recipe.md § "Banners")`.

     The ranges are read at the merge commit. `design-language/` is not a governance path, so it takes no Edit-kind line.
   - The grant below, the `**Consulted**:` line, the census lines re-run at the PR's base, and the orchestrator's reading (§ 6), repeated for Peter to overturn.

**Grant (activated by this ratification)**: Peter's ratification grants Thurgood, until the application PR merges:
- `governance/cross-platform-vs-platform-specific-decision-framework.md` (sites 1a–1e, byte for byte);
- `design-language/design-philosophy.yaml` (site 2's line only);
- `canonical/generated.lock` (the refresh only).

`.kiro/issues/**` is already his. No `.github/**` path is touched, so no `**ARMING**:` line is owed.

## 5. Record closure

At the application's merge, the record gets the outcome line: `- <date> (Thurgood, owner, rule 5): item 1, the motion list, resolved by ballot 2026-10-30-departure-timing-plan-vs-build (#<N>); the token-mapping list and items 2–3 are Lina's CORRECTION PR.` The record closes when Lina's PR lands too.

## 6. The orchestrator's reading, flagged for overturn

Peter confirmed (*"Confirm and review, please"*) the measure in the form presented to him. Applied here as:
1. **The boundary** is the plan's approval, decidable in this repo as before or after the merge of the plan artifact the work executes. It is not the unit branch (§ 2).
2. **Notify** is one `**Departures**:` PR-body line, landing before acceptance. A recorded departure without the line is a finding in Stacy's existing pass (§ 2; site 1a).
3. **The `discoverable` field** is written by the implementing agent, with only its decidable parts checked.
4. **"A human"** replaces "Peter" at L174, L251 and L364.
5. **The class clause** is design-only, in the Native-Behavior Rule, which the framework cites. The system-token carve-out is stated.
6. **No brand-critical exception.**

None of these is put as a fork; each is overturnable at the Status commit or the application PR. **No `**Open for Peter**:` line**: no fork survived drafting.

## 7. Recommendation, counter-argument (fold-back applied), residual

**Recommendation**: ratify sites 1a–1e and 2, as written.

**Counter-arguments, run against it, and what they changed**:
- **(1) "The unit branch is a decidable boundary."** It is, in this repo. But the doc ships, and a consumer may have none. So the boundary became the plan's approval, with the merge of the plan artifact as this repo's instance.
- **(2) "Notify-after can mean after the merge."** It became before acceptance, as one fixed line at the act a human already performs.
- **(3) "Whether a conflict was visible at planning is judgment."** It became a recorded field. Only its decidable parts are checked, and the "already showed" sentence makes a plan-visible conflict a planning one.
- **(4) "One doc's fix leaves the rule restated per surface."** It became the class clause, in the source the other surfaces read.

**What survives**:
- **Sunk cost** (Lina): a departure built mid-development costs more to refuse at review than at planning, so the reviewer may accept it out of inertia. "Already showed" catches only departures visible in the plan.
- **The rule moves the ask from what is at stake to when the conflict was found.** A brand-critical departure found mid-build now proceeds with a notice, not a question.
- **The notice relies on a human reading the PR body at a merge-on-green.** Spec 131 row 20 records that Peter cannot review at depth, so a `**Departures**:` line may go unread before the tag.
- **For a consumer with no review gate**, "proceed" has no bound beyond the README record.
- **`design-language/design-philosophy.yaml` has no owning seat's write scope**, so this ballot's grant is a one-off, and the next edit needs another.

## 8. Review round record

Questions for R1:
- **Lina** (author of the text; owner of the framework):
  - **Li-1**: Site 1a departs from your draft in four places (the boundary, the fixed PR-body line, the token carve-out, sub-bullets). Is each faithful to your intent?
  - **Li-2**: Site 1e's banner text: true for your doc, as owner?
  - **Li-3**: Does any generated output embed this doc's text (charters, cues), so that § 4 step 4's "lock input only" expectation could be wrong?
- **Kenya** (iOS):
  - **K-1**: You build from Leonardo's screen specs. Is "after that plan is approved and work has started" a boundary you can decide at the moment you find an iOS idiom conflict (for example, a spring curve that no motion token reproduces)?
  - **K-2**: Can you write `discoverable: <plan artifact § | not in plan>` without asking? Is `not in plan` honest when the screen spec names the component but not the idiom?
  - **K-3**: Does "a system token the work needs … waits for human review" match how a missing motion token stops your work today? *(Your fork-4 file, `fork4-kenya.md`, concerns your charter's theming lines and does not bear on this measure.)*
- **Leonardo** (design philosophy, by domain):
  - **L-1**: Site 2's wording, in your voice. You wrote the True Native ballot's site 6.4 text in this rule.
  - **L-2**: Does a development-time departure that proceeds with a notice conflict with the Break-Glass Rule (L49–L51, "only sparingly and with explicit authorization")? Or is departing from a platform idiom not "breaking a rule"?
  - **L-3**: Is a product screen spec the "plan" for product work, and its approval the boundary?
- **Stacy** (required; her finding; the `**Departures**:` line; the census reader):
  - **S1**: Is a README departure with no `**Departures**:` line in its PR body countable in your existing pass, as § 3 site 1a says, or does it need a named limb in your charter (a site, and your acts)?
  - **S2**: Is the line's grammar decidable as written? Are the `discoverable` checks (the cited § exists; `not in plan` against plan sections naming the component and idiom) yours to run, and decidable?
  - **S3**: Census: the four lines and the "no line owed" list. Is any site in scope of an instrument I have not named?
  - **S4**: Is the record's closure (§ 5) right? Item 1 is split between this ballot (the motion list) and Lina's CORRECTION (the token-mapping list).
