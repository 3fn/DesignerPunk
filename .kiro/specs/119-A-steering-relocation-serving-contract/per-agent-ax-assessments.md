# Per-Agent AX Assessments (working-grain) — Draft

**Status**: 🟡 DRAFT — the worked input-of-record for Requirement 14 (the per-agent five-class ambient-set *design*). **Disposable input to 122**, not a maintained artifact (AXA §7).
**Date**: 2026-06-27/28 · Ada/Lina/Thurgood assessed in the deep dives; Leonardo/Sparky/Kenya/Data/Stacy in the R3 feedback round.
**How to read**: each agent's current `resources` decomposed into the five AXA classes (`agent-experience-architecture.md` §3) → **keep ambient / trim to on-demand / manifest / catalog**, plus flags. "Keep" = stays ambient in 119-A; "trim" = route on-demand (mostly 119-B/122 execution behind the seam — 119-A produces the *design*).

> Three agent *types* emerged: **owners** (own source → law + manifest), **consumers** (consume the system → no manifest, MCP-only, catalog-heavy), **differential auditors** (own no corpus → manifest collapses into catalog; ground-truth is computed, not snapshot).

---

## Ada — token pipeline (OWNER)
- **Keep ambient:** Personal Note (formative) · AI-Collaboration-Principles (reflexive) · **Token-Governance (law** — autonomy levels gate nearly every token decision; silent failure).
- **Ground-truth:** **No standing token-manifest** — `search_tokens`/`get_token_details` already serve name→resolved-values+per-platform-names fresh on-demand; a snapshot would duplicate the MCP (§5.3). Trim `src/tokens` (~1.1MB) to on-demand; divergence = a *computed* source→index audit script. **Trim `src/validators`, `src/generators`** (logic, no divergence story).
- **Trim → on-demand:** Token-Quick-Reference (routing table) · Rosetta-System-Architecture · the 14 `Token-Family-*` docs.
- **Capability catalog:** cue "for token *values* use `get_token_details`/`search_tokens`, **not** `src/tokens`."
- **Flags:** theme-varying tokens = manifest-schema hard case; `ada.json` carries 27 resource entries (the leak); interim hand-edit drift risk.

## Lina — component system (OWNER)
- **Keep ambient:** Personal Note · AI-Collaboration-Principles · **Contract-System-Reference / Concept Catalog (law** — canonical contract names; **not** served as App-MCP structured data, so a wrong name silently fragments the taxonomy).
- **Ground-truth:** **`get_component_catalog` IS the manifest** (replaces force-loading `src/components` ~6.3MB/~135,000 lines/694 files); keep source on-demand (Read/Glob). Faithfulness check is **assembly-grain** (`get_component_full` + `get_component_health`), not catalog enumeration.
- **Trim → on-demand:** stemma-system-principles · Component-Development-Standards · Component-Quick-Reference (routing table, **stale**).
- **Flags:** `lina-prompt.md` `.web.tsx`→`.web.ts` scaffolding bug (34/34 web files are `.web.ts`) → R3/122; Component-Quick-Reference stale status; Contract-System-Reference "117 vs 136 concepts" self-contradiction → ballot.

## Thurgood — governance / spec-standards / Civitas (DIFFERENTIAL AUDITOR)
- **Keep ambient:** identity + **Test-Development-Standards (law** — enforced reflexively) + the **git/commit core** of Process-Development-Workflow.
- **Ground-truth:** **computed, not snapshot** — `governance-check.sh`, `validate-steering-metadata.js`, `scan-cross-references.sh`, `detect-affected-steering-docs.sh` run at audit time over 89 docs × 172 specs. **Manifest class collapses into the capability catalog** (the scripts *are* the provisioning). Do NOT force-load corpus snapshots (manufactures stale-authoritative data).
- **Trim → on-demand (~85%):** Process-Spec-Planning (**26,220 tokens**) · Process-Task-Type-Definitions · Completion-Documentation-Guide · AI-Collaboration-Framework (**already trimmed**) · Test-Failure-Audit-Methodology · Test-Behavioral-Contract-Validation · Process-Cross-Reference-Standards · Process-File-Organization · Process-Hook-Operations.
- **Capability catalog:** name the governance/audit scripts + when to run them.

## Leonardo — product architect (CONSUMER / HUB — worked consumer example)
- **Keep ambient:** Personal Note · AI-Collaboration-Principles · Core Goals · Spec-Feedback-Protocol (law) · **Cross-Platform vs Platform-Specific Decision Framework (his silent-failure law** — applied reflexively per screen; absent → silently defaults web patterns onto iOS/Android) · Start Up Tasks · Agent-Directory (**as capability catalog** — see below).
- **Ground-truth:** **empty** — pure consumer, owns no source; the derived MCP index suffices; no manifest.
- **Capability catalog:** **routing-dominant** — routing *is* his verb (hand off → platform agents; escalate → Thurgood; etc.), so **generate, don't shrink** Agent-Directory. Tools: `find_components`/`get_experience_pattern`/`validate_assembly`/`get_prop_guidance` + Product-MCP screen verbs; commands: `npx designerpunk generate/validate/init/sync` + the Impeccable `detect.mjs`.
- **Trim → on-demand (~60%):** the Quick-Reference/Readiness docs (MCP serves live), the consciously-invoked Process-* docs, platform-implementation-guidelines, Test-Development-Standards (not his).
- **Flags:** `leonardo.json` force-loads **Product-Token-Governance twice** (dedupe); DesignerPunk-Systems-Overview → re-cut (orientation reference).

