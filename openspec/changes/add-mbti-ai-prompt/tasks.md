# Tasks: Add MBTI Personality Analysis AI Prompt

## 1. Implementation

- [x] 1.1 Create `MBTIPrompt` component in `src/components/Results/MBTIPrompt.tsx`
- [x] 1.2 Accept `MBTIScores` as props
- [x] 1.3 Format results text with type code and dichotomy percentages
- [x] 1.4 Create MBTI-specific prompt template with cognitive function analysis
- [x] 1.5 Implement collapsible card UI (collapsed by default)
- [x] 1.6 Add copy-to-clipboard functionality with visual feedback
- [x] 1.7 Update `ResultsPage.tsx` to render `MBTIPrompt` for MBTI results
- [x] 1.8 Import `MBTIPrompt` component
- [x] 1.9 Conditionally render below MBTI results card (similar to Big5Prompt)

## 2. Testing

- [x] 2.1 Create unit tests in `src/components/Results/MBTIPrompt.test.tsx`
- [x] 2.2 Test heading is rendered
- [x] 2.3 Test collapsed by default
- [x] 2.4 Test expands on click
- [x] 2.5 Test prompt contains actual type code and percentages
- [x] 2.6 Test copy button is visible when expanded
- [x] 2.7 Test copy-to-clipboard functionality

## 3. Validation

- [x] 3.1 Run `npm run test` to verify all tests pass
- [x] 3.2 Run `scripts/pre-certify.ps1` for full validation
