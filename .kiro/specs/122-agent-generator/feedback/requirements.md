# Spec Feedback: Agent Generator (122) — Requirements

**Spec**: 122-agent-generator
**Round**: Requirements R1 — full roster (Ada, Lina, Data, Leonardo, Stacy, Sparky, Kenya; Thurgood abstains as author, incorporates as R2)
**Created**: 2026-07-05
**Artifact under review**: `requirements.md` (25 requirements, Groups A–F) at merge `ab76cb60` (PR #13)

### Context for Reviewers (as issued)
- Requirements-round rules: do NOT re-litigate settled outline decisions; review faithfulness, testability, completeness from your seat; outline-level conflicts flagged only as a safety net.
- Sparky/Kenya reviewed from their canonical Kiro prompts (no CC ports exist — the 122 condition itself) and carried the §2.8 input-of-record obligation: supply verified command content.
- Coordinator erratum: the round framing said "23 requirements" (a truncated listing); the document carries 25. Caught independently by Stacy, Sparky, and Kenya; all confirmed they reviewed the 25-requirement document.

---

## Verdicts

| Reviewer | Verdict | Items |
|---|---|---|
| Ada | APPROVE-WITH-AMENDMENTS | 5 |
| Lina | APPROVE-WITH-AMENDMENTS | 5 |
| Data | APPROVE-WITH-AMENDMENTS | 6 |
| Leonardo | APPROVE-WITH-AMENDMENTS | 4 confirmations + 4 amendments |
| Stacy | APPROVE-WITH-AMENDMENTS | 8 |
| Sparky (debut) | APPROVE-WITH-AMENDMENTS | 5 + command content |
| Kenya (debut) | APPROVE-WITH-AMENDMENTS | 5 + command content |

No REJECT. No outline-level conflict found by any reviewer. Full review texts follow verbatim; the coordinator synthesis is at the end.

---

#### [ADA R1]

- CONFIRMED (no change): resolve-by-id structural (Req 1.1/1.4, 10.2); registry declaration-keyed with carve-out (Req 7.1–7.2); no missing token-domain requirement (per-theme-set rationale + divergence audit routed to Rosetta, Req 25.1).
- A1 — **Section-addressing tension**: Req 3.2 emits doc-level `id` now, but Req 5.3 requires pointing at the Module-Resolution Contract *section* by id — inexpressible at first generation. State the interim form (doc-`id` + heading string, upgraded when `#sectionid` lands) so 5.3 is satisfiable and sweep-1/canonical-vs-truth know what to resolve. → Req 3.2 / 5.3
- A2 — **Governance-integrity needs its predicate sourced** *(the item Ada holds firm on)*: each governance-as-law reference in canonical source SHALL carry a declared substance assertion (the claimed predicate, e.g. "component tokens require explicit approval"), itself canonical content under the diff-guard — else Req 18.2(a) degrades to resolve-as-string. → Req 18.2
- A3 — **Req 1.3's two-class binary is falsifiable by template glue**: field-rendered artifacts (write-scope notes, rendered WORKFLOW_RULES, headings) are neither corpus-reference nor pass-through prose. Define "resolved reference" to include deterministic rendering of structured canonical fields — preserving the no-invented-substance invariant while making AC3 testable. → Req 1.3
- A4 — **Pin 23.1's measurement surface**: ambient-membership cardinality per Req 9's union, measured on BOTH emitted targets, which must agree. → Req 23.1
- A5 — **OB-1 ride-along**: leans route-to-OB-1-owner (negative-scope discipline), counter-argument recorded (trivial fix, coordination-hop cost); no token-law stake either way; Thurgood's call. → Req 25.2
- Candid self-calibration: A3/A4 are polish a competent design phase would likely resolve; **A2 is the one to hold firm on.**

#### [LINA R1]

*(Pre-stamp live verification: 0 `.web.tsx` in agents dirs; Contract-System-Reference reads 136 consistently at lines 5/49/113; assembly-grain verbs confirmed in the Task-9 spine.)*

- CONFIRMED: Req 10.2 catalog-IS-the-manifest; Req 10.3 assembly-grain verbs verbatim; Req 19.5 correctly assumes the POST-fix state. No outline conflict.
- L1 — **Sweep 5 must assert the corrected state HOLDS at cutover** (mechanically: zero `.web.tsx` in canonical source; single consistent concept-count), and state whether it stands post-cutover — else a re-entered defect passes a done-precondition reading. Counter-argument recorded: a standing per-defect list is itself the hand-list anti-pattern; if that wins, say so in the AC. → Req 19.1/19.4/19.5
- L2 — **Req 23.2's "consumer/auditor core" unmeasurable**: pin the expected lock-set by reference to `per-agent-ambient-design.md` § Lina; verify the ~29→on-demand claim as "zero `skill://` family/standards docs in the generated ambient layer." → Req 23.2
- L3 — **Declared-by-server ≠ granted-to-this-agent's-config** *(live instance: her Kiro config historically Docs-MCP-only while her law carries App-MCP verbs)*: extend canonical-vs-truth/sweep 6 — every generated cue's tool ∈ that agent's generated tool subset for that runtime (composes with Req 11.4). → Req 18.2 / 19.1(6) / 11.4
- L4 — **Volatile facts in pass-through prose are a drift class NO guard sees** *(live instance: her prompt's "28 components"; truth 34 — diff-guard blesses it, truth-check never inspects it)*: authoring rule — volatile system facts SHALL NOT be embedded in pass-through prose; state them as tool-routed cues (`get_component_health` IS the count). → Req 12 (new AC; cross-ref 1.2/1.3)
- L5 — **The minimal-fixture pass should be a standing pipeline test** (re-run on every pipeline change, same logic as Req 19.4), not one-time acceptance evidence. PR-sizing per Req 21.2 confirmed right from the highest-throughput seat. → Req 21.3

#### [DATA R1]

- CONFIRMED: mapping-table-not-regex (8.1); `skill://` transform (8.2); round-trip as sweep 2, standing per 19.4; his `dist/android`→`get_token_details` cue verbatim (12.1); run-context (12.2); `start-up-tasks` closed by the union rule (9.1/9.3, 19.5) with nothing re-opening it; config dispositions (11.2).
- D1 — **Re-key the mapping table `canonical_path → per-target path`**: under the neutral `skills/` root, `.kiro/skills/` is a generated output too; `kiro_path → cc_path` keying treats Kiro as source and leaves Kiro breakage silent. Extend round-trip to every emitted target. → Req 8.1/8.3, 19.1(2)
- D2 — **"cc_path exists" lacks teeth for the crux skill**: sharpen resolvability to the target runtime's skill-discovery contract (CC: flat dir + `SKILL.md` + intact activation description) — file-existence passes a skill that resolves nowhere at runtime. → Req 8.1 (touches 8.2)
- D3 — **Req 12.1/12.2 are obligations without a verifier** (invisible to diff-guard, canonical-vs-truth, and all seven sweeps): add a mechanical demotion-diff check (old ambient vs new → each removal has a matching cue) to the Req 19 set, or assign cue-coverage explicitly to Stacy's mandatory cutover review (22.3). → Req 12.1/12.2; 19.1 or 22.3
- D4 — **JOB-1 content needs a carry-into-canonical-source obligation**: content already authored by an owning agent in the round record SHALL be carried into canonical source at catalog authoring, traceably — else it strands in a feedback doc nothing regenerates from. → Req 21.1
- D5 — **Run-context annotations data-driven** (a run-context field in canonical source, parallel to 11.3's write-scope rule), not hand-copied prose. → Req 12.2
- D6 — Minor: the `/knowledge` fallback disposition is per-agent-domain (emitted from each agent's canonical knowledge-base declarations, not shared boilerplate). → Req 11.1
- Altitude self-check recorded: D1/D2 change what the ACs *assert* (WHAT, not HOW) — sweep 2's pass/fail semantics get frozen by these ACs.

#### [LEONARDO R1]

- CONFIRMED (no change): tri-MCP routing verbatim (10.4); declaration-keyed + declared-but-empty complete across all three homes (7.1/7.2, 18.2(b), 19.1(6)); demotion cues with his exact replacements (12.1); double-load covered by class (19.1(3)) — sweep-not-list is the right shape.
- LE1 — **Agent-routes are the uncovered reference class**: routing rows pointing at AGENTS (his hub function) have no truth-check analog — and the 5/8 CC-port gap is the live instance (his CC prompt routes to Sparky/Kenya/Stacy, absent in CC). Add agent-route resolution (target exists as a generated agent on the target runtime, OR carries an explicit not-yet-ported disposition) to Req 18's assertion classes or sweep 6. → Req 18.1 / 19.1
- LE2 — **"Primary" (10.4) needs a verifiable form**: verify against the Task-9 per-agent blocks — each consumer agent's generated catalog SHALL contain its designed App/Product cues (set-inclusion via sweep-4 machinery). → Req 10.4
- LE3 — **Prove-it-bites for the sweeps, not just the diff-guard**: each sweep demonstrated against a known-positive before trusted at cutover (sweep 3 has a free one: his verified `leonardo.json` double-load). → Req 19.2
- LE4 — **Name the owner for consumer-agent subsets/cues**: the consuming agent's seat owns its subset/routing decisions, Thurgood as consistency check — else "relevant domain owner" reads system-agent-only and Product-MCP cue adjudication stalls. → Req 7.5 / 11.4
- Optional: a consumer-side acceptance signal (his ~60% demotion + per-demotion cue presence + double-load resolved) alongside Ada's/Lina's in Req 23. Safety net: no outline conflict found.

#### [STACY R1]

*(Validation lane. Opened by refusing the coordinator's "23 requirements" framing; verified the document carries 25 and her targets matched.)*

- CONFIRMED: Req 22 faithful to her R2 in full — split, discriminator + tie-break verbatim, her exact trigger incl. the skip, and **provisioning as a REAL requirement** (22.4(b) tasks.md obligation; 22.4(c) non-operable flag). Req 19 ownership has teeth (19.2/19.3/19.4/19.5). Req 23 signals genuinely measurable; 23.4 blocks the "approximately" escape hatch. Negative scope clean (20.4 seam, 12.4 soft coupling, 16.4 fence); traced round obligations — none dropped.
- S1 — **"Coverage map is emitted" is gameable** *(her own precondition)*: define minimum content — every guarded surface mapped to the check that guards it, such that an unguarded surface is visible as a blank row. → Req 22.4
- S2 — **Coverage-of-coverage needs an evidence artifact**: a recorded run-artifact per cutover (CI run ref or committed sweep report on the cutover PR) + recorded owner adjudications — else her check reduces to trusting verbal assertion; authority is a record. → Req 19.2/19.3
- S3 — **"Every removal emits a cue" unverifiable without the removal set**: require the generator to emit the demotion delta cue-completeness is checked against. *(Converges with DATA D3.)* → Req 12.1
- S4 — **The substance check can silently degrade to id-resolution**: require the claimed substance be materialized as a pinned, checkable expectation in canonical source. *(Converges with ADA A2 — exact.)* → Req 18.2
- S5 — **13.2's "coordinated with 125's map" has no verification form**: state a checkable shape (recorded cross-reference; single named owner of the rule's wording) or demote to design guidance. → Req 13.2
- S6 — **Substrate-gate evidence must include sweep 2** (the skills round-trip guards the substrate's own crux content; "substrate proven" without it is incomplete closure). → Req 6.2 / 8.1
- S7 — **25.2 assigns a decision no reviewer owns**: route the OB-1 scanner call to Thurgood → Peter before requirements finalize. → Req 25.2
- S8 — **1.3's attributability has no inspector**: consider provenance markers or an attribution manifest so the two-operations invariant is mechanically checkable. Lower priority (17+18 partially compensate). → Req 1.3

#### [SPARKY R1] — debut (web platform seat)

- SP1 — **Command strings are snapshots too**: generated commands SHALL be verified against `package.json` scripts at regeneration (canonical-vs-truth substance class or a sweep) — else first generation enshrines the July-2026 snapshot (live precedents: lane semantics changed 07-03; the completion command changed 07-05). → Req 21.1 / 18.2
- SP2 — **Run-context vocabulary needs three enumerable values**: this-repo / consumer-repo / per-product (the third honestly marked "authored per product") so annotation checking is mechanical. → Req 12.2
- SP3 — **Web replacement cues must answer the CSS-form question**: the cue's tool must resolve the web-platform form (`--space-300`, `var()` chains via platform-web values), and Req 18's check should validate the cue answers the seat's actual question — a resolved unitless value still strands the seat. → Req 12.1 / 15.1
- SP4 — **His port must carry the specs-only in-repo write scope** (`sparky.json` allowedPaths = `.kiro/specs/**` + `docs/specs/**`); 11.3's derive-from-source rule protects the never-existed port from a hand-approximated scope note. → Req 15.1 / 11.3
- SP5 — Housekeeping: the 23-vs-25 count (see erratum above).
- **Input-of-record supplied**: 8 verified commands with cues + contexts (build, build:browser w/ 125KB-gzip note, path-scoped web tests, full suite, lint, `serve` static server incl. port + 24 demo pages + `file://` caveat, test:consumer, consumer-side `npx designerpunk generate`). **Named gaps**: NO dev server (build:watch is tsc-only — never generate a dev-server cue); no web-only test lane (path selection is the honest form); product-screen commands are per-product, unextractable here. *(Full table in the round record — carries into canonical source per D4's carry obligation.)*

#### [KENYA R1] — debut (iOS platform seat)

- K1 — **"Named gap" must count as valid authored content** for Req 21.1's gate: verified — no `.xcodeproj`, no `Package.swift`, no workspace exists in this repo; his build/test slot's honest fill is a run-context-annotated consumer-repo command class + in-repo pipeline commands. Otherwise the slot pressures the fabrication AC1 forbids. → Req 21.1
- K2 — **The iOS cue must be a hard negative-plus-positive, per trimmed artifact**: new evidence — `kenya.json:28` injects `dist/ios/DesignTokens.ios.swift`, which is ORPHANED (untracked, removed in `835e33d1`, written by no current script) AND even the freshly-generated root file lacks the 094 theming surface (theme Swift emits consumer-side only). So "prefer MCP" invites reading the newer-but-still-wrong file; the cue must read "do NOT read `dist/*.swift`" and be emitted for BOTH trimmed artifacts (the component-token file's verb may differ — possibly `get_component_full`). → Req 12.1
- K3 — **Theme-varying cue shape**: for theme-varying tokens the replacement cue returns the per-theme SET (a token is a per-theme set, not one value) — the iOS stale-snapshot failure was single-value flattening; don't re-import it at the prose layer. → Req 12.1
- K4 — **Sweep-4 adjudication owner ambiguous for consumer law-lock deltas** *(his config is the live test case: injects 4+ law docs as `skill://` vs a Task-9 lock of `product-token-governance` only)*: propose the ambient-layer agent's seat adjudicates MEMBERSHIP, the doc owner adjudicates SUBSTANCE (parallel to Req 18 AC3). Confirm sweep 3 covers his `Product-Token-Governance` double-load (`file://` line 30 + `skill://` line 42). *(Converges with LEONARDO LE4.)* → Req 19.2 / 15.2
- K5 — **"Regenerated" presupposes an existing port**: reword 15.1 to "generated (superseding the hand-maintained port where one exists)" and confirm 21.4's mandatory-Stacy trigger catches never-ported agents' FIRST generation as a cutover. → Req 15.1
- **Input-of-record supplied**: 4 verified in-repo commands (generate:platform-tokens w/ no-theming-surface note, the Swift-theme-types Jest suite, build incl. validate, audit:tokens) + the MCP read verbs; **named gaps**: no in-repo iOS build/test possible (all xcodebuild/simctl = consumer-repo class); 151 `.swift` files with no in-repo compile path; consumer-side generation is where theming Swift materializes; **zero iOS skills exist** → sweep 2 must treat an agent with legitimately no skills as a pass, not a coverage hole.

---

### Round 1 synthesis (coordinator)

**Seven for seven APPROVE-WITH-AMENDMENTS; zero outline conflicts; every prior-round item confirmed faithfully landed by its owner.** Thirty-eight items, converging on two structural findings and a set of seat-specific sharpenings:

**Theme A — Req 18 (canonical-vs-truth) is the load-bearing requirement, and the round grew its assertion-class set from two to five.** (1) Substance predicates must be *materialized* in canonical source (ADA A2 ≡ STACY S4 — the held-firm convergence); (2) **agent-routes** resolve on the target runtime or carry a not-yet-ported disposition (LE1, live instance = the CC-port gap); (3) **per-runtime grants** — cue's tool ∈ the agent's generated subset for that runtime (L3, live instance = her Docs-only Kiro config); (4) **command strings** verify against `package.json` at regeneration (SP1); (5) the existing live-tool class confirmed complete (declaration-keyed + carve-out, three homes). Plus L4's boundary finding: volatile facts in pass-through prose are invisible to ALL guards — needs an authoring prohibition, not a check.

**Theme B — obligations need named verifiers and evidence artifacts.** The demotion-cue rules have no verifier (D3 ≡ S3: emit the removal delta; add a demotion-diff check or assign to Stacy's cutover review); sweeps need prove-it-bites against known positives (LE3; sweep 3's free positive = the leonardo.json double-load); coverage-of-coverage needs a per-cutover run artifact (S2); the coverage map needs defined minimum content (S1); the fixture becomes a standing pipeline test (L5); substrate closure includes sweep 2 (S6).

**Theme C — the content gate matures.** Named-gap-as-valid-content (K1); already-supplied content gains a carry-into-canonical obligation (D4 — Sparky's and Kenya's tables + Data's JOB-1 are now all in scope of it); run-context becomes a three-value enumerable field, data-driven (SP2 + D5); zero-skills agents pass sweep 2 legitimately (K‑gaps).

**Theme D — ownership seams named**: consumer seats own their subset/routing and ambient MEMBERSHIP; doc owners own SUBSTANCE (LE4 ≡ K4); Thurgood consistency-checks.

**Smaller precision set**: A1 (interim section-address form), A3 + S8 (the third content class / attributability), A4 + L2 (+ LE-optional) pin the acceptance-signal measurement surfaces, L1 (sweep 5 asserts corrected-state-holds, with its recorded counter-argument), D1/D2 (canonical-keyed mapping table; runtime-discovery-contract resolvability), K2/K3 + SP3 (cue quality: hard negatives, per-artifact, per-theme sets, seat's-actual-question), K5 (first-generation wording), S5 (13.2 verification form), S7 + A5 (OB-1 → route to Thurgood→Peter; Ada leans OB-1-owner).

**For Peter (one decision surfaced)**: the OB-1 scanner-repoint call (Req 25.2) — bundle into 122 vs route to the OB-1 owner. Ada's lean: route out (negative-scope discipline); counter-argument recorded (trivial fix vs coordination hop). Lands at incorporation or ratification.

**Command content received and banked** (Sparky: 8 commands + 3 named gaps; Kenya: 4 commands + 4 named gaps; Data's JOB-1 from the outline round) — all subject to D4's carry-into-canonical obligation.
