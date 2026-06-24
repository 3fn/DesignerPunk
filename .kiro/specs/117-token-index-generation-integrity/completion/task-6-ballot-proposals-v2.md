# Spec 117 Task 6.1 — Ballot-Measure Steering-Doc Proposals (v2)

**Date**: 2026-06-24
**Author**: Ada (proposes); Peter (approves). v2 re-architecture drafted by Thurgood from three domain consultations.
**Requirement**: R7 AC1 — steering docs updated to reflect generation behaviors changed by this spec
**Process**: Ballot-measure model. Proposals only — **no steering file is modified until Peter's approval is on record**. After approval, **Ada applies the edits** (these target token-domain docs).

---

## This v2 supersedes v1

`task-6-ballot-proposals.md` (v1) was **correct on facts** but carried **density problems**: it crammed behavioral/implementation detail into already-dense ASCII diagrams (Rosetta-System-Architecture) and into a tight quick-reference paragraph. Three domain consultations (Ada — Rosetta; Lina — components; Leonardo — token routing) ran and converged on a restructuring principle. This v2 re-architects all five proposals accordingly.

**v1 is retained as the consultation record** — do not delete it. It documents the original findings, the full counter-arguments, and the "additional inaccuracies" sweep. v2 is the version Peter votes on.

### Governing principle (from Ada's consult — adopted)

The RSA ASCII diagrams serve **two roles**: **orientation** ("what exists") and **reference** ("how it works"). Keep diagrams for **orientation only** — minimal, symmetric line weight, one line per entry. Push **reference/implementation detail** to **prose or tables below the diagram**, or to deeper sections. This fixes density *and* improves docs-MCP `get_section` retrieval: each concern gets its own addressable heading (the Spec 121 section-addressing finding).

### Correction to v1's sectionIds

v1 cited stale MCP `sectionId`s. The current index (re-queried for v2) assigns:

| Proposal target | v1 cited | **v2 verified** |
|-----------------|----------|-----------------|
| RSA OKLCH Architecture diagram | s2 | **s3** |
| RSA Stage 5: Generation | s13 | s13 (unchanged) |
| RSA Stage 6: Platform Output | s14 | s14 (unchanged) |
| RSA Component Token Flow | s15 | **s16** |
| RSA Component Token Authoring | — | **s17** |
| Token-Quick-Reference Context Resolution | s3 | **s7** |

v2 uses the verified IDs throughout. (Section addressing is best done by `path` + `heading` + `parent` per the Spec 121 guidance; IDs are provided as a convenience and are not stable across re-indexing.)

---

## Summary of proposals (v2)

| # | Doc | Section (verified sectionId) | Restructured shape |
|---|-----|------------------------------|--------------------|
| P1 | Rosetta-System-Architecture | OKLCH Architecture diagram (s3) | **One-line in-diagram correction** of the token-index entry (mode-aware OKLCH). Shadow-family rgba exception moves to the **Platform Output Formats table** below the diagram — not in the ASCII box. |
| P2 | Rosetta-System-Architecture | Stage 5: Generation (s13) | **Two-line diagram block** (name + location only) for the token-index generator. The `ModeResolvedTokens` shared-source relationship moves to the **prose Entry Points list** — not in the box. |
| P3 | Rosetta-System-Architecture | Stage 6: Platform Output (s14) | **Unchanged from v1** (remove 3 non-generated `dist/BlendUtilities.*` lines + one-line note). Doc-accuracy only. **Cross-reference updated** to the holistic blend issue. |
| P4 | Rosetta-System-Architecture | Component Token Authoring (s17) | **No diagram edit.** One prose line in the Authoring Entry Points; optional short "Loading behavior" prose addendum under its own heading. No Key Characteristics bullet, no flow-diagram block. |
| P5 | Token-Quick-Reference | Context Resolution (s7) | **Minimal two-bullet replacement** (~3 sentences) + "do not conflate" + pointer to RSA Stage 5. **Strips** `ModeResolvedTokens.baseThemeVaryingTokens` internals and the "why two sets coexist" rationale. |

