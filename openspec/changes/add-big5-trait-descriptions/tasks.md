# Tasks: Add Big-5 Trait Descriptions Card

## Implementation Checklist

- [x] **1. Create TraitDescriptions component**

  - [x] 1.1. Create `src/components/Results/TraitDescriptions.tsx`
  - [x] 1.2. Define trait descriptions for: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism
  - [x] 1.3. Style as a card matching existing results card design (white background, rounded corners, box shadow, tea green border)
  - [x] 1.4. Display each trait with name as heading and description below

- [x] **2. Integrate TraitDescriptions into ResultsPage**

  - [x] 2.1. Import `TraitDescriptions` component in `ResultsPage.tsx`
  - [x] 2.2. Render component conditionally only for Big-5 results (`results.type === 'big5'`)
  - [x] 2.3. Position between the score chart card and the action buttons

- [x] **3. Add unit test for TraitDescriptions component**

  - [x] 3.1. Create `src/components/Results/TraitDescriptions.test.tsx`
  - [x] 3.2. Test that all five trait names are rendered
  - [x] 3.3. Test that descriptions are displayed

- [x] **4. Validate with pre-certify**
  - [x] 4.1. Run `scripts/pre-certify.ps1` to ensure linting and tests pass
