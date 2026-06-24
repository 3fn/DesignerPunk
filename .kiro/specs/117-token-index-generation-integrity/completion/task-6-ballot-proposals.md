# Spec 117 Task 6.1 — Ballot-Measure Steering-Doc Proposals

**Date**: 2026-06-24
**Author**: Ada (proposes); Peter (approves)
**Requirement**: R7 AC1 — steering docs updated to reflect generation behaviors changed by this spec
**Process**: Ballot-measure model. Ada proposes, Peter approves item by item. No steering file is modified until Peter's approval is on record.
**Scope gate**: Per the ratified documentation waiver (Peter, 2026-06-13), this spec changes generation *behavior*, not token vocabulary. These proposals are behavioral-accuracy updates to existing sections only — no new token-family docs are created.

---

## Summary of proposals

| # | Doc | Section (MCP sectionId) | One-line description |
|---|-----|------------------------|---------------------|
| P1 | Rosetta-System-Architecture | OKLCH Color Pipeline — OKLCH Architecture diagram (s2) | Token-index entry: "OKLCH metadata on composed entries" → mode-aware OKLCH with shadow exception |
| P2 | Rosetta-System-Architecture | Token Pipeline Architecture — Stage 5: Generation (s13) | Add token-index as a named output of the generation subsystem |
| P3 | Rosetta-System-Architecture | Token Pipeline Architecture — Stage 6: Platform Output (s14) | Remove three `dist/BlendUtilities.*` lines that are never generated (N1 / Spec 117 finding) |
| P4 | Rosetta-System-Architecture | Component Token Integration — Component Token Flow diagram (s15) | Component-token loading: gate is source presence, not `tokenSourceMode` |
| P5 | Token-Quick-Reference | Mode-Aware Token Lookup — Context Resolution subsection (s3) | Theme-varying definition in the index: base light/dark diff, not registry-wide union |

Counter-argument for each proposal is included below. Peter: approve (check the box), modify (annotate), or reject (mark rejected + reason) each item independently.

---

## P1 — RSA: OKLCH Color Pipeline — token-index entry in the Architecture diagram

**Doc**: `.kiro/steering/Rosetta-System-Architecture.md`
**Section**: `## OKLCH Color Pipeline` → `### OKLCH Architecture` diagram
**MCP sectionId**: `s2`
**Requirement driving change**: R3 (token-index OKLCH color path, Task 3)

### Rationale

The OKLCH Architecture diagram's PLATFORM GENERATION block ends with:

```
│       └── Token-index: OKLCH metadata on composed entries                   │
```

This description was accurate for the *old* behavior (the index read a single collapsed composed value). After the R3+R5 spine fix, the index reads the **mode-resolved** OKLCH source — the same source that produces `dist/DesignTokens.web.css`. It now carries mode-aware OKLCH (light and dark resolved values) plus `{hue, lightness, chroma}` channels. The phrase "composed entries" implies single-mode composition; it also misses the shadow-family exception (still rgba, not OKLCH — Spec 112 never migrated it).

### Current text

```
│       └── Token-index: OKLCH metadata on composed entries                   │
```

### Proposed text

```
│       └── Token-index: mode-aware OKLCH values (light + dark) + channels   │
│           (exception: shadow family remains rgba — not yet OKLCH-migrated)  │
```

**Counter-argument**: The diagram is already fairly dense. Adding two lines for what is arguably an implementation detail of one output artifact might be more clutter than signal for the diagram's primary audience (pipeline orientation). An alternative is to update only the prose below the diagram (Platform Output Formats table) rather than the ASCII art. If Peter prefers that, I can draft a table-row addition instead.

**Peter's decision**: [ ] Approve as written | [ ] Approve with modification: ________________ | [ ] Reject

---

## P2 — RSA: Stage 5: Generation — add token-index as a named subsystem output

**Doc**: `.kiro/steering/Rosetta-System-Architecture.md`
**Section**: `### Stage 5: Generation` (under `## Token Pipeline Architecture`)
**MCP sectionId**: `s13`
**Requirement driving change**: R3 + R5 (spine fix establishes token-index as a peer output of generation)

### Rationale

