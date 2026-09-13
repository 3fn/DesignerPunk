/**
 * @category evergreen
 * @purpose Guard WCAG AA (4.5:1) contrast for semantic TEXT-role color tokens against their canonical backgrounds, in light and dark modes
 */
/**
 * Semantic Color Contrast Guard
 *
 * WHY THIS EXISTS
 * Spec 112 task 6.1 claimed "semantic-pair AA validation" and Spec 112's release
 * commit claimed "all semantic pairs pass AA". Neither was true: the shipped test
 * (src/color/__tests__/WcagContrast.test.ts) validates PRIMITIVE pairs only and
 * documents known failures as "needs a WCAG-theme override" — overrides that were
 * never written. `color.feedback.success.text` shipped at 2.84:1 on the light canvas
 * for three months. Found by the 2026-09-12 Spec 112 completion-claims audit (F4).
 *
 * This test is the guard that task 6.1 promised: it resolves SEMANTIC tokens through
 * the same context composition the generators use, and asserts AA on the resulting
 * text/background pairs.
 *
 * ────────────────────────────────────────────────────────────────────────────────
 * PAIRING MODEL (adjudicated 2026-09-12 — Ada)
 *
 * A contrast assertion is only as good as the background it assumes. Two pairings
 * are grounded in the token architecture; a third is deliberately NOT asserted.
 *
 * P1 — TEXT ON CANVAS (asserted in light AND dark)
 *   `color.structure.canvas` is the architecture's declared "base page background —
 *   default surface for all pages, the foundational layer for UI structure"
 *   (src/tokens/semantic/ColorTokens.ts § STRUCTURE). Message/body text sits on it.
 *   This is also the pairing Spec 112's own success criteria were measured against
 *   ("green success.text improved from ~1.3:1", "teal info.text from ~1.5:1" — both
 *   are ratios against white). Canvas is mode-varying (white100 → gray400 in dark),
 *   so this pairing is the one that genuinely exercises mode resolution.
 *
 * P2 — TEXT ON ITS FAMILY BACKGROUND (asserted in LIGHT only)
 *   Feedback/select/notification/progress families ship matched `.text` + `.background`
 *   tokens describing one composed block (alert banner, badge, stepper node), so the
 *   pair is a real, designed composition.
 *
 * P2 IS NOT ASSERTED IN DARK MODE — and that is a finding, not an omission.
 *   None of the `.background` tokens in these families has a Level 2 dark override
 *   (src/tokens/themes/dark/SemanticOverrides.ts populates 9 of 62 tokens as of the
 *   2026-09-13 interim dark-text-hierarchy fix). A dark-mode
 *   family pairing therefore composes a dark-mode text primitive against a LIGHT-mode
 *   background primitive — e.g. success.text green300 on success.background green100 =
 *   1.69:1. Asserting that would be measuring an un-designed composition and would
 *   read as a contrast bug when the real defect is an unpopulated dark theme.
 *   Recorded for Peter: the dark theme's feedback/progress BACKGROUNDS are undesigned;
 *   until they are, dark-mode banners/badges/nodes have no valid contrast story.
 *
 * NOT COVERED (deliberate, so a future guard can add them knowingly):
 *   - The wcag / dark-wcag contexts. Spec 112 R8 AC4 asserts a ≥7:1 (AAA) floor for
 *     WCAG-theme overrides; whether the WCAG theme's target is AA or AAA is itself
 *     unadjudicated (audit F4), so pinning a threshold here would pre-judge it.
 *   - Non-text roles (`.border`, `.background` as UI components) and their 3:1 floor.
 *   - Large-text's relaxed 3:1 AA floor: every pair here is asserted at the NORMAL
 *     text floor of 4.5:1, which is the conservative reading.
 *
 * ────────────────────────────────────────────────────────────────────────────────
 * THE EXEMPTION LIST IS A QUEUE, NOT A MUTE
 *
 * Pairs that fail today and are OUT OF SCOPE of the authorized success.text fix are
 * listed in EXEMPT below, each pinned to its measured ratio. An exempt pair is
 * asserted to still be failing AND to still measure what is recorded — so both a
 * regression (ratio drops) and a fix (ratio reaches AA) break this test and force
 * the entry to be re-adjudicated rather than silently drifting. Weakening the
 * threshold to make a pair pass is the failure mode this test exists to prevent;
 * add an exemption instead, with a date and an owner.
 *
 * @see .kiro/issues/2026-09-12-spec-112-completion-claims-audit.md § F4
 * @see src/color/__tests__/WcagContrast.test.ts (primitive-level companion)
 */

