"""Drafting aid for Spec 123 Task 15.4 (never committed): writes one source's operative-set record,
dispositions file and overlay from a Python spec, validating every item text and every overlay
replacement against the canonical unit text exported by unitsjson.ts."""
import json, os, subprocess, yaml

REPO = '/Users/3fn/Documents/Work Projects/Kiro/DesignerPunk-v2'
SP = os.path.dirname(os.path.abspath(__file__))
PROFILE = 'canonical/profiles/consumer'

def q(s):
    return json.dumps(s, ensure_ascii=False)

def export(source, name):
    out = f'{SP}/{name}.json'
    subprocess.run(['npx', 'tsx', f'{SP}/unitsjson.ts', source, out], cwd=REPO, check=True)
    return json.load(open(out))

C1 = lambda owner: 'stacy' if owner == 'thurgood' else owner

def build(spec):
    """spec: name, source, owner, header (comment lines), prefix (dispositions path stem, e.g. 'ada' or 'always-set/core-goals'),
    record_name, counterpart (identity docs), units: {anchor: {items: [(id, kind, label, text)], disp: {...}, overlay: [(old, new), ...]}},
    frontmatter: {path: row-dict}, entry_values: {path: yaml-text}."""
    data = export(spec['source'], spec['name'])
    units = {u['anchor']: u for u in data['units']}
    leaves = {l['path']: l for l in data['leaves']}
    missing = [a for a in units if a not in spec['units']]
    extra = [a for a in spec['units'] if a not in units]
    assert not missing and not extra, f"unit coverage: missing {missing} extra {extra}"
    owner = spec['owner']
    note = f"{PROFILE}/confirmations/{spec['record_name']}.md"
    rec_path = f"canonical/operative-sets/{spec['record_name']}.yaml"
    # ---- record: an existing (confirmed) record keeps its units byte-for-byte; new units are appended
    existing = {}
    base = spec.get('base_ref', 'e4dfa9e3')  # confirmed records = the record as committed before 15.4
    head = subprocess.run(['git', 'show', f'{base}:{rec_path}'], cwd=REPO, capture_output=True, text=True)
    if head.returncode == 0:
        existing = (yaml.safe_load(head.stdout) or {}).get('units', {})
        assert yaml.safe_load(head.stdout)['owner'] == owner
        lines = [head.stdout.rstrip('\n'),
                 '  # Task 15.4 (2026-09-29): the remaining units, drafted by Thurgood (profile author); each is',
                 "  #   confirmed in the confirmer's seat (C1) — a DRAFT until its confirmation: note is committed."]
    else:
        lines = [*[f'# {l}' if l else '#' for l in spec['header']],
                 f"source: {spec['source']}", f'owner: {owner}', f'confirmer: {C1(owner)}', 'units:']
    total_items = sum(len(v.get('items') or []) for v in existing.values())
    for anchor, u in units.items():
        s = spec['units'][anchor]
        if anchor in existing:
            assert existing[anchor]['canonicalHash'] == u['hash'], f'{anchor}: the confirmed record is stale'
            continue
        lines.append(f'  {q(anchor)}:')
        lines.append(f"    canonicalHash: {u['hash']}")
        items = s.get('items', [])
        ids = set()
        if not items:
            lines.append('    items: []')
        else:
            lines.append('    items:')
            for (iid, kind, label, text) in items:
                assert iid not in ids, iid
                ids.add(iid)
                assert kind in ('obligation', 'step', 'member', 'route', 'command'), kind
                assert text == text.strip(), f'edge whitespace in {iid}'
                assert text in u['text'], f"{anchor} {iid}: not verbatim: {text[:80]!r}"
                lines += [f'      - id: {iid}', f'        kind: {kind}', f'        label: {q(label)}', f'        text: {q(text)}']
                total_items += 1
        lines.append(f'    confirmation: {note}{anchor}')
    open(f'{REPO}/{rec_path}', 'w').write('\n'.join(lines) + '\n')
    # ---- dispositions + overlay
    dl = [*[f'# {l}' if l else '#' for l in spec.get('disp_header', [])], f"source: {spec['source']}"]
    if spec.get('counterpart'):
        dl.append(f"counterpart: {spec['counterpart']}")
    dl.append('body:')
    ov = []
    for anchor, u in units.items():
        d = dict(spec['units'][anchor]['disp'])
        repl = spec['units'][anchor].get('overlay')
        if d['disposition'] == 're-pointed':
            d.setdefault('destination', anchor)
            assert repl, f'{anchor}: re-pointed with no overlay'
            text = u['text']
            for old, new in repl:
                assert old in text, f"{anchor}: overlay replacement does not apply: {old[:80]!r}"
                text = text.replace(old, new, 1)
            assert text != u['text']
            ov.append(f"## @unit {anchor} @ {u['hash']}\n{text}")
        else:
            assert not repl, f'{anchor}: overlay on a {d["disposition"]} row'
        dl.append(f'  {q(anchor)}: {json.dumps(d, ensure_ascii=False)}')
    if not spec.get('counterpart'):
        fm = spec['frontmatter']
        miss = [p for p in leaves if p not in fm]
        extra = [p for p in fm if p not in leaves]
        assert not miss and not extra, f'frontmatter coverage: missing {miss} extra {extra}'
        dl.append('frontmatter:')
        for p in leaves:
            d = dict(fm[p])
            if d['disposition'] == 're-pointed':
                d.setdefault('destination', f'frontmatter:{p}')
                v = spec['entry_values'][p]
                yaml.safe_load(v)
                ov.append(f"## @entry {p} @ {leaves[p]['hash']}\n{v if v.endswith(chr(10)) else v + chr(10)}")
            dl.append(f'  {q(p)}: {json.dumps(d, ensure_ascii=False)}')
    disp_path = f"{PROFILE}/{spec['prefix']}.dispositions.yaml"
    os.makedirs(os.path.dirname(f'{REPO}/{disp_path}'), exist_ok=True)
    open(f'{REPO}/{disp_path}', 'w').write('\n'.join(dl) + '\n')
    ov_path = f"{PROFILE}/{spec['prefix']}.overlay.md"
    if ov:
        open(f'{REPO}/{ov_path}', 'w').write(''.join(ov))
    elif os.path.exists(f'{REPO}/{ov_path}'):
        os.remove(f'{REPO}/{ov_path}')
    counts = {}
    for anchor in units:
        counts[spec['units'][anchor]['disp']['disposition']] = counts.get(spec['units'][anchor]['disp']['disposition'], 0) + 1
    fcounts = {}
    for p in (spec.get('frontmatter') or {}):
        fcounts[spec['frontmatter'][p]['disposition']] = fcounts.get(spec['frontmatter'][p]['disposition'], 0) + 1
    print(f"{spec['name']}: units {len(units)} items {total_items} body {counts} frontmatter {fcounts} overlays {len(ov)}")

