# Spec Seed — Component-Token Authoring Convention (the two-mechanisms-one-filename incoherence)

**Date**: 2026-06-26
**Status**: SEED (not a 124 task — deliberately out of scope). Surfaced during Spec 124's three-lead review (Lina) and Peter's "getting it right" health check. Captured so it doesn't evaporate.
**Owner**: Lina (component-authoring model). **Coupled to**: Spec 123 (consumer source distribution form — what a consumer's design system *is*).
**Origin**: `.kiro/specs/124-component-token-return-contract/design-outline.md` → "Three-lead review + health refinements" §3.

---

## The incoherence
The component-token loader (`src/cli/loadComponentTokens.ts`) scans `*.tokens.ts` and `tokens.ts`. **Two different token mechanisms wear that same filename:**
- **Value-registration files** call `defineComponentTokens(...)` → feed `ComponentTokenRegistry` (8 of 15 scan-reachable files: avatar, Badge-Count, Badge-Label, Button-Icon, Button-VerticalList-Item, checkbox-sizing, radio-sizing, `tokens/component/progress`).
- **Semantic-reference map files** export plain `Record`/getter/string-const maps (e.g. `Container-Base/tokens.ts`, `Input-Text-Base/tokens.ts`) → consumed by platform impls, **never** feed the registry (7 of 15).

Spec 124's brand makes the *harvest* correct regardless (only branded results are collected; unbranded maps harvest to zero — guarded). **But the authoring model stays fractured:** nothing at the filename/structure level tells a consumer which kind of `tokens.ts` they are writing.

## Why it matters (C′)
Spec 118's ratified **C′** says the generated catalog reflects the *consumer's* design system, including consumer-authored components. In a C′ world this becomes a real support question: *"I wrote a `tokens.ts` — why aren't my component tokens showing up?"* (Answer: it wasn't a `defineComponentTokens` file, so it wasn't harvested — correct, but silently so from the author's view.) 124 fixes correctness; it does not fix discoverability/legibility of the authoring model.

## Possible directions (decide in the spec, do NOT assume)
- Distinct filenames by mechanism (`*.tokens.ts` for value-registration vs `*.refs.ts` / `*.map.ts` for semantic-ref maps), so intent is legible from the filename the loader scans.
- A lint/authoring guard that warns when a scanned `tokens.ts` produces zero harvested tokens (catch "I expected registration but got none").
- Converge the two mechanisms (larger; likely a 123-coupled decision).

## Scope discipline
**Not Spec 124.** 124 is the return-contract + harvest fix; bolting an authoring-convention change onto it would balloon scope. This is its own (small) spec or a 123 rider. Seeded; awaiting prioritization with Peter.
