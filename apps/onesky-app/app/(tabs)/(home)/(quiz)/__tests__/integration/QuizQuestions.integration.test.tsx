import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Quiz from '@/app/(tabs)/(home)/(quiz)/questions';

const mockReplace = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: mockReplace,
  }),
  useLocalSearchParams: () => ({
    quizTopic: 'Plastic Pollution',
  }),
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
}));

jest.mock('expo-image', () => ({
  Image: () => null,
}));

describe('Quiz Integration Test', () => {
  it('completes the quiz correctly and displays Completion component with correct points', async () => {
    const mockQuestion = {
      question: "What's 2 + 2?",
      answers: ['1', '2', '4', '5'],
      rightAnswerIndex: 2,
    };
    const { getByText, queryByText } = render(<Quiz testQuestion={mockQuestion} />);
    const button = getByText(/Continue/i);

    fireEvent.press(button);
    await waitFor(() => expect(getByText(/Continue/i)).toBeTruthy());
    fireEvent.press(button);
    await waitFor(() => expect(getByText(/Start the quiz/i)).toBeTruthy());
    fireEvent.press(button);

    // Select correct answer
    fireEvent.press(getByText(/4/i));
    fireEvent.press(getByText('Continue'));

    await waitFor(
      () => {
        expect(queryByText(/Nice Work!/i)).toBeTruthy();
      },
      { timeout: 3000 }
    );

    fireEvent.press(getByText(/Collect Points/));

    // Completion Rendering
    await waitFor(
      () => {
        expect(getByText('Yay, Congratulations!')).toBeTruthy();
        expect(getByText('20 pts')).toBeTruthy();
      },
      { timeout: 3000 }
    );
  });

  it('completes the quiz incorrectly and displays Completion component with correct points', async () => {
    const mockQuestion = {
      question: "What's 2 + 2?",
      answers: ['1', '2', '4', '5'],
      rightAnswerIndex: 2,
    };
    const { getByText, queryByText } = render(<Quiz testQuestion={mockQuestion} />);
    const button = getByText(/Continue/i);

    fireEvent.press(button);
    await waitFor(() => expect(getByText(/Continue/i)).toBeTruthy());
    fireEvent.press(button);
    await waitFor(() => expect(getByText(/Start the quiz/i)).toBeTruthy());
    fireEvent.press(button);

    // Select wrong answer
    fireEvent.press(getByText(/1/i));
    fireEvent.press(getByText('Continue'));

    await waitFor(() => {
      expect(queryByText(/Uh-oh!!/i)).toBeTruthy();
    });

    fireEvent.press(getByText(/Got it, let's move on/));

    // Completion rendering
    await waitFor(() => {
      expect(getByText('Yay, Congratulations!')).toBeTruthy();
      expect(getByText('10 pts')).toBeTruthy();
    });
  });
  it('does not complete the quiz, user goes back to homepage', async () => {
    const mockQuestion = {
      question: "What's 2 + 2?",
      answers: ['1', '2', '4', '5'],
      rightAnswerIndex: 2,
    };
    const { getByText, getByTestId } = render(<Quiz testQuestion={mockQuestion} />);
    const button = getByText(/Continue/i);

    fireEvent.press(button);
    await waitFor(() => expect(getByText(/Continue/i)).toBeTruthy());
    fireEvent.press(button);

    // Try to exit the quiz
    const exitButton = getByTestId('exit-button');
    fireEvent.press(exitButton);
    await waitFor(() => expect(getByText(/Don't leave us/i)).toBeTruthy());
    fireEvent.press(getByText(/Back to Home Page/i));
    expect(mockReplace).toHaveBeenCalledWith('/(tabs)/(home)');
  });

  it('does not complete the quiz, user continues with the quiz', async () => {
    const mockQuestion = {
      question: "What's 2 + 2?",
      answers: ['1', '2', '4', '5'],
      rightAnswerIndex: 2,
    };
    const { getByText, getByTestId, queryByText } = render(<Quiz testQuestion={mockQuestion} />);
    const button = getByText(/Continue/i);

    fireEvent.press(button);
    await waitFor(() => expect(getByText(/Continue/i)).toBeTruthy());
    fireEvent.press(button);
    await waitFor(() => expect(getByText(/Start the quiz/i)).toBeTruthy());
    fireEvent.press(button);

    // Try to exit the quiz
    const exitButton = getByTestId('exit-button');
    fireEvent.press(exitButton);
    await waitFor(() => expect(getByText(/Don't leave us/i)).toBeTruthy());
    fireEvent.press(getByText(/Continue/i));
    expect(queryByText(/Don't leave us/i)).toBeNull();
  });
});
