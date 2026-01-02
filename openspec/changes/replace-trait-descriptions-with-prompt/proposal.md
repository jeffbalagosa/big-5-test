# Change: Replace Trait Descriptions with Copyable LLM Prompt

## Why

The static trait descriptions provide limited value compared to a dynamic, personalized analysis. Users can leverage LLMs (ChatGPT, Claude, etc.) to get deeper insights by copying a pre-filled prompt that includes their specific Big-5 results. This transforms the results page from passive information display into an actionable springboard for self-discovery.

## What Changes

- **REMOVED**: The `TraitDescriptions` component (collapsible card with static OCEAN trait definitions)
- **ADDED**: A new `Big5Prompt` component that:
  - Displays a copyable LLM prompt template
  - Injects the user's actual Big-5 scores into the template using template literals
  - Provides a "Copy to Clipboard" button with visual feedback
  - Uses consistent card styling with the results page
  - Is only shown for Big-5 results (same conditional as before)

## Impact

- **Affected specs**: `react-frontend` (modifying the Big-5 Trait Descriptions Display requirement)
- **Affected code**:
  - `src/components/Results/TraitDescriptions.tsx` → Remove
  - `src/components/Results/TraitDescriptions.test.tsx` → Remove
  - `src/components/Results/Big5Prompt.tsx` → Create
  - `src/components/Results/Big5Prompt.test.tsx` → Create
  - `src/pages/ResultsPage.tsx` → Update import and component usage
