# Change Proposal: fix-main-element-width

## Problem Statement

The main content area (`<main>` element) in the application layout displays an ugly scrollbar when the viewport height shrinks and content overflows. The scrollbar appears inside the content area due to `overflowY: 'auto'` on the main element, creating a poor visual experience.

## Why

The scrollbar detracts from the clean, modern aesthetic of the application. While scrolling functionality is necessary when content exceeds the viewport height, the visible scrollbar is visually unappealing. Modern web applications often hide scrollbars while maintaining scroll functionality for a cleaner look.

This change improves the user experience by:
- Maintaining a clean, minimal visual design
- Preserving scroll functionality when needed
- Aligning with modern UI/UX practices
- Removing visual clutter from the content area

## Current Behavior

In `src/components/Layout/MainLayout.tsx:76`, the `<main>` element has `overflowY: 'auto'` which:
- Shows a scrollbar when content height exceeds the available vertical space
- Creates visual clutter inside the content container
- Makes the interface feel less polished
- Uses the browser's default scrollbar styling which can be inconsistent across browsers

## Proposed Solution

Hide the scrollbar visually while maintaining scroll functionality by adding CSS that hides the scrollbar across all browsers:

1. Add `scrollbarWidth: 'none'` for Firefox
2. Add `::-webkit-scrollbar { display: none }` via a CSS class for Chrome/Safari/Edge

The main element will still be scrollable (users can scroll with mouse wheel, trackpad, touch, etc.), but the scrollbar will be invisible.

## Implementation Scope

This is a minimal CSS change that affects:
- One file: `src/components/Layout/MainLayout.tsx`
- Add inline styles to hide scrollbar: `scrollbarWidth: 'none'` and `WebkitOverflowScrolling: 'touch'`
- May need to add a style tag or CSS class for webkit scrollbar pseudo-element

## Dependencies

None. This is a standalone styling change that does not depend on other changes.

## Testing Strategy

1. Test scrolling functionality on various browsers (Chrome, Firefox, Safari, Edge)
2. Verify scrollbar is hidden but scrolling still works with:
   - Mouse wheel
   - Trackpad gestures
   - Touch gestures (mobile)
   - Keyboard (arrow keys, page up/down, space)
3. Test on both desktop and mobile viewports
4. Verify no layout shifts when scrollbar appears/disappears

## Risks and Mitigations

**Risk**: Users may not realize content is scrollable without a visible scrollbar.
**Mitigation**: This is a common modern pattern. Content that scrolls will still respond to scroll inputs, and users are accustomed to this behavior on mobile and modern web apps.

**Risk**: Accessibility concerns for users who rely on visual scrollbar cues.
**Mitigation**: Keyboard navigation and scroll functionality remain fully intact. Screen readers will still announce scrollable regions.

## Success Criteria

- Scrollbar is visually hidden across all major browsers
- Scroll functionality remains fully operational (mouse, trackpad, touch, keyboard)
- No layout shifts or visual regressions
- Clean, polished appearance when content overflows
