import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import NavigationDrawer from './NavigationDrawer';

describe('NavigationDrawer Icon Sizes', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    isCollapsed: false,
    width: 280,
    onToggle: vi.fn(),
    onResize: vi.fn(),
  };

  it('uses size 20 for icons when expanded', () => {
    const { container } = render(
      <BrowserRouter>
        <NavigationDrawer {...defaultProps} isCollapsed={false} />
      </BrowserRouter>
    );

    const svgs = container.querySelectorAll('svg');
    expect(svgs[0]).toHaveAttribute('width', '20');
  });

  it('uses size 32 for icons when collapsed', () => {
    const { container } = render(
      <BrowserRouter>
        <NavigationDrawer {...defaultProps} isCollapsed={true} />
      </BrowserRouter>
    );

    const svgs = container.querySelectorAll('svg');
    expect(svgs[0]).toHaveAttribute('width', '32');
  });
});
