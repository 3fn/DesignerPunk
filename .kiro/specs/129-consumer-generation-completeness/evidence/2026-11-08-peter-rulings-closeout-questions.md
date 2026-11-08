# Peter's answers to the Spec 129 CLOSEOUT questions

**Recorded by**: the orchestrator. Times come from the clock at receipt (`date -u`).

## The exchange

1. **What was put to Peter.** The orchestrator relayed Stacy's CLOSEOUT pass (`chore/129-closeout-claims-pass` @ `27c4040c2`) on 2026-11-08, with two open questions:
   - **Q1.** Should someone dispatch `native-harness` on `main` at U12's merged commit `a17cb2b34` (CP-6)? The orchestrator recommended yes.
   - **Q2.** Should Spec 129's charter record stay open until the one Android entry tagged to it is retagged to the component-repair record (CP-2)? The orchestrator recommended yes.
2. **2026-11-08T16:53:31Z**, Peter: **"789 and 790 are merged. Re: 1 & 2, Proceed as recommended. My concern is findings might mask issues or act as little "cracks in the dam". Are there any that you think we should look into further or resolve?"**

## What was ruled, and what followed

- **Q1, yes.** The orchestrator pushed `ci/129-merged-head-a17cb2b34`, pointing at `a17cb2b34`, and dispatched `native-harness` on it and on `main`. Both runs concluded success on all five contexts:
  - run 42502208361 at `a17cb2b34`;
  - run 42502210216 at `bf4cd7677`.
- **Q2, yes.** The charter record `2026-10-02-consumer-generation-completeness-spec.md` stays open until the CP-2 retag merges.
- **Peter's concern.** He asked whether any finding masks a real issue. Before anything was fixed, the findings most likely to hide something were diagnosed:
  - **CP-6: nothing hidden.** The two runs above compiled the shipped tree.
  - **CP-1: records only** (Ada). With 15 and 15.1–15.3 ticked locally, parity reads `parent 15: PASS`, 54 of 54.
  - **CP-3: no live defect, but a guard weaker than its claim** (Ada).
    - The harvest does cross the dual-instance boundary for the six package-tier token files.
    - The packed test asserts only a `progress.*` token, which never crosses the boundary, so a regression would not turn it red.
  - **CP-4: a real but minor generator gap** (Ada). `familyComment` in `src/generators/native/ThemeEmitter.ts` cannot name the bridge source, because `ThemeEmitterInput` has no field for it.
