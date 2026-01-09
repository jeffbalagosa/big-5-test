# Tasks: fix-main-element-width

## Implementation Tasks

### 1. Remove maxWidth constraint from main element
**File**: `src/components/Layout/MainLayout.tsx`

- [ ] Locate the `<main>` element's inline style object (line ~67-77)
- [ ] Remove the `maxWidth: '1200px'` property from the style object
- [ ] Preserve all other style properties (`flex`, `padding`, `margin`, `width`, `boxSizing`, `display`, `flexDirection`, `overflowY`)
- [ ] Verify the `width: '100%'` property remains in place

**Validation**: Visual inspection of the code change

---

### 2. Test desktop layout with expanded sidebar
**Tool**: Browser DevTools

- [ ] Open the application in a browser
- [ ] Set viewport to 1920px width (desktop)
- [ ] Ensure sidebar is in expanded state (~250px)
- [ ] Verify main content uses full remaining horizontal space
- [ ] Check that content padding (2rem) is still applied correctly
- [ ] Navigate to different pages (Home, Test Selection, About) and verify consistent behavior

**Validation**: Main element width = viewport width - sidebar width (no centering with side margins)

---

### 3. Test desktop layout with collapsed sidebar
**Tool**: Browser DevTools

- [ ] Keep viewport at 1920px width
- [ ] Collapse the sidebar (~60px)
- [ ] Verify main content expands to use the additional space
- [ ] Check that no maximum width constraint limits the expansion
- [ ] Verify smooth transition when toggling sidebar state

**Validation**: Main element width increases when sidebar collapses

---

### 4. Test mobile layout
**Tool**: Browser DevTools (mobile viewport)

- [ ] Set viewport to 375px width (mobile)
- [ ] Verify sidebar is hidden (hamburger menu visible)
- [ ] Verify main content occupies full viewport width
- [ ] Check that mobile padding (4rem top, 1rem sides, 2rem bottom) is correct
- [ ] Test hamburger menu overlay behavior

**Validation**: Main element width = 100% of viewport width on mobile

---

### 5. Test responsive breakpoints
**Tool**: Browser DevTools

- [ ] Test at 768px (breakpoint threshold)
- [ ] Test at 1024px (tablet landscape)
- [ ] Test at 1440px (laptop)
- [ ] Test at 2560px (ultra-wide)
- [ ] Verify layout adapts smoothly at each breakpoint
- [ ] Check for any content overflow or unwanted scrollbars

**Validation**: No layout breaks at any tested viewport size

---

### 6. Visual regression check
**Tool**: Manual comparison

- [ ] Take screenshots of key pages before change (if possible from git history)
- [ ] Compare with current implementation
- [ ] Verify no unintended visual changes beyond width behavior
- [ ] Check that cards, forms, and other content render correctly across full width

**Validation**: Only width behavior changes; all other styling remains consistent

---

### 7. Cross-page consistency check
**Tool**: Browser navigation

- [ ] Test Home page layout
- [ ] Test Test Selection page layout
- [ ] Test Questionnaire page layout
- [ ] Test Results page layout
- [ ] Test About page layout
- [ ] Verify consistent main content width behavior across all pages

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
