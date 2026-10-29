# edit-kind-pointers — real-form fixtures

Read by `../edit-kind-pointers.test.ts` (the "real forms" block). Not a `__fixtures__/` entry:
`../fixtures.test.ts` enumerates every directory under `scripts/completion-claims/__fixtures__/`.

- `541-*.diff`: `git diff -U0 52f874275^ 52f874275 -- <path>` for the four files #541 declared
  with line ranges (#541 squash-merged at `52f874275`).
- The declaration lines are in the test, verbatim from the #541, #546 and #547 PR bodies as the
  orchestrator relayed them on 2026-10-29 (their parenthetical authorities abridged to `(…)`).
