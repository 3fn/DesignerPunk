# Token Governance L177's moved-text pointer has no date of its own, so it is short of the `moved` form in `.kiro/docs/ballots/README.md` L31

**Date**: 2026-10-29
**Filed by**: Ada, owner, under README rule 10, for the CORRECTION I named in `[ADA R2]` and `[ADA R3]` on ballot `.kiro/docs/ballots/2026-10-29-dated-pointer-paths-and-edit-kind-check.md` (§ 5 review, "The moved-text form"; and "The L177 CORRECTION is still mine … I file it after this ballot applies, so that the form I correct it to is law"). That ballot is RATIFIED and applied (#547, #548, #549). Every line below was read at `origin/main` `6f23bc6fe`. Rule 9 applies to every later edit.
**Owner**: Ada (the pointer is mine: I wrote it in #491, and Token Governance's content is my domain).
**Class**: P2 obligation (record) · defect *(set 2026-10-29, Ada, rule 12. The pointer's form is wrong and no reader is misled: the rule text above it is true and unchanged, and the pointer already names the moving ballot, its item, the prior home's lines and the prior SHA, so a reader can find the history. What it lacks is its own date, which L31's ratified `moved` form requires. It is not P3: L31 is law on `governance/**`, so the form is owed, not an improvement. It is not `(guard)`: the ballot's check, `edit-kind-pointers.ts`, reads this shape as `pointer-missing` (its fixture 10), so no instrument is weaker than its claim.)*
**Trigger**: `release:next:phase-1` — the event that owes the close is the next release's S. This record travels in its own fixing CORRECTION PR and is closed there by the outcome line below (rule 11: "A fixing PR closes its record by adding rule 5's outcome line in the same PR"), so it cannot lapse at that S if the PR merges. No `merge:#<N>` token is written because the PR's number does not exist when this file is written, and a token naming a guessed number would be false.

---

## Observation

`governance/Token-Governance.md` L177, at `6f23bc6fe`, § "Component Token Construction Rule", ends with this pointer:

> *(Moved verbatim from Core Goals § "Development Practices" by ballot 2026-10-25-token-selection-order-one-rule, item 1; prior home `.kiro/steering/core-goals.md` L73–74 at `1eced6cd5`.)*

**Why it does not conform.** `.kiro/docs/ballots/README.md` L31 (§ "Conventions", Edit discipline, "Where the pointer is owed", added 2026-10-29 by ballot `2026-10-29-dated-pointer-paths-and-edit-kind-check`) binds `governance/**` and names the form for moved text: `moved <date> from <home> by <ballot> <item>; prior home <path> L<a>–<b> at <SHA>`. L177 has the verb, the home, the ballot, the item, the prior home's lines and the SHA, but no `<date>`. The only date on the line is the one inside the ballot's name, and a ballot name is a source, not a pointer's date (L31: "A ballot citation … names a source and is not a pointer: it carries no date"). The check that ballot built, `scripts/completion-claims/edit-kind-pointers.ts`, matches `POINTER_RE = /\*\((amended|corrected|added|moved) \d{4}-\d{2}-\d{2}/i`, the date directly after the verb, so this shape as an added line reads `pointer-missing` (the ballot's § 5 fixture 10).

**How it came to be.** I wrote it in #491, `a03b92f02`, applying ballot `2026-10-25-token-selection-order-one-rule` item 1, which moved the Component Token Construction Rule from Core Goals into Token Governance. L31's `moved` form did not exist then; it became law on 2026-10-29. The siblings that #491 wrote at the same merge carry dates (Token Governance L41 and L79, Core Goals L61: `Amended 2026-10-25 by ballot 2026-10-25-token-selection-order-one-rule …`); this one did not.

## Truth referent

- The form: `.kiro/docs/ballots/README.md` L31 at `6f23bc6fe`, the `moved` form quoted above.
- The date: the merge of the moving ballot's application, #491, `a03b92f02` (`git log -S'Moved verbatim from Core Goals' --format='%h %cI %s' -- governance/Token-Governance.md` → `a03b92f02 2026-10-25T20:39:53-04:00 Apply ballot 2026-10-25-token-selection-order-one-rule: …(#491)`). The date taken is **2026-10-25**: the commit's own date as recorded, and the date #491's three sibling pointers carry. In UTC the same instant is 2026-10-26T00:39:53Z; I take the recorded local date so that the four pointers one merge wrote carry one date.

## The fix

A CORRECTION of L177's pointer only, content unchanged: `*(moved 2026-10-25 from Core Goals § "Development Practices" by ballot 2026-10-25-token-selection-order-one-rule, item 1; prior home `.kiro/steering/core-goals.md` L73–74 at `1eced6cd5`.)*`. The rule sentence before it does not change.

**"verbatim" is dropped.** L31's form has no slot for it, and the date must follow the verb directly. It is also not exact: the body sentence moved word for word, but its bold label `**Component Token Construction Rule:**` (Core Goals L73 at `1eced6cd5`) became the `###` heading above L177. The prior home and SHA let a reader compare the two.

Token Governance's § "Token Creation Governance", which holds L177, is embedded in my charter's ambient section (`token-governance`), so the CORRECTION re-renders `.claude/agents/ada.md` and `canonical/_consumer-output/cc/.claude/agents/ada.md` (one line each, the same pointer) and moves `canonical/generated.lock`.

## Outcome (2026-10-29, Ada, owner)

**Fixed on branch `fix/token-governance-l177-moved-pointer-date`, in this record's own CORRECTION PR.** The PR is not open at this writing; its number is not recorded here.
- L177's pointer now reads `*(moved 2026-10-25 from Core Goals § "Development Practices" by ballot 2026-10-25-token-selection-order-one-rule, item 1; prior home `.kiro/steering/core-goals.md` L73–74 at `1eced6cd5`.)*`. Nothing else in `governance/Token-Governance.md` changed.
- The fixing commit is the one that adds this file; its SHA is in the PR body, since a commit cannot name its own SHA.
- If the PR does not merge, this line does not land either.

Closed under rule 5. The record stays at the root through this PR so that the path the CORRECTION's Edit-kind line cites resolves at its merge commit (rule 10, `git cat-file -e <m>:<the path as cited>`); it is archived at the next walk.
