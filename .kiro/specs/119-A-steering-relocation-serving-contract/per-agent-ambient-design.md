# Per-Agent Five-Class Ambient-Set Design (Requirement 14 — design-only)

**Date**: 2026-06-29
**Spec**: 119-A — Steering Relocation & Serving Contract
**Task**: 9.1 (Architecture, Tier 3) — produces the typed `PerAgentAmbientDesign[]` artifact
**Status**: Design artifact (no running code) — 122's canonical input
**Agent**: Thurgood (Civitas steward / AXA design)

> **What this is.** The per-agent decomposed five-class ambient-set **design** for all 8 agents (Requirement 14). For each agent, every piece of ambient context is assigned to one of the five AXA classes — **formative / reflexive-principle / governance-as-law / ground-truth-manifest / capability-catalog** — using the Component-7 shape (`design.md` §7). This is the **design half** only: ground-truth-manifest *builds* and capability-catalog *generation* are **behind the severable seam** (→ 119-B/122) and are marked `design-only-*` accordingly. No manifest is built and no catalog is generated here.
>
> **Input-of-record (Req 14 AC5).** The per-agent content is *sourced* from `per-agent-ax-assessments.md` (the 8 worked assessments) and captured here as a design appendix — **not re-derived**. Where the input-of-record was silent or ambiguous, this artifact **flags** it (see § "Input-of-record gaps flagged, not invented") rather than inventing content.
>
> **Disposability (AXA §7).** Like the assessments, this artifact is a one-time design pass + **disposable input to 122**, not a maintained living map. It is NOT a hand-curated ambient map that ships to agents — it is the design 122 generates *from*. (That is exactly what keeps it on the right side of the "generate, don't curate" invariant — see § "Generate-don't-curate invariant".)

---

## The Contract (Component-7 shape, from `design.md` §7)

```typescript
type AmbientClass =
  | 'formative'
  | 'reflexive-principle'
  | 'governance-as-law'
  | 'ground-truth-manifest'   // design spec only; BUILD is behind the seam
  | 'capability-catalog';     // design spec only; GENERATION is behind the seam

interface AmbientMember {
  ref: string;                // doc id, manifest-design name, or catalog-entry name
  class: AmbientClass;
  rationale: string;          // why this class (silent-failure test for law, etc.)
  status119A: 'locked-always' | 'design-only-build-deferred' | 'design-only-gen-deferred';
}

interface PerAgentAmbientDesign {
  agent: 'ada' | 'lina' | 'thurgood' | 'leonardo' | 'sparky' | 'kenya' | 'data' | 'stacy';
  agentType: 'owner' | 'consumer' | 'differential-auditor';
  members: AmbientMember[];
}
```

### `status119A` semantics (the seam, expressed per-member)

| value | meaning | applies to |
|---|---|---|
| `locked-always` | stays ambient **now** in 119-A; its on-disk doc is in the locked always-set (Req 6 AC1) | formative, reflexive-principle, governance-as-law members |
| `design-only-build-deferred` | the manifest's **design** is specified here; its **BUILD** (generator/CI artifact) is severable → 119-B/122 (Req 14 AC3) | ground-truth-manifest members |
| `design-only-gen-deferred` | the catalog's **design** is specified here; its **GENERATION** (122 from canonical source) is severable → 119-B/122 (Req 14 AC4) | capability-catalog members |

> **Why no `locked-always` ground-truth-manifest or capability-catalog member exists in this artifact (by construction).** Per the seam (Req 8 AC8 / § "Severable Seam Partition"), 119-A produces the *design* of those two classes but builds/generates neither. Every ground-truth-manifest member therefore carries `design-only-build-deferred`; every capability-catalog member carries `design-only-gen-deferred`. Only formative / reflexive-principle / governance-as-law members are `locked-always`. This is the seam encoded in the data.

---

## Universal classes (formative + reflexive-principle) — Req 14 AC2

Per `agent-experience-architecture.md` §7 and `per-agent-ax-assessments.md` ("Cross-cutting patterns → Universal keep"), the **formative** and **reflexive-principle** classes MAY be treated as roughly universal across all 8 agents. They are defined once here and referenced (not re-listed) in each per-agent block.

