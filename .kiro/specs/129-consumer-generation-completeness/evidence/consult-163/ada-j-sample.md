# Ada: J sample packet builder (read-only consult, 2026-11-12)

**Short answer.** I can assemble a packet, but my charter does not grant it, and the grant I hold is narrow enough that building it is a step outside it. The orchestrator is the cleaner builder; I would be a source of lines, not the builder.

## 1. Feasibility
- **Mechanically yes.** I hold the per-act lines (`delegate-audit-release-16.3.0-ada.md`, e.g. L229 onward), the sources they cite and the commit SHAs. The key (Stacy's disposition, her `surviving` list) lives in her record, which I would not open for the packet and would put in a separate file only if handed it.
- **Role fit: not covered.** § 5.3 gives the delegate one duty: "runs `--audit --signer stacy` over every Stacy-signed act ... writes every per-act line verbatim to `delegate-audit-<event>-<seat>.md` ... **The delegate reports; it does not rule.**" My charter calls it "a bounded, mechanical, read-only duty, outside your domain, given by ballot". J is "by Peter" (§ 5.3), and no text assigns a packet to the delegate. Building one is a second duty by extension, which my own charter says to refuse without a grant.
- **Does it compromise "reports, does not rule"?** Assembling is not ruling. But choosing which act, which sources to include, and what counts as a "render population" are judgments that shape what Peter can see. That is where the line blurs.
- **Blindness caveat.** I have read the instrument's FAIL lines, so I know which acts are flagged. Peter would not be blind to that, and should not be: the widening sends flagged acts into his J by rule.

## 2. Cost (my estimate, unmeasured)
- (i) Floor, 1 act: me about 30 min (one rendered line, its sources, the instruction text, the check-4 brief, a key file); Peter about 15-20 min.
- (ii) Per PR, 4 packets: me about 2 h; Peter about 1.3 h.
- (iii) Per brief, about 7 packets: me about 3.5 h; Peter about 2-2.5 h.
- **Pick rule for (i)**: random with a recorded seed (seed and the sorted act list written into the key file), drawn from the 32 widened acts, not the § 5.2 rate; the rate defines a sample size, not an unbiased draw. Exclude nothing, including link-7-defect rows: Peter's ruling kept them in.

## 3. Readable in 15-20 minutes
One page per act: the act's claim in a sentence, the rendered line, the 2-3 source excerpts, a yes/no question, and a place for one line of reason. Put jargon in a 6-line glossary page, not inline.
Needs instrument knowledge Peter lacks: what "renders nothing" means for a `writeScope` row (link 7, and the pre-#816 defect); `canonicalHash` and the "print record"; `spawnDepth` and "record absent"; what "anchored" means; what check 4 asks. Without a glossary he judges the vocabulary, not the act.

## 4. Strongest counter-argument to me as builder
I wrote the delegate file that flagged these acts and I am another seat in the same chain: an agent selecting and framing evidence for the one human oracle undermines the point of J (§ 8: no check that only an agent performs). **Survives**: even a mechanically exact packet is my framing. Mitigation is the orchestrator building from the verbatim file and a seeded draw, with me only checking the lines match. Residual: the orchestrator is also a model, so only Peter's own pick of the act (not the packet) removes it. Fork for Peter: he names the act or the seed himself.
