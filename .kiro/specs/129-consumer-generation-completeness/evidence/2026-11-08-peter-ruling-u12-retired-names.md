# Peter's ruling: fix the shipped text that names the retired native files in U12, after a full diagnosis

**Recorded by**: the orchestrator. The time was taken from the clock at receipt (`date -u`).

## The exchange

1. **The finding.** Task 18's criterion reads: "At U12's head, no shipped text names a `dist/` file Task 17 removes".
   - Task 17 stops shipping `dist/{DesignTokens,ComponentTokens}.{ios.swift,android.kt}`.
   - Thurgood's 18.2 grep found two kinds of shipped text that still name them:
     - Kenya's and Data's consumer agent layer: the `ambient` trim cues, plus prose that says "never read the base snapshots in the installed package (`node_modules/@3fn/core/dist/*.ios.swift`)";
     - three component source comments, in Badge-Label-Base and Container-Base.
2. **What was put to Peter** (orchestrator, 2026-11-08). Two options:
   - fix both in U12, through a tasks amendment and a signing cycle (recommended; Thurgood, Kenya and Data agreed);
   - or leave them, disclosed ⚠️ with a record.

   The counter-argument that survived came from Thurgood: the fix costs an amendment and a signing cycle, to remove cues that no longer do any harm.
3. **2026-11-08T14:47:50Z**, Peter: **"Fix both in U12, but work with the relevant agents to fully diagnose before executing in case there's a reason for the current state"**

## The diagnosis (five read-only seat consults, then the drafts)

- **No reason to keep them.** Every mention came in as a plain pointer or a forecast (Kenya, Data, Lina, Ada):
  - the Spec 122 cutovers, 2026-07-11;
  - Spec 123 U2b (`669b51b09`, 2026-10-02, "due to stop shipping");
  - the component comments, January 2026.

  None was written to outlast the retirement. Req 10 and the design never consider them.
- **No older-package guard is lost** (Ada). Installing the new package replaces the old files in `node_modules`, and the new agent layer only arrives with the new package.
- **The source is the consumer overlays, not the charters** (Thurgood, Kenya, Data). In-repo, the build still writes the four files, so the charter text stays true here. The charters, `canonicalHash` and `operative-sets` do not change.
- **The route** (Thurgood):
  - the consumer dispositions of `trims[dist/ComponentTokens.*]` become `superseded-by` (the DesignTokens rows already are);
  - the overlay entries are deleted;
  - the overlay prose is reworded in each seat's own words;
  - the `groundTruthManifest` verdict row also becomes `superseded-by`, so no empty heading renders;
  - Lina regenerates;
  - Kenya re-signs 7 keys and Data 6, using `verify-signing-chain --print`;
  - Lina rewords the three comments.
- **Out of scope:** `dist/product/ProductTokens.*`. It is the consumer's own output path, not a retired file.

## What was ruled

Peter's words direct the fix in U12, after diagnosis. The diagnosis found no reason for the current state, so the fix proceeds through tasks amendment 13 (Task 18, subtask 18.5), which Peter merges.
