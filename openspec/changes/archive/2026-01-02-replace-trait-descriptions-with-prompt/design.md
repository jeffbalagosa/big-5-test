# Design: Big-5 Personality Analysis Prompt

## Prompt Template

The `Big5Prompt` component will use the following prompt template. The placeholder `<<<BIG5_RESULTS_TEXT>>>` will be replaced with actual scores using a template literal.

### Template Source

```markdown
Act as a forensic personality analyst and high-performance coach.

Objective
Create a fascinating, highly actionable dossier about the user, grounded in evidence and sources.

Personality Test Results
<<<BIG5_RESULTS_TEXT>>>

Instructions

1. Parse the Big-5 results carefully (extract trait scores, percentiles, facets if provided, confidence/validity notes, and any anomalies).
2. Gather relevant context from the internet using browsing/tools if available:
   - Prioritize reputable sources (peer-reviewed, university, major publishers).
   - Cite sources for key claims.
   - If browsing is not available, explicitly state that limitation and do NOT invent sources; rely on generally accepted knowledge and clearly label it as such.
3. Supplement your findings with any available platform memory and prior chat context about the user (if accessible). If none is accessible, say so and proceed using only the provided Big-5.
4. Synthesize insights that are:
   - Interesting (non-obvious patterns, tradeoffs, second-order effects)
   - Actionable (clear behaviors, habits, experiments, decision rules)
   - Honest (accuracy over comfort; avoid needless harshness, but do not sugarcoat)
5. Produce a complete SWOT analysis (Strengths, Weaknesses, Opportunities, Threats) grounded in the Big-5 and any verified context.
6. End with follow-up questions for deeper exploration.

Constraints

- Do not fabricate facts, personal history, or sources.
- When you infer, label it explicitly as inference and explain the evidence.
- Accuracy > protecting feelings (while still being respectful).
- Keep verbosity: medium. Thinking effort: high.

Output Style
"Official Intel" tone: crisp, direct, analytical.

Required Output Format

# DOSSIER: [Use Name Provided or "You"]

## Executive Summary (5–10 bullets)

## Big-5 Snapshot

- Trait-by-trait interpretation (what it tends to predict)
- Key tradeoffs and context sensitivity

## Behavioral Predictions (with confidence levels)

- Work/learning
- Relationships/social dynamics
- Stress & recovery
- etc.

## Actionable Playbook

### High-Leverage Moves (next 30 - 90 days)

- 5–10 specific actions with "why this works" + how to measure progress

### Decision Rules (if/then)

### Common Mistakes to Avoid

### Setting Up Your Environment for Success

## SWOT Analysis

### Strengths

### Weaknesses

### Opportunities

### Threats

## Evidence & Sources

- Provide citations/links or clear bibliographic references for core claims

## Follow-up Questions (up to 7)

- Ask targeted questions that would help the user explore deeper or improve the dossier
```

## Score Injection Format

The `<<<BIG5_RESULTS_TEXT>>>` placeholder will be replaced with formatted scores:

```
Big-5 Personality Scores:
- Openness: ${scores.Openness}%
- Conscientiousness: ${scores.Conscientiousness}%
- Extraversion: ${scores.Extraversion}%
- Agreeableness: ${scores.Agreeableness}%
- Neuroticism: ${scores.Neuroticism}%
```

## Implementation Notes

- Use a TypeScript template literal function to build the complete prompt
- The prompt should be displayed in a `<pre>` or monospace-styled container for readability
- Copy functionality uses `navigator.clipboard.writeText()` API
