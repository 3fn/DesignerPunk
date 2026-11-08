# Peter ratifies the Token-Governance theme-registry ballot, with F-1 (a)

**Recorded by**: the orchestrator. The timestamp was taken from the clock at receipt (`date -u`).

## The exchange

1. **What was put to Peter** (orchestrator, 2026-11-08): the ballot `.kiro/docs/ballots/2026-11-08-token-governance-theme-registry-as-shipped.md`, on `origin/chore/ballot-token-governance-theme-registry` at head `92752931e`, with the reviews spliced in.
   - Items 1–5 rewrite `governance/Token-Governance.md` § "Theme Registry (Spec 094)". Item 2 states #785's rule: theme override maps carry colour tokens only, and `generate` refuses any other key.
   - Item 8 corrects `governance/Token-Quick-Reference.md` L118.
   - F-2 was already resolved by Peter's ruling at 2026-11-08T15:12:38Z.
   - Fork F-1 was left open:
     - (a) items 6 and 7 also correct `canonical/agents/ada.md` L318 and L323 (lean: Ada and Stacy);
     - (b) a separate ballot later.

     The surviving counter to (a): it goes beyond Req 15.6, and it puts a signing cycle on the release path.
   - **Consulted**: Thurgood (form passes; F12′ application order); Stacy (B-1 to B-5 met and withdrawn; leans (a)).
2. **2026-11-08T16:08:46Z**, Peter: **"Ratified, F-1 (a)"**

## What was ruled

The ballot is ratified, with items 1–8 under F-1 (a). Under the ballot's § 3, ratifying it names the files its application touches:
- `governance/Token-Governance.md`
- `governance/Token-Quick-Reference.md`
- `canonical/agents/ada.md` L318 and L323, byte for byte
- `canonical/operative-sets/ada.yaml`
- `canonical/profiles/consumer/ada.overlay.md`
- `canonical/generated.lock`, with the generated roots

Ada's confirmation and signature are her own acts. Application follows § 4, which begins with the Status commit (record-first). The application PR carries the lock, so it opens after U12 (#781) merges.
