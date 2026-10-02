# First-render drafting aids — Spec 123 Task 15.4–15.5

**Owner**: Thurgood (the profile author). Everything in this directory is a **drafting aid**. Nothing here is read by the sweep, and nothing here is a confirmation or a signature. The authority is `runFreshnessSweep` (`tools/agent-generator/regrounding/freshness.ts`), run by `122-diff-guard`.

- `build_profile.py` and `spec_*.py` draft the operative-set records, dispositions and overlays (15.4). `E.txt` is G1 run 1's exemplar E rendering.
- `counts.ts` prints the per-bucket table, and `sweep.ts` prints the sweep summary.
- **`hash-sheets.ts` → `sheets/<seat>.md`**: one read-only sheet per C1 seat (Ada, Lina, Sparky, Leonardo, Data, Kenya, Stacy). Run it from the repo root with `npx tsx .kiro/specs/123-consumer-distribution/first-render/drafting/hash-sheets.ts`.

## The sheets

Each sheet has two parts.

**1. Confirmations owed.** These are exactly the sweep's `confirmation` findings. Each row gives the unit key, the `canonicalHash` and the drafted item ids, in record order.

**2. Rows to sign.** These are every ROUTED body unit plus every `no-consumer-counterpart` row (Req 11.4.1 — "signed by the owning domain agent, not the profile author"). Each row gives:
- the row key, its disposition and why it is signed;
- the `canonicalHash` and `renderedHash` the sweep will check;
- the `evidence:` value;
- the committed rendering paths;
- the overlay path.

**4. Re-sign worklist** (added at the phase-two re-author batch; run `hash-sheets.ts <base-ref>`). It lists the rows that need a signing act now:
- **unsigned**: the row is newly in the signed population;
- **refusal standing**;
- **stale**: the sweep's own finding;
- **row changed since the base**: a disposition flip (for example no-consumer-counterpart → `superseded-by`) leaves both hashes unchanged, so the sweep cannot see it.

The signed population is every ROUTED unit plus every `no-consumer-counterpart` and `superseded-by` row. Both of those are claims about where a function went, and the owner signs them. Signed rows outside that population (a re-pointed frontmatter entry, a retained verdict) are listed when refused, stale or changed. **Known blind spot**: a `groundTruthManifest` trim renders inside one span attributed to the whole manifest, so a trim row's `renderedHash` is the empty-piece hash whatever its text. Read the rendered Ground truth section directly before signing one.

**3. Referent candidates** (added after phase one; Ada's and Lina's finding). These are items whose text opens on a pronoun or demonstrative, names a referent it does not carry ("this layer", "the above"), or ends as a bare lead-in (":"). **They are candidates, not findings**: the scan is lexical, and many hits carry their referent or are deliberate one-item triggers. Widening an item re-confirms its unit in the confirmer's seat (update the note's `items:` and `date:`), in the same commit as the signatures. The sheets never edit a record.

**How the values are computed.**
- Every value comes from the sweep's own helpers: `hashText` / `hashEntry`, and `renderedHashOf(readConsumerSpans(…), rowSpanSource(…))`.
- ROUTED comes from `classifyCharter` over the **drafted** item sets.
- A `no-consumer-counterpart` row renders nothing, so its `renderedHash` is the hash of the empty piece list.

**The sheets are a snapshot.**
- **Re-run the generator after the confirmations land.** A confirmation that changes an item set can change a unit's routing, and a refusal that re-authors an overlay changes that row's `renderedHash`.
- The generator refuses to run while the sweep has any finding other than `confirmation`.
- Validated by round trip, restored from a saved copy:
  - Ada's `#identity` values planted as a signature → no `stale-signature` finding.
  - The same signature with a zeroed `renderedHash` → `stale-signature`.

**Seat order.** Confirm first, then sign. A signature's `assent.surviving` names the confirmed item ids.

## Recipe 1 — confirm

