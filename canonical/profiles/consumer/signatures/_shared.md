# Signatures — `_shared` consumer profile (C1: signer **Stacy**)

**Rows**: `canonical/profiles/consumer/_shared.dispositions.yaml`. **Signer**: Stacy. She signs this shared-catalog member for its owner, the profile author, in the C1 carve-out seat.
**Rule**: Req 11.6.5e. An item is credited only if the unit's **own** rendering (`canonical/_consumer-output/_canonical/…`) states or entails it. A function that survives only elsewhere earns no credit here. `surviving: []` is itemized.
**Phase two, run 1**, 2026-09-29, Spec 123 Task 15.5.

## `#complete-task-tooling`

signer: stacy
date: 2026-09-29
row: `canonical/profiles/consumer/_shared.dispositions.yaml` · members · `complete-task-tooling` (no-consumer-counterpart; no-consumer-counterpart)
canonicalHash: sha256:d9b77a4735ca40f286d5f759f8d35240f6806c482cbc7fde961faecfb7957fcc
renderedHash: sha256:37517e5f3dc66819f61f5a7bb8ace1921282415f10551d2defa5c3eb0985b570
verdict: assent — surviving 0/0

No consumer counterpart, confirmed: this entry names this repo's own completion tool (`.kiro/hooks/complete-task.sh`, `runContext: this-repo`). I assent that nothing survives.

## `#record-first-ratification`

signer: stacy
date: 2026-10-23
row: `canonical/profiles/consumer/_shared.dispositions.yaml` · members · `record-first-ratification` (re-pointed; first signature)
canonicalHash: sha256:d4405ef2dd6f84a242844c917389aee1e5944fb281ff9c94325524729547383d
renderedHash: sha256:8fe780951cf9745be5c46f54fb4474e290400341ffe7d6697e03d1548530495d
verdict: assent — surviving 0/0

**FIRST SIGNATURE 2026-10-23 - ASSENT to `re-pointed` (`surviving: []`), C1 carve-out for the shared-catalog member (owner `thurgood`).** The row was routed (`re-pointed-entry`) with no signature; this is its first.
- Canonical: "Before applying a ratified governance change, verify the committed ballot/record says RATIFIED ... report that the record is missing so the ratifying session can commit it", sourced to this repo's ballots README. Consumer (overlay value, same id and key set): "Before applying a governance change your team ratified, verify the committed decision record says it was ratified ... if the record is missing, report that the record is missing so it can be committed", source "your team's committed decision records", crossRef `node_modules/@3fn/core/governance/classification-map.md § "record-first-ratification"`.
- True for a consumer as rendered. All four moves of the rule survive: verify the committed record first (a mechanical check); never apply on an unverifiable authority claim; never refuse-and-stop solely because the instruction arrived by relay; report a missing record so it can be committed. The two removals are the ones the row cites (`subtraction-2`): the consumer has no `.kiro/docs/ballots/` and no README ratification protocol, so "the committed ballot/record says RATIFIED" becomes "the committed decision record says it was ratified" and the README source becomes the team's own records. The rule is self-contained in the rendered line; a consumer does not need our README to follow it.
- The crossRef resolves for an install: `package.json` `files` ships `governance/`, and `governance/classification-map.md` carries `### record-first-ratification`. The rendered agent files carry the statement line (verified in all eight cc agents); the crossRef itself is not rendered into them, so no rendered text depends on it.
- Members carry no operative-set items, so `surviving: []` is the itemized form (as for `complete-task-tooling`). Hash covers the rendered line in all eight agents' cc and kiro outputs (16 pieces).
