# Proposal: Refactor Persistent Sidebar

## Summary

Replace the current top header navigation + overlay drawer pattern with a persistent, ChatGPT-style side drawer that:

- Is always visible (collapsed or expanded)
- Can toggle between collapsed (icons only) and expanded states
- Supports user-resizable width when expanded

## Motivation

The current navigation uses a top header bar with a hamburger menu that opens an overlay drawer. This pattern:

- Hides navigation behind a click
- Uses screen real estate for a header that duplicates drawer content
- Doesn't leverage the persistent sidebar pattern common in modern applications

ChatGPT's sidebar pattern offers:

- Always-visible navigation context
- Quick access via icon-only collapsed state
- User control over sidebar width for comfort

## Scope

### In Scope

- Remove the top header bar from `MainLayout`
- Convert `NavigationDrawer` to a persistent sidebar
- Add collapsed state (icon-only, ~60px width)
- Add expand/collapse toggle button
- Add resizable width when expanded (min: 200px, max: 400px, default: 280px)
- Persist sidebar state (collapsed/expanded, width) in localStorage
- Maintain mobile overlay behavior for small screens

### Out of Scope

- Adding new navigation items
- Changing page content or layout
- Theming changes beyond sidebar updates

## Impact Assessment

| Area                 | Impact                                |
| -------------------- | ------------------------------------- |
| MainLayout.tsx       | Major - Remove header, adjust layout  |
| NavigationDrawer.tsx | Major - Rewrite as persistent sidebar |
| theme.ts             | Minor - Add sidebar constants         |
| App.css              | Minor - Add resize cursor styles      |

## Risks & Mitigations

| Risk                 | Mitigation                                      |
| -------------------- | ----------------------------------------------- |
| Mobile UX regression | Preserve overlay pattern for viewports < 768px  |
| Resize performance   | Use CSS resize or throttled mouse event handler |
| Content layout shift | Use CSS flexbox with fixed sidebar width        |

## Open Questions

None - the ChatGPT pattern is well-understood.

## References

- Current NavigationDrawer: [src/components/Layout/NavigationDrawer.tsx](src/components/Layout/NavigationDrawer.tsx)
- Current MainLayout: [src/components/Layout/MainLayout.tsx](src/components/Layout/MainLayout.tsx)
