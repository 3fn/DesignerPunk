import * as fs from 'fs';
const R = process.cwd() + '/';
const { load } = require(R + 'node_modules/js-yaml');
const { hashEntry } = require(R + 'tools/agent-generator/regrounding/hash');
const doc = load(fs.readFileSync(R + 'canonical/shared/shared-catalog.yaml', 'utf8'));
for (const m of doc.members) console.log(m.id, hashEntry(m));