The Stage 5 diagram names four platform generators (Web, iOS, Android, DTCG/Figma) and `BlendUtilityGenerator`, but the **token-index generator** (`generateTokenIndex`) is not named anywhere in the generation subsystem description. Post-Spec-117, the token-index is a first-class peer of the platform generators: it receives the same `ModeResolvedTokens` the platform generators do, and it is the data source the Application MCP serves. An agent or developer debugging token-index output has no entry point in the current Stage 5 text.

### Current text (the Platform Format Generators block)

```
│   Platform Format Generators                                                 │
│   ├── WebFormatGenerator: CSS custom properties (OKLCH format)              │
│   │   └── Mode-aware: light-dark(lightVal, darkVal) when values differ     │
│   ├── iOSFormatGenerator: Swift constants (Color.oklch via ChromaKit)       │
│   │   └── Mode-aware: UIColor { traitCollection } when values differ       │
│   ├── AndroidFormatGenerator: Kotlin constants (Oklch().toComposeColor())   │
│   │   └── Mode-aware: name_light + name_dark when values differ            │
│   └── Location: src/providers/*FormatGenerator.ts                           │
```

And the **Entry Points** list at the bottom of Stage 5 (does not include the token-index generator):

```
**Entry Points**:
- Generation orchestration: `src/generators/TokenFileGenerator.ts`
- Web generation: `src/providers/WebFormatGenerator.ts`
- iOS generation: `src/providers/iOSFormatGenerator.ts`
- Android generation: `src/providers/AndroidFormatGenerator.ts`
```

### Proposed text

Add a new block after the Platform Format Generators block in the diagram:

```
│   Token-Index Generator                                                      │
│   ├── generateTokenIndex: token-index/primitives.yaml + semantics.yaml     │
│   │   + components.yaml (Application MCP data source)                       │
│   ├── Receives ModeResolvedTokens (same shared source as platform gens)     │
│   └── Location: src/generators/generateTokenIndex.ts                        │
```

And add to the Entry Points list:

```
- Token-index generation: `src/generators/generateTokenIndex.ts`
```

**Counter-argument**: The Stage 5 diagram focuses on *platform* generation (outputs consumed by products/platforms). The token-index is a tooling/MCP artifact, arguably a separate concern. If the doc's purpose is "understand the platform output pipeline," tucking the index in here might confuse scope. An alternative home is a new "Token-Index Output" subsection alongside Stage 6, or a note in the Subsystem Entry Points Summary table. I lean toward including it in Stage 5 because the `ModeResolvedTokens` shared-source relationship is Stage 5 architecture — but I flag this as genuinely ambiguous.

**Peter's decision**: [ ] Approve as written | [ ] Approve with modification: ________________ | [ ] Reject

---

## P3 — RSA: Stage 6: Platform Output — remove non-generated BlendUtilities listings

**Doc**: `.kiro/steering/Rosetta-System-Architecture.md`
**Section**: `### Stage 6: Platform Output` (under `## Token Pipeline Architecture`)
**MCP sectionId**: `s14`
**Requirement driving change**: Spec 117 finding N1 (BlendUtilities not generated); flagged per task description; tracked in `.kiro/issues/2026-06-13-blendutilities-not-generated.md`

### Rationale

The Stage 6 Platform Output diagram lists these three files as outputs of `generate`:

```
│   ├── BlendUtilities.web.css    (Web blend functions)                       │
│   ├── BlendUtilities.ios.swift  (iOS blend functions)                       │
│   ├── BlendUtilities.android.kt (Android blend functions)                   │
```

The Task 1.2 audit (Spec 117 R1) confirmed these files are **never produced** by `generate` — absent in both the committed `dist/` and fresh worktree regeneration. The blend-write code path in `TokenFileGenerator.ts` exists but is dormant. The issue file (`.kiro/issues/2026-06-13-blendutilities-not-generated.md`) documents the finding and the two possible dispositions: (a) fix the dormant write path, or (b) remove the dead code and correct this doc entry. The issue is unresolved (no disposition decision yet). However, **the doc is currently inaccurate regardless of which disposition is ultimately chosen**: these files are not generated now, and the doc says they are.

This proposal corrects the current inaccuracy with a note that preserves the open disposition question.

### Current text (Stage 6 output listing)