import { contrastRatio, type Oklch } from '../../color/OklchConverter';
import { composedColorMap } from '../color';
import { colorTokens } from '../semantic/ColorTokens';
import { darkSemanticOverrides } from '../themes/dark/SemanticOverrides';

/** WCAG 2.1 AA floor for normal text. */
const AA_NORMAL_TEXT = 4.5;

/**
 * Precision for pinned exemption ratios: Jest's `toBeCloseTo(x, 1)` asserts
 * |actual − expected| < 0.05, which is tight enough that any real palette movement
 * trips the pin and forces the entry to be re-adjudicated.
 */
const PIN_PRECISION = 1;

type Mode = 'light' | 'dark';

/**
 * Resolve a semantic color token to its primitive name for a mode.
 *
 * Mirrors the context composition in src/generators/generateTokenFiles.ts:
 * light-base = registry as authored; dark-base = registry + darkSemanticOverrides.
 */
function primitiveFor(tokenName: string, mode: Mode): string {
  const override = mode === 'dark' ? darkSemanticOverrides[tokenName] : undefined;
  const refs = override
    ? override.primitiveReferences
    : colorTokens[tokenName]?.primitiveReferences;

  if (!refs) throw new Error(`Unknown semantic color token: ${tokenName}`);

  const name = (refs as Record<string, string>).value ?? (refs as Record<string, string>).color;
  if (!name) throw new Error(`Token ${tokenName} has no resolvable primitive reference`);
  return name;
}

/** Resolve a composed primitive name to its OKLCH value. */
function oklch(primitiveName: string): Oklch {
  const color = composedColorMap.get(primitiveName);
  if (!color) throw new Error(`Unknown composed primitive: ${primitiveName}`);
  return color.resolved;
}

/** Contrast ratio between two semantic tokens resolved in the same mode. */
function pairRatio(textToken: string, bgToken: string, mode: Mode): number {
  return contrastRatio(oklch(primitiveFor(textToken, mode)), oklch(primitiveFor(bgToken, mode)));
}

const CANVAS = 'color.structure.canvas';

/** P1 — text-role tokens whose documented use is message/body text on a page surface. */
const TEXT_ON_CANVAS: string[] = [
  'color.feedback.success.text',
  'color.feedback.error.text',
  'color.feedback.warning.text',
  'color.feedback.info.text',
  'color.text.default',
  'color.text.muted',
  'color.text.subtle',
];

/** P2 — text tokens paired with the sibling background they are designed to sit on. */
const TEXT_ON_FAMILY_BACKGROUND: Array<[text: string, background: string]> = [
  ['color.feedback.success.text', 'color.feedback.success.background'],
  ['color.feedback.error.text', 'color.feedback.error.background'],
  ['color.feedback.warning.text', 'color.feedback.warning.background'],
  ['color.feedback.info.text', 'color.feedback.info.background'],
  ['color.feedback.select.text.rest', 'color.feedback.select.background.rest'],
  ['color.feedback.select.text.default', 'color.feedback.select.background.default'],
  ['color.feedback.notification.text', 'color.feedback.notification.background'],
  ['color.progress.current.text', 'color.progress.current.background'],
  ['color.progress.pending.text', 'color.progress.pending.background'],
  ['color.progress.completed.text', 'color.progress.completed.background'],
  ['color.progress.error.text', 'color.progress.error.background'],
];

/**
 * Known-failing pairs, pinned. Key: `${mode}|${textToken}|${backgroundToken}`.
 *
 * EVERY entry below is "PENDING Peter adjudication, found by 2026-09-12 audit
 * remediation" — the remediation session was authorized to fix
 * color.feedback.success.text ONLY, so these were measured, reported, and left alone
 * rather than quietly fixed or quietly dropped (the F7 pattern this audit indicted).
 */
