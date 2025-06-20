import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import QuizQuestions from "../../questions";  

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useLocalSearchParams: () => ({
    quizTopic: "Environment",
  }),
}));

jest.mock("expo-image", () => ({
    Image: () => null,
  }));
  

describe("Quiz Component - Static and Dynamic Rendering", () => {
  it("renders the quiz welcome message with quizTopic", () => {
    render(<QuizQuestions />);

    // Dynamic text check
    expect(screen.getByText(/Welcome to the Environment quiz!/i)).toBeTruthy();

    // Static text check
    expect(
      screen.getByText(/Let's explore some key information before we get started./i)
    ).toBeTruthy();
  });

  it("renders the same button text: 'Continue' when quiz progression is 2", () => {
    const { getByText, queryByText } = render(<QuizQuestions />);
    const button = getByText(/Continue/i);

    // Setting quiz progression to 2
    fireEvent.press(button);

    expect(queryByText(/Start the quiz/i)).toBeNull()
    expect(getByText(/Continue/i)).toBeTruthy();
  })


  it("renders different button text when quiz progression is 3", () => {
    const { getByText, queryByText } = render(<QuizQuestions />);
    const button = getByText(/Continue/i);

    // Setting quiz progression to 3
    fireEvent.press(button);
    fireEvent.press(button);

    expect(queryByText(/Continue/i)).toBeNull()
    expect(getByText(/Start the quiz/i)).toBeTruthy();
  })

});
