# Tasks: Refactor Persistent Sidebar

## Implementation Checklist

- [x] **1. Add sidebar constants to theme**

  - Add `SIDEBAR` object with `collapsedWidth`, `expandedMinWidth`, `expandedMaxWidth`, `defaultWidth`
  - File: `src/styles/theme.ts`

- [x] **2. Create useSidebarState hook**

  - Manage collapsed/expanded state
  - Manage current width (when expanded)
  - Persist to localStorage (`sidebar-collapsed`, `sidebar-width`)
  - Return: `{ isCollapsed, width, toggleCollapsed, setWidth }`
  - File: `src/hooks/useSidebarState.ts`

- [x] **3. Refactor NavigationDrawer to persistent sidebar**

  - Accept props: `isCollapsed`, `width`, `onToggle`, `onResize`
  - Render inline (not fixed overlay) on desktop
  - Show icons only when collapsed
  - Add chevron toggle button at bottom
  - Add resize handle on right edge
  - Preserve mobile overlay behavior (viewport < 768px)
  - File: `src/components/Layout/NavigationDrawer.tsx`

- [x] **4. Remove top header from MainLayout**

  - Remove `<header>` element entirely
  - Move hamburger menu trigger into sidebar (mobile only)
  - Integrate `useSidebarState` hook
  - Pass sidebar props to `NavigationDrawer`
  - Adjust main content flex layout
  - File: `src/components/Layout/MainLayout.tsx`

- [x] **5. Add resize handle styles**

  - Add cursor styles for resize handle
  - Add hover/active states
  - File: `src/App.css`

- [x] **6. Test responsive behavior**

  - Verify collapsed/expanded toggle works
  - Verify resize drag works
  - Verify mobile overlay still works
  - Verify localStorage persistence
  - Verify content layout doesn't shift unexpectedly

- [x] **7. Update existing tests if needed**
  - Update any tests that rely on header presence
  - Add basic sidebar state tests

## Validation

- [x] `npm run lint` passes
- [x] `npm run test` passes
- [x] Manual testing on desktop and mobile viewports
- [x] `scripts/pre-certify.ps1` passes
