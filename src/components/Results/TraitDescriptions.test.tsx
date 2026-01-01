import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TraitDescriptions from './TraitDescriptions';

describe('TraitDescriptions', () => {
  it('is collapsed by default and does not show trait names', () => {
    render(<TraitDescriptions />);

    expect(screen.queryByText('Openness')).toBeNull();
    expect(screen.getByText('Trait Descriptions')).toBeDefined();
  });

  it('renders all five trait names when expanded', () => {
    render(<TraitDescriptions />);

    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);

    expect(screen.getByText('Openness')).toBeDefined();
    expect(screen.getByText('Conscientiousness')).toBeDefined();
    expect(screen.getByText('Extraversion')).toBeDefined();
    expect(screen.getByText('Agreeableness')).toBeDefined();
    expect(screen.getByText('Neuroticism')).toBeDefined();
  });

  it('renders trait descriptions when expanded', () => {
    render(<TraitDescriptions />);

    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);

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
