import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MBTIPrompt from './MBTIPrompt';

describe('MBTIPrompt', () => {
  const mockScores = {
    E: 60,
    I: 40,
    S: 30,
    N: 70,
    T: 80,
    F: 20,
    J: 90,
    P: 10,
    type: 'ENTJ',
  };

  it('renders heading "MBTI Analysis AI Prompt"', () => {
    render(<MBTIPrompt scores={mockScores} />);
    expect(screen.getByText('MBTI Analysis AI Prompt')).toBeDefined();
  });

  it('is collapsed by default and does not show prompt text', () => {
    render(<MBTIPrompt scores={mockScores} />);
    expect(screen.queryByText(/Act as an expert MBTI practitioner/)).toBeNull();
  });

  it('shows prompt text when expanded', () => {
    render(<MBTIPrompt scores={mockScores} />);
    const toggleButton = screen.getByRole('button', { name: /MBTI Analysis AI Prompt/i });
    fireEvent.click(toggleButton);
    expect(screen.getByText(/Act as an expert MBTI practitioner/)).toBeDefined();
  });

  it('contains actual type code and percentages in the prompt text', () => {
    render(<MBTIPrompt scores={mockScores} />);
    const toggleButton = screen.getByRole('button', { name: /MBTI Analysis AI Prompt/i });
    fireEvent.click(toggleButton);

    const promptText = screen.getByText(/Act as an expert MBTI practitioner/).textContent;
    expect(promptText).toContain('MBTI Personality Type: ENTJ');
    expect(promptText).toContain('Extraversion (E): 60%');
    expect(promptText).toContain('Introversion (I): 40%');
    expect(promptText).toContain('Sensing (S): 30%');
    expect(promptText).toContain('Intuition (N): 70%');
    expect(promptText).toContain('Thinking (T): 80%');
    expect(promptText).toContain('Feeling (F): 20%');
    expect(promptText).toContain('Judging (J): 90%');
    expect(promptText).toContain('Perceiving (P): 10%');
  });

  it('shows copy button when expanded', () => {
    render(<MBTIPrompt scores={mockScores} />);
    const toggleButton = screen.getByRole('button', { name: /MBTI Analysis AI Prompt/i });
    fireEvent.click(toggleButton);
    expect(screen.getByText('Copy to Clipboard')).toBeDefined();
  });

  it('copies prompt text to clipboard and shows feedback', async () => {
    // Mock clipboard API
    const mockClipboard = {
      writeText: vi.fn().mockResolvedValue(undefined),
    };
    Object.assign(navigator, { clipboard: mockClipboard });

    render(<MBTIPrompt scores={mockScores} />);
    const toggleButton = screen.getByRole('button', { name: /MBTI Analysis AI Prompt/i });
    fireEvent.click(toggleButton);

    const copyButton = screen.getByText('Copy to Clipboard');
    fireEvent.click(copyButton);

    expect(mockClipboard.writeText).toHaveBeenCalled();
    const copiedText = mockClipboard.writeText.mock.calls[0][0];
    expect(copiedText).toContain('MBTI Personality Type: ENTJ');

    expect(await screen.findByText('Copied!')).toBeDefined();
  });
});
