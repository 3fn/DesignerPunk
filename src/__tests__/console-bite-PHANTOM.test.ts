// GATE-BITE (DO NOT MERGE): deliberately emits unallowlisted console output.
// Proves the console-fail hook (125-B U2, 4.4) fires in CI. Throwaway.
describe('PHANTOM console bite', () => {
  it('emits unallowlisted console.error', () => {
    console.error('PHANTOM_BITE: this message is deliberately not on the allowlist');
    expect(true).toBe(true);
  });
});
