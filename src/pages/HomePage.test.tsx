import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';
import { QuestionnaireProvider, STORAGE_KEY } from '../hooks/useQuestionnaire';
import React from 'react';

const renderWithProviders = () => {
  return render(
    <QuestionnaireProvider>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </QuestionnaireProvider>
  );
};

describe('HomePage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should not show resume banner when no progress exists', () => {
    renderWithProviders();
    expect(screen.queryByText(/Continue your last session/i)).not.toBeInTheDocument();
  });

  it('should show resume banner when in-progress data exists in localStorage', () => {
    const mockSession = {
      testType: 'big5',
      isChildMode: false,
      authorName: 'Resume Bot',
      answers: { 1: 5 },
      currentSetIndex: 0,
      answerOrder: [1],
      isCompleted: false,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockSession));

    renderWithProviders();
    expect(screen.getByText(/Continue your last session/i)).toBeInTheDocument();
    expect(screen.getByText(/Resume Bot/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Resume/i })).toHaveAttribute('href', '/questionnaire');
  });
});