const EXEMPT: Record<string, { ratio: number; note: string }> = {
  // ── P1, light: text on the light canvas (white100) ────────────────────────────
  'light|color.feedback.warning.text|color.structure.canvas': {
    ratio: 4.231,
    note: 'orange400 on white100. Closest miss in the light palette — a small L drop on orange400, or an orange500 remap, likely clears it. PENDING Peter adjudication, found by 2026-09-12 audit remediation.',
  },
  'light|color.text.muted|color.structure.canvas': {
    ratio: 3.640,
    note: 'gray200 on white100. Secondary text below the normal-text floor (passes the 3:1 large-text floor). Either remap to gray300 or scope the token to large text. PENDING Peter adjudication, found by 2026-09-12 audit remediation.',
  },
  'light|color.text.subtle|color.structure.canvas': {
    ratio: 2.480,
    note: 'gray100 on white100. Tertiary text; fails both the normal- and large-text floors. May be intended as a non-text/decorative tier. PENDING Peter adjudication, found by 2026-09-12 audit remediation.',
  },

  // ── P1, dark: text on the dark canvas (gray400) ───────────────────────────────
  // Root cause is shared: the dark theme overrides only 9 of 62 semantic color tokens
  // (as of the 2026-09-13 interim dark-text-hierarchy fix — the three color.text.*
  // pairs below are now remediated and asserted PASSING, not exempted here); every
  // remaining entry is a LIGHT-mode primitive being rendered on a dark canvas.
  'dark|color.feedback.error.text|color.structure.canvas': {
    ratio: 1.561,
    note: 'pink400 on gray400 — no dark override exists. PENDING Peter adjudication, found by 2026-09-12 audit remediation.',
  },
  'dark|color.feedback.warning.text|color.structure.canvas': {
    ratio: 1.999,
    note: 'orange400 on gray400 — no dark override exists. PENDING Peter adjudication, found by 2026-09-12 audit remediation.',
  },
  'dark|color.feedback.info.text|color.structure.canvas': {
    ratio: 1.155,
    note: 'teal400 on gray400 — no dark override exists; teal400 is a DARK teal, effectively invisible on the dark canvas. PENDING Peter adjudication, found by 2026-09-12 audit remediation.',
  },
  // dark|color.text.default|color.structure.canvas, dark|color.text.muted|...,
  // dark|color.text.subtle|... — REMEDIATED 2026-09-13 (interim dark-text-hierarchy
  // fix, Peter-ratified; .kiro/issues/2026-09-12-semantic-contrast-adjudication-queue.md).
  // New Level 2 dark overrides (white100/white300/white500) clear AA against the dark
  // canvas; these three pairs now assert PASSING through the normal (unexempted) path
  // below rather than being pinned here.

  // ── P2, light: text on its family background ──────────────────────────────────
  'light|color.feedback.success.text|color.feedback.success.background': {
    ratio: 4.369,
    note: 'green500 on green100. The authorized fix cleared the canvas pairing (2.84 → 4.72) but the family pairing is still 0.13 short, and NO step of the settled green ramp clears both (green500 is the darkest). Closing it needs a design change — a darker green step or a deeper success.background. PENDING Peter adjudication, found by 2026-09-12 audit remediation.',
  },
  'light|color.feedback.error.text|color.feedback.error.background': {
    ratio: 4.187,
    note: 'pink400 on pink100. PENDING Peter adjudication, found by 2026-09-12 audit remediation.',
  },
  'light|color.feedback.warning.text|color.feedback.warning.background': {
    ratio: 3.518,
    note: 'orange400 on orange100. PENDING Peter adjudication, found by 2026-09-12 audit remediation.',
  },
  'light|color.feedback.select.text.rest|color.feedback.select.background.rest': {
    ratio: 2.820,
    note: 'cyan400 on cyan100 — selected-state label text. PENDING Peter adjudication, found by 2026-09-12 audit remediation.',
  },
  'light|color.feedback.select.text.default|color.feedback.select.background.default': {
    ratio: 1.468,
    note: 'gray200 on gray100 — unselected-state label text; the worst light-mode pair in the system. PENDING Peter adjudication, found by 2026-09-12 audit remediation.',
  },
  'light|color.progress.current.text|color.progress.current.background': {
    ratio: 1.573,
    note: 'cyan400 on cyan300 — step number/icon inside the active progress node. PENDING Peter adjudication, found by 2026-09-12 audit remediation.',
  },
  'light|color.progress.pending.text|color.progress.pending.background': {
    ratio: 4.086,
    note: 'gray300 on white300 — pending step content. PENDING Peter adjudication, found by 2026-09-12 audit remediation.',
  },
  'light|color.progress.completed.text|color.progress.completed.background': {
    ratio: 2.632,
    note: 'green400 on green100 — the completed-node checkmark. Same defect class as success.text was, in a token the authorized fix did not cover; the fix is likely the same green400 → green500 remap. PENDING Peter adjudication, found by 2026-09-12 audit remediation.',
  },
  'light|color.progress.error.text|color.progress.error.background': {
    ratio: 4.187,
    note: 'pink400 on pink100 — mirrors feedback.error. PENDING Peter adjudication, found by 2026-09-12 audit remediation.',
  },
};

