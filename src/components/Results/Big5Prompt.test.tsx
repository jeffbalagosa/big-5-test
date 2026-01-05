import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Big5Prompt from './Big5Prompt';

describe('Big5Prompt', () => {
  const mockScores = {
    Openness: 85,
    Conscientiousness: 70,
    Extraversion: 60,
    Agreeableness: 90,
    Neuroticism: 30,
  };

  it('renders heading "Big-5 Analysis AI Prompt"', () => {
    render(<Big5Prompt scores={mockScores} />);
    expect(screen.getByText('Big-5 Analysis AI Prompt')).toBeDefined();
  });

  it('is collapsed by default and does not show prompt text', () => {
    render(<Big5Prompt scores={mockScores} />);
    expect(screen.queryByText(/Act as an expert Big-5 personality psychologist/)).toBeNull();
  });

  it('shows prompt text when expanded', () => {
    render(<Big5Prompt scores={mockScores} />);
    const toggleButton = screen.getByRole('button', { name: /Big-5 Analysis AI Prompt/i });
    fireEvent.click(toggleButton);
    expect(screen.getByText(/Act as an expert Big-5 personality psychologist/)).toBeDefined();
  });

  it('contains actual score values in the prompt text', () => {
    render(<Big5Prompt scores={mockScores} />);
    const toggleButton = screen.getByRole('button', { name: /Big-5 Analysis AI Prompt/i });
    fireEvent.click(toggleButton);

    const promptText = screen.getByText(/Act as an expert Big-5 personality psychologist/).textContent;
    expect(promptText).toContain('Openness: 85%');
    expect(promptText).toContain('Conscientiousness: 70%');
    expect(promptText).toContain('Extraversion: 60%');
    expect(promptText).toContain('Agreeableness: 90%');
    expect(promptText).toContain('Neuroticism: 30%');
  });

  it('shows copy button when expanded', () => {
    render(<Big5Prompt scores={mockScores} />);
    const toggleButton = screen.getByRole('button', { name: /Big-5 Analysis AI Prompt/i });
    fireEvent.click(toggleButton);
    expect(screen.getByText('Copy to Clipboard')).toBeDefined();
  });

  it('copies prompt text to clipboard and shows feedback', async () => {
    // Mock clipboard API
    const mockClipboard = {
      writeText: vi.fn().mockResolvedValue(undefined),
    };
    Object.assign(navigator, { clipboard: mockClipboard });

    render(<Big5Prompt scores={mockScores} />);
    const toggleButton = screen.getByRole('button', { name: /Big-5 Analysis AI Prompt/i });
    fireEvent.click(toggleButton);

    const copyButton = screen.getByText('Copy to Clipboard');
    fireEvent.click(copyButton);

    expect(mockClipboard.writeText).toHaveBeenCalled();
    const copiedText = mockClipboard.writeText.mock.calls[0][0];
    expect(copiedText).toContain('Openness: 85%');

    expect(await screen.findByText('Copied!')).toBeDefined();
  });
});
