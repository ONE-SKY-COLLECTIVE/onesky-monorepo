import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { router } from "expo-router";
// jest.useFakeTimers();

// Mock expo-router
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

import Quiz from "../../index";


jest.mock("@/components/Header", () => {
  return () => <></>;
});

jest.mock("expo-image", () => ({
  Image: (props: any) => <image {...props} /> 
}));

describe("Quiz Component", () => {
  it("renders title and description", () => {
    const { getByText } = render(<Quiz />);
    
    expect(getByText("Choose a topic that interests you to begin your learning journey")).toBeTruthy();
    expect(getByText("Complete 1 quiz daily to earn 20 points")).toBeTruthy();
  });

  it("renders all quiz topics", () => {
    const { getByText } = render(<Quiz />);

    const topics = [
      "Plastic Pollution",
      "Single User Plastic",
      "Climate Change",
      "Circular Economy",
      "Sustainability",
      "Active Travel",
      "Global Warming",
      "Beach Cleaning"
    ];

    topics.forEach(topic => {
      expect(getByText(topic)).toBeTruthy();
    });
  });

  it("navigates to questions page when a topic is pressed", () => {
    const { getByText } = render(<Quiz />);

    const topic = "Plastic Pollution";
    fireEvent.press(getByText(topic));

    expect(router.push).toHaveBeenCalledWith({
      pathname: "/(quiz)/questions",
      params: { quizTopic: topic }
    });
  });
});
