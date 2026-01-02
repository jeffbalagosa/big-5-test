import React, { useState } from 'react';
import { COLORS } from '../../styles/theme';
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import type { MBTIScores } from '../../utils/types';

interface MBTIPromptProps {
  scores: MBTIScores;
}

const MBTIPrompt: React.FC<MBTIPromptProps> = ({ scores }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const resultsText = `MBTI Personality Type: ${scores.type}
Dichotomy Percentages:
- Extraversion (E): ${scores.E}% vs Introversion (I): ${scores.I}%
- Sensing (S): ${scores.S}% vs Intuition (N): ${scores.N}%
- Thinking (T): ${scores.T}% vs Feeling (F): ${scores.F}%
- Judging (J): ${scores.J}% vs Perceiving (P): ${scores.P}%`;

  const promptTemplate = `Act as an expert MBTI practitioner and cognitive function analyst.

Objective
Provide a deep, insightful analysis of the user's MBTI type, focusing on cognitive functions, type dynamics, and practical growth strategies.

Personality Test Results
${resultsText}

Instructions

1. Analyze the MBTI type (${scores.type}) and the specific dichotomy percentages.
2. Explain the Cognitive Function Stack for this type (Dominant, Auxiliary, Tertiary, Inferior).
3. Discuss how the specific percentages might influence the expression of the type (e.g., a "balanced" T/F or a very strong E).
4. Provide insights into:
   - Communication style and interpersonal dynamics.
   - Decision-making processes and potential biases.
   - Stress triggers and the "Grip" experience (inferior function under stress).
   - Career and productivity alignment.
5. Offer 3-5 actionable growth recommendations tailored to this specific type and its function development.
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

# MBTI ANALYSIS: ${scores.type}

## Executive Summary

## The Cognitive Stack
- Detailed breakdown of the four primary functions and how they interact.

## Type Dynamics & Nuances
- How the specific dichotomy percentages shape this individual's expression of ${scores.type}.

## Behavioral Insights
- Work & Productivity
- Relationships & Communication
- Stress Management

## Actionable Growth Plan
- Specific steps for personal development based on function integration.

## Follow-up Questions
- Targeted questions to help the user explore their type more deeply.`;

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
        aria-label="MBTI Analysis AI Prompt"
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
        <h2 style={{ margin: 0, fontSize: '1.25rem' }}>MBTI Analysis AI Prompt</h2>
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
            Copy this prompt and paste it into an LLM (like ChatGPT or Claude) for a deep, personalized analysis of your {scores.type} results.
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

export default MBTIPrompt;
