# `TokenTranslator.matchDimension` applies one flat tolerance (`spacing ? 2 : 1`) to every non-color family — vacuous for `opacity`, latent for `lineHeight`, and the `letterSpacing` index is empty

**Date**: 2026-10-21
**Owner**: Ada (Rosetta Figma export/translation pipeline; `src/figma/TokenTranslator.ts` is the matching code)
**Found by**: Ada, source reading for the Spec 128 inbound ([ADA R1] item 1, `.kiro/specs/128-react-react-native-platform-admission/inbound-from-peter-user-stories-2026-10-21.md` § 7, PR #434, squash `739673c5b`); the orchestrator re-verified the line; every citation below re-read and re-run by Ada in this tree at `d7385b4c2`
**Class**: P2 obligation (guard) · defect *(set 2026-10-21, Ada, rule 12. The instrument claims a per-category tolerance — the `:646` comment, 054b Req 2 "applies tolerance rules", 054d Req 1 AC 4 "no token match within tolerance → Unidentified" — and for the unitless families the code does not deliver it: for `opacity` the no-match branch is unreachable (the whole 0–1 range is within ±1), so AC 4 holds only trivially. Not P1: `figma-extract` is a design-time tool, and on the hierarchical path a value match becomes a suggestion, never an Identified token (`DesignExtractor.ts:1479-1486`), so no consumer or generated artifact is wrong. The surviving argument for P3: today's observable effect is suggestion quality on a dev tool, and `letterSpacing` fails safe (always no-match). I class P2 (guard) because a guard that cannot fire is weaker than its claim regardless of who reads the output today, and Spec 128 story 3 proposes to lean on exactly this claim as a second source. Peter can re-class.)*
**Trigger**: `path:.kiro/specs/128-react-react-native-platform-admission/requirements.md` — the first commit that adds Spec 128's requirements, where this record is taken into the ingestion slice (as a precondition on reusing the translator) or left out with a reason. *(Set 2026-10-21, Ada, rule 9. The `path:` token over `manual`: the defect is consequential only when the translator reads a second source, which is 128's story 3; today's Figma-path cost is low and 054b/054d are closed. The surviving argument for `manual`: if 128's ingestion slice is dropped, the vacuous opacity suggestions persist with no owing event — accepted, because that cost is a mislabelled suggestion in a design-time report.)*

---

## The defect

`translateByValue` (`src/figma/TokenTranslator.ts:554-569`) routes `color` to a ΔE matcher and every other category to `matchDimension` (`:632-682`), whose tolerance is one line: `const tolerance = category === 'spacing' ? 2 : 1` (`:646`). The value index (`:293-335`) admits ten numeric categories (`:319-322`), and the `TokenCategory` union (`:26`) names unitless families — `opacity` (0–1, step 0.08), `lineHeight` (ratios 1.143–1.556), `letterSpacing` (−0.05em–0.05em) — whose entire value range is smaller than the ±1 the code treats as "approximate". Three distinct states result; the heading names them.

## Evidence — VERIFIED in this tree (Ada, 2026-10-21, `d7385b4c2`)

```
$ sed -n 636,660p src/figma/TokenTranslator.ts
    entries: ValueIndexEntry[],
  ): TranslationResult {
    const inputNum = typeof value === 'number'
      ? value
      : parseDimension(String(value));

    if (isNaN(inputNum)) {
      return { token: '', confidence: 'no-match', matchMethod: 'value', rawValue };
    }

    const tolerance = category === 'spacing' ? 2 : 1; // ±2px spacing, ±1px font/radius

    let bestDelta = Infinity;
    let bestPath = '';

    for (const entry of entries) {
      const d = Math.abs(entry.numericValue - inputNum);
      if (d < bestDelta) {
        bestDelta = d;
        bestPath = entry.tokenPath;
      }
    }

    if (bestDelta === 0) {
      return { token: bestPath, confidence: 'exact', matchMethod: 'value', rawValue };
```

Thresholds: `bestDelta === 0` → `'exact'` (`:659-661`); `bestDelta <= tolerance` → `'approximate'` with `delta: "±${bestDelta}px"` (`:663-672` — the unit label is hard-coded `px`); otherwise `'no-match'` with `suggestion` (`:675-682`). `parseDimension` (`:192-195`) accepts only `^[\d.]+\s*(px|%)?$`: no sign, no `em`.

**What the Figma path hands in today** (`src/figma/DesignExtractor.ts`, hierarchical classification, Spec 054d): `category: 'opacity'` with the raw Figma node opacity (`:1381-1391`), `'fontSize'` / `'fontWeight'` (`:1429-1448`), `'lineHeight'` with `lh.value` and `lh.unit` discarded (`:1450-1459`), `'letterSpacing'` with `ls.value` (`:1461-1470`); all go through `translator.translate(figmaVarName, rawValue, category)` (`:1475`), which falls back to `translateByValue` whenever the binding misses (`TokenTranslator.ts:750-766`). A value match that is not `unidentified` is pushed to `unidentified` with `reason: 'value-match'` and a `suggestedToken` (`:1479-1486`).

**Per family, against the generated DTCG** (value shapes VERIFIED on `tests/onboarding-trio/fixtures/born-kiro/dist/tokens/DesignTokens.dtcg.json`, 405/405 tokens carrying `$extensions.designerpunk.family`; emitters `src/generators/DTCGFormatGenerator.ts:377-384`, `:390-397`, `:456-463`; source values `src/tokens/{Opacity,LineHeight,LetterSpacing}Tokens.ts`):

| Family | Index | State TODAY on the Figma path | Example |
|---|---|---|---|
| `opacity` | 18 entries, `number` 0–1 in steps of 0.08 | **LIVE, vacuous**: every Figma opacity in [0, 1] is ≤ 0.04 from a token, so `'no-match'` is unreachable and 054d Req 1 AC 4 can never fire for this family | Figma opacity `0.5` → `opacity.opacity048` (0.48), `'approximate'`, `delta: "±0.02px"` — a unitless value labelled in px |
| `lineHeight` | 11 entries, `number` 1.143–1.556 | **LATENT**: the extractor passes `lh.value` in Figma's unit (PIXELS, e.g. 24; PERCENT, e.g. 150) against a ratio index, so nothing lands within 1 by accident of units; the moment a ratio is handed in (an adopter DTCG `number` line-height — the 128 case) the ±1 covers the whole range | ratio `2.0` → `lineHeight.lineHeight125` (1.556), `'approximate'`, `±0.444px` |
| `letterSpacing` | **0 entries** — all five `$value`s are `"-0.025em"`-form strings, `parseDimension` → `NaN`, skipped at `:324-326` | **DEAD, fails safe**: `translateByValue` returns `'no-match'` at `:560-562` before the tolerance is reached; every Figma letter-spacing is Unidentified with no suggestion | (correction to my R1 wording: this family is not mis-snapped today; it is unreachable) |

`fontSize` (13–42, integer steps ≥ 1) and `fontWeight` (100–900) are not affected by ±1. **No test exercises value matching for `opacity`, `lineHeight` or `letterSpacing`** — `grep` of `src/figma/__tests__/TokenTranslator.test.ts` for those category literals is empty; the tolerance tests cover spacing (`:266-282`) and radius (`:350-371`) only.

## Spec 128 implication — the second-source case

Spec 128 story 3 (inbound § 2, § 5 lane for ingestion) proposes reusing this translator to snap an adopter's tokens onto ours and to emit a snapping report (inbound § 7 [ADA R1] item 4). An adopter DTCG hands in ratios and unitless numbers directly — exactly the inputs that make the `lineHeight` state live and keep `opacity` vacuous — so unchanged, the translator would report nearly every adopter opacity and line-height as `'approximate'` to one of ours, and the snapping report would carry false approximations as if they were departures the tolerance had checked. REASONING, not verified: the `letterSpacing` dead path would, conversely, report every adopter letter-spacing as "cannot map". Both corrupt the report's score in opposite directions.

## Related records

- `.kiro/specs/128-react-react-native-platform-admission/inbound-from-peter-user-stories-2026-10-21.md` § 7 — the source read; item 4 (snapping report) is what this defect would corrupt.
- `.kiro/specs/054b-figma-design-extract/requirements.md` Req 2 (`:117`, the tolerance-rules claim) and `design.md` § "TokenTranslator (Realigned)" (`:164-200`; its `category` union named five categories — the ten-category widening came later without widening the tolerance).
- `.kiro/specs/054d-hierarchical-design-extraction/requirements.md` `:22`, `:75` (Req 1 AC 4) — the "within tolerance → Unidentified" claim.
- `.kiro/issues/2026-10-18-spec-priorities-by-outcome.md` § 3 (129 before 128) — why the trigger is 128's requirements and not a nearer event; its § 5 shared-surface table does not list `src/figma/**`, which 128's ingestion would touch.

## Fix shape (not done here; a precondition for 128's ingestion slice, not a 128 deliverable by default)

- Tolerance per family, ratio-based: a fraction of the family's step (opacity step 0.08; letter-spacing step 0.025em; line-height steps 0.01–0.1) or of its range — never an absolute ±1 applied to a family whose range is 1.
- Unit-aware parsing: `parseDimension` accepts signed values and `em`; the extractor carries `lh.unit` / `ls.unit` and normalises PIXELS→ratio (÷ fontSize) and PERCENT→ratio (÷ 100) before matching; the `delta` label follows the family's unit.
- Tests for the three families' exact / approximate / no-match boundaries — the gap that let `:646` stand while the category union grew from five to twelve.
- Only after these does the translator qualify as a second source; the snapping report's "cannot map" and "approximate" counts are meaningless before.

**No fix is authorized by this record.**
