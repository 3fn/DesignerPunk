# `src/build` comments, a selection type and error text state the old token order ("semantic → primitive → component"), which the Token Selection Matrix no longer says

**Date**: 2026-10-25
**Owner**: Ada (Rosetta; `src/build/tokens/**` and `src/build/errors/**` are token-build code, but `src/build` is in no seat's standing write scope, so the fix needs a grant, below)
**Filed by**: Ada, under README rule 10, in the application PR of `.kiro/docs/ballots/2026-10-25-token-selection-order-one-rule.md` (§ 11 step 11; § 4 "Not edited"; walk record `.kiro/issues/2026-10-25-release-16.1.0-walk.md` § "Row 6", L362–363). Rule 9 applies to every later edit.
**Class**: P3 improvement · defect *(set 2026-10-25, Ada, rule 12. Prose and messages in code state an order that the ratified Token Selection Matrix replaced; the selector's own logic is not shown wrong, because it was never read against F-2 (B) (below). No shipped claim rests on these lines and nothing blocks a consumer, so not P0 or P1; they are comments, a doc string and error text, not a record a reader is told is true, so P3 and not P2. It rises to P2 `(record)` if Peter wants `TokenSelector`'s behaviour brought to the one order: that is a behaviour change, not a wording change.)*
**Trigger**: `manual` — closes at its fixing PR's merge, which carries the grant below. *(Set 2026-10-25, Ada, rule 9. A P3 that would ride another change takes `manual`, naming its own fixing PR as the event (rule 1); no vehicle PR exists yet.)*

---

## What is wrong

Read at `2a3a2e678` (the application PR #491 head). The ballot's straggler sweep (§ 11 step 6, group (d)) lists these, and its grep over `src/build` returns them today:

- `src/build/tokens/TokenSelector.ts` L4 (file header "Implements token selection priority logic: semantic → primitive → component") and L33 (the `selectToken` doc comment); the method's body tries a semantic token, then a primitive, then creates a component token.
- `src/build/tokens/TokenSelection.ts` L5, L22–30: "Priority order: semantic → primitive → component", the `TokenPriority` type (`'semantic' | 'primitive' | 'component'`) and the three-step comment above `TokenSelection`.
- `src/build/tokens/TokenIntegrator.ts` L5, L61, L85, L285 (the same phrase in four comments).
- `src/build/tokens/ComponentToken.ts` L8 and `ComponentTokenGenerator.ts` L8: the phrase in a header comment each.
- `src/build/tokens/__tests__/TokenSelector.test.ts` L8 and L28 (header and a `describe('Token Selection Priority', …)`).
- `src/build/errors/ErrorDocumentation.ts` L257–260: the error `TOKEN_INVALID_SELECTION`'s description, cause ("does not follow the required priority (semantic → primitive → component)") and the suggestion "Follow token selection priority: semantic first, then primitive, then component". `src/build/errors/ErrorReporter.ts` L278 gives the same suggestion text; `src/build/errors/README.md` L35 names the code.

**Why it is stale.** Before the ballot, Core Goals stated the order as "1. Semantic … 2. Primitive … 3. Component tokens referencing primitives … 4. Hard-coded", and `src/build` encodes that list. The ballot makes Token Governance § "Token Selection Matrix" the one order and, under F-2 (B) (RATIFIED), a component's own token comes first inside the owning component. The phrase "semantic → primitive → component" is then wrong in two ways: it puts a component token last everywhere, and it is the filer's old list, not the Matrix.

## What was read, and what was not

- **VERIFIED by reading**: the lines above, at the SHA above; the sweep's expected-hit list in the ballot (§ 11 step 6 (d)) names the same files. In `src/` outside `__tests__`, `grep` for `TOKEN_INVALID_SELECTION` finds the code's definition (`BuildError.ts` L117) and its documentation entry, and no throw site; `TokenSelector` is constructed by `TokenIntegratorImpl` (L140) and exported by `src/build/tokens/index.ts`.
- **UNVERIFIED**: whether any consumer path reaches `TokenSelector` or raises `TOKEN_INVALID_SELECTION` at run time (I did not trace a build to its end); whether `TokenSelector`'s logic should change under F-2 (B) (it has no notion of "inside the owning component"); and whether `package.json` `files` entries for `src/build/tokens/{ComponentToken,ComponentTokenGenerator,TokenIntegrator,TokenSelection}.ts` (L65–69) mean consumers read these comments in the shipped `.ts` (they are listed, so probably yes).

## Fix shape (one line; not done here)

Reword each line to point at Token Governance § "Token Selection Matrix" instead of stating an order, and rename nothing: `TokenPriority` and `TOKEN_INVALID_SELECTION` are exported names, so changing them is a separate, API-visible decision for Ada to bring to Peter if wanted. Whether `TokenSelector` should model the Matrix's component-first-in-owning-component rule is a behaviour question the wording fix does not answer.

**Grant paths** *(owed; not yet a grant: README rule 10 forbids authoring the list only inside the diff it bounds, so Peter's direction naming these paths, or a merged line in this record, comes first)*: `src/build/tokens/TokenSelector.ts`, `src/build/tokens/TokenSelection.ts`, `src/build/tokens/TokenIntegrator.ts`, `src/build/tokens/ComponentToken.ts`, `src/build/tokens/ComponentTokenGenerator.ts`, `src/build/tokens/__tests__/TokenSelector.test.ts`, `src/build/errors/ErrorDocumentation.ts`, `src/build/errors/ErrorReporter.ts`, `src/build/errors/README.md`.

## Counter-argument

Leave it: the lines are comments in code that no consumer path is shown to run, and a wording sweep adds a PR for text nobody is misled by. *What survives*: the shipped `.ts` is probably read by consumers' agents (four of the files are listed in `package.json` `files`; whether a consumer reads them is UNVERIFIED, above), and a comment stating a second order beside the Matrix is the very shape of the defect the ballot closed in Core Goals. That is the argument for P3 and a single sweeping PR rather than a drop.

**No fix is authorized by this record.**