Peter: approve (check the box), modify (annotate), or reject (mark rejected + reason) each item independently.

---

## P1 — RSA OKLCH Architecture diagram: token-index entry (one-line in-diagram correction; exception to prose)

**Doc**: `.kiro/steering/Rosetta-System-Architecture.md`
**Section**: `## OKLCH Color Pipeline` → `### OKLCH Architecture` diagram (sectionId **s3**)
**Requirement driving change**: R3 (token-index OKLCH color path, Task 3)
**Consult that drove the v2 restructure**: Ada

### What's wrong (correctness fact, unchanged from v1)

The diagram's PLATFORM GENERATION block ends with `Token-index: OKLCH metadata on composed entries`. This is **factually wrong post-R3**: "composed entries" implies single-mode composition, but the index now reads the mode-resolved source and carries light + dark resolved values plus `{hue, lightness, chroma}` channels.

### Current text (exact)

```
│       └── Token-index: OKLCH metadata on composed entries                   │
```

### Proposed text (v2 — one line, matching the weight of sibling generator entries)

```
│       └── Token-index: mode-aware OKLCH (light + dark resolved values + channels) │
```

**And** add one row to the **Platform Output Formats** table (sectionId s4, immediately below the diagram) to carry the shadow-family exception in prose rather than in the ASCII box:

| Platform | Source | Output Format | Example |
|----------|--------|---------------|---------|
| **Token-index** | `oklch(...)` mode-resolved | mode-aware OKLCH + channels per entry | `{ light, dark, hue, lightness, chroma }` |

…with a one-sentence note under the table: *"Exception: the shadow family remains rgba in the token-index — it was never migrated to OKLCH (Spec 112). All other color families carry OKLCH channels."*

### What changed from v1 and why

v1 added **two lines** to the ASCII box (one for the value shape, one for the shadow exception), worsening diagram density. Ada's consult: keep the box to **one line** (orientation — "the index emits mode-aware OKLCH"), and push the shadow-family exception (reference/implementation detail) into the **Platform Output Formats table + a prose note** where it's addressable on its own and doesn't bloat the diagram.

**Peter's decision**: [ ] Approve as written | [ ] Approve with modification: ________________ | [ ] Reject

---

## P2 — RSA Stage 5: Generation: name the token-index generator (two-line diagram block; relationship to prose)

**Doc**: `.kiro/steering/Rosetta-System-Architecture.md`
**Section**: `## Token Pipeline Architecture` → `### Stage 5: Generation` (sectionId **s13**)
**Requirement driving change**: R3 + R5 (spine fix establishes token-index as a peer output of generation)
**Consult that drove the v2 restructure**: Ada

### What's wrong (gap, unchanged from v1)

Stage 5 names the platform generators and the (dormant) `BlendUtilityGenerator`, but **not** the active `generateTokenIndex`. An agent debugging token-index output has no entry point here, even though the index is now a first-class peer output of generation.

### Current text (exact — Entry Points list at the bottom of Stage 5)

```
**Entry Points**:
- Generation orchestration: `src/generators/TokenFileGenerator.ts`
- Web generation: `src/providers/WebFormatGenerator.ts`
- iOS generation: `src/providers/iOSFormatGenerator.ts`
- Android generation: `src/providers/AndroidFormatGenerator.ts`
```

### Proposed text (v2)

Add a **two-line diagram block** (name + location only) after the Platform Format Generators block in the Generation Architecture diagram:

```
│   Token-Index Generator                                                      │
│   └── Location: src/generators/generateTokenIndex.ts                         │
```

…and carry the **relationship** in the prose Entry Points list (not the box):

```
- Token-index generation: `src/generators/generateTokenIndex.ts` — receives the
  same `ModeResolvedTokens` as the platform generators; data source for the Application MCP
```

### What changed from v1 and why