## Sparky — web platform (CONSUMER)
- **Ground-truth verdict:** **trim all of `dist/web/DesignTokens.web.css`, `dist/ComponentTokens.web.css`, `dist/browser/demo-styles.css`** — MCP probe shows `get_token_details`/`search_tokens` **dominate** the flat CSS (value + formula + consumers + per-platform). As a *consumer* he has no divergence-detection duty (§5.3). `demo-styles.css` defines **0 tokens** (demo chrome) → trim entirely.
- **Keep ambient:** **Product-Token-Governance (law** — wrong-tier token selection fails silently) · **Web-Authoring-Standards (law** — logical-properties / Web-Component rules, his strongest keep) · Contract-System-Reference. **Token-Quick-Reference already *is* his right-sized manifest.**
- **Capability catalog (biggest gap):** his web **build/test commands are named nowhere** — add them.
- **Flags:** Product-Token-Governance double-loaded (dedupe).

## Kenya — iOS platform (CONSUMER)
- **Ground-truth verdict:** **trim `dist/ios/DesignTokens.ios.swift` + `dist/ComponentTokens.ios.swift`** — and they're **STALE (pre-Spec-094**: flat `Color.oklch` literals, no `{Name}Theme`/EnvironmentKey), *contradicting his own prompt's `@Environment` theming contract*. Concrete §5.3 anti-pattern. **Bug routed → `task_3a3f1cf2`.** MCP is the faithful source.
- **Keep ambient:** token-first law; Product-Token-Governance (compressed cue, authoring-triggered).
- **Under-provisioned:** named **iOS build/test command**; an **iOS platform skill pack** (§3.6 — the missing channel; Android has skills, iOS doesn't).
- **Flags:** Product-Token-Governance double-loaded (`file://` + `skill://`).

## Data — Android platform (CONSUMER)
- **Ground-truth verdict:** **trim `dist/android/DesignTokens.android.kt` + `dist/ComponentTokens.android.kt`** — **STALE pre-094** (theme-varying colors flattened to static `Oklch(...)`, no `Theme`/CompositionLocal), while MCP reports them `themeVarying: true`. (Same bug, `task_3a3f1cf2`.)
- **Keep ambient:** platform-implementation-guidelines (law) · Token-Quick-Reference (token-first selection law).
- **Skills:** already carries native skills (`edge-to-edge`, `adaptive`, `navigation-3`, `theming-styles`) — the catalog must **name them** (§3.6).
- **Under-provisioned:** named gradle/Compose **build/test command**.

## Stacy — product governance / QA (DIFFERENTIAL AUDITOR)
- **Keep ambient (~6 of 15):** Personal Note · AI-Collaboration-Principles · Core Goals · **Test-Development-Standards (law)** · **Spec-Feedback-Protocol (law)** · Start Up Tasks.
- **Ground-truth:** **computed, not snapshot** — parity drift is **scheduled, not latent** (three platforms drift by physics); `npm run audit:mode-parity` / `audit:theme-drift` / `test:coverage` + `governance-check.sh` run at audit time. **Manifest collapses into catalog.** A parity *snapshot* would blind her to the live drift she exists to catch.
- **Trim → on-demand (~85%, ~9 of 15):** Process-Spec-Planning (~105KB) · Process-Task-Type-Definitions · Completion-Guide · Process-Development-Workflow · Process-File-Organization · Contract-System-Reference · Test-Behavioral-Contract-Validation · Product-Token-Governance.
- **Capability catalog (the real gap):** her audit commands appear **nowhere** in her prompt — name them.
- **Model contribution:** **jurisdiction-routing** (whose finding is this? = governance-as-law, silent failure) is distinct from **capability-routing** (which tool? = catalog) — AXA §3.5.

---
## Cross-cutting patterns (for 122 / the AX design)
- **Universal keep:** Personal Note (formative) + AI-Collaboration-Principles (reflexive).
- **Universal trim:** routing-table docs (Token-/Component-Quick-Reference) when force-loaded; AI-Collaboration-Framework (compression-duplicate of Principles).
- **Recurring bug:** `Product-Token-Governance` double-loaded in leonardo/sparky/kenya — dedupe when `resources` are next touched.
- **Recurring gap:** every consumer/auditor is **under-provisioned on a capability catalog** (build/test/audit commands named nowhere) and **over-provisioned on reference docs/snapshots**. That inversion is the AXA leak in microcosm.
- **Stale generated output:** `dist/{ios,android}` pre-094 → `task_3a3f1cf2`.

*Disposable input to 122. Cross-ref: `agent-experience-architecture.md` (model), `requirements.md` Req 14 (design requirement).*