| ref (doc id) | class | rationale | status119A |
|---|---|---|---|
| `personal-note` | formative | Shapes who the agent is / how it relates; inhabited not consulted; `Relevant Tasks: all-tasks` ⇒ triggered by no task ⇒ can only be ambient (AXA §3.1). | `locked-always` |
| `ai-collaboration-principles` | reflexive-principle | The collaboration spine, applied reflexively every task; deliberate Layer-1 compression that points to the on-demand `AI-Collaboration-Framework` (AXA §3.2). Also carries the certainty-calibration rule text per Req 6 AC5. | `locked-always` |

> **Per-agent variation that the input-of-record DOES record on top of the universal pair.** Several agents' assessments also keep **`core-goals`** (Leonardo, Stacy — formative/operational) and **`spec-feedback-protocol`** (Leonardo, Stacy — reflexive law) ambient. Those are included explicitly in the per-agent blocks where the assessment names them, rather than promoted to universal, because the input-of-record only names them for some agents. `core-goals`'s formative-vs-operational classification is an **open re-cut** (AXA §8.5) — flagged below, not resolved.

---

## Per-agent designs (`PerAgentAmbientDesign[]`)

Eight blocks follow, one per agent, each a `PerAgentAmbientDesign`. The universal formative + reflexive-principle pair (above) is included in each `members[]` for completeness (so each block is a self-contained 122 input), then the role-specific governance-as-law / ground-truth-manifest / capability-catalog members.

---

### 1. Ada — token pipeline (`agentType: owner`)

Source: `per-agent-ax-assessments.md` § "Ada — token pipeline (OWNER)".

| ref | class | rationale | status119A |
|---|---|---|---|
| `personal-note` | formative | Universal (see above). | `locked-always` |
| `ai-collaboration-principles` | reflexive-principle | Universal (see above). | `locked-always` |
| `token-governance` | governance-as-law | Autonomy levels gate nearly every token decision; on-demand failure is **silent** — Ada would exceed an autonomy boundary without realizing there was a gate to query. Passes the silent-failure discriminator (AXA §3.3). | `locked-always` |
| `manifest:ada-token-manifest` (DESIGN: **none-standing**) | ground-truth-manifest | **Design decision: no standing token-manifest.** `search_tokens` / `get_token_details` already serve the manifest's payload (token name → resolved values + per-platform names) fresh, on-demand, family-scoped; a standing snapshot would duplicate the MCP and re-introduce the §5.3 snapshot anti-pattern (AXA §3.4). The manifest's *design contract* is therefore "satisfied by the live MCP tools, NOT a built artifact"; divergence detection is a **computed** source→index audit script, not an ambient snapshot. `src/tokens` (~1.1MB), `src/validators`, `src/generators` trim to on-demand. | `design-only-build-deferred` |
| `catalog:ada` (DESIGN) | capability-catalog | Cue (triggered form): `WHEN you need token VALUES THEN use get_token_details / search_tokens — NOT src/tokens`. Plus the token-domain on-demand routing (Token-Quick-Reference, Rosetta-System-Architecture, the 14 `Token-Family-*` docs trim to on-demand). Generation by 122. | `design-only-gen-deferred` |

> **Ada-specific design notes (carried from the assessment, not invented):**
> - **Manifest-schema hard case flagged:** theme-varying tokens are the schema hard case for any future manifest design (assessment "Flags"). Recorded for 122 manifest-schema work; not resolved in 119-A.
> - **The leak in microcosm:** `ada.json` carries 27 resource entries (the over-provisioning the AXA reframe targets); the `resources` *decomposition* is severable (→ 119-B/122), only the relocation-break of doc entries was must-fix in Task 7.

---

### 2. Lina — component system (`agentType: owner`)

Source: `per-agent-ax-assessments.md` § "Lina — component system (OWNER)".

