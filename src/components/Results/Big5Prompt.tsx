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

  const promptTemplate = `Act as an expert Big-5 personality psychologist and behavioral analyst.

Objective
Provide a deep, insightful analysis of the user's Big-5 personality profile, focusing on trait interactions, behavioral tendencies, and practical growth strategies.

Personality Test Results
${resultsText}

Instructions

1. Analyze the Big-5 trait scores and their relative strengths.
2. Explain what each trait (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism) indicates at these specific levels.
3. Discuss how the traits interact (e.g., how high Conscientiousness might interact with high Neuroticism in this profile).
4. Provide insights into:
   - Work style and productivity.
   - Interpersonal dynamics and social behavior.
   - Emotional regulation and stress response.
   - Learning and openness to new experiences.
5. Offer 3-5 actionable growth recommendations tailored to this specific profile.
6. Synthesize insights that are:
   - Interesting (non-obvious patterns, tradeoffs, second-order effects)
   - Actionable (clear behaviors, habits, experiments, decision rules)
   - Honest (accuracy over comfort; avoid needless harshness, but do not sugarcoat)

Constraints

- Do not fabricate facts or personal history.
- When you infer, label it explicitly as inference and explain the evidence.
- Accuracy > protecting feelings (while still being respectful).
- Keep verbosity: medium. Thinking effort: high.

Output Style
"Expert Consultant" tone: professional, insightful, and encouraging.

Required Output Format

# BIG-5 PERSONALITY ANALYSIS

## Executive Summary

## Trait Profile Breakdown
- Detailed interpretation of each of the five traits based on the scores.

## Trait Interactions & Nuances
- How the combination of traits shapes this individual's unique personality expression.

## Behavioral Insights
- Work & Productivity
- Relationships & Communication
- Stress Management & Emotional Regulation

## Actionable Growth Plan
- Specific steps for personal development based on the trait profile.

## Follow-up Questions
- Targeted questions to help the user explore their personality more deeply.`;

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
        aria-label="Big-5 Analysis AI Prompt"
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
        <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Big-5 Analysis AI Prompt</h2>
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
            Copy this prompt and paste it into an LLM (like ChatGPT or Claude) for a deep, personalized analysis of your Big-5 results.
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
