# Token-Index OKLCH Generation Gap + Related Generation-Integrity Findings

**Date**: 2026-06-13
**Discovered during**: Investigation of the v12 OKLCH migration's MCP impact (prompted by Peter noticing RGBA in Application MCP token data)
**Reporters**: Peter (observation), Thurgood (localization), Ada (root-cause investigation — Rosetta domain)
**Severity**: High — the Application MCP serves incorrect (legacy RGBA) color data to all consuming agents, and the OKLCH migration is silently incomplete for the token-index
**Type**: Pipeline / generation correctness
**Primary owner**: Ada (Rosetta pipeline)
**Status**: ✅ RESOLVED (2026-06-24) — Spec 117 certified non-provisionally. R3 (token-index OKLCH), R5 (theme-varying), and R4 (component-token loading) all fixed and verified via the documented-CLI trust gate (all-equal re-diff; P3/P5 invariants automated; MCP serves OKLCH + corrected component tier + theme-varying). Branch `spec-117-token-index-generation-integrity` (commits 35d311f5, 17783614, c615b7c3). Deferred sub-findings tracked separately: shadow OKLCH migration (`2026-06-24-oklch-shadow-color-family-not-migrated.md`), BlendUtilities N1 (`2026-06-13-blendutilities-not-generated.md`), MCP semantic resolvedValue (`2026-06-24-mcp-semantic-resolvedvalue-ignores-mode-overrides.md`).
> _Original status (historical): Open — diagnosed, no fix implemented (scoped as reviewed task), no commits made, working tree clean._

---

## Summary

The OKLCH color migration (Spec 112) migrated the CSS / iOS / Android generators but **did not migrate the token-index generator**. As a result, `token-index/primitives.yaml` still holds legacy RGBA color values, and the Application MCP — which reads the token-index — serves RGBA color data to every agent that queries tokens, despite the migration being considered complete (Spec 115 stabilization).

Investigation surfaced three related findings under one theme: **token-index / generation integrity is out of sync with both the OKLCH migration and the repo's current config.**

---

## Finding 1 (Primary): token-index generator never migrated to OKLCH

**Symptom**: `token-index/primitives.yaml` contains 216 RGBA color values, 0 OKLCH. The Application MCP serves these (e.g., `cyan300` = `rgba(0,240,255,1)`), even though the index is freshly built (`lastIndexTime: 2026-06-13T01:35Z`, status healthy). The semantic layer is correct (`color.action.primary` → `cyan300`); it is the primitive color *values* that are RGBA.

**Evidence (definitive)**: A forced fresh regeneration produced a **byte-identical** `primitives.yaml` (still 216 RGBA / 0 OKLCH), while the *same run* emitted OKLCH into `dist/DesignTokens.web.css` (120 `oklch()` matches). Same run, divergent formats → the token-index path was never migrated.

**Location**: `src/generators/generateTokenIndex.ts:117` emits `value: token.platforms.web.value` for primitives. For color primitives, that field is the legacy mode-aware RGBA object (`{ light: { base: 'rgba(...)', wcag: ... }, dark: {...} }`). The CSS/iOS/Android generators convert colors via a dedicated `formatOklchColor()` path that the token-index generator bypasses. The purpose-built helper `getOklchMetadata` (`OklchTokenIndexMetadata.ts`, written for this in Spec 112 R9) is **orphaned — never imported by `generateTokenIndex.ts`.**

**Impact**: The Application MCP (and any consumer Product MCP resolving color refs through the token-index) serves legacy RGBA color values. Agents making color decisions from MCP data receive pre-migration values. **Reindexing does NOT help** — the data source is RGBA by generation, not stale-in-memory.

**Recommended fix** (Ada, reviewed task — not yet implemented): Route color-family primitives through the OKLCH path in `generateTokenIndex.ts` (via composed-color `.resolved` / `formatOklchColor`, likely by wiring in the orphaned `getOklchMetadata`). After the fix: regenerate token-index → Thurgood reindexes the Application MCP → verify it serves OKLCH end-to-end.

---

## Finding 2: `npx designerpunk generate --force` fails (CLI tsx/ESM loader)

**Symptom**: `npx designerpunk generate --force` fails — the CLI's tsx/ESM loader rejects the config directory import (`import { defineConfig } from './src/config'`). Regeneration only completed via a `ts-node` CommonJS workaround.

**Impact**: The **documented `generate` command is broken via the standard CLI path** — consumer-facing. Consumers following the documented generation/upgrade workflow would hit this. It also blocks normal-path verification of the Finding 1 fix.

**Note**: Ada believes this is a separate, already-known June 10–11 CLI issue (cross-referenced below). Recorded here because it is load-bearing for verifying Finding 1 and is consumer-facing.

**Owner**: CLI / pipeline tooling.

### Diagnosis (2026-06-13, Spec 117 — confirmed, not fixed)

