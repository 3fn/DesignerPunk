# Consult: should 131 go before 129? (orchestrator)

**Peter's words** (verbatim, orchestrator relay): 2026-11-05, "Question: what do we think about starting with 131? Honest thoughts?" — then, after reading the orchestrator's answer below: "Yes, run it past Thurgood, Leonardo and Stacy".

**What he read (the orchestrator's answer, NOT his words, NOT vetted with any seat)**:
- **For 131 first**: it changes the cost of everything after it (129, 132, 128, 130 all run under thinner rules); deciding Q5 alone took 14 seat entries and a ~9,000-word plan; native loses almost nothing by waiting (no native adopters; INSTALL says don't start native); 131 is ready (outline merged, paused at requirements, 16.2.0 baseline pinned); this week is measured evidence of what 131 cuts.
- **Against**: context loss unless the 129 round and the native plan are committed first (they live only in scratch); 16.2.0's CHANGELOG says 129's first task is a build check that compiles the output, and that stays unmet; 131 may be designed in a vacuum without a live spec running through it (and Leonardo wanted 131's rehearsal to carry its native leg from the start); 131 is unsized; it reverses Peter's 2026-10-24 order and yesterday's ratified park of 131 on `path:.kiro/specs/129-consumer-generation-completeness/requirements.md`.
- **Middle option**: before pausing 129, run one bounded fact-producing step — the compile harness's first run plus Data's Android emulator probe and Kenya's iOS render trial — as record-driven work under the harness charter, rather than waiting for 129's tasks. Catch: under the sequential gates the harness is a 129 task; running it now means treating it as bounded record work, and Peter has said he does not want gates waived.
- **Orchestrator's lean**: 131 first, on two conditions — commit the 129 round entries and the native plan before pausing; 131 uses this week's native work as one of its test cases. What survives: native stays broken for as long as 131 takes, and 131 is unsized.

**Read**: the native plan `plan-r2.md` in this directory (its § 3 order (x′) vs (y), § 6, § 8 sizes, § 10); 131's outline on `origin/main` (`git -C "/Users/3fn/Documents/Work Projects/Kiro/DesignerPunk-v2" fetch -q origin && git -C … show origin/main:.kiro/specs/131-governance-simplification/design-outline.md`) and its inbounds; the priorities record `.kiro/issues/2026-10-18-spec-priorities-by-outcome.md`; the waiting-spec ballot `.kiro/docs/ballots/2026-11-04-waiting-spec-row.md` (131's park); and `.kiro/specs/129-consumer-generation-completeness/design-outline.md`.

**Write** your entry to the file named in your brief (no repo edits, commits or downloads). Stamp `#### [<NAME> ORDER R1]`. Contents:
1. **Your pick**: 131 first / 129 first per (x′) / the middle option / something better. Argue from your domain, with evidence.
2. **Fold-back** (AI-Collaboration-Principles § "Counter-Argument Requirement"): your strongest counter-argument, what it changed, the residual.
3. **Correct the orchestrator** where the answer above is wrong or overstated — e.g. is 131 sized? would the middle option waive a gate or not? is the context-loss risk real given what is committed?
4. **What it would take**: the records/PRs to execute your pick, and which are Peter's acts.
5. **The class point**: does your pick address the class (governance cost on every future spec), and at what cost.
Plain language first; Peter decides from this.