```
│   dist/                                                                      │
│   ├── DesignTokens.web.css      (CSS custom properties)                     │
│   ├── DesignTokens.ios.swift    (Swift constants)                           │
│   ├── DesignTokens.android.kt   (Kotlin constants)                          │
│   ├── BlendUtilities.web.css    (Web blend functions)                       │
│   ├── BlendUtilities.ios.swift  (iOS blend functions)                       │
│   ├── BlendUtilities.android.kt (Android blend functions)                   │
│   ├── ComponentTokens.web.css   (Component token CSS)                       │
│   ├── ComponentTokens.ios.swift (Component token Swift)                     │
│   └── ComponentTokens.android.kt(Component token Kotlin)                    │
```

### Proposed text

```
│   dist/                                                                      │
│   ├── DesignTokens.web.css      (CSS custom properties)                     │
│   ├── DesignTokens.ios.swift    (Swift constants)                           │
│   ├── DesignTokens.android.kt   (Kotlin constants)                          │
│   ├── ComponentTokens.web.css   (Component token CSS)                       │
│   ├── ComponentTokens.ios.swift (Component token Swift)                     │
│   └── ComponentTokens.android.kt(Component token Kotlin)                    │
```

With a note added below the diagram (before the Entry Points block):

```
**Note — BlendUtilities**: `dist/BlendUtilities.*` are listed in legacy documentation but are **not produced by `generate`**. The `BlendUtilityGenerator` code path exists in `src/generators/` but is dormant (never exercised by the pipeline). Disposition is pending: either activate the code path or remove it. See `.kiro/issues/2026-06-13-blendutilities-not-generated.md`.
```

**Counter-argument**: If the intent is ultimately to *activate* the blend-utilities output (disposition A), this change will need to be reverted and re-updated, creating two steering-doc churn cycles. An alternative is to mark the lines as "(not yet generated — see issue)" rather than removing them, preserving the intended-state signal. I recommend removal + note (what the doc should reflect is *current behavior*, not intent), but flag the trade-off for Peter.

**Ambiguity flag**: The disposition of the BlendUtilities issue has not been decided. This is the only proposal where the *direction* of the correction depends on a pending design decision. Peter may want to decide that issue first, then approve P3. I've drafted the "remove + note" variant but can equally draft the "mark-as-pending" variant on request.

**Peter's decision**: [ ] Approve as written | [ ] Approve with modification: ________________ | [ ] Reject | [ ] Defer until BlendUtilities issue disposition is decided

---

## P4 — RSA: Component Token Integration — loading gate on source presence, not tokenSourceMode

**Doc**: `.kiro/steering/Rosetta-System-Architecture.md`
**Section**: `## Component Token Integration` → `### Component Token Flow` diagram
**MCP sectionId**: `s15`
**Requirement driving change**: R4 (component-token loading gate, Task 4)

### Rationale

The Component Token Flow diagram and surrounding prose describe how component tokens flow through the pipeline, but they do not describe the *loading gate* — the condition under which `generate` picks up component token sources. Before Spec 117, that gate was `tokenSourceMode === 'local'`, which silently dropped the entire component tier under the documented package-mode `generate`. After R4, the gate is **source presence** (convention dir `{tokenSourceRoot}/component/` and/or `componentTokenDirs`) — component tokens are loaded whenever sources exist, regardless of `tokenSourceMode`.

Nothing in the current Component Token Integration section mentions `tokenSourceMode` or the loading condition at all. The section also does not mention the "none found" warning (R4 AC3). An agent or developer in a package-mode consumer who authors component tokens and sees an empty `components.yaml` has no guidance in this section for why.

Additionally, the Component Token Authoring subsection's Entry Points reference `src/build/tokens/defineComponentTokens.ts` and `src/registries/ComponentTokenRegistry.ts` — both correct — but should also reference the load orchestrator as a debugging entry point.

### Current text (Component Token Flow diagram excerpt — Platform Generation block)

```
│   Platform Generation                                                        │
│   └── TokenFileGenerator.generateComponentTokens()                          │
│       ├── Web: --component-token-name: var(--primitive-reference)           │
│       ├── iOS: ComponentTokens.tokenName = PrimitiveTokens.reference        │
│       └── Android: ComponentTokens.tokenName = PrimitiveTokens.reference    │
```

And the **Key Characteristics** block in Component Token Authoring:

