# Task 5.3 Completion — Key-grain JSON manager, parsed-value reading, no-write-when-unchanged, three shapes

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 5 · **Agent**: Lina (Opus)

## What changed

### New `src/cli/sync/KeyGrain.ts`

- **Three shapes** (`KEY_SURFACES`):
  - `mcpServers.<key>` in `.kiro/settings/mcp.json` (kiro) and in `.mcp.json` (cc);
  - the `permissions.allow` **array-entry** grain in `.claude/settings.json` (cc).
- **Reading = parsed values** (tasks.md § "Open inputs" 5.3):
  - only keys the package emits or the manifest recorded are ever classified;
  - every other key in the file is the consumer's, and is never read or written;
  - the manifest's record is what makes a key ours (C7's namespace rule). A key under our prefix that was never recorded is reported once as "yours, under DesignerPunk's prefix", and is never managed or removed.
- **Classification** per key: `unchanged`, `updated-safe`, `conflict`, `deleted-by-you`, `new` (the surface is attached: it has recorded entries), `untracked-new` (the surface was never recorded), and `removed`.
- **Writing** (`writeSurfaceKeys`):
  - returns without writing when every edit is already present with an equal parsed value;
  - otherwise re-serializes with insertion order preserved (existing keys keep their position; new keys append) and 2-space indentation.
  - **When our keys are unchanged, nothing is written** — no call reaches the writer.
- **The package side is the emitters' own output.** `computePackageKeys` runs `shared/mcpConfig/{kiro,cc}.ts` against a scratch directory for the manifest's `attachedTargets` and captures every key they record. So the value `sync` compares against is byte-for-byte what `init` writes, with no second copy of the emission shape to drift.
  - It **refuses** (`unavailable`, reported) when the package's template or `dist/mcp/tool-manifest.json` is missing. The emitters fail soft there (empty approvals), which would otherwise read as "the package now approves nothing".
- **Hash contract**: `hashKeyValue = sha256(JSON.stringify(value))`, identical to `init`'s `ManifestBuilder.recordKey`. The init → sync no-op test asserts it end to end (5.4).

### `src/cli/shared/mcpConfig/cc.ts` — disclosed out-of-list edit (a call-site swap)

The two `manifest.recordFile('.claude/settings.json', …, 'generated')` calls became `manifest.recordKey('.claude/settings.json', entry, entry)` per allow entry. The create path records all entries; the merge path records **only the entries we added**, since pre-existing ones are hers.
- **Why**: C7's managed-set row makes `.claude/settings.json` KEY grain (`permissions.allow` entries matching `mcp__designerpunk-*`). Task 2.4's completion doc flagged the whole-file entry as Task 5's call ("C7's later managed-set design (Task 5, `sync`) may want finer key-grain tracking"). With a whole-file entry, one consumer-added rule would make the file read as edited, which is the property 5.3 exists to prevent.
- **Blast radius**: none released. Release 1 has not shipped, so no consumer holds a whole-file entry. No `init.test.ts` assertion references the entry.
- **Authority**: the brief's minimal, disclosed out-of-list rule. `cc.ts` is Task 4's Primary Artifact. This is a swap of two recording call sites, with no behavior change to what is written to disk.

## Targeted tests + result

`npx jest src/cli/__tests__/sync.keygrain.test.ts` → **13/13**, including:
- **exactly three shapes** (count asserted);
- **an updating sync preserves consumer entries by parsed value on all three shapes**. The package changes a template env var and gains a read-only tool, so every surface IS written. Checked: consumer server keys deep-equal before and after; a consumer `designerpunk-mine` server and a consumer-authored `mcp__designerpunk-docs` rule survive and are reported as hers; allow-list order is preserved and the length grows by exactly 1;
- insertion order preserved + 2-space on the write;
- per shape (`describe.each` × 3), **our keys unchanged → bytes and mtime unchanged**, even with a hand-reformatted 4-space, no-trailing-newline file;
- per shape, **deleting our key → `deleted-by-you`**, catalog string printed, bytes unchanged;
- **editing our key → `conflict`** on both `mcpServers` shapes: never overwritten, and the file is not written;
- **editing an allow entry → `deleted-by-you` + "yours"** (see the scope note below);
- the hash contract.

### Bites recorded red (mutate `KeyGrain.ts` → run → restore; `cmp` confirmed each restore)

1. `unchanged` misread as `updated-safe` → `✕ our keys unchanged → the file bytes are unchanged…` ×3 (one per shape) — **3 failed**.
2. The writer drops consumer servers (`doc.mcpServers = {}`) → `✕ consumer entries survive…`, `✕ … insertion order preserved…` — **2 failed**.
3. `conflict` → `updated-safe` (edited key overwritten) → `✕ editing our key → conflict` ×2 — **2 failed**.
4. `deleted-by-you` → `new` (re-added) → `✕ deleting our key…` ×3, `✕ editing an allow entry…` — **4 failed**.
5. The prefix keys are not reported as hers → `✕ consumer entries survive…`, `✕ editing an allow entry…` — **2 failed**.

Restored: 13/13.

## Application-time adaptations

1. **At the array-entry grain, "editing our key → conflict" is not reachable, by construction.** An allow entry's identity IS its string, so an edit is indistinguishable from delete + add. It reads as `deleted-by-you` for ours plus "yours, under DesignerPunk's prefix" for the new string. `conflict` is asserted on the two `mcpServers` shapes; the allow shape asserts the delete + yours reading. This is stated in the test header's scope note (R26.8).
2. **The key hash is order-sensitive** (`JSON.stringify`, matching `init`). If she only reorders the properties inside one of our server entries, it reads as an edit (`conflict`, never overwritten). This errs toward reporting. Her OWN entries are compared by deep equality, never by hash.
3. **`removed` keys are reported, not deleted.** When the package stops emitting a key she still has, e.g. a tool whose `readOnlyHint` flipped to false, the report lists it under "Removed from package" and leaves it. **Residual worth flagging**: a stale auto-approval of a tool that became mutating stays approved until she removes it. U2's generated-surface `sync` (16.5) is the natural place to decide whether an unedited, recorded-but-no-longer-emitted approval should be withdrawn after the report.
4. **`untracked-new` prints the catalog string, which names `npx designerpunk attach --target=<t>`. `attach` arrives in release 2 (Task 16).** In release 1 the string can only appear for a born-U1 repo whose manifest recorded no key for an attached surface (e.g. `init` skipped every key because she already had them). It is string-equal to the catalog. The one-release gap is a residual for the orchestrator, and I did not re-word it.
