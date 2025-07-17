import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Refill from '../../refill';

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
}));

jest.mock('expo-image', () => ({
  Image: (props: any) => <image {...props} />,
}));

describe('Refill Component', () => {
  it('goes to refill section when button is clicked', () => {
    const { getByText, queryByText } = render(<Refill />);

    // User can progress to refill section properly
    expect(getByText(/Get Started/i)).toBeTruthy();
    fireEvent.press(getByText(/Get started/i));
    expect(queryByText(/Get Started/i)).toBeNull();
    expect(getByText(/How many bottles do you have/i)).toBeTruthy();
  });

  it('user refills water bottles to fulfill goal', () => {
    const { getByText } = render(<Refill />);
    fireEvent.press(getByText(/Get Started/i));

    // User can log refilled bottles
    expect(getByText(/4/i)).toBeTruthy();
    fireEvent.press(getByText(/4/i));
    expect(getByText(/Confirm refill/i)).toBeTruthy();
    fireEvent.press(getByText(/Confirm refill/i));

    // The correct text shows up for completed refills that don't meet the goal
    expect(getByText(/4 bottles filled today/i)).toBeTruthy();
    expect(getByText(/No worries/i)).toBeTruthy();
    expect(getByText('3')).toBeTruthy();

    // User has option to go back to refill bottles
    expect(getByText(/Refill another bottle/i)).toBeTruthy();
    fireEvent.press(getByText(/Refill another bottle/i));

    // Proper buttons are enabled/disabled based on progression towards goal
    expect(getByText('1')).toBeEnabled();
    expect(getByText('2')).toBeEnabled();
    expect(getByText('3')).toBeEnabled();
    expect(getByText('4')).toBeDisabled();
    expect(getByText('5')).toBeDisabled();
    expect(getByText('6')).toBeDisabled();
    expect(getByText('7')).toBeDisabled();

    // User can complete daily goal
    fireEvent.press(getByText('3'));
    fireEvent.press(getByText(/Confirm refill/i));
    expect(getByText('7 bottles filled today')).toBeTruthy();
    expect(getByText(/Today's activity is complete!/i)).toBeTruthy();
    expect(getByText('Collect your points')).toBeTruthy();
    fireEvent.press(getByText('Collect your points'));
    expect(getByText(/Yay, Congratulations!/i)).toBeTruthy();
  });
});