```
**Key Characteristics**:
- Explicit component and family association
- Required reasoning for each token
- References to primitive tokens (preferred) or family-conformant values
- Automatic registration with ComponentTokenRegistry
```

### Proposed text

Add a new block to the Component Token Flow diagram, before the existing "Component Token Definition" block (as the loading stage that precedes registration):

```
│   Source Discovery (gates loading)                                           │
│   ├── Loads component tokens whenever sources are present:                  │
│   │   · Convention dir: {tokenSourceRoot}/component/                        │
│   │   · Explicit dirs: config.componentTokenDirs                            │
│   ├── Independent of tokenSourceMode — loads in package mode and local mode │
│   ├── If no sources found: emits "No component token files found" warning   │
│   └── Location: src/cli/loadComponentTokens.ts                              │
```

And add one item to the **Key Characteristics** list:

```
- Loaded whenever sources are present (any tokenSourceMode); see loadComponentTokens.ts
```

**Counter-argument**: The Component Token Flow section is primarily about the authoring-and-registration lifecycle, not the CLI loading behavior. Mixing CLI loading semantics into what is largely a "how to define and register component tokens" section may blur the authoring audience (Lina / component authors) with the pipeline-debugging audience (Ada / pipeline consumers). An alternative is to add a separate prose block under `### Component Token Authoring` titled "Loading behavior" rather than modifying the flow diagram. Either placement is defensible; I flagged this for Peter to decide.

**Peter's decision**: [ ] Approve as written | [ ] Approve with modification: ________________ | [ ] Reject

---

## P5 — Token-Quick-Reference: theme-varying definition — distinguish index (base-scoped) from platform generators (registry-wide)

**Doc**: `.kiro/steering/Token-Quick-Reference.md`
**Section**: `## Mode-Aware Token Lookup (Spec 080)` → `### Context Resolution` subsection
**MCP sectionId**: `s3`
**Requirement driving change**: R5 (theme-varying rule, Task 3)

### Rationale

The Context Resolution subsection currently defines theme-varying tokens with:

> **Theme-varying vs static tokens**: The registry computes the union of all overridden token names across registered themes. Tokens in that set are theme-varying (generated as protocol/data class properties on iOS/Android, `data-theme` scoped on web). Everything else stays as static constants.

This definition is accurate for the **platform generators** (iOS/Android/Web — they use the registry-wide union across all themes). After the R5 fix, it is *inaccurate* for the **token-index** (Application MCP data source). The token-index `themeVarying` flag is computed from the **base light/dark resolved-value diff** — the 5 dist base-mode keys — not the registry-wide union (10 keys pre-fix, which also included WCAG-only overrides). The distinction is load-bearing: a developer or agent calling `get_token_details` and seeing `themeVarying: true` on a token needs to understand that this flag reflects base-mode light/dark variance, not registry-wide override presence.

The current paragraph also conflates the two without distinguishing the MCP-served index from the platform generators — which is particularly confusing because the Task-3 fix deliberately keeps *two separate sets*: the registry-wide Set (still fed to non-web platform generators) and the base-scoped set (fed to the index).

### Current text

```
**Theme-varying vs static tokens**: The registry computes the union of all overridden token names across registered themes. Tokens in that set are theme-varying (generated as protocol/data class properties on iOS/Android, `data-theme` scoped on web). Everything else stays as static constants.
```

### Proposed text

```
**Theme-varying vs static tokens**: Two distinct computations apply depending on the consumer:

- **Platform generators (iOS/Android/Web dist output)**: The registry computes the union of all overridden token names across *all* registered themes. Tokens in that union are theme-varying — generated as protocol/data class properties on iOS/Android, `data-theme`-scoped blocks on web. Everything else stays as static constants.

- **Token-index (Application MCP — `get_token_details` `themeVarying` field)**: A token is `themeVarying: true` in the index iff its resolved value differs between the **base light and base dark** modes (the dist base-mode set). This is independent of `config.themes` being empty, and deliberately excludes WCAG-only overrides that do not produce base-mode light/dark variance. The base-scoped set is computed from a shared resolved-value diff (`ModeResolvedTokens.baseThemeVaryingTokens`), not from the registry union.

These two sets coexist because the web platform emitter uses `light-dark()` from a resolved-value diff (matching the base-scoped definition), while non-web generators need the full registry-wide union to produce per-theme output. Do not conflate them.
```

