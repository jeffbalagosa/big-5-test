import React from 'react';
import { COLORS } from '../../styles/theme';
import type { MBTIScores } from '../../utils/types';

interface MBTIDivergingChartProps {
  scores: MBTIScores;
}

const MBTIDivergingChart: React.FC<MBTIDivergingChartProps> = ({ scores }) => {
  const dichotomies = [
    { left: 'E', right: 'I', leftVal: scores.E, rightVal: scores.I, label: 'Extraversion vs Introversion' },
    { left: 'S', right: 'N', leftVal: scores.S, rightVal: scores.N, label: 'Sensing vs Intuition' },
    { left: 'T', right: 'F', leftVal: scores.T, rightVal: scores.F, label: 'Thinking vs Feeling' },
    { left: 'J', right: 'P', leftVal: scores.J, rightVal: scores.P, label: 'Judging vs Perceiving' },
  ];

  return (
    <div style={{ width: '100%', marginTop: '2rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {dichotomies.map((d) => (
          <div key={d.label}>
            <div
              style={{
                textAlign: 'center',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                color: COLORS.charcoalBlue,
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {d.label}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '30px', fontWeight: 'bold', textAlign: 'right', color: d.leftVal >= 50 ? COLORS.midnightViolet : COLORS.charcoalBlue }}>
                {d.left}
              </div>
              <div
                style={{
                  flex: 1,
                  height: '24px',
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  display: 'flex',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${d.leftVal}%`,
                    backgroundColor: COLORS.midnightViolet,
                    transition: 'width 1s ease-out',
                  }}
                />
                <div
                  style={{
                    height: '100%',
                    width: `${d.rightVal}%`,
                    backgroundColor: COLORS.teaGreen,
                    transition: 'width 1s ease-out',
                  }}
                />
              </div>
              <div style={{ width: '30px', fontWeight: 'bold', color: d.rightVal > 50 ? COLORS.teaGreen : COLORS.charcoalBlue }}>
                {d.right}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem', fontSize: '0.75rem', opacity: 0.7 }}>
              <span>{d.leftVal}%</span>
              <span>{d.rightVal}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MBTIDivergingChart;
