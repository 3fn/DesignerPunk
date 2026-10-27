# Product screens: three implementation-time checks the planning duty needs, none built yet

**Date**: 2026-10-27
**Owner**: Thurgood (the Product MCP work in check (a), and the record). Check (b)'s owner is open, settled at its first walk. Rule 9 applies to every later edit.
**Filed by**: Thurgood, under README rule 10, at the application of ballot `.kiro/docs/ballots/2026-10-26-system-token-review-and-token-planning.md` (§ 4 "Follow-ups"; § 12 step 11; § "Plans (Peter's condition)" row 1).
**Consulted**: Leonardo — <pending: the product workflow these checks read>; Ada — <pending: what counts as a token value, the Rosetta side>
**Class**: P2 obligation (guard) · charter *(set 2026-10-27, Thurgood, rule 12. The ratified planning duty and K-h are enforced today only by the PRIMARY's own grep at a product unit's merge, and by audit. That is a guard weaker than its claim, so the class is guard. Nothing is false where it is read, so it is not P0.)*
**Trigger**: `manual` — the event that owes the close is the first product build: the first screen spec merged in a product repo under the amended Product-Token-Governance § "Authoring Workflow". This repo has no `product/`, so no git-visible token expresses that event here. The monthly walk reads this record at every walk until then. The close is: check (c) built and registered, and (a) and (b) each built, or re-chartered with an owner and a trigger, before the first product unit's merge.

---

## The three checks (ballot § 4)

- **(a)** A product token added in a unit whose screen spec neither references nor lists it. This is Product MCP work, Thurgood's.
- **(b)** A detector for literal values in product screen source (Lina's class option, R1 item 3).
  - No check reads screen source today. `TokenCompliance`'s patterns read `src/components/**` only. The detector is more likely a `designerpunk validate` check in the CLI. Its owner is open.
  - **Shapes to detect**, carried from the round:
    - **Web**: a literal `var()` fallback; a literal `calc()` operand; style strings in `.ts` (`<style>`, `adoptedStyleSheets`, `element.style.*`), and `CSSStyleSheet` `replace` / `replaceSync` (Sparky R1 item 2, R3 item 3).
    - **iOS**: numeric arguments to `padding`, `frame`, `spacing:` and `cornerRadius` (Kenya R1 item 2c). Kenya's `#warning("token-gap: …")` is an iOS practice, not law.
    - **Android**: numeric `.dp` / `.sp` literals, `Color(0x…)`, and millisecond literals in `tween(…)`, matching the literal and not `.dp` itself, since `DesignTokens.size_N.dp` is required (Data R1 item 2).
  - **The Android pattern**: Data's guarded form, `(?<!\w)…`, which flags the wrong span on `0.5.dp` and misses `1.5f.dp`. Thurgood's anchored form, `(?<![\w.])\d+(?:\.\d+)?f?\.(?:dp|sp)\b`:
    - flags `18.dp`, `0.5.dp`, `1.5f.dp`, `24.dp`, `14.sp` and `0.dp`;
    - passes `DesignTokens.size_700.dp` and `DesignTokens.size_N.dp`.
    The owner picks the form.
  - **Falsification fixtures** (Stacy R2 item 4, plus one): `DesignTokens.size_700.dp` must not flag; `0.5.dp` must flag; a literal at a `replaceSync` call must flag; `1.5f.dp` must flag.
  - **What counts as a token value** (Thurgood's consult in the ballot):
    - **Counts**: a literal dimension, colour, duration, opacity or weight in screen source where a token family covers it, in any position.
    - **Does not count**: a read of a token; a platform runtime value; a platform default with no literal (the marker's case); a unit conversion the platform requires.
    - **Open**: platform system colours, the question the `no-hardcoded-color` row already records, inherited unresolved.
- **(c)** An open `token-gap:` marker in a product unit's screen sources at its merge: `git grep -n "token-gap:"`, platform-neutral.
  - Under F-A-h (h1), building (c) is EXECUTION of K-h ("A unit does not merge while its screen sources carry a `token-gap:` marker").
  - Until (c) is built, K-h is enforced by the PRIMARY's own grep, an agent checking its own work (§ 8, the F-A-h residual).

## Not this record's

- **R3-16**, the spec-time check that a screen spec's `tokens:` references exist: `.kiro/issues/2026-10-25-product-mcp-screen-token-refs-unchecked.md`.
- **Leonardo's measurement record** (ballot § 4; Plans row 2).

## Close

When (c) is registered and (a) and (b) are built or re-chartered, add rule 5's dated outcome line naming the PRs, and archive.
