# Proposal: Update Big-5 Prompt to Match MBTI Style

## Summary

Rewrite the Big-5 Personality Analysis Prompt to match the simpler, more focused style of the MBTI prompt. The current Big-5 prompt is overly complex, uses an unrealistic "forensic analyst" persona, and requests capabilities (internet browsing, external sources) that most LLMs cannot fulfill in typical use.

## Motivation

The MBTI prompt provides a better user experience because:

- **Simpler persona**: "Expert practitioner" vs "forensic analyst" feels more approachable.
- **Focused scope**: Analyzes the test results directly without requesting external research.
- **Realistic expectations**: Doesn't ask for internet browsing or source citations.
- **Cleaner structure**: Output format is streamlined and practical.
- **Consistent tone**: "Expert Consultant" is professional yet accessible.

## Scope

### In Scope

- Update `promptTemplate` in `Big5Prompt.tsx` with new content.
- Update component title and description for consistency with MBTI.
- Align tone, persona, and output format with the MBTI prompt.

### Out of Scope

- Changing the Big-5 scoring logic.
- Modifying the PDF export functionality.
- Backend/CLI changes.

## Impact

- **Components affected**: `Big5Prompt.tsx`
- **User Experience**: More consistent experience between MBTI and Big-5 results.
- **LLM Compatibility**: Works reliably across all major LLMs (no browsing needed).

## Risks

- **Loss of detail**: The new prompt is shorter, but the MBTI style has proven to be more effective for most users.

## Alternatives Considered

1. **Keep current prompt but fix browsing**: Rejected because the "forensic analyst" persona is still less desirable than the "expert consultant" tone.
