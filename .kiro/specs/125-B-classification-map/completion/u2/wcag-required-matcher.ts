/**
 * NORMATIVE WCAG-REQUIRED MATCHER — Spec 125-B U2, Task 4.2 (audit) → 4.3 (arm)
 *
 * This is the single source of truth for WHICH behavioral contracts are
 * required to carry a WCAG reference in the re-armed check
 * (`behavioral-contract-validation.test.ts`, replacing the legacy :325–350
 * six-name array).
 *
 * CONTINUITY CONTRACT (Req 12.3 / LINA tasks-R1):
 *   - Task 4.2's pre-arm WCAG audit enumerated the corpus THROUGH this exact
 *     function (and the same `COMPONENTS` loader the armed check uses), so
 *     "audit-clean ⇒ arm-green by construction" holds ONLY while 4.3 consumes
 *     this function UNMODIFIED.
 *   - 4.3 SHALL copy this predicate verbatim into the test file (write-scope:
 *     4.2 cannot write `src/__tests__/**`; the matcher lives here in the u2
 *     completion folder as the verbatim-copy source, and is re-verified by
 *     4.3's bite fixtures covering the selection edges below).
 *   - ANY change to this predicate RE-OPENS the audit. Do not "improve" it.
 *
 * SELECTION RULE (C7 / Req 12.2 — normative):
 *   - exact names: interaction_focusable, interaction_focus_ring,
 *     state_disabled, state_error
 *   - accessibility_* : startsWith('accessibility_')
 *   - content_*_label : startsWith('content_') AND endsWith('_label')
 *
 * THE BARE-PREFIX TRAP (LINA — do NOT relax to startsWith('content_')):
 *   A bare `content_` prefix over-selects every non-label content contract
 *   (content_displays_image, content_displays_count, content_label_text,
 *   content_renders, …) into the WCAG-required set — 17 such live contracts
 *   in the current corpus, most legitimately wcag: null — and would red the
 *   armed check spuriously. The prefix-AND-suffix rule is load-bearing.
 */

export const WCAG_REQUIRED_EXACT: ReadonlySet<string> = new Set([
  'interaction_focusable',
  'interaction_focus_ring',
  'state_disabled',
  'state_error',
]);

export function isWcagRequiredContract(contractName: string): boolean {
  if (WCAG_REQUIRED_EXACT.has(contractName)) return true;
  if (contractName.startsWith('accessibility_')) return true;
  if (contractName.startsWith('content_') && contractName.endsWith('_label')) return true;
  return false;
}
