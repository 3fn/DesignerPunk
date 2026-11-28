# Stacy: counting and recording Peter's J sample for 16.3.0 (read-only)

**Scope note.** These are my acts. I answer only how the sample is counted and how my record writes it. I say nothing on what a packet holds or how an act is judged.

## 1. The widened set: I agree, 32 acts
I counted from signature history, independently of the delegate file. In each flagged PR I took the rows changed by commits whose `Agent` trailer is Stacy, between `merge-base(<m>^, head)` and `refs/pull/<n>/head`:
- **#758**: 15;
- **#746**: 13. The PR also carries `f5e6a10a2`, an authoring commit with 61 rows, which I left out, as at 16.2.0;
- **#676**: 2;
- **#752**: 2.

That is **32**, the same as Thurgood's count from the delegate file. All 32 sit inside N = 146.

## 2. The unit of J is the act, and k counts acts
§ 5.3 says: "At each RELEASE Peter blind-re-judges at least one Stacy-signed act. The RELEASE record carries `Peter sample (Stacy-signed): <k> / <N>` (k acts judged, of N Stacy-signed acts in the release's population)."
- **So k counts acts, not packets or briefs.** One packet holding several acts adds one to k for each act Peter judged in it.
- **The floor is k ≥ 1.**
- **The widening** (§ 5.4, "sends every act by that seat in that PR into J"; § 5.3, "a recorded slip never removes an act from Peter's J") owes all 32. So the duty is complete only at k ≥ 32, with all 32 in k.

Only check 4 is counted per brief (§ 5.2: "judged once per brief or continuation, not per act"). My record would carry its own line for it, `check 4: <b> / <B> briefs`, and never fold it into k.

Neither text defines a packet, so a per-PR packet is a form question and does not change what k counts.

## 3. Peter's ruling does not settle 16 against 32
The ruling's words are: "The 12 flagged Stacy-signed acts stand as recorded … The 4 record-absent acts stand alongside them. … Every one of these acts stays in Peter's J sample". That names 16 acts. It says nothing about the other 16 that § 5.4 sends in, and nothing about narrowing.

## 4. The two commits with no transcript (`db81c96d`, `8acf6fbe`)
- Peter's blind re-judgment of those acts can still run, so their acts count in k when he judges them.
- **Check 4** for those two briefs is written `not re-verified — no transcript (db81c96d, 8acf6fbe)`. It is never rolled into a pass, and it is counted inside B, for example `check 4: 5 / 7 briefs; 2 not re-verified — no transcript`.
- The instrument's own verdict on those acts, `record absent 4`, stays as the delegate wrote it.

**The edge I stop at**: § 5.2 says the blind result and the original disposition "are compared afterwards", and any difference is logged `divergent`. For my own acts, I should record only the count of matches and `divergent` results that someone else produced. I should not do the comparison myself.

## 5. The strongest counter-argument to Thurgood's class option
**Conflict, stated first**: the bound reduces scrutiny of my own acts. This argument therefore runs against my interest.

**The counter-argument**: under the proposed bound, Peter judges one packet, and a fresh seat judges the widened acts. A fresh seat is "a fresh seat of the same charter" (§ 5.2). For Stacy-signed acts, that is a Stacy seat re-judging the very acts the instrument flagged. That is the self-audit the C1 collapse rule exists to bar ("Stacy does not rule on her own acts"), and it lands on the acts where independence matters most. Under § 5.3 the widened acts' J "is Peter's"; the bound would hand it back to my charter.

**What survives**: the record is five RELEASEs at N > 0, all `0 / N`. A bounded J that actually gets done may beat an unbounded one that never does. The builder alone, with no change to whose J it is, avoids this counter.

## Correction owed in my own record
Thurgood is right. 16.3.0 is the **fifth** RELEASE at N > 0 with `0 / N`: 15.0.0 `0 / 309`, 15.1.0 `0 / 5`, 16.1.0 `0 / 135`, 16.2.0 `0 / 49` and 16.3.0 `0 / 146`. My record says "fourth" (L288). I will correct it in my next record PR.
