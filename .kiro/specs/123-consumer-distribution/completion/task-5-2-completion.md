# Task 5.2 Completion — Manifest: path, format, fields incl. `posture` and `origin`, keyed entries, pruning incl. the `src/types` string

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 5 · **Agent**: Lina (Opus)

## What changed

**`src/cli/sync/Manifest.ts`** was rewritten. The Spec 111 manifest is now the LEGACY manifest.

- **Path**: `designerpunk.manifest.json` at the repo root (DD21). `LEGACY_MANIFEST_PATH = '.kiro/sync-manifest.json'` is read-only, except for its relocation pointer.
- **Format**:
  - stable top-level order (`version, posture, installedVersion, contractHash, attachedTargets, entries`);
  - entries sorted in code-unit order (locale-independent), with field order `hash, grain, origin`;
  - **one entry per line**.
  - `serializeManifest(parseManifest(text)) === text`. `saveManifest` does not write when the bytes are identical.
- **Fields**: `DesignerPunkManifest` carries `posture: 'born'|'consume'` and `entries: Record<"<path>"|"<path>#<key>", { hash, grain: 'file'|'region'|'key', origin: 'copy'|'generated'|'emitted-key' }>` (C7 + its erratum).
- **A corrupt manifest is reported and stops the run.** Spec 111 treated corrupt JSON as "first sync", which under Model B would re-baseline her edits away.
- **Pruning (D-B6)**:
  - `pruneDemanaged` drops entries under `DEMANAGED_ROOTS = src/tokens, src/types, src/components/core` and returns one group per root;
  - `pruneReportLines` prints the catalog row per group;
  - **the `src/types` group appends `SRC_TYPES_PRUNE_CLAUSE`**, which says the files stay required by the tier's relative `../types` imports. That is Ada's D-T-A5 string, **drafted by me and marked as a token-side slot for Ada.**
- **Legacy conversion (C7 step 1)**: `convertLegacyManifest` does the following.
  - Copy-root entries become `{ grain: 'file', origin: 'copy' }`. The Spec 111 hash is a valid baseline for these untransformed files.
  - De-managed entries are pruned. Anything outside the copy roots is dropped into its own pruned group.
  - `attachedTargets: []`, because no pre-123 install was attached.
  - **The legacy `version` is not carried**, since it is the last sync.
- **Relocation**:
  - `writeLegacyPointer` prefixes the old file with a `"//"` member, `LEGACY_POINTER_TEXT`, and keeps the rest;
  - it is idempotent (`legacyHasPointer`).
  - It is **written only when changes apply** (`--apply` / confirmation), never on a report-only run.

**`src/cli/init.ts` — disclosed out-of-list edit (a call-site swap).** The manifest write now goes through `serializeManifest` (plus 2 import lines) instead of `JSON.stringify(…, null, 2)`.
- **Why**: without it, every freshly born repo's first `sync` would rewrite the whole committed manifest into the one-entry-per-line format. That is exactly the committed-file churn C7's format exists to prevent.
- **Authority**: the brief's rule for minimal, disclosed out-of-list edits. `init.ts` is Task 2's Primary Artifact. The swap changes no recorded content, only its serialization. It is covered by the init → sync no-op test (5.4).

## Targeted tests + result

`npx jest src/cli/__tests__/Manifest.test.ts` → **13/13**. The suite was rewritten; the old Spec 111 tests of `bootstrapManifest` and the `.kiro/` path no longer describe the module. It covers:
- root path;
- stable order;
- one entry per line;
- re-serialize equals file, including a reversed-insertion input;
- empty entries;
- the posture/origin round trip;
- no write when identical;
- corrupt → `corrupt`;
- pruning groups (incl. a `src/tokensish/` near-miss that must NOT prune);
- the per-group report with the `src/types` clause;
- the legacy read;
- conversion;
- the pointer and its idempotence.

The "generate green after pruning" fixture is in `sync.test.ts` (see 5.4's doc, § "generate after the src/types pruning").

### Bites recorded red (mutate → run → restore; `cmp` against a pre-bite copy confirmed each restore)

1. **Unsorted entries** (`Object.keys(manifest.entries)` without the sort) → `✕ stable order…` and `✕ re-serialize equals file…` — **2 failed, 11 passed**.
2. **`src/types` dropped from `DEMANAGED_ROOTS`** → `✕ entries under de-managed paths are pruned into one group per root` and `✕ conversion: copy roots → origin copy…` — **2 failed, 11 passed**.

Restored: 13/13.

## Application-time adaptations

1. **The pointer is a JSON member, not a comment line.** "A one-line pointer comment" cannot be a comment in JSON. A leading `"//"` key is the JSON idiom, and it keeps the legacy content intact for one release.
2. **The root manifest is written only when one already existed, new or legacy.** A repo with neither gets a report ("nothing here was recorded as DesignerPunk's") and no manifest. `sync` does not mint a birth marker; `init` and `attach` do.
3. **`version` stays the schema marker `'1'`**, as `init` writes it (Task 2.4, adaptation 4). The design's `version` field is not further specified.
