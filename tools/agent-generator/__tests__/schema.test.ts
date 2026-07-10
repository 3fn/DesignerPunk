/**
 * @category evergreen
 * @purpose Verify the C1 canonical agent schema's five validate-stage rules
 *          (silent-failure discriminator, volatile-fact lint, predicate presence
 *          + per-claim keying + regex governance, run-context enum, membership
 *          hygiene) each reject/accept the shapes design.md specifies.
 */

import {
  CONTENT_CLASS_REGISTRY,
  validateContentClassDiscriminator,
  lintVolatileFactsInBody,
  lintVolatileFactsInFrontmatterFields,
  validateGovernanceAsLaw,
  validateRunContexts,
  validateMembershipHygiene,
  validate,
  type AgentFrontmatter,
  type CanonicalAgentDoc,
  type GovernanceAsLawEntry,
  type CommandEntry,
} from '../schema';

// ============================================================================
// Rule 1 — Silent-failure discriminator
// ============================================================================

describe('Rule 1 — silent-failure discriminator', () => {
  it('accepts a content class declared in the registry with a form + rationale', () => {
    const errors = validateContentClassDiscriminator(['ambient', 'routes']);
    expect(errors).toEqual([]);
  });

  it('rejects an undeclared content class with no default', () => {
    const errors = validateContentClassDiscriminator(['someBrandNewClass']);
    expect(errors).toHaveLength(1);
    expect(errors[0].rule).toBe(1);
    expect(errors[0].message).toMatch(/not declared in the schema registry/);
    expect(errors[0].message).toMatch(/no default/i);
  });

  it('rejects a declared class missing a rationale', () => {
    const registry = {
      badClass: { form: 'frontmatter' as const, rationale: '' },
    };
    const errors = validateContentClassDiscriminator(['badClass'], registry);
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toMatch(/without a one-line discriminator rationale/);
  });

  it('the real CONTENT_CLASS_REGISTRY declares every class as frontmatter|body with a rationale', () => {
    const names = Object.keys(CONTENT_CLASS_REGISTRY);
    expect(names.length).toBeGreaterThan(0);
    const errors = validateContentClassDiscriminator(names, CONTENT_CLASS_REGISTRY);
    expect(errors).toEqual([]);
  });
});

// ============================================================================
// Rule 2 — Volatile-fact lint (a FLOOR)
// ============================================================================

describe('Rule 2 — volatile-fact lint (body)', () => {
  it('flags an integer adjacent to an inventory noun in body prose', () => {
    const body = 'Our catalog currently has 28 components available.';
    const errors = lintVolatileFactsInBody(body);
    expect(errors).toHaveLength(1);
    expect(errors[0].rule).toBe(2);
  });

  it('flags a semver string in body prose', () => {
    const body = 'This behavior shipped in 13.0.0 of the package.';
    const errors = lintVolatileFactsInBody(body);
    expect(errors).toHaveLength(1);
  });

  it('flags an "N of M" form in body prose', () => {
    const body = 'The CC port covers 5 of 8 agents today.';
    const errors = lintVolatileFactsInBody(body);
    expect(errors).toHaveLength(1);
  });

  it('exempts a volatile hit annotated with <!-- volatile-ok: reason --> on the same line', () => {
    const body = 'Our catalog currently has 28 components available. <!-- volatile-ok: illustrative example, not load-bearing -->';
    const errors = lintVolatileFactsInBody(body);
    expect(errors).toEqual([]);
  });

  it('passes clean prose with no volatile signatures', () => {
    const body = 'Components are enumerated live via get_component_catalog — the count is never frozen in prose.';
    const errors = lintVolatileFactsInBody(body);
    expect(errors).toEqual([]);
  });
});

describe('Rule 2 — volatile-fact lint (frontmatter string fields)', () => {
  it('flags a volatile literal inside an authored cue: field', () => {
    const errors = lintVolatileFactsInFrontmatterFields([
      { field: 'cue', value: 'WHEN you need any of the 28 components THEN query get_component_full', path: 'commands[0].cue' },
    ]);
    expect(errors).toHaveLength(1);
    expect(errors[0].rule).toBe(2);
    expect(errors[0].path).toBe('commands[0].cue');
  });

  it('exempts a flagged frontmatter field carrying its own volatile-ok annotation', () => {
    const errors = lintVolatileFactsInFrontmatterFields([
      {
        field: 'cue',
        value: 'WHEN you need any of the 28 components THEN query get_component_full',
        volatileOk: 'illustrative snapshot in a worked example',
        path: 'commands[0].cue',
      },
    ]);
    expect(errors).toEqual([]);
  });

  it('passes a clean frontmatter field with no volatile signature', () => {
    const errors = lintVolatileFactsInFrontmatterFields([
      { field: 'when', value: 'touching runtime-TS loading, package exports, consumer .ts', path: 'routes.docs[0].when' },
    ]);
    expect(errors).toEqual([]);
  });

  it('documents its named false-negative classes as a floor, not full enforcement', () => {
    // Spelled-out integers are a documented false negative — this is NOT a bug.
    const errors = lintVolatileFactsInBody('We ship twenty-eight components today.');
    expect(errors).toEqual([]);
  });
});

