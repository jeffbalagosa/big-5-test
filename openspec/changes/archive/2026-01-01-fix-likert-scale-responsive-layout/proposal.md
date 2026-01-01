# Proposal: Fix Likert Scale Responsive Layout

## Summary

Update the Likert scale response buttons to use a predictable responsive layout: a single horizontal row on desktop viewports (no wrapping or cut-off) and a single vertical column on mobile viewports.

## Motivation

The current implementation uses CSS Grid with `repeat(auto-fit, minmax(120px, 1fr))`, which causes unpredictable wrapping behavior at intermediate viewport widths. This can result in awkward 3+2 or 2+3 button arrangements that look unbalanced and potentially cut-off buttons on smaller desktop screens.

Users expect:

- **Desktop (≥768px)**: All 5 Likert scale buttons in a single horizontal row
- **Mobile (<768px)**: All 5 buttons stacked vertically at a comfortable tap-target width

## Impact

- **Affected Component**: `src/components/Questionnaire/LikertScale.tsx`
- **User Experience**: Improved visual consistency across viewport sizes
- **Breaking Changes**: None

## Approach

Replace the CSS Grid layout with flexbox-based responsive styling:

- Use `flex-direction: row` with `flex-wrap: nowrap` for desktop viewports
- Use `flex-direction: column` for mobile viewports
- Apply a CSS media query at the 768px breakpoint (consistent with existing responsive patterns)

Since React inline styles don't support media queries, the implementation will either:

1. Use a CSS file/module with media queries, or
2. Use a `useMediaQuery` hook to apply different inline styles based on viewport width

## Out of Scope

- Changes to button styling (colors, borders, fonts)
- Changes to QuestionCard component
- Changes to mobile breakpoint value (remains 768px per existing pattern)
