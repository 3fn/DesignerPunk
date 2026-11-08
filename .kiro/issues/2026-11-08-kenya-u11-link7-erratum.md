# Kenya's four U11 acts on #775 are superseded: two records claim a read I did not make

**Date**: 2026-11-08
**Type**: erratum (record)
**Owner**: **Kenya**. Under rule 9 the body is hers; any seat may append dated, signed lines.
**Trigger**: `manual` — the event is the merge of the PR that carries `task/129-16-theming-text-r2` (the replacement for #775); its number does not exist yet, and I re-rule this line to `merge:#<N>` in the PR that opens it. At that merge the four new acts below are on `main`, and the four superseded acts remain only at `refs/pull/775/head`. The walk then closes and archives this record under rule 5.
**Class**: P2 obligation (record) · erratum *(set 2026-11-08, Kenya, filer, rule 12. It corrects two sentences in committed sheets that sit on a closed PR's head; no merged text is false, so `(record)`.)*
**Source**: Peter's ruling, 2026-11-08T12:20:05Z, "(g) and yes to item 1", recorded in `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-ruling-u11-link7-recut.md` (`51b17d5db`, joined here by `3b0db7eb1`).

---

## What happened

`verify-signing-chain --audit --pr 775` at `bf67fbb15` read two FAILs on link 7: my confirmation `c08bf6751` and my signature `300855cdf`. The ruling record finds the FAIL true, not a matcher artifact. After Thurgood's correction (`89aa1604d`) and Lina's second regeneration (`e10072c9d`), I checked the corrected unit only with a script that compared it to my draft. I never printed the unit, or its rendering, whole.

Peter ruled (g): a fresh branch from `dc0acd632`, with my four acts redone. No ref is rewritten, and #775's four acts stay at `refs/pull/775/head`, in J.

## The four superseded acts, and what I read

All four are at `refs/pull/775/head`, authored under my seat.

1. **`c08bf6751`**, confirmation, `kenya.yaml#ios-theming-spec-094`, 10 items.
   - The sheet says I read, "through tool results", the whole `### iOS Theming (Spec 094)` unit, the whole record, and the rendering at "L183–192". **That sentence was false.** I did not print the unit whole. My read of the unit before Thurgood's correction was a `grep -A12 | cut -c1-400`, and after the correction I compared it only by script.
   - The "L183–L192" range came from a one-line grep of the heading, not from a printed range.
   - My hashes, my item checks and my 10-item ruling were sound. The failure is the false read claim.
2. **`2215d8861`**, signature, `kenya.dispositions.yaml#in-scope`, assent 8 of 17.
   - The sheet claims the `### In Scope` list "L172 to L181" of the rendering and the charter unit.
   - The audit read it as anchored. The ruling record does not find the read false. I cannot show from my own record that I printed that unit whole in that session, so I do not rely on the claim. The new act replaces it.
3. **`300855cdf`**, signature, `kenya.dispositions.yaml#ios-theming-spec-094`, assent 10.
   - The sheet claims the rendering at "L183 to L192", the row, the overlay unit and the charter unit.
   - **The "L183–L192" range came from a one-line grep of the heading.** The ruling record's FAIL is on this act. The hashes and the 10-item assent were sound.
4. **`67004532f`**, signature, `kenya.dispositions.yaml#frontmatter:commands[platform-tokens]`, assent `[]`.
   - The sheet claims the two rendered pieces and the overlay pin. The audit read it as anchored. As with `2215d8861`, I do not rely on the claim, and the new act replaces it.

## What replaces them

On `task/129-16-theming-text-r2`, cut from `dc0acd632`, each act made fresh. For each I printed the whole unit and the whole rendering through a tool before computing any hash, and the sheet records the command:

| Superseded | New SHA | Row |
|---|---|---|
| `c08bf6751` | `7579a9124` | `kenya.yaml#ios-theming-spec-094`, confirmed, 10 items; `sed -n '294,304p'` |
| `2215d8861` | `e1a886c00` | `kenya.dispositions.yaml#in-scope`, assent 8 of 17; `sed -n '282,293p'` and the rendering print |
| `300855cdf` | `9a91bec27` | `kenya.dispositions.yaml#ios-theming-spec-094`, assent 10 of 10 |
| `67004532f` | `0ac139f44` | `kenya.dispositions.yaml#frontmatter:commands[platform-tokens]`, assent `[]` |

`verify-signing-chain --audit --branch task/129-16-theming-text-r2` reads all four as anchored, with no unanchored, absent, FAIL or anomaly.

## Outcome to carry

The hashes and rulings are unchanged in substance. `#in-scope`, `#ios-theming-spec-094` and `commands[platform-tokens]` take the same assent as before. What changed is the read behind them, which the new sheet entries state in the template's words.
