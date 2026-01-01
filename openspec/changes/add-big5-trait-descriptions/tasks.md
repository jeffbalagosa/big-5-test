# Tasks: Add Big-5 Trait Descriptions Card

## Implementation Checklist

- [ ] **1. Create TraitDescriptions component**

  - Create `src/components/Results/TraitDescriptions.tsx`
  - Define trait descriptions for: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism
  - Style as a card matching existing results card design (white background, rounded corners, box shadow, tea green border)
  - Display each trait with name as heading and description below

- [ ] **2. Integrate TraitDescriptions into ResultsPage**

  - Import `TraitDescriptions` component in `ResultsPage.tsx`
  - Render component conditionally only for Big-5 results (`results.type === 'big5'`)
  - Position between the score chart card and the action buttons

- [ ] **3. Add unit test for TraitDescriptions component**

  - Create `src/components/Results/TraitDescriptions.test.tsx`
  - Test that all five trait names are rendered
  - Test that descriptions are displayed

- [ ] **4. Validate with pre-certify**
  - Run `scripts/pre-certify.ps1` to ensure linting and tests pass