**Counter-argument**: This is the highest-friction proposal. The added text is dense and introduces internal implementation detail (`ModeResolvedTokens.baseThemeVaryingTokens`) into a quick-reference doc whose purpose is agent routing, not pipeline internals. An agent using `get_token_details` just needs to know what the flag means, not *why* two sets exist. A lighter version: add only the "MCP `themeVarying` = base light/dark diff, not registry union" sentence without the implementation rationale. I've proposed the fuller version because the risk of a future agent or developer piping the wrong set is real (the anti-conflation sentinel in `Invariants.ts` is the automated guard, but doc clarity is the first line of defense).

**Peter's decision**: [ ] Approve as written | [ ] Approve with modification: ________________ | [ ] Reject

---

## Additional steering inaccuracies found (beyond the four assigned)

The MCP-served sections and grep sweeps surfaced the following beyond the four behaviors described in the task:

**Stage 5 BlendUtilityGenerator in prose vs. diagram (part of P3's scope)**
The Stage 5 diagram names `BlendUtilityGenerator` in the Utility Generators block. This is the same never-exercised code path as the Stage 6 listing. P3 (above) addresses only the Stage 6 *output listing*. The Stage 5 *generator description* also implies BlendUtilityGenerator is active. Disposition options: (a) annotate it as "(dormant — not exercised by current pipeline)" or (b) remove the Utility Generators block from Stage 5 pending the issue disposition. I have not made this a separate proposal because it is entangled with P3's pending disposition decision — but flag it for Peter's awareness.

**Stage 4: Mode Resolution diagram — `generateTokenFiles.ts` orchestration note**
The Stage 4 diagram says:

```
│   Orchestration (generateTokenFiles.ts)                                      │
│   ├── Level 2 first: produces light + dark token name sets                  │
│   ├── Level 1 second: resolves each set's names to OKLCH values            │
│   ├── Passes both resolved sets to generators                               │
│   └── Generators receive GenerationOptions with required semanticTokens     │
│       and darkSemanticTokens                                                │
```

Post-Spec-117, `generateTokenFiles` now *returns* `ModeResolvedTokens` (not just passes resolved sets internally). The `Generators receive GenerationOptions...` note is still accurate for the platform generators, but the return type change and the token-index's consumption of `ModeResolvedTokens` could be noted here. This is a minor precision gap rather than an inaccuracy — the description of what happens is not wrong, just incomplete. I am not proposing a formal ballot item for this because it is implementation-level detail and the Stage 4 section is not named in R7 AC1. Flagging for Peter's awareness.

**`Token-Quick-Reference.md` — theme-varying definition in Platform Theme Output table**
The Platform Theme Output table (immediately below the "Theme-varying vs static tokens" paragraph) is accurate as-is — it correctly describes the platform generator behavior. P5's proposed text addition does not conflict with the table; the table describes the output *mechanism* (CSS `data-theme`, Swift `@Environment`, etc.), not the computation. No change needed to the table.

---

## Document sections consulted

All of the following were queried via the docs MCP before drafting:

- `.kiro/steering/Rosetta-System-Architecture.md` — full document summary; sections: `OKLCH Color Pipeline` (s2), `Token Pipeline Architecture → Stage 4` (s12), `Stage 5` (s13), `Stage 6` (s14), `Component Token Integration` (s15), `Subsystem Entry Points Summary` (s18), `Overview` (s0)
- `.kiro/steering/Token-Quick-Reference.md` — full document summary; section: `Mode-Aware Token Lookup (Spec 080)` (s3)
- `.kiro/specs/117-token-index-generation-integrity/findings/decision-record.md`
- `.kiro/specs/117-token-index-generation-integrity/tasks.md`
- `.kiro/specs/117-token-index-generation-integrity/completion/task-3-completion.md`
- `.kiro/specs/117-token-index-generation-integrity/completion/task-4-completion.md`
- `.kiro/specs/117-token-index-generation-integrity/completion/task-5-completion.md`
- `.kiro/specs/117-token-index-generation-integrity/findings/118-closeout-note.md`
- `.kiro/issues/2026-06-13-blendutilities-not-generated.md`
