# Design Document: Steering Relocation & Serving Contract (119-A)

**Date**: 2026-06-29
**Spec**: 119-A - Steering Relocation & Serving Contract
**Status**: Design Phase
**Dependencies**:
- **Consumes Spec 121** (COMPLETE): `find_docs` (dual-mode), `get_section` enhancements (`parent`/`sectionId`/`siblingHeadings`), the `matchConfidence: strong | partial | none` discovery signal, the importable `WORKFLOW_RULES` constant.
- **Consumes Spec 118** (COMPLETE): Module-Resolution Contract is live; 118's gate on 122/123 is cleared. 119-A relocates already-updated docs (location + frontmatter only, not content).
- **Sequenced BEFORE Specs 122/123.** Net: `119-A → 122 → 123 → 119-B`.
- **Precedes Spec 119-B** (deferred): routing tables, certainty-calibration formalization/propagation, measurement case study.

> **Scope authority.** This design covers ONLY the **Critical (119-A)** rows of the requirements' § "Severable Seam Partition". Severable rows (manifest *build*, capability-catalog *generation*, `resources` decomposition, companion-by-`id`, routing tables, certainty-calibration formalization, the case study) are referenced as boundaries and are NOT designed here. The seam is the boundary of this document.

> **Vocabulary vs. bets.** Per `agent-experience-architecture.md` (AXA) header + §8: the AXA *vocabulary* (the five ambient classes) is authoritative and used as-is; the AXA *architectural bets* (token-manifest, formative class, per-agent cuts) are provisional. Where a bet is provisional, this design specifies the **decision point and the artifact shape**, not a committed build.

---

## Overview

119-A makes document addressing **location-independent** so that relocation, renaming, and future routing-design can proceed without breaking references. It does five load-bearing things and gates them behind one closed-loop exit check:

1. **Addressing plane** — every doc gets a stable frontmatter `id` (kebab-slug of `name:`/H1). The Docs MCP resolves by `id`, not exact-match path, with a transition-only legacy-path fallback keyed on the *original* pre-rename/pre-relocation `.kiro/steering/…` strings. This is **net-new MCP code** (Req 2 AC9), not a config tweak.
2. **Filename normalization** — the 10 space-bearing files rename to kebab-case; `id` is unchanged by rename.
3. **Relocation** — non-identity docs move `.kiro/steering/` → `governance/`; ~9 identity docs stay. Content is byte-unchanged.
4. **Rewiring** — `MCP_STEERING_DIR`/`DEFAULT_STEERING_DIR`, `package.json files[]`, `init` template + test, `sync` `MANAGED_DIRS` + net-new stale-env detection, `.cursor/mcp.json`, and the must-fix coupling surfaces (`sync-manifest.json`, figma, `extract-component-meta.ts`, `init`/`designerpunk.ts`, agent-definition `resources` doc-entry breaks). **B4 cleanup-in-passing:** the rewiring task also strips the dead `get_documentation_map` reference from the init template `autoApprove` list (verified `src/cli/templates/mcp-config.json.template:13`) and from `.cursor/mcp.json`'s `autoApprove` if present — `get_documentation_map` is superseded by `find_docs`, so shipping it in a generated config's auto-approve is dead surface. Scope is narrow: only the config `autoApprove` listings, NOT the still-extant tool implementation in `mcp-server/src` (which 119-B / the catalog work addresses).
5. **Identity lock + discovery safety** — lock ~9 docs `always`; land the certainty-calibration rule *text*; add the 118 pointer; seed `aliases`; remove the meta-guide gated on a discovery dry-run; migrate active cross-refs to `id`s; and produce the per-agent five-class ambient-set *design* (Req 14, design-only).

The **relocation-integrity gate** (Req 8) is the exit check: per-reference resolution across the 8 prompts + the must-fix coupling axis + the family-guidance health axis, asserting ONLY the critical-core and explicitly excluding manifest-build/catalog-generation.

**The architectural keystone is the separation of two planes:**

- **Addressing plane** — `id` (immutable, semantically inert, location-independent). Used by the path-taking MCP tools and by intra-doc cross-references.
- **Discovery plane** — `find_docs` over title/description/`aliases`/headings/relevantTasks/basename. Evolves freely; never touches `id`.

Keeping these decoupled is what lets relocation move files freely while references keep resolving.

---

## Architecture

### Two-root corpus topology (post-119-A)

```
project-root/
├── .kiro/steering/          ← IDENTITY ONLY (~9 docs), Kiro-watched, inclusion: always
│   ├── personal-note.md
│   ├── core-goals.md
│   ├── ai-collaboration-principles.md      ← carries certainty-calibration rule text
│   ├── spec-feedback-protocol.md
│   ├── designerpunk-systems-overview.md    ← carries 118 Module-Resolution pointer
│   ├── civitas-system-overview.md
│   ├── start-up-tasks.md
│   ├── task-completion-protocol.md         ← NEW (operational law)
│   └── agent-directory.md                  ← always in 119-A; migrates 119-B
│
└── governance/              ← NON-IDENTITY (~80 docs), MCP-indexed serving root
    ├── token-governance.md
    ├── rosetta-system-architecture.md
    └── … (every other steering doc, id-addressed, find_docs-discoverable)
```

**Index-membership vs `id`-membership are distinct (Req 2 AC4–AC6).** Every doc on disk carries an `id` (both roots). The Docs MCP indexes a **single governance-only root**: identity docs are injected by Kiro, not fetched by MCP, so they are NOT in the indexed corpus. The build-time uniqueness guard and the Thurgood metadata hook operate over the **on-disk corpus across both roots**, never over the index. This is internally consistent: `id` is an on-disk attribute, not an index-membership claim.

### Resolution-plane data flow (the net-new resolver)