# ---- shared authoring vocabulary (Task 15.4's class policy; stated in the 15.4 completion doc)
R = {'disposition': 'retained'}
def RP(*removals):
    row = {'disposition': 're-pointed'}
    if removals:
        row['removals'] = [{'text': t, 'cites': c} for t, c in removals]
    return row
def NCC(cite):
    return {'disposition': 'no-consumer-counterpart', 'cites': cite}
HUMAN = ('Peter', 'subtraction-2')  # an authority claim naming a person → the consumer's human lead

def disagree_unit(text_item):
    """The shared '### When You and Peter Disagree' unit."""
    return {
        'items': [('disagree', 'obligation', 'Disagreement protocol', text_item)],
        'disp': RP(HUMAN),
        'overlay': [('### When You and Peter Disagree', '### When You and Your Human Lead Disagree'),
                    ('if Peter proceeds, respect it;', 'if your human lead proceeds, respect it;')],
    }

def human_lead(overlay_pairs):
    return {'disp': RP(HUMAN), 'overlay': overlay_pairs}

def unit_texts(source, name):
    return {u['anchor']: u['text'] for u in export(source, name)['units']}

import re as _re
def bullets(text, prefix, kind='member', start=1, only=None):
    """Each top-level `- ` / `N. ` list line of a unit as one item (marker stripped), in order."""
    out = []
    n = start
    for line in text.split('\n'):
        m = _re.match(r'^(?:- |\d+\. )(.*\S)\s*$', line)
        if not m:
            continue
        t = m.group(1).strip()
        if only is not None and n not in only:
            n += 1
            continue
        label = _re.sub(r'[*`]', '', t)[:60]
        out.append((f'{prefix}-{n}', kind, label, t))
        n += 1
    return out

def leaf_paths(name):
    return [l['path'] for l in json.load(open(f'{SP}/{name}.json'))['leaves']]
