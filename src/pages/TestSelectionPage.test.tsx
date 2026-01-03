import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { QuestionnaireProvider } from '../hooks/useQuestionnaire';
import TestSelectionPage from './TestSelectionPage';
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

describe('TestSelectionPage Component', () => {
  const renderPage = () => {
    return render(
      <QuestionnaireProvider>
        <BrowserRouter>
          <TestSelectionPage />
        </BrowserRouter>
      </QuestionnaireProvider>
    );
  };

  it('updates question count and duration estimate when toggling test type and child mode', () => {
    renderPage();

    // Default: Big Five, Standard
    expect(screen.getByText(/consists of 50 questions/i)).toBeInTheDocument();
    expect(screen.getByText(/takes about 7-13 minutes/i)).toBeInTheDocument();

    const childModeCheckbox = screen.getByRole('checkbox');
    const testTypeSelect = screen.getByRole('combobox');

    // Enable child mode (Big5 child is also 50 questions)
    fireEvent.click(childModeCheckbox);
    expect(screen.getByText(/consists of 50 questions/i)).toBeInTheDocument();
    expect(screen.getByText(/takes about 7-13 minutes/i)).toBeInTheDocument();

    // Switch to MBTI (child mode on => 40 questions)
    fireEvent.change(testTypeSelect, { target: { value: 'mbti' } });
    expect(screen.getByText(/consists of 40 questions/i)).toBeInTheDocument();
    expect(screen.getByText(/takes about 5-10 minutes/i)).toBeInTheDocument();

    // Disable child mode (MBTI standard => 60 questions)
    fireEvent.click(childModeCheckbox);
    expect(screen.getByText(/consists of 60 questions/i)).toBeInTheDocument();
    expect(screen.getByText(/takes about 8-15 minutes/i)).toBeInTheDocument();
  });
});