| ref | class | rationale | status119A |
|---|---|---|---|
| `personal-note` | formative | Universal. | `locked-always` |
| `ai-collaboration-principles` | reflexive-principle | Universal. | `locked-always` |
| `contract-system-reference` | governance-as-law | Canonical contract / concept-catalog names. **NOT** served as Application-MCP structured data, so a wrong contract name silently fragments the taxonomy — the on-demand failure is silent. Passes the discriminator (AXA §3.3). | `locked-always` |
| `manifest:lina-component-catalog` (DESIGN: **`get_component_catalog` IS the manifest**) | ground-truth-manifest | **Genuine manifest win.** The manifest's design contract = the component catalog (replaces force-loading `src/components` ~6.3MB / ~135,000 lines / 694 files, which had no cheap on-demand enumeration). `get_component_catalog` *is* the manifest payload; source stays on-demand (Read/Glob). **Faithfulness check is assembly-grain** (`get_component_full` + `get_component_health`), not catalog enumeration. The manifest's BUILD (any CI artifact wrapping the catalog) is severable. | `design-only-build-deferred` |
| `catalog:lina` (DESIGN) | capability-catalog | Component-domain on-demand routing (stemma-system-principles, Component-Development-Standards, Component-Quick-Reference trim to on-demand) + assembly-grain faithfulness verbs. Generation by 122. | `design-only-gen-deferred` |

> **Lina-specific design notes (carried, not invented):**
> - **Disanalogy with Ada (load-bearing for the manifest class):** components lacked cheap enumeration (manifest earns its place); tokens have it (manifest unnecessary). Do NOT generalize "manifest good" across owners (AXA §3.4).
> - **Flags routed to R3/122 (not 119-A):** `lina-prompt.md` `.web.tsx`→`.web.ts` scaffolding bug (34/34 web files are `.web.ts`); Component-Quick-Reference stale-status; Contract-System-Reference "117 vs 136 concepts" self-contradiction → ballot. These are content/staleness items, out of this design's scope.

---

### 3. Thurgood — governance / spec-standards / Civitas (`agentType: differential-auditor`)

Source: `per-agent-ax-assessments.md` § "Thurgood — governance / spec-standards / Civitas (DIFFERENTIAL AUDITOR)".

| ref | class | rationale | status119A |
|---|---|---|---|
| `personal-note` | formative | Universal. | `locked-always` |
| `ai-collaboration-principles` | reflexive-principle | Universal. | `locked-always` |
| `test-development-standards` | governance-as-law | Enforced reflexively on every test-touching task; on-demand fails silently (you don't know you're about to violate a test-standard). Passes the discriminator (AXA §3.3 worked law). | `locked-always` |
| `process-development-workflow` (git/commit core only) | governance-as-law | The assessment keeps the **git/commit core** of Process-Development-Workflow ambient (operational law applied reflexively at commit time). **Granularity flag:** this is a *section-grain* keep, but 119-A addresses at **doc grain** (section-ids deferred to Gap 7), so the whole doc moving to `manual` (Req 6 AC3) and the git/commit core staying ambient cannot both be expressed at doc grain in 119-A. Flagged below; designed here as a governance-as-law member with a section-grain caveat. | `locked-always` |
| `manifest:thurgood` (DESIGN: **collapses into catalog**) | ground-truth-manifest | **Differential-auditor pattern (AXA §7): the ground-truth-manifest class collapses into the capability-catalog.** Ground truth is **computed, not snapshot** — `governance-check.sh`, `validate-steering-metadata.js`, `scan-cross-references.sh`, `detect-affected-steering-docs.sh` run at audit time over 89 docs × 172 specs. A corpus snapshot would manufacture stale-authoritative data (§5.4). So the manifest's design = "no standing snapshot; the scripts ARE the provisioning." | `design-only-build-deferred` |
| `catalog:thurgood` (DESIGN) | capability-catalog | **Names the governance/audit scripts + WHEN to run them** (`governance-check.sh --full`, `validate-steering-metadata.js`, `scan-cross-references.sh`, `detect-affected-steering-docs.sh`) — these are bash instruments, invisible unless named. Plus the ~85%-trim on-demand routing (Process-Spec-Planning ~26,220 tokens, Process-Task-Type-Definitions, Completion-Documentation-Guide, AI-Collaboration-Framework [already trimmed], Test-Failure-Audit-Methodology, Test-Behavioral-Contract-Validation, Process-Cross-Reference-Standards, Process-File-Organization, Process-Hook-Operations). Generation by 122. | `design-only-gen-deferred` |

---

### 4. Leonardo — product architect (`agentType: consumer`)

Source: `per-agent-ax-assessments.md` § "Leonardo — product architect (CONSUMER / HUB)". The worked consumer/hub example.

