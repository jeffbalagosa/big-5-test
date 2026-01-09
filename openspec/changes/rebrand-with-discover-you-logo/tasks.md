# Tasks: Rebrand with Discover You Logo

## 1. Update Favicon

- [ ] 1.1 Move `src/assets/discover_you_logo.ico` to `public/discover_you_logo.ico`
- [ ] 1.2 Edit `index.html` to update favicon link from `/vite.svg` to `/discover_you_logo.ico`
- [ ] 1.3 Update `type` attribute from `image/svg+xml` to `image/x-icon`

## 2. Update Home Page Logo

- [ ] 2.1 Edit `src/pages/HomePage.tsx`
- [ ] 2.2 Import logo PNG: `import logoImage from '../assets/discover_you_logo.png'`
- [ ] 2.3 Replace `ClipboardList` icon with `<img>` element using imported logo
- [ ] 2.4 Remove unused `ClipboardList` import from `lucide-react`
- [ ] 2.5 Add appropriate `alt` text for accessibility
- [ ] 2.6 Adjust styling if needed for proper display

## 3. Clean Up Old Assets

- [ ] 3.1 Remove `public/vite.svg`
- [ ] 3.2 Check if `src/assets/react.svg` is used elsewhere
- [ ] 3.3 Remove `src/assets/react.svg` if unused

## 4. Optional: Add Logo to About Page

- [ ] 4.1 Identify About page component
- [ ] 4.2 Add Discover You logo to About page header
- [ ] 4.3 Apply consistent styling with home page

## 5. Validation

- [ ] 5.1 Verify favicon displays in browser tab (Chrome, Firefox, Edge)
- [ ] 5.2 Verify home page logo displays correctly
- [ ] 5.3 Test responsive display (mobile, tablet, desktop)
- [ ] 5.4 Run `npm run build` to ensure no asset errors
- [ ] 5.5 Run `npm run test:e2e` to verify E2E tests pass
- [ ] 5.6 Run `openspec validate rebrand-with-discover-you-logo --strict`
