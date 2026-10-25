# Integration Guide, Designer-Friendly and Agent-Walkable Rewrite — CHARTER

**Date**: 2026-10-03
**Type**: **CHARTER**: a directed follow-up with a named event trigger. It is not a spec.
**Authority**: Peter's direction, 2026-10-03: the guide should be "updated… designer friendly and something an agent can help the user walk through". The scope below comes from the Leonardo/Ada/Thurgood two-round consult, recorded on `task/123-u3-onboarding` in `tasks.md` Task 19's dated annotations (commits `ed99a57d`, `d34ca071`).
**Status**: **RESOLVED-pending-merge (PR #442)** *(set 2026-10-22, Leonardo, owner, rule 5; was: CHARTERED, not scheduled)*. The chartered work is done: the rewrite merged at #440 (`275b711e5`), Peter ruled its two held forks on 2026-10-22, and the closing PR carries this record's outcome line. The record archives by `git mv` at the next walk (rule 5). The Spec 123 Task 19.4 accuracy pass is separate and was not governed here.
**Owner**: **Leonardo** (lead). **Ada**: token facts. **Lina**: review of the CLI, `sync`, testing and MCP-config sections (Start MCP Servers, Generate flags, CLI Commands, Upgrading, Verify counts, Running Component Tests). **Thurgood**: governance, doc-id and routing.
**Trigger**: `merge:#442` — re-ruled 2026-10-22 (Leonardo, owner, rule 9; Peter's go to close this charter on 2026-10-22, "Re: 3, 4, 5, 6, Proceed as you recommend" and "Re: 7, A"): the rewrite merged at #440 and the closing PR is #442, so the event that owes the close is that merge; was `manual`. Earlier text, kept as history: Leonardo opens the rewrite when Peter directs the burst slot for it, or when Spec 129 item (i) merges and unlocks the gated theme/native walkthroughs, whichever comes first. Re-ruled 2026-10-20 (Leonardo, owner, rule 9): the release-3 tag (`v15.1.0`) was cut and no rewrite opened, so the original event has fired; the charter is not dropped and stays live, and the next opening is a named act on Peter's go, not a calendar hope. *(was: **the release-3 tag is cut** → Leonardo opens the rewrite. **Gate**: the theme walkthrough and anything native wait for Spec 129 (`129-consumer-generation-completeness`) item (i) to merge (item (i)'s content is *unverified* by me; taken as given in the consult).)*
**Class**: P3 improvement · charter *(set 2026-10-20, Leonardo, rule 12. The shipped guide is correct but in a developer's voice; no reader is misled or blocked, so an improvement, and a charter because the work is a directed follow-up that is not yet a spec.)*
**Grant paths**: none. This charter grants no write scope.

---

## 1. What is chartered

`governance/DesignerPunk-Integration-Guide.md` (doc-id `designerpunk-integration-guide`) is rewritten in two layers:

- **Goal-shaped walkthroughs on top**, in designer voice: outcomes, not mechanisms ("make your brand colour the primary action", not "SemanticOverrideMap").
- **Lookup reference underneath**, for agents.

**The walkthrough unit**, one fixed shape: *Goal → You'll need → Ask your agent (a literal prompt) → What the agent does (tools, files) → How you know it worked (an observable check) → If not.* Each unit gets a unique, stable heading, so an agent can address it by section.

**First walkthroughs (these work today):**
- See DesignerPunk working.
- Specify your first screen (Product MCP).
- Join a teammate's design system.
- Change a token and see it on web. Exceptions (verified by Leonardo in `src/tokens/themes/`): the package WCAG override pins `color.action.primary` to `teal300` inside `data-theme="wcag"`, and the dark override pins `color.action.navigation` to `cyan100`. The walkthrough's check covers light, dark and WCAG, and states both exceptions.

**Gated on Spec 129:** making it look like your brand (custom themes), and native platforms.

**Stays reference:** `designerpunk.config.ts` fields, CLI verbs and flags, the MCP tool tables, the UI-tree convention, the imports table, and the `generate` outputs.

## 2. Parked: decide inside the rewrite, not before

- Splitting the reference into its own doc-id. PR-1's "one document" stands until Peter re-rules.
- Re-scoping the Governance Gradient to posture B, beyond Ada's 19.4 rename.

## 3. Residual (stated plainly)

Release 3 ships a guide that is correct but written in a developer's voice. At a bursty pace, "later" can slip indefinitely. That is why this charter opens on an event trigger rather than a date.

## 4. What the walk checks

- Has the release-3 tag been cut with no rewrite opened on record? → finding.
- Has Spec 129 item (i) merged while the theme walkthrough is still unscheduled? → surface to Peter.

## 5. Closing

When the rewritten guide merges, record the outcome here (dated) and `git mv` this file to `archive/`.

**Walk 2026-10-20 (Thurgood, walk line under rule 9; ledger `archive/TRIAGE-2026-10-20.md` row 50, call BACK-FILL)**: this record lacks the rule-1 Trigger token (`**Trigger**: ` followed by one of `tag:v<semver>`, `merge:#<N>`, `path:<glob>`, `release:<ver>:phase-1` or `manual`) and the rule-12 `**Class**:` header. That is a walk finding. The owner writes both (rule 9); the steward writes neither. Steward's proposal, which the owner may override: Proposed `manual` · `P3 improvement · charter`. Its prose trigger "the release-3 tag is cut" fired (`v15.1.0`) and no rewrite has opened; the owner opens it or re-rules.

**Owner line 2026-10-22 (Leonardo, owner, rule 5)**: the `manual` trigger fired: Peter directed the burst slot for this charter on 2026-10-22 ("I'd like to do bursts on the others"). The rewrite is opened on branch `chore/integration-guide-designer-rewrite` (cut from `main` at `e63ab7000`): a goal-shaped `## Walkthroughs` layer is added between the install region and `## Reference`, in the fixed unit shape of § 1; the install region is left byte-identical (it is mirrored into `docs/consumer/INSTALL.md`); the two Spec 129-gated walkthroughs are status stubs only. Review rounds owed on this branch before it can merge: **Ada** (token facts, every `ADA: verify` marker), **Lina** (her sections and every `LINA: verify` marker), **Thurgood** (governance, doc-id and routing, including the new top-level heading). Status stays CHARTERED until the rewrite merges (§ 5).

**Owner line 2026-10-22 (Leonardo, owner, rule 5), outcome**: the rewrite merged at #440 (`275b711e5`): a goal-shaped `## Walkthroughs` layer between the install region and `## Reference`, in the fixed unit shape of § 1, with the two Spec 129-gated walkthroughs as status stubs. Peter ruled #440's two held forks in chat on 2026-10-22. **Fork 1 (placement)**: "Re: 3, 4, 5, 6, Proceed as you recommend", so the walkthroughs stay their own H2 (`## Walkthroughs`), not folded under another heading. The dated annotation under Spec 123 Task 19's PR-1 ruling in `.kiro/specs/123-consumer-distribution/tasks.md`, and the shape assertion added to the install-doc test, are Thurgood's and land in this same PR. **Fork 2 (install region voice)**: "Re: 7, A", so (a): the install region keeps its developer voice, byte-identical, and `docs/consumer/INSTALL.md` is untouched. **Parked items (§ 2)**: splitting the reference into its own doc-id, and re-scoping the Governance Gradient to posture B, remain parked. I set no trigger for either and changed no Trigger line: neither fork reopened them, and a parked item takes a trigger only when someone has an event to name. **Trigger line**: left as is (`manual`). README rule 1 and `scripts/issues-owned.sh` read a `merge:#<N>` token only with digits, so a placeholder would read as `untokened` (a walk finding) until filled; the orchestrator can add the PR number to the Status line at open. Walk read for § 4: both checks are answered, since the rewrite is merged and the theme walkthrough is scheduled as a Spec 129-gated stub.

**Owner line 2026-10-22 (Leonardo, owner, rules 5 and 9), PR number**: the closing PR opened as #442. The Status line now names it, and the Trigger line is re-ruled from `manual` to `merge:#442` (the number is real, so the token parses; reason on the Trigger line). This supersedes the earlier line's "Trigger line: left as is (`manual`)" and its placeholder note.
