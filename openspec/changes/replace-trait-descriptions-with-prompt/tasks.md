# Tasks: Replace Trait Descriptions with Copyable LLM Prompt

## 1. Write Tests for Big5Prompt Component (TDD)

- [x] Create `src/components/Results/Big5Prompt.test.tsx`
- [x] Test: Component renders heading "Personality Analysis Prompt"
- [x] Test: Component receives Big5Scores as props
- [x] Test: Prompt text contains actual score values from props
- [x] Test: Copy button is visible
- [x] Test: Copy button copies prompt text to clipboard
- [x] Test: Copy button shows "Copied!" feedback after click
- [x] Test: Component is collapsible (collapsed by default)
- [x] Test: Prompt is visible when expanded

## 2. Implement Big5Prompt Component

- [x] Create `src/components/Results/Big5Prompt.tsx`
- [x] Accept `Big5Scores` as props
- [x] Build prompt text using template literal with injected scores
- [x] Use the prompt template from `openspec/changes/big-5-prompt.md`
- [x] Add expand/collapse toggle (collapsed by default)
- [x] Add "Copy to Clipboard" button with click handler
- [x] Implement clipboard copy using `navigator.clipboard.writeText()`
- [x] Add "Copied!" visual feedback (state-based)
- [x] Apply consistent card styling (white bg, 16px radius, shadow, tea green border)

## 3. Update ResultsPage

- [x] Remove `TraitDescriptions` import from `ResultsPage.tsx`
- [x] Add `Big5Prompt` import
- [x] Pass `results.scores` to `Big5Prompt` component
- [x] Verify conditional rendering only for Big-5 results

## 4. Remove Old Component

- [x] Delete `src/components/Results/TraitDescriptions.tsx`
- [x] Delete `src/components/Results/TraitDescriptions.test.tsx`

## 5. Validation

- [x] Run `npm run test` to verify all tests pass
- [x] Run `npm run lint` to ensure no linting errors
- [x] Manual verification: navigate to Big-5 results, expand prompt, copy, paste into LLM
