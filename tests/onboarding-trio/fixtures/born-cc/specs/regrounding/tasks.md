# Re-grounding: Thurgood's first assignment in this repo

`npx designerpunk init` placed this spec in your repo. It is **Thurgood's**: the agent for spec formalization, test governance and the health of this repo's standing guidance. His charter arrived written for DesignerPunk's own repo, and was re-pointed at yours where it could be. This assignment finishes that work in your repo, with you. It ends with a report of what did not transfer.

**Who does what**: Thurgood runs tasks 1–5 with you. You make the decisions. Task 6 is Stacy's, after tasks 4 and 5.

**One rule throughout**: do not edit the generated agent files (for example `.claude/agents/thurgood.md` or `.kiro/agents/thurgood-prompt.md`). They are regenerated, and a hand-edit is reported, not kept. Record re-pointings in this spec's report, and put standing guidance in a document your team owns.

## Tasks

- [ ] 1. **Read the charter against this repo.** Thurgood reads his own charter as rendered in this repo. He lists every instruction that refers to something this repo does not have: a document, a path, a command, a check, a review cadence, or a person. For each one, he records where in the charter it is.

- [ ] 2. **Decide each item, with your human.** Each item from task 1 gets exactly one disposition:
  - **re-pointed**: name this repo's equivalent;
  - **superseded-by**: name what replaces it here;
  - **no-consumer-counterpart**: say why this repo has nothing that does that job.

  There is no fourth option. "It was DesignerPunk's, so it goes" is not a disposition: a repo-specific instruction is exactly what re-pointing is for.

- [ ] 3. **Establish where this repo's specs and standing guidance live.**
  - **Specs** live in `specs/`, which the commit policy treats as repo state, so specs are committed.
  - Thurgood writes `specs/README.md`. It says how a piece of work becomes a spec in this repo, from design outline to requirements, design and tasks, and what a completed task must record.
  - He lists where this repo's standing guidance lives for each agent tool you use: the files that tool always loads.

- [ ] 4. **Formalize one real spec.** With your human, pick one real piece of upcoming work. If nothing is ready, use the outcome of the CI-needs spec in `specs/ci-needs/`. Thurgood formalizes it in `specs/<name>/`: a design outline, then requirements, design and tasks, following `specs/README.md`, with your human's approval at each step. This is the work his charter exists for. If it cannot be done here, that is the most important line in the report.

- [ ] 5. **Report what did not transfer.** Thurgood writes `specs/regrounding/report.md`:
  - one row per item from tasks 1–2: what the item is, where it is in the charter, its disposition, and why;
  - anything from tasks 3–4 that did not work in this repo, and what it would have needed;
  - a closing line saying whether he could do his job here.

  The report is yours. Whether to share it with DesignerPunk's maintainers is your human's decision.

- [ ] 6. **Verify the formalization's claims (Stacy).** After tasks 4 and 5, Stacy, not Thurgood, checks what Thurgood claims to have produced against what exists. **Promised**: task 4 above and `specs/README.md`. **Claimed**: Thurgood's rows in `specs/regrounding/report.md` for tasks 3 and 4, and any record under `specs/<name>/`. **Shipped**: the files in `specs/<name>/` and the repo's git history (`git log --first-parent -- specs/`). For each artifact the claims name, she confirms it exists and says what it contains. She says how many claims she opened, out of how many; a claim she could not check is recorded as not checked, never as passed. The human's approvals are shipped only if the repo records them, otherwise she records them as claimed. She writes her result in `specs/regrounding/report.md` under her own heading. If task 4 produced no spec, she records "not exercised — upstream beat produced no artifact", and never a pass or a fail.
