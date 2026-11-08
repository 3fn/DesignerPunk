# Task 15.2 Completion: INSTALL founder count and path-steps (129)

**Agent**: Thurgood (subtask of Ada's Task 15, U10)

## What changed
- `governance/DesignerPunk-Integration-Guide.md`, install region § 3: the founder list is design § 14's four steps verbatim; the separate `generate` step and its paragraph are removed; the `init` paragraph now states the full command, that `init` runs `generate`, and the failure behavior; steps renumbered 3 and 4. Front matter `path-steps: { founder: 4, … }`.
- `docs/consumer/INSTALL.md`: re-derived with `scripts/derive-install-doc.ts` (not hand-edited).
- `scripts/__tests__/install-doc.test.ts`: `founder: 4`; `FOUNDER_ORDER` is the four verbatim steps; the restart-step test expects the founder lists to end with § 14's step 4, the observed truth staying in the "Step 4" paragraph.

## Targeted tests
`npx jest --config scripts/jest.config.js scripts/__tests__/install-doc.test.ts`: 79 passed, 2 failed. Both failures read README.md "Getting Started" (still five steps, outside the install region and my brief); they pass once that list is the four steps.

## Application-time adaptations
- The test's observed-truth restart assertion was changed (founder lists exempt, asserted against § 14's text).
- Guide L317 (outside the region) still says "step 5 of 3. BECOME"; left untouched, now stale.
