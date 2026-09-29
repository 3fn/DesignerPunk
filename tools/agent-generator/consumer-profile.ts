/**
 * The consumer profile loader — Spec 123 Task 15.0 (design C12).
 *
 * `canonical/consumer-profile.yaml` = `{ targets, defaultTarget }` is THE SINGLE DECLARED LIST
 * of targets (C12). Everything that needs the target set imports it from here: the generator
 * (`generate.ts`, through the adapter registry in `adapters/index.ts`) and Task 14's per-target
 * guard (`semantics-guard.test.ts`, `describe.each(targets)`). Declaring the list anywhere else
 * — a literal `['cc', 'kiro']` — is the second list C12 forbids.
 *
 * Validation is loud: a malformed profile throws naming the file and the defect, never
 * defaults silently.
 *
 * Traces to: Req 9, 9.5; design C12, DD9.
 */

import * as fs from 'fs';
import * as path from 'path';
import { load as loadYaml } from 'js-yaml';

export const CONSUMER_PROFILE_PATH = 'canonical/consumer-profile.yaml';

/**
 * The consumer rendering's guarded root (C12; Task 15.1). Everything the steward CI renders for
 * the consumer profile lives under it: `_canonical/` (the derived charters and shared substrate,
 * rendered once, `derive()` — 15.2) and `<target>/<emitted path>` per declared target (the agents,
 * and at 15.3 the identity member files), each prose artifact with its attribution sidecar.
 * `guardedRoots()` lists it; the freshness sweep reads its sidecars for a signature's
 * `renderedHash`. Declared here, beside the target list, so both read one symbol.
 */
export const CONSUMER_OUTPUT_ROOT = 'canonical/_consumer-output';

export interface ConsumerProfile {
  /** Declared targets, in declared order (the order adapters emit in). */
  readonly targets: readonly string[];
  /** The target bare `init` emits (DD9); always one of `targets`. */
  readonly defaultTarget: string;
}

export class ConsumerProfileError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConsumerProfileError';
  }
}

const FIELDS = ['targets', 'defaultTarget'];

/** Parse and validate the profile's YAML text. `file` names the source in errors. */
export function parseConsumerProfile(yamlText: string, file = CONSUMER_PROFILE_PATH): ConsumerProfile {
  const doc = loadYaml(yamlText) as unknown;
  const fail = (msg: string): never => {
    throw new ConsumerProfileError(`${file}: ${msg}`);
  };
  if (typeof doc !== 'object' || doc === null || Array.isArray(doc)) fail('the consumer profile is a mapping { targets, defaultTarget }');
  const map = doc as Record<string, unknown>;
  for (const key of Object.keys(map)) {
    if (!FIELDS.includes(key)) fail(`unknown key '${key}' — allowed: ${FIELDS.join(', ')}`);
  }
  const targets = map.targets;
  if (!Array.isArray(targets) || targets.length === 0) fail('targets: must be a non-empty list of target names');
  const names = targets as unknown[];
  for (const t of names) {
    if (typeof t !== 'string' || t.trim() === '') fail(`targets: every entry is a non-empty target name (got ${JSON.stringify(t)})`);
  }
  const seen = new Set<string>();
  for (const t of names as string[]) {
    if (seen.has(t)) fail(`targets: '${t}' is declared twice`);
    seen.add(t);
  }
  const def = map.defaultTarget;
  if (typeof def !== 'string' || !seen.has(def)) {
    fail(`defaultTarget: must be one of the declared targets (${[...seen].join(', ')}); got ${JSON.stringify(def)}`);
  }
  return Object.freeze({ targets: Object.freeze([...(names as string[])]), defaultTarget: def as string });
}

/**
 * The surfaces this file's check reads — imported by `coverage-map.ts` (S-D1: one symbol, two
 * consumers). The profile is a GENERATION INPUT: `generateAll` builds its adapters from its
 * `targets`, so a changed profile changes the guarded outputs and `122-diff-guard` catches it.
 * It is listed under that check, never added to `guardedRoots()` (which are regeneration-compared
 * OUTPUTS, where an input would read as an extra file).
 */
export function surfaceGlobs(): string[] {
  return [CONSUMER_PROFILE_PATH];
}

/** Load `canonical/consumer-profile.yaml` from a repo root. */
export function loadConsumerProfile(repoRoot: string): ConsumerProfile {
  const abs = path.join(repoRoot, CONSUMER_PROFILE_PATH);
  if (!fs.existsSync(abs)) throw new ConsumerProfileError(`${CONSUMER_PROFILE_PATH}: not found under ${repoRoot}`);
  return parseConsumerProfile(fs.readFileSync(abs, 'utf8'));
}
