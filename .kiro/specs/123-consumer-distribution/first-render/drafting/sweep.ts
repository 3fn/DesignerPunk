const R = process.cwd() + '/';
const { runFreshnessSweep, formatFreshness } = require(R + 'tools/agent-generator/regrounding/freshness');
const rep = runFreshnessSweep(R);
const by: Record<string, number> = {};
for (const f of rep.findings) by[f.check] = (by[f.check] ?? 0) + 1;
console.log(formatFreshness(rep)[0]); console.log(JSON.stringify(by));
for (const f of rep.findings.filter((f: any) => !['confirmation'].includes(f.check)).slice(0, 20)) console.log(f.check, f.message.slice(0, 200));
const conf = rep.findings.filter((f: any) => f.check === 'confirmation');
const files: Record<string, number> = {}; for (const f of conf) files[f.file] = (files[f.file] ?? 0) + 1; console.log(JSON.stringify(files));