| ref | class | rationale | status119A |
|---|---|---|---|
| `personal-note` | formative | Universal. | `locked-always` |
| `ai-collaboration-principles` | reflexive-principle | Universal. | `locked-always` |
| `core-goals` | formative | Named ambient in his assessment (formative/operational; the formative-vs-operational cut is an open re-cut — AXA §8.5, flagged below). | `locked-always` |
| `spec-feedback-protocol` | governance-as-law | Named ambient as **law** in his assessment (reflexively applied collaboration law). | `locked-always` |
| `cross-platform-vs-platform-specific-decision-framework` | governance-as-law | **His silent-failure law** — applied reflexively per screen; absent, he silently defaults web patterns onto iOS/Android (the canonical silent failure). Passes the discriminator (AXA §3.3 worked law). | `locked-always` |
| `start-up-tasks` | governance-as-law | Operational law (pre-task checklist); named ambient in his assessment. (Per Req 6 AC1 the operational checklists are governance-as-law overlaid, retained `always` in 119-A.) | `locked-always` |
| `manifest:leonardo` (DESIGN: **empty**) | ground-truth-manifest | **Consumer ⇒ no ground-truth-manifest claim (AXA §5.3 / §7).** Leonardo owns no source; the derived MCP index suffices. The manifest class is **empty by design** — recorded explicitly so 122 knows it is intentionally empty, not unspecified. | `design-only-build-deferred` |
| `catalog:leonardo` (DESIGN: **routing-dominant**) | capability-catalog | **Routing-dominant — "generate, don't *shrink*" (AXA §3.5 / §7 hub note).** Routing IS his verb, so the absorbed `agent-directory` routing is a first-class capability surface, not residual noise. Tools: `find_components` / `get_experience_pattern` / `validate_assembly` / `get_prop_guidance` + Product-MCP screen verbs. Commands: `npx designerpunk generate/validate/init/sync` + the Impeccable `detect.mjs`. ~60% on-demand trim (Quick-Reference/Readiness docs, consciously-invoked Process-* docs, platform-implementation-guidelines, Test-Development-Standards [not his]). Generation + Agent-Directory→catalog migration by 122 (Req 6 AC6 forward-reference). | `design-only-gen-deferred` |

> **Leonardo-specific flags (carried, not invented):** `leonardo.json` force-loads `Product-Token-Governance` **twice** (dedupe when `resources` are next touched — severable); `DesignerPunk-Systems-Overview` → re-cut as orientation reference (AXA §3.7 boundary, unresolved).

---

### 5. Sparky — web platform (`agentType: consumer`)

Source: `per-agent-ax-assessments.md` § "Sparky — web platform (CONSUMER)".

| ref | class | rationale | status119A |
|---|---|---|---|
| `personal-note` | formative | Universal. | `locked-always` |
| `ai-collaboration-principles` | reflexive-principle | Universal. | `locked-always` |
| `product-token-governance` | governance-as-law | Wrong-tier token selection fails **silently**. Passes the discriminator. | `locked-always` |
| `web-authoring-standards` | governance-as-law | His **strongest keep** — logical-properties / Web-Component rules, applied reflexively; on-demand fails silently. Worked law (AXA §3.3). | `locked-always` |
| `contract-system-reference` | governance-as-law | Named ambient in his assessment (canonical contract names; silent taxonomy fragmentation, same discriminator as Lina). | `locked-always` |
| `manifest:sparky` (DESIGN: **none — trim `dist/web` snapshots**) | ground-truth-manifest | **Consumer ⇒ no manifest (AXA §5.3).** MCP probe shows `get_token_details` / `search_tokens` **dominate** the flat CSS (value + formula + consumers + per-platform). Design = trim `dist/web/DesignTokens.web.css`, `dist/ComponentTokens.web.css`, `dist/browser/demo-styles.css` (the last defines **0 tokens** — demo chrome — trim entirely). `Token-Quick-Reference` already IS his right-sized manifest (on-demand). No standing snapshot. | `design-only-build-deferred` |
| `catalog:sparky` (DESIGN) | capability-catalog | **Biggest gap: his web build/test commands are named NOWHERE — add them.** (Specific command strings are NOT in the input-of-record — flagged below; the catalog *slot* is designed, the command capture is for 122/the build owner.) Generation by 122. | `design-only-gen-deferred` |

> **Sparky-specific flag (carried):** `Product-Token-Governance` double-loaded — dedupe (severable, with the `resources` decomposition).

---

### 6. Kenya — iOS platform (`agentType: consumer`)

