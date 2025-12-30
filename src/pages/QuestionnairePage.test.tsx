import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuestionnaireProvider } from '../hooks/useQuestionnaire';
import QuestionnairePage from './QuestionnairePage';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

// Mock useNavigate
const mockedUsedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedUsedNavigate,
  };
});

describe('QuestionnairePage Component', () => {
  const renderPage = () => {
    return render(
      <QuestionnaireProvider>
        <BrowserRouter>
          <QuestionnairePage />
        </BrowserRouter>
      </QuestionnaireProvider>
    );
  };

  it('renders the first question', () => {
    renderPage();
    expect(screen.getByText(/Question 1 of/i)).toBeDefined();
    expect(screen.getByText(/Strongly Disagree/i)).toBeDefined();
    expect(screen.getByText(/Strongly Agree/i)).toBeDefined();
  });

  it('advances to the next question when a response is selected', () => {
    renderPage();
    const agreeButton = screen.getByText('4');
    fireEvent.click(agreeButton);

    expect(screen.getByText(/Question 2 of/i)).toBeDefined();
  });

  it('enables undo button after the first question', () => {
    renderPage();
    const undoButton = screen.getByText(/Undo/i);
    expect(undoButton).toBeDisabled();

    const agreeButton = screen.getByText('4');
    fireEvent.click(agreeButton);

    expect(undoButton).not.toBeDisabled();
  });
});
