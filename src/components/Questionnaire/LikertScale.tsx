import React from 'react';
import { COLORS } from '../../styles/theme';

interface LikertScaleProps {
  value: number | null;
  onChange: (value: number) => void;
}

const LikertScale: React.FC<LikertScaleProps> = ({ value, onChange }) => {
  const options = [
    { label: 'Strongly Disagree', value: 1 },
    { label: 'Disagree', value: 2 },
    { label: 'Neutral', value: 3 },
    { label: 'Agree', value: 4 },
    { label: 'Strongly Agree', value: 5 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '0.75rem',
          width: '100%',
        }}
      >
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            style={{
              padding: '1rem 0.5rem',
              borderRadius: '12px',
              border: `2px solid ${value === option.value ? COLORS.goldenPollen : COLORS.teaGreen}`,
              backgroundColor: value === option.value ? COLORS.goldenPollen : COLORS.white,
              color: COLORS.charcoalBlue,
              fontWeight: value === option.value ? 'bold' : 'normal',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
              minHeight: '80px',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{option.value}</span>
            <span style={{ fontSize: '0.75rem', textAlign: 'center' }}>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LikertScale;