// ============================================================================
// Rule 3 — Predicate presence + per-claim keying + regex governance
// ============================================================================

describe('Rule 3 — governanceAsLaw predicate presence + per-claim keying + regex governance', () => {
  const validEntry: GovernanceAsLawEntry = {
    id: 'platform-implementation-guidelines',
    owner: 'lina',
    assert: [
      {
        claim: 'compose-is-the-render-target',
        section: 'Platform-Specific Implementation Rules',
        mustContain: ['Jetpack Compose'],
      },
    ],
  };

  it('accepts a well-formed entry with owner + ≥1 named claim using mustContain', () => {
    const errors = validateGovernanceAsLaw([validEntry]);
    expect(errors).toEqual([]);
  });

  it('accepts a well-formed pattern-based claim carrying an assertsComment companion', () => {
    const entry: GovernanceAsLawEntry = {
      id: 'platform-implementation-guidelines',
      owner: 'lina',
      assert: [
        {
          claim: 'tokens-are-mandatory',
          section: 'Platform-Specific Implementation Rules',
          pattern: 'MUST use .*token',
          assertsComment: 'platform rules mandate token usage (not merely mention tokens)',
        },
      ],
    };
    const errors = validateGovernanceAsLaw([entry]);
    expect(errors).toEqual([]);
  });

  it('rejects an entry with zero assert claims', () => {
    const entry: GovernanceAsLawEntry = { id: 'some-doc', owner: 'ada', assert: [] };
    const errors = validateGovernanceAsLaw([entry]);
    expect(errors.some((e) => e.rule === 3 && /zero "assert" claims/.test(e.message))).toBe(true);
  });

  it('rejects an entry missing an owner', () => {
    const entry = { id: 'some-doc', assert: validEntry.assert } as unknown as GovernanceAsLawEntry;
    const errors = validateGovernanceAsLaw([entry]);
    expect(errors.some((e) => e.rule === 3 && /missing a required "owner"/.test(e.message))).toBe(true);
  });

  it('rejects a claim with neither mustContain nor pattern', () => {
    const entry: GovernanceAsLawEntry = {
      id: 'some-doc',
      owner: 'ada',
      assert: [{ claim: 'no-predicate', section: 'Some Section' }],
    };
    const errors = validateGovernanceAsLaw([entry]);
    expect(errors.some((e) => /neither "mustContain" nor "pattern"/.test(e.message))).toBe(true);
  });

  it('rejects a claim carrying both mustContain and pattern', () => {
    const entry: GovernanceAsLawEntry = {
      id: 'some-doc',
      owner: 'ada',
      assert: [
        {
          claim: 'ambiguous',
          section: 'Some Section',
          mustContain: ['x'],
          pattern: 'x',
          assertsComment: 'x asserts x',
        },
      ],
    };
    const errors = validateGovernanceAsLaw([entry]);
    expect(errors.some((e) => /BOTH "mustContain" and "pattern"/.test(e.message))).toBe(true);
  });

  it('rejects a pattern claim missing its # asserts companion', () => {
    const entry: GovernanceAsLawEntry = {
      id: 'some-doc',
      owner: 'ada',
      assert: [{ claim: 'no-companion', section: 'Some Section', pattern: 'MUST use .*token' }],
    };
    const errors = validateGovernanceAsLaw([entry]);
    expect(errors.some((e) => /without a required "# asserts:/.test(e.message))).toBe(true);
  });

  it.each(['.*', '.+', '', '(foo)?'])(
    'rejects a trivially-permissive pattern: %p',
    (pattern) => {
      const entry: GovernanceAsLawEntry = {
        id: 'some-doc',
        owner: 'ada',
        assert: [
          {
            claim: 'too-permissive',
            section: 'Some Section',
            pattern,
            assertsComment: 'some claim',
          },
        ],
      };
      const errors = validateGovernanceAsLaw([entry]);
      expect(errors.some((e) => /trivially-permissive pattern/.test(e.message))).toBe(true);
    }
  );

  it('names WHICH claim moved when a specific claim in a multi-claim entry fails', () => {
    const entry: GovernanceAsLawEntry = {
      id: 'token-governance',
      owner: 'ada',
      assert: [
        { claim: 'semantic-first', section: 'Selection Priority', mustContain: ['semantic'] },
        { claim: 'component-tokens-require-approval', section: 'Selection Priority' }, // missing predicate
      ],
    };
    const errors = validateGovernanceAsLaw([entry]);
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toContain('component-tokens-require-approval');
  });
});

// ============================================================================
// Rule 4 — Run-context enum
// ============================================================================

describe('Rule 4 — run-context enum', () => {
  it('accepts a this-repo command entry', () => {
    const commands: CommandEntry[] = [
      { name: 'platform-tokens', cmd: 'npm run generate:platform-tokens', runContext: 'this-repo' },
    ];
    expect(validateRunContexts(commands)).toEqual([]);
  });

  it('accepts a consumer-repo named-gap entry', () => {
    const commands: CommandEntry[] = [
      {
        class: 'gradle-build-test',
        runContext: 'consumer-repo',
        gap: 'no gradlew in this repo — build/test runs from the product app android/ dir',
      },
    ];
    expect(validateRunContexts(commands)).toEqual([]);
  });

  it('accepts a per-product entry carrying authoredPerProduct: true', () => {
    const commands: CommandEntry[] = [
      {
        name: 'screen-spec',
        cmd: 'per-product-authored',
        runContext: 'per-product',
        authoredPerProduct: true,
      },
    ];
    expect(validateRunContexts(commands)).toEqual([]);
  });

  it('rejects an invalid runContext value', () => {
    const commands = [
      { name: 'bad', cmd: 'echo hi', runContext: 'staging' as unknown as CommandEntry['runContext'] },
    ] as unknown as CommandEntry[];
    const errors = validateRunContexts(commands);
    expect(errors).toHaveLength(1);
    expect(errors[0].rule).toBe(4);
    expect(errors[0].message).toMatch(/must be one of/);
  });

  it('rejects a per-product entry missing authoredPerProduct: true', () => {
    const commands: CommandEntry[] = [
      { name: 'screen-spec', cmd: 'per-product-authored', runContext: 'per-product' },
    ];
    const errors = validateRunContexts(commands);
    expect(errors).toHaveLength(1);
    expect(errors[0].message).toMatch(/authoredPerProduct: true/);
  });
});

// ============================================================================
// Rule 5 — Membership hygiene
// ============================================================================

describe('Rule 5 — membership hygiene', () => {
  const alwaysSetIds = ['core-goals', 'ai-collaboration-principles', 'agent-directory'];

  it('accepts a per-agent governanceAsLaw entry referencing a non-always-set doc', () => {
    const errors = validateMembershipHygiene(
      { governanceAsLaw: [{ id: 'platform-implementation-guidelines', owner: 'lina', assert: [] }] },
      alwaysSetIds
    );
    expect(errors).toEqual([]);
  });

  it('rejects an always-set doc id appearing under ambient.governanceAsLaw', () => {
    const errors = validateMembershipHygiene(
      { governanceAsLaw: [{ id: 'core-goals', owner: 'ada', assert: [] }] },
      alwaysSetIds
    );
    expect(errors).toHaveLength(1);
    expect(errors[0].rule).toBe(5);
    expect(errors[0].message).toMatch(/always-set doc id/);
    expect(errors[0].message).toMatch(/shared\/always-set\.yaml/);
  });

  it('returns no errors when ambient is undefined', () => {
    expect(validateMembershipHygiene(undefined, alwaysSetIds)).toEqual([]);
  });
});

// ============================================================================
// Composed validate(doc)
// ============================================================================

describe('validate(doc) — composed', () => {
  function buildDoc(overrides: Partial<AgentFrontmatter> = {}, body = 'Clean pass-through prose with no volatile facts.'): CanonicalAgentDoc {
    const frontmatter: AgentFrontmatter = {
      agent: 'data',
      agentType: 'consumer',
      description: 'Android platform engineer',
      ambient: {
        governanceAsLaw: [
          {
            id: 'platform-implementation-guidelines',
            owner: 'lina',
            assert: [
              {
                claim: 'compose-is-the-render-target',
                section: 'Platform-Specific Implementation Rules',
                mustContain: ['Jetpack Compose'],
              },
            ],
          },
        ],
      },
      commands: [
        { name: 'platform-tokens', cmd: 'npm run generate:platform-tokens', runContext: 'this-repo' },
      ],
      ...overrides,
    };
    return { frontmatter, body };
  }

  it('returns no errors for a fully valid doc', () => {
    const doc = buildDoc();
    const errors = validate(doc, { alwaysSetIds: ['core-goals'] });
    expect(errors).toEqual([]);
  });

  it('aggregates violations across multiple rules in one call', () => {
    const doc = buildDoc(
      {
        ambient: {
          governanceAsLaw: [
            { id: 'core-goals', owner: 'ada', assert: [] }, // rule 3 (zero asserts) + rule 5 (always-set id)
          ],
        },
        commands: [
          { name: 'bad', cmd: 'echo hi', runContext: 'per-product' }, // rule 4 (missing authoredPerProduct)
        ],
      },
      'This mentions 28 components with no annotation.' // rule 2
    );
    const errors = validate(doc, { alwaysSetIds: ['core-goals'] });
    const rulesHit = new Set(errors.map((e) => e.rule));
    expect(rulesHit.has(2)).toBe(true);
    expect(rulesHit.has(3)).toBe(true);
    expect(rulesHit.has(4)).toBe(true);
    expect(rulesHit.has(5)).toBe(true);
  });
});
