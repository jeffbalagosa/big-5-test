import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import ResultsPage from './ResultsPage';
import { useQuestionnaire } from '../hooks/useQuestionnaire';
import type { TestSession } from '../utils/types';

vi.mock('../hooks/useQuestionnaire', () => ({
  useQuestionnaire: vi.fn(),
}));

vi.mock('../utils/pdfExport', () => ({
  exportToPDF: vi.fn(),
}));

describe('ResultsPage Layout', () => {
  const mockSession: TestSession = {
    testType: 'big5',
    answers: {},
    authorName: 'Test User',
    isChildMode: false,
    isCompleted: true,
    currentSetIndex: 0,
    answerOrder: [],
  };

  it('has a content area that does not force buttons to the bottom when content is short', () => {
    vi.mocked(useQuestionnaire).mockReturnValue({
      session: mockSession,
      resetTest: vi.fn(),
      undoLastAnswer: vi.fn(),
      getCurrentQuestion: vi.fn(),
      getQuestionsForCurrentSet: vi.fn(),
      getCurrentSetIndex: vi.fn(),
      getTotalSets: vi.fn(),
      getTotalQuestions: vi.fn(),
      getQuestionCount: vi.fn(),
      answerQuestion: vi.fn(),
      startTest: vi.fn(),
    });

    const { container } = render(
      <BrowserRouter>
        <ResultsPage />
      </BrowserRouter>
    );

    // The buttons should be inside the scrollable container to follow the content closely
    const scrollableContainer = container.querySelector('div[style*="overflow-y: auto"]');
    expect(scrollableContainer).not.toBeNull();

    const downloadButton = screen.queryByText(/Download PDF/i);
    expect(scrollableContainer?.contains(downloadButton)).toBe(true);
  });
});
