| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| Alpha: `npm run check:completion-criteria-parity` exits 0 on the control commit | ✅ | `npm run check:completion-criteria-parity` → exit 0 |
| Beta: the fixture spec opts into per-parent criteria mode | ✅ | .kiro/specs/zz-gate-bite-never-merge/tasks.md:3 |
| Gamma: the control run's SUMMARY line reports `reds 0` | ✅ | `npm run check:completion-criteria-parity` → `SUMMARY: … reds 0` |

Unmet or partially met criteria: None
