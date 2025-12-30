import React from 'react';
import { COLORS } from '../../styles/theme';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.min(Math.round((current / total) * 100), 100);

  return (
    <div style={{ width: '100%', marginBottom: '2rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          marginBottom: '0.5rem',
          color: COLORS.charcoalBlue,
          fontWeight: 'bold',
        }}
      >
        <span>Progress</span>
        <span>{percentage}%</span>
      </div>
      <div
        style={{
          height: '8px',
          backgroundColor: 'rgba(189, 217, 191, 0.3)', // Light tea green
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${percentage}%`,
            backgroundColor: COLORS.teaGreen,
            borderRadius: '4px',
            transition: 'width 0.3s ease-out',
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
