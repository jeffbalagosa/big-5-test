# Proposal: Add Big-5 Trait Descriptions Card

## Summary

Add a card component to the Big-5 ResultsPage that displays descriptive explanations for each of the five OCEAN personality traits, positioned above the action buttons (Download PDF, Retake Test, Home).

## Motivation

Currently, the Big-5 results page shows trait scores as percentages with a bar chart, but does not explain what each trait means. Users seeing their results would benefit from understanding what Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism represent, helping them interpret their scores more meaningfully.

## Scope

### In Scope

- New `TraitDescriptions` component displaying descriptions for all five OCEAN traits
- Integration into `ResultsPage.tsx` for Big-5 results only (not MBTI)
- Card styling consistent with existing results card design
- Static trait descriptions based on established Big Five psychology literature

### Out of Scope

- Dynamic/personalized descriptions based on score levels (e.g., "You scored high in...")
- MBTI trait descriptions (separate change if needed)
- PDF export of trait descriptions
- Child-friendly language variants for descriptions

## Impact

- **Files Modified**: `src/pages/ResultsPage.tsx`
- **Files Created**: `src/components/Results/TraitDescriptions.tsx`
- **Tests**: Add unit test for new component
- **Breaking Changes**: None

## Risks

- **Low Risk**: Purely additive UI change with no impact on scoring or existing functionality

## Acceptance Criteria

1. When viewing Big-5 results, a card appears above the action buttons showing descriptions for all five traits
2. Each trait name is displayed as a heading with its description below
3. The card uses consistent styling with the existing results card (white background, rounded corners, shadow)
4. The descriptions are concise (1-2 sentences per trait) and educational
5. The card does not appear for MBTI results