v1 added a **four-line** diagram block that embedded the `ModeResolvedTokens` shared-source relationship and the output file list (`primitives.yaml + semantics.yaml + components.yaml`) **inside the ASCII box**. Ada's consult: the box should carry **name + location only** (orientation); the "receives the same `ModeResolvedTokens` as the platform generators" relationship is **reference detail** and belongs in the **prose Entry Points list**. The `ModeResolvedTokens` line is dropped from the box entirely. This also resolves v1's own ambiguity flag about whether the index "belongs" in Stage 5 — it does, but as a lightweight pointer, not a co-equal diagram subsystem.

**Peter's decision**: [ ] Approve as written | [ ] Approve with modification: ________________ | [ ] Reject

---

## P3 — RSA Stage 6: Platform Output: remove non-generated BlendUtilities listings (kept as v1; cross-ref updated)

**Doc**: `.kiro/steering/Rosetta-System-Architecture.md`
**Section**: `## Token Pipeline Architecture` → `### Stage 6: Platform Output` (sectionId **s14**)
**Requirement driving change**: Spec 117 finding N1 (BlendUtilities not generated)
**Consult that drove the v2 restructure**: Ada — verdict: **keep as written**, this is a correctness fix and already minimal. Doc-accuracy only.

### What's wrong (correctness fact)

The Stage 6 output diagram lists three `dist/BlendUtilities.*` files as outputs of `generate`. The Task 1.2 audit (Spec 117 R1) confirmed these are **never produced** — absent in both committed `dist/` and fresh worktree regeneration. The write path exists but is dormant.

### Current text (exact — Stage 6 output listing)

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

### Proposed text (v2 — remove the 3 lines)

```
│   dist/                                                                      │
│   ├── DesignTokens.web.css      (CSS custom properties)                     │
│   ├── DesignTokens.ios.swift    (Swift constants)                           │
│   ├── DesignTokens.android.kt   (Kotlin constants)                          │
│   ├── ComponentTokens.web.css   (Component token CSS)                       │
│   ├── ComponentTokens.ios.swift (Component token Swift)                     │
│   └── ComponentTokens.android.kt(Component token Kotlin)                    │
```

…with a one-line note below the diagram (before the Entry Points block):

```
**Note — BlendUtilities**: `dist/BlendUtilities.*` are not produced by `generate`. The
`BlendUtilityGenerator` code path exists but is dormant. Disposition (activate vs. remove) is
tracked holistically in `.kiro/issues/2026-06-24-blend-system-architecture-and-oklch-alignment.md`.
```

### What changed from v1 and why

The **edit body is unchanged** from v1 (remove 3 lines + a note) — Ada confirmed it's already minimal and correct. The only change is the **cross-reference**: v1 pointed at `.kiro/issues/2026-06-13-blendutilities-not-generated.md`. Per the consult, code-disposition has moved to the holistic blend issue `.kiro/issues/2026-06-24-blend-system-architecture-and-oklch-alignment.md`; the older `2026-06-13` issue now points there (verified — the old file links forward to the new one). The v2 note cites the holistic issue directly. v1's "defer until disposition is decided" framing is also dropped: this is doc-accuracy only — the doc must reflect *current* behavior (not generated) regardless of the eventual disposition.

**Peter's decision**: [ ] Approve as written | [ ] Approve with modification: ________________ | [ ] Reject

---

## P4 — RSA Component Token Integration: loading gate is source presence (prose only; no diagram edit)

**Doc**: `.kiro/steering/Rosetta-System-Architecture.md`
**Section**: `## Component Token Integration` → `### Component Token Authoring` (sectionId **s17**)
**Requirement driving change**: R4 (component-token loading gate, Task 4)
**Consult that drove the v2 restructure**: Lina

### What's wrong (gap)

Nothing in Component Token Integration mentions the **loading gate**. Pre-Spec-117 the gate was `tokenSourceMode === 'local'` (which silently dropped the component tier under package-mode `generate`); post-R4 the gate is **source presence** — component tokens load whenever sources exist (convention dir `{tokenSourceRoot}/component/` and/or `config.componentTokenDirs`), regardless of `tokenSourceMode`, and a warning is emitted if none are found.

### Current text (exact — Component Token Authoring Entry Points)

