# Design: Add Myers-Briggs Type Indicator (MBTI) Personality Test

## Context

The application currently supports only the Big Five (OCEAN) personality assessment. Users have requested the ability to take the Myers-Briggs Type Indicator (MBTI) test as an alternative. This requires extending the architecture to support multiple test types while maintaining backward compatibility.

### Stakeholders

- End users wanting MBTI assessment
- Existing users expecting Big Five behavior unchanged

### Constraints

- Python 3.6+ compatibility must be maintained
- No external API dependencies
- Must work with existing CLI, PDF, and plotting infrastructure

## Goals / Non-Goals

### Goals

- Support MBTI test selection via `--test mbti` CLI parameter
- Implement standard MBTI four-dichotomy scoring
- Display 4-letter type code (e.g., INTJ, ENFP) with preference strengths
- Generate MBTI-specific PDF reports with appropriate visualizations
- Keep Big Five as default behavior (backward compatible)

### Non-Goals

- Cognitive functions stack analysis (advanced MBTI interpretation)
- Type compatibility/relationship features
- Historical result tracking or comparison
- Integration with external MBTI databases or APIs

## Decisions

### Decision 1: Test Selection via CLI Parameter

Use `--test <type>` argument with choices `big5` (default) and `mbti`.

**Rationale**: Clean, explicit selection mechanism that doesn't break existing usage. Users running without `--test` get Big Five behavior (backward compatible).

**Alternatives Considered**:

- Interactive menu at startup: Adds friction for users who know what they want
- Separate entry points (`mbti.py`): Code duplication, harder to maintain

### Decision 2: Unified Item Model with Test Type Field

Extend the `Item` dataclass to include a `dimension` field (generic term) instead of trait-specific naming, but keep `trait` for backward compatibility.

**Rationale**: Allows reuse of existing infrastructure while supporting both OCEAN traits and MBTI dichotomies.

**Alternatives Considered**:

- Separate model classes per test: Would require duplicating CLI/PDF logic
- Generic "category" field: Less semantically clear

### Decision 3: MBTI Scoring as Preference Percentages

Score each dichotomy as a percentage preference (e.g., 65% Introversion vs 35% Extraversion) rather than raw points.

**Rationale**: MBTI is about preference strength, not absolute scores. Percentage representation is standard in MBTI reporting.

**Implementation**:

```
For each dichotomy (E/I, S/N, T/F, J/P):
  - Sum scores for each pole
  - Calculate percentage: pole_score / total_dichotomy_score * 100
  - Assign letter based on dominant pole
```

### Decision 4: Separate Questionnaire Files per Test

Store MBTI questions in `config/mbti.yaml` with same structure as `questionnaire.yaml`.

**Rationale**: Clean separation, easy to maintain and extend. Loader selects file based on test type.

### Decision 5: Visualization Approach

MBTI bar graph shows four horizontal bars, one per dichotomy, with preference percentage displayed. Each bar shows both poles (e.g., E←→I).

**Rationale**: Standard MBTI visualization pattern. Clearly shows preference direction and strength.

## Risks / Trade-offs

| Risk                       | Mitigation                                                   |
| -------------------------- | ------------------------------------------------------------ |
| MBTI questionnaire quality | Use established question patterns from public-domain sources |
| Code complexity increase   | Clear separation between test-specific and shared logic      |
| Maintenance burden         | Shared infrastructure minimizes duplication                  |
| Breaking existing behavior | Big Five remains default; comprehensive regression tests     |

## Migration Plan

1. No migration needed—this is additive functionality
2. Existing users continue using app unchanged
3. New `--test` parameter is optional with `big5` default

## Open Questions

1. **Question count**: How many questions per dichotomy? (Suggested: 10 per dichotomy = 40 total, similar to Big Five's ~50)
2. **PDF layout**: Should MBTI PDF include type description text, or just the type code and percentages?
