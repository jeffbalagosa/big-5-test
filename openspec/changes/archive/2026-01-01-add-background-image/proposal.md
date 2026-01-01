# Proposal: Add Background Image with Overlay

## Problem

The current application has a plain light gray background (`#f8f9fa`), which lacks visual depth and branding.

## Proposed Solution

Add `src/assets/window_background.png` as a global background image for the application. To ensure readability of foreground text and elements, a semi-transparent overlay will be applied over the image.

## Impact

- **User Experience**: Improved visual appeal and professional look.
- **Accessibility**: The semi-transparent overlay ensures that contrast ratios remain high for text readability.
- **Performance**: Minimal impact as it's a single image asset.

## Proposed Changes

- Update `MainLayout.tsx` or global CSS to include the background image.
- Implement a semi-transparent overlay (e.g., using a pseudo-element or a wrapper div).
- Ensure the background is fixed or covers the entire viewport.
