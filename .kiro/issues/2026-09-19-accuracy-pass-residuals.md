# Accuracy-pass second-order residuals (small items, named owners)

**Date chartered**: 2026-09-19 (at the follow-ups closure — capture-before-close). **Origin**: `archive/2026-09-19-token-source-accuracy-followups.md`. **Trigger**: each owner's next relevant session; walked by the monthly health-check charter walk.

- **Ada + Peter review** — `typography.labelMdFloat` claims no-layout-shift vs labelMd but references `lineHeight075` (1.429) against labelMd's `lineHeight100` (1.5); computed line boxes differ (≈20 vs 24). The REFERENCE may be the defect, not the prose (description corrected to reality meanwhile). A token change — needs review, not a doc fix.
- **Ada (recorded decision, Peter may overrule)** — OklchValidator not wired into `build:validate`; the prepack→build path runs without tests. ~20 lines if wanted.
- **Kenya / Data review flag** — `docs/platform-integration/{ios,android}-font-setup.md` were cut over Inter→Figtree mechanically (they were stale since Spec 107). Substitution-only, no new guidance authored; platform-agent eyes wanted before that surface is considered settled.
- **Thurgood** — `src/assets/fonts/__tests__/fontLoading.test.ts` is substantially tautological (asserts against literals it builds itself; e.g. `expect('swap').toBe('swap')`); three Figtree blocks were re-grounded in the shipped CSS during F7, the rest left as-is. Test-governance cleanup candidate.
- **Leonardo / Lina** — `scripts/figma-component-generator.ts:110` loads font "Inter" (Figma's guaranteed default); switching to Figtree could break if unloaded in the target file. Functional choice, deliberately untouched.
- **Lina** — `governance/Component-Family-Chip.md:92,372` "48px exceeds WCAG 44px minimum (2.5.5)" — imprecise post-F6 (2.5.5 is AAA); and the Button-CTA platform files restate 56/72/80 as literals because Button-CTA tokens aren't registered with the `defineComponentTokens()` pipeline — registration is a real architecture follow-up, not a linkage fix.
- **Trivial, anyone** — `docs/roadmap/product-packaging-inventory.md:210` still names Inter as primary typeface.
