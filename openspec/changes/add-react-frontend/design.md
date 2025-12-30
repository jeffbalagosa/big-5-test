# Design: React Frontend Architecture

## Overview

A React single-page application providing a web interface for the personality questionnaire tool, matching all CLI capabilities.

## Technical Decisions

### 1. Component Architecture

```
src/
├── components/
│   ├── Layout/
│   │   ├── NavigationDrawer.tsx    # Left sidebar navigation
│   │   └── MainLayout.tsx          # App shell with drawer
│   ├── Questionnaire/
│   │   ├── QuestionCard.tsx        # Individual question display
│   │   ├── LikertScale.tsx         # 1-5 response buttons
│   │   └── ProgressBar.tsx         # Question progress indicator
│   └── Results/
│       ├── ScoreChart.tsx          # Bar chart visualization
│       └── ResultsSummary.tsx      # Score breakdown display
├── pages/
│   ├── HomePage.tsx                # Welcome/landing page
│   ├── TestSelectionPage.tsx       # Choose test type and options
│   ├── QuestionnairePage.tsx       # Take the questionnaire
│   └── ResultsPage.tsx             # View results
├── hooks/
│   └── useQuestionnaire.ts         # State management for test session
├── data/
│   ├── questionnaire.json          # Converted from YAML
│   ├── questionnaire-child.json    # Child-friendly version
│   └── mbti.json                   # MBTI questions
└── styles/
    └── theme.ts                    # Color scheme constants
```

### 2. Color Scheme Implementation

Using CSS custom properties for consistent theming:

- `--tea-green: #bdd9bf` - Accents, success states, progress
- `--charcoal-blue: #2e4052` - Navigation drawer background, primary text
- `--golden-pollen: #ffc857` - Call-to-action buttons, highlights
- `--white: #ffffff` - Main content background
- `--midnight-violet: #412234` - Secondary accents, footer

### 3. Navigation Drawer

- Fixed left sidebar (collapsible on mobile)
- Navigation items:
  - Home
  - Take Test (with sub-menu for Big-5 / MBTI)
  - Results History (future enhancement)
  - About

### 4. Questionnaire Flow

1. **Test Selection Page**: Choose test type, child mode, enter author name
2. **Questionnaire Page**:
   - One question at a time with Likert scale buttons
   - Progress bar showing completion
   - Undo button (matches CLI 'z' command)
   - Question counter
3. **Results Page**:
   - Score visualization (bar chart)
   - Trait descriptions
   - PDF download button

### 5. Data Flow Options

#### Option A: Pure Frontend (Recommended for MVP)

- Convert YAML configs to JSON at build time
- Implement scoring logic in TypeScript (port from Python)
- Use client-side PDF generation (e.g., jsPDF)
- **Pros**: No backend needed, simpler deployment
- **Cons**: Duplicated scoring logic

#### Option B: API Integration (Future)

- Create Flask/FastAPI endpoints for scoring and PDF
- Frontend makes API calls
- **Pros**: Single source of truth for scoring
- **Cons**: More complex deployment, CORS handling

**Decision**: Start with Option A for MVP, add API layer later if needed.

### 6. State Management

- React Context for questionnaire session state
- Local state for UI components
- No external state library needed for MVP scope

### 7. Responsive Design

- Mobile-first approach
- Navigation drawer collapses to hamburger menu on small screens
- Touch-friendly Likert scale buttons (min 44px tap target)

## Trade-offs

| Decision              | Pros                               | Cons                            |
| --------------------- | ---------------------------------- | ------------------------------- |
| Client-side scoring   | Simple deployment, offline capable | Duplicated logic from Python    |
| Single-page flow      | Smooth UX, no page reloads         | More complex state management   |
| CSS custom properties | Easy theming, native               | IE11 not supported (acceptable) |
| No UI library         | Smaller bundle, full control       | More CSS to write               |

## Open Questions

1. Should results be saved to localStorage for history?
2. Should we add keyboard navigation for accessibility?
3. Include trait descriptions/interpretations in results?