```
MCP tool (get_document_summary | get_document_full | get_section
          | list_cross_references | validate_metadata)
   │  receives `path` arg (today exact-match; tomorrow an id OR a legacy path)
   ▼
QueryEngine.<method>(ref)
   ▼
DocumentIndexer.<method>(ref)
   ▼
DocumentIndexer.resolveRef(ref)   ◄── NEW resolution layer
   ├─ 1. id index hit?            idIndex.get(ref) → indexedKey
   ├─ 2. indexed-key hit?         documentContent.has(normalizeRef(ref)) → normalizeRef(ref)
   ├─ 3. legacy-path fallback?    legacyPathIndex.get(normalizeRef(ref)) → indexedKey
   └─ 4. miss → DocumentNotResolved error (names ref + tried strategies)
   ▼
getDocumentContent(indexedKey)  → documentContent.get(indexedKey)   (unchanged downstream)
```

The resolver is inserted at exactly one chokepoint — `DocumentIndexer.resolveRef`, called by `getDocumentContent` — so all five path-taking tools inherit `id`-resolution without per-tool changes. `find_docs` is untouched (it takes no path).

**Keyspace invariant (verified `mcp-server/src`).** `documentContent` is keyed on the **relative** string `path.join(dirPath, entry.name)`, where `dirPath` is `MCP_STEERING_DIR`/`DEFAULT_STEERING_DIR` — the *relative* `.kiro/steering/` literal (verified `index.ts:60,365`; `DocumentIndexer.scanDirectory:365`, `documentContent.set:388`). There is **no absolute path** in the keyspace. Two consequences the resolver must honor:
- The id index and legacy-path index resolve to an **indexed (relative) key**, not an absolute path. Every "absolute path" term in this design is the indexed relative key.
- Strategy 2 (`documentContent.has(ref)`) only hits if `ref` is normalized to the SAME relative-joined form the indexer used. An un-normalized `ref` (extra `./`, trailing slash, OS slash) silently never matches strategy 2 and falls through to the legacy fallback or a miss. The resolver therefore normalizes `ref` to the indexed-key form before strategy 2.

**Guard ordering invariant (verified `QueryEngine.ts:402-405`, called at `:149,176,213,248,272`).** `validatePath` runs in each tool BEFORE the call reaches `resolveRef`, and it **rejects any `ref` containing `..`**. The legacy fallback keyspace — the 60 prompt paths + the 10 renamed files — is **`..`-free by construction** (all are `.kiro/steering/…md` literals with no traversal segment). This is a load-bearing invariant: it is what lets `validatePath`-before-`resolveRef` ordering stand without moving normalization ahead of the guard. If a future legacy key needed a `..` segment, the guard would reject it before the resolver ever saw it — so the manifest producer (Data Models) MUST emit only `..`-free keys, and the gate's reference axis exercises this by resolving all 60.

### Index construction (additive to `indexFile`)

During `indexFile`, alongside the existing `documentContent`/`documentMap` writes, the indexer builds two new maps:

- `idIndex: Map<string, string>` — `id` → indexed (relative) key (built from frontmatter `id`, or derived slug as fallback).
- `legacyPathIndex: Map<string, string>` — normalized original `.kiro/steering/…` path → indexed (relative) key. Seeded from a build-time-generated **legacy-path manifest** (see Data Models), NOT inferred at index time (the original paths no longer exist on disk after relocation, so they cannot be discovered by scanning — they must be supplied).

Both maps store the same indexed relative key `documentContent` is keyed on (`path.join(dirPath, entry.name)`), never an absolute path.

**Index-maintenance invariant (verified `DocumentIndexer.ts:69-70,96-101`).** The two new maps must be maintained on every path that touches `documentContent`:
- `indexDirectory` clears `documentMap` + `documentContent` (`:69-70`) — `idIndex` and `legacyPathIndex` must be **cleared alongside them** at the top of a full re-scan.
- `reindexFile` (FileWatcher-driven) has two branches: the **delete branch** (`:100-101`, file gone) deletes from `documentMap` + `documentContent` — it must ALSO delete the corresponding `idIndex` entry (reverse-lookup by indexed key) and any `legacyPathIndex` entry pointing at that key; the **re-add branch** (`:107`, calls `indexFile`) repopulates both maps. Without this, a renamed/deleted doc leaves a stale `idIndex`/`legacyPathIndex` entry that resolves to a vanished key.

