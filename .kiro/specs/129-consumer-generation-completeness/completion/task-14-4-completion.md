# Task 14.4 — The served sentences on registered themes; the web agent line; regeneration, profile-author acts, then Sparky's confirmation

**Agents**: Ada (served sentences, joins), Sparky (the three charter lines, his draft; the confirmation), Lina (regeneration, lock), Thurgood (profile-author acts; the install-doc pins under grant #761)

## What changed

- Served sentences, in Ada's words (`ec23a5a18`): `Rosetta-System-Architecture.md`, `Token-Quick-Reference.md`, `DesignerPunk-Integration-Guide.md`; `docs/consumer/INSTALL.md` re-derived by `scripts/derive-install-doc.ts`.
- The web agent's lines L311-L313 in `canonical/agents/sparky.md`: Sparky's draft, committed verbatim by Ada (`85e730f84`), because a seat that confirms never authors its own charter text in this range (signing-chain F12′).
- Thurgood re-quoted theming-2, theming-3 and theming-5 in `canonical/operative-sets/sparky.yaml#web-theming` (`645f9ed62`); Lina regenerated Sparky's five outputs (`d35ab492b`); Sparky re-confirmed `#web-theming` at 5 items with a hash he computed himself (`164c6d437`); Lina refreshed the lock (`4502b8ee4`). No authoring commit moved a `canonicalHash`.
- The scope sentence's pins in `scripts/__tests__/install-doc.test.ts` and `README.md` L129: Thurgood, under the grant `.kiro/issues/2026-11-08-u9-install-doc-scope-sentence-grant.md` (#761), `2750c5072`.

## Targeted tests and result

`npx tsx tools/agent-generator/diff-guard.ts`: no-op-green. `verify-signing-chain --ci --base origin/main --head HEAD`: PASS, 1 row, 0 stale, 0 unsigned. `npx jest --config scripts/jest.config.js scripts/__tests__/install-doc.test.ts`: 81 pass. `test:agent-generator` (Lina): 1798 pass.

## Application-time adaptations

- No signature row exists to re-sign: the consumer row's disposition for Sparky's `#web-theming` is `retained`, so the confirmation alone meets "after Sparky's confirmation and signature".
- `Token-Governance.md` L242 and L264 are not edited here: they are the Req 15.6 ballot edit (tasks.md L246), Thurgood holding it, Ada writing the text.
