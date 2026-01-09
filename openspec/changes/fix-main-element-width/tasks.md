# Tasks: fix-main-element-width

## Implementation Tasks

### 1. Remove maxWidth constraint from main element
**File**: `src/components/Layout/MainLayout.tsx`

- [x] Locate the `<main>` element's inline style object (line ~67-77)
- [x] Remove the `maxWidth: '1200px'` property from the style object
- [x] Preserve all other style properties (`flex`, `padding`, `margin`, `width`, `boxSizing`, `display`, `flexDirection`, `overflowY`)
- [x] Verify the `width: '100%'` property remains in place

**Validation**: Visual inspection of the code change

---

### 2. Test desktop layout with expanded sidebar
**Tool**: Browser DevTools

- [x] Open the application in a browser
- [x] Set viewport to 1920px width (desktop)
- [x] Ensure sidebar is in expanded state (~250px)
- [x] Verify main content uses full remaining horizontal space
- [x] Check that content padding (2rem) is still applied correctly
- [x] Navigate to different pages (Home, Test Selection, About) and verify consistent behavior

**Validation**: Main element width = viewport width - sidebar width (no centering with side margins)

---

### 3. Test desktop layout with collapsed sidebar
**Tool**: Browser DevTools

- [x] Keep viewport at 1920px width
- [x] Collapse the sidebar (~60px)
- [x] Verify main content expands to use the additional space
- [x] Check that no maximum width constraint limits the expansion
- [x] Verify smooth transition when toggling sidebar state

**Validation**: Main element width increases when sidebar collapses

---

### 4. Test mobile layout
**Tool**: Browser DevTools (mobile viewport)

- [x] Set viewport to 375px width (mobile)
- [x] Verify sidebar is hidden (hamburger menu visible)
- [x] Verify main content occupies full viewport width
- [x] Check that mobile padding (4rem top, 1rem sides, 2rem bottom) is correct
- [x] Test hamburger menu overlay behavior

**Validation**: Main element width = 100% of viewport width on mobile

---

### 5. Test responsive breakpoints
**Tool**: Browser DevTools

- [x] Test at 768px (breakpoint threshold)
- [x] Test at 1024px (tablet landscape)
- [x] Test at 1440px (laptop)
- [x] Test at 2560px (ultra-wide)
- [x] Verify layout adapts smoothly at each breakpoint
- [x] Check for any content overflow or unwanted scrollbars

**Validation**: No layout breaks at any tested viewport size

---

### 6. Visual regression check
**Tool**: Manual comparison

- [x] Take screenshots of key pages before change (if possible from git history)
- [x] Compare with current implementation
- [x] Verify no unintended visual changes beyond width behavior
- [x] Check that cards, forms, and other content render correctly across full width

**Validation**: Only width behavior changes; all other styling remains consistent

---

### 7. Cross-page consistency check
**Tool**: Browser navigation

- [x] Test Home page layout
- [x] Test Test Selection page layout
- [x] Test Questionnaire page layout
- [x] Test Results page layout
- [x] Test About page layout
- [x] Verify consistent main content width behavior across all pages

**Validation**: All pages benefit from full-width layout

---

## Dependencies

None - this is a standalone change.

## Parallel Work

All testing tasks (2-7) can be performed in parallel once task 1 is completed.

## Estimated Effort

- Implementation: 2 minutes
- Testing: 15-20 minutes
- Total: ~20-25 minutes
