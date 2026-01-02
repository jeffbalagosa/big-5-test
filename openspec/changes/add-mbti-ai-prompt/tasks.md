# Tasks: Add MBTI Personality Analysis AI Prompt

## 1. Implementation

- [ ] 1.1 Create `MBTIPrompt` component in `src/components/Results/MBTIPrompt.tsx`
- [ ] 1.2 Accept `MBTIScores` as props
- [ ] 1.3 Format results text with type code and dichotomy percentages
- [ ] 1.4 Create MBTI-specific prompt template with cognitive function analysis
- [ ] 1.5 Implement collapsible card UI (collapsed by default)
- [ ] 1.6 Add copy-to-clipboard functionality with visual feedback
- [ ] 1.7 Update `ResultsPage.tsx` to render `MBTIPrompt` for MBTI results
- [ ] 1.8 Import `MBTIPrompt` component
- [ ] 1.9 Conditionally render below MBTI results card (similar to Big5Prompt)

## 2. Testing

- [ ] 2.1 Create unit tests in `src/components/Results/MBTIPrompt.test.tsx`
- [ ] 2.2 Test heading is rendered
- [ ] 2.3 Test collapsed by default
- [ ] 2.4 Test expands on click
- [ ] 2.5 Test prompt contains actual type code and percentages
- [ ] 2.6 Test copy button is visible when expanded
- [ ] 2.7 Test copy-to-clipboard functionality

## 3. Validation

- [ ] 3.1 Run `npm run test` to verify all tests pass
- [ ] 3.2 Run `scripts/pre-certify.ps1` for full validation
