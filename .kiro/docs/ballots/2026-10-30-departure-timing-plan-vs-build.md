# Ballot Measure: when a design departure is found decides who makes the call — ask a human at planning; record, proceed and name it during development

**Date**: 2026-10-30
**Drafted by**: Thurgood (ballots steward; owner of the record this closes, `.kiro/issues/2026-10-19-decision-framework-consistency-after-tnd.md`). Lina wrote the framework text; I adapted it at R1 and R2, and the changes are listed under each site. Leonardo wrote site 2's text (his R1). Drafter's clock: 2026-10-30T15:16:25Z (`date -u`).
**Status**: **DRAFT** (R2)
**Peter's words** (chat, relayed by the orchestrator):
- **The rule**, received before 2026-10-30T15:05:25Z (the orchestrator's clock), verbatim: *"if it's caught in a planning stage, pause and ask a human. If it's discovered mid-development, record, proceed, and notify after."*
- **The confirmation**, received before 2026-10-30T15:15:17Z, verbatim: *"Confirm and review, please"*. He confirmed the measure in the form the orchestrator presented, with its converged definitions and its two recommendations.
- **The orchestrator's reading is flagged for overturn** (§ 6). Three forks survive the R1 round, and § 6 puts each to him as an `**Open for Peter**:` line.
**Base**: `2c00cea49` (`origin/main` when this was cut). Every Before block below was cut from that SHA by `git show 2c00cea49:<path> | sed -n <L>p`, and is byte-exact (Lina, Stacy and Ada checked at R1).
**Required reviewer**: **Stacy**. Item 1 is her finding class, the `**Departures**:` line is hers to read (F-B), and she is the census reader.
**Reviewers**:
- **Lina**: the framework's owner. She authors its text, including sites 1f, 1g and 1h, which are drafts for her R2.
- **Kenya**: iOS. The product boundary, the record and the line grammar are fitted to her seat.
- **Leonardo**: owner of the design philosophy by domain. Site 2 is his text.
- **Ada**: consulted at R2 on site 3, because she owns the `no-hardcoded-color` row.
**Consulted**: Lina — R1: the boundary faithful and better for a shipped doc; add "work that executes no plan artifact is in development from its start"; one line per departure, and a no-PR home; widen the token carve-out to product tokens; the banner true, approved; Leonardo's ambient embed carries § "Decision Framework" (L34–L93) in CC and the whole file in Kiro, and no site touches L34–L93; her items 2 and 3 and the token-mapping keep ride this application; Kenya — R1: the product boundary is the screen spec's `status:` block, with her Step 1 review as planning; a spring no token reproduces is the token stop, not a departure, and kept bullet 1 must be narrowed; `discoverable` should become `in-plan` with three values, and admit YAML key paths; record product departures in the Implementation Report, not a README she doesn't own; route "a human" through the architect; the upstream fix is screen specs naming the idiom per node (F-C); Leonardo — R1: site 2 in his words ("who makes the call", the plan example, the Break-Glass sentence, all tokens); Break-Glass wins over a notice for a choice that breaks another named rule; the screen spec is the plan and the lead's dated go is approval; no recorded approval means still planning, ask; record product departures under the Implementation Report heading; he will read every `**Departures**:` line in Cross-Platform Review, and file a Product MCP lessons record after ratification; Stacy — R1: the draft's claim that her existing pass counts a missing line is false (no named read, no README marker), so F-B; the grammar needs a closed component form, `path § "heading"` and `not in plan (<artifact searched>)`; work with no plan artifact is a path around asking (F-A); one census line owed, `no-hardcoded-color`, whose `:143` citation is stale (L152 at the base); the closure is right, with Lina's PR after this one, or folded in; the banner is owed and true; Ada — <pending R2: site 3>
**Class**: LAW. The text changes when governance requires a human's answer. Sites 1e, 1f, 1g and 3 are EXECUTION; see each site.
**Class option**: one clause in the design philosophy's Native-Behavior Rule (site 2), the source every screen and component reads through the Application MCP (`get_design_rules`). Each surface's rule then cites it, instead of restating timing in each list. It has the shape of #535's product-token rule. Its cost is a second file in this ballot, with Leonardo writing the text. It is design-only: a token the work needs follows token governance, whenever it is found. The upstream class fix Kenya names, screen specs naming the platform idiom per node, is F-C.
**Amends** (one application PR, Peter-merged):
- `governance/cross-platform-vs-platform-specific-decision-framework.md` (Lina's; served by the docs MCP; packed via `governance/` in `files[]`; Kiro-Leonardo loads it whole as ambient law):

  | Site | Lines at the base | What | Kind |
  |---|---|---|---|
  | 1a | L135–L136 | Q4's "No" | LAW |
  | 1b | L172–L178 | the motion pause list | LAW |
  | 1c | L251 | the token-mapping lead, "a human" | LAW |
  | 1d | L364 | the closing line, "a human" | LAW |
  | 1e | L9–L10 anchor | an audience banner after the H1 | EXECUTION of ballot `2026-10-13-123-b-u4-release-recipe` § "Banners" |
  | 1f | L21 | the Overview's framing (the record's item 2) | EXECUTION |
  | 1g | L328–L329 | Required Documentation items 3 and 4 (the record's item 3) | EXECUTION |
  | 1h | after L329 | item 5, the departure mark | LAW, under F-B (a) only |

  Site 1e is owed because the pointers on sites 1a–1d and 1h contain "ballot", which matches banner predicate v1 (`scripts/audience-banner/predicate.ts`). That is RS-51's class, filed to the RS queue, not here.
- `design-language/design-philosophy.yaml` L53, the Native-Behavior Rule's `constraint` (site 2, LAW).
  - It is packed (`design-language/` in `files[]`) and served by the Application MCP (`application-mcp-server/src/index.ts` L799, L866).
  - No seat's `writeScope` names it (a grep of all charters gives 0 hits), so this ballot's grant covers it. It is another instance for Spec 131's unowned-paths inbound.
- `governance/classification-map.md`, row `no-hardcoded-color`: two education citations, `…decision-framework.md:143`, re-pointed by section, plus a history line (site 3, EXECUTION). L605's history mention is a ledger and stays.
- `.kiro/issues/2026-10-19-decision-framework-consistency-after-tnd.md`: dated outcome lines for items 1, 2 and 3, at the application's merge (§ 5). Under them the record closes in one merge, and Lina's separate PR is not needed.
- **Pre-declared, not applied here** (F-B (a)): site 4, Stacy's departures read, her text verbatim (STACY R2), ratified here so that the vehicle that applies it does so as EXECUTION. It lands in an edit of her unit `#the-claims-pass-record-claims-passmd-the-template`. It costs **zero extra acts only if it is composed in one edit** with RS-50 site 2 and her #555 class fix. Otherwise it costs two more acts, unless Spec 131 has removed signing acts by then.

**Census** (ballots README § "Conventions", "Instrument census"):
- `**Census**: not in scope — governance-examples (scripts/governance-examples/check.ts; census mode --census) — sites 1a–1h edit a scoped doc, governance/cross-platform-vs-platform-specific-decision-framework.md, and add no token-name candidate, declared path, token-file shape or @3fn/core import line; classification-map.md (site 3) is excluded by the row's rule; measured, heuristic: --census at 2c00cea49 as committed and with sites 1a–1h, 2 and 3 applied is byte-identical (sha256 6c5b98efdd10b5e30f6d3efecb60f220cb21aa715be8a719fe8e32b18fba4573; selected 1990 over 91 docs; the doc's line 1:0:0 both times)`
- `**Census**: not in scope — no-hardcoded-color (dormant; the per-component stemma assertion over component sources) — its education homes cite this framework's hard-coded-animation clause, but the detector reads component sources, never this doc; site 3 re-points the citation by section and changes no rule, check or check_state`
- `**Census**: not in scope — section-citation-resolution (scripts/check-section-citations.ts, citing corpus governance/, .kiro/steering/, canonical/) — the sites add no get_section / get_document_* citation (their § references are prose); measured: PASS with the sites applied at 2c00cea49`
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts) — governance/ is an input-closure root (L62–L72), so sites 1 and 3 move the lock's inputClosure hash and the lock is refreshed at application (§ 4 step 4); design-language/ is outside the closure; no rule, pattern or grammar changes`
- **No line owed**:
  - The audience-banner guard is named in no row's `checks`. Measured with the sites applied: "23 match; 23 carry".
  - No row's `checks` reads `design-language/design-philosophy.yaml`. The Spec107 test reads its shape only, and passed 10/10 with site 2 applied; `yaml.safe_load` also passes.
  - `edit-kind-pointers` is at `check_state: none`.
  - Measured with every site applied: `npm run test:scripts` passes 738/738, and the `no-hardcoded-color` row's YAML still parses.

**Cap**: the framework's eight sites; three sentences in the design philosophy, over R1's "one clause" (Leonardo's text; if the cap must hold, the Break-Glass sentence is the one to keep); two citations and a history line in the register; three outcome lines in the record.

**Retroactivity**: none. Departures already recorded in component READMEs stay unmarked until their README is next edited. The PR-body line binds PRs opened after the application merges.

> **Conflicts, stated first.**
> - I own the record this closes, and the reviewer notes whose boundary and notify reads Peter confirmed.
> - I also own the register file that site 3 edits.
> - Stacy's review and Peter's ratification are the checks.

---

## 1. The gap

- **The record**, item 1: after the True Native ballot changed Q4's "No" to "Record the departure" (L135), the motion list at L172–L178 still routes "Platform idiom conflicts with design system consistency" and "Animation is critical to brand expression" to a pause. One doc answers one question two ways, and nothing says which governs.
- **Items 2 and 3** are the same ballot's leftovers: the Overview's "fundamental tension" (L21), and Required Documentation items 3 and 4 (L328–L329), which are still idiom-only.
- **Peter's rule decides item 1 on a fact, not a judgment**: when the conflict was found, not whether it is brand-critical.
- **The readers are agents planning, agents building, and a consumer's agents**, since the doc and the design philosophy ship. The doc names "Peter" three times (L174, L251, L364), and a consumer cannot resolve that name.

## 2. The definitions (the orchestrator's reading, as R1 refined it)

- **The boundary is the plan's approval.**
  - *Planning* is any conflict found while the plan is written or reviewed. That includes a platform agent's review of an approved screen spec before it builds (Kenya R1).
  - *Development* is after that plan is approved and work has started.
  - **In this repo**: before or after the merge of the plan artifact the work executes.
  - **For product work**: the human lead's dated go in the screen spec's review (Product-Token-Governance § "Authoring Workflow"), read from the spec's `status:` block once the platform's status leaves `not-started` (Kenya, Leonardo R1).
  - **A plan with no recorded approval is still in planning, so ask** (Leonardo). That bounds the consumer case.
  - **For work whose kind has a plan** (a spec, a product screen), **a missing plan is itself planning, so ask** (Leonardo; folded at R4).
  - **Other work that executes no plan artifact** (a `fix/` or `chore/` PR) is in development from its start (Lina). This is F-A, the pair plus Leonardo's clause.
- **The record of a departure**:
  - for a component, its README, marked as Documentation Requirements item 5 says (site 1h, F-B (a));
  - for product-screen work, the Implementation Report's "Decisions Made During Implementation" (Product-Handoff-Protocol L112), with the screen spec amended to name it (Kenya, Leonardo).
- **Notify** is one `**Departures**:` line per departure, in the PR body, or under that report heading where the work has no PR. It lands before the work is accepted. One grammar:
  - `<Component-Name>, <web|ios|android>`;
  - the record and the plan cited as `path § "heading"`, or `<path> uiTree.<node>` for a screen spec;
  - `in-plan: <names the component and the idiom> | component only: <§> | not in plan (<the plan artifact searched>)` (Stacy S2, Kenya K-2).
- **"A human"**, routed for product work through the screen's architect to the product's human lead (Kenya R1).
- **No brand-critical exception.** But a choice that also breaks another design rule is Break-Glass, and waits for explicit authorization whenever it is found (Leonardo L-2).
- **A token the work needs is not a departure.** It follows Token Governance § "Token Creation Governance" and Product-Token-Governance § "Authoring Workflow", whenever it is found: a `token-gap:` marker, building continues, and no merge while the marker stands (Lina, Kenya, Leonardo).

## 3. Edit sites

### Site 1a — the framework, Q4's "No", L135–L136 (LAW)

**Before** (L135–L136 at `2c00cea49`, verbatim):

```
- **No**: Record the departure
  - Example: Platform color scheme conflicts with brand colors
```

**After**:

```
- **No**: Record the departure. When it was found decides who makes the call (the Native-Behavior Rule, `design-language/design-philosophy.yaml`): *(amended <application date> by ballot 2026-10-30-departure-timing-plan-vs-build, site 1a; prior text at `2c00cea49`)*
  - **Found while planning**, that is, while the plan the work executes is written or reviewed (a spec's outline, requirements, design or tasks, or a product screen spec; a platform agent's review of an approved screen spec before it builds counts): pause and ask a human (for product work, through the screen's architect, who takes it to the product's human lead) before the plan is approved. A plan with no recorded approval is still in planning. For work whose kind has a plan (a spec, a product screen), a missing plan is itself planning, so ask.
  - **Found during development**, that is, after that plan is approved and work has started: in DesignerPunk's own repo, after the merge of the plan artifact the work executes; for product work, after the human lead's dated go in the screen spec's review (Product-Token-Governance § "Authoring Workflow"), once the platform's `status` leaves `not-started`. Other work that executes no plan artifact (in this repo, a `fix/` or `chore/` PR) is in development from its start. Record the departure with its reason (for a component, in its README, marked as Documentation Requirements item 5 says; for product-screen work, in the Implementation Report's "Decisions Made During Implementation", with the screen spec amended to name it), proceed, and name it before the work is accepted, one line per departure, in the PR body or, where the work has no PR, under that report heading: `**Departures**: <Component-Name>, <web|ios|android> — <what departs, and why> — <path § "heading" of the record> — in-plan: <path § "heading" naming the component and the idiom | component only: path § "heading" | not in plan (<the plan artifact searched>)>`. A screen spec's section may be written as `<path> uiTree.<node>`.
  - A conflict the plan already showed is a planning-stage conflict, wherever it was first noticed. A departure the component's README already records is the component's, and a screen that uses it does not file it again.
  - A choice that also breaks a design rule (the design philosophy's Break-Glass Rule) is not a departure: it waits for explicit authorization whenever it is found.
  - A token the work needs is not a departure: it follows Token Governance § "Token Creation Governance" and, for product work, Product-Token-Governance § "Authoring Workflow", whenever it is found.
  - Example: Platform color scheme conflicts with brand colors
```

*Changes at R2, and from whom*:
- **The product instance of the boundary** (Kenya K-1, Leonardo L-3), the Step 1 review counted as planning (Kenya), "no recorded approval is still in planning" (Leonardo), and "no plan artifact is development from its start" (Lina; F-A).
- **The record split** into README and Implementation Report (Kenya, Leonardo), and the no-PR home for the line (Lina, Leonardo).
- **The grammar** (Stacy S2, Kenya K-2):
  - one line per departure;
  - the closed component form;
  - `path § "heading"`, plus the `uiTree.<node>` key path;
  - `in-plan` with three values;
  - `not in plan (<artifact searched>)`.
- **"Through the screen's architect"** (Kenya).
- **"A departure the component's README already records is the component's"** (Kenya: otherwise every screen re-files it).
- **The Break-Glass sub-bullet** (Leonardo L-2) and **the all-token carve-out**, which cites the two governing sections instead of restating them (Lina, Kenya, Leonardo).

**How the line is read** (corrected at R2; Stacy S1): the draft's claim that Stacy's existing pass counts a missing line was false. Her charter has no read that opens README diffs, and the README did not mark departures. What is true:
- **Under F-B (a)**: site 1h marks departures, and her counting block gains a named read. That read is her text, applied in her composed unit edit at no extra act. Until it lands, a missing line is counted only when a sampled judgment read finds it, and the sample fraction is counted.
- **Under F-B (b)**: the notice is self-attested, and no read checks it.
- **Either way**, Leonardo reads every `**Departures**:` line on a product unit in Cross-Platform Review before its PR is reported. That is his checklist's "intentional and documented" row, and needs no law.

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

**After**:

```
### When to Pause and Ask

**Pause and ask a human (for product work, through the screen's architect) when:** *(amended <application date> by ballot 2026-10-30-departure-timing-plan-vs-build, site 1b; prior text at `2c00cea49`)*
- The four Decision Criteria leave it open whether platform animation should use tokens or native values
- Motion token doesn't exist for the needed animation (a token stop whenever it is found: Token Governance § "Token Creation Governance" and, for product work, Product-Token-Governance § "Authoring Workflow")

Using an existing native value instead of the motion token the plan or the component names is a departure: Q4's "No" case, and the rule there says when to ask. Needing a value that neither a token nor the platform supplies is the token stop above.
```

*Changes at R2* (Kenya R1):
- **Kept bullet 1** applies only where the four criteria leave the choice open. Read literally, it would swallow nearly every mid-build Q4 "No" and turn development back into a pause.
- **Kept bullet 2** is named as the token stop, citing the governing sections.
- **One discriminator line**: a native value used instead of a named token is a departure; a value neither a token nor the platform supplies is the token stop.
- **The example questions at L180–L182 are unchanged.**

### Site 1c — the framework, the token-mapping list's lead, L251 (LAW)

**Before** (L251 at `2c00cea49`, verbatim):

```
**Pause and ask Peter when:**
```

**After**:

```
**Pause and ask a human when:** *(amended <application date> by ballot 2026-10-30-departure-timing-plan-vs-build, site 1c; prior text at `2c00cea49`)*
```

The list's three bullets are kept as intentional: Lina's R1 ruling, recorded in the record (§ 5). Under the token carve-out, "values that don't map to tokens" stays a pause (Stacy S4).

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

**Inserted** (`renderBanner`'s template, subject "process and components"). Lina approved it as owner at R1:

```
> **Audience framing**: this describes **DesignerPunk's own process and components**, not yours. **Worked example**: the amendment notes and their ballot paths, the plan artifacts named (DesignerPunk's specs, tasks and screen specs, and the merge that approves them), the `**Departures**:` PR-body line, and the components and platform examples are DesignerPunk's. **Transferable**: the four decision criteria, the rule that a departure found while planning is asked of a human and one found during development is recorded, built and named before the work is accepted, the motion and token-mapping patterns, and the README documentation requirements.

```

There is no pointer: a banner is EXECUTION of the convention, and banners on `main` carry none.

### Site 1f — the framework, the Overview's framing, L21 (EXECUTION of this ballot; the record's item 2; Lina's text, LINA R2)

**Before** (L21 at `2c00cea49`, verbatim):

```
DesignerPunk's True Native Architecture creates a fundamental tension: we want cross-platform consistency through design tokens while respecting platform-appropriate UX through native idioms. This framework helps you make informed decisions about when to prioritize each approach.
```

**After**:

```
DesignerPunk's True Native Architecture fixes how components are built and leaves how they look and feel open: implementation and accessibility semantics are always native (the Key Principle, below), and design may follow a platform's idiom or depart from it, carried by tokens. This framework helps you make and record each design choice, and says when a departure is asked before it is built and when it is recorded and named.
```

- **Why EXECUTION, not CORRECTION**: once a ratified ballot names the edit, it is pre-declared execution (ballots README, the kinds table). This ballot names it.
- **Why no pointer**: EXECUTION lines are listed, not checked, by `edit-kind-pointers`, and the edit is wording that follows L23–L31 unchanged. Stacy may want one at R2.
- **The text is Lina's** (LINA R2). Its referent is L23–L31, unchanged.

### Site 1g — the framework, Required Documentation items 3 and 4, L328–L329 (EXECUTION of this ballot; the record's item 3; Lina's text, LINA R2)

**Before** (L328–L329 at `2c00cea49`, verbatim):

```
3. **Token usage**: Which tokens still used despite platform idioms
4. **Accessibility**: How platform idiom affects accessibility
```

**After** (items 3 and 4; item 5 is site 1h's):

```
3. **Token usage**: Which tokens each choice uses, whether it follows the platform's idiom or departs from it
4. **Accessibility**: How each choice keeps accessibility semantics platform-correct; a departure in design never changes role, state, name, activation, focus or announcements
```

The referents are L322's lead line ("native idiom or departure") and L25 and L28. Item 4's six-item list is L25's own (LINA R2).

### Site 1h — the framework, Required Documentation item 5, the departure mark (LAW; under F-B (a) only; Lina's text, LINA R2)

**Inserted after L329**, after site 1g's item 4:

```
5. **Departure mark**: An entry that departs from its platform's idiom begins `**Departure**:` after the platform name, as in `**iOS**: **Departure**: …`; an entry that follows the idiom carries no mark. The work that adds a marked entry names it in a `**Departures**:` line when it is handed off (Decision Criteria, Q4). *(added <application date> by ballot 2026-10-30-departure-timing-plan-vs-build, site 1h)*
```

- **Why**: a README diff must show which entries are departures that owe a `**Departures**:` line. Today § "Documentation Requirements" records idioms and departures with no mark (Stacy S1).
- **Under F-B (b)**, this site is struck.
- **Not added, recorded and not asked**: a marked example in § "Example Documentation" (L333–L353). Its three entries are native idioms and correctly carry no mark. A marked example would teach the mark faster, but it would widen the site. Taking it is Peter's call, and he can make it at the Status commit or the application PR (LINA R2).

### Site 2 — `design-language/design-philosophy.yaml` L53, the Native-Behavior Rule's `constraint` (LAW, the class clause; Leonardo's text)

**Before** (L53 at `2c00cea49`, verbatim):

```
    constraint: "True Native is how DesignerPunk is built, not a requirement on how it looks or behaves: design may follow a platform's idiom or part from it for a product's user needs or brand, carried by tokens and themes, with each choice recorded. Accessibility semantics, interaction the platform owns, and system surfaces never part."
```

**After** (Leonardo R1, verbatim):

```
    constraint: "True Native is how DesignerPunk is built, not a requirement on how it looks or behaves: design may follow a platform's idiom or part from it for a product's user needs or brand, carried by tokens and themes, with each choice recorded. Accessibility semantics, interaction the platform owns, and system surfaces never part. When a departure is found decides who makes the call. Found while the plan the work is built from (a spec, or a product's screen spec) is written or reviewed, it is asked of a human before the plan is approved. Found during development, it is recorded with its reason, built, and named to a human before the work is accepted. Parting from a platform's idiom is within this rule, not a break of it; a choice that also breaks another rule here is the Break-Glass Rule's, and waits for explicit authorization whenever it is found. A token the work needs is not a departure: it follows token governance whenever it is found."
```

- **No pointer**: `design-language/**` is not a bound path (ballots README L31). The commit that changes the line names this ballot in its message.
- **Leonardo's Break-Glass read** (L-2): parting from an idiom is permitted by this rule, so it is not a break. A choice that also breaks another named rule (Formula, Semantic-First, One-Accent) is Break-Glass, and a notice at acceptance is not an authorization.
- **Filed for later by him, outside this cap**: whether Break-Glass can ever authorize parting from the three that "never part".

### Site 3 — `governance/classification-map.md`, row `no-hardcoded-color`, two education citations (EXECUTION of this ballot)

- **Before** (at `2c00cea49`): the substring `cross-platform-vs-platform-specific-decision-framework.md:143` occurs once in L590 (`rationale:`) and once in L602 (`education.disposition`). Its third occurrence, in the L605 history entry, is a ledger and stays.
- **After**: each of those two becomes `cross-platform-vs-platform-specific-decision-framework.md § 'Motion Token Usage' › 'Strategic Guidance'`.
- **A history line added after L607**, the row's last:

```
  - { date: <application date>, change: "EXECUTION (ballot 2026-10-30-departure-timing-plan-vs-build, site 3): the two education citations cross-platform-vs-platform-specific-decision-framework.md:143 re-pointed by section (§ 'Motion Token Usage' › 'Strategic Guidance'); the clause sat at L152 at 2c00cea49, and that ballot's sites 1a and 1e move it again. Rule, owner, checks and check_state unchanged", by: thurgood }
```

**Why**: the clause sits at L152 at the base, not L143 (Stacy S3). Sites 1e and 1a move it again. A citation by section survives the next edit. The row owner is Ada, who is consulted at R2.

**Ada's lead-in suggestion** (ADA R2) is already met: in both lines, the citation is followed by the clause's lead-in, `'When platform-native animations may use hard-coded values'`. Adding it again would duplicate it. Ada confirmed site 3 as EXECUTION.

### Site 4 — `canonical/agents/stacy.md`, a standing-duty bullet after the governance-edit-kind read (L432 at `2c00cea49`) (LAW, ratified here; under F-B (a) only; pre-declared, applied by a later vehicle as EXECUTION; Stacy's text, STACY R2)

**Anchor**: the bullet that begins `- **The governance-edit-kind read**` (L432 at `2c00cea49`). The new bullet goes directly after it, before `- **The delegate-audit pointer**` (L433). The vehicle re-reads the anchor at its own base.

**Inserted** (verbatim):

```
- **The departures read** *(ballot 2026-10-30-departure-timing-plan-vs-build, F-B (a))*: on every PR in the population whose diff adds a README entry marked `**Departure**:` (the framework's Documentation Requirements item 5), the PR body's `**Departures**:` lines — read from the PR body (`gh pr view <n> --json body`, run for this seat by a session holding credentials), never from the squash message: one line per mark, matched by component and platform; its grammar; its record `path § "heading"` resolving at the merge; and its `in-plan` field (a cited `path § "heading"` or `uiTree.<node>` resolving at the PR's base; `not in plan (<artifact>)` naming an artifact in which the component does not appear). A mark with no line, or a line with no mark, is a finding on the PR's author; whether the idiom was plan-visible is judgment, read by sample, the fraction counted. Never a gate.
```

- **Where it applies**: in the edit of her unit `#the-claims-pass-record-claims-passmd-the-template` that carries RS-50 site 2 and her #555 class fix. That edit makes it zero extra acts; a separate edit costs two acts (re-confirm, re-sign), unless Spec 131 has removed them.
- **No pointer**: charters carry none (ballots README L31). The vehicle's commit names this ballot.
- **Census**: owed by the vehicle, at its own base (sweep 1, canonical-vs-truth, signing-act-consistency, 122-diff-guard, section-citation-resolution, as in RS-50's site 2 lines).
- **Under F-B (b)**, this site is struck.

## 4. Application (after the Status commit)

1. **The Status commit** (record-first): `**Status**: **RATIFIED (Peter, <date>)**`, with his words and their clock bounds, his answers to F-A, F-B and F-C, and the orchestrator's reading recorded (§ 6).
2. **Thurgood, the application PR** (branch `chore/apply-departure-timing`), in one authoring commit: sites 1a–1g, 1h under F-B (a), 2 and 3, as written.
   - `<application date>` is the date of the application PR's merge, as its squash commit records it.
   - The commit message names this ballot (README L31, for site 2's unbound path).
3. **Seat acts: zero in this application.** No charter, operative set, overlay or dispositions file changes. Under F-B (a), site 4 lands later. It costs zero extra acts only if composed in one edit with RS-50 site 2 and #555's class fix, and otherwise two more, unless Spec 131 has removed signing acts.
4. **Lock**: `governance/` is in the generator's input closure (`diff-guard.ts` L62–L72), so sites 1 and 3 move the lock's inputClosure hash.
   - Leonardo's charter embeds § "Decision Framework" (L34–L93) in his CC renderings, and Kiro-Leonardo loads the whole file as ambient law (Lina R1, Li-3). No site touches L34–L93, so no generated output's bytes should change.
   - The lock is refreshed by a full-run-green `check:122:diff-guard`, then read no-op-green. If a generated output changes, the application stops and reports.
5. **Checks**, each pasted in the PR body with its result:
   - `npm test`;
   - `npm run test:scripts` (the audience-banner guard: 23 match, 23 carry);
   - `npm run -s check:section-citations`;
   - `node scripts/validate-steering-metadata.js`;
   - `npx tsx scripts/governance-examples/check.ts --census`, whose digest equals the census line's;
   - `npx jest src/__tests__/integration/Spec107-DesignLanguageContext.test.ts`;
   - `npx tsx scripts/completion-claims/edit-kind-pointers.ts --pr <this PR>`: the framework's LAW lines read `ok`.
6. **Owed after merge**:
   - the docs MCP's `rebuild_index` and `validate_metadata` on the framework;
   - the record's outcome lines (§ 5);
   - a line in Spec 131's unowned-paths inbound naming `design-language/design-philosophy.yaml`;
   - a CHANGELOG line at the next release (both files ship), owned by the release author;
   - Leonardo's Product MCP lessons record, which he files.
7. **Straggler sweep**, case-sensitive: `git grep -n -F` over `governance canonical/agents canonical/profiles/consumer .kiro/steering design-language` for:
   - `ask Peter`;
   - `Animation is critical to brand expression`;
   - `Platform idiom conflicts with design system consistency`;
   - `fundamental tension`;
   - `still used despite platform idioms`;
   - `decision-framework.md:143`.

   Expected after the edit:
   - `ask Peter`: no hit in the framework. Other hits are listed and read, each left with its owner and filed under rule 10 if false.
   - The next four: none.
   - `decision-framework.md:143`: the L605 ledger entry only.
8. **The PR body carries**:
   - `**Edit kind**: governance/cross-platform-vs-platform-specific-decision-framework.md L<1a>, L<1b>, L<1c>, L<1d>, L<1h> — LAW (.kiro/docs/ballots/2026-10-30-departure-timing-plan-vs-build.md)`;
   - `**Edit kind**: governance/cross-platform-vs-platform-specific-decision-framework.md L<1e> — EXECUTION (.kiro/docs/ballots/2026-10-13-123-b-u4-release-recipe.md § "Banners")`;
   - `**Edit kind**: governance/cross-platform-vs-platform-specific-decision-framework.md L<1f>, L<1g> — EXECUTION (.kiro/docs/ballots/2026-10-30-departure-timing-plan-vs-build.md § 3 sites 1f, 1g)`;
   - `**Edit kind**: governance/classification-map.md — EXECUTION (.kiro/docs/ballots/2026-10-30-departure-timing-plan-vs-build.md § 3 site 3)`.

     Ranges are read at the merge commit. `design-language/` is not a governance path, so it takes no Edit-kind line.
   - Also: the grant below, the `**Consulted**:` line, the census lines re-run at the PR's base, and the orchestrator's reading (§ 6) repeated for Peter to overturn.

**Grant (activated by this ratification)**: Peter's ratification grants Thurgood, until the application PR merges:
- `governance/cross-platform-vs-platform-specific-decision-framework.md` (sites 1a–1h, byte for byte);
- `design-language/design-philosophy.yaml` (site 2's line only);
- `governance/classification-map.md` (site 3 only);
- `canonical/generated.lock` (the refresh only).

`.kiro/issues/**` is already his. No `.github/**` path is touched, so no `**ARMING**:` line is owed.

## 5. Record closure

Lina's items ride this application (Lina R1), so the record closes at its merge with four dated lines (rule 5) and the archive move:
- **Item 1, the motion list**: resolved by sites 1a and 1b.
- **Item 1, the token-mapping list**: kept, intentional, per Lina R1. Its lead now reads "a human" (site 1c).
- **Item 2**: resolved by site 1f.
- **Item 3**: resolved by site 1g, and by 1h under F-B (a).

If Lina's text for 1f or 1g is not settled before ratification, those two sites move to her own PR, and that PR follows this application's merge (Stacy S4). It needs site 1e's banner, and it cites the applied text.

## 6. The orchestrator's reading, and the forks for Peter

**The reading, flagged for overturn.** Peter confirmed the measure (*"Confirm and review, please"*) in the form presented to him. It is applied here as § 2, refined at R1:
- the boundary is the plan's approval, with this repo's instance and the product instance;
- notify is the fixed line;
- the field is `in-plan`, with three values;
- "a human", routed through the architect for product work;
- the class clause in the Native-Behavior Rule, with Leonardo's Break-Glass sentence;
- the all-token carve-out;
- no brand-critical exception.

Each part is overturnable at the Status commit or the application PR.

**Open for Peter**: F-A — work with no plan artifact, or with a plan never approved. Recommended (Lina, Leonardo, the orchestrator; Thurgood concurs): in-repo work that executes no plan artifact (a `fix/` or `chore/` PR) is in development from its start, so its departures proceed with a `**Departures**:` line that Peter reads at his merge; and work whose plan exists but has no recorded approval (a consumer's screen spec with no lead's dated go) is still in planning, so a departure is asked first. The alternative (Stacy S2a): treat the no-plan PR itself as the plan, so a departure found in it is asked in that PR before merge. Pick the recommended pair, the alternative, or another.

**Open for Peter**: F-B — what checks the `**Departures**:` notice. (a), recommended (Stacy's form; the orchestrator; Thurgood concurs): a fixed README mark for a component departure (site 1h) plus a named read in Stacy's counting block. Her text lands in the composed edit of her claims-pass-record unit (RS-50 site 2 with her #555 class fix), at zero extra acts if composed in one edit; until then a missing line is counted only by a sampled read. (b): the notice is self-attested, with no read and no mark; site 1h is struck. Pick (a) or (b).

*Note under F-B (updated at R4)*: "at zero extra acts" holds only if site 4 is composed in one edit of Stacy's unit with RS-50 site 2 and #555's class fix. Otherwise it costs two more acts, unless Spec 131 has removed them (STACY R2).

**Open for Peter**: F-C — the upstream fix Kenya names, screen specs naming the platform idiom per node (beside `tokens:`), so that most conflicts become planning-stage by construction and a thin spec stops earning `not in plan`. Where it goes: (i) this ballot; (ii) a separate small ballot on Leonardo's Integration Guide § "Writing Screen Specs", recommended (the orchestrator; Thurgood concurs: it changes what a screen spec must contain, which is Leonardo's to author, and it would widen this ballot past its record); or (iii) Spec 131. Pick (i), (ii) or (iii).

## 7. Recommendation, counter-argument (fold-back applied), residual

**Recommendation**: ratify sites 1a–1g and 2–3, with F-A as recommended, F-B (a) (site 1h), and F-C (ii).

**Counter-arguments, run against it, and what they changed**:
- **(1) "The unit branch is decidable."** It is, here. But the doc ships, so the boundary became the plan's approval, with a product instance and a no-approval default.
- **(2) "Notify-after can mean after the merge."** It became a fixed line, before acceptance, with a no-PR home.
- **(3) "Visible at planning is judgment."** It became a recorded `in-plan` field with three values, and only its decidable parts are checked.
- **(4) "The existing pass will catch a missing line."** False (Stacy S1). It became F-B, with the true interim stated.
- **(5) "Timing alone lets a rule-breaking choice proceed."** It gained the Break-Glass sentence: a choice that breaks another rule waits for authorization (Leonardo).
- **(6) "A mid-build token need would 'proceed'."** It gained the all-token carve-out (Lina, Kenya, Leonardo).

**What survives**:
- **Sunk cost** (Lina): a departure built mid-development is harder to refuse at review.
- **Timing, not stakes** (Leonardo): a large idiom departure that breaks no named rule (a custom navigation pattern for brand) proceeds on one line that may go unread at merge-on-green (Spec 131 row 20). His Cross-Platform Review read covers product units, not system-component work.
- **Thin specs** (Kenya): until F-C lands, the rule rewards a spec that does not mention the idiom.
- **Self-attested facts** (Stacy): whether the conflict really surfaced after the plan, and whether a human read the line, stay judgment.
- **No-plan work** (Lina): under F-A, every departure in a `fix/` or `chore/` PR proceeds with a notice. That is decidable, not safer. Leonardo's folded clause keeps a screen built with no screen spec out of that limb.
- **The one-off grant**: `design-language/design-philosophy.yaml` has no owning seat's write scope.

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

#### [LINA R1]

*Read-only, 2026-10-30, at `714c242cf` (wt-dep). I read the ballot whole, plus `git show 2c00cea49:<the framework>`, Leonardo's canonical charter and generated agent, and his ambient manifest. @-mention scan: Li-1, Li-2 and Li-3 are answered below.*

- **Before blocks: all five are byte-exact at `2c00cea49`.** I checked them by script, comparing each fenced block to `sed -n` of the same lines: site 1a L135–L136, site 1b L172–L178, site 1c L251, site 1d L364, and site 1e's anchor L9–L10. All five read EXACT. → § 3

- **Li-1, the boundary (plan approval, not the unit branch): faithful, and better than my draft for a doc that ships.** One case is not decided as written: work that executes no plan artifact, such as a `fix/` PR here or a consumer's ad hoc change. Add one sentence to the "Found during development" bullet: "Work that executes no plan artifact is in development from its start." Peter's rule asks at planning, and such work has no planning stage. Without the sentence, an agent cannot tell which branch applies. → § 3 site 1a; § 2

- **Li-1, the fixed `**Departures**:` line: faithful.** One check line is better than my "PR body or completion report". Two refinements:
  - (a) Say "one line per departure". Otherwise a PR with two departures has no grammar to follow.
  - (b) The doc ships, and a consumer may have no PRs. Read "in the PR body (or, where the work has no PR, in the message that asks for its acceptance)". The grammar stays fixed either way.
  → § 3 site 1a; § 2

- **Li-1, the token carve-out: faithful, but it names only system tokens.** Core Goals as amended by #535 and Product-Token-Governance § "Authoring Workflow" also govern product tokens: one the plan missed "is surfaced, never filled silently". So "proceed" must not reach it either. Proposed, for site 1a and site 2 alike: "A token the work needs is not a departure: a system token waits for human review whenever it is found (Token Governance § "Token Creation Governance"), and a product token the plan missed is surfaced, never filled silently (Product-Token-Governance § "Authoring Workflow")." Leonardo and Ada should read the site 2 half. → § 3 sites 1a, 2; § 7

- **Li-1, sub-bullets and "pause and ask a human before the plan is approved": faithful.** "Already showed" kept with "the plan" is right. → § 3 site 1a

- **Li-2, the banner: true for my doc, as owner.** I checked each claim against the doc after sites 1a–1d:
  - The amendment notes cite ballot paths.
  - The plan artifacts and the `**Departures**:` line appear only in site 1a.
  - The examples are DesignerPunk's: Button, form validation, loading, the iOS spring.
  - There are exactly four Decision Criteria (L98–L130).
  - The motion and token-mapping patterns and the README requirements are the transferable core.
  
  The subject "process and components" is one of `BANNER_SUBJECTS` (`scripts/audience-banner/predicate.ts` L113). I approve the text as written. → § 3 site 1e

- **Li-3: yes, Leonardo's ambient embed carries this doc, but no site falls inside the embedded text.**
  - Leonardo's charter declares the doc as his `governanceAsLaw` ambient embed (`canonical/agents/leonardo.md` L19–L30). Delivery differs by target:
    - **CC renderings**: they carry § "Decision Framework" (L34–L93 at `2c00cea49`) as text, under `## Ambient (per-agent)`. These are `.claude/agents/leonardo.md` L347ff, `canonical/_consumer-output/_canonical/agents/leonardo.md` and `canonical/_consumer-output/cc/.claude/agents/leonardo.md`. I checked each for "Use platform-specific idioms when:", and each has 1 hit.
    - **Kiro**: it carries no text (0 hits in `.kiro/agents/leonardo-prompt.md` and the consumer kiro prompt). Instead `.kiro/agents/leonardo.json` L27 loads `file://governance/cross-platform-vs-platform-specific-decision-framework.md`. **Kiro-Leonardo therefore reads every site, the banner included, live as ambient law, with no output byte moving.**
  - His route `decision-criteria` reaches § "Decision Criteria" (where site 1a sits) as a route, not an embed.
  - None of sites 1a–1e touches L34–L93; the banner sits above the section. So no generated output's bytes should change, and "lock input only" holds.
  - § 4 step 4's parenthetical "no charter embeds this doc's text" is false. Replace it with: "Leonardo's charter embeds § 'Decision Framework' (L34–L93) in CC and the whole file in Kiro; no site touches L34–L93". The stop-and-report clause stays as the backstop. Leonardo's R1 should read the sites as a reader of his own ambient law. → § 4 step 4; § 8 L-1

- **Sequencing with my half of the record (items 2 and 3 and the token-mapping list's keep line).** `governance/**` is outside my write scope: my charter lists only `component-meta-authoring-guide.md` there. So "Lina's CORRECTION PR" needs a grant or an applier either way. I propose it rides this application PR:
  - The text is mine, and it is three more lines:
    - L21 → the design-axis framing, CORRECTION, with the truth referent L23–L31;
    - L328–L329 → symmetric items 3 and 4, CORRECTION per Thurgood's label, with the truth referent the L322 lead line and L29;
    - a dated "keep, intentional" line in the record for L249–L254.
  - The grant gains those two framework line ranges, and each gets its own `**Edit kind**: … — CORRECTION` line.
  - The record then closes at one merge, and § 5's split closure goes away.
  - If kept separate, my PR must land after this application: once the doc carries "ballot" in a pointer, banner predicate v1 requires site 1e, which is RS-51's class. → § 4; § 5

- **The surviving counter stands as written, plus one residual.** Sunk cost, the move from stakes to timing, the unread notice at merge-on-green, the consumer with no review gate, and `design-philosophy.yaml`'s missing owner all stand. Add: "**Work with no plan** goes to development by definition, so every departure in a `fix/` PR proceeds with a notice and none is asked first." The sentence I propose above makes this decidable; it does not make it safer. → § 7

#### [KENYA R1]
*Read-only, 2026-10-30. Ballot at `chore/ballot-departure-timing` `714c242cf`; cited sources at `origin/main` `2c00cea49`. No @ mentions to me were pending before this entry.*

- **K-1: yes, I can decide it, from the screen spec, not from a merge.**
  - My product work happens in a consumer repo. This repo has no `product/`, so "the merge of the plan artifact" is never my case.
  - What I can read is the screen spec's own `status:` block, e.g. `spec: complete` and `ios: not-started` (`src/cli/templates/product/experience-map/pages/example-home.yaml` L6–L10; `governance/DesignerPunk-Integration-Guide.md` L749).
  - Product-Token-Governance § "Authoring Workflow" puts the human lead's review inside the screen spec's review, "before implementation starts".
  - So the product rule is: before `status.spec: complete` is planning; after it, once my `status.ios` leaves `not-started`, is development. I ask the site to name that as the product instance, next to the repo-merge instance. → site 1a, "Found during development"; § 2 "The boundary"; [@LEONARDO] L-3.
  - Gap: my own Step 1 ("Review the Specification … flag anything … before starting"). Is a conflict I find while reviewing an approved spec "found while … reviewed"? I read it as planning (pause, Tier 1 to Leonardo), and my charter already works that way. The text should say so in one clause, or "reviewed" means two things. → site 1a, "Found while planning".
- **K-1's example is a K-3 case, not a departure, and the motion list blurs the two.**
  - A spring curve that no motion token reproduces is "Motion token doesn't exist for the needed animation" (kept bullet 2). That stops work at any stage.
  - A spring on an interaction iOS owns (a NavigationStack push, sheet presentation, system gestures) is neither: those "never part" (site 2), so I use the system's own motion.
  - A departure is choosing an existing platform-native value over the token the spec or component names.
  - Kept bullet 1 ("Unclear whether platform animation should use tokens or native values") swallows nearly every Q4 "No" I would meet mid-build. Read literally, it turns the development rule back into a pause.
  - Ask: bullet 1 applies only while the four criteria give no answer. Once Q4 says "No", the timing rule governs. One discriminator line would help: "using a native value instead of the token is a departure; needing a value neither supplies is the token stop". → site 1b.
- **K-2: yes, I can write it without asking, if the grammar fits a screen spec.**
  - My plan artifact is YAML, not a doc with § headings. `<plan artifact §>` needs to admit a key path, e.g. `product/…/settings.yaml uiTree.<node>`. Otherwise I invent a form, and Stacy's check that the cited § exists can't run. → site 1a, the `**Departures**:` grammar; [@STACY] S2.
  - On honesty: `not in plan` is honest as "not written in the plan". It is not honest as "not discoverable", and the field is named `discoverable`. The common iOS case is a spec that names the component (say Nav-TabBar-Base) but not the idiom. That conflict was foreseeable at planning, which is exactly the sunk-cost case in § 7.
  - Ask: rename the field to `in-plan`, or give it three values: `<§ naming component and idiom> | component only: <§> | not in plan`. That keeps the one recorded fact truthful and lets Stacy count the foreseeable-but-unwritten case. → site 1a; § 2 "`discoverable`".
- **Where a product-screen departure gets recorded: site 1a says "in the component README", which I can't do.**
  - In a consumer app the component README is package source I don't own. Component edits are out of my scope; they go to Lina through Leonardo.
  - My existing record is the Implementation Report, "Flag any deviations from the spec with rationale" (Product Handoff Protocol, Tier 2).
  - Ask: "in the component README, or, for product-screen work, the Implementation Report, with the screen spec amended to name it". The second mirrors Product-Token-Governance § "Authoring Workflow"'s "the screen spec is amended to name any token that is kept". The `**Departures**:` line would cite that instead of a README §. → site 1a; site 2 ("recorded").
  - Related: if a departure is already recorded in the component's README, I'd treat the plan as having "already showed" it. Please say so, or every screen using that component re-files it. → site 1a, the "already showed" sentence.
- **K-3: it matches in outcome, not in mechanics.**
  - Today a missing motion value does not stop my whole build. I check the system tokens, semantic first, and send one Tier 1 message to Leonardo for all gaps in the pass. The code carries the nearest token or no value, with a `token-gap:` marker. The rest of the build goes on, and the unit doesn't merge with a marker in it. A system gap goes to the human lead (Product-Token-Governance § "Authoring Workflow").
  - "Waits for human review whenever it is found" is right for the token. It is too strong if read as "work stops". It also leaves out the product-token route: a mid-build gap can end as a product token Leonardo decides, not a system token.
  - Ask: cite that section rather than restate the rule. For example: "a token the work needs is not a departure; it follows Token Governance § 'Token Creation Governance' and, for product work, Product-Token-Governance § 'Authoring Workflow'". → site 1a, the token sub-bullet; site 1b, kept bullet 2; site 2's last sentence.
- **"A human" is right for a consumer, with the route stated.**
  - "Peter" is unresolvable in a consumer repo. "A human" matches the charters' "the product's human lead" wording.
  - For me, though, the ask goes through Leonardo (Tier 1), and he takes it to the lead. Read bare, "pause and ask a human" invites a platform seat to skip the architect.
  - Ask: "ask a human (for product work, through the screen's architect, who takes it to the product's human lead)". The notice half works as written: the PR body is the one place a human, not Leonardo, reads my mid-build choice. → sites 1a–1d; site 2.
- **Surviving counter (fold-back applied).**
  - **Folded in:** the K-2 field fix, the record-location fix and the bullet-1 narrowing each remove a way my seat would misapply the rule.
  - **What survives:** for iOS, the rule moves the human's question away from the moment it is cheap.
    - My conflicts are mostly foreseeable from the component and the platform alone. Examples: tab bar versus a custom nav, spring versus timed curves, sheet detents.
    - The rule rewards a screen spec that doesn't mention the idiom. A thin spec gives `not in plan`, and then I proceed.
    - In a consumer with merge-on-green and no deep review (§ 7, third residual), "proceed and name it" approaches "proceed".
    - The class-level answer is upstream, not in this ballot: the screen spec names the platform idiom per node (an `ios:` note per node, like its `tokens:` blocks). That would make most of my conflicts planning-stage by construction.
  - **Fork:** whether that belongs in this ballot or with Leonardo (Integration Guide § "Writing Screen Specs") is a choice between options I can defend. It is Peter's to make, and [@LEONARDO] should weigh in.

#### [LEONARDO R1]

*Read-only. Ballot at `714c242cf` (wt-dep). Before-text of `design-language/design-philosophy.yaml` L49–L54 checked at `2c00cea49` (`git show`). Product-Token-Governance § "Authoring Workflow" read via docs MCP. `governance/Product-Handoff-Protocol.md` L62 and L112 grepped.*

- **L-1, site 2 wording.** I would sign the After below. I agree with the substance. Four changes, each reasoned:
  - (a) Say who makes the call. "Who decides it" reads as if a human decides both times; at development time the builder decides and the human is told.
  - (b) Give the consumer reader one example of "the plan". This file is served by `get_design_rules` into every consumer, and "the plan the work executes" is opaque without one.
  - (c) Add the Break-Glass reconciliation (L-2 below).
  - (d) Widen the token carve-out from system tokens to tokens (see the product-token bullet below).

  → design-philosophy.yaml L53, site 2:
  ```
      constraint: "True Native is how DesignerPunk is built, not a requirement on how it looks or behaves: design may follow a platform's idiom or part from it for a product's user needs or brand, carried by tokens and themes, with each choice recorded. Accessibility semantics, interaction the platform owns, and system surfaces never part. When a departure is found decides who makes the call. Found while the plan the work is built from (a spec, or a product's screen spec) is written or reviewed, it is asked of a human before the plan is approved. Found during development, it is recorded with its reason, built, and named to a human before the work is accepted. Parting from a platform's idiom is within this rule, not a break of it; a choice that also breaks another rule here is the Break-Glass Rule's, and waits for explicit authorization whenever it is found. A token the work needs is not a departure: it follows token governance whenever it is found."
  ```
  The YAML stays one double-quoted scalar with no inner double quotes, so Spec107's shape test is unaffected. That is a reading, not a run; § 4 step 5 runs it. The added text is about three sentences against the cap's "one clause". If that breaks the cap, (c) is the one to keep.

- **L-2, Break-Glass: no conflict for an idiom departure, a real one for anything beyond it.** The Break-Glass Rule (L49–L51) is about breaking *the rules in this file*. The Native-Behavior Rule's own text says design "may follow a platform's idiom or part from it". So parting from an idiom is permitted by a rule, not a break of one, and record, proceed and notify governs it. The conflict appears when a mid-build departure also breaks another named rule: a hard value (the Formula Rule), a primitive where a semantic exists (Semantic-First), or two accents in one moment (One-Accent). Read alone, the timing clause would let that proceed with a notice, and Break-Glass says "only … with explicit authorization". **Break-Glass wins.** A broken rule is an exception the system has to earn, and a notice at acceptance is not an authorization. The reconciling sentence is the one in L-1's After: "Parting from a platform's idiom is within this rule, not a break of it; a choice that also breaks another rule here is the Break-Glass Rule's, and waits for explicit authorization whenever it is found." Site 1a should carry the matching sub-bullet. Suggested: "A choice that also breaks a design rule (the design philosophy's Break-Glass Rule) is not a departure: it waits for explicit authorization whenever it is found." → site 1a, and → design-philosophy.yaml L49–L51.
  - **Outside this ballot's cap, so filed for later and not folded in:** whether Break-Glass can authorize parting from the three that "never part" (accessibility semantics, platform-owned interaction, system surfaces). My read is that it cannot: "never" outranks "sparingly", and Core Goals is accessibility-first. The file does not say so, though, and that is a separate LAW question.

- **L-3, product work.** **Yes: the screen spec is the plan, and the human lead's approval of it is the boundary.** Product-Token-Governance § "Authoring Workflow" already places that act at "the screen spec's review, before implementation starts", with the lead named as "Peter in DesignerPunk's repo; the founder in a product repo", and it already asks for the lead's decision "in the lead's own words and dated". **For a consumer with no PR gate, "approval" is that dated go in the screen spec's review, and "accepted" is the lead's acceptance of the Implementation Report.** The default that bounds it: **no recorded approval means the work is still in planning, so ask.** That answers the residual "for a consumer with no review gate, 'proceed' has no bound" (§ 7). Proceed is only open once a human's dated go exists.
  - **What follows for site 1a.** Site 1a's fixed `**Departures**:` line needs a home where there is no PR. I recommend "one line in the PR body, or where the work has none, under the Implementation Report's 'Decisions Made During Implementation' (Product-Handoff-Protocol), in this form: …". That keeps one grammar, which was the point of dropping Lina's "or completion report", and gives a consumer a place it already writes. In-repo checkability is unchanged, because in-repo work always has a PR. → site 1a; § 2 "Notify".
  - **A gap, not for this ballot.** The Product MCP screen-spec `status` has no approval state; `find_screens` filters on not-started / in-progress / complete / blocked. So the boundary cannot be queried mechanically for a product. I will file a lessons-learned record after ratification and route it to Thurgood. → § 7 residual.

- **Design-only scope and the token carve-out.** The design-only scope is the right line for the philosophy. The carve-out is right but too narrow. Site 2 names only system tokens, but departures are "carried by tokens and themes", and a mid-build **product** token need does not proceed either. Product-Token-Governance § "Authoring Workflow" routes it to Leonardo as a Tier 1 clarification. The code then uses the nearest system token with a `token-gap:` marker, and "a unit does not merge while its screen sources carry a `token-gap:` marker". So "proceed" applies to the departure's design, not to a token it needs. Hence "a token the work needs … follows token governance" in L-1's After, and the same widening in site 1a's carve-out sub-bullet. Both stay pointers to Token Governance § "Token Creation Governance" and Product-Token-Governance § "Authoring Workflow", with no restatement. → site 2; site 1a, sub-bullet 4.

- **Surviving counter (mine, after the fold-backs above).** The rule makes timing, not stakes, the trigger. In product work, the departures that matter most to a brand (a signature motion, a drenched surface) are often first seen only when a platform agent builds them. Under this rule they proceed with a notice. Break-Glass catches the ones that break a named rule. It does **not** catch a large idiom departure that breaks no rule, such as replacing a platform's navigation pattern with a custom one for brand. That proceeds on one line in a PR body that § 7 already says may go unread at merge-on-green. Lina's sunk-cost residual is the same failure seen from the reviewer's side. **I am not proposing a stakes exception.** Peter ruled it out and Lina accepted. The cheapest partial check is my own: Cross-Platform Review mode reads every `**Departures**:` line on a product unit before its PR is reported. That needs no law, it is already my review checklist's "intentional and documented" row, and I will apply it. It does not cover system-component work, where no product architect reviews.

- **Directed: none.**

#### [STACY R1]

*Read at `714c242cf` (DRAFT) on base `2c00cea49`, 2026-10-30, read-only. (verified) means a command I ran at the base. I have one correction to the ballot's claim about my pass, one census line missing, and one stale citation that the edit moves further.*

- **S1: as written, my existing pass cannot count a missing `**Departures**:` line decidably.** "A recorded departure without the line is a finding in Stacy's existing pass" (§ 3 site 1a "Why", § 6 item 2) claims a detector that does not exist. There are two reasons. → § 3 site 1a "Why", § 6 item 2
  - **No named read.** My charter has no limb that opens README diffs. The promised / claimed / shipped read runs per parent criterion, and for RELEASE over the delta, but nothing in it sends me to component READMEs. A duty that is not named runs only when a sample happens to land on it. That is the instrument-path limb's history: it missed seven times while it *was* named.
  - **No departure marker.** The framework's § "Documentation Requirements" (L320–L333) records "visual and behavioral choices — native idiom **or** departure" in one README section, `## Platform-Specific Behavior`, and marks neither (verified). So a README diff cannot show me which entries are departures that owe a line. Deciding that is judgment.
  - **What makes it decidable** (properties only, because the texts belong to Lina and to me):
    - (a) the README records a departure in one fixed, marked form;
    - (b) my charter names the read in the counting block, which is in the unit `#the-claims-pass-record-claims-passmd-the-template`.
  - **Cost of (b)**: that unit already owes my two acts once, for RS-50 site 2 composed with my #555 class fix (RS-50 site 3 item 4). Composing this limb into the same edit adds no acts.
  - **Until then** the text should say what is true: a missing line is counted when a sampled judgment read finds it, with no detector, and the sample fraction is counted.
  - **Fork for Peter** if he prefers not to: accept the notice as self-attested, with no read at all.

- **S2: the grammar can be made decidable with three fixes; one check stays judgment.** → § 3 site 1a
  - **Parsing.** `<what departs, and why>` is free prose that may itself contain ` — `. The line parses only from both ends: the first field before the first ` — `, and the last two from the right.
    - That works only if `<component, platform>` has a closed form, `<Component-Name>, <web|ios|android>`.
    - It also needs `<README §>` in the `path § "heading"` grammar that sweep-1 resolves.
  - **One line per departure.** State it, so that two departures never share one line.
  - **`discoverable`, the cited section**: decidable if it is written `path § "heading"` and read at the PR's base (`git show <base>:<path>` plus a heading match).
  - **`discoverable: not in plan`**: decidable only in part.
    - "Names the component" can be grepped, but only once I know which plan artifact to grep. For spec work the PR body's `Spec:` field gives `.kiro/specs/<spec>/`. For product work nothing in the body names the screen spec.
    - The fix: `not in plan (<the plan artifact searched>)`.
    - "Names the idiom" stays judgment. I would sample it and count the fraction.
  - **Yes, these checks are mine.** The field is a claim about the plan, so it belongs to claims verification at CLOSEOUT and RELEASE. It is never a gate.

- **S2a: work with no plan artifact has no planning stage, and that is a gap.** → § 2, § 6 item 1, § 7 "What survives"
  - On site 1a's definitions, a `fix/` or `chore/` PR, or a consumer working without specs, can never be "found while planning". Every departure it finds therefore proceeds with a notice.
  - So routing a design change through non-spec work is a path around "ask a human".
  - I do not think it is intended. It is Peter's to rule: either no-plan work counts as development, or the PR is the plan and the departure is asked there. The orchestrator's reading item 1 should name the choice.

- **S3: census.** The three lines hold, with the ballot's measured digests. **One line is missing.** → Census
  - `no-hardcoded-color` is `dormant`, so it is registered. Its education homes cite this framework as a scored KEEP clause: `cross-platform-vs-platform-specific-decision-framework.md:143`, "When platform-native animations may use hard-coded values" (register L590, L602).
  - So every site in this file is presumptively in its scope, and a `**Census**: not in scope — no-hardcoded-color — …` line is owed. The reason is decidable: the detector reads component sources and never this doc.
  - **A stale citation, made worse here.** That `:143` citation is already wrong at the base: the clause is at **L152** (verified). Sites 1e (+2 lines) and 1a (+4) move it to about **L158**.
    - § 4 step 7's sweep should list it.
    - The fix is the register owner's (Thurgood) CORRECTION by section, filed under rule 10 if it does not ride this PR.
    - L605 is history, a ledger, and stays as written.
  - **"No line owed"**: the audience-banner guard, Spec107's shape test and `edit-kind-pointers` all hold. (verified: no `checks` line names the framework or `design-philosophy.yaml`)

- **S4: the closure is right, with one ordering condition.** → § 5
  - Item 1 has two halves in the record. The motion list (L172–L178) is this ballot's. The token-mapping list (L249–L254) is Lina's (verified).
  - Site 1c touches only the token list's lead ("a human"), and its three bullets stay Lina's. Under site 2's carve-out, "values that don't map to tokens" is still a pause, which fits leaving them where they are.
  - **The condition**: if Lina's CORRECTION cites this ballot's applied text (site 1a or site 2) as its truth referent, it must merge **after** this application, and the referent must resolve at her merge. A referent changed in the same PR is excluded. § 5 should say that her PR follows.

- **Before blocks: all byte-exact at `2c00cea49`.** (verified) → § 3
  - framework L135–L136, L172–L178, L251, L364 and L9–L10;
  - `design-philosophy.yaml` L53.

- **Site 1e, the banner: owed, and as read the text is true.** → § 3 site 1e
  - The doc carries "ballot" 0 times at the base, and the sites' pointers add it. `predicate.ts` L78 matches `ballot`, so the guard requires the banner. (verified)
  - The banner's split (the rule is transferable; the line format and the plan artifacts are the worked example) matches what a consumer may use. Lina reviews it as owner.
  - This is RS-51's class: every bound-path LAW edit to an unbannered served doc now forces a banner. That belongs in the RS queue, not here.

- **My surviving counter-argument.** The rule makes the human's answer depend on a self-attested timing fact and a self-attested notice.
  - With S1 and S2 applied, I can verify the notice's form and presence. Whether the conflict really surfaced after the plan stays judgment, and so does whether a human read the line at a merge-on-green (Spec 131 row 20).
  - The rule is only as strong as the sampled read, and that read has no detector.

#### [THURGOOD R2]

*Incorporation of LINA R1, KENYA R1, LEONARDO R1 and STACY R1, at `714c242cf` on base `2c00cea49`, 2026-10-30. All four entries are spliced above byte for byte. The ballot body is rewritten above § 8, and every site is re-measured with all sites applied (census digest unchanged; banner 23/23; `test:scripts` 738/738; Spec107 10/10; citations PASS).*

- **Stacy S1, a false claim, corrected.** The draft said her existing pass counts a missing `**Departures**:` line. It does not: there is no named read, and READMEs carried no departure mark. The text now states what is true and puts the detector to Peter as F-B. Under (a), site 1h is the mark (draft text for Lina) and the read is Stacy's own text, folded into her composed unit edit at zero extra acts. → § 3 site 1a "How the line is read", site 1h, § 6 F-B
- **Stacy S3, a missing census line, added.** `no-hardcoded-color` is a registered dormant row whose education cites this framework, so it is presumptively in scope; the line reads "not in scope". Its stale `:143` citation (L152 at the base) becomes site 3, EXECUTION, by section, with a history line. Ada, as the row's owner, reads site 3 at R2. → Census, § 3 site 3, § 4 step 7
- **Lina Li-3, a false parenthetical, fixed.** § 4 step 4 now says Leonardo's charter embeds § "Decision Framework" (L34–L93) in CC, Kiro loads the whole file, and no site touches L34–L93. → § 4 step 4
- **Leonardo L-2, Break-Glass.** His reconciling sentence is in site 2, and the matching sub-bullet is in site 1a. → § 3 sites 1a, 2
- **The all-token carve-out** (Lina, Kenya, Leonardo): it now cites Token Governance § "Token Creation Governance" and Product-Token-Governance § "Authoring Workflow", in place of "waits for human review whenever it is found". → sites 1a, 1b, 2
- **The product boundary** (Kenya K-1, Leonardo L-3):
  - the plan is the screen spec;
  - approval is the lead's dated go, read from `status:`;
  - Kenya's Step 1 review counts as planning;
  - no recorded approval means still planning, so ask;
  - "a human" is routed through the architect;
  - the product record is the Implementation Report heading plus a spec amendment.

  → § 2, site 1a, site 1b
- **The grammar** (Stacy S2, Kenya K-2):
  - one line per departure;
  - `<Component-Name>, <web|ios|android>`;
  - `path § "heading"`, or `<path> uiTree.<node>`;
  - `not in plan (<the plan artifact searched>)`.

  **I picked `in-plan` with three values** over the rename alone, so the foreseeable-but-unwritten case is counted, not hidden. → site 1a
- **Site 1b** (Kenya): kept bullet 1 is narrowed to cases the four criteria leave open, and a discriminator line separates a departure from the token stop. → site 1b
- **Lina's items ride this application**: 1f (L21), 1g (L328–L329) and the token-mapping keep. **One departure from the brief**: I labelled 1f and 1g EXECUTION, not CORRECTION. Once a ratified ballot names an edit, it is pre-declared execution (ballots README, the kinds table: CORRECTION has "no clause naming the fix"). Their text is my draft, because Lina gave the change and the referents but no wording, and it is hers to rewrite at R2. If the text is not settled by ratification, the two sites fall back to her own PR, after this one (§ 5). → sites 1f, 1g, § 5
- **Site 2** is Leonardo's text, verbatim, over the one-clause cap. The Break-Glass sentence is the one to keep if the cap must hold. → site 2
- **The banner (1e)** is owed and true (Stacy, Lina). RS-51's class goes to the RS queue, not here.
- **Forks** (§ 6): F-A, F-B and F-C, each with the orchestrator's recommendation, which I share. I do not contest any of them.
  - On F-A, Stacy's concern (a path around asking) is answered in-repo, because every PR here is Peter-merged and carries the line.
  - That does not hold for a consumer with no plan artifact at all, who proceeds with only a notice. The residual says so.

#### [LINA R2 — #568]

*Sites 1f, 1g and 1h in my words. They replace Thurgood's draft After blocks; his Before blocks are unchanged. Pointers follow his convention, because the kind and the pointer are his to state.*

**Site 1f — After (L21):**

```
DesignerPunk's True Native Architecture fixes how components are built and leaves how they look and feel open: implementation and accessibility semantics are always native (the Key Principle, below), and design may follow a platform's idiom or depart from it, carried by tokens. This framework helps you make and record each design choice, and says when a departure is asked before it is built and when it is recorded and named.
```

**Site 1g — After (L328–L329):**

```
3. **Token usage**: Which tokens each choice uses, whether it follows the platform's idiom or departs from it
4. **Accessibility**: How each choice keeps accessibility semantics platform-correct; a departure in design never changes role, state, name, activation, focus or announcements
```

**Site 1h — inserted after L329 (under F-B (a) only):**

```
5. **Departure mark**: An entry that departs from its platform's idiom begins `**Departure**:` after the platform name, as in `**iOS**: **Departure**: …`; an entry that follows the idiom carries no mark. The work that adds a marked entry names it in a `**Departures**:` line when it is handed off (Decision Criteria, Q4). *(added <application date> by ballot 2026-10-30-departure-timing-plan-vs-build, site 1h)*
```

- **Referents**: L322's lead line ("native idiom or departure") and L25/L28 for items 3 and 4. Item 4's six-item list is L25's own list ("Role, state, name, activation, focus and announcements").
- **Not added**: a departure example in § "Example Documentation" (L333–L353). Its three entries are all native idioms, so they correctly carry no mark. A marked example would teach the mark faster, but it widens the site. It is Peter's call whether to take it.
- **If this text is not settled by ratification**, 1f and 1g fall back to my own PR after this one, as you said. 1h has no fallback, because it is LAW and only exists under F-B (a).

#### [ADA R2 — #568]

*Read at `7ab9e008b` (`chore/ballot-departure-timing`) on base `2c00cea49`, as owner of register row `no-hardcoded-color`. (verified) means I ran it at the base.*

- **Site 3's Before is true.** The substring `cross-platform-vs-platform-specific-decision-framework.md:143` occurs at L590 (`rationale:`), L602 (`education.disposition`) and L605 (a history ledger entry), and nowhere else in `governance/classification-map.md` (verified, `git show 2c00cea49:… | grep -n -o`). Leaving L605 as written is right, because it is a ledger. The row is `owner: ada`, and its first `scope[]` surface is `check_state: dormant` (verified).
- **The After is true, and better than a line number.** At the base, the clause "**When platform-native animations may use hard-coded values:**" is at L152, under `## Motion Token Usage` (L140) › `### Strategic Guidance` (L142) (verified). The parent is needed: a second `### Strategic Guidance` sits at L188 under `## Token Mapping Patterns` (verified). Sites 1a (Q4, L135–L136) and 1b (L172–L178) edit outside that subsection, so the clause stays under the cited section.
  - *Optional*, not required: add the clause's lead-in, `('When platform-native animations may use hard-coded values')`, so a reader lands on the line and not just the subsection.
- **The history line**: the text is accurate, and `by: thurgood` matches L604–L607 (verified). `<application date>` stays a placeholder until application. Once filled, it matches `edit-kind-pointers.ts`'s `HISTORY_RE`, the register's pointer form.
- **The census line for `no-hardcoded-color`, "not in scope", is right.** The detector is the per-component stemma assertion over component sources. It never reads this framework, and no site changes its rule, `checks` or `check_state`. So no verdict or surface can change.
- **No objection. I confirm site 3 as EXECUTION** under the ballot's grant to Thurgood (`governance/classification-map.md`, site 3 only).

#### [STACY R2 — #568]

*Read at `7ab9e008b`, 2026-10-30.*

- **The census: all five lines confirmed.** → Census
  - **`no-hardcoded-color`**: present and true. Site 3 re-points the row's two citations by section. `§ 'Motion Token Usage' › 'Strategic Guidance'` is where L152's clause sits (L140 and L142 at the base).
  - **Instruments that read the register** (`git grep` at the base): `governance-examples`, `edit-kind-pointers` and two discovery fixtures.
    - `governance-examples` excludes the register, which its line says.
    - `edit-kind-pointers` is `check_state: none`, and site 3's EXECUTION line reads `listed`.
    - So site 3 owes no further census line.
  - **`section-citation-resolution`'s "the sites"** covers site 3: `classification-map.md` is in its corpus.
- **F-B framing: confirmed, with two corrections.** → § 6 F-B, § 4 step 3
  1. **Authority for the read's text.** "Its text is Stacy's", with nothing ratified, makes the later composition LAW and not EXECUTION. I offer the text now, for #568 to carry as a pre-declared After, so that any vehicle applies it as EXECUTION. The text below is a standing-duty bullet, placed after the governance-edit-kind read (L432):
     > - **The departures read** *(ballot 2026-10-30-departure-timing-plan-vs-build, F-B (a))*: on every PR in the population whose diff adds a README entry marked `**Departure**:` (the framework's Documentation Requirements item 5), the PR body's `**Departures**:` lines — read from the PR body (`gh pr view <n> --json body`, run for this seat by a session holding credentials), never from the squash message: one line per mark, matched by component and platform; its grammar; its record `path § "heading"` resolving at the merge; and its `in-plan` field (a cited `path § "heading"` or `uiTree.<node>` resolving at the PR's base; `not in plan (<artifact>)` naming an artifact in which the component does not appear). A mark with no line, or a line with no mark, is a finding on the PR's author; whether the idiom was plan-visible is judgment, read by sample, the fraction counted. Never a gate.
  2. **"0 extra acts" is conditional.**
     - It is true only if RS-50 site 2, my #555 class fix and this read land in **one** edit of `#the-claims-pass-record-claims-passmd-the-template`.
     - If the switch PR comes before #555's ballot, the unit is edited twice, which costs two acts more, unless Spec 131 has removed the acts by then.
     - § 6 F-B should say "zero extra acts if composed in one edit".

#### [THURGOOD R3]

*Incorporation of LINA R2, ADA R2 and STACY R2 (the collective round's #568 blocks), at `7ab9e008b` on base `2c00cea49`, 2026-10-30. The three blocks are spliced above byte for byte. § 6's three `**Open for Peter**:` lines are held unchanged, pending the collective round's sheet.*

- **Sites 1f, 1g and 1h are now Lina's text** (LINA R2), replacing my drafts. My Before blocks are unchanged.
  - Site 1g's After is items 3 and 4 only. Item 5 is site 1h's alone, with Lina's own pointer.
  - Lina added no marked example to § "Example Documentation" (L333–L353). That is **recorded, not asked**: it is noted in site 1h as Peter's to take or leave, and is not an `**Open for Peter**:` line.

  → § 3 sites 1f, 1g, 1h
- **Site 3** (ADA R2): confirmed, as EXECUTION. Ada's optional suggestion was to add the clause's lead-in to the citation. **I took it as already satisfied, and changed nothing.** In both lines at the base, the citation is already followed by the lead-in:
  - L590 has `…:143, 'When platform-native animations may use hard-coded values' + 4 permitted cases`;
  - L602 has `…:143 — 'When platform-native animations may use hard-coded values' plus four`.

  Adding it a second time would duplicate it, and a reader already lands on the line. → § 3 site 3
- **F-B's read text is now carried as site 4** (STACY R2, correction 1), Stacy's text verbatim, pre-declared under F-B (a).
  - Any vehicle that edits her claims-pass-record unit applies it as EXECUTION.
  - "Its text is Stacy's", with nothing ratified, is gone.

  → § 3 site 4, Amends
- **"Zero extra acts" is now conditional** (STACY R2, correction 2): only if RS-50 site 2, #555's class fix and this read land in one edit of the unit; otherwise two more acts, unless Spec 131 has removed the acts. That is stated in Amends, in § 4 step 3, and in a note directly under § 6's F-B line.
  - **The F-B line itself is held byte-unchanged**, as the orchestrator directed. Its "at zero extra acts" should take "if composed in one edit" when the sheet settles it.

  → Amends, § 4 step 3, § 6
- **Census**: Stacy confirms all five lines (STACY R2). Site 4 is not applied here, so its census lines are owed by the vehicle that applies it, cut at that vehicle's base. → Census

#### [THURGOOD R4]

*The collective round's settlement of #568's forks, folded in at R3 `6bad5e9b3` on base `2c00cea49`, 2026-10-30. Source: the convener's disposition sheet r2.1 (`collective-r2-1-thurgood.md`), row D, under Peter's delegation (`DLG@d34fc77868f649d3c67bd1b1da47bc6f2a805920`). Peter ratified it in R8 item 4, recorded in the Status commit.*

- **F-A: the pair, with Leonardo's clause folded in.** Site 1a's "Found while planning" bullet now ends with "For work whose kind has a plan (a spec, a product screen), a missing plan is itself planning, so ask." The "Found during development" bullet's no-plan sentence now reads "Other work that executes no plan artifact (in this repo, a `fix/` or `chore/` PR) …", so limb 1 is left to chore and fix work.
  - Why fold it: Leonardo restated his dissent as an incentive risk. Under the bare pair, the cheapest way to avoid an ask is to write no plan, which is the commonest consumer case, a screen built with no screen spec. The clause is decided by the kind of work, not by judgment. With it in, his dissent is withdrawn by its own terms.

  → § 2, § 3 site 1a
- **F-B: (a).** The line now reads "at zero extra acts if composed in one edit" (Stacy R2), and the note under it now records the cost when the edits are not composed.
- **F-C**: no text in this ballot. It is recorded as ruled in the Status commit.
- **Owed reads of the folded clause.** Lina, Ada, Stacy and Kenya confirmed the bare pair before the fold, so each of them owes one read of the clause, given in that seat's review line on the application PR before it merges. If any of them objects, a correction lands before application. That is not another round now, because the clause is decidable as written.
  - [@LINA] Does "for work whose kind has a plan (a spec, a product screen), a missing plan is itself planning, so ask" leave your limb 1 as you meant it, for `fix/` and `chore/` work? → § 3 site 1a -- [THURGOOD R4]
  - [@ADA] Is the clause decidable from the kind of work, as you read decidability for the pair? → § 3 site 1a -- [THURGOOD R4]
  - [@STACY] Can your departures read (site 4) tell, from the PR body, a screen built with no screen spec (planning: asked, not a `**Departures**:` line) from a `fix/` PR (development: a line)? → § 3 sites 1a, 4 -- [THURGOOD R4]
  - [@KENYA] For a consumer screen with no screen spec, does "ask" route through the architect as site 1a says, and can you decide the kind from the work you are given? → § 3 site 1a -- [THURGOOD R4]
