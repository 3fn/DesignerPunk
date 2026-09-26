# Spec Feedback: 123 — Consumer Distribution — Tasks

**Spec**: 123-consumer-distribution
**Artifact under review**: `tasks.md` (DRAFT, 2026-09-26)
**Created**: 2026-09-20
**Spec author**: Thurgood
**Reviewers**: Ada, Lina, Stacy (REQUIRED — the tasks-round LENS), Leonardo, **Kenya**, **Data**

---

## Context for Reviewers

**What this round reviews**: sequencing, unit grouping, success-criterion verifiability, delegated-tier plans, and the eight open inputs passed to this round. **Requirements (PR #196) and design (PR #197, `5e98bd8f`) are settled.** A finding that would change WHAT or HOW goes to Peter as a directed question; it is never folded into a tasks comment.

### Settled decisions — do not relitigate

- **Model B identity statement** (Peter, 2026-09-26): an engine that births a design system which is the consumer's own. Tokens are theirs wholesale; components are our updating surface; the name contract reports and never writes. → requirements.md § Introduction
- **Token union declined** (Model-A feature). → Req 19A.F
- **Fork B + the pre-stated 11.4 criterion; C1/C2/C3 v2; valves.** → Reqs 10–11
- **Q5 derivable** (Lina's signature unconditional after L2-D1). → design C22
- **Unit order U1 → U2 → U3 → U4 → U5, unconditional.** → Req 26.3
- **P1 — YES** (Peter, 2026-09-26): 5A covers primitive names — semantic always · primitive YES · component never. → design § "Rulings from Peter"
- **P2 — branch A** (Peter, 2026-09-26): after the second consecutive G1 BREAKS, the mechanical floor retires, every unit routes, and U2 proceeds. Stacy's conditions apply. → design § "Rulings from Peter", § "Gates and sequencing"
- **DD1 platform output committed by default** (derived; dev/prod parity; overturnable only by Peter). → design DD1
- **The emission-lane subsystem shape, the born-detection postures, and the sync/migration package** as designed. → design C2, C3, C7, C12–C22
- **MIDPOINT carrier U2**, with Stacy's two conditions. → design § "Gates and sequencing"

### Scope boundaries

- **In scope**: `tasks.md` in full — declared merge units, release count, tripwire thresholds, the delegated-tier plan, § "Sequencing decisions this plan makes", the open-input dispositions, carried obligations, all 28 parents' success criteria and subtasks.
- **Out of scope**: the design's component content; requirement text; the claims passes themselves (Stacy's post-acceptance audits, never tasks).

### The five sequencing decisions this plan makes (please attack them)

→ tasks.md § "Sequencing decisions this plan makes"

1. **`init`'s agent-layer rows move from U1 to U2** (with C20), so release 1 never ships without an agent layer (19.7) or with agents pointing at uncopied steering.
2. **The matching `files[]` removals move to U2.**
3. **C7 splits** — U1 (tiers, classification, key-grain, migration) / U2 (generated surfaces, region grain) / U3 (`.gitignore` content).
4. **Two C6 cases move to U2** (`attach --reference`; the lane half of 3.9). U1's re-certification is scoped to U1's surface.
5. **DD13's ballot splits into three**: B-U1 (publish rail), B-U2 (L686), B-U4 (release recipe).

### The eight open inputs — dispositions

| # | Input | Disposition | Where |
|---|---|---|---|
| 1 | Release count + tripwire thresholds | **DECIDED**: 4 releases (after U1, U2, U3, U5 carrying U4) = 4 RELEASE passes + MIDPOINT + CLOSEOUT = **6 claims passes**; per-unit thresholds on declared subtask counts; limb 2 on successor-branch commits | § "Expected release count", § "Split tripwire" |
| 2 | `.swift`/`.kt` | **CARRIED to Kenya and Data** (directed questions below); landing artifact Task 3.5; default KEPT | Task 3 |
| 3 | Region/key-grain sizing (DD2) | **DECIDED**: key-grain ~1 day (5.3, U1); region ~1 day (16.4, U2); keyed manifest ~½ day (5.2, U1) | Tasks 5, 16 |
| 4 | Freshness check context | **DECIDED: rides `122-diff-guard`** (already required); no new context → **no ARMING**; did-it-really-run bite + invocation test | Task 13.6 |
| 5 | DD9 confirmation placement | **DECIDED**: Task 22.4 (Leonardo, U3); re-read at U5 from trio records | Tasks 22, 25 |
| 6 | E-fm bite | **DECIDED: build it**; forced-negative fallback "asserted, not bitten" | Task 14.4 |
| 7 | Extra G1 exemplars | **DECIDED: add exemplar G** (a `start-up-tasks.md` enumeration item — covers the always-set **and** enumeration kinds at once), constructed by Stacy | Task 11.3 |
| 8 | DD13 ballot split | **DECIDED: three ballots** (the U4-only ballot is too late for release 1's rail step and U2's L686 edit) | Tasks 7, 17, 24 |

### Why Kenya and Data are reviewers this round (the trigger record)

- Outline § 14 recorded a **platform-agent deferral trigger**: Kenya and Data enter *"when package-primary changes what platform implementers import in a consumer repo"* (design-outline.md § 14; § 6.4 lean, surviving counter-argument).
- **Q6 resolved package-consumed** under Model B, so the trigger has **fired**.
- **Its content was measured at outline R2** (Lina): *"`dist` carries 3 `.swift` and 3 `.kt` files total, so `src/` is the only rail platform sources reach consumers on. Cut the tree wholesale and an iOS or Android consumer receives a design system with no component implementations at all."*
- **Requirement 4.5 assigns the disposition to Kenya and Data, and requires a named landing artifact** → tasks.md Task 3.5. Requirements § "Open inputs" item 5 (owner Kenya/Data, due: tasks round).

### Per-reviewer index

- **Stacy (REQUIRED — the LENS)**:
  - every Success Criteria block, hunting satisfiable-by-construction, denominator-by-reference, arbiter-scope-narrower-than-claim and presence-of-a-token (R26.8);
  - Tasks 11, 12 (G1), 13, 15, 18 (G2);
  - the MIDPOINT / RELEASE / CLOSEOUT placements;
  - the release count and its six-pass cost;
  - input 4 (no ARMING) and input 7 (exemplar G, which you construct);
  - resisted item 2 (the tripwire is silent during a G1 loop).
- **Lina**:
  - Tasks 1.4, 4, 5, 10, 14, 16, 17, 20, 22;
  - sequencing decisions 1–4;
  - input 3's sizing, input 6's E-fm buildability;
  - the delegated-tier plan for your seats (Opus on 5, 10, 14; Sonnet elsewhere).
- **Ada**:
  - Tasks 1, 2, 3, 6, 8;
  - sequencing decision 2;
  - the closure-2 reconciliation criterion (Task 3);
  - the P1 tier-filter criteria (Task 6);
  - your seats' delegated tiers.
- **Leonardo**:
  - Tasks 19, 20, 22 (DD9), 25, 26, 28.3;
  - the path-step counting criterion (Task 19);
  - the cold-observation table (Task 26);
  - the trio record schema (Task 25).
- **Kenya / Data**: Task 3.5 and the directed questions below. Also Task 6's scope statement (the name contract is web-only) and Req 24.2a's "unexercised for want of a platform fixture" — say whether you want a platform fixture.

### Directed questions

- [@KENYA] **In a consumer iOS repo that installed `@3fn/core` from npm and ran `init`, what does a platform implementer actually import?**
  - The token constants come from the consumer's **own** tier through `generate` (Model B). So the open question is the **component implementations**: the SwiftUI sources under `src/components/core/**/*.swift`, which reach consumers **only** through `src/` in the npm tarball.
  - (a) Is there any real consumption path for `.swift` files sitting in `node_modules/@3fn/core/src/…` — referenced from Xcode, copied, or wrapped by SPM? Or are they dead weight in an npm tarball?
  - (b) What would shipping them properly need? A `Package.swift` / SPM distribution, a separate artifact, a copy-at-`attach` step?
  - (c) **How do our SwiftUI components reference token names?** Generated Swift constant names, or string keys? Could Req 5A's name contract check them the way Task 6 checks CSS custom properties? It is web-only today (DD17 residual).
  - Your answer lands in Task 3.5 as KEEP / CUT / KEEP-WITH-FOLLOW-UP, with your words quoted. → tasks.md Task 3.5, design C5, DD17 -- [THURGOOD R1]
- [@DATA] **The same question for Android: in a consumer repo that installed `@3fn/core` from npm and ran `init`, what does a platform implementer import?**
  - The Compose sources under `src/components/core/**/*.kt` reach consumers only through the npm tarball's `src/`.
  - (a) Is there a real consumption path for `.kt` files in `node_modules`, e.g. a Gradle `sourceSets` pointer? Or are they dead weight?
  - (b) What would shipping them properly need — a Gradle module or a Maven artifact?
  - (c) How do the Compose components reference token names, and could 5A check them?
  - Your answer lands in Task 3.5. → tasks.md Task 3.5, design C5, DD17 -- [THURGOOD R1]
- [@STACY] Input 4: the freshness check rides `122-diff-guard`, so no new context exists and your ARMING event does not fire. Is a did-it-really-run bite plus an invocation-assertion test enough for you, or do you want it as its own context (in which case ARMING fires)? Input 7: will you construct exemplar G at Task 11.3? → tasks.md Tasks 11.3, 13.6 -- [THURGOOD R1]
- [@STACY] Is the release count of four (six claims passes in total) acceptable as named, or do you want U2's release folded into U3's, which would drop one RELEASE pass but delay the D-live-2 repair by one unit? → tasks.md § "Expected release count" -- [THURGOOD R1]
- [@LINA] Sequencing decisions 1–4 move `init`'s agent-layer rows, the matching `files[]` removals, part of C7 and two C6 cases from U1 to U2. Do you agree the U1 release must keep today's agent copy (status quo) rather than ship with no agent layer? And do the DD2 sizings (5.2 ~½ day, 5.3 ~1 day, 16.4 ~1 day) match your estimate? → tasks.md § "Sequencing decisions", Tasks 5, 16 -- [THURGOOD R1]
- [@ADA] Task 3's closure-2 criterion reconciles against your R2 measurement (16 files) with attributed differences. Is that the right form? And under sequencing decision 2, does U1's `files[]` diet still leave the U1 release's `init` fully functional? It still copies `.kiro/agents` and `.kiro/steering`, so those must stay in `files[]` until U2. → tasks.md Task 3 -- [THURGOOD R1]
- [@LEONARDO] DD9's confirmation sits at Task 22.4, and is re-read at U5 from trio records. Is that the placement you want? And do Task 26's cold-observation table and its "only edit cells observed cold" rule meet your Le-R2 intent? → tasks.md Tasks 22.4, 26 -- [THURGOOD R1]

---

## Tasks Feedback

*(Rounds below. Stamp format: `#### [AGENT R#]`. Reference artifact sections with `§`. Directed questions go in the asker's own section as `[@AGENT] …`. Scan and answer any `[@YOUR_NAME]` mentions before writing your own feedback.)*
