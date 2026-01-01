import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TraitDescriptions from './TraitDescriptions';

describe('TraitDescriptions', () => {
  it('renders all five trait names', () => {
    render(<TraitDescriptions />);

    expect(screen.getByText('Openness')).toBeDefined();
    expect(screen.getByText('Conscientiousness')).toBeDefined();
    expect(screen.getByText('Extraversion')).toBeDefined();
    expect(screen.getByText('Agreeableness')).toBeDefined();
    expect(screen.getByText('Neuroticism')).toBeDefined();
  });

  it('renders trait descriptions', () => {
    render(<TraitDescriptions />);

    expect(screen.getByText(/Reflects imagination, curiosity/)).toBeDefined();
    expect(screen.getByText(/Measures organization, dependability/)).toBeDefined();
    expect(screen.getByText(/Characterized by energy, positive emotions/)).toBeDefined();
    expect(screen.getByText(/Reflects a tendency to be compassionate/)).toBeDefined();
    expect(screen.getByText(/Describes the tendency to experience negative emotions/)).toBeDefined();
  });

  it('renders the main heading', () => {
    render(<TraitDescriptions />);
    expect(screen.getByText('Trait Descriptions')).toBeDefined();
  });
});