```
**Entry Points**:
- Helper function: `src/build/tokens/defineComponentTokens.ts`
- Component token registry: `src/registries/ComponentTokenRegistry.ts`
```

### Proposed text (v2 — one prose line added to Entry Points)

```
**Entry Points**:
- Helper function: `src/build/tokens/defineComponentTokens.ts`
- Component token registry: `src/registries/ComponentTokenRegistry.ts`
- Loader (debugging): `src/cli/loadComponentTokens.ts` — sources discovered by presence
  (convention dir `{tokenSourceRoot}/component/` and/or `config.componentTokenDirs`),
  not `tokenSourceMode`; warns if none found
```

**Optional** (Lina flagged as nice-to-have, not required): a short prose addendum under its **own heading** to keep authoring vs. loading audiences separated:

```
**Loading behavior**: Component token sources are discovered by *presence*, not by
`tokenSourceMode`. If the convention dir `{tokenSourceRoot}/component/` exists, or
`config.componentTokenDirs` is set, those sources load in both package and local mode.
If no sources are found, the loader emits a "No component token files found" warning and
`ComponentTokens.*` output is empty.
```

### What changed from v1 and why

This is the **biggest** v1→v2 change. v1 inserted a **five-line "Source Discovery" block into the Component Token Flow diagram** *and* added a Key Characteristics bullet. Lina's verdict: **do not touch the flow diagram** — it's a clean *authoring* narrative (define → register → validate → generate), and loading-gate content is *debugging*, not authoring. Mixing CLI loading semantics into the authoring flow blurs the audience. v2 reduces this to **one prose Entry Points line** (the canonical, addressable home for "where do I look"), with an **optional** "Loading behavior" prose addendum under a separate heading. **No diagram edit. No Key Characteristics bullet.**

**Peter's decision**: [ ] Approve as written | [ ] Approve with optional "Loading behavior" addendum | [ ] Approve with modification: ________________ | [ ] Reject

---

## P5 — Token-Quick-Reference Context Resolution: theme-varying definition (minimal two-bullet replacement)

**Doc**: `.kiro/steering/Token-Quick-Reference.md`
**Section**: `## Mode-Aware Token Lookup (Spec 080)` → `### Context Resolution` (sectionId **s7**)
**Requirement driving change**: R5 (theme-varying rule, Task 3)
**Consult that drove the v2 restructure**: Leonardo — verdict: **minimal**.

### What's wrong (correctness fact)

The single "Theme-varying vs static tokens" paragraph defines theme-varying as the registry-wide union across themes. That's correct for the **platform generators**, but **inaccurate for the token-index / MCP `themeVarying` field** post-R5: the index flag is true iff a token's resolved value differs between base light and base dark — independent of `config.themes`, and excluding WCAG-only overrides.

### Current text (exact)

```
**Theme-varying vs static tokens**: The registry computes the union of all overridden token names across registered themes. Tokens in that set are theme-varying (generated as protocol/data class properties on iOS/Android, `data-theme` scoped on web). Everything else stays as static constants.
```

### Proposed text (v2 — two bullets, ~3 sentences, no pipeline internals)

```
**Theme-varying vs static tokens** — two distinct computations; do not conflate them:

- **Platform generators (iOS/Android/Web dist output)**: a token is theme-varying if its name
  appears in the registry-wide union of overridden tokens across *all* registered themes
  (generated as protocol/data-class properties on iOS/Android, `data-theme`-scoped on web).
  Everything else stays static.
- **Token-index / MCP `themeVarying` field**: `true` iff the token's resolved value differs
  between base light and base dark — independent of `config.themes`, and excluding WCAG-only
  overrides that produce no base-mode light/dark variance.

See Rosetta-System-Architecture § Stage 5: Generation for why these two definitions exist.
```

### What changed from v1 and why

