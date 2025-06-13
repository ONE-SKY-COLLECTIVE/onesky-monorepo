module.exports = {
    preset: "react-native",
    transformIgnorePatterns: [
      "node_modules/(?!(jest-)?react-native|@react-native|expo|@expo|react-navigation|@unimodules)"
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',  // Adjust the path to your source root
      },
    setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
    testEnvironment: "jsdom",
  };
  