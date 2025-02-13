export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts"],
  //setupFilesAfterEnv: ["./__tests__/setup.ts"],
  moduleFileExtensions: ["ts", "js"],
};
