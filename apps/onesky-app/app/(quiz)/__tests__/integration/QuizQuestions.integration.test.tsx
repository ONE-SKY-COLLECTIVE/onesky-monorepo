import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Quiz from "@/app/(quiz)/questions"; // Adjust to your actual file path
import { router } from "expo-router";

// Mock the router
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useLocalSearchParams: () => ({
    quizTopic: "Plastic Pollution",
  }),
  router: {
    push: jest.fn(),
  }
}));

jest.mock("expo-image", () => ({
    Image: () => null,
  }));

describe("Quiz Integration Test", () => {
  it("completes the quiz correctly and displays Completion component with correct points", async () => {
    const mockQuestion = {
        question: "What's 2 + 2?",
        answers: ["1", "2", "4", "5"],
        rightAnswerIndex: 2,
      };
    const { getByText, queryByText } = render(<Quiz testQuestion={mockQuestion}/>);
    const button = getByText(/Continue/i);

    fireEvent.press(button);
    fireEvent.press(button);
    fireEvent.press(button);


    // Select correct answer
    fireEvent.press(getByText(/4/i));
    fireEvent.press(getByText("Continue"));

    await waitFor(() => {
      expect(queryByText(/Nice Work!/i)).toBeTruthy();
    });

    fireEvent.press(getByText(/Collect Points/)); 

    // Completion Rendering
    await waitFor(() => {
      expect(getByText("Yay, Congratulations!")).toBeTruthy();
      expect(getByText("20 pts")).toBeTruthy(); 
    });
  });

  it("completes the quiz incorrectly and displays Completion component with correct points", async () => {
    const mockQuestion = {
        question: "What's 2 + 2?",
        answers: ["1", "2", "4", "5"],
        rightAnswerIndex: 2,
      };
    const { getByText, queryByText } = render(<Quiz testQuestion={mockQuestion}/>);
    const button = getByText(/Continue/i);

    fireEvent.press(button);
    fireEvent.press(button);
    fireEvent.press(button);

    // Select wrong answer
    fireEvent.press(getByText(/1/i));
    fireEvent.press(getByText("Continue"));

    await waitFor(() => {
      expect(queryByText(/Uh-oh!!/i)).toBeTruthy();
    });

    fireEvent.press(getByText(/Got it, let's move on/));

    // Completion rendering
    await waitFor(() => {
      expect(getByText("Yay, Congratulations!")).toBeTruthy();
      expect(getByText("10 pts")).toBeTruthy();
    });
  });
});
