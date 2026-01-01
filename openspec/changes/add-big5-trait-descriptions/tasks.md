# Tasks: Add Big-5 Trait Descriptions Card

## Implementation Checklist

- [ ] **1. Create TraitDescriptions component**

  - [ ] 1.1. Create `src/components/Results/TraitDescriptions.tsx`
  - [ ] 1.2. Define trait descriptions for: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism
  - [ ] 1.3. Style as a card matching existing results card design (white background, rounded corners, box shadow, tea green border)
  - [ ] 1.4. Display each trait with name as heading and description below

- [ ] **2. Integrate TraitDescriptions into ResultsPage**

  - [ ] 2.1. Import `TraitDescriptions` component in `ResultsPage.tsx`
  - [ ] 2.2. Render component conditionally only for Big-5 results (`results.type === 'big5'`)
  - [ ] 2.3. Position between the score chart card and the action buttons

- [ ] **3. Add unit test for TraitDescriptions component**

  - [ ] 3.1. Create `src/components/Results/TraitDescriptions.test.tsx`
  - [ ] 3.2. Test that all five trait names are rendered
  - [ ] 3.3. Test that descriptions are displayed

- [ ] **4. Validate with pre-certify**
  - [ ] 4.1. Run `scripts/pre-certify.ps1` to ensure linting and tests pass
