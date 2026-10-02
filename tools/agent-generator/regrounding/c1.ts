/**
 * The C1 seat function — Spec 123 Task 13.3 (Req 11.5.2; design C16, C17).
 *
 * "The signer is the owning domain agent, EXCEPT where that is the profile author, in which
 * case it is the counterpart verification seat; and if both roles collapse onto one agent, it
 * escalates to Peter." The same function decides an operative-set record's `confirmer:` (C16)
 * and a signature's `signer:` (C17). It was first written in the Task 11 precursor test
 * (`src/__tests__/operative-set-records.test.ts`, retired at 13.6); this is its home.
 *
 * Traces to: Req 11.5.2; design C16, C17 (S-D-B1).
 */

/** The consumer profile's author (the design's standing fact: Thurgood authors the profile). */
export const PROFILE_AUTHOR = 'thurgood';
/** The counterpart verification seat under the Q5 cut. */
export const COUNTERPART_SEAT = 'stacy';
export const ESCALATION_SEAT = 'peter';

/** C1: owner, unless owner == profile author → counterpart; both roles on one agent → peter. */
export function c1Seat(owner: string, profileAuthor = PROFILE_AUTHOR, counterpart = COUNTERPART_SEAT): string {
  if (owner !== profileAuthor) return owner;
  return counterpart === profileAuthor ? ESCALATION_SEAT : counterpart;
}
