import React from 'react';
import { COLORS } from '../../styles/theme';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { type LikertOption, FIVE_POINT_SCALE } from './LikertScale.types';

interface LikertScaleProps {
  value: number | null;
  onChange: (value: number) => void;
  options?: LikertOption[];
}

const LikertScale: React.FC<LikertScaleProps> = ({ value, onChange, options = FIVE_POINT_SCALE }) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: isDesktop ? 'row' : 'column',
          flexWrap: isDesktop ? 'nowrap' : 'wrap',
          gap: '0.75rem',
          width: '100%',
        }}
      >
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            style={{
              flex: 1,
              padding: isDesktop ? '1rem 0.5rem' : '0.75rem 1rem',
              borderRadius: '12px',
              border: `2px solid ${value === option.value ? COLORS.goldenPollen : COLORS.teaGreen}`,
              backgroundColor: value === option.value ? COLORS.goldenPollen : COLORS.white,
              color: COLORS.charcoalBlue,
              fontWeight: value === option.value ? 'bold' : 'normal',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: isDesktop ? 'column' : 'row',
              alignItems: 'center',
              gap: '0.5rem',
              minHeight: isDesktop ? '80px' : '48px',
              justifyContent: isDesktop ? 'center' : 'flex-start',
            }}
          >
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold', minWidth: isDesktop ? 'auto' : '2rem' }}>{option.value}</span>
            <span style={{ fontSize: '0.75rem', textAlign: isDesktop ? 'center' : 'left' }}>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LikertScale;
