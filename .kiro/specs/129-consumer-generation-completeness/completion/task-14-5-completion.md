# Task 14.5 — The Q3b browser check and the Q3b record

**Agent**: Sparky (Sonnet); joined by Ada with `git merge --no-ff` from `task/129-14-sparky` @ `14bebafb3` (one file, byte-identical to his commit).

## What changed

`evidence/q3b-browser-check.md` (Sparky): Google Chrome 149.0.7827.54, headless, on a scratch consumer built from a tarball packed at `ec23a5a18` with Task 11's config C (never test01); 8 of 8 cases correct inside the shadow root, including the single-mode form (`light-dark()` with the base in the uncovered half); `data-theme` on a wrapping `div` themes nothing. The check records the fact only; whether a subtree should be themeable is the fork. The Q3b record (Ada, with Leonardo on intent) is filed at the parent close.

## Targeted tests and result

Browser check: the evidence file. No Jest.

## Application-time adaptations

None. It ran after 14.6, as the row says, and also rendered a component under config C's `brand` and `default` in both schemes.