Source: `per-agent-ax-assessments.md` § "Kenya — iOS platform (CONSUMER)".

| ref | class | rationale | status119A |
|---|---|---|---|
| `personal-note` | formative | Universal. | `locked-always` |
| `ai-collaboration-principles` | reflexive-principle | Universal. | `locked-always` |
| `product-token-governance` | governance-as-law | Token-first law (compressed cue, authoring-triggered); wrong-tier selection fails silently. | `locked-always` |
| `manifest:kenya` (DESIGN: **none — trim STALE `dist/ios` snapshots**) | ground-truth-manifest | **Consumer ⇒ no manifest (AXA §5.3).** Design = trim `dist/ios/DesignTokens.ios.swift` + `dist/ComponentTokens.ios.swift` — and they are **STALE (pre-Spec-094**: flat `Color.oklch` literals, no `{Name}Theme`/EnvironmentKey), contradicting his own prompt's `@Environment` theming contract (the concrete §5.3 anti-pattern). MCP is the faithful source. Snapshot bug routed → `task_3a3f1cf2` (not a 119-A fix). | `design-only-build-deferred` |
| `catalog:kenya` (DESIGN) | capability-catalog | **Under-provisioned slots to fill:** a named **iOS build/test command**, and an **iOS platform skill pack** (AXA §3.6 — the missing channel; Android has skills, iOS doesn't). The catalog must enumerate skills + activation cues. (Specific command/skill content NOT in the input-of-record — flagged below; slot designed, content for 122/build owner.) Generation by 122. | `design-only-gen-deferred` |

> **Kenya-specific flag (carried):** `Product-Token-Governance` double-loaded (`file://` + `skill://`) — dedupe (severable).

---

### 7. Data — Android platform (`agentType: consumer`)

Source: `per-agent-ax-assessments.md` § "Data — Android platform (CONSUMER)".

| ref | class | rationale | status119A |
|---|---|---|---|
| `personal-note` | formative | Universal. | `locked-always` |
| `ai-collaboration-principles` | reflexive-principle | Universal. | `locked-always` |
| `platform-implementation-guidelines` | governance-as-law | Named ambient as **law** in his assessment (platform-implementation rules applied reflexively). | `locked-always` |
| `token-quick-reference` | governance-as-law | Named ambient as **token-first selection law** in his assessment (silent wrong-tier selection). | `locked-always` |
| `manifest:data` (DESIGN: **none — trim STALE `dist/android` snapshots**) | ground-truth-manifest | **Consumer ⇒ no manifest (AXA §5.3).** Design = trim `dist/android/DesignTokens.android.kt` + `dist/ComponentTokens.android.kt` — **STALE pre-094** (theme-varying colors flattened to static `Oklch(...)`, no `Theme`/CompositionLocal) while MCP reports them `themeVarying: true`. Same bug, `task_3a3f1cf2`. MCP faithful. | `design-only-build-deferred` |
| `catalog:data` (DESIGN) | capability-catalog | **Skills already carried** (`edge-to-edge`, `adaptive`, `navigation-3`, `theming-styles`) — the catalog must **NAME them** + activation cues (AXA §3.6). **Under-provisioned:** a named gradle/Compose **build/test command**. (Specific command content NOT in the input-of-record — flagged below.) Generation by 122. | `design-only-gen-deferred` |

---

### 8. Stacy — product governance / QA (`agentType: differential-auditor`)

Source: `per-agent-ax-assessments.md` § "Stacy — product governance / QA (DIFFERENTIAL AUDITOR)".

| ref | class | rationale | status119A |
|---|---|---|---|
| `personal-note` | formative | Universal. | `locked-always` |
| `ai-collaboration-principles` | reflexive-principle | Universal. | `locked-always` |
| `core-goals` | formative | Named ambient in her assessment (formative/operational — same open re-cut as Leonardo, flagged below). | `locked-always` |
| `test-development-standards` | governance-as-law | Named ambient as **law** (enforced reflexively; silent failure). | `locked-always` |
| `spec-feedback-protocol` | governance-as-law | Named ambient as **law** (reflexively applied). | `locked-always` |
| `start-up-tasks` | governance-as-law | Operational law (pre-task checklist); named ambient in her assessment. | `locked-always` |
| `manifest:stacy` (DESIGN: **collapses into catalog**) | ground-truth-manifest | **Differential-auditor pattern (AXA §7).** Ground truth is **computed, not snapshot** — parity drift is **scheduled, not latent** (three platforms drift by physics). A parity *snapshot* would blind her to the live drift she exists to catch (§5.4). Design = "no snapshot; the audit commands ARE the provisioning." | `design-only-build-deferred` |
| `catalog:stacy` (DESIGN) | capability-catalog | **The real gap: her audit commands appear NOWHERE in her prompt — name them:** `npm run audit:mode-parity`, `npm run audit:theme-drift`, `npm run test:coverage`, `governance-check.sh` (run at audit time). Plus ~85% on-demand trim (Process-Spec-Planning ~105KB, Process-Task-Type-Definitions, Completion-Guide, Process-Development-Workflow, Process-File-Organization, Contract-System-Reference, Test-Behavioral-Contract-Validation, Product-Token-Governance). **Model contribution recorded:** her **jurisdiction-routing** ("whose finding is this?" — silent failure) is **governance-as-law**, distinct from **capability-routing** ("which tool?" — catalog) (AXA §3.5). Generation by 122. | `design-only-gen-deferred` |

---

## Coverage matrix (Req 14 AC1 — all 8 agents, all five classes)

| agent | agentType | formative | reflexive-principle | governance-as-law | ground-truth-manifest (design) | capability-catalog (design) |
|---|---|---|---|---|---|---|
| ada | owner | `personal-note` | `ai-collaboration-principles` | `token-governance` | none-standing (MCP serves it) | `catalog:ada` |
| lina | owner | `personal-note` | `ai-collaboration-principles` | `contract-system-reference` | `get_component_catalog` IS the manifest | `catalog:lina` |
| thurgood | differential-auditor | `personal-note` | `ai-collaboration-principles` | `test-development-standards` (+ git/commit core of `process-development-workflow`) | collapses into catalog (computed) | `catalog:thurgood` |
| leonardo | consumer | `personal-note`, `core-goals` | `ai-collaboration-principles` | `spec-feedback-protocol`, `cross-platform-vs-platform-specific-decision-framework`, `start-up-tasks` | empty (consumer) | `catalog:leonardo` (routing-dominant) |
| sparky | consumer | `personal-note` | `ai-collaboration-principles` | `product-token-governance`, `web-authoring-standards`, `contract-system-reference` | none — trim `dist/web` snapshots | `catalog:sparky` |
| kenya | consumer | `personal-note` | `ai-collaboration-principles` | `product-token-governance` | none — trim STALE `dist/ios` snapshots | `catalog:kenya` (+ iOS skill pack slot) |
| data | consumer | `personal-note` | `ai-collaboration-principles` | `platform-implementation-guidelines`, `token-quick-reference` | none — trim STALE `dist/android` snapshots | `catalog:data` (+ name Android skills) |
| stacy | differential-auditor | `personal-note`, `core-goals` | `ai-collaboration-principles` | `test-development-standards`, `spec-feedback-protocol`, `start-up-tasks` | collapses into catalog (computed) | `catalog:stacy` |

**All 8 agents covered; `agentType` assigned for each** (2 owners, 4 consumers, 2 differential-auditors — matching the three types the assessments derived).

---

## How the seam is handled (Req 14 AC3/AC4/AC6 + Req 8 AC8)

- **Ground-truth-manifest members** specify the manifest's **DESIGN** (what it must contain or that it is intentionally empty/MCP-served/computed) and carry `status119A: 'design-only-build-deferred'`. The **BUILD** (generator/CI artifact) is **not** produced here — it is severable → 119-B/122 (§ "Severable Seam Partition" row "Ground-truth manifest *build*").
- **Capability-catalog members** specify the catalog's **DESIGN** (commands/scripts, role activation cues, deferred-tool awareness, absorbed Agent-Directory routing per Req 6 AC6) and carry `status119A: 'design-only-gen-deferred'`. The **GENERATION** (122 from canonical source) is **not** produced here — severable → 119-B/122 (§ "Severable Seam Partition" row "Capability-catalog generation").
- **Formative / reflexive-principle / governance-as-law members** carry `status119A: 'locked-always'` — they stay ambient in 119-A and their on-disk docs are in the locked always-set (Req 6 AC1).
- Per Req 8 AC8, the relocation-integrity gate asserts **this design exists** but NOT that any manifest is built or any catalog generated. This artifact is the "design exists" object the gate points at.

### Generate-don't-curate invariant (Req 4 AC8) — honored

- **No manifest was built. No catalog was generated. No routing artifact was hand-curated** into an ambient map that ships to agents. This artifact is a **design** (122's input), not a committed catalog/manifest/routing artifact.
- The absorbed `agent-directory` routing is referenced as a **design slot for 122 to generate** (Leonardo's catalog), explicitly NOT hand-curated here — consistent with Req 6 AC6's forward-reference (lock Agent-Directory `always` now; generate-and-migrate in 119-B/122).
- **No interim hand-curation was required**, so no tracked 122-replacement-obligation-plus-owner receipt is needed for this artifact. (Had any been unavoidable, AC8 would require the obligation + a named owner; none arose.) The artifact itself is disposable input to 122 (AXA §7), which is the structural reason it is not the next permanent meta-guide.

---

## Input-of-record gaps flagged, not invented (Req 14 AC5 fidelity)

Per the working rule "flag rather than invent," the following are places where `per-agent-ax-assessments.md` was silent, ambiguous, or forward-referencing. None were filled with invented content; the design records the **slot** and defers the **content** to its owner.

1. **Named build/test/audit command *strings* are not in the input-of-record** for Sparky (web build/test), Kenya (iOS build/test), Data (gradle/Compose build/test), and Stacy (audit commands are named at the `npm run audit:*` grain but not fully enumerated). The assessments say these are the *gap* ("named nowhere") without supplying the exact command lines. **Designed the catalog slot; left the exact command capture to 122 / the relevant build owner.** Did not invent command strings.
2. **`task-completion-protocol` is a NEW always-doc (Req 6 AC2) that does not yet exist on disk** — it is created in the always-core lock (Task 8), sequenced separately. The assessments fold it under generic "identity" without naming it per-agent. It is therefore **not** listed as a per-agent member here (no agent's assessment names it individually); when Task 8 creates it as operational law, 122 will pick it up via the always-set, not via this per-agent design. Flagged so its absence here is understood as a sequencing artifact, not an omission.
3. **Thurgood's `process-development-workflow` keep is section-grain** ("git/commit core") but 119-A addresses at **doc grain** (section-ids deferred to Gap 7). Req 6 AC3 moves the whole doc to `manual`. These cannot both be expressed at doc grain in 119-A. Recorded the member with an explicit section-grain caveat; the doc-vs-section reconciliation is a Gap-7 / 122 concern, not invented here.
4. **`core-goals` formative-vs-operational classification is an open re-cut** (AXA §8.5). The assessments name it ambient for Leonardo and Stacy without firmly settling the class. Classified as `formative` here (the §3.1 reading), flagged as unresolved — not silently hardened.
5. **Orientation-reference boundary docs** (`designerpunk-systems-overview`, `civitas-system-overview`) map to **none** of the five classes cleanly (AXA §3.7, unresolved). The assessments retain them ambient as orientation but do not assign a class. They are **deliberately not forced into a five-class member** in any per-agent block (forcing would invent a classification the input-of-record explicitly leaves open). Flagged here; they remain retained-ambient orientation pending the silent-failure test (or a sixth "orientation" class).
6. **`resources` over-provisioning / dedupe items** (`ada.json` 27 entries; `Product-Token-Governance` double-loaded in leonardo/sparky/kenya) are recorded as flags, NOT actioned — the `resources` decomposition/dedupe is severable (→ 119-B/122). Carried, not fixed.

---

## Cross-references

- **Input-of-record:** `per-agent-ax-assessments.md` (the 8 worked assessments).
- **Model:** `agent-experience-architecture.md` §3 (five classes), §5 (named principles), §7 (per-agent AX surface).
- **Contract:** `design.md` §7 (Component 7 — the typed shape this artifact instantiates).
- **Requirement:** `requirements.md` Req 14 (this design), Req 6 (always-core lock + AXA overlay), Req 4 AC8 (generate-don't-curate invariant), § "Severable Seam Partition" (the per-surface seam), Req 8 AC8 (gate asserts design-exists, excludes build/generation).

*Design-only deliverable. No manifest built, no catalog generated, no hand-curated ambient map committed. Disposable input to 122.*