**Ownership note.** The resolver, the two indexes, and their maintenance are **Docs-MCP infrastructure owned by Thurgood / infra**, not the token domain. The `id` *values* are an on-disk frontmatter attribute (any doc author / domain agent owns their doc's `id`); the resolution *machinery* is governance infrastructure.

### Sequencing (ordering is a correctness property)

```
1. id-addressing resolver lands (resolver code + id backfill design) ──┐
2. legacy-path manifest captured (original 60 prompt paths + 10 renamed)│ resolver must be
3. mass-rename (10 files) ──────────────────────────────────────────────┤ live BEFORE any
4. relocate non-identity docs → governance/ + id backfill executed ─────┤ move/rename, or
5. companion re-point (atomic with relocate) ───────────────────────────┘ refs 404 in-window
6. rewire MCP + packaging + must-fix couplings
7. aliases seeding (worklist = dry-run WEAK/MISS)
8. intra-doc cross-ref migration to ids
9. meta-guide removal — GATED on discovery dry-run threshold
10. relocation-integrity gate = exit check
```

Steps 1–2 are the hard prerequisite: the resolver + legacy-path manifest must be live before the rename (step 3) and relocate (step 4), because the 8 prompts keep their 60 legacy paths through the window and resolve only via the fallback.

---

## Components and Interfaces

### 1. Frontmatter `id` extraction (`frontmatter-parser.ts`)

Extend `FrontmatterInfo` and `extractFrontmatterInfo` to surface `id`, with the slug-derivation fallback specified by Req 2 AC9 (slug of `name:`, falling back to H1).

```typescript
// frontmatter-parser.ts (additive)
export interface FrontmatterInfo {
  title?: string;
  description?: string;
  aliases?: string[];
  viability: { placeholder: boolean; deprecated: boolean };

  /**
   * Stable per-doc addressing id (Spec 119-A Req 2). Location-independent,
   * immutable, semantically inert. Read from frontmatter `id:` when present;
   * otherwise DERIVED as the kebab-slug of `name:` (falling back to H1).
   * `derived: true` flags a doc that has no on-disk `id:` yet — the build-time
   * guard treats a derived collision identically to an explicit one.
   */
  id?: string;
  idSource: 'frontmatter' | 'derived-name' | 'derived-h1' | 'none';
}

/** Kebab-slug: lowercase, spaces/underscores→`-`, strip non-[a-z0-9-], collapse `-`. */
export function slugifyTitle(title: string): string;
```

`idSource` is retained for the build-time guard and the convention doc (Req 12): it lets the guard report "derived" vs. "explicit" collisions and lets the backfill pass know which docs still need an on-disk `id:` written.

**B2 design note — the 89-doc `id` backfill is a codemod with a hard ordering and a collision-surfacing duty.** The bulk write of `id:` into 89 docs' frontmatter is a **codemod**, not a manual edit. Two constraints:
- **Ordering:** the Component-1 frontmatter `id` *reader* (`extractFrontmatterInfo` surfacing `id`/`idSource`) MUST land **before** the bulk write, so the codemod's idempotency skip ("`id:` already present → skip", per the Error Handling idempotency note) actually works. Reader-before-writer, or a re-run double-writes.
- **Collision surfacing:** the Decision 3 trade-off (two same-titled docs derive the same slug) must be **surfaced by the codemod, not silently duplicated** — the codemod runs `checkIdUniqueness` semantics over its planned writes and **halts on a derived collision**, emitting both colliding paths for human adjudication. A codemod that writes colliding `id:` values silently would defeat the build-time guard's purpose.

### 2. `DocumentMetadata` carries `id` (`models/DocumentationMap.ts`)

```typescript
export interface DocumentMetadata {
  path: string;            // indexed (relative) key, e.g. "governance/token-governance.md"
                           // — joined from MCP_STEERING_DIR; NOT an absolute path
  // … existing fields (purpose, layer, relevantTasks, lastReviewed,
  //    organization, sections, tokenCount, title, description, aliases, viability)

  /** Stable addressing id (Spec 119-A Req 2). Present on every indexed doc. */
  id: string;
}
```

### 3. The resolver (`DocumentIndexer`)

```typescript
export type ResolutionStrategy = 'id' | 'indexed-key' | 'legacy-fallback';

export interface ResolvedRef {
  indexedKey: string;         // the indexed (relative) key the ref resolved to
                              // — the SAME key documentContent is keyed on
  strategy: ResolutionStrategy;
  id: string;                 // the doc's stable id (always known post-resolution)
}

export class DocumentIndexer {
  // NEW indexes, populated in indexFile() / cleared in indexDirectory()
  // / maintained in reindexFile() (both delete + re-add branches).
  // Both map to the indexed (relative) key, NOT an absolute path.
  private idIndex: Map<string, string> = new Map();          // id → indexedKey
  private legacyPathIndex: Map<string, string> = new Map();  // normalizedLegacyPath → indexedKey

  /**
   * Resolve an incoming reference (id | indexed key | legacy steering path)
   * to the indexed (relative) key documentContent is keyed on. This is the
   * single chokepoint all five path-taking tools route through (via
   * getDocumentContent).
   *
   * Resolution order (Req 2 AC2/AC3/AC9):
   *   1. id index           — the primary, stable case
   *   2. indexed key         — a known governance relative key (ref normalized first)
   *   3. legacy-path fallback — original .kiro/steering/… string (transition-only)
   * Throws DocumentNotResolved naming the ref + tried strategies on miss.
   */
  resolveRef(ref: string): ResolvedRef;

  /** Load the build-time legacy-path manifest into legacyPathIndex (Data Models). */
  loadLegacyPathManifest(manifest: LegacyPathManifest): void;
}
```

`getDocumentContent` changes from `documentContent.get(filePath)` to `documentContent.get(this.resolveRef(ref).indexedKey)`. Downstream (`getDocumentSummary`/`getDocumentFull`/`getSectionAddressed`/`listCrossReferences`/`validateMetadata`) is unchanged — they already call `getDocumentContent`. `QueryEngine.validatePath` continues to guard against empty/malformed input (including its `..` rejection, which the legacy keyspace is built to never trip — see the guard-ordering invariant in Architecture); it does not need to know about `id` vs path.

**Resolution algorithm (pseudocode).** `normalizeRef` is the single normalization used by both strategy 2 and strategy 3 (trim, leading `./` strip, slash normalization to the indexed-key form) — one helper, two call sites:

```
resolveRef(ref):
  if idIndex.has(ref):              return { indexedKey: idIndex.get(ref), strategy:'id', id: ref }
  key = normalizeRef(ref)                       // same form documentContent is keyed on
  if documentContent.has(key):      return { indexedKey: key, strategy:'indexed-key',
                                              id: documentMap.get(key).id }
  if legacyPathIndex.has(key):
        ik = legacyPathIndex.get(key);
        return { indexedKey: ik, strategy:'legacy-fallback', id: documentMap.get(ik).id }
  throw DocumentNotResolved(ref, ['id','indexed-key','legacy-fallback'])
```

Note strategy 2 normalizes `ref` BEFORE the `documentContent.has` probe — without that, a ref with a stray `./` or trailing slash silently skips strategy 2.

### 4. Build-time uniqueness guard (`scripts/`, on-disk corpus across both roots)

```typescript
export interface IdGuardResult {
  ok: boolean;
  /** id → [on-disk file paths] for any id claimed by >1 doc (explicit OR derived).
   *  NOTE: the guard scans the on-disk corpus across both roots, so these are
   *  filesystem paths — distinct from the resolver's indexed (relative) keys. */
  collisions: Record<string, string[]>;
  /** docs whose id is derived (no on-disk `id:`) — backfill worklist. */
  derived: string[];
  totalDocs: number;        // expected 89
}

/** Scans BOTH governance/ and .kiro/steering/ (identity docs). Fails build on any collision. */
export function checkIdUniqueness(roots: string[]): IdGuardResult;
```

This runs in CI and is the same logic the Thurgood metadata-validation hook (Req 2 AC6) invokes on doc create/modify — one function, two callers (CI + hook).

**B1 design note — the "CI" leg is net-new.** There is **no existing steering build step** to hang this on, so the CI leg is a **net-new `scripts/` npm script** (e.g. `npm run check:id-uniqueness`) wired into CI. The real day-to-day enforcement seam is the **Thurgood metadata hook (Req 2 AC6)**, which calls the same `checkIdUniqueness` on doc create/modify — the CI leg is the backstop, the hook is the front line. "One function, two callers" is literal: a single exported function, invoked from a new npm script AND from the hook.

### 5. Relocation-integrity gate (`scripts/relocation-integrity-gate.ts`)

```typescript
export interface ReferenceCheck {
  ref: string;                       // id or legacy .kiro/steering/… path
  sourcePrompt: string;              // which of the 8 prompts
  resolved: boolean;
  strategy?: ResolutionStrategy;     // how it resolved (legacy-fallback expected for the 60)
}

export interface CouplingCheck {
  surface: string;                   // e.g. "sync-manifest.json", "src/figma/VariantAnalyzer.ts"
  remediated: boolean;
  detail: string;                    // what was asserted (governance/ key present, etc.)
}

export interface IdentityPresenceCheck {
  id: string;
  inLockedSet: boolean;              // present in Req 6 AC1 always-set
  fileExists: boolean;               // at its .kiro/steering/ path
}

export interface FamilyGuidanceAxis {
  // MUST be empty (Req 8 AC6). NOTE: FamilyGuidanceIndexer parses only the
  // 9 TOP-LEVEL companion fields, so this axis is blind to the 13 NESTED
  // companion refs (composesWithFamilies). All 22 must be re-pointed for
  // correctness; only the 9 are gate-asserted here. Green ≠ "all 22 verified".
  newCompanionWarnings: string[];
}

export interface GateResult {
  pass: boolean;
  references: ReferenceCheck[];      // per-reference (Req 8 AC1–AC4)
  couplings: CouplingCheck[];        // must-fix axis (Req 8 AC7)
  identity: IdentityPresenceCheck[]; // static presence, NOT MCP (Req 8 AC5)
  familyGuidance: FamilyGuidanceAxis;// App-MCP health axis (Req 8 AC6)
  unresolved: string[];              // named failures (Req 8 AC3)
  // NOTE (Req 8 AC8): manifest-build / catalog-generation are NOT checked here.
}

export function runRelocationIntegrityGate(): GateResult;
```

### 6. Discovery dry-run (`scripts/discovery-dry-run.ts`)

```typescript
export type MatchConfidence = 'strong' | 'partial' | 'none';  // reuses the Spec 121 signal

export interface OracleEntry {
  concept: string;                   // map category/concept OR an agent domain query
  expectedDocIds: string[];          // human-validated, stale-stripped (Req 13 AC2)
}

export interface DryRunScore {
  concept: string;
  rankOfCorrect: number | null;      // 1-based; null = not in results (MISS)
  matchConfidence: MatchConfidence;
  classification: 'PASS' | 'WEAK' | 'MISS';
}

export interface DryRunResult {
  point: 'floor' | 'lift' | 'no-regression';   // the three-point baseline (Req 13 AC4)
  scores: DryRunScore[];
  weakOrMiss: string[];              // feeds Req 9 alias-seeding worklist (Req 13 AC5)
  clearsThreshold: boolean;          // HARD gate (Req 11 / Req 13 AC6): true iff no
                                     // concept is WEAK/MISS (all rank ≤ 2 at ≥ partial)
  rank1StrongRate: number;           // SIGNAL, not a gate (Decision 4): below ~80%
                                     // triggers an aliases-seeding review, not a block
}

export function runDiscoveryDryRun(point: DryRunResult['point'], oracle: OracleEntry[]): DryRunResult;
```

**B5 design note — the harness needs a path↔id map at scoring time.** `find_docs` returns results keyed on `path` (the indexed relative key), but the oracle (`OracleEntry.expectedDocIds`) is keyed on **`id`**. So `runDiscoveryDryRun` cannot directly compare `find_docs` output to the oracle — it must translate each returned `path` to its `id` (via `documentMap.get(path).id`, the same `id` the index already carries) before computing `rankOfCorrect`. The harness therefore takes (or builds) a **path→id map** at scoring time; without it, every concept scores as a MISS because `path !== id`. (The reverse `normalizeRef` naming inconsistency flagged alongside this is already resolved: the resolver uses a single `normalizeRef` helper for both strategy 2 and strategy 3 — see the Component-3 pseudocode.)

### 7. Per-agent five-class ambient-set design artifact (Req 14, design-only)

This is a **design artifact / schema**, not running code. 119-A produces it as the canonical input 122 consumes. Expressed as a typed shape so 122 has a contract to generate against:

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
  // ground-truth-manifest + capability-catalog entries carry status='design-only-*'
  // — their build/generation is severable (Req 14 AC3/AC4).
}
```

The per-agent *content* is sourced from `per-agent-ax-assessments.md` (Req 14 AC5 input-of-record) and is captured as a design appendix, not re-derived here.

---

## Data Models

### Frontmatter (on-disk, per doc)

```yaml
---
name: Token Governance
description: Autonomy levels and approval gates for token decisions
id: token-governance            # NEW — stable, immutable, semantically inert
aliases: [token approval, autonomy levels, governance gates]   # discovery plane (Req 9)
---
```

### Legacy-path manifest (build artifact, transition-only)

A generated JSON keyed on the **original pre-rename, pre-relocation** `.kiro/steering/…` strings (Req 2 AC3) — covering BOTH the 60 prompt references AND the 10 renamed space-bearing files. It is the only way the post-relocation index can know those vanished paths; it is documented as removable after the 119-B sweep.

```typescript
export interface LegacyPathManifest {
  generatedAt: string;
  transitionOnly: true;                 // self-documenting (Req 2 AC3); removable post-sweep
  entries: Array<{
    legacyPath: string;                 // e.g. ".kiro/steering/Cross-Platform vs Platform-Specific Decision Framework.md"
    id: string;                         // resolved target
  }>;
}
```

**Producer (`scripts/generate-legacy-path-manifest.ts`).** The manifest is *generated*, but the generator must be named, scoped, and sequenced or the "generated" claim is hollow:

- **Owner:** Thurgood / Docs-MCP infra (same owner as the resolver — it produces the resolver's seed data).
- **Two inputs:** (1) the set of `.kiro/steering/…md` references **grep-extracted from the 8 prompts** (these are the 60 prompt refs in their *current* pre-rename forms), and (2) the **literal Req-3 rename map** (the 10 space-bearing filenames → their kebab targets). Each input row is paired with the target doc's `id`.
- **Hard sequencing constraint:** the generator MUST run against the **pre-rename / pre-relocation tree** and **freeze its output to a checked-in JSON BEFORE** the rename (sequencing step 3) and relocate (step 4). After the move, the original `.kiro/steering/…` strings no longer exist on disk, so the producer cannot be re-run to recover them — the frozen artifact is the only record. This makes manifest generation **step 2** in the sequencing (already placed there), and it is a one-way gate: once step 3 starts, the manifest is immutable for the window.
- **`..`-free obligation:** every emitted `legacyPath` must be `..`-free (see the guard-ordering invariant) — the grep extraction over prompt refs naturally yields `.kiro/steering/…md` literals, but the generator asserts it.
- **Division of labor with the gate:** the producer *creates* the table (step 2); the relocation-integrity gate (Component 5) *verifies completeness* by resolving all 60 prompt refs through it (step 10). Both halves are required — a generator with no gate could ship an incomplete table; a gate with no generator has nothing to verify.

### Frozen map-oracle (test fixture, point-in-time)

Extracted from the meta-guide's "Tier 2: MCP-Only Documents" section BEFORE removal (Req 11 AC4 / Req 13 AC1), human-validated to strip stale entries (Req 13 AC2). Stored as a test fixture, NOT a living doc. Also retained as 119-B's non-circular "before" anchor (Req 13 AC7). Shape = `OracleEntry[]`.

---

## Error Handling

| Failure | Detection | Handling |
|---|---|---|
| `id` collision (explicit or derived) | build-time guard / Thurgood hook over both roots | **Fail build / block commit**, name all colliding paths. Never auto-resolve. |
| Unresolved reference (`id` or legacy path) | resolver miss | `DocumentNotResolved` naming ref + tried strategies; surfaced by the gate as a named failure (Req 8 AC3). |
| Legacy path supplied post-sweep | resolver | Resolves while manifest is loaded; after manifest removal it becomes a normal miss — the intended transition-only behavior. |
| Companion path orphaned mid-relocation | `FamilyGuidanceIndexer` warning | **Prevented by atomicity** — relocate + re-point land as one commit (Req 4 AC7). Gate's family-guidance axis asserts zero new warnings. |
| Cross-ref cannot be expressed as `id` | cross-ref migration pass | Surface as explicit exception (Req 10 AC3); do NOT silently convert to a `governance/…` physical path. |
| Doc cannot be assigned a post-migration role | inventory | Surface as explicit exception (Req 1 AC5); do not silently drop. |

### Rollback (relocation is the highest-risk op — Req 4 AC5)

The relocation is structured so rollback is a single revert. The move + companion re-point + `MCP_STEERING_DIR` rewire land as a coherent commit (or tight commit sequence). Rollback = revert the move commit and restore the prior `MCP_STEERING_DIR` wiring. Because the resolver + legacy-path fallback are live *before* the move, references continue resolving in both the rolled-forward and rolled-back states — there is no window where a revert orphans references.

**Idempotency:** the `id` backfill and relocation passes must be re-runnable. A second run finds `id:` already present (skip), finds files already under `governance/` (skip), and re-pointing companions to an already-`governance/` path is a no-op. This makes a partial failure safe to re-run rather than requiring a clean revert.

---

## Testing Strategy

| Surface | Test type | Gate role |
|---|---|---|
| `slugifyTitle`, `id` extraction, `idSource` derivation | unit | — |
| `resolveRef` (id / indexed-key / legacy-fallback / miss) | unit | core resolver correctness |
| Legacy-path normalization (spaces, `./`, slashes) | unit | covers the 10 renamed space-bearing files |
| Build-time uniqueness guard over both roots | unit + CI | fails build on collision |
| Thurgood metadata hook (same logic) | unit | blocks bad commits |
| `init.test.ts` `governance/` assertion | unit | CI fails without it (Req 5 AC3) |

**B3 design note — `init.test.ts` moves its FULL assertion set, not just the path string.** The rewiring task must update more than the `MCP_STEERING_DIR` path literal: the **doc-count assertions break** once ~80 docs relocate out of `.kiro/steering/`. Verified lines in `src/cli/__tests__/init.test.ts`: `:142` (`✓ steering docs: 89 existing files preserved`), `:187` (`✓ steering docs: 89 new files`), and `:194-195` (the "89 package files merged … total 90" readdir count). All three hard-code `89`/`90` against the pre-relocation single-root layout and must be re-derived for the two-root split (identity count in `.kiro/steering/` + governance count in `governance/`), not just have their path strings swapped.
| `sync` stale-`MCP_STEERING_DIR` detection | unit | net-new capability (Req 5 AC4) |
| **Relocation-integrity gate** | integration | **119-A exit gate** (Req 8 AC9) |
| **Discovery dry-run (3-point)** | integration | **meta-guide removal gate** (Req 11 AC5 / Req 13 AC6) |
| family-guidance health (no new companion warnings) | integration (App-MCP) | gate axis (Req 8 AC6) |

The two integration gates are the load-bearing checks: the **relocation-integrity gate** is the relocation exit, the **discovery dry-run** is the meta-guide-removal gate. Unit coverage centers on the resolver, since it is the net-new code path and every tool depends on it.

---

## Design Decisions

### Decision 1: Resolver as a single chokepoint at `getDocumentContent`, id-first with legacy fallback

**Options Considered**:
- (a) **Per-tool resolution** — teach each of the 5 path-taking tools to resolve `id` vs path independently.
- (b) **Single chokepoint** — insert `resolveRef` at `getDocumentContent`, the one method all 5 tools already funnel through.
- (c) **Resolve at the QueryEngine layer** — translate ref→key before calling the indexer.

**Decision**: (b). Add `idIndex` + `legacyPathIndex` to `DocumentIndexer`, route `getDocumentContent` through `resolveRef`, leave the 5 tools and the QueryEngine path methods unchanged.

**Rationale**: All five tools (`get_document_summary`/`get_document_full`/`get_section`/`list_cross_references`/`validate_metadata`) already call `getDocumentContent` (verified in `DocumentIndexer.ts`). One insertion point gives all five `id`-resolution for free, keeps the indexer as the single owner of the corpus maps it already owns, and makes the legacy fallback a single code path to remove after the 119-B sweep. Resolution order id→indexed-key→legacy matches Req 2 AC2/AC3 (id is primary, legacy is the secondary transition lookup). The chokepoint resolves to the indexer's **relative indexed key** (`documentContent`'s keyspace, verified `DocumentIndexer.ts:365,388`), not an absolute path — so the resolver normalizes incoming refs to that relative form, and `validatePath`'s `..` rejection (`QueryEngine.ts:402`) stands because the legacy keyspace is `..`-free.

**Trade-offs**: The indexer grows two more maps and a resolution responsibility — it is already the corpus owner, so this is cohesive rather than scope-creep, but it does make `getDocumentContent` non-trivial (it now has a resolution branch, not a bare `Map.get`).
**Counter-argument (systematic skepticism)**: A chokepoint can mask which tool triggered a bad ref — a per-tool resolver would localize blame. *Rebuttal*: `resolveRef` throws `DocumentNotResolved` carrying the ref and tried strategies, and the gate attributes each ref to its `sourcePrompt`, so attribution is preserved at the gate layer where it matters. The chokepoint's "all five at once" benefit dominates the marginal debuggability loss. *Where this could still be wrong*: if 122 later introduces a path-taking tool that should NOT honor legacy fallback (e.g. a strict-id-only tool), the chokepoint would wrongly apply fallback to it — at that point the resolver needs a per-call strategy flag. Designed-not-precluded: `resolveRef(ref, opts?)` can take an allowed-strategies set later without changing callers.

### Decision 2: Legacy-path fallback is fed by a generated manifest, not inferred at index time

**Options Considered**:
- (a) **Infer at index time** — derive legacy paths from current filenames.
- (b) **Generated manifest** — capture the original paths at build time into a `LegacyPathManifest`, load into `legacyPathIndex`.

**Decision**: (b).

**Rationale**: After relocation + rename, the original `.kiro/steering/…` strings **no longer exist on disk** — they cannot be inferred by scanning. The 10 space-bearing files change name AND location; the 60 prompt refs point at pre-rename forms. Only a captured manifest preserves the exact keyspace Req 2 AC3 mandates (original, pre-rename, pre-relocation strings). The manifest is self-documenting (`transitionOnly: true`) and removable after the 119-B sweep.

**Trade-offs**: One more generated artifact to keep correct during the window; if the manifest is stale or incomplete, a prompt ref 404s — so manifest completeness is itself gate-checked (the gate resolves all 60 prompt refs, which exercises the manifest). The generator (`scripts/generate-legacy-path-manifest.ts`, owned by Thurgood/infra; see Data Models) MUST run against the pre-rename tree and freeze its output before the move — a sequencing constraint, not just a build step.
**Counter-argument**: A manifest is exactly the kind of hand-curated map this spec is removing. *Rebuttal*: it is **generated** (from the grep-extracted prompt refs + the literal rename map), **transition-scoped**, and **gate-verified** — it satisfies the "generate, don't curate" invariant (Req 4 AC8) and carries an explicit removal obligation (the 119-B sweep). It is the inverse of the meta-guide: machine-built, temporary, and tracked.

### Decision 3: id = slug of frontmatter `name:`, falling back to H1; immutable; semantically inert

**Options Considered**:
- (a) Slug of `name:` / H1 (Req 2 AC9).
- (b) Content hash.
- (c) Sequential/numbered id.

**Decision**: (a), with `idSource` tracking and `aliases` absorbing any rare forced change (Req 2 AC7).

**Rationale**: A title-slug is human-readable in prompts and cross-refs, stable across relocation/rename (the failure mode that motivated the spec), and semantically inert (no taxonomy/ordering encoded). A hash is opaque and unreadable in a prompt; a sequential id encodes ordering that becomes a false taxonomy. Immutability is enforced by convention + the guard, with `aliases` as the escape valve when a forced change is unavoidable.

**Trade-offs**: Two docs with the same title collide — handled by the build-time guard failing loudly (acceptable: a title collision is itself a problem). A title edit must NOT change the `id`, which means `id` and title can drift apart over time (a doc titled X with `id: y`). This is intentional (id is inert) but can surprise a reader — mitigated by the convention doc (Req 12).
**Counter-argument**: deriving `id` from `name:` couples the addressing plane to a discovery-ish field. *Rebuttal*: the derivation happens **once** (at assignment); thereafter the `id` is frozen on disk and never re-derived. The coupling is at birth only, not ongoing — exactly what `idSource` records so the backfill writes the literal `id:` and freezes it.

### Decision 4 (RESOLVED): Discovery dry-run gate = **hard bar: correct doc at rank ≤ 2 with matchConfidence ≥ partial, for 100% of stale-stripped oracle concepts. The 80% rank-1-strong figure is a review-if-below quality SIGNAL, not a block.**

**Options Considered**:
- (a) Strict: every concept rank-1-strong.
- (b) Lenient: correct doc anywhere in results.
- (c) **Hard floor + soft signal**: 100% reach rank ≤ 2 at confidence ≥ partial (the *hard gate every concept must clear*), with rank-1-strong rate tracked as a *quality signal* that triggers a review (not a block) when below ~80%.

**Decision**: (c). Concretely, meta-guide removal is permitted iff: **no oracle concept is a MISS or WEAK** (every concept's correct doc is within the top 2 at `strong` or `partial`). The **rank-1-strong rate is reported alongside** the gate result: if it falls below ~80%, that triggers an **aliases-seeding review** (Req 9 worklist) — it does NOT automatically block removal. The hard gate is the rank ≤ 2 / ≥ partial floor; 80% is a tripwire for "look again at aliases," not a pass/fail line.

**Rationale**: The recorded floor-probe (Req 13 note, 2026-06-27) showed 8/8 in top-2 but only **~62% (5/8) rank-1-strong *pre-aliases-seeding*** (`module-resolution` among the weak — which Req 7 separately gives an identity-layer pointer). That number is the reason 80% must NOT be a hard gate: the empirical pre-seeding floor sits *below* 80%, so making 80% a hard bar could stall meta-guide removal even when discovery is already adequate (every concept reachable in top-2). Tying the hard gate to a **behavior** — "no concept is unreachable" — protects the real risk Req 13 guards (silently removing the map for a concept discovery can't reach) without letting an arbitrary rank-quality number block a corpus that already resolves everything. The rank-1-strong rate stays valuable as a *signal*: missing it means "seed more aliases and re-probe," a review action, not a failure. The gate reuses the shipped Spec 121 `matchConfidence` signal, so it is forward-compatible with 119-B's formalization.

**Trade-offs**: 100%-in-top-2 is the hard gate — a single un-seedable concept blocks removal until either an alias lands or the concept is adjudicated stale (legitimate, via the Req 13 AC2 stale-strip). Demoting 80% to a signal means a corpus could ship meta-guide-free with mediocre rank-1-strong rates; accepted, because the hard floor still guarantees reachability and 119-B carries the rank-quality formalization.
**Counter-argument**: a soft quality signal can be ignored under deadline pressure, letting discovery quality erode unobserved. *Rebuttal*: the signal is **reported on every dry-run** and **wired to a concrete action** (the Req 9 aliases worklist), so it is observed by construction rather than buried; and the hard reachability gate is the actual safety property — rank-1-strong is a polish metric, not a correctness one. **Confirmed with Peter**: 80% is a review trigger, not a gate; the rank ≤ 2 / ≥ partial floor is the firm hard bar.

### Decision 5 (RESOLVE OPEN ITEM — Req 8 AC5): Identity set materialized as an **in-prompt / static always-set list**, not a build artifact

**Options Considered**:
- (a) **Manifest-as-build-artifact** — generate an `identity-set.json` the gate reads.
- (b) **In-prompt / static set** — the locked always-set (Req 6 AC1) IS the source of truth; the gate checks `id ∈ locked-set` + file-exists, reading the locked set from the Req 6 design.

**Decision**: (b) for 119-A.

**Rationale**: Req 8 AC5 explicitly states no separate manifest is presupposed and materializing one is "design-discretion, not a requirement." The locked set is ~9 docs and changes only by ballot — a build artifact would be over-engineering for a hand-locked, rarely-changing list, and (critically) the **ground-truth-manifest *build* is behind the seam** (Req 14 AC3). Materializing an identity manifest now risks pulling a severable build concern across the seam. The gate verifies identity refs by static presence (id in locked set + file exists at `.kiro/steering/`), never by MCP round-trip (identity docs aren't indexed).

**Trade-offs**: The locked set lives in the Req 6 design + the gate's expectation, so the two must stay in sync by review (not by a generated single-source). For ~9 ballot-gated docs this is acceptable; at scale it would not be.
**Counter-argument**: a static list is itself a hand-curated artifact — the anti-pattern this spec fights. *Rebuttal*: the identity always-set is **inherently hand-locked by design** (Req 6 locks it by ballot); it is not a *map* that drifts against generated ground truth, it is the authoritative list of what is `always`. "Generate, don't curate" applies to *derived* maps (catalogs, manifests, routing) — not to the root identity lock, which has no upstream source to generate from. When 122 brings the capability catalog, the catalog generation can absorb identity-set materialization if it earns its place; deferring that is consistent with the seam.

### Decision 6: Companion re-point by `governance/`-path (option b), atomic with relocate

**Options Considered**: (a) companion-by-`id` (requires `FamilyGuidanceIndexer` change); (b) companion-by-`governance/`-path (code-free).

**Decision**: (b), landed atomically with relocation. (a) deferred to 122.

**Rationale**: This is **already resolved in the requirements** (Req 4 AC7, RESOLVED 2026-06-28) — recorded here for design completeness. Option (b) keeps the seam code-free: re-point the `companion:` values + the README template to `governance/…` physical paths, no indexer change. Option (a) requires `FamilyGuidanceIndexer.validateCrossReferences` (verified `application-mcp-server/src/indexer/FamilyGuidanceIndexer.ts:49-52`: `path.resolve(projectRoot, guidance.companion)` + `fs.existsSync`) to resolve by `id` instead — indexer work that belongs in 122. Atomicity (single commit) prevents the transient-degradation window where a relocated `Component-Family-*.md` with a lagged companion fires `FamilyGuidanceIndexer` warnings.

**Companion count — 22 total, but only 9 are gate-visible (verified).** There are **22** `companion:` paths across the family-guidance data: **9 top-level** `companion:` fields + **13 nested** companion references inside `composesWithFamilies`. `FamilyGuidanceIndexer` parses only the **top-level** field (`guidance.companion`, `:49-52`), so its `fs.existsSync` warning — and therefore the relocation-integrity gate's family-guidance axis (Req 8 AC6) — only *sees* the 9 top-level paths. The atomic re-point MUST rewrite **all 22** for correctness (a stale nested companion is still wrong, it just doesn't warn). The 13 nested are **correctness-only / gate-blind**: a green family-guidance axis means "the 9 top-level resolve," NOT "all 22 verified." This is called out so nobody re-points only the 9 the gate watches, and nobody reads the green axis as full-corpus assurance.

**Trade-offs**: Re-physicalizes the companion link (the thing `id`-addressing decouples elsewhere) — accepted as the cost of a code-free seam, with the `id` migration explicitly queued for 122.
**Counter-argument**: re-pointing to a physical path contradicts Req 10's "migrate to logical `id`s." *Rebuttal*: Req 10 governs *intra-doc cross-references in the steering corpus*; the `companion:` field is *Application-MCP family-guidance data* resolved by a different indexer with no `id`-resolution today. Migrating it to `id` is real indexer work (option a), correctly deferred. The two are different planes resolved by different code.

### Decision 7 (RESOLVED — OQ3): In-between cross-refs resolved by referencing-doc status

**Options Considered**: (a) referencing-doc status (active doc → migrate its refs; historical doc → leave); (b) referenced-doc status; (c) per-reference adjudication.

**Decision**: (a) — resolve by the referencing doc's own status. **RESOLVED** (Peter-approved), no longer carried-forward: an in-between cross-ref is handled by the *referencing* doc's status — an active doc migrates its ref to the target's `id`; a historical doc leaves its ref as-is. A rare target that genuinely cannot be assigned an `id` takes the **Req 10 exception path** (surfaced as an explicit exception, not silently physical-pathed).

**Rationale**: It is mechanically unambiguous (a doc is either active or historical), matches Req 10 AC1/AC2's existing split, and avoids per-reference adjudication overhead. The legacy-path fallback means even a mis-classified ref still resolves during the window, so the cost of being wrong is low.

**Trade-offs**: A doc referenced by both active and historical content gets treated by its *own* status, which can leave a logically-active concept addressed by a legacy path inside a historical doc — acceptable, since historical docs are explicitly left as-is (Req 10 AC2).
**Counter-argument**: this could leave a few "active-feeling" refs un-migrated. *Rebuttal*: those resolve via fallback and are swept in 119-B; no relocation-integrity break. The un-`id`-able-target edge is now explicitly routed to the Req 10 exception path rather than left open.

---

## Requirements coverage (critical-core only)

| Requirement | Designed in |
|---|---|
| R1 inventory + coupling sweep | Architecture (topology) + Error Handling (exceptions); inventory execution is a task. |
| R2 id addressing + resolver + fallback | Components 1–4; Decisions 1–3; Data Models. |
| R3 filename normalization | Architecture (sequencing); `id` unchanged by rename (Decision 3). |
| R4 relocation | Architecture (topology, sequencing); Decision 6; Error Handling (rollback). |
| R5 MCP + packaging rewiring | Architecture; Testing (init/sync); surfaces enumerated. |
| R6 lock always-core + calibration text | Architecture (identity root); Decision 5; Component 7. |
| R7 118 pointer | Architecture (topology note). |
| R8 relocation-integrity gate | Component 5; Decision 5; Testing. |
| R9 aliases seeding | Data Models (frontmatter); Component 6 (worklist wiring). |
| R10 cross-refs → id | Error Handling; Decision 7. |
| R11 meta-guide removal | Architecture (sequencing, gated); Component 6. |
| R12 convention doc | Component 1 (`idSource`); ballot-measure doc is a task. |
| R13 discovery dry-run | Component 6; Decision 4. |
| R14 per-agent five-class design | Component 7; design-only, build/gen excluded. |

**Severable rows NOT designed here** (confirmed boundary): manifest *build*, capability-catalog *generation*, `resources` decomposition/trim, companion-by-`id`, routing tables, certainty-calibration formalization/propagation, the measurement case study, deeper AX investments. Each is referenced where a reader expects it and pointed across the seam.
