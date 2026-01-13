# Change: Rebrand with Discover You Logo

## Why

The application currently uses generic placeholder icons (Vite logo in the browser tab and a clipboard icon on the home page). The new brand identity features a distinctive puzzle-piece head logo that better represents the personality discovery theme of the application through visual metaphor—puzzle pieces representing the different components of personality. This branding will create a consistent, professional visual identity and make the application more recognizable and memorable.

## What Changes

- Move `src/assets/discover_you_logo.ico` to `public/discover_you_logo.ico`
- Update `index.html` favicon reference from `/vite.svg` to `/discover_you_logo.ico`
- Update `src/pages/HomePage.tsx` to display the logo PNG image instead of the `ClipboardList` icon
- Remove unused icon import from `lucide-react` in `HomePage.tsx`
- Remove `public/vite.svg` (no longer needed)
- Optionally add logo to About page for consistency

## Impact

- **Affected specs**: `react-frontend` (adding Brand Logo Display requirement, modifying About Page requirement)
- **Affected code**:
  - `index.html` → Update favicon link
  - `src/pages/HomePage.tsx` → Replace icon with image asset
  - `public/discover_you_logo.ico` → Add (moved from src/assets)
  - `public/vite.svg` → Remove
  - `src/assets/react.svg` → Remove if unused
