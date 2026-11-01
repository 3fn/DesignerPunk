# Retire `package.json`'s `postpublish`: dead on the only permitted publish path (row (h), split off from the in-repo-generate record)

**Date**: 2026-11-01
**Filed by**: Ada, owner, under README rule 10, in the commit that re-rules `.kiro/issues/2026-10-01-in-repo-generate-output-contaminates-package-dist.md` to Spec 129. That record's deferred row (h) does not go to Spec 129: the collective's sheet r2.1 split it off ("Row (h) splits off as fix-now by 16.3.0"), and Spec 129's scope intake says the same (`design-outline.md`, 2026-10-30, #574 `616f5a208`: "Row (h), retiring `postpublish`, is fix-now by 16.3.0's S, outside this spec"). A record carries one Trigger, so this file carries row (h). Read at `origin/main` `1e2f82b44`. Rule 9 applies to every later edit.
**Owner**: Ada (`scripts/release-publish.ts` and the publish path are in my standing scope; row (h) was mine in the parent record).
**Class**: P2 obligation (record) · owed-act *(set 2026-11-01, Ada, rule 12. Nothing is false at a reader and no guard is weaker than its claim: the script is a warn-only line that runs on no permitted path. The owed act is the removal, decided under Peter's delegation. P2 and not P3, so that the act cannot fall silent: a P3 would take `manual`.)*
**Trigger**: `release:16.3.0:phase-1` — the event that owes the close is 16.3.0's RELEASE phase 1, by the disposition "fix-now by 16.3.0's S". The token names the version, not `next`, because this record is filed before 16.2.0's walk record merges, and `release:next:phase-1` would resolve to 16.2.0. **If the release after 16.2.0 is ratified under another version**, its walk's due-rows grep will not match this token. I re-token this line to that version at that release's bump ratification. *(Set 2026-11-01, Ada, rules 1 and 9. Authority: Peter's one-off delegation, `DLG@d34fc77868f649d3c67bd1b1da47bc6f2a805920`, as answered in `R8@0184efb3fd7b2956677351fdf84899767a5ac74a`, both in `.kiro/issues/2026-10-30-release-16-2-peter-rulings-and-delegation.md`.)*

---

## What is owed

- **The script**: `package.json` L203 at `1e2f82b44`, `"postpublish": "git diff --quiet token-index/ || echo '⚠️  token-index/ changed during publish — …'"`.
- **Why it is dead**: a tarball publish runs no lifecycle scripts (RELEASE-FLOW step 5, L145: "no `prepublishOnly`, no `postpublish`"). A folder publish, the only path that would run it, is refused by `prepublishOnly`, which names `scripts/release-publish.ts`. The parent record's § "the fix: what landed on `fix/hermetic-publish-path`" says it stays only until "the law text stops describing it" (row (h)).
- **The law text that still describes it**: RELEASE-FLOW L145 (above) and the § "What changed and why" table, L237 (`postpublish` … "warn-only tripwire; **no git write, no push**"). A removal that leaves those lines unchanged makes them false.

## The fix

One PR, before 16.3.0's S:
1. Remove the `postpublish` key from `package.json`. `package.json` is outside my standing write scope, so the PR needs a grant record naming it, filed before that PR (README rule 8, rule 10).
2. Change RELEASE-FLOW L145 and L237 to say the script is gone. RELEASE-FLOW is Thurgood's file and a governance path, so that is his edit, with an `**Edit kind**:` line. If it only states the removal it is a CORRECTION; if anything else changes it is LAW.
3. Confirm that `scripts/pack-assert.ts` and `scripts/release-publish.ts` do not read `postpublish`, and that no test pins it (`git grep -n postpublish -- scripts src tests`). Fix any hit in the same PR.

**Surviving counter-argument**: the line is harmless where it sits. A tarball publish never runs it, and a folder publish is refused before it would. Removing it costs a grant, a law-text edit and a PR for no behaviour change. What survives that: RELEASE-FLOW describes a script whose only purpose was a path that is now refused. While both stay, a reader of either has to know the other to see the line is dead. That is the parent record's own condition for removing it.
