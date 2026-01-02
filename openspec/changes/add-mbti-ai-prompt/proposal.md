# Change: Add MBTI Personality Analysis AI Prompt

## Why

The Big-5 results page already includes a copyable LLM prompt that helps users get personalized analysis from AI assistants. MBTI users currently lack this feature, missing out on deeper insights into their personality type, cognitive functions, and practical advice tailored to their specific type code.

## What Changes

- Add a new `MBTIPrompt` component that displays a collapsible prompt card on the MBTI results page
- The prompt will include the user's 4-letter type code and dichotomy percentages
- The prompt will instruct the LLM to provide MBTI-specific analysis including cognitive functions, type dynamics, and actionable insights

## Impact

- Affected specs: `react-frontend`
- Affected code:
  - `src/components/Results/MBTIPrompt.tsx` (new file)
  - `src/components/Results/MBTIPrompt.test.tsx` (new file)
  - `src/pages/ResultsPage.tsx` (import and render MBTIPrompt)
