from build_profile import build, R, RP, NCC, HUMAN, bullets, unit_texts

def identity(doc_id, file, units, extra_header=()):
    """Build one always-set member's record (owner thurgood → Stacy confirms, C1) and its dispositions."""
    src = f'.kiro/steering/{file}.md'
    build({
        'name': doc_id, 'source': src, 'owner': 'thurgood', 'record_name': doc_id, 'prefix': f'always-set/{doc_id}', 'counterpart': src,
        'header': [
            f'canonical/operative-sets/{doc_id}.yaml — operative-set record (design C16; Req 11.6.5d)',
            '',
            f'Every body unit of {src}, an always-set member (Spec 123 Task 15.4). Under path (B) (Req 12.1a) the',
            'shipped steering doc IS the canonical counterpart. Owner thurgood (a Civitas governance-layer doc) ==',
            'the profile author, so the C1 confirmer is the counterpart seat, Stacy. Drafted by Thurgood.',
            'canonicalHash = "sha256:" + hex SHA-256 over the unit\'s exact bytes (partition(splitFrontmatter(src).body)).',
            'Item text is the COMPLETE operative text, a verbatim substring of its unit; label is never matched.',
            *extra_header,
        ],
        'disp_header': [
            f'canonical/profiles/consumer/always-set/{doc_id}.dispositions.yaml — Spec 123 Task 15.4 (design C19; DD25)',
            'An always-set member: body rows only; the shipped doc\'s own frontmatter is dropped, never carried (C19).',
            "Re-pointed units re-ground the member at the consumer's repo (Req 12.1: the always-set re-grounds as a class).",
        ],
        'units': units,
    })
