import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AboutPage from './AboutPage';

// Mock useMediaQuery
vi.mock('../hooks/useMediaQuery', () => ({
  useMediaQuery: vi.fn(),
}));

import { useMediaQuery } from '../hooks/useMediaQuery';

describe('AboutPage', () => {
  it('renders without crashing', () => {
    (useMediaQuery as any).mockReturnValue(false); // Mobile
    render(<AboutPage />);
    expect(screen.getByText(/About the Project/i)).toBeDefined();
  });

  it('uses compact spacing on desktop to avoid unnecessary scrollbars', () => {
    (useMediaQuery as any).mockReturnValue(true); // Desktop
    render(<AboutPage />);

    const container = screen.getByText(/About the Project/i).closest('div')?.parentElement;
    // The main container should have reduced padding on desktop
    expect(container?.style.padding).toMatch(/1rem 0(px)?/);
  });
});
