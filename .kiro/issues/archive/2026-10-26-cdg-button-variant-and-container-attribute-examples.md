# The CDG's Button-CTA variant example and its nested-container example silently do not do what they show

**Date**: 2026-10-26
**Filed by**: Lina, under README rule 10, for RL-35 of Stacy's claims pass (`.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.1.0.md`, phase 1 addendum 4, § "RL-35", commit `b0f618d14` on `origin/chore/release-16.1.0-claims-pass-phase-1`, not on `main` at filing). The same addendum's (C), (D) and (E), which Stacy routed to me as not floor-class, are carried here too. Every line number below is in `governance/Component-Development-Guide.md` at `38f4ece47` (#505), the final S of 16.1.0. Source lines are at the same commit. Rule 9 applies to every later edit.
**Owner**: Lina (the CDG's content, Button-CTA and Container-Base are mine).
**Class**: P0 false-claim · defect *(set 2026-10-26, Lina, rule 12. The CDG is a served doc and `governance/` is in `files[]`. Both examples are complete, sit on real shipped tags, are presented as correct (or as the DO of an anti-pattern) and fail silently, so they are false where a reader of the package meets them. That meets M7's P0 definition as written, and Stacy reads both as P0-shaped at the web reader. **The counter-reading** (P3 improvement): the harm is low. (A)'s sentence about the attribute's *name* is true. (B) sits in an anti-pattern section whose fix is a one-word rename. No shipped component copies either. That is an argument for a downgrade, and only Peter downgrades a P0, so I class it at the definition and leave the downgrade to him.)*
**Trigger**: `release:next:phase-1` — the event that owes the close is the next release's S. The fixing PR (plan item 1) closes this record with rule 5's outcome line; the token becomes `merge:#<N>` when that PR opens. **Lapse condition**: if the commit carrying item 1 (with this record's outcome line) is not an ancestor of the next release's S, this record lapses at that S. Being P0, it then goes to Peter at that first lapse with exactly spec, drop or fix-now (rule 11). The waiver below covers 16.1.0 only, so at that walk this record is floor-class again.

This record merges after 16.1.0's tag by design, so it is not an ancestor of 16.1.0's S `38f4ece47` and is not read at 16.1.0's walk. `release:next:phase-1` resolves to the release after 16.1.0.

---

## Finding

**(A) A Button-CTA variant that does not exist, under "✅ CORRECT".** § "Variant Attribute Naming": L419 heads the block `<!-- ✅ CORRECT: Use variant attribute -->`, and L422 is `<button-cta variant="danger" label="Delete"></button-cta>`. L442, in "TypeScript Interface Pattern", is `variant?: 'primary' | 'secondary' | 'danger';  // ✅ Use variant`.
- Shipped variants: `ButtonStyle = 'primary' | 'secondary' | 'tertiary'` (`src/components/core/Button-CTA/types.ts` L57).
- The web element returns the attribute only if it is one of the three, and otherwise falls back to `'primary'`, with no warning (packed `ButtonCTA.web.js` L349–L352, per Stacy).
- So the "correct" Delete button renders as a primary button, the interface teaches a variant that does not exist, and it omits `tertiary`.
- The section's point (`variant`, not `style`) is about the attribute's name, and it stays true.

**(B) A camelCase attribute the element never reads, in both the DON'T and the DO.** § "❌ Nested Containers with Same Border Radius": L1682–L1683 (DON'T) and L1689–L1690 (DO) write `<container-base borderRadius="…">`.
- HTML lowercases attribute names, so the parser stores `borderradius`. `ContainerBase.web.ts` observes and reads `border-radius` (L167, L306).
- So neither container gets a radius. The DON'T shows no overlap, the DO shows no alignment, both render the same, and nothing reports an error.
- `borderRadius` is the cross-platform *prop* name (`BorderRadiusValue = 'none' | 'tight' | 'normal' | 'loose'`, `types.ts` L61–L65). On the web element it is the hyphenated attribute.
- `padding="200"` is read and applied.

**Read from source and the HTML attribute rule, not run in a browser** (Stacy's reading, and mine).

**Age.** Both are pre-existing. At `v16.0.0`, (A) was at L415/L435 and (B) at L1664–L1675. Not introduced by 16.1.0.

**Scope of the scan.** Stacy scanned every packed served doc for attributes on the 34 packed web tags. (B) is the only unread attribute, and `variant="danger"` is the only invalid value. My own read of the CDG's `<button-cta`, `<container-base` and `<icon-base` examples agrees. The CDG has no `<input-` examples. `governance/Token-Resolution-Patterns.md` L47 and L449 use `'danger'` in an example labelled hypothetical, on no shipped tag, so they are not false and not in this record.

## Waiver for 16.1.0

Peter waived RL-35 for 16.1.0, in chat, relayed by the orchestrator, received before 2026-10-26T17:01:28Z by the orchestrator's clock. His words, verbatim:

> "Go with an amended option 2 ("Waive under the rule now with a plan"), with the rule approved by relevant agents"

**The rule** is 16.1.0's post-walk example-falsity rule (Thurgood's amended text; my approval proposes an amendment to clause 6's reader, and addendum 5 records which text the seats approved). Its seat-approved text lands in Stacy's phase 1 addendum 5 in `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.1.0.md` (#497's branch, `chore/release-16.1.0-claims-pass-phase-1`). This record applies the rule's clauses as numbered in that text:
- **Clause 1**: 16.1.0 only; the rule expires at the v16.1.0 tag.
- **Clause 2**: both finds are falsities in fenced examples in a packed `governance/**` doc, and both meet all four conditions:
  - **Found after the walk record merged and before the tag.** The walk record merged as `264c25661` (#469, 2026-10-25). Stacy's addendum 4 found both at `b0f618d14` (2026-10-26), and no `v16.1.0` tag existed at filing.
  - **Not a walk row.**
  - **Pre-existing.** Both are present at `v16.0.0` (§ "Finding", Age).
  - **Not introduced by a PR in the 16.1.0 delta.** The lines are byte-identical at `v16.0.0` and at `38f4ece47`: L415 → L422 and L435 → L442 (each line matched in full), and L1664–L1672 → L1682–L1690 (the block `diff`s clean). So no 16.1.0 PR wrote them; they only moved down the file.
- **Clause 3**: they do not hold the tag. I file this record with a dated plan due before the next release's walk, and the release notes disclose it.
- **Clause 4**: Peter may take up either find individually.
- **Clause 5**: RL-35 is the first application.
- **Clause 6**: the class fix (plan item 3).

**Scope**: 16.1.0 only, and RL-35 only.

## The dated plan

1. **One CORRECTION PR to the CDG.** It is the same PR as plan item 2 of `2026-10-26-cdg-web-icon-typescript-example-false.md`. **Owner**: Lina. **Due**: merged before the next release's walk (RELEASE-FLOW 3a at the next S). At `38f4ece47`'s line numbers, it:
   - replaces L422 with `<button-cta variant="tertiary" label="Learn More"></button-cta>`. The label changes too, so the example does not teach a destructive action as tertiary. "Learn More" is `types.ts` L54's own example;
   - replaces L442 with `  variant?: 'primary' | 'secondary' | 'tertiary';  // ✅ Use variant`;
   - changes `borderRadius=` to `border-radius=` on L1682, L1683, L1689 and L1690, with values unchanged. L1695's prose `inner borderRadius = outer borderRadius - padding` names the prop, not the attribute, and stays;
   - reads the rest of the L438–L446 interface against the shipped one and aligns it, or says in the text that it is a pattern and not Button-CTA's interface. The shipped interface is `ButtonProps`, not `ButtonCTAProps` (`types.ts` L90), and its `icon` is `IconBaseName`, not `string` (L173). These are loud, not silent, and Stacy did not raise them. I name them here so the PR does not leave the block half-true.
2. **Addendum 4's (C), (D), (E)**, which Stacy read as not floor-class and routed to me. Each is in item 1's PR. **Owner**: Lina.
   - **(C)** L1252–L1336, the incremental-DOM "Architecture Pattern": add `static get observedAttributes()` so the shown `attributeChangedCallback` fires (its named source, `ButtonVerticalListItem.web.ts`, has it), or mark the fragment incomplete.
   - **(D)** L602–L617: replace Lit's `static styles = css\`…\`` with the plain-`HTMLElement` form shipped Button-CTA uses (a `<style>` in the shadow root, `ButtonCTA.web.ts` L515–L516), keeping the token names.
   - **(E)** L1862 and L1885–L1887: `src/components/core/ButtonCTA/…` → `src/components/core/Button-CTA/…`.
3. **The class fix (rule clause 6).** A behavior/attribute check, as a version bump of the governance-examples guard. **Owner**: Thurgood (the instrument). **Predicate**: Lina, who writes it. The predicate checks:
   - every attribute on a packed web tag against that element's `observedAttributes` and `getAttribute`/`hasAttribute` reads. Those are the hyphenated attribute names, not the schema's camelCase prop names: a check against schema props would pass (B), because `borderRadius` *is* a schema prop;
   - every enumerated value against the prop's type union;
   - CSS fences for a `var()` that references the property being declared.

   Clause 6 proposes it as an amendment to ballot `2026-10-26-governance-examples-guard` after the guard's v1 is built. **Due**: built before the next release's walk; if it is not built by then, the standing question returns to Peter at that walk. Item 1 does not wait on it. **Home**: this record holds my predicate obligation. Thurgood's build and the ballot amendment are his to record; this record does not file them for him.

## Close

Item 1's PR adds rule 5's dated outcome line here, naming whether item 3's predicate had landed, and moves this record to `archive/`. If item 3 is still open then, the PR moves its line to Thurgood's record for the guard, with a pointer here.

## Outcome (2026-10-26, Lina, rule 5)

**Closed by** the post-release CORRECTION PR on branch `fix/cdg-web-icon-examples-and-attributes` (CDG commit `a8319b0f9`), the same PR as plan item 2 of `2026-10-26-cdg-web-icon-typescript-example-false.md`, on Peter's go: "Let's start with item 1, Lina's correction PRs" (2026-10-26, relayed by the orchestrator, received before 17:59:29Z by its clock). Old line numbers are at `0218632d1` (unchanged from `38f4ece47`); new ones are at the PR's head.

**Item 1**:
- L422 → `<button-cta variant="tertiary" label="Learn More"></button-cta>` (head L422).
- L440 `ButtonCTAProps` → `ButtonProps`, with a comment naming it Button-CTA's own interface, abridged, and the omitted fields (head L439–L441); L442 → `variant?: 'primary' | 'secondary' | 'tertiary';  // ✅ Use variant` (head L443); L444 `icon?: string` → `icon?: IconBaseName` (head L445). `size`'s union already matched `ButtonSize` (`types.ts` L33). Source: `src/components/core/Button-CTA/types.ts` L57, L90, L173.
- L1682, L1683, L1689, L1690 `borderRadius=` → `border-radius=`, values unchanged (head L1725, L1726, L1732, L1733). L1695's prose names the prop and stays.

**Item 2**:
- **(C)** the incremental-DOM pattern (head L1290–L1305) gains `static get observedAttributes()` returning `['label', 'icon']`, so the shown `attributeChangedCallback` fires, and a comment marks the fragment abridged (its getters, styles and blend colors are elided; `ButtonVerticalListItem.web.ts` L251 is the whole element).
- **(D)** L602–L617: Lit's `static styles = css\`…\`` → a `styles` string injected as a `<style>` in a plain `HTMLElement`'s shadow root, as shipped Button-CTA does (`ButtonCTA.web.ts` L39, L516), token names unchanged (head L603–L626).
- **(E)** L1862, L1885–L1887: `src/components/core/ButtonCTA/…` → `src/components/core/Button-CTA/…` (head L1905, L1928–L1930); all four paths exist.

**Item 3 had not landed.** The guard is not built (`scripts/governance-examples/` does not exist at `0218632d1`), and no record of Thurgood's for the guard exists to move the line to, so my predicate obligation moves to its own record, `2026-10-26-examples-guard-attribute-predicate.md`, filed in this PR. Thurgood's build and the ballot amendment stay his.

*Signed: Lina, 2026-10-26.*
