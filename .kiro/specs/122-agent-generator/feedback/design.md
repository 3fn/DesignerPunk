# Spec Feedback: Agent Generator (122) — Design

**Spec**: 122-agent-generator
**Round**: Design R1 — COMPLETE 2026-07-06 (full roster; Thurgood abstains as author, incorporates as R2). All reviewers ran on Opus per the 2026-07-06 model-tier policy.
**Created**: 2026-07-05
**Artifact under review**: `design.md` (DRAFT — components C1–C13, DD1–DD13)

---

## Design Feedback

### Context for Reviewers

- Requirements are RATIFIED (Peter, 2026-07-05) — review the design's **mechanisms** for faithfulness to them; do not re-open requirement obligations. Every component carries a `Traces to:` line; the traceability table maps all 25 requirements.
- The deferred shapes requirements left to design are DECIDED in design.md § Design Decisions (DD1–DD13) — each carries a one-line rationale. Challenging a DD is in scope for this round; that is what they are surfaced for.
- Three **requirements-level findings** are flagged at the end of design.md (Req 1 AC1 × Req 16 AC1 tension; Req 23 AC1 arithmetic; the OB-1 record location). Reviewers should weigh in on all three — especially #1 (the CC declared-embed fallback), which touches the pipeline's core invariant.
- Seat-specific review targets: Ada — C7(a) predicate form (DD3), C1 `assert` schema; Lina — C8 sweep 5 semantics, her C10.2 signal mechanics; Data — C2.2 skills-map schema + sweep 2 discovery-contract assertions; Kenya — C1 `trims`/cue schema (his K2/K3 shapes), never-ported baseline (C10.1 step 2); Sparky — C7(d) command-currency semantics, run-context render; Leonardo — C8 sweep 6 directions + routes.agents schema; Stacy — C12 coverage-map format (DD5), C9 count-asserted registration, C10.1 evidence chain.
- Scope boundary: design-level altitude — schemas and algorithms, no code. Implementation file layout (`tools/agent-generator/` internals) is a tasks/execution matter.

## Verdicts

| Reviewer | Verdict | Held-firm item |
|---|---|---|
| Ada | APPROVE-WITH-AMENDMENTS (5) | D1/D2 — hollow predicates + ungoverned `pattern:` escape |
| Lina | APPROVE-WITH-AMENDMENTS (5) | L1 — server-grant leg as first-class FAIL |
| Data | APPROVE-WITH-AMENDMENTS (5) | 1 — check-8 removal-set vs artifact-path namespace |
| Leonardo | APPROVE-WITH-AMENDMENTS (4+4) | 1 — routes migrate to frontmatter at cutover |
| Stacy | APPROVE-WITH-AMENDMENTS (6) | S-D3/S-D6 — the no-op closure omits the governance corpus |
| Sparky (seat check) | CLEAR (2) | — |
| Kenya (seat check) | CLEAR (4) | — |

**Req 1×16 tension: 5–0 BLESS the probe-first attributed-embed fallback + tighten Req 1 AC1 to "no *unattributed, unguarded* snapshot"** — with three riders: (i) Stacy's condition — the bless is honest only after S-D3's closure fix; (ii) Ada's procedural catch — the AC1 reword is a **requirements erratum on RATIFIED text requiring Peter's sanction**; (iii) Leonardo's probe fix — the canary must live in the imported target file, or the probe cannot discriminate resolution from snapshot.

---

#### [ADA R1]

*(Design round. Live verification: `.kiro/agents/ada.json` carries **30** force-loaded resources — the "27-entry baseline" in C10.2 is stale.)*

**Verdict: APPROVE-WITH-AMENDMENTS.** CONFIRMED: C7 class (a) materializes AND owner-adjudicates the substance predicate (the A2 teeth held); C5 registry declaration-keyed with no authored input; C3.2 renders the per-theme-SET cue correctly.