function exemptionFor(mode: Mode, text: string, bg: string) {
  return EXEMPT[`${mode}|${text}|${bg}`];
}

/**
 * Assert a pair: AA when unexempted, pinned-and-still-failing when exempted.
 */
function assertPair(text: string, bg: string, mode: Mode): void {
  const ratio = pairRatio(text, bg, mode);
  const exemption = exemptionFor(mode, text, bg);

  if (!exemption) {
    expect(ratio).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
    return;
  }

  // The exemption is still needed — if this fails, the pair now PASSES AA:
  // delete the EXEMPT entry rather than keeping a stale exemption.
  expect(ratio).toBeLessThan(AA_NORMAL_TEXT);
  // The exemption is still accurate — if this fails, the pair moved: re-measure,
  // re-adjudicate, and update the pinned ratio deliberately.
  expect(ratio).toBeCloseTo(exemption.ratio, PIN_PRECISION);
}

describe('Semantic color contrast — WCAG AA (audit F4 remediation guard)', () => {
  describe('P1: text-role tokens on color.structure.canvas', () => {
    for (const mode of ['light', 'dark'] as Mode[]) {
      describe(`${mode} mode`, () => {
        for (const token of TEXT_ON_CANVAS) {
          const exempt = exemptionFor(mode, token, CANVAS);
          const title = exempt
            ? `${token} on canvas — EXEMPT, pinned at ${exempt.ratio}:1 (pending adjudication)`
            : `${token} on canvas ≥ ${AA_NORMAL_TEXT}:1`;
          it(title, () => {
            assertPair(token, CANVAS, mode);
          });
        }
      });
    }
  });

  describe('P2: text-role tokens on their family background (light mode only — see header)', () => {
    for (const [text, bg] of TEXT_ON_FAMILY_BACKGROUND) {
      const exempt = exemptionFor('light', text, bg);
      const title = exempt
        ? `${text} on ${bg} — EXEMPT, pinned at ${exempt.ratio}:1 (pending adjudication)`
        : `${text} on ${bg} ≥ ${AA_NORMAL_TEXT}:1`;
      it(title, () => {
        assertPair(text, bg, 'light');
      });
    }
  });

  describe('contrast-role anchors (asserted against the surface they are named for)', () => {
    it('color.contrast.onLight on the light canvas ≥ 4.5:1', () => {
      expect(pairRatio('color.contrast.onLight', CANVAS, 'light')).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
    });

    it('color.contrast.onDark on the dark canvas ≥ 4.5:1', () => {
      const ratio = contrastRatio(
        oklch(primitiveFor('color.contrast.onDark', 'dark')),
        oklch(primitiveFor(CANVAS, 'dark'))
      );
      expect(ratio).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
    });
  });

  describe('the fix this guard was written for (audit F4)', () => {
    it('color.feedback.success.text no longer resolves to the failing green400', () => {
      expect(primitiveFor('color.feedback.success.text', 'light')).not.toBe('green400');
      expect(primitiveFor('color.feedback.success.text', 'dark')).not.toBe('green400');
    });

    it('light mode: green500 on white100 clears AA (was green400 at 2.84:1)', () => {
      expect(primitiveFor('color.feedback.success.text', 'light')).toBe('green500');
      expect(pairRatio('color.feedback.success.text', CANVAS, 'light')).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
    });

    it('dark mode: the Level 2 override clears AA against the dark canvas', () => {
      expect(primitiveFor('color.feedback.success.text', 'dark')).toBe('green300');
      expect(pairRatio('color.feedback.success.text', CANVAS, 'dark')).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
    });
  });

  describe('exemption-list hygiene', () => {
    it('every EXEMPT key names a pair this test actually asserts', () => {
      const asserted = new Set<string>();
      for (const mode of ['light', 'dark'] as Mode[]) {
        for (const token of TEXT_ON_CANVAS) asserted.add(`${mode}|${token}|${CANVAS}`);
      }
      for (const [text, bg] of TEXT_ON_FAMILY_BACKGROUND) asserted.add(`light|${text}|${bg}`);

      const orphaned = Object.keys(EXEMPT).filter(key => !asserted.has(key));
      expect(orphaned).toEqual([]);
    });

    it('every exemption carries the audit provenance marker', () => {
      const missing = Object.entries(EXEMPT)
        .filter(([, v]) => !v.note.includes('PENDING Peter adjudication, found by 2026-09-12 audit remediation'))
        .map(([k]) => k);
      expect(missing).toEqual([]);
    });
  });
});