**Reproduced** via the documented CLI (`node bin/designerpunk.js validate`) in the audit worktree:
```
Failed to load designerpunk.config.ts: Directory import '.../src/config' is not supported
resolving ES modules ... Did you mean to import "./src/config/index.ts"?
```
**Root cause:** `designerpunk.config.ts:16` → `import { defineConfig } from './src/config';` is a **directory import**. tsx ESM does not support directory imports (`src/config/index.ts` exists but isn't auto-resolved). Same **class** as the RESOLVED April issue (`2026-04-08-cli-module-resolution.md`: "tsx ESM resolution requires `.ts` extensions") — an unpatched import line. **Fix is one line** (`'./src/config'` → `'./src/config/index.ts'`). The June `--force`-swallow issue is *separate* and not the config-load blocker; for verification we can invoke `node bin/designerpunk.js generate` directly, sidestepping npx.

**Crux for Spec 117 (does fixing it change our color fix?):** **No, by inspection.** The error prevents the CLI from *starting*; it does not touch config-*value* resolution. `src/config/index.ts` re-exports the same `defineConfig`/`loadConfig` the ts-node workaround used, so the documented CLI — once it boots — runs the identical `loadConfig` and resolves the identical config (`tokenSourceMode: 'package'`, `themes: []`). The audit's "provisional" stamp is about the CLI not *starting*, not divergent generation behavior. Residual uncertainty (~small): not yet confirmed by *running* a fixed CLI (diagnosis-only per Peter) that the generate command wires config→generation identically to the direct `runGenerate(true)` call — confirmable in minutes with the one-liner.

**Recommendation (pending Peter's scope decision):** fold the one-line config-import fix into Spec 117 as the Task 5.3 verification prerequisite — it gates certification, it's trivial, it's a known-class fix, and the documented `generate` is consumer-critical. Broader CLI polish (the `--force` rename, etc.) stays with the CLI cluster. Likely owner of the one-liner: Ada (resolved the April sibling).

---

## Finding 3: token-index inconsistent with a plain `generate` against current config

**Symptom**: A clean regeneration against this repo's current config produced changes beyond Finding 1:
- `components.yaml` emptied (217 → 0) — the CLI loads component tokens only in `tokenSourceMode: 'local'`, but this repo's config is `'package'` mode.
- `semantics.yaml` themeVarying flipped true → false — config has `themes: []`.

Ada restored both to HEAD; the working tree is clean.

**Implication**: The **committed token-index was not produced by a plain `npx designerpunk generate` against the repo's current config.** Either there are additional generation gaps (component-token loading in package mode; theme-varying computation with empty themes) or the committed index was partly hand-assembled. Either way, the committed token-index's provenance is unclear and its consistency with the generation pipeline is broken.

**Owner**: Ada (Rosetta pipeline) — review needed to determine whether this is a generation bug (package-mode component loading / theme-varying computation) or an artifact-provenance issue.

---

## Cross-References

- OKLCH migration: `112-oklch-color-migration`, `115-post-oklch-stabilization-cleanup`
- Orphaned helper: `OklchTokenIndexMetadata.ts` → `getOklchMetadata` (Spec 112 R9)
- Generator: `src/generators/generateTokenIndex.ts:117`
- Related June 10–11 pipeline cluster: `2026-06-10-oklch-pipeline-integration-incomplete.md`, `2026-06-10-post-v12-rgba-pipeline-cleanup.md`, `2026-06-10-oklch-generate-still-rgba.md`, `2026-06-11-semantic-colors-still-rgba.md`
- `116-sync-customization-safety` — drift-visibility open question (Q5) is reinforced by this finding.

---

## Pattern Note

This is the **third instance in a single investigation session (2026-06-12/13) of a generated artifact silently drifting out of sync with no signal** — alongside the consumer's promoted-token loss and the token-index RGBA staleness itself. It suggests a distinct need for **post-`generate` generation-integrity verification**: does generation produce internally-consistent output across all artifacts, and does that output match what is committed? Candidate input to Spec 116 or a separate spec.

---

## Status & Routing

**Update (2026-06-13, Spec 117 Task 1.2 audit complete):** Routing resolved → **Spec 117** (`117-token-index-generation-integrity`) scopes Findings 1 & 3 plus a recurrence-preventing generation-integrity verification (addresses the Pattern Note). The Task 1.2 audit **confirmed and refined** all findings:
- F1 (this Finding 1) and the theme-varying flip (part of Finding 3) share a **confirmed code root cause** — both read the post-OKLCH-collapsed `platforms.web.value`. → recommended **merge** of the R3 + R5 fixes. See `.kiro/specs/117-token-index-generation-integrity/findings/audit-report.md` + `classification.md`.
- Component-token drop (Finding 3) confirmed; also manifests in `dist/ComponentTokens.*` (audit finding N2, folded into the R4 fix scope).
- Two new findings: N2 (folded into R4); **N1 — BlendUtilities not generated → spun out** to `2026-06-13-blendutilities-not-generated.md` (out of scope).
- **Provisional** pending Finding 2 (documented-CLI reproduction).

Original routing notes (superseded by the above):

- **Diagnosed**; no fix implemented; no commits made; working tree clean.
- **Findings 1 & 3 → Ada (Rosetta pipeline)** as reviewed tasks. Finding 1 may be a focused wire-up of `getOklchMetadata`; Finding 3 needs scoping (possible additional package-mode / theme-varying gaps).
- **Finding 2 → CLI / pipeline tooling** (may already be tracked in the June 10–11 cluster).
- **Application MCP reindex deferred** — moot until Finding 1's generator fix lands.
- Awaiting routing decision: fix as focused individual tasks, or scope a small "complete the OKLCH token-index migration + close generation-consistency gaps" spec given the secondary anomalies.
