# Component Schemas Omit Tokens That Web Code Reads, So `get_token_consumers` Omits Their Consumers

**Date**: 2026-10-23
**Filed by**: Lina, under rule 10, moving item 4 out of `2026-10-23-component-token-usage-findings-from-drift-pass.md` on the steward's review (Thurgood, 2026-10-23: item 4 meets the drift record's P0 reading)
**Owners**: Lina (schemas: add the omitted declarations), Ada (the declared-versus-read instrument, which extends `StemmaTokenUsageValidator.validateAgainstSchema`). Each writes their own part (rule 9).
**Class**: P0 false-claim · defect *(set 2026-10-23, Lina, owner, rule 12, on the M7 reading the steward put. `get_token_consumers` and the consumers field of `get_token` answer from the token-index consumer map, which is built from the schemas' `tokens:` lists. After the 2026-10-23 name normalization every declared name resolves (513 declarations, 0 unresolved), but web code reads tokens the schemas do not declare, so the MCP omits those consumers and an agent asking "who reads `shadow.hover`" gets an answer that leaves Button-CTA out. That is an MCP response a package reader meets. The CHANGELOG `[Unreleased]` line does not count at an agent reader (M7's disclosure sentence). Only Peter downgrades.)*
**Trigger**: `release:next:phase-1`. The release-5 walk reads it: fixed, waived in writing, or blocking. The event that closes it is one of the two fixes below, whichever lands first; neither is a git-visible token yet, so the release walk is the event.

---

## What is false

The count is Ada's (drift ruling 2026-10-23, flag L-5): **94 tokens that code under `platforms/web/**` reads and the owning schema does not declare**, from a script mapping each `var(--…)` back to its token-index key. **It was not recomputed here and must be re-run before anyone acts on the number.** Examples from the findings record: Button-CTA reads `shadow.hover`, `radius200`, `tapAreaMinimum`, `space.inset.300` and `space.inset.400` without declaring them; Input-Checkbox reads `labelLg` and `caption`. Two further surfaces the name guard does not read: the three Badge schemas (Badge-Count-Base, Badge-Count-Notification, Badge-Label-Base) have no `tokens:` key, so no Badge component is a consumer of anything; Container-Card-Base's `default_tokens:` names `radius.normal`, which its `tokens:` does not declare.

Platform scope: the 94 is web-read only. iOS and Android reads are not counted anywhere yet; the same omission is likely there and is part of the instrument's job.

## Fix shape (the fork is the owners', then Peter's)

- **(i) A schema pass** (Lina): add each omitted token to the schema's own `tokens:` groups, own-tokens-only (inherited and composed tokens stay out, see the findings record's item 6). Closes today's gap; nothing stops it reopening.
- **(ii) The instrument** (Ada): a declared-versus-read check extending `StemmaTokenUsageValidator.validateAgainstSchema` (which today matches by substring), run in the suite, so a read without a declaration fails a test. **Class option: (ii), with (i) as its first run.** Cost: it needs a settled definition of "read" per platform (web `var(--…)`, iOS and Android constants) and an adjudication list for deliberate non-declarations. Surviving counter-argument: a check that only reads web code leaves the iOS and Android omissions in place and tells no one; scope it to all three platforms or name the web-only limit in its message.

## Notes

- `2026-10-23-component-token-usage-findings-from-drift-pass.md` item 4 is the origin and keeps its text; its trigger no longer names this fix.
- `2026-06-25-component-schema-token-name-drift.md` (names: RESOLVED-pending-merge) cites this record for the completeness half, so that record's closure is not read as closing this.

*Signed: Lina, 2026-10-23.*

## Owner line (2026-10-25, Lina, rule 9): RULED, (i) and the scope note before S; Ada's instrument is not in 16.1.0

On Peter, 2026-10-25, in chat, relayed verbatim by the orchestrator: "Fix all of them as the owners recommend; T is (A)". *Unverified here: chat only (chat, relayed). Peter may confirm the relay on the PR; his words are now committed in this record.* Read against the 16.1.0 walk (row 4). The adoption is of my recommendation.
- **Ruled, mine**: (i) the schema pass, and a one-line scope note on the `get_token_consumers` response and its tool description (it answers from schema-declared tokens only; web reads are counted when declared, iOS and Android reads are not covered), both before S. The note is needed either way: (i) alone still leaves native silent. The count is re-run at the fixing branch (my re-run found 80 web `var(--…)` reads in 20 components against Ada's 94; the PR states the number it fixed).
- **Ruled, Ada's**: the declared-versus-read instrument (ii) is not in 16.1.0 (Ada's pick, adopted). Its start condition is (i)'s merge.
- **Trigger**: stays `release:next:phase-1`. I change it to `merge:#<N>` in the same diff when the fixing PR opens, with a dated reason (README rule 1).
- **Residual, unchanged**: with (i) merged and no instrument, nothing stops the gap reopening; that is the exposure between 16.1.0 and (ii).

*Signed: Lina, 2026-10-25.*
