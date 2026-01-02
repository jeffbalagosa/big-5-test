# Tasks: Replace Trait Descriptions with Copyable LLM Prompt

## 1. Write Tests for Big5Prompt Component (TDD)

- [ ] Create `src/components/Results/Big5Prompt.test.tsx`
- [ ] Test: Component renders heading "Personality Analysis Prompt"
- [ ] Test: Component receives Big5Scores as props
- [ ] Test: Prompt text contains actual score values from props
- [ ] Test: Copy button is visible
- [ ] Test: Copy button copies prompt text to clipboard
- [ ] Test: Copy button shows "Copied!" feedback after click
- [ ] Test: Component is collapsible (collapsed by default)
- [ ] Test: Prompt is visible when expanded

## 2. Implement Big5Prompt Component

- [ ] Create `src/components/Results/Big5Prompt.tsx`
- [ ] Accept `Big5Scores` as props
- [ ] Build prompt text using template literal with injected scores
- [ ] Use the prompt template from `openspec/changes/big-5-prompt.md`
- [ ] Add expand/collapse toggle (collapsed by default)
- [ ] Add "Copy to Clipboard" button with click handler
- [ ] Implement clipboard copy using `navigator.clipboard.writeText()`
- [ ] Add "Copied!" visual feedback (state-based)
- [ ] Apply consistent card styling (white bg, 16px radius, shadow, tea green border)

## 3. Update ResultsPage

- [ ] Remove `TraitDescriptions` import from `ResultsPage.tsx`
- [ ] Add `Big5Prompt` import
- [ ] Pass `results.scores` to `Big5Prompt` component
- [ ] Verify conditional rendering only for Big-5 results

## 4. Remove Old Component

- [ ] Delete `src/components/Results/TraitDescriptions.tsx`
- [ ] Delete `src/components/Results/TraitDescriptions.test.tsx`

## 5. Validation

- [ ] Run `npm run test` to verify all tests pass
- [ ] Run `npm run lint` to ensure no linting errors
- [ ] Manual verification: navigate to Big-5 results, expand prompt, copy, paste into LLM
