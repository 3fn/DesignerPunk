# Design Outline: Home — Tool Browse

**Spec**: home-tool-browse
**Date**: 2026-10-14
**Status**: design-outline
**Platform**: web
**Screen**: Home — Tool Browse

---

## What this screen is

The first screen a logged-in neighbour sees. Its job is to answer: "What's available near me?" The user should be able to scan a list of tools and search by name.

This is the product's most important screen. It sets the tone for trust: I can see real tools, real people, and I can find what I need quickly.

---

## User goal

"I want to borrow a tool. Show me what's available near me, and let me search if I have something specific in mind."

---

## What's on the screen

### 1. Page header

A simple heading area that identifies where the user is. Shows:
- Page title: "Available near you"
- User's neighbourhood name (e.g. "Riverdale") as a subtitle so they know it's showing their area

### 2. Search field

A text input at the top of the content area. Placeholder: "Search tools…"
- Filters the listing as the user types (client-side, no server round-trip needed for v1)
- Clearing the field returns the full list

### 3. Filter chips (category filters)

A horizontal row of Chip-Filter chips below the search field. Categories for v1:
- All (default selected)
- Power tools
- Garden
- Hand tools

Only one category can be active at a time (single-select behaviour via the parent). Selecting a category narrows the list. "All" clears the category filter.

**Note**: Chip-Filter is designed for multi-select, but single-select is valid — the parent manages selection state and only allows one active at a time.

### 4. Tool listing

A vertical list of tool cards. Each card shows:
- Tool photo (image, falls back to a generic tool icon if no photo)
- Tool name (primary text)
- Category label (Badge-Label-Base, e.g. "Power tools")
- Lender's name and avatar (Avatar-Base, human type)
- Distance (e.g. "0.3 km away")
- Availability status: "Available now" or "Booked until [date]"

Tapping a card navigates to the tool detail page (out of scope for this spec).

### 5. Empty state

When search or filters produce no results:
- Icon (wrench or similar)
- Heading: "No tools found"
- Body: "Try a different search or category."
- No button needed — the user can just edit the search

### 6. Loading state

On initial load while tools are fetched:
- Show 3–4 skeleton card shapes (grey placeholder blocks in card shape)
- No spinner needed

---

## Layout

**Template**: `full-width-page` as the structural base, with a constrained content region (max-width ~800px, centered on wide viewports).

- **Narrow (mobile, <768px)**: Single column. Header → search → chips → card list, full width.
- **Wide (desktop, ≥768px)**: Same structure, content constrained to ~800px, centered. Cards remain single-column (tool browse benefits from focus, not a grid).

**Design rationale**: Single column at all widths. This is a task-focused browsing screen, not a dashboard grid. Width constraint on desktop prevents line lengths that feel commercial-catalogue; it keeps the neighbourly, personal feel.

---

## Color strategy

**Restrained** — the product register calls for trustworthy and simple. One accent color (cyan, the action/navigation semantic) appears on the active filter chip and the search field focus ring. No decorative color on cards.

---

## Components selected

| Role | Component | Notes |
|---|---|---|
| Page structure | Container-Base | Wraps header and content regions |
| Search input | Input-Text-Base | No dedicated Search component exists yet — see gap note |
| Category filters | Chip-Filter | Single-select managed by parent |
| Tool card | Container-Card-Base | Interactive (tappable), elevated |
| Category label on card | Badge-Label-Base | sm size |
| Lender avatar | Avatar-Base | human type, sm size (24px) |
| Tool photo fallback | Icon-Base | Used when no photo available |

**Component gap — noted for system feedback:**
- `Input-Text-Base` carries a note: "use Search component when available." No Search component exists in the design system. For v1, `Input-Text-Base` is the correct fallback. A Search component (with search icon leading, clear button trailing, `role="search"` wrapper) should be flagged to Lina via Thurgood.
- No dedicated "listing card" product component exists. `Container-Card-Base` is the right base. Sparky will compose the card's interior (photo, text, avatar, badge) using product-level markup and tokens.

---

## States

| State | Trigger | Behaviour |
|---|---|---|
| Loading | Initial page load | Skeleton card placeholders |
| Loaded | Data arrives | Full card list |
| Searching | User typing | List filters client-side |
| Filtered | Chip active | List filters by category |
| Empty | No matches | Empty state message |
| Error | Fetch failure | Simple error message with retry (not designed in detail for v1) |

---

## Data

- **Tool list**: fetched from backend on mount. Each item: `id`, `name`, `category`, `photoUrl`, `lender.name`, `lender.avatarUrl`, `distanceKm`, `availableNow`, `bookedUntil`.
- **User's neighbourhood**: available from user session/profile. Not fetched separately on this screen.
- **Search**: client-side string match against `name`.
- **Category filter**: client-side filter against `category`.

---

## Accessibility requirements

- Search input: `role="search"` wrapper around `Input-Text-Base`, `aria-label="Search tools"`
- Filter chips: `aria-pressed` per chip (handled by Chip-Filter component)
- Card list: `<ul>` / `<li>` structure; each card is a link (`<a>`) to the tool detail page
- Lender avatar: `aria-label="[Lender name]"` on Avatar-Base
- Distance and availability: plain text, readable by screen readers
- Skeleton loading state: `aria-busy="true"` on the list region, `aria-label="Loading tools"` on the container
- Empty state: announced via `role="status"`
- Keyboard: search → chips (arrow keys between chips) → card list (Tab through cards) → card activates with Enter

---

## What this spec does not cover

- Tool detail page (the destination when a card is tapped)
- Authentication / login
- The user's own listed tools ("my listings")
- Map view of tools near you
- Sorting (by distance, by recent) — v2
- Pagination or infinite scroll — v1 loads all available tools (expected to be a small number for the pilot)

---

## Open questions

1. Should the neighbourhood name in the header be tappable to let users change their location? (Product decision — out of scope for v1 but worth flagging.)
2. Should "Available now" vs "Booked" affect card ordering, or is order set by the backend? (Engineering decision — leave to backend for v1.)
