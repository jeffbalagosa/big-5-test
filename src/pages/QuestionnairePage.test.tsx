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

  it('renders multiple questions in a set', () => {
    renderPage();
    expect(screen.getByText(/Question 1 of/i)).toBeDefined();
    expect(screen.getByText(/Question 2 of/i)).toBeDefined();
    expect(screen.getByText(/Question 3 of/i)).toBeDefined();
  });

  it('advances to the next set when all questions in set are answered', () => {
    renderPage();

    // Answer first 3 questions
    // Each QuestionCard has its own LikertScale with options 1-5
    const agreeButtons = screen.getAllByText('4');
    fireEvent.click(agreeButtons[0]); // Question 1
    fireEvent.click(agreeButtons[1]); // Question 2
    fireEvent.click(agreeButtons[2]); // Question 3

    expect(screen.getByText(/Question 4 of/i)).toBeDefined();
    expect(screen.getByText(/Set 2 of/i)).toBeDefined();
  });

  it('enables undo button after the first answer', () => {
    renderPage();
    const undoButton = screen.getByText(/Undo/i);
    expect(undoButton).toBeDisabled();

    const agreeButtons = screen.getAllByText('4');
    fireEvent.click(agreeButtons[0]);

    expect(undoButton).not.toBeDisabled();
  });
});
