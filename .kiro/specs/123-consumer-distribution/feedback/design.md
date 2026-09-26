# Spec Feedback: 123 — Consumer Distribution — Design

**Spec**: 123-consumer-distribution
**Artifact under review**: `design.md` (DRAFT, 2026-09-26)
**Created**: 2026-09-20
**Spec author**: Thurgood
**Reviewers**: Lina, Ada, Stacy, Leonardo

---

## Context for Reviewers

**What this round reviews**: HOW the settled requirements are realized. **Requirements are settled** (PR #196, `aabb59fd`: 30 requirements, 282 ACs, five units). A design finding that would change WHAT a requirement says is out of this round's scope. Raise it as a directed question to Peter; do not fold it into a design comment.

**§ 7.2 is NOT signed off.** The design specifies the re-grounding machinery **without claiming it works** → design.md § "Framing obligation". Pass four stays a U2 acceptance gate, and the author is recused → requirements.md Req 11.8.

### Settled decisions — do not relitigate

- **Model B identity statement (Peter, 2026-09-26)**: engine that births a design system which is the consumer's own. CONSUME = install; BECOME = install + `init`, once ever. Tokens are the consumer's language (copied wholesale, local mode, `tokenSource` stays); components are our updating surface (union-with-precedence); the name contract is the only coupling, and it reports, never writes. → requirements.md § Introduction
- **Token union DECLINED** as a Model-A feature. Revival trigger: real demand to track DP's token language. → requirements.md § Introduction; Req 1.2
- **Fork B**: section-granular provenance in U2, with the pre-stated 11.4 criterion (derivation + honest naming; containment is tree descent, never an anchor-string prefix). → Req 10.G, 10.S, 11.4
- **C1 signer rule, C2 rate detector, volume valves** (content-keyed carry-forward + itemized assent). → Req 11.5
- **C3 v2 triviality**: routed judgment with a one-sided mechanical floor; the classifier keys on normativity; the operative set is fixed canonical-side under diff-guard, confirmed by the owning agent. → Req 11.6
- **Q9 closed as (ii)**: the profile is a generator dimension; consumer renderings go under `canonical/_consumer-output/` and are guarded. → Req 9, 9.5, 12
- **Q5 filtered-by-derivation** + its residual. → Req 14.8–14.9
- **Gates 4a/4b** (unconditional order U1→U2→U3→U4→U5; drop the steering/governance copy). **Gate 5** (no prior). **Q6 lean.** **Q7 dual-publish kept.** → design-outline.md settle record; Req 26.3, 14.4, 6
- **19A copy table, root-policy table, posture split**; init refuses in a born repo by default (L3-B2). → Req 19A, 15A.3
- **15A joining path, 15B vocabulary**; the personal note is per-user-local (R18.5). → Req 15A, 15B, 18
- **Persona trio Q3, all eight agents + re-grounding + starter specs Q4, five-minute philosophical Q1.** → design-outline.md; Req 16, 22–24

### Scope boundaries

- **In scope**: every design.md component (C1–C32), the gates-and-sequencing section, the migration section, DD1–DD17, and the six input dispositions.
- **Out of scope**: WHAT the requirements say. Task decomposition, merge-unit boundaries, release count and tripwire thresholds (tasks round). The `.swift`/`.kt` disposition (Kenya/Data, tasks round).
- **Findings from measuring the substrate** (new to reviewers; please attack them) → design.md § Overview items 1–3:
  - `sync` already has a three-way baseline (Spec 111);
  - `sync`'s `MANAGED_DIRS` manages `src/tokens` and resurrects deleted files today;
  - CC has no `autoApprove` field, and `init` writes no `.mcp.json`.

### The six open design inputs — dispositions

| # | Input | Disposition | Where |
|---|---|---|---|
| 16 | Commit policy content | DECIDED: agent artifacts, MCP configs and sync manifest committed; `token-index/`, platform output and personal note regenerated or local | DD1, C24 |
| 17 | Non-birth emit name; `--re-scaffold` | DECIDED: `designerpunk attach`; `--re-scaffold` kept | DD4, DD5, C20 |
| 18 | Per-harness MCP approval | DECIDED in design (CC `permissions.allow` region + per-user trust; Kiro `autoApprove`). Shapes verified against live configs; **cold behavior verified in the U3 cross-target join run** | DD8, C8, C24 |
| 19 | 5A type-contract widening; value guidance | DECIDED: widened (contract version + enum members); guidance adopted, labelled as a reference | DD11, C7 |
| 20 | Golden unit list form | DECIDED: hand-authored JSON, provenance key, snapshot ban enforced by test | DD6, Testing Strategy |
| 21 | 10.S guard per-target shape | DECIDED: `describe.each` over `consumer-profile.yaml` targets, through each adapter; unit twin kept | DD7, C15 |

### Acceptance surface for the § 7.2 machinery (named, per the coordinator)

- **Lina's two R3 recipe sizings** (splitter: four behaviors; golden list: ~half a day, hand-authored) are the acceptance surface for C13 and DD6. **Lina: does C13 implement exactly the behaviors you sized, and nothing you did not?**
- **Stacy's design inputs 20/21** are the acceptance surface for DD6 and DD7/C15. **Stacy: do the golden-list process and the per-target run shape meet your inputs as stated?**
- **C3 falsification scheduling** → design.md § "Gates and sequencing". G1 comes at U2 step 4, after the splitter, spans and exemplar operative sets exist and before any triviality code. A paper pass on C18 during this round is optional, at Stacy's call.

### Per-reviewer index

- **Lina**:
  - C1 (init rewrite), C3 (resolver/runner, the type-level declaration test), C11, C13, C14 (the cc/kiro consolidation), C20 (compile lane, degradation), C21 (deletion + `SCAN_DIRS`), C22 (Q5 derivation), C27, and the Migration section (copied components shadowing updates).
  - DD2, DD10, DD14.
- **Ada**:
  - C1 (config generation), C2 (the ancestor walk; your clause (a)), C3 (the posture split; your clauses (b) and (c)), C4 (rewrite-at-copy, `Oklch` → public barrel), C5 (floor closure), C6 (brand re-key), C7/5A (name contract source, type-contract widening, value guidance).
  - DD10, DD11, DD17 (1.1 de-scoped; component tokens behind the component surface).
- **Stacy**:
  - C9 (publish rail, paste target), C15 (11.4 checker, tree containment), C16 (operative-set records, freshness check, confirmer evidence seam), C17 (signature format and valves), C18 (triviality floor), gates G1/G2, MIDPOINT carrier (proposed U2), C30/C31 (trio and conformance records).
  - § "What resisted" item 3 (seat authentication under one git identity).
- **Leonardo**:
  - C8 (per-harness MCP), C23 (install doc order, step-count front-matter), C24 (joining path, commit policy), C25 (starter specs at `specs/`), C26 (personal note), C27 (init UX), C32 (product query).
  - DD4 (`attach` — the naming decision most exposed to reviewer challenge), DD9 (19.7 emits `cc` by default), DD15.

---

## Design Feedback

*(Rounds below. Stamp format: `#### [AGENT R#]`. Reference artifact sections with `§`. Directed questions go in the asker's own section as `[@AGENT] …`. Scan and answer any `[@YOUR_NAME]` mentions before writing your own feedback.)*
