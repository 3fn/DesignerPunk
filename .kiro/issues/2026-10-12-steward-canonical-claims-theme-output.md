# Steward-side canonical agent text claims emitted theme code that nothing produces

**Date**: 2026-10-12
**Status**: ACTIVE
**Owner**: Thurgood (Civitas steward) for the cross-surface consistency flag; the wording is Kenya's (`canonical/agents/kenya.md`) and Data's (`canonical/agents/data.md`), resolved on the intra-domain path. Filed by the orchestrator from Thurgood's U3c sweep (Task 31.0, 2026-10-12).
**Trigger**: whichever comes first — Spec 129 item (i) lands; the next authoring touch of either canonical agent file; or release 3's RELEASE pass.

## What

The U3c sweep (Task 31.0, `git grep` for claims that theme Swift/Kotlin is generated) found the same false claims on the STEWARD side that U3c corrected on the consumer side:
- `canonical/agents/kenya.md` L278 ("Generated Swift output includes: …"), L178 (cue: "theming Swift materializes …"), L202 (gap: "theming Swift materializes …");
- `canonical/agents/data.md` L280 ("Generated Kotlin output includes: …").

Each claims emitted theme code. `generateThemeOverrideBlocks` (`src/generators/TokenFileGenerator.ts` L1028) has no caller in `src` outside tests (Ada, Kenya, Data, Thurgood — read, 2026-10-03/12), so these are false in this repo too, not only in a consumer's.

U3c (Task 31) could not touch them: its batch is the consumer profile, and U3's no-overlap test guards `canonical/agents/**`.

## No fix proposed

The wording is the seats' own; they may keep it until Spec 129 or correct it now. **No fix is authorized by this record.**
