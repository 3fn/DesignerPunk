/**
 * check-agent-trailer — a LOCAL early check (not a gate): every non-merge commit in `<base>..<head>`
 * that touches a signing path must carry exactly one parsable `Agent:` trailer.
 *
 *   npx tsx tools/agent-generator/regrounding/check-agent-trailer.ts <base> [<head>=HEAD]
 *
 * Why it exists: `verify-signing-chain` link 3 fails a signing commit whose `Agent:` trailer git
 * cannot read, and the merge-only rule then forces a branch re-cut. Git reads trailers only from the
 * final paragraph of the message, so an `Agent:` line one paragraph too early is the usual cause
 * (2026-10-18, two C1 re-confirm commits). This catches it before the push. The gate is still
 * `verify-signing-chain --ci`; this adds nothing it does not already enforce.
 *
 * Exit 0 clean · 1 offending commits · 2 unreadable range.
 */

import { agentLineAboveFinalParagraph, git, isSigningPath, readRange, HistoryError, AGENT_ABOVE_FINAL_PARAGRAPH } from './verify-signing-chain';

export const HINT = 'put "Agent: <seat>" and "Co-Authored-By:" together in ONE final paragraph (git reads trailers only from the last paragraph)';

export interface Offender {
  sha: string;
  subject: string;
  files: string[];
  message: string;
}

/** Commits of `base..head` that touch a signing path with no parsable `Agent:` trailer. */
export function findOffenders(repo: string, base: string, head: string): Offender[] {
  const out: Offender[] = [];
  for (const c of readRange(repo, base, head)) {
    if (c.parents.length > 1 || c.trailers.length > 0) continue;
    const files = git(repo, ['diff-tree', '-r', '-z', '--no-renames', '--name-only', '--root', c.sha])
      .split('\0')
      .filter(Boolean)
      .filter(isSigningPath);
    if (files.length === 0) continue;
    const message = agentLineAboveFinalParagraph(repo, c.sha) ? AGENT_ABOVE_FINAL_PARAGRAPH : `signing commit carries no Agent: trailer — ${HINT}`;
    out.push({ sha: c.sha, subject: c.subject, files, message });
  }
  return out;
}

export function main(argv: string[], repo = process.cwd()): number {
  const [base, head = 'HEAD'] = argv;
  if (!base) {
    process.stderr.write('usage: check-agent-trailer <base> [<head>=HEAD]\n');
    return 2;
  }
  let offenders: Offender[];
  try {
    offenders = findOffenders(repo, base, head);
  } catch (e) {
    if (e instanceof HistoryError) {
      process.stderr.write(`check-agent-trailer: ${e.message}\n`);
      return 2;
    }
    throw e;
  }
  for (const o of offenders) {
    process.stdout.write(`FAIL ${o.sha.slice(0, 9)} ${o.subject}\n  ${o.message}\n  touches: ${o.files.join(', ')}\n`);
  }
  process.stdout.write(`check-agent-trailer: ${offenders.length === 0 ? 'PASS' : `FAIL (${offenders.length} commit${offenders.length === 1 ? '' : 's'})`} — ${base}..${head}\n`);
  return offenders.length === 0 ? 0 : 1;
}

if (require.main === module) {
  process.exit(main(process.argv.slice(2)));
}
