import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LikertScale from './LikertScale';
import { SIX_POINT_SCALE } from './LikertScale.types';
import React from 'react';

describe('LikertScale Component', () => {
  it('renders 5 options by default', () => {
    const onChange = vi.fn();
    render(<LikertScale value={null} onChange={onChange} />);

    expect(screen.getByText('Strongly Disagree')).toBeDefined();
    expect(screen.getByText('Neutral')).toBeDefined();
    expect(screen.getByText('Strongly Agree')).toBeDefined();
    expect(screen.queryByText('Slightly Agree')).toBeNull();

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5);
  });

  it('renders 6 options when SIX_POINT_SCALE is provided', () => {
    const onChange = vi.fn();
    render(<LikertScale value={null} onChange={onChange} options={SIX_POINT_SCALE} />);

    expect(screen.getByText('Strongly Disagree')).toBeDefined();
    expect(screen.queryByText('Neutral')).toBeNull();
    expect(screen.getByText('Slightly Disagree')).toBeDefined();
    expect(screen.getByText('Slightly Agree')).toBeDefined();
    expect(screen.getByText('Strongly Agree')).toBeDefined();

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(6);
  });

  it('calls onChange with the correct value when a button is clicked', () => {
    const onChange = vi.fn();
    render(<LikertScale value={null} onChange={onChange} options={SIX_POINT_SCALE} />);

    const slightlyAgreeButton = screen.getByText('4');
    fireEvent.click(slightlyAgreeButton);

    expect(onChange).toHaveBeenCalledWith(4);
  });
});
