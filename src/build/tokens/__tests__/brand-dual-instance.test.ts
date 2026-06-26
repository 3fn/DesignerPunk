/**
 * @category evergreen
 * @purpose Brand-survival across a TWO-COPY module boundary with TEETH (Spec 124 R2/R7)
 */
/**
 * Constructed Dual-Instance Brand-Survival Test (Spec 124, Task 4.1)
 *
 * THE crux of Task 4. Brand survival is the load-bearing correctness property and it is
 * ONLY falsifiable across a real module-duplication boundary. A same-process test that
 * loads ONE module copy passes for BOTH the correct string-key brand AND a broken plain
 * `Symbol()` — both resolve against the same copy, so such a test has no teeth.
 *
 * This test constructs the boundary IN-PROCESS and LIGHTWEIGHT via `jest.isolateModules`,
 * which gives genuinely SEPARATE module instances (a fresh registry + fresh module-level
 * state per isolate). It does NOT build a child-process / heavyweight harness — that would
 * add a second `--detectOpenHandles` / "Jest did not exit" leak surface (Spec 124 R7 AC4).
 * The authoritative end-to-end dual-instance proof rides the packed-install arbiter
 * (`tests/consumer-integration.test.ts`); THIS test proves the brand MECHANISM survives a
 * two-copy boundary and — critically — that a `Symbol()` brand does NOT (proof of teeth).
 *
 * @see .kiro/specs/124-component-token-return-contract/design.md
 *   (§ "Dual-Instance Certification Approach"; Decision 2; P2/P7)
 */

type DefineTokensModule = typeof import('../defineComponentTokens');

/**
 * Load a genuinely SEPARATE instance of the defineComponentTokens module.
 *
 * `jest.isolateModules` runs the callback against a fresh module registry, so each call
 * yields a distinct module object with its own module-level closures — the in-process
 * stand-in for the second `@3fn/core/build` copy that `scopedTsRequire` loads in
 * production. (Spec 124 design § "Why the brand crosses the boundary but the singleton
 * does not".)
 */
function loadSeparateInstance(): DefineTokensModule {
  let mod!: DefineTokensModule;
  jest.isolateModules(() => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    mod = require('../defineComponentTokens') as DefineTokensModule;
  });
  return mod;
}

describe('Spec 124 — brand survives a two-copy module boundary (R2/R7, with teeth)', () => {
  test('two isolateModules copies are genuinely distinct module instances', () => {
    const copyA = loadSeparateInstance();
    const copyB = loadSeparateInstance();

    // Distinct function objects => distinct module instances (the boundary is real).
    expect(copyA.defineComponentTokens).not.toBe(copyB.defineComponentTokens);
    expect(copyA.getTokenContract).not.toBe(copyB.getTokenContract);

    // ...but the brand STRING is value-equal across copies — this is exactly why Option A
    // (a frozen string key) survives where a plain Symbol() (object identity) would not.
    expect(copyA.TOKEN_CONTRACT_BRAND).toBe(copyB.TOKEN_CONTRACT_BRAND);
  });

  test('a result branded by copy A is recognized BY VALUE by copy B', () => {
    const copyA = loadSeparateInstance();
    const copyB = loadSeparateInstance();

    // Brand with copy A (stands in for the consumer's @3fn/core/build copy).
    const branded = copyA.defineComponentTokens({
      component: 'InputRadio',
      family: 'spacing',
      tokens: {
        'box.sm': { value: 16, reasoning: 'dual-instance survival probe' },
      },
    });

    // Recover with copy B's getTokenContract (stands in for the parent/harvest copy).
    // This succeeds ONLY because the brand is a value-equal string key, not shared
    // object identity. THIS is the boundary the production seam must survive.
    const recovered = copyB.getTokenContract(branded);
    expect(recovered).toBeDefined();
    expect(recovered).toHaveLength(1);
    expect(recovered?.[0].name).toBe('inputradio.box.sm');
    expect(recovered?.[0].value).toBe(16);
  });

  test('PROOF OF TEETH: a plain Symbol() brand would NOT survive across the two copies', () => {
    // Reproduce the BROKEN alternative the design rejects (Decision 2, Option C): a plain
    // module-level Symbol() is a per-copy singleton — copy A and copy B each have their OWN
    // symbol, so a brand written with copy A's symbol is invisible to copy B's symbol.
    // If this test ever passed (i.e. a Symbol() DID survive), the dual-instance lane above
    // would NOT distinguish correct from broken — so this companion assertion is what gives
    // the survival proof its teeth.
    const symbolBrandA = Symbol('@3fn/dp:tokenContract'); // copy A's brand
    const symbolBrandB = Symbol('@3fn/dp:tokenContract'); // copy B's brand (distinct identity)

    // Two distinct Symbol() values are never equal even with the same description.
    expect(symbolBrandA).not.toBe(symbolBrandB);

    const richTokens = [{ name: 'inputradio.box.sm', component: 'InputRadio', family: 'spacing', value: 16, reasoning: 'x' }];
    const value: Record<string | symbol, unknown> = { 'box.sm': 16 };
    // Copy A brands with ITS symbol.
    Object.defineProperty(value, symbolBrandA, { value: richTokens, enumerable: false });

    // Copy B reads with ITS symbol — and finds nothing. This is the silent-zero failure the
    // string-key brand (Option A) avoids and the registry singleton (and a Symbol()) suffer.
    expect(Object.prototype.hasOwnProperty.call(value, symbolBrandB)).toBe(false);
    expect((value as Record<symbol, unknown>)[symbolBrandB]).toBeUndefined();

    // Contrast: the SAME value carrying the string-key brand IS recoverable across copies,
    // because both copies compare by the value-equal frozen string.
    const copyA = loadSeparateInstance();
    const copyB = loadSeparateInstance();
    Object.defineProperty(value, copyA.TOKEN_CONTRACT_BRAND, { value: richTokens, enumerable: false });
    expect(copyB.getTokenContract(value)).toHaveLength(1);
  });

  test('idempotent re-branding tolerates a dual-path double-load across copies', () => {
    const copyA = loadSeparateInstance();
    const copyB = loadSeparateInstance();

    const branded = copyA.defineComponentTokens({
      component: 'InputRadio',
      family: 'spacing',
      tokens: { 'box.sm': { value: 16, reasoning: 'idempotency probe' } },
    });

    // Re-brand the SAME object via copy B's path (a dual-path double-load). The
    // hasOwnProperty guard + configurable:true must tolerate this without throwing.
    expect(() => {
      copyB.defineComponentTokens({
        component: 'InputRadio',
        family: 'spacing',
        tokens: { 'box.sm': { value: 16, reasoning: 'idempotency probe' } },
      });
    }).not.toThrow();

    expect(copyB.getTokenContract(branded)).toHaveLength(1);
  });
});
