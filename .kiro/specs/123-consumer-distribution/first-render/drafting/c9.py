import json
SP='/private/tmp/claude-501/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2/b1bd1043-bab0-49be-a624-2aa6cd54b2e9/scratchpad'
REPO='/Users/3fn/Documents/Work Projects/Kiro/DesignerPunk-v2'
A='#the-claims-pass-record-claims-passmd-the-template'
u=[x for x in json.load(open(f'{SP}/stacy.json'))['units'] if x['anchor']==A][0]
t=u['text']
def between(start, end=None, include_end=False):
    i=t.index(start); j=t.index(end, i) if end else len(t)
    s=t[i:j+(len(end) if include_end and end else 0)].strip()
    return s
cb = t[t.index('**The counting block, in full**: ')+len('**The counting block, in full**: '):t.index('<!-- volatile-ok')].strip()
# split the counting block's members at the top-level "; " that precedes a bold member name
members=[]; depth=0; start=0
for k,ch in enumerate(cb):
    if ch in '(': depth+=1
    elif ch in ')': depth-=1
    if depth==0 and cb.startswith('; ', k) and (cb.startswith('; **', k) or cb.startswith('; and **', k)):
        members.append(cb[start:k].strip()); start=k+2
members.append(cb[start:].strip())
first = members.pop(0)
a, b = first.split('; ', 1)
members[0:0] = [a, b]
items=[
 ('record-committed','obligation','Every pass is a committed record',"Every pass produces a committed record in the spec's completion directory."),
 ('closeout-path','obligation','CLOSEOUT record path',"CLOSEOUT's record is `.kiro/specs/<spec>/completion/claims-pass.md` — the exact filename the owed-set predicate keys on."),
 ('midpoint-path','obligation','MIDPOINT record path','**A MIDPOINT record is `completion/claims-pass-midpoint.md`, NEVER `claims-pass.md`**'),
 ('section-scope','member','Scope section','**Scope** — the spec, the population (which parents / which delta), the firing trigger.'),
 ('section-findings','member','Findings section','**Findings** — per discrepancy: **promised / claimed / shipped**, classified per the 112 taxonomy, routed per the two-route rule above.'),
 ('section-method','member','Method section',"**Method — the sample, named, and how many of the total** (the fraction is rot-mode-1's detector)."),
 ('method-honesty','obligation','Method honesty per row and platform','Method honesty is **per criterion row and per platform**: a platform-unverifiable row is recorded as `not re-verified — toolchain unavailable`, never silently omitted, and an unverifiable row NEVER rolls into a ✅.'),
 ('closed-negative-string','obligation','One closed negative string','The vocabulary is deliberately **closed to that one negative string**'),
 ('mandatory-line','obligation','The Standards-implications line',"**The mandatory line**: `Standards implications: none / or list` — the composed learning loop's input; Thurgood reads every pass in full against it."),
]
labels=['Omissions','Vagueness','Declared-none rates','Fixed-string exemption usage','Bundled-claim / incomplete-decomposition','Platforms fallback invocations','Subtask-doc presence','Delegated-tier capture','Orchestrator consult line','Re-grounding dispositions','Populations and baselines','M3 / M4 / M5']
assert len(members)==len(labels), (len(members), [m[:40] for m in members])
for i,(m,l) in enumerate(zip(members,labels)):
    m = m[4:].strip() if m.startswith('and ') else m
    items.append((f'counting-{i+1}','member',f'Counting block: {l}',m))
items += [
 ('report-set-comparison','obligation','Report-set comparison at CLOSEOUT',between('**The report-set comparison**','\n- **The emission-reading duty')),
 ('emission-reading','obligation','Emission-reading duty',between('**The emission-reading duty','\n- **The delegated-tier read**')),
 ('delegated-tier-read','obligation','Delegated-tier read',between('**The delegated-tier read**','\n- **The deferral walk-back**')),
 ('deferral-walk-back','obligation','Deferral walk-back',between('**The deferral walk-back**','\n- **The instruments read**')),
 ('instruments-read','obligation','Instruments read',between('**The instruments read**','\n- **The never-a-gate sentence')),
 ('never-a-gate','obligation','Never a gate','*no pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.*'),
]
lines=['  # Task 15.4 (2026-09-29): the counting-block unit, first recorded against its post-13.8 text (the',
       '  #   `volatile-ok` marker is in canonicalHash; the marker is not an item). Drafted by Thurgood;',
       '  #   confirmed by Stacy (C1) in her seat — Task 13\'s ⚠️ row discharges here (erratum 2026-09-28).',
       f'  {json.dumps(A)}:', f"    canonicalHash: {u['hash']}", '    items:']
for iid,kind,label,text in items:
    assert text==text.strip() and text in t, (iid, text[:60])
    lines += [f'      - id: {iid}',f'        kind: {kind}',f'        label: {json.dumps(label, ensure_ascii=False)}',f'        text: {json.dumps(text, ensure_ascii=False)}']
lines.append(f'    confirmation: canonical/profiles/consumer/confirmations/stacy.md{A}')
p=f'{REPO}/canonical/operative-sets/stacy.yaml'
s=open(p).read()
assert A not in s
open(p,'w').write(s.rstrip('\n')+'\n'+'\n'.join(lines)+'\n')
print(len(items),'items; hash',u['hash'])
for iid,_,_,text in items[9:20]: print(iid, text[:90].replace('\n',' '))
