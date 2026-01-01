import React from 'react';
import { COLORS } from '../../styles/theme';
import type { Big5Scores } from '../../utils/types';

interface ScoreChartProps {
  scores: Big5Scores;
}

const ScoreChart: React.FC<ScoreChartProps> = ({ scores }) => {
  const traits = [
    { name: 'Openness', value: scores.Openness, color: '#412234' }, // Midnight Violet
    { name: 'Conscientiousness', value: scores.Conscientiousness, color: '#2e4052' }, // Charcoal Blue
    { name: 'Extraversion', value: scores.Extraversion, color: '#ffc857' }, // Golden Pollen
    { name: 'Agreeableness', value: scores.Agreeableness, color: '#bdd9bf' }, // Tea Green
    { name: 'Neuroticism', value: scores.Neuroticism, color: '#e76f51' }, // Accent color
  ];

  return (
    <div style={{ width: '100%', marginTop: '1rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {traits.map((trait) => (
          <div key={trait.name}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.25rem',
                fontSize: '0.875rem',
                fontWeight: 'bold',
                color: COLORS.charcoalBlue,
              }}
            >
              <span>{trait.name}</span>
              <span>{trait.value}%</span>
            </div>
            <div
              style={{
                height: '20px',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${trait.value}%`,
                  backgroundColor: trait.color,
                  borderRadius: '10px',
                  transition: 'width 1s ease-out',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreChart;