1. Read `canonical/operative-sets/<record>.yaml` against its source: `canonical/agents/<a>.md`, or `.kiro/steering/<Doc>.md` for the identity docs.
2. Write one block per unit in `canonical/profiles/consumer/confirmations/<record>.md`, in the format Stacy already uses there:
   - a `` ## `#anchor` `` heading;
   - then `confirmer:`, `canonicalHash:`, `items:` (the ids in record order, or `none`) and `date:` lines.
3. Record edits go in the same commit.

The sweep's check is exact:
- exactly one `## ` block whose heading, with one pair of backticks removed, EQUALS the anchor (literally, never slugged — a `:preamble` anchor keeps its `:`);
- its `confirmer:` / `canonicalHash:` / `items:` lines equal the record's;
- a `date: YYYY-MM-DD` line;
- the note is committed.

The record's unit entry also names the note: `confirmation: canonical/profiles/consumer/confirmations/<record>.md#<anchor>`.

## Recipe 2 — sign

1. Read the unit's own rendering in `canonical/_consumer-output/_canonical/...`, plus the overlay and the row in `canonical/profiles/consumer/<record>.dispositions.yaml`.
2. Add the row's `signature:` with:
   - `signer`;
   - both hashes;
   - `assent.surviving` or `refuse: should-re-point`;
   - `evidence:` pointing to `canonical/profiles/consumer/signatures/<record>.md#<fragment>`.
3. Stacy signs in her own `Agent: stacy` commits.
4. Each refusal goes in its own commit when it is issued.

The row format, verbatim from `tools/agent-generator/regrounding/signatures.ts`:

```yaml
signature:
  signer: stacy                          # C1 (13.3's wrong-signer check)
  canonicalHash: sha256:<64 hex>         # VALVE 1 — the canonical unit/entry as of signing
  renderedHash: sha256:<64 hex>          # VALVE 1 — the rendered unit/entry as of signing
  assent: { surviving: [owed-set-1, …] } # VALVE 2 — itemized; OR
  refuse: should-re-point                # the one-flag return (Req 11.5.4)
  evidence: canonical/profiles/consumer/signatures/<agent>.md#<anchor>
```

**The evidence note** is `canonical/profiles/consumer/signatures/<record>.md`. The sweep checks it:
- it contains exactly one `## ` block whose heading, with one pair of backticks removed, equals the row's fragment: `#<anchor>` for a body unit, `#frontmatter:<path>` for a frontmatter entry, `#<member id>` for a shared member;
- that block has a `signer:` line equal to the signature's `signer`;
- the note is committed under `canonical/profiles/consumer/`.

A signature with neither `assent.surviving` nor `refuse` is BARE and refused. `surviving: []` is itemized: it says nothing survived.

## Scope — Req 11.6.5e (in force before the first routed signature)

> **Scope — within the unit's own rendering** *(Erratum 2026-09-27 — G1 run 2 finding R2-F1; Peter ruled proceed-on-HOLDS)*: entailment is read **within the rendering of the unit under judgment only**. A statement elsewhere in the rendered charter (another unit, the frontmatter, an identity member or a shared member) retains nothing for this unit. **A function that survives only elsewhere takes a disposition for this unit** (`superseded-by`, or `re-pointed` with that destination), and never an entailment credit.

## Refusal protocol

1. **The signer refuses in its own commit**, when it is issued: `refuse: should-re-point`, with its evidence note. Pushed `--no-ci` inside the known-red window.
2. **Thurgood re-authors**: the overlay, the removals or the disposition, in its own commit. That changes the row's `renderedHash` or disposition, so the refusal is now stale by construction.
3. **The owner re-signs**, in the resolving commit (which dispatches CI). The refusal resolves either by itemized assent or by a changed disposition under its own C1 signature (e.g. re-disposed `superseded-by`). **Never assent-only**: a re-sign with no re-authoring between is not a resolution.
4. **Zero standing refusals at U2b's merge** (S-T3). Every refusal issued is recorded in Task 15's "first render — not a baseline" block, together with the `no-consumer-counterpart` and assent rates (B-U2 M1).
