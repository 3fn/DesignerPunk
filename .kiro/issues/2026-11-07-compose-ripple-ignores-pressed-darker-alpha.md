# Open question: does Compose's `ripple(...)` honour the `pressedDarker` alpha, and Button-CTA's stale ripple prose

**Date**: 2026-11-07
**Filed by**: Lina, from the ripple ruling (Peter, 2026-11-07T22:16:40Z).
**Owner**: Data (Compose behaviour); Lina for the contract prose.
**Class**: P3 obligation (verification) *(set 2026-11-07, Lina, rule 12.)*
**Trigger**: `manual` — Data or a Compose doc read answers it, or the first Android press-colour parity report; dated reason (2026-11-07): the answer needs a Compose read, not a path in this repo.

---

1. `ButtonIcon.android.kt` L247 calls `ripple(` with Compose defaults; the file never references `pressedDarker`. Does the ripple's alpha follow the 12% `pressedDarker` blend value the contract promises (`ΔL 0.05–0.10`), or does it ignore it (Compose `RippleAlpha` defaults)? Not settled from the repo's docs; record the result here.
2. `Button-CTA/contracts.yaml` L65 reads "Android=ripple+haptic" while spec 031 and the family doc put CTA on blend pressed colour. Lina corrects the prose when this closes.
