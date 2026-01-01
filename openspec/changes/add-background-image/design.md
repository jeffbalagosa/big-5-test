# Design: Background Image and Overlay

## Architecture Overview

The background image will be applied to the root layout component (`MainLayout.tsx`) to ensure it persists across all pages.

## Implementation Details

### Background Image

- **Asset**: `src/assets/window_background.png`
- **CSS Properties**:
  - `background-image`: `url('/src/assets/window_background.png')`
  - `background-size`: `cover`
  - `background-position`: `center`
  - `background-attachment`: `fixed` (to prevent scrolling with content)
  - `background-repeat`: `no-repeat`

### Semi-Transparent Overlay

To ensure text readability, an overlay will be added. Two options:

1. **Linear Gradient Overlay**: `background-image: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(...)`
2. **Pseudo-element**: Use `::before` on the main container with `background-color: rgba(255, 255, 255, 0.7)` and `z-index: -1`.

We will go with the **Linear Gradient Overlay** approach as it's simpler to implement directly on the `div` style in `MainLayout.tsx`.

### Accessibility

- The overlay opacity will be tuned (starting at 0.8) to maintain WCAG contrast standards for text on top of the background.

## Trade-offs

- **Fixed Background**: Might have performance implications on some mobile browsers, but generally acceptable for modern devices.
- **Overlay Opacity**: Needs to be balanced between showing the image and maintaining readability.
