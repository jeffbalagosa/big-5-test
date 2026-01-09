# Tasks: Rebrand with Discover You Logo

## 1. Update Favicon

- [x] 1.1 Copy `src/assets/discover_you_logo.ico` to `public/discover_you_logo.ico`
- [x] 1.2 Edit `index.html` favicon link: href `/discover_you_logo.ico`, type `image/x-icon`

## 2. Update Home Page Logo

- [x] 2.1 Edit `src/pages/HomePage.tsx` to import logo PNG and replace ClipboardList icon with `<img>` element
- [x] 2.2 Remove unused `ClipboardList` import from `lucide-react`
- [x] 2.3 Add `alt="Discover You Logo"` to image element

## 3. Update About Page Logo

- [x] 3.1 Identify About page component location
- [x] 3.2 Add Discover You logo to About page header with consistent styling

## 4. Remove Unused Assets

- [x] 4.1 Delete `public/vite.svg`
- [x] 4.2 Delete `src/assets/react.svg` (verify not used with grep first)
- [x] 4.3 Delete `src/assets/discover_you_logo.ico` (now in public)
- [x] 4.4 Delete `nul` file if present

## 5. Run Tests

- [x] 5.1 Run `npm run test` to verify unit tests pass
- [x] 5.2 Run `npm run lint` to verify no linting errors
- [x] 5.3 Run `npm run test:e2e` to verify E2E tests pass

## 6. Manual Verification

- [x] 6.1 Verify favicon in browser tabs (Chrome, Firefox, Edge)
- [x] 6.2 Verify home page logo displays correctly (desktop, tablet, mobile)
- [x] 6.3 Verify About page logo displays correctly
- [x] 6.4 Run `npm run build` and check for asset warnings

## 7. Finalize

- [x] 7.1 Run `openspec validate rebrand-with-discover-you-logo --strict`
- [x] 7.2 Review git diff to confirm all intended changes