- A-D1 — **`mustContain` can pass hollow**: topic-noun literals (`"token"`) prove the words survived, not the governing claim. Not asking for semantics (that's why `pattern:` exists) — DD3's rationale must name the trap: predicates SHOULD carry claim-distinguishing tokens (`"explicit approval"`, `"require"`), owner-adjudication as backstop not substitute. → C7 / DD3
- A-D2 — **the `pattern:` regex escape is the silent-degrade hole reopened**: a permissive pattern (`.*`) satisfies the AC while asserting nothing, and owners can't review regex. Require an inline `# asserts: <plain-English claim>` companion the owner reviews instead, + a validate-stage lint rejecting trivially-permissive patterns. → C7 / DD3
- A-D3 — **`assert` must key per-claim, not per-doc**: Token-Governance carries multiple co-located autonomy claims; one `mustContain` array passes if ANY survives. Multiple named entries per `id` (`section` + `mustContain` + `claim:` label) so a failure names which claim moved. → C1
- A-D4 — **Req 1×16 position (the invariant's original advocate): BLESS + reword — both.** The invariant kills the *silent* corpus-copy mode; the attributed, diff-guarded embed is not that mode, and the probe correctly prefers the structural form. Condition: the AC1 reword is a **requirements erratum for Peter** (requirements are ratified) — "I don't want my invariant weaponized to block the always-layer reaching CC subagents." → C11 / DD12
- A-D5 — **ENDORSE the member-vs-union fix, with corrections**: live baseline is 30 not 27 — C10.2 must record the observed baseline *from the committed config at cutover* and assert the shrink as a delta; and 2 of her expected ~3 members are always-set docs, so her per-agent-only count is ~1 — the member/union distinction must be stated crisply or "~3" is itself ambiguous. → C10.2

#### [LINA R1]

*(Live verification: component health = 34 — her "28 components" prompt line remains a live drift target; `lina.json` `allowedTools` = `["read","knowledge","@designerpunk-docs"]` — **no `@designerpunk-application` grant at all** while her prompt routes to its tools; 0 `.web.tsx`; concept-count 136 consistent, with historical figures at lines 49/113 that sweep 5's extractor must not trip on.)*

**Verdict: APPROVE-WITH-AMENDMENTS.** CONFIRMED: sweep 5's corrected-state-holds form matches her adjudicated no-standing version; sweep 2's discovery-contract resolvable as written; C11/DD12 probe-gating; fixture-in-guarded-surface.

- L1 *(held firm)* — **promote the server-grant leg to a first-class FAIL**: C7(c) checks tool ∈ subset but leaves "subset's server granted in the emitted config" in prose — her live config is the exact bug (subset could be faithful onto a config that can't reach the server). FAIL when `toolSubset` names a server absent from the emitted grant list. → C7 class (c) / C1
- L2 — **the volatile-fact lint is a floor, not "the enforcement point"**: catches `28 components`, misses "twenty-eight components" / noun-first orders. Frame as floor with the named false-negative class; the tool-routed-cue authoring rule is the backstop. → C1 rule 2 / DD11
- L3 — **sweep 5's concept-count extractor needs historical-context exclusions** (`Originally|historical|migration|source names`) or it false-positives the moment a provenance sentence is rephrased. Pin to the current-catalog assertion. → C8 sweep 5
- L4 — **sequencing gap**: C13's substrate closure does NOT include C12's provisioning, so the first cutover can run with Stacy non-operable. Gate C12 into C13, or state the deferral + back-fill explicitly. → C10.1 step 6 / C13
- L5 — **Req 1×16: BLESS + reword**; caveat — the probe result decides the shipped form, so don't make the first CC cutover the highest-risk agent. → C11 / DD12

#### [DATA R1]

**Verdict: APPROVE-WITH-AMENDMENTS.** CONFIRMED: skills-map canonical-keyed (D1 landed); sweep 2 both-directions with CC discovery contract, standing, prove-it-bites; check 8 is the D3≡S3 verifier as a mechanical check; run-context enum + JOB-1 carry traceable.

- D-A1 *(held firm)* — **check 8's removal set and the Android trim cues may live in different namespaces**: removals key on doc-id membership; his trims are file-path ARTIFACTS (`dist/android/*.kt`). If the baseline normalizes to doc-ids only, his most important cue is asserted but never verified. Baseline + manifest must include artifact-path members. → C8 check 8 / C1 `groundTruthManifest`
- D-A2 — **"non-empty description" is weaker than "intact"**: CC discovery is description-DRIVEN; assert the emitted description byte-equal to the canonical activation description. → C8 sweep 2
- D-A3 — **`knowledgeBases` globs have NO truth-check class** — a stale glob renders a fallback note pointing agents at nothing (a new uncovered silent-drift class). Add a glob-resolves assertion (≥1 match or adjudicated `expected-empty`). → C1 / C7
- D-A4 — **confirm the first-CC-generation demotion delta degrades to the Kiro-side baseline** for never-ported/partial agents, or the trims driving the cues never register as removals. → C10.1 step 2 / C8 check 8
- D-A5 — minor: verify the run-context annotation check fires on empty-string, not only missing-key. → C7 class (d)
- **Req 1×16: BLESS + reword** — "for CC subagents there is no runtime injection surface, so the fallback is the honest floor."

#### [LEONARDO R1]

**Verdict: APPROVE-WITH-AMENDMENTS (4 confirmations + 4).** CONFIRMED: `disposition: resolves|not-yet-ported` preserves the hub through 6/8→8/8 by construction; handoff routes are first-class frontmatter; LE2's set-inclusion landed; declared-but-empty carve-out structural.

- LE-D1 *(held firm)* — **his routes exist today as body PROSE, not the frontmatter class C7(b) checks**: pass-through would carry them verbatim, escaping the not-yet-ported check entirely — the LE1 mechanism would never bite on its own live instance. C10.1 step 1 must migrate inter-agent routes into `routes.agents` at cutover. → C10.1 step 1 / C1
- LE-D2 — **the delivery probe doesn't discriminate**: reciting a canary proves the text arrived, not that the `@`-import resolved as a live reference. Plant the canary in the imported TARGET file. Counter-argument recorded: if imports demonstrably don't load, drop the probe and ship embed-with-guard documented — the one bad outcome is an undiscriminating probe. → C11 / DD12
- LE-D3 — **Req 1×16: BLESS + reword** — staleness under the guarded embed is loud within the same PR, materially unlike the silent stopgap. → C11 / DD12
- LE-D4 — **extend the both-numbers discipline to his signal row** (~60% is per-agent-member, not union). → C10.2

#### [STACY R1]

*(Validation lane. Requirements RATIFIED — design mechanisms only. Verified the no-op input-closure against the live tree: the eight closure roots all exist as sources; `.kiro/hooks/complete-task.sh` is present and is correctly named as an input since C7(d) asserts its existence+executability.)*

**Verdict: APPROVE-WITH-AMENDMENTS.** The design carries my R2/R1 provisioning wins into concrete mechanism: C12 makes blank rows structural (S1 satisfied), C10.1 step 5 gives me a per-cutover run-artifact (S2 satisfied), step 6 pins my mandatory trigger, and C8 check 8 + DD8 give the demotion-cue verifier a real removal set (S3 satisfied). Four holes remain — three are calibration gaps where a mechanism is named but its bite is asserted rather than shown, and one is a genuine gameability seam in the no-op lock. None block; all are cheap to close before tasks.md.

- S-D1 — **C12 delivers the blank-row fix, but the join is under-specified where it matters most.** The "generated surface rows + declared check-glob join" is exactly my S1 fix and it lands. HOWEVER: the blank row is only honest if BOTH sides of the join are trustworthy. A check that declares an over-broad glob (`checks: [122-diff-guard]` matching `**`) makes every surface look guarded and produces zero blank rows — the map passes while guarding nothing specifically. Require each check's glob manifest to be **derived from the check's actual guarded-set computation** (C6's guarded set is already "derived from the cutover ledger + substrate artifacts" — the map must join against THAT derivation, not a hand-declared glob the check author writes independently). Otherwise the coverage map audits a second declaration that can drift from what the check really does. → C12 / DD5 / C6

- S-D2 — **The audit-command slots are named but not provisioned to a runnable form.** C12 lists `npm run audit:mode-parity`, `audit:theme-drift`, `test:coverage`, `governance-check.sh`, `verify-gate-registration.sh`, plus "the coverage-map audit itself." Two of those (`audit:mode-parity`, `audit:theme-drift`) I cannot confirm exist as `package.json` scripts, and "the coverage-map audit itself" has no named command at all — it is the one audit C12 invents and the one with no slot. Per C7(d)'s own currency rule, a `this-repo` command that isn't in `package.json` fails. Provision concretely: either (a) name the coverage-map audit as a real script (`npm run audit:coverage-map`) added by C12's provisioning task, or (b) mark the not-yet-existing ones as run-context `consumer-repo`/gap entries so they don't read as live in-repo commands I already have. Right now the slot that provisions ME is the vaguest one in the section. → C12 / C7(d)

- S-D3 — **C6's no-op lock CAN lie, and DD7's prove-it-bites doesn't cover the lie.** The input closure is a fixed path list. Anything that affects output but is NOT in the closure lets a stale lock pass green with wrong outputs. Concrete gap: the closure omits `always-set.yaml`'s resolved *content* — no, that's in `canonical/**`. But it omits the **corpus docs themselves** (the governance corpus resolved by `id` at generate time). A `mustContain` predicate in C7(a) reads live section text; a demotion cue embeds resolved section content (C11 declared-embed, `op: resolve, mode: embed`). If a governance doc under `governance/**` is edited, the resolved-embed output changes, but `governance/**` is NOT in the input closure — so both hashes still match the lock, the job early-exits green, and the embedded content silently goes stale. That is precisely the drift class C11's "kept fresh by C6" promises to catch, and the no-op lock defeats it. **Prove-it-bites form**: on a scratch branch, edit one embedded governance section under `governance/**` WITHOUT touching any closure root; assert the no-op lock forces a full run and the diff-guard fails. If it exits green, the closure is incomplete. Add `governance/**` (and any other resolve-by-id source root the pipeline reads) to the input closure, or make the lock key on resolved-content hashes for embed spans. This is the one item I'd hold firm on. → C6 / DD7 / C11

- S-D4 — **C10.1 step 6 pins my trigger unambiguously; step 5's evidence is specified, not gestured — confirmed.** My S2 is genuinely satisfied: step 5 commits `<agent>-cutover-report.md` with per-check result + CI run URL + recorded adjudications, and step 6 makes my recorded entry (independent re-derivation + coverage-of-coverage) a mandatory trigger on every first-generation cutover, gated on C12's provisioning task (the §4a non-operable flag from Req 22 AC4(c) is honored). One tightening: step 6 says my validation is "operable only after C12's provisioning task completes" — make the cutover report's Stacy-leg **explicitly render "NON-OPERABLE — C12 pending"** as committed text when it hasn't, so a skipped validation is visible in the artifact rather than an absent section. An absent section reads identical to an overlooked one; that is the same silent-vs-visible distinction C12's blank rows solve. → C10.1 step 6 / C12

- S-D5 — **Calibration hunt — the three vaguest mechanisms:** (1) **C7(d) "the command's owning seat" as adjudicator** — for a `consumer-repo` command the annotation is the only thing checked, but WHO confirms the annotation text is *correct* (not just present) is unstated; presence is mechanical, correctness is a seat judgment with no named trigger outside my cutover review. (2) **C12's check-glob manifest** (see S-D1) — "each check declares its guarded globs in a manifest the map joins against" names no format, no location, and no guard that the manifest matches the check's real behavior; it is the least-specified artifact in a section that is otherwise my strongest win. (3) **DD7's output-hash grain** — "sha256(outputs)" doesn't say whether it's a hash-of-hashes over the sorted output set or a single concatenation; a set-membership change (file added/removed) must move the hash, and that's only guaranteed if the manifest of output *paths* is inside the hashed input. Name it: the output hash covers the sorted (path, content-hash) pairs, so an added/dropped surface breaks the lock. → C7(d) / C12 / DD7

- S-D6 — **Req 1×16 tension — position from the false-positive lane.** An attributed + guarded embed is HONEST, with one condition. The attribution sidecar (C3.3, `op: resolve, mode: embed`) makes the embed non-silent — a reader/checker can see it is resolved-not-authored — and the diff-guard makes it non-stale ONLY IF C6 actually re-runs when the source changes. S-D3 is exactly the case where that second promise breaks: an embed guarded by a no-op lock that doesn't include the embed's source is attributed-but-NOT-guarded, which quietly breaks the invariant's promise. So my verdict is conditional: **the declared embed is honest iff S-D3 is fixed** (governance corpus in the closure, or embed-span content-hashing). With S-D3 open, the fallback form is a generate-time snapshot that the guard cannot prove it re-derives — the exact "self-contained prompt" Req 1 AC1 forbids, wearing an attribution label. I'd resolve the flagged tension by (a) fixing S-D3, then (b) tightening Req 1 AC1's wording to "no *unattributed or unguarded* snapshot" as the design already proposes — but the wording change is only load-bearing once the guard genuinely bites. Attribution without a live guard is a label on a snapshot, not an invariant. → Design § Flagged item 1 / C6 / C11 / C3.3

**Calibration self-check**: S-D3/S-D6 are the same finding from two lanes (mechanism gap + invariant promise) and are the one to hold firm on — they're structural, not polish. S-D1/S-D2/S-D5 are provisioning-completeness gaps a competent tasks phase resolves. S-D4 is a one-line rendering tightening. I found no faithfulness break between the RATIFIED requirements and the design; every R2 landing I traced (S1→C12, S2→C10.1 step 5, S3→C8 check 8, S4→C7(a), S5→DD13, S6→C13 item 4, S7→DD/traceability Req 25) is carried. The design is sound; close the closure.


#### [SPARKY R1] — seat check (web)

*(Live verification: all 8 command scripts resolve in package.json; `build:watch` confirmed tsc-only — the no-dev-server negative is grounded; the 125KB-gzip ceiling is a live literal (`SOFT_CEILING_KB = 125`) that has ALREADY drifted once ("raised from 100KB"); write scope matches `sparky.json`.)*

**Verdict: CLEAR.** First-generation trace holds end-to-end: schema carries the 8+3 with the three-value enum; C7(d) catches renamed scripts; first-generation-IS-cutover explicit; C11 honest about the one genuine unknown. Two items:

- SP-D1 — **volatile literals inside frontmatter `cue:`/`gap:` strings fall between the two mechanisms** (rule 2 scans body prose; class (d) checks script names) — and his 125KB note has a demonstrated drift history. Extend rule 2's scan to authored frontmatter string values, or tool-route the literal. → C1 rule 2 / C7 class (d)
- SP-D2 — **nothing asserts the dev-server absence STAYS true**: mark it intentional-and-unguarded in his acceptance signals so it reads as a decision, not an oversight. → C7 class (d) / C10.2

#### [KENYA R1] — seat check (iOS)

**Verdict: CLEAR.** First-ever iOS generation works: never-ported-is-cutover (C10.1 step 2), mandatory Stacy (step 6), zero-skills = sweep-2 PASS by construction, consumer-repo `gap:` commands representable, per-artifact hard-negative cues expressible. Four items:

- K-D1 — **confirm a `trims` entry can fire its `negative:` cue for an ORPHANED artifact** (his `dist/ios/DesignTokens.ios.swift`: untracked, removed in `835e33d1`, written by no script) that is neither a baseline removal nor a current output — a standing negative decoupled from the demotion-diff. One sentence in C1/C3.2 closes it. → C1 / C8 check 8
- K-D2 — **per-theme-set rides as free-text `note:` that no lint scans** — consider a structured `shape: per-theme-set` enum; the flattening failure he flagged lived exactly in trusted prose. → C1 `groundTruthManifest.trims[].cue`
- K-D3 — **standing platform-reality facts (151 `.swift`, no in-repo compile path) have no structured home** — confirm the intended form so a future regeneration doesn't re-fabricate an in-repo iOS build path. → C1 / C10.1 step 1
- K-D4 — **sequencing flag (converges with LINA L4)**: order C12's provisioning ahead of the first never-ported cutover so a debut seat doesn't eat the non-operable-Stacy window. → C10.1 step 6 / C12

---

### Round 1 synthesis (coordinator)

**5× APPROVE-WITH-AMENDMENTS + 2× CLEAR; no faithfulness break found by any reviewer; every ratified-requirements landing traced by its owner.** Structural findings, converged:

1. **The no-op closure is the round's load-bearing fix (S-D3 ≡ S-D6, held firm):** the input closure omits `governance/**` — the resolve-by-id source — so an embedded-law edit passes the hash lock green and the embed silently stales. Fix: closure includes every resolve-by-id root (or embed-span content hashing) + the edit-an-embedded-section prove-it-bites. **The 5–0 tension bless is CONDITIONAL on this fix.**
2. **Req 1×16 resolution (5–0):** bless probe-first attributed-embed; tighten Req 1 AC1 to "no *unattributed, unguarded* snapshot" — as a **requirements erratum requiring Peter's sanction** (Ada); probe discriminates via canary-in-target-file (LE-D2); first CC cutover ≠ highest-risk agent (L5).
3. **Frontmatter strings are unguarded prose (SP-D1 ≡ K-D2 ≡ L2):** rule 2's scan extends to authored frontmatter string values (`cue:`, `note:`, `gap:`), reframed as a floor with named false-negative classes; structured fields (`shape: per-theme-set`) beat prose where shape is load-bearing.
4. **Namespace/baseline seams (D-A1 held-firm ≡ K-D1 ≡ D-A4):** baseline + ambient-manifest include artifact-path members so trims participate in removals; `trims` entries fire negatives unconditionally (orphans included); never-ported baselines degrade to Kiro-only.
5. **Grant/route promotion (L1 held-firm ≡ LE-D1):** the server-grant leg becomes a first-class FAIL; inter-agent routes migrate from prose to `routes.agents` at cutover.
6. **Provisioning sequencing (L4 ≡ K-D4 ≡ S-D4):** C12 lands before the first never-ported cutover (gate into C13 or explicit deferral + back-fill); the Stacy-leg renders "NON-OPERABLE — C12 pending" as committed text.
7. **Predicate governance (A-D1/A-D2/A-D3):** claim-distinguishing token guidance; `# asserts:` plain-English companions + permissive-pattern lint on the `pattern:` escape; per-claim `assert` keying.
8. **Precision set:** byte-equal descriptions (D-A2); knowledgeBases glob assertion — a NEW uncovered class (D-A3); extractor historical exclusions (L3); observed-baseline-at-cutover + member/union both-numbers everywhere (A-D5, LE-D4 — note: live ada.json = 30, not 27); coverage-map join derived from real guarded-set computation (S-D1); named audit commands incl. `audit:coverage-map` (S-D2); output-hash grain = sorted (path, content-hash) pairs (S-D5); empty-annotation teeth (D-A5); dev-server absence marked intentional (SP-D2).

**For Peter at design ratification:** (1) the Req 1 AC1 erratum (reword on ratified requirements text — 5–0 recommended, needs your sanction); (2) confirmation the S-D3 closure fix landed before the bless is read as operative.
