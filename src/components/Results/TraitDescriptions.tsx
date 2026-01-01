import React, { useState } from 'react';
import { COLORS } from '../../styles/theme';
import { ChevronDown, ChevronUp } from 'lucide-react';

const traitData = [
  {
    name: 'Openness',
    description: 'Reflects imagination, curiosity, and a preference for variety and new experiences.',
  },
  {
    name: 'Conscientiousness',
    description: 'Measures organization, dependability, and the tendency to act dutifully and aim for achievement.',
  },
  {
    name: 'Extraversion',
    description: 'Characterized by energy, positive emotions, and the tendency to seek stimulation and the company of others.',
  },
  {
    name: 'Agreeableness',
    description: 'Reflects a tendency to be compassionate, cooperative, and helpful towards others.',
  },
  {
    name: 'Neuroticism',
    description: 'Describes the tendency to experience negative emotions, such as anxiety, depression, or emotional instability.',
  },
];

const TraitDescriptions: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

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
        <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Trait Descriptions</h2>
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
          {traitData.map((trait) => (
            <div key={trait.name}>
              <h3 style={{ color: COLORS.midnightViolet, marginBottom: '0.25rem', fontSize: '1.1rem' }}>
                {trait.name}
              </h3>
              <p style={{ color: COLORS.charcoalBlue, lineHeight: '1.5', margin: 0, fontSize: '0.95rem' }}>
                {trait.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TraitDescriptions;
