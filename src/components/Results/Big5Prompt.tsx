import React, { useState } from 'react';
import { COLORS } from '../../styles/theme';
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import type { Big5Scores } from '../../utils/types';

interface Big5PromptProps {
  scores: Big5Scores;
}

const Big5Prompt: React.FC<Big5PromptProps> = ({ scores }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const resultsText = `Big-5 Personality Scores:
- Openness: ${scores.Openness}%
- Conscientiousness: ${scores.Conscientiousness}%
- Extraversion: ${scores.Extraversion}%
- Agreeableness: ${scores.Agreeableness}%
- Neuroticism: ${scores.Neuroticism}%`;

  const promptTemplate = `Act as a forensic personality analyst and high-performance coach.

Objective
Create a fascinating, highly actionable dossier about the user, grounded in evidence and sources.

Personality Test Results
${resultsText}

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

- Ask targeted questions that would help the user explore deeper or improve the dossier`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptTemplate);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div
      style={{
        backgroundColor: COLORS.white,
        padding: '1.5rem 2.5rem',
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
        border: `1px solid ${COLORS.teaGreen}`,
        marginBottom: '0.5rem',
        transition: 'all 0.3s ease-in-out',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label="Personality Analysis Prompt"
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          cursor: 'pointer',
          padding: 0,
          color: COLORS.charcoalBlue,
        }}
      >
        <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Personality Analysis Prompt</h2>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isExpanded && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginTop: '1.5rem',
          animation: 'fadeIn 0.3s ease-in-out'
        }}>
          <p style={{ color: COLORS.charcoalBlue, fontSize: '0.95rem', margin: 0 }}>
            Copy this prompt and paste it into an LLM (like ChatGPT or Claude) for a deep, personalized analysis of your results.
          </p>

          <div style={{
            position: 'relative',
            backgroundColor: '#f8f9fa',
            padding: '1rem',
            borderRadius: '8px',
            border: `1px solid ${COLORS.teaGreen}`,
            maxHeight: '300px',
            overflowY: 'auto',
            whiteSpace: 'pre-wrap',
            fontFamily: 'monospace',
            fontSize: '0.85rem',
            color: COLORS.charcoalBlue,
          }}>
            {promptTemplate}
          </div>

          <button
            onClick={handleCopy}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: copied ? COLORS.teaGreen : COLORS.midnightViolet,
              color: COLORS.white,
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              alignSelf: 'center',
            }}
          >
            {copied ? (
              <>
                <Check size={18} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={18} />
                Copy to Clipboard
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Big5Prompt;