v1's replacement was dense: it introduced the internal field name `ModeResolvedTokens.baseThemeVaryingTokens` and a full "these two sets coexist because…" pipeline-internals paragraph into a **routing** doc. Leonardo's verdict: keep Token-Quick-Reference a *routing* doc. v2 **strips** `baseThemeVaryingTokens` and the "why two sets coexist" rationale (those are pipeline internals — they belong in RSA, not here), keeps the two load-bearing facts as **two bullets** + an explicit "do not conflate", and replaces the rationale with a **pointer to RSA § Stage 5** for the "why". The Platform Theme Output table immediately below is unaffected (it describes the output *mechanism*, not the computation) — no change needed there.

**Peter's decision**: [ ] Approve as written | [ ] Approve with modification: ________________ | [ ] Reject

---

## Optional add-on items (NOT part of the 5 core ballot items)

These are the "additional inaccuracies" Ada flagged in v1 that the **structural principle** (orientation in diagram, reference in prose) would naturally fix. They are kept clearly separated — Peter can approve any, all, or none independently of P1–P5.

### A1 — RSA Stage 5: BlendUtilityGenerator dormancy (prose, not just Stage 6 output)

**Section**: `### Stage 5: Generation` (s13) — the **Utility Generators** block names `BlendUtilityGenerator` with no dormancy signal. P3 only corrects the Stage 6 *output listing*; the Stage 5 *generator* block still implies it's active.
**Structural fix**: keep the generator named in the diagram (orientation — the code exists), but add a one-line prose note below the diagram: *"`BlendUtilityGenerator` is present but dormant — not exercised by `generate`. See `.kiro/issues/2026-06-24-blend-system-architecture-and-oklch-alignment.md`."* No box edit. Pairs naturally with P3 (same issue, same cross-ref).
**Decision**: [ ] Include | [ ] Skip

### A2 — RSA Stage 4: `generateTokenFiles` return type (precision note in prose)

**Section**: `### Stage 4: Mode Resolution (Spec 080)` (s12) — the orchestration note says `generateTokenFiles` *passes* resolved sets to generators. Post-Spec-117 it also **returns** `ModeResolvedTokens` (the shared source the token-index consumes). This is a precision gap, not an inaccuracy.
**Structural fix**: one prose line below the Stage 4 diagram: *"`generateTokenFiles` returns `ModeResolvedTokens` — the shared resolved-value source consumed by both the platform generators and the token-index generator (see Stage 5)."* No box edit.
**Note**: A2 is the prose counterpart that makes P2's "receives the same `ModeResolvedTokens`" claim traceable to its origin. If P2 is approved, A2 is recommended for coherence.
**Decision**: [ ] Include | [ ] Skip

---

## Where the consults conflicted / judgment calls

- **No hard conflicts between the three consults.** Ada (governing principle + P1/P2/P3), Lina (P4), and Leonardo (P5) addressed disjoint surfaces and converged on the same "orientation in diagram, reference in prose" principle.
- **Judgment call — P1 table row shape**: Ada's verdict said "move the shadow-family rgba exception to prose / the Platform Output Formats table." The existing table is keyed by *platform* (Web/iOS/Android/DTCG). I added a **Token-index row + a prose note** rather than only a note, so the index appears as a peer output in the table that already enumerates outputs. If Peter prefers prose-only (no new table row), that's a clean "approve with modification."
- **Judgment call — P4 optional addendum**: Lina called the "Loading behavior" prose addendum *optional*. I included it as an explicit opt-in checkbox rather than dropping or forcing it, since the package-mode "empty components.yaml" failure mode (R4 AC3) is exactly the debugging case a future reader will hit. The one-line Entry Points addition is the required minimum; the addendum is the recommended-but-optional fuller version.
- **Judgment call — A2 coupling to P2**: A2 (Stage 4 return type) and P2 (Stage 5 names the index, "receives the same ModeResolvedTokens") describe two ends of the same data handoff. I flagged A2 as *recommended if P2 is approved* so the prose claim in P2 has a traceable origin, but kept it an optional add-on (Stage 4 is not named in R7 AC1).
- **sectionId drift**: v1's cited sectionIds were stale (re-indexing shifted them). v2 re-queried and corrected all six. Flagging so nobody applies an edit against the wrong addressed section. Recommend Ada address edits by `path` + `heading` (+ `parent`) per Spec 121 guidance rather than by ID.
